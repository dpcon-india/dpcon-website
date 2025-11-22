'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../redux-toolkit/features/authSlice';
import Logo from './Logo';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    dispatch(logout());
    setIsProfileOpen(false);
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/services" className="hover:underline underline-offset-4 transition-all">
              Services
            </Link>
            <Link href="/about" className="hover:underline underline-offset-4 transition-all">
              About
            </Link>
            <a href="#" className="hover:underline underline-offset-4 transition-all">
              Contact
            </a>
          </nav>

          {/* CTA Button / Profile */}
          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm font-light hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm font-light text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
                Sign In
              </Link>
            )}
            <a href="tel:9833133366" className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-light">For enquiry</span>
                <span className="text-xs font-light">9833133366</span>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-[1px] w-full bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-[1px] w-full bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-[1px] w-full bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="flex flex-col py-6 space-y-6">
              <Link href="/services" className="text-sm font-light hover:text-gray-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-sm font-light hover:text-gray-600 transition-colors">
                About
              </Link>
              <a href="#" className="text-sm font-light hover:text-gray-600 transition-colors">
                Contact
              </a>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="text-sm font-light hover:text-gray-600 transition-colors">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-light text-red-600 hover:text-red-700 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="border border-black px-6 py-3 text-sm font-light hover:bg-black hover:text-white transition-colors w-fit">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
