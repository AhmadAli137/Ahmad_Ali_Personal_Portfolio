import type { ReactNode } from "react";

/** Wraps content with sci-fi HUD corner brackets. */
export function Hud({ children, className = "" }: { children: ReactNode; className?: string }) {
  const corner = "absolute h-[18px] w-[18px] border-cyan opacity-80";
  return (
    <div className={`relative ${className}`}>
      <span className={`${corner} -left-px -top-px rounded-tl-xl border-l-2 border-t-2`} />
      <span className={`${corner} -right-px -top-px rounded-tr-xl border-r-2 border-t-2`} />
      <span className={`${corner} -bottom-px -left-px rounded-bl-xl border-b-2 border-l-2`} />
      <span className={`${corner} -bottom-px -right-px rounded-br-xl border-b-2 border-r-2`} />
      {children}
    </div>
  );
}
