"use client";

import React from "react";
import {
  FileText,
  MessageSquare,
  Users,
  Compass,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface PlacementSupportProps {
  onCtaClick: () => void;
}

export default function PlacementSupport({ onCtaClick }: PlacementSupportProps) {
  const supports = [
    {
      icon: <FileText className="w-4 h-4" />,
      title: "Resume Building",
      desc: "Professionally structured healthcare resumes tailored for coding & RCM roles.",
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      title: "Interview Preparation",
      desc: "Industry-oriented interview coaching with HR & technical guidance.",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Mock Interviews",
      desc: "Realistic practice sessions to improve confidence and communication.",
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      icon: <Compass className="w-4 h-4" />,
      title: "Career Guidance",
      desc: "Personalized guidance for certifications, domains, and career growth.",
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      title: "Hiring Partner Connections",
      desc: "Direct access to hiring opportunities through our recruitment network.",
      color: "bg-sky-50 border-sky-200 text-sky-700",
    },
  ];

  return (
    <section id="placement" className="w-full bg-[#FAF7F0] border-b border-amber-100 py-12 sm:py-16 text-left">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-zinc-200">
          <div className="flex items-start gap-3.5">
            <div className="w-1 h-14 bg-[#0A7A3F] rounded-full shrink-0 mt-1" />

            <div>
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                Career Support
              </span>

              <h2 className="font-sans font-black text-xl sm:text-2xl text-zinc-950 mt-1 leading-tight">
                Get Career Support Beyond Training
              </h2>
            </div>
          </div>

          <div className="text-[10px] font-mono font-bold text-zinc-500 bg-white border border-zinc-200 p-2 rounded-lg shrink-0 w-fit">
            37 Months Placement Record
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6">
          <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed font-medium">
            At Spruce Lifeskills, learning doesn’t stop at training. We help students become
            industry-ready with complete placement and career support.
          </p>
        </div>

        {/* Support Cards */}
        {/* Infinite Marquee Wrapper */}
        <div className="relative overflow-hidden group">
          {/* Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#FAF7F0] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#FAF7F0] to-transparent pointer-events-none" />

          <div className="flex animate-marquee gap-4 py-4 w-fit hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {supports.map((item, idx) => (
                  <div
                    key={`${i}-${idx}`}
                    className="bg-white min-w-[220px] rounded-xl border border-zinc-200 p-5 space-y-3 hover:border-[#0A7A3F] hover:-translate-y-1 transition-all duration-200"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${item.color}`}
                    >
                      {item.icon}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-sm font-black text-zinc-950 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}