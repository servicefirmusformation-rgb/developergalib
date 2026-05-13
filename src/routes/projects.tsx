import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveProjectImage } from "@/lib/projectImages";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Galib" },
      { name: "description", content: "Selected web development projects by Galib." },
    ],
  }),
  component: Projects,
});

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
};

function Projects() {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id,title,description,category,tags,image_url,live_url")
      .order("display_order", { ascending: true })
      .then(({ data }) => setItems((data ?? []) as Project[]));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Projects</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Things I've <span className="text-gradient-ember">built</span></h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article
            key={p.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-ember)]"
          >
            <div className="relative mb-4 h-40 overflow-hidden rounded-xl border border-border/60">
              <img
                src={resolveProjectImage(p.image_url)}
                alt={`${p.title} preview`}
                width={800}
                height={512}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
                {p.category}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold">
              {p.live_url ? (
                <a href={p.live_url} target="_blank" rel="noreferrer" className="hover:text-primary">{p.title}</a>
              ) : p.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
