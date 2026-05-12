import { createFileRoute } from "@tanstack/react-router";

import shopifyFashion from "@/assets/projects/shopify-fashion.jpg";
import shopifyElectronics from "@/assets/projects/shopify-electronics.jpg";
import shopifyCoffee from "@/assets/projects/shopify-coffee.jpg";
import shopifyPet from "@/assets/projects/shopify-pet.jpg";
import wooFashion from "@/assets/projects/woo-fashion.jpg";
import mernShop from "@/assets/projects/mern-shop.jpg";
import dashboardImg from "@/assets/projects/dashboard.jpg";
import bookingImg from "@/assets/projects/booking.jpg";
import shopifyBeauty from "@/assets/projects/shopify-beauty.jpg";

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
  image: string;
  url?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Luxe Apparel — Shopify Store",
    desc: "Custom Shopify storefront for a fashion brand. Tailored Dawn theme, Liquid sections, mega-menu, predictive search, and a fast product page with variant swatches and sticky add-to-cart.",
    tags: ["Shopify", "Liquid", "Dawn Theme", "JavaScript"],
    category: "Shopify",
    image: shopifyFashion,
  },
  {
    title: "GadgetHub — Shopify Plus Migration",
    desc: "Migrated an electronics retailer from WooCommerce to Shopify Plus. Imported 4k+ SKUs, set up metafields, custom bundles, Shopify Markets for multi-currency, and Klaviyo abandoned-cart flows.",
    tags: ["Shopify Plus", "Liquid", "Klaviyo", "Metafields"],
    category: "Shopify",
    image: shopifyElectronics,
  },
  {
    title: "BrewCraft Coffee — Subscription Store",
    desc: "Headless Shopify store with a React storefront using the Storefront API. Recharge-powered coffee subscriptions, build-a-box flow, and one-page checkout customizations.",
    tags: ["Shopify", "Storefront API", "React", "Recharge"],
    category: "Shopify",
    image: shopifyCoffee,
  },
  {
    title: "PetParadise — Custom Shopify Theme",
    desc: "Pet supplies store built from scratch on Shopify. Custom Liquid sections, AJAX cart drawer, product reviews, upsell modals, and Google Merchant feed integration.",
    tags: ["Shopify", "Liquid", "SCSS", "Alpine.js"],
    category: "Shopify",
    image: shopifyPet,
  },
  {
    title: "GlowSkin — Shopify Beauty Store",
    desc: "Skincare and beauty Shopify store with custom landing pages, ingredient highlights, quiz-based product recommendations, Judge.me reviews, and a loyalty rewards program via Smile.io.",
    tags: ["Shopify", "Liquid", "Smile.io", "Judge.me"],
    category: "Shopify",
    image: shopifyBeauty,
  },
  {
    title: "Fashionly — WooCommerce Store",
    desc: "Full WooCommerce store for a clothing brand with custom PHP plugins, size-guide popups, wishlist, Stripe + SSLCommerz checkout, and bKash payment gateway.",
    tags: ["WordPress", "WooCommerce", "PHP", "Stripe"],
    category: "E-commerce",
    image: wooFashion,
  },
  {
    title: "ShopKart — MERN E-commerce",
    desc: "Full-stack e-commerce app with React, Node.js, Express and MongoDB. JWT auth, admin dashboard, order management, Stripe payments, and product search with filters.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "E-commerce",
    image: mernShop,
  },
  {
    title: "Commerce Dashboard",
    desc: "Admin dashboard for tracking sales, inventory and customers — built with React and a PHP + MySQL backend with charts and CSV export.",
    tags: ["React", "PHP", "MySQL"],
    category: "Web App",
    image: dashboardImg,
  },
  {
    title: "Booking Platform",
    desc: "End-to-end booking system with calendar sync, Stripe deposits and email notifications.",
    tags: ["PHP", "Laravel", "MySQL"],
    category: "Web App",
    image: bookingImg,
  },
];

function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Projects</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Things I've <span className="text-gradient-ember">built</span></h1>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-ember)]"
          >
            <div className="relative mb-4 h-40 overflow-hidden rounded-xl border border-border/60">
              <img
                src={p.image}
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
