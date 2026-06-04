import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SkillGlobe } from "../components/SkillGlobe";
import { Starfield } from "../components/Starfield";
import { supabase } from "@/integrations/supabase/client";
import { resolveProjectImage } from "@/lib/projectImages";

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
  about_p1: "I'm a full stack web developer who loves turning ideas into clean, fast, and reliable products — from pixel-perfect front-ends to robust back-end logic.",
};

type FeaturedProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  live_url: string | null;
};

type Skill = { id: string; name: string; category: string };

function Home() {
  const [c, setC] = useState<Record<string, string>>(DEFAULTS);
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

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

    supabase
      .from("projects")
      .select("id,title,description,category,image_url,live_url")
      .order("display_order", { ascending: true })
      .limit(3)
      .then(({ data }) => setProjects((data ?? []) as FeaturedProject[]));

    supabase
      .from("skills")
      .select("id,name,category")
      .order("category")
      .order("display_order")
      .then(({ data }) => setSkills((data ?? []) as Skill[]));
  }, []);

  const titleWords = c.hero_title.split(" ");
  const titleHead = titleWords.slice(0, -1).join(" ");
  const titleTail = titleWords.slice(-1)[0];

  return (
    <>
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

      {/* Featured projects */}
      {projects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Featured work</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected <span className="text-gradient-ember">projects</span></h2>
            </div>
            <Link to="/projects" className="text-sm font-semibold text-primary transition-colors hover:text-foreground">
              View all →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
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
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills preview */}
      {skills.length > 0 && (
        <section className="border-y border-border/50 bg-card/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Tech stack</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tools I <span className="text-gradient-ember">work with</span></h2>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {s.name}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/skills" className="text-sm font-semibold text-primary transition-colors hover:text-foreground">
                Explore my full toolkit →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">About me</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A developer who <span className="text-gradient-ember">cares about craft</span></h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.about_p1}</p>
            <div className="mt-8">
              <Link to="/about" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                More about me
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Role", value: "Full Stack Developer" },
              { label: "Focus", value: "React + PHP/MySQL" },
              { label: "Style", value: "Clean, minimal, fast" },
              { label: "Status", value: "Open to projects" },
            ].map((f) => (
              <div key={f.label} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{f.label}</p>
                <p className="mt-2 text-sm text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-bg)" }} />
          <h2 className="text-3xl font-bold sm:text-4xl">Let's build something <span className="text-gradient-ember">great</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Have a project in mind or just want to say hi? I'm always open to new ideas and collaborations.
          </p>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
