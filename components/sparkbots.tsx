"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sparkStore } from "@/lib/spark-store";

/**
 * Free-roaming sparkbots: six visually distinct characters that travel across
 * the screen on personality-specific journeys — strutting, rocketing,
 * meandering, scuttling, napping mid-walk, or drifting on a saucer.
 * Click to catch (bursts + counts toward the byte). Per-visit state.
 */

/* ---------------- palettes ---------------- */

const PAL = {
  cyan: { light: "#7df3ff", mid: "#00e5ff", dark: "#0a7f96", accent: "#eaffff" },
  mint: { light: "#8dffc9", mid: "#34f5a2", dark: "#0f8f5a", accent: "#eafff4" },
  amber: { light: "#ffd9a0", mid: "#ffb454", dark: "#b06f1e", accent: "#fff6e8" },
  violet: { light: "#c9b8ff", mid: "#8a70ff", dark: "#4a3a99", accent: "#f1ecff" },
  rose: { light: "#ffb8d0", mid: "#ff6b9d", dark: "#a03060", accent: "#ffeef5" },
  ice: { light: "#d8f4ff", mid: "#8ab8ff", dark: "#3e5f9e", accent: "#f4faff" },
} as const;

type PalKey = keyof typeof PAL;

function Grad({ id, p }: { id: string; p: (typeof PAL)[PalKey] }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor={p.light} />
      <stop offset="55%" stopColor={p.mid} />
      <stop offset="100%" stopColor={p.dark} />
    </linearGradient>
  );
}

/* ---------------- six distinct bot designs (viewBox 0 0 64 64) ---------------- */

function ShowoffBot() {
  const p = PAL.amber;
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" className="bot-svg block">
      <defs><Grad id="g-show" p={p} /></defs>
      {/* star antenna */}
      <line x1="32" y1="10" x2="32" y2="3" stroke={p.dark} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 0 l1.6 3.2 3.4 0.4 -2.5 2.4 0.7 3.4 -3.2 -1.7 -3.2 1.7 0.7 -3.4 -2.5 -2.4 3.4 -0.4 Z" fill={p.accent} className="bot-antenna" />
      {/* waving arms */}
      <rect x="1" y="26" width="8" height="16" rx="4" fill={p.dark} className="arm-groove" />
      <rect x="55" y="26" width="8" height="16" rx="4" fill={p.dark} className="arm-wave" />
      {/* legs */}
      <rect x="17" y="52" width="11" height="9" rx="4" fill={p.dark} className="leg-strut-a" />
      <rect x="36" y="52" width="11" height="9" rx="4" fill={p.dark} className="leg-strut-b" />
      {/* body */}
      <rect x="10" y="9" width="44" height="46" rx="15" fill="url(#g-show)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <path d="M16 15 Q32 9.5 48 15" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* sunglasses visor */}
      <g className="visor-tilt">
        <rect x="14.5" y="19" width="35" height="10" rx="5" fill="#0a0e14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        <rect x="17" y="21" width="13" height="6" rx="3" fill="#1d2f42" />
        <rect x="34" y="21" width="13" height="6" rx="3" fill="#1d2f42" />
        <rect x="18" y="21.6" width="5" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
        <rect x="35" y="21.6" width="5" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      </g>
      {/* grin */}
      <path d="M22 36 Q32 44 42 36" stroke={p.accent} strokeWidth="2" fill="none" strokeLinecap="round" className="mouth-sing" />
      {/* bowtie */}
      <path d="M26 46 l6 3 6 -3 v6 l-6 -3 -6 3 Z" fill={p.accent} opacity="0.9" />
      <circle cx="32" cy="49" r="1.4" fill={p.dark} />
    </svg>
  );
}

function ZoomerBot() {
  const p = PAL.cyan;
  return (
    <svg width="58" height="46" viewBox="0 0 72 56" className="bot-svg block">
      <defs><Grad id="g-zoom" p={p} /></defs>
      {/* jet flame */}
      <g className="jet-flame">
        <path d="M10 26 Q-2 28 8 32 Q0 32 8 36 Q2 40 12 38 L14 31 Z" fill={p.mid} opacity="0.85" />
        <path d="M12 29 Q4 30 10 33 Q6 35 13 35 L14 31 Z" fill={p.accent} />
      </g>
      {/* speed lines */}
      <g className="speed-lines" stroke={p.mid} strokeWidth="1.6" strokeLinecap="round" opacity="0.5">
        <line x1="2" y1="16" x2="14" y2="16" />
        <line x1="-2" y1="22" x2="12" y2="22" />
        <line x1="0" y1="44" x2="13" y2="44" />
      </g>
      {/* teardrop body */}
      <path d="M12 32 Q12 12 34 12 L52 12 Q68 12 68 30 Q68 44 50 44 L30 44 Q12 44 12 32 Z" fill="url(#g-zoom)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <path d="M20 17 Q40 11 58 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* fin */}
      <path d="M30 12 L38 2 L46 12 Z" fill={p.dark} />
      {/* visor with scan line */}
      <rect x="38" y="20" width="24" height="14" rx="7" fill="#0a0e14" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <rect x="40" y="22" width="20" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="41" y="23" width="4" height="8" rx="2" fill={p.accent} className="visor-scan" />
      {/* determined mouth */}
      <path d="M46 39 h10" stroke={p.accent} strokeWidth="1.8" strokeLinecap="round" />
      {/* belly wheel */}
      <circle cx="34" cy="46" r="5" fill={p.dark} className="zoom-wheel" />
      <circle cx="34" cy="46" r="2" fill={p.accent} opacity="0.7" />
    </svg>
  );
}

function CuriousBot() {
  const p = PAL.mint;
  return (
    <svg width="50" height="60" viewBox="0 0 60 72" className="bot-svg block">
      <defs><Grad id="g-cur" p={p} /></defs>
      {/* periscope eye on a stalk */}
      <g className="eye-stalk">
        <rect x="27.5" y="6" width="5" height="16" rx="2.5" fill={p.dark} />
        <circle cx="30" cy="8" r="8" fill="#0a0e14" stroke={p.dark} strokeWidth="2" />
        <circle cx="30" cy="8" r="4.5" fill={p.accent} className="pupil-look" />
        <circle cx="31.5" cy="6.5" r="1.4" fill="#ffffff" opacity="0.9" />
      </g>
      {/* radar ears */}
      <path d="M8 34 a7 7 0 0 1 0 -14" stroke={p.dark} strokeWidth="2.5" fill="none" className="ear-radar" />
      <path d="M52 34 a7 7 0 0 0 0 -14" stroke={p.dark} strokeWidth="2.5" fill="none" className="ear-radar-b" />
      {/* egg body */}
      <path d="M30 22 Q52 22 52 46 Q52 66 30 66 Q8 66 8 46 Q8 22 30 22 Z" fill="url(#g-cur)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <path d="M15 30 Q30 23 45 30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* face: small second eye + o mouth */}
      <circle cx="22" cy="42" r="3" fill="#0a0e14" />
      <circle cx="22.8" cy="41.2" r="1" fill={p.accent} />
      <circle cx="38" cy="44" r="2.4" fill="none" stroke={p.accent} strokeWidth="1.8" className="mouth-ooh" />
      {/* magnifier arm */}
      <g className="magnify-arm">
        <rect x="47" y="44" width="12" height="4.5" rx="2.25" fill={p.dark} />
        <circle cx="60" cy="46" r="5" fill="none" stroke={p.dark} strokeWidth="2.2" />
        <circle cx="60" cy="46" r="3" fill={p.light} opacity="0.3" />
      </g>
      {/* little feet */}
      <rect x="17" y="63" width="10" height="7" rx="3.5" fill={p.dark} className="leg-toddle-a" />
      <rect x="33" y="63" width="10" height="7" rx="3.5" fill={p.dark} className="leg-toddle-b" />
    </svg>
  );
}

function ShyBot() {
  const p = PAL.rose;
  return (
    <svg width="54" height="50" viewBox="0 0 66 60" className="bot-svg block">
      <defs><Grad id="g-shy" p={p} /></defs>
      {/* cardboard box */}
      <rect x="8" y="24" width="50" height="32" rx="3" fill="#8a6a45" stroke="#5f4527" strokeWidth="1.5" />
      <rect x="8" y="24" width="50" height="7" fill="#a58154" />
      <path d="M14 32 h14 M38 40 h14 M20 48 h20" stroke="#5f4527" strokeWidth="1" opacity="0.5" />
      <text x="33" y="47" textAnchor="middle" fontSize="7" fill="#5f4527" fontFamily="monospace" opacity="0.7">FRAGILE</text>
      {/* lifting lid */}
      <g className="box-lid">
        <rect x="5" y="18" width="56" height="8" rx="2" fill="#a58154" stroke="#5f4527" strokeWidth="1.5" />
      </g>
      {/* bot peeking from under the lid */}
      <g className="shy-peeker">
        <rect x="18" y="8" width="30" height="20" rx="9" fill="url(#g-shy)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* big worried eyes */}
        <g className="bot-eyes">
          <circle cx="27" cy="17" r="4.4" fill="#0a0e14" />
          <circle cx="39" cy="17" r="4.4" fill="#0a0e14" />
          <circle cx="27.5" cy="16" r="2" fill={p.accent} className="pupil-dart" />
          <circle cx="39.5" cy="16" r="2" fill={p.accent} className="pupil-dart" />
        </g>
        {/* blush */}
        <circle cx="22" cy="22" r="1.8" fill={p.mid} opacity="0.5" />
        <circle cx="44" cy="22" r="1.8" fill={p.mid} opacity="0.5" />
        {/* tiny antenna */}
        <line x1="33" y1="8" x2="33" y2="4" stroke={p.dark} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="33" cy="3.4" r="2" fill={p.accent} className="bot-antenna" />
      </g>
      {/* peeking fingers on the box edge */}
      <g fill={p.mid}>
        <rect x="14" y="22.5" width="3" height="5" rx="1.5" />
        <rect x="19" y="22.5" width="3" height="5" rx="1.5" />
        <rect x="44" y="22.5" width="3" height="5" rx="1.5" />
        <rect x="49" y="22.5" width="3" height="5" rx="1.5" />
      </g>
    </svg>
  );
}

function SleepyBot() {
  const p = PAL.violet;
  return (
    <svg width="50" height="58" viewBox="0 0 60 70" className="bot-svg block">
      <defs><Grad id="g-slp" p={p} /></defs>
      {/* nightcap */}
      <path d="M14 18 Q16 4 34 6 Q52 8 50 16 L46 18 Q32 10 18 20 Z" fill={p.dark} />
      <path d="M48 12 Q58 10 56 20" stroke={p.dark} strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="22" r="4" fill={p.accent} className="cap-pom" />
      {/* slumped body */}
      <path d="M30 14 Q50 14 51 40 Q52 62 30 62 Q8 62 9 40 Q10 14 30 14 Z" fill="url(#g-slp)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" className="sleepy-slump" />
      <path d="M17 22 Q30 16 43 22" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* heavy-lidded eyes */}
      <g>
        <path d="M18 34 q4 3.5 8 0" stroke={p.accent} strokeWidth="2" fill="none" strokeLinecap="round" className="eye-droop-a" />
        <path d="M34 34 q4 3.5 8 0" stroke={p.accent} strokeWidth="2" fill="none" strokeLinecap="round" className="eye-droop-b" />
      </g>
      {/* yawning mouth */}
      <ellipse cx="30" cy="45" rx="3.4" ry="2.2" fill="#0a0e14" stroke={p.accent} strokeWidth="1.2" className="mouth-yawn" />
      {/* drooping arms */}
      <rect x="4" y="36" width="7" height="17" rx="3.5" fill={p.dark} transform="rotate(8 7.5 37)" />
      <rect x="49" y="36" width="7" height="17" rx="3.5" fill={p.dark} transform="rotate(-8 52.5 37)" />
      {/* slipper feet */}
      <rect x="15" y="60" width="13" height="7" rx="3.5" fill={p.dark} />
      <rect x="32" y="60" width="13" height="7" rx="3.5" fill={p.dark} />
    </svg>
  );
}

function FloatyBot() {
  const p = PAL.ice;
  return (
    <svg width="56" height="58" viewBox="0 0 68 70" className="bot-svg block">
      <defs><Grad id="g-flt" p={p} /></defs>
      {/* bot torso in the saucer */}
      <g className="floaty-lean">
        <line x1="34" y1="12" x2="34" y2="5" stroke={p.dark} strokeWidth="2" strokeLinecap="round" />
        <circle cx="34" cy="4" r="2.6" fill={p.accent} className="bot-antenna" />
        <path d="M34 10 Q48 10 48 26 L48 36 L20 36 L20 26 Q20 10 34 10 Z" fill="url(#g-flt)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        {/* serene closed-happy eyes ^^ */}
        <path d="M25 22 q3 -3.5 6 0 M37 22 q3 -3.5 6 0" stroke="#0a0e14" strokeWidth="2" fill="none" strokeLinecap="round" className="eyes-serene" />
        <path d="M29 29 Q34 32 39 29" stroke="#0a0e14" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* stubby arms resting on rim */}
        <rect x="13" y="26" width="6" height="11" rx="3" fill={p.dark} />
        <rect x="49" y="26" width="6" height="11" rx="3" fill={p.dark} />
      </g>
      {/* saucer */}
      <ellipse cx="34" cy="42" rx="26" ry="9" fill={p.dark} />
      <ellipse cx="34" cy="39.5" rx="26" ry="9" fill="url(#g-flt)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <ellipse cx="24" cy="38" rx="7" ry="2.2" fill="rgba(255,255,255,0.35)" />
      {/* glow ring + thruster drops */}
      <ellipse cx="34" cy="50" rx="16" ry="4" fill="none" stroke={p.mid} strokeWidth="2" className="saucer-ring" />
      <g fill={p.mid} className="saucer-drops">
        <circle cx="26" cy="56" r="1.8" />
        <circle cx="34" cy="59" r="2.2" />
        <circle cx="42" cy="56" r="1.8" />
      </g>
    </svg>
  );
}

/* ---------------- bot roster ---------------- */

type Personality = "showoff" | "zoomer" | "curious" | "shy" | "sleepy" | "floaty";

interface BotDef {
  id: string;
  fact: string;
  personality: Personality;
  pages: string[];
  Svg: () => React.JSX.Element;
  journey: string;
  pattern: string;
  duration: number;
  cooldown: number;
  band: "walk" | "air-low" | "air-high";
}

const BOTS: BotDef[] = [
  {
    id: "origin", personality: "showoff", pages: ["/"], Svg: ShowoffBot,
    journey: "j-strut", pattern: "p-strut", duration: 18, cooldown: 7, band: "walk",
    fact: "It started in 2014 with a science-fair project — six Windsor Regional gold medals followed before university.",
  },
  {
    id: "drone", personality: "zoomer", pages: ["/"], Svg: ZoomerBot,
    journey: "j-zoom", pattern: "p-zoom", duration: 7, cooldown: 9, band: "air-low",
    fact: "The 3D drone below is real — it won Best Demo at IEEE PIMRC 2023 in Toronto, flying GPS-denied with optical flow.",
  },
  {
    id: "sayspark", personality: "curious", pages: ["/"], Svg: CuriousBot,
    journey: "j-wander", pattern: "p-wander", duration: 24, cooldown: 8, band: "walk",
    fact: "SaySpark exists because a missed semicolon shouldn't end a kid's engineering dream — born from mentoring hundreds of students.",
  },
  {
    id: "cwsf", personality: "shy", pages: ["/"], Svg: ShyBot,
    journey: "j-scuttle", pattern: "p-scuttle", duration: 22, cooldown: 10, band: "walk",
    fact: "Canada-Wide Science Fair, four national finals: two bronze, one silver, and a $10k UOttawa scholarship — as a teenager.",
  },
  {
    id: "nasa", personality: "floaty", pages: ["/"], Svg: FloatyBot,
    journey: "j-drift", pattern: "p-drift", duration: 26, cooldown: 8, band: "air-high",
    fact: "Meteor Madness won NASA Space Apps Windsor 2025 AND a global nomination — you can play it on this site right now.",
  },
  {
    id: "status", personality: "sleepy", pages: ["/"], Svg: SleepyBot,
    journey: "j-shuffle", pattern: "p-shuffle", duration: 30, cooldown: 9, band: "walk",
    fact: "The footer status is real: building SaySpark, starting the MASc at McMaster Fall 2026, and always up for interesting problems.",
  },
  {
    id: "cities", personality: "shy", pages: ["/competitions"], Svg: ShyBot,
    journey: "j-scuttle", pattern: "p-scuttle", duration: 22, cooldown: 8, band: "walk",
    fact: "44 competitions across 10 cities — from Windsor classrooms to Michigan's Formula SAE track to national science fairs.",
  },
  {
    id: "hackathons", personality: "zoomer", pages: ["/hackathons"], Svg: ZoomerBot,
    journey: "j-zoom", pattern: "p-zoom", duration: 7, cooldown: 8, band: "air-low",
    fact: "First hackathon ever: Bordercity 2017 — and WeatherPy took 1st place. A decade of weekend builds since.",
  },
];

/* ---------------- roamer runtime ---------------- */

function Roamer({ bot, initialDelay }: { bot: BotDef; initialDelay: number }) {
  const [found, setFound] = useState(false);
  const [phase, setPhase] = useState<"idle" | "roam" | "caught">("idle");
  const [dir, setDir] = useState<1 | -1>(1);
  const [band, setBand] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const caughtRef = useRef(false);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const schedule = useCallback(
    (delay: number) => {
      timers.current.push(
        setTimeout(() => {
          if (caughtRef.current) return;
          setDir(Math.random() > 0.5 ? 1 : -1);
          setBand(Math.random());
          setPhase("roam");
          timers.current.push(
            setTimeout(() => {
              if (caughtRef.current) return;
              setPhase("idle");
              schedule(bot.cooldown * 1000);
            }, bot.duration * 1000)
          );
        }, delay)
      );
    },
    [bot.cooldown, bot.duration]
  );

  useEffect(() => {
    const check = () => {
      const f = sparkStore.found.has(bot.id);
      setFound(f);
      caughtRef.current = f;
    };
    check();
    window.addEventListener("spark-sync", check);
    if (!sparkStore.found.has(bot.id)) schedule(initialDelay);
    return () => {
      window.removeEventListener("spark-sync", check);
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bot.id]);

  if (found && phase !== "caught") return null;
  if (phase === "idle") return null;

  const bandStyle =
    bot.band === "walk"
      ? { bottom: 6 }
      : bot.band === "air-low"
        ? { top: `${28 + band * 40}vh` }
        : { top: `${12 + band * 25}vh` };

  const onCatch = () => {
    if (caughtRef.current) return;
    caughtRef.current = true;
    clear();
    setPhase("caught");
    window.dispatchEvent(new CustomEvent("spark-collect", { detail: { id: bot.id, fact: bot.fact } }));
    timers.current.push(setTimeout(() => setFound(true), 900));
  };

  const Svg = bot.Svg;

  return (
    <button
      type="button"
      aria-label="A roaming sparkbot — catch it!"
      data-p={bot.personality}
      onClick={onCatch}
      className={`roamer ${bot.journey} fixed left-0 z-30 cursor-pointer`}
      style={{
        ...bandStyle,
        animationDuration: `${bot.duration}s`,
        animationDirection: dir === -1 ? ("reverse" as const) : undefined,
        animationPlayState: phase === "caught" ? "paused" : undefined,
      }}
    >
      <span className="relative block" style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}>
        {phase === "caught" ? (
          <span className="relative block">
            <span className="critter-pop block"><Svg /></span>
            <span className="critter-plus absolute inset-x-0 -top-3 text-center font-mono text-[10px] font-bold text-mint">
              +BIT
            </span>
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className={`critter-spark absolute left-1/2 top-1/2 rounded-sm ${["bg-cyan", "bg-mint", "bg-amber"][i % 3]} ${i % 2 ? "h-1 w-1" : "h-1.5 w-1.5"}`}
                style={
                  {
                    "--dx": `${Math.round(Math.cos((i / 12) * Math.PI * 2) * (22 + (i % 3) * 8))}px`,
                    "--dy": `${Math.round(Math.sin((i / 12) * Math.PI * 2) * (22 + (i % 3) * 8))}px`,
                    animationDelay: `${(i % 4) * 0.04}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>
        ) : (
          <span className={`${bot.pattern} block`}>
            <span className="critter-twinkle absolute -left-1 top-0 text-[9px] text-cyan">✦</span>
            <span className="critter-twinkle absolute -right-1 top-3 text-[8px] text-mint" style={{ animationDelay: "0.8s" }}>✦</span>
            {bot.personality === "sleepy" && (
              <span className="critter-z absolute -top-2 right-0 font-mono text-[11px] text-muted">z</span>
            )}
            <Svg />
          </span>
        )}
      </span>
    </button>
  );
}

export function Sparkbots() {
  const pathname = usePathname();
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const check = () => setReleased(sparkStore.active);
    check();
    window.addEventListener("spark-sync", check);
    return () => window.removeEventListener("spark-sync", check);
  }, []);

  if (!released) return null;

  const active = BOTS.filter((b) => b.pages.includes(pathname));
  return (
    <>
      {active.map((b, i) => (
        <Roamer key={`${b.id}`} bot={b} initialDelay={1200 + i * 5000} />
      ))}
    </>
  );
}
