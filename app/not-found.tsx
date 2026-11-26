import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-28 sm:py-40">
      <Eyebrow className="mb-5">404</Eyebrow>
      <h1 className="max-w-2xl text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.03] tracking-[-0.035em]">
        That page isn&apos;t here.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        It may have moved when the site was reorganized. The work index and the home page are the
        best places to pick the trail back up.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="outline">
          All work
        </ButtonLink>
      </div>
    </main>
  );
}
