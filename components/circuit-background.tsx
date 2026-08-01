/**
 * Full-page scrolling background styled after an 8-bit microcomputer board
 * (6502-era): DIP CPU with address/data bus escape routing, RAM bank, ROM,
 * video chip, crystal, electrolytic caps, voltage regulator, edge connector,
 * via stitching, silkscreen designators. The board is a vertical tile repeated
 * down the whole document, so scrolling reveals new sections. Light pulses
 * originate at chip pins and flow along the nets. Styles in globals.css.
 */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ---------- Small footprint components ---------- */

function DIPv({ x, y, w, h, pins, label }: { x: number; y: number; w: number; h: number; pins: number; label: string }) {
  const pitch = h / (pins + 1);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" className="circuit-ic" strokeWidth="1.5" />
      <path d={`M ${x + w / 2 - 10} ${y} a 10 10 0 0 0 20 0`} className="circuit-ic" strokeWidth="1.2" />
      {range(pins).map((k) => (
        <g key={k}>
          <path d={`M ${x} ${y + pitch * (k + 1)} h -9`} className="circuit-pin" />
          <circle cx={x - 13} cy={y + pitch * (k + 1)} r="3.4" className="circuit-pad" strokeWidth="1.2" />
          <path d={`M ${x + w} ${y + pitch * (k + 1)} h 9`} className="circuit-pin" />
          <circle cx={x + w + 13} cy={y + pitch * (k + 1)} r="3.4" className="circuit-pad" strokeWidth="1.2" />
        </g>
      ))}
      <text x={x} y={y - 8} className="circuit-silk">{label}</text>
    </g>
  );
}

function DIPh({ x, y, w, h, pins, label }: { x: number; y: number; w: number; h: number; pins: number; label: string }) {
  const pitch = w / (pins + 1);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" className="circuit-ic" strokeWidth="1.5" />
      <path d={`M ${x} ${y + h / 2 - 10} a 10 10 0 0 0 0 20`} className="circuit-ic" strokeWidth="1.2" />
      {range(pins).map((k) => (
        <g key={k}>
          <path d={`M ${x + pitch * (k + 1)} ${y} v -9`} className="circuit-pin" />
          <circle cx={x + pitch * (k + 1)} cy={y - 13} r="3.4" className="circuit-pad" strokeWidth="1.2" />
          <path d={`M ${x + pitch * (k + 1)} ${y + h} v 9`} className="circuit-pin" />
          <circle cx={x + pitch * (k + 1)} cy={y + h + 13} r="3.4" className="circuit-pad" strokeWidth="1.2" />
        </g>
      ))}
      <text x={x} y={y - 20} className="circuit-silk">{label}</text>
    </g>
  );
}

function ElectroCap({ x, y, r = 16, label }: { x: number; y: number; r?: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} className="circuit-ic" strokeWidth="1.5" />
      <circle cx={x} cy={y} r={r * 0.55} className="circuit-hole" strokeWidth="1" />
      <path d={`M ${x + r + 4} ${y - r + 2} h 7 M ${x + r + 7.5} ${y - r - 1.5} v 7`} className="circuit-pin" strokeWidth="1.5" />
      <text x={x - r} y={y + r + 14} className="circuit-silk">{label}</text>
    </g>
  );
}

function Crystal({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={46} height={20} rx="10" className="circuit-ic" strokeWidth="1.5" />
      <circle cx={x - 8} cy={y + 10} r="3.4" className="circuit-pad" strokeWidth="1.2" />
      <circle cx={x + 54} cy={y + 10} r="3.4" className="circuit-pad" strokeWidth="1.2" />
      <text x={x - 4} y={y + 36} className="circuit-silk">{label}</text>
    </g>
  );
}

function Passive({ x, y, label, vertical = false }: { x: number; y: number; label: string; vertical?: boolean }) {
  return (
    <g>
      {vertical ? (
        <>
          <rect x={x - 5.5} y={y} width={11} height={13} rx="2" className="circuit-pad" strokeWidth="1.2" />
          <rect x={x - 5.5} y={y + 27} width={11} height={13} rx="2" className="circuit-pad" strokeWidth="1.2" />
          <path d={`M ${x} ${y + 13} v 14`} className="circuit-trace-cyan" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x={x} y={y - 5.5} width={13} height={11} rx="2" className="circuit-pad" strokeWidth="1.2" />
          <rect x={x + 27} y={y - 5.5} width={13} height={11} rx="2" className="circuit-pad" strokeWidth="1.2" />
          <path d={`M ${x + 13} ${y} h 14`} className="circuit-trace-cyan" strokeWidth="1.5" />
        </>
      )}
      <text x={x - 6} y={vertical ? y - 8 : y - 12} className="circuit-silk">{label}</text>
    </g>
  );
}

function Regulator({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x - 10} y={y - 14} width={110} height={14} rx="2" className="circuit-ic" strokeWidth="1.2" />
      <circle cx={x + 45} cy={y - 7} r="4" className="circuit-hole" strokeWidth="1" />
      <rect x={x} y={y} width={90} height={54} rx="3" className="circuit-ic" strokeWidth="1.5" />
      {range(3).map((k) => (
        <g key={k}>
          <path d={`M ${x + 20 + 25 * k} ${y + 54} v 14`} className="circuit-pin" />
          <circle cx={x + 20 + 25 * k} cy={y + 72} r="3.6" className="circuit-pad" strokeWidth="1.2" />
        </g>
      ))}
      <text x={x} y={y + 94} className="circuit-silk">{label}</text>
    </g>
  );
}

function ViaGrid({ x, y, cols, rows }: { x: number; y: number; cols: number; rows: number }) {
  return (
    <g>
      {range(cols * rows).map((i) => (
        <circle key={i} cx={x + 14 * (i % cols)} cy={y + 14 * Math.floor(i / cols)} r="1.7" className="circuit-via" />
      ))}
    </g>
  );
}

function EdgeConnector({ x, y, n, label }: { x: number; y: number; n: number; label: string }) {
  return (
    <g>
      <rect x={x - 10} y={y - 8} width={n * 26 + 12} height={76} rx="3" className="circuit-silk-box" strokeWidth="1" />
      {range(n).map((k) => (
        <rect key={k} x={x + 26 * k} y={y} width={16} height={60} rx="2" className="circuit-gold" strokeWidth="1" />
      ))}
      <text x={x - 8} y={y - 16} className="circuit-silk">{label}</text>
    </g>
  );
}

/* ---------- One board tile (viewBox 1600 x 2400) ---------- */

const cpu = { x: 1080, y: 100, w: 130, h: 440, pins: 20 };
const cpuPinY = (k: number) => cpu.y + (cpu.h / (cpu.pins + 1)) * k;

/* Address bus: CPU left pins 1..16 route left, 45° down, into the left trunk */
const addrBus = range(16).map((i) => {
  const k = i + 1;
  const y = cpuPinY(k);
  return { d: `M ${cpu.x - 17} ${y} H ${700 + 8 * k} l -30 30 H 160`, via: { x: 160, y: y + 30 } };
});

/* Data/control: CPU right pins 1..16 route right into the right trunk */
const dataBus = range(16).map((i) => {
  const k = i + 1;
  const y = cpuPinY(k);
  return { d: `M ${cpu.x + cpu.w + 17} ${y} H ${1420 - 8 * k} l 30 30 H 1462`, via: { x: 1462, y: y + 30 } };
});

/* Trunks running the full tile height (tile-continuous) */
const leftTrunk = range(10).map((i) => ({ x: 44 + 9 * i }));
const rightTrunk = range(10).map((i) => ({ x: 1475 + 9 * i }));

/* RAM bank + its bus */
const rams = range(4).map((j) => ({ x: 280 + 220 * j, y: 1000 }));
const ramBusY = (i: number) => 862 + 9 * i;
const ramTaps = rams.flatMap((r, j) =>
  range(8).map((i) => ({
    x: r.x + (170 / 9) * (i + 1),
    busY: ramBusY(i),
    j,
    i,
  }))
);

/* Video chip bus */
const vid = { x: 560, y: 1560, w: 420, h: 110, pins: 20 };
const vidBusY = (i: number) => 1408 + 9 * i;
const vidTaps = range(8).map((i) => ({ x: vid.x + (vid.w / 21) * (2 * i + 3), busY: vidBusY(i) }));

/* Edge connector risers */
const edge = { x: 500, y: 2324, n: 22 };
const edgeRisers = range(edge.n).map((k) => ({
  x: edge.x + 26 * k + 8,
  topY: 2270 - (k % 4) * 8,
}));

interface Net {
  d: string;
  tone: "cyan" | "mint";
  duration: number;
  delay: number;
}
const lightNets: Net[] = [
  { d: `M 62 0 V 2400`, tone: "cyan", duration: 30, delay: 0 },
  { d: `M 1547 2400 V 0`, tone: "mint", duration: 34, delay: 8 },
  { d: `M ${cpu.x - 17} ${cpuPinY(5)} H ${700 + 8 * 5} l -30 30 H 160`, tone: "cyan", duration: 16, delay: 3 },
  { d: `M ${cpu.x + cpu.w + 17} ${cpuPinY(10)} H ${1420 - 8 * 10} l 30 30 H 1462`, tone: "mint", duration: 18, delay: 11 },
  { d: `M 134 ${ramBusY(3)} H 1240`, tone: "cyan", duration: 22, delay: 6 },
  { d: `M 134 ${vidBusY(5)} H 1120`, tone: "mint", duration: 26, delay: 15 },
];

function BoardTile() {
  return (
    <svg className="w-full" viewBox="0 0 1600 2400" preserveAspectRatio="xMidYMin slice" fill="none">
      {/* Trunks */}
      {leftTrunk.map((t, i) => (
        <path key={`lt-${i}`} d={`M ${t.x} 0 V 2400`} className="circuit-trace-cyan" strokeWidth="1.3" />
      ))}
      {rightTrunk.map((t, i) => (
        <path key={`rt-${i}`} d={`M ${t.x} 0 V 2400`} className="circuit-trace-cyan" strokeWidth="1.3" />
      ))}

      {/* ===== CPU section ===== */}
      <DIPv x={cpu.x} y={cpu.y} w={cpu.w} h={cpu.h} pins={cpu.pins} label="U1 · CPU 6502" />
      {addrBus.map((t, i) => (
        <g key={`a-${i}`}>
          <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.3" />
          <circle cx={t.via.x} cy={t.via.y} r="2.1" className="circuit-via" />
        </g>
      ))}
      {dataBus.map((t, i) => (
        <g key={`d-${i}`}>
          <path d={t.d} className="circuit-trace-cyan" strokeWidth="1.3" />
          <circle cx={t.via.x} cy={t.via.y} r="2.1" className="circuit-via" />
        </g>
      ))}
      <text x={560} y={470} className="circuit-silk">A0–A15</text>
      <text x={1300} y={470} className="circuit-silk">D0–D7</text>
      <Crystal x={1170} y={620} label="Y1 · 1.79 MHz" />
      <path d={`M 1162 630 H 1132 V 553 M 1224 630 h 24 V 553`} className="circuit-trace-cyan" strokeWidth="1.3" />
      <ElectroCap x={1000} y={632} label="C1" />
      <Passive x={940} y={80} label="R1" />
      <Passive x={1000} y={80} label="R2" />
      <ViaGrid x={1330} y={640} cols={4} rows={5} />

      {/* ===== RAM section ===== */}
      {range(8).map((i) => (
        <path key={`rb-${i}`} d={`M 134 ${ramBusY(i)} H 1240`} className="circuit-trace-cyan" strokeWidth="1.3" />
      ))}
      {ramTaps.map((t, i) => (
        <g key={`tap-${i}`}>
          <path d={`M ${t.x} ${t.busY} V 978`} className="circuit-trace-cyan" strokeWidth="1.2" />
          <circle cx={t.x} cy={t.busY} r="2.1" className="circuit-via" />
        </g>
      ))}
      {rams.map((r, j) => (
        <g key={`ram-${j}`}>
          <DIPh x={r.x} y={r.y} w={170} h={64} pins={8} label={`U${3 + j} · RAM 2114`} />
          <Passive x={r.x + 176} y={r.y + 90} label={`C${4 + j}`} vertical />
        </g>
      ))}
      <DIPh x={1250} y={990} w={220} h={70} pins={12} label="U7 · ROM 2764" />
      <ViaGrid x={180} y={1230} cols={6} rows={4} />
      <text x={140} y={840} className="circuit-silk">DATA BUS</text>

      {/* ===== Video section ===== */}
      {range(8).map((i) => (
        <path key={`vb-${i}`} d={`M 134 ${vidBusY(i)} H 1120`} className="circuit-trace-cyan" strokeWidth="1.3" />
      ))}
      {vidTaps.map((t, i) => (
        <g key={`vt-${i}`}>
          <path d={`M ${t.x} ${t.busY} V ${vid.y - 22}`} className="circuit-trace-cyan" strokeWidth="1.2" />
          <circle cx={t.x} cy={t.busY} r="2.1" className="circuit-via" />
        </g>
      ))}
      <DIPh x={vid.x} y={vid.y} w={vid.w} h={vid.h} pins={vid.pins} label="U8 · VIDEO PPU" />
      {range(6).map((k) => (
        <path
          key={`vr-${k}`}
          d={`M ${vid.x + vid.w + 30 + 10 * k} ${vid.y + (vid.h / 21) * (3 * k + 2)} H ${1380 + 6 * k} l 24 24 H 1462`}
          className="circuit-trace-cyan"
          strokeWidth="1.3"
        />
      ))}
      <Passive x={1090} y={1500} label="R5" vertical />
      <Passive x={1130} y={1500} label="R6" vertical />
      <Passive x={1170} y={1500} label="C9" vertical />
      <ElectroCap x={480} y={1620} label="C10" />
      <ViaGrid x={1280} y={1780} cols={5} rows={4} />

      {/* ===== Power / expansion section ===== */}
      <Regulator x={170} y={2140} label="VR1 · 7805" />
      <path d={`M 260 2212 H 420 V 2140 H 700`} className="circuit-power" strokeWidth="5" />
      <text x={430} y={2128} className="circuit-silk">+5V</text>
      <ElectroCap x={1420} y={2200} r={20} label="C14" />
      <g>
        <rect x={1290} y={2160} width={44} height={44} rx="4" className="circuit-ic" strokeWidth="1.5" />
        {[
          [1290, 2160], [1334, 2160], [1290, 2204], [1334, 2204],
        ].map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r="3.4" className="circuit-pad" strokeWidth="1.2" />
        ))}
        <text x={1284} y={2148} className="circuit-silk">SW1 · RST</text>
      </g>
      <EdgeConnector x={edge.x} y={edge.y} n={edge.n} label="J1 · EXPANSION" />
      {edgeRisers.map((r, i) => (
        <g key={`er-${i}`}>
          <path d={`M ${r.x} ${edge.y - 10} V ${r.topY}`} className="circuit-trace-cyan" strokeWidth="1.2" />
          <circle cx={r.x} cy={r.topY} r="2.1" className="circuit-via" />
        </g>
      ))}
      <text x={170} y={2330} className="circuit-silk">AHMADALI.CA · 8-BIT · REV 2.6</text>
      <ViaGrid x={880} y={2160} cols={7} rows={3} />

      {/* Flowing light, originating at chip pins */}
      {lightNets.map((t, i) => (
        <path
          key={`n-${i}`}
          d={t.d}
          pathLength={1000}
          className={`circuit-pulse circuit-pulse-${t.tone}`}
          strokeWidth="2.5"
          style={{ animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s` }}
        />
      ))}
    </svg>
  );
}

const TILES = 8;

export function CircuitBackground() {
  return (
    <>
      {/* Fixed ambient light (stays with the viewport) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1]">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
        <div className="glow-orb glow-orb-4" />
      </div>
      {/* Board scrolls with the page; new sections appear as you scroll */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        <div className="flex flex-col">
          {range(TILES).map((i) => (
            <BoardTile key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
