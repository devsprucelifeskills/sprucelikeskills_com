"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Award, Layers, Library, Check, ChevronRight, ChevronLeft } from "lucide-react";

const topics = [
  { icon: Library, label: "Medical Coding", sub: "RTMNU Course" },
  { icon: FileText, label: "ICD Coding", sub: "ICD-10-CM" },
  { icon: Layers, label: "CPT Coding", sub: "Procedural Codes" },
  { icon: Layers, label: "HCPCS", sub: "Level II Codes" },
  { icon: FileText, label: "Medical Billing", sub: "Claims & Reimbursements" },
  { icon: Library, label: "Revenue Cycle Management", sub: "RCM Pipeline" },
  { icon: FileText, label: "Anatomical Systems", sub: "Clinical Foundations" },
  { icon: Layers, label: "Modifiers", sub: "CPT & HCPCS Modifiers" },
  { icon: Award, label: "CPC Foundation", sub: "AAPC Prep" },
  { icon: Award, label: "Exam Prep & Mock Tests", sub: "Practice Suite" },
];

const benefits = [
  "International Study Material (AAPC 2026)",
  "1250+ Practice Questions",
  "Learning Management System Access",
  "Recorded Sessions",
  "Mock Tests",
];

const ITEMS_PER_PAGE = 5;

export default function SyllabusExplorer() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(topics.length / ITEMS_PER_PAGE);
  const paginated = topics.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  return (
    <div className="bg-[#121212] text-white border border-[#282828] rounded-xl p-5 sm:p-2 font-sans shadow-xl flex flex-col gap-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#0A7A3F]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-800/50 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <span className="text-[9px] font-mono text-[#1DB954] font-black uppercase tracking-widest bg-[#1DB954]/10 px-2.5 py-1 rounded-full border border-[#1DB954]/20">
            AAPC Curriculum 2026
          </span>
          <h3 className="font-sans font-black text-lg text-white mt-2.5 tracking-tight">
            Industry-Focused Curriculum
          </h3>
          {/* <p className="text-zinc-400 text-[10.5px] mt-0.5 font-medium">
            Full course covered in 3 months.
          </p> */}
        </div>
        <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
          {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, topics.length)} of {topics.length}
        </span>
      </div>

      {/* Topic List */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {paginated.map((topic, i) => {
              const Icon = topic.icon;
              const globalIdx = page * ITEMS_PER_PAGE + i;
              return (
                <div
                  key={globalIdx}
                  className="flex items-center gap-3 bg-[#181818] border border-[#282828] hover:border-zinc-600 rounded-lg px-3 sm:px-4 py-3 transition-colors group"
                >
                  {/* Index */}
                  <span className="text-[10px] font-mono font-black text-zinc-600 w-5 shrink-0 text-right">
                    {String(globalIdx + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-7 h-7 rounded bg-[#1DB954]/10 border border-[#1DB954]/25 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#1DB954]" />
                  </div>

                  {/* Label — NO truncate, wraps naturally */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-white leading-snug break-words">
                      {topic.label}
                    </p>
                    <p className="text-[9.5px] font-mono text-zinc-500 mt-0.5 leading-none">
                      {topic.sub}
                    </p>
                  </div>

                  {/* Check — always visible, not just on hover, on mobile */}
                  <div className="w-5 h-5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#1DB954]" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="relative z-10 flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>

        <div className="flex gap-1.5 items-center">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${page === idx ? "w-5 bg-[#1DB954]" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              aria-label={`Page ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Benefits Strip */}
      <div className="relative z-10 border-t border-zinc-800 pt-4 space-y-2.5">
        <p className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.12em]">
          What's Included
        </p>
        <div className="flex flex-col gap-2">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 py-2 border-b border-zinc-800/60 last:border-b-0"
            >
              <div className="w-5 h-5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#1DB954]" />
              </div>
              <div className="text-[13px] font-bold text-white leading-snug">
                {b}
              </div>
              {/* <ChevronRight className="w-3.5 h-3.5 text-zinc-600 ml-auto shrink-0" /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="relative z-10 flex justify-between items-center text-[9px] text-zinc-600 font-mono font-black uppercase border-t border-zinc-800/60 pt-3">
        <span>AAPC Release 2026</span>
        <span className="text-[#1DB954]/60">3-Month Complete Program</span>
      </div> */}
    </div>
  );
}