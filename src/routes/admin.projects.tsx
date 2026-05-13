import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload, X } from "lucide-react";
import { resolveProjectImage } from "@/lib/projectImages";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  display_order: number;
  featured: boolean;
};

const EMPTY: Omit<Project, "id"> = {
  title: "",
  description: "",
  category: "Shopify",
  tags: [],
  image_url: null,
  live_url: null,
  github_url: null,
  display_order: 0,
  featured: false,
};

function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | (Omit<Project, "id"> & { id?: string }) | null>(null);
  const [tagsText, setTagsText] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Project[]);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (p?: Project) => {
    const v = p ?? { ...EMPTY };
    setEditing(v);
    setTagsText((v.tags ?? []).join(", "));
  };

  const save = async () => {
    if (!editing) return;
    const payload = {
      ...editing,
      tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const { id, ...rest } = payload as Project;
    const { error } = id
      ? await supabase.from("projects").update(rest).eq("id", id)
      : await supabase.from("projects").insert(rest);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file, { upsert: false });
    if (error) {
      setUploading(false);
      return toast.error(error.message);
    }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
    setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => startEdit()} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="mt-6 grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-3">
            <img src={resolveProjectImage(p.image_url)} alt="" className="h-14 w-20 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.category} · order {p.display_order}</p>
            </div>
            <button onClick={() => startEdit(p)} className="rounded-md p-2 hover:bg-secondary"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(p.id)} className="rounded-md p-2 text-destructive hover:bg-secondary"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{("id" in editing && editing.id) ? "Edit project" : "New project"}</h2>
              <button onClick={() => setEditing(null)} className="rounded-md p-1 hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 space-y-3">
              <Field label="Title">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Description">
                <textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Category">
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputCls}>
                    <option>Shopify</option>
                    <option>E-commerce</option>
                    <option>Web App</option>
                  </select>
                </Field>
                <Field label="Display order">
                  <input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className={inputCls} />
                </Field>
              </div>
              <Field label="Tags (comma separated)">
                <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className={inputCls} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Live URL">
                  <input value={editing.live_url ?? ""} onChange={(e) => setEditing({ ...editing, live_url: e.target.value || null })} className={inputCls} />
                </Field>
                <Field label="GitHub URL">
                  <input value={editing.github_url ?? ""} onChange={(e) => setEditing({ ...editing, github_url: e.target.value || null })} className={inputCls} />
                </Field>
              </div>
              <Field label="Image">
                <div className="flex items-center gap-3">
                  {editing.image_url && <img src={resolveProjectImage(editing.image_url)} alt="" className="h-16 w-24 rounded-md object-cover" />}
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading…" : "Upload image"}
                    <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                  </label>
                </div>
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                Featured
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm">Cancel</button>
              <button onClick={save} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
