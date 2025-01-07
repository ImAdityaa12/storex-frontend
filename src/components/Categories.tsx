import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Categories() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Explore Our Top Product Categories
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Discover the best in electricals and electronics.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/placeholder.svg?height=200&width=400" alt="Electrics" width={400} height={200} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Electrics</h3>
              <p className="text-gray-600 mb-4">Quality Electrical Products for Every Need</p>
              <p className="text-gray-600 mb-4">Reliable solutions for your electrical requirements.</p>
              <Button>Shop</Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/placeholder.svg?height=200&width=400" alt="Electronics" width={400} height={200} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Electronics</h3>
              <p className="text-gray-600 mb-4">Innovative Electronics for Modern Living</p>
              <p className="text-gray-600 mb-4">Stay connected with our latest electronics.</p>
              <Button>Browse</Button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/placeholder.svg?height=200&width=400" alt="Accessories" width={400} height={200} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Accessories</h3>
              <p className="text-gray-600 mb-4">Essential Accessories for Your Devices</p>
              <p className="text-gray-600 mb-4">Enhance your experience with our quality accessories.</p>
              <Button>Discover</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

