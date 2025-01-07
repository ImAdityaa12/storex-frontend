import Image from 'next/image'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'John Doe', rating: 5, comment: 'Great products and excellent service!', avatar: '/placeholder.svg?height=50&width=50' },
  { name: 'Jane Smith', rating: 4, comment: 'Very satisfied with my purchase. Will buy again.', avatar: '/placeholder.svg?height=50&width=50' },
  { name: 'Mike Johnson', rating: 5, comment: 'Fast shipping and top-notch quality.', avatar: '/placeholder.svg?height=50&width=50' },
]

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

