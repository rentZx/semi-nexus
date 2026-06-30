import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)] hover:bg-cyan-200",
  secondary: "bg-slate-900/76 text-slate-100 ring-1 ring-cyan-300/25 hover:bg-slate-800/90 hover:ring-cyan-300/55",
  ghost: "bg-transparent text-cyan-100 hover:bg-cyan-300/10",
};

export function Button({ children, to, onClick, variant = "primary", icon, type = "button" }: ButtonProps) {
  const className = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
    variants[variant]
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {icon}
      {children}
    </button>
  );
}
