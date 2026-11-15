import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 pt-24">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[.24em] text-brass-700">Portfolio</div>
        <h1 className="mt-5 font-display text-5xl tracking-[-.05em]">Project not found.</h1>
        <Link href="/our-works" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[.18em]">
          <ArrowLeft className="h-4 w-4" /> Return to developments
        </Link>
      </div>
    </main>
  );
}
