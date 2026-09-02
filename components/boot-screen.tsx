"use client";

import { useEffect, useState } from "react";

const LINES = [
  "AHMADALI.CA BIOS v2.6 — 8-BIT EDITION",
  "CPU: MOS 6502 @ 1.79 MHZ .......... OK",
  "MEMORY TEST: 65536 BYTES .......... OK",
  "VIDEO: PPU INITIALIZED ............ OK",
  "SAYSPARK LINK ..................... OK",
  "LOADING PORTFOLIO ................. OK",
];

/**
 * One-time-per-session BIOS boot sequence. Skippable with any key/click.
 * The signature "world" moment — the site boots like the 8-bit machine
 * printed on its board.
 */
export function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("booted")) return;
    } catch {
      return;
    }
    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reveal = () => {
      i += 1;
      setShown(i);
      if (i < LINES.length) {
        timers.push(setTimeout(reveal, 170));
      } else {
        timers.push(setTimeout(dismiss, 650));
      }
    };

    const dismiss = () => {
      setFading(true);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      timers.push(
        setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = "";
        }, 450)
      );
    };

    const skip = () => dismiss();
    timers.push(setTimeout(reveal, 250));
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg px-6 py-10 font-mono text-sm text-mint transition-opacity duration-500 sm:px-14 sm:text-base ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="crt-scanlines" />
      {LINES.slice(0, shown).map((l, i) => (
        <p key={i} className="mb-1.5 whitespace-pre">
          {l}
        </p>
      ))}
      <p className="mt-4 text-muted">
        {shown >= LINES.length ? "PRESS ANY KEY TO CONTINUE " : ""}
        <span className="cursor-blink inline-block h-[1.05em] w-[9px] translate-y-[2px] bg-mint" />
      </p>
    </div>
  );
}
