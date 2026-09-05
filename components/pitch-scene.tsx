"use client";

/**
 * Pitch night, illustrated: Ahmad in a suit at the podium, gesturing to a
 * SaySpark slide with a live-drawing growth chart, spotlights sweeping,
 * audience silhouettes below — one phone up recording. CSS: ps-* / ws-*.
 */
export function PitchScene() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.07)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad in a suit pitching SaySpark on stage: podium, growth chart on the big screen, spotlights, and an audience below">
        {/* room */}
        <rect x="0" y="0" width="1200" height="470" fill="#0a111c" />
        <rect x="0" y="0" width="1200" height="470" fill="url(#ps-room)" />
        <defs>
          <radialGradient id="ps-room" cx="0.62" cy="0.35" r="0.9">
            <stop offset="0%" stopColor="#12233a" />
            <stop offset="100%" stopColor="#070b11" />
          </radialGradient>
          <linearGradient id="ps-stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#182740" />
            <stop offset="100%" stopColor="#0e1826" />
          </linearGradient>
        </defs>

        {/* spotlight rigs */}
        <rect x="0" y="14" width="1200" height="6" fill="#111d2e" />
        <g className="ps-beam-a" style={{ transformOrigin: "180px 30px" }}>
          <path d="M164 26 h32 l8 14 h-48 z" fill="#1b2b40" />
          <path d="M172 40 L560 470 L760 470 L208 40 Z" fill="#00e5ff" opacity="0.06" />
        </g>
        <g className="ps-beam-b" style={{ transformOrigin: "1020px 30px" }}>
          <path d="M1004 26 h32 l8 14 h-48 z" fill="#1b2b40" />
          <path d="M1012 40 L700 470 L900 470 L1048 40 Z" fill="#34f5a2" opacity="0.05" />
        </g>

        {/* event banner */}
        <text x="110" y="120" fontFamily="Consolas, monospace" fontSize="15" fill="#8aa0b6" letterSpacing="4" transform="rotate(-90 110 120)" opacity="0.7">
          PITCH NIGHT
        </text>

        {/* ===== big screen ===== */}
        <rect x="330" y="60" width="520" height="270" rx="10" fill="#060b12" stroke="#0f3a4a" strokeWidth="3" className="ws-screen-glow" />
        <text x="420" y="118" fontFamily="Consolas, monospace" fontSize="30" fontWeight="bold" fill="#34f5a2" letterSpacing="3">
          SAYSPARK
        </text>
        <text x="420" y="144" fontFamily="Consolas, monospace" fontSize="13" fill="#8aa0b6" letterSpacing="2">
          voice-first robotics for kids
        </text>
        {/* chart axes */}
        <path d="M420 300 v-120 M420 300 h360" stroke="#1f3550" strokeWidth="2" />
        {/* growth line, drawing itself */}
        <path
          d="M420 296 L 480 288 L 540 292 L 600 268 L 660 252 L 720 216 L 780 188"
          stroke="#00e5ff"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          className="ps-chart"
        />
        <path d="M780 188 l -14 -2 m 14 2 l -4 13" stroke="#00e5ff" strokeWidth="3.5" fill="none" strokeLinecap="round" className="ps-chart-head" />
        {/* rocket */}
        <g className="ps-rocket">
          <path d="M796 150 q 10 -18 4 -34 q -14 8 -16 28 l 4 8 z" fill="#ffb454" opacity="0.9" />
          <circle cx="792" cy="128" r="3" fill="#0a0e14" />
        </g>
        {/* screen light spill */}
        <rect x="330" y="330" width="520" height="60" fill="#00e5ff" opacity="0.035" />

        {/* ===== stage ===== */}
        <rect x="80" y="388" width="1040" height="30" rx="6" fill="url(#ps-stage)" />
        <rect x="96" y="418" width="1008" height="52" fill="#0b1421" />
        <line x1="80" y1="388" x2="1120" y2="388" stroke="#22354e" strokeWidth="2" />

        {/* ===== Ahmad at the podium ===== */}
        <g className="ws-bob" style={{ transformOrigin: "930px 320px" }}>
          {/* gesturing arm (behind podium group so sleeve overlaps) */}
          <g className="ps-arm" style={{ transformOrigin: "912px 268px" }}>
            <path d="M912 268 q -44 -10 -74 -34" stroke="#131c2c" strokeWidth="15" fill="none" strokeLinecap="round" />
            <circle cx="834" cy="231" r="7.5" fill="#d1a37c" />
          </g>
          {/* torso: suit */}
          <path d="M886 388 q -6 -110 44 -118 q 50 8 44 118 z" fill="#131c2c" />
          <path d="M918 272 l 12 26 l 12 -26 q -12 8 -24 0" fill="#dfe9f3" />
          <path d="M928 276 l 2 34 l 4 0 l 2 -34 q -4 4 -8 0" fill="#34f5a2" />
          {/* lapels */}
          <path d="M914 272 l 14 30 l -18 6 z M946 272 l -14 30 l 18 6 z" fill="#0d1522" />
          {/* head */}
          <circle cx="930" cy="242" r="27" fill="#d1a37c" />
          <path d="M905 236 q 2 -23 25 -22 q 23 -1 25 22 q -5 -12 -25 -12 q -20 0 -25 12" fill="#171310" />
          <path d="M911 254 q 5 16 19 16 q 14 0 19 -16 q -4 12 -19 12 q -15 0 -19 -12" fill="#20180f" />
          {/* mic headset */}
          <path d="M952 244 q 6 10 -2 18" stroke="#8aa0b6" strokeWidth="2" fill="none" />
          <circle cx="949" cy="264" r="2.5" fill="#8aa0b6" />
          {/* clicker hand at side */}
          <path d="M962 300 q 14 22 8 44" stroke="#131c2c" strokeWidth="14" fill="none" strokeLinecap="round" />
          <circle cx="968" cy="348" r="7" fill="#d1a37c" />
          <rect x="962" y="352" width="12" height="7" rx="3" fill="#0a0e14" />
        </g>
        {/* podium */}
        <path d="M872 388 l 12 -74 h 96 l 12 74 z" fill="#152438" stroke="#2a405d" strokeWidth="2" />
        <rect x="880" y="308" width="104" height="10" rx="4" fill="#22354e" />
        <rect x="906" y="336" width="50" height="26" rx="5" fill="none" stroke="#34f5a2" strokeWidth="1.6" opacity="0.7" />
        <text x="931" y="354" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fontWeight="bold" fill="#34f5a2">SS</text>
        {/* spotlight pool on Ahmad */}
        <ellipse cx="930" cy="400" rx="110" ry="14" fill="#00e5ff" opacity="0.07" className="gs-lamp" />

        {/* ===== audience silhouettes ===== */}
        {[
          [120, 512], [220, 520], [320, 508], [420, 522], [520, 512],
          [620, 524], [720, 510], [820, 522], [920, 514], [1020, 520], [1110, 510],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y - 34} r="20" fill="#060a10" />
            <path d={`M${x - 34} 560 q 0 -44 34 -44 q 34 0 34 44 z`} fill="#060a10" />
          </g>
        ))}
        {/* clapping hands */}
        <g className="ps-clap" style={{ transformOrigin: "340px 470px" }}>
          <circle cx="332" cy="466" r="6" fill="#060a10" />
          <circle cx="350" cy="464" r="6" fill="#060a10" />
        </g>
        <g className="ps-clap" style={{ transformOrigin: "760px 472px", animationDelay: "0.25s" }}>
          <circle cx="752" cy="468" r="6" fill="#060a10" />
          <circle cx="770" cy="466" r="6" fill="#060a10" />
        </g>
        {/* phone recording */}
        <rect x="524" y="452" width="16" height="26" rx="3" fill="#0a0e14" stroke="#1f3550" strokeWidth="1.5" />
        <rect x="526" y="455" width="12" height="20" rx="2" fill="#00e5ff" opacity="0.5" className="ws-led" />

        {/* dust in the beams */}
        {[[300, 240], [560, 180], [840, 240], [1000, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#8aa0b6" className="ws-mote" style={{ animationDelay: `${i * 2.1}s` }} />
        ))}
      </svg>
    </div>
  );
}
