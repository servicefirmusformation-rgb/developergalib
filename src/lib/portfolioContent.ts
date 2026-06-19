import {
  Code2,
  Layout,
  ShoppingBag,
  ShoppingCart,
  LayoutDashboard,
  Plug,
  Gauge,
  Wrench,
} from "lucide-react";

export const HERO_STATS = [
  { label: "Projects Completed", value: 30, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%" },
];

export const SERVICES = [
  { icon: Code2, title: "Full Stack Development", desc: "End-to-end web apps with React front-ends and robust back-end logic." },
  { icon: Layout, title: "Frontend Development", desc: "Pixel-perfect, accessible, responsive interfaces that feel fast." },
  { icon: ShoppingBag, title: "Shopify Development", desc: "Custom themes, sections, and apps tailored to your store." },
  { icon: ShoppingCart, title: "eCommerce Solutions", desc: "Conversion-focused stores with secure checkout and integrations." },
  { icon: LayoutDashboard, title: "Dashboard Development", desc: "Data-rich admin panels and analytics dashboards." },
  { icon: Plug, title: "API Integration", desc: "Connect payments, CRMs, and third-party services seamlessly." },
  { icon: Gauge, title: "Website Optimization", desc: "Performance, SEO, and Core Web Vitals improvements." },
  { icon: Wrench, title: "Maintenance & Support", desc: "Ongoing updates, fixes, and reliable long-term support." },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Bloom Studio",
    rating: 5,
    quote: "Galib delivered our store ahead of schedule and the quality was outstanding. Communication was clear the whole way through.",
  },
  {
    name: "David Chen",
    role: "CTO, Nexa Labs",
    rating: 5,
    quote: "One of the most reliable developers we've worked with. Clean code, great performance, and a real eye for detail.",
  },
  {
    name: "Amelia Rodriguez",
    role: "Marketing Lead, Verde",
    rating: 5,
    quote: "Our new dashboard transformed how the team works. Intuitive, fast, and beautifully designed.",
  },
];

export const CERTIFICATIONS = [
  { title: "Meta Front-End Developer", issuer: "Meta", year: "2023" },
  { title: "Full Stack Web Development", issuer: "freeCodeCamp", year: "2022" },
  { title: "Shopify Theme Development", issuer: "Shopify Partners", year: "2023" },
  { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", year: "2021" },
];

export const TIMELINE = [
  { year: "2024 — Now", title: "Senior Full Stack Developer", desc: "Building scalable web apps and eCommerce platforms for clients worldwide." },
  { year: "2022 — 2024", title: "Full Stack Developer", desc: "Delivered React + PHP/Laravel applications and custom Shopify stores." },
  { year: "2020 — 2022", title: "Frontend Developer", desc: "Crafted responsive, accessible interfaces and design systems." },
  { year: "2019 — 2020", title: "Started Web Development", desc: "Began the journey with HTML, CSS, JavaScript and a love for the craft." },
];

export const ACHIEVEMENTS = [
  "Delivered 30+ production projects across eCommerce, SaaS and dashboards",
  "Improved client site performance scores to 90+ on Core Web Vitals",
  "Built reusable component systems adopted across multiple teams",
  "Maintained a 99% client satisfaction rate with long-term partnerships",
];
