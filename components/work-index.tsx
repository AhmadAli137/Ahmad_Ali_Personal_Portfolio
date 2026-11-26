"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Play, Search } from "lucide-react";
import { DOMAIN_LABELS, type Domain } from "@/lib/projects";
import { FilterPill } from "./ui";

export interface WorkRow {
  slug: string;
  title: string;
  blurb: string;
  year: number;
  domain: Domain;
  event: string;
  result?: string;
  thumb?: string;
  playable: boolean;
  search: string;
}

const DOMAINS = Object.keys(DOMAIN_LABELS) as Domain[];

export function WorkIndex({ rows }: { rows: WorkRow[] }) {
  const [domain, setDomain] = useState<Domain | "all">("all");
  const [awardedOnly, setAwardedOnly] = useState(false);
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c = {} as Record<Domain, number>;
    for (const d of DOMAINS) c[d] = rows.filter((r) => r.domain === d).length;
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (domain === "all" || r.domain === domain) &&
        (!awardedOnly || r.result) &&
        (!s || r.search.includes(s))
    );
  }, [rows, domain, awardedOnly, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-line pb-6">
        <div className="flex flex-wrap gap-2">
          <FilterPill active={domain === "all"} onClick={() => setDomain("all")} count={rows.length}>
            All
          </FilterPill>
          {DOMAINS.map((d) => (
            <FilterPill key={d} active={domain === d} onClick={() => setDomain(d)} count={counts[d]}>
              {DOMAIN_LABELS[d]}
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
            Awarded only
          </label>
          <label className="relative block w-full sm:w-56">
            <span className="sr-only">Search projects</span>
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

      <p className="py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length === 0 ? (
        <p className="border-t border-line py-16 text-center text-muted">
          No projects match those filters.{" "}
          <button
            type="button"
            className="text-ink underline underline-offset-4"
            onClick={() => {
              setDomain("all");
              setAwardedOnly(false);
              setQ("");
            }}
          >
            Clear them
          </button>
        </p>
      ) : (
        <ul key={`${domain}-${awardedOnly}`} className="rise border-t border-line">
          {visible.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/projects/${r.slug}`}
                className="group grid grid-cols-[72px_1fr] items-center gap-x-5 gap-y-2 border-b border-line py-5 transition-colors hover:bg-ink/[0.025] md:grid-cols-[104px_1.5fr_1fr_56px_20px] md:gap-x-7"
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-md ${r.thumb ? "bg-ink/[0.05]" : ""}`}>
                  {r.thumb && (
                    <Image
                      src={r.thumb}
                      alt=""
                      fill
                      sizes="104px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium tracking-tight">
                    {r.title}
                    {r.playable && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                        <Play size={10} aria-hidden fill="currentColor" /> Live demo
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.blurb}</p>
                </div>
                <div className="col-start-2 text-sm md:col-start-auto">
                  {r.result && (
                    <p className="flex items-start gap-1.5 font-medium">
                      <Award size={14} aria-hidden className="mt-[3px] shrink-0 text-accent" />
                      {r.result}
                    </p>
                  )}
                  <p className={`text-muted ${r.result ? "mt-0.5" : ""}`}>{r.event}</p>
                </div>
                <p className="col-start-2 font-mono text-xs text-faint md:col-start-auto md:text-right">{r.year}</p>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="hidden text-faint transition-all group-hover:translate-x-1 group-hover:text-ink md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
