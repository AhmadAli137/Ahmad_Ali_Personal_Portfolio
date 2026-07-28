export interface ProjectLink {
  label: string;
  href: string;
}

export interface GalleryItem {
  caption: string;
  src?: string;
}

export interface Project {
  slug: string;
  title: string;
  badge: string;
  badgeTone: "cyan" | "mint" | "amber";
  tagline: string;
  cardBlurb: string;
  cardCaption: string;
  cardSrc?: string;
  chips: string[];
  heroCaption: string;
  heroSrc?: string;
  problem: string;
  solution: string;
  demoCaption?: string;
  demoNote?: string;
  features: string[];
  stack: string[];
  challenges: string[];
  lessons: string[];
  next?: string;
  gallery: GalleryItem[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "drone",
    title: "Indoor Autonomous Drone",
    badge: "IEEE BEST DEMO AWARD",
    badgeTone: "amber",
    tagline:
      "A drone that navigates autonomously where GPS can't reach — using optical flow, camera vision, and custom embedded firmware.",
    cardBlurb:
      "GPS-denied navigation using optical flow, camera vision, and custom embedded firmware.",
    cardCaption: "Drone team at IEEE PIMRC, Toronto",
    cardSrc: "/img/pimrc-best-demo-award.jpg",
    chips: ["Optical Flow", "Computer Vision", "Embedded Firmware", "Sensor Fusion", "Control Systems"],
    heroCaption: "Capstone presentation day — the drone with our project poster",
    heroSrc: "/img/capstone-drone-team.jpg",
    problem:
      "GPS doesn't work indoors. Warehouses, hospitals, disaster zones — the environments where autonomous drones could help most are exactly where satellite positioning fails. Indoor autonomy demands the drone perceive and localize itself using only onboard sensing.",
    solution:
      "A drone that fuses optical flow, camera vision, and inertial data to estimate position and navigate autonomously in GPS-denied environments — with the perception and control loops running on embedded hardware onboard.",
    demoCaption: "VIDEO: autonomous flight demo (embed here)",
    features: [
      "GPS-denied position estimation via optical flow",
      "Camera-based perception for navigation",
      "Sensor fusion of vision + inertial measurements",
      "Custom embedded firmware for real-time control",
      "Autonomous flight without external tracking systems",
    ],
    stack: ["C / C++", "Python", "OpenCV", "Optical Flow Sensors", "IMU", "Flight Controller"],
    challenges: [
      "Drift accumulation in optical-flow position estimates",
      "Real-time constraints on embedded compute",
      "Tuning control loops for stable indoor flight",
    ],
    lessons: ["TODO: your real war stories from flight testing"],
    next: "Recognition: Best Demo Award at IEEE PIMRC in Toronto. Built as our University of Windsor capstone project: flight controller design, positioning, and obstacle avoidance.",
    gallery: [
      { caption: "Best Demo Award — IEEE PIMRC, Toronto", src: "/img/pimrc-best-demo-award.jpg" },
      { caption: "Capstone presentation day, University of Windsor", src: "/img/capstone-drone-team.jpg" },
      { caption: "PHOTO: flight test / electronics close-up" },
    ],
    links: [],
  },
  {
    slug: "sketchbot",
    title: "SketchBot",
    badge: "WINHACKS 2026 — WINNER (FINALIST)",
    badgeTone: "amber",
    tagline:
      "Design in pixels, then a robot draws it on paper for real. A camera-vision robot that renders your sketches — and AI-generated art — with a marker on a blank canvas.",
    cardBlurb:
      "Design in pixels, then a robot draws it on paper for real — camera-vision positioning, AI-generated art, ESP32 motor control.",
    cardCaption: "SketchBot drawing robot",
    cardSrc: "/img/sketchbot-b.jpg",
    chips: ["ESP32", "Arduino", "Camera Vision", "Next.js", "WebSockets", "Gemini", "Python"],
    heroCaption: "SketchBot — ESP32 drawing robot with marker attachment",
    heroSrc: "/img/sketchbot-a.jpg",
    problem:
      "Robotics should be fun and accessible. We loved flying drones, but wanted something more approachable — a compact robot that creates designs for entertainment and education, especially to help children learn by watching their ideas become real.",
    solution:
      "A web app where you sketch a design (or generate one with AI), streamed over WebSockets to a physical robot that drives across the paper and draws it with a marker — using camera vision to know exactly where it is on the page.",
    demoCaption: "VIDEO: SketchBot drawing a design (embed here)",
    demoNote: "Live web app: sketch-bot-xldd.vercel.app",
    features: [
      "Pixel-grid design canvas in the browser, with AI-generated designs via Gemini",
      "Real-time sketch transfer to the robot over WebSockets",
      "Camera-vision positioning — the robot sees where it is on the paper and corrects course",
      "ESP32 + Arduino motor control for precise drawing",
      "Design storage with SQLite",
    ],
    stack: ["Next.js", "SQLite", "WebSockets", "ESP32", "Arduino", "Python", "Gemini API"],
    challenges: [
      "Motor malfunctions mid-hackathon and Arduino programming complications",
      "Calibrating camera vision for accurate on-paper positioning",
      "AI prompt integration and canvas rendering quirks",
    ],
    lessons: [
      "Motor engineering and closed-loop correction beat open-loop precision",
      "WebSockets make hardware feel alive from a browser",
      "AI-driven canvas graphics need tight prompt constraints",
    ],
    next: "Scaling to multiple robots drawing simultaneously, and multi-color drawing. Built with Hassan Ahmad and Ibrahim Amezyane at WinHacks 2026.",
    gallery: [
      { caption: "Top-down view: ESP32, motor driver, servo pen lift, 9V power", src: "/img/sketchbot-c.jpg" },
      { caption: "Web app: pixel design canvas with AI design assistant", src: "/img/sketchbot-e.png" },
      { caption: "Web app: live POV camera view from the robot", src: "/img/sketchbot-f.png" },
      { caption: "Web app: saving and submitting a sketch to the robot", src: "/img/sketchbot-d.png" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/hassanuahmad/sketch-bot" },
      { label: "Live Demo", href: "https://sketch-bot-xldd.vercel.app" },
      { label: "Devpost", href: "https://devpost.com/software/sketchbot-glreat" },
    ],
  },
  {
    slug: "edge-pong",
    title: "Edge Pong",
    badge: "HACK THE 6IX 2026 — SOLO BUILD",
    badgeTone: "cyan",
    tagline:
      "A projected arcade ping-pong game: swing a real paddle at virtual balls, and when you connect, a smart paddle buzzes right where the ball struck — all processed locally with edge AI.",
    cardBlurb:
      "Projected ping-pong with an edge-AI smart paddle — feel each hit through four-quadrant spatial haptics, all on-device.",
    cardCaption: "PHOTO: Edge Pong smart paddle + projected arena",
    chips: ["ESP32-C5", "Spatial Haptics", "Edge AI", "Three.js", "Python", "TypeScript"],
    heroCaption: "HERO PHOTO: smart paddle + projected game arena",
    problem:
      "Gaming keeps retreating behind screens and headsets. I wanted a tangible gaming experience — swinging a real paddle at virtual balls and actually feeling the impact in your hand, no VR headset required.",
    solution:
      "A projected ping-pong arena driven by a custom smart paddle. The paddle streams motion data from an ESP32-C5; when you hit a virtual ball, four vibration-motor quadrants encode where on the paddle the ball struck, using bilinear interpolation across motors.",
    demoCaption: "VIDEO: Edge Pong gameplay demo (embed here)",
    features: [
      "Backend (Python) — physics engine with collision detection, rally system, AI opponent, and quaternion-based pose fusion",
      "Frontend (Three.js + TypeScript) — 3D arena synced over WebSockets at 60 Hz",
      "Smart paddle (ESP32-C5) — custom firmware streaming motion data, driving four vibration-motor quadrants for spatial haptics",
    ],
    stack: ["ESP32-C5", "Custom Firmware", "Python", "Three.js", "TypeScript", "WebSockets", "Quaternion Pose Fusion"],
    challenges: [
      "Hardware was the hard part: MOSFET wiring errors, power management, forcing 2.4 GHz networking",
      "Calibrating vibration-motor sensitivity thresholds so haptics feel right",
    ],
    lessons: [
      "Four vibration zones are enough to convey strike location on a paddle",
      "Quaternion orientation avoids gimbal lock in fast swings",
      "Responsiveness beats physics accuracy for playability",
    ],
    next: "Real camera tracking with AprilTag detection, and housing the electronics fully inside the paddle handle.",
    gallery: [
      { caption: "PHOTO: paddle electronics" },
      { caption: "PHOTO: projected arena" },
      { caption: "SCREENSHOT: 3D game view" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/AhmadAli137/PongMasterHT6" },
      { label: "Devpost", href: "https://devpost.com/software/edge-pong" },
    ],
  },
  {
    slug: "sayspark",
    title: "SaySpark",
    badge: "EDTECH — NATURAL-LANGUAGE ROBOTICS",
    badgeTone: "mint",
    tagline:
      "Robotics education through natural language. Kids tell the robot what to do in plain words — and it does it. No syntax errors, no barriers to entry.",
    cardBlurb:
      "Natural-language robotics education — kids program robots by talking, not typing syntax.",
    cardCaption: "PHOTO: SaySpark educational robot with students",
    chips: ["LLMs", "Speech Interfaces", "Robotics", "EdTech", "Product Design"],
    heroCaption: "HERO PHOTO: SaySpark robot with a student",
    problem:
      "After years of mentoring hundreds of elementary students in robotics across Windsor, Ontario, one pattern was undeniable: kids love robots, but syntax-heavy programming stops many of them before the fun starts. A missing semicolon shouldn't end a child's engineering journey.",
    solution:
      "SaySpark lets children program robots through natural language — spoken or typed. An LLM-powered layer translates a child's intent into safe robot behaviors, so the first experience of robotics is creation, not frustration. It's the foundation of my current venture, Aibotics.",
    demoCaption: "VIDEO: child commanding the robot in plain English (embed here)",
    features: [
      "Natural-language robot programming (speech and text)",
      "LLM-powered intent → behavior translation with safety limits",
      "Progression path from natural language toward real code",
      "Classroom-ready hardware design",
    ],
    stack: ["LLM APIs", "Python", "Embedded C++", "Speech Recognition", "Custom Hardware"],
    challenges: [
      "Constraining open-ended language into safe, predictable robot actions",
      "Designing for young users: durability, simplicity, delight",
    ],
    lessons: ["The best product insights came from the classroom, not the workbench"],
    gallery: [
      { caption: "PHOTO: prototype" },
      { caption: "PHOTO: classroom testing" },
      { caption: "SCREENSHOT: software interface" },
    ],
    links: [{ label: "The Venture: Aibotics", href: "/venture" }],
  },
  {
    slug: "asl-glove",
    title: "ASL Translation Glove",
    badge: "ACCESSIBILITY — WEARABLE TECH",
    badgeTone: "cyan",
    tagline:
      "A sensor-instrumented glove that recognizes American Sign Language gestures and translates them in real time — technology in service of communication.",
    cardBlurb:
      "A sensor-instrumented glove that translates American Sign Language gestures in real time.",
    cardCaption: "PHOTO: ASL translation glove on hand",
    chips: ["Flex Sensors", "IMU", "Machine Learning", "Embedded", "Wearables"],
    heroCaption: "HERO PHOTO: glove on hand mid-gesture (very visual — use your best shot)",
    problem:
      "Millions of people communicate through sign language, yet most of the hearing world can't understand it. That communication gap creates daily friction in classrooms, workplaces, and public life.",
    solution:
      "A wearable glove that captures hand pose and motion through embedded sensors, classifies ASL gestures with machine learning, and outputs translations in real time.",
    demoCaption: "VIDEO: live gesture → translation demo (embed here)",
    features: [
      "Finger-flex and hand-motion sensing",
      "Real-time gesture classification",
      "Wireless, wearable form factor",
    ],
    stack: ["Arduino / MCU", "Flex Sensors", "IMU", "Python", "ML Classification"],
    challenges: [
      "Distinguishing similar gestures from noisy sensor data",
      "Fitting inference and sensing into a comfortable wearable",
    ],
    lessons: ["TODO: what you learned building it"],
    gallery: [
      { caption: "PHOTO: glove build / wiring" },
      { caption: "PHOTO: sensor close-up" },
      { caption: "SCREENSHOT: classification output" },
    ],
    links: [],
  },
  {
    slug: "memory-optimizer",
    title: "Automotive AI Memory Optimizer",
    badge: "SYSTEMS ENGINEERING",
    badgeTone: "cyan",
    tagline:
      "High-level systems engineering: optimizing memory usage for AI workloads running on resource-constrained automotive platforms.",
    cardBlurb:
      "High-level systems engineering: optimizing memory for AI workloads in automotive platforms.",
    cardCaption: "SCREENSHOT: Memory optimizer dashboard / architecture",
    chips: ["Systems Engineering", "AI Workloads", "Memory Optimization", "Automotive"],
    heroCaption: "IMAGE: architecture diagram or dashboard screenshot",
    problem:
      "Modern vehicles run increasingly heavy AI workloads on tightly constrained embedded compute. Memory is a hard limit — and inefficient usage means dropped features, higher hardware cost, or failed real-time deadlines.",
    solution:
      "A systems-level approach to profiling and optimizing memory consumption of AI components on automotive platforms.",
    features: ["TODO: memory profiling across AI modules", "TODO: optimization strategy + measured savings"],
    stack: ["C / C++", "Embedded Linux", "Profiling Tools"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredSlugs = ["drone", "sketchbot", "sayspark", "asl-glove", "memory-optimizer", "edge-pong"];
