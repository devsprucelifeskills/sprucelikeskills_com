"use client";

import React, { useState } from 'react';
import { User, BookOpen, Menu } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CourseTest() {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Handle test start logic here
      console.log('Starting test for:', name);
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[#065F46]">
      {/* Background with slight texture/pattern overlay mimicking the depth in the design */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl z-10 flex flex-col items-center">
        {/* Header Text */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Check Which Course Fits You Best.
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              Make informed decisions about your education and career.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl mb-16">
          
          {/* Step 1 */}
          <ScrollReveal animation="scale-up" delay={100}>
            <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm hover:bg-white/15 transition-colors h-full">
              <User className="w-12 h-12 text-white mb-4" strokeWidth={1.5} />
              <span className="text-white font-medium text-center">Select Your Course</span>
            </div>
          </ScrollReveal>

          {/* Step 2 */}
          <ScrollReveal animation="scale-up" delay={200}>
            <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm hover:bg-white/15 transition-colors h-full">
              <BookOpen className="w-12 h-12 text-white mb-4" strokeWidth={1.5} />
              <span className="text-white font-medium text-center">Take the Test</span>
            </div>
          </ScrollReveal>

          {/* Step 3 */}
          <ScrollReveal animation="scale-up" delay={300}>
            <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm hover:bg-white/15 transition-colors h-full">
              <Menu className="w-12 h-12 text-white mb-4" strokeWidth={1.5} />
              <span className="text-white font-medium text-center">Receive Immediate Result</span>
            </div>
          </ScrollReveal>

        </div>

        {/* Input Form Area */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="relative">
            {/* Subtle green glowing border effect wrapping the form */}
            <div className="absolute -inset-1.5 bg-white/20 rounded-lg blur-[2px] pointer-events-none"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-md border border-white/20 shadow-2xl"
            >
              {/* The decorative green dots on corners from the design */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#a3e635] rounded-full shadow-[0_0_8px_#a3e635]"></div>

              <input
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full sm:w-[300px] md:w-[350px] px-5 py-3.5 bg-white text-gray-900 placeholder-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FDB813] font-medium"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FDB813] hover:bg-[#e6a510] text-black font-bold uppercase tracking-wide text-sm rounded-sm transition-colors whitespace-nowrap"
              >
                Start Test
              </button>
            </form>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
