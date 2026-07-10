import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-accent text-accent-contrast hover:bg-accent-hover hover:shadow-card-hover focus-visible:outline-accent",
  secondary:
    "bg-card text-heading border border-line hover:border-line-strong hover:bg-card-hover focus-visible:outline-accent",
  ghost:
    "bg-transparent text-accent hover:bg-accent-soft focus-visible:outline-accent",
};

export function Button({ children, to, onClick, variant = "primary", icon, type = "button", className }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
