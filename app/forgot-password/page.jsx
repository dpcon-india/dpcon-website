'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForgotPasswordMutation } from '../redux-toolkit/services/authApi';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Button from '../components/Button';

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
    <div className="bg-white min-h-screen flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12">
        <div>
          <AuthHeader currentPage="Forgot Password" title="Reset password" />
          <div>
            {success ? (
              <div className="bg-green-50 text-green-600 p-4 text-sm">
                Password reset link has been sent to your email. Please check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 sm:p-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 text-sm">
                    {error?.data?.message || 'Failed to send reset link. Please try again.'}
                  </div>
                )}
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send reset link'}
                </Button>

                <div className="text-center text-sm pt-2">
                  Remember your password?{' '}
                  <Link href="/login" className="text-gray-900 hover:text-gray-700 font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-32 sm:h-40 md:h-auto">
        <img src="/paint.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
