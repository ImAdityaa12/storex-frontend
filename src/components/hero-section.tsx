import React from "react";

import { Store } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        // style={{
        //   backgroundImage:
        //     'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Store className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to <br />
            Ajit Agencies Deoria
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-yellow-400">
              Order Portal
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Your trusted partner for quality products and exceptional service
          </p>
          <Link
            href="/shop"
            // onClick={() => navigate('/shop')}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
