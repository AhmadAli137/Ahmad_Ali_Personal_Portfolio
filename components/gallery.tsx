"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { dimsOf } from "@/lib/image-dims";
import type { ChapterId, Photo } from "@/lib/photos";
import { FilterPill } from "./ui";

/**
 * A photo grid that keeps every image at its true proportions, with an optional
 * chapter filter and a full-screen viewer (arrow keys to move, Esc to close).
 */
export function Gallery({
  photos,
  chapters,
  initial,
}: {
  photos: Photo[];
  chapters?: { id: ChapterId; label: string }[];
  /** Show this many until the visitor asks for the rest. */
  initial?: number;
}) {
  const [chapter, setChapter] = useState<ChapterId | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const inChapter = useMemo(
    () => photos.filter((p) => chapter === "all" || p.chapter === chapter),
    [photos, chapter]
  );
  const limited = initial !== undefined && !expanded && chapter === "all";
  const shown = limited ? inChapter.slice(0, initial) : inChapter;

  const close = useCallback(() => {
    setViewing(null);
    returnFocus.current?.focus();
  }, []);

  const step = useCallback(
    (d: 1 | -1) => setViewing((v) => (v === null ? v : (v + d + inChapter.length) % inChapter.length)),
    [inChapter.length]
  );

  useEffect(() => {
    if (viewing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing, close, step]);

  const current = viewing === null ? null : inChapter[viewing];

  return (
    <div>
      {chapters && (
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterPill active={chapter === "all"} onClick={() => setChapter("all")} count={photos.length}>
            All
          </FilterPill>
          {chapters.map((c) => (
            <FilterPill
              key={c.id}
              active={chapter === c.id}
              onClick={() => setChapter(c.id)}
              count={photos.filter((p) => p.chapter === c.id).length}
            >
              {c.label}
            </FilterPill>
          ))}
        </div>
      )}

      <ul key={chapter} className="rise columns-2 gap-3 md:columns-3 md:gap-4">
        {shown.map((p, i) => {
          const [w, h] = dimsOf(p.src);
          return (
            <li key={p.src} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={(e) => {
                  returnFocus.current = e.currentTarget;
                  setViewing(i);
                }}
                aria-label={`View photo: ${p.caption}`}
                className="group relative block w-full overflow-hidden rounded-lg bg-ink/5"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={w}
                  height={h}
                  sizes="(max-width: 768px) 50vw, 360px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-10 text-left text-xs leading-snug text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.caption}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {limited && inChapter.length > shown.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:border-ink"
          >
            Show all {inChapter.length} photos
          </button>
        </div>
      )}

      {current && viewing !== null && (
        <div
          className="fade fixed inset-0 z-[95] flex flex-col bg-black/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-mono text-xs text-white/60">
              {viewing + 1} / {inChapter.length}
            </p>
            <button
              type="button"
              aria-label="Close photo viewer"
              autoFocus
              onClick={close}
              className="grid h-11 w-11 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={dimsOf(current.src)[0]}
              height={dimsOf(current.src)[1]}
              sizes="100vw"
              onClick={(e) => e.stopPropagation()}
              className="fade h-auto max-h-[calc(100dvh-190px)] w-auto max-w-full rounded-md object-contain"
            />
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:left-5"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-white/15 hover:text-white sm:right-5"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-[15px]">{current.caption}</p>
            {current.note && <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">{current.note}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
