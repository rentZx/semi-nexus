import {
  BookOpen,
  BrainCircuit,
  Building2,
  Cpu,
  GitBranch,
  GraduationCap,
  Home,
  Info,
  ListChecks,
  Menu,
  Route,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
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

export function AppLayout() {
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-400 transition",
                "hover:bg-cyan-300/10 hover:text-cyan-100",
                isActive && "bg-cyan-300/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.10)] ring-1 ring-cyan-300/25"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-slate-950/78 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-slate-50">
            <GraduationCap className="h-5 w-5 text-cyan-300" />
            半导体学习地图
          </NavLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-cyan-300/25 bg-slate-900 p-2 text-cyan-100"
            aria-label="打开导航"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? <div className="px-4 pb-4">{nav}</div> : null}
      </header>

      <aside className="fixed left-5 top-5 z-30 hidden h-[calc(100vh-2.5rem)] w-64 rounded-3xl border border-cyan-300/20 bg-slate-950/62 p-4 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl lg:block">
        <NavLink to="/" className="mb-6 flex items-center gap-3 px-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.24)]">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-50">半导体产业链</span>
            <span className="block text-xs text-cyan-200/75">未来驾驶舱 V1.0</span>
          </span>
        </NavLink>
        {nav}
      </aside>

      <main className="page-enter mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:ml-72 lg:px-10 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}
