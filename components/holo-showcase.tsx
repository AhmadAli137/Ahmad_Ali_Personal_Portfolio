"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HoloScene = dynamic(() => import("./holo-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center font-mono text-xs text-mint">
      PROJECTING<span className="cursor-blink ml-1 inline-block h-[1em] w-[8px] bg-mint" />
    </div>
  ),
});

const MODELS = [
  { key: "drone", label: "UAV-01 DRONE", blurb: "GPS-denied autonomy · IEEE Best Demo 2023", href: "/projects/drone" },
  { key: "glove", label: "ASL GLOVE", blurb: "Sign language → synthesized speech, in real time", href: "/projects/asl-glove" },
  { key: "spark", label: "SPARK MINI", blurb: "SaySpark's voice-first robot — live in early access", href: "/projects/sayspark" },
  { key: "paddle", label: "EDGE PADDLE", blurb: "Spatial haptics smart paddle · Hack the 6ix 2026", href: "/projects/edge-pong" },
  { key: "battery", label: "EV PACK", blurb: "Battery packs + BMS firmware · CHARGE Lab", href: "/#experience" },
];

/**
 * Frameless hologram archive: the point-cloud projections float directly on
 * the page (soft-masked edges, no panel), reading as part of the site rather
 * than a widget. Lazy-loads three.js as the section approaches.
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
      { rootMargin: "500px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const current = MODELS[model];

  return (
    <section ref={ref} className="px-6 pb-20 pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2">
          <span className="mb-2.5 block font-mono text-[13px] text-mint">
            <span className="text-muted">{"// "}</span>hologram archive
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            Things I&apos;ve Built, Reconstructed
          </h2>
        </div>

        {/* the projection floats on the page itself — soft-masked, no frame */}
        <div
          className="h-[440px] w-full"
          style={{
            maskImage: "radial-gradient(ellipse 72% 85% at 50% 46%, black 55%, transparent 97%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 85% at 50% 46%, black 55%, transparent 97%)",
          }}
        >
          {load && <HoloScene model={model} />}
        </div>

        <div className="-mt-6 text-center">
          <p className="mb-4 font-mono text-[12px] text-muted">
            <span className="text-mint">◉ {current.label}</span> — {current.blurb} ·{" "}
            <Link href={current.href} className="text-cyan hover:underline">
              open →
            </Link>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
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
          </div>
          <p className="mt-3 font-mono text-[10px] text-muted/70">drag to orbit</p>
        </div>
      </div>
    </section>
  );
}
