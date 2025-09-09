"use client";

import {
  DollarSign,
  HeadphonesIcon,
  Compass,
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: DollarSign,
      title: "Best Value",
      description:
        "Competitive prices on all our electrical and electronic products with no hidden costs.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Dedicated customer support team available round the clock for seamless experience.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Compass,
      title: "Wide Range",
      description:
        "Explore our extensive catalog of top-quality electrical and electronic products.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery across Deoria and surrounding areas.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "All products come with manufacturer warranty and quality guarantee.",
      color: "from-red-400 to-red-600",
    },
    {
      icon: Clock,
      title: "Quick Orders",
      description:
        "Easy and fast ordering process with instant order confirmation.",
      color: "from-teal-400 to-teal-600",
    },
  ];

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
            Why Choose{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Ajit Agencies?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We pride ourselves on offering a diverse selection of electrical and
            electronic products with competitive pricing and exceptional
            customer support every step of the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
