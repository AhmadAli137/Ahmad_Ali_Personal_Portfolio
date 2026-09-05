"use client";

import { useEffect, useState } from "react";
import { Coffee, X } from "lucide-react";

/**
 * Book a coffee chat — the dialog embeds the live Calendly scheduler,
 * dark-themed to match the site.
 */
const CALENDLY_EMBED =
  "https://calendly.com/ahmad100307/30min?hide_gdpr_banner=1&background_color=0c1420&text_color=dfe9f3&primary_color=00e5ff";

const TRIGGER_STYLES = {
  primary:
    "btn-shine inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-mono text-sm font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,229,255,0.55)]",
  ghost:
    "btn-shine inline-flex items-center gap-2 rounded-lg border border-line-strong bg-cyan/5 px-6 py-3 font-mono text-sm text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan",
  pill:
    "inline-flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/5 px-3.5 py-1.5 font-mono text-xs text-amber transition-colors hover:border-amber",
} as const;

export function CoffeeChatButton({
  variant = "primary",
  label = "Book a Coffee Chat",
}: {
  variant?: keyof typeof TRIGGER_STYLES;
  label?: string;
}) {
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
      <button type="button" onClick={() => setOpen(true)} className={TRIGGER_STYLES[variant]}>
        <Coffee size={variant === "pill" ? 13 : 16} /> {label}
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
            className="w-full max-w-2xl rounded-2xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(0,229,255,0.1)]"
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
            <iframe
              src={CALENDLY_EMBED}
              title="Pick a time — Calendly"
              className="h-[560px] w-full rounded-xl border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
