import Image from "next/image";

/**
 * Renders a labeled placeholder until a real image exists.
 * Drop the photo in /public/img and pass `src` to swap it in.
 */
export function Ph({
  caption,
  src,
  alt,
  className = "",
  minH = "min-h-[220px]",
}: {
  caption: string;
  src?: string;
  alt?: string;
  className?: string;
  minH?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-line-strong ${minH} ${className}`}>
        <Image src={src} alt={alt ?? caption} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] ${minH} ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_14px,rgba(0,229,255,0.035)_14px_15px)]" />
      <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-dashed border-line" />
      <span className="relative px-5 text-center font-mono text-xs text-muted">
        ◈ {caption}
      </span>
    </div>
  );
}
