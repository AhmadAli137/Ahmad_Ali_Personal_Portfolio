"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Cursor-as-drone: gates the 3D scene to desktop fine-pointer devices with
 * motion allowed, and lazy-loads the three.js chunk only when it will
 * actually be shown. The native cursor hides site-wide (except text fields)
 * via the .drone-cursor class in globals.css.
 */

const DroneCursorScene = dynamic(() => import("./drone-cursor-scene"), { ssr: false });

export function DroneCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("drone-cursor");
    return () => document.documentElement.classList.remove("drone-cursor");
  }, []);

  if (!enabled) return null;
  return <DroneCursorScene />;
}
