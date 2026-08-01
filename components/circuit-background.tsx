/**
 * Site-wide ambient background: faint circuit-board traces with light pulses
 * traveling along them. Pure CSS/SVG — styles live in globals.css.
 */

interface Trace {
  d: string;
  tone: "cyan" | "mint";
  duration: number;
  delay: number;
}

const traces: Trace[] = [
  { d: "M -60 120 H 300 V 340 H 620 V 480", tone: "cyan", duration: 9, delay: 0 },
  { d: "M 1500 80 H 1100 V 260 H 900 V 420", tone: "mint", duration: 11, delay: 2.5 },
  { d: "M 200 960 V 700 H 480 V 560 H 760", tone: "cyan", duration: 10, delay: 1.2 },
  { d: "M 1500 820 H 1180 V 640 H 1000 V 520", tone: "cyan", duration: 12, delay: 4 },
  { d: "M 720 -60 V 150 H 1040 V 300 H 1200", tone: "mint", duration: 13, delay: 3 },
  { d: "M -60 520 H 180 V 700 H 420 V 840", tone: "mint", duration: 11, delay: 5.5 },
  { d: "M 900 960 V 760 H 1240 V 600 H 1500", tone: "cyan", duration: 10, delay: 6.8 },
  { d: "M 460 -60 V 90 H 120 V 280", tone: "cyan", duration: 12, delay: 8 },
];

const nodes: { cx: number; cy: number; delay: number }[] = [
  { cx: 300, cy: 340, delay: 0 },
  { cx: 1100, cy: 260, delay: 1.4 },
  { cx: 480, cy: 560, delay: 2.8 },
  { cx: 1180, cy: 640, delay: 0.9 },
  { cx: 1040, cy: 150, delay: 3.5 },
  { cx: 180, cy: 700, delay: 2.1 },
  { cx: 1240, cy: 600, delay: 4.2 },
  { cx: 620, cy: 480, delay: 5 },
];

export function CircuitBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {traces.map((t, i) => (
          <g key={i}>
            {/* Faint static trace */}
            <path d={t.d} className={`circuit-trace circuit-trace-${t.tone}`} strokeWidth="1.5" />
            {/* Traveling light pulse */}
            <path
              d={t.d}
              pathLength={1000}
              className={`circuit-pulse circuit-pulse-${t.tone}`}
              strokeWidth="2"
              style={{ animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s` }}
            />
          </g>
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="3"
            className="circuit-node"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
