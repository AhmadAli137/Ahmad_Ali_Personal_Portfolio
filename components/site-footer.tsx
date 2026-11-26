import Link from "next/link";
import { links } from "@/lib/profile";

const site = [
  { href: "/#venture", label: "Venture" },
  { href: "/work", label: "Work" },
  { href: "/competitions", label: "Record" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const elsewhere = [
  { href: links.sayspark, label: "SaySpark" },
  { href: links.linkedin, label: "LinkedIn" },
  { href: links.github, label: "GitHub" },
  { href: links.devpost, label: "Devpost" },
  { href: links.resume, label: "Résumé (PDF)" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[15px] font-semibold tracking-tight">Ahmad Ali</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Founder of SaySpark. Engineer across robotics, AI and EV battery systems. Based in
            Hamilton and Windsor, Ontario.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Site</p>
          <ul className="space-y-2 text-sm">
            {site.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-faint">© 2026 Ahmad Ali</p>
      </div>
    </footer>
  );
}
