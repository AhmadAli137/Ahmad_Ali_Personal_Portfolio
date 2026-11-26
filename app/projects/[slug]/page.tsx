import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { DemoFrame } from "@/components/demo-frame";
import { Gallery } from "@/components/gallery";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { dimsOf } from "@/lib/image-dims";
import { DOMAIN_LABELS, getProject, projects, projectsByRecency } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{title}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((i) => (
        <li key={i} className="border-b border-line py-3 text-[15px] leading-relaxed">
          {i}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const order = projectsByRecency;
  const at = order.findIndex((p) => p.slug === project.slug);
  const prev = order[(at - 1 + order.length) % order.length];
  const next = order[(at + 1) % order.length];

  const heroSrc = project.heroSrc ?? project.cardSrc;
  const [heroW, heroH] = heroSrc ? dimsOf(heroSrc) : [0, 0];
  const heroIsTall = heroH > heroW * 1.15;
  const photos = project.gallery
    .filter((g): g is { caption: string; src: string } => Boolean(g.src))
    .map((g) => ({ src: g.src, alt: g.caption, caption: g.caption }));

  const facts = [
    { label: "Year", value: String(project.year) },
    { label: "Field", value: DOMAIN_LABELS[project.domain] },
    { label: "Context", value: project.event },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pt-14">
      <Link
        href="/work"
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} aria-hidden className="transition-transform group-hover:-translate-x-1" />
        All work
      </Link>

      <header className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
        <div>
          {project.result && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent">
              <Award size={15} aria-hidden />
              {project.result}
            </p>
          )}
          <h1 className="text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.03] tracking-[-0.035em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{project.tagline}</p>
          {project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <ButtonLink key={l.label} href={l.href} variant={i === 0 ? "solid" : "outline"} external>
                  {l.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
        <dl className="self-end border-t border-line">
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[80px_1fr] gap-4 border-b border-line py-3.5">
              <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{f.label}</dt>
              <dd className="text-[15px] leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {heroSrc && (
        <figure className={`mt-14 ${heroIsTall ? "mx-auto max-w-md" : ""}`}>
          <Image
            src={heroSrc}
            alt={project.heroCaption}
            width={heroW}
            height={heroH}
            priority
            sizes={heroIsTall ? "(max-width: 640px) 100vw, 448px" : "(max-width: 1152px) 100vw, 1104px"}
            className="h-auto max-h-[80vh] w-full rounded-2xl bg-ink/5 object-cover"
          />
          <figcaption className="mt-3 text-xs text-faint">{project.heroCaption}</figcaption>
        </figure>
      )}

      {(project.problem || project.solution) && (
        <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {project.problem && (
            <Block title="The problem">
              <p className="text-xl leading-relaxed tracking-[-0.01em]">{project.problem}</p>
            </Block>
          )}
          {project.solution && (
            <Block title="What I built">
              <p className="text-lg leading-relaxed text-muted">{project.solution}</p>
            </Block>
          )}
        </section>
      )}

      {project.demoUrl && (
        <section className="mt-20">
          <Eyebrow className="mb-4">Live demo</Eyebrow>
          <DemoFrame url={project.demoUrl} title={project.title} poster={project.cardSrc ?? project.heroSrc} />
        </section>
      )}

      {!project.demoUrl && project.videoUrl && (
        <section className="mt-20">
          <Eyebrow className="mb-4">Demo video</Eyebrow>
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-line">
            <iframe
              src={project.videoUrl}
              title={`${project.title} — demo video`}
              className="aspect-[9/16] w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {(project.features.length > 0 || project.stack.length > 0) && (
        <section className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          {project.features.length > 0 && (
            <Block title="How it works">
              <Bullets items={project.features} />
            </Block>
          )}
          {project.stack.length > 0 && (
            <Block title="Built with">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </section>
      )}

      {(project.challenges.length > 0 || project.lessons.length > 0) && (
        <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {project.challenges.length > 0 && (
            <Block title="What was hard">
              <Bullets items={project.challenges} />
            </Block>
          )}
          {project.lessons.length > 0 && (
            <Block title="What it taught me">
              <Bullets items={project.lessons} />
            </Block>
          )}
        </section>
      )}

      {project.next && (
        <section className="mt-20 max-w-3xl">
          <Block title="Outcome and what's next">
            <p className="text-lg leading-relaxed text-muted">{project.next}</p>
          </Block>
        </section>
      )}

      {photos.length > 0 && (
        <section className="mt-20">
          <Eyebrow className="mb-6">Gallery</Eyebrow>
          <Gallery photos={photos} />
        </section>
      )}

      <nav aria-label="More projects" className="mt-24 grid border-t border-line sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group border-b border-line py-7 sm:border-r sm:pr-8">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            <ArrowLeft size={13} aria-hidden className="transition-transform group-hover:-translate-x-1" /> Previous
          </span>
          <span className="mt-2 block text-xl font-medium tracking-tight">{prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group border-b border-line py-7 sm:pl-8 sm:text-right">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:justify-end">
            Next <ArrowRight size={13} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 block text-xl font-medium tracking-tight">{next.title}</span>
        </Link>
      </nav>
    </main>
  );
}
