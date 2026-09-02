"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin glowing beam across the very top showing scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan via-mint to-cyan shadow-[0_0_10px_rgba(0,229,255,0.6)]"
    />
  );
}
