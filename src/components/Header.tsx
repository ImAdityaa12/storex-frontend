import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Ajito
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="/shop" className="text-gray-600 hover:text-gray-800">Shop Now</Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
          <Link href="/offers" className="text-gray-600 hover:text-gray-800">Offers</Link>
          <Link href="/support" className="text-gray-600 hover:text-gray-800">Support</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}

