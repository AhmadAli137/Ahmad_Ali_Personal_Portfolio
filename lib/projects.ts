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
  /** Live app embedded as a playable iframe on the project page */
  demoUrl?: string;
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
    next: "Recognition: Best Demo Award at IEEE PIMRC 2023 in Toronto. Built as our University of Windsor capstone project: flight controller design, positioning, and obstacle avoidance.",
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
    badge: "WINHACKS 2026 — FINALIST",
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
    next: "SketchBot V2 — rebuilt with AprilTag fiducial tracking for precise camera-vision positioning and 18650 power — reached the finals at ClubHacks 2026. Next: multiple robots drawing simultaneously and multi-color drawing. V1 built with Hassan Ahmad and Ibrahim Amezyane at WinHacks 2026.",
    gallery: [
      { caption: "Top-down view: ESP32, motor driver, servo pen lift, 9V power", src: "/img/sketchbot-c.jpg" },
      { caption: "SketchBot V2: AprilTag tracking and 18650 power — ClubHacks 2026 finalist", src: "/img/clubhacks-sketchbot-v2-1.jpg" },
      { caption: "Web app: pixel design canvas with AI design assistant", src: "/img/sketchbot-e.png" },
      { caption: "Web app: live POV camera view from the robot", src: "/img/sketchbot-f.png" },
      { caption: "Building at WinHacks 2026", src: "/img/winhacks26-sketchbot-award-2.jpg" },
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
    badge: "UWINDSOR × JLR 2025 — $600 + INTERNSHIP PRIZE",
    badgeTone: "cyan",
    tagline:
      "Built for the University of Windsor × Jaguar Land Rover Automotive AI Competition: optimizing memory usage for AI workloads on resource-constrained automotive platforms.",
    cardBlurb:
      "UWindsor × Jaguar Land Rover competition: optimizing memory for AI workloads in automotive platforms.",
    cardCaption: "Team at the UWindsor × JLR Automotive AI Competition",
    cardSrc: "/img/jlr-team-1.jpg",
    chips: ["Systems Engineering", "AI Workloads", "Memory Optimization", "Automotive", "JLR"],
    heroCaption: "Our team at the UWindsor × Jaguar Land Rover Automotive AI Competition",
    heroSrc: "/img/jlr-team-1.jpg",
    problem:
      "Modern vehicles run increasingly heavy AI workloads on tightly constrained embedded compute. Memory is a hard limit — and inefficient usage means dropped features, higher hardware cost, or failed real-time deadlines. Jaguar Land Rover posed this challenge to UWindsor engineering teams.",
    solution:
      "A systems-level approach to profiling and optimizing memory consumption of AI components on automotive platforms.",
    features: ["TODO: memory profiling across AI modules", "TODO: optimization strategy + measured savings"],
    stack: ["C / C++", "Embedded Linux", "Profiling Tools"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    next: "Awarded $600 and a one-week internship with Jaguar Land Rover at the 2025 competition.",
    gallery: [
      { caption: "Competition day at the UWindsor × JLR Automotive AI Competition", src: "/img/jlr-team-2.jpg" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/AhmadAli137/JLR_Challenge2" }],
  },
  {
    slug: "presentpro",
    title: "PresentPro",
    badge: "WINHACKS 2025 — 2ND OVERALL · 1ST IN CATEGORY",
    badgeTone: "amber",
    tagline:
      "Real-time presentation coaching: live speech analysis that helps students refine pacing and clarity — with a haptic wearable that nudges you when you speed past 160 words per minute.",
    cardBlurb: "AI presentation coach with real-time speech analysis and a haptic IoT wearable.",
    cardCaption: "PresentPro haptic wearable",
    cardSrc: "/img/presentpro-a.jpg",
    chips: ["React", "AssemblyAI", "FastAPI", "ESP32", "WebSockets"],
    heroCaption: "The PresentPro IoT wearable — ESP32 with haptic feedback",
    heroSrc: "/img/presentpro-a.jpg",
    problem:
      "Public speakers unconsciously adopt bad habits — racing through slides, filler words, uneven pacing — and never get immediate feedback. By the time someone tells you, the talk is over.",
    solution:
      "PresentPro monitors speaking pace in real time and triggers vibration alerts through a wrist-worn IoT device when you exceed 160 WPM. Practice mode gives live feedback, an analytics dashboard tracks progress over time, and preparation tools help organize content.",
    features: [
      "Live words-per-minute monitoring with AssemblyAI speech analysis",
      "Haptic wearable (ESP32) buzzes when pacing exceeds 160 WPM",
      "Practice mode with real-time feedback",
      "Analytics dashboard tracking progress across sessions",
    ],
    stack: ["React", "TypeScript", "Vite", "FastAPI", "AssemblyAI", "Clerk", "ESP32", "Arduino", "WebSockets"],
    challenges: [
      "Keeping WebSocket connections stable between the web app and the IoT device",
      "Calibrating WPM detection accuracy and minimizing detection-to-haptic latency",
    ],
    lessons: [
      "WebSocket management for real-time systems",
      "IoT integration and real-time feedback design",
    ],
    next: "Advanced speaking-pattern analytics, AI-powered content feedback, more haptic patterns, and a native mobile app. Built with Hassan Ahmad and Mahir Chowdhury.",
    gallery: [
      { caption: "Accepting the award at WinHacks 2025", src: "/img/presentpro-award-1.jpg" },
      { caption: "Web app dashboard", src: "/img/presentpro-b.png" },
      { caption: "Live practice session", src: "/img/presentpro-c.png" },
    ],
    links: [
      { label: "Live Demo", href: "https://present-pro.vercel.app" },
      { label: "GitHub", href: "https://github.com/hassanuahmad/present-pro" },
      { label: "Devpost", href: "https://devpost.com/software/presentpro-w0a5zb" },
    ],
  },
  {
    slug: "second-life",
    title: "Second Life",
    badge: "WINHACKS 2024 — 2ND PLACE OVERALL",
    badgeTone: "amber",
    tagline:
      "Give your EV battery a second life in a microgrid — a platform for collecting, testing, and repurposing end-of-life EV batteries into energy storage.",
    cardBlurb: "Platform for repurposing end-of-life EV batteries into microgrid energy storage.",
    cardCaption: "Second Life landing page",
    cardSrc: "/img/secondlife-a.png",
    chips: ["Next.js", "Prisma", "TypeScript", "Energy"],
    heroCaption: "Second Life — give your EV battery a second life in a microgrid",
    heroSrc: "/img/secondlife-a.png",
    problem:
      "EV batteries retire from vehicles with plenty of useful capacity left — and most end up as waste. There was no clear bridge between end-of-life automotive batteries and their second-life potential in stationary storage.",
    solution:
      "A platform facilitating collection, testing, and repurposing of retired EV batteries into energy storage for microgrids, remote communities, industrial sites, and backup power — born directly from my battery research at the CHARGE Lab.",
    features: [
      "Battery intake, testing, and state-of-health tracking workflow",
      "Marketplace connecting retired packs with microgrid projects",
      "Full-stack MVP: Next.js frontend, Node.js API, Prisma ORM, Clerk auth",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Prisma", "Clerk", "Vercel"],
    challenges: [
      "Acquiring real state-of-health data for battery packs — IoT access was harder than assumed",
      "Scoping physical microgrid engineering out of a 36-hour software build",
    ],
    lessons: [
      "Battery recycling logistics and energy storage system realities",
      "Shipping a convincing MVP under time pressure",
    ],
    next: "State-of-health monitoring to track second-life eligibility, and industry pre-ordering from available inventory. Built with Hassan Ahmad and Mahir Chowdhury.",
    gallery: [
      { caption: "2nd place award ceremony at WinHacks 2024", src: "/img/secondlife-award.jpg" },
      { caption: "Platform dashboard", src: "/img/secondlife-b.png" },
      { caption: "Battery marketplace flow", src: "/img/secondlife-c.png" },
    ],
    links: [
      { label: "Live Demo", href: "https://second-life-lac.vercel.app" },
      { label: "GitHub", href: "https://github.com/Elite-Gadget-Labs/SecondLife" },
      { label: "Devpost", href: "https://devpost.com/software/winhacks-2024-egl-title-tbd" },
    ],
  },
  {
    slug: "meteor-madness",
    title: "Meteor Madness",
    badge: "NASA SPACE APPS 2025 — 1ST PLACE + GLOBAL NOMINATION",
    badgeTone: "amber",
    tagline:
      "An asteroid impact simulator built on NASA near-earth-object data — winner of NASA Space Apps Windsor with a global nomination. Try it live below.",
    demoUrl: "https://meteor-madness-six.vercel.app",
    cardBlurb: "NASA Space Apps winner: making near-Earth asteroid data tangible.",
    cardCaption: "Team with 1st Place certificates",
    cardSrc: "/img/nasa-space-apps-1.jpg",
    chips: ["NASA Data", "JavaScript", "Visualization"],
    heroCaption: "Galactic Problem Solvers — 1st Place, NASA Space Apps Windsor",
    heroSrc: "/img/nasa-space-apps-1.jpg",
    problem:
      "NASA publishes rich near-Earth object data, but raw orbital parameters mean nothing to most people. Planetary defense only gets public support when the public can see the problem.",
    solution:
      "An interactive asteroid impact visualization and mitigation simulator in four acts: explore ~250 real near-Earth objects, design an impact scenario, watch its consequences unfold on a 3D globe, then try to save Earth with a kinetic deflection mission.",
    features: [
      "Observatory — ~250 real NEOs from NASA's NeoWs API with 2D orbit maps and 3D heliocentric views",
      "Impactor Lab — design collision scenarios: velocity, diameter, density, impact location",
      "Impact Site — crater footprints and damage radii on a CesiumJS 3D globe",
      "Mission: Save Earth — kinetic deflection simulation showing how lead time changes everything",
      "Orbital mechanics via Keplerian elements solved with Newton-Raphson",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "CesiumJS", "Three.js", "Tailwind CSS", "NASA NeoWs API"],
    challenges: [
      "Solving Keplerian orbital mechanics accurately enough for real NEO data",
      "Grounding crater and seismic effects in the peer-reviewed Collins, Melosh & Marcus (2005) scaling models",
    ],
    lessons: [
      "Real physics makes a simulation credible — the scientific references are part of the product",
      "CesiumJS + Three.js can coexist for planetary-scale and orbital-scale rendering",
    ],
    next: "Earned the Galactic Problem Solver award — 1st place in Windsor plus a nomination to the global round.",
    gallery: [
      { caption: "The team with 1st Place Windsor certificates", src: "/img/nasa-space-apps-2.jpg" },
      { caption: "NASA Space Apps Windsor 2025", src: "/img/nasa-space-apps-3.jpg" },
    ],
    links: [
      { label: "Live Demo", href: "https://meteor-madness-six.vercel.app" },
      { label: "GitHub", href: "https://github.com/AhmadAli137/meteor-madness" },
    ],
  },
  {
    slug: "grand-theft-calculus",
    title: "Grand Theft Calculus",
    badge: "UWINDSOR COURSE PROJECT 2020 — REBUILT 2026",
    badgeTone: "mint",
    tagline:
      "A comedic campus stealth game: collect the 8 scattered exam pages before Professor Sarker catches you. Playable right here in your browser.",
    cardBlurb:
      "Campus stealth game — collect the exam pages, evade Professor Sarker. Playable in-browser.",
    cardCaption: "Grand Theft Calculus gameplay",
    cardSrc: "/img/gtc-play.png",
    chips: ["Pygame", "Pygbag", "Game Dev", "Procedural Art"],
    heroCaption: "Grand Theft Calculus — on the run across campus",
    heroSrc: "/img/gtc-play.png",
    problem:
      "An undergrad desperate to pass integral calculus discovers the exam pages scattered across the University of Windsor campus. One problem: Professor Sarker is patrolling.",
    solution:
      "A 2D stealth game where you sprint (limited stamina), gather intel from NPCs, and grab all 8 exam pages while evading a professor who's faster than your walk but slower than your sprint. Speed runs rank on the leaderboard.",
    demoUrl: "https://grand-theft-calculus.vercel.app",
    features: [
      "8 exam pages hidden across a pixel-art UWindsor campus",
      "Professor Sarker patrol-and-chase AI",
      "Stamina-based sprint and NPC intel dialogue",
      "Speed-run leaderboard",
      "Procedurally generated pixel art and synthesized audio",
      "Runs on desktop (Pygame) and in-browser (Pygbag / WebAssembly)",
    ],
    stack: ["Python", "Pygame", "Pygbag (WebAssembly)", "Procedural asset tooling"],
    challenges: [
      "Reconstructing the original 2020 art as procedural 4px-cell pixel assets",
      "Making a desktop Pygame build run cleanly in the browser via WebAssembly",
    ],
    lessons: [
      "Automated testing and spawn verification pay off even for games",
      "Old course projects are worth reviving — six years of skill turns a demo into a product",
    ],
    next: "Originally a 2020 course project; rebuilt from scratch in 2026 with procedural art, synthesized audio, and a web build.",
    gallery: [
      { caption: "On the run — 0/8 pages, stamina bar ticking", src: "/img/gtc-play.png" },
      { caption: "CAUGHT! — \"You call THAT a u-substitution?\" — Prof. Sarker", src: "/img/gtc-caught.png" },
      { caption: "Title screen — pick your hair, chase the best time", src: "/img/gtc-title.png" },
    ],
    links: [
      { label: "Play Live", href: "https://grand-theft-calculus.vercel.app" },
      { label: "GitHub", href: "https://github.com/AhmadAli137/grand-theft-calculus" },
    ],
  },
  {
    slug: "winparks",
    title: "WinParks",
    badge: "BORDERHACKS 2021 — PEOPLE'S CHOICE + OPEN DATA WINNER",
    badgeTone: "amber",
    tagline:
      "A mobile app helping people explore the trails, parks, and heritage sites of Windsor — built from the city's open data.",
    cardBlurb: "Mobile app for exploring Windsor's parks and trails, built on open data.",
    cardCaption: "WinParks app",
    cardSrc: "/img/winparks-a.jpg",
    chips: ["Kotlin", "Jetpack Compose", "Firebase"],
    heroCaption: "WinParks — explore Windsor's parks and trails",
    heroSrc: "/img/winparks-a.jpg",
    problem:
      "We bike Windsor's trails constantly — and still kept discovering parks we never knew existed. The city's open data had everything; no app made it explorable.",
    solution:
      "WinParks lets users search nearby parks, trails, and heritage sites, see them on maps with photos and descriptions, rate them, and filter by interest — with authenticated personal profiles.",
    features: [
      "Map-based discovery of parks, trails, and heritage sites",
      "Photos, descriptions, ratings, and interest filters",
      "Authenticated accounts with personalized profiles",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "Android Studio"],
    challenges: [
      "Jetpack Compose was brand new — some things simply didn't work as documented, which cost significant build time",
    ],
    lessons: ["Android development, UI design, and persistence through unstable tooling"],
    next: "Built with Mahir Chowdhury — I owned the frontend views, widgets, authentication, and search filters.",
    gallery: [],
    links: [
      { label: "GitHub", href: "https://github.com/Elite-Gadget-Labs/WinParks" },
      { label: "Devpost", href: "https://devpost.com/software/winparks" },
    ],
  },
  {
    slug: "wingrid",
    title: "WinGrid",
    badge: "WINHACKS 2022",
    badgeTone: "cyan",
    tagline:
      "Keeping all the electric vehicles on the grid — algorithmic placement of EV charging infrastructure for city planners.",
    cardBlurb: "K-means-driven EV charger placement recommendations for city planners.",
    cardCaption: "WinGrid app",
    cardSrc: "/img/wingrid-a.jpg",
    chips: ["Kotlin", "Python", "Golang", "K-means"],
    heroCaption: "WinGrid — plan EV charger placement",
    heroSrc: "/img/wingrid-a.jpg",
    problem:
      "EV adoption is outpacing charging infrastructure, and cities place chargers by intuition. Windsor/Essex planners needed a data-driven way to decide where the next stations should go.",
    solution:
      "WinGrid analyzes geographic data — population density, road quality, infrastructure zones — and recommends optimal charging station placements via K-means clustering. Planners input how many stations they can build; the app returns mapped, reverse-geocoded recommendations.",
    features: [
      "K-means clustering over geographic and infrastructure data",
      "Map-based recommendations with reverse-geocoded addresses",
      "Android frontend with a hybrid Python + Golang backend",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Python 3.9", "Golang", "scikit-learn"],
    challenges: [
      "Balancing Python's ease of use against Golang's performance in one backend",
      "Trip-length modeling and existing-charger integration didn't make the deadline",
    ],
    lessons: ["Hybrid-language server architecture; modern Android frameworks"],
    next: "Built with Mahir Chowdhury.",
    gallery: [],
    links: [
      { label: "GitHub", href: "https://github.com/Elite-Gadget-Labs/WinGrid" },
      { label: "Devpost", href: "https://devpost.com/software/wingrid" },
    ],
  },
  {
    slug: "covid-19-global",
    title: "Covid-19 Global",
    badge: "HACK THE NORTHEAST 2020",
    badgeTone: "cyan",
    tagline:
      "A desktop application providing trustworthy Covid-19 statistics from countries around the world — built to fight misinformation with data.",
    cardBlurb: "Desktop app for trustworthy global Covid-19 statistics.",
    cardCaption: "Covid-19 Global desktop app",
    cardSrc: "/img/covid-a.png",
    chips: ["Python", "PyQt5", "Pandas", "Matplotlib"],
    heroCaption: "Covid-19 Global — today's worldwide status at a glance",
    heroSrc: "/img/covid-a.png",
    problem:
      "In 2020, finding exact, trustworthy Covid-19 information among innumerable online sources was genuinely hard for the average person.",
    solution:
      "A desktop app showing global cases and deaths with per-country search, health statistics, demographics, and clickable daily values that reveal graphical trends — all sourced from the ECDC and World Bank.",
    features: [
      "Global metrics with per-country search",
      "Clickable daily values revealing trend graphs since the pandemic began",
      "Data sourced from the ECDC and World Bank",
    ],
    stack: ["Python", "PyQt5", "Pandas", "Matplotlib", "Requests", "Beautiful Soup", "Qt Designer"],
    challenges: [
      "Steep learning curves on Pandas and Matplotlib",
      "Embedding Matplotlib plots inside PyQt5 GUI layouts",
    ],
    lessons: ["First deep exposure to the Python data science stack"],
    next: "Built with Mahir Chowdhury.",
    gallery: [],
    links: [
      { label: "GitHub", href: "https://github.com/EM-SEE/COVID-19-GLOBAL" },
      { label: "Devpost", href: "https://devpost.com/software/covid-19-global" },
    ],
  },
  {
    slug: "rv-challenge",
    title: "RV Interface Challenge",
    badge: "AUTOMOTIVE UI/UX CHALLENGE 2026 — 1ST PLACE",
    badgeTone: "amber",
    tagline:
      "Winning entry in the UWindsor Automotive UI/UX Challenge — designing and building a recreational-vehicle interface.",
    cardBlurb: "1st place automotive UI/UX build: a recreational-vehicle interface in C#.",
    cardCaption: "SCREENSHOT: RV interface",
    chips: ["C#", "UI/UX", "Automotive"],
    heroCaption: "SCREENSHOT: RV interface (add when available)",
    problem:
      "Automotive interfaces have to be glanceable, safe, and intuitive — the UI/UX challenge asked teams to design and build an interface for a recreational vehicle. {/* TODO: refine */}",
    solution: "A C#-built RV interface that took 1st place. {/* TODO: describe the design */}",
    features: ["TODO: key screens and interactions"],
    stack: ["C#"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [{ label: "GitHub", href: "https://github.com/AhmadAli137/UWindsor_RV_UI_UIX_Challenge" }],
  },
  {
    slug: "weatherpy",
    title: "WeatherPy",
    badge: "BORDERCITY HACKATHON 2017 — 1ST PLACE",
    badgeTone: "amber",
    tagline: "My first hackathon — and first win. A Python weather application built at Bordercity Hackathon 2017.",
    cardBlurb: "First hackathon, first win: a Python weather app.",
    cardCaption: "PHOTO: WeatherPy (2017)",
    chips: ["Python"],
    heroCaption: "PHOTO / SCREENSHOT: WeatherPy (add when available)",
    problem: "TODO: the story of the first hackathon",
    solution: "A Python weather application that took 1st place at Bordercity Hackathon 2017 — the win that started a decade of hackathons.",
    features: ["TODO"],
    stack: ["Python"],
    challenges: ["TODO"],
    lessons: ["Hackathons are the fastest way to learn — I never stopped going"],
    gallery: [],
    links: [],
  },
  {
    slug: "connect4",
    title: "Virtual Connect 4",
    badge: "BORDERCITY HACKATHON 2018",
    badgeTone: "cyan",
    tagline: "A virtual Connect 4 app built at Bordercity Hackathon 2018.",
    cardBlurb: "Virtual Connect 4 game app.",
    cardCaption: "SCREENSHOT: Connect 4 app",
    chips: ["Game Dev"],
    heroCaption: "SCREENSHOT: Connect 4 app (add when available)",
    problem: "TODO",
    solution: "A virtual Connect 4 application. {/* TODO: details */}",
    features: ["TODO"],
    stack: ["TODO"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [],
  },
  {
    slug: "zombie-fps",
    title: "Hand-Motion Zombie FPS",
    badge: "MASSEYHACKS 2018",
    badgeTone: "cyan",
    tagline: "A first-person zombie shooter controlled entirely by hand motion — built at MasseyHacks 2018.",
    cardBlurb: "FPS zombie game controlled by hand motion.",
    cardCaption: "PHOTO: hand-motion FPS demo",
    chips: ["Game Dev", "Motion Control"],
    heroCaption: "PHOTO / CLIP: hand-motion controlled gameplay (add when available)",
    problem: "TODO",
    solution: "A zombie FPS you play with hand gestures instead of a keyboard. {/* TODO: details */}",
    features: ["TODO"],
    stack: ["TODO"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [],
  },
  {
    slug: "exponent-calculator",
    title: "Exponent Base e Calculator",
    badge: "BORDERHACKS 2020 — SOLO",
    badgeTone: "cyan",
    tagline:
      "Numerical methods meets hackathon: computing e^x to any required number of correct significant digits.",
    cardBlurb: "Numerical calculator for e^x with controlled significant-digit precision.",
    cardCaption: "SCREENSHOT: calculator output",
    chips: ["Python", "Numerical Methods"],
    heroCaption: "SCREENSHOT: calculator (add when available)",
    problem:
      "Floating-point answers are easy; answers with a guaranteed number of correct significant digits require real numerical analysis.",
    solution:
      "A Python calculator that computes e raised to any exponent with the precision you specify, grounded in approximate-error and error-tolerance mathematics.",
    features: ["User-specified significant-digit precision", "Error tolerance computation"],
    stack: ["Python"],
    challenges: ["Minimal — a clean, focused solo build"],
    lessons: ["Computing approximate error and error tolerance in practice"],
    gallery: [],
    links: [
      { label: "GitHub", href: "https://github.com/AhmadAli137/BorderHacks2020" },
      { label: "Devpost", href: "https://devpost.com/software/exponent_base_e_calculator" },
    ],
  },
  {
    slug: "ecoroute",
    title: "EcoRoute",
    badge: "HACKATHON PROJECT — 2024",
    badgeTone: "cyan",
    tagline: "Route optimization with an environmental lens.",
    cardBlurb: "Route optimization with an environmental lens.",
    cardCaption: "SCREENSHOT: EcoRoute",
    chips: ["TypeScript"],
    heroCaption: "SCREENSHOT: EcoRoute (add when available)",
    problem: "TODO",
    solution: "TODO: describe EcoRoute",
    features: ["TODO"],
    stack: ["TypeScript"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [{ label: "GitHub", href: "https://github.com/AhmadAli137/EcoRoute" }],
  },
  {
    slug: "wordconquer",
    title: "wordConquer",
    badge: "HACKATHON PROJECT — 2024",
    badgeTone: "cyan",
    tagline: "A word game built fast.",
    cardBlurb: "A word game built fast.",
    cardCaption: "SCREENSHOT: wordConquer",
    chips: ["TypeScript"],
    heroCaption: "SCREENSHOT: wordConquer (add when available)",
    problem: "TODO",
    solution: "TODO: describe wordConquer",
    features: ["TODO"],
    stack: ["TypeScript"],
    challenges: ["TODO"],
    lessons: ["TODO"],
    gallery: [],
    links: [{ label: "GitHub", href: "https://github.com/AhmadAli137/wordConquer" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredSlugs = [
  "drone",
  "sketchbot",
  "sayspark",
  "asl-glove",
  "memory-optimizer",
  "edge-pong",
  "meteor-madness",
  "grand-theft-calculus",
];
