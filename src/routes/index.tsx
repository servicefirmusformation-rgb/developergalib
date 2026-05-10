import { createFileRoute, Link } from "@tanstack/react-router";
import { SkillGlobe } from "../components/SkillGlobe";
import { Starfield } from "../components/Starfield";

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

function Home() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-bg)" }}
      />
      <Starfield />

      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="animate-float-up relative z-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Available for work
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient-ember">Galib</span>
            <br />
            <span className="text-muted-foreground">a Web Developer</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            I build fast, accessible, and beautiful web experiences from
            front-end pixels to back-end logic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="relative h-[500px] w-full lg:h-[600px]">
          <SkillGlobe />
        </div>
      </div>
    </section>
  );
}
