"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * A sparkbot — a tiny pixel critter hiding behind the UI. It peeks out,
 * bobs around, and ducks back into hiding on a cycle; catch it while it's
 * out. Caught bots pop in a sparkle burst (then count toward the byte).
 */

const BOT_A = [
  "....#....",
  "....#....",
  "..#####..",
  ".#######.",
  ".##.#.##.",
  ".#######.",
  ".#.###.#.",
  "..#####..",
  "..#...#..",
];
const BOT_B = [
  ".....#...",
  "....#....",
  "..#####..",
  ".#######.",
  ".#######.",
  ".#######.",
  ".#.###.#.",
  "..#####..",
  "...#.#...",
];

function Frame({ map, cls }: { map: string[]; cls: string }) {
  const s = 3;
  return (
    <svg width={9 * s} height={9 * s} viewBox={`0 0 ${9 * s} ${9 * s}`} className={cls}>
      {map.flatMap((row, r) =>
        row
          .split("")
          .map((c, i) => (c === "#" ? <rect key={`${r}-${i}`} x={i * s} y={r * s} width={s} height={s} /> : null))
      )}
    </svg>
  );
}

const COLORS = ["fill-cyan", "fill-mint", "fill-amber"];

export function Spark({ id, fact }: { id: string; fact: string }) {
  const [found, setFound] = useState(false);
  const [collecting, setCollecting] = useState(false);

  const seed = useMemo(() => id.split("").reduce((a, c) => a + c.charCodeAt(0), 0), [id]);
  const color = COLORS[seed % COLORS.length];
  const cycle = { animationDelay: `${seed % 5}s`, animationDuration: `${8 + (seed % 4)}s` };

  useEffect(() => {
    const check = () => {
      try {
        const arr: string[] = JSON.parse(localStorage.getItem("byte-bits") ?? "[]");
        setFound(arr.includes(id));
      } catch {}
    };
    check();
    window.addEventListener("spark-sync", check);
    return () => window.removeEventListener("spark-sync", check);
  }, [id]);

  if (found && !collecting) return null;

  const onCatch = () => {
    if (collecting) return;
    setCollecting(true);
    window.dispatchEvent(new CustomEvent("spark-collect", { detail: { id, fact } }));
    setTimeout(() => setCollecting(false), 750);
  };

  return (
    <button
      type="button"
      aria-label="A hiding sparkbot — catch it!"
      onClick={onCatch}
      className="critter-window relative inline-block h-8 w-8 cursor-pointer overflow-hidden align-middle"
    >
      {collecting ? (
        <span className="absolute inset-0">
          <span className="critter-pop absolute inset-0 grid place-items-center">
            <Frame map={BOT_B} cls={color} />
          </span>
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className={`critter-spark absolute left-1/2 top-1/2 h-1 w-1 rounded-sm ${
                ["bg-cyan", "bg-mint", "bg-amber"][i % 3]
              }`}
              style={
                {
                  "--dx": `${Math.round(Math.cos((i / 8) * Math.PI * 2) * 22)}px`,
                  "--dy": `${Math.round(Math.sin((i / 8) * Math.PI * 2) * 22)}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      ) : (
        <span className="critter-peek absolute inset-x-0 bottom-0" style={cycle}>
          <span className="critter-idle block">
            <span className="cs-f1 block"><Frame map={BOT_A} cls={color} /></span>
            <span className="cs-f2 -mt-[27px] block"><Frame map={BOT_B} cls={color} /></span>
          </span>
        </span>
      )}
    </button>
  );
}
