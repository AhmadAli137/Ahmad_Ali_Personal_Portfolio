import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { BookCallButton } from "@/components/book-call";
import { ContactBlock } from "@/components/contact-block";
import { Lenses } from "@/components/lenses";
import { VentureTabs } from "@/components/venture-tabs";
import { ButtonLink, Eyebrow, SectionHead, TextLink } from "@/components/ui";
import { comps } from "@/lib/competitions";
import { DOMAIN_LABELS, featuredSlugs, projects } from "@/lib/projects";
import { figures, links } from "@/lib/profile";

const standing: { label: string; value: string }[] = [
  { label: "Stage", value: "Early access. The AI tutor, simulator and curriculum are free to use today." },
  { label: "Shipping", value: "Desktop Studio 1.0 for Windows. The Spark Mini robot goes on sale at launch." },
  { label: "Team", value: "Founder-built end to end: hardware, firmware, AI and cloud." },
  { label: "Open to", value: "Pilot classrooms and partners ahead of the robot's launch." },
];

const highlights: { year: string; event: string; result: string }[] = [
  { year: "2026", event: "Take Your Shot Pitch Competition", result: "4th place, $2,500" },
  { year: "2025", event: "NASA Space Apps Challenge", result: "1st place + global nomination" },
  { year: "2025", event: "UWindsor × Jaguar Land Rover AI Competition", result: "$600 + JLR internship" },
  { year: "2024–25", event: "WinHacks", result: "2nd place overall, twice" },
  { year: "2023", event: "IEEE PIMRC International Conference", result: "Best Demo Award" },
  { year: "2023", event: "EPICentre Entrepreneurship Excellence Awards", result: "Innovation Mastery Award" },
  { year: "2020–23", event: "Windsor Engineering Competition", result: "1st in programming, four years running" },
  { year: "2015–19", event: "Canada-Wide Science Fair", result: "2 bronze, 1 silver, $10k scholarship" },
];

const storyStrip = [
  { src: "/img/cwsf-2016-departure.jpg", alt: "Team Windsor at the airport on the way to the Canada-Wide Science Fair, 2016" },
  { src: "/img/pimrc-best-demo-award.jpg", alt: "Receiving the Best Demo Award at IEEE PIMRC 2023" },
  { src: "/img/charge-lab-magna-team.jpg", alt: "The Magna project team at the CHARGE Lab" },
  { src: "/img/nasa-space-apps-2.jpg", alt: "The Meteor Madness team with their first-place certificates at NASA Space Apps 2025" },
  { src: "/img/genius-cup-2026-arena.jpg", alt: "A gym full of young builders at the Genius Cup, 2026" },
];

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pb-20 sm:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div>
            <Eyebrow className="mb-6">Founder of SaySpark · Engineer · Researcher</Eyebrow>
            <h1 className="text-[clamp(2.5rem,6.2vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              I build robots that teach kids to{" "}
              <span className="font-serif italic tracking-[-0.015em]">think like engineers.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              I&apos;m Ahmad Ali, founder of SaySpark and an electrical and computer engineer working
              across robotics, AI and EV battery systems. Twelve years of building in public, now
              pointed at one company.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookCallButton />
              <ButtonLink href="/#venture" variant="outline">
                See the company
              </ButtonLink>
            </div>
          </div>

          <figure className="max-w-[300px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
              <Image
                src="/img/founder.jpg"
                alt="Ahmad Ali holding the EPICentre Innovation Mastery Award"
                fill
                priority
                sizes="(max-width: 1024px) 300px, 380px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 text-xs text-faint">
              With the Innovation Mastery Award, EPICentre, 2023
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-sm leading-relaxed text-muted">{f.label}</dt>
              <dd className="text-3xl font-medium tracking-[-0.03em]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- The company ---------- */}
      <section id="venture" className="bg-stage text-stage-ink">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-stage-accent">
                The company
              </p>
              <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3.4rem]">
                SaySpark is voice-first robotics for kids.
              </h2>
              <div className="mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-stage-muted">
                <p>
                  Kids don&apos;t get stuck on robotics because the ideas are hard. They get stuck
                  because the first thing they meet is syntax. I watched it happen across hundreds
                  of students while teaching Arduino and C++ in Windsor classrooms.
                </p>
                <p>
                  SaySpark takes the keyboard out of the way. A child talks to the robot, and a real
                  AI tutor answers out loud while the robot drives, measures, sees and solves
                  mazes, explaining the engineering as it goes.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={links.sayspark} variant="stageSolid" external>
                  Visit sayspark.ca
                </ButtonLink>
                <BookCallButton variant="stageOutline" label="Talk to the founder" />
              </div>
            </div>

            <dl className="self-end border-t border-stage-line">
              {standing.map((s) => (
                <div key={s.label} className="grid grid-cols-[88px_1fr] gap-4 border-b border-stage-line py-4">
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-stage-muted">
                    {s.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-20">
            <VentureTabs />
          </div>
        </div>
      </section>

      {/* ---------- Five sides ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHead
          eyebrow="The builder"
          title="Five sides of the same person."
          lede="A company like this needs someone who can build the robot, explain the research, win the room and teach the class. Pick a side to see the evidence for it."
        />
        <Lenses />
      </section>

      {/* ---------- Selected work ---------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <SectionHead
            eyebrow="Selected work"
            title="Built, shipped and judged in public."
            action={{ label: `All ${projects.length} projects`, href: "/work" }}
          />
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/5">
                    {p.cardSrc && (
                      <Image
                        src={p.cardSrc}
                        alt={p.cardCaption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                    {p.year} · {DOMAIN_LABELS[p.domain]}
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 text-xl font-medium tracking-tight">
                    {p.title}
                    <ArrowRight
                      size={17}
                      aria-hidden
                      className="text-faint transition-all group-hover:translate-x-1 group-hover:text-ink"
                    />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.cardBlurb}</p>
                  {p.result && (
                    <p className="mt-3 flex items-start gap-1.5 text-sm font-medium">
                      <Award size={14} aria-hidden className="mt-[3px] shrink-0 text-accent" />
                      {p.result}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Track record ---------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <SectionHead
            eyebrow="Track record"
            title="Twelve years of work judged by other people."
            lede="Engineering floors, hackathon weekends, research conferences and pitch stages."
            action={{ label: `The full record, ${comps.length} entries`, href: "/competitions" }}
          />
          <ul className="border-t border-line">
            {highlights.map((h) => (
              <li
                key={h.event}
                className="grid gap-x-8 gap-y-1 border-b border-line py-4 sm:grid-cols-[96px_1.2fr_1fr] sm:items-baseline"
              >
                <span className="font-mono text-xs text-faint">{h.year}</span>
                <span className="text-[17px] font-medium tracking-tight">{h.event}</span>
                <span className="text-[15px] text-muted">{h.result}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* ---------- The whole story ---------- */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <SectionHead
            eyebrow="The whole story"
            title="From a regional science fair to a graduate lab."
            lede="Experience, research, mentoring, a filterable timeline and about a hundred photographs."
            action={{ label: "Read the full story", href: "/about" }}
          />
          <Link href="/about#photos" aria-label="See the photographs" className="group grid grid-cols-2 gap-3 sm:grid-cols-5">
            {storyStrip.map((s, i) => (
              <div
                key={s.src}
                className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-ink/5 ${i === 4 ? "hidden sm:block" : ""}`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </Link>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <TextLink href="/about#experience">Experience</TextLink>
            <TextLink href="/about#research">Research</TextLink>
            <TextLink href="/about#community">Mentoring</TextLink>
            <TextLink href="/about#timeline">Timeline</TextLink>
            <TextLink href={links.resume} external>
              Résumé
            </TextLink>
          </div>
        </div>
      </section>

      <ContactBlock />
    </main>
  );
}
