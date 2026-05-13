import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

function AdminMessages() {
  const [items, setItems] = useState<Msg[]>([]);

  const load = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems((data ?? []) as Msg[]);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (m: Msg) => {
    await supabase.from("contact_messages").update({ read: !m.read }).eq("id", m.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="mt-6 space-y-3">
        {items.map((m) => (
          <div key={m.id} className={`rounded-2xl border bg-card p-5 ${m.read ? "border-border" : "border-primary/40"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold">{m.name} <span className="font-normal text-muted-foreground">· {m.email}</span></p>
                <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleRead(m)} className="rounded-md p-2 hover:bg-secondary" title={m.read ? "Mark unread" : "Mark read"}>
                  {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-primary" />}
                </button>
                <button onClick={() => remove(m.id)} className="rounded-md p-2 text-destructive hover:bg-secondary">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
      </div>
    </div>
  );
}
