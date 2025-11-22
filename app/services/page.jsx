'use client';

import { useState, useMemo } from 'react';
import { useGetServicesQuery, useGetServicesByCategoryQuery } from '../redux-toolkit/services/serviceApi';
import Link from 'next/link';
import Image from 'next/image';
import ServiceFilter from '../components/ServiceFilter';

export default function ServicesPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('');

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
      <div className="border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-light tracking-wide text-black mb-4">SERVICES</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Discover our professional services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <ServiceFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Services Grid */}
          <div className="flex-1 p-8 pr-8">
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                {filteredServices.length} of {allServices?.length || 0} services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                  <div className="py-4 h-44 flex flex-col">
                    <div className="h-12 mb-3">
                      <h3 className="text-base font-light tracking-wide text-black group-hover:text-gray-600 transition-colors mb-2 line-clamp-2 h-10">
                        {service.serviceTitle}
                      </h3>
                    </div>

                    <div className="h-16 mb-3 flex items-start">
                      <p className="text-xs text-gray-500 line-clamp-4 leading-relaxed min-h-[2rem]">
                        {service.description}
                      </p>
                    </div>

                    <div className="h-8 mb-4 overflow-hidden">
                      <div className="flex flex-wrap gap-1">
                        {service.categories?.slice(0, 2).map((category) => (
                          <span key={category._id} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 uppercase tracking-wide font-medium">
                            {category.categoryName}
                          </span>
                        ))}
                        {service.categories?.length > 2 && (
                          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 font-medium">
                            +{service.categories.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-auto">
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