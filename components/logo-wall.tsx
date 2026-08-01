import Image from "next/image";
import { Award, MapPin } from "lucide-react";
import { wall } from "@/lib/competitions";

/**
 * Sponsor-wall-style grid of every competition/hackathon attended.
 * Hovering a tile reveals a card with what was accomplished there, where, and when.
 */
export function LogoWall() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {wall.map((o) => (
        <div
          key={o.name}
          className="group relative grid min-h-[110px] place-items-center rounded-xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 transition-all hover:z-20 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)]"
        >
          {o.logo ? (
            <Image
              src={o.logo}
              alt={o.name}
              width={120}
              height={60}
              className="max-h-[64px] w-auto rounded-md object-contain transition-transform duration-200 group-hover:scale-110"
            />
          ) : (
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-muted transition-colors group-hover:text-cyan">
                {o.short}
              </div>
              <div className="mt-1 text-[10px] leading-tight text-muted/70">{o.name}</div>
            </div>
          )}

          {/* Hover card: what / where / when */}
          <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-72 max-w-[80vw] -translate-x-1/2 translate-y-1 rounded-xl border border-line-strong bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,229,255,0.1)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="text-sm font-bold">{o.name}</div>
            <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <MapPin size={11} className="shrink-0" /> {o.meta}
            </div>
            <ul className="space-y-1.5">
              {o.highlights.map((h) => (
                <li key={h} className="flex items-start gap-1.5 text-xs text-muted">
                  <Award size={12} className="mt-0.5 shrink-0 text-amber" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {/* Arrow */}
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-line-strong bg-panel" />
          </div>
        </div>
      ))}
    </div>
  );
}
