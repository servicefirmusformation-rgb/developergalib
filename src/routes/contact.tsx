import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Galib" },
      { name: "description", content: "Get in touch with Galib for web development projects and collaborations." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
      <h1 className="mt-3 text-5xl font-bold">Let's <span className="text-gradient-ember">work together</span></h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Have a project in mind or just want to say hi? Drop a message below
        and I'll get back to you soon.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4 md:col-span-3"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input required className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input required type="email" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea required rows={5} className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105"
          >
            {sent ? "Sent ✓" : "Send Message"}
          </button>
        </form>

        <aside className="space-y-5 md:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Email</h3>
            <a href="mailto:info.galib845@gmail.com" className="mt-2 block text-sm hover:text-primary">info.galib845@gmail.com</a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Phone</h3>
            <a href="tel:+8801725085863" className="mt-2 block text-sm hover:text-primary">01725085863</a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Elsewhere</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li><a className="hover:text-primary" href="#">GitHub</a></li>
              <li><a className="hover:text-primary" href="#">LinkedIn</a></li>
              <li><a className="hover:text-primary" href="#">Twitter</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
