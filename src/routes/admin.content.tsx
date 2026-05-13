import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "hero_eyebrow", label: "Hero — eyebrow" },
  { key: "hero_title", label: "Hero — title" },
  { key: "hero_subtitle", label: "Hero — subtitle" },
  { key: "hero_description", label: "Hero — description", multiline: true },
  { key: "about_p1", label: "About — paragraph 1", multiline: true },
  { key: "about_p2", label: "About — paragraph 2", multiline: true },
  { key: "about_p3", label: "About — paragraph 3", multiline: true },
  { key: "contact_email", label: "Contact email" },
  { key: "contact_phone", label: "Contact phone" },
];

function AdminContent() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r: { key: string; value: string }) => (map[r.key] = r.value));
      setValues(map);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Content saved");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Site Content</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit copy that appears on the home, about and contact pages.</p>
      <div className="mt-6 space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{f.label}</label>
            {f.multiline ? (
              <textarea
                rows={3}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
