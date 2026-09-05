"use client";

import { useState } from "react";

/**
 * The travel map: a cartoon paper map of Canada with bouncy markers on the
 * places competitions and research have taken Ahmad. The southern-Ontario
 * cluster gets a magnifying-glass inset so the pins have room to breathe.
 */

const PAPER = "#e9e0c9";
const INK = "#2b2a24";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface Place {
  name: string;
  x: number;
  y: number;
  icon: string;
  note: string;
  inset?: boolean; // lives in the southern-Ontario magnifier
}

const PLACES: Place[] = [
  { name: "Windsor", x: 150, y: 372, icon: "🏠", note: "Home base — science fairs, WEC ×4, hackathons, the CHARGE Lab", inset: true },
  { name: "Leamington", x: 235, y: 415, icon: "💡", note: "Take Your Shot 2026 — pitching on the startup stage", inset: true },
  { name: "Hamilton", x: 335, y: 350, icon: "🎓", note: "McMaster — MASc, EV battery research, Fall 2026", inset: true },
  { name: "Waterloo", x: 265, y: 310, icon: "🔋", note: "IEEE EPEC 2025 — presenting the battery research", inset: true },
  { name: "Toronto", x: 380, y: 280, icon: "🚁", note: "IEEE PIMRC Best Demo · Hack the 6ix · the bootcamp at York", inset: true },
  { name: "Ottawa", x: 636, y: 352, icon: "🍁", note: "Canada-Wide Science Fair circuit — 4 national finals, $10k uOttawa scholarship" },
  { name: "Montréal", x: 668, y: 330, icon: "🧠", note: "CS Games — mentoring the Windsor delegation" },
];

function Pin({
  p,
  scale = 1,
  active,
  onHover,
}: {
  p: Place;
  scale?: number;
  active: boolean;
  onHover: (name: string | null) => void;
}) {
  return (
    <g
      transform={`translate(${p.x} ${p.y}) scale(${scale})`}
      className="cursor-pointer"
      onMouseEnter={() => onHover(p.name)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(p.name)}
    >
      <g
        className="origin-bottom transition-transform duration-200 ease-out"
        style={{ transform: active ? "translateY(-4px) scale(1.18)" : undefined }}
      >
        <ellipse cx="0" cy="2" rx="7" ry="2.5" fill={INK} opacity="0.18" />
        <path
          d="M0 0 C -11 -14 -13 -20 -13 -27 A 13 13 0 1 1 13 -27 C 13 -20 11 -14 0 0 Z"
          fill={active ? "#c9463a" : "#d95b4a"}
          stroke={INK}
          strokeWidth="1.6"
        />
        <circle cx="0" cy="-27" r="8.5" fill={PAPER} stroke={INK} strokeWidth="1" />
        <text x="0" y="-23" textAnchor="middle" fontSize="11">{p.icon}</text>
      </g>
      <text
        x="0"
        y="14"
        textAnchor="middle"
        fontSize="11"
        fontWeight={active ? 700 : 500}
        fill={INK}
        style={{ fontFamily: "var(--font-caveat)", fontSize: "15px" }}
      >
        {p.name}
      </text>
    </g>
  );
}

export function CanadaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = PLACES.find((p) => p.name === hovered);
  const mains = PLACES.filter((p) => !p.inset);
  const insets = PLACES.filter((p) => p.inset);

  return (
    <div
      className="relative mx-auto max-w-4xl overflow-hidden rounded-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      style={{
        color: INK,
        backgroundColor: PAPER,
        backgroundImage: `${GRAIN}, linear-gradient(160deg, rgba(255,255,255,0.4), rgba(120,100,60,0.12))`,
      }}
    >
      <svg viewBox="0 0 900 560" className="block w-full" role="img" aria-label="Cartoon map of Canada with markers on Windsor, Leamington, Hamilton, Waterloo, Toronto, Ottawa, and Montréal">
        {/* ---------- canada, cartoon-style ---------- */}
        <g fill="#dccfa8" stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
          <path d="M62 330
            C 50 290 62 240 78 205 C 88 178 96 150 118 138
            C 150 118 190 108 232 100 C 270 92 310 96 342 104
            C 380 96 420 92 452 102
            C 470 110 480 130 476 152
            C 500 168 512 196 508 224 C 505 244 492 258 486 240
            C 478 214 466 196 452 186 C 448 210 452 238 464 258
            C 476 278 500 284 524 274 C 540 262 544 230 540 200
            C 536 172 548 148 576 138 C 616 124 664 128 704 146
            C 736 160 760 186 772 218 C 782 244 778 272 760 292
            C 744 310 720 318 700 310 C 688 328 672 342 654 348
            C 646 366 636 380 620 386 C 600 394 580 388 566 374
            C 552 388 536 396 518 396 C 500 396 486 386 478 372
            C 460 380 440 382 422 376 C 400 388 374 392 352 384
            C 330 394 304 396 282 388 C 260 396 234 396 214 388
            C 186 396 154 394 130 382 C 100 370 74 354 62 330 Z" />
          {/* arctic islands */}
          <path d="M300 78 C 316 64 344 60 364 70 C 380 78 380 92 366 98 C 344 106 314 102 300 92 C 292 88 292 84 300 78 Z" />
          <path d="M420 66 C 440 54 470 54 488 66 C 498 74 496 86 482 90 C 460 96 432 92 418 82 C 412 78 412 72 420 66 Z" />
          {/* newfoundland */}
          <path d="M792 254 C 804 244 822 246 830 258 C 836 268 830 280 816 282 C 802 284 788 276 786 266 C 785 260 787 258 792 254 Z" />
        </g>

        {/* great lakes hint */}
        <g fill="#b8cbd6" stroke={INK} strokeWidth="1.4" opacity="0.85">
          <path d="M498 330 C 510 318 530 316 542 326 C 552 334 550 348 536 352 C 520 356 502 348 498 340 Z" />
          <path d="M556 356 C 566 348 582 348 590 356 C 596 364 590 372 578 372 C 566 372 554 364 556 356 Z" />
        </g>

        {/* dashed travel routes from the cluster */}
        <g fill="none" stroke={INK} strokeWidth="1.6" strokeDasharray="5 6" opacity="0.5">
          <path d="M560 372 C 590 366 614 362 630 354" />
          <path d="M640 348 C 650 342 658 336 664 332" />
        </g>

        {/* magnifier leader: from SW ontario to the inset */}
        <path d="M545 380 C 480 430 380 460 300 470" fill="none" stroke={INK} strokeWidth="1.6" strokeDasharray="3 5" opacity="0.45" />

        {/* main-map pins */}
        {mains.map((p) => (
          <Pin key={p.name} p={p} active={hovered === p.name} onHover={setHovered} />
        ))}
        {/* tiny cluster dot on the real location */}
        <circle cx="552" cy="376" r="5" fill="#d95b4a" stroke={INK} strokeWidth="1.4" />

        {/* ---------- the magnifying glass inset ---------- */}
        <g>
          <circle cx="255" cy="330" r="170" fill={PAPER} stroke={INK} strokeWidth="3" />
          <circle cx="255" cy="330" r="170" fill="#dccfa8" opacity="0.5" />
          <circle cx="255" cy="330" r="158" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.4" />
          {/* handle */}
          <line x1="380" y1="448" x2="428" y2="500" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          <text x="255" y="188" textAnchor="middle" fontSize="12" fontFamily="monospace" letterSpacing="3" fill={INK} opacity="0.6">
            SOUTHERN ONTARIO
          </text>
          {/* zoomed shoreline doodle */}
          <path d="M120 400 C 160 380 200 388 235 412 C 270 434 320 430 360 404" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" strokeDasharray="2 4" />
          {insets.map((p) => (
            <Pin key={p.name} p={p} active={hovered === p.name} onHover={setHovered} />
          ))}
        </g>

        {/* compass doodle */}
        <g transform="translate(830 80)" stroke={INK} fill={INK} opacity="0.65">
          <circle r="20" fill="none" strokeWidth="1.6" />
          <path d="M0 -14 L 4 0 L 0 14 L -4 0 Z" strokeWidth="0" />
          <text y="-26" textAnchor="middle" fontSize="12" fontWeight="bold" strokeWidth="0">N</text>
        </g>

        {/* title */}
        <text x="60" y="70" fill={INK} style={{ fontFamily: "var(--font-caveat)", fontSize: "34px" }}>
          Places unlocked
        </text>
        <text x="62" y="92" fill={INK} opacity="0.55" fontFamily="monospace" fontSize="11" letterSpacing="2">
          7 CITIES · 44 EVENTS · ONE DECADE
        </text>
      </svg>

      {/* hover readout */}
      <div className="border-t border-[#2b2a24]/15 px-5 py-3 text-center">
        {current ? (
          <p className="text-sm" style={{ color: INK }}>
            <span className="mr-1.5">{current.icon}</span>
            <strong>{current.name}</strong> — {current.note}
          </p>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: INK, opacity: 0.5 }}>
            hover a marker
          </p>
        )}
      </div>
    </div>
  );
}
