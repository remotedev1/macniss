"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/GlobalContainer";
import CardSkeleton from "../common/CardSkeleton";

export default function ServicesWeOffer({ show = false }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/solutions");
        const solutions = await response.json();

        // delay showing data
        setTimeout(() => {
          setServices(solutions);
          setLoading(false); // 👈 stop loading AFTER delay
        }, 3000);
      } catch (error) {
        console.error("Error fetching solutions:", error);
        setLoading(false); // 👈 still stop loading on error
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-100 text-gray-800 pt-16">
      <Container>
        <div className="px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Services <span className="text-yellow-500">We Offer</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            {loading
              ? // 👇 Show 4 skeleton cards while loading
                Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} withMedia />
                ))
              : // 👇 Show actual services when loaded
                services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition text-left hover:scale-105 duration-300"
                  >
                    <Image
                      src={service.image[0].url}
                      alt={service.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="text-center mt-8">
          {show && (
            <Link
              href="/services"
              className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold mb-12 hover:bg-yellow-600 transition"
            >
              See All Services
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
