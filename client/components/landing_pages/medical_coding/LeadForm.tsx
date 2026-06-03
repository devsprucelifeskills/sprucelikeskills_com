"use client";

import React, { useState } from "react";
import { User, Phone, Mail, GraduationCap, MapPin, Monitor, CheckCircle, ArrowRight, X, AlertTriangle } from "lucide-react";
import { LeadData } from "./types";

interface Props {
  onSubmit: (data: LeadData) => void;
  onClose?: () => void;
  courseName?: string;
}
export default function LeadForm({ onSubmit, onClose, courseName }: Props) {
  const [formData, setFormData] = useState<LeadData>({
    fullName: "",
    mobile: "",
    email: "",
    qualification: "",
    city: "",
    preferredMode: "Online",
    courseName: courseName || ""
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your Full Name.");
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setErrorMsg("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!formData.qualification.trim()) {
      setErrorMsg("Please specify your Highest Qualification.");
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg("Please specify your current City.");
      return;
    }

    // Call submit handler with lead state
    onSubmit(formData);
  };

  return (
    <div id="cta-form" className="bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden flex flex-col w-full max-w-md mx-auto relative">
      {/* Close button for popup modal use */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-all z-20"
          aria-label="Close form"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Visual Indicator of exclusive batch size */}
      <div className="bg-gradient-to-br from-spruce-green to-deep-teal p-5 text-white text-center relative">
        <div className="absolute top-2 right-2 bg-white/15 px-2 py-0.5 rounded-[4px] text-[8px] font-mono uppercase tracking-widest text-gold font-bold">
          Admissions Open
        </div>
        <h3 className="text-base sm:text-lg font-bold leading-tight font-display text-white text-left">
          Check Eligibility & Get Course Details
        </h3>
        {/* <p className="text-[10.5px] opacity-85 mt-1 text-left">
          Get Course Details Instantly & Unlock Salaries Guide
        </p> */}
      </div>

      <div className="p-5 flex flex-col gap-3 text-left">
        <form onSubmit={validateAndSubmit} className="space-y-3.5 font-sans">

          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2 bg-soft-gray/40 border border-gray-200 focus:border-spruce-green rounded-[4px] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <span className="absolute left-7 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono font-medium">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="95950 25757"
                value={formData.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, mobile: val });
                }}
                className="w-full text-xs pl-15 pr-3 py-2 bg-soft-gray/40 border border-gray-200 focus:border-spruce-green rounded-[4px] outline-none transition-colors font-mono"
              />
            </div>
          </div>



          {/* Email Address */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="example@yourdomain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2 bg-soft-gray/40 border border-gray-200 focus:border-spruce-green rounded-[4px] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Qualification without suggestions */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">Highest Qualification</label>
            <div className="relative">
              <GraduationCap className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. B.Pharm, B.Sc Biology"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2 bg-soft-gray/40 border border-gray-200 focus:border-spruce-green rounded-[4px] outline-none transition-colors font-medium"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">City / Location</label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Nagpur"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2 bg-soft-gray/40 border border-gray-200 focus:border-spruce-green rounded-[4px] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Preferred Mode (Online / Offline) */}
          <div>
            <label className="block text-[10px] font-bold text-dark-navy/65 uppercase tracking-wider mb-1">Preferred Study Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, preferredMode: "Online" })}
                className={`flex items-center justify-center gap-1.5 text-[11px] py-2 px-3 border transition-all rounded-[4px] font-bold uppercase tracking-wider ${formData.preferredMode === "Online"
                  ? "bg-deep-teal text-white border-deep-teal shadow-xs"
                  : "bg-soft-gray text-gray-600 border-gray-200 hover:border-deep-teal/20"
                  }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Online
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, preferredMode: "Offline" })}
                className={`flex items-center justify-center gap-1.5 text-[11px] py-2 px-3 border transition-all rounded-[4px] font-bold uppercase tracking-wider ${formData.preferredMode === "Offline"
                  ? "bg-spruce-green text-white border-spruce-green shadow-xs"
                  : "bg-soft-gray text-gray-600 border-gray-200 hover:border-spruce-green/20"
                  }`}
              >
                <MapPin className="w-3.5 h-3.5" /> Offline
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="text-[11px] text-red-600 font-semibold bg-red-50 p-2.5 rounded-[4px] border border-red-200/50 text-left flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-650 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 bg-gold hover:bg-[#b87d15] text-white hover:shadow-lg hover:shadow-gold/25 transition-all font-display font-bold text-xs py-3 rounded-[4px] shadow-sm uppercase tracking-widest cursor-pointer"
          >
            Reserve My Seats <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Note */}
          <p className="text-gray-400 text-[10px] text-center italic mt-1.5 flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3 text-spruce-green shrink-0" />Our Career Counselor will contact you shortly.
          </p>
        </form>
      </div>
    </div>
  );
}
