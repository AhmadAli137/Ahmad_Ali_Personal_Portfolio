"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Award, Cpu, ExternalLink, Gamepad2, Hash, Search } from "lucide-react";
import { projects } from "@/lib/projects";

interface Item {
  title: string;
  group: string;
  href: string;
  external?: boolean;
  icon: "hash" | "cpu" | "award" | "game" | "ext";
}

const ICONS = { hash: Hash, cpu: Cpu, award: Award, game: Gamepad2, ext: ExternalLink };

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const konamiRef = useRef(0);

  const items = useMemo<Item[]>(() => {
    const sections: Item[] = [
      { title: "Work / Projects", group: "Go to", href: "/#work", icon: "hash" },
      { title: "SaySpark — The Venture", group: "Go to", href: "/venture", icon: "hash" },
      { title: "About", group: "Go to", href: "/#about", icon: "hash" },
      { title: "Experience", group: "Go to", href: "/#experience", icon: "hash" },
      { title: "Awards & The Wall", group: "Go to", href: "/#awards", icon: "award" },
      { title: "Community & Mentorship", group: "Go to", href: "/#community", icon: "hash" },
      { title: "Timeline", group: "Go to", href: "/#timeline", icon: "hash" },
      { title: "Skills", group: "Go to", href: "/#skills", icon: "hash" },
      { title: "Contact", group: "Go to", href: "/#contact", icon: "hash" },
      { title: "Competitions — Full Record", group: "Go to", href: "/competitions", icon: "award" },
      { title: "Hackathons", group: "Go to", href: "/hackathons", icon: "hash" },
    ];
    const projectItems: Item[] = projects.map((p) => ({
      title: p.title,
      group: "Projects",
      href: `/projects/${p.slug}`,
      icon: p.demoUrl ? "game" : "cpu",
    }));
    const external: Item[] = [
      { title: "✦ Psst — something is hidden on this site", group: "Secret", href: "#hint", icon: "game" },
      { title: "sayspark.ca ↗", group: "Links", href: "https://sayspark.ca", external: true, icon: "ext" },
      { title: "GitHub ↗", group: "Links", href: "https://github.com/AhmadAli137", external: true, icon: "ext" },
      { title: "LinkedIn ↗", group: "Links", href: "https://www.linkedin.com/in/ahmad-a-658008170/", external: true, icon: "ext" },
      { title: "Devpost ↗", group: "Links", href: "https://devpost.com/AhmadAli137", external: true, icon: "ext" },
      { title: "Email Ahmad ↗", group: "Links", href: "mailto:ahmad100307@gmail.com", external: true, icon: "ext" },
    ];
    return [...sections, ...projectItems, ...external];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.group} ${i.title}`.toLowerCase().includes(s));
  }, [items, q]);

  const go = useCallback(
    (item: Item) => {
      setOpen(false);
      if (item.href === "#hint") {
        window.dispatchEvent(new Event("spark-hint"));
        return;
      }
      if (item.external) window.open(item.href, "_blank", "noopener");
      else router.push(item.href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);

      /* ↑↑↓↓←→←→BA — a fitting way to launch a game */
      const expected = KONAMI[konamiRef.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        konamiRef.current += 1;
        if (konamiRef.current === KONAMI.length) {
          konamiRef.current = 0;
          router.push("/projects/grand-theft-calculus");
        }
      } else {
        konamiRef.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [router]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[sel]) {
      go(filtered[sel]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] grid place-items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(0,229,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Jump to a project, section, or link…"
                className="w-full bg-transparent font-mono text-sm text-ink placeholder-muted outline-none"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-xs text-muted">no matches — try “drone” or “sayspark”</p>
              )}
              {filtered.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <button
                    key={item.group + item.title}
                    onClick={() => go(item)}
                    onMouseEnter={() => setSel(i)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === sel ? "bg-cyan/10 text-ink" : "text-muted"
                    }`}
                  >
                    <Icon size={14} className={i === sel ? "text-cyan" : "text-muted"} />
                    <span className="flex-1 text-sm">{item.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">{item.group}</span>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
              ↑↓ navigate · ↵ open · psst: ↑↑↓↓←→←→BA
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
