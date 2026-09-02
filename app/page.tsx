import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import { DroneShowcase } from "@/components/drone-showcase";
import { Reveal } from "@/components/reveal";
import { TypingRoles } from "@/components/typing";
import { CountUp } from "@/components/count-up";
import { Ph } from "@/components/image-placeholder";
import { Hud } from "@/components/hud";
import { Btn, Card, Chip, Chips, SectionHeading } from "@/components/ui";
import { projects, featuredSlugs } from "@/lib/projects";

const focusAreas = [
  "Robotics",
  "Edge AI",
  "Computer Vision",
  "Embedded Systems",
  "AI Applications",
  "Product Design",
  "Entrepreneurship",
];

const skillGroups: { name: string; items: string[] }[] = [
  { name: "AI", items: ["OpenAI APIs", "Local LLMs", "Prompt Engineering", "AI Agents", "Computer Vision"] },
  { name: "Software", items: ["Python", "C++", "Kotlin", "React", "Next.js", "Node.js"] },
  { name: "Embedded", items: ["STM32", "Arduino", "ESP32", "PCB Design", "FreeRTOS", "Embedded Linux"] },
  { name: "Robotics", items: ["ROS", "Motion Control", "Motor Drivers", "Sensors", "SLAM"] },
  { name: "Manufacturing", items: ["CAD", "Fusion 360", "3D Printing", "Rapid Prototyping", "Injection Molding"] },
  { name: "Hardware", items: ["Battery Systems", "Circuit Design", "Power Electronics", "Electronics Testing"] },
];

const services: { title: string; desc: string }[] = [
  { title: "Robotics Consulting", desc: "Helping teams prototype robots and embedded systems from concept to demo." },
  { title: "AI Product Development", desc: "Designing AI-powered software and hardware experiences from concept to prototype." },
  { title: "Embedded Systems", desc: "Firmware, sensors, microcontrollers, and hardware integration." },
  { title: "Computer Vision", desc: "Camera-based automation, perception, and edge AI solutions." },
  { title: "Speaking & Workshops", desc: "Robotics, AI, entrepreneurship, engineering design, and STEM education." },
  { title: "Mentorship", desc: "Guidance for engineering students, hackathon teams, and early-stage founders." },
];

const timeline: { year: string; title: string; desc: string }[] = [
  { year: "2014", title: "First Science Fair", desc: "The start of six gold-medal years at the Windsor Regional Science Fair." },
  { year: "2015", title: "The National Stage", desc: "Canada-Wide Science Fair: four finals appearances, two bronze, a silver, and a $10k UOttawa scholarship." },
  { year: "2017", title: "First Hackathon, First Win", desc: "WeatherPy takes 1st place at Bordercity Hackathon — the start of a decade of building under pressure." },
  { year: "", title: "University of Windsor — Electrical Engineering", desc: "Circuits, control, and software — plus the Formula SAE accumulator team and four straight WEC programming titles." },
  { year: "2023", title: "IEEE PIMRC Best Demo — Toronto", desc: "The capstone indoor autonomous drone wins Best Demo; EPICentre awards the Innovation Mastery Award." },
  { year: "", title: "RIIS", desc: "Building intelligent drone software in industry." },
  { year: "", title: "Graduate Research — CHARGE Lab", desc: "EV battery systems with Magna — presented at IEEE EPEC 2025 in Waterloo." },
  { year: "2025", title: "NASA Space Apps — 1st + Global Nomination", desc: "Meteor Madness wins Windsor and earns a global nomination; JLR competition earns an internship." },
  { year: "Now", title: "Entrepreneurship — SaySpark", desc: "Founding SaySpark (sayspark.ca): voice-first robotics education, live in early access — and mentoring the next generation along the way." },
  { year: "Fall 2026", title: "McMaster University", desc: "Starting the next chapter in Hamilton." },
];

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="flex min-h-screen items-center px-6 pb-16 pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <p className="mb-4 font-mono text-[13px] tracking-wider text-mint">
                  <span className="text-muted">{"> "}</span>from concept to reality
                </p>
                <h1 className="mb-5 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                  Hi, I&apos;m Ahmad Ali.
                  <br />
                  I build <span className="holo-text">intelligent robots</span>, AI-powered products,
                  and educational technology that solve real-world problems.
                </h1>
                <p className="mb-4 max-w-xl text-lg text-muted">
                  I take ideas from a blank page all the way to working products — combining
                  hardware, software, and artificial intelligence into experiences people genuinely
                  enjoy using.
                </p>
                <div className="mb-8 h-6"><TypingRoles /></div>
                <div className="flex flex-wrap gap-3.5">
                  <Btn href="/#work" variant="primary">View My Work</Btn>
                  <Btn href="/#contact">Let&apos;s Build Something</Btn>
                </div>
              </Reveal>
            </div>
            <Hud>
              <div className="grid grid-cols-2 gap-3">
                <Ph
                  caption="Ahmad with the EPICentre Innovation Mastery Award"
                  src="/img/founder.jpg"
                  alt="Ahmad holding the EPICentre Innovation Mastery Award"
                  minH="min-h-[460px]"
                  className="shadow-[0_0_60px_rgba(0,229,255,0.08)]"
                />
                <div className="flex flex-col gap-3">
                  <Ph
                    caption="At work on an EV powertrain test rig"
                    src="/img/charge-lab-ev-rnd.jpg"
                    alt="Ahmad working hands-on with an EV motor on a dynamometer test rig at the CHARGE Lab"
                    minH="min-h-[224px]"
                  />
                  <Ph
                    caption="Running a robot battle at the Genius Cup"
                    src="/img/genius-cup-robot-battle.jpg"
                    alt="Ahmad refereeing a robot battle at the Genius Cup as students watch"
                    minH="min-h-[224px]"
                  />
                </div>
              </div>
            </Hud>
          </div>

          {/* Stats */}
          <Reveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { num: <CountUp target={20} suffix="+" />, label: "Engineering Projects" },
              { num: <CountUp target={44} />, label: "Competitions & Conferences" },
              { num: "IEEE", label: "Best Demo Winner" },
              { num: <CountUp target={14} />, label: "Hackathons" },
              { num: "Founder", label: "Educational Robotics Venture" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-line bg-[linear-gradient(160deg,var(--color-panel2),var(--color-panel))] px-5 py-5 text-center transition-all hover:-translate-y-1 hover:border-line-strong"
              >
                <div className="font-mono text-2xl font-bold text-cyan [text-shadow:0_0_18px_rgba(0,229,255,0.4)]">
                  {s.num}
                </div>
                <div className="mt-1.5 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ 3D SIGNATURE: THE DRONE ============ */}
      <DroneShowcase />

      {/* ============ ABOUT ============ */}
      <section id="about" className="scroll-mt-20 px-6 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="about" title="Why I Build" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                I&apos;ve always believed technology should feel{" "}
                <strong>empowering rather than intimidating</strong>.
              </p>
              <p className="text-muted">
                From autonomous drones and battery systems to AI-powered educational robots, I create
                products that combine hardware, software, and artificial intelligence into experiences
                that people genuinely enjoy using. My work spans robotics, embedded systems, computer
                vision, and product design — which means I can take an idea from concept to a fully
                functional prototype, and then toward a real product.
              </p>
              <p className="font-mono text-sm text-mint">
                My goal is simple: build technology that inspires curiosity while solving meaningful problems.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-sm text-cyan">
                <span className="text-muted">[ </span>current focus<span className="text-muted"> ]</span>
              </h3>
              <Chips items={focusAreas} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ FEATURED VENTURE ============ */}
      <section className="px-6 py-10">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="featured venture" title="Currently Building" />
          <div className="grid items-center gap-9 rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_60%_100%_at_100%_0%,rgba(52,245,162,0.08),transparent),linear-gradient(160deg,var(--color-panel2),var(--color-panel))] p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4"><Chip tone="mint">FOUNDER — LIVE IN EARLY ACCESS</Chip></div>
              <h3 className="mb-3.5 text-2xl font-bold sm:text-3xl">
                SaySpark — Voice-First Robotics for Kids
              </h3>
              <p className="mb-5 text-muted">
                A robot that teaches kids to think like engineers. Talk to{" "}
                <strong className="text-ink">Spark Mini</strong> and it answers out loud while it
                drives, measures, sees, and solves mazes — powered by a real AI tutor. The free 3D
                simulator and tutor are live now.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Btn href="https://sayspark.ca" variant="primary" external>Visit sayspark.ca ↗</Btn>
                <Btn href="/venture">The Story →</Btn>
              </div>
            </div>
            <div className="relative grid min-h-[420px] place-items-center">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(52,245,162,0.12),transparent)]" />
              <Image
                src="/img/sayspark-robot.png"
                alt="Spark and the Spark Mini rover — SaySpark's voice-first robots"
                width={480}
                height={480}
                className="relative h-auto w-full max-w-[420px] object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section id="work" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              tag="featured projects"
              title="From Blank Page to Working Product"
              lede="Every project here started as an observation of a real-world problem and became a working prototype through CAD, electronics, firmware, software, and relentless iteration."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <Link href={`/projects/${p.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col gap-4">
                    <div className="relative">
                      <Ph caption={p.cardCaption} src={p.cardSrc} alt={p.cardCaption} minH="min-h-[190px]" />
                      {p.demoUrl && (
                        <span className="absolute inset-0 grid place-items-center rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <span className="rounded-full bg-cyan px-5 py-2.5 font-mono text-xs font-bold text-[#04252b] shadow-[0_0_24px_rgba(0,229,255,0.5)]">
                            ▶ TRY IT NOW
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-amber">
                      <Award size={13} /> {p.badge.replace("★ ", "")}
                    </span>
                    <h3 className="text-lg font-bold">
                      {p.title}{" "}
                      <ArrowRight
                        size={18}
                        className="inline text-cyan transition-transform group-hover:translate-x-1.5"
                      />
                    </h3>
                    <p className="text-sm text-muted">{p.cardBlurb}</p>
                    <div className="mt-auto"><Chips items={p.chips.slice(0, 3)} /></div>
                  </Card>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <Link href="/hackathons" className="group block h-full">
                <Card className="flex h-full flex-col gap-4">
                  <Ph caption="PHOTO: Hackathon team / demo booth" minH="min-h-[190px]" />
                  <span className="flex items-center gap-1.5 font-mono text-xs text-amber">
                    <Award size={13} /> 14 Hackathons Since 2017
                  </span>
                  <h3 className="text-lg font-bold">
                    Hackathon Projects{" "}
                    <ArrowRight
                      size={18}
                      className="inline text-cyan transition-transform group-hover:translate-x-1.5"
                    />
                  </h3>
                  <p className="text-sm text-muted">
                    PresentPro, Second Life, WinParks, and more — full product cycles compressed into
                    36-hour sprints, wins and losses alike.
                  </p>
                  <div className="mt-auto"><Chips items={["Rapid Prototyping", "Teamwork"]} /></div>
                </Card>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ AWARDS ============ */}
      <section id="awards" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              tag="awards"
              title="The Trophy Shelf"
              lede="From international conferences to weekend hackathons — proof that shipping fast and shipping well aren't opposites."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([
              { img: "/img/pimrc-best-demo-award.jpg", award: "Best Demo Award", event: "IEEE PIMRC 2023 — Toronto", note: "Indoor autonomous drone navigation" },
              { img: "/img/nasa-space-apps-1.jpg", award: "1st Place + Global Nomination", event: "NASA Space Apps 2025", note: "Meteor Madness" },
              { caption: "PHOTO: CWSF medals", award: "2× Bronze · Silver · $10k Scholarship", event: "Canada-Wide Science Fair", note: "Four national finals, 2015–2019" },
              { img: "/img/epicentre-award-trophy.jpg", award: "Innovation Mastery Award + $1,000", event: "EPICentre Excellence Awards 2023", note: "Entrepreneurship & innovation" },
            ] as { img?: string; caption?: string; award: string; event: string; note: string }[]).map((a, i) => (
              <Reveal key={a.event + a.award} delay={(i % 4) * 0.06}>
                <Card className="flex h-full flex-col gap-3 !p-5">
                  <Ph caption={a.caption ?? a.award} src={a.img} alt={`${a.award} — ${a.event}`} minH="min-h-[150px]" />
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-amber">
                      <Award size={13} /> {a.award}
                    </div>
                    <div className="mt-1 text-sm font-bold">{a.event}</div>
                    <div className="text-xs text-muted">{a.note}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Btn href="/competitions">All 44 Competitions — The Full Record &amp; The Wall →</Btn>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" className="scroll-mt-20 px-6 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="experience" title="Where I've Worked" />
          <div className="divide-y divide-[rgba(0,229,255,0.1)]">
            <div className="grid gap-4 py-7 md:grid-cols-[200px_1fr] md:gap-7">
              <div className="font-mono text-xs text-muted">
                <span className="block text-[13px] text-mint">Education</span>
                Fall 2026 →
              </div>
              <div>
                <div className="mb-3 inline-block rounded-lg bg-white/90 p-2.5">
                  <Image
                    src="/img/logos/mcmaster.png"
                    alt="McMaster University"
                    width={180}
                    height={45}
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold">McMaster University — Hamilton, Ontario</h3>
                <p className="mb-3 text-sm text-muted">
                  Starting at McMaster this fall — the next chapter after the University of Windsor
                  and the CHARGE Lab. {/* TODO: program name + focus */}
                </p>
              </div>
            </div>

            <div className="grid gap-4 py-7 md:grid-cols-[200px_1fr] md:gap-7">
              <div className="font-mono text-xs text-muted">
                <span className="block text-[13px] text-mint">Software Engineering</span>
                {/* TODO: company + dates */}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">Software Engineer — Intelligent Drone Systems</h3>
                <p className="mb-3 text-sm text-muted">
                  Built software for intelligent drone systems: scalable architectures, user
                  interfaces, cloud integration, and applications that interact seamlessly with
                  physical hardware. Rapid iteration from prototype to polished product.
                </p>
                <Chips items={["Python", "C++", "Kotlin", "Cloud", "Embedded"]} />
              </div>
            </div>

            <div className="grid gap-4 py-7 md:grid-cols-[200px_1fr] md:gap-7">
              <div className="font-mono text-xs text-muted">
                <span className="block text-[13px] text-mint">Graduate Research</span>
                University of Windsor — CHARGE Lab
                {/* TODO: dates */}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">
                  Battery Systems Researcher — EV Battery &amp; Power Electronics
                </h3>
                <p className="mb-3 text-sm text-muted">
                  EV battery research at the CHARGE Lab (Centre for Hybrid Automotive Research and
                  Green Energy): experimental battery testing, electrochemical impedance spectroscopy
                  (EIS), battery characterization, and hybrid energy storage concepts.
                </p>
                <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li>
                    Presented &quot;Dual-Chemistry Load Distribution for EV Battery Systems Using
                    Cascaded H-Bridge Inverters&quot; at IEEE EPEC 2025
                  </li>
                  <li>Industry-partnered research with Magna on EV powertrain systems</li>
                  <li>Hands-on with battery cyclers, EIS equipment, and dynamometer test rigs</li>
                </ul>
                <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
                  <Ph
                    caption="CHARGE Lab"
                    src="/img/charge-lab-battery.jpg"
                    alt="The CHARGE Lab at the University of Windsor with researchers at test benches"
                    minH="min-h-[180px]"
                  />
                  <Ph
                    caption="IEEE EPEC 2025"
                    src="/img/ieee-epec-poster.jpg"
                    alt="Ahmad presenting his EV battery systems research poster at IEEE EPEC 2025"
                    minH="min-h-[180px]"
                  />
                  <Ph
                    caption="Magna project team"
                    src="/img/charge-lab-magna-team.jpg"
                    alt="The Magna project team at the CHARGE Lab"
                    minH="min-h-[180px]"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 py-7 md:grid-cols-[200px_1fr] md:gap-7">
              <div className="font-mono text-xs text-muted">
                <span className="block text-[13px] text-mint">Teaching &amp; Mentorship</span>
                Windsor, Ontario
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">Robotics Mentor — Elementary Schools</h3>
                <p className="mb-3 text-sm text-muted">
                  Helped hundreds of elementary students discover engineering through hands-on
                  robotics and programming — teaching Arduino, C++, and engineering problem solving.
                  Watching young learners struggle with syntax-heavy programming directly inspired my
                  current venture. Also active as a judge and mentor across the community: Genius Cup
                  robotics, CS Games (Montreal), and the Windsor Regional Science, Technology &amp;
                  Engineering Fair.
                </p>
                <Chips items={["Arduino", "C++", "STEM Education"]} tone="mint" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ COMMUNITY & MENTORSHIP ============ */}
      <section id="community" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              tag="community"
              title="Giving the Spark Away"
              lede="Engineering only matters if it reaches people. Mentoring, judging, and teaching are how I pay forward what robotics gave me."
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                img: "/img/genius-cup-main.jpg",
                alt: "Ahmad mentoring young students with robots at the Genius Cup competition",
                title: "Genius Cup — Robotics Mentor & Judge",
                org: "RobotFest × Geniotech Robotics, Windsor",
                desc: "Mentoring and judging young builders at Windsor's Genius Cup robotics competition — watching kids light up when their robot moves for the first time never gets old.",
              },
              {
                img: "/img/wrstef-judge-2026.jpg",
                alt: "Ahmad with fellow judges at the Windsor Regional Science, Technology & Engineering Fair",
                title: "Science Fair Judge & Mentor",
                org: "Windsor Regional Science, Technology & Engineering Fair",
                desc: "Judging and mentoring at the regional fair that feeds into the Canada-Wide Science Fair — the same competition circuit where my own journey started.",
              },
              {
                img: "/img/cs-games-1.jpg",
                alt: "CS Games 2026 logo",
                title: "CS Games — Team Mentor",
                org: "Montreal, 2026",
                desc: "Mentoring the University of Windsor delegation at CS Games, an inter-university computer science competition spanning algorithms, AI, and systems challenges.",
              },
              {
                img: "/img/genius-cup-3.jpg",
                alt: "Students working on robotics activities at a community event",
                title: "Elementary Robotics Mentor",
                org: "Windsor-area schools",
                desc: "Years of hands-on robotics workshops with hundreds of elementary students — teaching Arduino, C++, and problem solving. These classrooms inspired SaySpark.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <Card className="flex h-full flex-col gap-4">
                  <Ph caption={c.title} src={c.img} alt={c.alt} minH="min-h-[230px]" />
                  <div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <div className="mb-2 font-mono text-xs text-mint">{c.org}</div>
                    <p className="text-sm text-muted">{c.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section id="timeline" className="scroll-mt-20 px-6 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="journey" title="The Path So Far" />
          <div className="relative pl-9 before:absolute before:bottom-1.5 before:left-2 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:to-mint before:opacity-35">
            {timeline.map((t, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                {t.year && <span className="font-mono text-[13px] text-cyan">{t.year}</span>}
                <h3 className="mt-1 text-base font-bold">{t.title}</h3>
                <p className="max-w-xl text-sm text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading tag="skills" title="The Full Stack — Silicon to Cloud" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.name} delay={(i % 3) * 0.08}>
                <Card className="h-full">
                  <h3 className="mb-3.5 font-mono text-sm text-cyan">
                    <span className="text-muted">[ </span>{g.name}<span className="text-muted"> ]</span>
                  </h3>
                  <Chips items={g.items} />
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="scroll-mt-20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading tag="services" title="Work With Me" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <Card className="h-full">
                  <h3 className="mb-2.5 text-base font-bold">
                    <span className="text-mint">▸ </span>{s.title}
                  </h3>
                  <p className="text-sm text-muted">{s.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="scroll-mt-20 px-6 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <Hud>
            <div className="rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_70%_120%_at_50%_0%,rgba(0,229,255,0.07),transparent),linear-gradient(160deg,var(--color-panel2),var(--color-panel))] px-8 py-16 text-center">
              <h2 className="mb-3.5 text-3xl font-extrabold sm:text-4xl">Let&apos;s Build Something.</h2>
              <p className="mx-auto mb-7 max-w-lg text-muted">
                Whether you&apos;re hiring, investing, collaborating, or just curious about robots —
                I&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Btn href="mailto:ahmad100307@gmail.com" variant="primary" external>Email Me</Btn>
                <Btn href="https://www.linkedin.com/in/ahmad-a-658008170/" external>LinkedIn</Btn>
                <Btn href="https://github.com/AhmadAli137" external>GitHub</Btn>
                <Btn href="https://devpost.com/AhmadAli137" external>Devpost</Btn>
                {/* TODO: add resume PDF to /public and link it */}
              </div>
            </div>
          </Hud>
        </Reveal>
      </section>
    </main>
  );
}
