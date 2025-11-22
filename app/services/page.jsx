'use client';

import { useState, useMemo } from 'react';
import { useGetServicesQuery, useGetServicesByCategoryQuery } from '../redux-toolkit/services/serviceApi';
import Link from 'next/link';
import Image from 'next/image';
import ServiceFilter from '../components/ServiceFilter';

export default function ServicesPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: allServices, isLoading, error } = useGetServicesQuery();

  const filteredServices = useMemo(() => {
    if (!allServices) return [];

    return allServices.filter(service => {
      const categoryMatch = selectedCategories.length === 0 ||
        service.categories?.some(cat => selectedCategories.includes(cat._id));

      const priceMatch = !priceRange || (
        priceRange === 'free' ? service.price === 0 :
          priceRange === 'paid' ? service.price > 0 : true
      );

      return categoryMatch && priceMatch;
    });
  }, [allServices, selectedCategories, priceRange]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-gray-500">Loading Services</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-xs uppercase tracking-widest text-red-500">Error Loading Services</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl font-light tracking-tight text-[#00296b] mb-1">Services</h1>
          <p className="text-xs text-gray-500">Discover our professional services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden px-4 py-4 border-b border-gray-100">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm font-medium text-[#00296b]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {isFilterOpen ? '▲' : '▼'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <ServiceFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Services Grid */}
          <div className="flex-1 p-4 md:p-8">
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                {filteredServices.length} of {allServices?.length || 0} services
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredServices.map((service) => (
                <Link key={service._id} href={`/services/${service.slug}`} className="group cursor-pointer">
                  <div className="relative aspect-square mb-4 overflow-hidden">
                    <Image
                      src={service.image || '/placeholder-service.jpg'}
                      alt={service.serviceTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {service.price > 0 && (
                      <div className="absolute top-4 right-4 bg-white px-3 py-1">
                        <span className="text-xs font-medium tracking-wide">₹{service.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="py-2 md:py-4 min-h-[180px] md:h-44 flex flex-col">
                    <h3 className="text-sm md:text-base font-light tracking-wide text-black group-hover:text-gray-600 transition-colors mb-2 line-clamp-2">
                      {service.serviceTitle}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 md:line-clamp-4 leading-relaxed mb-2 flex-grow">
                      {service.description}
                    </p>

                    <div className="mb-2 overflow-hidden">
                      <div className="flex flex-wrap gap-1">
                        {service.categories?.slice(0, 1).map((category) => (
                          <span key={category._id} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 uppercase tracking-wide font-medium">
                            {category.categoryName}
                          </span>
                        ))}
                        {service.categories?.length > 1 && (
                          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 font-medium">
                            +{service.categories.length - 1}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-2 mt-auto">
                      <span className="text-xs text-black uppercase tracking-widest font-medium group-hover:text-gray-600 transition-colors">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-24">
                <p className="text-xs text-gray-400 uppercase tracking-widest">No services match your selection</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}