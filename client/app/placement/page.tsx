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
      <div className="relative h-[400px] md:h-[500px] w-full bg-[#0A3D24] overflow-hidden ">
        <div className="absolute inset-0 bg-[url('data:image/jpeg;base64,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')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D24]/30 via-[#0A3D24]/60 to-[#0A3D24]"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center max-w-7xl">
          <div className="flex items-center gap-3 mb-6 text-white/80 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#13523f] font-bold">Placements</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
            Our Placed <span className="text-[#13523f]">Students</span>
          </h1>

          <p className="text-white/90 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed mb-8">
            Empowering careers through professional excellence. Our students are placed in top healthcare and pharmaceutical companies worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#13523f]">5000+</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-70">Students Placed</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#13523f]">100%</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-70">Job Guarantee</span>
            </div>
            <div className="w-px h-12 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#13523f]">50+</span>
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
                <div className="w-12 h-12 bg-[#13523f]/20 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-[#0A3D24]" />
                </div>
                <h4 className="text-xl font-black mb-2">350+</h4>
                <p className="text-sm text-gray-500 font-medium lowercase">Companies visited per year</p>
              </div>
              <div className="bg-[#0A3D24] p-8 rounded-2xl shadow-xl transform translate-y-12 rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#13523f]" />
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
              <div className="bg-[#13523f] p-8 rounded-2xl shadow-xl transform translate-y-12 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">Global</h4>
                <p className="text-sm text-white/60 font-medium">Presence in 5 countries</p>
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
            <div className="w-24 h-1.5 bg-[#13523f] mx-auto mb-8"></div>
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

                  <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-[#13523f]/10 transition-colors">
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
            Be the Next <span className="text-[#13523f]">Success Story</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-medium mb-12">
            Join Spruce Life Skills today and take the first step towards a rewarding career in healthcare. Our placement team is waiting to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest shadow-2xl">
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
