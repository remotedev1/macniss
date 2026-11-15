import Image from "next/image";
import MotionReveal from "../modern/MotionReveal";
import { unsplash } from "../modern/Unsplash";
import ImageReveal from "../modern/ImageReveal";

const principles = [
  ["Development", "Site, value and long-term use guide the brief."],
  ["Construction", "Engineering discipline turns the brief into a reliable build."],
  ["Delivery", "Clear milestones keep decisions, cost and programme visible."],
];

export default function DevelopmentStatement() {
  return (
    <section id="development-story" className="bg-[#d8c29a] text-ink">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <ImageReveal className="relative min-h-[480px] overflow-hidden lg:min-h-[680px]">
          <Image unoptimized src={unsplash.exterior} alt="Contemporary development by Macniss" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 border-t border-white/35 pt-4 text-[10px] uppercase tracking-[.2em] text-white sm:bottom-10 sm:left-10 sm:right-10">
            Development · Construction · Interiors
          </div>
        </ImageReveal>
        <div className="flex flex-col justify-between px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
          <MotionReveal>
            <div className="text-[10px] font-semibold uppercase tracking-[.24em] text-stone-800">Built as a whole</div>
            <h2 className="mt-6 font-display text-[clamp(3rem,5.5vw,6rem)] leading-[.92] tracking-[-.055em]">
              We develop places,<br />not just structures.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-black/65">
              The best projects are commercially sensible, technically resolved and enjoyable to use. Our role is to keep those priorities connected from the first site conversation through handover.
            </p>
          </MotionReveal>

          <div className="mt-16 border-t border-black/20">
            {principles.map(([title, description], index) => (
              <MotionReveal key={title} delay={index * .05} className="grid gap-2 border-b border-black/20 py-5 sm:grid-cols-[150px_1fr]">
                <h3 className="text-xs font-semibold uppercase tracking-[.16em]">{title}</h3>
                <p className="text-sm leading-6 text-black/60">{description}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
