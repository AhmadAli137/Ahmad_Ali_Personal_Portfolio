import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Postcard } from "@/components/postcard";
import { hacks } from "@/lib/hackathons";
import { Btn, Chip } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "13 hackathons, 4 podium finishes — full product cycles compressed into 36-hour sprints.",
};

export default function HackathonsPage() {
  return (
    <main className="px-6 pb-10 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">home / work / hackathons</p>
        <div className="mb-4"><Chip>14 HACKATHONS — 2017 → NOW</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Hackathons: Ship It in a Weekend
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted">
          A decade of hackathons — from a first win at Bordercity 2017 to NASA Space Apps and Toronto.
          Some wins, some losses — every one a full product cycle compressed into 36 hours: idea,
          hardware, software, pitch. Recent history on{" "}
          <a
            href="https://devpost.com/AhmadAli137"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:underline"
          >
            Devpost
          </a>
          .
        </p>

        <p className="mb-8 font-mono text-xs text-muted">flip a card to read the back ↻</p>
        <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {hacks.map((h, i) => (
            <Reveal key={h.title} delay={(i % 3) * 0.07}>
              <Postcard data={h} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3.5">
          <Btn href="https://devpost.com/AhmadAli137" external>Full Devpost Profile →</Btn>
          <Btn href="/#work" variant="primary">← All Projects</Btn>
        </div>
      </div>
    </main>
  );
}
