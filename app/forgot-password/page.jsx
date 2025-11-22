'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForgotPasswordMutation } from '../redux-toolkit/services/authApi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error('Forgot password failed:', err);
    }
  };

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-light tracking-wide text-black mb-2">FORGOT PASSWORD</h1>
          <p className="text-xs text-gray-500 font-light">Reset your password</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="max-w-md">
            {success ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-md text-sm">
                Password reset link has been sent to your email. Please check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                    {error?.data?.message || 'Failed to send reset link. Please try again.'}
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
                    className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-black focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </button>

                <div className="text-center text-sm pt-4">
                  Remember your password?{' '}
                  <Link href="/login" className="text-black hover:text-gray-600 font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
          <div className="hidden md:block h-full">
            <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
