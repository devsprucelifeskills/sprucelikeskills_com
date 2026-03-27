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
            <div className="w-full flex justify-center lg:justify-start lg:ml-25 lg:mb-14 mb-10">
              <ScrollReveal animation="slide-left" delay={200}>
                <div className="relative inline-block">
                  {/* Decorative background blob/circle */}
                  <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition duration-500"></div>

                  {/* Image container */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[6px] border-[#0f4c32] overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
                      alt="Professional Healthcare Worker"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                    />
                  </div>

                  {/* Floating Badge 1 */}
                  <div className="absolute -right-4 top-8 bg-white p-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce flex-col" style={{ animationDuration: '3s' }}>
                    <div className="bg-[#e8f5e9] p-2 rounded-lg">
                      <svg className="w-6 h-6 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-gray-800">Certified</span>
                  </div>

                  {/* Floating Badge 2 */}
                  <div className="absolute -left-6 bottom-12 bg-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] border-2 border-white font-extrabold text-blue-800 z-10">A+</div>
                      <div className="w-8 h-8 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[10px] border-2 border-white font-extrabold text-[#2ecc71] z-0">100%</div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">Access To</span>
                      <span className="text-xs font-black text-gray-800 leading-tight">Top Talent</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fade-up" delay={400}>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 drop-shadow-sm">
                Partner with Excellence
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                Recruit premium talent rigorously trained to meet the highest industry standards. Our candidates are equipped with advanced skills, AAPC certifications, and the practical knowledge your organization needs to thrive.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-2.5 text-white bg-white/10 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                  <CheckCircle2 size={18} className="text-[#2ecc71]" />
                  <span className="text-sm font-bold tracking-wide">Industry Ready</span>
                </div>
                <div className="flex items-center gap-2.5 text-white bg-white/10 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                  <CheckCircle2 size={18} className="text-[#2ecc71]" />
                  <span className="text-sm font-bold tracking-wide">AAPC Certified</span>
                </div>
              </div>
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
                    className="w-full bg-[#13523f] hover:bg-[#1a6e4a] disabled:opacity-60 text-white font-bold py-3.5 text-base rounded-sm transition-colors mt-2 flex items-center justify-center gap-2"
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
