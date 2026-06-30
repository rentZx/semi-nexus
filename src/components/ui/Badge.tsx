import { cn } from "../../utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "cyan" | "violet" | "amber" | "slate";
  active?: boolean;
  onClick?: () => void;
};

const toneClass = {
  blue: "bg-sky-400/10 text-sky-200 ring-sky-400/35 shadow-[0_0_16px_rgba(56,189,248,0.12)]",
  cyan: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/35 shadow-[0_0_16px_rgba(34,211,238,0.12)]",
  violet: "bg-violet-400/10 text-violet-200 ring-violet-400/35 shadow-[0_0_16px_rgba(139,92,246,0.12)]",
  amber: "bg-amber-400/10 text-amber-200 ring-amber-400/35 shadow-[0_0_16px_rgba(245,158,11,0.12)]",
  slate: "bg-slate-900/70 text-slate-200 ring-slate-700/70",
};

export function Badge({ children, tone = "slate", active, onClick }: BadgeProps) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition",
        toneClass[tone],
        active && "bg-cyan-300 text-slate-950 ring-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.26)]",
        onClick && "hover:-translate-y-0.5 hover:ring-cyan-300/70"
      )}
    >
      {children}
    </Component>
  );
}
