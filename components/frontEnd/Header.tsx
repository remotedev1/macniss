"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ArrowUpRight, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const nav = [["About","/about-us"],["Services","/services"],["Projects","/our-works"],["Interiors","/interior-gallery"],["Contact","/contact"]];
export default function Header(){
 const [scrolled,setScrolled]=useState(false), [open,setOpen]=useState(false); const closeButtonRef=useRef<HTMLButtonElement>(null); const {data:session}=useSession(); const pathname=usePathname(); const solid=scrolled||pathname!=="/";
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>24); fn(); addEventListener("scroll",fn,{passive:true}); return()=>removeEventListener("scroll",fn)},[]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":""; return()=>{document.body.style.overflow=""}},[open]);
 useEffect(()=>{if(!open)return;closeButtonRef.current?.focus();const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};document.addEventListener("keydown",closeOnEscape);return()=>document.removeEventListener("keydown",closeOnEscape)},[open]);
 return <>
  <header className={`fixed inset-x-0 z-50 transition-all duration-500 ${scrolled?"top-3 px-3 sm:px-6":"top-0"} ${solid?"text-ink":"text-white"}`}>
   <div className={`mx-auto max-w-[1488px] transition-all duration-500 ${scrolled?"premium-glass rounded-sm border border-stone-200/70":"border-b border-white/15"} ${!scrolled&&pathname!=="/"?"bg-stone-50/95 backdrop-blur-xl":""}`}>
   <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-500 sm:px-8 lg:px-12 ${scrolled?"h-[68px]":"h-20"}`}>
    <Link href="/" className="flex items-center gap-3"><Image src="/logo.png" alt="Macniss Builders" width={50} height={50} className="h-11 w-11 object-contain"/><div className="leading-none"><div className="font-display text-xl tracking-[-.03em]">MACNISS</div><div className={`mt-1 text-[8px] font-semibold uppercase tracking-[.28em] ${solid?"text-stone-600":"text-stone-300"}`}>Builders</div></div></Link>
    <nav className="hidden items-center gap-8 lg:flex">{nav.map(([label,href])=><Link key={href} href={href} className="text-[11px] font-semibold uppercase tracking-[.16em] opacity-80 transition hover:opacity-100">{label}</Link>)}</nav>
    <div className="flex items-center gap-3"><Link href={session?"/dashboard":"/auth/login"} className={`hidden items-center gap-2 border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.16em] transition sm:flex ${solid?"border-ink hover:bg-ink hover:text-white":"border-white/35 hover:bg-white hover:text-ink"}`}>{session?"Dashboard":"Client access"}<ArrowUpRight className="h-3.5 w-3.5"/></Link><button onClick={()=>setOpen(true)} className="rounded-sm p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-400" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu"><Menu className="h-6 w-6"/></button></div>
   </div></div>
  </header>
  <AnimatePresence>{open&&<motion.div id="site-menu" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] overflow-y-auto bg-ink text-white"><div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-5 py-6 sm:px-8 lg:px-12"><div className="flex items-center justify-between"><div className="font-display text-2xl">MACNISS</div><button ref={closeButtonRef} onClick={()=>setOpen(false)} className="border border-white/20 p-3" aria-label="Close menu"><X/></button></div><div className="grid flex-1 items-center lg:grid-cols-2"><nav aria-label="Main menu" className="space-y-1">{[["Home","/"],...nav].map(([label,href],i)=><motion.div key={href} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.08*i}}><Link onClick={()=>setOpen(false)} href={href} className="group flex items-center justify-between border-b border-white/15 py-3 font-display text-[clamp(2.5rem,6vw,5rem)] tracking-[-.045em] transition-colors hover:text-brass-300 sm:py-4"><span>{label}</span><ArrowUpRight className="h-7 w-7 opacity-0 transition group-hover:opacity-100"/></Link></motion.div>)}</nav><div className="hidden justify-self-end lg:block"><p className="max-w-sm text-lg leading-8 text-stone-400">Building enduring homes and commercial spaces across Karnataka through transparent construction and disciplined execution.</p></div></div><div className="flex justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.18em] text-stone-400"><span>Bengaluru · Kodagu</span><Link href={session?"/dashboard":"/auth/login"}>{session?"Dashboard":"Client access"}</Link></div></div></motion.div>}</AnimatePresence>
 </>
}
