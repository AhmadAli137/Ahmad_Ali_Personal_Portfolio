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
    "absolute rounded-full transition-[background-color,transform] duration-[1600ms] ease-out will-change-transform";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" style={{ filter: "blur(110px)" }}>
      <div
        className={common}
        style={{
          width: "55vw",
          height: "55vw",
          left: "-18vw",
          top: "-20vh",
          backgroundColor: m.a,
          opacity: 0.1,
          transform: `translateY(${idx % 2 ? 6 : -4}vh)`,
        }}
      />
      <div
        className={common}
        style={{
          width: "48vw",
          height: "48vw",
          right: "-16vw",
          top: "18vh",
          backgroundColor: m.b,
          opacity: 0.08,
          transform: `translateY(${idx % 2 ? -5 : 5}vh)`,
        }}
      />
      <div
        className={common}
        style={{
          width: "60vw",
          height: "40vw",
          left: "12vw",
          bottom: "-28vh",
          backgroundColor: m.c,
          opacity: 0.14,
          transform: `translateX(${idx % 3 === 0 ? -4 : 4}vw)`,
        }}
      />
    </div>
  );
}
