"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ANIMATION_STYLES = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
`;

const slides = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773394514/lpw5r9bcukjbmuftvp2q.jpg", // Medical/computer background
    subtitle: "RISK FREE CERTIFICATION WITH SPRUCE",
    title: "Welcome To Spruce Lifeskills",
    desc1: "Only Authorized Education Partner Of",
    desc2: "American Academy Of Professional Coders (AAPC) In Central India",
    showAffiliations: false,
    showStats: false,
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop", // Healthcare/training
    subtitle: "FIRST INSTITUTE IN CENTRAL INDIA",
    title: "Welcome To Spruce Lifeskills",
    desc1: "Our Affiliations",
    desc2: "",
    showAffiliations: true,
    showStats: false,
  },
  {
    id: 3,
    bgImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop", // Lab/science
    subtitle: "Trusted by students since 13 Years",
    title: "", // No main title in this slide as per screenshot, or maybe it's smaller
    desc1: "Authorized Educational Partner Of American Academy Of Professional Coders (AAPC)",
    desc2: "Affiliated To Rashtrasant Tukadoji Maharaj Nagpur University(RTMNU)",
    showAffiliations: false,
    showStats: true,
  },
];

const affiliations = [
  { name: "Nagpur University Affiliated", logo: "N" },
  { name: "Life Long Affiliated", logo: "L" },
  { name: "ISO Certified", logo: "ISO" },
  { name: "AAPC Authorized", logo: "AAPC" },
  { name: "MSME Registered", logo: "MSME" },
];

const stats = [
  { number: "3,788+", label: "STUDENTS HAVE TRUSTED US" },
  { number: "32+", label: "RECRUITMENT PARTNERS" },
  { number: "100+", label: "YEARLY PLACEMENTS" },
  { number: "20+", label: "EXPERIENCED FACULTY" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[90vh] min-h-[700px] w-full overflow-hidden bg-gray-900 group">
      <style>{ANIMATION_STYLES}</style>
      {/* Slides Container */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-full w-full shrink-0">
            {/* Background Image & Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Deep green overlay softened further */}
              <div className="absolute inset-0 bg-[#0f4c32]/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f4c32]/60 via-transparent to-transparent" />
            </div>

            {/* Content shifted up aggressively to reduce top padding gap */}
            <div className="relative flex h-full items-center justify-center px-4 text-center mt-[-60px]">
              <div className={`max-w-5xl transition-all duration-1000 ${currentSlide === slides.indexOf(slide) ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                {/* Subtitle */}
                {slide.subtitle && (
                  <p className={`mb-1 text-[10px] font-bold uppercase tracking-widest text-[#e8f5e9] sm:text-xs md:mb-2 ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up" : "opacity-0"}`}>
                    {slide.subtitle}
                  </p>
                )}

                {/* Main Title (If present) */}
                {slide.title && (
                  <h1 className={`mb-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl leading-tight ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
                    {slide.title}
                  </h1>
                )}

                {/* Statistics Grid (Slide 3) */}
                {slide.showStats && (
                  <div className={`mb-4 mt-2 grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-4 sm:gap-6 md:gap-8 ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-2xl font-black text-white sm:text-4xl md:text-5xl drop-shadow-lg">
                          {stat.number}
                        </span>
                        <span className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white sm:text-[10px] text-center drop-shadow-md max-w-[100px]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Descriptions */}
                {(slide.desc1 || slide.desc2) && (
                  <div className={`mb-4 text-sm font-medium leading-relaxed text-[#e8f5e9] sm:text-base md:text-lg drop-shadow-md ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
                    {slide.desc1 && <p>{slide.desc1}</p>}
                    {slide.desc2 && <p className="mt-0">{slide.desc2}</p>}
                  </div>
                )}

                {/* Action Buttons */}
                <div className={`flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/about"
                    className="w-full sm:w-auto rounded bg-[#0A3D24] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#072d1a] hover:-translate-y-0.5"
                  >
                    Read More
                  </Link>
                </div>

                {/* Affiliations (Slide 2) */}
                {slide.showAffiliations && (
                  <div className={`mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${currentSlide === slides.indexOf(slide) ? "animate-fade-in-up animation-delay-800" : "opacity-0"}`}>
                    {affiliations.map((affil, idx) => (
                      <div
                        key={idx}
                        className="flex h-14 w-24 flex-col items-center justify-center bg-white p-1 shadow-xl hover:scale-105 transition-transform rounded-lg border border-white/20"
                      >
                        {/* Placeholder for actual logos, using text initials for now */}
                        <div className="mb-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#0f4c32]/30 text-[9px] font-bold text-[#0f4c32]">
                          {affil.logo}
                        </div>
                        <span className="text-center text-[6px] font-extrabold uppercase text-black leading-tight">
                          {affil.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 transition-all hover:text-white sm:left-8 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-12 w-12" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 transition-all hover:text-white sm:right-8 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="h-12 w-12" strokeWidth={1.5} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
}