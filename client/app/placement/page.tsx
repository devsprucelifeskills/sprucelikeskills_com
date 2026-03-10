"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap, Building2, MapPin, Award, CheckCircle2 } from 'lucide-react';
import Header from '@/components/common/Header';
import { placements } from '@/lib/placements';

export default function PlacementPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-[#0A3D24] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240715632-610349c86ed0')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D24]/80 via-[#0A3D24]/90 to-[#0A3D24]"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center max-w-7xl">
          <div className="flex items-center gap-3 mb-6 text-white/80 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#FDB813] font-bold">Placements</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
            Our Placed <span className="text-[#FDB813]">Students</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed mb-8">
            Empowering careers through professional excellence. Our students are placed in top healthcare and pharmaceutical companies worldwide.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#FDB813]">5000+</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-70">Students Placed</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#FDB813]">100%</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-70">Job Guarantee</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#FDB813]">50+</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-70">Hiring Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#0A3D24]/5 text-[#0A3D24] px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                Success Blueprint
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                Your Career, Our <span className="text-[#0A3D24]">Commitment</span>.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At Spruce Life Skills, we don't just provide education; we build careers. Our specialized training programs are designed to meet industry standards, making our students the first choice for top-tier healthcare organizations.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Dedicated Placement Cell",
                  "Mock Interview Sessions",
                  "Resume Building Workshops",
                  "Direct Referral Programs",
                  "Industry Networking Events"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-800 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-[#2ecc71]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-[#FDB813]/20 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-[#0A3D24]" />
                </div>
                <h4 className="text-xl font-black mb-2">350+</h4>
                <p className="text-sm text-gray-500 font-medium lowercase">Companies visited per year</p>
              </div>
              <div className="bg-[#0A3D24] p-8 rounded-2xl shadow-xl transform translate-y-12 rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#FDB813]" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">98%</h4>
                <p className="text-sm text-white/60 font-medium">Placement success rate</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-[#2ecc71]/10 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-[#2ecc71]" />
                </div>
                <h4 className="text-xl font-black mb-2">12,000+</h4>
                <p className="text-sm text-gray-500 font-medium">Alumni worldwide</p>
              </div>
              <div className="bg-[#FDB813] p-8 rounded-2xl shadow-xl transform translate-y-12 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <h4 className="text-xl font-black text-black mb-2">Global</h4>
                <p className="text-sm text-black/60 font-medium">Presence in 5 countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placed Students Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Success <span className="text-[#0A3D24]">Stories</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#FDB813] mx-auto mb-8"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
              We take immense pride in the achievements of our students. Each success story is a testament to our quality training and their dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {placements.map((student) => (
              <div 
                key={student.id} 
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={student.image} 
                    alt={student.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${student.name}&background=0A3D24&color=fff&bold=true`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-[#0A3D24] transition-colors line-clamp-1">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-bold mb-4 line-clamp-1">
                    {student.college}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-[#FDB813]/10 transition-colors">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Placed At</p>
                    <p className="text-sm font-black text-[#0A3D24] line-clamp-1">{student.company}</p>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#2ecc71] rounded-full flex items-center justify-center border-4 border-white shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0A3D24]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            Be the Next <span className="text-[#FDB813]">Success Story</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-medium mb-12">
            Join Spruce Life Skills today and take the first step towards a rewarding career in healthcare. Our placement team is waiting to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#FDB813] hover:bg-white text-black font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest shadow-2xl">
              Apply For Admission
            </button>
            <button className="bg-transparent border-2 border-white/30 hover:border-white text-white font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest">
              Contact Placement Cell
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
