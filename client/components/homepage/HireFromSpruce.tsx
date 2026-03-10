"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function HireFromSpruce() {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    mobileNo: '',
    email: '',
    requiredSkills: '',
    numberOfOpenings: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/partner-enquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ companyName: '', name: '', mobileNo: '', email: '', requiredSkills: '', numberOfOpenings: '' });
      } else {
        setError(data.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#065F46] mt-20">
      {/* Subtle dot-grid background overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        {/* Top Heading */}
        <ScrollReveal animation="fade-up">
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-16 leading-tight">
            Hire Skilled Healthcare professionals from Spruce
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column - Illustration + Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Illustrated avatar */}
            <ScrollReveal animation="slide-left" delay={200}>
              <div className="mb-8">
                <div className="relative flex items-center justify-center">
                  {/* Green circle background behind avatar */}
                  <div className="w-40 h-40 rounded-full bg-[#1a6644] flex items-center justify-center overflow-hidden shadow-2xl">
                    {/* Using an SVG illustration approximating the laptop-man in the design */}
                    <svg viewBox="0 0 120 120" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Body */}
                      <ellipse cx="60" cy="95" rx="30" ry="20" fill="#c97444" />
                      {/* Shirt */}
                      <ellipse cx="60" cy="85" rx="22" ry="18" fill="#e55a2b" />
                      {/* Neck */}
                      <rect x="54" y="57" width="12" height="14" rx="4" fill="#f5cba7" />
                      {/* Head */}
                      <ellipse cx="60" cy="50" rx="18" ry="20" fill="#f5cba7" />
                      {/* Hair */}
                      <ellipse cx="60" cy="34" rx="18" ry="10" fill="#4a2800" />
                      {/* Glasses */}
                      <circle cx="53" cy="50" r="6" stroke="#333" strokeWidth="2" fill="none" />
                      <circle cx="67" cy="50" r="6" stroke="#333" strokeWidth="2" fill="none" />
                      <line x1="59" y1="50" x2="61" y2="50" stroke="#333" strokeWidth="2" />
                      {/* Beard */}
                      <ellipse cx="60" cy="63" rx="10" ry="6" fill="#8b5e3c" />
                      {/* Laptop */}
                      <rect x="30" y="88" width="60" height="8" rx="2" fill="#555" />
                      <rect x="34" y="75" width="52" height="13" rx="2" fill="#777" />
                      <rect x="36" y="77" width="48" height="9" rx="1" fill="#aed6f1" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-white font-bold text-lg sm:text-xl leading-relaxed max-w-sm">
                Become Partner with Spruce to recruit top talent trained to meet the highest industry standards.
                <br />
                <span className="font-normal mt-2 block text-white/90">
                  Our students are equipped with the skills and knowledge your organization needs to excel.
                </span>
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column - Enquiry Form */}
          <ScrollReveal animation="slide-right" delay={300}>
            <div className="bg-white rounded-lg shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Enquiry Form
              </h3>

              {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-[#2ecc71]" size={44} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Thank You!</h3>
                <p className="text-gray-500 font-medium leading-relaxed max-w-xs">
                  Your partner enquiry has been received. Our team will reach out to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-xs font-bold text-[#0A3D24] underline underline-offset-2 hover:text-black transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>

                  {/* Mobile No */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Mobile No
                    </label>
                    <input
                      type="tel"
                      name="mobileNo"
                      placeholder="Enter your Mobile No"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>

                  {/* Required Skills */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      name="requiredSkills"
                      placeholder="Enter required skills"
                      value={formData.requiredSkills}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>

                  {/* Number of Openings */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1.5">
                      Number of Openings
                    </label>
                    <input
                      type="number"
                      name="numberOfOpenings"
                      placeholder="Number of openings"
                      min="1"
                      value={formData.numberOfOpenings}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0A3D24] focus:ring-1 focus:ring-[#0A3D24] transition"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-bold bg-red-50 border border-red-100 rounded px-3 py-2 text-center">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FDB813] hover:bg-[#e6a510] disabled:opacity-60 text-black font-bold py-3.5 text-base rounded-sm transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : 'Submit Enquiry'}
                </button>
              </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
