import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Stats, Services, Testimonials, CTA, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
