'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux-toolkit/services/authApi';
import { logout } from '../redux-toolkit/features/authSlice';

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
      <div className="border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-light tracking-wide text-black mb-4">MY PROFILE</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="max-w-2xl">
          {/* Actions */}
          <div className="flex gap-4 mb-8">
            {/* <Link href="/change-password" className="text-xs uppercase tracking-widest text-black hover:text-gray-600 transition-colors font-medium">
              Change Password →
            </Link> */}
            <button onClick={handleLogout} className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={!isEditing}
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:text-gray-600"
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
                disabled={!isEditing}
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:text-gray-600"
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
                disabled={!isEditing}
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 text-base font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:text-gray-600"
              />
            </div>

            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 text-black px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
