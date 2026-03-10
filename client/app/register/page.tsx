"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import Header from '@/components/common/Header';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Registration Form Submission:', formData);
    alert('Registration successful! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-12">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Branding/Info */}
          <div className="w-full md:w-5/12 bg-[#0A3D24] p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center font-black text-2xl mb-8">S</div>
              <h2 className="text-3xl font-black mb-6 leading-tight">Start Your Career <span className="text-green-500 text-4xl block">Today.</span></h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <p className="text-sm font-medium text-white/80">Access to industry-leading certification programs.</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <p className="text-sm font-medium text-white/80">Direct interaction with expert faculty members</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <p className="text-sm font-medium text-white/80">Placement assistance with top healthcare firms</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-tight">Secure & Trusted Healthcare Training Institute</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-8 md:p-12">
            <div className="mb-10">
              <h1 className="text-2xl font-black text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-500 font-medium text-sm">Join the Spruce Lifeskills community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-[0.2em]">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all text-sm"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all text-sm"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-[0.2em]">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      required
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all text-sm"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-[0.2em]">Confirm</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      required
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:bg-white transition-all text-sm"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-0.5 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="terms" className="ml-3 block text-xs text-gray-500 font-medium leading-normal cursor-pointer">
                  I agree to the <Link href="#" className="text-green-600 font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-green-600 font-bold hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-4"
              >
                Create Account <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 font-medium">
              Already a member?{' '}
              <Link href="/login" className="text-green-600 font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
