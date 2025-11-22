'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useResetPasswordMutation, useValidateResetTokenQuery } from '../redux-toolkit/services/authApi';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);

  const { data: tokenValidation, isLoading: validating, error: tokenError } = useValidateResetTokenQuery(token, {
    skip: !token
  });
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ token, newPassword: formData.newPassword }).unwrap();
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      console.error('Reset password failed:', err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            Invalid reset link. Please request a new password reset.
          </div>
          <Link href="/forgot-password" className="mt-4 inline-block text-black hover:underline">
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Validating reset link...</div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            This reset link has expired or is invalid. Please request a new one.
          </div>
          <Link href="/forgot-password" className="mt-4 inline-block text-black hover:underline">
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-light tracking-wide text-black mb-2">RESET PASSWORD</h1>
          <p className="text-xs text-gray-500 font-light">Set your new password</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="max-w-md">
            {success ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-md text-sm">
                Password reset successful! Redirecting to login...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                    {error?.data?.message || 'Failed to reset password. Please try again.'}
                  </div>
                )}
                <div className="bg-gray-50 p-2 rounded-lg">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={formData.newPassword}
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
                  {isLoading ? 'Resetting...' : 'Reset password'}
                </button>
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
