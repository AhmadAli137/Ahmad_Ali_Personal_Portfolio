"use client";

import { useEffect, useState } from "react";

export function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/Toronto",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mt-16 border-t border-line py-8 font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6">
        <span>
          <span className="text-mint">◉</span> STATUS: building{" "}
          <a href="https://sayspark.ca" target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">
            SaySpark
          </a>{" "}
          · open to opportunities
        </span>
        <span>ahmad.ali {"//"} hardware to cloud</span>
        <span suppressHydrationWarning>ONT, CANADA — {time || "--:--:--"} ET</span>
      </div>
    </footer>
  );
}
