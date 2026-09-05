"use client";

import { AhmadHead, SceneDefs, Shadow } from "@/components/scene-bits";

/**
 * The FSAE garage: Ahmad in safety glasses seating the HV accumulator into
 * the car on jack stands, pegboard tools behind, the WEC turbine model
 * spinning its generator on the bench.
 */
export function GarageScene() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.05)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad in the Formula SAE garage sliding the battery accumulator into the car, wind-turbine model spinning on the bench">
        <SceneDefs />

        {/* walls, corrugation, floor */}
        <rect x="0" y="0" width="1200" height="446" fill="#0b1420" />
        {[70, 145, 220, 295, 370].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#0d1927" strokeWidth="4" />
        ))}
        <rect x="0" y="440" width="1200" height="120" fill="#0b1119" />
        <rect x="0" y="436" width="1200" height="6" fill="#131f30" />
        {[200, 500, 800, 1100].map((x) => (
          <line key={x} x1={x} y1="446" x2={x - 40} y2="560" stroke="#0f1826" strokeWidth="3" />
        ))}

        {/* hanging lamp + gradient cone */}
        <line x1="620" y1="0" x2="620" y2="82" stroke="#1a2c42" strokeWidth="3" />
        <path d="M596 84 h48 l-9 -20 h-30 z" fill="url(#sb-metal)" />
        <circle cx="620" cy="88" r="8" fill="#ffd9a0" className="gs-lamp" filter="url(#sb-soft)" />
        <path d="M620 92 L 430 446 L 810 446 Z" fill="url(#sb-cone)" className="gs-lamp" />

        {/* checkered banner */}
        <g transform="rotate(-1.5 590 50)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <g key={i}>
              <rect x={440 + i * 26} y="34" width="13" height="13" fill={i % 2 ? "#cfd9e4" : "#0a0e14"} opacity="0.85" />
              <rect x={453 + i * 26} y="47" width="13" height="13" fill={i % 2 ? "#0a0e14" : "#cfd9e4"} opacity="0.85" />
            </g>
          ))}
          <rect x="438" y="32" width="316" height="30" fill="none" stroke="#1c2f47" strokeWidth="3" />
        </g>

        {/* FSAE poster */}
        <rect x="66" y="58" width="122" height="88" rx="4" fill="#0d1826" stroke="#22354e" strokeWidth="2.5" />
        <text x="127" y="94" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="19" fontWeight="bold" fill="#00e5ff">FSAE</text>
        <text x="127" y="116" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="10" fill="#8aa0b6">MICHIGAN · 2024</text>
        <path d="M88 128 h78" stroke="#e8b45a" strokeWidth="2.5" />

        {/* pegboard with tools */}
        <rect x="216" y="60" width="176" height="140" rx="5" fill="#0e1a2b" stroke="#22354e" strokeWidth="2.5" />
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={230 + (i % 8) * 21} cy={76 + Math.floor(i / 8) * 26} r="1.7" fill="#1a2c42" />
        ))}
        {/* hanging wrench, hammer, pliers */}
        <g transform="rotate(4 258 92)">
          <circle cx="258" cy="94" r="7" fill="none" stroke="#93a9be" strokeWidth="4" />
          <rect x="255" y="99" width="6" height="44" rx="3" fill="#93a9be" />
        </g>
        <g transform="rotate(-3 316 92)">
          <rect x="312" y="86" width="9" height="52" rx="4" fill="#8a6a45" />
          <rect x="300" y="78" width="33" height="15" rx="3" fill="#93a9be" />
        </g>
        <g transform="rotate(6 366 96)">
          <path d="M362 84 q -7 12 2 22 M372 84 q 7 12 -2 22" stroke="#93a9be" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <circle cx="367" cy="104" r="3.5" fill="#5f748c" />
        </g>

        {/* ===== bench + wind turbine (left) ===== */}
        <g>
          <Shadow cx={185} cy={470} rx={130} o={0.38} />
          <rect x="58" y="330" width="270" height="13" rx="4" fill="url(#sb-desk)" />
          <rect x="58" y="343" width="270" height="7" fill="#0f1b2d" />
          <rect x="74" y="350" width="12" height="94" fill="#101a29" />
          <rect x="298" y="350" width="12" height="94" fill="#101a29" />
          {/* turbine: base plate, mast, nacelle, tail vane */}
          <Shadow cx={146} cy={328} rx={30} o={0.3} />
          <rect x="122" y="322" width="48" height="8" rx="3" fill="url(#sb-metal)" />
          <path d="M142 322 l 3 -84 h 4 l 3 84 z" fill="#2a405d" />
          <rect x="138" y="230" width="26" height="12" rx="5" fill="#33507a" />
          <path d="M164 234 l 14 -4 v 12 l -14 -4 z" fill="#2a405d" />
          <g className="gs-turbine" style={{ transformOrigin: "140px 236px" }}>
            {[0, 120, 240].map((a) => (
              <path key={a} d="M140 236 q 6 -32 -3 -56 q -9 26 -2 56 z" fill="#a9c8f2" opacity="0.9" transform={`rotate(${a} 140 236)`} />
            ))}
            <circle cx="140" cy="236" r="4.5" fill="#e6eef6" />
          </g>
          {/* wires → multimeter, live reading */}
          <path d="M146 322 q 26 16 58 -2" stroke="#e8b45a" strokeWidth="2" fill="none" opacity="0.75" />
          <path d="M148 324 q 24 22 54 6" stroke="#0a0e14" strokeWidth="2" fill="none" opacity="0.9" />
          <Shadow cx={232} cy={330} rx={30} o={0.28} />
          <rect x="206" y="302" width="52" height="28" rx="4.5" fill="#1d2f47" stroke="#33507a" strokeWidth="2" />
          <rect x="212" y="308" width="28" height="11" rx="2" fill="#0a0f18" />
          <text x="226" y="317" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="8" fill="#34f5a2" className="ws-led">12.4V</text>
          <circle cx="249" cy="313" r="3" fill="#34f5a2" className="ws-led" />
          {/* WEC plaque */}
          <rect x="268" y="298" width="46" height="32" rx="3.5" fill="#e8b45a" opacity="0.22" stroke="#e8b45a" strokeWidth="1.6" />
          <text x="291" y="318" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="10" fill="#ffd9a0">WEC ×4</text>
        </g>

        {/* ===== the car ===== */}
        <g>
          <Shadow cx={790} cy={438} rx={280} ry={13} o={0.45} />
          {/* jack stands */}
          <path d="M566 432 l 14 -30 h 14 l 14 30 z M572 432 h 40" fill="#1d2f47" stroke="#2f4a6e" strokeWidth="2" />
          <path d="M952 432 l 14 -30 h 14 l 14 30 z M958 432 h 40" fill="#1d2f47" stroke="#2f4a6e" strokeWidth="2" />
          {/* monocoque */}
          <path d="M498 398 q 20 -40 116 -46 q 26 -2 40 -14 l 34 -28 q 14 -10 36 -10 h 74 q 20 0 30 14 l 26 34 q 8 8 26 10 q 62 8 88 30 q 12 12 -4 14 l -448 0 q -20 -2 -18 -4 z" fill="#152841" stroke="#31517c" strokeWidth="2.5" />
          <path d="M520 372 q 60 -22 120 -24" stroke="#22406a" strokeWidth="3" fill="none" opacity="0.7" />
          {/* headrest + halo */}
          <path d="M812 300 q 16 -2 18 14 l -2 12 h -18 z" fill="#101d31" />
          <path d="M718 310 q 36 -34 72 -4" stroke="#31517c" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M736 312 q 26 -20 50 -4 l -6 16 h -40 z" fill="#080e18" />
          {/* nose + front wing */}
          <path d="M498 398 l -62 10 v 9 h 72 z" fill="#152841" stroke="#31517c" strokeWidth="2" />
          <rect x="424" y="410" width="102" height="7" rx="3.5" fill="#00e5ff" opacity="0.6" />
          <rect x="434" y="402" width="80" height="5" rx="2.5" fill="#1d3a5f" />
          {/* rear wing */}
          <rect x="968" y="298" width="13" height="64" fill="#22406a" />
          <rect x="934" y="288" width="90" height="10" rx="5" fill="#00e5ff" opacity="0.6" />
          <rect x="940" y="308" width="76" height="8" rx="4" fill="#2a4a75" />
          <rect x="944" y="326" width="66" height="7" rx="3.5" fill="#1d3a5f" />
          {/* livery number */}
          <circle cx="706" cy="372" r="21" fill="#e6eef6" opacity="0.95" />
          <circle cx="706" cy="372" r="21" fill="none" stroke="#0a0e14" strokeWidth="2" />
          <text x="706" y="380" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="21" fontWeight="bold" fill="#0a0e14">26</text>
          {/* battery bay */}
          <rect x="802" y="352" width="98" height="52" rx="6" fill="#080e18" stroke="#31517c" strokeWidth="2" />
          <rect x="802" y="352" width="98" height="52" rx="6" fill="#ffb454" opacity="0.07" className="gs-baylight" />
          <path d="M806 356 l 90 0" stroke="#ffb454" strokeWidth="1" opacity="0.25" />
          {/* rear wheel: tread + 5-spoke rim */}
          <circle cx="940" cy="404" r="43" fill="#0a0e14" />
          <circle cx="940" cy="404" r="43" fill="none" stroke="#1c2c46" strokeWidth="9" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1={940 + 36 * Math.cos((a * Math.PI) / 180)} y1={404 + 36 * Math.sin((a * Math.PI) / 180)} x2={940 + 43 * Math.cos((a * Math.PI) / 180)} y2={404 + 43 * Math.sin((a * Math.PI) / 180)} stroke="#0a0e14" strokeWidth="4" />
          ))}
          <circle cx="940" cy="404" r="17" fill="#152238" stroke="#93a9be" strokeWidth="2" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line key={a} x1="940" y1="404" x2={940 + 15 * Math.cos(((a - 90) * Math.PI) / 180)} y2={404 + 15 * Math.sin(((a - 90) * Math.PI) / 180)} stroke="#93a9be" strokeWidth="2.5" />
          ))}
          {/* front hub, wheel off */}
          <circle cx="602" cy="404" r="15" fill="#1d2f47" stroke="#e8b45a" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={602 + 9.5 * Math.cos((a * Math.PI) / 180)} cy={404 + 9.5 * Math.sin((a * Math.PI) / 180)} r="1.8" fill="#93a9be" />
          ))}
        </g>

        {/* wheel leaning + tire stack */}
        <g transform="rotate(-9 420 402)">
          <Shadow cx={424} cy={444} rx={42} o={0.35} />
          <circle cx="420" cy="402" r="41" fill="#0a0e14" />
          <circle cx="420" cy="402" r="41" fill="none" stroke="#1c2c46" strokeWidth="9" />
          <circle cx="420" cy="402" r="15" fill="#152238" stroke="#93a9be" strokeWidth="2" />
        </g>
        <g>
          <Shadow cx={1105} cy={442} rx={52} o={0.4} />
          <ellipse cx="1105" cy="424" rx="44" ry="15" fill="#0a0e14" stroke="#1c2c46" strokeWidth="5" />
          <ellipse cx="1105" cy="400" rx="44" ry="15" fill="#0d1420" stroke="#1c2c46" strokeWidth="5" />
          <ellipse cx="1105" cy="400" rx="18" ry="6" fill="#152238" />
        </g>

        {/* ===== Ahmad kneeling with the accumulator ===== */}
        <g className="ws-bob" style={{ transformOrigin: "742px 400px" }}>
          {/* shin + knee on pad */}
          <Shadow cx={742} cy={441} rx={58} o={0.35} />
          <rect x="700" y="428" width="56" height="9" rx="4" fill="#2a405d" />
          <path d="M712 430 q 2 -22 22 -26 l 8 14 q -14 6 -16 12 z" fill="#131f30" />
          <path d="M736 404 q 12 -8 20 2 l -6 26 h -14 z" fill="#131f30" />
          {/* torso leaning toward bay */}
          <g className="ws-breathe" style={{ transformOrigin: "748px 420px" }}>
            <path d="M706 424 q -8 -62 36 -76 q 26 -6 36 12 l 4 18 l -18 46 z" fill="#1c2c46" transform="rotate(8 740 390)" />
            <path d="M718 352 q -10 8 -14 24" stroke="#12203a" strokeWidth="4" fill="none" />
          </g>
          {/* head with safety glasses */}
          <AhmadHead x={762} y={336} scale={0.92} accessory="safety" />
          {/* arms with elbows, pushing */}
          <g className="gs-push">
            <path d="M752 380 q 16 -12 34 -12 q 12 0 20 4" stroke="#1c2c46" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M742 402 q 20 -4 42 -6 q 12 -2 20 0" stroke="#1c2c46" strokeWidth="14" fill="none" strokeLinecap="round" />
            <circle cx="808" cy="373" r="7" fill="#d8ab80" />
            <circle cx="806" cy="395" r="7" fill="#d8ab80" />
            {/* accumulator with handle + cells */}
            <g>
              <Shadow cx={846} cy={410} rx={44} o={0.3} />
              <rect x="810" y="358" width="76" height="44" rx="5.5" fill="#1a2c46" stroke="#e8b45a" strokeWidth="2.2" />
              <path d="M834 358 q 0 -10 14 -10 q 14 0 14 10" stroke="#e8b45a" strokeWidth="3" fill="none" />
              {[818, 832, 846, 860, 872].map((x) => (
                <g key={x}>
                  <rect x={x} y="364" width="10" height="32" rx="4.5" fill="#e8b45a" opacity="0.5" />
                  <rect x={x + 2.5} y="362" width="5" height="3" rx="1.5" fill="#ffd9a0" />
                </g>
              ))}
              <rect x="810" y="358" width="76" height="44" rx="5.5" fill="#ffb454" opacity="0.07" className="gs-baylight" />
              <text x="848" y="352" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="9" fill="#ffd9a0">⚡ HV 400V</text>
            </g>
          </g>
        </g>

        {/* toolbox, redrawn */}
        <g>
          <Shadow cx={230} cy={444} rx={66} o={0.38} />
          <rect x="172" y="386" width="116" height="54" rx="6" fill="#8f3434" stroke="#5e1f1f" strokeWidth="2.5" />
          <rect x="172" y="386" width="116" height="10" rx="5" fill="#a54040" />
          <rect x="182" y="402" width="96" height="13" rx="3" fill="#7a2a2a" />
          <rect x="220" y="405" width="20" height="6" rx="3" fill="#d9a0a0" opacity="0.7" />
          <rect x="182" y="420" width="96" height="13" rx="3" fill="#7a2a2a" />
          <rect x="220" y="423" width="20" height="6" rx="3" fill="#d9a0a0" opacity="0.7" />
          <path d="M214 386 q 0 -12 16 -12 q 16 0 16 12" stroke="#5e1f1f" strokeWidth="5" fill="none" />
        </g>
        {/* torque wrench + safety cone */}
        <line x1="318" y1="434" x2="360" y2="424" stroke="#93a9be" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="352" y="418" width="16" height="9" rx="4" fill="#e8b45a" transform="rotate(-13 360 422)" />
        <g>
          <Shadow cx={1044} cy={442} rx={26} o={0.35} />
          <path d="M1024 438 l 17 -26 h 8 l 17 26 z" fill="#e8813a" />
          <path d="M1030 428 h 30" stroke="#f3e6d8" strokeWidth="5" />
          <rect x="1018" y="436" width="54" height="6" rx="3" fill="#b35a1f" />
        </g>

        {/* motes + vignette */}
        {[[300, 250], [630, 190], [860, 250], [1040, 190]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#9db3c8" className="ws-mote" style={{ animationDelay: `${i * 2.3}s` }} />
        ))}
        <rect x="0" y="0" width="1200" height="560" fill="url(#sb-vignette)" />
      </svg>
    </div>
  );
}
