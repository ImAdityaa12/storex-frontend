import Image from 'next/image'
import Link from 'next/link'

const deals = [
  { name: 'Smart TV', discount: '20% OFF', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Wireless Earbuds', discount: '15% OFF', image: '/placeholder.svg?height=200&width=300' },
  { name: 'Gaming Console', discount: '10% OFF', image: '/placeholder.svg?height=200&width=300' },
]

export default function SpecialDeals() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Special Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {deals.map((deal) => (
            <div key={deal.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={deal.image}
                alt={deal.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{deal.name}</h3>
                <p className="text-blue-600 font-bold mb-4">{deal.discount}</p>
                <Link href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-700 transition duration-300">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

