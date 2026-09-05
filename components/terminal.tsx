"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { projects } from "@/lib/projects";

/**
 * The engagement layer for passionate visitors: a real terminal.
 * Open with ` (backtick), the footer >_ button, or ⌘K → terminal.
 * It reveals the site's depth — including releasing the sparkbot hunt.
 */

const PROMPT = "visitor@ahmadali.ca:~$";

interface Line {
  cmd?: string;
  out: ReactNode;
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined} rel="noopener noreferrer" className="text-cyan underline decoration-cyan/40 hover:decoration-cyan">
    {children}
  </a>
);

export function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [histIdx, setHistIdx] = useState(-1);
  const history = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const print = useCallback((line: Line) => setLines((l) => [...l, line]), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      if (lines.length === 0) {
        print({
          out: (
            <span>
              ahmadali.ca terminal — for visitors who read the source. Type <b className="text-mint">help</b> to begin.
            </span>
          ),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    history.current.push(cmd);
    setHistIdx(-1);
    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    const out = ((): ReactNode => {
      switch (name) {
        case "help":
          return (
            <span>
              commands: <b className="text-mint">whoami</b> · <b className="text-mint">projects</b> ·{" "}
              <b className="text-mint">open &lt;slug&gt;</b> · <b className="text-mint">awards</b> ·{" "}
              <b className="text-mint">sayspark</b> · <b className="text-mint">play</b> ·{" "}
              <b className="text-mint">hunt</b> · <b className="text-mint">resume</b> ·{" "}
              <b className="text-mint">contact</b> · <b className="text-mint">clear</b> ·{" "}
              <b className="text-mint">exit</b>
              <br />
              …and a few that aren&apos;t listed. Engineers guess.
            </span>
          );
        case "whoami":
          return (
            <span>
              Ahmad Ali — engineer &amp; founder. BASc ECE (UWindsor) → CHARGE Lab EV battery research →
              MASc @ McMaster (Fall 2026). Founder of <A href="https://sayspark.ca">SaySpark</A>. 44
            	competitions, 14 hackathons, IEEE Best Demo. Builds things that ship.
            </span>
          );
        case "projects":
          return (
            <span>
              {projects.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <b className="text-cyan">{p.slug}</b>
                </span>
              ))}
              <br />
              try: <b className="text-mint">open drone</b>
            </span>
          );
        case "open": {
          const slug = args[0];
          const p = projects.find((x) => x.slug === slug);
          if (!p) return <span className="text-amber">unknown slug: {slug ?? "(none)"} — run `projects`</span>;
          setTimeout(() => router.push(`/projects/${p.slug}`), 300);
          return <span>opening {p.title}…</span>;
        }
        case "awards":
          return (
            <span>
              IEEE PIMRC Best Demo (2023) · NASA Space Apps 1st + Global Nomination (2025) · CWSF 2×
              bronze + silver + $10k scholarship · 4× WEC programming 1st · EPICentre Innovation
              Mastery · full record → <A href="/competitions">/competitions</A>
            </span>
          );
        case "sayspark":
          return (
            <span>
              Voice-first robotics for kids. A robot that thinks out loud while it drives, sees, and
              solves mazes. Free simulator in early access → <A href="https://sayspark.ca">sayspark.ca</A>
            </span>
          );
        case "play":
          return (
            <span>
              playable right now: <A href="/projects/grand-theft-calculus">grand-theft-calculus</A> ·{" "}
              <A href="/projects/meteor-madness">meteor-madness</A>
            </span>
          );
        case "hunt":
        case "sparkbots":
          window.dispatchEvent(new Event("spark-hint"));
          return (
            <span className="text-mint">
              ✦ sparkbots released. 8 of them now roam this site (2 hide on other pages). catch them
              all — something happens at 8/8.
            </span>
          );
        case "resume":
          window.open("/AhmadAli_Resume.pdf", "_blank", "noopener");
          return <span>opening resume.pdf…</span>;
        case "contact":
        case "hire":
          return (
            <span>
              <A href="mailto:ahmad100307@gmail.com?subject=Let%27s%20build%20something">email</A> ·{" "}
              <A href="https://www.linkedin.com/in/ahmad-a-658008170/">linkedin</A> ·{" "}
              <A href="https://github.com/AhmadAli137">github</A>
            </span>
          );
        case "sudo":
          if (cmd.toLowerCase().includes("hire")) {
            setTimeout(() => window.open("mailto:ahmad100307@gmail.com?subject=Offer%20letter%20(drafted%20via%20sudo)", "_blank", "noopener"), 600);
            return <span className="text-mint">permission granted. drafting offer letter…</span>;
          }
          return <span className="text-amber">visitor is not in the sudoers file. this incident will be reported (to nobody).</span>;
        case "konami":
          return <span>we retired that. type <b className="text-mint">hunt</b> instead.</span>;
        case "coffee":
          return <span>☕ brewing… fun fact: most of this site shipped after midnight.</span>;
        case "ls":
          return <span>projects/ awards/ sayspark/ resume.pdf secrets/ — nice try with secrets/</span>;
        case "cat":
          return <span>no files to print here, only robots. try `projects`.</span>;
        case "vim":
          return <span className="text-amber">:q! — you&apos;re free now.</span>;
        case "clear":
          setLines([]);
          return null;
        case "exit":
          setOpen(false);
          return null;
        default:
          return (
            <span className="text-amber">
              command not found: {name} — try <b className="text-mint">help</b>
            </span>
          );
      }
    })();

    if (name !== "clear") print({ cmd, out });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = history.current;
      if (!h.length) return;
      const idx = histIdx === -1 ? h.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(h[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= h.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(h[idx]);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 z-[80] mx-auto max-w-3xl px-4 pb-4"
        >
          <div className="overflow-hidden rounded-t-2xl rounded-b-xl border border-line-strong bg-[#070b11f2] shadow-[0_-8px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(0,229,255,0.08)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-line px-4 py-2">
              <span className="font-mono text-[11px] text-muted">{PROMPT.replace(":~$", "")} — press ` to toggle</span>
              <button type="button" aria-label="Close terminal" onClick={() => setOpen(false)} className="text-muted hover:text-ink">
                <X size={15} />
              </button>
            </div>
            <div ref={scrollRef} className="max-h-[38vh] min-h-[160px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} className="mb-1.5">
                  {l.cmd !== undefined && (
                    <div className="text-muted">
                      <span className="text-mint">{PROMPT}</span> {l.cmd}
                    </div>
                  )}
                  {l.out && <div className="text-ink/90">{l.out}</div>}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-mint">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-ink caret-cyan outline-none"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
