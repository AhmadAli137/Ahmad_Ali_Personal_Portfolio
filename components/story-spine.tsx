"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

/**
 * The story spine: a continuous thread down the left edge with a glowing
 * dot that travels with scroll, and a chapter label that morphs as you
 * cross each act (sections tagged with data-chapter). Desktop only.
 */
export function StorySpine() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, (v) => `${6 + v * 88}%`);
  const [chapter, setChapter] = useState("");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setChapter(e.target.getAttribute("data-chapter") ?? "");
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-10 left-7 top-28 z-40 hidden w-8 xl:block">
      {/* the thread */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(0,229,255,0.28)] to-transparent" />
      {/* traveling dot */}
      <motion.div style={{ top }} className="absolute left-1/2 -translate-x-1/2">
        <div className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
      </motion.div>
      {/* chapter label riding beside the dot */}
      <motion.div style={{ top }} className="absolute left-5 -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.25 }}
            className="whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-mint/80"
          >
            {chapter}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
