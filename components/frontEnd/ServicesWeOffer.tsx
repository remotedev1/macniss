"use client";
import {useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import MotionReveal from "./modern/MotionReveal";
import SectionIntro from "./modern/SectionIntro";
import {unsplash} from "./modern/Unsplash";
type Service={id?:string;title?:string;description?:string;image?:{url:string}[]};
const fallbacks:Service[]=[
  {title:"Residential Construction",description:"End-to-end homes built around your site, lifestyle and long-term value.",image:[{url:unsplash.house}]},
  {title:"Commercial Projects",description:"Practical, durable spaces planned for operations, people and performance.",image:[{url:unsplash.commercial}]},
  {title:"Turnkey Delivery",description:"A single accountable team from planning and procurement through handover.",image:[{url:unsplash.architecture}]},
];
export default function ServicesWeOffer({show=false}:{show?:boolean}){
 const [services,setServices]=useState<Service[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/solutions',{signal:controller.signal}).then(r=>r.json()).then(d=>setServices(Array.isArray(d)?d:[])).catch(()=>{});return()=>controller.abort()},[]);
 const items=(services.length?services:fallbacks).slice(0,show?3:12);
 return <section className="bg-[#151815] py-24 text-white lg:py-36"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><MotionReveal y={12}><SectionIntro eyebrow="Capabilities" title="One team. Every stage." text="Integrated construction services designed to reduce handoffs, simplify decisions and keep quality consistent from first sketch to final handover." light/></MotionReveal>
 <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-12">{items.map((s,i)=><MotionReveal key={s.id||s.title||i} y={18} delay={i*.04} className={`group relative min-h-[440px] overflow-hidden bg-[#292d28] ${i===0?'md:col-span-2 lg:col-span-6':'lg:col-span-3'}`}><Image unoptimized src={s.image?.[0]?.url||[unsplash.residence,unsplash.commercial,unsplash.architecture][i%3]} alt={s.title||'Construction service'} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover opacity-70 transition-transform duration-[1100ms] group-hover:scale-[1.08]"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20"/><div className="relative flex min-h-[440px] flex-col justify-between p-6 lg:p-8"><div className="flex items-start justify-between border-b border-white/30 pb-4 text-[10px] uppercase tracking-[.22em]"><span>0{i+1} / {String(items.length).padStart(2,'0')}</span><ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></div><div><h3 className="font-display text-[clamp(2.6rem,3.6vw,4.7rem)] leading-[.93] tracking-[-.04em]">{s.title}</h3><p className="mt-5 max-w-sm text-sm leading-7 text-white/80">{s.description}</p></div></div></MotionReveal>)}</div>
 {show&&<Link href="/services" className="group mt-9 inline-flex items-center gap-3 border-b border-white/40 pb-3 text-[11px] font-semibold uppercase tracking-[.2em]">View all capabilities <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link>}</div></section>;
}
