# ahmadali.ca

Personal site of Ahmad Ali — founder of SaySpark, and an engineer across robotics, AI and EV battery systems.

Live at **[ahmadali.ca](https://ahmadali.ca)**.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) icons
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Content is data-driven. Projects live in `lib/projects.ts` (one typed entry per page under
`/projects/[slug]`), the competition record in `lib/competitions.ts`, photos in `lib/photos.ts`,
and everything said about Ahmad in more than one place in `lib/profile.ts`.
