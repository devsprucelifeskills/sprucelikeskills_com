"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, ChevronUp, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';
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
            {/* <div className="mb-6 md:mb-0"> */}
            {/* Logo placeholder - using text to mimic the Spruce logo style */}
            {/* <div className="flex items-center text-white">
                <span className="text-4xl font-serif tracking-widest drop-shadow-md font-bold">SPRUCE</span>
                <span className="text-sm font-light mt-4 ml-1">®</span>
              </div>
              <div className="text-xs tracking-widest text-white/80 text-right pr-4 italic">Lifeskills</div>
            </div> */}
            <img
              src={"/spruseLogo.png"}
              alt="Spruce Lifeskills"
              className="h-20 w-auto object-contain"
            />

            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/1a77hKh57r/" target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="Meta (Facebook)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/sprucelifeskills/" target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://wa.me/919595025757" target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.035c0 2.123.553 4.197 1.604 6.035L0 24l6.105-1.602a11.83 11.83 0 005.937 1.597h.005c6.632 0 12.028-5.397 12.031-12.037a11.87 11.87 0 00-3.483-8.423z"/></svg>
                </a>
                <a href="https://www.instagram.com/sprucelifeskills" target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.376.896.419.419.679.818.896 1.376.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.376-.419.419-.818.679-1.376.896-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.376-.896-.419-.419-.679-.818-.896-1.376-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.376.419-.419.818-.679 1.376-.896.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.059 1.278.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126s1.384 1.384 2.126 1.384c.765.297 1.635.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.148-.261 2.913-.558.789-.306 1.459-.717 2.126-1.384s1.384-1.384 2.126-1.384c.297-.765.499-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.278-.261-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126s-1.384-1.384-2.126-1.384c-.765-.297-1.635-.499-2.913-.558C15.667.014 15.259 0 12 0m0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324M12 16a4 4 0 110-8 4 4 0 010 8m6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881"/></svg>
                </a>
              </div>

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

            {/* Grouping Company & Quick Link for Mobile */}
            <div className="grid grid-cols-2 gap-8 md:contents">
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
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Courses</h3>
              <div className="w-8 h-0.5 bg-white/20 mb-6 -mt-4"></div>
              <ul className="grid grid-cols-2 md:block gap-x-4 gap-y-4 md:space-y-4 font-medium tracking-tight text-sm text-[#e8f5e9]/80">
                <li><Link href="/courses/medical-coding" className="hover:text-white transition-colors block leading-tight">Medical Coding</Link></li>
                <li><Link href="/courses/clinical-research" className="hover:text-white transition-colors block leading-tight">Clinical Research</Link></li>
                <li><Link href="/courses/medical-billing" className="hover:text-white transition-colors block leading-tight">Medical Billing</Link></li>
                <li><Link href="/courses/account-receivable" className="hover:text-white transition-colors leading-snug block">Account<br />Receivable</Link></li>
                <li><Link href="/courses/campus-to-corporate" className="hover:text-white transition-colors leading-snug block">Campus to<br />Corporate</Link></li>
                <li><Link href="/courses/certification" className="hover:text-white transition-colors block leading-tight">Certification</Link></li>
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
            <button onClick={() => setEnquiryOpen(true)} className="bg-[#13523f] text-white text-xs font-bold py-2.5 px-6 hover:bg-[#1a6e4a] transition-colors mb-4 md:mb-0 md:-ml-4">
              Enquire Now
            </button>

            <p className="text-[#e8f5e9]/70 text-xs text-center md:text-left tracking-wide">
              Copyright © 2024 TBI. All Rights Reserved.
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#13523f] p-2 hover:bg-[#1a6e4a] transition-colors absolute right-0 bottom-0 md:static hidden sm:block"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          </div>
        </div>
      </footer>

      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}