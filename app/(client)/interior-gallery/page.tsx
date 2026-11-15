import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PublicPageHero from "@/components/frontEnd/modern/PublicPageHero";
import EditorialPhoto from "@/components/frontEnd/modern/EditorialPhoto";
import InteriorPortfolio from "@/components/frontEnd/modern/InteriorPortfolio";
import { Stagger, StaggerItem } from "@/components/frontEnd/modern/Stagger";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Interior Architecture & Fit-Out",
  "Explore interior architecture, fit-out and finish studies focused on materials, light, joinery and detail across Macniss projects.",
  "/interior-gallery",
);

const ideas = [
  ["01", "Material", "Finishes are selected for how they age, perform and sit together—not only how they look on day one."],
  ["02", "Light", "Openings, surfaces and lighting are coordinated to make rooms feel calm across changing conditions."],
  ["03", "Detail", "Edges, joints, storage and interfaces receive the same attention as the large architectural moves."],
];

export default function Gallery() {
  return (
    <main className="bg-stone-100 text-ink">
      <PublicPageHero index="04" eyebrow="Interior portfolio" title="Architecture doesn't stop at the shell." intro="A study of material, proportion, light and detail across homes and spaces delivered by Macniss." aside="Interior architecture · Fit-out · Joinery · Material coordination" href="#gallery" linkLabel="View interior studies" />
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">
        <div className="grid gap-3 md:grid-cols-[1.5fr_.5fr]">
          <EditorialPhoto src={unsplash.galleryHero} alt="Contemporary living room with architectural material palette" className="min-h-[360px] sm:min-h-[580px]" eager priority />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            <EditorialPhoto src={unsplash.kitchen} alt="Contemporary kitchen finishes and details" className="min-h-[180px]" />
            <EditorialPhoto src={unsplash.aboutWorkspace} alt="Warm interior with natural light" className="min-h-[180px]" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Stagger className="grid gap-10 border-y border-stone-300 py-10 md:grid-cols-3 md:divide-x md:divide-stone-300">
          {ideas.map(([number, title, description]) => (
            <StaggerItem key={number} className="md:pl-8 first:pl-0">
              <div className="text-[10px] uppercase tracking-[.2em] text-brass-700">{number}</div>
              <h2 className="mt-4 font-display text-4xl tracking-[-.04em]">{title}</h2>
              <p className="mt-4 max-w-sm leading-7 text-stone-600">{description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <InteriorPortfolio />
      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24">
          <div>
            <div className="text-[10px] uppercase tracking-[.22em] text-brass-300">Interior delivery</div>
            <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">Bring the architecture all the way inside.</h2>
          </div>
          <Link href="/contact" className="group inline-flex w-fit items-center gap-3 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[.18em]">Talk to our team <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </main>
  );
}
