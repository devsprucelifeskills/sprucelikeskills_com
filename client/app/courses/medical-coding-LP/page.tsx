"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Chart, registerables } from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import {
    Stethoscope,
    Phone,
    MessageSquare,
    Award,
    Calendar,
    Users,
    Building,
    CheckCircle,
    HelpCircle,
    Clock,
    MapPin,
    ChevronDown,
    ChevronUp,
    FileCheck,
    Brain,
    TrendingUp,
    Mail,
    ShieldAlert,
    Menu,
    X,
    Sparkles,
    CreditCard,
    Video,
    Layers,
    GraduationCap,
    Briefcase,
    Check,
    Star,
    Activity,
    Shield,
    BookOpen,
    Zap,
    Target,
    Trophy,
    Globe,
    ArrowRight
} from "lucide-react";

import InteractiveLoader from "@/components/landing_pages/medical_coding/InteractiveLoader";
import SchemaMarkup from "@/components/landing_pages/medical_coding/SchemaMarkup";
import LeadForm from "@/components/landing_pages/medical_coding/LeadForm";
import SyllabusExplorer from "@/components/landing_pages/medical_coding/SyllabusExplorer";
import ThankYouScreen from "@/components/landing_pages/medical_coding/ThankYouScreen";
import AuthorityShufflingCards from "@/components/landing_pages/medical_coding/AuthorityShufflingCards";
import { LeadData } from "@/components/landing_pages/medical_coding/types";
import ProgramSelector from "@/components/landing_pages/medical_coding/ProgramSelector";
import CourseBenefits from "@/components/landing_pages/medical_coding/CourseBenifits";
import WhoCanApply from "@/components/landing_pages/medical_coding/WhoCanApply";
import PlacementSupport from "@/components/landing_pages/medical_coding/PlacementSupport";
import HiringPartners from "@/components/landing_pages/medical_coding/HiringPartners";
import BatchDetails from "@/components/landing_pages/medical_coding/BatchDetails";

import './index.css';

Chart.register(...registerables);

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.004 0C5.373 0 0 5.373 0 12c0 2.112.551 4.164 1.597 5.975L.053 24l6.19-1.62c1.737.946 3.69 1.444 5.76 1.444 6.628 0 12.001-5.373 12.001-12c0-3.201-1.245-6.209-3.506-8.473C18.236 1.248 15.228 0 12.004 0zm6.204 16.985c-.255.722-1.284 1.321-1.782 1.397-.49.074-1.121.139-1.802-.083-.435-.141-.994-.378-1.73-.69-3.13-1.325-5.181-4.52-5.337-4.733-.156-.213-1.272-1.701-1.272-3.245 0-1.545.811-2.302 1.101-2.603.29-.301.637-.378.847-.378.21 0 .42.001.603.009.19.009.444-.074.694.537.255.626.873 2.14.949 2.296.076.155.127.337.025.542-.1.205-.152.336-.304.512-.152.176-.32.392-.457.526-.153.15-.313.313-.135.622.178.309.792 1.314 1.7 2.126.963.856 1.77 1.121 2.072 1.258.303.137.48.115.659-.092.178-.207.765-.892.969-1.199.204-.306.408-.255.688-.152.28.102 1.78.841 2.086.994.306.153.51.23.585.358.077.128.077.74-.178 1.462z" />
    </svg>
);

export default function MedicalCodingLandingPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    const [leadStore, setLeadStore] = useState<LeadData | null>(null);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isFormPopupOpen, setIsFormPopupOpen] = useState<boolean>(false);

    // States for interactive high-fidelity dashboards
    const [activeCareerTrack, setActiveCareerTrack] = useState<number>(0);
    const [activeBenefitTab, setActiveBenefitTab] = useState<number>(0);
    const [selectedUgDegree, setSelectedUgDegree] = useState<number>(0);
    const [calculatorMonths, setCalculatorMonths] = useState<number>(6);
    const [selectedPlacementPartner, setSelectedPlacementPartner] = useState<string>("TCS Healthcare");
    const [careerYear, setCareerYear] = useState<number>(1);
    const [activeCompareCardIndex, setActiveCompareCardIndex] = useState<number>(0);
    const compareCardsRef = useRef<HTMLDivElement>(null);

    const scrollCompareContainer = (index: number) => {
        setActiveCompareCardIndex(index);
        if (compareCardsRef.current) {
            const container = compareCardsRef.current;
            const cardNodes = container.children;
            if (cardNodes && cardNodes.length > index) {
                const targetElement = cardNodes[index] as HTMLElement;
                container.scrollTo({
                    left: targetElement.offsetLeft - container.offsetLeft,
                    behavior: "smooth"
                });
            }
        }
    };

    function SalaryChart() {
        const ref = useRef<HTMLCanvasElement>(null);

        useEffect(() => {
            if (!ref.current) return;
            const labels = ["Fresher\n(0-1y)", "Senior\n(1-3y)", "Auditor\n(3-5y)", "Director\n(5y+)"];
            const salaries = [4.5, 8, 12.5, 18];
            const salaryLabels = ["₹4.5L", "₹8.0L", "₹12.5L", "₹18.0L"];

            const chart = new Chart(ref.current, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        data: salaries,
                        borderColor: "#2d9e5f",
                        borderWidth: 2.5,
                        pointBackgroundColor: "#1a1a1a",
                        pointBorderColor: "#1a1a1a",
                        pointRadius: 6,
                        fill: true,
                        backgroundColor: "rgba(45,158,95,0.08)",
                        tension: 0.45,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: { label: (ctx) => " " + salaryLabels[ctx.dataIndex] + " per year" },
                            backgroundColor: "#111",
                            bodyColor: "#01F182",
                            padding: 8,
                            cornerRadius: 6,
                        },
                    },
                    scales: {
                        x: {
                            grid: { color: "rgba(0,0,0,0.05)" },
                            ticks: {
                                font: { size: 10, weight: 600 },
                                color: "#888",
                                maxRotation: 0,
                                callback: (_, i) => labels[i].split("\n"),
                            },
                            border: { display: false },
                        },
                        y: { display: false, min: 2, max: 21 },
                    },
                    layout: { padding: { top: 36, right: 20, left: 4, bottom: 0 } },
                },
                plugins: [{
                    id: "floatingLabels",
                    afterDatasetsDraw(chart) {
                        const ctx = chart.ctx;
                        const meta = chart.getDatasetMeta(0);
                        meta.data.forEach((point, i) => {
                            const { x, y } = point;
                            const isLast = i === meta.data.length - 1;
                            const boxW = isLast ? 52 : 46;
                            const boxH = 22;
                            const bx = isLast ? x - boxW + 8 : x - boxW / 2;
                            const by = y - boxH - 10;
                            ctx.fillStyle = isLast ? "#facc15" : "#1a1a1a";
                            ctx.beginPath();
                            (ctx as any).roundRect(bx, by, boxW, boxH, 5);
                            ctx.fill();
                            ctx.fillStyle = isLast ? "#1a1a1a" : "#fff";
                            ctx.font = "700 11px system-ui,sans-serif";
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(salaryLabels[i], bx + boxW / 2, by + boxH / 2);
                            ctx.beginPath();
                            ctx.moveTo(x, by + boxH);
                            ctx.lineTo(x, y - 7);
                            ctx.strokeStyle = isLast ? "#facc15" : "#1a1a1a";
                            ctx.lineWidth = 1.5;
                            ctx.stroke();
                        });
                    },
                }],
            });
            return () => chart.destroy();
        }, []);

        return <canvas ref={ref} aria-label="Salary growth chart" />;
    }
    const handleCompareScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        if (scrollWidth <= 0) return;
        const ratio = scrollLeft / scrollWidth;
        const activeIdx = ratio > 0.4 ? 1 : 0;
        if (activeIdx !== activeCompareCardIndex) {
            setActiveCompareCardIndex(activeIdx);
        }
    };

    // Dynamic remaining seats counters for high conversion
    const [seats18May, setSeats18May] = useState<number>(3);
    const [seats1June, setSeats1June] = useState<number>(6);

    // Reference for form scrolling
    const router = useRouter();
    const formRef = useRef<HTMLDivElement>(null);

    // Dynamic ticking remaining seats ticker simulation
    useEffect(() => {
        if (isLoading) return;
        const interval = setInterval(() => {
            // Small simulated countdown standard to create high purchase FOMO
            if (Math.random() > 0.8) {
                setSeats18May((prev) => (prev > 1 ? prev - 1 : 1));
            }
            if (Math.random() > 0.85) {
                setSeats1June((prev) => (prev > 2 ? prev - 1 : 2));
            }
        }, 15000);
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleLeadSubmit = async (data: LeadData) => {
        setLeadStore(data);

        // Original submission logic integrated
        try {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
            const customMessage = `Qualification: ${data.qualification}\nCity: ${data.city}\nPreferred Mode: ${data.preferredMode}\nSource: Medical Coding Landing Page Hero Form`;
            const submissionPayload = {
                name: data.fullName,
                mobile: data.mobile,
                email: data.email,
                message: customMessage,
                courseName: data.courseName || 'Medical Coding Course',
                city: data.city
            };

            await fetch(`${backend_url}/api/v2/enquiry/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionPayload),
            });
        } catch (err) {
            console.error("Submission error:", err);
        }

        router.push("/thank-you");
    };

    const handleCloseThankYou = () => {
        setShowThankYou(false);
        setLeadStore(null);
    };

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                const navHeight = 64;
                const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 150); // wait for menu to close first
    };

    const scrollBackToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            const el = document.getElementById('lead-form');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const faqs = [
        {
            q: "Is this course online or offline?",
            a: "Both online and offline options are available."
        },
        {
            q: "Are recorded sessions available?",
            a: "Yes."
        },
        {
            q: "Is this suitable after B.Pharm?",
            a: "Yes, it is ideal for Life Science students & graduates."
        },
        {
            q: "Do I need prior experience?",
            a: "No prior experience required."
        },
        {
            q: "Is EMI available?",
            a: "Yes, easy payment options are available."
        },
        {
            q: "Will I receive certification?",
            a: "Yes, certification will be provided after course completion."
        },
        {
            q: "Do you provide placement support?",
            a: "Yes, placement assistance is provided."
        },
    ];

    if (isLoading) {
        return <InteractiveLoader onComplete={() => setIsLoading(false)} />;
    }

    if (showThankYou && leadStore) {
        return <ThankYouScreen leadData={leadStore} onBack={handleCloseThankYou} />;
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA] text-dark-navy flex flex-col relative overflow-x-clip w-full selection:bg-spruce-green/20 selection:text-white font-sans antialiased">
            <SchemaMarkup />

            {/* STICKY HEADER - SLEEK INTERFACE THEME */}
            <nav
                id="header-nav"
                className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] shadow-xs h-16 flex justify-center items-center w-full"
            >
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                    {/* Logo block */}
                    <img
                        src="https://www.sprucelifeskills.com/Group%2010%20(1).svg"
                        alt="Spruce Lifeskills"
                        className="h-10 w-auto object-contain cursor-pointer"
                        onClick={() => scrollToSection("hero-top")}
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            document.getElementById("logo-fallback")?.style.removeProperty("display");
                        }}
                    />

                    {/* Desktop Links - Sleek Interface */}
                    <div className="hidden lg:flex items-center gap-6 text-[12px] font-bold text-[#1E2530]/70 uppercase tracking-wider font-sans">
                        <button onClick={() => scrollToSection("overview")} className="hover:text-[#0A7A3F] transition-colors cursor-pointer hover:border-b-2 hover:border-[#0A7A3F] py-1">Overview</button>
                        <button onClick={() => scrollToSection("curriculum")} className="hover:text-[#0A7A3F] transition-colors cursor-pointer hover:border-b-2 hover:border-[#0A7A3F] py-1">Curriculum</button>
                        <button onClick={() => scrollToSection("placement")} className="hover:text-[#0A7A3F] transition-colors cursor-pointer hover:border-b-2 hover:border-[#0A7A3F] py-1">Placement</button>
                        <button onClick={() => scrollToSection("faq")} className="hover:text-[#0A7A3F] transition-colors cursor-pointer hover:border-b-2 hover:border-[#0A7A3F] py-1">FAQ</button>
                        <button
                            onClick={scrollBackToForm}
                            className="bg-[#D4921C] text-white hover:bg-[#b87d15] px-4 py-2 rounded-[4px] shadow-sm font-bold uppercase tracking-wider transition-all text-[11px] cursor-pointer"
                        >
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile menu trigger */}
                    <div className="lg:hidden flex items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.04 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="w-9 h-9 flex items-center justify-center relative focus:outline-none cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <div className="flex flex-col gap-[3.5px] items-center justify-center w-5 h-5">
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? 45 : 0,
                                        y: mobileMenuOpen ? 5 : 0,
                                        backgroundColor: mobileMenuOpen ? "#EF4444" : "#0A7A3F"
                                    }}
                                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                                    className="w-4.5 h-[1.5px] rounded-full block origin-center"
                                />
                                <motion.span
                                    animate={{
                                        opacity: mobileMenuOpen ? 0 : 1,
                                        scale: mobileMenuOpen ? 0.7 : 1,
                                    }}
                                    transition={{ duration: 0.18 }}
                                    className="w-4.5 h-[1.5px] bg-[#0A7A3F] rounded-full block"
                                />
                                <motion.span
                                    animate={{
                                        rotate: mobileMenuOpen ? -45 : 0,
                                        y: mobileMenuOpen ? -5 : 0,
                                        backgroundColor: mobileMenuOpen ? "#EF4444" : "#0A7A3F"
                                    }}
                                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                                    className="w-4.5 h-[1.5px] rounded-full block origin-center"
                                />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </nav>



            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-md flex flex-col p-4 space-y-3 font-sans lg:hidden text-left"
                    >
                        <button onClick={() => scrollToSection("overview")} className="text-xs font-bold text-gray-700 py-1.5 hover:text-spruce-green transition-colors border-b border-gray-50">Overview</button>
                        <button onClick={() => scrollToSection("curriculum")} className="text-xs font-bold text-gray-700 py-1.5 hover:text-spruce-green transition-colors border-b border-gray-50">Curriculum</button>
                        <button onClick={() => scrollToSection("placement")} className="text-xs font-bold text-gray-700 py-1.5 hover:text-spruce-green transition-colors border-b border-gray-50">Placement </button>
                        <button onClick={() => scrollToSection("faq")} className="text-xs font-bold text-gray-700 py-1.5 hover:text-spruce-green transition-colors border-b border-gray-50">FAQ</button>
                        <div className="pt-2 flex gap-2">

                            <button onClick={scrollBackToForm} className="flex-1 bg-gold text-white font-display font-bold text-xs py-2 rounded-sm">
                                Apply Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main id="overview" className="w-full flex flex-col items-stretch">

                {/* SECTION 1 — HERO SECTION */}
                <section id="hero-top" className="w-full bg-gradient-to-br from-[#022c26] via-[#033c34] to-[#011a17] pb-10 sm:pb-14 pt-6 md:pt-8 border-b border-[#06423c] relative overflow-hidden">
                    {/* Elegant wavy abstract wireframe grid across whole Hero area */}
                    <svg className="absolute bottom-0 right-0 w-full h-64 text-[#01F182]/5 pointer-events-none z-0" viewBox="0 0 400 200" fill="none">
                        <path d="M0,130 C150,50 250,180 400,100" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M0,140 C150,60 250,190 400,110" stroke="currentColor" strokeWidth="0.6" />
                        <path d="M0,150 C150,70 250,200 400,120" stroke="currentColor" strokeWidth="0.4" />
                        <path d="M0,160 C150,80 250,210 400,130" stroke="currentColor" strokeWidth="0.2" />
                        <path d="M0,170 C150,90 250,220 400,140" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2,2" />
                    </svg>

                    {/* Glowing spot lamp light effect in center-top of hero wrapper */}
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#01F182]/5 rounded-full blur-[120px] pointer-events-none z-0" />

                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
                        {/* Left panel - Premium Content */}
                        <div className="lg:col-span-7 text-white py-6 sm:py-8 md:py-10 text-left flex flex-col justify-between min-h-[500px] h-full relative z-10">
                            {/* Content Body */}
                            <div className="space-y-6 flex-1 flex flex-col justify-center">
                                {/* Premium Live Batch Indicator pill */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#01F182] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#01F182]"></span>
                                    </span>
                                    <span className="text-[9px] font-mono font-bold tracking-wider text-white/90 uppercase">
                                        Admissions Open | Limited Seats (20–25 Only)

                                    </span>
                                </div>

                                {/* Redesigned Headline with elegant spacing & white typography */}
                                <div className="space-y-4">
                                    <h1 className="font-sans text-3.5xl sm:text-4.5xl lg:text-5xl text-white font-normal leading-[1.1] tracking-tight">
                                        <strong className="font-semibold text-[#01F182]"> Medical Coding</strong> <br />
                                        Training from an AAPC Authorized Education Partner & RTMNU-Approved Institute
                                    </h1>
                                    <p className="font-mono text-[10.5px] text-[#01F182]/80 uppercase tracking-widest font-black flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-[#01F182] rounded-full inline-block" />
                                        Official 2026 AAPC Curriculum & RTMNU Credits
                                    </p>
                                </div>

                                {/* Subtitle */}
                                <p className="text-zinc-300 text-xs sm:text-[13.5px] font-mono leading-relaxed max-w-xl">
                                    Get industry-focused Medical Coding training with AAPC-aligned curriculum, CPC preparation, practical learning, recorded sessions, and placement support to help you build a successful healthcare career.
                                </p>

                                {/* Neon Green Pill Trigger Button */}
                                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                    <button
                                        onClick={scrollBackToForm}
                                        className="bg-[#01F182] hover:bg-[#00D773] text-[#022c26] font-sans font-black text-xs uppercase tracking-widest py-3.5 px-8 rounded-full shadow-[0_4px_24px_rgba(1,241,130,0.35)] hover:scale-103 active:scale-97 duration-300 transition-all cursor-pointer text-center"
                                    >
                                        Book Free Career Counseling
                                    </button>
                                    <span className="text-[15px] font-mono text-zinc-400 select-none hidden sm:inline" style={{ fontSize: "15px" }}>
                                        Nagpur's No. 1 Academy Since 2013
                                    </span>
                                </div>
                            </div>
                            {/* Upcoming Batches Glassmorphic Indicator */}
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl mt-10 p-3 max-w-md select-none">
                                <Calendar className="w-5 h-5 text-[#01F182] shrink-0" />
                                <div className="w-full">
                                    <div className="flex items-center justify-between w-full gap-2">
                                        <span className="font-mono text-white uppercase tracking-wider font-black" style={{ fontSize: "13px" }}>Upcoming Batches</span>
                                        <span className="text-xl font-bold text-white font-sans bg-emerald-500/20 text-[#01F182] border border-emerald-500/30 px-2.5 py-0.5 rounded-lg whitespace-nowrap" style={{ fontSize: "15px" }}>15 June 2026</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom minimal footer inside Card */}

                        </div>

                        {/* Right panel - Dynamic Admissions Intake Form */}
                        <div ref={formRef} id="lead-form" className="lg:col-span-5 relative flex flex-col justify-center">
                            <LeadForm
                                courseName="Medical Coding"
                                onSubmit={handleLeadSubmit}
                            />
                        </div>
                    </div>
                    {/* ── Hero Bottom Strip ── */}
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 relative z-10 border-t border-white/10 mt-4 space-y-4">

                        {/* Label */}
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-[#01F182]/60">
                            Course Highlights
                        </p>

                        {/* Course mode pills */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 10L12 5 2 10l10 5 10-5z" />
                                            <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                                        </svg>
                                    ),
                                    text: "Online & Offline Available",
                                },
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="2" y="5" width="20" height="14" rx="2" />
                                            <line x1="2" y1="10" x2="22" y2="10" />
                                        </svg>
                                    ),
                                    text: "EMI & Flexible Payment Options",
                                },
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="2" y="7" width="15" height="10" rx="2" />
                                            <polygon points="17,10 22,7 22,17 17,14" />
                                        </svg>
                                    ),
                                    text: "Recorded Sessions Available",
                                },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/12 rounded-full text-[13px] font-semibold text-white/88 whitespace-nowrap"
                                >
                                    <span className="flex items-center justify-center text-[#D4AF37]">
                                        {item.icon}
                                    </span>
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        {/* Label */}
                        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] text-[#01F182]/60 !mt-5">
                            Why Students Trust Spruce
                        </p>

                        {/* Trust stats grid */}
                        <div className="bg-[#01F182]/[0.07] border border-[#01F182]/18 rounded-xl overflow-hidden !mt-2">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                                {[
                                    { value: "Since 2013", sub: "Established legacy" },
                                    { value: "3500+ Trained", sub: "Students placed" },
                                    { value: "37 Month Record", sub: "Unbroken placements" },
                                    { value: "50+ Partners", sub: "Hiring network" },
                                    { value: "ISO 9001:2015", sub: "Certified quality" },
                                    { value: "RTMNU Approved", sub: "University credits" },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2.5 px-3.5 py-3 trust-grid-item"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-[#01F182]/20 flex items-center justify-center shrink-0">
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="#01F182" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="2,6 5,9 10,3" />
                                            </svg>
                                        </span>
                                        <div>
                                            <div className="text-[13px] font-bold text-white/85 leading-tight">{stat.value}</div>
                                            <div className="text-[10px] font-medium text-[#01F182]/65 mt-0.5 leading-none">{stat.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>


                {/* SECTION 2 */}
                {/* SECTION — WHY MEDICAL CODING? */}
                <section className="w-full bg-white border-b border-[#E2E8F0] py-4 sm:py-4">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                            {/* Left Column — Text Content */}
                            <div className="lg:col-span-7 space-y-5">

                                {/* Label */}
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-10 bg-[#0A7A3F] rounded-full shrink-0" />
                                    <div>
                                        <p className="text-[20px] font-mono font-bold uppercase tracking-[0.15em] text-zinc-400">
                                            Global Domain Opportunities
                                        </p>
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 leading-tight mt-0.5">
                                            Why Choose Medical Coding<br className="hidden sm:block" /> as a Career?
                                        </h2>
                                    </div>
                                </div>

                                {/* Italic subline */}
                                <p className="text-[11px] font-mono text-zinc-400 italic pl-3 border-l-2 border-zinc-200">
                                    * One of the fastest-growing modern healthcare administrative fields.
                                </p>

                                {/* Body paragraphs */}
                                <div className="space-y-3 text-sm text-zinc-600 leading-relaxed font-medium">
                                    <p>
                                        Medical Coding is a fast-growing healthcare career with strong demand across hospitals,
                                        insurance companies, healthcare BPOs, and global organizations.
                                    </p>
                                    <p>
                                        Medical coders convert diagnoses and treatments into standardized codes used for billing,
                                        insurance, and healthcare records.
                                    </p>
                                </div>

                                {/* Career Opportunities */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-zinc-400">
                                        Career Opportunities
                                    </p>
                                    <div className="grid grid-cols-2  last:col-span-2 gap-2">
                                        {[
                                            { icon: <Activity className="w-3.5 h-3.5" />, label: "Medical Coder" },
                                            { icon: <ShieldAlert className="w-3.5 h-3.5" />, label: "Coding Auditor" },
                                            { icon: <FileCheck className="w-3.5 h-3.5" />, label: "Medical Coding Analyst" },


                                            { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "RCM Executive" },
                                            { icon: <Brain className="w-3.5 h-3.5" />, label: "Healthcare Documentation Specialist" },
                                        ].map((item, i) => (
                                            <button
                                                key={i}
                                                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-bold transition-colors cursor-default select-none
      bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300
      ${i === 4 ? "col-span-2" : ""}
    `}
                                            >
                                                <span className="text-zinc-400">{item.icon}</span>
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="pt-2">
                                    <button
                                        onClick={scrollBackToForm}
                                        className="inline-flex items-center gap-2 bg-[#0A7A3F] hover:bg-[#085e30] text-white font-bold text-[11px] uppercase tracking-widest px-5 py-3 rounded-lg transition-all shadow-sm cursor-pointer"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Talk to Career Counselor
                                    </button>
                                </div>
                            </div>

                            {/* Right Column — Stats / Visual Panel */}
                            {/* Right Column — Salary Growth Chart Card */}
                            <div className="lg:col-span-5 space-y-4">

                                {/* Salary Growth Projection Card */}
                                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">

                                    {/* Card Header */}
                                    <div className="px-4 pt-4 pb-3 border-b border-zinc-100">
                                        <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-[#3B6D11] bg-[#EAF3DE] border border-[#C0DD97] px-2 py-0.5 rounded mb-2">
                                            Nagpur &amp; Metro Scale
                                        </span>
                                        <h3 className="text-[15px] font-black text-zinc-900 leading-tight">
                                            Salary Growth Projection Map
                                        </h3>
                                        <p className="text-[11px] text-zinc-400 mt-0.5">
                                            Expected annual compensation based on experience.
                                        </p>
                                    </div>

                                    {/* Chart Area */}
                                    <div className="px-4 pt-4 pb-1 relative h-[200px]">
                                        <SalaryChart />
                                    </div>

                                    {/* Career Tip Box */}
                                    <div className="mx-3 mb-3 bg-[#f9fef3] border border-[#C0DD97] rounded-xl p-3 flex gap-2.5 items-start">
                                        <span className="text-base shrink-0 mt-0.5">✨</span>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#3B6D11]">Career Optimization Tip:</p>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">
                                                CPC credentials boost medical diagnostic coder starting scale instantly.
                                                Nagpur is currently home to many growing global offshore RCM operations.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>



                {/* SECTION 3 — THE SPRUCE METHOD (Simplified Comparative Trust Columns) */}
                {/* SECTION — WHY SPRUCE */}
                <section id="why-spruce" className="w-full bg-[#FAF7F0] border-b border-amber-100 py-4 sm:py-16 md:py-20 text-left">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-zinc-200">
                            <div>
                                <span className="text-[10px] font-mono text-amber-700 font-bold uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded">
                                    Authorized Educational Standards
                                </span>
                                <h2 className="font-display font-black text-xl sm:text-2xl text-zinc-950 mt-3 leading-tight">
                                    Why 3500+ Students Choose Spruce Lifeskills?
                                </h2>
                            </div>
                            <div className="text-[10px] font-mono font-bold text-zinc-500 bg-white border border-zinc-200 p-2 rounded-lg shrink-0 w-fit">
                                Approved Certified Training Center
                            </div>
                        </div>

                        {/* Cards Grid */}
                        {/* Infinite Marquee Wrapper */}
                        <div className="relative overflow-hidden group">
                            {/* Gradient overlays for smooth fade */}
                            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#FAF7F0] to-transparent pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#FAF7F0] to-transparent pointer-events-none" />

                            <div className="flex animate-marquee gap-4 py-4 w-fit hover:[animation-play-state:paused]">
                                {[...Array(2)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        {[
                                            {
                                                icon: <Trophy className="w-4 h-4" />,
                                                color: "bg-amber-50 border-amber-200 text-amber-700",
                                                title: "Since 2013",
                                                desc: "13+ years of healthcare training expertise.",
                                            },
                                            {
                                                icon: <Award className="w-4 h-4" />,
                                                color: "bg-emerald-50 border-emerald-200 text-[#0A7A3F]",
                                                title: "AAPC Authorized Partner",
                                                desc: "First Authorized Education Partner in Central India.",
                                            },
                                            {
                                                icon: <GraduationCap className="w-4 h-4" />,
                                                color: "bg-blue-50 border-blue-200 text-blue-700",
                                                title: "RTMNU Approved Programs",
                                                desc: "University-approved healthcare training.",
                                            },
                                            {
                                                icon: <Stethoscope className="w-4 h-4" />,
                                                color: "bg-purple-50 border-purple-200 text-purple-700",
                                                title: "Industry Expert Trainers",
                                                desc: "Doctors & CPC Certified Trainers.",
                                            },
                                            {
                                                icon: <BookOpen className="w-4 h-4" />,
                                                color: "bg-teal-50 border-teal-200 text-teal-700",
                                                title: "Practical Learning",
                                                desc: "Hands-on training with case studies & practice questions.",
                                            },
                                            {
                                                icon: <Briefcase className="w-4 h-4" />,
                                                color: "bg-emerald-50 border-emerald-200 text-[#0A7A3F]",
                                                title: "Placement Assistance",
                                                desc: "Resume building, interview preparation & industry opportunities.",
                                            },
                                            {
                                                icon: <Users className="w-4 h-4" />,
                                                color: "bg-orange-50 border-orange-200 text-orange-700",
                                                title: "Soft Skills Training",
                                                desc: "Campus to Corporate preparation.",
                                            },
                                            {
                                                icon: <Video className="w-4 h-4" />,
                                                color: "bg-rose-50 border-rose-200 text-rose-700",
                                                title: "Recorded Sessions",
                                                desc: "Learn anytime with session recordings.",
                                            },
                                        ].map((card, idx) => (
                                            <div
                                                key={`${i}-${idx}`}
                                                className="bg-white p-5 rounded-xl border border-zinc-150 space-y-3 shadow-sm min-w-[240px] hover:border-zinc-300 transition-colors"
                                            >
                                                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${card.color}`}>
                                                    {card.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-zinc-950 leading-tight">{card.title}</h3>
                                                    <p className="text-xs text-zinc-500 leading-relaxed font-medium mt-1">{card.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={scrollBackToForm}
                                className="inline-flex items-center text-center gap-2 bg-[#0A7A3F] hover:bg-[#085e30] text-white font-bold text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-lg transition-all shadow-sm cursor-pointer"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Check Eligibility Now
                            </button>
                        </div>

                    </div>
                </section>
                {/* SECTION 4 — CURRICULUM SYLLABUS */}
                <section id="curriculum" className="w-full bg-[#F5F7FA] border-b border-[#E2E8F0] py-12 sm:py-4">
                    <div className="w-full max-w-3xl mx-auto px-4 sm:px-4">
                        <SyllabusExplorer />
                    </div>
                </section>


                {/* SECTION 5 — ELIGIBILITY INTERACTIVE CHECKER Widget */}
                <section id="eligibility-section" className="w-full bg-white border-b border-[#E2E8F0] py-0 sm:py-0">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-0 lg:px-8">
                        <ProgramSelector onCtaClick={scrollBackToForm} />
                    </div>
                </section>

                <CourseBenefits onCtaClick={scrollBackToForm} />
                <WhoCanApply onCtaClick={scrollBackToForm} />


                {/* SECTION 6 — PARTNERS & PLACEMENTS */}
                <PlacementSupport onCtaClick={scrollBackToForm} />
                <HiringPartners />


                {/* SECTION 7 — COHORT SCHEDULING & EASY INSTALLMENT ESTIMATOR */}

                <BatchDetails onCtaClick={scrollBackToForm} />

                {/* SECTION 8 — FAQ ACCORDION PANEL */}
                <section id="faq" className="w-full bg-white border-b border-[#E2E8F0] py-12 sm:py-16">
                    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-left space-y-6">
                        <div>
                            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">Clear Your Doubts</span>
                            <h2 className="font-display font-black text-xl sm:text-2xl text-zinc-950 mt-1 leading-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="space-y-2.5">
                            {faqs.map((faq, idx) => {
                                const isOpen = activeFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="border border-[#E2E8F0] rounded-lg overflow-hidden transition-all duration-200"
                                    >
                                        <button
                                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                                            className="w-full flex justify-between items-center p-4 text-left font-sans font-bold text-xs sm:text-sm text-[#1E2530] hover:bg-zinc-50 cursor-pointer bg-white"
                                        >
                                            <span className="pr-4 leading-snug " style={{ fontSize: "13px" }}>{faq.q}</span>
                                            <span className="text-[#0A7A3F] shrink-0">
                                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="bg-zinc-50/50 border-t border-[#E2E8F0] px-4 py-4"
                                                >
                                                    <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
                                                        {faq.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* FINAL COUNSELING CALLED BAR & CONTACT CARDS */}
                <section className="w-full bg-zinc-950 text-white py-12 sm:py-16 md:py-22 pb-20 text-left relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FFF_1px,transparent_1px)] bg-[size:16px_16px]" />

                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Counseling Details */}
                        <div className="lg:col-span-7 space-y-4">
                            <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider py-1 px-2.5 bg-white/5 border border-white/10 rounded">
                                Direct Guidance Hotline
                            </span>
                            <h2 className="font-display font-black text-xl sm:text-3xl text-white tracking-tight leading-tight">
                                Still Confused About Your Career ?
                            </h2>
                            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-lg font-semibold">
                                Talk to our Expert Counselor and explore the best healthcare career opportunities based on your profile.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                                <button
                                    onClick={scrollBackToForm}
                                    className="bg-gold hover:bg-[#b87d15] text-white font-sans font-bold uppercase text-[11px] text-center  tracking-widest py-3 px-3  rounded shadow-sm transition-all flex items-center justify-center gap-1.3 cursor-pointer"
                                >
                                    Book Free Career Counseling
                                </button>
                                <a
                                    href="https://wa.me/919595025757?text=Hi%2C%20I'm%20interested%20in%20visiting%20the%20Spruce%20Nagpur%20Campus%20for%20a%20Medical%20Coding%20Course%20consult!"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold uppercase text-[11px] tracking-widest py-3 px-5 rounded shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <WhatsAppIcon className="w-4 h-4" />
                                    WhatsApp Now
                                </a>
                            </div>
                        </div>

                        {/* Address Columns */}
                        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6 space-y-4 font-sans text-xs text-zinc-300">
                            <h3 className="font-sans font-black text-white uppercase text-xs tracking-wider">
                                Spruce Nagpur Campus Contact:
                            </h3>

                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div className="leading-relaxed font-semibold text-[13px]">
                                    3rd Floor, NavPrabhat Chambers, Beside ICICI Bank, Near Lokmat Square, Ramdaspeth, Nagpur – 440010
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                                <div className="font-semibold text-[13px]">+91 95950 25757</div>
                            </div> */}

                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                                <div className="font-semibold text-[13px]">sprucelifeskills@gmail.com</div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-zinc-500">
                                <span>© 2026 Spruce Lifeskills Nagpur</span>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            {/* MOBILE STICKY CTA BAR - CALL NOW / APPLY */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/80 px-2.5 py-2 grid grid-cols-12 gap-1.5 shadow-lg h-14 items-center">
                {/* Call Coded Advisor button */}
                <a
                    href="tel:+919595025757"
                    className="col-span-6 bg-[#F5F7FA] border border-gray-200 text-[#1E2530] py-2 rounded-[4px] text-center font-bold text-[10.5px] uppercase flex items-center justify-center gap-1 active:bg-gray-100"
                >
                    <Phone className="w-3.5 h-3.5 text-spruce-green" /> Call Now
                </a>

                {/* Apply Now (form scroller) */}
                <button
                    onClick={scrollBackToForm}
                    className="col-span-6 bg-gold text-white py-2 rounded-[4px] text-center font-display font-bold text-[10.5px] uppercase tracking-wide active:bg-gold/90 transition-colors shadow-xs"
                >
                    Apply Now
                </button>
            </div>

            {/* Form Popup Modal */}
            <AnimatePresence>
                {isFormPopupOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-md bg-[#F5F7FA] rounded-md shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                type="button"
                                onClick={() => setIsFormPopupOpen(false)}
                                className="absolute top-4 right-4 z-50 bg-black/40 text-white hover:bg-black/60 p-1.5 rounded-full transition-colors flex items-center justify-center"
                                aria-label="Close form"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="p-1">
                                <LeadForm
                                    courseName="Medical Coding"
                                    onSubmit={(data) => {
                                        handleLeadSubmit(data);
                                        setIsFormPopupOpen(false);
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919595025757?text=Hi%20Spruce%20Nagpur,%20I%20am%20interested%20in%20the%20Medical%20Coding%20Training%20program.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed right-4 bottom-22 lg:bottom-4 z-50 flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 group hover:shadow-[0_8px_24px_rgba(37,211,102,0.6)] cursor-pointer"
                aria-label="Chat on WhatsApp"
            >
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:animate-none pointer-events-none" />
                <WhatsAppIcon className="w-6 h-6 relative z-10" />
            </a>
        </div>
    );
}
