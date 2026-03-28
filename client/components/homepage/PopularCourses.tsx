"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { courses } from '@/lib/courses';
import ScrollReveal from '../common/ScrollReveal';
import ApplyModal from '../courses/ApplyModal';
import { Course } from '@/lib/courses';


export default function PopularCourses() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  const handleApply = (course: Course) => {
    setSelectedCourse(course);
    setIsApplyModalOpen(true);
  };

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

    <section className="bg-[#F8FAFC] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Area */}
        <ScrollReveal animation="fade-in">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-[#13523f]"></div>
                <h2 className="text-3xl sm:text-4xl text-black">
                  <span className="font-extrabold">Popular</span>{" "}
                  <span className="font-normal text-gray-800">Courses</span>
                </h2>
              </div>
              <p className="text-gray-700 mt-3 text-sm sm:text-base">
                Spruce provide Job-Oriented & Updated course curriculum Program
              </p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={scrollLeft}
                className="bg-[#13523f] p-2 hover:bg-[#1a6e4a] transition-all rounded shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
              </button>
              <button
                onClick={scrollRight}
                className="bg-[#13523f] p-2 hover:bg-[#1a6e4a] transition-all rounded shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white" strokeWidth={3} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Area */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory pt-4 -mt-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide scrollbar for webkit */}
          <style dangerouslySetInnerHTML={{
            __html: `
            div::-webkit-scrollbar {
              display: none;
            }
          `}} />

          {courses.map((course, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100} threshold={0.05}>
              <div
                className="flex-none w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col snap-start transition-all hover:-translate-y-2 duration-500 border border-gray-100/50"
              >
                <Link href={`/courses/${course.slug}`} className="block group flex-1">
                  {/* Card Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-black px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-12 h-1 bg-[#2ecc71] mb-6 rounded-full group-hover:w-20 transition-all"></div>
                    <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight   transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-medium">
                      {course.description}
                    </p>
                  </div>
                </Link>

                {/* Card Footer */}
                <div className="flex justify-between items-center px-8 pb-8 pt-6 border-t border-gray-100">
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">AAPC Partner</div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((_, starIdx) => (
                        <Star key={starIdx} className={`w-3.5 h-3.5 ${starIdx < 4 ? 'fill-[#13523f] text-[#13523f]' : 'fill-gray-100 text-gray-100'}`} />
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="bg-[#13523f] text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-sm hover:bg-[#1a6e4a] transition-colors shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      {selectedCourse && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          courseTitle={selectedCourse.title}
          courseSlug={selectedCourse.slug}
        />
      )}
    </section>

  );
}
