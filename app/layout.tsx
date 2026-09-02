import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { CommandPalette } from "@/components/command-palette";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="relative font-sans antialiased">
        <CursorGlow />
        <ScrollProgress />
        <CommandPalette />
        <Nav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
