import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";
import { TIMELINE, ACHIEVEMENTS } from "@/lib/portfolioContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Galib" },
      { name: "description", content: "About Galib — full stack web developer with a passion for clean code and great UX." },
    ],
  }),
  component: About,
});

function About() {
  const [c, setC] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key,value")
      .in("key", ["about_p1", "about_p2", "about_p3"])
      .then(({ data }) => {
        const m: Record<string, string> = {};
        (data ?? []).forEach((r: { key: string; value: string }) => (m[r.key] = r.value));
        setC(m);
      });
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">A bit about <span className="text-gradient-ember">me</span></h1>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-muted-foreground">
          {c.about_p1 && <p>{c.about_p1}</p>}
          {c.about_p2 && <p>{c.about_p2}</p>}
          {c.about_p3 && <p>{c.about_p3}</p>}
        </div>
        <aside className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Quick facts</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><span className="text-muted-foreground">Role:</span> Full Stack Developer</li>
            <li><span className="text-muted-foreground">Focus:</span> React + PHP/MySQL</li>
            <li><span className="text-muted-foreground">Style:</span> Clean, minimal, fast</li>
            <li><span className="text-muted-foreground">Status:</span> Open to projects</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
