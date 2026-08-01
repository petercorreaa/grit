import Hero from "@/components/Hero";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="bg-[#0b0f0b]">
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
