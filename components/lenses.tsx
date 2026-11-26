"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { lenses } from "@/lib/profile";
import { TextLink } from "./ui";

/** Five sides of one person: pick one and the evidence for it appears. */
export function Lenses() {
  const [active, setActive] = useState(0);
  const lens = lenses[active];

  const onKey = (e: React.KeyboardEvent) => {
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    const back = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (!fwd && !back) return;
    e.preventDefault();
    const next = (active + (fwd ? 1 : lenses.length - 1)) % lenses.length;
    setActive(next);
    document.getElementById(`lens-tab-${lenses[next].id}`)?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
      <div
        role="tablist"
        aria-label="Sides"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line"
      >
        {lenses.map((l, i) => {
          const selected = i === active;
          return (
            <button
              key={l.id}
              id={`lens-tab-${l.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="lens-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-baseline gap-4 rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-line lg:px-0 lg:py-4 ${
                selected
                  ? "border-ink bg-ink text-bg lg:bg-transparent lg:text-ink"
                  : "border-line-strong text-muted hover:text-ink"
              }`}
            >
              <span className={`hidden font-mono text-[11px] lg:inline ${selected ? "text-accent" : "text-faint"}`}>
                0{i + 1}
              </span>
              <span className="text-[15px] lg:text-xl lg:tracking-tight">{l.label}</span>
            </button>
          );
        })}
      </div>

      <div
        key={lens.id}
        id="lens-panel"
        role="tabpanel"
        aria-labelledby={`lens-tab-${lens.id}`}
        className="rise grid gap-10 md:grid-cols-[1fr_0.72fr] md:gap-12"
      >
        <div>
          <h3 className="text-2xl font-medium leading-[1.15] tracking-tight sm:text-[2rem]">{lens.title}</h3>
          <p className="mt-5 text-lg leading-relaxed text-muted">{lens.body}</p>

          <ul className="mt-8 border-t border-line">
            {lens.proof.map((p) => {
              const inner = (
                <>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium leading-snug">{p.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{p.detail}</span>
                  </span>
                  {p.href &&
                    (p.external ? (
                      <ArrowUpRight size={16} aria-hidden className="mt-0.5 shrink-0 text-faint transition-colors group-hover:text-ink" />
                    ) : (
                      <ArrowRight size={16} aria-hidden className="mt-0.5 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-ink" />
                    ))}
                </>
              );
              const cls = "group flex items-start justify-between gap-6 border-b border-line py-4";
              return (
                <li key={p.title}>
                  {!p.href ? (
                    <div className={cls}>{inner}</div>
                  ) : p.external ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={p.href} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-7">
            <TextLink href={lens.more.href}>{lens.more.label}</TextLink>
          </div>
        </div>

        <figure className="md:pt-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink/5">
            <Image
              src={lens.image.src}
              alt={lens.image.alt}
              fill
              sizes="(max-width: 768px) 90vw, 360px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs text-faint">{lens.image.caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
