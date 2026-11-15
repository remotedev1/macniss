import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "../modern/ImageReveal";
import MotionReveal from "../modern/MotionReveal";
import { unsplash } from "../modern/Unsplash";

const sectors = [
  { no: "01", title: "Residential", meta: "Homes · Villas · Communities", text: "Private residences and low-density developments shaped around land, climate, privacy and long-term value.", photo: unsplash.residence },
  { no: "02", title: "Commercial", meta: "Offices · Mixed use · Retail", text: "Commercial environments planned around operational efficiency, service coordination, flexibility and durable finishes.", photo: unsplash.commercial },
  { no: "03", title: "Estate", meta: "Retreats · Hospitality · Landscape", text: "Terrain-led projects that respond carefully to views, rainfall, access, vegetation and the character of the site.", photo: unsplash.estate },
  { no: "04", title: "Design + Build", meta: "Brief · Design · Delivery", text: "One accountable delivery path connecting feasibility, architecture, engineering, procurement, construction and interiors.", photo: unsplash.architecture },
];
export default function DevelopmentSectors() {
  return <section className="bg-[#eae5da] py-24 text-ink lg:py-36">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <div className="grid gap-8 border-b border-black/20 pb-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <MotionReveal><div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.25em] text-brass-700"><span className="h-px w-10 bg-brass-700"/>Development sectors</div></MotionReveal>
        <MotionReveal y={12}><h2 className="font-display text-[clamp(3.5rem,7.5vw,8.5rem)] leading-[.83] tracking-[-.055em]">Different sites.<br/><em>One delivery standard.</em></h2><p className="mt-7 max-w-2xl text-sm leading-8 text-stone-600">From a single family home to a commercial asset or estate retreat, the process starts with the same question: what should this site become, and how do we deliver it well?</p></MotionReveal>
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[290px]">
        {sectors.map((sector,i)=><ImageReveal key={sector.no} className={`group relative min-h-[370px] overflow-hidden bg-ink text-white lg:min-h-0 ${i===0||i===3?'lg:col-span-7':'lg:col-span-5'}`}>
          <Image unoptimized src={sector.photo} alt={`Illustrative ${sector.title.toLowerCase()} architecture photograph from Unsplash`} fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover opacity-75 transition-transform duration-[1200ms] group-hover:scale-[1.075]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/20"/>
          <div className="relative flex h-full min-h-[370px] flex-col justify-between p-6 lg:min-h-0 lg:p-8">
            <div className="flex items-center justify-between border-b border-white/30 pb-4 text-[10px] font-semibold tracking-[.2em]"><span>{sector.no} / 04</span><ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></div>
            <div><span className="text-[10px] uppercase tracking-[.2em] text-brass-300">{sector.meta}</span><h3 className="mt-3 font-display text-[clamp(2.7rem,4.5vw,5rem)] leading-[.9] tracking-[-.05em]">{sector.title}</h3><p className="mt-5 max-w-lg text-sm leading-7 text-white/80">{sector.text}</p></div>
          </div>
        </ImageReveal>)}
      </div>
      <Link href="/services" className="group mt-10 inline-flex items-center gap-4 border-b border-black pb-3 text-[11px] font-semibold uppercase tracking-[.2em]">Explore capabilities <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>
    </div>
  </section>;
}
