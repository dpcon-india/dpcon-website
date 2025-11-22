'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux-toolkit/services/authApi';
import { setCredentials } from '../redux-toolkit/features/authSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      if (result.profile?.token) {
        localStorage.setItem('authToken', result.profile.token);
        localStorage.setItem('userId', result.profile._id);
        dispatch(setCredentials({ user: result.profile, token: result.profile.token }));
        router.push('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-light tracking-wide text-black mb-2">LOGIN</h1>
          <p className="text-xs text-gray-500 font-light">Sign in to your account</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                  {error?.data?.message || 'Login failed. Please try again.'}
                </div>
              )}
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>

              <div className="text-center text-sm pt-4">
                Don't have an account?{' '}
                <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign up
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
