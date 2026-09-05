"use client";

import { useEffect, useState } from "react";
import { Coffee, X } from "lucide-react";

/**
 * Book a coffee chat — a warm, cafe-feeling dialog (cream paper, coffee
 * browns) wrapping the live Calendly scheduler, themed to match.
 */
const CALENDLY_EMBED =
  "https://calendly.com/ahmad100307/30min?hide_gdpr_banner=1&background_color=f4eedd&text_color=2b2a24&primary_color=a45f2d";

const INK = "#2b2a24";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TRIGGER_STYLES = {
  primary:
    "btn-shine inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3 font-mono text-sm font-bold text-[#3a2410] shadow-[0_0_24px_rgba(255,180,84,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(255,180,84,0.5)]",
  ghost:
    "btn-shine inline-flex items-center gap-2 rounded-lg border border-amber/40 bg-amber/5 px-6 py-3 font-mono text-sm text-amber transition-all duration-200 hover:-translate-y-0.5 hover:border-amber",
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
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl p-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            style={{
              color: INK,
              backgroundColor: "#efe8d6",
              backgroundImage: `${GRAIN}, linear-gradient(165deg, #f6f0df, #e7dcc0)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* coffee-ring stain */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-[7px] border-[#a45f2d]/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-11 h-32 w-32 rounded-full border-[3px] border-[#a45f2d]/10"
            />

            <div className="mb-1 flex items-start justify-between">
              <h3 className="flex items-center gap-2.5 text-2xl font-bold">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a45f2d]/15 text-[#8a4d22]">
                  <Coffee size={20} />
                </span>
                Let&apos;s grab a coffee
              </h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[#2b2a24]/50 transition-colors hover:text-[#2b2a24]"
              >
                <X size={18} />
              </button>
            </div>
            <p className="font-hand mb-4 pl-[52px] text-[19px] leading-snug text-[#5a4a32]">
              30 minutes, virtual or in person around Windsor / Hamilton — robots, batteries,
              startups, grad school, hiring… all fair game. First coffee&apos;s on me.
            </p>
            <iframe
              src={CALENDLY_EMBED}
              title="Pick a time — Calendly"
              className="h-[540px] w-full rounded-xl border border-[#2b2a24]/10 bg-[#f4eedd]"
            />
          </div>
        </div>
      )}
    </>
  );
}
