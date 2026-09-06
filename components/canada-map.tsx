"use client";

import { useState } from "react";
import Link from "next/link";
import { PROVINCES } from "@/lib/canada-shape";

/**
 * The travel map: real Canada (per-province Mercator paths) painted
 * cartoon-atlas style — layered ocean, alternating sand provinces with a
 * soft ground shadow, forests, waves, a sailboat — with hand-drawn landmark
 * markers on leader lines to the true city dots and a little car forever
 * driving the competition road trip. Hovering a landmark opens its story
 * plus postcard links into the rest of the site.
 */

const INK = "#2b2a24";
const RED = "#c9463a";
const GREEN = "#5f8a4a";
const BROWN = "#a45f2d";
const SANDS = ["#e6daae", "#ddd0a0", "#e2d5a8"];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CITY = {
  Windsor: { x: 519.6, y: 1023.1 },
  Leamington: { x: 523.5, y: 1026.3 },
  Toronto: { x: 552.3, y: 1006.8 },
  Hamilton: { x: 548, y: 1011.7 },
  Waterloo: { x: 542.1, y: 1009.1 },
  Ottawa: { x: 585.4, y: 984.6 },
  Montréal: { x: 604.5, y: 983.5 },
} as const;

const ROUTE = `M${CITY.Windsor.x} ${CITY.Windsor.y} L${CITY.Waterloo.x} ${CITY.Waterloo.y} L${CITY.Hamilton.x} ${CITY.Hamilton.y} L${CITY.Toronto.x} ${CITY.Toronto.y} L${CITY.Ottawa.x} ${CITY.Ottawa.y} L${CITY.Montréal.x} ${CITY.Montréal.y}`;

interface MapLink { label: string; href: string; external?: boolean }
interface Landmark {
  city: keyof typeof CITY;
  label: string;
  ax: number;
  ay: number;
  note: string;
  links: MapLink[];
  art: React.ReactNode;
}

/* ---- hand-drawn landmarks (base center at 0,0) ---- */

const CnTower = (
  <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <path d="M-9 0 L-4 -52 L4 -52 L9 0 Z" fill="#d8cfb4" />
    <ellipse cx="0" cy="-58" rx="13" ry="7" fill="#cabfa0" />
    <path d="M-3 -65 L3 -65 L2 -80 L-2 -80 Z" fill="#d8cfb4" />
    <line x1="0" y1="-80" x2="0" y2="-96" />
    <circle cx="0" cy="-58" r="2.5" fill={INK} stroke="none" />
  </g>
);

const AmbassadorBridge = (
  <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
    <line x1="-46" y1="0" x2="46" y2="0" strokeWidth="4" />
    <path d="M-26 0 L-26 -40 M-32 0 L-32 -40 M-26 -40 L-32 -40 M-26 -25 L-32 -25" stroke="#3f6d8e" strokeWidth="3.5" />
    <path d="M26 0 L26 -40 M32 0 L32 -40 M26 -40 L32 -40 M26 -25 L32 -25" stroke="#3f6d8e" strokeWidth="3.5" />
    <path d="M-46 -12 Q -40 -38 -29 -40 M-29 -40 Q 0 -6 29 -40 M29 -40 Q 40 -38 46 -12" strokeWidth="2" />
    <path d="M-18 0 L-18 -14 M-8 0 L-8 -21 M0 0 L0 -24 M8 0 L8 -21 M18 0 L18 -14" strokeWidth="1.5" />
  </g>
);

const PeaceTower = (
  <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <rect x="-11" y="-52" width="22" height="52" fill="#d3c8a6" />
    <path d="M-13 -52 L0 -76 L13 -52 Z" fill="#4f7d6b" />
    <circle cx="0" cy="-40" r="6.5" fill="#f4eedd" />
    <line x1="0" y1="-40" x2="0" y2="-44" strokeWidth="1.5" />
    <line x1="0" y1="-40" x2="3.5" y2="-39" strokeWidth="1.5" />
    <line x1="0" y1="-76" x2="0" y2="-88" strokeWidth="2" />
    <path d="M0 -88 L12 -85 L0 -82 Z" fill={RED} strokeWidth="1.5" />
    <path d="M-11 -14 L11 -14 M-11 -26 L11 -26" strokeWidth="1" opacity="0.5" />
  </g>
);

const Biosphere = (
  <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
    <circle cx="0" cy="-30" r="26" fill="#cfdad9" fillOpacity="0.85" />
    <path d="M-26 -30 L26 -30 M-22 -44 L22 -44 M-22 -16 L22 -16 M0 -56 L-22 -44 L-26 -30 L-22 -16 L0 -4 L22 -16 L26 -30 L22 -44 Z M0 -56 L0 -4 M-13 -51 L13 -9 M13 -51 L-13 -9" strokeWidth="1.1" fill="none" opacity="0.8" />
  </g>
);

const Tomato = (
  <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <circle cx="0" cy="-16" r="16" fill={RED} />
    <path d="M0 -30 L-4 -37 M0 -30 L4 -36 M0 -30 L0 -39" strokeWidth="2" />
    <path d="M-9 -30 Q 0 -24 9 -30 Q 5 -34 0 -33 Q -5 -34 -9 -30 Z" fill={GREEN} strokeWidth="1.8" />
    <circle cx="-6" cy="-20" r="2.5" fill="#efe8d6" stroke="none" opacity="0.5" />
  </g>
);

const Goose = (
  <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cx="2" cy="-12" rx="17" ry="10" fill="#8a7a63" />
    <path d="M-12 -16 Q -16 -30 -10 -38 Q -6 -42 -2 -38 L 4 -34" fill="none" strokeWidth="3.5" stroke={INK} />
    <circle cx="-6" cy="-38" r="5" fill={INK} stroke="none" />
    <path d="M-8 -34 Q -5 -31 -1 -33" stroke="#f4eedd" strokeWidth="2.5" fill="none" />
    <path d="M-11 -39 L-17 -37" strokeWidth="2.5" />
    <path d="M6 -18 Q 14 -22 19 -16" fill="none" strokeWidth="1.8" />
    <line x1="-2" y1="-2" x2="-2" y2="0" strokeWidth="2" />
    <line x1="6" y1="-2" x2="6" y2="0" strokeWidth="2" />
  </g>
);

const McMasterHall = (
  <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
    <rect x="-22" y="-26" width="44" height="26" fill="#c9b998" />
    <rect x="-10" y="-46" width="20" height="20" fill="#d3c8a6" />
    <path d="M-10 -46 L-10 -50 L-6 -50 L-6 -46 M-2 -46 L-2 -50 L2 -50 L2 -46 M6 -46 L6 -50 L10 -50 L10 -46" fill="#d3c8a6" strokeWidth="1.8" />
    <rect x="-4" y="-40" width="8" height="8" fill="#7b3b3b" strokeWidth="1.5" />
    <path d="M-16 -18 L-16 -8 M-8 -18 L-8 -8 M8 -18 L8 -8 M16 -18 L16 -8" strokeWidth="1.5" opacity="0.6" />
    <path d="M-14 -50 L0 -58 L14 -50" fill="none" strokeWidth="2" />
  </g>
);

const LANDMARKS: Landmark[] = [
  { city: "Windsor", label: "Windsor", ax: 340, ay: 1085, note: "🏠 Home base, under the Ambassador Bridge — science fairs, WEC ×4, 14 hackathons, the CHARGE Lab.",
    links: [{ label: "the postcards", href: "/hackathons" }, { label: "full record", href: "/competitions" }], art: AmbassadorBridge },
  { city: "Leamington", label: "Leamington", ax: 452, ay: 1088, note: "🍅 The tomato capital — Take Your Shot 2026, pitching on the startup stage.",
    links: [{ label: "pitch record", href: "/competitions" }], art: Tomato },
  { city: "Waterloo", label: "Waterloo", ax: 548, ay: 1090, note: "🪿 IEEE EPEC 2025 — presenting the EV battery research (geese supervised).",
    links: [{ label: "the research", href: "/#experience" }], art: Goose },
  { city: "Hamilton", label: "Hamilton", ax: 648, ay: 1088, note: "🎓 McMaster — MASc in ECE, EV battery research, Fall 2026.",
    links: [{ label: "the road ahead", href: "/#experience" }], art: McMasterHall },
  { city: "Toronto", label: "Toronto", ax: 835, ay: 935, note: "🗼 The CN Tower — IEEE PIMRC Best Demo, Hack the 6ix, the bootcamp at York.",
    links: [{ label: "Edge Pong postcard", href: "/projects/edge-pong" }, { label: "full record", href: "/competitions" }], art: CnTower },
  { city: "Ottawa", label: "Ottawa", ax: 592, ay: 928, note: "🍁 Parliament's Peace Tower — the Canada-Wide Science Fair circuit, $10k uOttawa scholarship.",
    links: [{ label: "science-fair years", href: "/competitions" }], art: PeaceTower },
  { city: "Montréal", label: "Montréal", ax: 880, ay: 1010, note: "🌐 The Biosphère — CS Games, mentoring the Windsor delegation.",
    links: [{ label: "CS Games", href: "/competitions" }], art: Biosphere },
];

function Pine({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
      <line x1="0" y1="0" x2="0" y2="-5" />
      <path d="M-10 -5 L0 -20 L10 -5 Z" fill={GREEN} />
      <path d="M-8 -14 L0 -28 L8 -14 Z" fill="#6d9a55" />
    </g>
  );
}
function Leafy({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8">
      <line x1="0" y1="0" x2="0" y2="-8" />
      <circle cx="0" cy="-15" r="9" fill="#7fa761" />
    </g>
  );
}
function Waves({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y} q 8 -5 16 0 t 16 0 M${x + 8} ${y + 9} q 8 -5 16 0 t 16 0`}
      fill="none" stroke="#48707e" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"
    />
  );
}

export function CanadaMap() {
  const [active, setActive] = useState<string | null>(null);
  const current = LANDMARKS.find((l) => l.city === active);

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.55)]" style={{ color: INK }}>
      <svg
        viewBox="-260 405 1310 720"
        className="block w-full"
        role="img"
        aria-label="Cartoon travel map of Canada with landmark markers on Windsor, Leamington, Waterloo, Hamilton, Toronto, Ottawa, and Montréal"
      >
        <defs>
          <radialGradient id="ocean" cx="0.5" cy="0.55" r="0.75">
            <stop offset="0" stopColor="#a9c8d2" />
            <stop offset="0.7" stopColor="#93b4c1" />
            <stop offset="1" stopColor="#7c9dad" />
          </radialGradient>
          <filter id="landShadow" x="-5%" y="-5%" width="110%" height="112%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#20303a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ocean */}
        <rect x="-260" y="405" width="1310" height="720" fill="url(#ocean)" />
        <Waves x={-190} y={760} />
        <Waves x={-130} y={950} />
        <Waves x={-210} y={1030} />
        <Waves x={905} y={760} />
        <Waves x={955} y={880} />
        <Waves x={840} y={1050} />
        <Waves x={470} y={690} />
        {/* sailboat */}
        <g transform="translate(-155 855)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
          <path d="M-14 0 Q 0 8 14 0 L 10 0 L -10 0 Z" fill="#b3572a" />
          <line x1="0" y1="0" x2="0" y2="-24" />
          <path d="M2 -24 L15 -6 L2 -6 Z" fill="#f4eedd" />
          <path d="M-2 -22 L-12 -6 L-2 -6 Z" fill="#e8dcc0" />
        </g>
        <text x="-215" y="905" fill="#2e4a55" opacity="0.7" style={{ fontFamily: "var(--font-caveat)", fontSize: "27px" }} transform="rotate(-14 -215 905)">Pacific</text>
        <text x="890" y="825" fill="#2e4a55" opacity="0.7" style={{ fontFamily: "var(--font-caveat)", fontSize: "27px" }} transform="rotate(9 890 825)">Atlantic</text>
        <text x="425" y="665" fill="#2e4a55" opacity="0.65" style={{ fontFamily: "var(--font-caveat)", fontSize: "23px" }}>Hudson Bay</text>

        {/* land: real provinces, alternating sands, grounded with a shadow */}
        <g filter="url(#landShadow)">
          {PROVINCES.map((p, i) => (
            <path key={p.id} d={p.d} fill={SANDS[i % SANDS.length]} fillRule="evenodd" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
          ))}
        </g>

        {/* forest tint + trees */}
        <g opacity="0.22" fill={GREEN} stroke="none">
          <ellipse cx="135" cy="862" rx="80" ry="52" />
          <ellipse cx="300" cy="822" rx="105" ry="45" />
          <ellipse cx="482" cy="880" rx="70" ry="40" />
          <ellipse cx="618" cy="892" rx="68" ry="42" />
        </g>
        <Pine x={100} y={832} s={1.4} />
        <Leafy x={150} y={880} s={1.2} />
        <Pine x={280} y={790} s={1.3} />
        <Pine x={342} y={832} s={1.5} />
        <Leafy x={240} y={862} s={1.2} />
        <Pine x={470} y={882} s={1.4} />
        <Leafy x={540} y={905} s={1.2} />
        <Pine x={602} y={852} s={1.3} />
        <Leafy x={622} y={882} s={1.1} />
        <Pine x={660} y={915} s={1.2} />

        {/* the road trip */}
        <path d={ROUTE} fill="none" stroke="#f4eedd" strokeWidth="5.5" strokeLinecap="round" opacity="0.5" />
        <path
          d={ROUTE}
          fill="none" stroke={BROWN} strokeWidth="3" strokeLinecap="round" strokeDasharray="7 7"
          className="motion-reduce:[animation:none]"
          style={{ animation: "routeDash 1.5s linear infinite" }}
        />
        <g className="motion-reduce:hidden">
          <g transform="scale(0.9)">
            <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
              <rect x="-10" y="-10" width="20" height="7" rx="2.5" fill={RED} />
              <path d="M-5 -10 L-3 -15 L4 -15 L7 -10 Z" fill="#e8dfc9" />
              <circle cx="-5" cy="-2.5" r="3" fill={INK} />
              <circle cx="5" cy="-2.5" r="3" fill={INK} />
            </g>
          </g>
          <animateMotion dur="15s" repeatCount="indefinite" rotate="auto" path={ROUTE} keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear" />
        </g>

        {/* city dots */}
        {Object.entries(CITY).map(([name, c]) => (
          <circle key={name} cx={c.x} cy={c.y} r="4.5" fill={RED} stroke={INK} strokeWidth="1.5" />
        ))}

        {/* leaders */}
        {LANDMARKS.map((l) => {
          const c = CITY[l.city];
          const mx = (l.ax + c.x) / 2;
          const my = (l.ay + c.y) / 2 - 24;
          return (
            <path
              key={l.city}
              d={`M${l.ax} ${l.ay - 2} Q ${mx} ${my} ${c.x} ${c.y + 5}`}
              fill="none" stroke={INK} strokeWidth="1.3" strokeDasharray="3 5"
              opacity={active === l.city ? 0.85 : 0.38}
            />
          );
        })}

        {/* landmarks */}
        {LANDMARKS.map((l) => (
          <g
            key={l.city}
            transform={`translate(${l.ax} ${l.ay})`}
            className="cursor-pointer"
            onMouseEnter={() => setActive(l.city)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(l.city)}
          >
            <rect x="-55" y="-105" width="110" height="135" fill="transparent" stroke="none" />
            <g
              style={{
                transition: "transform 200ms ease-out",
                transform: active === l.city ? "translateY(-6px) scale(1.08)" : undefined,
                transformBox: "fill-box",
                transformOrigin: "center bottom",
              }}
            >
              <ellipse cx="0" cy="4" rx="26" ry="5" fill={INK} opacity="0.15" />
              {l.art}
              <text x="0" y="24" textAnchor="middle" fill={INK} fontWeight={active === l.city ? 700 : 500} style={{ fontFamily: "var(--font-caveat)", fontSize: "23px" }}>
                {l.label}
              </text>
            </g>
          </g>
        ))}

        {/* title + compass + frame */}
        <text x="-228" y="478" fill={INK} style={{ fontFamily: "var(--font-caveat)", fontSize: "50px" }}>Places unlocked</text>
        <path d="M-226 490 q 60 8 128 2" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <text x="-225" y="516" fill={INK} opacity="0.6" fontFamily="monospace" fontSize="15" letterSpacing="3">7 CITIES · 44 EVENTS · ONE DECADE</text>
        <g transform="translate(985 485)" stroke={INK} fill={INK} opacity="0.7">
          <circle r="24" fill="#e9e0c9" fillOpacity="0.7" strokeWidth="1.8" />
          <path d="M0 -17 L4 -4 L17 0 L4 4 L0 17 L-4 4 L-17 0 L-4 -4 Z" strokeWidth="1" fill="#c9463a" fillOpacity="0.85" />
          <text y="-30" textAnchor="middle" fontSize="14" fontWeight="bold" strokeWidth="0">N</text>
        </g>
        <rect x="-246" y="418" width="1282" height="694" fill="none" stroke={INK} strokeWidth="2.2" opacity="0.55" />
        <rect x="-238" y="426" width="1266" height="678" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.35" />
      </svg>

      {/* readout + postcard links */}
      <div className="border-t-2 border-[#2b2a24]/25 px-5 py-3" style={{ backgroundColor: "#e9e0c9", backgroundImage: GRAIN }}>
        {current ? (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <p className="text-sm" style={{ color: INK }}>
              <strong>{current.label}</strong> — {current.note}
            </p>
            {current.links.map((lk) => (
              <Link
                key={lk.href + lk.label}
                href={lk.href}
                className="inline-flex -rotate-1 items-center gap-1.5 border-[2px] border-[#2b2a24] bg-[#f4eedd] px-2.5 py-1 font-mono text-[10px] font-bold shadow-[2px_2px_0_rgba(43,42,36,0.6)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
                style={{ color: INK }}
              >
                <span className="inline-block h-2.5 w-2 border border-[#2b2a24]/60" style={{ backgroundColor: RED }} />
                {lk.label} →
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: INK, opacity: 0.5 }}>
            hover a landmark · postcards attached · the car is on the road
          </p>
        )}
      </div>
    </div>
  );
}
