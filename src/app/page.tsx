import Contact from "@/components/Contact";
import CustomerReviews from "@/components/CustomerReviews";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import SpecialDeals from "@/components/SpecialDeals";
import ValuePropositions from "@/components/ValuePropositions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
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
