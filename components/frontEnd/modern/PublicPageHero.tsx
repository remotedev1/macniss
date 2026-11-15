import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function PublicPageHero({
  eyebrow,
  title,
  intro,
  index = "01",
  aside,
  href,
  linkLabel,
}) {
  return (
    <section className="relative overflow-hidden border-b border-stone-300 bg-stone-50 pt-32 text-ink sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(28,25,23,.07)_1px,transparent_1px)] [background-size:25%_100%]" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_.5fr] lg:items-end">
          <div>
            <div className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[.24em] text-brass-700">
              <span>{index}</span>
              <span className="h-px w-10 bg-brass-700/60" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="mt-7 max-w-6xl font-display text-[clamp(4rem,9vw,8.75rem)] leading-[.83] tracking-[-.065em]">
              {title}
            </h1>
          </div>
          <div className="lg:pb-2">
            {intro && <p className="max-w-md text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">{intro}</p>}
            {aside && <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">{aside}</p>}
            {href && linkLabel && (
              <Link href={href} className="mt-7 inline-flex items-center gap-3 border-b border-ink pb-2 text-[10px] font-semibold uppercase tracking-[.18em]">
                {linkLabel}<ArrowDownRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
