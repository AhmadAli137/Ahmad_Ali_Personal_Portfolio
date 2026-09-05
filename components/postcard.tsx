"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Zap } from "lucide-react";

/**
 * A hackathon rendered as a postcard from the road: photo front with a
 * caption strip, and a flip (click/tap) to the message side — stamp,
 * postmark, the story, and where it placed. Tilted at rest, straightens
 * on hover; all motion is user-triggered.
 */

export interface PostcardData {
  award: string;
  awardTone: "amber" | "cyan";
  title: string;
  desc: string;
  chips: string[];
  href: string;
  internal?: boolean;
  img?: string;
  imgAlt?: string;
}

const TILTS = [-2.4, 1.8, -1.2, 2.6, -1.9, 1.3, -2.8, 2.1];

function parts(award: string) {
  const year = award.match(/20\d\d/)?.[0];
  const [head, ...rest] = award.split(" — ");
  const event = year ? head.replace(year, "").trim() : head;
  return { year, event, result: rest.join(" — ") };
}

export function Postcard({ data, index }: { data: PostcardData; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const { year, event, result } = parts(data.award);
  const tilt = TILTS[index % TILTS.length];
  const ink = "#2b2a24";
  const tone = data.awardTone === "amber" ? "#9a5800" : "#0a6578";

  return (
    <div className="[perspective:1400px]" style={{ ["--tilt" as string]: `${tilt}deg` }}>
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
        className="group relative aspect-[7/5] cursor-pointer rotate-[var(--tilt)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5 motion-reduce:rotate-0 motion-reduce:transition-none"
      >
        <div
          className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* ---- front: the picture side ---- */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[4px] bg-[#efe8d6] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] [backface-visibility:hidden]"
            style={{ color: ink }}
          >
            {data.img ? (
              <div className="relative flex-1 overflow-hidden rounded-[2px] bg-[#ddd4bd]">
                <Image src={data.img} alt={data.imgAlt ?? data.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="relative flex flex-1 flex-col items-center justify-center rounded-[2px] border border-[#2b2a24]/25 text-center">
                <div className="pointer-events-none absolute inset-1 rounded-[2px] border border-[#2b2a24]/15" />
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-60">greetings from</div>
                <div className="mt-1.5 px-4 text-xl font-extrabold leading-tight">{event}</div>
                {year && <div className="mt-1.5 font-mono text-[10px] opacity-60">· {year} ·</div>}
              </div>
            )}
            <div className="flex items-baseline justify-between gap-2 pt-2">
              <span className="truncate font-mono text-[11px] font-bold">{data.title}</span>
              <span className="shrink-0 font-mono text-[9px] opacity-55">{year ?? "flip"} ↻</span>
            </div>
          </div>

          {/* ---- back: the message side ---- */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-[4px] bg-[#efe8d6] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{ color: ink }}
          >
            {/* stamp + postmark */}
            <div className="pointer-events-none absolute right-3 top-3 flex items-start">
              <div
                className="relative z-10 grid h-12 w-10 place-items-center rounded-[2px] border border-dotted border-[#2b2a24]/40 bg-white/60 p-0.5"
              >
                <div className="grid h-full w-full place-items-center rounded-[1px]" style={{ backgroundColor: tone, color: "#efe8d6" }}>
                  {data.awardTone === "amber" ? <Award size={15} /> : <Zap size={15} />}
                </div>
              </div>
              <div className="absolute -left-7 top-0.5 grid h-11 w-11 rotate-[-12deg] place-items-center rounded-full border border-[#2b2a24]/30 text-center opacity-70">
                <span className="font-mono text-[8px] leading-tight">{year ?? "★"}<br />POST</span>
              </div>
            </div>

            <div className="mb-2 pr-20 font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
              {event}
            </div>

            <div className="flex min-h-0 flex-1 gap-3">
              <p className="w-[56%] overflow-hidden text-[11px] leading-relaxed opacity-85">{data.desc}</p>
              <div className="w-px shrink-0 bg-[#2b2a24]/20" />
              <div className="flex min-w-0 flex-1 flex-col pt-5">
                {result && (
                  <div className="mb-1.5 text-[11px] font-bold leading-snug" style={{ color: tone }}>
                    {result}
                  </div>
                )}
                <div className="font-mono text-[9px] leading-relaxed opacity-60">
                  {data.chips.join(" · ")}
                </div>
                <div className="mt-auto pt-2">
                  {data.internal ? (
                    <Link
                      href={data.href}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] font-bold underline decoration-[#2b2a24]/30 underline-offset-2 hover:decoration-[#2b2a24]"
                    >
                      view project →
                    </Link>
                  ) : (
                    <a
                      href={data.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[10px] font-bold underline decoration-[#2b2a24]/30 underline-offset-2 hover:decoration-[#2b2a24]"
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
