import { cn } from "../../utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "violet" | "amber" | "blue" | "cyan" | "success" | "danger";
  active?: boolean;
  onClick?: () => void;
};

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-card-hover text-body border-line",
  accent: "bg-accent-soft text-accent border-accent/20",
  violet: "bg-violet-soft text-violet border-violet/20",
  amber: "bg-amber-soft text-amber border-amber/20",
  blue: "bg-blue-soft text-blue border-blue/20",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
  success: "bg-success-soft text-success border-success/20",
  danger: "bg-danger-soft text-danger border-danger/20",
};

export function Badge({ children, tone = "neutral", active, onClick }: BadgeProps) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex min-h-8 items-center rounded-lg border px-3 py-1 text-xs font-medium transition",
        toneClass[tone],
        active && "border-accent bg-accent text-accent-contrast",
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:shadow-card"
      )}
    >
      {children}
    </Component>
  );
}
