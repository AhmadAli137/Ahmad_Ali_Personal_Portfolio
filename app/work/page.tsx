import type { Metadata } from "next";
import { WorkIndex, type WorkRow } from "@/components/work-index";
import { Eyebrow } from "@/components/ui";
import { DOMAIN_LABELS, projectsByRecency } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project: robots, AI products, energy platforms and games. Filter by field, or show only the award winners.",
};

export default function WorkPage() {
  const rows: WorkRow[] = projectsByRecency.map((p) => ({
    slug: p.slug,
    title: p.title,
    blurb: p.cardBlurb,
    year: p.year,
    domain: p.domain,
    event: p.event,
    result: p.result,
    thumb: p.cardSrc,
    playable: Boolean(p.demoUrl),
    search: [p.title, p.cardBlurb, p.event, p.result, DOMAIN_LABELS[p.domain], p.year, ...p.chips, ...p.stack]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }));
  const awarded = rows.filter((r) => r.result).length;

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-20">
      <Eyebrow className="mb-5">Work</Eyebrow>
      <h1 className="max-w-3xl text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.03] tracking-[-0.035em]">
        {rows.length} projects, from first hackathon to{" "}
        <span className="font-serif italic tracking-[-0.015em]">flight-tested hardware.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Robots, AI products, energy platforms and a few games. {awarded} of them placed or won. Each
        one has its own page with the problem, the build and what it taught me; several run live in
        the browser.
      </p>
      <div className="mt-14">
        <WorkIndex rows={rows} />
      </div>
    </main>
  );
}
