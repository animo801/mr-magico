import Hero from "@/components/landing/Hero";
import WhyHire from "@/components/landing/WhyHire";
import KidsFeatures from "@/components/landing/KidsFeatures";
// import Parents from "@/components/landing/Parents"; // hidden for now
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
      <KidsFeatures />
      {/* <Parents /> */}
      <Reviews />
      <Famous />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
