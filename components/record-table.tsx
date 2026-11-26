"use client";

import { useMemo, useState } from "react";
import { Award, Search } from "lucide-react";
import { CATEGORY_LABELS, type Comp, type CompCategory } from "@/lib/competitions";
import { FilterPill } from "./ui";

const CATS: CompCategory[] = ["eng", "hack", "pitch"];

/** "2014–2019" sorts by its last year, then by its first. */
function sortKey(years: string): [number, number] {
  const ys = years.match(/\d{4}/g)!.map(Number);
  return [ys[ys.length - 1], ys[0]];
}

export function RecordTable({ comps }: { comps: Comp[] }) {
  const [cat, setCat] = useState<CompCategory | "all">("all");
  const [awardedOnly, setAwardedOnly] = useState(false);
  const [newestFirst, setNewestFirst] = useState(true);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const filtered = comps.filter(
      (c) =>
        (cat === "all" || c.cat === cat) &&
        (!awardedOnly || c.result) &&
        (!s || `${c.title} ${c.result ?? ""} ${c.detail ?? ""} ${c.location ?? ""} ${c.years}`.toLowerCase().includes(s))
    );
    return filtered.sort((a, b) => {
      const [ae, as] = sortKey(a.years);
      const [be, bs] = sortKey(b.years);
      const d = be - ae || bs - as;
      return newestFirst ? d : -d;
    });
  }, [comps, cat, awardedOnly, newestFirst, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          <FilterPill active={cat === "all"} onClick={() => setCat("all")} count={comps.length}>
            All
          </FilterPill>
          {CATS.map((c) => (
            <FilterPill
              key={c}
              active={cat === c}
              onClick={() => setCat(c)}
              count={comps.filter((x) => x.cat === c).length}
            >
              {CATEGORY_LABELS[c]}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-4 sm:justify-end">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted">
            <input
              type="checkbox"
              checked={awardedOnly}
              onChange={(e) => setAwardedOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            Awards and placements only
          </label>
          <label className="relative block w-full sm:w-56">
            <span className="sr-only">Search the record</span>
            <Search size={15} aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-full border border-line-strong bg-transparent pl-9 pr-4 text-sm placeholder:text-faint focus:border-ink focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint" aria-live="polite">
          {rows.length} {rows.length === 1 ? "entry" : "entries"}
        </p>
        <button
          type="button"
          onClick={() => setNewestFirst((v) => !v)}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
        >
          {newestFirst ? "Newest first" : "Oldest first"}
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="border-t border-line py-16 text-center text-muted">Nothing in the record matches.</p>
      ) : (
        <ul key={`${cat}-${awardedOnly}-${newestFirst}`} className="rise border-t border-line">
          {rows.map((c, i) => (
            <li
              key={c.title + c.years + i}
              className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[110px_1.3fr_1fr_110px]"
            >
              <p className="font-mono text-xs text-faint md:pt-1">{c.years}</p>
              <div>
                <h3 className="text-[17px] font-medium tracking-tight">{c.title}</h3>
                {c.detail && <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>}
              </div>
              <div className="text-sm md:pt-0.5">
                {c.result ? (
                  <p className="flex items-start gap-1.5 font-medium">
                    <Award size={14} aria-hidden className="mt-[3px] shrink-0 text-accent" />
                    {c.result}
                  </p>
                ) : (
                  <p className="text-faint">Competed</p>
                )}
                <p className="mt-0.5 text-xs text-faint md:hidden">{c.location}</p>
              </div>
              <p className="hidden text-sm text-muted md:block md:pt-0.5 md:text-right">{c.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
