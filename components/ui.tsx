import Link from "next/link";
import type { ReactNode } from "react";
import { Tilt } from "./tilt";
import { Magnetic } from "./magnetic";

export function SectionHeading({
  tag,
  title,
  lede,
}: {
  tag: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-11">
      <span className="mb-2.5 block font-mono text-[13px] text-mint">
        <span className="text-muted">{"// "}</span>
        {tag}
      </span>
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {lede && <p className="mt-3 max-w-2xl text-muted">{lede}</p>}
    </div>
  );
}

type ChipTone = "cyan" | "mint" | "amber";
const chipTones: Record<ChipTone, string> = {
  cyan: "text-cyan border-line-strong bg-cyan/5",
  mint: "text-mint border-mint/30 bg-mint/5",
  amber: "text-amber border-amber/30 bg-amber/5",
};

export function Chip({ children, tone = "cyan" }: { children: ReactNode; tone?: ChipTone }) {
  return (
    <span className={`rounded-full border px-3.5 py-1.5 font-mono text-xs ${chipTones[tone]}`}>
      {children}
    </span>
  );
}

export function Chips({ items, tone = "cyan" }: { items: string[]; tone?: ChipTone }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((i) => (
        <Chip key={i} tone={tone}>
          {i}
        </Chip>
      ))}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Tilt
      className={`rounded-2xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-7 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,255,0.08)] ${className}`}
    >
      {children}
    </Tilt>
  );
}

export function Btn({
  href,
  children,
  variant = "ghost",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-block rounded-lg px-6 py-3 font-mono text-sm transition-all duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "btn-shine bg-cyan font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.35)] hover:shadow-[0_0_36px_rgba(0,229,255,0.55)]"
      : "btn-shine border border-line-strong bg-cyan/5 text-ink hover:border-cyan";
  if (external) {
    return (
      <Magnetic>
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
          {children}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    </Magnetic>
  );
}
