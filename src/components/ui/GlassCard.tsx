import { cn } from "../../utils/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export function GlassCard({ children, className, interactive = false }: GlassCardProps) {
  return (
    <section className={cn(interactive ? "surface-interactive" : "surface", "p-5 sm:p-6", className)}>
      {children}
    </section>
  );
}
