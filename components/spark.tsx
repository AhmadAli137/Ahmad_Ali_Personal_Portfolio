"use client";

import { useEffect, useMemo, useState } from "react";
import { sparkStore } from "@/lib/spark-store";

/**
 * A sparkbot — a detailed pixel critter hiding behind the UI. It peeks out
 * with a squash-and-stretch pop, idles through a bob → blink → wave cycle
 * with twinkles, ducks back into hiding, and bursts into sparkles (+BIT)
 * when caught. State is per-visit: refresh restarts the hunt.
 *
 * Pixel map legend: b = body, d = screen face, e = glowing eye/antenna, . = empty
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
const F_BLINK = [
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

const COLORS = ["fill-cyan", "fill-mint", "fill-amber"];

export function Spark({ id, fact }: { id: string; fact: string }) {
  const [found, setFound] = useState(false);
  const [collecting, setCollecting] = useState(false);

  const seed = useMemo(() => id.split("").reduce((a, c) => a + c.charCodeAt(0), 0), [id]);
  const body = COLORS[seed % COLORS.length];
  const cycle = { animationDelay: `${seed % 5}s`, animationDuration: `${9 + (seed % 4)}s` };

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
          {/* alert bubble on hover */}
          <span className="critter-alert absolute inset-x-0 top-0 text-center font-mono text-[10px] font-bold text-amber">
            !
          </span>
          <span className="critter-peek absolute inset-x-0 bottom-0 origin-bottom" style={cycle}>
            {/* ground shadow */}
            <span className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-black/50 blur-[1px]" />
            {/* twinkles */}
            <span className="critter-twinkle absolute -left-0.5 top-0 text-[8px] text-cyan">✦</span>
            <span className="critter-twinkle absolute -right-0.5 top-2 text-[7px] text-mint" style={{ animationDelay: "0.8s" }}>
              ✦
            </span>
            {/* 3-frame idle: bob → blink → wave */}
            <span className="critter-idle relative block" style={{ width: W, height: H, margin: "0 auto" }}>
              <span className="cq-open absolute inset-0"><Frame map={F_OPEN} body={body} /></span>
              <span className="cq-blink absolute inset-0"><Frame map={F_BLINK} body={body} /></span>
              <span className="cq-wave absolute inset-0"><Frame map={F_WAVE} body={body} /></span>
            </span>
          </span>
        </>
      )}
    </button>
  );
}
