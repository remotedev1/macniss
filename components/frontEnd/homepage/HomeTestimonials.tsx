"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = { id: string; name: string; role: string; quote: string };

export default function HomeTestimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  function step(direction: number) {
    setIndex((value) => (value + direction + items.length) % items.length);
  }

  return (
    <section className="bg-[#e6dfd0]" aria-labelledby="home-testimonials">
      <div className="home-shell home-testimonial">
        <h2 id="home-testimonials" className="home-display font-display">Client <em>perspectives.</em></h2>
        <div>
          <figure className="home-quote" aria-live="polite" aria-atomic="true">
            <blockquote className="font-display">“{current.quote}”</blockquote>
            <figcaption className="mt-5 text-sm leading-6 text-[#584e40]">
              <span className="block font-bold text-[#25231c]">{current.name}</span>
              {current.role}
            </figcaption>
          </figure>
          {items.length > 1 && (
            <div className="mt-6 flex gap-2">
              <button type="button" className="home-quote-arrow" onClick={() => step(-1)} aria-label="Previous testimonial"><ArrowLeft size={18} aria-hidden="true" /></button>
              <button type="button" className="home-quote-arrow" onClick={() => step(1)} aria-label="Next testimonial"><ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
