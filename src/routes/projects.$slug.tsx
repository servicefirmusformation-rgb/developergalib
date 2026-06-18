import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExternalLink, Github, ArrowLeft, Check, Target, Lightbulb, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolveProjectImage } from "@/lib/projectImages";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Case Study — Galib" },
      { name: "description", content: "An in-depth look at a project built by Galib — overview, challenges, solutions, and results." },
    ],
  }),
  component: ProjectDetail,
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
  slug: string | null;
};

function ProjectDetail() {
  const { slug } = useParams({ from: "/projects/$slug" });
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const cols = "id,title,description,category,tags,image_url,live_url,github_url,slug";
      let { data } = await supabase.from("projects").select(cols).eq("slug", slug).maybeSingle();
      if (!data) {
        const byId = await supabase.from("projects").select(cols).eq("id", slug).maybeSingle();
        data = byId.data;
      }
      if (active) {
        setProject((data as Project) ?? null);
        setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="h-6 w-32 animate-pulse rounded bg-card" />
        <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-card" />
        <div className="mt-8 h-64 w-full animate-pulse rounded-2xl bg-card" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-3 text-muted-foreground">This case study doesn't exist or has been moved.</p>
        <Link to="/projects" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Back to Projects
        </Link>
      </section>
    );
  }

  const features = [
    "Responsive, mobile-first interface",
    "Optimized performance and fast load times",
    "Accessible, semantic markup",
    "Clean, maintainable codebase",
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <p className="mt-8 text-sm font-medium uppercase tracking-widest text-primary">{project.category}</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105">
            Live Demo <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary">
            View Code <Github className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <img
          src={resolveProjectImage(project.image_url)}
          alt={`${project.title} screenshot`}
          width={1200}
          height={768}
          className="w-full object-cover"
        />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-10 md:col-span-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold"><Target className="h-5 w-5 text-primary" /> The Challenge</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The goal was to deliver a fast, polished, and reliable {project.category.toLowerCase()} experience that
              works flawlessly across devices while staying easy to maintain and extend over time.
            </p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold"><Lightbulb className="h-5 w-5 text-primary" /> The Solution</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              I built {project.title} with a modern, component-driven architecture — focusing on clean code,
              accessibility, and performance. Each part of the interface was designed to be intuitive and responsive.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Key Features</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold"><TrendingUp className="h-5 w-5 text-primary" /> Results</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The project shipped on time and exceeded expectations — delivering a smooth user experience,
              strong performance scores, and a foundation that's easy to grow.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Technologies</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {(project.tags?.length ? project.tags : ["React", "TypeScript"]).map((t) => (
                <span key={t} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Category</h3>
            <p className="mt-3 text-sm">{project.category}</p>
          </div>
        </aside>
      </div>

      <div className="mt-16 rounded-3xl border border-primary/30 bg-card p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Have a similar project?</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">Let's talk about how I can help bring your idea to life.</p>
        <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105">
          Get in Touch
        </Link>
      </div>
    </article>
  );
}
