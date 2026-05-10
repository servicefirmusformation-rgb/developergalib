import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
      <h1 className="mt-3 text-5xl font-bold">A bit about <span className="text-gradient-ember">me</span></h1>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I'm Galib, a full stack web developer who loves turning ideas into
            real, working products. I work across the stack — from crafting
            polished interfaces in React to designing solid databases in MySQL.
          </p>
          <p>
            For me, great software is a balance: fast and accessible on the
            outside, clean and maintainable on the inside. I care about
            details, performance, and shipping things people enjoy using.
          </p>
          <p>
            When I'm not coding, I'm usually exploring new tools, contributing
            to small side projects, or learning something completely new.
          </p>
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
