'use client';

export default function ServicesPage() {

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h1>
        


        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-2">Service {index + 1}</h3>
              <p className="text-gray-600 mb-4">Professional service description</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">$99</span>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))
        </div>
      </div>
    </div>
  );
}