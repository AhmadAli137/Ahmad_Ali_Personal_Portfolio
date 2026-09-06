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

/** The barista-bot: rolls in with a pot, pours both cups, they clink, repeat.
    One 6s master timeline drives every part. */
export function BaristaBot() {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-[#f4eedd]">
      <style>{`
        @keyframes botRoll { 0% { transform: translateX(-175px); } 18% { transform: translateX(0); } 40% { transform: translateX(0); } 46% { transform: translateX(33px); } 84% { transform: translateX(33px); } 100% { transform: translateX(-175px); } }
        @keyframes potTilt { 0%, 20% { transform: rotate(0); } 25%, 38% { transform: rotate(38deg); } 43%, 48% { transform: rotate(0); } 52%, 64% { transform: rotate(38deg); } 69%, 100% { transform: rotate(0); } }
        @keyframes pour1 { 0%, 25% { opacity: 0; } 27%, 37% { opacity: 1; } 39%, 100% { opacity: 0; } }
        @keyframes pour2 { 0%, 52% { opacity: 0; } 54%, 63% { opacity: 1; } 65%, 100% { opacity: 0; } }
        @keyframes fill1 { 0%, 26% { transform: scaleY(0.04); } 38%, 99% { transform: scaleY(1); } 100% { transform: scaleY(0.04); } }
        @keyframes fill2 { 0%, 53% { transform: scaleY(0.04); } 64%, 99% { transform: scaleY(1); } 100% { transform: scaleY(0.04); } }
        @keyframes cupL2 { 0%, 70% { transform: none; } 76%, 84% { transform: translate(4px, -3px) rotate(11deg); } 92%, 100% { transform: none; } }
        @keyframes cupR2 { 0%, 70% { transform: none; } 76%, 84% { transform: translate(-4px, -3px) rotate(-11deg); } 92%, 100% { transform: none; } }
        @keyframes clink2 { 0%, 74% { opacity: 0; transform: scale(0.2); } 79% { opacity: 1; transform: scale(1.15); } 88%, 100% { opacity: 0; transform: scale(1.35); } }
        @keyframes steamGate1 { 0%, 38% { opacity: 0; } 42%, 97% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes steamGate2 { 0%, 64% { opacity: 0; } 68%, 97% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes steamWaft { 0% { transform: translateY(2px); opacity: 0.15; } 50% { opacity: 0.55; } 100% { transform: translateY(-7px); opacity: 0; } }
        @keyframes eyeBlink { 0%, 42%, 46%, 100% { transform: scaleY(1); } 44% { transform: scaleY(0.1); } }
        @keyframes antennaGlow { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
      `}</style>
      <div className="text-center">
        <svg width="260" height="152" viewBox="0 0 260 152" aria-hidden>
          {/* floor + table */}
          <line x1="14" y1="130" x2="246" y2="130" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
          <g stroke={INK} strokeWidth="2.2" strokeLinecap="round">
            <line x1="146" y1="102" x2="234" y2="102" strokeWidth="3" />
            <line x1="154" y1="102" x2="150" y2="130" />
            <line x1="226" y1="102" x2="230" y2="130" />
          </g>

          {/* cups on the table (fill first, clink later) */}
          <g style={{ animation: "cupL2 6s ease-in-out infinite", transformOrigin: "172px 101px" }}>
            <path d="M165 83 L181 83 L179 101 L167 101 Z" fill="#f7f2e4" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M165 86 C 158 86 158 96 166 96" fill="none" stroke={INK} strokeWidth="2.2" />
            <path d="M167 86 L179 86 L177.6 99 L168.4 99 Z" fill="#6b3a17" style={{ animation: "fill1 6s linear infinite", transformOrigin: "173px 99px" }} />
            <g style={{ animation: "steamGate1 6s linear infinite" }}>
              <path d="M172 78 q 2.5 -5 0 -9" fill="none" stroke="#8a7a63" strokeWidth="1.8" style={{ animation: "steamWaft 1.6s ease-out infinite" }} />
            </g>
          </g>
          <g style={{ animation: "cupR2 6s ease-in-out infinite", transformOrigin: "204px 101px" }}>
            <path d="M197 83 L213 83 L211 101 L199 101 Z" fill="#f7f2e4" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M213 86 C 220 86 220 96 212 96" fill="none" stroke={INK} strokeWidth="2.2" />
            <path d="M199 86 L211 86 L209.6 99 L200.4 99 Z" fill="#6b3a17" style={{ animation: "fill2 6s linear infinite", transformOrigin: "205px 99px" }} />
            <g style={{ animation: "steamGate2 6s linear infinite" }}>
              <path d="M204 78 q -2.5 -5 0 -9" fill="none" stroke="#8a7a63" strokeWidth="1.8" style={{ animation: "steamWaft 1.6s ease-out infinite", animationDelay: "0.5s" }} />
            </g>
          </g>

          {/* clink spark */}
          <g style={{ animation: "clink2 6s ease-out infinite", transformOrigin: "188px 72px" }} fill="#e0a33c" stroke={INK} strokeWidth="1.4">
            <path d="M188 62 L191 69 L198 70 L192 74 L194 81 L188 77 L182 81 L184 74 L178 70 L185 69 Z" />
          </g>

          {/* the barista-bot with its pot */}
          <g style={{ animation: "botRoll 6s cubic-bezier(0.3,0.6,0.3,1) infinite" }}>
            <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
              {/* body */}
              <rect x="58" y="72" width="44" height="40" rx="9" fill="#cfd8dc" />
              <rect x="66" y="82" width="28" height="12" rx="3" fill="#8a4d22" strokeWidth="1.8" />
              {/* head */}
              <rect x="62" y="42" width="36" height="26" rx="8" fill="#e3e8ea" />
              <g style={{ animation: "eyeBlink 6s linear infinite", transformOrigin: "80px 55px" }}>
                <circle cx="72" cy="55" r="3.2" fill={INK} stroke="none" />
                <circle cx="88" cy="55" r="3.2" fill={INK} stroke="none" />
              </g>
              <path d="M76 62 q 4 2.5 8 0" fill="none" strokeWidth="1.8" />
              {/* antenna */}
              <line x1="80" y1="42" x2="80" y2="32" strokeWidth="2" />
              <circle cx="80" cy="29" r="3.5" fill="#e0a33c" strokeWidth="1.6" style={{ animation: "antennaGlow 1.4s ease-in-out infinite" }} />
              {/* arm reaching to the pot */}
              <path d="M102 82 Q 122 70 142 62" fill="none" strokeWidth="3" />
              {/* wheels */}
              <circle cx="68" cy="118" r="10" fill="#9aa7ad" />
              <circle cx="68" cy="118" r="3" fill={INK} stroke="none" />
              <circle cx="92" cy="118" r="10" fill="#9aa7ad" />
              <circle cx="92" cy="118" r="3" fill={INK} stroke="none" />
            </g>

            {/* coffee pot, gripped at the handle; tilts to pour */}
            <g style={{ animation: "potTilt 6s ease-in-out infinite", transformOrigin: "144px 60px" }}>
              <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
                <rect x="140" y="48" width="26" height="20" rx="4" fill="#8a4d22" />
                <path d="M166 52 L176 56 L166 62 Z" fill="#8a4d22" />
                <path d="M144 48 L162 48" strokeWidth="2.6" />
                <circle cx="153" cy="44" r="2.4" fill="#e0a33c" strokeWidth="1.4" />
              </g>
            </g>

            {/* pouring streams (move with the robot; visible per pour phase) */}
            <g style={{ animation: "pour1 6s linear infinite" }}>
              <path d="M170 73 q 1.5 4 0 12" fill="none" stroke="#6b3a17" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g style={{ animation: "pour2 6s linear infinite" }}>
              <path d="M170 73 q 1.5 4 0 12" fill="none" stroke="#6b3a17" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </svg>
        <p className="font-hand mt-1 text-[20px] text-[#5a4a32]">your barista-bot is pouring… booking page right up</p>
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
    const t = window.setTimeout(() => setBrewDone(true), 6100); // one full pour + clink
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
