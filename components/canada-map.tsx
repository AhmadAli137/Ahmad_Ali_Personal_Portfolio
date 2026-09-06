"use client";

import { useState } from "react";
import Link from "next/link";
import { PROVINCES } from "@/lib/canada-shape";
import { Postcard } from "@/components/postcard";
import { hacks, type Hack } from "@/lib/hackathons";

/**
 * The travel map, zoomed to where the story happened: southern Ontario and
 * Québec with real Great Lakes shorelines. Every landmark stands on its
 * city's true location (nudged a hair only where two cities nearly touch),
 * a full-Canada inset with a red "you are here" box keeps the national
 * context, and the little car drives the competition road trip. Hovering a
 * landmark opens its story plus postcard links into the rest of the site.
 */

const INK = "#2b2a24";
const RED = "#c9463a";
const GREEN = "#5f8a4a";
const BROWN = "#a45f2d";
const SANDS = ["#e6daae", "#ddd0a0", "#e2d5a8"];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* true Mercator-projected city coordinates */
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

const ART_SCALE = 0.17;

interface Landmark {
  city: keyof typeof CITY;
  label: string;
  ax: number; // landmark base — on the city, tiny offsets only to avoid overlap
  ay: number;
  note: string;
  art: React.ReactNode;
}

/* ---- the postcards each city deals out ---- */
const byTitle = (t: string) => hacks.find((h) => h.title === t)!;
const CITY_CARDS: Record<keyof typeof CITY, Hack[]> = {
  Windsor: [
    byTitle("Meteor Madness"),
    byTitle("PresentPro"),
    { award: "EPICentre Excellence Awards 2023 — Innovation Mastery + $1,000", awardTone: "amber", title: "Innovation Mastery", desc: "The university's entrepreneurship award — the venture story gets its first trophy.", chips: ["Entrepreneurship", "Pitching"], href: "/competitions", internal: true, img: "/img/epicentre-award-trophy.jpg", imgAlt: "EPICentre Innovation Mastery trophy" },
    byTitle("WEC · OEC"),
    { award: "UWindsor × JLR AI Competition 2025 — $600 + Internship", awardTone: "amber", title: "Automotive AI", desc: "Optimizing automotive AI memory with Jaguar Land Rover — prize money and an internship offer.", chips: ["Automotive", "AI"], href: "/competitions", internal: true, img: "/img/jlr-team-1.jpg", imgAlt: "JLR competition team" },
    byTitle("Second Life"),
  ],
  Toronto: [
    byTitle("Edge Pong"),
    { award: "IEEE PIMRC 2023 — Best Demo Award", awardTone: "amber", title: "Autonomous Drone", desc: "The capstone indoor drone flies itself to Best Demo at IEEE PIMRC — Toronto's spotlight on a Windsor build.", chips: ["Autonomy", "Computer Vision"], href: "/competitions", internal: true, img: "/img/pimrc-best-demo-award.jpg", imgAlt: "IEEE PIMRC Best Demo award" },
    { award: "STEM Entrepreneurship Bootcamp 2018 — People's Choice", awardTone: "amber", title: "The First Pitch", desc: "Lassonde × Youth Science Canada at York — where the pitching story started, People's Choice in hand.", chips: ["Pitching", "2018"], href: "/competitions", internal: true, img: "/img/stem-bootcamp-lassonde.jpg", imgAlt: "Bootcamp cohort at Lassonde" },
  ],
  Waterloo: [
    { award: "IEEE EPEC 2025 — Research Presented", awardTone: "amber", title: "Dual-Chemistry Batteries", desc: "Presenting 'Dual-Chemistry Load Distribution for EV Battery Systems' — the Magna-partnered research, on the conference floor.", chips: ["EV Batteries", "Research"], href: "/#experience", internal: true, img: "/img/ieee-epec-poster.jpg", imgAlt: "IEEE EPEC poster session" },
  ],
  Hamilton: [
    { award: "McMaster University — Fall 2026", awardTone: "cyan", title: "MASc, ECE", desc: "EV battery research in Hamilton — the battery thread continues into graduate study.", chips: ["Grad School", "EV Batteries"], href: "/#experience", internal: true },
  ],
  Leamington: [
    { award: "Take Your Shot 2026 — 4th Place · $2,500", awardTone: "amber", title: "Pitching SaySpark", desc: "On the startup stage in tomato country — fourth place and $2,500 for the robotics-education pitch.", chips: ["Pitching", "SaySpark"], href: "/competitions", internal: true },
  ],
  Ottawa: [
    { award: "Canada-Wide Science Fair — 4 National Finals", awardTone: "amber", title: "The Science-Fair Years", desc: "Two bronze, a silver, and a $10k uOttawa scholarship across four national finals — where the whole story started.", chips: ["CWSF", "2015–2019"], href: "/competitions", internal: true, img: "/img/cwsf-medals-2019.jpg", imgAlt: "CWSF 2019 bronze medals" },
  ],
  Montréal: [
    { award: "CS Games 2026 — Mentor", awardTone: "cyan", title: "CS Games", desc: "Mentoring the Windsor delegation through algorithms, AI, and systems challenges in Montréal.", chips: ["Mentorship"], href: "/competitions", internal: true, img: "/img/cs-games-1.jpg", imgAlt: "CS Games delegation" },
  ],
};

/* ---- hand-drawn landmarks (base center at 0,0, ~90 units tall, drawn
   through ART_SCALE) ---- */

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
  { city: "Windsor", label: "Windsor", ax: 517, ay: 1022.5, note: "🏠 Home base, under the Ambassador Bridge — science fairs, WEC ×4, 14 hackathons, the CHARGE Lab.", art: AmbassadorBridge },
  { city: "Leamington", label: "Leamington", ax: 529, ay: 1033, note: "🍅 The tomato capital — Take Your Shot 2026, pitching on the startup stage.", art: Tomato },
  { city: "Waterloo", label: "Waterloo", ax: 537.5, ay: 1006, note: "🪿 IEEE EPEC 2025 — presenting the EV battery research (geese supervised).", art: Goose },
  { city: "Hamilton", label: "Hamilton", ax: 547, ay: 1017.5, note: "🎓 McMaster — MASc in ECE, EV battery research, Fall 2026.", art: McMasterHall },
  { city: "Toronto", label: "Toronto", ax: 557.5, ay: 1004.5, note: "🗼 The CN Tower — IEEE PIMRC Best Demo, Hack the 6ix, the bootcamp at York.", art: CnTower },
  { city: "Ottawa", label: "Ottawa", ax: 585.4, ay: 983.5, note: "🍁 Parliament's Peace Tower — the Canada-Wide Science Fair circuit, $10k uOttawa scholarship.", art: PeaceTower },
  { city: "Montréal", label: "Montréal", ax: 605.5, ay: 982.5, note: "🌐 The Biosphère — CS Games, mentoring the Windsor delegation.", art: Biosphere },
];

function Pine({ x, y, s = 0.3 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
      <line x1="0" y1="0" x2="0" y2="-5" />
      <path d="M-10 -5 L0 -20 L10 -5 Z" fill={GREEN} />
      <path d="M-8 -14 L0 -28 L8 -14 Z" fill="#6d9a55" />
    </g>
  );
}
function Leafy({ x, y, s = 0.28 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8">
      <line x1="0" y1="0" x2="0" y2="-8" />
      <circle cx="0" cy="-15" r="9" fill="#7fa761" />
    </g>
  );
}
function Waves({ x, y, s = 0.35 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 q 8 -5 16 0 t 16 0 M8 9 q 8 -5 16 0 t 16 0" fill="none" stroke="#48707e" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
    </g>
  );
}

export function CanadaMap() {
  /* selection is sticky: hovering or tapping a landmark deals that city's
     postcards below the map, and they stay until another city is picked */
  const [active, setActive] = useState<keyof typeof CITY>("Windsor");
  const current = LANDMARKS.find((l) => l.city === active)!;
  const cards = CITY_CARDS[active];

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.55)]" style={{ color: INK }}>
      <svg
        viewBox="478 946 186 112"
        className="block w-full"
        role="img"
        aria-label="Cartoon travel map of southern Ontario and Québec with landmarks standing on Windsor, Leamington, Waterloo, Hamilton, Toronto, Ottawa, and Montréal, plus a Canada inset"
      >
        <defs>
          <radialGradient id="ocean" cx="0.5" cy="0.55" r="0.75">
            <stop offset="0" stopColor="#a9c8d2" />
            <stop offset="0.7" stopColor="#93b4c1" />
            <stop offset="1" stopColor="#7c9dad" />
          </radialGradient>
          <filter id="landShadow" x="-5%" y="-5%" width="110%" height="112%">
            <feDropShadow dx="0" dy="0.8" stdDeviation="1.1" floodColor="#20303a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* water */}
        <rect x="478" y="946" width="186" height="112" fill="url(#ocean)" />

        {/* land */}
        <g filter="url(#landShadow)">
          {PROVINCES.map((p, i) => (
            <path key={p.id} d={p.d} fill={SANDS[i % SANDS.length]} fillRule="evenodd" stroke={INK} strokeWidth="0.45" strokeLinejoin="round" />
          ))}
        </g>

        {/* forests along the north band */}
        <g opacity="0.2" fill={GREEN} stroke="none">
          <ellipse cx="566" cy="962" rx="14" ry="5.5" />
          <ellipse cx="608" cy="957" rx="26" ry="7" />
        </g>
        <Pine x={560} y={963} />
        <Leafy x={573} y={958} />
        <Pine x={594} y={955} />
        <Leafy x={612} y={959} />
        <Pine x={631} y={954} />
        <Pine x={649} y={967} s={0.26} />

        {/* lake life */}
        <Waves x={504} y={1002} />
        <Waves x={536} y={1046} />
        <Waves x={648} y={1006} s={0.4} />
        <text x="496" y="1013" fill="#2e4a55" opacity="0.65" style={{ fontFamily: "var(--font-caveat)", fontSize: "4.6px" }} transform="rotate(-52 496 1013)">Lake Huron</text>
        <text x="527" y="1051" fill="#2e4a55" opacity="0.65" style={{ fontFamily: "var(--font-caveat)", fontSize: "4.4px" }} transform="rotate(-14 527 1051)">Lake Erie</text>
        <text x="564" y="1021" fill="#2e4a55" opacity="0.6" style={{ fontFamily: "var(--font-caveat)", fontSize: "3.6px" }} transform="rotate(-16 564 1021)">Lake Ontario</text>
        <text x="640" y="1000" fill="#2e4a55" opacity="0.6" style={{ fontFamily: "var(--font-caveat)", fontSize: "4.4px" }} transform="rotate(-30 640 1000)">St. Lawrence</text>
        <text x="566" y="1050" fill="#2e4a55" opacity="0.35" fontFamily="monospace" fontSize="3.4" letterSpacing="1">U.S.A.</text>

        {/* the road trip */}
        <path d={ROUTE} fill="none" stroke="#f4eedd" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <path
          d={ROUTE}
          fill="none" stroke={BROWN} strokeWidth="1.1" strokeLinecap="round" strokeDasharray="3 3"
          className="motion-reduce:[animation:none]"
          style={{ animation: "routeDash 1.5s linear infinite" }}
        />
        <g className="motion-reduce:hidden">
          <g transform="scale(0.34)">
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
          <circle key={name} cx={c.x} cy={c.y} r="1.6" fill={RED} stroke={INK} strokeWidth="0.5" />
        ))}

        {/* tiny leaders for the few nudged landmarks */}
        {LANDMARKS.map((l) => {
          const c = CITY[l.city];
          const d = Math.hypot(l.ax - c.x, l.ay - c.y);
          if (d < 3.5) return null;
          return (
            <path
              key={l.city}
              d={`M${l.ax} ${l.ay - 0.5} L${c.x} ${c.y}`}
              fill="none" stroke={INK} strokeWidth="0.4" strokeDasharray="1 1.4"
              opacity={active === l.city ? 0.85 : 0.45}
            />
          );
        })}

        {/* landmarks — standing on their cities */}
        {LANDMARKS.map((l) => (
          <g
            key={l.city}
            transform={`translate(${l.ax} ${l.ay})`}
            className="cursor-pointer"
            onMouseEnter={() => setActive(l.city)}
            onClick={() => setActive(l.city)}
          >
            <rect x="-10" y="-19" width="20" height="26" fill="transparent" stroke="none" />
            <g
              style={{
                transition: "transform 200ms ease-out",
                transform: active === l.city ? "translateY(-1.2px) scale(1.12)" : undefined,
                transformBox: "fill-box",
                transformOrigin: "center bottom",
              }}
            >
              <ellipse cx="0" cy="0.7" rx="4.5" ry="0.9" fill={INK} opacity="0.15" />
              <g transform={`scale(${ART_SCALE})`}>{l.art}</g>
              <text x="0" y="4.4" textAnchor="middle" fill={INK} fontWeight={active === l.city ? 700 : 500} style={{ fontFamily: "var(--font-caveat)", fontSize: "4.3px" }}>
                {l.label}
              </text>
            </g>
          </g>
        ))}

        {/* Canada inset — you are here */}
        <g transform="translate(621 1002)">
          <rect x="-1.2" y="-1.2" width="37.8" height="49" rx="0.8" fill="#e9e0c9" stroke={INK} strokeWidth="0.55" />
          <g transform="scale(0.0447)">
            {PROVINCES.map((p) => (
              <path key={p.id} d={p.d} fill="#d8cb9c" fillRule="evenodd" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
            ))}
          </g>
          <rect x={478 * 0.0447} y={946 * 0.0447} width={186 * 0.0447} height={112 * 0.0447} fill="none" stroke={RED} strokeWidth="0.7" />
          <text x="17.7" y="45.8" textAnchor="middle" fill={INK} opacity="0.6" fontFamily="monospace" fontSize="2.6" letterSpacing="0.6">CANADA</text>
        </g>

        {/* title + compass + frame */}
        <text x="486" y="957.5" fill={INK} style={{ fontFamily: "var(--font-caveat)", fontSize: "10.5px" }}>Places unlocked</text>
        <path d="M486.4 959.6 q 12 1.6 26 0.4" fill="none" stroke={INK} strokeWidth="0.35" opacity="0.5" />
        <text x="486.6" y="963.6" fill={INK} opacity="0.6" fontFamily="monospace" fontSize="2.9" letterSpacing="0.7">7 CITIES · 44 EVENTS · ONE DECADE</text>
        <g transform="translate(654.5 956.5)" stroke={INK} fill={INK} opacity="0.7">
          <circle r="4.6" fill="#e9e0c9" fillOpacity="0.7" strokeWidth="0.4" />
          <path d="M0 -3.2 L0.8 -0.8 L3.2 0 L0.8 0.8 L0 3.2 L-0.8 0.8 L-3.2 0 L-0.8 -0.8 Z" strokeWidth="0.2" fill="#c9463a" fillOpacity="0.85" />
          <text y="-5.8" textAnchor="middle" fontSize="2.7" fontWeight="bold" strokeWidth="0">N</text>
        </g>
        <rect x="480" y="948" width="182" height="108" fill="none" stroke={INK} strokeWidth="0.45" opacity="0.55" />
        <rect x="481.4" y="949.4" width="179.2" height="105.2" fill="none" stroke={INK} strokeWidth="0.18" opacity="0.35" />
      </svg>

      {/* the city's postcards, dealt below the map */}
      <div className="border-t-2 border-[#2b2a24]/25 px-5 py-5 sm:px-7" style={{ backgroundColor: "#e9e0c9", backgroundImage: GRAIN }}>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm" style={{ color: INK }}>
            <strong>{current.label}</strong> — {current.note}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: INK, opacity: 0.45 }}>
            pick a landmark · flip a card ↻
          </p>
        </div>
        <div key={active} className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 motion-safe:animate-[pageIn_360ms_ease-out]">
          {cards.map((h, i) => (
            <Postcard key={h.title} data={h} index={i} />
          ))}
        </div>
        {active === "Windsor" && (
          <div className="mt-6 text-center">
            <Link
              href="/hackathons"
              className="inline-flex -rotate-1 items-center gap-1.5 border-[2px] border-[#2b2a24] bg-[#f4eedd] px-3 py-1.5 font-mono text-[11px] font-bold shadow-[2px_2px_0_rgba(43,42,36,0.6)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
              style={{ color: INK }}
            >
              <span className="inline-block h-2.5 w-2 border border-[#2b2a24]/60" style={{ backgroundColor: RED }} />
              all 17 postcards →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
