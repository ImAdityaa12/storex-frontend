"use client";

import { ShoppingCart, Search, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Ajito
        </Link>
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <nav className="hidden md:flex space-x-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Deals
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Link href="#" className="text-gray-600 hover:text-blue-600">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col space-y-2 px-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Deals
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <div className="mt-4 px-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Search
              className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
      )}
    </header>
  );
}
