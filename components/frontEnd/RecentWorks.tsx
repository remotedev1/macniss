"use client";
import {useEffect,useRef,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft,ArrowRight,ArrowUpRight} from "lucide-react";
import MotionReveal from "./modern/MotionReveal";
import SectionIntro from "./modern/SectionIntro";
import {unsplash} from "./modern/Unsplash";
type Work = {id:string;projectName:string;projectTagline?:string;overview?:string;location?:string;projectType?:string;status?:string;startDate?:string;imageGallery?:{url:string}[];isArchived?:boolean};
const fallback:Work[]=[
  {id:"demo-1",projectName:"Verdant Villas",projectTagline:"A low-density residential development shaped by landscape and long-term value.",location:"Bengaluru",projectType:"RESIDENTIAL",status:"ACTIVE",startDate:"2025-01-15",imageGallery:[{url:unsplash.residence}]},
  {id:"demo-2",projectName:"Axis Business Centre",projectTagline:"Flexible commercial space designed for efficient construction and adaptable occupancy.",location:"Whitefield, Bengaluru",projectType:"COMMERCIAL",status:"ACTIVE",startDate:"2024-08-20",imageGallery:[{url:unsplash.commercial}]},
  {id:"demo-3",projectName:"Coffee Estate Retreat",projectTagline:"A contemporary estate home rooted in terrain, climate and material character.",location:"Kodagu",projectType:"RESIDENTIAL",status:"COMPLETED",startDate:"2023-06-01",imageGallery:[{url:unsplash.estate}]},
];
const year=(date?:string)=>date&&!Number.isNaN(new Date(date).getTime())?new Date(date).getFullYear():"—";
const label=(value="Project")=>value.replaceAll("_"," ");
export default function RecentWorks(){
  const [works,setWorks]=useState<Work[]>([]); const rail=useRef<HTMLDivElement>(null);
  useEffect(()=>{const controller=new AbortController();fetch("/api/projects",{signal:controller.signal}).then(r=>r.json()).then(d=>setWorks(Array.isArray(d)?d.filter((p:Work)=>!p.isArchived):[])).catch(()=>{});return()=>controller.abort()},[]);
  const items=(works.length?works:fallback).slice(0,6);
  const move=(dir:number)=>rail.current?.scrollBy({left:dir*(rail.current.clientWidth*.85),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  const hrefFor=(p:Work)=>String(p.id).startsWith("demo-")?"/our-works":`/our-works/${p.id}`;
  return <section className="bg-[#131613] py-24 text-white lg:py-36" id="selected-developments">
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col justify-between gap-10 border-b border-white/20 pb-10 lg:flex-row lg:items-end"><MotionReveal y={12}><SectionIntro eyebrow="Selected developments" title="A portfolio built in context." text="Current and completed work across residential, commercial and estate development in Karnataka." light/></MotionReveal>
      <div className="flex items-center gap-3"><button type="button" onClick={()=>move(-1)} aria-label="Previous projects" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition hover:bg-white hover:text-ink"><ArrowLeft className="h-5 w-5"/></button><button type="button" onClick={()=>move(1)} aria-label="Next projects" className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition hover:bg-white hover:text-ink"><ArrowRight className="h-5 w-5"/></button></div></div>
    </div>
    <div ref={rail} aria-label="Selected developments" className="hide-scroll-bar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pl-5 pr-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1344px)/2))] lg:pr-12">
      {items.map((p,i)=><Link key={p.id||i} href={hrefFor(p)} className="group block w-[min(86vw,870px)] shrink-0 snap-start" aria-label={`View ${p.projectName}`}><div className="relative aspect-[4/4.2] overflow-hidden bg-[#343a34] sm:aspect-[16/10]"><Image unoptimized src={p.imageGallery?.[0]?.url||[unsplash.residence,unsplash.commercial,unsplash.estate][i%3]} alt={p.projectName} fill sizes="(max-width:640px) 85vw, 870px" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.055]"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/30"/><div className="absolute left-5 right-5 top-5 flex justify-between border-t border-white/45 pt-4 text-[10px] font-medium uppercase tracking-[.2em] sm:left-9 sm:right-9 sm:top-9"><span>{String(i+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><span>{label(p.projectType)}</span></div><div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10"><span className="text-[10px] uppercase tracking-[.2em] text-brass-300">{String(p.id).startsWith("demo-")?"Illustrative concept · Unsplash photography":`${p.location||label(p.projectType)} · ${year(p.startDate)}`}</span><h3 className="mt-4 max-w-3xl font-display text-[clamp(3rem,6.5vw,7rem)] leading-[.88] tracking-[-.055em]">{p.projectName}</h3><div className="mt-5 flex items-end justify-between gap-5 border-t border-white/35 pt-5"><p className="max-w-lg text-xs leading-6 text-white/80 sm:text-sm">{p.projectTagline||p.overview}</p><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/55 transition group-hover:bg-white group-hover:text-ink"><ArrowUpRight className="h-5 w-5"/></span></div></div></div></Link>)}
    </div><div className="mx-auto mt-9 max-w-[1440px] px-5 sm:px-8 lg:px-12"><Link href="/our-works" className="group inline-flex items-center gap-3 border-b border-white/45 pb-3 text-[11px] font-semibold uppercase tracking-[.2em]">View entire portfolio <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1"/></Link></div>
  </section>;
}
