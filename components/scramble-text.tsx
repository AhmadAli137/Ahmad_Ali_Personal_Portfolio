"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>/*";

/** Text decodes from scrambled characters, left to right. */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    const duration = 950;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(p * text.length);
      let s = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        const c = text[i];
        s += c === " " ? " " : CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span className={className}>{out}</span>;
}
