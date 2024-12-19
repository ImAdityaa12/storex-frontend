import { Button } from '@/components/ui/button'

export default function Offers() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Exclusive Offers Just for You
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Discover unbeatable deals on top-quality electrical and electronic products. Shop now and save big!
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="secondary">Shop</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  )
}

