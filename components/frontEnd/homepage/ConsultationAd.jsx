import Container from "@/components/common/GlobalContainer";
import Image from "next/image";
import Link from "next/link";

export default function ConsultationAd() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="bg-yellow-500 max-w-4xl mx-auto rounded-2xl  py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-xl">
            <h2 className=" text-2xl md:text-4xl font-extrabold mb-4">
              Ready to build your dream home?
            </h2>
            <p className="text-md md:text-lg mb-6 text-yellow-50">
              Still unsure about your home construction plan and budget? Use our
              easy cost calculator to instantly estimate your project expenses
              and get a clear picture of costs—all from the comfort of your
              home.
            </p>
            <Link href="#consultation-form">
              <button className="bg-black text-yellow-500 font-bold px-6 py-3 rounded-full hover:bg-gray-900">
                Get a Free Construction Estimate
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0 hidden md:flex">
            <Image
              src="/images/modern-house.jpg"
              alt="Modern House"
              width={250}
              height={100}
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
