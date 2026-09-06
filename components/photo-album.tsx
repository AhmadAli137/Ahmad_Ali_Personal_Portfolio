"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A photo album lying open on the desk: two cream pages per spread, photos
 * held down with tape, captions handwritten underneath. It turns its own
 * pages while on screen (pausing for hover/focus and manual browsing);
 * arrows or ←/→ turn them by hand. Holds the complete collection.
 */

interface Snap {
  src: string;
  alt: string;
  caption: string;
  note?: string;
}

const SNAPS: Snap[] = [
  // ---- the science-fair years ----
  { src: "/img/cwsf-2016-departure.jpg", alt: "Team Windsor at the airport with the CWSF sign", caption: "Off to nationals for the first time", note: "CWSF · 2016" },
  { src: "/img/cwsf-2016-welcome.jpg", alt: "The team at the CWSF welcome banner", caption: "Team Windsor arrives at McGill", note: "CWSF · 2016" },
  { src: "/img/cwsf-2016-jackets.jpg", alt: "Team Ontario jackets at CWSF 2016", caption: "Team Ontario, worn proudly", note: "CWSF · 2016" },
  { src: "/img/cwsf-2016-board.jpg", alt: "Ahmad beside his plant microbial fuel cell board", caption: "Power Plants of the Future — the fuel-cell board", note: "CWSF · 2016" },
  { src: "/img/cwsf-medal-stage.jpg", alt: "Medals on the CWSF ceremony stage", caption: "On the medal stage", note: "CWSF · 2016" },
  { src: "/img/cwsf-2018-minister.jpg", alt: "Demoing the SignSMART glove to the federal Science Minister", caption: "Demoing SignSMART to the Science Minister", note: "CWSF · 2018" },
  { src: "/img/cwsf-red-carpet.jpg", alt: "Team Windsor posed on the red carpet at CWSF", caption: "Team Windsor on the red carpet", note: "CWSF · 2018" },
  { src: "/img/cwsf-2018-boa.jpg", alt: "Ahmad with a boa constrictor at a CWSF exhibitor booth", caption: "Made a friend at the fair", note: "CWSF · 2018" },
  { src: "/img/stem-bootcamp-golden-ticket.jpg", alt: "Receiving a golden ticket at CWSF with the SignSmart glove", caption: "The golden ticket — glove in hand", note: "CWSF · 2018" },
  { src: "/img/stem-bootcamp-lassonde.jpg", alt: "The bootcamp cohort at York's Lassonde building", caption: "The bootcamp cohort — first taste of entrepreneurship", note: "Lassonde × Youth Science Canada · 2018" },
  { src: "/img/stem-bootcamp-trophy.jpg", alt: "The STEM Entrepreneurship Bootcamp People's Choice trophy", caption: "People's Choice", note: "Bootcamp · 2018" },
  { src: "/img/cwsf-2019-booth.jpg", alt: "Ahmad at his CWSF 2019 booth wearing the SignSMART glove", caption: "SignSMART V.2 — booth 060306", note: "CWSF Fredericton · 2019" },
  { src: "/img/cwsf-2019-glove-booth.jpg", alt: "The SignSMART V.2 booth with the glove on its display stand", caption: "The glove on its stand, LEDs on", note: "CWSF · 2019" },
  { src: "/img/cwsf-medals-2019.jpg", alt: "Wearing the 2019 Fredericton bronze medals with a teammate", caption: "Bronze at nationals — twice over", note: "CWSF · 2019" },
  // ---- undergrad: competitions & builds ----
  { src: "/img/wec-1st-place.jpg", alt: "First place in programming at the Windsor Engineering Competition", caption: "First of four straight programming titles", note: "WEC · 2020–23" },
  { src: "/img/covid-a.png", alt: "Covid-19 Global desktop app", caption: "Building through the strange years", note: "Hack the Northeast · 2020" },
  { src: "/img/gtc-title.png", alt: "Grand Theft Calculus title screen", caption: "Grand Theft Calculus — yes, really", note: "undergrad" },
  { src: "/img/gtc-play.png", alt: "Grand Theft Calculus gameplay", caption: "Outrun the integrals", note: "undergrad" },
  { src: "/img/gtc-caught.png", alt: "Grand Theft Calculus caught screen", caption: "…caught by the calculus", note: "undergrad" },
  { src: "/img/winparks-a.jpg", alt: "WinParks mobile app", caption: "WinParks — People's Choice", note: "BorderHacks · 2021" },
  { src: "/img/wingrid-a.jpg", alt: "WinGrid EV charging app", caption: "WinGrid — keeping EVs on the grid", note: "WinHacks · 2022" },
  { src: "/img/formula-electric-team.jpg", alt: "The Formula SAE electric team", caption: "Formula SAE — accumulator team days", note: "UWindsor" },
  { src: "/img/capstone-drone-team.jpg", alt: "The capstone autonomous drone team", caption: "The capstone crew", note: "2023" },
  { src: "/img/pimrc-best-demo-award.jpg", alt: "IEEE PIMRC Best Demo award", caption: "Best Demo — the drone flies itself to a title", note: "IEEE PIMRC Toronto · 2023" },
  { src: "/img/epicentre-award-stage.jpg", alt: "On stage receiving the EPICentre award", caption: "On stage at EPICentre", note: "2023" },
  { src: "/img/epicentre-award-trophy.jpg", alt: "The Innovation Mastery trophy", caption: "Innovation Mastery, up close", note: "EPICentre · 2023" },
  { src: "/img/founder.jpg", alt: "Ahmad holding the EPICentre Innovation Mastery Award", caption: "The Innovation Mastery Award", note: "EPICentre · 2023" },
  // ---- 2024 ----
  { src: "/img/secondlife-award.jpg", alt: "Second Life team receiving 2nd overall at WinHacks", caption: "Second Life — 2nd overall", note: "WinHacks · 2024" },
  { src: "/img/secondlife-a.png", alt: "Second Life platform screenshot", caption: "EV batteries, given a second life", note: "WinHacks · 2024" },
  { src: "/img/secondlife-b.png", alt: "Second Life battery marketplace", caption: "The battery marketplace", note: "WinHacks · 2024" },
  { src: "/img/secondlife-c.png", alt: "Second Life microgrid view", caption: "Microgrids from retired packs", note: "WinHacks · 2024" },
  { src: "/img/iron-ring-ceremony.jpg", alt: "Receiving the Iron Ring", caption: "The Iron Ring — an engineer's promise", note: "2024" },
  { src: "/img/iron-ring-classmates.jpg", alt: "With classmates at the Iron Ring ceremony", caption: "Ringed, with the classmates who earned it too", note: "2024" },
  { src: "/img/undergrad-graduation.jpg", alt: "Graduation day at the University of Windsor", caption: "BASc, done. Next: everything else", note: "Windsor · 2024" },
  { src: "/img/charge-lab-ev-rnd.jpg", alt: "EV powertrain test rig at the CHARGE Lab", caption: "Late nights on the powertrain rig", note: "CHARGE Lab" },
  { src: "/img/charge-lab-battery.jpg", alt: "Battery bench at the CHARGE Lab", caption: "Packs, BMS, firmware", note: "CHARGE Lab" },
  { src: "/img/charge-lab-magna-team.jpg", alt: "The Magna project team", caption: "The Magna project team", note: "CHARGE Lab" },
  { src: "/img/oec-2024-delegation.jpg", alt: "The Ontario Engineering Competition delegation", caption: "The OEC delegation", note: "2024" },
  // ---- 2025 ----
  { src: "/img/presentpro-award-1.jpg", alt: "PresentPro winning at WinHacks 2025", caption: "PresentPro — 2nd overall, 1st in category", note: "WinHacks · 2025" },
  { src: "/img/presentpro-award-2.jpg", alt: "PresentPro team at the awards", caption: "The PresentPro crew", note: "WinHacks · 2025" },
  { src: "/img/presentpro-award-3.jpg", alt: "PresentPro award moment", caption: "Category winners", note: "WinHacks · 2025" },
  { src: "/img/presentpro-award-4.jpg", alt: "PresentPro award ceremony", caption: "Taking the stage", note: "WinHacks · 2025" },
  { src: "/img/presentpro-a.jpg", alt: "The PresentPro IoT wearable", caption: "The haptic wearable itself", note: "PresentPro" },
  { src: "/img/presentpro-b.png", alt: "PresentPro live analysis screen", caption: "Live speech coaching", note: "PresentPro" },
  { src: "/img/presentpro-c.png", alt: "PresentPro dashboard", caption: "The pacing dashboard", note: "PresentPro" },
  { src: "/img/nasa-space-apps-1.jpg", alt: "First place at NASA Space Apps Windsor", caption: "NASA Space Apps — 1st place + global nomination", note: "2025" },
  { src: "/img/nasa-space-apps-2.jpg", alt: "Celebrating the NASA Space Apps win", caption: "We won Windsor… then the nomination came in", note: "NASA Space Apps · 2025" },
  { src: "/img/nasa-space-apps-3.jpg", alt: "The Meteor Madness team at work", caption: "Meteor Madness, mid-build", note: "NASA Space Apps · 2025" },
  { src: "/img/nasa-space-apps-4.jpg", alt: "Demoing Meteor Madness", caption: "The demo", note: "NASA Space Apps · 2025" },
  { src: "/img/nasa-space-apps-5.jpg", alt: "The team with certificates", caption: "Certificates all around", note: "NASA Space Apps · 2025" },
  { src: "/img/jlr-team-1.jpg", alt: "The JLR AI competition team", caption: "The JLR AI competition → an internship", note: "2025" },
  { src: "/img/jlr-team-2.jpg", alt: "JLR competition presentation", caption: "Automotive AI, presented", note: "JLR · 2025" },
  { src: "/img/ieee-epec-poster.jpg", alt: "Presenting battery research at IEEE EPEC", caption: "Presenting the dual-chemistry work", note: "IEEE EPEC Waterloo · 2025" },
  // ---- 2026: hardware year ----
  { src: "/img/sketchbot-v1-a.png", alt: "SketchBot V1 prototype", caption: "SketchBot V1 — where it started", note: "2026" },
  { src: "/img/sketchbot-v1-b.png", alt: "SketchBot V1 in progress", caption: "First lines on paper", note: "SketchBot V1" },
  { src: "/img/sketchbot-v1-c.png", alt: "SketchBot V1 drawing", caption: "The plotter finds its pen", note: "SketchBot V1" },
  { src: "/img/sketchbot-a.jpg", alt: "SketchBot drawing robot", caption: "SketchBot, marker down", note: "WinHacks · 2026" },
  { src: "/img/sketchbot-b.jpg", alt: "SketchBot mechanism", caption: "The drawing mechanism", note: "SketchBot" },
  { src: "/img/sketchbot-c.jpg", alt: "SketchBot output", caption: "Robot-drawn", note: "SketchBot" },
  { src: "/img/sketchbot-d.png", alt: "SketchBot software view", caption: "Pixels in…", note: "SketchBot" },
  { src: "/img/sketchbot-e.png", alt: "SketchBot camera tracking", caption: "…camera vision watching", note: "SketchBot" },
  { src: "/img/sketchbot-f.png", alt: "SketchBot drawing result", caption: "…ink out", note: "SketchBot" },
  { src: "/img/winhacks26-sketchbot-award-1.jpg", alt: "WinHacks 2026 finalist moment", caption: "Finalists at WinHacks", note: "2026" },
  { src: "/img/winhacks26-sketchbot-award-2.jpg", alt: "WinHacks 2026 team", caption: "The team, post-demo", note: "WinHacks · 2026" },
  { src: "/img/winhacks26-sketchbot-award-3.jpg", alt: "WinHacks 2026 award moment", caption: "Awards night", note: "WinHacks · 2026" },
  { src: "/img/clubhacks-sketchbot-v2-1.jpg", alt: "SketchBot V2 with AprilTag tracking", caption: "V2 — AprilTags and 18650s", note: "ClubHacks · 2026" },
  { src: "/img/clubhacks-sketchbot-v2-2.jpg", alt: "SketchBot V2 detail", caption: "The cleaner chassis", note: "ClubHacks · 2026" },
  { src: "/img/clubhacks-sketchbot-v2-3.jpg", alt: "SketchBot V2 drawing", caption: "Finalist again", note: "ClubHacks · 2026" },
  { src: "/img/edge-pong-video.jpg", alt: "Edge Pong projected arena with smart paddle", caption: "Edge Pong — haptics you can feel", note: "Hack the 6ix · 2026" },
  // ---- giving the spark away ----
  { src: "/img/genius-cup-main.jpg", alt: "Mentoring young students with robots at the Genius Cup", caption: "Genius Cup — mentor and judge", note: "Windsor" },
  { src: "/img/genius-cup-robot-battle.jpg", alt: "Refereeing a robot battle", caption: "Robot battles at the Genius Cup", note: "Windsor" },
  { src: "/img/genius-cup-2.jpg", alt: "Students with their robots", caption: "Young builders at work", note: "Genius Cup" },
  { src: "/img/genius-cup-3.jpg", alt: "Robotics activities at the Genius Cup", caption: "Hands on, heads down", note: "Genius Cup" },
  { src: "/img/genius-cup-4.jpg", alt: "Genius Cup competition floor", caption: "The competition floor", note: "Genius Cup" },
  { src: "/img/genius-cup-5.jpg", alt: "Genius Cup teams", caption: "Teams in the arena", note: "Genius Cup" },
  { src: "/img/genius-cup-6.jpg", alt: "Genius Cup robots", caption: "Their robots, their rules", note: "Genius Cup" },
  { src: "/img/genius-cup-7.jpg", alt: "Genius Cup participants", caption: "The next generation", note: "Genius Cup" },
  { src: "/img/genius-cup-2026-arena.jpg", alt: "A gym full of young builders at RoboFest Windsor", caption: "Three hundred young builders take the gym", note: "RoboFest Windsor · 2026" },
  { src: "/img/genius-cup-2026-mentoring.jpg", alt: "Mentoring kids at the competition table", caption: "Coaching at the table", note: "Genius Cup · 2026" },
  { src: "/img/genius-cup-2026-robots.jpg", alt: "Robot lineup ready to compete", caption: "The starting grid", note: "Genius Cup · 2026" },
  { src: "/img/genius-cup-2026-battle.jpg", alt: "Crowd around the robot battle platform", caption: "Battle platform, full crowd", note: "Genius Cup · 2026" },
  { src: "/img/genius-cup-2026-bot.jpg", alt: "A competitor's robot up close", caption: "A competitor, up close", note: "Genius Cup · 2026" },
  { src: "/img/genius-cup-2026-judge-badge.jpg", alt: "The Genius Cup judge badge", caption: "The badge says it all", note: "Genius Cup · 2026" },
  { src: "/img/cs-games-1.jpg", alt: "CS Games", caption: "CS Games with the Windsor delegation", note: "Montréal · 2026" },
  { src: "/img/cs-games-2.jpg", alt: "The CS Games delegation", caption: "The delegation", note: "CS Games · 2026" },
  { src: "/img/cs-games-3.jpg", alt: "Competing at CS Games", caption: "Heads-down rounds", note: "CS Games · 2026" },
  { src: "/img/cs-games-4.jpg", alt: "CS Games competition", caption: "Between challenges", note: "CS Games · 2026" },
  { src: "/img/cs-games-5.jpg", alt: "CS Games team moment", caption: "Mentor's-eye view", note: "CS Games · 2026" },
  { src: "/img/wrstef-judge-2026.jpg", alt: "Judging at the Windsor Regional Science Fair", caption: "Back at the science fair — judging now, competing then", note: "WRSTEF · 2026" },
  { src: "/img/wrstef-fair.jpg", alt: "The Windsor Regional Science Fair floor", caption: "Where it all started", note: "WRSTEF" },
  // ---- now ----
  { src: "/img/sayspark-robot.png", alt: "Spark and Spark Mini robots", caption: "SaySpark — the next chapter", note: "now" },
  { src: "/img/sayspark-simulator.png", alt: "The SaySpark 3D simulator", caption: "The free simulator, live", note: "sayspark.ca" },
  { src: "/img/sayspark-dashboard.png", alt: "The SaySpark dashboard", caption: "The tutor's dashboard", note: "sayspark.ca" },
  { src: "/img/sayspark-vision.jpg", alt: "Kids with robots — the SaySpark vision", caption: "Why it exists", note: "SaySpark" },
];

const PAPER = "#e9e0c9";
const INK = "#2b2a24";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Tape({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`absolute h-6 w-16 opacity-70 shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${className}`}
      style={{
        background: "linear-gradient(rgba(250,246,230,0.65), rgba(240,232,208,0.65))",
        backdropFilter: "blur(0.5px)",
      }}
    />
  );
}

function AlbumPhoto({ snap, idx }: { snap: Snap; idx: number }) {
  const tilt = (idx % 2 ? 1 : -1) * (1.2 + (idx % 3) * 0.35);
  return (
    <figure
      className="relative mx-auto w-full max-w-[400px] pb-1"
      style={{ transform: `rotate(${tilt}deg)`, color: INK }}
    >
      <div className="relative bg-[#f8f4e8] p-2 pb-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.22)]">
        <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
        <div className="relative aspect-[4/3] overflow-hidden bg-[#efe9da]">
          {/* contain, never crop — prints mounted with natural borders */}
          <Image src={snap.src} alt={snap.alt} fill className="object-contain" sizes="(max-width: 640px) 90vw, 400px" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(60,45,20,0.12)]" />
        </div>
      </div>
      <figcaption className="mt-2.5 text-center">
        <div className="font-hand text-[19px] leading-snug">{snap.caption}</div>
        {snap.note && <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] opacity-55">{snap.note}</div>}
      </figcaption>
    </figure>
  );
}

export function PhotoAlbum() {
  const spreads: Snap[][] = [];
  for (let i = 0; i < SNAPS.length; i += 2) spreads.push(SNAPS.slice(i, i + 2));

  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);
  const timer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const holdUntil = useRef(0);

  const turn = useCallback(
    (dir: "next" | "prev", manual = true) => {
      if (manual) holdUntil.current = Date.now() + 15000;
      setPage((p) => {
        const n = spreads.length;
        const target = dir === "next" ? (p + 1) % n : (p - 1 + n) % n;
        setTurning(dir);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setTurning(null), 420);
        return target;
      });
    },
    [spreads.length]
  );

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return;
      turn("next", false);
    }, 4200);
    return () => window.clearInterval(id);
  }, [inView, paused, turn]);

  const spread = spreads[page];

  return (
    <div
      ref={rootRef}
      className="relative mx-auto max-w-5xl outline-none"
      tabIndex={0}
      role="group"
      aria-label="Photo album — turns pages on its own; use the arrows to browse"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") turn("next");
        if (e.key === "ArrowLeft") turn("prev");
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* the open book */}
      <div
        className="relative rounded-[6px] px-5 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:px-10 sm:py-10"
        style={{
          color: INK,
          backgroundColor: PAPER,
          backgroundImage: `${GRAIN}, linear-gradient(90deg, rgba(120,100,60,0.14), rgba(255,255,255,0.35) 12%, rgba(255,255,255,0.35) 42%, rgba(90,75,45,0.22) 50%, rgba(255,255,255,0.35) 58%, rgba(255,255,255,0.35) 88%, rgba(120,100,60,0.14))`,
        }}
      >
        {/* center stitching */}
        <div aria-hidden className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-[#2b2a24]/20 sm:block" />

        <div
          key={page}
          className="grid gap-10 sm:grid-cols-2 sm:gap-8 motion-safe:animate-[pageIn_420ms_ease-out]"
          style={{ transformOrigin: turning === "prev" ? "left center" : "right center" }}
        >
          {spread.map((snap, i) => (
            <AlbumPhoto key={snap.src} snap={snap} idx={page * 2 + i} />
          ))}
        </div>

        {/* page number */}
        <div className="mt-6 text-center font-mono text-[9px] tracking-[0.3em] opacity-45">
          {page + 1} / {spreads.length}
        </div>
      </div>

      {/* controls */}
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => turn("prev")}
        className="absolute -left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cyan backdrop-blur transition-all hover:scale-110 hover:shadow-[0_0_18px_rgba(0,229,255,0.25)] sm:-left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => turn("next")}
        className="absolute -right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cyan backdrop-blur transition-all hover:scale-110 hover:shadow-[0_0_18px_rgba(0,229,255,0.25)] sm:-right-6"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
