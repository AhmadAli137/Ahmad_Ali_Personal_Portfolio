import type { Metadata } from "next";
import Image from "next/image";
import { Award, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Btn, Chip } from "@/components/ui";
import { comps, locations } from "@/lib/competitions";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "44 competitions across a decade — science fairs, hackathons, engineering challenges, conferences, and pitch competitions.",
};

/* ---- Logo wall ----
   Drop a logo file at public/img/logos/<logo>.{png,svg,jpg} and set `logo`
   on the entry to show it; tiles without a logo render a styled monogram. */
interface WallOrg {
  name: string;
  short: string;
  logo?: string;
}

const wall: WallOrg[] = [
  { name: "NASA Space Apps Challenge", short: "NASA", logo: "/img/logos/nasa-space-apps.png" },
  { name: "IEEE PIMRC", short: "IEEE" },
  { name: "IEEE EPEC", short: "EPEC" },
  { name: "Canada-Wide Science Fair", short: "CWSF", logo: "/img/logos/cwsf.jpg" },
  { name: "Formula SAE", short: "FSAE" },
  { name: "Jaguar Land Rover", short: "JLR" },
  { name: "WinHacks", short: "WH", logo: "/img/logos/winhacks.jpg" },
  { name: "BorderHacks", short: "BH", logo: "/img/logos/borderhacks.png" },
  { name: "Hack the 6ix", short: "HT6", logo: "/img/logos/hack-the-6ix.jpg" },
  { name: "MasseyHacks", short: "MH", logo: "/img/logos/masseyhacks.jpg" },
  { name: "ClubHacks", short: "CH", logo: "/img/logos/clubhacks.png" },
  { name: "Hack the Northeast", short: "HTNE", logo: "/img/logos/hack-the-northeast.png" },
  { name: "CS Games", short: "CSG", logo: "/img/logos/cs-games.jpg" },
  { name: "Windsor Engineering Competition", short: "WEC", logo: "/img/logos/wec.jpg" },
  { name: "Ontario Engineering Competition", short: "OEC", logo: "/img/logos/oec-2024.jpg" },
  { name: "Windsor Regional Science Fair", short: "WRSF", logo: "/img/logos/wrstef.png" },
  { name: "Let's Talk Science", short: "LTS", logo: "/img/logos/lets-talk-science.png" },
  { name: "EPICentre", short: "EPIC" },
  { name: "UWillDiscover", short: "UWD" },
  { name: "Take Your Shot", short: "TYS" },
  { name: "Bordercity Hackathon", short: "BC", logo: "/img/logos/bordercity.png" },
  { name: "University of Windsor", short: "UW" },
];

/* Full chronological record + locations shared with the homepage */

export default function CompetitionsPage() {
  return (
    <main className="px-6 pb-10 pt-36">
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
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {wall.map((o) => (
              <div
                key={o.name}
                title={o.name}
                className="group grid min-h-[110px] place-items-center rounded-xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 transition-all hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)]"
              >
                {o.logo ? (
                  <Image
                    src={o.logo}
                    alt={o.name}
                    width={120}
                    height={60}
                    className="max-h-[64px] w-auto rounded-md object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-center">
                    <div className="font-mono text-xl font-bold text-muted transition-colors group-hover:text-cyan">
                      {o.short}
                    </div>
                    <div className="mt-1 text-[10px] leading-tight text-muted/70">{o.name}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Full record */}
        <Reveal>
          <h2 className="mb-6 font-mono text-lg text-mint"><span className="text-muted">## </span>The Full Record</h2>
          <div className="relative pl-9 before:absolute before:bottom-1.5 before:left-2 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:to-mint before:opacity-35">
            {comps.map((c, i) => (
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

        <div className="flex flex-wrap gap-3.5 py-12">
          <Btn href="/hackathons">Hackathon Projects →</Btn>
          <Btn href="/#awards" variant="primary">← Back to Awards</Btn>
        </div>
      </div>
    </main>
  );
}
