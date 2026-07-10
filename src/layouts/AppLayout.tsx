import { GraduationCap, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/chain", label: "产业链" },
  { to: "/process", label: "制造流程" },
  { to: "/segments", label: "细分环节" },
  { to: "/companies", label: "A股映射" },
  { to: "/ai-computing", label: "AI算力" },
  { to: "/glossary", label: "术语" },
  { to: "/learn", label: "学习路线" },
  { to: "/quiz", label: "测验" },
  { to: "/about", label: "关于" },
];

function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-card text-muted transition hover:border-line-strong hover:text-heading"
      aria-label={resolved === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
    >
      {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-app/85 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          {/* Logo */}
          <NavLink to="/" className="flex shrink-0 items-center gap-2 font-semibold text-heading">
            <GraduationCap className="h-5 w-5 text-accent" />
            <span className="hidden sm:inline">SemiNexus</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-body hover:bg-card-hover hover:text-heading"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-muted transition hover:text-heading lg:hidden"
              aria-label="打开导航"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {open ? (
          <nav className="grid gap-1 border-t border-line px-4 py-3 sm:grid-cols-2 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-body hover:bg-card-hover"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      {/* Page content */}
      <main className="page-enter mx-auto min-w-0 max-w-[1400px] overflow-x-hidden px-4 py-6 sm:px-6 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}
