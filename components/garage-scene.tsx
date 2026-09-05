"use client";

/**
 * Engineering competitions, illustrated: the FSAE garage. Ahmad slides the
 * accumulator (battery pack) into the formula car while the WEC wind-turbine
 * model spins on the bench, generator LED lit. CSS animations: gs-* / ws-*.
 */
export function GarageScene() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.07)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad in the Formula SAE garage sliding a battery pack into the car, with a spinning wind turbine model on the workbench">
        {/* walls + floor */}
        <rect x="0" y="0" width="1200" height="450" fill="#0b1420" />
        {[80, 160, 240, 320, 400].map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#0e1a2a" strokeWidth="3" />
        ))}
        <rect x="0" y="440" width="1200" height="120" fill="#0a1018" />
        <line x1="0" y1="440" x2="1200" y2="440" stroke="#122033" strokeWidth="2" />
        {/* checkered banner */}
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <g key={i}>
              <rect x={440 + i * 26} y="36" width="13" height="13" fill={i % 2 ? "#dfe9f3" : "#0a0e14"} opacity="0.8" />
              <rect x={453 + i * 26} y="49" width="13" height="13" fill={i % 2 ? "#0a0e14" : "#dfe9f3"} opacity="0.8" />
            </g>
          ))}
          <rect x="438" y="34" width="316" height="30" fill="none" stroke="#1a2c42" strokeWidth="3" />
        </g>
        {/* poster */}
        <rect x="70" y="60" width="120" height="86" rx="4" fill="#0d1826" stroke="#1f3550" strokeWidth="2" />
        <text x="130" y="96" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="18" fontWeight="bold" fill="#00e5ff">FSAE</text>
        <text x="130" y="118" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="10" fill="#8aa0b6">MICHIGAN · 2024</text>
        <path d="M92 128 h76" stroke="#ffb454" strokeWidth="2" />

        {/* hanging work lamp + light cone */}
        <line x1="600" y1="0" x2="600" y2="86" stroke="#1a2c42" strokeWidth="3" />
        <path d="M578 86 h44 l-8 -18 h-28 z" fill="#1b2b40" />
        <circle cx="600" cy="88" r="7" fill="#ffd9a0" className="gs-lamp" />
        <path d="M600 92 L440 440 L760 440 Z" fill="#ffd9a0" opacity="0.05" className="gs-lamp" />

        {/* workbench with wind turbine model (left) */}
        <rect x="60" y="330" width="270" height="14" rx="4" fill="#131f30" />
        <rect x="76" y="344" width="12" height="100" fill="#101a29" />
        <rect x="300" y="344" width="12" height="100" fill="#101a29" />
        {/* turbine */}
        <rect x="140" y="238" width="8" height="94" rx="3" fill="#22354e" />
        <circle cx="144" cy="236" r="7" fill="#2a405d" />
        <g className="gs-turbine" style={{ transformOrigin: "144px 236px" }}>
          {[0, 120, 240].map((a) => (
            <path key={a} d="M144 236 q 8 -34 -2 -58 q -10 24 -4 58 z" fill="#8ab8ff" opacity="0.85" transform={`rotate(${a} 144 236)`} />
          ))}
          <circle cx="144" cy="236" r="4" fill="#dfe9f3" />
        </g>
        {/* generator wire to multimeter, LED lit */}
        <path d="M148 330 q 30 12 62 -6" stroke="#ffb454" strokeWidth="2" fill="none" opacity="0.7" />
        <rect x="208" y="308" width="44" height="26" rx="4" fill="#1b2b40" stroke="#2a405d" strokeWidth="1.5" />
        <rect x="214" y="313" width="24" height="10" rx="2" fill="#0a0e14" />
        <text x="226" y="322" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="8" fill="#34f5a2" className="ws-led">12.4V</text>
        <circle cx="245" cy="318" r="3" fill="#34f5a2" className="ws-led" />
        {/* WEC plaque */}
        <rect x="268" y="300" width="46" height="32" rx="3" fill="#ffb454" opacity="0.25" stroke="#ffb454" strokeWidth="1.5" />
        <text x="291" y="320" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="10" fill="#ffd9a0">WEC</text>

        {/* ===== the formula car (center-right), on stands ===== */}
        <g>
          {/* stands */}
          <path d="M560 430 l18 -26 h10 l18 26 z" fill="#1b2b40" />
          <path d="M960 430 l18 -26 h10 l18 26 z" fill="#1b2b40" />
          {/* floor shadow */}
          <ellipse cx="790" cy="436" rx="270" ry="12" fill="#000" opacity="0.35" />
          {/* body */}
          <path d="M540 392 q 30 -44 120 -46 l 60 -36 q 16 -10 40 -10 h 80 q 20 0 30 14 l 26 34 q 70 6 96 30 q 12 12 -2 16 l -430 0 q -22 -1 -20 -2 z" fill="#152841" stroke="#2a405d" strokeWidth="2.5" />
          {/* halo */}
          <path d="M726 312 q 34 -30 66 -2" stroke="#2a405d" strokeWidth="6" fill="none" />
          {/* cockpit opening */}
          <path d="M742 314 q 26 -18 48 -2 l -6 14 h -38 z" fill="#0a0e14" />
          {/* nose + wing */}
          <path d="M540 392 l -60 10 v 8 h 70 z" fill="#152841" stroke="#2a405d" strokeWidth="2" />
          <rect x="466" y="404" width="96" height="7" rx="3" fill="#00e5ff" opacity="0.55" />
          {/* rear wing */}
          <rect x="962" y="300" width="14" height="60" fill="#22354e" />
          <rect x="930" y="292" width="86" height="10" rx="4" fill="#00e5ff" opacity="0.55" />
          <rect x="936" y="310" width="74" height="8" rx="4" fill="#2a405d" />
          {/* number roundel */}
          <circle cx="700" cy="368" r="20" fill="#dfe9f3" opacity="0.9" />
          <text x="700" y="375" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="20" fontWeight="bold" fill="#0a0e14">26</text>
          {/* side pod opening (battery bay) with glow */}
          <rect x="800" y="352" width="96" height="52" rx="6" fill="#0a0e14" stroke="#2a405d" strokeWidth="2" />
          <rect x="800" y="352" width="96" height="52" rx="6" fill="#ffb454" opacity="0.06" className="gs-baylight" />
          {/* rear wheel on */}
          <circle cx="936" cy="408" r="42" fill="#0a0e14" stroke="#22354e" strokeWidth="8" />
          <circle cx="936" cy="408" r="12" fill="#1b2b40" stroke="#8aa0b6" strokeWidth="2" />
          {/* front hub — wheel is OFF */}
          <circle cx="600" cy="408" r="14" fill="#1b2b40" stroke="#ffb454" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={600 + 9 * Math.cos((a * Math.PI) / 180)} cy={408 + 9 * Math.sin((a * Math.PI) / 180)} r="1.8" fill="#8aa0b6" />
          ))}
        </g>
        {/* wheel leaning on wall + tire stack */}
        <circle cx="420" cy="404" r="40" fill="#0a0e14" stroke="#22354e" strokeWidth="8" transform="rotate(-8 420 404)" />
        <circle cx="420" cy="404" r="11" fill="#1b2b40" stroke="#8aa0b6" strokeWidth="2" />
        <ellipse cx="1105" cy="420" rx="42" ry="14" fill="#0a0e14" stroke="#22354e" strokeWidth="5" />
        <ellipse cx="1105" cy="398" rx="42" ry="14" fill="#0d1420" stroke="#22354e" strokeWidth="5" />

        {/* ===== Ahmad kneeling, sliding the accumulator in ===== */}
        <g className="ws-bob" style={{ transformOrigin: "740px 400px" }}>
          {/* kneeling legs */}
          <path d="M712 438 q 4 -26 26 -28 l 6 16 q -16 6 -18 12 z" fill="#131f30" />
          {/* torso leaning right */}
          <path d="M706 428 q -10 -66 40 -78 q 30 8 34 30 l -10 44 z" fill="#1a2940" transform="rotate(6 740 390)" />
          {/* head */}
          <circle cx="758" cy="342" r="26" fill="#d1a37c" />
          <path d="M734 336 q 2 -22 24 -21 q 22 -1 24 21 q -5 -11 -24 -11 q -19 0 -24 11" fill="#171310" />
          <path d="M740 352 q 5 15 18 15 q 13 0 18 -15 q -3 11 -18 11 q -15 0 -18 -11" fill="#20180f" />
          {/* safety glasses */}
          <path d="M738 340 h40" stroke="#00e5ff" strokeWidth="2.5" opacity="0.85" />
          {/* arms pushing the pack */}
          <g className="gs-push">
            <path d="M756 386 q 26 -6 46 -10" stroke="#1a2940" strokeWidth="13" fill="none" strokeLinecap="round" />
            <path d="M744 402 q 30 0 54 -8" stroke="#1a2940" strokeWidth="13" fill="none" strokeLinecap="round" />
            <circle cx="806" cy="374" r="6.5" fill="#d1a37c" />
            <circle cx="802" cy="393" r="6.5" fill="#d1a37c" />
            {/* the accumulator */}
            <g>
              <rect x="806" y="360" width="74" height="42" rx="5" fill="#182a42" stroke="#ffb454" strokeWidth="2" />
              {[814, 828, 842, 856, 868].map((x) => (
                <rect key={x} x={x} y="366" width="9" height="30" rx="4" fill="#ffb454" opacity="0.55" />
              ))}
              <rect x="806" y="360" width="74" height="42" rx="5" fill="#ffb454" opacity="0.08" className="gs-baylight" />
              <text x="843" y="356" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="9" fill="#ffd9a0">HV ⚡ 400V</text>
            </g>
          </g>
        </g>

        {/* toolbox + tools */}
        <rect x="180" y="384" width="110" height="56" rx="6" fill="#8a2f2f" stroke="#5f1f1f" strokeWidth="2" />
        <rect x="188" y="394" width="94" height="12" rx="3" fill="#a53b3b" />
        <rect x="188" y="412" width="94" height="12" rx="3" fill="#a53b3b" />
        <rect x="222" y="378" width="26" height="8" rx="3" fill="#5f1f1f" />
        <path d="M320 432 l 34 -10 m -34 10 l 8 4" stroke="#8aa0b6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="358" cy="420" r="6" fill="none" stroke="#8aa0b6" strokeWidth="3" />

        {/* torque wrench + cones */}
        <path d="M1020 434 l 16 -22 h 8 l 16 22 z" fill="#ffb454" opacity="0.7" />
        <rect x="1022" y="424" width="36" height="4" fill="#dfe9f3" opacity="0.6" />

        {/* dust motes */}
        {[[300, 240], [620, 200], [860, 250], [1040, 180]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#8aa0b6" className="ws-mote" style={{ animationDelay: `${i * 2.3}s` }} />
        ))}
      </svg>
    </div>
  );
}
