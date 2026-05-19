"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Check,
    Phone,
    Mail,
    Award,
    Clock,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Loader2,
    CheckCircle2,
    MapPin,
    User,
    GraduationCap,
    Building,
    CheckSquare,
    MessageSquare,
    Sparkles,
    Calendar,
    Layers,
    Briefcase,
    Users,
    Compass
} from 'lucide-react';

export default function ClinicalResearchLandingPage() {
    const router = useRouter();
    // Navigation active section tracking
    const [activeTab, setActiveTab] = useState('overview');

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        highestQualification: '',
        city: '',
        preferredMode: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // FAQ Accordion State
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Smooth scroll helper
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // height of sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveTab(id);
        }
    };

    // Tracking active scroll section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'curriculum', 'placement', 'faq'];
            const scrollPosition = window.scrollY + 120;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveTab(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Form submit handler
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        // Format fields exactly for backend compatibility
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

        // Construct message to embed custom qualification/city/mode fields
        const customMessage = `Qualification: ${formData.highestQualification}
City: ${formData.city}
Preferred Mode: ${formData.preferredMode}
Source: Clinical Research Landing Page Hero Form`;

        const submissionPayload = {
            name: formData.fullName,
            mobile: formData.mobileNumber,
            email: formData.emailAddress,
            message: customMessage,
            courseName: 'Clinical Research Course'
        };

        try {
            const res = await fetch(`${backend_url}/api/v2/enquiry/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionPayload),
            });
            const data = await res.json();

            if (data.success) {
                setSubmitSuccess(true);
                setFormData({
                    fullName: '',
                    mobileNumber: '',
                    emailAddress: '',
                    highestQualification: '',
                    city: '',
                    preferredMode: ''
                });

                // Track Conversion Gtag if available
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag('event', 'conversion', {
                        send_to: 'AW-17963235751/z9jPCKGAqIEcEKfzxPVC',
                        transaction_id: Date.now().toString()
                    });
                }

                // Redirect to thank you route
                router.push('/thankyou');
            } else {
                setSubmitError(data.message || 'Failed to submit details. Please try again.');
            }
        } catch (err) {
            setSubmitError('Failed to connect to the server. Please check your internet connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Trust items data
    const trustPoints = [
        { text: "Since 2013" },
        { text: "3500+ Students Trained" },
        { text: "37 Months Placement Record" },
        { text: "50+ Hiring Partners" },
        { text: "ISO 9001:2015 Certified" },
        { text: "RTMNU Approved" }
    ];

    // Career Opportunities
    const careerOpportunities = [
        "Clinical Research Associate (CRA)",
        "Clinical Research Coordinator (CRC)",
        "Clinical Trial Assistant (CTA)",
        "Pharmacovigilance Associate",
        "Regulatory Affairs Executive",
        "Clinical Data Analyst",
        "Medical Writer"
    ];

    // Why Spruce Cards
    const whySpruceCards = [
        {
            title: "Since 2013",
            desc: "13+ years of healthcare training expertise.",
            icon: <Calendar className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "RTMNU Approved Programs",
            desc: "University-approved healthcare courses.",
            icon: <Award className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Industry Expert Trainers",
            desc: "Learn from Doctors & industry professionals.",
            icon: <Users className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Practical Learning Approach",
            desc: "Hands-on case studies & real-world healthcare scenarios.",
            icon: <Compass className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Updated Industry Curriculum",
            desc: "Designed according to current healthcare industry requirements.",
            icon: <Layers className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Placement Assistance",
            desc: "Resume building, interview preparation & hiring support.",
            icon: <Briefcase className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Campus to Corporate Program",
            desc: "Improve communication, confidence & professional readiness.",
            icon: <Award className="w-5 h-5 text-[#2ecc71]" />
        },
        {
            title: "Recorded Sessions",
            desc: "Flexible learning anytime.",
            icon: <Clock className="w-5 h-5 text-[#2ecc71]" />
        }
    ];

    // Curriculum topics
    const curriculumTopics = [
        "Clinical Research Fundamentals",
        "Regulatory Affairs",
        "Pharmacovigilance",
        "Clinical Data Management",
        "Medical Writing",
        "Clinical Trial Phases",
        "ICH-GCP Guidelines",
        "Documentation & Reporting",
        "Real-World Case Studies",
        "Exam Preparation & Mock Tests"
    ];

    // Curriculum highlights
    const curriculumHighlights = [
        "Updated Curriculum by Ex-TCS & Ex-Cognizant Professionals",
        "Learning Management System Access",
        "Recorded Sessions",
        "Regular Assessments & Mock Tests",
        "Practical Industry Learning"
    ];

    // Course benefits
    const courseBenefits = [
        "RTMNU Certificate",
        "International Certification Support",
        "NEP Academic Credits",
        "Placement Assistance",
        "Online + Offline Learning",
        "EMI Available",
        "Flexible Learning Schedule",
        "Industry-Oriented Curriculum"
    ];

    // FAQ Data
    const faqs = [
        {
            q: "Is this course online or offline?",
            a: "Both online and offline options are available to fit your schedule and learning preferences."
        },
        {
            q: "Are recorded sessions available?",
            a: "Yes, fully recorded sessions of every class are uploaded to our LMS for flexible, self-paced learning and revision."
        },
        {
            q: "Is this suitable after B.Pharm?",
            a: "Yes, B.Pharm, D.Pharm, M.Pharm, BDS, and other Life Science graduates are highly preferred candidates in the clinical research sector."
        },
        {
            q: "Do I need prior experience?",
            a: "No prior experience is required. The curriculum begins from clinical research fundamentals and advances into specialized industry topics."
        },
        {
            q: "Is EMI available?",
            a: "Yes, easy monthly installment (EMI) and flexible payment plans are available to make high-quality training accessible."
        },
        {
            q: "Will I receive certification?",
            a: "Yes, university-approved (RTMNU) and Spruce Lifeskills certifications are provided immediately upon successful completion of the course."
        },
        {
            q: "Do you provide placement support?",
            a: "Absolutely. We offer complete resume building, interview preparation, mock interviews, and continuous placements with our recruitment partners."
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans antialiased selection:bg-[#2ecc71]/30">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        html, body, div, h1, h2, h3, h4, h5, p, span, button, input, select {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        main {
          padding-bottom: 0px !important;
        }
      `}</style>

            {/* ─── STICKY HEADER ─── */}
            <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

                    {/* Logo & Sub-brand */}
                    <div className="flex items-center gap-3">
                        <Link href="/courses/clinical-research-LP" className="flex-shrink-0">
                            <img
                                src="/Group 10 (1).svg"
                                alt="Spruce Lifeskills Logo"
                                className="h-10 sm:h-12 w-auto object-contain"
                            />
                        </Link>
                        <div className="hidden sm:block h-8 w-px bg-gray-200" />
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[11px] font-black uppercase text-gray-800 tracking-wider">Clinical Research Academy</span>
                            <span className="text-[9px] font-bold text-emerald-600 tracking-widest uppercase">Skill • Empower • Excel</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'curriculum', label: 'Curriculum' },
                            { id: 'placement', label: 'Placement' },
                            { id: 'faq', label: 'FAQ' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`px-4 py-1.5 text-xs font-extrabold rounded-full transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-white text-[#0A3D24] shadow-sm border border-gray-200/50'
                                    : 'text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* CTA Header Button */}
                    <div>
                        <button
                            onClick={() => scrollToSection('lead-form-section')}
                            className="bg-[#0A3D24] hover:bg-black text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-5 py-3 rounded-full shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── SECTION 1: HERO (ABOVE THE FOLD) ─── */}
            <section id="overview" className="relative pt-8 pb-16 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50/30 via-white to-gray-50/50">

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-10" />

                {/* Modern decorative blurred color blobs */}
                <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-60 -z-10" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-50/80 rounded-full blur-3xl opacity-70 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left Content (Grid span 7) */}
                        <div className="lg:col-span-7 flex flex-col justify-center">

                            {/* Premium Badge Strip */}
                            <div className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-white border border-emerald-950/5 rounded-2xl sm:rounded-full w-fit mb-6 shadow-sm backdrop-blur-md max-w-full">
                                <span className="bg-[#FDB813] text-black text-[9px] font-black uppercase px-3 py-1.5 rounded-xl sm:rounded-full tracking-wider shadow-sm shrink-0">
                                    Admissions Open
                                </span>
                                <span className="text-[10px] sm:text-xs font-black text-[#0A3D24] px-2 uppercase tracking-wide shrink-0">
                                    May & June 2026 Batch
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0 px-2 sm:pr-3 py-1 sm:py-0">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-bold text-red-600 animate-pulse">
                                        20–25 Seats Only
                                    </span>
                                </div>
                            </div>

                            {/* Title / Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
                                Launch Your Career in <br />
                                <span className="bg-gradient-to-r from-[#0A3D24] via-[#13523f] to-[#2ecc71] bg-clip-text text-transparent block sm:inline">
                                    Clinical Research
                                </span> with Industry-Focused Training
                            </h1>

                            {/* Subheadline */}
                            <p className="text-base sm:text-lg text-gray-600/90 font-medium leading-relaxed mb-8 max-w-2xl">
                                Build a successful career in Clinical Research with RTMNU-approved training, practical learning, recorded sessions & placement assistance.
                            </p>

                            {/* Trust Badges - Sleek Capsules Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                                {trustPoints.map((point, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:border-[#2ecc71]/40 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <div className="w-5 h-5 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                        </div>
                                        <span className="text-[11px] sm:text-xs font-extrabold text-[#0A3D24] tracking-tight">{point.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Redesigned Admissions Card */}
                            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-[32px] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] mb-8">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2.5">
                                    <span className="w-2 h-4 bg-[#2ecc71] rounded-full inline-block" />
                                    Cohort Batch Overview
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {/* Calendar details */}
                                    <div className="flex gap-4.5 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#0A3D24] shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">Batches Start</span>
                                            <span className="block text-sm sm:text-base font-black text-[#0A3D24] mt-0.5">18 May & 1 June 2026</span>
                                        </div>
                                    </div>

                                    {/* Mode details */}
                                    <div className="flex gap-4.5 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#0A3D24] shrink-0">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">Classroom Mode</span>
                                            <span className="block text-sm sm:text-base font-black text-[#0A3D24] mt-0.5">Online & Offline</span>
                                        </div>
                                    </div>

                                    {/* EMI details */}
                                    <div className="flex gap-4.5 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#0A3D24] shrink-0">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">EMI & Flexible Plans</span>
                                            <span className="block text-sm sm:text-base font-black text-[#0A3D24] mt-0.5">Easy Instalments Available</span>
                                        </div>
                                    </div>

                                    {/* Recorded sessions details */}
                                    <div className="flex gap-4.5 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#0A3D24] shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">LMS Learning</span>
                                            <span className="block text-sm sm:text-base font-black text-[#0A3D24] mt-0.5">Recorded Class Archives</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Primary CTA Button */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button
                                    onClick={() => scrollToSection('lead-form-section')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-[#FDB813] to-[#E5A511] hover:from-[#E5A511] hover:to-[#cb920e] text-black font-black uppercase text-xs tracking-widest px-8 py-5 rounded-2xl shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-3 active:scale-98"
                                >
                                    Book Free Career Counseling
                                    <ArrowRight className="w-4 h-4 text-black" strokeWidth={3} />
                                </button>
                            </div>

                        </div>

                        {/* Right Side Lead Form (Grid span 5) - Sticky on desktop */}
                        <div id="lead-form-section" className="lg:col-span-5 lg:sticky lg:top-0 lg:-mt-24">
                            <div className="bg-white border border-gray-150 rounded-[36px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,30,10,0.08)]">

                                {/* Form Header Band */}
                                <div className="bg-gradient-to-r from-[#0A3D24] to-[#13523f] text-white p-6 sm:p-7 text-center relative">
                                    <div className="absolute top-3 right-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#2ecc71] text-[9px] font-black uppercase rounded-full tracking-wider mb-2 border border-white/5">
                                        <Sparkles className="w-3 h-3 text-[#2ecc71]" /> Admission Portal Open
                                    </span>
                                    <h2 className="text-base sm:text-lg font-black leading-tight">
                                        Check Eligibility & Get Course Details
                                    </h2>
                                    <p className="text-[10px] text-gray-300 font-semibold mt-1">
                                        Reserve your classroom seat in 30 seconds
                                    </p>
                                </div>

                                {/* Form Body */}
                                <div className="p-6 sm:p-8">
                                    <form onSubmit={handleFormSubmit} className="space-y-4">

                                        {/* Full Name */}
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" size={16} />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Full Name"
                                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm transition-all outline-none font-semibold text-gray-900 focus:ring-4 focus:ring-emerald-800/5"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" size={16} />
                                            <input
                                                type="tel"
                                                required
                                                pattern="[0-9]{10}"
                                                placeholder="10-Digit Mobile Number"
                                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm transition-all outline-none font-semibold text-gray-900 focus:ring-4 focus:ring-emerald-800/5"
                                                value={formData.mobileNumber}
                                                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                            />
                                        </div>

                                        {/* Email Address */}
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" size={16} />
                                            <input
                                                type="email"
                                                required
                                                placeholder="Email Address"
                                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm transition-all outline-none font-semibold text-gray-900 focus:ring-4 focus:ring-emerald-800/5"
                                                value={formData.emailAddress}
                                                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                                            />
                                        </div>

                                        {/* Highest Qualification */}
                                        <div className="relative group">
                                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" size={16} />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Highest Qualification (e.g. B.Pharm)"
                                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm transition-all outline-none font-semibold text-gray-900 focus:ring-4 focus:ring-emerald-800/5"
                                                value={formData.highestQualification}
                                                onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="relative group">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" size={16} />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Your City"
                                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm transition-all outline-none font-semibold text-gray-900 focus:ring-4 focus:ring-emerald-800/5"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>

                                        {/* Study Mode Radio Blocks */}
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider pl-1">
                                                Preferred Study Mode
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Online', 'Offline'].map((mode) => (
                                                    <label
                                                        key={mode}
                                                        className={`flex items-center justify-center gap-2 border-2 rounded-2xl py-3 px-4 text-xs font-black cursor-pointer transition-all ${formData.preferredMode === mode
                                                            ? 'bg-emerald-50/50 border-[#0A3D24] text-[#0A3D24] shadow-sm'
                                                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="preferredMode"
                                                            required
                                                            value={mode}
                                                            checked={formData.preferredMode === mode}
                                                            className="sr-only"
                                                            onChange={() => setFormData({ ...formData, preferredMode: mode })}
                                                        />
                                                        {formData.preferredMode === mode && (
                                                            <div className="w-3.5 h-3.5 rounded-full bg-[#0A3D24] flex items-center justify-center shrink-0">
                                                                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                                            </div>
                                                        )}
                                                        {mode} Classes
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {submitError && (
                                            <p className="text-red-500 text-xs font-bold text-center bg-red-50 border border-red-100 py-2.5 rounded-xl">
                                                {submitError}
                                            </p>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0A3D24] hover:bg-black text-white text-xs font-black uppercase tracking-widest py-4.5 rounded-2xl shadow-xl shadow-emerald-950/5 hover:shadow-emerald-950/15 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="animate-spin" size={15} /> Validating...</>
                                            ) : (
                                                <>Reserve My Seat <ArrowRight size={14} /></>
                                            )}
                                        </button>

                                        {/* Lock Secure Microcontent */}
                                        <div className="flex items-center justify-center gap-1.5 pt-1.5">
                                            <svg className="w-3 h-3 text-[#2ecc71]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 .9l7.833 4v5.333c0 4.833-3.333 9.333-7.833 10.667-4.5-1.333-7.833-5.833-7.833-10.667V4.9zM10 2.25L3.833 5.4v4.833c0 3.917 2.65 7.6 6.167 8.717 3.517-1.117 6.167-4.8 6.167-8.717V5.4L10 2.25zM9 13.5v-3h2v3H9zm0-5v-1h2v1H9z" clipRule="evenodd" /></svg>
                                            <p className="text-[10px] text-gray-400 font-semibold tracking-wide">
                                                100% Encrypted & Secure Database
                                            </p>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── SECTION 2: WHY CLINICAL RESEARCH? ─── */}
            <section className="py-16 lg:py-24 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Content (Text) */}
                        <div className="lg:col-span-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                                Booming Healthcare Sector
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mt-4 mb-6">
                                Why Choose Clinical Research <br />as a Career?
                            </h2>
                            <div className="space-y-4 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                                <p>
                                    Clinical Research is one of the fastest-growing sectors in healthcare and pharmaceuticals. It focuses on testing new medicines, medical devices, and treatments to ensure their safety and effectiveness.
                                </p>
                                <p>
                                    With growing demand in pharmaceutical companies, Clinical Research Organizations (CROs), hospitals, and healthcare companies, skilled professionals are highly sought after.
                                </p>
                            </div>

                            <button
                                onClick={() => scrollToSection('lead-form-section')}
                                className="hidden lg:inline-block mt-8 bg-[#0A3D24] hover:bg-[#13523f] text-white text-xs font-black uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all"
                            >
                                Talk to Career Counselor
                            </button>
                        </div>

                        {/* Right Content (Roles Box) */}
                        <div className="lg:col-span-6">
                            <div className="bg-[#0A3D24]/[0.02] border border-[#0A3D24]/5 rounded-3xl p-6 sm:p-8 shadow-sm">
                                <h3 className="text-lg font-black text-[#0A3D24] mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#2ecc71] rounded-full inline-block" />
                                    Career Opportunities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {careerOpportunities.map((role, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-[#2ecc71]/40 hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
                                            <span className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">{role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile button below the roles box */}
                            <div className="lg:hidden mt-8 flex justify-center">
                                <button
                                    onClick={() => scrollToSection('lead-form-section')}
                                    className="w-full text-center bg-[#0A3D24] hover:bg-[#13523f] text-white text-xs font-black uppercase tracking-wider px-6 py-4.5 rounded-xl shadow-lg transition-all"
                                >
                                    Talk to Career Counselor
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── SECTION 3: WHY SPRUCE LIFESKILLS? ─── */}
            <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] relative overflow-hidden">

                {/* Decorative background grid and blurs */}
                <div className="absolute inset-0 bg-[radial-gradient(#0A3D24_0.04rem,transparent_0.04rem)] [background-size:24px_24px] opacity-[0.15] -z-10" />
                <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl opacity-60 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#2ecc71] text-[10px] font-black uppercase rounded-full tracking-wider mb-4 border border-emerald-100">
                            <Sparkles className="w-3 h-3 text-[#2ecc71]" /> Trust & Legacy
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-2 leading-[1.15] tracking-tight">
                            Why 3500+ Students <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-[#0A3D24] via-[#13523f] to-[#2ecc71] bg-clip-text text-transparent">
                                Choose Spruce Lifeskills?
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-4 max-w-xl mx-auto leading-relaxed">
                            Since 2013, we have been empowering healthcare aspirants with high-quality, practical instruction designed to accelerate professional placement.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-16">
                        {whySpruceCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white border border-gray-150 rounded-[20px] sm:rounded-[32px] p-4 sm:p-6 lg:p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(10,61,36,0.06)] hover:border-emerald-800/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                            >
                                {/* Slide-in green accent bar on top hover */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0A3D24] to-[#2ecc71] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                                {/* Dual-layered animated icon badge */}
                                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0A3D24]/10 to-[#2ecc71]/5 group-hover:from-[#0A3D24] group-hover:to-[#2ecc71] transition-all duration-300 mb-4 sm:mb-6 shrink-0 shadow-sm shadow-[#0a3d24]/5">
                                    <div className="text-[#0A3D24] group-hover:text-white transition-colors duration-300 scale-90 sm:scale-100">
                                        {card.icon}
                                    </div>
                                </div>

                                <h3 className="text-xs sm:text-sm md:text-base font-black text-gray-900 mb-1.5 sm:mb-2 leading-snug group-hover:text-[#0A3D24] transition-colors duration-200">
                                    {card.title}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-gray-500 font-semibold leading-relaxed flex-grow">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => scrollToSection('lead-form-section')}
                            className="bg-gradient-to-r from-[#FDB813] to-[#E5A511] hover:from-[#E5A511] hover:to-[#cb920e] text-black font-black uppercase text-xs tracking-widest px-10 py-5 rounded-2xl shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/25 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3 active:scale-98"
                        >
                            Check Eligibility Now <ArrowRight className="w-4 h-4 text-black" strokeWidth={3} />
                        </button>
                    </div>

                </div>
            </section>

            {/* ─── SECTION 4: WHAT YOU WILL LEARN ─── */}
            <section id="curriculum" className="py-16 lg:py-24 bg-[#0A3D24] text-white relative overflow-hidden">

                {/* Abstract background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left Box (Curriculum List) */}
                        <div className="lg:col-span-7">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-white/10 px-3 py-1 rounded-full">
                                Syllabus
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-4 mb-8 leading-tight">
                                Industry-Relevant Curriculum
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {curriculumTopics.map((topic, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:bg-white/10 transition-colors"
                                    >
                                        <span className="w-7 h-7 bg-[#2ecc71] text-black font-black text-xs rounded-full flex items-center justify-center shrink-0">
                                            {idx + 1}
                                        </span>
                                        <span className="text-xs sm:text-sm font-bold tracking-wide">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Box (LMS & Expert Training Benefits) */}
                        <div className="lg:col-span-5">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-8">
                                <h3 className="text-base sm:text-lg font-black text-[#2ecc71] mb-6 flex items-center gap-2">
                                    <CheckSquare className="w-5 h-5 shrink-0" /> Additional Course Benefits
                                </h3>
                                <div className="space-y-4">
                                    {curriculumHighlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-[#2ecc71]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[11px] text-gray-300 font-semibold leading-relaxed">
                                        💡 <strong>Expert-Curated</strong>: Syllabus updated and certified by Clinical Trial Specialists formerly with TCS & Cognizant.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* ─── SECTION 5: COURSE BENEFITS ─── */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                            Why Spruce Program
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">
                            What Makes This Program Different?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {courseBenefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:bg-white hover:border-[#2ecc71]/30 hover:shadow-xl transition-all duration-300 flex items-center gap-3.5"
                            >
                                <div className="w-7 h-7 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-4 h-4 text-[#2ecc71]" strokeWidth={3} />
                                </div>
                                <span className="text-xs sm:text-sm font-extrabold text-gray-800 leading-tight">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => scrollToSection('lead-form-section')}
                            className="bg-[#0A3D24] hover:bg-black text-white text-xs font-black uppercase tracking-wider px-8 py-4.5 rounded-2xl shadow-lg transition-all"
                        >
                            Get Complete Course Details
                        </button>
                    </div>

                </div>
            </section>

            {/* ─── SECTION 6: WHO CAN APPLY? ─── */}
            <section className="py-16 bg-[#0A3D24]/[0.02] border-t border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                        Eligibility Criteria
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-4 mb-8">
                        Who Can Apply?
                    </h2>

                    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-lg mx-auto">

                        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center">
                            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
                                <GraduationCap className="text-[#0A3D24] w-5 h-5" />
                            </div>
                            <span className="text-base font-black text-[#0A3D24] mb-1">D.Pharm</span>
                            <span className="text-xs text-gray-400 font-semibold">Diploma in Pharmacy</span>
                        </div>

                        <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center">
                            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
                                <GraduationCap className="text-[#0A3D24] w-5 h-5" />
                            </div>
                            <span className="text-base font-black text-[#0A3D24] mb-1">B.Pharm</span>
                            <span className="text-xs text-gray-400 font-semibold">Bachelor of Pharmacy</span>
                        </div>

                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 font-bold max-w-xl mx-auto mt-6 leading-relaxed">
                        *Also highly suitable for Pharm.D, M.Pharm, B.Sc/M.Sc in Biotechnology, Microbiology, Nursing, BDS, BAMS, and other Life Sciences graduates looking to enter Clinical Trial careers.
                    </p>

                </div>
            </section>

            {/* ─── SECTION 7: PLACEMENT SUPPORT ─── */}
            <section id="placement" className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Content (Grid stats and cards) */}
                        <div className="lg:col-span-6 flex flex-col gap-6">

                            <div className="bg-[#0A3D24] text-white rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl" />
                                <span className="text-[10px] font-black uppercase text-[#2ecc71] tracking-wider block mb-2">Track Record</span>
                                <h3 className="text-3xl sm:text-4xl font-black mb-1">37 Months</h3>
                                <p className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-widest leading-none mb-4">
                                    Continuous Placement Record
                                </p>
                                <div className="h-px bg-white/10 w-full my-4" />
                                <p className="text-xs sm:text-sm font-medium text-gray-200 leading-relaxed">
                                    We have maintained 100% continuous placement cycles, securing hiring rounds for graduates month after month.
                                </p>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Network</span>
                                <h3 className="text-2xl sm:text-3xl font-black text-[#0A3D24] mb-1">50+ Partners</h3>
                                <p className="text-xs font-black uppercase text-gray-500 tracking-wider">
                                    Recruitment Partners Across India
                                </p>
                            </div>

                        </div>

                        {/* Right Content (Details & list) */}
                        <div className="lg:col-span-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                                Career Support
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-6 leading-tight">
                                Get Career Support Beyond Training
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mb-8">
                                At Spruce Lifeskills, learning doesn’t stop at training. We help students become industry-ready and land outstanding career opportunities:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Resume Building",
                                    "Interview Preparation",
                                    "Mock Interviews",
                                    "Career Guidance",
                                    "Hiring Partner Connections"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-[#2ecc71]/10 rounded-full flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                        </div>
                                        <span className="text-xs sm:text-sm font-extrabold text-gray-800 leading-tight">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── SECTION 8: HIRING PARTNERS ─── */}
            <section className="py-16 lg:py-20 bg-gray-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                        Our Graduates Work Here
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-4 mb-10 leading-tight">
                        Our Students Have Opportunities With Leading Companies
                    </h2>

                    {/* Hiring partners grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center justify-center">
                        {[
                            { name: "TCS", logo: "/images/recruiters/tcs.png" },
                            { name: "Cognizant", logo: "/images/recruiters/cognizant.png" },
                            { name: "IQVIA", logo: "/images/recruiters/iqvia.png" },
                            { name: "Access Healthcare", logo: "/images/recruiters/access.png", customClass: "scale-[1.6]" },
                            { name: "Gebbs", logo: "/images/recruiters/gebbs.png" },
                            { name: "Avontix", logo: "/images/recruiters/avontix.png", customClass: "scale-[1.6]" },
                            { name: "Meditrina", logo: "/images/recruiters/meditrina.png", customClass: "scale-[1.6]" }
                        ].map((company, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-150 rounded-2xl p-6 h-28 flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#2ecc71]/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} Logo`}
                                    title={company.name}
                                    className={`max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${company.customClass || ""}`}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ─── SECTION 9: BATCH DETAILS (HIGH CONVERSION) ─── */}
            <section className="py-16 lg:py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-gradient-to-br from-[#0A3D24] to-[#13523f] text-white rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">

                        {/* absolute badge on desktop, inline/centered badge on mobile */}
                        <div className="sm:absolute sm:top-10 sm:right-10 bg-[#FDB813] text-black text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-md inline-block mb-4 sm:mb-0">
                            Selling Out Fast
                        </div>

                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] block mb-3">
                            Seat Reservation
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-4">
                            Admissions Open – Reserve Your Seat
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-gray-200 max-w-xl mx-auto mb-8 leading-relaxed">
                            Limited seats available. Secure your admission before seats fill up to get recorded session archives and LMS access privileges.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <span className="block text-[9px] font-bold text-[#2ecc71] uppercase tracking-wider mb-1">Batch 1</span>
                                <span className="block text-sm font-black">18 May 2026</span>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <span className="block text-[9px] font-bold text-[#2ecc71] uppercase tracking-wider mb-1">Batch 2</span>
                                <span className="block text-sm font-black">1 June 2026</span>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <span className="block text-[9px] font-bold text-[#2ecc71] uppercase tracking-wider mb-1">Batch Size</span>
                                <span className="block text-sm font-black text-[#FDB813]">20–25 Students Only</span>
                            </div>

                        </div>

                        <button
                            onClick={() => scrollToSection('lead-form-section')}
                            className="bg-[#FDB813] hover:bg-[#E5A511] text-black font-black uppercase text-xs tracking-wider px-8 py-4.5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Reserve My Seat
                        </button>

                    </div>
                </div>
            </section>

            {/* ─── SECTION 10: FAQ ─── */}
            <section id="faq" className="py-16 lg:py-24 bg-gray-50 border-t border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">

                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                            Get Answers
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-4 leading-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-gray-150 rounded-2xl overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between px-5 sm:px-6 py-4.5 text-left transition-colors"
                                    >
                                        <span className="text-xs sm:text-sm font-black text-gray-800 tracking-wide pr-4">
                                            {faq.q}
                                        </span>
                                        <span className="text-[#0A3D24] shrink-0">
                                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-500 font-medium leading-relaxed border-t border-gray-50">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* ─── FINAL CTA SECTION & FOOTER ─── */}
            <section className="py-16 lg:py-20 bg-[#0A3D24] text-white relative overflow-hidden">

                {/* Decorative corner ring */}
                <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left box */}
                        <div className="lg:col-span-7">
                            <span className="text-[10px] font-black uppercase text-[#2ecc71] tracking-wider block mb-2">
                                Still Confused About Your Career?
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
                                Talk to Our Experts Today
                            </h2>
                            <p className="text-xs sm:text-sm font-medium text-gray-300 max-w-xl mb-8 leading-relaxed">
                                Talk to our expert counselor and explore the best healthcare career opportunities based on your profile. Get clarity on salary, certificates, and eligibility.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => scrollToSection('lead-form-section')}
                                    className="bg-[#FDB813] hover:bg-[#E5A511] text-black font-black uppercase text-[10px] tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all"
                                >
                                    Book Free Career Counseling
                                </button>
                                <a
                                    href="https://wa.me/919595025757"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-black uppercase text-[10px] tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
                                >
                                    <MessageSquare size={14} /> WhatsApp Now
                                </a>
                            </div>
                        </div>

                        {/* Right box (Contact Details) */}
                        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8">
                            <h3 className="text-base font-black text-[#2ecc71] mb-6">Contact Information</h3>

                            <div className="space-y-5">

                                <a href="tel:+919595025757" className="flex items-start gap-3.5 group">
                                    <Phone className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone Call</span>
                                        <span className="block text-sm font-bold text-white group-hover:text-[#2ecc71] transition-colors">+91 95950 25757</span>
                                    </div>
                                </a>

                                <a href="mailto:sprucelifeskills@gmail.com" className="flex items-start gap-3.5 group">
                                    <Mail className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</span>
                                        <span className="block text-sm font-bold text-white group-hover:text-[#2ecc71] transition-colors truncate">sprucelifeskills@gmail.com</span>
                                    </div>
                                </a>

                                <div className="flex items-start gap-3.5">
                                    <MapPin className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nagpur Campus Address</span>
                                        <span className="block text-xs sm:text-sm font-bold text-white leading-relaxed">
                                            3rd Floor, NavPrabhat Chambers, Beside ICICI Bank, Near Lokmat Square, Ramdaspeth, Nagpur – 440010
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="h-px bg-white/10 w-full mt-16 mb-8" />

                    {/* Footer Rights */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                        <p className="text-[10px] sm:text-xs text-gray-400 font-semibold">
                            © {new Date().getFullYear()} Spruce Lifeskills. All Rights Reserved. RTMNU Approved.
                        </p>
                        <div className="flex gap-4 text-[10px] sm:text-xs text-gray-400 font-semibold">
                            <Link href="/" className="hover:text-white transition-colors">Main Website</Link>
                            <span>|</span>
                            <Link href="/courses" className="hover:text-white transition-colors">Courses Offered</Link>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
