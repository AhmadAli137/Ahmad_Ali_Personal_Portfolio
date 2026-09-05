"use client";

import { useEffect, useState } from "react";
import { AhmadHead, SceneDefs, Shadow } from "@/components/scene-bits";

/**
 * The workshop at hack-hour: Ahmad typing between monitors, helping-hands
 * holding a PCB by the smoking iron, a vise-gripped robot mid-assembly,
 * the 3D printer laying layers, and a small city of coffee.
 */

const HACK_SECONDS = 36 * 3600;
const fmt = (s: number) =>
  `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function WorkshopScene() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setRemaining(HACK_SECONDS - (Math.floor(Date.now() / 1000) % HACK_SECONDS));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.07)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad typing at his hackathon desk: soldering station smoking, half-built robot in a vise, 3D printer running, wall clock counting down">
        <SceneDefs />

        {/* ---- room ---- */}
        <rect x="0" y="0" width="1200" height="452" fill="#0c1522" />
        <rect x="0" y="0" width="1200" height="452" fill="url(#sb-cone-cyan)" opacity="0.25" />
        <rect x="0" y="440" width="1200" height="120" fill="#080d15" />
        <rect x="0" y="436" width="1200" height="6" fill="#111d2e" />

        {/* string lights with glow pools */}
        <path d="M0 26 Q 300 48 600 26 T 1200 26" stroke="#152538" strokeWidth="2.5" fill="none" />
        {[70, 190, 310, 430, 550, 670, 790, 910, 1030, 1150].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={28 + Math.sin(x / 90) * 8} x2={x} y2={38 + Math.sin(x / 90) * 8} stroke="#152538" strokeWidth="2" />
            <circle cx={x} cy={42 + Math.sin(x / 90) * 8} r="4.5" fill={i % 2 ? "#34f5a2" : "#00e5ff"} className={i % 2 ? "ws-light-a" : "ws-light-b"} />
          </g>
        ))}

        {/* ---- window, night ---- */}
        <rect x="56" y="58" width="196" height="152" rx="4" fill="#04070d" />
        {[[88, 92], [126, 118], [196, 84], [226, 124], [104, 178], [208, 168], [174, 196]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="#dfe9f3" className="ws-star" style={{ animationDelay: `${i * 0.55}s` }} />
        ))}
        <circle cx="218" cy="94" r="12" fill="#e8eef6" opacity="0.9" filter="url(#sb-soft)" />
        <circle cx="212" cy="90" r="10" fill="#04070d" />
        <path d="M56 210 v-22 h16 v9 h12 v-17 h18 v13 h10 v-7 h20 v24 z M170 210 v-15 h13 v-9 h15 v13 h12 v-20 h17 v17 h12 v14 z" fill="#0b1320" />
        <rect x="52" y="54" width="204" height="160" rx="6" fill="none" stroke="#1c2f47" strokeWidth="7" />
        <line x1="154" y1="56" x2="154" y2="212" stroke="#1c2f47" strokeWidth="5" />
        <line x1="54" y1="134" x2="254" y2="134" stroke="#1c2f47" strokeWidth="5" />

        {/* ---- wall clock projection ---- */}
        <rect x="446" y="52" width="392" height="140" rx="10" fill="#060b12" stroke="#12455a" strokeWidth="2" className="ws-screen-glow" />
        <rect x="446" y="52" width="392" height="46" rx="10" fill="#00e5ff" opacity="0.04" />
        <text x="642" y="88" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="14" fill="#34f5a2" letterSpacing="5">NEXT DEADLINE IN</text>
        <text suppressHydrationWarning x="642" y="146" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="48" fontWeight="bold" fill="#00e5ff" letterSpacing="6" className="ws-clock">
          {remaining === null ? "--:--:--" : fmt(remaining)}
        </text>
        <text x="642" y="176" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="11" fill="#8aa0b6" letterSpacing="3">
          WIFI: HACKNET · PIZZA 02:00 · COMMIT EARLY
        </text>

        {/* ---- shelf: trophy + tiny robot ---- */}
        <rect x="950" y="118" width="196" height="9" rx="3" fill="#152538" />
        <rect x="962" y="127" width="6" height="10" fill="#0f1b2b" />
        <rect x="1130" y="127" width="6" height="10" fill="#0f1b2b" />
        <Shadow cx={998} cy={116} rx={20} o={0.25} />
        <path d="M986 116 v-8 q -12 -2 -12 -16 q 0 -4 4 -4 h 40 q 4 0 4 4 q 0 14 -12 16 v 8 z" fill="#e8b45a" />
        <rect x="982" y="116" width="32" height="6" rx="2" fill="#a3742c" />
        <Shadow cx={1075} cy={116} rx={18} o={0.25} />
        <rect x="1056" y="90" width="38" height="27" rx="5" fill="#12233a" stroke="#27405f" strokeWidth="2" />
        <circle cx="1068" cy="102" r="4" fill="#34f5a2" className="ws-eye" />
        <circle cx="1082" cy="102" r="4" fill="#0a1220" stroke="#27405f" strokeWidth="1.4" />

        {/* ---- 3D printer on side table ---- */}
        <g>
          <Shadow cx={1035} cy={476} rx={104} o={0.4} />
          <rect x="922" y="408" width="226" height="13" rx="4" fill="url(#sb-desk)" />
          <rect x="922" y="421" width="226" height="6" fill="#0f1b2d" />
          <rect x="938" y="427" width="11" height="56" fill="#101a29" />
          <rect x="1120" y="427" width="11" height="56" fill="#101a29" />
          {/* frame + z-rods */}
          <rect x="948" y="214" width="13" height="194" rx="3" fill="url(#sb-metal)" />
          <rect x="1106" y="214" width="13" height="194" rx="3" fill="url(#sb-metal)" />
          <rect x="941" y="202" width="186" height="14" rx="4" fill="url(#sb-metal)" />
          <line x1="967" y1="216" x2="967" y2="400" stroke="#22354e" strokeWidth="3" />
          <line x1="1100" y1="216" x2="1100" y2="400" stroke="#22354e" strokeWidth="3" />
          {/* gantry + head */}
          <rect x="960" y="256" width="148" height="9" rx="4" fill="#2a405d" />
          <g className="ws-print-head">
            <rect x="1018" y="246" width="32" height="28" rx="5" fill="#33507a" />
            <rect x="1029" y="274" width="9" height="13" fill="#34f5a2" />
            <circle cx="1034" cy="291" r="2.4" fill="#34f5a2" className="ws-led" />
          </g>
          {/* bed + growing part with layer lines */}
          <rect x="998" y="398" width="74" height="9" rx="3" fill="#2a405d" />
          <g className="ws-print-part">
            <rect x="1012" y="352" width="46" height="46" rx="3" fill="#34f5a2" opacity="0.28" />
            {[360, 370, 380, 390].map((y) => (
              <line key={y} x1="1012" y1={y} x2="1058" y2={y} stroke="#34f5a2" strokeWidth="1" opacity="0.5" />
            ))}
            <rect x="1012" y="352" width="46" height="46" rx="3" fill="none" stroke="#34f5a2" strokeWidth="1.6" opacity="0.8" />
          </g>
          <ellipse cx="1035" cy="400" rx="42" ry="6" fill="#34f5a2" opacity="0.12" className="ws-glow" filter="url(#sb-soft)" />
          {/* spool + filament */}
          <g className="ws-spool" style={{ transformOrigin: "934px 240px" }}>
            <circle cx="934" cy="240" r="23" fill="none" stroke="#2a405d" strokeWidth="10" />
            <circle cx="934" cy="240" r="5" fill="#2a405d" />
            <line x1="934" y1="219" x2="934" y2="230" stroke="#00e5ff" strokeWidth="3" />
          </g>
          <path d="M934 263 Q 946 306 1030 270" stroke="#00e5ff" strokeWidth="1.6" fill="none" opacity="0.5" />
        </g>

        {/* ================= main desk ================= */}
        <Shadow cx={480} cy={492} rx={330} ry={14} o={0.42} />
        <rect x="66" y="382" width="828" height="15" rx="4" fill="url(#sb-desk)" />
        <rect x="66" y="397" width="828" height="8" fill="#0f1b2d" />
        <rect x="96" y="405" width="14" height="112" fill="#101a29" />
        <rect x="96" y="405" width="4" height="112" fill="#1b2b40" />
        <rect x="842" y="405" width="14" height="112" fill="#101a29" />
        {/* cable to floor, swaying */}
        <g className="ws-cable" style={{ transformOrigin: "648px 397px" }}>
          <path d="M648 397 q 10 46 -4 78" stroke="#1f3550" strokeWidth="3" fill="none" />
        </g>

        {/* ---- soldering station (left) ---- */}
        <g>
          {/* helping hands holding PCB */}
          <Shadow cx={196} cy={392} rx={44} o={0.3} />
          <rect x="176" y="372" width="42" height="9" rx="3" fill="url(#sb-metal)" />
          <line x1="188" y1="372" x2="176" y2="346" stroke="#8aa0b6" strokeWidth="3" />
          <line x1="208" y1="372" x2="222" y2="348" stroke="#8aa0b6" strokeWidth="3" />
          <path d="M172 344 l 8 -5 6 8 -8 5 z" fill="#8aa0b6" />
          <path d="M226 346 l -8 -6 -6 8 8 6 z" fill="#8aa0b6" />
          {/* pcb */}
          <rect x="168" y="332" width="66" height="16" rx="2.5" fill="#0f8f5a" transform="rotate(-4 200 340)" />
          {[178, 194, 210].map((x) => (
            <rect key={x} x={x} y="336" width="7" height="4.5" fill="#ffd9a0" transform="rotate(-4 200 340)" />
          ))}
          <rect x="186" y="326" width="10" height="8" fill="#0a0e14" transform="rotate(-4 200 340)" />
          {/* iron stand + coiled iron */}
          <Shadow cx={302} cy={392} rx={34} o={0.3} />
          <rect x="280" y="374" width="46" height="8" rx="3" fill="url(#sb-metal)" />
          <path d="M288 374 q -2 -22 14 -24 q 16 2 14 24" stroke="#2a405d" strokeWidth="4" fill="none" />
          <g transform="rotate(-38 302 352)">
            <rect x="292" y="348" width="44" height="8" rx="4" fill="#1b2b40" />
            <rect x="333" y="350" width="22" height="4.5" rx="2" fill="#8aa0b6" />
            <rect x="353" y="351" width="8" height="2.6" rx="1.3" fill="#ffb454" className="ws-tip" />
          </g>
          {/* layered smoke */}
          <path d="M258 316 q -8 -12 2 -22 q 10 -10 2 -20" stroke="#9db3c8" strokeWidth="2.2" fill="none" className="ws-smoke" />
          <path d="M264 320 q 8 -14 -2 -24 q -8 -10 0 -18" stroke="#9db3c8" strokeWidth="1.7" fill="none" className="ws-smoke" style={{ animationDelay: "1.2s" }} />
          <path d="M252 318 q -5 -16 4 -26" stroke="#9db3c8" strokeWidth="1.3" fill="none" className="ws-smoke" style={{ animationDelay: "2.3s" }} />
          <circle cx="262" cy="330" r="2.2" fill="#ffcf8a" className="ws-spark" />
          <circle cx="268" cy="326" r="1.5" fill="#ffe9c9" className="ws-spark" style={{ animationDelay: "1.6s" }} />
          {/* solder spool */}
          <circle cx="132" cy="372" r="11" fill="none" stroke="#93a9be" strokeWidth="5" />
          <line x1="132" y1="361" x2="150" y2="352" stroke="#93a9be" strokeWidth="1.6" />
        </g>

        {/* ---- coffee city ---- */}
        <g>
          <Shadow cx={392} cy={392} rx={52} o={0.3} />
          <path d="M356 382 l 5 -27 h 22 l 5 27 z" fill="#1d2f47" />
          <path d="M360 360 h 24" stroke="#2e4664" strokeWidth="5" />
          <path d="M390 382 l 5 -27 h 22 l 5 27 z" fill="#17273c" transform="rotate(7 406 368)" />
          <path d="M338 380 l 15 -21 h 15 l -22 23 z" fill="#131f30" />
          <rect x="428" y="352" width="15" height="30" rx="4" fill="#0f8f5a" />
          <rect x="428" y="358" width="15" height="5" fill="#34f5a2" opacity="0.6" />
        </g>

        {/* ================= AHMAD ================= */}
        <g className="ws-bob" style={{ transformOrigin: "560px 320px" }}>
          {/* chair */}
          <rect x="500" y="234" width="120" height="158" rx="20" fill="#0d1727" />
          <rect x="506" y="240" width="108" height="146" rx="16" fill="#111d30" />
          {/* torso with breathing */}
          <g className="ws-breathe" style={{ transformOrigin: "560px 392px" }}>
            <path d="M498 392 q -6 -70 22 -92 q 18 -14 40 -14 q 22 0 40 14 q 28 22 22 92 z" fill="#1c2c46" />
            <path d="M520 300 q -14 12 -18 34" stroke="#12203a" strokeWidth="5" fill="none" />
            <path d="M600 300 q 14 12 18 34" stroke="#12203a" strokeWidth="5" fill="none" />
            {/* hoodie cords + pocket */}
            <path d="M544 300 q 16 10 32 0" stroke="#34f5a2" strokeWidth="2.2" fill="none" opacity="0.65" />
            <line x1="552" y1="304" x2="551" y2="326" stroke="#34f5a2" strokeWidth="2" opacity="0.5" />
            <line x1="568" y1="304" x2="569" y2="326" stroke="#34f5a2" strokeWidth="2" opacity="0.5" />
            <path d="M530 360 q 30 14 60 0 l -4 20 q -26 10 -52 0 z" fill="#16233a" />
          </g>
          {/* head (kit) */}
          <AhmadHead x={560} y={248} accessory="headphones" />
          {/* upper arms sloping to desk; forearms tap behind laptop lid */}
          <g className="ws-forearm-a" style={{ transformOrigin: "512px 330px" }}>
            <path d="M512 316 q -18 26 -6 52 q 6 10 18 12" stroke="#1c2c46" strokeWidth="17" fill="none" strokeLinecap="round" />
          </g>
          <g className="ws-forearm-b" style={{ transformOrigin: "608px 330px" }}>
            <path d="M608 316 q 18 26 6 52 q -6 10 -18 12" stroke="#1c2c46" strokeWidth="17" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* laptop: open lid toward Ahmad, back to viewer */}
        <g>
          <Shadow cx={560} cy={396} rx={82} o={0.35} />
          <path d="M492 382 l 9 -56 h 118 l 9 56 z" fill="#101b2c" />
          <path d="M497 382 l 8 -52 h 110 l 8 52 z" fill="#0b1422" />
          <rect x="538" y="344" width="44" height="19" rx="4" fill="none" stroke="#00e5ff" strokeWidth="1.6" className="ws-sticker" />
          <text x="560" y="358" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fontWeight="bold" fill="#00e5ff">AA</text>
          <ellipse cx="560" cy="330" rx="70" ry="8" fill="#00e5ff" opacity="0.12" className="ws-glow" filter="url(#sb-soft)" />
          <rect x="484" y="382" width="152" height="6" rx="3" fill="#22354e" />
        </g>

        {/* external monitor with living code */}
        <g>
          <Shadow cx={726} cy={394} rx={62} o={0.3} />
          <rect x="648" y="248" width="158" height="110" rx="8" fill="#0a0f18" stroke="#22354e" strokeWidth="3" />
          <rect x="654" y="254" width="146" height="98" rx="5" fill="#070d16" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={664 + (i % 3) * 9}
              y={262 + i * 12.5}
              width={[68, 96, 52, 106, 60, 86, 42][i]}
              height="5"
              rx="2.5"
              fill={i % 3 === 1 ? "#34f5a2" : i % 3 === 2 ? "#ffb454" : "#00e5ff"}
              opacity="0.75"
              className="ws-code"
              style={{ animationDelay: `${i * 0.55}s`, transformOrigin: `${664 + (i % 3) * 9}px 0px` }}
            />
          ))}
          <rect x="664" y="346" width="8" height="5" fill="#00e5ff" className="ws-led" />
          <rect x="716" y="358" width="22" height="14" fill="#16243a" />
          <rect x="700" y="372" width="56" height="7" rx="3" fill="#1b2b40" />
        </g>

        {/* hot coffee with handle + layered steam */}
        <g>
          <Shadow cx={630} cy={390} rx={24} o={0.3} />
          <rect x="614" y="352" width="30" height="29" rx="4.5" fill="#e8b45a" />
          <rect x="614" y="352" width="30" height="7" rx="3.5" fill="#f3cd87" />
          <path d="M644 358 q 13 5 0 16" stroke="#e8b45a" strokeWidth="4.5" fill="none" />
          <path d="M622 344 q -6 -10 2 -18" stroke="#e6eef6" strokeWidth="2" fill="none" className="ws-smoke" style={{ animationDelay: "0.5s" }} />
          <path d="M634 344 q 6 -12 -2 -20" stroke="#e6eef6" strokeWidth="1.5" fill="none" className="ws-smoke" style={{ animationDelay: "1.8s" }} />
        </g>

        {/* ---- robot in bench vise ---- */}
        <g>
          {/* vise */}
          <Shadow cx={764} cy={392} rx={54} o={0.32} />
          <rect x="738" y="368" width="54" height="14" rx="3" fill="url(#sb-metal)" />
          <rect x="748" y="352" width="10" height="18" fill="#2a405d" />
          <rect x="774" y="352" width="10" height="18" fill="#2a405d" />
          <circle cx="800" cy="376" r="6" fill="none" stroke="#8aa0b6" strokeWidth="2.5" />
          <line x1="806" y1="376" x2="820" y2="370" stroke="#8aa0b6" strokeWidth="2.5" />
          {/* torso gripped */}
          <rect x="742" y="292" width="48" height="64" rx="9" fill="#1a2c46" stroke="#2f4a6e" strokeWidth="2" />
          <rect x="750" y="308" width="22" height="30" rx="3" fill="#0a0f18" />
          <path d="M753 314 q 8 6 16 1 M753 322 q 9 -4 16 3 M753 330 q 7 5 16 -1" stroke="#ffb454" strokeWidth="1.8" fill="none" opacity="0.85" />
          {/* head tilted, one eye alive */}
          <g transform="rotate(-7 766 276)">
            <rect x="744" y="258" width="44" height="32" rx="8" fill="#203752" stroke="#2f4a6e" strokeWidth="2" />
            <rect x="750" y="266" width="32" height="14" rx="4" fill="#0a0f18" />
            <circle cx="760" cy="273" r="4" fill="#34f5a2" className="ws-eye" />
            <circle cx="773" cy="273" r="4" fill="#0e1524" stroke="#2f4a6e" strokeWidth="1.3" />
            <line x1="766" y1="258" x2="766" y2="248" stroke="#2f4a6e" strokeWidth="2.4" />
            <circle cx="766" cy="245" r="3" fill="#ffb454" className="ws-led" />
          </g>
          {/* detached arm + screwdriver */}
          <path d="M806 374 q 22 -6 38 1" stroke="#2f4a6e" strokeWidth="8" fill="none" strokeLinecap="round" />
          <line x1="848" y1="378" x2="872" y2="371" stroke="#93a9be" strokeWidth="2.6" />
          <rect x="868" y="365" width="13" height="8" rx="3" fill="#e8b45a" transform="rotate(-15 874 369)" />
          {/* dangling wire */}
          <g className="ws-wire" style={{ transformOrigin: "742px 340px" }}>
            <path d="M742 340 q -13 20 -6 40" stroke="#00e5ff" strokeWidth="2" fill="none" opacity="0.8" />
            <circle cx="736" cy="382" r="2.6" fill="#00e5ff" opacity="0.8" />
          </g>
        </g>

        {/* motes + vignette */}
        {[[220, 250], [520, 160], [760, 214], [980, 168]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#9db3c8" className="ws-mote" style={{ animationDelay: `${i * 2.1}s` }} />
        ))}
        <rect x="0" y="0" width="1200" height="560" fill="url(#sb-vignette)" />
      </svg>
    </div>
  );
}
