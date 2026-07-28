# Ahmad Ali — Engineering Portfolio

A static site (no build tools) with a circuit/AI aesthetic. Open `index.html` in a browser to preview.

## Structure

```
index.html              Landing page (hero, stats, about, projects, experience,
                        timeline, skills, services, gallery, contact)
venture.html            Aibotics venture page
projects/
  drone.html            Indoor Autonomous Drone (IEEE Best Demo)
  sketchbot.html        SketchBot — WinHacks 2026 winner (drawing robot)
  edge-pong.html        Edge Pong — Hack the 6ix 2026 solo build
  sayspark.html         SaySpark natural-language robotics
  asl-glove.html        ASL Translation Glove
  memory-optimizer.html Automotive AI Memory Optimizer
  hackathons.html       All 13 hackathons (links to Devpost)
assets/
  style.css             All styling (colors/theme in :root at the top)
  script.js             Scroll reveal, stat counters, hero typing effect
  img/                  Put your photos here
```

## What you need to add

Every image slot is a `<div class="img-ph" data-caption="...">` — the caption tells
you which photo goes there. To fill one in, drop the photo into `assets/img/` and
replace the div with:

```html
<img src="assets/img/your-photo.jpg" alt="description" style="border-radius:12px;" />
```

(Use `../assets/img/...` from pages inside `projects/`.)

### Photo checklist
- [ ] Hero: you working on a robot/prototype (NOT a suit headshot)
- [ ] Aibotics/SaySpark prototype photos + demo video
- [ ] Drone: flight shots, electronics close-up, IEEE booth/award photo
- [ ] SketchBot: hardware + software screenshots
- [ ] ASL glove: on-hand shots, wiring, output screenshot
- [ ] Battery lab: cyclers, EIS setup, graphs
- [ ] Teaching: classroom robotics photos
- [ ] Gallery: soldering, CAD, whiteboards, competitions, demo booths

### Links & facts to fill in (search files for `TODO`)
- [x] LinkedIn, GitHub, Devpost links (wired into contact section)
- [ ] Resume PDF (contact section of `index.html`)
- [ ] Company names + dates in Experience
- [ ] Years in the Timeline section
- [ ] IEEE PIMRC year/citation on the drone page
- [ ] Per-project: exact tech stacks, real challenges, lessons learned
- [ ] Confirm the venture story: site currently presents **Aibotics** as the
      current venture with **SaySpark** as the platform/project that led to it —
      adjust if that's not right
- [ ] "500+ Students Mentored" stat — replace with your real number

## Publishing (free)

**GitHub Pages:** create a repo, push these files, enable Pages
(Settings → Pages → deploy from branch `main`, root). Done.

**Netlify:** drag this folder onto https://app.netlify.com/drop

## Future sections (planned, not built yet)
- Engineering blog (`blog/`) — document builds, lessons, weekly journal
- Awards wall with medal/certificate photos
- Media & testimonials once collected
