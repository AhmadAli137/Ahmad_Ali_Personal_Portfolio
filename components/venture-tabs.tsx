"use client";

import { useState } from "react";
import Image from "next/image";

interface Part {
  id: string;
  tab: string;
  name: string;
  status: string;
  body: string;
  points: string[];
  image: { src: string; alt: string; w: number; h: number; contain?: boolean };
}

/* Product facts mirror sayspark.ca; update both together. */
const parts: Part[] = [
  {
    id: "robot",
    tab: "The robot",
    name: "Spark Mini",
    status: "In development · on sale at launch",
    body: "Robot number one. A child talks to it, and it answers out loud while it drives, measures, sees and solves mazes.",
    points: [
      "Its own microphone and speaker, so there is no screen between the child and the robot",
      "Camera, ultrasonic and motion sensing on board",
      "Designed, wired and programmed in-house",
    ],
    image: { src: "/img/sayspark-robot.png", alt: "Spark, the tutor character, beside the Spark Mini rover", w: 1247, h: 1261, contain: true },
  },
  {
    id: "tutor",
    tab: "The AI tutor",
    name: "Spark",
    status: "Free in early access",
    body: "A real AI tutor that listens, reasons about what the robot senses, and explains the engineering as it happens.",
    points: [
      "Narrates its own decisions: what the camera sees, what the sensor reads, what it will try next",
      "Turns a spoken request into a program the child can read and change",
      "Meets a six-year-old and a sixteen-year-old at their own level",
    ],
    image: { src: "/img/sayspark-vision.jpg", alt: "Two frames from the robot's camera with the tutor's reasoning written beneath each", w: 780, h: 412 },
  },
  {
    id: "simulator",
    tab: "The simulator",
    name: "3D Simulator",
    status: "Free · Desktop Studio 1.0 on Windows",
    body: "A 3D playground for building courses and running programs before any hardware arrives.",
    points: [
      "Build a course from walls, ramps, markers and lights, then run the robot through it",
      "The same tutor and the same programs as the physical robot",
      "macOS, Linux and an Android companion are next",
    ],
    image: { src: "/img/sayspark-simulator.png", alt: "The SaySpark simulator: a maze course, the program steps and the tutor chat", w: 607, h: 326 },
  },
  {
    id: "classroom",
    tab: "The classroom",
    name: "Curriculum and classes",
    status: "Free in early access · pilots free",
    body: "Lessons organized by age band, with activities a whole class joins by code.",
    points: [
      "Three bands: Explorer (6–10), Builder (11–14) and Engineer (15+)",
      "Progress, badges and a class leaderboard for teachers and students",
      "Pilot classrooms get SaySpark free",
    ],
    image: { src: "/img/sayspark-dashboard.png", alt: "The SaySpark student dashboard with lessons grouped by age band", w: 701, h: 400 },
  },
];

export function VentureTabs() {
  const [active, setActive] = useState(0);
  const part = parts[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : parts.length - 1)) % parts.length;
    setActive(next);
    document.getElementById(`venture-tab-${parts[next].id}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="SaySpark product"
        onKeyDown={onKey}
        className="flex gap-x-7 gap-y-1 overflow-x-auto border-b border-stage-line"
      >
        {parts.map((p, i) => (
          <button
            key={p.id}
            id={`venture-tab-${p.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls="venture-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 border-b-2 py-3.5 text-[15px] transition-colors ${
              i === active
                ? "border-stage-ink text-stage-ink"
                : "border-transparent text-stage-muted hover:text-stage-ink"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <div
        key={part.id}
        id="venture-panel"
        role="tabpanel"
        aria-labelledby={`venture-tab-${part.id}`}
        className="rise grid items-center gap-10 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-stage-accent">{part.status}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{part.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-stage-muted">{part.body}</p>
          <ul className="mt-7 divide-y divide-stage-line border-y border-stage-line">
            {part.points.map((pt) => (
              <li key={pt} className="py-3.5 text-[15px] leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex min-h-[260px] items-center justify-center ${part.image.contain ? "" : "sm:min-h-[340px]"}`}>
          <Image
            src={part.image.src}
            alt={part.image.alt}
            width={part.image.w}
            height={part.image.h}
            sizes="(max-width: 1024px) 90vw, 560px"
            className={
              part.image.contain
                ? "h-auto w-full max-w-[340px]"
                : "h-auto w-full max-w-[600px] rounded-xl border border-stage-line"
            }
          />
        </div>
      </div>
    </div>
  );
}
