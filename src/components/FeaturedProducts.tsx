import Image from 'next/image'
import Link from 'next/link'

const products = [
  { name: 'Smartphone X', price: '$699', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Laptop Pro', price: '$1299', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Wireless Headphones', price: '$199', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Smart Watch', price: '$299', image: '/placeholder.svg?height=200&width=200' },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.price}</p>
                <Link href="#" className="bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100 px-4 py-2 rounded-full inline-block hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300">
                  Add to Cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

