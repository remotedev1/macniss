"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import clsx from "clsx";

export function ConstructionTestimonialCard({ testimonial }) {
  const rating = Math.max(0, Math.min(5, testimonial.rating ?? 5));

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ml-2">
      {/* SVG Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* subtle grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-900" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-amber-500/40">
            <Image
              src={testimonial.image || "/placeholder.jpg"}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-zinc-900">
              {testimonial.name}
            </h3>
            <p className="truncate text-sm text-zinc-600">
              {testimonial.role}
              {testimonial.role && testimonial.company && " • "}
              {testimonial.company}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-base italic leading-relaxed text-zinc-700">
            “{testimonial.quote}”
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  "h-4 w-4",
                  i < rating ? "fill-amber-500 text-amber-500" : "text-zinc-300"
                )}
              />
            ))}
            <span className="ml-1 text-xs text-zinc-500">({rating}/5)</span>
          </div>
          {testimonial.project && (
            <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              {testimonial.project}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
