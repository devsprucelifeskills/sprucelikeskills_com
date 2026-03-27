"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle2, User, Phone, BookOpen, MessageSquare, Send } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function StudentEnquiry() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    courseName: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/enquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', contact: '', courseName: '', message: '' });
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
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Content & Branding */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="slide-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Admissions Open 2024-25
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                Ready to Kickstart Your <span className="text-[#13523f]">Career?</span>
              </h2>
              
              <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xl mb-10">
                Join our community of healthcare professionals. Get expert guidance, industry-recognized certifications, and hands-on training tailored for your success.
              </p>

              <div className="space-y-6">
                {[
                  { icon: BookOpen, title: 'Expert-Led Courses', desc: 'Learn from industry veterans with years of experience.' },
                  { icon: CheckCircle2, title: 'AAPC Certification', desc: 'Get certified by the global leader in healthcare business.' },
                  { icon: Send, title: 'Placement Assistance', desc: 'We help you find the right opportunities after training.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white shadow-lg border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform">
                      <item.icon size={22} className={i === 0 ? 'text-blue-500 group-hover:text-white' : i === 1 ? 'text-emerald-500 group-hover:text-white' : 'text-orange-500 group-hover:text-white'} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - The Form */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="slide-right" delay={200}>
              <div className="relative">
                {/* Decorative blobs for the form card */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50" />

                <div className="relative bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sm:p-10 overflow-hidden">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Student enquiry</h3>
                    <p className="text-gray-400 text-sm font-medium">Fill out the form and our counselor will call you.</p>
                  </div>

                  {isSuccess ? (
                    <div className="py-12 text-center">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 transform scale-110">
                        <CheckCircle2 className="text-emerald-500" size={48} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">Submission Successful!</h3>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                        Thank you for your interest. Our representative will contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 px-8 py-3 bg-[#13523f] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg"
                      >
                        Send Another enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name Field */}
                      <div className="group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#13523f] transition-colors">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#13523f] transition-colors" size={18} />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#13523f]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Contact Field */}
                        <div className="group">
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#13523f] transition-colors">Contact No / Email</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#13523f] transition-colors" size={18} />
                            <input
                              type="text"
                              name="contact"
                              required
                              placeholder="+91 00000 00000"
                              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#13523f]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300"
                              value={formData.contact}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Course Name Field */}
                        <div className="group">
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#13523f] transition-colors">Interested Course</label>
                          <div className="relative">
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#13523f] transition-colors" size={18} />
                            <input
                              type="text"
                              name="courseName"
                              required
                              placeholder="e.g. Medical Coding"
                              className="w-full bg-gray-50 border-2 border-transparent focus:border-[#13523f]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300"
                              value={formData.courseName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="group">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#13523f] transition-colors">Message</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-5 text-gray-300 group-focus-within:text-[#13523f] transition-colors" size={18} />
                          <textarea
                            name="message"
                            required
                            rows={3}
                            placeholder="Tell us about your requirements..."
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#13523f]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none transition-all resize-none placeholder:text-gray-300"
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-xs font-bold text-center">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#13523f] hover:bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-emerald-900/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isLoading ? (
                          <><Loader2 className="animate-spin" size={20} /> Processing...</>
                        ) : (
                          <>Submit enquiry <Send size={18} /></>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
