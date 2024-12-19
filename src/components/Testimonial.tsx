import Image from 'next/image'

export default function Testimonial() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl italic text-gray-600 mb-4">
            "Ajito transformed my shopping experience! The quality and service are unmatched."
          </p>
          <div className="flex items-center justify-center">
            <Image src="/placeholder.svg?height=64&width=64" alt="Emily Johnson" width={64} height={64} className="rounded-full mr-4" />
            <div>
              <p className="font-semibold">Emily Johnson</p>
              <p className="text-gray-600">Homeowner, Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

