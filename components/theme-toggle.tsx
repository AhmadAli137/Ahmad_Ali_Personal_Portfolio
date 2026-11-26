"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function toggleTheme() {
  const el = document.documentElement;
  const next = el.dataset.theme === "dark" ? "light" : "dark";
  el.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

/** The icon is chosen by CSS from <html data-theme>, so it is right before hydration. */
export function ThemeToggle() {
  useEffect(() => {
    window.addEventListener("toggle-theme", toggleTheme);
    return () => window.removeEventListener("toggle-theme", toggleTheme);
  }, []);

  return (
    <button
      type="button"
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <Moon size={17} className="dark:hidden" aria-hidden />
      <Sun size={17} className="hidden dark:block" aria-hidden />
    </button>
  );
}
