"use client";

import { useState, useEffect, useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   PARTNER DATA
   Using real-looking logos or clean text representations
───────────────────────────────────────────── */
const partners = [
    { name: "Ascent Business Solutions", color: "#13523f" },
    { name: "Augustus Healthcare", color: "#8B0000" },
    { name: "Novartis", color: "#E65C00" },
    { name: "Cognizant", color: "#1565C0" },
    { name: "Syntel", color: "#2E7D32" },
    { name: "GeBBS", color: "#0D47A1" },
    { name: "Wipro", color: "#6A1B9A" },
    { name: "TCS", color: "#C62828" },
];

const testimonials = [
    {
        name: "Shweta Ramteke",
        role: "Medical Coder",
        avatar: "SR",
        text: "I highly recommend Spruce Clinical Research and Medical Coding Institute. They offer quality courses at reasonable prices with no extra fees. The faculty provides personal attention and the facilities are clean. Excellent!",
    },
    {
        name: "Triveni Mutyalwar",
        role: "Clinical Research Associate",
        avatar: "TM",
        text: "I have done advance diploma from Spruce Clinical Research and Medical Coding Institute. I got to learn many more things about medical coding — it is helping me achieve my goals as a medical coder. I am truly thankful.",
    },
    {
        name: "Rahul Sharma",
        role: "Healthcare Analyst",
        avatar: "RS",
        text: "The training at Spruce is very comprehensive and the faculty is extremely knowledgeable. I got placed at a reputed company right after completing my course. Highly recommend to everyone!",
    },
    {
        name: "Priya Desai",
        role: "Medical Billing Specialist",
        avatar: "PD",
        text: "Amazing institute with dedicated faculty members. The course content is up to date with industry standards. I have seen tremendous growth in my career after joining Spruce.",
    },
    {
        name: "Ankit Joshi",
        role: "CRC Professional",
        avatar: "AJ",
        text: "Best institute in Nagpur for clinical research training. The practical exposure and placement assistance they provide is unmatched. I am proud to be a Spruce alumnus.",
    },
    {
        name: "Neha Kulkarni",
        role: "Data Manager",
        avatar: "NK",
        text: "Spruce gave me the confidence and skills I needed to enter the healthcare industry. The small batch size ensures personalised attention from every trainer.",
    },
];

export default function WhatStudentsSays() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setVisibleCount(1);
            else if (window.innerWidth < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1));
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + (testimonials.length - visibleCount + 1)) % (testimonials.length - visibleCount + 1));
    };

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0A3D24] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FDB813] rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A3D24]/5 rounded-full mb-6">
                            <span className="w-2 h-2 bg-[#FDB813] rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-[#0A3D24] uppercase tracking-[0.2em]">Student Success Stories</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
                            Trusted by <span className="text-[#0A3D24]">thousands</span> of rising professionals.
                        </h2>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={prev}
                            className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#0A3D24] hover:text-[#0A3D24] hover:bg-[#0A3D24]/5 transition-all duration-300"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={next}
                            className="w-14 h-14 rounded-2xl bg-[#0A3D24] flex items-center justify-center text-white hover:bg-black shadow-xl shadow-[#0A3D24]/20 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Testimonials Slider */}
                <div className="relative">
                    <div className="overflow-hidden py-4 -mx-4 px-4">
                        <div 
                            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                            style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
                        >
                            {testimonials.map((t, i) => (
                                <div 
                                    key={i} 
                                    className="px-4 shrink-0 transition-opacity duration-500"
                                    style={{ width: `${100 / visibleCount}%` }}
                                >
                                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-[#0A3D24]/5 transition-all duration-500 group flex flex-col h-full relative">
                                        <div className="absolute top-10 right-10 text-gray-50 group-hover:text-[#FDB813]/10 transition-colors duration-500">
                                            <Quote size={80} strokeWidth={3} />
                                        </div>
                                        
                                        <div className="flex gap-1 mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className="fill-[#FDB813] text-[#FDB813]" />
                                            ))}
                                        </div>

                                        <p className="text-xl font-medium text-gray-600 leading-relaxed mb-10 flex-1 relative z-10 italic">
                                            "{t.text}"
                                        </p>

                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-14 h-14 bg-[#0A3D24] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#0A3D24]/20 group-hover:scale-110 transition-transform duration-500">
                                                {t.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{t.name}</h4>
                                                <p className="text-sm font-bold text-[#0A3D24]/60 uppercase tracking-widest">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Partner Logos Section */}
                <div className="mt-32 border-t border-gray-100 pt-20">
                    <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Our students are placed at leading companies</p>
                    
                    <div className="relative overflow-hidden group">
                        {/* Gradient masks */}
                        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
                        
                        <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
                            {[...partners, ...partners].map((p, i) => (
                                <div key={i} className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all duration-300 grayscale hover:grayscale-0 opacity-50 hover:opacity-100">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                                    <span className="text-lg font-black text-gray-800 tracking-tighter">{p.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}