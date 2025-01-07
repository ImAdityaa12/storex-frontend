import Image from "next/image";
import Link from "next/link";

const deals = [
  {
    name: "Wall Light 2way Orient",
    discount: "15% off",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1734105399/ptsydc9zph4ikywclfzg.jpg",
  },
  {
    name: "PRIJM COB",
    discount: "50% off",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732038372/qnj2cnjjhzm4ra7krwql.jpg",
  },
  {
    name: "7w LED LAMP ORIENT",
    discount: "55% off",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732777491/yt4mpl2o3q2ute8rzhbp.jpg",
  },
];

export default function SpecialDeals() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Special Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {deals.map((deal) => (
            <div
              key={deal.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={deal.image}
                alt={deal.name}
                width={300}
                height={200}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {deal.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">
                  {deal.discount}
                </p>
                <Link
                  href="#"
                  className="bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100 px-4 py-2 rounded-full inline-block hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
