# Ahmad Ali — Engineering Portfolio (Next.js)

Modern portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 +
Motion (Framer Motion) + lucide-react**. Dark circuit/AI aesthetic.

```bash
npm run dev     # develop at http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

The previous static-HTML version is archived in `static-v1/` (not part of the app).

## Structure

```
app/
  layout.tsx              Root layout: fonts (Space Grotesk + JetBrains Mono), nav, footer
  globals.css             Tailwind v4 theme tokens + circuit-grid background
  page.tsx                Landing: hero, stats, about, venture banner, projects,
                          experience, timeline, skills, services, gallery, contact
  venture/page.tsx        Aibotics venture page
  hackathons/page.tsx     All 13 hackathons (links to Devpost)
  projects/[slug]/page.tsx  Project detail pages, driven by lib/projects.ts
components/               nav, reveal (scroll animation), typing, count-up,
                          image-placeholder (Ph), hud, ui (Card/Chip/Btn/SectionHeading)
lib/projects.ts           ALL project content lives here — edit this to update projects
public/img/               Put your photos here
```

## Adding your photos

Every image slot renders the `Ph` placeholder component with a caption describing the
photo that belongs there. To swap in a real photo:

1. Drop it in `public/img/` (e.g. `public/img/drone-hero.jpg`)
2. Add `src="/img/drone-hero.jpg"` to that `<Ph />`:
   `<Ph caption="..." src="/img/drone-hero.jpg" alt="Drone in flight" />`

For project pages, hero/gallery images come from `lib/projects.ts` captions — swap the
`Ph` usages in `app/projects/[slug]/page.tsx` to pass `src` once you add image fields.

### Photo checklist
- [ ] Hero: you working on a robot/prototype (NOT a suit headshot)
- [ ] Aibotics/SaySpark prototype photos + demo video
- [ ] Drone: flight shots, electronics close-up, IEEE booth/award photo
- [ ] SketchBot: hardware + web app screenshots
- [ ] Edge Pong: paddle electronics, projected arena
- [ ] ASL glove: on-hand shots, wiring, output screenshot
- [ ] Battery lab: cyclers, EIS setup, graphs
- [ ] Teaching: classroom robotics photos
- [ ] Gallery: soldering, CAD, whiteboards, competitions, demo booths

### Facts to fill in (search for `TODO`)
- [x] LinkedIn, GitHub, Devpost links (wired into contact section)
- [ ] Resume PDF → drop in `public/` and link in the contact section
- [ ] Company names + dates in Experience (`app/page.tsx`)
- [ ] Years in the Timeline (`app/page.tsx`)
- [ ] IEEE PIMRC year/citation (drone entry in `lib/projects.ts`)
- [ ] Drone / ASL glove / memory optimizer: exact stacks, challenges, lessons (`lib/projects.ts`)
- [ ] Confirm venture naming: Aibotics = current venture, SaySpark = the platform
      that led to it — adjust if wrong
- [ ] Stats say "13 Hackathons" (from Devpost); adjust other numbers as needed

## Deploying

**Vercel (recommended):** push to GitHub → import at vercel.com → deploys automatically.
**Anything else:** `npm run build` then `npm start` on a Node host.

## Future sections (planned)
- Engineering blog (`app/blog/` — MDX would fit well)
- Awards wall with medal/certificate photos
- Media & testimonials once collected
