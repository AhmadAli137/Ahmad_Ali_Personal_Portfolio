"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { threads, timeline, type ThreadId } from "@/lib/profile";
import { FilterPill } from "./ui";

const labelOf = Object.fromEntries(threads.map((t) => [t.id, t.label])) as Record<ThreadId, string>;

/** The path so far. Filter by thread to follow one side of the story through the years. */
export function Timeline() {
  const [thread, setThread] = useState<ThreadId | "all">("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const groups = useMemo(() => {
    const shown = timeline.filter((m) => thread === "all" || m.thread === thread);
    const byYear = new Map<string, typeof shown>();
    for (const m of shown) byYear.set(m.year, [...(byYear.get(m.year) ?? []), m]);
    const entries = [...byYear.entries()];
    return newestFirst ? entries.reverse() : entries;
  }, [thread, newestFirst]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          <FilterPill active={thread === "all"} onClick={() => setThread("all")}>
            Everything
          </FilterPill>
          {threads.map((t) => (
            <FilterPill key={t.id} active={thread === t.id} onClick={() => setThread(t.id)}>
              {t.label}
            </FilterPill>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setNewestFirst((v) => !v)}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
        >
          {newestFirst ? "Newest first" : "Oldest first"}
        </button>
      </div>

      <ol key={`${thread}-${newestFirst}`} className="rise">
        {groups.map(([year, moments]) => (
          <li key={year} className="grid gap-x-10 border-b border-line py-7 sm:grid-cols-[88px_1fr]">
            <p className="mb-3 text-2xl font-medium tracking-tight text-faint sm:mb-0">{year}</p>
            <div className="space-y-6">
              {moments.map((m) => (
                <div key={m.title}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{labelOf[m.thread]}</p>
                  <h3 className="mt-1.5 text-[17px] font-medium tracking-tight">
                    {m.href ? (
                      <Link href={m.href} className="group inline-flex items-center gap-2 hover:underline hover:underline-offset-4">
                        {m.title}
                        <ArrowRight size={15} aria-hidden className="text-faint transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      m.title
                    )}
                  </h3>
                  <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">{m.detail}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
