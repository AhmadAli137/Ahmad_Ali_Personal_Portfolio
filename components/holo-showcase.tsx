"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Hud } from "@/components/hud";

const HoloScene = dynamic(() => import("./holo-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center font-mono text-xs text-mint">
      INITIALIZING HOLO-ARCHIVE<span className="cursor-blink ml-1 inline-block h-[1em] w-[8px] bg-mint" />
    </div>
  ),
});

const MODELS = [
  {
    key: "drone",
    label: "UAV-01 DRONE",
    blurb: "GPS-denied autonomy · IEEE Best Demo 2023",
    href: "/projects/drone",
  },
  {
    key: "glove",
    label: "ASL GLOVE",
    blurb: "Sign language → synthesized speech, in real time",
    href: "/projects/asl-glove",
  },
  {
    key: "spark",
    label: "SPARK MINI",
    blurb: "SaySpark's voice-first robot — live in early access",
    href: "/venture",
  },
  {
    key: "paddle",
    label: "EDGE PADDLE",
    blurb: "Spatial haptics smart paddle · Hack the 6ix 2026",
    href: "/projects/edge-pong",
  },
  {
    key: "battery",
    label: "EV PACK",
    blurb: "Battery packs + BMS firmware · CHARGE Lab",
    href: "/#experience",
  },
];

/**
 * The signature section: Ahmad's hardware as morphing point-cloud holograms.
 * The three.js bundle loads only when the section nears the viewport.
 */
export function HoloShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState(0);

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

  const current = MODELS[model];

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 pb-20">
      <Hud>
        <div className="relative h-[480px] overflow-hidden rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_70%_90%_at_50%_100%,rgba(0,229,255,0.06),transparent),linear-gradient(160deg,rgba(12,20,32,0.7),rgba(10,14,20,0.7))]">
          {load && <HoloScene model={model} />}

          <div className="pointer-events-none absolute left-4 top-3.5 font-mono text-[11px] tracking-wider text-cyan/80">
            HOLO-ARCHIVE {"//"} THINGS I&apos;VE BUILT
          </div>
          <div className="pointer-events-none absolute right-4 top-3.5 font-mono text-[11px] text-mint/80">
            ◉ {current.label}
          </div>
          <div className="pointer-events-none absolute bottom-[74px] left-4 right-4 text-center font-mono text-[11px] text-muted">
            {current.blurb}
          </div>

          {/* selector */}
          <div className="absolute inset-x-0 bottom-3.5 flex flex-wrap items-center justify-center gap-2 px-4">
            {MODELS.map((m, i) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setModel(i)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-all ${
                  i === model
                    ? "border-cyan bg-cyan/15 text-cyan shadow-[0_0_14px_rgba(0,229,255,0.3)]"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
            <Link
              href={current.href}
              className="rounded-full border border-mint/40 bg-mint/10 px-3.5 py-1.5 font-mono text-[11px] text-mint transition-all hover:bg-mint/20"
            >
              open →
            </Link>
          </div>
        </div>
      </Hud>
    </div>
  );
}
