import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow } from "@/components/cursor-glow";
import { EvolvingBackground } from "@/components/evolving-background";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";
import { SparkHunt } from "@/components/spark-hunt";
import { Sparkbots } from "@/components/sparkbots";
import { Terminal } from "@/components/terminal";
import { BootScreen } from "@/components/boot-screen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: {
    default: "Ahmad Ali — Robotics, AI & Product Engineering",
    template: "%s — Ahmad Ali",
  },
  description:
    "Ahmad Ali builds intelligent robots, AI-powered products, and educational technology that solve real-world problems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${caveat.variable}`}>
      <body className="relative font-sans antialiased">
        <EvolvingBackground />
        <CursorGlow />
        <SmoothScroll />
        <ScrollProgress />
        <CommandPalette />
        <SparkHunt />
        <Sparkbots />
        <Terminal />
        <BootScreen />
        <Nav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
