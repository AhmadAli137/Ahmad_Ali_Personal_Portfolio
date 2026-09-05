"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * Professional animation slot: renders a .lottie/.json animation file
 * (download from LottieFiles into /public/anim/ and pass the path).
 * Replaces the hand-drawn scenes one URL at a time.
 */
export function LottieScene({
  src,
  label,
  maxWidth = 720,
}: {
  src: string;
  label: string;
  maxWidth?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(175deg,#0a121e,#070b11)] shadow-[0_0_50px_rgba(0,229,255,0.07)]">
      <div className="mx-auto" style={{ maxWidth }}>
        <DotLottieReact src={src} loop autoplay aria-label={label} />
      </div>
    </div>
  );
}
