'use client';

import { useGetServicesQuery, useGetServiceQuery } from '../../redux-toolkit/services/serviceApi';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EstimateForm from '../../components/EstimateForm';

export default function ServiceDetailPage() {
  const params = useParams();
  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const [serviceId, setServiceId] = useState(null);
  const [isEstimateFormOpen, setIsEstimateFormOpen] = useState(false);

  useEffect(() => {
    if (servicesData && params.slug) {
      const services = Array.isArray(servicesData) ? servicesData : [];
      const service = services.find(s => s.slug === params.slug);
      if (service) {
        setServiceId(service._id);
      }
    }
  }, [servicesData, params.slug]);

  const { data: service, isLoading: serviceLoading, error } = useGetServiceQuery(serviceId, {
    skip: !serviceId
  });

  if (servicesLoading || serviceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-gray-500">Loading Service</p>
        </div>
      </div>
    );
  }

  if (!serviceId || error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xs uppercase tracking-widest text-red-500">Service Not Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-8">
          <Link href="/services" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors inline-flex items-center gap-2">
            ← Back to Services
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="relative aspect-square mb-4 overflow-hidden">
              <Image
                src={service?.image || '/placeholder-service.jpg'}
                alt={service?.serviceTitle}
                fill
                className="object-cover"
              />
            </div>

            {service?.gallery?.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {service.gallery.map((img, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden">
                    <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-light tracking-wide text-black mb-6">{service?.serviceTitle}</h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">{service?.description}</p>

            {service?.categories?.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {service.categories.map((category) => (
                    <span key={category._id} className="text-xs text-gray-700 bg-gray-100 px-3 py-2 uppercase tracking-wide font-medium">
                      {category.categoryName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service?.price > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Price</h3>
                <p className="text-3xl font-light tracking-wide text-black">₹{service.price}</p>
                {service?.duration && <p className="text-xs text-gray-500 mt-2">Duration: {service.duration}</p>}
              </div>
            )}

            {service?.additionalServices?.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Additional Services</h3>
                <div className="space-y-3">
                  {service.additionalServices.map((addService) => (
                    <div key={addService._id} className="border border-gray-200 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-light tracking-wide text-black mb-1">{addService.service}</h4>
                          <p className="text-xs text-gray-500">{addService.desc}</p>
                          {addService.duration && <p className="text-xs text-gray-400 mt-1">Duration: {addService.duration}</p>}
                        </div>
                        {addService.price > 0 && (
                          <span className="text-sm font-light tracking-wide text-black">₹{addService.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service?.videoLink && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Service Video</h3>
                <a href={service.videoLink} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-black hover:text-gray-600 transition-colors">
                  Watch Video →
                </a>
              </div>
            )}

            {service?.faq?.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">FAQ</h3>
                <div className="space-y-4">
                  {service.faq.map((faqItem, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-light tracking-wide text-black mb-2">{faqItem.question}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{faqItem.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service?.includes?.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-black mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 bg-black text-white py-4 px-8 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Book This Service
              </button>
              <button 
                onClick={() => setIsEstimateFormOpen(true)}
                className="flex-1 border-2 border-black text-black py-4 px-8 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Get Free Estimate
              </button>
            </div>
          </div>
        </div>
      </div>

      <EstimateForm 
        isOpen={isEstimateFormOpen}
        onClose={() => setIsEstimateFormOpen(false)}
        service={service}
        userId={null}
      />
    </div>
  );
}
