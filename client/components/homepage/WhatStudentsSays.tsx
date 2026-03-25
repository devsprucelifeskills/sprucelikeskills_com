"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   PARTNER DATA  – swap img src with real logos
───────────────────────────────────────────── */
const partners = [
    
    { name: "Augustus Healthcare", img: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1774428463/iokrinaz7smub09rszbg.png" },
    { name: "Cognizant", img: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1774428535/hcwdtut5a8v5hhliyihi.png" },
   { name: "GeBBS Healthcare", img: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1774428606/vlk5ss1xaipug5rw8oij.png" },
    { name: "Wipro", img: "https://placehold.co/160x72/ffffff/6A1B9A?text=Wipro" },
    { name: "TCS", img: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1774428799/vivysotsnnvq1zahpwvn.png" },
];

/* ─────────────────────────────────────────────
   TESTIMONIALS DATA
───────────────────────────────────────────── */
const testimonials = [
    {
        name: "Shweta Ramteke",
        role: "Medical Coder",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=SR",
        text: "I highly recommend Spruce Clinical Research and Medical Coding Institute. They offer quality courses at reasonable prices with no extra fees. The faculty provides personal attention and the facilities are clean. Excellent!",
    },
    {
        name: "Triveni Mutyalwar",
        role: "Clinical Research Associate",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=TM",
        text: "I have done advance diploma from Spruce Clinical Research and Medical Coding Institute. I got to learn many more things about medical coding — it is helping me achieve my goals as a medical coder. I am truly thankful.",
    },
    {
        name: "Rahul Sharma",
        role: "Healthcare Analyst",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=RS",
        text: "The training at Spruce is very comprehensive and the faculty is extremely knowledgeable. I got placed at a reputed company right after completing my course. Highly recommend to everyone!",
    },
    {
        name: "Priya Desai",
        role: "Medical Billing Specialist",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=PD",
        text: "Amazing institute with dedicated faculty members. The course content is up to date with industry standards. I have seen tremendous growth in my career after joining Spruce.",
    },
    {
        name: "Ankit Joshi",
        role: "CRC Professional",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=AJ",
        text: "Best institute in Nagpur for clinical research training. The practical exposure and placement assistance they provide is unmatched. I am proud to be a Spruce alumnus.",
    },
    {
        name: "Neha Kulkarni",
        role: "Data Manager",
        avatar: "https://placehold.co/56x56/d1ede3/1a6e4a?text=NK",
        text: "Spruce gave me the confidence and skills I needed to enter the healthcare industry. The small batch size ensures personalised attention from every trainer.",
    },
];

/* ─────────────────────────────────────────────
   HOOK – visible card count based on viewport
───────────────────────────────────────────── */
function useVisibleCount() {
    const [count, setCount] = useState(3);
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setCount(w < 768 ? 1 : w < 1024 ? 2 : 3);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return count;
}

/* ─────────────────────────────────────────────
   INFINITE MARQUEE
───────────────────────────────────────────── */
function PartnerMarquee() {
    const track = [...partners, ...partners]; // duplicate for seamless loop
    return (
        <>
            <style>{`
        @keyframes spruce-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .spruce-marquee {
          display: flex;
          width: max-content;
          animation: spruce-marquee 30s linear infinite;
        }
        .spruce-marquee:hover { animation-play-state: paused; }
      `}</style>

            {/* fade edges */}
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
                    style={{ background: "linear-gradient(to right, rgba(19,82,63,1), transparent)" }} />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
                    style={{ background: "linear-gradient(to left, rgba(19,82,63,1), transparent)" }} />

                <div className="spruce-marquee">
                    {track.map((p, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 mx-3 w-44 h-20 bg-white rounded-xl shadow-md
                         flex items-center justify-center px-4
                         transition-shadow hover:shadow-xl"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={p.img}
                                alt={p.name}
                                width={144}
                                height={56}
                                className="max-h-12 max-w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

/* ─────────────────────────────────────────────
   QUOTE DECORATION
───────────────────────────────────────────── */
function QuoteDecor() {
    return (
        <svg className="w-9 h-9 text-gray-200" viewBox="0 0 36 28" fill="currentColor">
            <path d="M0 28V17C0 7.1 6 1.7 18 0l1.4 2.8C13.3 4.5 10.3 7.6 10 12h7v16H0zm18 0V17c0-9.9 6-15.3 18-17l1.4 2.8C31.3 4.5 28.3 7.6 28 12h7v16H18z" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   STAR ROW
───────────────────────────────────────────── */
function Stars() {
    return (
        <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-[#13523f]" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.644 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL SLIDER
───────────────────────────────────────────── */
function TestimonialSlider() {
    const visibleCount = useVisibleCount();
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, testimonials.length - visibleCount);

    // clamp on resize
    useEffect(() => {
        setIndex((i) => Math.min(i, maxIndex));
    }, [maxIndex]);

    const prev = () => setIndex((i) => Math.max(0, i - 1));
    const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

    // swipe support
    const touchX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchX.current === null) return;
        const d = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 40) d > 0 ? next() : prev();
        touchX.current = null;
    };

    return (
        <div>
            {/* ── Header ── */}
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide leading-tight">
                        <span className="border-l-4 border-[#13523f] pl-3 text-[#13523f]">
                            WHAT STUDENT
                        </span>{" "}
                        SAY
                    </h2>
                    <p className="text-white/60 text-sm mt-2 pl-4">
                        Our Students &amp; his/her parents feedback
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        aria-label="Previous"
                        className="w-10 h-10 bg-[#13523f] hover:bg-[#1a6e4a]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       flex items-center justify-center rounded
                       text-white transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        disabled={index >= maxIndex}
                        aria-label="Next"
                        className="w-10 h-10 bg-[#13523f] hover:bg-[#1a6e4a]
                       disabled:opacity-40 disabled:cursor-not-allowed
                       flex items-center justify-center rounded
                       text-white transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"
                            stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Track ── */}
            <div
                className="overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${-(index * (100 / visibleCount))}%)` }}
                >
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 px-3 box-border"
                            style={{ width: `${100 / visibleCount}%` }}
                        >
                            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col relative overflow-hidden">
                                {/* watermark quote */}
                                <div className="absolute top-4 right-4 opacity-70 pointer-events-none">
                                    <QuoteDecor />
                                </div>

                                {/* avatar + name */}
                                <div className="flex items-center gap-3 mb-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        width={56} height={56}
                                        className="w-14 h-14 rounded-full border-2 border-teal-600 object-cover shrink-0"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm leading-snug">{t.name}</p>
                                        <p className="text-teal-700 text-xs font-medium mt-0.5">{t.role}</p>
                                    </div>
                                </div>

                                <Stars />

                                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                    {t.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Dot indicators ── */}
            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === index
                            ? "bg-[#13523f] w-6 h-2.5"
                            : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function WhatStudentsSays() {
    return (
        <div className="font-sans">

            {/* ══ SECTION 1 — OUR STUDENTS WORK AT ══ */}
            <section
                className="relative py-14 overflow-hidden mt-10 "
                style={{ background: "linear-gradient(135deg, rgb(19,82,63) 0%, rgb(28,105,75) 100%)" }}
            >
                {/* subtle dot-grid texture */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative max-w-6xl mx-auto px-6">
                    <h2 className="text-center text-2xl md:text-3xl font-black text-white
                         uppercase tracking-widest mb-10 drop-shadow">
                        Our Students Works At
                    </h2>
                    <PartnerMarquee />
                </div>
            </section>

            {/* ══ SECTION 2 — TESTIMONIALS ══ */}
            <section
                className="relative py-16 overflow-hidden mb-10"
                style={{
                    background:
                        "linear-gradient(160deg, rgb(16,75,57) 0%, rgb(24,98,70) 50%, rgb(19,82,63) 100%)",
                }}
            >
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <TestimonialSlider />
                </div>
            </section>

        </div>
    );
}