import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { Ph } from "@/components/image-placeholder";
import { Hud } from "@/components/hud";
import { Btn, Chip } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aibotics",
  description:
    "Aibotics: AI-powered educational robotics. Kids learn robotics through natural language instead of syntax-heavy programming.",
};

const roadmap = [
  { phase: "Phase 1", title: "Prototype & Validation", desc: "Working prototype hardware + natural-language control loop. Classroom pilot feedback." },
  { phase: "Phase 2", title: "Product Design & Manufacturing", desc: "Design for manufacturing, injection molding considerations, safety certification." },
  { phase: "Phase 3", title: "Pilot Programs", desc: "School partnerships and structured curriculum." },
  { phase: "Phase 4", title: "Launch", desc: "Bring Aibotics to classrooms and homes." },
];

const architecture = [
  { name: "Natural-language layer", desc: "LLM-powered interpretation of a child's spoken or typed intent into safe robot behaviors" },
  { name: "Robot firmware", desc: "embedded control for motors, sensors, and safety limits" },
  { name: "Companion software", desc: "guided learning experiences that grow from natural language toward real code" },
  { name: "Hardware platform", desc: "designed for small hands, classroom durability, and low cost" },
];

export default function VenturePage() {
  return (
    <main className="px-6 pb-10 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">home / venture</p>
        <div className="mb-4"><Chip tone="mint">FOUNDER — CURRENT VENTURE</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">Aibotics</h1>
        <p className="mb-6 max-w-2xl text-lg text-muted">
          AI-powered educational robotics. Children learn to build and program robots through{" "}
          <strong className="text-ink">natural language</strong> — no syntax, no barriers, just
          curiosity turned into motion.
        </p>
        <Hud>
          <Ph caption="HERO PHOTO: Aibotics robot prototype (large, high quality)" minH="min-h-[460px]" className="shadow-[0_0_60px_rgba(0,229,255,0.08)]" />
        </Hud>

        <Reveal className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Mission</h2>
            <p className="text-muted">
              Make robotics education accessible to every child by removing the biggest barrier:
              syntax-heavy programming. Technology should feel empowering, not intimidating.
            </p>
          </div>
          <div>
            <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Vision</h2>
            <p className="text-muted">
              A world where any curious kid can say &quot;make the robot follow the light&quot; — and
              watch it happen. Natural language as the on-ramp to real engineering.
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
              That insight became SaySpark — a platform for learning robotics through natural
              language — and has grown into Aibotics, the venture bringing it to market.
            </p>
          </div>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-6 font-mono text-lg text-mint"><span className="text-muted">## </span>Roadmap</h2>
          <div className="relative pl-9 before:absolute before:bottom-1.5 before:left-2 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:to-mint before:opacity-35">
            {roadmap.map((r) => (
              <div key={r.phase} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                <span className="font-mono text-[13px] text-cyan">{r.phase}</span>
                <h3 className="mt-1 text-base font-bold">{r.title}</h3>
                <p className="max-w-xl text-sm text-muted">{r.desc} {/* TODO: current status */}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-5 font-mono text-lg text-mint"><span className="text-muted">## </span>Technical Architecture</h2>
          <ul className="max-w-3xl space-y-2.5 text-muted">
            {architecture.map((a) => (
              <li key={a.name}>
                <strong className="text-ink">{a.name}</strong> — {a.desc}
              </li>
            ))}
          </ul>
          {/* TODO: replace with real architecture diagram */}
          <Ph caption="DIAGRAM: Aibotics technical architecture" minH="min-h-[260px]" className="mt-6" />
        </Reveal>

        <Reveal className="py-6">
          <h2 className="mb-3.5 font-mono text-lg text-mint"><span className="text-muted">## </span>Market</h2>
          <p className="max-w-3xl text-muted">
            STEM education technology is a growing global market, and robotics kits remain either too
            toy-like to teach real engineering or too complex for young learners. Aibotics sits in the
            gap: real robotics, zero syntax barrier. {/* TODO: add your market numbers */}
          </p>
          <p className="mt-3.5 max-w-3xl text-muted">
            Early recognition: <strong className="text-ink">4th place and $2,500</strong> at the Take
            Your Shot pitch competition (Leamington, 2026).
          </p>
        </Reveal>

        <Reveal className="py-10">
          <h2 className="mb-5 font-mono text-lg text-mint"><span className="text-muted">## </span>Prototype Gallery</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[
              "PHOTO: prototype v1",
              "PHOTO: internals / electronics",
              "PHOTO: kids testing the robot",
              "VIDEO: demo clip (embed here)",
              "PHOTO: CAD renders",
              "PHOTO: iteration wall / whiteboard",
            ].map((c) => (
              <Ph key={c} caption={c} minH="min-h-[170px]" />
            ))}
          </div>
        </Reveal>

        <Reveal className="py-10">
          <Hud>
            <div className="rounded-2xl border border-line-strong bg-[radial-gradient(ellipse_70%_120%_at_50%_0%,rgba(0,229,255,0.07),transparent),linear-gradient(160deg,var(--color-panel2),var(--color-panel))] px-8 py-14 text-center">
              <h2 className="mb-3.5 text-2xl font-extrabold sm:text-3xl">Follow the Journey</h2>
              <p className="mx-auto mb-7 max-w-lg text-muted">
                Aibotics is being built in the open. Investors, educators, and collaborators —
                let&apos;s talk.
              </p>
              <div className="flex flex-wrap justify-center gap-3.5">
                <Btn href="mailto:ahmad100307@gmail.com" variant="primary" external>Get in Touch</Btn>
                <Btn href="/#work">Back to Projects</Btn>
              </div>
            </div>
          </Hud>
        </Reveal>
      </div>
    </main>
  );
}
