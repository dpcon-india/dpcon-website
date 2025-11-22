'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux-toolkit/services/authApi';
import { setCredentials } from '../redux-toolkit/features/authSlice';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Button from '../components/Button';

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
    <div className="bg-white min-h-screen flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12">
        <div>
          <AuthHeader currentPage="Login" title="Welcome back" />
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#F7F7F7] p-4 sm:p-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm">
                  {error?.data?.message || 'Login failed. Please try again.'}
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
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-[#00296b] font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="text-center text-sm pt-2">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#00296b] hover:text-[#FFC500] font-medium">
                  Sign up
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
