"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MotionReveal from "../modern/MotionReveal";

export default function PortfolioSnapshot() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d.filter(p => !p.isArchived) : [])).catch(() => setProjects([]));
  }, []);

  const metrics = useMemo(() => {
    const active = projects.filter(p => p.status === 'ACTIVE').length;
    const completed = projects.filter(p => p.status === 'COMPLETED').length;
    const sectors = new Set(projects.map(p => p.projectType).filter(Boolean)).size;
    return [
      [projects.length || '—', 'Projects in portfolio'],
      [active || '—', 'Active developments'],
      [completed || '—', 'Completed projects'],
      [sectors || '—', 'Project sectors'],
    ];
  }, [projects]);

  return (
    <section className="bg-ink py-20 text-white lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-y border-white/15 py-10 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <MotionReveal>
            <div className="text-[10px] font-semibold uppercase tracking-[.24em] text-brass-300">Portfolio snapshot</div>
            <h2 className="mt-5 font-display text-4xl tracking-[-.045em] sm:text-5xl">A pipeline you can see.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">Live project data from the Macniss portfolio—giving the homepage the feel of an active developer, not a static brochure.</p>
          </MotionReveal>
          <div className="grid grid-cols-2 border-l border-white/15 sm:grid-cols-4">
            {metrics.map(([value, label], index) => (
              <MotionReveal key={label} delay={index * .05} className="border-b border-r border-white/15 p-5 sm:border-b-0 lg:p-7">
                <div className="font-display text-4xl tracking-[-.05em] sm:text-5xl">{value}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[.16em] text-stone-400">{label}</div>
              </MotionReveal>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/our-works" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-stone-300 hover:text-white">
            View development portfolio <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
