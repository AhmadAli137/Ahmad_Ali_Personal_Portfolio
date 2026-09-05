"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-linked drift: the wrapped element travels from `from`→`to` px as it
 * crosses the viewport (and optionally breathes in scale), making the page
 * feel like one evolving scene rather than stacked sections.
 */
export function Parallax({
  children,
  from = 34,
  to = -34,
  scale = false,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const s = useTransform(scrollYProgress, [0, 0.5, 1], [0.965, 1, 0.975]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} style={{ y, ...(scale ? { scale: s } : {}) }} className={className}>
      {children}
    </motion.div>
  );
}
