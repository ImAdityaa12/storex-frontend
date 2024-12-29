import { DollarSign, HeadphonesIcon, Compass } from "lucide-react";

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Discover Unmatched Quality and Value with Ajito&apos;s Extensive
          Product Range
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          At Ajito, we pride ourselves on offering a diverse selection of
          electrical and electronic products. Enjoy competitive pricing and
          exceptional customer support every step of the way.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Value</h3>
            <p className="text-gray-600">
              Competitive prices on all our products.
            </p>
          </div>
          <div className="text-center">
            <HeadphonesIcon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">
              Dedicated support for a seamless shopping experience.
            </p>
          </div>
          <div className="text-center">
            <Compass className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Explore</h3>
            <p className="text-gray-600">Our Top Product Categories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
