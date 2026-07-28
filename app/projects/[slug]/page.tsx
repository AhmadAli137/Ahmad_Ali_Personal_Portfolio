import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Ph } from "@/components/image-placeholder";
import { Hud } from "@/components/hud";
import { Btn, Chip, Chips } from "@/components/ui";
import { getProject, projects } from "@/lib/projects";

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

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-lg text-mint">
      <span className="text-muted">## </span>
      {children}
    </h2>
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

  return (
    <main className="px-6 pb-10 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[13px] text-muted">
          <Link href="/" className="hover:text-cyan">home</Link> /{" "}
          <Link href="/#work" className="hover:text-cyan">work</Link> / {project.slug}
        </p>
        <div className="mb-4"><Chip tone={project.badgeTone}>{project.badge}</Chip></div>
        <h1 className="mb-3.5 text-4xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mb-6 max-w-2xl text-lg text-muted">{project.tagline}</p>
        <div className="mb-6"><Chips items={project.chips} /></div>
        <Hud>
          <Ph caption={project.heroCaption} minH="min-h-[440px]" className="shadow-[0_0_60px_rgba(0,229,255,0.08)]" />
        </Hud>

        <Reveal className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <H2>Problem</H2>
            <p className="text-muted">{project.problem}</p>
          </div>
          <div>
            <H2>Solution</H2>
            <p className="text-muted">{project.solution}</p>
          </div>
        </Reveal>

        {project.demoCaption && (
          <Reveal className="pb-10">
            <H2>Demo</H2>
            {/* TODO: embed real demo video */}
            <Ph caption={project.demoCaption} minH="min-h-[420px]" />
            {project.demoNote && <p className="mt-3.5 text-muted">{project.demoNote}</p>}
          </Reveal>
        )}

        <Reveal className="grid gap-10 py-6 lg:grid-cols-2">
          <div>
            <H2>Features</H2>
            <ul className="list-disc space-y-2 pl-5 text-muted">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div>
            <H2>Tech Stack</H2>
            <Chips items={project.stack} />
          </div>
        </Reveal>

        <Reveal className="grid gap-10 py-10 lg:grid-cols-2">
          <div>
            <H2>Challenges</H2>
            <ul className="list-disc space-y-2 pl-5 text-muted">
              {project.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div>
            <H2>Lessons Learned</H2>
            <ul className="list-disc space-y-2 pl-5 text-muted">
              {project.lessons.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </Reveal>

        {project.next && (
          <Reveal className="py-6">
            <H2>What&apos;s Next</H2>
            <p className="max-w-3xl text-muted">{project.next}</p>
          </Reveal>
        )}

        {project.galleryCaptions.length > 0 && (
          <Reveal className="py-10">
            <H2>Gallery</H2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {project.galleryCaptions.map((c) => (
                <Ph key={c} caption={c} minH="min-h-[170px]" />
              ))}
            </div>
          </Reveal>
        )}

        <div className="flex flex-wrap gap-3.5 py-8">
          {project.links.map((l) =>
            l.href.startsWith("/") ? (
              <Btn key={l.label} href={l.href}>{l.label} →</Btn>
            ) : (
              <Btn key={l.label} href={l.href} external>{l.label} →</Btn>
            )
          )}
          <Btn href="/#work" variant="primary">← All Projects</Btn>
        </div>
      </div>
    </main>
  );
}
