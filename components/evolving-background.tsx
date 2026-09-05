"use client";

import { useEffect, useState } from "react";

/**
 * The atmosphere evolves with the story: three vast blurred light fields
 * behind the page cross-fade to each chapter's color mood as it scrolls
 * into view (driven by the same data-chapter markers).
 */

interface Mood {
  a: string; // top-left field
  b: string; // right field
  c: string; // bottom field
}

const MOODS: Mood[] = [
  { a: "#00e5ff", b: "#34f5a2", c: "#0a4a5c" }, // 01 hello — cyan dawn
  { a: "#0090ff", b: "#00e5ff", c: "#123a6e" }, // 02 archive — hologram blue
  { a: "#34f5a2", b: "#00e5ff", c: "#0f6e4a" }, // 03 sayspark — mint
  { a: "#8ab8ff", b: "#00e5ff", c: "#2a3a6e" }, // 04 projects — ice
  { a: "#ffb454", b: "#ff8a5c", c: "#6e3a1a" }, // 05 arenas — trophy amber
  { a: "#8ab8ff", b: "#34f5a2", c: "#1f3a5e" }, // 06 the road — steel & mint
  { a: "#8a70ff", b: "#00e5ff", c: "#3a2a6e" }, // 07 toolkit — violet
  { a: "#34f5a2", b: "#00e5ff", c: "#0f5c4a" }, // 08 your move — bright close
];

export function EvolvingBackground() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.indexOf(e.target as HTMLElement);
            if (i >= 0) setIdx(Math.min(i, MOODS.length - 1));
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const m = MOODS[idx];
  const common =
    "absolute rounded-full transition-[background-color,transform,opacity] duration-[1800ms] ease-out will-change-transform";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" style={{ filter: "blur(90px)" }}>
      <div
        className={common}
        style={{
          width: "70vw",
          height: "70vw",
          left: "-22vw",
          top: "-24vh",
          backgroundColor: m.a,
          opacity: 0.15,
          transform: `translate(${idx % 2 ? 10 : -6}vw, ${idx % 2 ? 14 : -8}vh)`,
        }}
      />
      <div
        className={common}
        style={{
          width: "58vw",
          height: "58vw",
          right: "-20vw",
          top: "12vh",
          backgroundColor: m.b,
          opacity: 0.11,
          transform: `translate(${idx % 2 ? -8 : 8}vw, ${idx % 2 ? -12 : 10}vh)`,
        }}
      />
      <div
        className={common}
        style={{
          width: "80vw",
          height: "52vw",
          left: "8vw",
          bottom: "-32vh",
          backgroundColor: m.c,
          opacity: 0.18,
          transform: `translateX(${idx % 3 === 0 ? -12 : 12}vw) rotate(${idx * 4}deg)`,
        }}
      />
    </div>
  );
}
