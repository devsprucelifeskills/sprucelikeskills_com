"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Download, PhoneCall, Calendar, MessageSquare, ArrowLeft } from "lucide-react";
import { LeadData } from "./types";

interface Props {
  leadData: LeadData;
  onBack: () => void;
}

export default function ThankYouScreen({ leadData, onBack }: Props) {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "generating" | "downloaded">("idle");

  const startDownload = () => {
    setDownloadStatus("generating");
    setTimeout(() => {
      setDownloadStatus("downloaded");
    }, 1800);
  };
  // Simulating custom response based on student qualification
  const getEligibilityVerdict = (qual: string) => {
    const q = qual.toLowerCase();
    if (q.includes("pharm") || q.includes("pharmacy")) {
      return {
        score: "98%",
        text: "Highly Recommended! Pharmacy background provides excellent foundational knowledge in drug classifications.",
        salaryEst: "₹3,50,000 - ₹5,5,00,000 LPA"
      };
    }
    if (q.includes("sc") || q.includes("science")) {
      return {
        score: "95%",
        text: "Perfect Fit! Your life science education aligns seamlessly with medical terminology & ICD-10 mapping requirements.",
        salaryEst: "₹3,20,000 - ₹4,80,000 LPA"
      };
    }
    if (q.includes("bams") || q.includes("bhms") || q.includes("bds")) {
      return {
        score: "100%",
        text: "Elite Match! As a healthcare clinician/expert, medical billing auditing has an extreme demand curve for your level.",
        salaryEst: "₹4,50,000 - ₹7,20,000 LPA"
      };
    }
    return {
      score: "92%",
      text: "Qualified! Ideal background to pivot into high-paying global healthcare administrative roles with Spruce.",
      salaryEst: "₹3,00,000 - ₹4,50,000 LPA"
    };
  };

  const verdict = getEligibilityVerdict(leadData.qualification);

  const steps = [
    {
      id: "01",
      title: "Immediate Counselling Session Match",
      desc: `A senior Spruce Healthcare career mentor will contact you on +91 ${leadData.mobile} within 1 hour.`
    },
    {
      id: "02",
      title: "Syllabus Catalog & Study Kit Access",
      desc: "Check your email inbox (and spam/promotions) for detailed Course Guides & AAPC sample questions."
    },
    {
      id: "03",
      title: "Batch Reservation Processed",
      desc: `A slot holds in the 20-25 seats batch starting '${leadData.preferredMode === 'Offline' ? 'In-Person Nagpur Campus' : 'Online Live Stream'}'.`
    }
  ];

  return (
    <div className="min-h-screen bg-soft-gray text-dark-navy p-4 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-sm border border-spruce-green/10">

        {/* Animated Celebration Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-spruce-green/10 flex items-center justify-center rounded-full text-spruce-green mb-4"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-dark-navy tracking-tight">
            Seat Pre-Reserved!
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Thank you, <span className="font-semibold text-spruce-green">{leadData.fullName}</span>. Your application has been logged.
          </p>
        </div>

        {/* Dynamic Interactive Student Diagnostic */}
        <div className="bg-spruce-green/[0.03] border border-spruce-green/20 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono font-medium text-spruce-green tracking-wider uppercase">
              Immediate Diagnostic Scorecard
            </span>
            <span className="px-2 py-0.5 bg-spruce-green text-white font-mono text-xs font-bold rounded-[4px]">
              Elgibility: {verdict.score}
            </span>
          </div>
          <p className="text-xs text-dark-navy font-semibold mb-1">
            Background Evaluation ({leadData.qualification}):
          </p>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            {verdict.text}
          </p>
          <div className="flex justify-between items-center border-t border-spruce-green/10 pt-2 text-[11px]">
            <span className="text-gray-500">Estimated Entry Package:</span>
            <span className="font-mono font-semibold text-deep-teal">{verdict.salaryEst}</span>
          </div>
        </div>

        {/* Dynamic Next Steps */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-3">
                <div className="w-6 h-6 shrink-0 bg-[#E8F5EE] text-spruce-green text-[11px] font-mono font-semibold rounded-[4px] flex items-center justify-center border border-spruce-green/10">
                  {step.id}
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-dark-navy leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2">
          {/* Download Brochure Link simulation */}
          <button
            onClick={startDownload}
            disabled={downloadStatus !== "idle"}
            className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-[4px] transition-all cursor-pointer ${downloadStatus === "idle"
              ? "bg-spruce-green text-white hover:bg-spruce-green/95"
              : downloadStatus === "generating"
                ? "bg-zinc-100 text-zinc-500 border border-zinc-200 cursor-not-allowed"
                : "bg-emerald-50 text-emerald-850 border border-emerald-200"
              }`}
          >
            {downloadStatus === "idle" && (
              <>
                <Download className="w-4 h-4" /> Download Complete AAPC Syllabus
              </>
            )}
            {downloadStatus === "generating" && (
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Certified PDF...
              </>
            )}
            {downloadStatus === "downloaded" && (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" /> Brochure Downloaded Successfully!
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/919595025757?text=Hi%2C%20I%20just%20submitted%20my%20eligibility%20form%20for%20the%20Medical%20Coding%20Course!"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-green-500/30 bg-green-50/50 hover:bg-green-50 text-green-700 text-xs font-medium py-2 px-3 rounded-[4px] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
            <a
              href="tel:+919595025757"
              className="flex items-center justify-center gap-2 border border-spruce-green/30 bg-spruce-green/5 hover:bg-spruce-green/10 text-spruce-green text-xs font-medium py-2 px-3 rounded-[4px] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Advisor
            </a>
          </div>

          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-1.5 text-gray-500 hover:text-dark-navy text-xs pt-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Course Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
