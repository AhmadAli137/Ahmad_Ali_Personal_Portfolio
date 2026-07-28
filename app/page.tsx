import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
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
  { year: "2018", title: "Started Robotics", desc: "First builds, first competitions — hooked immediately." },
  { year: "", title: "Science Fairs", desc: "Turning curiosity into projects worth presenting." },
  { year: "", title: "National Awards", desc: "Recognition at national-level competitions and innovation awards." },
  { year: "", title: "University of Windsor — Electrical Engineering", desc: "Deepening fundamentals across circuits, control, and software — including the Formula Electric battery team." },
  { year: "", title: "Research — CHARGE Lab", desc: "EV battery systems, EIS, and power electronics at UWindsor's Centre for Hybrid Automotive Research and Green Energy." },
  { year: "", title: "RIIS", desc: "Building intelligent drone software in industry." },
  { year: "", title: "Graduate Research & Teaching", desc: "Advancing EV battery research — presented at IEEE EPEC 2025 — while mentoring the next generation of engineers." },
  { year: "Now", title: "Entrepreneurship — Aibotics", desc: "Founding a venture to make robotics education accessible through natural language." },
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
              <p className="mb-4 font-mono text-[13px] tracking-wider text-mint">
                <span className="text-muted">{"> "}</span>from concept to reality
              </p>
              <h1 className="mb-5 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                Hi, I&apos;m Ahmad Ali.
                <br />
                I build{" "}
                <span className="text-cyan [text-shadow:0_0_24px_rgba(0,229,255,0.5)]">
                  intelligent robots
                </span>
                , AI-powered products, and educational technology that solve real-world problems.
              </h1>
              <p className="mb-4 max-w-xl text-lg text-muted">
                I take ideas from a blank page all the way to working products — combining hardware,
                software, and artificial intelligence into experiences people genuinely enjoy using.
              </p>
              <div className="mb-8 h-6"><TypingRoles /></div>
              <div className="flex flex-wrap gap-3.5">
                <Btn href="/#work" variant="primary">View My Work</Btn>
                <Btn href="/#contact">Let&apos;s Build Something</Btn>
              </div>
            </div>
            <Hud>
              {/* Swap for a robot/drone build photo when available */}
              <Ph
                caption="Ahmad working on an EV powertrain test rig"
                src="/img/charge-lab-ev-rnd.jpg"
                alt="Ahmad working hands-on with an EV motor on a dynamometer test rig at the CHARGE Lab"
                minH="min-h-[460px]"
                className="shadow-[0_0_60px_rgba(0,229,255,0.08)]"
              />
            </Hud>
          </div>

          {/* Stats */}
          <Reveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { num: <CountUp target={20} suffix="+" />, label: "Engineering Projects" },
              { num: <CountUp target={10} suffix="+" />, label: "Awards & Competitions" },
              { num: "IEEE", label: "Best Demo Winner" },
              { num: <CountUp target={13} />, label: "Hackathons" },
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
              <div className="mb-4"><Chip tone="mint">FOUNDER</Chip></div>
              <h3 className="mb-3.5 text-2xl font-bold sm:text-3xl">
                Aibotics — AI-Powered Educational Robotics
              </h3>
              <p className="mb-5 text-muted">
                Years of mentoring elementary students in robotics revealed how intimidating
                syntax-heavy programming is for young learners. I&apos;m building a platform where
                children learn robotics through{" "}
                <strong className="text-ink">natural language</strong> — talk to your robot, and it
                comes to life.
              </p>
              <Btn href="/venture">Explore the Venture →</Btn>
            </div>
            <Ph caption="PHOTO: Aibotics / SaySpark prototype robot" minH="min-h-[420px]" />
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
                    <Ph caption={p.cardCaption} src={p.cardSrc} alt={p.cardCaption} minH="min-h-[190px]" />
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
                    <Award size={13} /> 13 Hackathons — 6 Podium Finishes
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
            {[
              { img: "/img/pimrc-best-demo-award.jpg", award: "Best Demo Award", event: "IEEE PIMRC — Toronto", note: "Indoor autonomous drone navigation" },
              { img: "/img/nasa-space-apps-1.jpg", award: "1st Place — Windsor", event: "NASA Space Apps Challenge", note: "Galactic Problem Solver" },
              { img: "/img/epicentre-award-trophy.jpg", award: "Innovation Mastery Award", event: "EPICentre, UWindsor", note: "Entrepreneurship & innovation" },
              { img: "/img/wec-1st-place.jpg", award: "1st Place — Programming", event: "Windsor Engineering Competition", note: "Competitive programming" },
              { img: "/img/winhacks26-sketchbot-award-2.jpg", award: "Winner (Finalist)", event: "WinHacks 2026", note: "SketchBot — drawing robot" },
              { img: "/img/presentpro-award-1.jpg", award: "2nd Place", event: "WinHacks 2025", note: "PresentPro — AI presentation coach" },
              { img: "/img/secondlife-award.jpg", award: "2nd Place Overall", event: "WinHacks 2024", note: "Second Life — EV battery reuse" },
              { img: "/img/clubhacks-sketchbot-v2-1.jpg", award: "Finalist", event: "ClubHacks 2026", note: "SketchBot V2 — AprilTag tracking" },
            ].map((a, i) => (
              <Reveal key={a.event + a.award} delay={(i % 4) * 0.06}>
                <Card className="flex h-full flex-col gap-3 !p-5">
                  <Ph caption={a.award} src={a.img} alt={`${a.award} — ${a.event}`} minH="min-h-[150px]" />
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
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" className="scroll-mt-20 px-6 py-20">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="experience" title="Where I've Worked" />
          <div className="divide-y divide-[rgba(0,229,255,0.1)]">
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
                <div className="grid max-w-2xl grid-cols-2 gap-4">
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
                desc: "Years of hands-on robotics workshops with hundreds of elementary students — teaching Arduino, C++, and problem solving. These classrooms inspired SaySpark and Aibotics.",
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

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="px-6 py-10">
        <Reveal className="mx-auto max-w-6xl">
          <SectionHeading tag="gallery" title="In the Lab, On the Bench, At the Booth" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { caption: "Receiving the EPICentre Innovation Mastery Award", src: "/img/epicentre-award-stage.jpg" },
              { caption: "EPICentre Innovation Mastery Award", src: "/img/epicentre-award-trophy.jpg" },
              { caption: "Presenting at IEEE EPEC 2025", src: "/img/ieee-epec-poster.jpg" },
              { caption: "Formula Electric battery team, UWindsor", src: "/img/formula-electric-team.jpg" },
              { caption: "Magna project team at the CHARGE Lab", src: "/img/charge-lab-magna-team.jpg" },
              { caption: "1st place, programming — Windsor Engineering Competition", src: "/img/wec-1st-place.jpg" },
              { caption: "Windsor delegation, Ontario Engineering Competition 2024", src: "/img/oec-2024-delegation.jpg" },
              { caption: "Iron Ring ceremony with classmates", src: "/img/iron-ring-classmates.jpg" },
              { caption: "Iron Ring ceremony", src: "/img/iron-ring-ceremony.jpg" },
              { caption: "Graduation, University of Windsor", src: "/img/undergrad-graduation.jpg" },
              { caption: "NASA Space Apps — 1st place, Windsor", src: "/img/nasa-space-apps-1.jpg" },
              { caption: "Mentoring at the Genius Cup", src: "/img/genius-cup-main.jpg" },
            ].map((g) => (
              <Ph key={g.caption} caption={g.caption} src={g.src} alt={g.caption} minH="min-h-[200px]" />
            ))}
          </div>
        </Reveal>
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
