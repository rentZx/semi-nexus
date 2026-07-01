import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FloatingIconNav } from "../components/FloatingIconNav";

const mobileItems = [
  { to: "/", label: "首页" },
  { to: "/chain", label: "产业链地图" },
  { to: "/ai-computing", label: "AI算力" },
  { to: "/companies", label: "A股映射" },
  { to: "/glossary", label: "术语词典" },
  { to: "/learn", label: "学习路线" },
];

export function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      <FloatingIconNav />

      <header className="sticky top-0 z-40 border-b border-cyan-300/15 bg-slate-950/78 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <NavLink to="/" className="flex min-w-0 items-center gap-2 font-semibold text-slate-50">
            <GraduationCap className="h-5 w-5 shrink-0 text-cyan-300" />
            <span className="truncate">SemiNexus</span>
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
        {open ? (
          <nav className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
            {mobileItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                end={item.to === "/"}
                className="rounded-2xl border border-cyan-300/14 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-200"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="page-enter min-w-0 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-20 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}
