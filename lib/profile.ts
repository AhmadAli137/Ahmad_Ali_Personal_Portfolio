/* Everything said about Ahmad in more than one place lives here: links, the five
   "sides", the timeline, experience, and the toolkit. Pages read from this file. */

export const links = {
  sayspark: "https://sayspark.ca",
  saysparkContact: "https://sayspark.ca/contact",
  email: "mailto:ahmad100307@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmad-a-658008170/",
  github: "https://github.com/AhmadAli137",
  devpost: "https://devpost.com/AhmadAli137",
  resume: "/AhmadAli_Resume.pdf",
  calendly: "https://calendly.com/ahmad100307/30min",
} as const;

export type ThreadId = "founder" | "engineering" | "research" | "competition" | "community";

export const threads: { id: ThreadId; label: string }[] = [
  { id: "founder", label: "Venture" },
  { id: "engineering", label: "Engineering" },
  { id: "research", label: "Research" },
  { id: "competition", label: "Competition" },
  { id: "community", label: "Community" },
];

/* ---------- headline figures ---------- */

export const figures: { value: string; label: string }[] = [
  { value: "44", label: "competitions and conferences since 2014" },
  { value: "Best Demo", label: "IEEE PIMRC 2023, for an indoor autonomous drone" },
  { value: "1st place", label: "NASA Space Apps 2025, with a global nomination" },
  { value: "2 years", label: "of EV battery research with Magna, presented at IEEE EPEC" },
];

/* ---------- the five sides ---------- */

export interface Lens {
  id: ThreadId;
  label: string;
  title: string;
  body: string;
  image: { src: string; alt: string; caption: string };
  proof: { title: string; detail: string; href?: string; external?: boolean }[];
  more: { label: string; href: string };
}

export const lenses: Lens[] = [
  {
    id: "founder",
    label: "Founder",
    title: "Building a company from the classroom up.",
    body: "SaySpark came out of a pattern I kept seeing while teaching robotics: kids understood the ideas long before they could type the syntax. I'm building the product end to end — the robot, the firmware, the AI tutor and the cloud behind it — and I've been pitching on stages since 2018.",
    image: {
      src: "/img/epicentre-award-stage.jpg",
      alt: "Ahmad on stage at the EPICentre Entrepreneurship Excellence Awards",
      caption: "EPICentre Entrepreneurship Excellence Awards, 2023",
    },
    proof: [
      { title: "SaySpark", detail: "Voice-first robotics for kids. AI tutor, simulator and curriculum in early access.", href: links.sayspark, external: true },
      { title: "Innovation Mastery Award + $1,000", detail: "EPICentre Entrepreneurship Excellence Awards, 2023" },
      { title: "4th place, $2,500", detail: "Take Your Shot pitch competition, Leamington, 2026" },
      { title: "People's Choice", detail: "STEM Entrepreneurship Bootcamp, Lassonde × Youth Science Canada, 2018" },
    ],
    more: { label: "See the company", href: "/#venture" },
  },
  {
    id: "engineering",
    label: "Engineer",
    title: "Full stack, meaning silicon to cloud.",
    body: "I lay out the PCB, write the firmware, train the model and ship the web app. That range came from two years building autonomous drone software at RIIS, a capstone drone that won IEEE's Best Demo award, and twenty builds across robotics, AI, energy and games.",
    image: {
      src: "/img/capstone-drone-team.jpg",
      alt: "The capstone team with the autonomous drone and project poster",
      caption: "Capstone presentation day, University of Windsor, 2023",
    },
    proof: [
      { title: "Indoor Autonomous Drone", detail: "GPS-denied navigation on custom firmware. Best Demo Award, IEEE PIMRC 2023.", href: "/projects/drone" },
      { title: "RIIS — Software Engineer Intern", detail: "Flight automation, AWS backends and computer vision for drone products, 2021–22.", href: "/about#experience" },
      { title: "SketchBot and Edge Pong", detail: "A camera-guided drawing robot and a haptic smart paddle, both built in 2026.", href: "/work" },
      { title: "Automotive AI Memory Optimizer", detail: "DRAM simulation and Bayesian optimization for Jaguar Land Rover's AI challenge.", href: "/projects/memory-optimizer" },
    ],
    more: { label: "Browse all 20 projects", href: "/work" },
  },
  {
    id: "research",
    label: "Researcher",
    title: "EV batteries, from the cell to the inverter.",
    body: "I spent two years at the University of Windsor's CHARGE Lab on battery packs, BMS firmware and power electronics, with Magna as the industry partner, and presented that work at IEEE EPEC 2025. I'm continuing it as a MASc candidate at McMaster.",
    image: {
      src: "/img/ieee-epec-poster.jpg",
      alt: "Ahmad beside his research poster at IEEE EPEC 2025",
      caption: "IEEE EPEC 2025, Waterloo",
    },
    proof: [
      { title: "Dual-Chemistry Load Distribution for EV Battery Systems Using Cascaded H-Bridge Inverters", detail: "Presented at IEEE EPEC 2025, Waterloo. Industry-partnered with Magna." },
      { title: "CHARGE Lab — Research Assistant", detail: "Battery packs, BMS and motor-drive firmware, converter and PCB design, 2024–26.", href: "/about#research" },
      { title: "MASc, Electrical & Computer Engineering", detail: "McMaster University. EV battery research, since Fall 2026." },
      { title: "3rd place, oral presentation", detail: "UWillDiscover research conference, 2024" },
    ],
    more: { label: "Read about the research", href: "/about#research" },
  },
  {
    id: "competition",
    label: "Competitor",
    title: "Forty-four rooms where the work had to hold up.",
    body: "Science fairs, hackathons, engineering competitions, conferences and pitch nights, every year since 2014. The placements are a record of the habit underneath them: scope it, build it, and stand next to it while strangers judge it.",
    image: {
      src: "/img/nasa-space-apps-1.jpg",
      alt: "The Meteor Madness team holding first-place certificates at NASA Space Apps Windsor",
      caption: "NASA Space Apps Windsor, 2025",
    },
    proof: [
      { title: "NASA Space Apps 2025", detail: "1st place in Windsor and a global nomination, for Meteor Madness.", href: "/projects/meteor-madness" },
      { title: "Canada-Wide Science Fair", detail: "Four national finals, 2015–19. Two bronze, one silver and a $10k scholarship." },
      { title: "Windsor Engineering Competition", detail: "1st place in programming four years running, 2020–23." },
      { title: "14 hackathons since 2017", detail: "Including 2nd overall at WinHacks in both 2024 and 2025.", href: "/work" },
    ],
    more: { label: "See the full record", href: "/competitions" },
  },
  {
    id: "community",
    label: "Mentor",
    title: "Teaching is where the company came from.",
    body: "I judge and mentor at the science fair I once competed in, referee robot battles, and teach Arduino and C++ to elementary students. Watching those students stall on syntax instead of ideas is the observation SaySpark is built on.",
    image: {
      src: "/img/genius-cup-2026-mentoring.jpg",
      alt: "Ahmad coaching young students at a robotics competition table",
      caption: "Genius Cup, Windsor, 2026",
    },
    proof: [
      { title: "Windsor Regional Science, Technology & Engineering Fair", detail: "Judge, judging team lead, and mentor to the students headed to nationals, since 2022." },
      { title: "Genius Cup", detail: "Moderator and judge for Geniotech's student robotics competition, 2025–26." },
      { title: "Alhijra Academy", detail: "Robotics mentor: kits, Arduino and C++, since 2025." },
      { title: "CS Games 2026", detail: "Mentor to the University of Windsor delegation, Montréal." },
    ],
    more: { label: "More on mentoring", href: "/about#community" },
  },
];

/* ---------- timeline ---------- */

export interface Moment {
  year: string;
  title: string;
  detail: string;
  thread: ThreadId;
  href?: string;
}

export const timeline: Moment[] = [
  { year: "2014", thread: "competition", title: "First science fair", detail: "The first of six gold-medal years at the Windsor Regional Science Fair." },
  { year: "2015", thread: "competition", title: "The national stage", detail: "First of four Canada-Wide Science Fair finals. By 2019: two bronze, a silver and a $10k uOttawa scholarship." },
  { year: "2017", thread: "competition", title: "First hackathon, first win", detail: "WeatherPy takes 1st place at Bordercity Hackathon.", href: "/projects/weatherpy" },
  { year: "2018", thread: "founder", title: "First pitch", detail: "People's Choice at the STEM Entrepreneurship Bootcamp, run by Lassonde and Youth Science Canada." },
  { year: "2019", thread: "engineering", title: "University of Windsor", detail: "Starts a BASc in Electrical & Computer Engineering with a Computer Science minor. Joins the Formula SAE accumulator team." },
  { year: "2020", thread: "competition", title: "Four straight programming titles begin", detail: "1st place in programming at the Windsor Engineering Competition, repeated every year through 2023." },
  { year: "2021", thread: "engineering", title: "RIIS — Software Engineer Intern", detail: "Twenty months building autonomous drone systems: flight automation, AWS backends and computer vision." },
  { year: "2022", thread: "community", title: "Back at the science fair, as a judge", detail: "Returns to the Windsor regional fair as judge and mentor, later leading a judging team." },
  { year: "2023", thread: "engineering", title: "IEEE PIMRC Best Demo", detail: "The capstone indoor autonomous drone wins Best Demo in Toronto.", href: "/projects/drone" },
  { year: "2023", thread: "founder", title: "Innovation Mastery Award", detail: "EPICentre's Entrepreneurship Excellence Awards, with $1,000." },
  { year: "2024", thread: "research", title: "CHARGE Lab", detail: "Graduates, receives the Iron Ring, and joins the University of Windsor's EV research lab on battery packs and power electronics with Magna." },
  { year: "2024", thread: "competition", title: "Second Life — 2nd overall at WinHacks", detail: "A platform for repurposing retired EV batteries, drawn straight from the lab work.", href: "/projects/second-life" },
  { year: "2025", thread: "research", title: "IEEE EPEC", detail: "Presents the dual-chemistry battery research in Waterloo." },
  { year: "2025", thread: "competition", title: "NASA Space Apps — 1st place and a global nomination", detail: "Meteor Madness wins Windsor. The same year, the JLR AI competition ends in an internship prize.", href: "/projects/meteor-madness" },
  { year: "2025", thread: "community", title: "Teaching robotics", detail: "Starts mentoring at Alhijra Academy and judging the Genius Cup." },
  { year: "2026", thread: "founder", title: "SaySpark enters early access", detail: "The AI tutor, 3D simulator and curriculum go live at sayspark.ca. Take Your Shot awards the pitch 4th place and $2,500.", href: "/#venture" },
  { year: "2026", thread: "research", title: "MASc at McMaster", detail: "Begins graduate research on EV battery systems in Hamilton." },
];

/* ---------- experience ---------- */

export interface Role {
  org: string;
  role: string;
  dates: string;
  place: string;
  summary: string;
  points: string[];
  href?: string;
}

export const roles: Role[] = [
  {
    org: "SaySpark",
    role: "Founder",
    dates: "2026 – present",
    place: "Ontario, Canada",
    summary: "Voice-first robotics education. One founder building the robot, the firmware, the AI tutor, the simulator and the cloud platform.",
    points: [
      "Designed Spark Mini around a microphone, speaker, camera, ultrasonic and motion sensing so a child can talk to it instead of typing",
      "Shipped the AI tutor, a 3D simulator and an age-banded curriculum into free early access",
      "Released Desktop Studio 1.0 for Windows",
      "Pitched to 4th place and $2,500 at Take Your Shot 2026",
    ],
    href: "https://sayspark.ca",
  },
  {
    org: "CHARGE Lab, University of Windsor",
    role: "Automotive Power Electronics & Battery Research Assistant",
    dates: "Jan 2024 – Jan 2026",
    place: "Windsor",
    summary: "EV battery and power electronics research at the Centre for Hybrid Automotive Research and Green Energy, industry-partnered with Magna.",
    points: [
      "Designed and assembled battery packs and management systems, with firmware enforcing electrical and thermal safety limits",
      "Developed power electronic converters and motor-drive firmware for EV propulsion",
      "Designed PCBs around Texas Instruments controllers with current and voltage sensing",
      "Helped establish the university's battery research laboratory, from planning to equipment installation",
    ],
  },
  {
    org: "RIIS LLC",
    role: "Software Engineer Intern — Autonomous Drone Systems",
    dates: "May 2021 – Dec 2022",
    place: "Windsor",
    summary: "Full-stack autonomous drone products at Research Into Internet Systems: flight automation, cloud backends and computer vision working as one system.",
    points: [
      "Computer-vision models that count vehicles in parking lots from drone imagery",
      "End-to-end drone mapping: capture, cloud processing, and delivery of maps and weed-detection results",
      "AWS APIs for large-scale image processing and secure storage of flight data",
      "Backend and UI for managing media from DJI and Parrot drones",
      "A vehicle logistics platform: manager dashboard plus a React Native driver app with real-time tracking",
    ],
  },
];

/* ---------- toolkit ---------- */

export const toolkit: { area: string; items: string }[] = [
  { area: "Embedded & firmware", items: "C and C++, ESP32 (ESP-IDF), STM32, Texas Instruments controllers, Arduino, Raspberry Pi, FreeRTOS" },
  { area: "Electronics & power", items: "PCB design in Altium and KiCad, battery management systems, buck/boost converters, DC–AC inverters, UART, SPI, I2C, CAN" },
  { area: "Robotics & control", items: "BLDC, PMSM, induction and servo motor control, PID tuning, sensor fusion, optical flow, telemetry over radio, Wi-Fi and BLE" },
  { area: "AI & vision", items: "LLM applications and agents, speech pipelines, OpenCV, AprilTag tracking, model deployment on edge hardware" },
  { area: "Software", items: "TypeScript, React, Next.js, React Native, Kotlin, Python, Node.js, FastAPI, WebSockets" },
  { area: "Cloud & data", items: "AWS, Postgres, SQLite, MySQL, Supabase, MongoDB, Prisma" },
  { area: "Design & simulation", items: "Fusion 360, 3D printing, MATLAB and Simulink, Three.js" },
];
