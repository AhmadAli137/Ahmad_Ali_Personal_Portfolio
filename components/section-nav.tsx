"use client";

import { useEffect, useState } from "react";

/** In-page contents for a long page; highlights the section currently in view. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setCurrent(visible[0].target.id);
      },
      /* a section is "current" while it crosses a band near the top of the viewport */
      { rootMargin: "-20% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">On this page</p>
      <ul className="flex gap-x-5 gap-y-2 overflow-x-auto lg:flex-col lg:gap-0">
        {items.map((i) => {
          const active = current === i.id;
          return (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                aria-current={active ? "location" : undefined}
                className={`block border-b-2 py-1.5 text-sm transition-colors lg:border-b-0 lg:border-l-2 lg:py-1.5 lg:pl-4 ${
                  active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink lg:border-line"
                }`}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
