"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, User } from 'lucide-react';
import { blogs } from '@/lib/blogs';
import Link from 'next/link';
import ScrollReveal from '../common/ScrollReveal';

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  const getVisibleBlogs = () => {
    const prevIdx = (currentIndex - 1 + blogs.length) % blogs.length;
    const nextIdx = (currentIndex + 1) % blogs.length;
    return {
      prev: blogs[prevIdx],
      current: blogs[currentIndex],
      next: blogs[nextIdx]
    };
  };

  const { prev, current, next } = getVisibleBlogs();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title Section */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 text-center mb-4 tracking-tight">
              Spruce's <span className="text-[#2ecc71]">Blogs</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#eab308] rounded-full"></div>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-2 md:px-0">
              <button
                onClick={scrollLeft}
                className="bg-white p-3 rounded-full shadow-xl hover:bg-[#eab308] transition-all group border border-gray-100"
                aria-label="Previous blog"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-black" strokeWidth={3} />
              </button>
              <button
                onClick={scrollRight}
                className="bg-white p-3 rounded-full shadow-xl hover:bg-[#eab308] transition-all group border border-gray-100"
                aria-label="Next blog"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-black" strokeWidth={3} />
              </button>
            </div>

            {/* Carousel Track */}
            <div className="flex justify-center items-center gap-4 md:gap-8 w-full transition-all duration-500">
              {/* Previous Blog - Ghost Card */}
              <div className="hidden lg:block flex-shrink-0 w-96 opacity-30 blur-[1px] scale-90 grayscale transition-all duration-500">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[400px]">
                  <img src={prev.image} alt="" className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71]">{prev.category}</span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2">{prev.title}</h3>
                  </div>
                </div>
              </div>

              {/* Current Blog - Hero Card */}
              <div className="flex-shrink-0 w-full max-w-sm sm:max-w-md lg:max-w-lg z-20 transform transition-all duration-500 hover:scale-[1.01]">
                <div className="bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] border border-gray-50 overflow-hidden flex flex-col">
                  {/* Featured Image - Reduced Height */}
                  <div className="relative h-48 md:h-52 overflow-hidden">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-[#eab308] text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-tighter">
                      Featured
                    </div>
                  </div>

                  {/* Content Area - Tighter Padding */}
                  <div className="bg-gradient-to-br from-[#0A3D24] via-[#0D5232] to-[#126B41] p-6 text-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="w-6 h-0.5 bg-[#eab308]"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#eab308]">{current.category}</span>
                      <span className="w-6 h-0.5 bg-[#eab308]"></span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-3 leading-tight tracking-tight">{current.title}</h3>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-5 font-medium italic">
                      "{current.excerpt}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {current.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-lg backdrop-blur-sm">
                          <Check className="w-3 h-3 text-[#2ecc71] flex-shrink-0" />
                          <span className="text-[9px] font-bold leading-none">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Info - Compact */}
                  <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#eab308] text-black w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-md">
                        <span className="text-lg font-black leading-none">{current.date.split(' ')[0]}</span>
                        <span className="text-[8px] font-bold uppercase whitespace-nowrap">{current.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold mb-0">{current.time}</p>
                        <div className="flex items-center gap-1 text-gray-900 font-black text-xs">
                          <User className="w-3 h-3 text-[#2ecc71]" />
                          Expert
                        </div>
                      </div>
                    </div>
                    <Link href={`/blog/${current.slug}`} className="p-2.5 bg-gray-50 hover:bg-[#eab308] rounded-full transition-colors group shadow-sm">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Next Blog - Ghost Card */}
              <div className="hidden lg:block flex-shrink-0 w-96 opacity-30 blur-[1px] scale-90 grayscale transition-all duration-500">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[400px]">
                  <img src={next.image} alt="" className="w-full h-40 object-cover" />
                  <div className="p-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71]">{next.category}</span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2">{next.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
