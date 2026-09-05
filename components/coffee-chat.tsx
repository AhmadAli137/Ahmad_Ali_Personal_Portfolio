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

/** Brewing loader: machine drips into two cups, they fill, then clink. */
function BrewLoader() {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-[#f4eedd]">
      <style>{`
        @keyframes brewStream { 0%,55% { opacity: 1; } 60%,100% { opacity: 0; } }
        @keyframes brewDrip { 0% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.2); } }
        @keyframes brewFill { 0% { transform: scaleY(0.05); } 55%,100% { transform: scaleY(1); } }
        @keyframes cheersL { 0%,58% { transform: translate(0,0) rotate(0); } 70%,82% { transform: translate(13px,-6px) rotate(14deg); } 94%,100% { transform: translate(0,0) rotate(0); } }
        @keyframes cheersR { 0%,58% { transform: translate(0,0) rotate(0); } 70%,82% { transform: translate(-13px,-6px) rotate(-14deg); } 94%,100% { transform: translate(0,0) rotate(0); } }
        @keyframes clinkSpark { 0%,68% { opacity: 0; transform: scale(0.2); } 74% { opacity: 1; transform: scale(1.15); } 84%,100% { opacity: 0; transform: scale(1.3); } }
        @keyframes brewSteam { 0% { opacity: 0; transform: translateY(4px); } 40% { opacity: 0.5; } 100% { opacity: 0; transform: translateY(-10px); } }
      `}</style>
      <div className="text-center">
        <svg width="210" height="150" viewBox="0 0 210 150" aria-hidden>
          {/* machine */}
          <g stroke="#2b2a24" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
            <rect x="55" y="12" width="100" height="26" rx="7" fill="#a45f2d" />
            <rect x="70" y="38" width="70" height="14" rx="4" fill="#8a4d22" />
            <rect x="98" y="52" width="14" height="8" fill="#6b3a17" />
            <circle cx="70" cy="25" r="4" fill="#f4eedd" />
            <circle cx="140" cy="25" r="4" fill="#c9463a" />
          </g>
          {/* stream */}
          <g style={{ animation: "brewStream 3.6s linear infinite" }}>
            <rect x="102.5" y="60" width="5" height="34" rx="2.5" fill="#6b3a17" style={{ animation: "brewDrip 0.7s ease-in-out infinite", transformOrigin: "105px 60px" }} />
          </g>
          {/* cups */}
          <g style={{ animation: "cheersL 3.6s ease-in-out infinite", transformOrigin: "88px 122px" }}>
            <g stroke="#2b2a24" strokeWidth="2.5" strokeLinejoin="round">
              <path d="M72 96 L104 96 L100 124 L76 124 Z" fill="#f7f2e4" />
              <path d="M72 100 C 62 100 62 114 73 114" fill="none" />
              <rect x="76" y="100" width="24" height="21" fill="#6b3a17" stroke="none" style={{ animation: "brewFill 3.6s linear infinite", transformOrigin: "88px 121px" }} />
            </g>
            <path d="M82 88 q 3 -6 0 -11" fill="none" stroke="#8a7a63" strokeWidth="2" style={{ animation: "brewSteam 1.8s ease-out infinite" }} />
          </g>
          <g style={{ animation: "cheersR 3.6s ease-in-out infinite", transformOrigin: "122px 122px" }}>
            <g stroke="#2b2a24" strokeWidth="2.5" strokeLinejoin="round">
              <path d="M106 96 L138 96 L134 124 L110 124 Z" fill="#f7f2e4" />
              <path d="M138 100 C 148 100 148 114 137 114" fill="none" />
              <rect x="110" y="100" width="24" height="21" fill="#6b3a17" stroke="none" style={{ animation: "brewFill 3.6s linear infinite", transformOrigin: "122px 121px" }} />
            </g>
            <path d="M128 88 q -3 -6 0 -11" fill="none" stroke="#8a7a63" strokeWidth="2" style={{ animation: "brewSteam 1.8s ease-out infinite", animationDelay: "0.5s" }} />
          </g>
          {/* clink spark */}
          <g style={{ animation: "clinkSpark 3.6s ease-out infinite", transformOrigin: "105px 92px" }} fill="#e0a33c" stroke="#2b2a24" strokeWidth="1.5">
            <path d="M105 82 L108 89 L115 90 L109 94 L111 101 L105 97 L99 101 L101 94 L95 90 L102 89 Z" />
          </g>
        </svg>
        <p className="font-hand mt-1 text-[20px] text-[#5a4a32]">brewing your booking page…</p>
      </div>
    </div>
  );
}

export function CoffeeChatButton({
  variant = "primary",
  label = "Book a Coffee Chat",
}: {
  variant?: keyof typeof TRIGGER_STYLES;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [brewDone, setBrewDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
      setBrewDone(false);
      return;
    }
    const t = window.setTimeout(() => setBrewDone(true), 3700); // let one full brew + cheers play
    return () => window.clearTimeout(t);
  }, [open]);

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
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a coffee chat"
        >
          <div
            className="relative my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 text-left shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:p-7"
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
            <div className="relative h-[min(520px,58vh)] w-full">
              {!(loaded && brewDone) && <BrewLoader />}
              <iframe
                src={CALENDLY_EMBED}
                title="Pick a time — Calendly"
                onLoad={() => setLoaded(true)}
                className="h-full w-full rounded-xl border border-[#2b2a24]/10 bg-[#f4eedd]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
