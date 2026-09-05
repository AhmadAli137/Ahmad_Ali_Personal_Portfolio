import type { Metadata } from "next";
import { Award, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LogoWall } from "@/components/logo-wall";
import { Btn, Chip } from "@/components/ui";
import { CATEGORY_LABELS, comps, locations, type CompCategory } from "@/lib/competitions";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "44 competitions across a decade — science fairs, hackathons, engineering challenges, conferences, and pitch competitions.",
};

/* Wall, record, and locations all live in lib/competitions.ts (shared with the homepage) */

export default function CompetitionsPage() {
  return (
    <main className="px-6 pb-10 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">home / competitions</p>
        <div className="mb-4"><Chip>44 COMPETITIONS — 2014 → NOW</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">
          A Decade of Showing Up
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted">
          Science fairs, hackathons, engineering challenges, conferences, and pitch competitions —
          44 events and counting. Wins are great; the reps are the real prize.
        </p>

        {/* Locations unlocked */}
        <div className="mb-14">
          <h2 className="mb-3.5 font-mono text-sm text-cyan">
            <span className="text-muted">[ </span>locations unlocked<span className="text-muted"> ]</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {locations.map((l) => (
              <span key={l} className="flex items-center gap-1.5 rounded-full border border-line-strong bg-cyan/5 px-3.5 py-1.5 font-mono text-xs text-cyan">
                <MapPin size={12} /> {l}
              </span>
            ))}
          </div>
        </div>

        {/* Competition wall */}
        <Reveal className="mb-16">
          <h2 className="mb-5 font-mono text-lg text-mint"><span className="text-muted">## </span>The Wall</h2>
          <LogoWall />
        </Reveal>

        {/* Full record, by arena */}
        {(["eng", "hack", "pitch"] as CompCategory[]).map((cat) => (
          <Reveal key={cat} className="mb-12">
            <h2 className="mb-6 font-mono text-lg text-mint">
              <span className="text-muted">## </span>
              {CATEGORY_LABELS[cat]}
              <span className="ml-3 font-mono text-xs text-muted">
                {comps.filter((c) => c.cat === cat).length} entries
              </span>
            </h2>
            <div className="relative pl-9 before:absolute before:bottom-1.5 before:left-2 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:to-mint before:opacity-35">
              {comps
                .filter((c) => c.cat === cat)
                .map((c, i) => (
                  <div key={c.title + c.years + i} className="relative pb-7 last:pb-0">
                    <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[13px] text-cyan">{c.years}</span>
                      <h3 className="text-base font-bold">{c.title}</h3>
                      {c.location && (
                        <span className="font-mono text-[11px] text-muted">// {c.location}</span>
                      )}
                    </div>
                    {c.result && (
                      <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-amber">
                        <Award size={12} /> {c.result}
                      </div>
                    )}
                    {c.detail && <p className="mt-0.5 max-w-xl text-sm text-muted">{c.detail}</p>}
                  </div>
                ))}
            </div>
          </Reveal>
        ))}

        <div className="flex flex-wrap gap-3.5 py-12">
          <Btn href="/hackathons">Hackathon Projects →</Btn>
          <Btn href="/#awards" variant="primary">← Back to Awards</Btn>
        </div>
      </div>
    </main>
  );
}
