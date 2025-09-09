"use client";

import {
  Truck,
  Shield,
  HeadphonesIcon,
  MapPin,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";

const propositions = [
  {
    title: "Fast Delivery",
    description: "Same day delivery in Deoria",
    icon: Truck,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Payments Options",
    description: "Multiple payment options available",
    icon: CreditCard,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Quality Guarantee",
    description: "Genuine products with warranty",
    icon: Shield,
    color: "from-purple-500 to-purple-600",
  },
];

export default function ValuePropositions() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Promise
            </span>{" "}
            to You
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with
            un&apos;matched service quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${prop.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <prop.icon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {prop.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <MapPin className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">
              Serving Deoria & Surrounding Areas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
