"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageSquare, Phone, Home } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-[90vh] sm:min-h-[85vh] bg-white sm:bg-gradient-to-br sm:from-emerald-50/20 sm:via-white sm:to-gray-50/50 flex items-center justify-center py-6 sm:py-16 px-0 sm:px-4 relative overflow-hidden">
            <style jsx global>{`
        main {
          padding-bottom: 0px !important;
        }
      `}</style>

            {/* Background design accents (Desktop only to prevent mobile clutter) */}
            <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(#0A3D24_0.04rem,transparent_0.04rem)] [background-size:24px_24px] opacity-10 -z-10" />
            <div className="hidden sm:block absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl opacity-60 -z-10" />
            <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-50/50 rounded-full blur-3xl opacity-70 -z-10" />

            <div className="w-full max-w-lg bg-white sm:border sm:border-gray-150 rounded-none sm:rounded-[36px] px-6 py-10 sm:p-10 shadow-none sm:shadow-[0_30px_60px_-15px_rgba(10,61,36,0.06)] text-center relative flex flex-col justify-center min-h-[90vh] sm:min-h-fit">

                {/* Visual Checkmark Badge */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-8 mx-auto shadow-sm">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2ecc71]/40 animate-spin [animation-duration:15s]" />
                    <CheckCircle2 className="w-10 h-10 text-[#2ecc71]" strokeWidth={2.5} />
                </div>

                {/* Typography Hierarchy */}
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
                    Enquiry <span className="bg-gradient-to-r from-[#0A3D24] to-[#2ecc71] bg-clip-text text-transparent">Submitted!</span>
                </h1>

                <p className="text-sm sm:text-base text-gray-600 font-semibold leading-relaxed mb-8 px-2">
                    Thank you for your interest. Your details have been securely recorded. A dedicated clinical research career counselor will call you within the next <span className="text-[#0A3D24] font-black underline decoration-[#2ecc71] decoration-2">2 hours</span>.
                </p>

                {/* Instant Support Info Box */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-5 mb-8 text-left">
                    <h3 className="text-xs font-black text-[#0A3D24] uppercase tracking-wider mb-4 flex items-center gap-2 pl-1">
                        <span className="w-1.5 h-3.5 bg-[#2ecc71] rounded-full inline-block" /> Need immediate answers?
                    </h3>
                    <div className="flex flex-col gap-3">
                        <a
                            href="tel:+919595025757"
                            className="flex items-center justify-between bg-white border border-gray-100 hover:border-[#2ecc71]/40 rounded-2xl p-3.5 hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2ecc71] group-hover:bg-[#2ecc71] group-hover:text-white transition-colors shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Speak with Advisor</span>
                                    <span className="block text-sm font-black text-gray-900 group-hover:text-[#0A3D24] transition-colors">+91 95950 25757</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2ecc71] transition-colors mr-1" />
                        </a>
                        <a
                            href="https://wa.me/919595025757"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-white border border-gray-150 hover:border-[#2ecc71]/40 rounded-2xl p-3.5 hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2ecc71] group-hover:bg-[#2ecc71] group-hover:text-white transition-colors shrink-0">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp chat</span>
                                    <span className="block text-sm font-black text-gray-900 group-hover:text-[#0A3D24] transition-colors">Chat Now</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2ecc71] transition-colors mr-1" />
                        </a>
                    </div>
                </div>

                {/* Navigation CTA Buttons */}
                {/*<div className="flex flex-col sm:flex-row gap-3 justify-center px-2">
                    <Link
                        href="/"
                        className="bg-[#0A3D24] hover:bg-black text-white text-[11px] font-black uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-emerald-950/10 hover:shadow-emerald-950/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                        <Home size={13} /> Back to Home
                    </Link>
                    <Link
                        href="/courses"
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 text-[11px] font-black uppercase tracking-wider px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                        Explore Courses <ArrowRight size={13} />
                    </Link>
                </div>*/}

            </div>
        </div>
    );
}
