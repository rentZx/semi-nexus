import { cn } from "../../utils/cn";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return <section className={cn("glass rounded-[1.65rem] p-5 sm:p-6", className)}>{children}</section>;
}
