"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye } from "lucide-react";

const products = [
  {
    name: "Wall Light 2way Orient",
    price: "₹1,550",
    originalPrice: "₹1,800",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1734105399/ptsydc9zph4ikywclfzg.jpg",
    rating: 4.5,
    badge: "Popular",
  },
  {
    name: "PRIJM COB",
    price: "₹1,022",
    originalPrice: "₹1,200",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732038372/qnj2cnjjhzm4ra7krwql.jpg",
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    name: "7W LED Lamp Orient",
    price: "₹55",
    originalPrice: "₹75",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732777491/yt4mpl2o3q2ute8rzhbp.jpg",
    rating: 4.3,
    badge: "Energy Saver",
  },
  {
    name: "9W LED Lamp Orient",
    price: "₹54",
    originalPrice: "₹70",
    image:
      "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1732685608/c0ngdpj1t5cpykslp3kg.jpg",
    rating: 4.6,
    badge: "New",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular electrical and electronic products with
            unbeatable prices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Product Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Link
                    href="/shop"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Products</span>
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
