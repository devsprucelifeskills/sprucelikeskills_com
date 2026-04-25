"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Send, Loader2, CheckCircle2, User, MessageSquare } from 'lucide-react';
import Header from '@/components/common/Header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: '',
    courseName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Map subject to courseName so admin UI shows it
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: formData.message,
        courseName: formData.subject || formData.courseName || '',
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/enquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', mobile: '', email: '', subject: '', message: '', courseName: '' });
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
    <>
      <Header />
      <main className="pt-20 pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Have questions about our courses or need more information? We're here to help. Reach out to us and our team will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form - Left */}
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-8 text-lg">Fill out the form below and we'll respond within 24 hours.</p>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-emerald-500" size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-500 font-medium max-w-xs">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 px-8 py-3 bg-[#13523f] text-white rounded-lg font-bold text-sm hover:bg-[#1a6e4a] transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Contact Number (Required) */}
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-bold text-gray-900 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          placeholder="+91-XXXXXXXXXX"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Email Address (Optional) */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                        Email Address <span className="text-gray-400 font-normal text-xs">(optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="your.email@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a subject</option>
                        <option value="course-inquiry">Course Inquiry</option>
                        <option value="admission">Admission</option>
                        <option value="placement">Placement</option>
                        <option value="general">General Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Type your message here..."
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all resize-none"
                          required
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm font-bold text-center bg-red-50 py-3 rounded-lg border border-red-100">
                        {error}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 text-lg uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <><Loader2 className="animate-spin" size={20} /> Sending...</>
                      ) : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Information - Right */}
              <div className="space-y-8">
                {/* Head Office Card */}
                <div className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#13523f] text-white rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Head Office</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed text-base font-medium">
                    ICICI Bank, 3rd Floor, Navprabhat Chambers, Besides Near Center Point Hotel, Ramdaspeth, <strong>Nagpur, Maharashtra 440010</strong>
                  </p>
                  <p className="text-xs text-white/70 mt-3 font-semibold tracking-widest">[MAIN BRANCH]</p>
                </div>

                {/* Contact Details Card */}
                <div className="bg-white border-2 border-[#13523f] p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Quick Contact</h3>
                  <div className="space-y-4">
                    {/* Phone Numbers */}
                    <a
                      href="tel:+919595025757"
                      className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-[#13523f] text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone</p>
                        <p className="font-bold text-gray-900">+91-9595025757</p>
                      </div>
                    </a>

                    <a
                      href="tel:+918999499930"
                      className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-[#13523f] text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Alternate</p>
                        <p className="font-bold text-gray-900">+91-8999499930</p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:sprucelifeskills@gmail.com"
                      className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-[#13523f] text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="font-bold text-gray-900 break-all">sprucelifeskills@gmail.com</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="bg-white border-2 border-[#0f4c32] p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/sprucelifeskills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110 duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/sprucelifeskills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110 duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://wa.me/919595025757"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110 duration-300"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0f4c32] text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">Still Have Questions?</h2>
                <p className="text-lg text-white/90">
                  Not sure which course is right for you? Book a free demo class with our experts.
                </p>
              </div>
              <div className="flex gap-8 justify-center items-center pt-4">
                <a
                  href="tel:+919595025757"
                  className="bg-white text-[#13523f] p-6 rounded-full transition-all transform hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] shadow-2xl flex items-center justify-center group"
                  aria-label="Call Now"
                >
                  <Phone className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919595025757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white p-6 rounded-full transition-all transform hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] shadow-2xl flex items-center justify-center group"
                  aria-label="Message on WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.035c0 2.123.553 4.197 1.604 6.035L0 24l6.105-1.602a11.83 11.83 0 005.937 1.597h.005c6.632 0 12.028-5.397 12.031-12.037a11.87 11.87 0 00-3.483-8.423z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
