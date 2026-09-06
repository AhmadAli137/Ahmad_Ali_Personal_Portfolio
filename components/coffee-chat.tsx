"use client";

import { useEffect, useState } from "react";
import { Coffee, X } from "lucide-react";

/**
 * Book a coffee chat. Every CoffeeChatButton (nav pill, hero, contact)
 * dispatches the same "open-coffee" event; a single CoffeeChatDialog in the
 * layout listens — so all triggers behave identically. While Calendly loads,
 * a little barista-bot rolls in and serves two cups that clink.
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
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-coffee"))}
      className={TRIGGER_STYLES[variant]}
    >
      <Coffee size={variant === "pill" ? 13 : 16} /> {label}
    </button>
  );
}

/** The barista-bot: rolls in with a tray, the cups clink, repeat. */
function BaristaBot() {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-[#f4eedd]">
      <style>{`
        @keyframes botRoll { 0% { transform: translateX(-160px); } 26% { transform: translateX(0); } 88% { transform: translateX(0); } 100% { transform: translateX(-160px); } }
        @keyframes botBob { 0%, 26% { transform: translateY(0); } 8%, 18% { transform: translateY(-1.5px); } 40%, 100% { transform: translateY(0); } }
        @keyframes cupL { 0%, 52% { transform: none; } 62%, 74% { transform: translate(4px, -3px) rotate(12deg); } 84%, 100% { transform: none; } }
        @keyframes cupR { 0%, 52% { transform: none; } 62%, 74% { transform: translate(-4px, -3px) rotate(-12deg); } 84%, 100% { transform: none; } }
        @keyframes clink { 0%, 60% { opacity: 0; transform: scale(0.2); } 67% { opacity: 1; transform: scale(1.15); } 78%, 100% { opacity: 0; transform: scale(1.35); } }
        @keyframes steamUp { 0% { opacity: 0; transform: translateY(3px); } 40% { opacity: 0.5; } 100% { opacity: 0; transform: translateY(-8px); } }
        @keyframes eyeBlink { 0%, 42%, 46%, 100% { transform: scaleY(1); } 44% { transform: scaleY(0.1); } }
        @keyframes antennaGlow { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
      `}</style>
      <div className="text-center">
        <svg width="250" height="150" viewBox="0 0 250 150" aria-hidden>
          {/* floor */}
          <line x1="20" y1="126" x2="230" y2="126" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.35" />

          {/* the barista-bot, rolling in with the tray */}
          <g style={{ animation: "botRoll 4.2s cubic-bezier(0.25,0.6,0.3,1) infinite" }}>
            <g style={{ animation: "botBob 4.2s linear infinite" }}>
              <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
                {/* body */}
                <rect x="78" y="68" width="44" height="40" rx="9" fill="#cfd8dc" />
                <rect x="86" y="78" width="28" height="12" rx="3" fill="#8a4d22" strokeWidth="1.8" />
                {/* head */}
                <rect x="82" y="38" width="36" height="26" rx="8" fill="#e3e8ea" />
                <g style={{ animation: "eyeBlink 4.2s linear infinite", transformOrigin: "100px 51px" }}>
                  <circle cx="92" cy="51" r="3.2" fill={INK} stroke="none" />
                  <circle cx="108" cy="51" r="3.2" fill={INK} stroke="none" />
                </g>
                <path d="M96 58 q 4 2.5 8 0" fill="none" strokeWidth="1.8" />
                {/* antenna */}
                <line x1="100" y1="38" x2="100" y2="28" strokeWidth="2" />
                <circle cx="100" cy="25" r="3.5" fill="#e0a33c" strokeWidth="1.6" style={{ animation: "antennaGlow 1.4s ease-in-out infinite" }} />
                {/* serving arm + tray */}
                <path d="M122 78 Q 136 74 142 82" fill="none" strokeWidth="3" />
                <line x1="130" y1="88" x2="196" y2="88" strokeWidth="3.5" />
                <line x1="138" y1="88" x2="134" y2="82" strokeWidth="2" />
                {/* wheels */}
                <circle cx="88" cy="114" r="10" fill="#9aa7ad" />
                <circle cx="88" cy="114" r="3" fill={INK} stroke="none" />
                <circle cx="112" cy="114" r="10" fill="#9aa7ad" />
                <circle cx="112" cy="114" r="3" fill={INK} stroke="none" />
              </g>

              {/* cups on the tray */}
              <g style={{ animation: "cupL 4.2s ease-in-out infinite", transformOrigin: "150px 87px" }}>
                <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
                  <path d="M140 68 L162 68 L159 87 L143 87 Z" fill="#f7f2e4" />
                  <path d="M140 71 C 133 71 133 81 141 81" fill="none" />
                  <path d="M143 72 L159.5 72 L158 82 L144.5 82 Z" fill="#6b3a17" stroke="none" />
                </g>
                <path d="M148 62 q 2.5 -5 0 -9" fill="none" stroke="#8a7a63" strokeWidth="1.8" style={{ animation: "steamUp 1.7s ease-out infinite" }} />
              </g>
              <g style={{ animation: "cupR 4.2s ease-in-out infinite", transformOrigin: "176px 87px" }}>
                <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
                  <path d="M166 68 L188 68 L185 87 L169 87 Z" fill="#f7f2e4" />
                  <path d="M188 71 C 195 71 195 81 187 81" fill="none" />
                  <path d="M169 72 L185.5 72 L184 82 L170.5 82 Z" fill="#6b3a17" stroke="none" />
                </g>
                <path d="M178 62 q -2.5 -5 0 -9" fill="none" stroke="#8a7a63" strokeWidth="1.8" style={{ animation: "steamUp 1.7s ease-out infinite", animationDelay: "0.6s" }} />
              </g>

              {/* clink spark */}
              <g style={{ animation: "clink 4.2s ease-out infinite", transformOrigin: "164px 60px" }} fill="#e0a33c" stroke={INK} strokeWidth="1.4">
                <path d="M164 50 L167 57 L174 58 L168 62 L170 69 L164 65 L158 69 L160 62 L154 58 L161 57 Z" />
              </g>
            </g>
          </g>
        </svg>
        <p className="font-hand mt-1 text-[20px] text-[#5a4a32]">your barista-bot is brewing the booking page…</p>
      </div>
    </div>
  );
}

export function CoffeeChatDialog() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [brewDone, setBrewDone] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-coffee", onOpen);
    return () => window.removeEventListener("open-coffee", onOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      setLoaded(false);
      setBrewDone(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setBrewDone(true), 4300); // one full serve + clink
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6"
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
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-[7px] border-[#a45f2d]/15" />
        <div aria-hidden className="pointer-events-none absolute -right-4 -top-11 h-32 w-32 rounded-full border-[3px] border-[#a45f2d]/10" />

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
          {!(loaded && brewDone) && <BaristaBot />}
          <iframe
            src={CALENDLY_EMBED}
            title="Pick a time — Calendly"
            onLoad={() => setLoaded(true)}
            className="h-full w-full rounded-xl border border-[#2b2a24]/10 bg-[#f4eedd]"
          />
        </div>
      </div>
    </div>
  );
}
