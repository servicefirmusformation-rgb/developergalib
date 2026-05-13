import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/skills")({
  component: AdminSkills,
});

type Skill = { id: string; name: string; category: string; display_order: number };

function AdminSkills() {
  const [items, setItems] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");

  const load = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category")
      .order("display_order");
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Skill[]);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const max = Math.max(0, ...items.filter((i) => i.category === category).map((i) => i.display_order));
    const { error } = await supabase.from("skills").insert({
      name: name.trim(),
      category,
      display_order: max + 1,
    });
    if (error) return toast.error(error.message);
    setName("");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const groups = ["Frontend", "Backend", "Database", "Tools"];

  return (
    <div>
      <h1 className="text-2xl font-bold">Skills</h1>

      <form onSubmit={add} className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Skill name"
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          {groups.map((g) => <option key={g}>{g}</option>)}
        </select>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g} className="rounded-2xl border border-border bg-card p-4">
            <h3 className="font-semibold">{g}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.filter((i) => i.category === g).map((s) => (
                <span key={s.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
                  {s.name}
                  <button onClick={() => remove(s.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
