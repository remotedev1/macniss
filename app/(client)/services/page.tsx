import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PublicPageHero from "@/components/frontEnd/modern/PublicPageHero";
import ServicesWeOffer from "@/components/frontEnd/ServicesWeOffer";
import EditorialPhoto from "@/components/frontEnd/modern/EditorialPhoto";
import { Stagger, StaggerItem } from "@/components/frontEnd/modern/Stagger";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";

const process = [
  ["01", "Feasibility", "Site, brief, budget and constraints are clarified before expensive decisions are made."],
  ["02", "Definition", "Scope, consultants, materials and delivery responsibilities are aligned into one buildable plan."],
  ["03", "Execution", "Procurement, site coordination, quality checks and reporting are managed with disciplined ownership."],
  ["04", "Handover", "Testing, closure, documentation and final detailing are completed before the space is handed over."],
];

export default function Services() {
  return (
    <main className="bg-stone-50 text-ink">
      <PublicPageHero index="02" eyebrow="Services & capabilities" title="One development partner. Fewer handoffs." intro="Macniss combines development thinking with construction delivery, helping clients move from an early brief to a finished property with one accountable team." aside="Residential · Commercial · Estate · Turnkey · Interiors" href="#capabilities" linkLabel="Explore capabilities" />

      <section aria-label="Illustrative architecture and construction imagery" className="mx-auto grid max-w-[1440px] gap-3 px-5 py-7 sm:px-8 lg:grid-cols-[1.35fr_.65fr] lg:px-12 lg:py-10">
        <EditorialPhoto src={unsplash.serviceHero} alt="Contemporary architectural building exterior" className="min-h-[320px] sm:min-h-[500px]" eager priority />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <EditorialPhoto src={unsplash.serviceStructure} alt="Architectural structure and facade detail" className="min-h-[185px]" />
          <EditorialPhoto src={unsplash.interior} alt="Interior construction finish and material detail" className="min-h-[185px]" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">How we work</div>
            <h2 className="mt-5 max-w-md font-display text-5xl leading-[.94] tracking-[-.05em] sm:text-6xl">Decisions first. Construction second.</h2>
            <div className="mt-9 h-px w-20 bg-brass-700" />
          </div>
          <Stagger className="border-t border-stone-300">
            {process.map(([n, title, text]) => (
              <StaggerItem key={n}>
                <article className="grid gap-5 border-b border-stone-300 py-8 sm:grid-cols-[58px_.6fr_1fr] sm:items-start lg:py-10">
                  <span className="text-xs text-brass-700">{n}</span>
                  <h3 className="font-display text-3xl tracking-[-.035em]">{title}</h3>
                  <p className="max-w-xl leading-7 text-stone-600">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div id="capabilities" className="scroll-mt-24"><ServicesWeOffer /></div>

      <section className="relative overflow-hidden bg-ink text-white">
        <EditorialPhoto src={unsplash.estate} alt="" className="pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-32">
          <div>
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-300">Start with the brief</div>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">Need help defining what to build?</h2>
          </div>
          <Link href="/contact" className="group inline-flex w-fit items-center gap-3 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[.18em]">Discuss your project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
        </div>
      </section>
    </main>
  );
}
