"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-4 text-center font-sans antialiased">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center animate-bounce-slow">
                        <CheckCircle className="w-12 h-12 text-[#0A7A3F]" />
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-dark-navy mb-4 font-display">
                    Thank You for Your Enquiry!
                </h1>

                <div className="space-y-4 text-gray-600 mb-8">
                    <p className="text-lg font-semibold text-emerald-800">
                        Your details have been submitted successfully.
                    </p>
                    <p className="text-base leading-relaxed">
                        Our Academic Counselor will contact you shortly to discuss.
                    </p>
                </div>

                {/* <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#0A7A3F] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#086333] transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back to Home
                </Link> */}
            </div>

            <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
