import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Ajito</h3>
            <p className="text-sm">Ajito is your one-stop shop for all things electric and electronic. We offer the latest innovations at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-blue-400">Home</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Products</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Deals</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-blue-400">FAQ</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Shipping</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Returns</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Track Order</Link></li>
              <li><Link href="#" className="text-sm hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400"><Facebook size={24} /></Link>
              <Link href="#" className="hover:text-blue-400"><Twitter size={24} /></Link>
              <Link href="#" className="hover:text-blue-400"><Instagram size={24} /></Link>
              <Link href="#" className="hover:text-blue-400"><Linkedin size={24} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Ajito. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

