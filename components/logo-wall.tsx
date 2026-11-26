"use client";

import { useState } from "react";
import Image from "next/image";
import { wall } from "@/lib/competitions";

/**
 * Every organization on the record. Pick a logo and the panel beside the wall
 * shows what happened there — works the same by hover, focus or tap.
 */
export function LogoWall() {
  const [active, setActive] = useState(0);
  const org = wall[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
      <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:grid-cols-6">
        {wall.map((o, i) => {
          const selected = i === active;
          return (
            <li key={o.name}>
              <button
                type="button"
                aria-pressed={selected}
                aria-label={o.name}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`grid aspect-[4/3] w-full place-items-center rounded-lg border bg-white p-3 transition-all ${
                  selected ? "border-accent opacity-100" : "border-line opacity-60 grayscale hover:opacity-100"
                }`}
              >
                {o.logo ? (
                  <Image
                    src={o.logo}
                    alt=""
                    width={120}
                    height={60}
                    className="max-h-[48px] w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-[11px] font-medium leading-tight text-neutral-700">{o.name}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="lg:border-l lg:border-line lg:pl-10">
        <div key={org.name} className="rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{org.meta}</p>
          <h3 className="mt-2 text-xl font-medium tracking-tight">{org.name}</h3>
          <ul className="mt-4 space-y-2.5">
            {org.highlights.map((h) => (
              <li key={h} className="text-sm leading-relaxed text-muted">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
