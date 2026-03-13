"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, ChevronUp, Facebook, Linkedin } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function Footer() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const socialIconClass = "flex h-8 w-8 items-center justify-center rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors";

  return (
    <>
      <footer className="bg-[#0A3D24] text-white pt-12 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-8 border-b border-[#1b5c3e]">
            <div className="mb-6 md:mb-0">
              {/* Logo placeholder - using text to mimic the Spruce logo style */}
              <div className="flex items-center text-white">
                <span className="text-4xl font-serif tracking-widest drop-shadow-md font-bold">SPRUCE</span>
                <span className="text-sm font-light mt-4 ml-1">®</span>
              </div>
              <div className="text-xs tracking-widest text-white/80 text-right pr-4 italic">Lifeskills</div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <a href="#" className={socialIconClass} aria-label="Facebook"><Facebook size={14} /></a>
                <a href="#" className={socialIconClass} aria-label="WhatsApp"><span className="text-sm font-bold">W</span></a>
                <a href="#" className={socialIconClass} aria-label="LinkedIn"><Linkedin size={14} /></a>
                <a href="#" className={socialIconClass} aria-label="Google Plus"><span className="text-sm font-bold">G+</span></a>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="bg-[#FDB813] text-black text-sm font-bold py-2.5 px-6 hover:bg-[#e6a510] transition-colors">
                Enquire Now
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Contact Information</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>

              <ul className="space-y-5 text-sm text-[#e8f5e9]/80 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white/70" />
                  <span className="leading-relaxed">
                    3rd Floor, Navprabhat Chambers<br />
                    Besides ICICI Bank<br />
                    Ramdaspeth, Nagpur-440010.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 shrink-0 mt-0.5 text-white/70" />
                  <span className="leading-relaxed">
                    +91-9595025757<br />
                    +91-8999499930
                  </span>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:pl-4">
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Company</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>
              <ul className="space-y-4 text-sm text-[#e8f5e9]/80 font-medium">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Quick Link */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Link</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>
              <ul className="space-y-4 text-sm text-[#e8f5e9]/80 font-medium tracking-tight">
                <li><Link href="/register" className="hover:text-white transition-colors">Register Now</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/admission" className="hover:text-white transition-colors">Admission</Link></li>

              </ul>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Courses</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>
              <ul className="space-y-4 text-sm text-[#e8f5e9]/80 font-medium tracking-tight">
                <li><Link href="/courses/medical-coding" className="hover:text-white transition-colors block">Medical Coding</Link></li>
                <li><Link href="/courses/clinical-research" className="hover:text-white transition-colors block">Clinical Research</Link></li>
                <li><Link href="/courses/medical-billing" className="hover:text-white transition-colors block">Medical Billing</Link></li>
                <li><Link href="/courses/account-receivable" className="hover:text-white transition-colors leading-snug block">Account<br />Receivable</Link></li>
                <li><Link href="/courses/campus-to-corporate" className="hover:text-white transition-colors leading-snug block">Campus to<br />Corporate</Link></li>
                <li><Link href="/courses/certification" className="hover:text-white transition-colors block">Certification</Link></li>
              </ul>
            </div>

            {/* Our Gallery */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Our Gallery</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>
              <div className="flex gap-1">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=80&h=80" alt="Gallery 1" className="w-[50px] h-[70px] sm:w-[55px] sm:h-[75px] object-cover" />
                <img src="https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773301958/xv38cw5x144t93oqe4ye.jpg" alt="Gallery 2" className="w-[50px] h-[70px] sm:w-[55px] sm:h-[75px] object-cover" />
                <img src="https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773304135/ptxmx9chqrim3r7ov652.jpg" alt="Gallery 3" className="w-[50px] h-[70px] sm:w-[55px] sm:h-[75px] object-cover" />
                <img src="https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773304762/fgfvqceubnwnjwlxdwh6.jpg" alt="Gallery 4" className="w-[50px] h-[70px] sm:w-[55px] sm:h-[75px] object-cover" />
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[#1b5c3e] relative">
            <button onClick={() => setEnquiryOpen(true)} className="bg-[#FDB813] text-black text-xs font-bold py-2.5 px-6 hover:bg-[#e6a510] transition-colors mb-4 md:mb-0 md:-ml-4">
              Enquire Now
            </button>

            <p className="text-[#e8f5e9]/70 text-xs text-center md:text-left tracking-wide">
              Copyright © 2024 TBI. All Rights Reserved.
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#FDB813] p-2 hover:bg-[#e6a510] transition-colors absolute right-0 bottom-0 md:static hidden sm:block"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-black" strokeWidth={3} />
            </button>
          </div>
        </div>
      </footer>

      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}