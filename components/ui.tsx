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
    <div className="mb-8 sm:mb-10">
      <span className="mb-2.5 block font-mono text-[13px] text-mint">
        <span className="text-muted">{"// "}</span>
        {tag}
      </span>
      <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {lede && <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted sm:text-base">{lede}</p>}
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
    <span className={`rounded-full border px-3 py-1.5 font-mono text-[11px] ${chipTones[tone]}`}>
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
      className={`card-surface rounded-lg border border-line bg-[linear-gradient(160deg,rgba(16,26,41,0.92),rgba(12,20,32,0.96))] p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-line-strong hover:shadow-[0_16px_46px_rgba(0,0,0,0.34),0_0_28px_rgba(0,229,255,0.08)] ${className}`}
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
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-mono text-[13px] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";
  const styles =
    variant === "primary"
      ? "btn-shine bg-cyan font-bold text-[#04252b] shadow-[0_0_22px_rgba(0,229,255,0.32)] hover:shadow-[0_0_34px_rgba(0,229,255,0.5)]"
      : "btn-shine border border-line-strong bg-cyan/5 text-ink hover:border-cyan hover:bg-cyan/10";
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
