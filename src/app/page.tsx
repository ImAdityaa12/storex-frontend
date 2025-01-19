import Hero from "@/components/hero-section";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
// import { Squares } from "@/components/ui/squares-background";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute h-screen w-full rounded-lg overflow-hidden bg-[#060606]">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
      <Hero />
    </div>
  );
}
