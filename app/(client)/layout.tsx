// import { Footer } from "@/components/frontEnd/Footer";

import Footer from "@/components/frontEnd/Footer";
import Header from "@/components/frontEnd/Header";
import PublicMotionProvider from "@/components/frontEnd/modern/PublicMotionProvider";

export default async function RootLayout({ children }) {
  return (
    <PublicMotionProvider><div className="macniss-public font-sans min-h-screen">
      <Header />

      {children}

      <Footer />
    </div></PublicMotionProvider>
  );
}
