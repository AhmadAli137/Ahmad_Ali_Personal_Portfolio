"use client";

import { useEffect, useState } from "react";
import { Coffee, X } from "lucide-react";

/**
 * Book a coffee chat. When SCHEDULING_URL is set (Calendly / cal.com),
 * the dialog embeds the live scheduler; until then it offers a prefilled
 * email with time slots — one constant to upgrade.
 */
const SCHEDULING_URL: string | null = null; // e.g. "https://cal.com/ahmadali/coffee"

const MAILTO = [
  "mailto:ahmad100307@gmail.com",
  "?subject=" + encodeURIComponent("Coffee chat ☕"),
  "&body=" +
    encodeURIComponent(
      "Hi Ahmad,\n\nI'd love to grab a coffee (virtual or in person). A few times that work for me:\n\n- \n- \n- \n\nWhat I'd like to chat about:\n\n"
    ),
].join("");

export function CoffeeChatButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-shine inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-mono text-sm font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,229,255,0.55)]"
      >
        <Coffee size={16} /> Book a Coffee Chat
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a coffee chat"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(0,229,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <Coffee size={19} className="text-cyan" /> Coffee chat
              </h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted transition-colors hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>
            <p className="mb-5 text-sm text-muted">
              20–30 minutes, virtual or in person around Windsor / Hamilton. Robots, batteries,
              startups, grad school, hiring — all fair game.
            </p>
            {SCHEDULING_URL ? (
              <iframe
                src={SCHEDULING_URL}
                title="Pick a time"
                className="h-[420px] w-full rounded-xl border-0 bg-white"
              />
            ) : (
              <a
                href={MAILTO}
                className="btn-shine block rounded-lg bg-cyan px-6 py-3 text-center font-mono text-sm font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-all duration-200 hover:shadow-[0_0_36px_rgba(0,229,255,0.55)]"
              >
                Email me a few times that work →
              </a>
            )}
            <p className="mt-4 font-mono text-[11px] text-muted">
              I reply to every coffee chat request — usually within a day.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
