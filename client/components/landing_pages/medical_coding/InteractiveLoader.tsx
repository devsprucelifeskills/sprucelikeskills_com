"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, ShieldCheck, Cpu } from "lucide-react";

export default function InteractiveLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const loadingTexts = [
    "Loading Medical Terminology Engine...",
    "Aligning with AAPC 2026 Core Standards...",
    "Optimizing ICD-10-CM & CPT Codebanks...",
    "Generating Healthcare Career Blueprint...",
    "Spruce Lifeskills: Skill • Empower • Excel!"
  ];

  useEffect(() => {
    // Step animations
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onComplete, loadingTexts.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-navy p-6 overflow-hidden select-none">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0A7A3F_1px,transparent_1px),linear-gradient(to_bottom,#0A7A3F_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative w-full max-w-md flex flex-col items-center text-center">
        {/* Animated ECG Pulse */}
        <div className="relative mb-8 h-20 w-48 flex items-center justify-center">
          <svg
            viewBox="0 0 200 100"
            className="w-full h-full text-spruce-green stroke-current fill-none stroke-[3px]"
          >
            <motion.path
              d="M0,50 L40,50 L50,30 L60,70 L70,50 L100,50 L105,10 L115,90 L125,45 L130,55 L135,50 L200,50"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
          <motion.div
            className="absolute bg-gold w-3 h-3 rounded-full shadow-[0_0_12px_rgba(212,146,28,0.8)]"
            animate={{
              x: [-90, -50, -40, -30, 0, 5, 20, 30, 90],
              y: [0, -20, 20, 0, 0, -40, 40, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Dynamic Medical Brand Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="p-3 bg-spruce-green/10 rounded-[8px] border border-spruce-green/30">
            <Stethoscope className="w-8 h-8 text-spruce-green animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="font-display font-bold text-lg text-white leading-none tracking-tight">
              SPRUCE <span className="text-spruce-green">LIFESKILLS</span>
            </h1>
            <p className="text-[10px] font-mono text-gold tracking-[0.2em]">
              SKILL • EMPOWER • EXCEL
            </p>
          </div>
        </motion.div>

        {/* Text Shifting Screen */}
        <div className="h-12 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/90 text-sm font-sans font-medium"
            >
              {loadingTexts[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Interactive Binary Code & Terminology conversion stream */}
        <div className="w-full bg-[#151B24] border border-white/5 p-3 rounded-[8px] font-mono text-left relative overflow-hidden">
          <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2 text-[10px] text-white/40 uppercase tracking-widest">
            <span>Terminal Diagnosis</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-spruce-green animate-ping" />
              Active
            </span>
          </div>
          <div className="space-y-1 text-xs text-spruce-green/80">
            <div className="flex justify-between">
              <span>&gt; Input: Acute Tonsillitis</span>
              <span className="text-gold animate-pulse">ICD-10: J03.90</span>
            </div>
            <div className="flex justify-between">
              <span>&gt; Input: Electrocardiogram</span>
              <span className="text-gold">CPT: 93000</span>
            </div>
            <div className="flex justify-between">
              <span>&gt; Authority Level</span>
              <span className="text-white/60 text-[10px]">RTMNU approved</span>
            </div>
          </div>
        </div>

        {/* Core Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-spruce-green via-deep-teal to-gold h-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.8, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
