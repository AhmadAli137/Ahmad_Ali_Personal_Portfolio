import { BookCallButton } from "./book-call";
import { Eyebrow, TextLink } from "./ui";
import { links } from "@/lib/profile";

/** Closes the home and about pages: who should get in touch, and how. */
export function ContactBlock() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Eyebrow className="mb-4">Contact</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Let&apos;s <span className="font-serif italic tracking-[-0.01em]">talk.</span>
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-12 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium tracking-tight">Investors and advisors</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              I&apos;m glad to walk through the product, the roadmap, and what years in classrooms
              taught me about how kids learn to build.
            </p>
            <div className="mt-5">
              <BookCallButton />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium tracking-tight">Schools and partners</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Pilot classrooms get SaySpark free. If you teach, run a program, or want to put robots
              in front of students, start here.
            </p>
            <div className="mt-5">
              <TextLink href={links.saysparkContact} external>
                Ask about a pilot
              </TextLink>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium tracking-tight">Everything else</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Research, speaking, workshops, mentoring, or a problem you think I&apos;d enjoy.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <TextLink href={links.email} external>
                  Email
                </TextLink>
              </li>
              <li>
                <TextLink href={links.linkedin} external>
                  LinkedIn
                </TextLink>
              </li>
              <li>
                <TextLink href={links.github} external>
                  GitHub
                </TextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
