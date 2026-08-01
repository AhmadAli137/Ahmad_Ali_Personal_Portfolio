/**
 * Site-wide ambient background styled as a real control board:
 * board-edge outline, corner mounting holes, QFP + SOIC footprints with
 * escape routing, passives, pin headers, buses with 45° jogs, vias,
 * silkscreen designators, and light flowing along a few long nets.
 * Plus large diffuse pools of drifting light. Styles in globals.css.
 */

interface Pt {
  x: number;
  y: number;
}

/* ---------- Component footprints ---------- */

function MountHole({ x, y }: Pt) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" className="circuit-hole" strokeWidth="2.5" />
      <circle cx={x} cy={y} r="4.5" className="circuit-hole" strokeWidth="1" />
    </g>
  );
}

/** Quad flat package: body, die, pin-1 dot, pins on all four sides */
function QFP({ x, y, s, n }: { x: number; y: number; s: number; n: number }) {
  const pitch = s / (n + 1);
  const idx = Array.from({ length: n }, (_, k) => k + 1);
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx="4" className="circuit-ic" strokeWidth="1.5" />
      <rect x={x + s * 0.28} y={y + s * 0.28} width={s * 0.44} height={s * 0.44} className="circuit-ic" strokeWidth="1" />
      <circle cx={x + 14} cy={y + 14} r="2.5" className="circuit-via" />
      {idx.map((k) => (
        <g key={k} className="circuit-pin">
          <path d={`M ${x + pitch * k} ${y} v -12`} />
          <path d={`M ${x + pitch * k} ${y + s} v 12`} />
          <path d={`M ${x} ${y + pitch * k} h -12`} />
          <path d={`M ${x + s} ${y + pitch * k} h 12`} />
        </g>
      ))}
    </g>
  );
}

/** Small outline IC: body + pins left/right */
function SOIC({ x, y, w, h, n }: { x: number; y: number; w: number; h: number; n: number }) {
  const pitch = h / (n + 1);
  const idx = Array.from({ length: n }, (_, k) => k + 1);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" className="circuit-ic" strokeWidth="1.5" />
      <circle cx={x + 12} cy={y + 12} r="2.2" className="circuit-via" />
      {idx.map((k) => (
        <g key={k} className="circuit-pin">
          <path d={`M ${x} ${y + pitch * k} h -12`} />
          <path d={`M ${x + w} ${y + pitch * k} h 12`} />
        </g>
      ))}
    </g>
  );
}

/** Two-pad passive (resistor/capacitor) footprint, horizontal or vertical */
function Passive({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) {
  const pw = 11;
  const ph = 14;
  const gap = 15;
  return vertical ? (
    <g>
      <rect x={x - pw / 2} y={y} width={pw} height={ph} rx="2" className="circuit-pad" strokeWidth="1.2" />
      <rect x={x - pw / 2} y={y + ph + gap} width={pw} height={ph} rx="2" className="circuit-pad" strokeWidth="1.2" />
      <path d={`M ${x} ${y + ph} v ${gap}`} className="circuit-trace-cyan" strokeWidth="1.5" />
    </g>
  ) : (
    <g>
      <rect x={x} y={y - pw / 2} width={ph} height={pw} rx="2" className="circuit-pad" strokeWidth="1.2" />
      <rect x={x + ph + gap} y={y - pw / 2} width={ph} height={pw} rx="2" className="circuit-pad" strokeWidth="1.2" />
      <path d={`M ${x + ph} ${y} h ${gap}`} className="circuit-trace-cyan" strokeWidth="1.5" />
    </g>
  );
}

/** Pin header: row of annular pads with a silkscreen box */
function Header({ x, y, n, vertical = true }: { x: number; y: number; n: number; vertical?: boolean }) {
  const pitch = 24;
  const idx = Array.from({ length: n }, (_, k) => k);
  return (
    <g>
      <rect
        x={vertical ? x - 11 : x - 11}
        y={vertical ? y - 11 : y - 11}
        width={vertical ? 22 : pitch * (n - 1) + 22}
        height={vertical ? pitch * (n - 1) + 22 : 22}
        rx="3"
        className="circuit-silk-box"
        strokeWidth="1"
      />
      {idx.map((k) => (
        <g key={k}>
          <circle cx={vertical ? x : x + pitch * k} cy={vertical ? y + pitch * k : y} r="5.5" className="circuit-pad" strokeWidth="1.5" />
          <circle cx={vertical ? x : x + pitch * k} cy={vertical ? y + pitch * k : y} r="2" className="circuit-via" />
        </g>
      ))}
    </g>
  );
}

/* ---------- Routing ---------- */

const u1 = { x: 1120, y: 120, s: 120, n: 7 };
const u1pitch = u1.s / (u1.n + 1);
const pinIdx = Array.from({ length: u1.n }, (_, k) => k + 1);

/* U1 escape routing */
const u1Right = pinIdx.map((k) => ({
  d: `M ${u1.x + u1.s + 12} ${u1.y + u1pitch * k} H ${1330 + 4 * k}`,
  pad: { x: 1330 + 4 * k, y: u1.y + u1pitch * k } as Pt,
}));
const u1Top = pinIdx.map((k) => ({
  d: `M ${u1.x + u1pitch * k} ${u1.y - 12} V ${88 - 4 * k}`,
  pad: { x: u1.x + u1pitch * k, y: 88 - 4 * k } as Pt,
}));
const u1Left = pinIdx.map((k) => ({
  d: `M ${u1.x - 12} ${u1.y + u1pitch * k} H ${1052 - 8 * k} l -28 28`,
  pad: { x: 1024 - 8 * k, y: u1.y + u1pitch * k + 28 } as Pt,
}));
const u1BottomVias = pinIdx.map((k) => ({ x: u1.x + u1pitch * k, y: u1.y + u1.s + 20 }) as Pt);

const u2 = { x: 200, y: 590, w: 100, h: 70, n: 4 };
const u2pitch = u2.h / (u2.n + 1);
const u2Idx = Array.from({ length: u2.n }, (_, k) => k + 1);
const u2Left = u2Idx.map((k) => ({ d: `M ${u2.x - 12} ${u2.y + u2pitch * k} H -60` }));
const u2Right = u2Idx.map((k) => ({
  d: `M ${u2.x + u2.w + 12} ${u2.y + u2pitch * k} H ${360 + 8 * k} l 26 26`,
  pad: { x: 386 + 8 * k, y: u2.y + u2pitch * k + 26 } as Pt,
}));

/* J1 vertical header (right side): traces run left, jog up, end in vias */
const j1 = { x: 1520, y: 540, n: 6 };
const j1Traces = Array.from({ length: j1.n }, (_, k) => ({
  d: `M ${j1.x - 6} ${j1.y + 24 * k} H ${1360 - 10 * k} l -34 -34 H ${1270 - 10 * k}`,
  via: { x: 1270 - 10 * k, y: j1.y + 24 * k - 34 } as Pt,
}));

/* J2 horizontal header (bottom): traces rise, end in vias */
const j2 = { x: 560, y: 830, n: 8 };
const j2Traces = Array.from({ length: j2.n }, (_, k) => ({
  d: `M ${j2.x + 24 * k} ${j2.y - 6} V ${772 - 6 * k}`,
  via: { x: j2.x + 24 * k, y: 772 - 6 * k } as Pt,
}));

/* Side + top buses */
const leftBus = [0, 1, 2, 3].map((i) => ({
  d: `M ${48 + 14 * i} -60 V ${300 - 14 * i} l 36 36 V ${838 - 14 * i}`,
  pad: { x: 84 + 14 * i, y: 838 - 14 * i } as Pt,
  via: { x: 48 + 14 * i, y: 300 - 14 * i } as Pt,
}));
const topBus = [0, 1, 2, 3].map((i) => ({
  d: `M -60 ${52 + 14 * i} H ${520 - 14 * i} l 36 36 V ${240 - 14 * i}`,
  pad: { x: 556 - 14 * i, y: 240 - 14 * i } as Pt,
  via: { x: 520 - 14 * i, y: 52 + 14 * i } as Pt,
}));

/* Long signal nets carrying flowing light */
interface LightTrace {
  d: string;
  tone: "cyan" | "mint";
  duration: number;
  delay: number;
  vias: Pt[];
}
const lightTraces: LightTrace[] = [
  { d: "M -60 470 H 600 l 40 40 H 1050 l 40 -40 H 1600", tone: "cyan", duration: 26, delay: 0, vias: [{ x: 640, y: 510 }, { x: 1050, y: 510 }] },
  { d: "M 1600 660 H 1000 l -40 40 H 520 l -40 -40 H -60", tone: "mint", duration: 30, delay: 12, vias: [{ x: 960, y: 700 }, { x: 520, y: 700 }] },
  { d: "M 62 -60 V 286 l 36 36 V 824", tone: "cyan", duration: 28, delay: 6, vias: [] },
  { d: "M 1600 320 H 1300 l -40 40 H 1150", tone: "mint", duration: 24, delay: 19, vias: [{ x: 1260, y: 360 }] },
  { d: "M 700 -60 V 60 l 40 40 H 940", tone: "cyan", duration: 22, delay: 15, vias: [{ x: 700, y: 60 }] },
];

/* Silkscreen designators */
const silk: { x: number; y: number; t: string }[] = [
  { x: 1122, y: 112, t: "U1" },
  { x: 202, y: 582, t: "U2" },
  { x: 1544, y: 528, t: "J1" },
  { x: 548, y: 858, t: "J2" },
  { x: 952, y: 296, t: "R1" },
  { x: 952, y: 338, t: "R2" },
  { x: 1040, y: 78, t: "C3" },
  { x: 372, y: 508, t: "R3" },
  { x: 428, y: 508, t: "C2" },
  { x: 700, y: 130, t: "TP1" },
];

const passives: { x: number; y: number; vertical?: boolean }[] = [
  { x: 960, y: 308 },
  { x: 960, y: 350 },
  { x: 1048, y: 90 },
  { x: 380, y: 516, vertical: true },
  { x: 436, y: 516, vertical: true },
];

export function CircuitBackground() {
  const escapes = [...u1Right, ...u1Top, ...u1Left, ...u2Right];
  const buses = [...leftBus, ...topBus];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />
      <div className="glow-orb glow-orb-4" />
      <svg className="h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Board edge */}
        <rect x="16" y="16" width="1568" height="868" rx="14" className="circuit-edge" strokeWidth="2" />
        <MountHole x={54} y={54} />
        <MountHole x={1546} y={54} />
        <MountHole x={54} y={846} />
        <MountHole x={1546} y={846} />

        {/* Buses */}
        {buses.map((t, i) => (
          <g key={`b-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="4.5" className="circuit-pad" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="1.4" className="circuit-via" />
            <circle cx={t.via.x} cy={t.via.y} r="2.2" className="circuit-via" />
          </g>
        ))}

        {/* IC escape routing */}
        {escapes.map((t, i) => (
          <g key={`e-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.pad.x} cy={t.pad.y} r="4" className="circuit-pad" strokeWidth="1.5" />
          </g>
        ))}
        {u2Left.map((t, i) => (
          <path key={`u2l-${i}`} d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
        ))}
        {u1BottomVias.map((v, i) => (
          <g key={`u1b-${i}`}>
            <path d={`M ${v.x} ${u1.y + u1.s + 12} V ${v.y}`} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={v.x} cy={v.y} r="2.2" className="circuit-via" />
          </g>
        ))}

        {/* Headers with their routing */}
        <Header x={j1.x} y={j1.y} n={j1.n} vertical />
        {j1Traces.map((t, i) => (
          <g key={`j1-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.via.x} cy={t.via.y} r="2.2" className="circuit-via" />
          </g>
        ))}
        <Header x={j2.x} y={j2.y} n={j2.n} vertical={false} />
        {j2Traces.map((t, i) => (
          <g key={`j2-${i}`}>
            <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.5" />
            <circle cx={t.via.x} cy={t.via.y} r="2.2" className="circuit-via" />
          </g>
        ))}

        {/* Components */}
        <QFP x={u1.x} y={u1.y} s={u1.s} n={u1.n} />
        <SOIC x={u2.x} y={u2.y} w={u2.w} h={u2.h} n={u2.n} />
        {passives.map((p, i) => (
          <Passive key={`p-${i}`} {...p} />
        ))}

        {/* Silkscreen */}
        {silk.map((s, i) => (
          <text key={`t-${i}`} x={s.x} y={s.y} className="circuit-silk">
            {s.t}
          </text>
        ))}
        <text x={40} y={876} className="circuit-silk">
          AHMADALI.CA — REV 2.6
        </text>

        {/* Flowing light nets */}
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
