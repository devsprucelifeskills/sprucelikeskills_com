"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import Header from '@/components/common/Header';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const res = await fetch(`${backend_url}/api/v2/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 text-green-600 mb-6 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-xs font-bold text-green-600 hover:text-green-700">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-bold text-gray-700 text-sm">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors font-bold text-gray-700 text-sm">
                <Github className="w-5 h-5" />
                Github
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="text-green-600 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
