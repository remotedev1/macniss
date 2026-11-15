import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function PrimaryLink({ href, children, dark = true, className = "" }) {
  return <Link href={href} className={`group inline-flex items-center gap-3 border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${dark ? "border-ink bg-ink text-white hover:bg-transparent hover:text-ink" : "border-white/30 bg-white text-ink hover:bg-transparent hover:text-white"} ${className}`}><span>{children}</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
}
