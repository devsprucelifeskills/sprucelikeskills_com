"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Award, Globe, ShieldCheck, Zap, Star, Trophy, Users, CheckCircle2 } from 'lucide-react';
import Header from '@/components/common/Header';
import { certifiedStudents } from '@/lib/certifications';

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[550px] w-full bg-[#0A3D24] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4')] bg-cover bg-center opacity-20 scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A3D24] via-[#0A3D24]/90 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <div className="flex items-center gap-3 mb-6 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#FDB813] font-bold">Certification</span>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Global <span className="text-[#FDB813]">Recognition</span> <br />
              Expert Status.
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-medium leading-relaxed mb-8">
              Transform your career with internationally recognized CPC® certifications. Join the elite league of healthcare professionals certified by AAPC.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#FDB813] hover:bg-white text-black font-black px-10 py-4 rounded-sm transition-all shadow-2xl uppercase tracking-widest text-sm">
                Get Certified
              </button>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-sm border border-white/20">
                <Star className="w-6 h-6 text-[#FDB813] fill-[#FDB813]" />
                <span className="text-white font-bold">AAPC Accredited Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Certification Matters */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0A3D24]/5 text-[#0A3D24] px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
              Professional Edge
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Why <span className="text-[#0A3D24]">Certifications</span> Matter?
            </h2>
            <div className="w-20 h-1.5 bg-[#FDB813] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Global Validity",
                desc: "Your CPC certification is recognized by healthcare providers and insurance giants across the globe, opening doors to international careers."
              },
              {
                icon: <ShieldCheck className="w-10 h-10" />,
                title: "Industry Gold Standard",
                desc: "The CPC® credential is the gold standard for medical coding. It validates your expertise and commitment to the highest quality standards."
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Career Acceleration",
                desc: "Certified professionals earn up to 40% more than their non-certified peers and enjoy faster promotions and job security."
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-gray-50 rounded-2xl hover:bg-[#0A3D24] transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-[#FDB813]/20 text-[#0A3D24] rounded-xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-[#FDB813] transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#2ecc71]/5 rounded-full blur-[100px]"></div>
      </section>

      {/* CPC Students Hall of Fame */}
      <section className="py-24 bg-[#0A3D24]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Our CPC <span className="text-[#FDB813]">Certified</span> <br />
                Success Stories
              </h2>
              <p className="text-white/60 text-lg font-medium">
                Meet the extraordinary achievers who have mastered the world's most rigorous medical coding examination with flying colors.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FDB813] rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="text-white font-black text-2xl">98%</div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Pass rate at Spruce</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certifiedStudents.map((student) => (
              <div 
                key={student.id} 
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Scoring circle background */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FDB813]/10 rounded-full group-hover:bg-[#FDB813]/20 transition-all"></div>
                
                <div className="relative z-10">
                   <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-[#0A3D24]/10 group-hover:text-[#0A3D24] transition-all">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-[#FDB813] font-black text-2xl group-hover:text-[#0A3D24]">{student.score}</div>
                        <div className="text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-gray-400">Score</div>
                      </div>
                   </div>

                   <h3 className="text-xl font-black text-white mb-2 group-hover:text-gray-900 transition-colors">
                    {student.name}
                   </h3>
                   <div className="flex items-center gap-2 text-white/50 group-hover:text-gray-500 transition-colors">
                      <Award className="w-4 h-4 shrink-0 text-[#FDB813]" />
                      <p className="text-sm font-bold truncate">{student.institution}</p>
                   </div>
                </div>

                {/* Decorative bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FDB813] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
             <p className="text-white/40 text-sm font-bold mb-8 italic">...and 200+ more certified professionals from the batch of 2024</p>
             <button className="bg-white hover:bg-[#FDB813] text-black font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest shadow-2xl hover:-translate-y-1">
                View Full Hall of Fame
             </button>
          </div>
        </div>
      </section>

      {/* Certifying Bodies Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                  Internationally <br />
                  <span className="text-[#0A3D24]">Affiliated Training</span>.
                 </h2>
                 <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10">
                  Our curriculum is strictly aligned with the standards set by the world's most prestigious certifying bodies. We provide comprehensive training that goes beyond textbooks, focusing on real-world medical coding scenarios.
                 </p>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-[#FDB813]/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-[#0A3D24]" />
                       </div>
                       <div>
                          <h4 className="text-xl font-extrabold text-gray-900 mb-1">AAPC Certified Instructors</h4>
                          <p className="text-gray-500 font-medium">Learn from the experts who have cleared multiple global certifications themselves.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-[#FDB813]/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-[#0A3D24]" />
                       </div>
                       <div>
                          <h4 className="text-xl font-extrabold text-gray-900 mb-1">Comprehensive Study Material</h4>
                          <p className="text-gray-500 font-medium">Access the latest coding books, LMS resources, and practice examinations.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <div className="bg-[#0A3D24] rounded-3xl p-12 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="relative z-10 text-center">
                       <img 
                        src="https://sprucelifeskills.in/images/aapc_logo.png" 
                        alt="AAPC Logo" 
                        className="h-24 mx-auto mb-10 brightness-0 invert"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                       />
                       <h3 className="text-white text-3xl font-black mb-6">Strategic Partnership</h3>
                       <p className="text-white/70 text-lg font-medium leading-relaxed mb-8">
                        Spruce Life Skills is proud to be a designated training partner, ensuring our students receive the most authentic and up-to-date certification training possible.
                       </p>
                       <div className="inline-block bg-[#FDB813] text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest">
                        Verified Training Site
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Trophy className="w-16 h-16 text-[#FDB813] mx-auto mb-8 animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            Ready to become <br />
            <span className="text-[#0A3D24]">Global Certified?</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium mb-12">
            Don't wait for opportunity. Create it. Enroll in our mission-driven certification program and secure your future in healthcare.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#0A3D24] text-white font-black px-12 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 uppercase tracking-widest text-sm">
              Enroll for Certification
            </button>
            <button className="bg-white border-2 border-gray-200 text-gray-900 font-black px-12 py-5 rounded-full transition-all uppercase tracking-widest text-sm">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
