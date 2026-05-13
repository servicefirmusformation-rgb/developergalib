import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SkillGlobe } from "../components/SkillGlobe";
import { Starfield } from "../components/Starfield";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galib — Full Stack Web Developer" },
      { name: "description", content: "Portfolio of Galib, a full stack web developer crafting fast, modern web experiences." },
      { property: "og:title", content: "Galib — Full Stack Web Developer" },
      { property: "og:description", content: "Portfolio of Galib, a full stack web developer." },
    ],
  }),
  component: Home,
});

const DEFAULTS = {
  hero_eyebrow: "Available for work",
  hero_title: "Hi, I'm Galib",
  hero_subtitle: "a Web Developer",
  hero_description: "I build fast, accessible, and beautiful web experiences from front-end pixels to back-end logic.",
};

function Home() {
  const [c, setC] = useState<Record<string, string>>(DEFAULTS);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key,value")
      .in("key", Object.keys(DEFAULTS))
      .then(({ data }) => {
        const m: Record<string, string> = { ...DEFAULTS };
        (data ?? []).forEach((r: { key: string; value: string }) => {
          if (r.value) m[r.key] = r.value;
        });
        setC(m);
      });
  }, []);

  const titleWords = c.hero_title.split(" ");
  const titleHead = titleWords.slice(0, -1).join(" ");
  const titleTail = titleWords.slice(-1)[0];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-bg)" }} />
      <Starfield />

      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="animate-float-up relative z-10 text-center lg:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {c.hero_eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            {titleHead && <>{titleHead} </>}
            <span className="text-gradient-ember">{titleTail}</span>
            <br />
            <span className="text-muted-foreground">{c.hero_subtitle}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground sm:text-lg lg:mx-0">
            {c.hero_description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to="/projects" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105">
              View Projects
            </Link>
            <Link to="/contact" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[600px]">
          <SkillGlobe />
        </div>
      </div>
    </section>
  );
}
