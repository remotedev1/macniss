"use client";

import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "../common/GlobalContainer";
import { ConstructionTestimonialCard } from "./TestimonialsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
    >
      <ChevronLeft size={24} className="text-black" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
    >
      <ChevronRight size={24} className="text-black" />
    </button>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="py-8 bg-white text-gray-800">
      <Container>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Quotes From <span className="text-yellow-500">Happy Clients</span>
          </h2>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={6000}
            keyBoardControl
            showDots={false}
            className="z-10"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {testimonials?.map((testimonial, index) => (
              <ConstructionTestimonialCard
                key={index}
                testimonial={testimonial}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
