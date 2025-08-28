import Container from "@/components/common/GlobalContainer";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  return (
    <section className="bg-gray-300 pt-10 shadow-lg relative z-10">
      <Container>
        <div className="w-[80%] max-w-4xl relative top-8 mx-auto bg-white p-10 rounded-xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900">
              Contact <span className="text-yellow-500">Us</span>
            </h3>

            <p className="text-gray-500 mt-2">
              Get in touch with us to start your project.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-yellow-400" />
                <Link
                  href="tel:+919900407628"
                  className="hover:text-yellow-400 text-black"
                >
                  +91-9900407628
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-yellow-400" />
                <Link
                  href="mailto:nihalnachappa1@gmail.com"
                  className="hover:text-yellow-400 text-black"
                >
                  macnissbuilders@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Corporate Office (Bangalore Branch):",
                address: "Macniss.Com | Bangalore",
                link: "#",
              },
              {
                title: "Kodagu Branch:",
                address: "Macniss.Com | Gonicoppa",
                link: "#",
              },
            ].map((branch, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6"
              >
                <MapPin className="text-yellow-500" />
                <h4 className="font-semibold text-gray-900">{branch.title}</h4>
                <p className="text-gray-500 text-sm">{branch.address}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
