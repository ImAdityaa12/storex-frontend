import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Smartphones', image: '/placeholder.svg?height=150&width=150' },
  { name: 'Laptops', image: '/placeholder.svg?height=150&width=150' },
  { name: 'Smart Home', image: '/placeholder.svg?height=150&width=150' },
  { name: 'Audio', image: '/placeholder.svg?height=150&width=150' },
]

export default function ProductCategories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Product Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category) => (
            <Link key={category.name} href="#" className="group">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center transition duration-300 group-hover:shadow-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

