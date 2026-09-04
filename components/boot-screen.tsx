"use client";

import { useEffect, useState } from "react";

const LINES = [
  "AHMADALI.CA BOOT v3.0",
  "CPU: ENGINEER (WINDSOR→HAMILTON) ..... OK",
  "MEMORY: 44 COMPETITIONS LOADED ....... OK",
  "GPU: 3D DRONE SUBSYSTEM .............. OK",
  "NET: SAYSPARK.CA LINK ................ OK",
  "SHELL: PRESS ` ANYTIME FOR TERMINAL .. OK",
];

/**
 * Once-per-session terminal boot. Fast, skippable with any key or click,
 * and it teaches the site's best secret: the ` terminal.
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

    const dismiss = () => {
      setFading(true);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      timers.push(
        setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = "";
        }, 400)
      );
    };

    const reveal = () => {
      i += 1;
      setShown(i);
      if (i < LINES.length) timers.push(setTimeout(reveal, 150));
      else timers.push(setTimeout(dismiss, 600));
    };

    const skip = () => dismiss();
    timers.push(setTimeout(reveal, 200));
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
      className={`fixed inset-0 z-[110] bg-bg px-6 py-10 font-mono text-sm text-mint transition-opacity duration-400 sm:px-14 sm:text-base ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {LINES.slice(0, shown).map((l, i) => (
        <p key={i} className="mb-1.5 whitespace-pre">
          {l}
        </p>
      ))}
      <p className="mt-4 text-muted">
        {shown >= LINES.length ? "READY. " : ""}
        <span className="cursor-blink inline-block h-[1.05em] w-[9px] translate-y-[2px] bg-mint" />
      </p>
    </div>
  );
}
