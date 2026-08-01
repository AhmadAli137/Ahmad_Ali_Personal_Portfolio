/**
 * Site-wide ambient background: PCB-style routing — parallel bus traces with
 * 45° bends terminating in pads, vias at junctions, and light flowing along
 * a few long traces. Plus large drifting pools of light. Styles in globals.css.
 */

interface Pt {
  x: number;
  y: number;
}

/* Escape-routing bus: parallel traces, 45° bend, staggered pad terminations */
const bus1 = [0, 1, 2, 3].map((i) => ({
  d: `M -60 ${90 + 16 * i} H ${300 - 16 * i} l 90 90 H ${480 - 26 * i}`,
  pad: { x: 480 - 26 * i, y: 180 + 16 * i } as Pt,
}));

const bus2 = [0, 1, 2].map((i) => ({
  d: `M 1500 ${560 + 16 * i} H ${1200 + 16 * i} l -90 -90 V ${360 + 26 * i}`,
  pad: { x: 1110 + 16 * i, y: 360 + 26 * i } as Pt,
}));

const bus3 = [0, 1, 2].map((i) => ({
  d: `M ${240 + 16 * i} 960 V ${790 - 16 * i} l 70 -70 H ${430 + 26 * i}`,
  pad: { x: 430 + 26 * i, y: 720 - 16 * i } as Pt,
}));

/* Long single traces that carry the flowing light */
interface LightTrace {
  d: string;
  tone: "cyan" | "mint";
  duration: number;
  delay: number;
  pad: Pt;
  vias: Pt[];
}

const lightTraces: LightTrace[] = [
  {
    d: "M -60 420 H 200 l 60 60 H 560 l 60 -60 H 760",
    tone: "cyan",
    duration: 24,
    delay: 0,
    pad: { x: 760, y: 420 },
    vias: [{ x: 200, y: 420 }, { x: 620, y: 420 }],
  },
  {
    d: "M 1500 150 H 1150 l -60 60 H 900",
    tone: "mint",
    duration: 28,
    delay: 9,
    pad: { x: 900, y: 210 },
    vias: [{ x: 1150, y: 150 }],
  },
  {
    d: "M 700 -60 V 80 l 60 60 H 1000",
    tone: "cyan",
    duration: 26,
    delay: 16,
    pad: { x: 1000, y: 140 },
    vias: [{ x: 700, y: 80 }],
  },
  {
    d: "M 1500 880 H 1240 l -70 -70 V 640",
    tone: "mint",
    duration: 30,
    delay: 5,
    pad: { x: 1170, y: 640 },
    vias: [{ x: 1240, y: 880 }],
  },
];

const busTraces = [...bus1, ...bus2, ...bus3];

export function CircuitBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      {/* Drifting pools of light */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Bus traces (static) with pads */}
        {busTraces.map((t, i) => (
          <g key={`bus-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="4.5" className="circuit-pad" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="1.4" className="circuit-via" />
          </g>
        ))}

        {/* Light-carrying traces with pads and vias */}
        {lightTraces.map((t, i) => (
          <g key={`light-${i}`}>
            <path d={t.d} className={`circuit-trace-${t.tone}`} strokeWidth="1.5" />
            <path
              d={t.d}
              pathLength={1000}
              className={`circuit-pulse circuit-pulse-${t.tone}`}
              strokeWidth="2.5"
              style={{ animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s` }}
            />
            <circle cx={t.pad.x} cy={t.pad.y} r="4.5" className="circuit-pad" strokeWidth="1.5" />
            <circle
              cx={t.pad.x}
              cy={t.pad.y}
              r="1.4"
              className="circuit-node"
              style={{ animationDelay: `${t.delay}s` }}
            />
            {t.vias.map((v, j) => (
              <circle key={j} cx={v.x} cy={v.y} r="2.2" className="circuit-via" />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
