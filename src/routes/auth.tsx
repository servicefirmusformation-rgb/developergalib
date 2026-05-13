import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (mode === "signup") {
      toast.success("Account created. You can sign in now.");
      setMode("signin");
    } else {
      toast.success("Welcome back");
      navigate({ to: "/admin" });
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-3xl font-bold">
        {mode === "signin" ? "Admin sign in" : "Create admin account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {mode === "signup"
          ? "The first account becomes the admin. Use a strong password."
          : "Sign in to manage projects, skills, messages and content."}
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          disabled={busy}
          type="submit"
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
        className="mt-6 text-center text-sm text-muted-foreground hover:text-foreground"
      >
        {mode === "signin"
          ? "No account yet? Create one"
          : "Already have an account? Sign in"}
      </button>

      <Link to="/" className="mt-2 text-center text-xs text-muted-foreground hover:text-foreground">
        ← Back to site
      </Link>
    </section>
  );
}
