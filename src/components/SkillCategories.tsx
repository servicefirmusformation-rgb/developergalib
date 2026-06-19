import { Reveal } from "@/components/Reveal";
import { SKILL_CATEGORIES } from "@/lib/skillsData";

export function SkillCategories() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {SKILL_CATEGORIES.map((cat, ci) => (
        <Reveal key={cat.title} delay={(ci % 2) * 80}>
          <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
            <h3 className="font-display text-lg font-semibold">
              <span className="text-gradient-ember">{cat.title}</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {cat.items.map((s) => (
                <span
                  key={s.name}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-sm text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary"
                >
                  <s.Icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: s.color }}
                  />
                  <span>{s.name}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
