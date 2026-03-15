import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { Tools } from "@/components/landing/tools";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <Hero />
      <Features />
      <Tools />
      <Cta />
      <Footer />
    </div>
  );
}
