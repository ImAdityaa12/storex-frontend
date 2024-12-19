import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/products" className="hover:text-gray-300">Products</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-gray-300">FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-gray-300">Returns</Link></li>
              <li><Link href="/shipping" className="hover:text-gray-300">Shipping Info</Link></li>
              <li><Link href="/warranty" className="hover:text-gray-300">Warranty</Link></li>
              <li><Link href="/feedback" className="hover:text-gray-300">Feedback</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300"><Facebook /></Link>
              <Link href="#" className="hover:text-gray-300"><Twitter /></Link>
              <Link href="#" className="hover:text-gray-300"><Instagram /></Link>
              <Link href="#" className="hover:text-gray-300"><Linkedin /></Link>
              <Link href="#" className="hover:text-gray-300"><Youtube /></Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="mb-4">Join our newsletter for the latest updates and offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p>&copy; 2024 Ajito. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-gray-300">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

