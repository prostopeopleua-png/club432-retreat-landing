import Hero from "@/components/Hero";
import Transform from "@/components/Transform";
import Program from "@/components/Program";
import Schedule from "@/components/Schedule";
import Location from "@/components/Location";
import Guides from "@/components/Guides";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StickyBar from "@/components/StickyBar";

export default function Page() {
  return (
    <main>
      <Hero />
      <Transform />
      <Program />
      <Schedule />
      <Location />
      <Guides />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <StickyBar />
    </main>
  );
}
