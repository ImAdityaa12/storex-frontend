import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Smartphones",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1734105399/ptsydc9zph4ikywclfzg.jpg",
  },
  {
    name: "Laptops",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732777491/yt4mpl2o3q2ute8rzhbp.jpg",
  },
  {
    name: "Smart Home",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732685608/c0ngdpj1t5cpykslp3kg.jpg",
  },
  {
    name: "Audio",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732038372/qnj2cnjjhzm4ra7krwql.jpg",
  },
];

export default function ProductCategories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-sm:grid-cols-1">
          {categories.map((category) => (
            <Link key={category.name} href="#" className="group">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg  flex flex-col items-center transition duration-300 group-hover:shadow-lg pb-4">
                <div className="h-72 w-full relative mb-4 ">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
