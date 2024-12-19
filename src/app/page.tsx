import Achievements from "@/components/Achievements";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Offers from "@/components/Offers";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <Offers />
        <Achievements />
        <Testimonial />
        <Newsletter />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
}
