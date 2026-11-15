import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PublicPageHero from "@/components/frontEnd/modern/PublicPageHero";
import TextReveal from "@/components/frontEnd/modern/TextReveal";
import ImageReveal from "@/components/frontEnd/modern/ImageReveal";
import Parallax from "@/components/frontEnd/modern/Parallax";
import { Stagger, StaggerItem } from "@/components/frontEnd/modern/Stagger";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Macniss",
  "Learn how Macniss approaches property development and construction across Bengaluru, Kodagu and Karnataka, from early site decisions through delivery and interiors.",
  "/about-us",
);

const principles = [
  ["01", "Clarity before commitment", "We define scope, priorities, responsibilities and practical constraints early so the project begins with fewer unknowns.", unsplash.aboutFacade],
  ["02", "Design that can be built", "Architecture, engineering and procurement decisions are judged by both ambition and execution.", unsplash.aboutWorkspace],
  ["03", "Ownership through delivery", "The team stays accountable across planning, construction, finishing and handover rather than passing problems downstream.", unsplash.exterior],
  ["04", "Value beyond completion", "We think about durability, maintenance, usability and long-term property value—not only the completion photograph.", unsplash.aboutMaterial],
] as const;

const strengths = [
  ["Developer mindset", "We assess a project as an asset, not only as a construction package.", unsplash.residence],
  ["Construction discipline", "Site execution, coordination and quality control remain central to how we deliver.", unsplash.commercial],
  ["Design continuity", "Exterior, structure and interior decisions are considered as one connected property experience.", unsplash.interior],
] as const;

function EditorialImage({ src, alt, className = "", caption }: { src: string; alt: string; className?: string; caption?: string }) {
  return (
    <figure className={className}>
      <ImageReveal className="h-full">
        <Parallax distance={24} className="h-full">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Parallax>
      </ImageReveal>
      {caption ? (
        <figcaption className="mt-3 text-[10px] uppercase tracking-[.2em] text-stone-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-stone-50 text-ink">
      <PublicPageHero
        index="01"
        eyebrow="About Macniss"
        title="We develop places. Then we make them real."
        intro="Macniss is a developer and construction company focused on considered residential, commercial and estate projects across Karnataka."
        aside="Bengaluru · Kodagu · Karnataka"
        href="#approach"
        linkLabel="Our approach"
      />

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <EditorialImage
            src={unsplash.aboutHero}
            alt="Modern architectural residence representing Macniss project thinking"
            className="min-h-[420px] overflow-hidden bg-stone-200 sm:min-h-[520px]"
            caption="Integrated development thinking · residential and commercial contexts"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <EditorialImage
              src={unsplash.aboutCourtyard}
              alt="Light-filled interior courtyard and living environment"
              className="min-h-[240px] overflow-hidden bg-stone-200"
              caption="Interiors that support the wider property experience"
            />
            <EditorialImage
              src={unsplash.aboutMaterial}
              alt="Architectural material and facade detail"
              className="min-h-[240px] overflow-hidden bg-stone-200"
              caption="Material clarity · finish quality · long-term value"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">What we believe</div>
            <TextReveal
              as="h2"
              delay={0.08}
              className="mt-5 max-w-lg font-display text-5xl leading-[.94] tracking-[-.052em] sm:text-6xl"
              lines={["Good buildings come", "from disciplined decisions."]}
            />
          </div>
          <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-3xl text-xl leading-9 text-stone-600 sm:text-2xl sm:leading-10">
              We work across the complete development journey—from evaluating a site and shaping the brief to coordinating design, construction, interiors and handover. That wider view helps us protect the quality of the final property while keeping the process understandable for the people investing in it.
            </div>
            <EditorialImage
              src={unsplash.architecture}
              alt="Contemporary building facade and urban context"
              className="min-h-[320px] overflow-hidden bg-stone-200"
              caption="From evaluating a site to shaping the final property experience"
            />
          </div>
        </div>
      </section>

      <section id="approach" className="scroll-mt-24 border-y border-stone-300 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-12 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">Our approach</div>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.92] tracking-[-.05em] sm:text-6xl">A process that stays connected to the end result.</h2>
            </div>
            <p className="max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
              Each stage is approached as part of one property journey. That continuity helps Macniss make clearer decisions about scope, coordination, execution quality and long-term usability.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div className="grid gap-5 lg:sticky lg:top-28 lg:self-start">
              <EditorialImage
                src={unsplash.aboutFacade}
                alt="Architectural exterior facade with warm evening light"
                className="min-h-[420px] overflow-hidden bg-stone-200"
                caption="Development, construction and finishing considered together"
              />
              <EditorialImage
                src={unsplash.kitchen}
                alt="Refined kitchen interior with warm materials"
                className="min-h-[240px] overflow-hidden bg-stone-200"
                caption="Interior outcomes remain part of the overall delivery conversation"
              />
            </div>

            <Stagger className="grid gap-5">
              {principles.map(([n, title, text, image]) => (
                <StaggerItem key={n}>
                  <article className="grid gap-6 border border-stone-200 p-5 sm:p-6 lg:grid-cols-[80px_1fr_220px] lg:items-center">
                    <span className="text-xs text-brass-700">{n}</span>
                    <div>
                      <h3 className="font-display text-3xl tracking-[-.04em] sm:text-4xl">{title}</h3>
                      <p className="mt-3 max-w-2xl leading-7 text-stone-600">{text}</p>
                    </div>
                    <div className="overflow-hidden bg-stone-200">
                      <img src={image} alt="" aria-hidden="true" loading="lazy" className="h-40 w-full object-cover transition duration-700 hover:scale-105 lg:h-44" />
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">How we work</div>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[.92] tracking-[-.05em] sm:text-6xl">Development thinking applied across the full property experience.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-stone-600">
            The same underlying perspective carries from site-level decisions to construction quality and the lived experience of the completed environment.
          </p>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {strengths.map(([title, description, image]) => (
            <StaggerItem key={title}>
              <article className="group overflow-hidden border border-stone-200 bg-white">
                <div className="overflow-hidden">
                  <img src={image} alt="" aria-hidden="true" loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="border-t border-stone-200 p-6">
                  <h3 className="font-display text-3xl tracking-[-.04em]">{title}</h3>
                  <p className="mt-4 leading-7 text-stone-600">{description}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="relative overflow-hidden bg-ink text-white">
          <div className="absolute inset-0">
            <img src={unsplash.exterior} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
          </div>
          <div className="relative flex flex-col gap-10 px-6 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-20">
            <div>
              <div className="text-[10px] uppercase tracking-[.22em] text-brass-300">Next step</div>
              <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
                See how that thinking becomes a built project.
              </h2>
            </div>
            <Link href="/our-works" className="inline-flex w-fit items-center gap-3 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[.18em]">
              Explore developments <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
