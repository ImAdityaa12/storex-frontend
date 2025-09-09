"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Bell, Gift, Zap } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Updated with{" "}
            <span className="text-yellow-200">Ajit Agencies</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe now for exclusive deals, new product alerts, and special
            offers delivered straight to your inbox!
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Gift className="w-6 h-6 text-yellow-200" />
            <span className="font-semibold">Exclusive Deals</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Bell className="w-6 h-6 text-yellow-200" />
            <span className="font-semibold">New Arrivals</span>
          </div>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Zap className="w-6 h-6 text-yellow-200" />
            <span className="font-semibold">Flash Sales</span>
          </div>
        </motion.div>

        {/* Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 text-lg bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50"
              />
            </div>
            <Button
              type="submit"
              className="h-14 px-8 bg-white text-orange-500 hover:bg-gray-100 font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Subscribe Now
            </Button>
          </form>

          <p className="text-center mt-6 text-white/80 text-sm">
            Join 5,000+ subscribers • No spam, unsubscribe anytime
          </p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Trusted by 1000+ customers in Deoria
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
