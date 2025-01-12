import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import SpecialDeals from "@/components/SpecialDeals";
import FeaturedProducts from "@/components/FeaturedProducts";
import ValuePropositions from "@/components/ValuePropositions";
import CustomerReviews from "@/components/CustomerReviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="fixed bottom-4 right-0 w-20">
        <ModeToggle className="w-11" />
      </div>
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <SpecialDeals />
        <FeaturedProducts />
        <ValuePropositions />
        <CustomerReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
