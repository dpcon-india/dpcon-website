'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-100 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 tracking-wide">ABOUT OUR COMPANY</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-black mb-4 sm:mb-6 leading-tight">
              Best Solution For<br />Cleaning Services
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Column - Main Text */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-light">
                Welcome to <span className="font-medium text-black">DPConIndia</span>, your premier destination for connecting with top-rated service providers and finding the perfect match for your needs. Our platform is designed to simplify the process of discovering, evaluating, and hiring trusted professionals across a wide range of services, from home improvement and IT support to personal care and more.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Our commitment to innovation and excellence invariably results in a successfully completed project for both contractor and client. We understand and promote the idea of working as a partnership with our clients to ensure their goals are met.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We undertake a variety of projects for a wide range of clients – from small private developments to large projects. Our unique and 360-degree flexible project management systems ensure that a positive outcome is achieved regardless of the size or nature of the project.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We look at every opportunity with a beginner's mind. This approach of getting involved in various kinds of projects came to reality cause of the availability of different types of eminent teams.
              </p>
            </div>

            {/* Right Column - Features */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
                <h3 className="text-xl sm:text-2xl font-light text-black mb-6 sm:mb-8">Why Choose Us</h3>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">Quality & Reliability</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">We prioritize quality and reliability in every project we undertake</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">Time Efficient</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">Saving your time and effort with streamlined processes</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-black mb-1 sm:mb-2">Transparent Reviews</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">Clear, detailed service listings & reviews for informed decisions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-black mb-3 sm:mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6 sm:mb-8">Experience the difference with our professional services</p>
          <button className="bg-black text-white px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg">
            Explore Services
          </button>
        </div>
      </section>
    </div>
  );
}
