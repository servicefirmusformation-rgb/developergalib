import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Galib" },
      { name: "description", content: "Technologies and tools Galib works with as a full stack web developer." },
    ],
  }),
  component: Skills,
});

const GROUPS = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Bootstrap", "Tailwind", "Sass", "jQuery"],
  },
  {
    title: "Backend",
    items: ["PHP", "Node.js", "Express", "Laravel", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "Tools",
    items: ["Git", "Vite", "Webpack", "Figma", "VS Code"],
  },
];

function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Skills</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">My <span className="text-gradient-ember">toolkit</span></h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        The technologies I use to design, build and ship full stack web
        applications.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.title} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
            <h3 className="font-display text-xl font-semibold">{g.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
