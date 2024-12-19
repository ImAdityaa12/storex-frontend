import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Stay Updated with Ajito
        </h2>
        <p className="text-xl text-center mb-8">
          Subscribe now for exclusive deals and product updates!
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button type="submit" variant="secondary">Sign Up</Button>
        </form>
        <p className="text-center mt-4">
          <Button variant="link" className="text-white">Learn More</Button>
        </p>
      </div>
    </section>
  )
}

