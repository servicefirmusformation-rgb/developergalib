import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Galib" },
      { name: "description", content: "Selected web development projects by Galib." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  {
    title: "Commerce Dashboard",
    desc: "An admin dashboard for tracking sales, inventory and customers built with React + MySQL.",
    tags: ["React", "PHP", "MySQL"],
  },
  {
    title: "Portfolio CMS",
    desc: "A lightweight CMS letting creators publish portfolios without writing code.",
    tags: ["JavaScript", "Node.js", "MongoDB"],
  },
  {
    title: "Realtime Chat App",
    desc: "Group chat with rooms, typing indicators and message history.",
    tags: ["React", "Express", "WebSockets"],
  },
  {
    title: "Booking Platform",
    desc: "End-to-end booking system with calendar sync and email notifications.",
    tags: ["PHP", "Laravel", "MySQL"],
  },
  {
    title: "Landing Page Builder",
    desc: "Drag-and-drop tool for marketers to ship pages in minutes.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Blog Engine",
    desc: "Markdown-based publishing platform with SEO-first defaults.",
    tags: ["Next-style", "Node.js"],
  },
];

function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Projects</p>
      <h1 className="mt-3 text-5xl font-bold">Things I've <span className="text-gradient-ember">built</span></h1>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-ember)]"
          >
            <div className="mb-4 h-32 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5" />
            <h3 className="font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
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
