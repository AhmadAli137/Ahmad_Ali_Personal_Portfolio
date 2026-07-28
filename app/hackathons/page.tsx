import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Ph } from "@/components/image-placeholder";
import { Btn, Card, Chip, Chips } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "13 hackathons, 4 podium finishes — full product cycles compressed into 36-hour sprints.",
};

interface Hack {
  award: string;
  awardTone: "amber" | "cyan";
  title: string;
  desc: string;
  chips: string[];
  href: string;
  internal?: boolean;
  img?: string;
  imgAlt?: string;
}

const hacks: Hack[] = [
  {
    award: "WinHacks 2026 — Winner (Finalist)",
    awardTone: "amber",
    title: "SketchBot",
    desc: "Design in pixels, then a robot draws it on paper for real. Camera-vision positioning, ESP32 motor control, Next.js + WebSockets, Gemini-generated designs.",
    chips: ["ESP32", "Camera Vision", "Next.js"],
    href: "/projects/sketchbot",
    internal: true,
    img: "/img/sketchbot-a.jpg",
    imgAlt: "SketchBot drawing robot with marker attachment",
  },
  {
    award: "Hack the 6ix 2026 — Solo Build",
    awardTone: "cyan",
    title: "Edge Pong",
    desc: "Projected ping-pong with an edge-AI-tracked smart paddle — feel each impact through four-quadrant spatial haptics, all processed on-device.",
    chips: ["ESP32-C5", "Haptics", "Three.js"],
    href: "/projects/edge-pong",
    internal: true,
  },
  {
    award: "WinHacks 2025 — 2nd Place",
    awardTone: "amber",
    title: "PresentPro",
    desc: "Real-time presentation coaching: live speech analysis flags pacing over 160 wpm and nudges you through a vibrating IoT wearable. React, FastAPI, AssemblyAI, ESP32.",
    chips: ["AssemblyAI", "FastAPI", "ESP32"],
    href: "https://devpost.com/software/presentpro-w0a5zb",
    img: "/img/presentpro-a.jpg",
    imgAlt: "PresentPro IoT wrist wearable with ESP32 and haptic feedback",
  },
  {
    award: "WinHacks 2024 — 2nd Place Overall",
    awardTone: "amber",
    title: "Second Life",
    desc: "Give your EV battery a second life in a microgrid — a platform to collect, test, and repurpose end-of-life EV batteries for energy storage. Born from my battery research.",
    chips: ["Next.js", "Prisma", "Energy"],
    href: "https://devpost.com/software/winhacks-2024-egl-title-tbd",
    img: "/img/secondlife-award.jpg",
    imgAlt: "Second Life team receiving 2nd place overall at WinHacks 2024",
  },
  {
    award: "NASA Space Apps — 1st Place, Windsor",
    awardTone: "amber",
    title: "Meteor Madness",
    desc: "NASA Space Apps Challenge winner: visualizing near-Earth asteroid data to make planetary defense tangible. Galactic Problem Solver certificate earned.",
    chips: ["NASA Data", "JavaScript", "Visualization"],
    href: "https://github.com/AhmadAli137/meteor-madness-nasa",
    img: "/img/nasa-space-apps-1.jpg",
    imgAlt: "Team holding 1st Place Windsor certificates at the NASA Space Apps Challenge",
  },
  {
    award: "ClubHacks 2026 — Finalist",
    awardTone: "amber",
    title: "SketchBot V2",
    desc: "The drawing robot, rebuilt: AprilTag fiducial tracking for precise camera-vision positioning, 18650 power, and a cleaner chassis.",
    chips: ["AprilTags", "ESP32", "Camera Vision"],
    href: "/projects/sketchbot",
    internal: true,
    img: "/img/clubhacks-sketchbot-v2-1.jpg",
    imgAlt: "SketchBot V2 with AprilTag marker and 18650 battery power",
  },
  {
    award: "Winner",
    awardTone: "amber",
    title: "WinParks",
    desc: "Mobile app helping people explore the trails, parks, and heritage parks of Windsor.",
    chips: ["Mobile", "Maps"],
    href: "https://devpost.com/software/winparks",
    img: "/img/winparks-a.jpg",
    imgAlt: "WinParks mobile app showing Windsor park listings",
  },
  {
    award: "Energy × Software",
    awardTone: "cyan",
    title: "WinGrid",
    desc: "Keeping all the electric vehicles on the grid — managing EV charging load at scale.",
    chips: ["EV", "Grid"],
    href: "https://devpost.com/software/wingrid",
    img: "/img/wingrid-a.jpg",
    imgAlt: "WinGRID mobile app for planning EV charger installations",
  },
  {
    award: "Desktop App",
    awardTone: "cyan",
    title: "Covid-19 Global",
    desc: "Desktop application providing trustworthy Covid-19 statistics from countries around the world.",
    chips: ["Desktop", "Data"],
    href: "https://devpost.com/software/covid-19-global",
    img: "/img/covid-a.png",
    imgAlt: "Covid-19 Global desktop app showing worldwide statistics",
  },
  {
    award: "And more…",
    awardTone: "cyan",
    title: "EcoRoute · wordConquer · WEC · OEC",
    desc: "Route optimization, word games, and engineering competitions — including 1st place in programming at the Windsor Engineering Competition. Repos on GitHub.",
    chips: ["TypeScript", "JavaScript"],
    href: "https://github.com/AhmadAli137",
    img: "/img/wec-1st-place.jpg",
    imgAlt: "1st place in programming at the Windsor Engineering Competition",
  },
];

export default function HackathonsPage() {
  return (
    <main className="px-6 pb-10 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">home / work / hackathons</p>
        <div className="mb-4"><Chip>13 HACKATHONS — 6 PODIUM FINISHES</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Hackathons: Ship It in a Weekend
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted">
          Thirteen hackathons and counting. Some wins, some losses — every one of them a full product
          cycle compressed into 36 hours: idea, hardware, software, pitch. Full history on{" "}
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

        <div className="grid gap-6 md:grid-cols-2">
          {hacks.map((h, i) => {
            const inner = (
              <Card className="flex h-full flex-col gap-3.5">
                {h.img && <Ph caption={h.title} src={h.img} alt={h.imgAlt ?? h.title} minH="min-h-[200px]" />}
                <span
                  className={`flex items-center gap-1.5 font-mono text-xs ${
                    h.awardTone === "amber" ? "text-amber" : "text-cyan"
                  }`}
                >
                  <Award size={13} /> {h.award}
                </span>
                <h3 className="text-lg font-bold">
                  {h.title}{" "}
                  {h.internal ? (
                    <ArrowRight size={18} className="inline text-cyan transition-transform group-hover:translate-x-1.5" />
                  ) : (
                    <ExternalLink size={15} className="inline text-cyan" />
                  )}
                </h3>
                <p className="text-sm text-muted">{h.desc}</p>
                <div className="mt-auto"><Chips items={h.chips} /></div>
              </Card>
            );
            return (
              <Reveal key={h.title} delay={(i % 2) * 0.08}>
                {h.internal ? (
                  <Link href={h.href} className="group block h-full">{inner}</Link>
                ) : (
                  <a href={h.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3.5">
          <Btn href="https://devpost.com/AhmadAli137" external>Full Devpost Profile →</Btn>
          <Btn href="/#work" variant="primary">← All Projects</Btn>
        </div>
      </div>
    </main>
  );
}
