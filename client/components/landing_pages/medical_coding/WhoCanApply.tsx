"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

// ─────────────────────────────────────────────
// SECTION 6 — WHO CAN APPLY
// ─────────────────────────────────────────────
interface DegreeDetail {
  rating: number;
  role: string;
  why: string;
  track: string[];
}

const DEG_DETAILS: Record<string, DegreeDetail> = {
  "D.Pharm": {
    rating: 96,
    role: "Medical Billing Coder / Pharmacy Claims Analyst",
    why: "Diploma pharmacists bring deep medication taxonomy knowledge, making them naturals at E/M and pharmacy billing codes.",
    track: ["CPC Certified", "Pharmacy Claim Auditor", "RCM Senior Manager"],
  },

  "B.Pharm": {
    rating: 98,
    role: "Pharmaco-vigilance Coding Expert / Coder Analyst",
    why: "In-depth understanding of drug classifications, brand vs. generic formulas, and clinical pharmacology maps directly to diagnostic HCPCS billing codes.",
    track: ["CPC Certified", "Pharmacy Claim Auditor", "RCM Senior Manager"],
  },

  "M.Pharm": {
    rating: 99,
    role: "Senior Coding Auditor / Compliance Specialist",
    why: "Advanced pharmacology and clinical research background enables faster CPC® certification and high-paying audit roles.",
    track: ["CPC Certified", "Senior Auditor", "Compliance Director"],
  },

  "B.Sc": {
    rating: 94,
    role: "Medical Coding Analyst / Healthcare Documentation Specialist",
    why: "Life sciences foundational knowledge in anatomy and physiology aligns perfectly with ICD-10 diagnostic coding.",
    track: ["CPC Certified", "Coding Analyst", "RCM Executive"],
  },

  "M.Sc": {
    rating: 96,
    role: "Clinical Coding Specialist / Quality Analyst",
    why: "Research and analytical skills combined with biomedical knowledge create strong coding accuracy and audit potential.",
    track: ["CPC Certified", "Quality Specialist", "Audit Manager"],
  },

  DMLT: {
    rating: 92,
    role: "Lab Billing Coder / Revenue Cycle Specialist",
    why: "Laboratory procedure knowledge directly maps to CPT lab codes, making DMLT graduates highly sought in diagnostic billing.",
    track: ["CPC Certified", "Lab Billing Coder", "RCM Executive"],
  },

  BMLT: {
    rating: 93,
    role: "Pathology Coder / Medical Billing Associate",
    why: "Clinical lab exposure gives hands-on understanding of specimen collection and diagnostic test coding (CPT 80000–89999 range).",
    track: ["CPC Certified", "Pathology Coder", "Billing Manager"],
  },

  BHMS: {
    rating: 91,
    role: "E/M Coding Specialist / Healthcare Coder",
    why: "Holistic clinical training builds strong understanding of patient encounter documentation for E/M and procedure coding.",
    track: ["CPC Certified", "E/M Specialist", "Coding Auditor"],
  },

  BAMS: {
    rating: 93,
    role: "Multi-specialty Coder / Clinical Documentation Specialist",
    why: "Ayurvedic clinical training with anatomy, physiology and diagnostics aligns naturally with ICD-10 and CPT specialty coding.",
    track: ["CPC Certified", "Multi-specialty Coder", "Documentation Lead"],
  },

  BDS: {
    rating: 95,
    role: "Dental Coder / Oral Surgery Billing Specialist",
    why: "Dental clinical background is a perfect gateway to CDT and dental-specific CPT billing codes — a high-demand niche.",
    track: ["CPC Certified", "Dental Coder", "Billing Director"],
  },
};

const DEGREES = Object.keys(DEG_DETAILS);

interface WhoCanApplyProps {
  onCtaClick: () => void;
}

export default function WhoCanApply({ onCtaClick }: WhoCanApplyProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const detail = selected ? (DEG_DETAILS[selected] as DegreeDetail) : null;

  return (
    <section
      id="eligibility-section"
      className="w-full border-b border-[#1e3a30] py-12 sm:py-16 text-left"
      style={{ background: "#0e1f1a" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div
            className="w-1 rounded-full shrink-0 mt-1"
            style={{ background: "#01F182", height: "52px", minWidth: "4px" }}
          />

          <div>
            <span
              className="block text-[10px] font-mono font-bold uppercase tracking-widest mb-1"
              style={{ color: "rgba(1,241,130,0.65)" }}
            >
              Eligibility Criteria
            </span>

            <h2 className="font-sans font-black text-xl sm:text-2xl leading-tight text-white">
              Who Can Apply?
            </h2>
          </div>
        </div>

        {/* Stats Row */}
        {/* <div className="grid grid-cols-3 gap-3">
          {[
            { v: "3500+", l: "Students trained" },
            { v: "10+", l: "Eligible degrees" },
            { v: "98%", l: "Avg. compatibility" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="text-lg sm:text-xl font-black font-mono"
                style={{ color: "#fff" }}
              >
                {s.v}
              </div>

              <div
                className="text-[9px] font-mono font-bold uppercase tracking-widest mt-1"
                style={{ color: "rgba(1,241,130,0.6)" }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div> */}

        {/* Degree Chips */}
        <div className="space-y-3">
          {/* <p
            className="text-[9px] font-mono font-bold uppercase tracking-widest"
            style={{ color: "rgba(1,241,130,0.6)" }}
          >
            Tap your qualification to check eligibility
          </p> */}

          <div className="flex flex-wrap gap-2">
            {DEGREES.map((deg) => {
              const active = selected === deg;

              return (
                <button
                  key={deg}
                  onClick={() => setSelected(active ? null : deg)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold font-mono transition-all duration-200 cursor-pointer"
                  style={
                    active
                      ? {
                        background: "#01F182",
                        color: "#0e1f1a",
                        border: "1px solid #01F182",
                      }
                      : {
                        background: "rgba(1,241,130,0.07)",
                        color: "#b2f5d8",
                        border: "1px solid rgba(1,241,130,0.25)",
                      }
                  }
                >
                  {active && (
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}

                  {deg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Panel */}
        {detail && (
          <div
            className="rounded-xl p-5 space-y-4 transition-all duration-300"
            style={{
              background: "rgba(1,241,130,0.06)",
              border: "1px solid rgba(1,241,130,0.2)",
            }}
          >
            {/* Alignment Rating */}
            <div className="space-y-1.5">
              <p
                className="text-[9px] font-mono font-bold uppercase tracking-widest"
                style={{ color: "rgba(1,241,130,0.6)" }}
              >
                Alignment Rating
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    height: "6px",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${detail.rating}%`,
                      background: "linear-gradient(90deg,#0A7A3F,#01F182)",
                    }}
                  />
                </div>

                <span
                  className="text-sm font-black font-mono"
                  style={{ color: "#01F182" }}
                >
                  {detail.rating}% Compatibility
                </span>
              </div>
            </div>

            {/* Role */}
            <div>
              <p
                className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1"
                style={{ color: "#01F182" }}
              >
                Entry Level Starting Role
              </p>

              <p className="text-sm font-black text-white">
                {detail.role}
              </p>
            </div>

            {/* Why */}
            <div>
              <p
                className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1"
                style={{ color: "rgba(1,241,130,0.55)" }}
              >
                Why Clinicians & Grads Excel
              </p>

              <p
                className="text-xs leading-relaxed font-medium"
                style={{ color: "#c4eed9" }}
              >
                {detail.why}
              </p>
            </div>

            {/* Career Track */}
            <div>
              <p
                className="text-[9px] font-mono font-bold uppercase tracking-widest mb-2"
                style={{ color: "rgba(1,241,130,0.55)" }}
              >
                Recommended 12 Months Career Progression
              </p>

              <div className="flex flex-wrap gap-2">
                {detail.track.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold font-mono px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#e2f5ec",
                    }}
                  >
                    {t}

                    {i < detail.track.length - 1 && (
                      <span
                        className="ml-2"
                        style={{ color: "rgba(1,241,130,0.4)" }}
                      >
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Block */}
        <div
          className="rounded-xl p-5 flex gap-3.5 items-start"
          style={{
            background: "rgba(1,241,130,0.06)",
            border: "1px solid rgba(1,241,130,0.18)",
          }}
        >
          {/* <span className="text-xl shrink-0 mt-0.5">🎯</span> */}

          <p
            className="text-xs leading-relaxed font-medium"
            style={{ color: "#c4eed9" }}
          >
            Whether you're{" "}
            <strong style={{ color: "#01F182", fontWeight: 800 }}>
              pursuing your degree
            </strong>{" "}
            or already graduated, this program is designed to help you build a
            high-paying career in healthcare coding.{" "}
            <strong style={{ color: "#01F182", fontWeight: 800 }}>
              No prior experience required.
            </strong>{" "}

          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-start">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 font-sans font-black text-[11px] uppercase tracking-widest rounded-full px-7 py-3.5 transition-all duration-200 cursor-pointer"
            style={{
              background: "#01F182",
              color: "#0e1f1a",
              boxShadow: "0 4px 20px rgba(1,241,130,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00d773";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#01F182";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <CheckCircle className="w-4 h-4" />
            Check Your Eligibility
          </button>
        </div>

      </div>
    </section>
  );
}