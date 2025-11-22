'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../redux-toolkit/services/authApi';
import { setCredentials } from '../redux-toolkit/features/authSlice';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Button from '../components/Button';

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
    <div className="bg-white min-h-screen flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12">
        <div>
          <AuthHeader currentPage="Register" title="Create account" />
          <div>
            <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm">
                  {error?.data?.message || 'Signup failed. Please try again.'}
                </div>
              )}
              <Input
                label="Full Name"
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
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
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>

              <div className="text-center text-sm pt-2">
                Already have an account?{' '}
                <Link href="/login" className="text-gray-900 hover:text-gray-700 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-32 sm:h-40 md:h-auto">
        <img src="/paint.png" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
