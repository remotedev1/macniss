"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import EditorialPhoto from "./EditorialPhoto";
import { unsplash } from "./Unsplash";

type GalleryItem = { id?: string; fileId?: string; url: string };
const demo: GalleryItem[] = [
  { url: unsplash.interior }, { url: unsplash.kitchen }, { url: unsplash.house },
  { url: unsplash.living }, { url: unsplash.detail }, { url: unsplash.aboutWorkspace },
];

export default function InteriorPortfolio() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/interior-gallery", { signal: controller.signal })
      .then((r) => { if (!r.ok) throw new Error("Gallery unavailable"); return r.json(); })
      .then((d) => setImages(Array.isArray(d?.images) ? d.images.filter((item: GalleryItem) => item?.url) : []))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);
  const items = loading ? [] : images.length ? images : demo;
  const currentImage = selected === null ? undefined : items[selected];

  function moveImage(direction: number) {
    setSelected((index) => index === null ? null : (index + direction + items.length) % items.length);
  }
  return (
    <section id="gallery" aria-label="Interior gallery" className="scroll-mt-24 bg-[#ebe7df] px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-400/40 pb-8">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[.22em] text-brass-700">Interior imagery</div>
            <h2 className="mt-4 font-display text-5xl tracking-[-.05em] sm:text-7xl">The building continues inside.</h2>
          </div>
          <p aria-live="polite" className="text-[11px] uppercase tracking-[.2em] text-stone-600">{loading ? "Loading gallery" : `${items.length} images`}</p>
        </div>
        {!images.length && !loading && <p className="mt-5 text-sm text-stone-600">Illustrative interior photographs are shown until gallery images are available.</p>}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          {items.map((item, index) => (
            <button
              type="button" key={`${item.id || item.fileId || item.url}-${index}`}
              className={`group relative col-span-2 overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-700 ${index % 5 === 0 ? "md:col-span-8" : index % 5 === 1 ? "md:col-span-4" : index % 5 === 2 ? "md:col-span-5" : index % 5 === 3 ? "md:col-span-7" : "md:col-span-12"}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(index);
              }}
              aria-label={`Open interior image ${index + 1} of ${items.length}`}
            >
              <EditorialPhoto src={item.url} alt="" className={`w-full ${index % 5 === 0 || index % 5 === 4 ? "aspect-[16/10]" : "aspect-[4/5]"}`} imageClassName="transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute bottom-4 left-4 z-10 bg-ink/65 px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
      <Dialog.Root open={Boolean(currentImage)} onOpenChange={(open) => !open && setSelected(null)}>
        {currentImage && (
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/95" />
            <Dialog.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 text-white sm:p-10"
              onClick={(event) => {
                if (event.target === event.currentTarget) setSelected(null);
              }}
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                opener.current?.focus();
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") moveImage(1);
                if (event.key === "ArrowLeft") moveImage(-1);
              }}
            >
              <Dialog.Title className="sr-only">Interior image viewer</Dialog.Title>
              <div aria-live="polite" className="absolute left-5 top-5 text-xs uppercase tracking-[.2em]">{selected + 1} / {items.length}</div>
              <Dialog.Close aria-label="Close image viewer" className="absolute right-5 top-5 z-10 rounded-full border border-white/40 p-3 hover:bg-white/15"><X className="h-5 w-5" /></Dialog.Close>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentImage.url} alt={`Interior image ${selected + 1} of ${items.length}`} className="max-h-[80dvh] max-w-full object-contain" />
              {items.length > 1 && (
                <div className="absolute bottom-5 flex gap-4">
                  <button type="button" aria-label="Previous image" className="rounded-full border border-white/40 p-3 hover:bg-white/15" onClick={() => moveImage(-1)}><ArrowLeft className="h-5 w-5" /></button>
                  <button type="button" aria-label="Next image" className="rounded-full border border-white/40 p-3 hover:bg-white/15" onClick={() => moveImage(1)}><ArrowRight className="h-5 w-5" /></button>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </section>
  );
}
