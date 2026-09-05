"use client";

/**
 * Shared craft kit for the illustrated scenes: soft-shadow filters, a
 * properly proportioned Ahmad head (hair, ear, brow, beard, blink), and
 * grounded shadows. Pass 1 (anatomy) + pass 2 (lighting) foundations.
 */

export function SceneDefs() {
  return (
    <defs>
      <filter id="sb-soft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="sb-soft6" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <linearGradient id="sb-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c4460" />
        <stop offset="55%" stopColor="#1b2b40" />
        <stop offset="100%" stopColor="#12203270" />
      </linearGradient>
      <linearGradient id="sb-desk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#20334d" />
        <stop offset="100%" stopColor="#15233a" />
      </linearGradient>
      <radialGradient id="sb-vignette" cx="0.5" cy="0.42" r="0.75">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.34" />
      </radialGradient>
      <linearGradient id="sb-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.16" />
        <stop offset="100%" stopColor="#ffd9a0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sb-cone-cyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/** Grounded soft shadow under an object. */
export function Shadow({ cx, cy, rx, ry, o = 0.32 }: { cx: number; cy: number; rx: number; ry?: number; o?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? Math.max(4, rx / 5)} fill="#000" opacity={o} filter="url(#sb-soft)" />;
}

/**
 * Ahmad's head, drawn with care: skull + jaw shape, ear, layered hair with
 * highlight, brows, blinking eyes, nose hint, groomed beard. ~52u tall at
 * scale 1, origin at head center. Face turned slightly toward viewer-left.
 */
export function AhmadHead({
  x,
  y,
  scale = 1,
  accessory = "none",
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  accessory?: "none" | "headphones" | "safety" | "mic";
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* neck */}
      <path d="M-8 20 q 0 8 -2 12 h 20 q -2 -4 -2 -12 z" fill="#c2926b" />
      {/* skull + jaw */}
      <path d="M-24 -4 q -2 -24 24 -25 q 26 1 24 25 q 0 14 -7 21 q -7 8 -17 8 q -10 0 -17 -8 q -7 -7 -7 -21 z" fill="#d8ab80" />
      {/* shading on far side */}
      <path d="M14 -18 q 10 6 9 16 q 0 14 -7 21 q -4 5 -9 7 q 8 -10 8 -24 q 0 -12 -1 -20 z" fill="#c2926b" opacity="0.55" />
      {/* ear */}
      <ellipse cx="-22" cy="4" rx="4.5" ry="7" fill="#c2926b" />
      <path d="M-23 2 q 3 1 2 5" stroke="#a87c5a" strokeWidth="1.4" fill="none" />
      {/* hair: layered swoop with highlight */}
      <path d="M-25 -2 q -4 -28 25 -29 q 29 1 25 29 q -2 -10 -8 -14 q 2 5 1 9 q -6 -12 -19 -12 q -16 0 -21 13 q -2 -5 1 -10 q -4 4 -4 14 z" fill="#1b1512" />
      <path d="M-14 -24 q 10 -5 22 -1" stroke="#3a2d24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* brows */}
      <path d="M-15 -8 q 5 -3 11 -1 M4 -9 q 6 -2 11 1" stroke="#241b15" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* eyes with blinking lids */}
      <ellipse cx="-9" cy="-2" rx="3.2" ry="4" fill="#241b15" />
      <ellipse cx="10" cy="-2" rx="3.2" ry="4" fill="#241b15" />
      <circle cx="-8" cy="-3.4" r="1" fill="#f3e6d8" opacity="0.9" />
      <circle cx="11" cy="-3.4" r="1" fill="#f3e6d8" opacity="0.9" />
      <g className="sb-blink">
        <rect x="-13.5" y="-7" width="9" height="10" rx="4" fill="#d8ab80" />
        <rect x="5.5" y="-7" width="9" height="10" rx="4" fill="#d8ab80" />
      </g>
      {/* nose */}
      <path d="M0 -2 q 2.5 5 0 8 q -2 1 -3.5 0" stroke="#b78a63" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* beard: shaped, denser at jaw */}
      <path d="M-19 8 q 2 14 19 15 q 17 -1 19 -15 q 1 12 -6 18 q -6 6 -13 6 q -7 0 -13 -6 q -7 -6 -6 -18 z" fill="#241b15" />
      <path d="M-6 14 q 6 3 12 0 q -2 4 -6 4 q -4 0 -6 -4 z" fill="#d8ab80" />
      {/* accessory */}
      {accessory === "headphones" && (
        <>
          <path d="M-26 -4 q -2 -28 26 -29 q 28 1 26 29" stroke="#0d1520" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="-31" y="-6" width="10" height="20" rx="5" fill="#0d1520" stroke="#00e5ff" strokeWidth="1.3" />
          <rect x="21" y="-6" width="10" height="20" rx="5" fill="#0d1520" stroke="#00e5ff" strokeWidth="1.3" />
        </>
      )}
      {accessory === "safety" && (
        <>
          <path d="M-20 -4 h 40" stroke="#9fd8e8" strokeWidth="1.6" opacity="0.9" />
          <path d="M-18 -6 q 9 -3 17 0 q 1 5 -2 7 q -7 3 -13 0 q -3 -2 -2 -7 z M1 -6 q 8 -3 17 0 q 1 5 -2 7 q -6 3 -13 0 q -3 -2 -2 -7 z" fill="#bfeaf5" opacity="0.35" stroke="#9fd8e8" strokeWidth="1.4" />
        </>
      )}
      {accessory === "mic" && (
        <>
          <path d="M22 2 q 8 8 2 18" stroke="#8aa0b6" strokeWidth="2" fill="none" />
          <circle cx="23" cy="22" r="2.6" fill="#8aa0b6" />
        </>
      )}
    </g>
  );
}
