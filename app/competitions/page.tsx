import type { Metadata } from "next";
import Image from "next/image";
import { Award, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Btn, Chip } from "@/components/ui";

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
  { name: "NASA Space Apps Challenge", short: "NASA" },
  { name: "IEEE PIMRC", short: "IEEE" },
  { name: "IEEE EPEC", short: "EPEC" },
  { name: "Canada-Wide Science Fair", short: "CWSF" },
  { name: "Formula SAE", short: "FSAE" },
  { name: "Jaguar Land Rover", short: "JLR" },
  { name: "WinHacks", short: "WH" },
  { name: "BorderHacks", short: "BH" },
  { name: "Hack the 6ix", short: "HT6" },
  { name: "MasseyHacks", short: "MH" },
  { name: "ClubHacks", short: "CH" },
  { name: "Hack the Northeast", short: "HTNE" },
  { name: "CS Games", short: "CSG" },
  { name: "Windsor Engineering Competition", short: "WEC" },
  { name: "Ontario Engineering Competition", short: "OEC" },
  { name: "Windsor Regional Science Fair", short: "WRSF" },
  { name: "Let's Talk Science", short: "LTS" },
  { name: "EPICentre", short: "EPIC" },
  { name: "UWillDiscover", short: "UWD" },
  { name: "Take Your Shot", short: "TYS" },
  { name: "Bordercity Hackathon", short: "BC" },
  { name: "University of Windsor", short: "UW" },
];

/* ---- Full chronological record ---- */
interface Comp {
  years: string;
  title: string;
  result?: string;
  detail?: string;
  location?: string;
}

const comps: Comp[] = [
  { years: "2014–2019", title: "Windsor Regional Science Fair", result: "6× Gold + sponsor awards", detail: "Six years of projects, six gold medals — where it all started.", location: "Windsor" },
  { years: "2015", title: "Let's Talk Science Windsor Competition", result: "1st Place", location: "Windsor" },
  { years: "2015–2019", title: "Canada-Wide Science Fair", result: "2× Bronze · Silver · $10k UOttawa Scholarship", detail: "Four national finals appearances (2015, 2016, 2018, 2019).", location: "National" },
  { years: "2017", title: "Bordercity Hackathon", result: "1st Place", detail: "WeatherPy — first hackathon, first win.", location: "Windsor" },
  { years: "2018", title: "Bordercity Hackathon", detail: "Virtual Connect 4 app.", location: "Windsor" },
  { years: "2018", title: "MasseyHacks", detail: "Hand-motion-controlled FPS zombie game.", location: "Windsor" },
  { years: "2018", title: "STEM Entrepreneurship Bootcamp", result: "People's Choice Winner", location: "Windsor" },
  { years: "2019", title: "Windsor Engineering Competition", detail: "Junior engineering challenge — wind turbine build.", location: "Windsor" },
  { years: "2020", title: "Hack the Northeast", detail: "Covid-19 Global — worldwide statistics desktop app.", location: "Virtual" },
  { years: "2020", title: "BorderHacks", detail: "Exponent Base e Calculator (the Sarker Game that almost was).", location: "Virtual" },
  { years: "2020–2023", title: "WEC Programming Challenge", result: "4× 1st Place", detail: "Four consecutive years at the top of the programming category.", location: "Windsor" },
  { years: "2020–2024", title: "Ontario Engineering Competition", detail: "Four appearances representing Windsor.", location: "Ontario" },
  { years: "2021", title: "BorderHacks", result: "2nd Overall + 1st Sponsor Challenge", detail: "WinParks — exploring Windsor's parks and trails.", location: "Virtual" },
  { years: "2022", title: "BorderHacks", detail: "WinGrid — keeping EVs on the grid.", location: "Virtual" },
  { years: "2023", title: "NASA Space Apps Challenge", result: "3rd Place", detail: "Comfire.", location: "Windsor" },
  { years: "2023", title: "IEEE PIMRC International Conference", result: "Best Demo Award", detail: "Indoor autonomous drone navigation — capstone project.", location: "Toronto" },
  { years: "2023", title: "EPICentre Entrepreneurship Excellence Awards", result: "Innovation Mastery Award + $1,000", location: "Windsor" },
  { years: "2024", title: "UWillDiscover Conference", result: "3rd Place — Oral Presentation", location: "Windsor" },
  { years: "2024", title: "Formula SAE", detail: "Accumulator (battery pack) team.", location: "Michigan" },
  { years: "2024", title: "WinHacks", result: "2nd Place Overall", detail: "Second Life — EV battery reuse platform.", location: "Windsor" },
  { years: "2025", title: "WinHacks", result: "2nd Overall + 1st in Category", detail: "PresentPro — AI presentation coach with haptic wearable.", location: "Windsor" },
  { years: "2025", title: "IEEE EPEC Conference", result: "Poster Presenter", detail: "Dual-chemistry load distribution for EV battery systems.", location: "Waterloo" },
  { years: "2025", title: "NASA Space Apps Challenge", result: "1st Place + Global Nomination", detail: "Meteor Madness.", location: "Windsor" },
  { years: "2025", title: "UWindsor × Jaguar Land Rover Automotive AI Competition", result: "$600 + 1-week JLR internship", detail: "Automotive AI memory optimization.", location: "Windsor" },
  { years: "2026", title: "WinHacks", result: "Finalist", detail: "SketchBot V1 — the drawing robot.", location: "Windsor" },
  { years: "2026", title: "UWindsor Automotive UI/UX Challenge", result: "1st Place", detail: "RV interface challenge.", location: "Windsor" },
  { years: "2026", title: "ClubHacks", detail: "SketchBot V2 — AprilTag camera-vision tracking.", location: "Windsor" },
  { years: "2026", title: "CS Games", detail: "Team mentor for the UWindsor delegation.", location: "Montreal" },
  { years: "2026", title: "Take Your Shot Pitch Competition", result: "4th Place — $2,500", location: "Leamington" },
  { years: "2026", title: "Hack the 6ix", detail: "Edge Pong — spatial-haptics smart paddle.", location: "Toronto" },
];

const locations = [
  "Windsor", "Toronto", "Ottawa", "New Brunswick", "Kingston", "London",
  "Leamington", "Quebec", "Michigan", "Waterloo",
];

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
                className="group grid min-h-[110px] place-items-center rounded-xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 transition-all hover:-translate-y-1 hover:border-line-strong"
              >
                {o.logo ? (
                  <Image
                    src={o.logo}
                    alt={o.name}
                    width={120}
                    height={60}
                    className="max-h-[56px] w-auto object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
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
