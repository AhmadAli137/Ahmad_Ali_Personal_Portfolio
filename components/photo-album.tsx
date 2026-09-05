"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A photo album lying open on the desk: two cream pages per spread, photos
 * held down with tape, captions handwritten underneath. Arrows (or ←/→ when
 * focused) turn the page; the turn is a gentle lift, not a gimmick.
 */

interface Snap {
  src: string;
  alt: string;
  caption: string;
  note?: string; // small mono line: place / year
  tilt: number;
}

const SNAPS: Snap[] = [
  { src: "/img/stem-bootcamp-golden-ticket.jpg", alt: "Ahmad at the Canada-Wide Science Fair with the SignSmart glove, receiving a golden ticket to the STEM Entrepreneurship Bootcamp", caption: "The golden ticket — CWSF, the SignSmart glove, and an invitation", note: "CWSF · 2018", tilt: -1.6 },
  { src: "/img/stem-bootcamp-lassonde.jpg", alt: "The STEM Entrepreneurship Bootcamp cohort on the steps of York University's Lassonde building", caption: "The bootcamp cohort — first taste of entrepreneurship", note: "Lassonde × Youth Science Canada · 2018", tilt: 1.7 },
  { src: "/img/founder.jpg", alt: "Ahmad holding the EPICentre Innovation Mastery Award", caption: "The Innovation Mastery Award", note: "EPICentre · 2023", tilt: -1.6 },
  { src: "/img/capstone-drone-team.jpg", alt: "The capstone autonomous drone team", caption: "The capstone crew — best demo at IEEE PIMRC", note: "Toronto · 2023", tilt: 1.8 },
  { src: "/img/formula-electric-team.jpg", alt: "The Formula SAE electric team", caption: "Formula SAE — accumulator team days", note: "UWindsor", tilt: 1.2 },
  { src: "/img/nasa-space-apps-2.jpg", alt: "Team celebrating at NASA Space Apps", caption: "We won Windsor… then the global nomination came in", note: "NASA Space Apps · 2025", tilt: -1.9 },
  { src: "/img/iron-ring-ceremony.jpg", alt: "Receiving the Iron Ring at the ceremony", caption: "The Iron Ring — an engineer's promise", note: "2024", tilt: -1.4 },
  { src: "/img/undergrad-graduation.jpg", alt: "Graduation day at the University of Windsor", caption: "BASc, done. Next: everything else", note: "Windsor · 2024", tilt: 2.0 },
  { src: "/img/charge-lab-ev-rnd.jpg", alt: "Working on an EV powertrain test rig at the CHARGE Lab", caption: "Late nights on the powertrain rig", note: "CHARGE Lab", tilt: 1.5 },
  { src: "/img/ieee-epec-poster.jpg", alt: "Presenting battery research at IEEE EPEC 2025", caption: "Presenting the dual-chemistry work", note: "IEEE EPEC · Waterloo 2025", tilt: -1.7 },
  { src: "/img/genius-cup-robot-battle.jpg", alt: "Refereeing a robot battle at the Genius Cup", caption: "Robot battles at the Genius Cup", note: "Windsor", tilt: 1.6 },
  { src: "/img/wrstef-fair.jpg", alt: "At the Windsor Regional Science Fair as a judge", caption: "Back at the science fair — judging now, competing then", note: "WRSTEF · 2026", tilt: -1.3 },
  { src: "/img/cs-games-2.jpg", alt: "With the University of Windsor delegation at CS Games", caption: "CS Games with the Windsor delegation", note: "Montréal · 2026", tilt: 1.9 },
  { src: "/img/epicentre-award-stage.jpg", alt: "On stage receiving the EPICentre award", caption: "On stage — where the venture story started", note: "EPICentre · 2023", tilt: -2.1 },
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
        background:
          "linear-gradient(rgba(250,246,230,0.65), rgba(240,232,208,0.65))",
        backdropFilter: "blur(0.5px)",
      }}
    />
  );
}

function AlbumPhoto({ snap }: { snap: Snap }) {
  return (
    <figure
      className="relative mx-auto w-full max-w-[360px] pb-1"
      style={{ transform: `rotate(${snap.tilt}deg)`, color: INK }}
    >
      <div className="relative bg-[#f8f4e8] p-2 pb-2.5 shadow-[0_6px_18px_rgba(0,0,0,0.22)]">
        <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
        <div className="relative aspect-[4/3] overflow-hidden bg-[#d8ceb4]">
          <Image src={snap.src} alt={snap.alt} fill className="object-cover" sizes="(max-width: 640px) 90vw, 360px" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(60,45,20,0.18)]" />
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

  const turn = useCallback(
    (dir: "next" | "prev") => {
      setPage((p) => {
        const target = dir === "next" ? p + 1 : p - 1;
        if (target < 0 || target >= spreads.length) return p;
        setTurning(dir);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setTurning(null), 420);
        return target;
      });
    },
    [spreads.length]
  );

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const spread = spreads[page];

  return (
    <div
      className="relative mx-auto max-w-4xl outline-none"
      tabIndex={0}
      role="group"
      aria-label="Photo album — use the arrows to turn pages"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") turn("next");
        if (e.key === "ArrowLeft") turn("prev");
      }}
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
          {spread.map((snap) => (
            <AlbumPhoto key={snap.src} snap={snap} />
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
        disabled={page === 0}
        className="absolute -left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cyan backdrop-blur transition-all hover:scale-110 hover:shadow-[0_0_18px_rgba(0,229,255,0.25)] disabled:pointer-events-none disabled:opacity-25 sm:-left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => turn("next")}
        disabled={page === spreads.length - 1}
        className="absolute -right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-cyan backdrop-blur transition-all hover:scale-110 hover:shadow-[0_0_18px_rgba(0,229,255,0.25)] disabled:pointer-events-none disabled:opacity-25 sm:-right-6"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
