import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HeroSequence from "./HeroSequence";

export default function Hero() {
  return (
    <section className="home-hero relative isolate flex flex-col bg-[#171815] text-white" aria-labelledby="home-title" aria-describedby="home-build-description">
      <HeroSequence />
      <p id="home-build-description" className="sr-only">
        An architectural study of a Karnataka residence. Brass lines trace the site, columns and slabs before the finished home comes into view.
      </p>
      <div className="home-hero-shade pointer-events-none absolute inset-0 z-[1]" />

      <div className="home-shell home-hero-content relative z-[2] flex flex-1 flex-col justify-end pb-12 pt-36 sm:pb-16 lg:pb-[4.5rem]">
        <p className="home-hero-copy home-kicker mb-5 flex items-center gap-3 text-[#f1d6a5] sm:mb-7">
          <span className="h-px w-8 bg-current sm:w-12" aria-hidden="true" />
          Property development &amp; construction
        </p>
        <h1 id="home-title" className="home-hero-copy home-headline font-display">
          From ground<br />to <em className="text-[#f0d6a6]">landmark.</em>
        </h1>
        <p className="home-hero-copy mt-6 max-w-[26rem] text-sm leading-7 text-[#f0ede7] sm:mt-8 sm:text-base">
          Macniss develops and builds homes, commercial spaces and estates across Karnataka, from the first site visit to the final handover.
        </p>
        <div className="home-hero-copy mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
          <Link href="/our-works" className="home-button home-button-gold">
            Explore projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link href="#consultation-form" className="home-button home-button-glass">
            Start a project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="home-shell relative z-[3]">
        <div className="home-hero-rail flex items-center justify-between border-t border-white/30 py-4 sm:py-5">
          <a href="#development-story" className="home-kicker inline-flex min-h-11 items-center gap-2 text-white">
            <ArrowDown size={15} aria-hidden="true" /> Discover
          </a>
        </div>
      </div>
    </section>
  );
}
