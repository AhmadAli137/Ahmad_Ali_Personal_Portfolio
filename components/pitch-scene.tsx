"use client";

import { AhmadHead, SceneDefs, Shadow } from "@/components/scene-bits";

/**
 * Pitch night: Ahmad in a suit at the podium (water glass, SS logo),
 * gesturing to the SaySpark slide as its chart draws itself; spotlights
 * sweep, the audience sits in chair rows, one phone records.
 */
export function PitchScene() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.05)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad in a suit pitching SaySpark on stage: podium with water glass, growth chart on the big screen, sweeping spotlights, seated audience">
        <SceneDefs />
        <defs>
          <radialGradient id="ps-room" cx="0.6" cy="0.32" r="0.95">
            <stop offset="0%" stopColor="#13233c" />
            <stop offset="100%" stopColor="#070b11" />
          </radialGradient>
          <linearGradient id="ps-stage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b2c47" />
            <stop offset="100%" stopColor="#0f1a2b" />
          </linearGradient>
          <linearGradient id="ps-beamfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="ps-beamfill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34f5a2" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#34f5a2" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* room */}
        <rect x="0" y="0" width="1200" height="472" fill="url(#ps-room)" />

        {/* lighting truss + moving beams */}
        <rect x="0" y="12" width="1200" height="7" fill="#121e30" />
        {[90, 330, 870, 1110].map((x) => (
          <line key={x} x1={x} y1="19" x2={x} y2="30" stroke="#121e30" strokeWidth="4" />
        ))}
        <g className="ps-beam-a" style={{ transformOrigin: "180px 34px" }}>
          <path d="M162 28 h36 l9 16 h-54 z" fill="url(#sb-metal)" />
          <circle cx="180" cy="42" r="5" fill="#7df3ff" opacity="0.9" filter="url(#sb-soft)" />
          <path d="M170 46 L560 472 L780 472 L214 46 Z" fill="url(#ps-beamfill)" />
        </g>
        <g className="ps-beam-b" style={{ transformOrigin: "1024px 34px" }}>
          <path d="M1006 28 h36 l9 16 h-54 z" fill="url(#sb-metal)" />
          <circle cx="1024" cy="42" r="5" fill="#8dffc9" opacity="0.9" filter="url(#sb-soft)" />
          <path d="M1014 46 L680 472 L900 472 L1058 46 Z" fill="url(#ps-beamfill2)" />
        </g>

        {/* hanging event banner */}
        <g transform="rotate(1.2 160 120)">
          <line x1="118" y1="19" x2="126" y2="60" stroke="#22354e" strokeWidth="2" />
          <line x1="212" y1="19" x2="206" y2="60" stroke="#22354e" strokeWidth="2" />
          <rect x="106" y="60" width="122" height="42" rx="4" fill="#0e1a2b" stroke="#22354e" strokeWidth="2" />
          <text x="167" y="78" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="11" fill="#ffd9a0" letterSpacing="2">TAKE YOUR</text>
          <text x="167" y="94" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="11" fill="#ffd9a0" letterSpacing="2">SHOT 2026</text>
        </g>

        {/* ===== big screen on truss ===== */}
        <line x1="500" y1="19" x2="500" y2="52" stroke="#121e30" strokeWidth="4" />
        <line x1="700" y1="19" x2="700" y2="52" stroke="#121e30" strokeWidth="4" />
        <rect x="322" y="52" width="536" height="282" rx="12" fill="#0a0f18" stroke="#22354e" strokeWidth="4" className="ws-screen-glow" />
        <rect x="332" y="62" width="516" height="262" rx="7" fill="#060b12" />
        {/* slide content */}
        <text x="368" y="118" fontFamily="Consolas, monospace" fontSize="30" fontWeight="bold" fill="#34f5a2" letterSpacing="3">SAYSPARK</text>
        <text x="368" y="143" fontFamily="Consolas, monospace" fontSize="13" fill="#8aa0b6" letterSpacing="2">voice-first robotics for kids</text>
        {/* chart grid + axes */}
        {[240, 268, 296].map((y) => (
          <line key={y} x1="404" y1={y} x2="800" y2={y} stroke="#122036" strokeWidth="1.5" />
        ))}
        <path d="M404 304 v-136 M404 304 h396" stroke="#1f3550" strokeWidth="2.5" />
        <path
          d="M404 300 L 470 290 L 536 294 L 602 268 L 668 248 L 734 212 L 796 182"
          stroke="#00e5ff"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ps-chart"
        />
        <g className="ps-chart-head">
          <circle cx="796" cy="182" r="5" fill="#00e5ff" filter="url(#sb-soft)" />
          <text x="770" y="168" fontFamily="Consolas, monospace" fontSize="12" fill="#7df3ff">↑ 214%</text>
        </g>
        <g className="ps-rocket">
          <path d="M812 158 q 11 -20 4 -37 q -15 9 -17 30 l 5 9 z" fill="#ffb454" />
          <circle cx="808" cy="134" r="3" fill="#0a0e14" />
          <path d="M804 160 q -4 8 -10 10 q 8 1 13 -4 z" fill="#ffd9a0" />
        </g>
        {/* screen light spill on stage */}
        <rect x="322" y="334" width="536" height="56" fill="#00e5ff" opacity="0.04" />

        {/* ===== stage ===== */}
        <Shadow cx={600} cy={452} rx={470} ry={16} o={0.4} />
        <rect x="70" y="390" width="1060" height="26" rx="5" fill="url(#ps-stage)" />
        <rect x="70" y="390" width="1060" height="4" fill="#2a4468" />
        <rect x="84" y="416" width="1032" height="56" fill="#0c1524" />
        {[180, 420, 660, 900].map((x) => (
          <line key={x} x1={x} y1="416" x2={x} y2="472" stroke="#0a111c" strokeWidth="3" />
        ))}

        {/* spotlight pool under Ahmad */}
        <ellipse cx="948" cy="404" rx="120" ry="15" fill="#7df3ff" opacity="0.08" className="gs-lamp" filter="url(#sb-soft6)" />

        {/* ===== Ahmad at podium ===== */}
        <g className="ws-bob" style={{ transformOrigin: "948px 330px" }}>
          {/* gesturing arm (sleeve + cuff + hand) */}
          <g className="ps-arm" style={{ transformOrigin: "926px 280px" }}>
            <path d="M926 280 q -34 -4 -58 -22 q -10 -8 -14 -18" stroke="#141d2e" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M860 244 q -4 -6 -6 -12" stroke="#e6eef6" strokeWidth="9" strokeLinecap="round" />
            <circle cx="852" cy="228" r="8" fill="#d8ab80" />
            <path d="M846 222 l -6 -8" stroke="#d8ab80" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* suit torso */}
          <g className="ws-breathe" style={{ transformOrigin: "948px 392px" }}>
            <path d="M902 392 q -6 -104 46 -112 q 52 8 46 112 z" fill="#141d2e" />
            {/* shirt + tie */}
            <path d="M936 284 l 12 30 l 12 -30 q -12 9 -24 0 z" fill="#e6eef6" />
            <path d="M946 290 l 2 40 l 4 -1 l 2 -39 q -4 5 -8 0 z" fill="#34f5a2" />
            {/* lapels + pocket square */}
            <path d="M932 284 l 15 34 l -21 8 q -3 -24 6 -42 z" fill="#0e1522" />
            <path d="M964 284 l -15 34 l 21 8 q 3 -24 -6 -42 z" fill="#0e1522" />
            <path d="M914 330 l 12 -3 l -1 8 z" fill="#8dffc9" />
            {/* buttons */}
            <circle cx="948" cy="344" r="1.8" fill="#2a3a52" />
            <circle cx="948" cy="360" r="1.8" fill="#2a3a52" />
          </g>
          {/* head with headset mic */}
          <AhmadHead x={948} y={252} scale={0.96} accessory="mic" />
          {/* clicker arm at side */}
          <path d="M978 306 q 16 24 10 46" stroke="#141d2e" strokeWidth="15" fill="none" strokeLinecap="round" />
          <path d="M986 344 q 2 6 2 10" stroke="#e6eef6" strokeWidth="8" strokeLinecap="round" />
          <circle cx="988" cy="360" r="7" fill="#d8ab80" />
          <rect x="982" y="364" width="13" height="7" rx="3" fill="#0a0e14" />
          <circle cx="992" cy="367" r="1.4" fill="#34f5a2" className="ws-led" />
        </g>

        {/* podium with side face, logo, water glass */}
        <g>
          <Shadow cx={936} cy={412} rx={82} o={0.4} />
          <path d="M886 390 l 11 -76 h 90 l 11 76 z" fill="#182740" stroke="#2f4a6e" strokeWidth="2" />
          <path d="M998 390 l -11 -76 l 12 4 l 9 72 z" fill="#101b2e" />
          <rect x="890" y="306" width="106" height="10" rx="4" fill="#2a4468" />
          <rect x="916" y="336" width="50" height="26" rx="5" fill="none" stroke="#34f5a2" strokeWidth="1.6" opacity="0.75" />
          <text x="941" y="354" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fontWeight="bold" fill="#34f5a2">SS</text>
          {/* water glass */}
          <path d="M902 306 l 2 -18 h 12 l 2 18 z" fill="#bfeaf5" opacity="0.35" stroke="#9fd8e8" strokeWidth="1.2" />
          <path d="M904 298 h 14" stroke="#9fd8e8" strokeWidth="1.4" opacity="0.7" />
        </g>

        {/* ===== audience: chair rows + heads ===== */}
        {[
          { y: 496, s: 1, heads: [130, 250, 370, 490, 610, 730, 850, 970, 1090] },
          { y: 540, s: 1.15, heads: [70, 200, 330, 460, 590, 720, 850, 980, 1110] },
        ].map((row, r) => (
          <g key={r}>
            {row.heads.map((x, i) => (
              <g key={i} transform={`translate(${x} ${row.y}) scale(${row.s})`}>
                {/* chair back */}
                <rect x="-26" y="-14" width="52" height="30" rx="8" fill="#0a1220" />
                {/* shoulders + head, varied hair */}
                <path d="M-30 16 q 0 -40 30 -40 q 30 0 30 40 z" fill="#060a10" />
                <circle cx="0" cy="-32" r={16 + ((i + r) % 3)} fill="#060a10" />
                {(i + r) % 4 === 1 && <path d="M-14 -40 q 14 -12 28 0 q -6 -16 -14 -16 q -8 0 -14 16" fill="#04070c" />}
                {(i + r) % 4 === 3 && <circle cx="0" cy="-46" r="7" fill="#04070c" />}
              </g>
            ))}
          </g>
        ))}
        {/* clapping pairs + raised hand + phone */}
        <g className="ps-clap-a" style={{ transformOrigin: "372px 468px" }}>
          <circle cx="364" cy="464" r="6" fill="#0a1017" />
          <circle cx="382" cy="461" r="6" fill="#0a1017" />
        </g>
        <g className="ps-clap-b" style={{ transformOrigin: "742px 470px" }}>
          <circle cx="734" cy="466" r="6" fill="#0a1017" />
          <circle cx="752" cy="463" r="6" fill="#0a1017" />
        </g>
        <path d="M612 470 q 2 -18 10 -24" stroke="#0a1017" strokeWidth="7" strokeLinecap="round" className="ps-clap-a" style={{ transformOrigin: "612px 470px" }} />
        <g>
          <rect x="520" y="446" width="17" height="28" rx="3.5" fill="#0a0e14" stroke="#22354e" strokeWidth="1.5" />
          <rect x="522.5" y="449" width="12" height="21" rx="2" fill="#00e5ff" opacity="0.45" className="ws-led" />
        </g>

        {/* dust in beams + vignette */}
        {[[320, 240], [560, 180], [840, 240], [1000, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#9db3c8" className="ws-mote" style={{ animationDelay: `${i * 2.1}s` }} />
        ))}
        <rect x="0" y="0" width="1200" height="560" fill="url(#sb-vignette)" />
      </svg>
    </div>
  );
}
