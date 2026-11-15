"use client";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
export default function Magnetic({children,className=""}:{children:ReactNode;className?:string}) {
 const ref=useRef<HTMLDivElement>(null);const [pos,setPos]=useState({x:0,y:0});const reduced=useReducedMotion();
 const move=(event:MouseEvent<HTMLDivElement>)=>{if(reduced||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const r=ref.current?.getBoundingClientRect();if(r)setPos({x:(event.clientX-r.left-r.width/2)*.12,y:(event.clientY-r.top-r.height/2)*.12})};
 return <motion.div ref={ref} className={className} onMouseMove={move} onMouseLeave={()=>setPos({x:0,y:0})} animate={reduced?undefined:pos} transition={{type:"spring",stiffness:210,damping:18}}>{children}</motion.div>;
}
