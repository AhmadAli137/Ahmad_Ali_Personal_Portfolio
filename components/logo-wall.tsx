import Image from "next/image";
import { wall } from "@/lib/competitions";

/** Sponsor-wall-style grid of every competition/hackathon attended. */
export function LogoWall() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {wall.map((o) => (
        <div
          key={o.name}
          title={o.name}
          className="group grid min-h-[110px] place-items-center rounded-xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-4 transition-all hover:-translate-y-1 hover:border-cyan/60 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)]"
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
        </div>
      ))}
    </div>
  );
}
