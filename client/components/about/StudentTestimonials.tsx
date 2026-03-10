"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    body: "Great place to learn Medical Coding.",
    author: {
      name: 'Pallavi Sharma',
    },
  },
  {
    body: 'I had joined medical coding in spruce. I had a good experience in last 3 months as they gave training with hands on training on LMS and practice of lots of Practical Scenarios.',
    author: {
      name: 'Pallavi Tiwari',
    },
  },
  {
    body: 'I have done medical coding from spruce..I would like to thank to all staff who encouraged me for this course..nd their placement service is very good.',
    author: {
      name: 'Sonali Landge',
    },
  },
  {
    body: 'I got placement in the NexG Healtcare Solution by their Expert faculties and their valuable guidance.',
    author: {
      name: 'Sanket Kawadkar',
    },
  },
  {
    body: 'They offer quality courses at reasonable prices with no extra fees. The faculty provides personal attention and the facilities are clean. Excellent!',
    author: {
      name: 'Shweta Ramteke',
    },
  },
  {
    body: 'I am thankful to the team for their guidance. It\'s helping me to achieve my goals as a medical coder.',
    author: {
      name: 'Triveni Mutyalwar',
    },
  },
  {
    body: 'This institute is best to choose your career opportunities... I am very satisfied to choose this institute to plan my career plan..',
    author: {
      name: 'Mohammed Uzair',
    },
  },
  {
    body: 'I highly recommend Spruce Clinical Research and Medical Coding Institute! The quality courses and highly specialized training are top-notch.',
    author: {
      name: 'Gouri Chorey',
    },
  },
  {
    body: 'Teaching was excellent with good interaction. It is good for both online and offline classes. Thank you Spruce!!',
    author: {
      name: 'Janki Bhoyar',
    },
  },
]

export default function StudentTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-white py-24 sm:py-32 border-t border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base/7 font-semibold text-blue-600 uppercase tracking-wider">Testimonials</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl balance">
            What Our Students Say
          </p>
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="flex-shrink-0"
                style={{ width: `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 24 / itemsToShow}px)` }}
              >
                <figure className="h-full rounded-2xl bg-gray-50 hover:bg-white p-8 text-sm/6 transition-all duration-300 ring-1 ring-gray-900/5 shadow-sm hover:shadow-xl flex flex-col justify-between border border-transparent hover:border-blue-100">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[0, 1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-5 w-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-900 text-lg leading-relaxed italic">
                      <p>{`"${testimonial.body}"`}</p>
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 flex items-center gap-x-4 pt-6 border-t border-gray-200/60">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl shadow-md">
                      {testimonial.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-blue-600 text-xs font-bold uppercase tracking-wider">Verified Student</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-12 gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-blue-600" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
