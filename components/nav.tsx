"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { BookCallButton } from "./book-call";
import { ThemeToggle } from "./theme-toggle";

const items = [
  { href: "/#venture", label: "Venture", match: null },
  { href: "/work", label: "Work", match: ["/work", "/projects"] },
  { href: "/competitions", label: "Record", match: ["/competitions"] },
  { href: "/about", label: "About", match: ["/about"] },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (match: string[] | null) =>
    Boolean(match?.some((m) => pathname === m || pathname.startsWith(m + "/")));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
          Ahmad Ali
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((l) => {
            const active = isActive(l.match);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search the site"
            title="Search (Ctrl K)"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <Search size={17} aria-hidden />
          </button>
          <ThemeToggle />
          <div className="ml-2 hidden sm:block">
            <BookCallButton />
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fade border-t border-line md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {items.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-lg"
              >
                {l.label}
              </Link>
            ))}
            <BookCallButton className="mt-5 w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
