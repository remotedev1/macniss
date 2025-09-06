"use client";

import { useEffect, useState } from "react";
import Container from "@/components/common/GlobalContainer";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";

export default function InteriorGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/interior-gallery");
        const data = await res.json();
        if (data?.images) setImages(data.images);
      } catch (err) {
        console.error("Failed to fetch interior gallery:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const prevImage = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const nextImage = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  return (
    <section className="bg-gray-100 py-20">
      <Container>
        <div className="px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Interior <span className="text-yellow-500">Gallery</span>
          </h2>

          {loading ? (
            <p>Loading images...</p>
          ) : images.length === 0 ? (
            <p>No images available.</p>
          ) : (
            <TooltipProvider>
              <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
                {images.map((img, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:scale-105 duration-300 cursor-pointer"
                        onClick={() => {
                          setPhotoIndex(index);
                          setOpen(true);
                        }}
                      >
                        <img
                          src={img.url}
                          alt="Interior"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to open Gallery</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          )}

          {/* Shadcn Dialog for Lightbox */}
          {images.length > 0 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-4xl w-full p-0 bg-black shadow-none">
                <div className="relative">
                  <img
                    src={images[photoIndex]?.url}
                    alt="Interior"
                    className="w-full h-auto object-contain max-h-[80vh] mx-auto rounded"
                  />

                  {/* Close Button */}
                  <DialogClose className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                    <X size={24} />
                  </DialogClose>

                  {/* Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-full hover:scale-105 transition-all duration-300"
                      >
                        ◀
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-full hover:scale-105 transition-all duration-300"
                      >
                        ▶
                      </button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </Container>
    </section>
  );
}
