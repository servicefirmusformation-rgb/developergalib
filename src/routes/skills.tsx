import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Galib" },
      { name: "description", content: "Technologies and tools Galib works with as a full stack web developer." },
    ],
  }),
  component: Skills,
});

type Skill = { id: string; name: string; category: string };

function Skills() {
  const [items, setItems] = useState<Skill[]>([]);

  useEffect(() => {
    supabase
      .from("skills")
      .select("id,name,category")
      .order("category")
      .order("display_order")
      .then(({ data }) => setItems((data ?? []) as Skill[]));
  }, []);

  const groups = ["Frontend", "Backend", "Database", "Tools"];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Skills</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">My <span className="text-gradient-ember">toolkit</span></h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        The technologies I use to design, build and ship full stack web applications.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {groups.map((g) => {
          const list = items.filter((s) => s.category === g);
          if (list.length === 0) return null;
          return (
            <div key={g} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
              <h3 className="font-display text-xl font-semibold">{g}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {list.map((s) => (
                  <span key={s.id} className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
