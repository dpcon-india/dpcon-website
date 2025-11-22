'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useChangePasswordMutation } from '../redux-toolkit/services/authApi';
import Input from '../components/Input';
import Button from '../components/Button';

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
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-black mb-2">CHANGE PASSWORD</h1>
          <p className="text-[10px] sm:text-xs text-gray-500 font-light">Update your password</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="max-w-md">
            <div className="mb-4 sm:mb-6">
              <Link href="/profile" className="text-xs sm:text-sm text-black hover:text-gray-600 font-medium">
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
                <Input
                  label="Current Password"
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
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
                  label="Confirm New Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Changing...' : 'Change Password'}
                </Button>
              </form>
            )}
          </div>
          <div className="h-32 sm:h-40 md:h-full">
            <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
