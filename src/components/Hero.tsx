import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-600 dark:bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Ajito
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the latest in electric and electronic innovations
          </p>
          <Link
            href="/shop"
            className="bg-white text-blue-600 dark:bg-gray-200 dark:text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-300 transition duration-300 inline-block"
          >
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/landing-page-image.avif"
            alt="Featured Electronic Product"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
