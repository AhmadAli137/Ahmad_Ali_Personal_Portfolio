"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

/** A live app embedded on the page. It loads only when the visitor asks for it. */
export function DemoFrame({ url, title, poster }: { url: string; title: string; poster?: string }) {
  const [running, setRunning] = useState(false);

  return (
    <div>
      <div className="relative h-[70vh] min-h-[440px] overflow-hidden rounded-xl border border-line bg-stage">
        {running ? (
          <iframe
            src={url}
            title={`${title} — live demo`}
            className="h-full w-full"
            allow="fullscreen; accelerometer; gyroscope"
          />
        ) : (
          <button
            type="button"
            onClick={() => setRunning(true)}
            className="group absolute inset-0 grid place-items-center"
            aria-label={`Run the ${title} live demo`}
          >
            {poster && (
              <Image src={poster} alt="" fill sizes="(max-width: 1152px) 100vw, 1104px" className="object-cover opacity-55 transition-opacity group-hover:opacity-70" />
            )}
            <span className="relative inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-sm font-medium text-black shadow-xl transition-transform group-hover:scale-[1.03]">
              <Play size={15} fill="currentColor" aria-hidden /> Run the live demo
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">
        Runs in the page.{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          Open it full screen <ArrowUpRight size={14} aria-hidden />
        </a>
      </p>
    </div>
  );
}
