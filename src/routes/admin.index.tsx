import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0 });

  useEffect(() => {
    (async () => {
      const [p, s, m, u] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("skills").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
      ]);
      setStats({
        projects: p.count ?? 0,
        skills: s.count ?? 0,
        messages: m.count ?? 0,
        unread: u.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects },
    { label: "Skills", value: stats.skills },
    { label: "Messages", value: stats.messages },
    { label: "Unread", value: stats.unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back. Here's a quick snapshot of your site.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{c.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
