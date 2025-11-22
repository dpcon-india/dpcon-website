'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux-toolkit/services/authApi';
import { logout } from '../redux-toolkit/features/authSlice';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      router.push('/login');
    } else {
      setUserId(id);
    }
  }, [router]);

  const { data: profile, isLoading, error } = useGetProfileQuery(userId, {
    skip: !userId
  });
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ id: userId, ...formData }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    dispatch(logout());
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            Failed to load profile. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-black mb-3 sm:mb-4">MY PROFILE</h1>
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <div className="max-w-2xl">
          {/* Actions */}
          <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* <Link href="/change-password" className="text-xs uppercase tracking-widest text-black hover:text-gray-600 transition-colors font-medium">
              Change Password →
            </Link> */}
            <button onClick={handleLogout} className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              required
              disabled={!isEditing}
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              required
              disabled={!isEditing}
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              required
              disabled={!isEditing}
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              {isEditing ? (
                <>
                  <Button type="submit" disabled={updating} fullWidth={false}>
                    {updating ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button type="button" onClick={() => setIsEditing(false)} variant="secondary" fullWidth={false}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)} fullWidth={false}>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
