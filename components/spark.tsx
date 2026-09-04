"use client";

import { useEffect, useMemo, useState } from "react";
import { sparkStore } from "@/lib/spark-store";

/**
 * Sparkbots — detailed vector mascots hiding behind the UI. Gradient-shaded
 * body, glossy screen face, blinking glowing eyes, articulated arms, pulsing
 * antenna and belly light. Six personalities animate different parts:
 * showoff (dances + waves), zoomer (vibrates, freezes on hover), curious
 * (eyes scan around), shy (half-hidden, trembles), sleepy (droopy eyes, z's),
 * floaty (anti-gravity drift). Mostly visible; brief characterful hides.
 * State is per-visit: refresh restarts the hunt.
 */

type Personality = "showoff" | "zoomer" | "curious" | "shy" | "sleepy" | "floaty";

interface Persona {
  peek: string;
  idle: string;
  duration: number;
  alert: string;
  shadow: boolean;
  zs?: boolean;
  extraStars?: boolean;
  mouth: "smile" | "grin" | "o" | "flat" | "wavy";
}

const PERSONAS: Record<Personality, Persona> = {
  showoff: { peek: "pk-default", idle: "id-dance", duration: 9, alert: "!", shadow: true, mouth: "grin" },
  zoomer: { peek: "pk-zoom", idle: "id-vibrate", duration: 6, alert: "!!", shadow: true, mouth: "o" },
  curious: { peek: "pk-default", idle: "id-tilt", duration: 10, alert: "?", shadow: true, mouth: "o" },
  shy: { peek: "pk-shy", idle: "id-tremble", duration: 10, alert: "…", shadow: false, mouth: "wavy" },
  sleepy: { peek: "pk-sleepy", idle: "id-doze", duration: 13, alert: "?!", shadow: true, zs: true, mouth: "flat" },
  floaty: { peek: "pk-float", idle: "id-drift", duration: 12, alert: "✦", shadow: false, extraStars: true, mouth: "smile" },
};

const ASSIGNMENT: Record<string, Personality> = {
  origin: "showoff",
  drone: "zoomer",
  sayspark: "curious",
  cwsf: "shy",
  nasa: "floaty",
  status: "sleepy",
  cities: "shy",
  hackathons: "zoomer",
};

const PALETTES = {
  cyan: { light: "#7df3ff", mid: "#00e5ff", dark: "#0a7f96", accent: "#eaffff" },
  mint: { light: "#8dffc9", mid: "#34f5a2", dark: "#0f8f5a", accent: "#eafff4" },
  amber: { light: "#ffd9a0", mid: "#ffb454", dark: "#b06f1e", accent: "#fff6e8" },
};
const COLOR_KEYS = ["cyan", "mint", "amber"] as const;

function MOUTHS(m: Persona["mouth"], accent: string) {
  const common = { stroke: accent, strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const };
  switch (m) {
    case "grin":
      return <path d="M23 31.5 Q30 36.5 37 31.5" {...common} />;
    case "smile":
      return <path d="M25 32 Q30 35 35 32" {...common} />;
    case "o":
      return <circle cx="30" cy="32.5" r="2.1" {...common} />;
    case "wavy":
      return <path d="M25 33 Q27.5 31.5 30 33 Q32.5 34.5 35 33" {...common} />;
    default:
      return <path d="M26 33 H34" {...common} />;
  }
}

function BotSVG({ uid, color, mouth }: { uid: string; color: (typeof COLOR_KEYS)[number]; mouth: Persona["mouth"] }) {
  const pal = PALETTES[color];
  const g = `bot-grad-${uid}`;
  const s = `bot-screen-${uid}`;
  return (
    <svg width="48" height="52" viewBox="0 0 60 65" className="bot-svg block">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pal.light} />
          <stop offset="55%" stopColor={pal.mid} />
          <stop offset="100%" stopColor={pal.dark} />
        </linearGradient>
        <linearGradient id={s} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16222f" />
          <stop offset="100%" stopColor="#06090e" />
        </linearGradient>
      </defs>

      {/* antenna */}
      <line x1="30" y1="11" x2="30" y2="4.5" stroke={pal.dark} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="4" r="3" fill={pal.accent} className="bot-antenna" />

      {/* arms (origin at shoulder) */}
      <rect x="2.5" y="27" width="7.5" height="15" rx="3.75" fill={pal.dark} className="bot-arm-l" />
      <rect x="50" y="27" width="7.5" height="15" rx="3.75" fill={pal.dark} className="bot-arm-r" />

      {/* feet */}
      <rect x="15" y="54" width="11" height="8" rx="3.5" fill={pal.dark} />
      <rect x="34" y="54" width="11" height="8" rx="3.5" fill={pal.dark} />

      {/* body */}
      <rect x="9" y="10" width="42" height="46" rx="14" fill={`url(#${g})`} stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
      {/* rim highlight */}
      <path d="M15 16 Q30 10.5 45 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* screen face */}
      <rect x="15" y="18" width="30" height="20" rx="7" fill={`url(#${s})`} stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      <rect x="17.5" y="20" width="25" height="6" rx="3" fill="rgba(255,255,255,0.07)" />

      {/* eyes */}
      <g className="bot-eyes">
        <rect x="21.5" y="23" width="5.5" height="9" rx="2.75" fill={pal.accent} className="bot-eye" />
        <rect x="33" y="23" width="5.5" height="9" rx="2.75" fill={pal.accent} className="bot-eye" />
      </g>
      {/* eyelids for sleepy droop */}
      <g className="bot-lids" fill="#0a0e14">
        <rect x="21" y="21.5" width="6.5" height="0.01" rx="1" className="bot-lid" />
        <rect x="32.5" y="21.5" width="6.5" height="0.01" rx="1" className="bot-lid" />
      </g>

      {/* mouth */}
      {MOUTHS(mouth, pal.accent)}

      {/* cheeks */}
      <circle cx="19.5" cy="33" r="1.7" fill={pal.light} opacity="0.35" />
      <circle cx="40.5" cy="33" r="1.7" fill={pal.light} opacity="0.35" />

      {/* belly light */}
      <circle cx="30" cy="47" r="3.2" fill={pal.accent} className="bot-belly" />
      <circle cx="30" cy="47" r="4.6" fill="none" stroke={pal.accent} strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

const COLORS_BY_SEED = (seed: number) => COLOR_KEYS[seed % COLOR_KEYS.length];

export function Spark({ id, fact }: { id: string; fact: string }) {
  const [found, setFound] = useState(false);
  const [collecting, setCollecting] = useState(false);

  const seed = useMemo(() => id.split("").reduce((a, c) => a + c.charCodeAt(0), 0), [id]);
  const color = COLORS_BY_SEED(seed);
  const personality = ASSIGNMENT[id] ?? (["showoff", "curious", "sleepy"] as Personality[])[seed % 3];
  const p = PERSONAS[personality];
  const cycle = { animationDelay: `${seed % 5}s`, animationDuration: `${p.duration}s` };

  useEffect(() => {
    const check = () => setFound(sparkStore.found.has(id));
    check();
    window.addEventListener("spark-sync", check);
    return () => window.removeEventListener("spark-sync", check);
  }, [id]);

  if (found && !collecting) return null;

  const onCatch = () => {
    if (collecting) return;
    setCollecting(true);
    window.dispatchEvent(new CustomEvent("spark-collect", { detail: { id, fact } }));
    setTimeout(() => setCollecting(false), 900);
  };

  return (
    <button
      type="button"
      aria-label="A hiding sparkbot — catch it!"
      data-p={personality}
      onClick={onCatch}
      className="critter-window relative inline-block h-[60px] w-[52px] cursor-pointer overflow-hidden align-middle"
    >
      {collecting ? (
        <span className="absolute inset-0">
          <span className="critter-pop absolute inset-x-0 bottom-1 grid place-items-center">
            <BotSVG uid={`${id}-c`} color={color} mouth="grin" />
          </span>
          <span className="critter-plus absolute inset-x-0 top-0 text-center font-mono text-[10px] font-bold text-mint">
            +BIT
          </span>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={`critter-spark absolute left-1/2 top-1/2 rounded-sm ${
                ["bg-cyan", "bg-mint", "bg-amber"][i % 3]
              } ${i % 2 ? "h-1 w-1" : "h-1.5 w-1.5"}`}
              style={
                {
                  "--dx": `${Math.round(Math.cos((i / 12) * Math.PI * 2) * (20 + (i % 3) * 7))}px`,
                  "--dy": `${Math.round(Math.sin((i / 12) * Math.PI * 2) * (20 + (i % 3) * 7))}px`,
                  animationDelay: `${(i % 4) * 0.04}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      ) : (
        <>
          <span className="critter-alert absolute inset-x-0 top-0 text-center font-mono text-[11px] font-bold text-amber">
            {p.alert}
          </span>
          <span className={`critter-peek ${p.peek} absolute inset-x-0 bottom-0 origin-bottom`} style={cycle}>
            {p.shadow && (
              <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/50 blur-[1.5px]" />
            )}
            <span className="critter-twinkle absolute left-0 top-1 text-[9px] text-cyan">✦</span>
            <span className="critter-twinkle absolute right-0 top-4 text-[8px] text-mint" style={{ animationDelay: "0.8s" }}>
              ✦
            </span>
            {p.extraStars && (
              <span className="critter-twinkle absolute left-1.5 top-7 text-[7px] text-amber" style={{ animationDelay: "0.4s" }}>
                ✦
              </span>
            )}
            {p.zs && <span className="critter-z absolute -top-0.5 right-0.5 font-mono text-[10px] text-muted">z</span>}
            <span className={`critter-idle ${p.idle} relative mx-auto block w-fit`}>
              <BotSVG uid={id} color={color} mouth={p.mouth} />
            </span>
          </span>
        </>
      )}
    </button>
  );
}
