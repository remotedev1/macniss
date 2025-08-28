import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Container from "../common/GlobalContainer";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <Container>
        <div className=" mx-auto px-4 grid md:grid-cols-2 gap-10 mt-10">
          {/* Left Section - Logo + About */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              MACNISS<span className="text-white">.COM</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              At Macniss.Com, we blend functionality with aesthetics to deliver
              customized, efficient home, commercial construction. Our team
              specializes in building houses tailored to your lifestyle,
              creating a home that&apos;s truly personal to you.
            </p>
            <div className=" max-w-xl py-5">
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
                    <h4 className="font-semibold text-white">{branch.title}</h4>
                    <p className="text-gray-500 text-sm">{branch.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-end space-x-5">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                Home
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>

                <li>
                  <Link href="/our-works">Our Works</Link>
                </li>

                <li>
                  <Link href="/services">Services</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                Get In Touch
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-yellow-400" />
                <Link
                  href="tel:+919900407628"
                  className="hover:text-yellow-400"
                >
                  +91-9900407628
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-yellow-400" />
                <Link
                  href="tel:+919164331020"
                  className="hover:text-yellow-400"
                >
                  +91-9164331020
                </Link>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-yellow-400" />
                <Link
                  href="tel:+919632969646"
                  className="hover:text-yellow-400"
                >
                  +91-9632969646
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-400" />
                <a
                  href="mailto:nihalnachappa1@gmail.com"
                  className="hover:text-yellow-400"
                >
                  macnissbuilders@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Macniss.Com — All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
