"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Calendar, CornerDownLeft, FileText, Search, SunMoon } from "lucide-react";
import { projectsByRecency } from "@/lib/projects";
import { links } from "@/lib/profile";

interface Item {
  title: string;
  hint?: string;
  /** searched but not shown */
  keywords?: string;
  group: "Pages" | "Projects" | "Actions" | "Links";
  href?: string;
  external?: boolean;
  event?: string;
}

/** Ctrl/⌘ K, or the search button in the nav: jump to any page, project or link. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(
    () => [
      { title: "Home", group: "Pages", href: "/" },
      { title: "SaySpark — the venture", group: "Pages", href: "/#venture" },
      { title: "Work — all projects", group: "Pages", href: "/work" },
      { title: "Record — competitions and awards", group: "Pages", href: "/competitions" },
      { title: "About — the whole story", group: "Pages", href: "/about" },
      { title: "Experience", group: "Pages", href: "/about#experience" },
      { title: "Research", group: "Pages", href: "/about#research" },
      { title: "Community and mentoring", group: "Pages", href: "/about#community" },
      { title: "Timeline", group: "Pages", href: "/about#timeline" },
      { title: "Photos", group: "Pages", href: "/about#photos" },
      { title: "Contact", group: "Pages", href: "/#contact" },
      { title: "Book a call", group: "Actions", event: "open-call" },
      { title: "Switch light / dark theme", group: "Actions", event: "toggle-theme" },
      ...projectsByRecency.map<Item>((p) => ({
        title: p.title,
        hint: p.result ?? String(p.year),
        keywords: [p.cardBlurb, p.event, p.year, ...p.chips, ...p.stack].join(" "),
        group: "Projects",
        href: `/projects/${p.slug}`,
      })),
      { title: "sayspark.ca", group: "Links", href: links.sayspark, external: true },
      { title: "LinkedIn", group: "Links", href: links.linkedin, external: true },
      { title: "GitHub", group: "Links", href: links.github, external: true },
      { title: "Devpost", group: "Links", href: links.devpost, external: true },
      { title: "Email", group: "Links", href: links.email, external: true },
      { title: "Résumé (PDF)", group: "Links", href: links.resume, external: true },
    ],
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.group} ${i.title} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(s));
  }, [items, q]);

  const go = useCallback(
    (item: Item) => {
      setOpen(false);
      if (item.event) window.dispatchEvent(new Event(item.event));
      else if (item.external && item.href) window.open(item.href, "_blank", "noopener");
      else if (item.href) router.push(item.href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setSel(0);
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [sel]);

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

  if (!open) return null;

  return (
    <div
      className="fade fixed inset-0 z-[90] flex items-start justify-center bg-black/45 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface text-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} className="shrink-0 text-faint" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search projects, pages and links"
            aria-label="Search"
            className="h-14 w-full bg-transparent text-[15px] placeholder:text-faint focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">esc</kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted">
              Nothing matches “{q}”. Try “drone”, “battery” or “NASA”.
            </p>
          )}
          {filtered.map((item, i) => {
            const selected = i === sel;
            const firstOfGroup = i === 0 || filtered[i - 1].group !== item.group;
            const Icon = item.event === "open-call" ? Calendar : item.event ? SunMoon : item.external ? ArrowUpRight : FileText;
            return (
              <div key={item.group + item.title}>
                {firstOfGroup && (
                  <p className="px-4 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  data-selected={selected}
                  onClick={() => go(item)}
                  onMouseMove={() => setSel(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm ${
                    selected ? "bg-ink/[0.06]" : ""
                  }`}
                >
                  <Icon size={15} className="shrink-0 text-faint" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  {item.hint && <span className="shrink-0 text-xs text-faint">{item.hint}</span>}
                  {selected && <CornerDownLeft size={13} className="shrink-0 text-faint" aria-hidden />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
