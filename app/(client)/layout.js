// import { Footer } from "@/components/frontEnd/Footer";

import Footer from "@/components/frontEnd/Footer";
import Header from "@/components/frontEnd/Header";
import ContactUs from "@/components/frontEnd/homepage/ContactUs";

export default async function RootLayout({ children }) {
  return (
    <div className={` font-sans  min-h-screen `}>
      <Header />

      {children}
      <ContactUs />

      <Footer />
    </div>
  );
}
