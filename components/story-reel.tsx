"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, RotateCcw, X } from "lucide-react";

/**
 * The Reel: a ~30-second studio-intro-style montage — pages of the story
 * flipping past, slow at first, accelerating through the years, easing out
 * on today. Opens fullscreen from the "play the story" button.
 */

interface Frame {
  src: string;
  caption: string;
  year: string;
}

const FRAMES: Frame[] = [
  { src: "/img/stem-bootcamp-golden-ticket.jpg", caption: "A science fair kid gets a golden ticket", year: "2018" },
  { src: "/img/stem-bootcamp-lassonde.jpg", caption: "First taste of entrepreneurship", year: "2018" },
  { src: "/img/wec-1st-place.jpg", caption: "Four straight programming titles", year: "2020–23" },
  { src: "/img/covid-a.png", caption: "Building through the strange years", year: "2020" },
  { src: "/img/winparks-a.jpg", caption: "People's Choice at BorderHacks", year: "2021" },
  { src: "/img/formula-electric-team.jpg", caption: "Formula SAE — the accumulator team", year: "2022" },
  { src: "/img/capstone-drone-team.jpg", caption: "The capstone drone crew", year: "2023" },
  { src: "/img/pimrc-best-demo-award.jpg", caption: "Best Demo — IEEE PIMRC, Toronto", year: "2023" },
  { src: "/img/epicentre-award-stage.jpg", caption: "The Innovation Mastery Award", year: "2023" },
  { src: "/img/founder.jpg", caption: "", year: "2023" },
  { src: "/img/secondlife-award.jpg", caption: "2nd overall — WinHacks", year: "2024" },
  { src: "/img/iron-ring-ceremony.jpg", caption: "The Iron Ring", year: "2024" },
  { src: "/img/undergrad-graduation.jpg", caption: "BASc, done", year: "2024" },
  { src: "/img/charge-lab-ev-rnd.jpg", caption: "EV research at the CHARGE Lab", year: "2024" },
  { src: "/img/charge-lab-battery.jpg", caption: "Batteries, BMS, firmware", year: "2024" },
  { src: "/img/presentpro-award-1.jpg", caption: "PresentPro — 2nd overall", year: "2025" },
  { src: "/img/nasa-space-apps-1.jpg", caption: "NASA Space Apps — 1st + global nomination", year: "2025" },
  { src: "/img/jlr-team-1.jpg", caption: "The JLR AI competition → internship", year: "2025" },
  { src: "/img/ieee-epec-poster.jpg", caption: "Presenting at IEEE EPEC", year: "2025" },
  { src: "/img/sketchbot-a.jpg", caption: "SketchBot draws its first line", year: "2026" },
  { src: "/img/clubhacks-sketchbot-v2-1.jpg", caption: "…and gets rebuilt better", year: "2026" },
  { src: "/img/genius-cup-robot-battle.jpg", caption: "Giving the spark away", year: "2026" },
  { src: "/img/cs-games-1.jpg", caption: "Mentoring at CS Games, Montréal", year: "2026" },
  { src: "/img/wrstef-judge-2026.jpg", caption: "Judging where it all started", year: "2026" },
  { src: "/img/sayspark-robot.png", caption: "SaySpark — the next chapter", year: "now" },
];

/* slow in, fast middle, slow out */
function frameDelay(i: number, n: number) {
  const edge = 3;
  if (i < edge) return 950 - i * 150;
  if (i >= n - edge) return 500 + (i - (n - edge)) * 250;
  return 340;
}

type Phase = "title" | "film" | "end";

export function StoryReel() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("title");
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  const clear = () => { if (timer.current) window.clearTimeout(timer.current); };

  const start = useCallback(() => {
    clear();
    setPhase("title");
    setIdx(0);
    timer.current = window.setTimeout(() => setPhase("film"), 2400);
  }, []);

  useEffect(() => {
    if (!open) { clear(); return; }
    start();
    return clear;
  }, [open, start]);

  useEffect(() => {
    if (phase !== "film") return;
    if (idx >= FRAMES.length - 1) {
      timer.current = window.setTimeout(() => setPhase("end"), 1300);
      return;
    }
    timer.current = window.setTimeout(() => setIdx((i) => i + 1), frameDelay(idx, FRAMES.length));
    return clear;
  }, [phase, idx]);

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

  const frame = FRAMES[idx];

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
        <div className="fixed inset-0 z-[90] bg-black" role="dialog" aria-modal="true" aria-label="The story reel">
          <style>{`
            @keyframes reelFlip {
              0% { opacity: 0.25; transform: perspective(1400px) rotateY(-26deg) scale(1.08); filter: brightness(2.2); }
              35% { opacity: 1; filter: brightness(1.15); }
              100% { transform: none; filter: brightness(1); opacity: 1; }
            }
            @keyframes reelCaption { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
            @keyframes reelTitle { 0% { opacity: 0; letter-spacing: 0.6em; } 60% { opacity: 1; } 100% { letter-spacing: 0.18em; opacity: 1; } }
            @keyframes reelFade { from { opacity: 0; } to { opacity: 1; } }
            @media (prefers-reduced-motion: reduce) {
              .reel-frame, .reel-caption { animation: none !important; }
            }
          `}</style>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur transition-colors hover:text-white"
          >
            <X size={20} />
          </button>

          {phase === "title" && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-cyan" style={{ animation: "reelFade 800ms ease-out both" }}>
                  ahmadali.ca presents
                </p>
                <h2 className="text-4xl font-extrabold uppercase text-white sm:text-6xl" style={{ animation: "reelTitle 1.8s ease-out both" }}>
                  A Decade of Building
                </h2>
              </div>
            </div>
          )}

          {phase === "film" && (
            <div className="relative h-full w-full overflow-hidden [perspective:1400px]">
              <div key={idx} className="reel-frame absolute inset-0" style={{ animation: "reelFlip 380ms ease-out both", transformOrigin: "left center" }}>
                <Image
                  src={frame.src}
                  alt={frame.caption || "From the journey"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={idx < 3}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_60%,rgba(0,0,0,0.75))]" />
              </div>
              <div key={`c${idx}`} className="reel-caption absolute bottom-8 left-0 right-0 px-6 text-center" style={{ animation: "reelCaption 300ms ease-out both" }}>
                <span className="mr-3 font-mono text-sm text-cyan">{frame.year}</span>
                <span className="text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{frame.caption}</span>
              </div>
            </div>
          )}

          {phase === "end" && (
            <div className="grid h-full place-items-center text-center" style={{ animation: "reelFade 900ms ease-out both" }}>
              <div>
                <h2 className="mb-2 text-5xl font-extrabold text-white sm:text-7xl">AHMAD ALI</h2>
                <p className="mb-8 font-mono text-sm tracking-[0.3em] text-cyan">FROM CONCEPT TO REALITY</p>
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

          {/* progress ticks */}
          {phase === "film" && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
              {FRAMES.map((_, i) => (
                <span key={i} className={`h-0.5 w-2.5 rounded-full ${i <= idx ? "bg-cyan" : "bg-white/20"}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
