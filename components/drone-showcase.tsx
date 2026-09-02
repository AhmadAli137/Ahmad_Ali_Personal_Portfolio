"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Hud } from "@/components/hud";
import { Spark } from "@/components/spark";

const DroneScene = dynamic(() => import("./drone-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center font-mono text-xs text-mint">
      INITIALIZING UAV-01<span className="cursor-blink ml-1 inline-block h-[1em] w-[8px] bg-mint" />
    </div>
  ),
});

/**
 * The signature 3D moment: an orbitable holographic quadcopter.
 * The heavy three.js bundle only loads when the section nears the viewport.
 */
export function DroneShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 pb-20">
      <Hud>
        <div className="relative h-[440px] overflow-hidden rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_70%_90%_at_50%_100%,rgba(0,229,255,0.06),transparent),linear-gradient(160deg,rgba(12,20,32,0.7),rgba(10,14,20,0.7))]">
          {load && <DroneScene />}
          {/* HUD chrome */}
          <div className="absolute left-4 top-3.5 font-mono text-[11px] tracking-wider text-cyan/80">
            <span className="pointer-events-none">UAV-01 · INDOOR AUTONOMOUS DRONE</span>{" "}
            <Spark id="drone" fact="This quadcopter is real — it won Best Demo at IEEE PIMRC 2023 in Toronto, flying GPS-denied with optical flow. Built as Ahmad's capstone." />
          </div>
          <div className="pointer-events-none absolute right-4 top-3.5 font-mono text-[11px] text-mint/80">
            ◉ HOVER STABLE
          </div>
          <div className="pointer-events-none absolute bottom-3.5 left-4 font-mono text-[11px] text-muted">
            drag to orbit
          </div>
          <Link
            href="/projects/drone"
            className="absolute bottom-3 right-4 rounded-full border border-line-strong bg-bg/60 px-4 py-1.5 font-mono text-[11px] text-cyan backdrop-blur transition-colors hover:border-cyan"
          >
            IEEE Best Demo — full story →
          </Link>
        </div>
      </Hud>
    </div>
  );
}
