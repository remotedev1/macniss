import { DollarSign, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import Container from "../common/GlobalContainer";

export default function WhyChoose({ about = false }) {
  return (
    <section className="pb-16 pt-20 bg-white text-gray-800">
      <Container>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Why Choose <span className="text-yellow-500">Macniss.Com</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            At Macniss.Com, we turn your dream home into reality with the
            expertise of our skilled team and a hassle-free process. From
            initial design to final delivery, we guarantee quality and
            transparency at every stage. Our mission is to create homes that
            reflect your vision, built with exceptional craftsmanship and
            cutting-edge technology.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-yellow-500 shadow-sm text-left">
              <DollarSign className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">
                Guaranteed Price Protection
              </h3>
              <p className="text-sm text-gray-600">
                We offer fixed pricing with complete transparency—no hidden
                costs or surprises. Once your estimate is finalized, it remains
                unchanged unless you choose to make modifications.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-yellow-500 shadow-sm text-left">
              <ShieldCheck className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">200+ Quality Checks</h3>
              <p className="text-sm text-gray-600">
                Home construction, perfected! With 200+ rigorous quality checks,
                we ensure your home meets the highest standards of excellence.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-yellow-500 shadow-sm text-left">
              <Clock className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">Timely Delivery</h3>
              <p className="text-sm text-gray-600">
                We guarantee on-time completion—because your dream home
                shouldn’t have to wait. In the rare event of delays, we enforce
                penalties to ensure accountability and give you complete peace
                of mind.
              </p>
            </div>
          </div>
          {about && (
            <button className="mt-8 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600">
              <Link
                href="/about-us"
                className="text-white font-semibold inline-flex items-center "
              >
                Learn more about us
              </Link>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
