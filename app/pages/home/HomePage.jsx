'use client';

import { useGetCategoriesQuery } from '../../redux-toolkit/services/serviceApi';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = ['/DPCON.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);



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

      {/* Hero Banner with Slider */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden min-h-[400px] sm:min-h-[500px] flex items-center">
        {/* Background Slider */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            /> */}
          </div>
        ))}

        {/* Centered Text Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 sm:mb-6 tracking-tight text-black">
            Expert Services<br />For Your Space
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 font-light px-4">
            Professional construction and home services, simplified.
          </p>
          <Link href="/services" className="inline-block bg-black text-white px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-wide hover:bg-gray-800 transition-colors">
            EXPLORE SERVICES
          </Link>
        </div>
      </section>

      {/* Services Grid - Clean Layout */}
      <section className="px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-light">Popular Services</h3>
            <Link href="/services" className="text-xs sm:text-sm border border-black px-4 sm:px-6 py-2 hover:bg-black hover:text-white transition-colors font-medium">View All</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              categories.slice(0, 6).map((category) => (
                <Link key={category._id} href={`/services`} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden relative">
                    <Image
                      src={category.image || '/placeholder-service.jpg'}
                      alt={category.categoryName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h4 className="text-xs sm:text-sm font-light mb-1">{category.categoryName}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-600">{category.description || 'Free Estimation'}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 mt-8 sm:mt-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">Quality You Can Trust</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed font-light">
              Verified professionals. Transparent pricing. Guaranteed satisfaction.
              We bring expertise to every project, big or small.
            </p>
            <button className="border border-black px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm hover:bg-black hover:text-white transition-colors">
              LEARN MORE
            </button>
          </div>
          <div className="aspect-square relative overflow-hidden">
            <Image
              src="/quality.jpg"
              alt="Quality You Can Trust"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-light text-center mb-10 sm:mb-16">How It Works</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { step: '01', title: 'Choose Service', desc: 'Browse and select from our range of professional services' },
              { step: '02', title: 'Book Appointment', desc: 'Pick a convenient time slot that works for you' },
              { step: '03', title: 'Get It Done', desc: 'Our verified professionals deliver quality work' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-300 mb-3 sm:mb-4">{item.step}</div>
                <h4 className="text-base sm:text-lg mb-2 sm:mb-3">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">Ready to Transform Your Space?</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-light">Join thousands of satisfied customers</p>
          <Link href="/services" className="inline-block bg-black text-white px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-wide hover:bg-gray-800 transition-colors">
            BOOK NOW
          </Link>
        </div>
      </section>
    </div>
  );
}