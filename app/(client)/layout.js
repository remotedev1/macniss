// import { Footer } from "@/components/frontEnd/Footer";

import Footer from "@/components/frontEnd/Footer";
import Header from "@/components/frontEnd/Header";

export default async function RootLayout({ children }) {
  return (
    <div className={` font-sans  min-h-screen `}>
      <Header />

      {children}

      <Footer />
    </div>
  );
}
