"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Clock, Check, Zap, MessageSquare, Award, Users, ChevronRight, ChevronLeft
} from "lucide-react";

const programs = [
  {
    badge: "Most Comprehensive",
    duration: "12 Months",
    level: "Post Graduate Diploma",
    title: "Post Graduate Diploma in Clinical Research & Medical Coding",
    idealFor: "Students looking for complete healthcare industry training with Medical Coding specialization.",
    subjects: [
      "Clinical Research", "Regulatory Affairs", "Pharmacovigilance",
      "Clinical Data Management", "Medical Writing", "Medical Coding",
      "Medical Billing", "CPC Training", "Campus to Corporate Program"
    ],
    benefits: [
      "4 International Certifications", "RTMNU Certificate",
      "LMS Access (Spruce + AAPC)", "NEP Academic Credits (3)",
      "650+ Practice Questions", "AAPC 2026 Study Material",
      "Mock Tests & Exam Preparation", "Placement Support"
    ],
  },
  {
    badge: "Most Popular",
    duration: "6 Months",
    level: "Advanced Diploma",
    title: "Advanced Diploma in Medical Coding",
    idealFor: "Students seeking structured Medical Coding training with strong placement support.",
    subjects: [
      "Medical Coding (RTMNU Course)", "Revenue Cycle Management (RCM)",
      "Medical Billing", "ICD, CPT & HCPCS", "Campus to Corporate Program"
    ],
    benefits: [
      "RTMNU Certificate", "LMS Access (Spruce + AAPC)",
      "NEP Academic Credits (3)", "1250+ Practice Questions",
      "International AAPC Study Material (2026)",
      "Mock Tests & Exam Preparation", "Placement Support"
    ],
  },
  {
    badge: "CPC Focused",
    duration: "3 Months",
    level: "Diploma — CPC",
    title: "Diploma in Certified Professional Coder (CPC) Training",
    idealFor: "Students preparing specifically for CPC certification.",
    subjects: [
      "Complete CPC Syllabus", "ICD", "CPT", "HCPCS", "CPC Exam Preparation"
    ],
    benefits: [
      "LMS Access (Spruce + AAPC)", "1250+ Practice Questions",
      "AAPC 2026 Study Material", "CPC Exam Preparation", "Placement Support"
    ],
  },
  {
    badge: "Beginner Friendly",
    duration: "3 Months",
    level: "Diploma",
    title: "Diploma in Medical Coding",
    idealFor: "Beginners looking to build foundational Medical Coding skills.",
    subjects: [
      "Medical Coding (RTMNU Course)", "RCM", "Medical Billing",
      "Anatomical Systems & Modifiers", "CPC Foundation"
    ],
    benefits: [
      "RTMNU Certificate", "LMS Access",
      "NEP Academic Credits (3)", "220+ Practice Questions",
      "AAPC Study Material", "Placement Support"
    ],
  },
  {
    badge: "University Certified",
    duration: "75 Hours",
    level: "Certificate",
    title: "Certificate in Medical Coding (University Course)",
    idealFor: "Students seeking university-certified Medical Coding training.",
    subjects: [
      "Medical Coding (RTMNU Course)", "RCM",
      "Anatomical Systems & Modifiers", "CPC Foundation"
    ],
    benefits: [
      "RTMNU Certificate", "NEP Academic Credits (3)",
      "University-Conducted Examination", "LMS Access", "Placement Support"
    ],
  },
];

export default function ProgramSelector({ onCtaClick }: { onCtaClick: () => void }) {
  const [active, setActive] = useState(1);
  const [tab, setTab] = useState<"subjects" | "benefits">("subjects");
  const scrollRef = useRef<HTMLDivElement>(null);
  const prog = programs[active];

  const scrollToIndex = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const pill = container.children[idx] as HTMLElement;
    if (pill) {
      pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const handlePillClick = (i: number) => {
    setActive(i);
    setTab("subjects");
    setTimeout(() => scrollToIndex(i), 0);
  };

  const handlePrev = () => {
    if (active > 0) {
      const next = active - 1;
      setActive(next);
      setTab("subjects");
      scrollToIndex(next);
    }
  };

  const handleNext = () => {
    if (active < programs.length - 1) {
      const next = active + 1;
      setActive(next);
      setTab("subjects");
      scrollToIndex(next);
    }
  };

  return (
    <section className="w-full bg-[#F5F7FA] border-b border-[#E2E8F0] py-12 sm:py-0 ">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-0 lg:px-8 space-y-7">

        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[16px] font-mono font-bold uppercase tracking-widest text-[#0A7A3F] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <GraduationCap className="w-5 h-5" /> Multiple Career Pathways Available
          </div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 leading-tight">
            Choose the Right Medical Coding Program
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium max-w-2xl leading-relaxed">
            From short-term certifications to advanced Medical Coding training, choose a program that matches your career goals.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#121212] rounded-xl border border-[#282828] overflow-hidden shadow-xl">

          {/* Card Top Label */}
          <div className="px-5 pt-4 pb-0">
            <p className="text-[9px] font-mono font-black uppercase tracking-[0.15em] text-[#0A7A3F]">
              Financial Security Planner
            </p>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 leading-tight">
              Select Your Program Track
            </h3>
            <p className="text-[10.5px] text-zinc-400 font-medium mt-0.5 mb-4">
              Compare programs side-by-side. Use arrows or tap a duration to explore.
            </p>
          </div>

          {/* Duration Selector with Arrows */}
          <div className="px-5 mb-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">
                Program Duration
              </div>
              <div className="text-[11px] font-mono font-bold bg-[#0A7A3F]/20 text-[#1DB954] border border-[#0A7A3F]/30 px-2.5 py-0.5 rounded-full">
                Zero % Interest EMI
              </div>
            </div>

            {/* Arrow + Scroll Row */}
            <div className="flex items-center gap-2">

              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={active === 0}
                className="flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed text-white"
                aria-label="Previous program"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Horizontally scrollable pill row */}
              <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory flex-1"
              >
                {programs.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handlePillClick(i)}
                    className="flex-shrink-0 snap-start px-4 py-2.5 rounded-lg border font-sans font-black text-[11px] transition-all cursor-pointer focus:outline-none whitespace-nowrap"
                    style={{
                      background: active === i ? "#0A7A3F" : "rgba(255,255,255,0.05)",
                      borderColor: active === i ? "#0A7A3F" : "rgba(255,255,255,0.1)",
                      color: active === i ? "#ffffff" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {p.duration}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={active === programs.length - 1}
                className="flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer focus:outline-none disabled:opacity-20 disabled:cursor-not-allowed text-white"
                aria-label="Next program"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-white/5 my-3" />

          {/* Selected Program Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="px-5 pb-5 space-y-4"
            >
              {/* Program Title + Meta */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[11px] font-black uppercase tracking-wider bg-[#0A7A3F]/20 text-[#1DB954] border border-[#0A7A3F]/30 px-2.5 py-0.5 rounded-full">
                    {prog.badge}
                  </div>
                  <div className="text-[11.5px] font-mono text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0A7A3F]" /> {prog.duration}
                  </div>
                  <div className="text-[11.5px] font-mono text-zinc-500 flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#0A7A3F]" /> {prog.level}
                  </div>
                </div>
                <h4 className="text-sm font-black text-white leading-snug">
                  {prog.title}
                </h4>
                <div className="text-[12px] text-zinc-400 leading-relaxed flex items-start gap-1.5">
                  <Users className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0A7A3F]" />
                  <div><strong className="text-zinc-300 font-bold">Ideal for:</strong> {prog.idealFor}</div>
                </div>
              </div>

              {/* Two stat boxes */}
              {/*               
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/8 rounded-lg px-3.5 py-3">
                  <p className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Subjects Covered
                  </p>
                  <p className="text-lg font-black text-white font-mono leading-none">
                    {prog.subjects.length}
                  </p>
                  <p className="text-[9px] text-zinc-500 font-medium mt-0.5">Topics</p>
                </div>
                <div className="bg-white/5 border border-white/8 rounded-lg px-3.5 py-3">
                  <p className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Key Benefits
                  </p>
                  <p className="text-lg font-black text-white font-mono leading-none">
                    {prog.benefits.length}
                  </p>
                  <p className="text-[9px] text-zinc-500 font-medium mt-0.5">Included</p>
                </div>
              </div>
 */}
              {/* Tab Switcher */}
              <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                {(["subjects", "benefits"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all cursor-pointer focus:outline-none"
                    style={{
                      background: tab === t ? "#0A7A3F" : "transparent",
                      color: tab === t ? "#ffffff" : "#71717a",
                    }}
                  >
                    {t === "subjects" ? "Subjects" : "Benefits"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab + active}
                  initial={{ opacity: 0, x: tab === "subjects" ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-1.5"
                >
                  {(tab === "subjects" ? prog.subjects : prog.benefits).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 py-2 border-b border-white/5 last:border-b-0"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#0A7A3F]/25 border border-[#0A7A3F]/40 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#1DB954]" />
                      </div>
                      <div className="text-[13px] font-semibold text-zinc-200 leading-snug flex-1">
                        {item}
                      </div>
                      {/* <ChevronRight className="w-3 h-3 text-zinc-700 shrink-0" /> */}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <button
                onClick={onCtaClick}
                className="w-full bg-[#0A7A3F] hover:bg-[#085e30] text-white font-black text-[11px] uppercase tracking-[0.15em] py-3.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <GraduationCap className="w-4 h-4" />
                Apply for This Program
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Confused Strip */}
        <div className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] border border-[#0A7A3F]/25">
          <div className="space-y-1">
            <p className="text-sm font-black text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4921C]" />
              Confused About Which Program to Choose?
            </p>
            <p className="text-[11px] text-zinc-400 font-medium">
              Our counselors will help you find the right path for your career goals.
            </p>
          </div>
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 bg-[#D4921C] hover:bg-[#b87d15] text-zinc-950 font-black text-[10.5px] uppercase tracking-widest px-5 py-3 rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            Talk to Career Counselor
          </button>
        </div>

      </div>
    </section>
  );
}