import Hero from "@/components/landing/Hero";
import WhyHire from "@/components/landing/WhyHire";
import Parents from "@/components/landing/Parents";
import Reviews from "@/components/landing/Reviews";
import Famous from "@/components/landing/Famous";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhyHire />
      <Parents />
      <Reviews />
      <Famous />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
