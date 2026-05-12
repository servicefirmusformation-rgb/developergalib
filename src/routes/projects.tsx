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

type Project = {
  title: string;
  desc: string;
  tags: string[];
  category: "Shopify" | "E-commerce" | "Web App";
  url?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Luxe Apparel — Shopify Store",
    desc: "Custom Shopify storefront for a fashion brand. Built with a tailored Dawn theme, Liquid sections, mega-menu, predictive search, and a fast product page with variant swatches and sticky add-to-cart.",
    tags: ["Shopify", "Liquid", "Dawn Theme", "JavaScript"],
    category: "Shopify",
    url: "#",
  },
  {
    title: "GadgetHub — Shopify Plus Migration",
    desc: "Migrated an electronics retailer from WooCommerce to Shopify Plus. Imported 4k+ SKUs, set up metafields, custom bundles, Shopify Markets for multi-currency, and Klaviyo flows for abandoned cart.",
    tags: ["Shopify Plus", "Liquid", "Klaviyo", "Metafields"],
    category: "Shopify",
    url: "#",
  },
  {
    title: "BrewCraft Coffee — Subscription Store",
    desc: "Headless Shopify store with a React storefront using the Storefront API. Recharge-powered coffee subscriptions, build-a-box flow, and one-page checkout customizations.",
    tags: ["Shopify", "Storefront API", "React", "Recharge"],
    category: "Shopify",
    url: "#",
  },
  {
    title: "PetParadise — Custom Shopify Theme",
    desc: "Pet supplies store built from scratch on Shopify. Custom Liquid sections, AJAX cart drawer, product reviews, upsell modals, and Google Merchant feed integration.",
    tags: ["Shopify", "Liquid", "SCSS", "Alpine.js"],
    category: "Shopify",
    url: "#",
  },
  {
    title: "Fashionly — WooCommerce Store",
    desc: "Full WooCommerce store for a clothing brand with custom PHP plugins, size-guide popups, wishlist, Stripe + SSLCommerz checkout, and bKash payment gateway.",
    tags: ["WordPress", "WooCommerce", "PHP", "Stripe"],
    category: "E-commerce",
    url: "#",
  },
  {
    title: "ShopKart — MERN E-commerce",
    desc: "Full-stack e-commerce app with React, Node.js, Express and MongoDB. JWT auth, admin dashboard, order management, Stripe payments, and product search with filters.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "E-commerce",
    url: "#",
  },
  {
    title: "Commerce Dashboard",
    desc: "Admin dashboard for tracking sales, inventory and customers — built with React and a PHP + MySQL backend with charts and CSV export.",
    tags: ["React", "PHP", "MySQL"],
    category: "Web App",
  },
  {
    title: "Booking Platform",
    desc: "End-to-end booking system with calendar sync, Stripe deposits and email notifications.",
    tags: ["PHP", "Laravel", "MySQL"],
    category: "Web App",
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
