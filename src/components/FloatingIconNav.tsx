import {
  BookOpen,
  BrainCircuit,
  Building2,
  Cpu,
  GitBranch,
  Home,
  Info,
  ListChecks,
  Route,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/", label: "首页", icon: Home },
  { to: "/chain", label: "产业链地图", icon: GitBranch },
  { to: "/process", label: "制造流程", icon: Workflow },
  { to: "/segments", label: "细分环节", icon: Cpu },
  { to: "/companies", label: "A股映射", icon: Building2 },
  { to: "/ai-computing", label: "AI算力", icon: BrainCircuit },
  { to: "/glossary", label: "术语词典", icon: BookOpen },
  { to: "/learn", label: "学习路线", icon: Route },
  { to: "/quiz", label: "小测验", icon: ListChecks },
  { to: "/about", label: "关于", icon: Info },
];

export function FloatingIconNav() {
  return (
    <nav className="fixed left-3 top-1/2 z-50 hidden w-16 -translate-y-1/2 rounded-3xl border border-cyan-300/18 bg-slate-950/68 p-2 shadow-[0_0_36px_rgba(34,211,238,0.08)] backdrop-blur-xl lg:block">
      <div className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              aria-label={item.label}
              className={({ isActive }) =>
                cn(
                  "group relative grid h-11 w-11 place-items-center rounded-2xl text-slate-400 transition",
                  "hover:bg-cyan-300/12 hover:text-cyan-100",
                  isActive && "bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.24)]"
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute left-[3.25rem] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-cyan-300/18 bg-slate-950/92 px-3 py-2 text-xs font-medium text-cyan-50 opacity-0 shadow-xl backdrop-blur-xl transition group-hover:translate-x-1 group-hover:opacity-100">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
