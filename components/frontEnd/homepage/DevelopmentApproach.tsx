"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MotionReveal from "../modern/MotionReveal";
import SectionIntro from "../modern/SectionIntro";
import { unsplash } from "../modern/Unsplash";
const stages = [
  ["01", "Evaluate", "Site potential, project brief, access, constraints, priorities and an initial delivery strategy."],
  ["02", "Define", "Architecture, engineering, cost intent, approvals and procurement are aligned before execution accelerates."],
  ["03", "Build", "Milestone-led construction with coordinated trades, quality gates and visible decisions throughout the programme."],
  ["04", "Deliver", "Testing, finishing, documentation and handover are treated as part of the build—not an afterthought."],
];
export default function DevelopmentApproach(){
  const ref=useRef<HTMLDivElement>(null); const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:["start 75%","end 45%"]});
  const progress=useTransform(scrollYProgress,[0,1],["0%","100%"]);
  return <section className="bg-[#f8f6f1] py-24 text-ink lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-12">
    <div className="lg:sticky lg:top-28 lg:self-start"><MotionReveal y={12}><SectionIntro eyebrow="Development approach" title="From opportunity to occupied space." text="We approach buildings as complete developments: commercial intent, design, engineering, procurement, construction and handover are connected from the beginning."/></MotionReveal>
      <div className="relative mt-10 aspect-[16/11] overflow-hidden bg-stone-200"><Image unoptimized src={unsplash.architecture} alt="Architectural design reference photograph from Unsplash" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"/><span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.22em] text-white">From site to handover</span></div>
      <Link href="/services" className="group mt-7 inline-flex items-center gap-3 border-b border-black/35 pb-2 text-[10px] font-semibold uppercase tracking-[.18em]">Explore our capabilities <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
    </div>
    <div ref={ref} className="relative border-t border-stone-300 pl-8 sm:pl-12"><div className="absolute bottom-0 left-0 top-0 w-px bg-stone-300"/><motion.div style={{height:reduced?"100%":progress}} className="absolute left-0 top-0 w-[2px] bg-[#a1844f]"/>
      {stages.map(([number,title,description],i)=><MotionReveal key={number} delay={i*.04} y={18} className="relative border-b border-stone-300 py-10 lg:py-14"><span className="absolute -left-[39px] top-12 h-3 w-3 rounded-full border-2 border-[#a1844f] bg-[#f8f6f1] sm:-left-[55px]"/><div className="flex items-start justify-between gap-5"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-brass-700">{number} / 04</span><span className="text-[9px] uppercase tracking-[.2em] text-stone-500">Process</span></div><h3 className="mt-7 font-display text-[clamp(3.4rem,5vw,6rem)] leading-[.88] tracking-[-.05em]">{title}</h3><p className="mt-6 max-w-lg text-sm leading-8 text-stone-600">{description}</p></MotionReveal>)}
    </div>
  </div></section>;
}
