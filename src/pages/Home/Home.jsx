import Navbar from "../../components/home/Navbar/Navbar";
import Hero from "../../components/home/Hero/Hero";
import Features from "../../components/home/Features/Features";
import HowItWorks from "../../components/home/HowItWorks/HowItWorks";
import Testimonials from "../../components/home/Testimonials/Testimonials";
// import CTA from "../components/CTA";
import Footer from "../../components/home/Footer/Footer";

export default function Home() {

  return (
    <>
      <Navbar />
      <section id="inicio">
        <Hero />
      </section>

      <section id="Características">
        <Features />
      </section>

      <section id="¿Cómo funciona?">
        <HowItWorks />
      </section>

      <section id="Testimonios">
        <Testimonials />
      </section>

      <Footer />
    </>
  );
}