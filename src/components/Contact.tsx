import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                <span className="text-gray-600 dark:text-gray-400">support@ajito.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                <span className="text-gray-600 dark:text-gray-400">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <MapPin className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                <span className="text-gray-600 dark:text-gray-400">123 Tech Street, Innovation City, 12345</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Newsletter</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-full sm:rounded-r-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100 px-6 py-2 rounded-full sm:rounded-l-none hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

