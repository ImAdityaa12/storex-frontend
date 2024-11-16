import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Watch, Shirt, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ShoppingBag className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">Storex</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Shop
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="w-full flex-1 mx-auto">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to Storex
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Your one-stop shop for shoes, clothes, bags, and smart
                  watches.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Shop Now
                </Button>
                <Button className="text-white bg-black hover:bg-white hover:text-black">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Our Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-4 rounded-lg">
                <Shirt className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Clothes</h3>
                <p className="text-sm text-gray-500 text-center">
                  Trendy and comfortable clothing for all occasions
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-4 rounded-lg">
                <ShoppingBag className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Shoes</h3>
                <p className="text-sm text-gray-500 text-center">
                  Stylish footwear for every step of your journey
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-4 rounded-lg">
                <Briefcase className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold">Bags</h3>
                <p className="text-sm text-gray-500 text-center">
                  Functional and fashionable bags for all your needs
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-4 rounded-lg">
                <Watch className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold">Smart Watches</h3>
                <p className="text-sm text-gray-500 text-center">
                  Stay connected with cutting-edge wearable technology
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Top Brands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image src="" alt="Brand 1" className="max-h-12" />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Brand 2"
                  className="max-h-12"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Brand 3"
                  className="max-h-12"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Brand 4"
                  className="max-h-12"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Brand 5"
                  className="max-h-12"
                />
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Brand 6"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Storex. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
