import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, Clock, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Galib" },
      { name: "description", content: "Get in touch with Galib for web development projects and collaborations." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [content, setContent] = useState<{ email?: string; phone?: string }>({});

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key,value")
      .in("key", ["contact_email", "contact_phone"])
      .then(({ data }) => {
        const m: Record<string, string> = {};
        (data ?? []).forEach((r: { key: string; value: string }) => (m[r.key] = r.value));
        setContent({ email: m.contact_email, phone: m.contact_phone });
      });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setBusy(false);
    if (error) return toast.error(error.message);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent!");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Let's <span className="text-gradient-ember">work together</span></h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Have a project in mind or just want to say hi? Drop a message below and I'll get back to you soon.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-5">
        <form onSubmit={submit} className="space-y-4 md:col-span-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105 disabled:opacity-50"
          >
            {busy ? "Sending…" : sent ? "Sent ✓" : "Send Message"}
          </button>
        </form>

        <aside className="space-y-5 md:col-span-2">
          <div className="rounded-2xl border border-primary/30 bg-card p-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary" /> Available for new projects
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> Responds within 24 hours
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Email</h3>
            <a href={`mailto:${content.email || "developer.galib@example.com"}`} className="mt-2 block text-sm hover:text-primary">
              {content.email || "developer.galib@example.com"}
            </a>
          </div>

          {content.phone && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Phone</h3>
              <a href={`tel:${content.phone}`} className="mt-2 block text-sm hover:text-primary">{content.phone}</a>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Connect</h3>
            <div className="mt-3 flex gap-3">
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
            <a
              href="/Galib-Resume.txt"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Résumé
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
