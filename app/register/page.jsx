'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../redux-toolkit/services/authApi';
import { setCredentials } from '../redux-toolkit/features/authSlice';

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [signup, { isLoading, error }] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'user'
      }).unwrap();

      if (result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('userId', result.user._id);
        dispatch(setCredentials({ user: result.user, token: result.token }));
        router.push('/');
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-light tracking-wide text-black mb-2">REGISTER</h1>
          <p className="text-xs text-gray-500 font-light">Create your account</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                  {error?.data?.message || 'Signup failed. Please try again.'}
                </div>
              )}
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>

              <div className="text-center text-sm pt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-black hover:text-gray-600 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
          <div className="hidden md:block h-full">
            <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
