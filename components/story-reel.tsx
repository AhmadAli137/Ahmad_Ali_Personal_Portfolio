"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, RotateCcw, X } from "lucide-react";

/**
 * The Reel — a comic-book riffle through the decade, full-screen spreads.
 *
 * Layout engine: every image carries its true aspect ratio; each row of a
 * spread gets its height from the sum of its images' aspects, and images
 * share the row proportionally to their aspect — so panels match the photos
 * almost exactly (no heavy crops, no blown-up small files). Square or
 * low-res hero shots get "splash" pages: contained art on a comic burst.
 */

interface Img { src: string; alt: string; ar: number }
interface Page {
  year: string;
  caption: string;
  splash?: Img;      // full-page contained art
  rows?: Img[][];    // justified rows
}

const PAGES: Page[] = [
  { year: "2018", caption: "A science-fair kid gets a golden ticket", splash: { src: "/img/stem-bootcamp-golden-ticket.jpg", alt: "Golden ticket at CWSF with the SignSmart glove", ar: 1 } },
  { year: "2018–22", caption: "People's Choice — then the first apps & games", rows: [
    [
      { src: "/img/stem-bootcamp-lassonde.jpg", alt: "Bootcamp cohort at Lassonde", ar: 1 },
      { src: "/img/stem-bootcamp-trophy.jpg", alt: "People's Choice trophy", ar: 1.91 },
    ],
    [
      { src: "/img/winparks-a.jpg", alt: "WinParks app", ar: 0.45 },
      { src: "/img/gtc-title.png", alt: "Grand Theft Calculus title screen", ar: 1.78 },
      { src: "/img/gtc-caught.png", alt: "Grand Theft Calculus caught screen", ar: 1.78 },
      { src: "/img/wingrid-a.jpg", alt: "WinGrid app", ar: 0.45 },
    ],
  ] },
  { year: "2020–22", caption: "Engineering circuits & pandemic-era builds", rows: [
    [
      { src: "/img/wec-1st-place.jpg", alt: "WEC 1st place", ar: 1.35 },
      { src: "/img/formula-electric-team.jpg", alt: "Formula electric team", ar: 1.5 },
      { src: "/img/oec-2024-delegation.jpg", alt: "OEC delegation", ar: 1.23 },
    ],
    [
      { src: "/img/gtc-play.png", alt: "Grand Theft Calculus gameplay", ar: 1.78 },
      { src: "/img/covid-a.png", alt: "Covid-19 Global desktop app", ar: 2.67 },
    ],
  ] },
  { year: "2023", caption: "The capstone drone crew — and the founder award", rows: [[
    { src: "/img/capstone-drone-team.jpg", alt: "Capstone drone team", ar: 1.33 },
    { src: "/img/founder.jpg", alt: "Holding the EPICentre award", ar: 0.67 },
  ]] },
  { year: "2023", caption: "Best Demo & Innovation Mastery — the double", rows: [[
    { src: "/img/pimrc-best-demo-award.jpg", alt: "PIMRC Best Demo award", ar: 1.28 },
    { src: "/img/epicentre-award-trophy.jpg", alt: "The trophy", ar: 0.67 },
  ]] },
  { year: "2023–25", caption: "On stages — awards & posters", rows: [[
    { src: "/img/epicentre-award-stage.jpg", alt: "On stage at EPICentre", ar: 1.5 },
    { src: "/img/ieee-epec-poster.jpg", alt: "EPEC poster session", ar: 0.68 },
  ]] },
  { year: "2024", caption: "The Iron Ring — an engineer's promise", rows: [[
    { src: "/img/iron-ring-ceremony.jpg", alt: "Iron Ring ceremony", ar: 1 },
    { src: "/img/iron-ring-classmates.jpg", alt: "With classmates", ar: 0.75 },
  ]] },
  { year: "2024", caption: "BASc, done", rows: [[
    { src: "/img/undergrad-graduation.jpg", alt: "Graduation", ar: 1.9 },
  ]] },
  { year: "2024", caption: "EV batteries at the CHARGE Lab", rows: [[
    { src: "/img/charge-lab-ev-rnd.jpg", alt: "EV powertrain rig", ar: 1 },
    { src: "/img/charge-lab-battery.jpg", alt: "Battery bench", ar: 1 },
  ]] },
  { year: "2024", caption: "Second Life — 2nd overall, born from battery research", rows: [
    [
      { src: "/img/secondlife-award.jpg", alt: "Second Life 2nd overall", ar: 1.5 },
      { src: "/img/secondlife-a.png", alt: "Second Life platform", ar: 1.88 },
    ],
    [
      { src: "/img/secondlife-b.png", alt: "Battery marketplace", ar: 1.88 },
      { src: "/img/charge-lab-magna-team.jpg", alt: "Magna project team", ar: 1.33 },
    ],
  ] },
  { year: "2025", caption: "PresentPro podiums & the JLR internship", rows: [
    [
      { src: "/img/presentpro-award-1.jpg", alt: "PresentPro award", ar: 1.5 },
      { src: "/img/presentpro-a.jpg", alt: "The wearable", ar: 1.33 },
      { src: "/img/presentpro-award-3.jpg", alt: "The team", ar: 1.63 },
    ],
    [
      { src: "/img/jlr-team-1.jpg", alt: "JLR team", ar: 1 },
      { src: "/img/jlr-team-2.jpg", alt: "JLR competition", ar: 2.16 },
    ],
  ] },
  { year: "2025", caption: "NASA Space Apps — 1st place + global nomination", splash: { src: "/img/nasa-space-apps-1.jpg", alt: "NASA Space Apps win", ar: 1.33 } },
  { year: "2025", caption: "Meteor Madness — the team", rows: [
    [
      { src: "/img/nasa-space-apps-2.jpg", alt: "Celebration", ar: 1 },
      { src: "/img/nasa-space-apps-3.jpg", alt: "Team at work", ar: 1.98 },
    ],
    [
      { src: "/img/nasa-space-apps-4.jpg", alt: "Demo", ar: 2.09 },
      { src: "/img/nasa-space-apps-5.jpg", alt: "The certificates", ar: 2.16 },
    ],
  ] },
  { year: "2026", caption: "Hardware year — SketchBot ×2 & Edge Pong", rows: [
    [
      { src: "/img/sketchbot-a.jpg", alt: "SketchBot", ar: 1.33 },
      { src: "/img/sketchbot-b.jpg", alt: "Drawing mechanism", ar: 1.33 },
      { src: "/img/sketchbot-c.jpg", alt: "SketchBot output", ar: 1.33 },
    ],
    [
      { src: "/img/winhacks26-sketchbot-award-1.jpg", alt: "WinHacks finalist", ar: 1.33 },
      { src: "/img/clubhacks-sketchbot-v2-1.jpg", alt: "SketchBot V2", ar: 2.17 },
      { src: "/img/edge-pong-video.jpg", alt: "Edge Pong demo", ar: 1.78 },
    ],
  ] },
  { year: "2026", caption: "Giving the spark away — mentor & judge now", rows: [
    [
      { src: "/img/genius-cup-main.jpg", alt: "Genius Cup mentoring", ar: 1.5 },
      { src: "/img/genius-cup-2.jpg", alt: "Students with robots", ar: 1.5 },
      { src: "/img/genius-cup-3.jpg", alt: "Robotics activities", ar: 1.5 },
    ],
    [
      { src: "/img/genius-cup-robot-battle.jpg", alt: "Robot battle", ar: 1.5 },
      { src: "/img/wrstef-judge-2026.jpg", alt: "Science fair judging", ar: 1.33 },
      { src: "/img/wrstef-fair.jpg", alt: "The fair", ar: 0.75 },
    ],
  ] },
  { year: "2026", caption: "Genius Cup ×300 — RoboFest Windsor takes the gym", rows: [
    [
      { src: "/img/genius-cup-2026-arena.jpg", alt: "The Genius Cup arena, a gym full of young builders", ar: 1.5 },
      { src: "/img/genius-cup-2026-mentoring.jpg", alt: "Mentoring kids at the competition table", ar: 1.5 },
      { src: "/img/genius-cup-2026-robots.jpg", alt: "Robot lineup ready to compete", ar: 1.5 },
    ],
    [
      { src: "/img/genius-cup-2026-battle.jpg", alt: "Crowd around the robot battle platform", ar: 1.5 },
      { src: "/img/genius-cup-2026-bot.jpg", alt: "A competitor's robot up close", ar: 1.5 },
      { src: "/img/genius-cup-2026-judge-badge.jpg", alt: "The Genius Cup judge badge", ar: 1.32 },
    ],
  ] },
  { year: "2026", caption: "CS Games with the delegation — while building SaySpark", rows: [
    [
      { src: "/img/cs-games-1.jpg", alt: "CS Games", ar: 1.09 },
      { src: "/img/cs-games-2.jpg", alt: "CS Games delegation", ar: 1.5 },
      { src: "/img/cs-games-3.jpg", alt: "Competing at CS Games", ar: 1.5 },
    ],
    [
      { src: "/img/sayspark-vision.jpg", alt: "Kids and robots — the SaySpark vision", ar: 1.89 },
      { src: "/img/sayspark-simulator.png", alt: "The SaySpark simulator", ar: 1.86 },
    ],
  ] },
  { year: "NOW", caption: "SaySpark — the next chapter", splash: { src: "/img/sayspark-robot.png", alt: "Spark and Spark Mini robots", ar: 0.99 } },
];

/* pacing: a real read on every spread */
function holdFor(i: number, n: number) {
  const edge = 3;
  if (i < edge) return 2700 - i * 300;
  if (i >= n - edge) return 2100 + (i - (n - edge)) * 300;
  return 1800;
}
const FLIP_MS = 620;

const HALFTONE = "radial-gradient(circle, rgba(30,25,20,0.22) 1px, transparent 1.4px)";
const INK = "#2b2a24";

type Phase = "title" | "film" | "end";

function Burst({ year }: { year: string }) {
  return (
    <div className="absolute right-[2%] top-[2.5%] grid h-[16%] min-h-[64px] place-items-center" style={{ aspectRatio: "1" }}>
      <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full">
        <path
          d={Array.from({ length: 24 }, (_, i) => {
            const a = (i * Math.PI) / 12;
            const r = i % 2 ? 32 : 46;
            return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
          }).join(" ") + "Z"}
          fill="#c9463a"
          stroke={INK}
          strokeWidth="2.5"
        />
      </svg>
      <span className="relative text-white" style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(13px, 2.3vmin, 20px)" }}>
        {year}
      </span>
    </div>
  );
}

function Panel({ img, sizes }: { img: Img; sizes: string }) {
  return (
    <div
      className="relative overflow-hidden border-[3px] bg-white"
      style={{ flexGrow: img.ar, flexBasis: 0, borderColor: INK }}
    >
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" style={{ filter: "contrast(1.14) saturate(1.25)" }} />
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ backgroundImage: HALFTONE, backgroundSize: "5px 5px", opacity: 0.4 }} />
    </div>
  );
}

function ComicPage({ page, pageIdx, innerAr }: { page: Page; pageIdx: number; innerAr: number }) {
  const captionLeft = pageIdx % 2 === 0;

  /* justified rows: row height ∝ 1/Σar, then normalized */
  let rowHeights: number[] = [];
  if (page.rows) {
    const raw = page.rows.map((r) => innerAr / r.reduce((s, im) => s + im.ar, 0));
    const total = raw.reduce((s, h) => s + h, 0);
    rowHeights = raw.map((h) => h / total);
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[4px] p-[1.6%] pb-[5.5%]"
      style={{
        backgroundColor: "#efe7d2",
        backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.6), rgba(140,115,70,0.12))",
        boxShadow: "inset 0 0 0 2px rgba(43,42,36,0.55), inset 0 0 80px rgba(90,70,40,0.15)",
      }}
    >
      {page.splash ? (
        <div className="relative grid h-full w-full place-items-center">
          {/* comic burst rays behind the splash art */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "repeating-conic-gradient(from 0deg at 50% 46%, rgba(201,70,58,0.13) 0deg 7deg, transparent 7deg 16deg)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{ backgroundImage: HALFTONE, backgroundSize: "6px 6px", opacity: 0.25 }}
          />
          <div
            className="relative border-[4px] bg-white shadow-[10px_10px_0_rgba(43,42,36,0.5)]"
            style={{ height: "88%", aspectRatio: `${page.splash.ar}`, maxWidth: "92%", borderColor: INK, transform: "rotate(-0.6deg)" }}
          >
            <Image src={page.splash.src} alt={page.splash.alt} fill sizes="80vh" className="object-cover" style={{ filter: "contrast(1.12) saturate(1.22)" }} />
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ backgroundImage: HALFTONE, backgroundSize: "5px 5px", opacity: 0.35 }} />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-[1.4%]">
          {page.rows!.map((row, r) => (
            <div key={r} className="flex min-h-0 w-full gap-[1.4%]" style={{ flexGrow: rowHeights[r], flexBasis: 0 }}>
              {row.map((im) => (
                <Panel key={im.src} img={im} sizes={`${Math.round((im.ar / row.reduce((s, x) => s + x.ar, 0)) * 100)}vw`} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* caption box — alternates corners */}
      <div
        className={`absolute bottom-[1.6%] max-w-[70%] border-[2.5px] bg-[#f5d94e] px-4 py-1.5 shadow-[3px_3px_0_rgba(43,42,36,0.8)] ${captionLeft ? "left-[2.5%]" : "right-[2.5%]"}`}
        style={{ transform: `rotate(${captionLeft ? -0.8 : 0.8}deg)`, borderColor: INK }}
      >
        <span style={{ color: INK, fontFamily: "var(--font-bangers)", fontSize: "clamp(16px, 3vmin, 28px)", letterSpacing: "0.04em" }}>
          {page.caption}
        </span>
      </div>

      <Burst year={page.year} />
    </div>
  );
}

export function StoryReel() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("title");
  const [idx, setIdx] = useState(0);
  const [turning, setTurning] = useState(false);
  const [innerAr, setInnerAr] = useState(1.9);
  const timer = useRef<number | null>(null);
  const clear = () => { if (timer.current) window.clearTimeout(timer.current); };

  const start = useCallback(() => {
    clear();
    setPhase("title");
    setIdx(0);
    setTurning(false);
    timer.current = window.setTimeout(() => setPhase("film"), 2300);
  }, []);

  useEffect(() => {
    if (!open) { clear(); return; }
    const measure = () => setInnerAr((window.innerWidth * 0.94) / (window.innerHeight * 0.86));
    measure();
    window.addEventListener("resize", measure);
    start();
    return () => { clear(); window.removeEventListener("resize", measure); };
  }, [open, start]);

  useEffect(() => {
    if (phase !== "film" || turning) return;
    if (idx >= PAGES.length - 1) {
      timer.current = window.setTimeout(() => setPhase("end"), 1800);
      return clear;
    }
    timer.current = window.setTimeout(() => setTurning(true), holdFor(idx, PAGES.length));
    return clear;
  }, [phase, idx, turning]);

  useEffect(() => {
    if (!turning) return;
    timer.current = window.setTimeout(() => {
      setIdx((i) => i + 1);
      setTurning(false);
    }, FLIP_MS);
    return clear;
  }, [turning]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-shine inline-flex items-center gap-2 rounded-lg border border-line-strong bg-cyan/5 px-5 py-2.5 font-mono text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan"
      >
        <Play size={14} className="text-cyan" /> Play the story
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] bg-[#101014]" role="dialog" aria-modal="true" aria-label="The story reel">
          <style>{`
            @keyframes pageFlip { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-140deg); } }
            @keyframes pageShade { 0% { opacity: 0; } 45% { opacity: 0.35; } 100% { opacity: 0.6; } }
            @keyframes bookIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
            @keyframes reelZoom { from { transform: scale(1); } to { transform: scale(1.04); } }
            @keyframes reelTitle { 0% { opacity: 0; transform: scale(0.85); } 55% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes reelFade { from { opacity: 0; } to { opacity: 1; } }
            @media (prefers-reduced-motion: reduce) {
              .reel-turn { animation: none !important; opacity: 0 !important; }
              .reel-zoom { animation: none !important; }
            }
          `}</style>

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_46%,rgba(255,240,200,0.09),transparent)]" />

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur transition-colors hover:text-white"
          >
            <X size={20} />
          </button>

          {phase === "title" && (
            <div className="grid h-full place-items-center px-6 text-center">
              <div style={{ animation: "reelTitle 1.6s cubic-bezier(0.2,0.8,0.3,1) both" }}>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-[#f5d94e]">ahmadali.ca presents</p>
                <h2
                  className="text-[#f2ecdc]"
                  style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(44px, 9vw, 110px)", letterSpacing: "0.05em", textShadow: "4px 4px 0 #c9463a, 8px 8px 0 rgba(0,0,0,0.55)" }}
                >
                  A DECADE OF BUILDING
                </h2>
              </div>
            </div>
          )}

          {phase === "film" && (
            <div className="reel-zoom h-full w-full" style={{ animation: "reelZoom 52s linear both" }}>
              <div
                className="absolute inset-3 [perspective:2400px] sm:inset-6 md:inset-x-10 md:inset-y-8"
                style={{ animation: "bookIn 500ms ease-out both" }}
              >
                {[idx + 2, idx + 1].map((i) =>
                  i < PAGES.length ? (
                    <div key={i} className="absolute inset-0" style={{ visibility: i === idx + 1 ? "visible" : "hidden" }}>
                      <ComicPage page={PAGES[i]} pageIdx={i} innerAr={innerAr} />
                    </div>
                  ) : null
                )}
                <div
                  className="reel-turn absolute inset-0"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    animation: turning ? `pageFlip ${FLIP_MS}ms cubic-bezier(0.5,0.05,0.35,1) both` : undefined,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                  }}
                >
                  <ComicPage page={PAGES[idx]} pageIdx={idx} innerAr={innerAr} />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,0,0,0.45), transparent 45%)",
                      animation: turning ? `pageShade ${FLIP_MS}ms linear both` : undefined,
                      opacity: 0,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {phase === "end" && (
            <div className="grid h-full place-items-center px-6 text-center" style={{ animation: "reelFade 900ms ease-out both" }}>
              <div>
                <h2
                  className="mb-2 text-[#f2ecdc]"
                  style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(56px, 11vw, 130px)", letterSpacing: "0.06em", textShadow: "5px 5px 0 #c9463a, 10px 10px 0 rgba(0,0,0,0.55)" }}
                >
                  AHMAD ALI
                </h2>
                <p className="mb-9 font-mono text-sm tracking-[0.3em] text-[#f5d94e]">FROM CONCEPT TO REALITY</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 font-mono text-sm text-white transition-colors hover:border-white/60"
                  >
                    <RotateCcw size={14} /> Replay
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn-shine rounded-lg bg-cyan px-5 py-2.5 font-mono text-sm font-bold text-[#04252b]"
                  >
                    Back to the site
                  </button>
                </div>
              </div>
            </div>
          )}

          {phase === "film" && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
              {PAGES.map((_, i) => (
                <span key={i} className={`h-0.5 w-2 rounded-full ${i <= idx ? "bg-[#f5d94e]" : "bg-white/15"}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
