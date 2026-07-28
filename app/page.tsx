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
  { year: "", title: "University — Electrical Engineering", desc: "Deepening fundamentals across circuits, control, and software." },
  { year: "", title: "Research", desc: "EV battery systems, EIS, and power electronics in the lab." },
  { year: "", title: "RIIS", desc: "Building intelligent drone software in industry." },
  { year: "", title: "Graduate Research & Teaching", desc: "Advancing battery research while mentoring the next generation of engineers." },
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
              {/* TODO: swap for a real photo — you working on a robot/prototype */}
              <Ph caption="PHOTO: Ahmad working on a robot / drone prototype" minH="min-h-[460px]" className="shadow-[0_0_60px_rgba(0,229,255,0.08)]" />
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
                    <Ph caption={p.cardCaption} minH="min-h-[190px]" />
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
                    <Award size={13} /> 13 Hackathons — 4 Podium Finishes
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
                {/* TODO: university + dates */}
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">
                  Battery Systems Researcher — EV Battery &amp; Power Electronics
                </h3>
                <p className="mb-3 text-sm text-muted">
                  Contributed to experimental battery testing, electrochemical impedance spectroscopy
                  (EIS), battery characterization, and hybrid energy storage concepts in a research
                  laboratory environment.
                </p>
                <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted">
                  <li>Hands-on with battery cyclers, EIS equipment, and advanced lab instrumentation</li>
                  <li>Battery management systems and power electronics for electric vehicles</li>
                  <li>Scientific experimentation and engineering research methodology</li>
                </ul>
                <Ph caption="PHOTOS: battery cyclers, EIS setup, lab, test graphs" minH="min-h-[160px]" className="max-w-lg" />
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
                  current venture.
                </p>
                <Chips items={["Arduino", "C++", "STEM Education"]} tone="mint" />
              </div>
            </div>
          </div>
        </Reveal>
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
              "PHOTO: soldering at the bench",
              "PHOTO: drone flight test",
              "PHOTO: battery lab",
              "PHOTO: teaching robotics class",
              "PHOTO: competition / demo booth",
              "PHOTO: CAD / whiteboard session",
            ].map((c) => (
              <Ph key={c} caption={c} minH="min-h-[180px]" />
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
