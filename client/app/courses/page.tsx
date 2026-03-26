"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import EnquiryModal from '@/components/common/EnquiryModal';
import ScrollReveal from '@/components/common/ScrollReveal';
import { courses } from '@/lib/courses';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Clock,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function CoursesPage() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');

  const handleEnquiry = (courseName: string) => {
    setSelectedCourseName(courseName);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A3D24]/[0.02] -z-10" />
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2ecc71]/10 text-[#2ecc71] rounded-full text-xs font-black uppercase tracking-wider mb-6">
              <Award size={14} />
              Industry Leading Programs
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Master the Skills for <br />
              <span className="text-[#0A3D24]">Healthcare Excellence</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium leading-relaxed">
              Choose from our selection of professional certification programs designed to bridge the gap between education and industry.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const savings = course.discountPrice ? course.price - course.discountPrice : 0;
            const savingsPercentage = course.discountPrice ? Math.round((savings / course.price) * 100) : 0;

            return (
              <ScrollReveal key={course.slug} animation="fade-up" delay={idx * 100}>
                <div className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.12)] transition-all duration-500 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* 
                    {course.discountPrice && (
                      <div className="absolute top-6 right-6 bg-[#13523f] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Save {savingsPercentage}%
                      </div>
                    )} */}

                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                        <TrendingUp size={12} className="text-white" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Trending</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <BookOpen size={14} className="text-[#2ecc71]" />
                      Integrated Certification
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#0A3D24] transition-colors leading-tight">
                      {course.title}
                    </h3>

                    <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-8">

                        <div className="">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                          <span className="text-sm font-black text-[#0A3D24]">Variable Modules</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 font-black text-xs uppercase tracking-wider py-4 rounded-2xl transition-all"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleEnquiry(course.title)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0A3D24] hover:bg-black text-white font-black text-xs uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-[#0A3D24]/10 transition-all hover:-translate-y-1"
                        >
                          Enquire Now
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#0A3D24]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Start Your Healthcare Journey with <br />
              <span className="text-[#2ecc71]">Spruce Lifeskills Today</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              {[
                { label: "Expert Faculty", desc: "Industry veterans with decades of healthcare experience." },
                { label: "Job Guarantee", desc: "100% placement support in top-tier healthcare firms." },
                { label: "Global Reach", desc: "Recognized certifications accepted worldwide." }
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2ecc71] transition-colors">
                    <CheckCircle2 className="text-[#2ecc71] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-white font-black mb-2 uppercase tracking-wider text-sm">{item.label}</h4>
                  <p className="text-white/60 text-xs font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
        defaultCourseName={selectedCourseName}
      />
    </div>
  );
}
