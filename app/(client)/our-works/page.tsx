"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import EditorialPhoto from "@/components/frontEnd/modern/EditorialPhoto";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";

type Project = {
  id: string;
  projectName: string;
  projectTagline?: string | null;
  projectType: string;
  status: string;
  location: string;
  startDate?: string | null;
  completionDate?: string | null;
  imageGallery?: { url: string }[];
  overview?: string | null;
  isArchived?: boolean;
};

const statusTabs = [["ALL","All"],["ACTIVE","In development"],["COMPLETED","Completed"]];
const typeLabel = (value="Project") => value.replaceAll("_", " ");
const getYear = (project: Project) => {
  const value = project.completionDate || project.startDate;
  return value ? new Date(value).getFullYear() : "—";
};

export default function Works(){
  const [projects,setProjects]=useState<Project[]>([]);
  const [status,setStatus]=useState("ALL");
  const [type,setType]=useState("ALL");
  const [loading,setLoading]=useState(true);
  const reducedMotion=useReducedMotion();

  useEffect(()=>{const controller=new AbortController();fetch("/api/projects",{signal:controller.signal}).then(r=>{if(!r.ok)throw new Error("Projects unavailable");return r.json()}).then(d=>setProjects(Array.isArray(d)?d.filter(p=>!p.isArchived):[])).catch(()=>{}).finally(()=>setLoading(false));return()=>controller.abort()},[]);
  const types=useMemo(()=>["ALL",...new Set(projects.map(p=>p.projectType).filter(Boolean))],[projects]);
  const filtered=useMemo(()=>projects.filter(p=>(status==="ALL"||p.status===status)&&(type==="ALL"||p.projectType===type)),[projects,status,type]);

  return <main className="min-h-screen bg-stone-50 pt-36 text-ink">
    <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
      <div className="grid gap-10 border-b border-stone-300 pb-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[.28em] text-brass-700">Development portfolio · Karnataka</div>
          <h1 className="mt-7 font-display text-[clamp(4.3rem,10vw,10rem)] leading-[.78] tracking-[-.07em]">Places we<br/><span className="text-stone-600">are building.</span></h1>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-xl text-base leading-8 text-stone-600">Residential, commercial and estate projects approached as complete developments—from the first site decision through construction, interiors and handover.</p>
          <div className="mt-7 flex items-center justify-between border-t border-stone-300 pt-5 text-[10px] uppercase tracking-[.18em] text-stone-600"><span>{filtered.length} projects shown</span><span>Macniss portfolio</span></div>
        </div>
      </div>

      <div className="relative -mx-5 mb-12 mt-10 h-[380px] overflow-hidden sm:-mx-8 sm:h-[520px] lg:-mx-12">
        <EditorialPhoto src={unsplash.portfolioHero} alt="Contemporary residential development architecture" className="h-full w-full" eager priority />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span className="absolute bottom-7 left-6 text-[10px] font-semibold uppercase tracking-[.24em] text-white sm:left-10">Architecture / development / places</span>
      </div>
      <div className="sticky top-20 z-20 -mx-5 border-b border-stone-300 bg-stone-50/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">{statusTabs.map(([key,label])=><button key={key} onClick={()=>setStatus(key)} aria-pressed={status===key} className={`border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[.16em] transition ${status===key?'border-ink bg-ink text-white':'border-stone-300 hover:border-ink'}`}>{label}</button>)}</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">{types.map(key=><button key={key} onClick={()=>setType(key)} aria-pressed={type===key} className={`text-[9px] font-semibold uppercase tracking-[.16em] transition ${type===key?'text-ink underline underline-offset-4':'text-stone-600 hover:text-ink'}`}>{key==="ALL"?"All sectors":typeLabel(key)}</button>)}</div>
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-x-5 gap-y-14 md:grid-cols-2">
        {filtered.map((p,i)=><motion.article layout initial={reducedMotion?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reducedMotion?0:.6,delay:Math.min(i*.045,.2)}} key={p.id} className={i%3===0?"md:col-span-2":""}>
          <Link href={`/our-works/${p.id}`} className={`group grid ${i%3===0?'md:grid-cols-[1.25fr_.75fr] md:bg-[#161816] md:text-white':''}`}>
            <div className={`relative overflow-hidden bg-stone-200 ${i%3===0?'aspect-[16/10] md:aspect-[16/8]':'aspect-[4/3]'}`}>
              <Image unoptimized src={p.imageGallery?.[0]?.url||unsplash.portfolioHero} alt={p.imageGallery?.[0]?.url ? p.projectName : "Illustrative architectural photograph"} fill className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035]" sizes={i%3===0?"100vw":"(max-width:768px) 100vw, 50vw"}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
              {!p.imageGallery?.[0]?.url && <div className="absolute right-4 top-4 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[.12em] text-white backdrop-blur">Illustrative image</div>}
              <div className="absolute left-4 top-4 bg-black/35 px-3 py-2 text-[9px] font-semibold uppercase tracking-[.18em] text-white backdrop-blur sm:left-5 sm:top-5">{p.status==="ACTIVE"?"In development":"Completed"}</div>
            </div>
            <div className={`${i%3===0?'flex flex-col justify-between p-6 sm:p-8 md:p-10':'pt-5'}`}>
              <div className={`flex items-center justify-between text-[9px] uppercase tracking-[.18em] text-stone-600 ${i%3===0?'border-b border-stone-300 pb-5 md:border-white/15 md:text-stone-400':''}`}><span>{typeLabel(p.projectType)}</span><span>{getYear(p)}</span></div>
              <div className={i%3===0?'py-10':''}>
                <div className={`text-[9px] uppercase tracking-[.18em] text-brass-700 ${i%3===0?'md:text-brass-300':'mt-4'}`}>{p.location}</div>
                <h2 className={`mt-2 font-display tracking-[-.05em] ${i%3===0?'text-5xl sm:text-6xl':'text-3xl sm:text-4xl'}`}>{p.projectName}</h2>
                {i%3===0&&<p className="mt-5 max-w-lg text-sm leading-7 text-stone-600 md:text-stone-400">{p.projectTagline||p.overview}</p>}
              </div>
              <div className={`mt-5 flex items-center justify-between border-t border-stone-300 ${i%3===0?'pt-5 md:border-white/15':'pt-4'}`}><span className="text-[9px] font-semibold uppercase tracking-[.18em]">View project</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></div>
            </div>
          </Link>
        </motion.article>)}
      </motion.div>
      {!loading&&!filtered.length&&<div className="border-b border-stone-300 py-24 text-center text-sm text-stone-600">No developments match these filters.</div>}
      {loading&&<div role="status" className="border-b border-stone-300 py-24 text-center text-sm text-stone-600">Loading developments…</div>}
    </div>
  </main>
}
