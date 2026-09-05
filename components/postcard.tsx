"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Zap } from "lucide-react";
import type { Hack } from "@/lib/hackathons";

/**
 * A hackathon as a postcard from the road. Picture side up, tilted on the
 * desk; click/tap turns it over to the message side — stamp, postmark,
 * a handwritten note, and the address block. Motion is user-triggered only.
 */

const TILTS = [-2.4, 1.8, -1.2, 2.6, -1.9, 1.3, -2.8, 2.1];

const PAPER = "#e9e0c9";
const INK = "#2b2a24";

/* faint paper grain, tiled */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

const AIRMAIL =
  "repeating-linear-gradient(-45deg, #a8503f 0 9px, transparent 9px 18px, #3e5d94 18px 27px, transparent 27px 36px)";

function parts(award: string) {
  const year = award.match(/20\d\d/)?.[0];
  const [head, ...rest] = award.split(" — ");
  const event = year ? head.replace(year, "").trim() : head;
  return { year, event, result: rest.join(" — ") };
}

function Postmark({ year, event }: { year?: string; event: string }) {
  return (
    <svg
      viewBox="0 0 128 52"
      className="absolute -left-[74px] top-1 h-[52px] w-[128px] opacity-60"
      style={{ color: INK }}
      aria-hidden
    >
      {/* cancellation waves */}
      <path d="M4 18 q10 -6 20 0 t20 0 t20 0 t20 0" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 26 q10 -6 20 0 t20 0 t20 0 t20 0" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 34 q10 -6 20 0 t20 0 t20 0 t20 0" fill="none" stroke="currentColor" strokeWidth="1.1" />
      {/* ring */}
      <g transform="rotate(-10 103 26)">
        <circle cx="103" cy="26" r="21" fill={PAPER} stroke="currentColor" strokeWidth="1.2" />
        <circle cx="103" cy="26" r="17" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <text x="103" y="23" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="currentColor">
          {(event.split(" ")[0] || "HACK").toUpperCase().slice(0, 9)}
        </text>
        <text x="103" y="33" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="bold" fill="currentColor">
          {year ?? "★"}
        </text>
      </g>
    </svg>
  );
}

function Stamp({ tone, win }: { tone: string; win: boolean }) {
  return (
    <div
      className="relative z-10 h-[52px] w-[42px] p-[3px]"
      style={{
        /* perforated edge: scalloped tile grid; the inner panel hides interior dots */
        backgroundImage: "radial-gradient(circle at 3.5px 3.5px, transparent 2.1px, #f7f2e4 2.4px)",
        backgroundSize: "7px 7px",
        backgroundPosition: "-3.5px -3.5px",
      }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-0.5 border border-[#f7f2e4]/70"
        style={{ backgroundColor: tone, color: "#f2ecdc" }}
      >
        {win ? <Award size={15} /> : <Zap size={15} />}
        <span className="font-mono text-[7px] font-bold tracking-wide">36 HRS</span>
      </div>
    </div>
  );
}

export function Postcard({ data, index }: { data: Hack; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const { year, event, result } = parts(data.award);
  const tilt = TILTS[index % TILTS.length];
  const win = data.awardTone === "amber";
  const tone = win ? "#96560f" : "#0e6377";

  const paperStyle = {
    color: INK,
    backgroundColor: PAPER,
    backgroundImage: `${GRAIN}, linear-gradient(168deg, rgba(255,255,255,0.5), rgba(120,100,60,0.1))`,
  };

  return (
    <div className="[perspective:1500px]" style={{ ["--tilt" as string]: `${tilt}deg` }}>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${data.title} — postcard, press to flip`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className="group relative aspect-[7/5] cursor-pointer rotate-[var(--tilt)] transition-transform duration-300 ease-out hover:rotate-0 hover:-translate-y-2 hover:scale-[1.02] motion-reduce:rotate-0 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div
          className="absolute inset-0 transition-transform duration-[650ms] [transform-style:preserve-3d] motion-reduce:transition-none"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionTimingFunction: "cubic-bezier(0.3, 0.7, 0.2, 1)",
          }}
        >
          {/* ================= front — the picture side ================= */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[3px] p-2.5 pb-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 [backface-visibility:hidden] group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.6)]"
            style={paperStyle}
          >
            {data.img ? (
              <div className="relative flex-1 overflow-hidden rounded-[2px] bg-[#d8ceb4] shadow-[inset_0_0_0_1px_rgba(43,42,36,0.18)]">
                <Image src={data.img} alt={data.imgAlt ?? data.title} fill className="object-cover" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(60,45,20,0.25)]" />
              </div>
            ) : (
              <div className="relative flex flex-1 flex-col items-center justify-center rounded-[2px] border border-[#2b2a24]/30 text-center">
                <div className="pointer-events-none absolute inset-[3px] rounded-[1px] border border-[#2b2a24]/15" />
                <div className="font-mono text-[9px] uppercase tracking-[0.32em] opacity-55">greetings from</div>
                <div className="mt-1 px-5 text-[22px] font-extrabold leading-tight tracking-tight">{event}</div>
                <div className="font-hand mt-1 text-lg opacity-70">{result || "built in a weekend"}</div>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-2 px-0.5 pt-1">
              <span className="font-hand truncate text-[21px] leading-snug">{data.title}</span>
              <span className="shrink-0 font-mono text-[9px] tracking-wider opacity-50">{year ?? "↻"}</span>
            </div>
            {/* airmail edging */}
            <div className="mt-1 h-[5px] w-full rounded-[1px] opacity-70" style={{ backgroundImage: AIRMAIL }} />
          </div>

          {/* ================= back — the message side ================= */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[3px] p-3.5 pt-3 shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 [backface-visibility:hidden] [transform:rotateY(180deg)] group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.6)]"
            style={paperStyle}
          >
            <div className="absolute left-0 right-0 top-0 h-[5px] opacity-60" style={{ backgroundImage: AIRMAIL }} />

            {/* stamp + postmark */}
            <div className="pointer-events-none absolute right-3 top-3.5">
              <Stamp tone={tone} win={win} />
              <Postmark year={year} event={event} />
            </div>

            <div className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.3em] opacity-50">post card</div>

            <div className="mt-1.5 flex min-h-0 flex-1 gap-3">
              {/* the note */}
              <p className="font-hand w-[54%] overflow-hidden text-[17px] leading-[1.25] opacity-90">
                {data.desc}
              </p>
              <div className="w-px shrink-0 self-stretch bg-[#2b2a24]/20" />
              {/* the address block */}
              <div className="flex min-w-0 flex-1 flex-col pt-10">
                <div className="border-b border-[#2b2a24]/25 pb-1 font-mono text-[9px] uppercase tracking-wider opacity-70">
                  {event} {year}
                </div>
                {result ? (
                  <div className="border-b border-[#2b2a24]/25 py-1 text-[11px] font-bold leading-snug" style={{ color: tone }}>
                    {result}
                  </div>
                ) : null}
                <div className="border-b border-[#2b2a24]/25 py-1 font-mono text-[8.5px] leading-relaxed opacity-60">
                  {data.chips.join(" · ")}
                </div>
                <div className="mt-auto pt-2">
                  {data.internal ? (
                    <Link
                      href={data.href}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] font-bold underline decoration-[#2b2a24]/30 underline-offset-2 transition-colors hover:decoration-[#2b2a24]"
                    >
                      view project →
                    </Link>
                  ) : (
                    <a
                      href={data.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] font-bold underline decoration-[#2b2a24]/30 underline-offset-2 transition-colors hover:decoration-[#2b2a24]"
                    >
                      view project ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
