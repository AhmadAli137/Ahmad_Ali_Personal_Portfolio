import type { Metadata } from "next";
import Image from "next/image";
import { ContactBlock } from "@/components/contact-block";
import { Gallery } from "@/components/gallery";
import { SectionNav } from "@/components/section-nav";
import { Timeline } from "@/components/timeline";
import { Eyebrow, TextLink } from "@/components/ui";
import { chapters, photos } from "@/lib/photos";
import { links, roles, toolkit } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "The whole story: experience, education, EV battery research, mentoring, a filterable timeline and the photographs.",
};

const sections = [
  { id: "story", label: "Story" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "community", label: "Community" },
  { id: "timeline", label: "Timeline" },
  { id: "toolkit", label: "Toolkit" },
  { id: "photos", label: "Photos" },
];

const community = [
  {
    img: "/img/wrstef-judge-2026.jpg",
    alt: "Ahmad with fellow judges at the Windsor Regional Science, Technology & Engineering Fair",
    title: "Science fair judge and mentor",
    org: "Windsor Regional Science, Technology & Engineering Fair · since 2022",
    desc: "Judging team lead, event support, and mentor to the students selected for nationals, at the same fair where I started competing in 2014.",
  },
  {
    img: "/img/genius-cup-2026-arena.jpg",
    alt: "A gym full of young builders at the Genius Cup in Windsor",
    title: "Genius Cup moderator and judge",
    org: "Geniotech Robotics, Windsor · 2025–26",
    desc: "Refereeing and judging student teams through robotics challenges and robot battles.",
  },
  {
    img: "/img/genius-cup-3.jpg",
    alt: "Students working on robotics activities",
    title: "Robotics mentor",
    org: "Alhijra Academy and Windsor-area schools · since 2025",
    desc: "Teaching students to assemble kits, write Arduino and C++, and solve open-ended challenges. These classrooms are where SaySpark came from.",
  },
  {
    img: "/img/cs-games-2.jpg",
    alt: "The University of Windsor delegation at CS Games 2026",
    title: "CS Games team mentor",
    org: "Montréal · 2026",
    desc: "Mentoring the University of Windsor delegation through an inter-university competition in algorithms, AI and systems.",
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-16 first:border-t-0 first:pt-0 sm:py-20">
      <h2 className="mb-10 text-3xl font-medium tracking-[-0.025em] sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-12 sm:pt-20">
        <Eyebrow className="mb-5">About</Eyebrow>
        <h1 className="max-w-4xl text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.03] tracking-[-0.035em]">
          An engineer who kept ending up{" "}
          <span className="font-serif italic tracking-[-0.015em]">at the front of the classroom.</span>
        </h1>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 px-6 pb-24 pt-10 lg:grid-cols-[170px_minmax(0,1fr)]">
        <aside className="sticky top-16 z-30 -mx-6 mb-10 min-w-0 border-b border-line bg-bg/90 px-6 py-3 backdrop-blur-md lg:top-28 lg:mx-0 lg:mb-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <SectionNav items={sections} />
        </aside>

        <div className="min-w-0">
          {/* ---------- Story ---------- */}
          <Section id="story" title="The short version">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                <p className="text-xl leading-relaxed text-ink">
                  I started in 2014 with a science-fair project in Windsor, Ontario. Six regional
                  golds and four trips to the Canada-Wide Science Fair later, I knew I liked two
                  things: making something work, and explaining it to a stranger.
                </p>
                <p>
                  The early projects already pointed where I was headed. One was a plant microbial
                  fuel cell, my first look at energy storage. Another was a glove that translates
                  sign language into speech, my first embedded system. A first hackathon in 2017
                  turned into thirteen more.
                </p>
                <p>
                  At the University of Windsor I studied electrical and computer engineering with a
                  computer science minor, built autonomous drone software at RIIS, worked on the
                  Formula SAE battery pack, and finished with a capstone drone that won Best Demo at
                  IEEE PIMRC. Then two years in the CHARGE Lab on EV battery packs and power
                  electronics with Magna.
                </p>
                <p>
                  The whole time, I was also teaching. Robotics kits and C++ in elementary
                  classrooms, judging the fair I grew up in, refereeing robot battles. That is where
                  I noticed kids understood the engineering long before they could type it, and it
                  is why I started SaySpark. Today I split my time between the company and a MASc in
                  EV battery systems at McMaster.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                  <TextLink href="/#venture">The company</TextLink>
                  <TextLink href={links.resume} external>
                    Résumé (PDF)
                  </TextLink>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-start">
                <figure>
                  <div className="relative aspect-[3/5] overflow-hidden rounded-xl bg-ink/5">
                    <Image
                      src="/img/cwsf-2016-board.jpg"
                      alt="A younger Ahmad beside his plant microbial fuel cell project board at the Canada-Wide Science Fair"
                      fill
                      sizes="(max-width: 1024px) 45vw, 190px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-relaxed text-faint">
                    2016. First national science fair, with a plant microbial fuel cell.
                  </figcaption>
                </figure>
                <figure>
                  <div className="relative aspect-[3/5] overflow-hidden rounded-xl bg-ink/5">
                    <Image
                      src="/img/ieee-epec-poster.jpg"
                      alt="Ahmad beside his EV battery research poster at IEEE EPEC 2025"
                      fill
                      sizes="(max-width: 1024px) 45vw, 190px"
                      className="object-cover object-right"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-relaxed text-faint">
                    2025. Presenting EV battery research at IEEE EPEC.
                  </figcaption>
                </figure>
              </div>
            </div>
          </Section>

          {/* ---------- Experience ---------- */}
          <Section id="experience" title="Experience">
            <ul className="border-t border-line">
              {roles.map((r) => (
                <li key={r.org} className="grid gap-x-10 gap-y-3 border-b border-line py-9 md:grid-cols-[170px_1fr]">
                  <div className="font-mono text-xs leading-relaxed text-faint">
                    <p>{r.dates}</p>
                    <p>{r.place}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">{r.role}</h3>
                    <p className="mt-1 text-[15px] text-accent">
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                          {r.org} ↗
                        </a>
                      ) : (
                        r.org
                      )}
                    </p>
                    <p className="mt-4 max-w-2xl text-[17px] leading-relaxed">{r.summary}</p>
                    <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-faint">
                      {r.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Education ---------- */}
          <Section id="education" title="Education">
            <ul className="border-t border-line">
              <li className="grid gap-x-10 gap-y-3 border-b border-line py-9 md:grid-cols-[170px_1fr]">
                <div className="font-mono text-xs leading-relaxed text-faint">
                  <p>Fall 2026 – present</p>
                  <p>Hamilton</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">MASc, Electrical &amp; Computer Engineering</h3>
                  <p className="mt-1 text-[15px] text-accent">McMaster University</p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                    Graduate research on EV battery systems, continuing the work begun at the CHARGE
                    Lab.
                  </p>
                </div>
              </li>
              <li className="grid gap-x-10 gap-y-3 border-b border-line py-9 md:grid-cols-[170px_1fr]">
                <div className="font-mono text-xs leading-relaxed text-faint">
                  <p>2019 – 2024</p>
                  <p>Windsor</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">BASc, Electrical &amp; Computer Engineering</h3>
                  <p className="mt-1 text-[15px] text-accent">University of Windsor · Minor in Computer Science</p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                    Capstone: the indoor autonomous drone that won Best Demo at IEEE PIMRC 2023.
                    Formula SAE accumulator team. First place in programming at the Windsor
                    Engineering Competition four years running. Iron Ring, 2024.
                  </p>
                </div>
              </li>
            </ul>
          </Section>

          {/* ---------- Research ---------- */}
          <Section id="research" title="Research">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  IEEE EPEC 2025 · Waterloo
                </p>
                <p className="mt-3 font-serif text-[1.7rem] leading-[1.2] sm:text-[2rem]">
                  Dual-Chemistry Load Distribution for EV Battery Systems Using Cascaded H-Bridge
                  Inverters
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  No single cell chemistry is good at everything. One stores a lot of energy but
                  ages quickly under hard bursts; another shrugs off bursts but is heavy for the
                  energy it holds. This work puts both in one pack and uses a cascaded H-bridge
                  inverter to decide, moment to moment, which chemistry carries which part of the
                  load.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-muted">
                  It was carried out at the University of Windsor&apos;s CHARGE Lab with Magna as
                  industry partner, alongside the day-to-day work of designing packs, writing BMS
                  and motor-drive firmware, and helping stand up the university&apos;s battery
                  research laboratory. It continues at McMaster.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 self-start">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-xl bg-ink/5">
                  <Image
                    src="/img/charge-lab-magna-team.jpg"
                    alt="The Magna project team at the CHARGE Lab"
                    fill
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ink/5">
                  <Image
                    src="/img/charge-lab-ev-rnd.jpg"
                    alt="An EV powertrain test rig at the CHARGE Lab"
                    fill
                    sizes="(max-width: 1024px) 45vw, 200px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ink/5">
                  <Image
                    src="/img/charge-lab-battery.jpg"
                    alt="Researchers at test benches in the CHARGE Lab"
                    fill
                    sizes="(max-width: 1024px) 45vw, 200px"
                    className="object-cover"
                  />
                </div>
                <p className="col-span-2 text-xs text-faint">The CHARGE Lab, University of Windsor.</p>
              </div>
            </div>
          </Section>

          {/* ---------- Community ---------- */}
          <Section id="community" title="Community and mentoring">
            <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
              {community.map((c) => (
                <li key={c.title}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-ink/5">
                    <Image src={c.img} alt={c.alt} fill sizes="(max-width: 640px) 100vw, 430px" className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">{c.title}</h3>
                  <p className="mt-1 text-sm text-accent">{c.org}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.desc}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Timeline ---------- */}
          <Section id="timeline" title="Timeline">
            <Timeline />
          </Section>

          {/* ---------- Toolkit ---------- */}
          <Section id="toolkit" title="Toolkit">
            <dl className="border-t border-line">
              {toolkit.map((t) => (
                <div key={t.area} className="grid gap-x-10 gap-y-1 border-b border-line py-5 md:grid-cols-[220px_1fr]">
                  <dt className="text-[15px] font-medium">{t.area}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted">{t.items}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* ---------- Photos ---------- */}
          <Section id="photos" title="Photos">
            <Gallery photos={photos} chapters={chapters} initial={12} />
          </Section>
        </div>
      </div>

      <ContactBlock />
    </main>
  );
}
