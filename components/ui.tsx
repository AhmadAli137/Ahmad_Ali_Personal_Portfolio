import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.16em] text-muted ${className}`}>
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 sm:mb-14">
      <div className="max-w-2xl">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-[2.6rem]">
          {title}
        </h2>
        {lede && <p className="mt-4 text-lg leading-relaxed text-muted">{lede}</p>}
      </div>
      {action && <TextLink href={action.href}>{action.label}</TextLink>}
    </div>
  );
}

const BUTTON_BASE =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors";

export const buttonStyles = {
  solid: `${BUTTON_BASE} bg-ink text-bg hover:bg-ink/85`,
  outline: `${BUTTON_BASE} border border-line-strong text-ink hover:border-ink`,
  /* for use on the dark venture band */
  stageSolid: `${BUTTON_BASE} bg-stage-ink text-stage hover:bg-white`,
  stageOutline: `${BUTTON_BASE} border border-stage-line text-stage-ink hover:border-stage-ink`,
} as const;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyles[variant]}>
        {children}
        <ArrowUpRight size={15} aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} className={buttonStyles[variant]}>
      {children}
    </Link>
  );
}

/** An inline link that reads as a link: underlined, with an arrow that moves on hover. */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line-strong underline-offset-[5px] transition-colors hover:decoration-ink ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Filter pill used by the work index, the record and the gallery. */
export function FilterPill({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm transition-colors ${
        active
          ? "border-ink bg-ink text-bg"
          : "border-line-strong text-muted hover:border-ink hover:text-ink"
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`font-mono text-[11px] ${active ? "text-bg/70" : "text-faint"}`}>{count}</span>
      )}
    </button>
  );
}
