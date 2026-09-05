"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/#work", label: "work" },
  { href: "/venture", label: "venture" },
  { href: "/#awards", label: "awards" },
  { href: "/#experience", label: "experience" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-line bg-bg/82 shadow-[0_12px_40px_rgba(0,0,0,0.24)]" : "border-transparent bg-bg/35"
      }`}
    >
      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${scrolled ? "py-3" : "py-4"}`}>
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm font-bold"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan text-xs text-cyan shadow-[0_0_12px_rgba(0,229,255,0.35),inset_0_0_8px_rgba(0,229,255,0.12)]">
            AA
          </span>
          <span className="tracking-tight">ahmad.ali</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-link font-mono text-[13px] text-muted transition-colors hover:text-cyan"
            >
              <span className="text-line-strong">/</span>
              {l.label}
            </Link>
          ))}
          <a
            href="https://sayspark.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-mint/50 bg-mint/10 px-4 py-1.5 font-mono text-xs font-bold text-mint transition-all hover:-translate-y-0.5 hover:bg-mint/20 hover:shadow-[0_0_22px_rgba(52,245,162,0.22)]"
          >
            sayspark.ca ↗
          </a>
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <Command size={14} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-bg/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="py-2 font-mono text-sm text-muted hover:text-cyan"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-line-strong">/</span>
                  {l.label}
                </Link>
              ))}
              <a
                href="https://sayspark.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full border border-mint/50 bg-mint/10 px-4 py-2 text-center font-mono text-sm font-bold text-mint"
              >
                sayspark.ca ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
