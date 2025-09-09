import Hero from "@/components/hero-section";
import Features from "@/components/Features";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import ValuePropositions from "@/components/ValuePropositions";
import Newsletter from "@/components/Newsletter";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Animated Background */}
      <div className="relative">
        <div className="absolute h-screen w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              "text-theme-orange"
            )}
          />
        </div>
        <Hero />
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Features />
        <ValuePropositions />
        <FeaturedProducts />
        <CustomerReviews />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
