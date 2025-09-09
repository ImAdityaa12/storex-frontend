"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Excellent service and quality products! Ajit Agencies has been my go-to store for all electrical needs. Fast delivery and competitive prices.",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Deoria",
    product: "LED Lights & Switches",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Very satisfied with my purchase. The team is knowledgeable and helped me choose the right products for my home renovation project.",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Kushinagar",
    product: "Home Electrical Items",
  },
  {
    name: "Amit Singh",
    rating: 4,
    comment:
      "Great experience shopping here. Quality products at reasonable prices. The online ordering system is very convenient and user-friendly.",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Gorakhpur",
    product: "Electronic Components",
  },
  {
    name: "Sunita Devi",
    rating: 5,
    comment:
      "Outstanding customer service! They delivered my order the same day and the products are exactly as described. Highly recommended!",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Deoria",
    product: "Kitchen Appliances",
  },
  {
    name: "Vikash Gupta",
    rating: 5,
    comment:
      "Been a customer for 3 years now. Consistent quality and service. They have everything I need for my electrical business at wholesale rates.",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Basti",
    product: "Bulk Orders",
  },
  {
    name: "Meera Patel",
    rating: 4,
    comment:
      "Professional service and genuine products. The staff is helpful and the delivery is always on time. Great experience overall!",
    avatar: "/placeholder.svg?height=50&width=50",
    location: "Maharajganj",
    product: "Lighting Solutions",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            customers across Deoria and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-yellow-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({review.rating}.0)
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic">
                  &apos;{review.comment}&apos;
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <Avatar className="mr-4 w-12 h-12">
                    <AvatarFallback className="text-gray-800 dark:text-gray-200 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                    <AvatarImage src={review.avatar} width={48} height={48} />
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.location}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                      {review.product}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                4.8/5
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                1000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">24h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Delivery
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
