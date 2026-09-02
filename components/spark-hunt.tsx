"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export const TOTAL_BITS = 8;

/* ---------- pixel art for the finale ---------- */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function Px({ map, s = 9, cls }: { map: string[]; s?: number; cls: string }) {
  const w = Math.max(...map.map((r) => r.length)) * s;
  const h = map.length * s;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={cls}>
      {map.flatMap((row, r) =>
        row
          .split("")
          .map((c, i) => (c === "#" ? <rect key={`${r}-${i}`} x={i * s} y={r * s} width={s} height={s} /> : null))
      )}
    </svg>
  );
}

const BOT_A = [
  "...#####...",
  "...#.#.#...",
  "...#####...",
  "....###....",
  "#..#####..#",
  "#..#####..#",
  "...#####...",
  "....#.#....",
  "....#.#....",
  "...##.##...",
];
const BOT_B = [
  "#..#####..#",
  "#..#.#.#..#",
  "...#####...",
  "....###....",
  ".#.#####.#.",
  "..#######..",
  "...#####...",
  "....#.#....",
  "...#...#...",
  "..##...##..",
];
const ROVER_A = [
  "....##......",
  "..######....",
  ".#..##..#...",
  ".########...",
  "..######....",
  ".##....##...",
  ".##....##...",
];
const ROVER_B = [
  "......##....",
  "..######....",
  ".#..##..#...",
  ".########...",
  "..######....",
  "..##..##....",
  ".##....##...",
];
const HEART = [
  ".##...##.",
  "####.####",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
];

function Dancer({ a, b, cls, delay }: { a: string[]; b: string[]; cls: string; delay: string }) {
  return (
    <div className="dance-bounce" style={{ animationDelay: delay }}>
      <div className="cs-f1"><Px map={a} cls={cls} /></div>
      <div className="cs-f2 -mt-[100%]"><Px map={b} cls={cls} /></div>
    </div>
  );
}

/* ---------- the hunt ---------- */

interface Toast {
  title: string;
  body: string;
}

export function SparkHunt() {
  const [found, setFound] = useState<string[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const [cutscene, setCutscene] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    try {
      setFound(JSON.parse(localStorage.getItem("byte-bits") ?? "[]"));
      setCelebrated(localStorage.getItem("byte-celebrated") === "1");
    } catch {}
  }, []);

  const save = useCallback((ids: string[]) => {
    try {
      localStorage.setItem("byte-bits", JSON.stringify(ids));
    } catch {}
    window.dispatchEvent(new Event("spark-sync"));
  }, []);

  useEffect(() => {
    const onCollect = (e: Event) => {
      const { id, fact } = (e as CustomEvent).detail as { id: string; fact: string };
      setFound((prev) => {
        if (prev.includes(id)) {
          setToast({ title: "ALREADY COLLECTED", body: fact });
          return prev;
        }
        const next = [...prev, id];
        save(next);
        if (next.length >= TOTAL_BITS) {
          setToast(null);
          setCutscene(true);
          try {
            localStorage.setItem("byte-celebrated", "1");
          } catch {}
          setCelebrated(true);
        } else {
          setToast({ title: `BIT ${next.length}/${TOTAL_BITS} COLLECTED`, body: fact });
        }
        return next;
      });
    };
    const onHint = () =>
      setToast({
        title: "SECRET",
        body: `${TOTAL_BITS} ✦ bits are hidden across this site. Collect the full byte to unlock something special.`,
      });
    window.addEventListener("spark-collect", onCollect);
    window.addEventListener("spark-hint", onHint);
    return () => {
      window.removeEventListener("spark-collect", onCollect);
      window.removeEventListener("spark-hint", onHint);
    };
  }, [save]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5200);
    return () => clearTimeout(t);
  }, [toast]);

  const confetti = useMemo(
    () =>
      range(26).map((i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${((i * 13) % 40) / 10}s`,
        duration: `${3 + ((i * 7) % 25) / 10}s`,
        color: ["#00e5ff", "#34f5a2", "#ffb454", "#8ab8ff"][i % 4],
      })),
    []
  );

  const complete = found.length >= TOTAL_BITS;

  return (
    <>
      {/* Progress pill — appears once the hunt has begun */}
      {found.length > 0 && (
        <button
          type="button"
          onClick={() =>
            complete
              ? setCutscene(true)
              : setToast({
                  title: `${TOTAL_BITS - found.length} BITS LEFT`,
                  body: "Keep exploring — some pages you haven't visited are hiding bits.",
                })
          }
          className="fixed bottom-4 left-4 z-40 rounded-full border border-line-strong bg-bg/80 px-3.5 py-1.5 font-mono text-[11px] text-cyan backdrop-blur transition-colors hover:border-cyan"
        >
          ✦ {found.length}/{TOTAL_BITS} BITS{complete ? " — REPLAY" : ""}
        </button>
      )}

      {/* Fact toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 left-1/2 z-40 w-[92vw] max-w-md -translate-x-1/2 rounded-xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
          >
            <div className="mb-1 font-mono text-[11px] tracking-wider text-mint">✦ {toast.title}</div>
            <div className="text-sm text-muted">{toast.body}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Finale cutscene */}
      <AnimatePresence>
        {cutscene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-hidden bg-bg/95 backdrop-blur-sm"
          >
            {confetti.map((c, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: c.left,
                  animationDelay: c.delay,
                  animationDuration: c.duration,
                  background: c.color,
                }}
              />
            ))}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setCutscene(false)}
              className="absolute right-5 top-5 z-10 text-muted transition-colors hover:text-ink"
            >
              <X size={22} />
            </button>
            <div className="grid h-full place-items-center px-6">
              <div className="max-w-xl text-center">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 font-mono text-sm tracking-[0.3em] text-mint"
                >
                  BYTE COMPLETE — 8/8
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mb-6 text-3xl font-extrabold sm:text-4xl"
                >
                  THANK YOU FOR PLAYING
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-7 flex items-end justify-center gap-8"
                >
                  <Dancer a={ROVER_A} b={ROVER_B} cls="fill-cyan" delay="0s" />
                  <Dancer a={BOT_A} b={BOT_B} cls="fill-mint" delay="0.15s" />
                  <Dancer a={HEART} b={HEART} cls="fill-amber" delay="0.3s" />
                  <Dancer a={BOT_B} b={BOT_A} cls="fill-cyan" delay="0.45s" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-2 text-muted"
                >
                  You explored like an engineer — curious, thorough, and a little playful. That&apos;s
                  exactly how I build.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.35 }}
                  className="mb-8 text-muted"
                >
                  If you made it this far, we should build something together —{" "}
                  <strong className="text-ink">hire me, partner with me, and let&apos;s mold the future.</strong>
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className="flex flex-wrap justify-center gap-3.5"
                >
                  <a
                    href="mailto:ahmad100307@gmail.com?subject=Let%27s%20mold%20the%20future%20together"
                    className="btn-shine rounded-lg bg-cyan px-6 py-3 font-mono text-sm font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.35)]"
                  >
                    Let&apos;s Talk
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmad-a-658008170/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-line-strong bg-cyan/5 px-6 py-3 font-mono text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://sayspark.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-mint/40 bg-mint/10 px-6 py-3 font-mono text-sm text-mint"
                  >
                    Follow SaySpark
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiet replay hook for returning finishers with a cleared toast state */}
      {celebrated && !cutscene && found.length === 0 && null}
    </>
  );
}
