"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, RotateCcw, X } from "lucide-react";

/**
 * The Reel — a comic-book riffle through the decade. Each beat is a comic
 * page (paper, ink-bordered panels, halftone, caption box, year burst);
 * pages turn around the spine like a thumbed book, easing in slow,
 * quickening through the middle, and settling on today.
 */

interface Page {
  imgs: { src: string; alt: string }[];
  caption: string;
  year: string;
}

const PAGES: Page[] = [
  { year: "2018", caption: "A science-fair kid gets a golden ticket", imgs: [{ src: "/img/stem-bootcamp-golden-ticket.jpg", alt: "Golden ticket at CWSF with the SignSmart glove" }] },
  { year: "2018", caption: "First taste of entrepreneurship", imgs: [{ src: "/img/stem-bootcamp-lassonde.jpg", alt: "Bootcamp cohort at Lassonde" }, { src: "/img/stem-bootcamp-trophy.jpg", alt: "People's Choice trophy" }] },
  { year: "2020", caption: "Building through the strange years", imgs: [{ src: "/img/covid-a.png", alt: "Covid-19 Global desktop app" }] },
  { year: "2021", caption: "Games along the way — Grand Theft Calculus", imgs: [{ src: "/img/gtc-title.png", alt: "Grand Theft Calculus title screen" }, { src: "/img/gtc-play.png", alt: "Gameplay" }, { src: "/img/gtc-caught.png", alt: "Caught screen" }] },
  { year: "2021", caption: "People's Choice at BorderHacks", imgs: [{ src: "/img/winparks-a.jpg", alt: "WinParks app" }] },
  { year: "2020–23", caption: "Four straight programming titles", imgs: [{ src: "/img/wec-1st-place.jpg", alt: "WEC 1st place" }] },
  { year: "2022", caption: "Formula SAE — and keeping EVs on the grid", imgs: [{ src: "/img/formula-electric-team.jpg", alt: "Formula electric team" }, { src: "/img/wingrid-a.jpg", alt: "WinGrid app" }] },
  { year: "2023", caption: "The capstone drone crew", imgs: [{ src: "/img/capstone-drone-team.jpg", alt: "Capstone drone team" }] },
  { year: "2023", caption: "Best Demo — IEEE PIMRC, Toronto", imgs: [{ src: "/img/pimrc-best-demo-award.jpg", alt: "PIMRC Best Demo award" }] },
  { year: "2023", caption: "The Innovation Mastery Award", imgs: [{ src: "/img/epicentre-award-stage.jpg", alt: "On stage at EPICentre" }, { src: "/img/epicentre-award-trophy.jpg", alt: "The trophy" }, { src: "/img/founder.jpg", alt: "Holding the award" }] },
  { year: "2024", caption: "Second Life — 2nd overall at WinHacks", imgs: [{ src: "/img/secondlife-award.jpg", alt: "Second Life award" }, { src: "/img/secondlife-a.png", alt: "Second Life platform" }] },
  { year: "2024", caption: "The Iron Ring — an engineer's promise", imgs: [{ src: "/img/iron-ring-ceremony.jpg", alt: "Iron Ring ceremony" }, { src: "/img/iron-ring-classmates.jpg", alt: "With classmates" }] },
  { year: "2024", caption: "BASc, done", imgs: [{ src: "/img/undergrad-graduation.jpg", alt: "Graduation" }] },
  { year: "2024", caption: "EV batteries at the CHARGE Lab", imgs: [{ src: "/img/charge-lab-ev-rnd.jpg", alt: "EV powertrain rig" }, { src: "/img/charge-lab-battery.jpg", alt: "Battery bench" }, { src: "/img/charge-lab-magna-team.jpg", alt: "Magna project team" }] },
  { year: "2025", caption: "PresentPro — 2nd overall, 1st in category", imgs: [{ src: "/img/presentpro-award-1.jpg", alt: "PresentPro award" }, { src: "/img/presentpro-a.jpg", alt: "The wearable" }, { src: "/img/presentpro-award-3.jpg", alt: "The team" }] },
  { year: "2025", caption: "NASA Space Apps — 1st place + global nomination", imgs: [{ src: "/img/nasa-space-apps-1.jpg", alt: "NASA Space Apps win" }, { src: "/img/nasa-space-apps-2.jpg", alt: "Celebration" }] },
  { year: "2025", caption: "Meteor Madness — the team", imgs: [{ src: "/img/nasa-space-apps-3.jpg", alt: "Team at work" }, { src: "/img/nasa-space-apps-4.jpg", alt: "Demo" }, { src: "/img/nasa-space-apps-5.jpg", alt: "The certificates" }] },
  { year: "2025", caption: "The JLR AI competition → internship", imgs: [{ src: "/img/jlr-team-1.jpg", alt: "JLR team" }, { src: "/img/jlr-team-2.jpg", alt: "JLR competition" }] },
  { year: "2025", caption: "Presenting at IEEE EPEC, Waterloo", imgs: [{ src: "/img/ieee-epec-poster.jpg", alt: "EPEC poster session" }] },
  { year: "2026", caption: "SketchBot draws its first line", imgs: [{ src: "/img/sketchbot-a.jpg", alt: "SketchBot" }, { src: "/img/sketchbot-b.jpg", alt: "Drawing mechanism" }, { src: "/img/sketchbot-c.jpg", alt: "Output" }] },
  { year: "2026", caption: "Finalist runs — WinHacks & ClubHacks", imgs: [{ src: "/img/winhacks26-sketchbot-award-1.jpg", alt: "WinHacks finalist" }, { src: "/img/clubhacks-sketchbot-v2-1.jpg", alt: "SketchBot V2" }] },
  { year: "2026", caption: "Edge Pong — haptics you can feel", imgs: [{ src: "/img/edge-pong-video.jpg", alt: "Edge Pong demo" }] },
  { year: "2026", caption: "Giving the spark away — Genius Cup", imgs: [{ src: "/img/genius-cup-main.jpg", alt: "Genius Cup mentoring" }, { src: "/img/genius-cup-robot-battle.jpg", alt: "Robot battle" }, { src: "/img/genius-cup-2.jpg", alt: "Students with robots" }] },
  { year: "2026", caption: "CS Games, Montréal — mentor now", imgs: [{ src: "/img/cs-games-1.jpg", alt: "CS Games" }, { src: "/img/cs-games-2.jpg", alt: "The delegation" }, { src: "/img/cs-games-3.jpg", alt: "Competing" }] },
  { year: "2026", caption: "Judging where it all started", imgs: [{ src: "/img/wrstef-judge-2026.jpg", alt: "Science fair judging" }, { src: "/img/wrstef-fair.jpg", alt: "The fair" }] },
  { year: "NOW", caption: "SaySpark — the next chapter", imgs: [{ src: "/img/sayspark-robot.png", alt: "Spark robots" }, { src: "/img/sayspark-simulator.png", alt: "The simulator" }, { src: "/img/sayspark-vision.jpg", alt: "Kids and robots" }] },
];

/* hold time before each page turns: slow → quick → slow */
function holdFor(i: number, n: number) {
  const edge = 3;
  if (i < edge) return 1050 - i * 200;
  if (i >= n - edge) return 650 + (i - (n - edge)) * 250;
  return 340;
}
const FLIP_MS = 460;

const HALFTONE =
  "radial-gradient(circle, rgba(30,25,20,0.22) 1px, transparent 1.4px)";

type Phase = "title" | "film" | "end";

function ComicPage({ page, tilt }: { page: Page; tilt: number }) {
  const n = page.imgs.length;
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[4px] p-[4%] pb-[9%]"
      style={{
        backgroundColor: "#efe7d2",
        backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.6), rgba(140,115,70,0.12))",
        boxShadow: "inset 0 0 0 2px rgba(43,42,36,0.55), inset 0 0 60px rgba(90,70,40,0.15)",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div
        className={`grid h-full w-full gap-[3%] ${
          n === 1 ? "grid-cols-1" : n === 2 ? "grid-rows-2" : "grid-cols-2 grid-rows-2"
        }`}
      >
        {page.imgs.map((im, i) => (
          <div
            key={im.src}
            className={`relative overflow-hidden border-[3px] border-[#2b2a24] bg-white ${
              n === 3 && i === 0 ? "col-span-2" : ""
            }`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              fill
              sizes="70vw"
              className="object-cover"
              style={{ filter: "contrast(1.18) saturate(1.35)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{ backgroundImage: HALFTONE, backgroundSize: "5px 5px", opacity: 0.5 }}
            />
          </div>
        ))}
      </div>

      {/* caption box */}
      <div
        className="absolute bottom-[2.5%] left-[4%] max-w-[80%] border-[2.5px] border-[#2b2a24] bg-[#f5d94e] px-3 py-1 shadow-[3px_3px_0_rgba(43,42,36,0.8)]"
        style={{ transform: "rotate(-1deg)" }}
      >
        <span className="text-[#2b2a24]" style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(14px, 2.6vmin, 22px)", letterSpacing: "0.04em" }}>
          {page.caption}
        </span>
      </div>

      {/* year burst */}
      <div className="absolute right-[2%] top-[1.5%] grid h-[13%] min-h-[54px] w-auto place-items-center" style={{ aspectRatio: "1" }}>
        <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full">
          <path
            d={Array.from({ length: 24 }, (_, i) => {
              const a = (i * Math.PI) / 12;
              const r = i % 2 ? 32 : 46;
              return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
            }).join(" ") + "Z"}
            fill="#c9463a"
            stroke="#2b2a24"
            strokeWidth="2.5"
          />
        </svg>
        <span className="relative text-white" style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(11px, 2vmin, 17px)" }}>
          {page.year}
        </span>
      </div>
    </div>
  );
}

export function StoryReel() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("title");
  const [idx, setIdx] = useState(0);
  const [turning, setTurning] = useState(false);
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
    start();
    return clear;
  }, [open, start]);

  /* film loop: hold → turn → advance */
  useEffect(() => {
    if (phase !== "film" || turning) return;
    if (idx >= PAGES.length - 1) {
      timer.current = window.setTimeout(() => setPhase("end"), 1500);
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

  const tiltOf = (i: number) => (i % 2 ? 0.8 : -0.8);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-shine inline-flex items-center gap-2 rounded-lg border border-line-strong bg-cyan/5 px-5 py-2.5 font-mono text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan"
      >
        <Play size={14} className="text-cyan" /> Play the story — 30 sec
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] bg-[#101014]" role="dialog" aria-modal="true" aria-label="The story reel">
          <style>{`
            @keyframes pageFlip {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(-140deg); }
            }
            @keyframes pageShade {
              0% { opacity: 0; } 45% { opacity: 0.35; } 100% { opacity: 0.6; }
            }
            @keyframes bookIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            @keyframes reelZoom { from { transform: scale(1); } to { transform: scale(1.045); } }
            @keyframes reelTitle { 0% { opacity: 0; transform: scale(0.85); } 55% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes reelFade { from { opacity: 0; } to { opacity: 1; } }
            @media (prefers-reduced-motion: reduce) {
              .reel-turn { animation: none !important; opacity: 0 !important; }
              .reel-zoom { animation: none !important; }
            }
          `}</style>

          {/* spotlight vignette */}
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
            <div className="reel-zoom grid h-full place-items-center" style={{ animation: "reelZoom 22s linear both" }}>
              <div
                className="relative aspect-[3/4] h-[78vh] max-w-[88vw] [perspective:1900px]"
                style={{ animation: "bookIn 500ms ease-out both" }}
              >
                {/* next pages waiting underneath (also preloads ahead) */}
                {[idx + 2, idx + 1].map((i) =>
                  i < PAGES.length ? (
                    <div key={i} className="absolute inset-0" style={{ visibility: i === idx + 1 ? "visible" : "hidden" }}>
                      <ComicPage page={PAGES[i]} tilt={tiltOf(i)} />
                    </div>
                  ) : null
                )}
                {/* top page — turns away around the spine */}
                <div
                  className="reel-turn absolute inset-0"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    animation: turning ? `pageFlip ${FLIP_MS}ms cubic-bezier(0.5,0.05,0.35,1) both` : undefined,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                  }}
                >
                  <ComicPage page={PAGES[idx]} tilt={tiltOf(idx)} />
                  {/* shading as the page lifts */}
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
