import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Store,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Ajit Agencies</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for quality electrical and electronic
                products in Deoria. We&apos;ve been serving the community with
                excellence for over 5 years.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Deoria, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">info@ajitagencies.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deals"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Special Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Product Categories
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/category/led-lights"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    LED Lights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/switches"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Switches & Sockets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/fans"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Ceiling Fans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/wires"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Electrical Wires
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/appliances"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Home Appliances
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/tools"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Electrical Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Customer Service
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Warranty Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Ajit Agencies Deoria. All
                rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 transform hover:scale-110"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">We Accept:</p>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">CASH</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">UPI</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-gray-800">CARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
