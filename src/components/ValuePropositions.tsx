import { Truck, Shield, RotateCcw, HeadphonesIcon } from 'lucide-react'

const propositions = [
  { title: 'Free Shipping', description: 'On orders over $100', icon: Truck },
  { title: 'Secure Payments', description: '100% protected transactions', icon: Shield },
  { title: 'Easy Returns', description: '30-day return policy', icon: RotateCcw },
  { title: '24/7 Support', description: 'Dedicated customer service', icon:HeadphonesIcon },
]

export default function ValuePropositions() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Why Choose Ajito</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {propositions.map((prop) => (
            <div key={prop.title} className="flex flex-col items-center text-center">
              <prop.icon size={48} className="text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{prop.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

