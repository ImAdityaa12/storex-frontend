export default function Achievements() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Discover Our Impressive Achievements and Customer Satisfaction at Ajito
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          With over a decade in the industry, Ajito has sold thousands of high-quality electrical and electronic products. Our commitment to customer satisfaction is reflected in our consistently high ratings and repeat business.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600">Customer satisfaction rate based on recent surveys.</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
            <p className="text-gray-600">Products sold since our launch in 2013.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

