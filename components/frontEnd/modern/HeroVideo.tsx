"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { unsplash } from "@/components/frontEnd/modern/Unsplash";

// Enable ONLY clips that are actually present in public/videos. Keep empty until assets are supplied.
// For each clip supply an mp4 and optionally a webm; filenames are relative to /videos/.
export const HERO_CLIPS: ReadonlyArray<{mp4:string;webm?:string}> = [];
const SMALL_SCREEN = "(max-width: 480px)";
export default function HeroVideo() {
 const host=useRef<HTMLDivElement>(null); const videos=useRef<Array<HTMLVideoElement|null>>([]);
 const [eligible,setEligible]=useState(false),[visible,setVisible]=useState(true),[playing,setPlaying]=useState(true),[active,setActive]=useState(0),[failed,setFailed]=useState<number[]>([]);
 useEffect(()=>{
  const motion=window.matchMedia("(prefers-reduced-motion: reduce)"),small=window.matchMedia(SMALL_SCREEN);
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean;addEventListener?:(name:string,fn:()=>void)=>void;removeEventListener?:(name:string,fn:()=>void)=>void}}).connection;
  const update=()=>setEligible(!motion.matches&&!small.matches&&!connection?.saveData);
  update();motion.addEventListener("change",update);small.addEventListener("change",update);connection?.addEventListener?.("change",update);
  return()=>{motion.removeEventListener("change",update);small.removeEventListener("change",update);connection?.removeEventListener?.("change",update)};
 },[]);
 useEffect(()=>{if(!host.current)return;const obs=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.1});obs.observe(host.current);return()=>obs.disconnect()},[]);
 const canPlay=eligible&&visible&&playing;
 useEffect(()=>{videos.current.forEach((video,index)=>{if(!video)return;if(canPlay&&active===index&&!failed.includes(index))video.play().catch(()=>{});else video.pause()})},[canPlay,active,failed]);
 useEffect(()=>{if(!canPlay||HERO_CLIPS.length<2)return;const id=window.setInterval(()=>setActive(previous=>{for(let i=1;i<=HERO_CLIPS.length;i++){const candidate=(previous+i)%HERO_CLIPS.length;if(!failed.includes(candidate))return candidate}return previous}),9000);return()=>clearInterval(id)},[canPlay,failed]);
 return <div ref={host} className="absolute inset-0" aria-hidden={HERO_CLIPS.length===0 ? true : undefined}>
  {eligible&&HERO_CLIPS.map((clip,index)=>failed.includes(index)?null:<video key={clip.mp4} ref={el=>{videos.current[index]=el}} muted loop playsInline preload="metadata" autoPlay={false} poster={unsplash.residence} aria-hidden="true" onError={()=>setFailed(list=>list.includes(index)?list:[...list,index])} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${active===index?"opacity-100":"opacity-0"}`}>
   {clip.webm&&<source src={`/videos/${clip.webm}`} type="video/webm"/>}<source src={`/videos/${clip.mp4}`} type="video/mp4"/>
  </video>)}
  {eligible&&HERO_CLIPS.length>0&&failed.length<HERO_CLIPS.length&&<button type="button" aria-label={playing?"Pause background video":"Play background video"} aria-pressed={!playing} onClick={()=>setPlaying(v=>!v)} className="absolute bottom-28 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-36 sm:right-8 lg:right-12">{playing?<Pause size={16}/>:<Play size={16}/>}</button>}
 </div>;
}
