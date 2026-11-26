"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { buttonStyles } from "./ui";
import { links } from "@/lib/profile";

/**
 * Every "Book a call" button dispatches the same event; one dialog in the
 * layout listens. The Calendly page loads only once the dialog is opened.
 */
export function BookCallButton({
  variant = "solid",
  label = "Book a call",
  className = "",
}: {
  variant?: keyof typeof buttonStyles;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-call"))}
      className={`${buttonStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}

export function BookCallDialog() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      const dark = document.documentElement.dataset.theme === "dark";
      const colors = dark
        ? "&background_color=13161c&text_color=eceef2&primary_color=9db0ff"
        : "&background_color=ffffff&text_color=0f1217&primary_color=2343e0";
      setSrc(`${links.calendly}?hide_gdpr_banner=1${colors}`);
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener("open-call", onOpen);
    return () => window.removeEventListener("open-call", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      returnFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fade fixed inset-0 z-[80] flex justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm sm:p-6"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-call-title"
    >
      <div
        className="relative my-auto w-full max-w-2xl rounded-2xl border border-line bg-surface p-6 text-ink shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-6">
          <div>
            <h2 id="book-call-title" className="text-xl font-medium tracking-tight">
              Book a 30-minute call
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              Video, or in person around Hamilton and Windsor. Investors, schools, collaborators
              and the curious are all welcome.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="-mr-2 -mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative h-[min(560px,62vh)] w-full overflow-hidden rounded-xl border border-line">
          {!loaded && (
            <p className="absolute inset-0 grid place-items-center text-sm text-muted">
              Loading the calendar…
            </p>
          )}
          <iframe
            src={src}
            title="Pick a time on Calendly"
            onLoad={() => setLoaded(true)}
            className="relative h-full w-full"
          />
        </div>

        <p className="mt-4 text-sm text-muted">
          Calendar not loading?{" "}
          <a
            href={links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            Open it in a new tab
          </a>{" "}
          or{" "}
          <a
            href={links.email}
            className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            send an email
          </a>
          .
        </p>
      </div>
    </div>
  );
}
