"use client";
import {useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import ImageReveal from "../modern/ImageReveal";
import MotionReveal from "../modern/MotionReveal";
import SectionIntro from "../modern/SectionIntro";
import {unsplash} from "../modern/Unsplash";
type GalleryImage={id?:string;fileId?:string;url:string};
export default function InteriorGallerySection({showButton=true}:{showButton?:boolean}){
 const [images,setImages]=useState<GalleryImage[]>([]);
 useEffect(()=>{const controller=new AbortController();fetch('/api/interior-gallery',{signal:controller.signal}).then(r=>r.json()).then(d=>setImages(Array.isArray(d?.images)?d.images:[])).catch(()=>{});return()=>controller.abort()},[]);
 const items=(images.length?images:[{url:unsplash.interior},{url:unsplash.kitchen},{url:unsplash.house},{url:unsplash.living},{url:unsplash.detail}]).slice(0,5);
 return <section className="bg-[#ebe7df] py-24 text-ink lg:py-36"><div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><MotionReveal y={12}><SectionIntro eyebrow="Interiors" title="The building continues inside." text="Material, light and proportion carried through to spaces that feel calm, useful and considered."/></MotionReveal>{showButton&&<Link href="/interior-gallery" className="group inline-flex items-center gap-2 border-b border-black pb-3 text-[11px] font-semibold uppercase tracking-[.18em]">View gallery <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>}</div>
 <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-2 sm:auto-rows-[220px] md:grid-cols-4 lg:auto-rows-[260px] lg:gap-4">{items.map((img,i)=><ImageReveal key={`${img.id||img.fileId||img.url}-${i}`} className={`${i===0?'col-span-2 row-span-2':i===3?'col-span-2':''} group relative bg-stone-300`}><Image unoptimized src={img.url} alt={`Macniss interior gallery image ${i+1}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-[1100ms] group-hover:scale-[1.06]"/><div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15"/><span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[.2em] text-white drop-shadow-md">{String(i+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span></ImageReveal>)}</div></div></section>;
}
