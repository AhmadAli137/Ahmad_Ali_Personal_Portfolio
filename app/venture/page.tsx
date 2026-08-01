import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Ph } from "@/components/image-placeholder";
import { Hud } from "@/components/hud";
import { Btn, Chip } from "@/components/ui";

export const metadata: Metadata = {
  title: "SaySpark",
  description:
    "SaySpark: voice-first robotics for kids. A robot that teaches kids to think like engineers — talk to it, and it comes to life.",
};

const roadmap = [
  { phase: "Shipped", title: "3D Simulator + AI Tutor — Free Early Access", desc: "The browser-based playground and Spark, the AI tutor with age-grouped curriculum lessons, are live now at sayspark.ca." },
  { phase: "Next", title: "Spark Mini Hardware", desc: "The physical robot — microphone, camera, distance sensors, maze-solving — available at official launch." },
  { phase: "Then", title: "Classrooms", desc: "Teacher tools are built (rosters, leaderboards, assessments) — school pilots scale them up." },
  { phase: "Launch", title: "SaySpark Everywhere", desc: "Spark Mini in classrooms and homes." },
];

const architecture = [
  { name: "Spark Mini", desc: "the robot — hears through its own microphone, answers out loud while it drives, measures distances, looks through its camera, and solves mazes" },
  { name: "Spark, the AI tutor", desc: "a real AI tutor that thinks through each command, explains the plan, and teaches engineering reasoning along the way" },
  { name: "3D simulator", desc: "a free browser-based playground — the full SaySpark experience before the hardware arrives" },
  { name: "Classroom tools", desc: "rosters, leaderboards, and assessments so teachers can run SaySpark with a whole class" },
];

export default function VenturePage() {
  return (
    <main className="px-6 pb-10 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">home / venture</p>
        <div className="mb-4"><Chip tone="mint">FOUNDER — LIVE IN EARLY ACCESS</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">SaySpark</h1>
        <p className="mb-6 max-w-2xl text-lg text-muted">
          Voice-first robotics for kids. Talk to <strong className="text-ink">Spark Mini</strong> in
          plain words and it answers out loud while it drives, measures, sees, and solves mazes —
          no syntax, no barriers, just curiosity turned into motion.
        </p>
        <div className="mb-8 flex flex-wrap gap-3.5">
          <Btn href="https://sayspark.ca" variant="primary" external>Visit sayspark.ca ↗</Btn>
          <Btn href="https://sayspark.ca" external>Try the Free Simulator</Btn>
        </div>
        <Hud>
          <div className="relative grid min-h-[460px] place-items-center rounded-xl border border-line-strong bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(52,245,162,0.1),transparent),linear-gradient(160deg,var(--color-panel2),var(--color-panel))] shadow-[0_0_60px_rgba(0,229,255,0.08)]">
            <Image
              src="/img/sayspark-robot.png"
              alt="Spark and the Spark Mini rover — SaySpark's voice-first robots"
              width={520}
              height={520}
              className="h-auto w-full max-w-[460px] object-contain p-6 drop-shadow-[0_0_30px_rgba(0,229,255,0.15)]"
            />
          </div>
        </Hud>

        <Reveal className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Mission</h2>
            <p className="text-muted">
              Make robotics education accessible to every child by removing the biggest barrier:
              syntax-heavy programming. A robot that teaches kids to think like engineers.
            </p>
          </div>
          <div>
            <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Vision</h2>
            <p className="text-muted">
              A world where any curious kid can say &quot;solve the maze&quot; — and watch their
              robot think out loud as it does. Natural language as the on-ramp to real engineering.
            </p>
          </div>
        </Reveal>

        <Reveal className="py-6">
          <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>The Origin Story</h2>
          <div className="max-w-3xl space-y-3.5 text-muted">
            <p>
              For several years I volunteered as a robotics mentor in elementary schools across
              Windsor, Ontario, introducing hundreds of students to robotics through hands-on
              workshops, programming activities, and engineering challenges.
            </p>
            <p>
              Those classrooms revealed a consistent pattern: kids <em>love</em> robots, but
              traditional programming syntax stops many of them cold. A missed semicolon
              shouldn&apos;t be the reason a nine-year-old decides engineering &quot;isn&apos;t for
              them.&quot;
            </p>
            <p>
              That insight became SaySpark — and it ships. The simulator and AI tutor are live in
              free early access at{" "}
              <a href="https://sayspark.ca" target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">
                sayspark.ca
              </a>
              , with the Spark Mini robot arriving at launch.
            </p>
          </div>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-6 font-mono text-lg text-mint"><span className="text-muted">## </span>Roadmap</h2>
          <div className="relative pl-9 before:absolute before:bottom-1.5 before:left-2 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:to-mint before:opacity-35">
            {roadmap.map((r) => (
              <div key={r.phase + r.title} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                <span className="font-mono text-[13px] text-cyan">{r.phase}</span>
                <h3 className="mt-1 text-base font-bold">{r.title}</h3>
                <p className="max-w-xl text-sm text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-5 font-mono text-lg text-mint"><span className="text-muted">## </span>What&apos;s Inside</h2>
          <ul className="max-w-3xl space-y-2.5 text-muted">
            {architecture.map((a) => (
              <li key={a.name}>
                <strong className="text-ink">{a.name}</strong> — {a.desc}
              </li>
            ))}
          </ul>
          {/* TODO: replace with real architecture diagram / product shots */}
          <Ph caption="DIAGRAM: SaySpark architecture / Spark Mini product shots" minH="min-h-[260px]" className="mt-6" />
        </Reveal>

        <Reveal className="py-6">
          <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Market</h2>
          <p className="max-w-3xl text-muted">
            STEM education technology is a growing global market, and robotics kits remain either too
            toy-like to teach real engineering or too complex for young learners. SaySpark sits in
            the gap: real robotics, zero syntax barrier. {/* TODO: add your market numbers */}
          </p>
          <p className="mt-3.5 max-w-3xl text-muted">
            Early recognition: <strong className="text-ink">4th place and $2,500</strong> at the Take
            Your Shot pitch competition (Leamington, 2026).
          </p>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-5 font-mono text-lg text-mint"><span className="text-muted">## </span>Gallery</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              { caption: "The free browser-based 3D simulator", src: "/img/sayspark-simulator.png" },
              { caption: "Student dashboard with Spark, the AI tutor", src: "/img/sayspark-dashboard.png" },
              { caption: "Robot vision — Spark Mini sees the world", src: "/img/sayspark-vision.jpg" },
              { caption: "PHOTO: Spark Mini prototype" },
              { caption: "PHOTO: kids testing the robot" },
              { caption: "VIDEO: demo clip (embed here)" },
            ].map((g) => (
              <Ph key={g.caption} caption={g.caption} src={g.src} alt={g.caption} minH="min-h-[170px]" />
            ))}
          </div>
        </Reveal>

        <Reveal className="py-10">
          <Hud>
            <div className="rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_70%_120%_at_50%_0%,rgba(52,245,162,0.08),transparent),linear-gradient(160deg,var(--color-panel2),var(--color-panel))] px-8 py-14 text-center">
              <h2 className="mb-3.5 text-2xl font-extrabold sm:text-3xl">Everything Here Actually Ships.</h2>
              <p className="mx-auto mb-7 max-w-lg text-muted">
                The simulator and AI tutor are free during early access. Educators, investors, and
                collaborators — let&apos;s talk.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Btn href="https://sayspark.ca" variant="primary" external>Visit sayspark.ca ↗</Btn>
                <Btn href="mailto:ahmad100307@gmail.com" external>Get in Touch</Btn>
              </div>
            </div>
          </Hud>
        </Reveal>
      </div>
    </main>
  );
}
