'use client';

export default function HomePage() {
  const services = [
    { id: 1, name: 'Painting', image: '/api/placeholder/400/500', price: 'From ₹499' },
    { id: 2, name: 'Plumbing', image: '/api/placeholder/400/500', price: 'From ₹299' },
    { id: 3, name: 'Electrical', image: '/api/placeholder/400/500', price: 'From ₹399' },
    { id: 4, name: 'Carpentry', image: '/api/placeholder/400/500', price: 'From ₹599' },
    { id: 5, name: 'Renovation', image: '/api/placeholder/400/500', price: 'From ₹999' },
    { id: 6, name: 'Cleaning', image: '/api/placeholder/400/500', price: 'From ₹199' },
  ];

  const categories = [
    'Construction', 'Repairs', 'Maintenance', 'Renovation', 'Interior', 'Exterior'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      {/* <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-wide">DPCON</h1>
          <nav className="hidden md:flex gap-8 text-sm">
            {categories.map((cat) => (
              <button key={cat} className="hover:underline underline-offset-4">{cat}</button>
            ))}
          </nav>
          <button className="text-sm border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
            Sign In
          </button>
        </div>
      </header> */}

      {/* Hero - Minimal */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            Expert Services<br />For Your Space
          </h2>
          <p className="text-lg text-gray-600 mb-12 font-light">
            Professional construction and home services, simplified.
          </p>
          <button className="bg-black text-white px-12 py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors">
            EXPLORE SERVICES
          </button>
        </div>
      </section>

      {/* Services Grid - Clean Layout */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-light">Popular Services</h3>
            <button className="text-sm underline underline-offset-4">View All</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((service) => (
              <div key={service.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="text-sm font-light mb-1">{service.name}</h4>
                <p className="text-xs text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-light mb-6">Quality You Can Trust</h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              Verified professionals. Transparent pricing. Guaranteed satisfaction.
              We bring expertise to every project, big or small.
            </p>
            <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-colors">
              LEARN MORE
            </button>
          </div>
          <div className="aspect-square bg-gray-200" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-light text-center mb-16">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Choose Service', desc: 'Browse and select from our range of professional services' },
              { step: '02', title: 'Book Appointment', desc: 'Pick a convenient time slot that works for you' },
              { step: '03', title: 'Get It Done', desc: 'Our verified professionals deliver quality work' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-light text-gray-300 mb-4">{item.step}</div>
                <h4 className="text-lg mb-3">{item.title}</h4>
                <p className="text-sm text-gray-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light mb-4">Ready to Transform Your Space?</h3>
          <p className="text-gray-600 mb-8 font-light">Join thousands of satisfied customers</p>
          <button className="bg-black text-white px-12 py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors">
            BOOK NOW
          </button>
        </div>
      </section>
    </div>
  );
}