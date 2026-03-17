"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { successCorner } from '@/lib/successCorner';
import ScrollReveal from '../common/ScrollReveal';

export default function SuccessCorner() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Area */}
        <ScrollReveal animation="fade-in">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-[#eab308]"></div>
                <h2 className="text-3xl sm:text-4xl text-black">
                  <span className="font-extrabold">Success</span>{" "}
                  <span className="font-normal text-gray-800">Corner</span>
                </h2>
              </div>
              <p className="text-[#0A3D24] font-medium mt-3 text-sm sm:text-base">
                Where Achievements Inspire New Beginnings
              </p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={scrollLeft}
                className="bg-[#eab308] p-2 hover:bg-[#ca8a04] transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
              </button>
              <button
                onClick={scrollRight}
                className="bg-[#eab308] p-2 hover:bg-[#ca8a04] transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-black" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Area */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 px-2 -mx-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hide scrollbar for webkit */}
            <style dangerouslySetInnerHTML={{__html: `
              div::-webkit-scrollbar {
                display: none;
              }
            `}} />

            {successCorner.map((student, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} threshold={0.05}>
                <div 
                  className="flex-none w-[260px] bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col snap-start transition-transform hover:-translate-y-1 duration-300 border border-gray-100"
                >
                  {/* Image Section */}
                  <div className="relative h-64 w-full bg-gray-100">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 text-center bg-white flex flex-col justify-center min-h-[100px]">
                    <p className="font-bold text-gray-900 text-[15px] mb-1.5">
                      Name: {student.name}
                    </p>
                    <p className="font-bold text-gray-900 text-[15px]">
                      Company: {student.company}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
