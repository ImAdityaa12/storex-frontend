import Image from 'next/image'

export default function ProductShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Product Showcase
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Explore our extensive range of electrical and electronic products.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={`/placeholder.svg?height=200&width=200&text=Product ${i}`} alt={`Product ${i}`} width={200} height={200} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

