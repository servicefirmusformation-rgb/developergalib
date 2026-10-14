import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { BackToTop } from "./BackToTop";
import bgLandscape from "../assets/bg-landscape.jpg.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative min-h-screen text-foreground">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLandscape.url})` }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-background/80 backdrop-blur-[1px]" />
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
            <img
              src="/favicon.png"
              alt="Galib logo"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 object-contain"
            />
            <span>
              <span className="text-gradient-ember">Galib</span>
              <span className="text-muted-foreground">.dev</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
              <img
                src="/favicon.png"
                alt="Galib logo"
                width={36}
                height={36}
                loading="lazy"
                className="h-9 w-9 shrink-0 object-contain"
              />
              <span>
                <span className="text-gradient-ember">Galib</span>
                <span className="text-muted-foreground">.dev</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Full stack web developer crafting fast, accessible, and modern web experiences.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:developer.galib@example.com" aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Availability</h3>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" /> Open to new projects
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Typical response within 24 hours.</p>
            <a
              href="/Galib-Resume.txt"
              download
              className="mt-4 inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Download Résumé
            </a>
          </div>
        </div>
        <div className="border-t border-border/50 px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Galib — Full Stack Web Developer
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
