import { Compass, ShieldCheck, TimerReset, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MotionReveal from "./modern/MotionReveal";
import SectionIntro from "./modern/SectionIntro";
import { unsplash } from "./modern/Unsplash";

const points = [
  ["01", "Development clarity", "Site constraints, design intent, budget priorities and delivery strategy are aligned before expensive decisions become difficult to change.", Compass],
  ["02", "Quality discipline", "Structured checkpoints create accountability from excavation and structure through waterproofing, services, finishes and handover.", ShieldCheck],
  ["03", "Delivery control", "Milestone-led planning keeps drawings, procurement, site teams and client decisions connected to the project programme.", TimerReset],
] as const;
export default function WhyChoose({about=false}:{about?:boolean}){
  return <section id="why-macniss" className="bg-[#f8f6f1] py-24 text-ink lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-12">
    <div><MotionReveal y={12}><SectionIntro eyebrow="Why Macniss" title="Development thinking. Construction discipline." text="A building performs best when commercial intent, design, engineering and execution are treated as one connected problem. We keep those decisions visible from brief to handover."/>{about&&<Link href="/about-us" className="group mt-8 inline-flex items-center gap-2 border-b border-black/35 pb-2 text-[11px] font-semibold uppercase tracking-[.18em]">Our approach <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>}</MotionReveal>
      <MotionReveal y={18} className="relative mt-12 hidden aspect-[5/3] overflow-hidden lg:block"><Image unoptimized src={unsplash.estate} fill sizes="40vw" alt="Illustrative modern residential architecture from Unsplash" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/></MotionReveal>
    </div><div className="border-t border-black/25">{points.map(([number,title,description,Icon],index)=><MotionReveal key={number} y={14} delay={index*.05} className="group grid gap-4 border-b border-black/20 py-9 sm:grid-cols-[52px_1fr_auto] sm:items-start lg:py-12"><span className="pt-1 text-[10px] font-bold tracking-[.2em] text-brass-700">{number}</span><div><h3 className="font-display text-[clamp(2.4rem,3.4vw,4rem)] leading-[.95] tracking-[-.04em]">{title}</h3><p className="mt-5 max-w-lg text-sm leading-7 text-stone-600">{description}</p></div><span className="grid h-11 w-11 place-items-center rounded-full border border-black/25 transition group-hover:bg-ink group-hover:text-white"><Icon className="h-5 w-5"/></span></MotionReveal>)}</div>
  </div></section>;
}
