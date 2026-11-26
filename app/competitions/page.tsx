import type { Metadata } from "next";
import { LogoWall } from "@/components/logo-wall";
import { RecordTable } from "@/components/record-table";
import { Eyebrow, SectionHead, TextLink } from "@/components/ui";
import { comps } from "@/lib/competitions";

export const metadata: Metadata = {
  title: "Record",
  description:
    "44 competitions and conferences since 2014: science fairs, hackathons, engineering challenges, research conferences and pitch competitions.",
};

const summary = [
  { value: "44", label: "competitions and conferences since 2014" },
  { value: String(comps.filter((c) => c.result).length), label: "record entries with an award or placement" },
  { value: "14", label: "hackathons, the first in 2017" },
  { value: "10", label: "locations, across three provinces and Michigan" },
];

export default function RecordPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-20">
      <Eyebrow className="mb-5">Record</Eyebrow>
      <h1 className="max-w-3xl text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.03] tracking-[-0.035em]">
        Twelve years of{" "}
        <span className="font-serif italic tracking-[-0.015em]">showing up.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Science fairs, hackathons, engineering challenges, research conferences and pitch
        competitions. Everything is listed, including the ones that ended without a prize. A series
        entered in several years appears as one entry.
      </p>

      <dl className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-sm leading-relaxed text-muted">{s.label}</dt>
            <dd className="text-3xl font-medium tracking-[-0.03em]">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-20">
        <RecordTable comps={comps} />
      </section>

      <section className="mt-24">
        <SectionHead
          eyebrow="Organizations"
          title="Where it happened."
          lede="Choose an organization to see what happened there."
        />
        <LogoWall />
      </section>

      <div className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
        <TextLink href="/work">The projects behind the results</TextLink>
        <TextLink href="/about#timeline">The timeline</TextLink>
      </div>
    </main>
  );
}
