"use client";

import { useEffect, useMemo, useState } from "react";
import { sparkStore } from "@/lib/spark-store";

/**
 * Sparkbots — pixel critters hiding behind the UI, each with a personality:
 * showoff (dances), zoomer (hyper, freezes on hover), curious (glances around),
 * shy (half-hidden, ducks), sleepy (dozes, startles awake), floaty (anti-gravity).
 * State is per-visit: refresh restarts the hunt.
 *
 * Pixel legend: b = body, d = screen face, e = glowing eye/antenna, . = empty
 */

const F_OPEN = [
  "....be.....",
  "....b......",
  "..bbbbbbb..",
  ".bbbbbbbbb.",
  ".bdddddddb.",
  ".bdeddeddb.",
  ".bdddddddb.",
  ".bbbbbbbbb.",
  "..bb...bb..",
];
const F_CLOSED = [
  "....be.....",
  "....b......",
  "..bbbbbbb..",
  ".bbbbbbbbb.",
  ".bdddddddb.",
  ".bdddddddb.",
  ".bdddddddb.",
  ".bbbbbbbbb.",
  "..bb...bb..",
];
const F_WAVE = [
  "....be.....",
  "...b.......",
  "b.bbbbbbb..",
  ".bbbbbbbbb.",
  ".bdddddddb.",
  ".bdeddeddb.",
  ".bdddddddb.",
  ".bbbbbbbbb.",
  "..bb...bb..",
];
const mirror = (m: string[]) => m.map((r) => r.split("").reverse().join(""));
const F_WAVE_M = mirror(F_WAVE);
const F_LOOK_L = F_OPEN.map((r, i) => (i === 5 ? ".beddedddb." : r));
const F_LOOK_R = F_OPEN.map((r, i) => (i === 5 ? ".bddeddedb." : r));
const F_WIDE = F_OPEN.map((r, i) => (i === 4 ? ".bdeddeddb." : r));

const S = 3;
const W = 11 * S;
const H = 9 * S;

function Frame({ map, body }: { map: string[]; body: string }) {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {map.flatMap((row, r) =>
        row.split("").map((c, i) => {
          if (c === ".") return null;
          const cls = c === "b" ? body : c === "d" ? "critter-dark" : "critter-eye";
          return <rect key={`${r}-${i}`} x={i * S} y={r * S} width={S} height={S} className={cls} />;
        })
      )}
    </svg>
  );
}

type Personality = "showoff" | "zoomer" | "curious" | "shy" | "sleepy" | "floaty";

interface Persona {
  frames: { map: string[]; cls: string }[];
  peek: string;
  idle: string;
  duration: number;
  alert: string;
  shadow: boolean;
  zs?: boolean;
  extraStars?: boolean;
}

const PERSONAS: Record<Personality, Persona> = {
  showoff: {
    frames: [
      { map: F_OPEN, cls: "so-1" },
      { map: F_WAVE, cls: "so-2" },
      { map: F_WAVE_M, cls: "so-3" },
    ],
    peek: "pk-default",
    idle: "id-dance",
    duration: 8,
    alert: "!",
    shadow: true,
  },
  zoomer: {
    frames: [{ map: F_OPEN, cls: "al-on" }],
    peek: "pk-zoom",
    idle: "id-vibrate",
    duration: 4.5,
    alert: "!!",
    shadow: true,
  },
  curious: {
    frames: [
      { map: F_OPEN, cls: "cu-1" },
      { map: F_LOOK_L, cls: "cu-2" },
      { map: F_LOOK_R, cls: "cu-3" },
    ],
    peek: "pk-default",
    idle: "id-tilt",
    duration: 9,
    alert: "?",
    shadow: true,
  },
  shy: {
    frames: [{ map: F_WIDE, cls: "al-on" }],
    peek: "pk-shy",
    idle: "id-tremble",
    duration: 10,
    alert: "…",
    shadow: false,
  },
  sleepy: {
    frames: [
      { map: F_CLOSED, cls: "sl-closed" },
      { map: F_OPEN, cls: "sl-open" },
    ],
    peek: "pk-sleepy",
    idle: "id-doze",
    duration: 12,
    alert: "?!",
    shadow: true,
    zs: true,
  },
  floaty: {
    frames: [
      { map: F_OPEN, cls: "cu-1" },
      { map: F_CLOSED, cls: "cu-2" },
      { map: F_OPEN, cls: "cu-3" },
    ],
    peek: "pk-float",
    idle: "id-drift",
    duration: 11,
    alert: "✦",
    shadow: false,
    extraStars: true,
  },
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

const COLORS = ["fill-cyan", "fill-mint", "fill-amber"];

export function Spark({ id, fact }: { id: string; fact: string }) {
  const [found, setFound] = useState(false);
  const [collecting, setCollecting] = useState(false);

  const seed = useMemo(() => id.split("").reduce((a, c) => a + c.charCodeAt(0), 0), [id]);
  const body = COLORS[seed % COLORS.length];
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
      className="critter-window relative inline-block h-10 w-9 cursor-pointer overflow-hidden align-middle"
    >
      {collecting ? (
        <span className="absolute inset-0">
          <span className="critter-pop absolute inset-x-0 bottom-1 grid place-items-center">
            <Frame map={F_WAVE} body={body} />
          </span>
          <span className="critter-plus absolute inset-x-0 top-0 text-center font-mono text-[9px] font-bold text-mint">
            +BIT
          </span>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`critter-spark absolute left-1/2 top-1/2 rounded-sm ${
                ["bg-cyan", "bg-mint", "bg-amber"][i % 3]
              } ${i % 2 ? "h-1 w-1" : "h-1.5 w-1.5"}`}
              style={
                {
                  "--dx": `${Math.round(Math.cos((i / 10) * Math.PI * 2) * (18 + (i % 3) * 6))}px`,
                  "--dy": `${Math.round(Math.sin((i / 10) * Math.PI * 2) * (18 + (i % 3) * 6))}px`,
                  animationDelay: `${(i % 4) * 0.04}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      ) : (
        <>
          <span className="critter-alert absolute inset-x-0 top-0 text-center font-mono text-[10px] font-bold text-amber">
            {p.alert}
          </span>
          <span className={`critter-peek ${p.peek} absolute inset-x-0 bottom-0 origin-bottom`} style={cycle}>
            {p.shadow && (
              <span className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-black/50 blur-[1px]" />
            )}
            <span className="critter-twinkle absolute -left-0.5 top-0 text-[8px] text-cyan">✦</span>
            <span
              className="critter-twinkle absolute -right-0.5 top-2 text-[7px] text-mint"
              style={{ animationDelay: "0.8s" }}
            >
              ✦
            </span>
            {p.extraStars && (
              <span
                className="critter-twinkle absolute left-1 top-4 text-[6px] text-amber"
                style={{ animationDelay: "0.4s" }}
              >
                ✦
              </span>
            )}
            {p.zs && <span className="critter-z absolute -top-1 right-0 font-mono text-[9px] text-muted">z</span>}
            <span className={`critter-idle ${p.idle} relative block`} style={{ width: W, height: H, margin: "0 auto" }}>
              {p.frames.map((f, i) => (
                <span key={i} className={`${f.cls} absolute inset-0`}>
                  <Frame map={f.map} body={body} />
                </span>
              ))}
            </span>
          </span>
        </>
      )}
    </button>
  );
}
