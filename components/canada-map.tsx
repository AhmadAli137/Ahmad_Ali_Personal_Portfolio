"use client";

import { useEffect, useState } from "react";
import { CANADA_PATH } from "@/lib/canada-shape";

/**
 * The travel map: real Canada geography (Mercator, cropped to the settled
 * south) drawn cartoon-atlas style — sandy land, ocean, lakes, pine forests —
 * with hand-drawn landmark markers (CN Tower, Ambassador Bridge, …) fanned
 * out on leader lines to the true city locations, and a little car forever
 * driving the competition road trip. Hover a landmark for the story.
 */

const INK = "#2b2a24";
const SAND = "#e3d7ae";
const WATER = "#a8c5cc";
const RED = "#c9463a";
const GREEN = "#5f8a4a";
const BROWN = "#a45f2d";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* projected city coordinates (see lib/canada-shape.ts) */
const CITY = {
  Windsor: { x: 892.6, y: 1278 },
  Leamington: { x: 899.3, y: 1282 },
  Toronto: { x: 948.8, y: 1257.5 },
  Hamilton: { x: 941.3, y: 1263.7 },
  Waterloo: { x: 931.3, y: 1260.5 },
  Ottawa: { x: 1005.6, y: 1229.8 },
  Montréal: { x: 1038.4, y: 1228.5 },
} as const;

const ROUTE = `M${CITY.Windsor.x} ${CITY.Windsor.y} L${CITY.Waterloo.x} ${CITY.Waterloo.y} L${CITY.Hamilton.x} ${CITY.Hamilton.y} L${CITY.Toronto.x} ${CITY.Toronto.y} L${CITY.Ottawa.x} ${CITY.Ottawa.y} L${CITY.Montréal.x} ${CITY.Montréal.y}`;

interface Landmark {
  city: keyof typeof CITY;
  label: string;
  ax: number; // anchor (drawing base center)
  ay: number;
  note: string;
  art: React.ReactNode;
}

/* ---- tiny hand-drawn landmarks (each ~drawn around 0,0 = base center) ---- */

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
    <rect x="-3" y="-64" width="6" height="4" fill={INK} stroke="none" transform="rotate(-8)" />
  </g>
);

const LANDMARKS: Landmark[] = [
  { city: "Windsor", label: "Windsor", ax: 640, ay: 1148, note: "🏠 Home base — the Ambassador Bridge. Science fairs, WEC ×4, hackathons, the CHARGE Lab.", art: AmbassadorBridge },
  { city: "Leamington", label: "Leamington", ax: 762, ay: 1246, note: "🍅 The tomato capital — Take Your Shot 2026, pitching on the startup stage.", art: Tomato },
  { city: "Waterloo", label: "Waterloo", ax: 802, ay: 1062, note: "🪿 IEEE EPEC 2025 — presenting the EV battery research (geese supervised).", art: Goose },
  { city: "Hamilton", label: "Hamilton", ax: 958, ay: 1122, note: "🎓 McMaster — MASc in ECE, EV battery research, Fall 2026.", art: McMasterHall },
  { city: "Toronto", label: "Toronto", ax: 1082, ay: 1158, note: "🗼 The CN Tower — IEEE PIMRC Best Demo, Hack the 6ix, the bootcamp at York.", art: CnTower },
  { city: "Ottawa", label: "Ottawa", ax: 1136, ay: 1052, note: "🍁 Parliament's Peace Tower — the Canada-Wide Science Fair circuit, $10k uOttawa scholarship.", art: PeaceTower },
  { city: "Montréal", label: "Montréal", ax: 1238, ay: 1152, note: "🌐 The Biosphère — CS Games, mentoring the Windsor delegation.", art: Biosphere },
];

/* small pine + leafy tree, drawn around base 0,0 */
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
      fill="none"
      stroke="#5f818a"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.6"
    />
  );
}

export function CanadaMap() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const current = LANDMARKS.find((l) => l.city === active);

  return (
    <div
      className="relative mx-auto max-w-5xl overflow-hidden rounded-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
      style={{ color: INK, backgroundColor: WATER, backgroundImage: GRAIN }}
    >
      <svg
        viewBox="30 500 1310 810"
        className="block w-full"
        role="img"
        aria-label="Cartoon travel map of Canada with landmark markers on Windsor, Leamington, Waterloo, Hamilton, Toronto, Ottawa, and Montréal"
      >
        <defs>
          <linearGradient id="topfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={WATER} />
            <stop offset="1" stopColor={WATER} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* land — real geography; province borders stroke themselves */}
        <path d={CANADA_PATH} fill={SAND} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />

        {/* southern greenery: soft forest tint */}
        <g opacity="0.25" fill={GREEN} stroke="none">
          <ellipse cx="300" cy="1060" rx="190" ry="75" />
          <ellipse cx="640" cy="1090" rx="150" ry="60" />
          <ellipse cx="1010" cy="1060" rx="170" ry="70" />
          <ellipse cx="180" cy="900" rx="120" ry="90" />
        </g>

        {/* forests */}
        <Pine x={150} y={1010} s={1.6} />
        <Pine x={205} y={1070} s={1.3} />
        <Leafy x={255} y={1015} s={1.4} />
        <Pine x={410} y={1055} s={1.5} />
        <Leafy x={475} y={1000} s={1.3} />
        <Pine x={545} y={1085} s={1.4} />
        <Pine x={760} y={985} s={1.5} />
        <Leafy x={835} y={935} s={1.3} />
        <Pine x={1035} y={945} s={1.5} />
        <Leafy x={1105} y={995} s={1.3} />
        <Pine x={1225} y={1015} s={1.2} />

        {/* water life */}
        <Waves x={90} y={1170} />
        <Waves x={160} y={1255} />
        <Waves x={745} y={1000} />
        <Waves x={1255} y={1240} />
        <text x="120" y={1135} fill="#3d5a63" opacity="0.75" style={{ fontFamily: "var(--font-caveat)", fontSize: "26px" }} transform="rotate(-12 120 1135)">Pacific</text>
        <text x="1216" y={1105} fill="#3d5a63" opacity="0.75" style={{ fontFamily: "var(--font-caveat)", fontSize: "26px" }} transform="rotate(8 1216 1105)">Atlantic</text>
        <text x="700" y={935} fill="#3d5a63" opacity="0.7" style={{ fontFamily: "var(--font-caveat)", fontSize: "24px" }}>Hudson Bay</text>

        {/* the road trip */}
        <path
          d={ROUTE}
          fill="none"
          stroke={BROWN}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="9 9"
          style={reduced ? undefined : { animation: "routeDash 1.6s linear infinite" }}
        />
        {!reduced && (
          <g>
            <g transform="scale(1)">
              <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
                <rect x="-10" y="-10" width="20" height="7" rx="2.5" fill={RED} />
                <path d="M-5 -10 L-3 -15 L4 -15 L7 -10 Z" fill="#e8dfc9" />
                <circle cx="-5" cy="-2.5" r="3" fill={INK} />
                <circle cx="5" cy="-2.5" r="3" fill={INK} />
              </g>
              <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path={ROUTE} keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear" />
            </g>
          </g>
        )}

        {/* city dots */}
        {Object.entries(CITY).map(([name, c]) => (
          <circle key={name} cx={c.x} cy={c.y} r="5" fill={RED} stroke={INK} strokeWidth="1.6" />
        ))}

        {/* leader lines from landmark to true location */}
        {LANDMARKS.map((l) => {
          const c = CITY[l.city];
          const mx = (l.ax + c.x) / 2;
          const my = Math.min(l.ay, c.y) - 18;
          return (
            <path
              key={l.city}
              d={`M${l.ax} ${l.ay + 6} Q ${mx} ${my + 40} ${c.x} ${c.y - 6}`}
              fill="none"
              stroke={INK}
              strokeWidth="1.4"
              strokeDasharray="3 5"
              opacity={active === l.city ? 0.85 : 0.4}
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
            {/* stable hit area — never transforms, so no hover flicker */}
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
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill={INK}
                fontWeight={active === l.city ? 700 : 500}
                style={{ fontFamily: "var(--font-caveat)", fontSize: "24px" }}
              >
                {l.label}
              </text>
            </g>
          </g>
        ))}

        {/* title + compass + frame */}
        <text x="70" y="585" fill={INK} style={{ fontFamily: "var(--font-caveat)", fontSize: "52px" }}>Places unlocked</text>
        <text x="73" y="614" fill={INK} opacity="0.55" fontFamily="monospace" fontSize="16" letterSpacing="3">7 CITIES · 44 EVENTS · ONE DECADE</text>
        <g transform="translate(1280 585)" stroke={INK} fill={INK} opacity="0.65">
          <circle r="22" fill="none" strokeWidth="1.8" />
          <path d="M0 -15 L4.5 0 L0 15 L-4.5 0 Z" strokeWidth="0" />
          <text y="-30" textAnchor="middle" fontSize="14" fontWeight="bold" strokeWidth="0">N</text>
        </g>
        <rect x="42" y="512" width="1286" height="786" fill="none" stroke={INK} strokeWidth="2" opacity="0.5" />
        <rect x="50" y="520" width="1270" height="770" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.35" />
        <rect x="30" y="500" width="1310" height="46" fill="url(#topfade)" />
      </svg>

      {/* readout */}
      <div className="border-t-2 border-[#2b2a24]/25 px-5 py-3 text-center" style={{ backgroundColor: "#e9e0c9", backgroundImage: GRAIN }}>
        {current ? (
          <p className="text-sm" style={{ color: INK }}>
            <strong>{current.label}</strong> — {current.note}
          </p>
        ) : (
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: INK, opacity: 0.5 }}>
            hover a landmark · the car is driving the competition road trip
          </p>
        )}
      </div>
    </div>
  );
}
