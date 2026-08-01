/**
 * Site-wide ambient background styled as a PCB layout:
 * - vertical bus routing down both side margins (full-height coverage)
 * - two IC footprints with pin stubs and 45° escape fan-outs
 * - corner buses, edge-to-edge signal traces carrying flowing light
 * - pads at every termination, vias at jogs
 * Plus large diffuse pools of drifting light. Styles in globals.css.
 */

interface Pt {
  x: number;
  y: number;
}

/* ---- Side columns: parallel vertical buses with a 45° jog ---- */
const leftColumn = [0, 1, 2].map((i) => ({
  d: `M ${60 + 16 * i} -60 V ${330 - 16 * i} l 40 40 V ${850 - 16 * i}`,
  pad: { x: 100 + 16 * i, y: 850 - 16 * i } as Pt,
  via: { x: 60 + 16 * i, y: 330 - 16 * i } as Pt,
}));

const rightColumn = [0, 1, 2].map((i) => ({
  d: `M ${1540 - 16 * i} 960 V ${560 + 16 * i} l -40 -40 V ${120 + 16 * i}`,
  pad: { x: 1500 - 16 * i, y: 120 + 16 * i } as Pt,
  via: { x: 1540 - 16 * i, y: 560 + 16 * i } as Pt,
}));

/* ---- Top-left corner escape bus ---- */
const cornerBus = [0, 1, 2, 3].map((i) => ({
  d: `M -60 ${90 + 16 * i} H ${300 - 16 * i} l 90 90 H ${480 - 26 * i}`,
  pad: { x: 480 - 26 * i, y: 180 + 16 * i } as Pt,
}));

/* ---- Bottom-right mini bus ---- */
const brBus = [0, 1].map((i) => ({
  d: `M 1600 ${830 + 16 * i} H ${1360 - 16 * i} l -50 -50`,
  pad: { x: 1310 - 16 * i, y: 780 + 16 * i - 0 } as Pt,
}));

/* ---- IC footprints ---- */
interface IC {
  x: number;
  y: number;
  w: number;
  h: number;
  pins: number;
}
const ic1: IC = { x: 1150, y: 140, w: 130, h: 92, pins: 5 };
const ic2: IC = { x: 260, y: 660, w: 130, h: 92, pins: 5 };

const pinY = (ic: IC, i: number) => ic.y + 14 + 16 * i;

/* IC1: right pins run to the right edge; left pins fan out 45° to test pads */
const ic1Right = [0, 1, 2, 3, 4].map((i) => ({
  d: `M ${ic1.x + ic1.w + 10} ${pinY(ic1, i)} H 1600`,
}));
const ic1Left = [0, 1, 2, 3, 4].map((i) => ({
  d: `M ${ic1.x - 10} ${pinY(ic1, i)} H ${1090 - 12 * i} l -36 36`,
  pad: { x: 1054 - 12 * i, y: pinY(ic1, i) + 36 } as Pt,
}));

/* IC2: left pins run to the left edge; right pins fan out 45° to test pads */
const ic2Left = [0, 1, 2, 3, 4].map((i) => ({
  d: `M ${ic2.x - 10} ${pinY(ic2, i)} H -60`,
}));
const ic2Right = [0, 1, 2, 3, 4].map((i) => ({
  d: `M ${ic2.x + ic2.w + 10} ${pinY(ic2, i)} H ${450 + 12 * i} l 36 36`,
  pad: { x: 486 + 12 * i, y: pinY(ic2, i) + 36 } as Pt,
}));

/* ---- Long signal traces carrying flowing light ---- */
interface LightTrace {
  d: string;
  tone: "cyan" | "mint";
  duration: number;
  delay: number;
  vias: Pt[];
}

const lightTraces: LightTrace[] = [
  {
    d: "M -60 470 H 600 l 40 40 H 1050 l 40 -40 H 1600",
    tone: "cyan",
    duration: 26,
    delay: 0,
    vias: [{ x: 640, y: 510 }, { x: 1050, y: 510 }],
  },
  {
    d: "M 1600 620 H 1000 l -40 40 H 520 l -40 -40 H -60",
    tone: "mint",
    duration: 30,
    delay: 12,
    vias: [{ x: 960, y: 660 }, { x: 520, y: 660 }],
  },
  {
    d: "M 76 -60 V 314 l 40 40 V 834",
    tone: "cyan",
    duration: 28,
    delay: 6,
    vias: [],
  },
  {
    d: "M 1524 960 V 576 l -40 -40 V 136",
    tone: "mint",
    duration: 32,
    delay: 19,
    vias: [],
  },
  {
    d: "M 700 -60 V 60 l 40 40 H 900",
    tone: "cyan",
    duration: 22,
    delay: 15,
    vias: [{ x: 700, y: 60 }],
  },
];

function ICFootprint({ ic }: { ic: IC }) {
  return (
    <g>
      <rect x={ic.x} y={ic.y} width={ic.w} height={ic.h} rx="5" className="circuit-ic" strokeWidth="1.5" />
      {/* pin-1 marker */}
      <circle cx={ic.x + 14} cy={ic.y + 14} r="2.5" className="circuit-via" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className="circuit-trace-cyan">
          <path d={`M ${ic.x - 10} ${pinY(ic, i)} h 10`} strokeWidth="3" />
          <path d={`M ${ic.x + ic.w} ${pinY(ic, i)} h 10`} strokeWidth="3" />
        </g>
      ))}
    </g>
  );
}

interface StaticTrace {
  d: string;
  pad: Pt;
  via?: Pt;
}

export function CircuitBackground() {
  const staticTraces: StaticTrace[] = [...leftColumn, ...rightColumn, ...cornerBus, ...brBus];
  const fanouts = [...ic1Left, ...ic2Right];
  const edgeRuns = [...ic1Right, ...ic2Left];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      {/* Diffuse pools of drifting light */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      <div className="glow-orb glow-orb-4" />
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {staticTraces.map((t, i) => (
          <g key={`s-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="4.5" className="circuit-pad" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="1.4" className="circuit-via" />
            {t.via && <circle cx={t.via.x} cy={t.via.y} r="2.2" className="circuit-via" />}
          </g>
        ))}

        {edgeRuns.map((t, i) => (
          <path key={`e-${i}`} d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
        ))}

        {fanouts.map((t, i) => (
          <g key={`f-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="4.5" className="circuit-pad" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="1.4" className="circuit-via" />
          </g>
        ))}

        <ICFootprint ic={ic1} />
        <ICFootprint ic={ic2} />

        {lightTraces.map((t, i) => (
          <g key={`l-${i}`}>
            <path d={t.d} className={`circuit-trace-${t.tone}`} strokeWidth="1.5" />
            <path
              d={t.d}
              pathLength={1000}
              className={`circuit-pulse circuit-pulse-${t.tone}`}
              strokeWidth="2.5"
              style={{ animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s` }}
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
