import ConsultationAd from "@/components/frontEnd/homepage/ConsultationAd";
import ConsultationModal from "@/components/frontEnd/homepage/ConsultationModel";
import Hero from "@/components/frontEnd/homepage/Hero";
import RecentWorks from "@/components/frontEnd/RecentWorks";
import ServicesWeOffer from "@/components/frontEnd/ServicesWeOffer";
import Testimonials from "@/components/frontEnd/Testimonials";
import WhyChoose from "@/components/frontEnd/WhyChoose";

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <Hero />
      <WhyChoose about={true} />
      <ServicesWeOffer show={true} />
      <Testimonials />
      <RecentWorks />
      <ConsultationAd />
      <ConsultationModal />
    </main>
  );
}
