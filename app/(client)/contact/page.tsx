import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PublicPageHero from "@/components/frontEnd/modern/PublicPageHero";
import EditorialPhoto from "@/components/frontEnd/modern/EditorialPhoto";
import ConsultationForm from "@/components/frontEnd/consultation-form";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";

export default function ContactPage() {
  return (
    <main className="bg-stone-50 text-ink">
      <PublicPageHero index="05" eyebrow="Project enquiries" title="Tell us what you want to build." intro="Whether you have a site, an early idea, drawings already underway or a project that needs a stronger delivery partner, start with the essentials." aside="Residential · Commercial · Estate · Interiors" href="#enquiry" linkLabel="Start an enquiry" />
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">
        <div className="relative min-h-[350px] overflow-hidden bg-ink sm:min-h-[500px]">
          <EditorialPhoto src={unsplash.contactHero} alt="Contemporary architecture and thoughtfully designed residential spaces" className="absolute inset-0" eager priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
          <div className="relative flex min-h-[350px] items-end px-6 pb-8 text-white sm:min-h-[500px] sm:px-10 sm:pb-12">
            <div className="border-l border-brass-300 pl-5 text-[11px] font-semibold uppercase leading-6 tracking-[.22em]">Macniss Builders<br/>Karnataka</div>
          </div>
        </div>
      </section>
      <section id="enquiry" className="mx-auto grid max-w-[1440px] scroll-mt-24 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-12 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-[10px] uppercase tracking-[.22em] text-brass-700">Contact</div>
          <h2 className="mt-5 font-display text-5xl tracking-[-.05em] sm:text-6xl">Begin with the practical details.</h2>
          <p className="mt-6 max-w-md leading-7 text-stone-600">Share the location, project type, approximate scope and where you are in the decision process. The team can then respond with a useful next step.</p>
          <div className="mt-10 border-t border-stone-300">
            <div className="flex gap-4 border-b border-stone-300 py-5"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brass-700"/><div><div className="text-[10px] uppercase tracking-[.18em] text-stone-600">Regions</div><p className="mt-1">Bengaluru · Kodagu · Karnataka</p></div></div>
            <div className="flex gap-4 border-b border-stone-300 py-5"><Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brass-700"/><div><div className="text-[10px] uppercase tracking-[.18em] text-stone-600">Project team</div><p className="mt-1">Use the enquiry form for the fastest routing.</p></div></div>
            <div className="flex gap-4 border-b border-stone-300 py-5"><Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brass-700"/><div><div className="text-[10px] uppercase tracking-[.18em] text-stone-600">Website</div><p className="mt-1">macnissbuilders.in</p></div></div>
          </div>
          <Link href="/our-works" className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-2 text-[10px] font-semibold uppercase tracking-[.18em]">Explore developments <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
        </div>
        <div className="border border-stone-300 bg-white p-5 shadow-[0_16px_70px_-48px_rgba(0,0,0,.4)] sm:p-8 lg:p-10">
          <ConsultationForm />
        </div>
      </section>
    </main>
  );
}
