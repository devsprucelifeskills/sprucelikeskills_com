import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Header from '@/components/common/Header';

export const metadata = {
  title: 'Contact Us | Spruce Life Skills',
  description: 'Get in touch with Spruce Life Skills. Contact our offices, centers, and team for inquiries about our courses.',
};

export default function ContactPage() {
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

                <form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all"
                      required
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
                    <textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f] focus:border-transparent transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 text-lg uppercase tracking-wider"
                  >
                    Send Message
                  </button>
                </form>
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

                {/* Branch Office Card */}
                <div className="bg-gradient-to-br from-[#126B41] to-[#0f4c32] text-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#13523f] text-white rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black">Branch Office</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed text-base font-medium">
                    501, Pinnacle Pride, Lokmanya Bal Gangadhar Tilak Rd, Above Maharashtra Electronics, <strong>Pune, Maharashtra 411030</strong>
                  </p>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919595025757"
                  className="bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black py-4 px-8 rounded-lg transition-all transform hover:scale-105 duration-300 text-lg uppercase tracking-wider inline-block"
                >
                  Get Quick Call Back
                </a>
                <a
                  href="https://wa.me/919595025757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5e] text-white font-black py-4 px-8 rounded-lg transition-all transform hover:scale-105 duration-300 text-lg uppercase tracking-wider inline-block"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
