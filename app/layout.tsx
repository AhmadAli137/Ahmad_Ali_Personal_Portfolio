import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { CommandPalette } from "@/components/command-palette";
import { BookCallDialog } from "@/components/book-call";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmadali.ca"),
  title: {
    default: "Ahmad Ali — Founder of SaySpark. Robotics, AI and energy engineer.",
    template: "%s — Ahmad Ali",
  },
  description:
    "Ahmad Ali is the founder of SaySpark, voice-first robotics for kids, and an electrical and computer engineer working across robotics, AI and EV battery systems.",
  openGraph: {
    title: "Ahmad Ali — Founder of SaySpark",
    description:
      "Founder of SaySpark. Electrical and computer engineer across robotics, AI and EV battery systems. IEEE Best Demo, NASA Space Apps winner, MASc candidate at McMaster.",
    url: "https://ahmadali.ca",
    siteName: "Ahmad Ali",
    type: "website",
  },
};

/* Runs before first paint so the page never flashes the wrong theme. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <div id="main">{children}</div>
        <SiteFooter />
        <CommandPalette />
        <BookCallDialog />
      </body>
    </html>
  );
}
