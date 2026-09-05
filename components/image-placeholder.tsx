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
  priority = false,
}: {
  caption: string;
  src?: string;
  alt?: string;
  className?: string;
  minH?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`image-frame group relative overflow-hidden rounded-lg border border-line-strong ${minH} ${className}`}>
        <Image
          src={src}
          alt={alt ?? caption}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%,rgba(0,0,0,0.18))] opacity-70" />
      </div>
    );
  }
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-lg border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] ${minH} ${className}`}
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_14px,rgba(0,229,255,0.035)_14px_15px)]" />
      <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-dashed border-line" />
      <span className="relative px-5 text-center font-mono text-xs text-muted">
        ◈ {caption}
      </span>
    </div>
  );
}
