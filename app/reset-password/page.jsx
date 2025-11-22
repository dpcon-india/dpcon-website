'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useResetPasswordMutation, useValidateResetTokenQuery } from '../redux-toolkit/services/authApi';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Button from '../components/Button';

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
          <div className="bg-red-50 text-red-600 p-4">
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
          <div className="bg-red-50 text-red-600 p-4">
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
    <div className="bg-white min-h-screen flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12">
        <div>
          <AuthHeader currentPage="Reset Password" title="Set new password" />
          <div>
            {success ? (
              <div className="bg-green-50 text-green-600 p-4 text-sm">
                Password reset successful! Redirecting to login...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 sm:p-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 text-sm">
                    {error?.data?.message || 'Failed to reset password. Please try again.'}
                  </div>
                )}
                <Input
                  label="New Password"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset password'}
                </Button>
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
