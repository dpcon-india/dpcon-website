'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useChangePasswordMutation } from '../redux-toolkit/services/authApi';

export default function ChangePassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }).unwrap();
      setSuccess(true);
      setTimeout(() => router.push('/profile'), 2000);
    } catch (err) {
      console.error('Change password failed:', err);
    }
  };

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-light tracking-wide text-black mb-2">CHANGE PASSWORD</h1>
          <p className="text-xs text-gray-500 font-light">Update your password</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="max-w-md">
            <div className="mb-6">
              <Link href="/profile" className="text-sm text-black hover:text-gray-600 font-medium">
                ← Back to Profile
              </Link>
            </div>

            {success ? (
              <div className="bg-green-50 text-green-600 p-4 rounded-md text-sm">
                Password changed successfully! Redirecting...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                    {error?.data?.message || 'Failed to change password. Please try again.'}
                  </div>
                )}
                <div className="bg-gray-50 p-2 rounded-lg">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-black focus:ring-2 focus:ring-black"
                  />
                </div>
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
                    className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-black focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-black focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
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
