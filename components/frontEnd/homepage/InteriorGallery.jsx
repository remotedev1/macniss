"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/common/GlobalContainer";
import CardSkeleton from "@/components/common/CardSkeleton";
import Image from "next/image";

export default function InteriorGallerySection({ showButton = true }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/interior-gallery");
        const data = await res.json();

        // optional delay to show skeleton nicely
        setTimeout(() => {
          if (data?.images) setImages(data.images);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch interior gallery:", err);
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return (
    <section className="bg-gray-100 text-gray-800 pt-16">
      <Container>
        <div className="px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-black">
            Interior <span className="text-yellow-500">Gallery</span>
          </h2>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} withMedia />
              ))}
            </div>
          ) : images.length === 0 ? (
            <p>No images available.</p>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {images.slice(0, 8).map((img, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:scale-105 duration-300"
                  style={{ aspectRatio: "4/3" }} // Or whichever aspect ratio your images have
                >
                  <Image  
                    src={img.url}
                    alt="Interior image"
                    fill // enables auto-resizing; requires parent relative + set aspect ratio
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {showButton && (
          <div className="text-center mt-8">
            <Link
              href="/interior-gallery"
              className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold mb-12 hover:bg-yellow-600 transition"
            >
              View Full Gallery
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
