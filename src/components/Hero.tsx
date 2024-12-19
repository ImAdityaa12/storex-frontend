import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Unbeatable Deals on Electronics Await You!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover the latest in electrical and electronic products at Ajito.
            Shop now to take advantage of our exclusive offers and elevate your
            home experience.
          </p>
          <div className="space-x-4">
            <Button>Shop</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
