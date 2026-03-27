"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Award, Globe, ShieldCheck, Zap, Star, Trophy, Users, CheckCircle2 } from 'lucide-react';
import Header from '@/components/common/Header';
import { certifiedStudents } from '@/lib/certifications';

export default function CertificationPage() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    // Artificial delay for "premium" feel
    setTimeout(() => {
      setVisibleCount(prev => prev + 8);
      setIsLoading(false);
    }, 800);
  };

  const showLess = () => {
    setVisibleCount(8);
    const section = document.getElementById('hall-of-fame-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[550px] w-full bg-[#0A3D24] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4')] bg-cover bg-center opacity-20 scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D24]/10 via-[#0A3D24]/20 to-[#0A3D24]"></div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <div className="flex items-center gap-3 mb-6 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#13523f] font-bold">Certification</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Global <span className="text-[#13523f]">Recognition</span> <br />
              Expert Status.
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-medium leading-relaxed mb-8">
              Transform your career with internationally recognized CPC® certifications. Join the elite league of healthcare professionals certified by AAPC.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black px-10 py-4 rounded-sm transition-all shadow-2xl uppercase tracking-widest text-sm">
                Get Certified
              </button>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-sm border border-white/20">
                <Star className="w-6 h-6 text-[#13523f] fill-[#13523f]" />
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
            <div className="w-20 h-1.5 bg-[#13523f] mx-auto"></div>
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
              <div key={i} className="group p-10 bg-gray-50 rounded-2xl hover:bg-[#13523f] transition-all duration-500 border border-gray-100">
                <div className="w-16 h-16 bg-[#13523f]/20 text-[#13523f] rounded-xl flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-white transition-colors">
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
      <section className="py-24 bg-[#1cb067]" id="hall-of-fame-grid">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Our CPC <span className="text-[#13523f]">Certified</span> <br />
                Success Stories
              </h2>
              <p className="text-white/60 text-lg font-medium">
                Meet the extraordinary achievers who have mastered the world's most rigorous medical coding examination with flying colors.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#13523f] rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-2xl">98%</div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-wider">Pass rate at Spruce</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {certifiedStudents.slice(0, visibleCount).map((student, index) => (
              <div
                key={student.id}
                className="group relative bg-gradient-to-br from-[#0A3D24] to-[#062c1a] border border-white/10 rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] hover:-translate-y-4 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${(index % 8) * 100}ms` }}
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#13523f]/0 via-[#13523f]/0 to-[#13523f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Certification Badge - Floating */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex flex-col items-end">
                    <div className="bg-[#13523f] text-white font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-tighter shadow-xl group-hover:scale-110 transition-transform duration-500">
                      {student.score} Score
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  {/* Executive Photo Frame */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#13523f]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-[3px] border-white/10 group-hover:border-[#13523f] p-1.5 transition-all duration-500 transform group-hover:rotate-3">
                      <img
                        src={student.image || `https://i.pravatar.cc/150?u=${student.id}`}
                        alt={student.name}
                        className="w-full h-full object-cover rounded-2xl grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    {/* Official Checkmark */}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <div className="w-7 h-7 bg-[#13523f] rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-gray-400 transition-colors duration-500 tracking-tight">
                      {student.name}
                    </h3>

                    <div className="inline-flex items-center gap-2 bg-white/5 group-hover:bg-gray-50 px-4 py-1.5 rounded-full transition-colors duration-500 mb-6 max-w-full">
                      <Award className="w-3.5 h-3.5 text-[#13523f] shrink-0" />
                      <p className="text-[11px] font-bold text-white/40 group-hover:text-gray-400 truncate uppercase tracking-wider">
                        {student.institution}
                      </p>
                    </div>
                  </div>

                  {/* Trust Footer */}
                  <div className="w-full pt-6 border-t border-white/5 group-hover:border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-[#13523f] fill-[#13523f]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#13523f] opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/30 group-hover:text-[#0d754f]">
                        AAPC Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle light sweep animation on hover */}
                <div className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:animate-[sweep_2s_infinite]"></div>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes sweep {
              0% { left: -100%; }
              50% { left: 150%; }
              100% { left: 150%; }
            }
            .animate-in {
              animation: animate-in 0.7s ease-out forwards;
            }
            @keyframes animate-in {
              from {
                opacity: 0;
                transform: translateY(2rem);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="mt-20 text-center">
            {visibleCount < certifiedStudents.length ? (
              <>
                <p className="text-white/40 text-sm font-bold mb-8 italic">
                  ...and {certifiedStudents.length - visibleCount}+ more certified professionals
                </p>
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="group relative bg-white hover:bg-[#13523f] text-black hover:text-white font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest shadow-2xl hover:-translate-y-1 disabled:opacity-50 min-w-[280px]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      <span>Loading Excellence...</span>
                    </div>
                  ) : (
                    "Load More"
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={showLess}
                className="group relative bg-[#0A3D24] border-2 border-[#13523f] text-[#13523f] hover:bg-[#13523f] hover:text-white font-black px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest shadow-2xl hover:-translate-y-1 min-w-[280px]"
              >
                Show Less Achievers
              </button>
            )}
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
                  <div className="w-10 h-10 bg-[#13523f]/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#13523f]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-gray-900 mb-1">AAPC Certified Instructors</h4>
                    <p className="text-gray-500 font-medium">Learn from the experts who have cleared multiple global certifications themselves.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#13523f]/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#13523f]" />
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
                  <div className="inline-block bg-[#13523f] text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest">
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
          <Trophy className="w-16 h-16 text-[#13523f] mx-auto mb-8 animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            Ready to become <br />
            <span className="text-[#0A3D24]">Global Certified?</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium mb-12">
            Don't wait for opportunity. Create it. Apply for our mission-driven certification program and secure your future in healthcare.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#0A3D24] text-white font-black px-12 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 uppercase tracking-widest text-sm">
              Apply for Certification
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
