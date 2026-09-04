"use client";

import { useEffect, useState } from "react";

/**
 * The hackathon, illustrated: Ahmad clacking at his laptop under a wall
 * projection of the hack clock — soldering iron smoking, a half-built robot
 * blinking, a 3D printer laying down layers in the back, and entirely too
 * much coffee. Every prop animates (CSS classes in globals: ws-*).
 */

const HACK_SECONDS = 36 * 3600;

const fmt = (s: number) =>
  `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function HackathonVenue() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const elapsed = Math.floor(Date.now() / 1000) % HACK_SECONDS;
      setRemaining(HACK_SECONDS - elapsed);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mb-12 overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.07)]">
      <svg viewBox="0 0 1200 560" className="ws-scene block w-full" role="img" aria-label="Ahmad at a hackathon: typing at his laptop beside a soldering station and half-built robot, with a 3D printer running behind him">
        {/* ======== back wall ======== */}
        <rect x="0" y="0" width="1200" height="450" fill="#0b1420" />
        <rect x="0" y="440" width="1200" height="120" fill="#080d15" />
        <line x1="0" y1="440" x2="1200" y2="440" stroke="#122033" strokeWidth="2" />

        {/* string lights */}
        <path d="M0 26 Q 300 46 600 26 T 1200 26" stroke="#16283d" strokeWidth="2" fill="none" />
        {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960, 1060, 1160].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={30 + Math.sin(x / 90) * 8}
            r="5"
            className={i % 2 ? "ws-light-a" : "ws-light-b"}
            fill={i % 2 ? "#34f5a2" : "#00e5ff"}
          />
        ))}

        {/* ======== window (night) ======== */}
        <rect x="58" y="52" width="190" height="150" rx="6" fill="#050910" stroke="#1a2c42" strokeWidth="5" />
        <line x1="153" y1="52" x2="153" y2="202" stroke="#1a2c42" strokeWidth="4" />
        <line x1="58" y1="128" x2="248" y2="128" stroke="#1a2c42" strokeWidth="4" />
        {[[85, 82], [122, 105], [190, 74], [222, 112], [102, 170], [206, 160], [172, 186]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#dfe9f3" className="ws-star" style={{ animationDelay: `${i * 0.55}s` }} />
        ))}
        <circle cx="215" cy="86" r="13" fill="#dfe9f3" opacity="0.85" />
        <circle cx="209" cy="82" r="11" fill="#050910" />
        {/* city silhouette */}
        <path d="M58 202 v-24 h14 v10 h12 v-18 h16 v14 h10 v-8 h18 v26 z M153 202 v-16 h12 v-10 h14 v14 h12 v-22 h16 v18 h12 v16 z" fill="#0d1725" />

        {/* ======== wall projection: the hack clock ======== */}
        <rect x="430" y="46" width="420" height="150" rx="10" fill="#060b12" stroke="#0f3a4a" strokeWidth="2" className="ws-screen-glow" />
        <rect x="430" y="46" width="420" height="150" rx="10" fill="url(#ws-proj)" opacity="0.5" />
        <defs>
          <linearGradient id="ws-proj" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ws-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b2b40" />
            <stop offset="100%" stopColor="#131f30" />
          </linearGradient>
        </defs>
        <text x="640" y="84" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="15" fill="#34f5a2" letterSpacing="4">
          SUBMISSIONS CLOSE IN
        </text>
        <text
          suppressHydrationWarning
          x="640"
          y="146"
          textAnchor="middle"
          fontFamily="Consolas, monospace"
          fontSize="52"
          fontWeight="bold"
          fill="#00e5ff"
          letterSpacing="6"
          className="ws-clock"
        >
          {remaining === null ? "--:--:--" : fmt(remaining)}
        </text>
        <text x="640" y="178" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fill="#8aa0b6" letterSpacing="3">
          WIFI: HACKNET · PASS: sh1p-1t · PIZZA AT 02:00
        </text>

        {/* ======== shelf with trophies ======== */}
        <rect x="950" y="120" width="190" height="8" rx="3" fill="#152438" />
        <path d="M985 120 v-26 q0 -12 12 -12 h6 q12 0 12 12 v26 z" fill="#ffb454" opacity="0.85" />
        <rect x="990" y="76" width="20" height="8" rx="2" fill="#b06f1e" />
        <rect x="1045" y="94" width="34" height="26" rx="4" fill="#101c2c" stroke="#1f3550" strokeWidth="2" />
        <circle cx="1062" cy="104" r="5" fill="#34f5a2" className="ws-eye" />
        <rect x="1100" y="88" width="26" height="32" rx="3" fill="#ffb454" opacity="0.6" />
        <text x="1113" y="108" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fill="#070b11" fontWeight="bold">1</text>

        {/* ======== 3D printer (background right) ======== */}
        <g>
          {/* side table */}
          <rect x="920" y="404" width="230" height="12" rx="3" fill="#131f30" />
          <rect x="936" y="416" width="10" height="60" fill="#101a29" />
          <rect x="1124" y="416" width="10" height="60" fill="#101a29" />
          {/* frame */}
          <rect x="950" y="212" width="12" height="192" rx="3" fill="#1b2b40" />
          <rect x="1108" y="212" width="12" height="192" rx="3" fill="#1b2b40" />
          <rect x="944" y="200" width="182" height="14" rx="4" fill="#1b2b40" />
          {/* gantry + head */}
          <rect x="962" y="252" width="146" height="8" rx="3" fill="#22354e" />
          <g className="ws-print-head">
            <rect x="1020" y="244" width="30" height="26" rx="4" fill="#2a405d" />
            <rect x="1031" y="270" width="8" height="12" fill="#34f5a2" opacity="0.9" />
            <circle cx="1035" cy="286" r="2.5" fill="#34f5a2" className="ws-led" />
          </g>
          {/* growing print */}
          <rect x="1002" y="396" width="66" height="8" rx="2" fill="#22354e" />
          <g className="ws-print-part">
            <rect x="1014" y="352" width="42" height="44" rx="3" fill="#34f5a2" opacity="0.35" />
            <rect x="1014" y="352" width="42" height="44" rx="3" fill="none" stroke="#34f5a2" strokeWidth="1.5" opacity="0.7" />
          </g>
          <ellipse cx="1035" cy="398" rx="40" ry="5" fill="#34f5a2" opacity="0.1" className="ws-glow" />
          {/* filament spool */}
          <g className="ws-spool">
            <circle cx="936" cy="238" r="22" fill="none" stroke="#22354e" strokeWidth="9" />
            <circle cx="936" cy="238" r="4" fill="#22354e" />
            <line x1="936" y1="218" x2="936" y2="228" stroke="#00e5ff" strokeWidth="3" />
          </g>
          <path d="M936 260 Q 950 300 1032 268" stroke="#00e5ff" strokeWidth="1.6" fill="none" opacity="0.5" />
        </g>

        {/* ======== main desk ======== */}
        <rect x="70" y="380" width="820" height="18" rx="5" fill="url(#ws-desk)" />
        <rect x="100" y="398" width="14" height="120" fill="#101a29" />
        <rect x="836" y="398" width="14" height="120" fill="#101a29" />

        {/* ======== soldering station (left) ======== */}
        <g>
          {/* PCB */}
          <rect x="150" y="360" width="94" height="20" rx="3" fill="#0f8f5a" transform="rotate(-3 197 370)" />
          {[165, 185, 205, 225].map((x, i) => (
            <rect key={i} x={x} y="364" width="8" height="5" fill="#ffd9a0" transform="rotate(-3 197 370)" />
          ))}
          <rect x="174" y="352" width="12" height="10" fill="#0a0e14" transform="rotate(-3 197 370)" />
          {/* iron stand + iron */}
          <path d="M300 380 l0 -18 a14 14 0 0 1 26 0 l0 18" fill="none" stroke="#22354e" strokeWidth="5" />
          <g transform="rotate(-36 312 344)">
            <rect x="300" y="340" width="52" height="9" rx="4" fill="#1b2b40" />
            <rect x="348" y="342" width="26" height="5" rx="2" fill="#8aa0b6" />
            <rect x="372" y="343" width="9" height="3" rx="1.5" fill="#ffb454" className="ws-tip" />
          </g>
          {/* smoke wisps from tip */}
          <path d="M262 306 q -8 -12 2 -22 q 10 -10 2 -22" stroke="#8aa0b6" strokeWidth="2" fill="none" className="ws-smoke" />
          <path d="M270 310 q 8 -14 -2 -24 q -8 -10 0 -20" stroke="#8aa0b6" strokeWidth="1.6" fill="none" className="ws-smoke" style={{ animationDelay: "1.3s" }} />
          {/* sparks */}
          <circle cx="266" cy="322" r="2.4" fill="#ffb454" className="ws-spark" />
          <circle cx="274" cy="318" r="1.7" fill="#ffd9a0" className="ws-spark" style={{ animationDelay: "1.7s" }} />
          {/* solder spool + tweezers */}
          <circle cx="128" cy="368" r="12" fill="none" stroke="#8aa0b6" strokeWidth="5" />
          <line x1="255" y1="376" x2="292" y2="368" stroke="#8aa0b6" strokeWidth="2.4" />
          <line x1="255" y1="379" x2="292" y2="374" stroke="#8aa0b6" strokeWidth="2.4" />
        </g>

        {/* ======== empty coffee army (left of laptop) ======== */}
        <g>
          <path d="M360 380 l4 -26 h22 l4 26 z" fill="#1b2b40" />
          <path d="M394 380 l4 -26 h22 l4 26 z" fill="#16233a" transform="rotate(6 407 367)" />
          <path d="M338 378 l14 -20 h16 l-22 22 z" fill="#131f30" />
          {/* energy can */}
          <rect x="430" y="350" width="16" height="30" rx="4" fill="#0f8f5a" />
          <rect x="430" y="356" width="16" height="6" fill="#34f5a2" opacity="0.6" />
        </g>

        {/* ======== Ahmad at the laptop ======== */}
        <g className="ws-bob" style={{ transformOrigin: "560px 300px" }}>
          {/* chair back */}
          <rect x="510" y="238" width="104" height="150" rx="18" fill="#0e1826" />
          {/* torso hoodie */}
          <path d="M512 388 q -4 -96 48 -104 q 52 8 48 104 z" fill="#1a2940" />
          <path d="M540 292 q 20 14 40 0" stroke="#34f5a2" strokeWidth="2" fill="none" opacity="0.6" />
          <line x1="552" y1="298" x2="552" y2="316" stroke="#34f5a2" strokeWidth="2" opacity="0.5" />
          <line x1="568" y1="298" x2="568" y2="316" stroke="#34f5a2" strokeWidth="2" opacity="0.5" />
          {/* head */}
          <circle cx="560" cy="248" r="34" fill="#d1a37c" />
          {/* hair + beard */}
          <path d="M528 240 q 2 -30 32 -28 q 30 -2 32 28 q -6 -14 -32 -14 q -26 0 -32 14" fill="#171310" />
          <path d="M534 262 q 6 22 26 22 q 20 0 26 -22 q -4 16 -26 16 q -22 0 -26 -16" fill="#20180f" />
          {/* glasses */}
          <rect x="536" y="242" width="20" height="13" rx="4" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.85" />
          <rect x="564" y="242" width="20" height="13" rx="4" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.85" />
          <line x1="556" y1="248" x2="564" y2="248" stroke="#00e5ff" strokeWidth="2" opacity="0.85" />
          {/* headphones */}
          <path d="M528 240 q 2 -34 32 -34 q 30 0 32 34" stroke="#101a29" strokeWidth="7" fill="none" />
          <rect x="521" y="236" width="11" height="22" rx="5" fill="#101a29" stroke="#00e5ff" strokeWidth="1.4" />
          <rect x="588" y="236" width="11" height="22" rx="5" fill="#101a29" stroke="#00e5ff" strokeWidth="1.4" />
          {/* arms typing */}
          <g className="ws-type-a" style={{ transformOrigin: "524px 320px" }}>
            <path d="M524 316 q -18 30 8 46" stroke="#1a2940" strokeWidth="15" fill="none" strokeLinecap="round" />
            <circle cx="534" cy="366" r="7.5" fill="#d1a37c" />
          </g>
          <g className="ws-type-b" style={{ transformOrigin: "596px 320px" }}>
            <path d="M596 316 q 18 30 -8 46" stroke="#1a2940" strokeWidth="15" fill="none" strokeLinecap="round" />
            <circle cx="586" cy="366" r="7.5" fill="#d1a37c" />
          </g>
        </g>

        {/* laptop (lid to viewer, AA sticker, screen glow spilling) */}
        <g>
          <path d="M496 380 l8 -52 h114 l8 52 z" fill="#101a29" />
          <path d="M500 380 l7 -48 h108 l7 48 z" fill="#0c1420" />
          <rect x="540" y="344" width="42" height="18" rx="4" fill="none" stroke="#00e5ff" strokeWidth="1.6" className="ws-sticker" />
          <text x="561" y="358" textAnchor="middle" fontFamily="Consolas, monospace" fontSize="12" fontWeight="bold" fill="#00e5ff">AA</text>
          <ellipse cx="561" cy="330" rx="66" ry="9" fill="#00e5ff" opacity="0.1" className="ws-glow" />
          <rect x="488" y="380" width="146" height="7" rx="3" fill="#22354e" />
        </g>

        {/* external monitor with living code */}
        <g>
          <rect x="652" y="252" width="150" height="104" rx="7" fill="#0a0e14" stroke="#1f3550" strokeWidth="3" />
          <rect x="712" y="356" width="26" height="16" fill="#1b2b40" />
          <rect x="694" y="372" width="62" height="7" rx="3" fill="#1b2b40" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={664 + (i % 3) * 8}
              y={264 + i * 12}
              width={[70, 96, 54, 108, 62, 88, 44][i]}
              height="5"
              rx="2.5"
              fill={i % 3 === 1 ? "#34f5a2" : i % 3 === 2 ? "#ffb454" : "#00e5ff"}
              opacity="0.75"
              className="ws-code"
              style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${664 + (i % 3) * 8}px 0px` }}
            />
          ))}
          <rect x="664" y="348" width="8" height="6" fill="#00e5ff" className="ws-led" />
        </g>

        {/* hot coffee, steaming */}
        <g>
          <rect x="618" y="352" width="30" height="28" rx="4" fill="#ffb454" opacity="0.9" />
          <path d="M648 358 q 12 4 0 14" stroke="#ffb454" strokeWidth="4" fill="none" opacity="0.9" />
          <path d="M626 344 q -6 -10 2 -18" stroke="#dfe9f3" strokeWidth="2" fill="none" className="ws-smoke" style={{ animationDelay: "0.6s" }} />
          <path d="M638 344 q 6 -12 -2 -20" stroke="#dfe9f3" strokeWidth="1.6" fill="none" className="ws-smoke" style={{ animationDelay: "1.9s" }} />
        </g>

        {/* ======== half-built robot (right on desk) ======== */}
        <g>
          {/* torso with open panel */}
          <rect x="716" y="298" width="74" height="82" rx="12" fill="#182a42" stroke="#2a405d" strokeWidth="2" />
          <rect x="728" y="322" width="34" height="40" rx="4" fill="#0a0e14" />
          <path d="M732 330 q 10 8 24 2 M732 342 q 12 -6 24 4 M732 352 q 8 6 24 -2" stroke="#ffb454" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M732 330 q 10 8 24 2" stroke="#00e5ff" strokeWidth="2" fill="none" opacity="0.8" transform="translate(0 4)" />
          {/* head, tilted, one eye lit */}
          <g transform="rotate(-8 753 284)">
            <rect x="726" y="262" width="54" height="40" rx="10" fill="#1e3350" stroke="#2a405d" strokeWidth="2" />
            <rect x="734" y="272" width="38" height="18" rx="5" fill="#0a0e14" />
            <circle cx="746" cy="281" r="5" fill="#34f5a2" className="ws-eye" />
            <circle cx="762" cy="281" r="5" fill="#101a29" stroke="#2a405d" strokeWidth="1.5" />
            <line x1="753" y1="262" x2="753" y2="250" stroke="#2a405d" strokeWidth="2.5" />
            <circle cx="753" cy="247" r="3.5" fill="#ffb454" className="ws-led" />
          </g>
          {/* attached arm raised */}
          <path d="M790 312 q 22 -8 26 -30" stroke="#2a405d" strokeWidth="10" fill="none" strokeLinecap="round" />
          <circle cx="818" cy="278" r="7" fill="#182a42" stroke="#2a405d" strokeWidth="2" />
          {/* detached arm on desk + screwdriver */}
          <path d="M800 372 q 24 -6 40 2" stroke="#2a405d" strokeWidth="9" fill="none" strokeLinecap="round" />
          <line x1="852" y1="376" x2="878" y2="368" stroke="#8aa0b6" strokeWidth="3" />
          <rect x="874" y="362" width="14" height="9" rx="3" fill="#ffb454" transform="rotate(-16 881 366)" />
          {/* dangling wire, swaying */}
          <g className="ws-wire" style={{ transformOrigin: "716px 340px" }}>
            <path d="M716 340 q -14 22 -6 42" stroke="#00e5ff" strokeWidth="2.2" fill="none" opacity="0.8" />
            <circle cx="710" cy="384" r="3" fill="#00e5ff" opacity="0.8" />
          </g>
        </g>

        {/* floating dust motes */}
        {[[220, 250], [520, 150], [760, 210], [980, 160]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#8aa0b6" className="ws-mote" style={{ animationDelay: `${i * 2.1}s` }} />
        ))}
      </svg>
    </div>
  );
}
