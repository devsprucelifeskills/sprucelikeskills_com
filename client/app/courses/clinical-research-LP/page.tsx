"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Check, Phone, Mail, Award, Clock, ArrowRight, ChevronDown, ChevronUp,
    Loader2, CheckCircle2, MapPin, User, GraduationCap, Building,
    CheckSquare, MessageSquare, Sparkles, Calendar, Layers, Briefcase,
    Users, Compass, ArrowUpRight, Shield, Zap, TrendingUp, Star,
    BadgeCheck
} from 'lucide-react';

export default function ClinicalResearchLandingPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [formData, setFormData] = useState({
        fullName: '', mobileNumber: '', emailAddress: '',
        highestQualification: '', city: '', preferredMode: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [counter, setCounter] = useState({ students: 0, partners: 0, months: 0 });
    const [activeCareer, setActiveCareer] = useState(0);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (id: string) => {
        // Smart routing for lead form
        let targetId = id;
        if (id === 'lead-form-section') {
            targetId = window.innerWidth >= 768 ? 'lead-form-desktop' : 'lead-form-mobile';
        }

        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
            setActiveTab(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            if (heroRef.current) {
                setShowStickyBar(window.scrollY > heroRef.current.offsetHeight);
            }
            const sections = ['overview', 'curriculum', 'placement', 'faq'];
            const scrollPosition = window.scrollY + 120;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
                    setActiveTab(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const duration = 2200;
        const targets = { students: 3500, partners: 50, months: 37 };
        const startTime = Date.now();
        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounter({
                students: Math.floor(ease * targets.students),
                partners: Math.floor(ease * targets.partners),
                months: Math.floor(ease * targets.months),
            });
            if (progress < 1) requestAnimationFrame(tick);
        };
        const timeout = setTimeout(() => requestAnimationFrame(tick), 800);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setActiveCareer(p => (p + 1) % careerOpportunities.length), 2500);
        return () => clearInterval(interval);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
        const customMessage = `Qualification: ${formData.highestQualification}\nCity: ${formData.city}\nPreferred Mode: ${formData.preferredMode}\nSource: Clinical Research Landing Page Hero Form`;
        const submissionPayload = {
            name: formData.fullName, mobile: formData.mobileNumber,
            email: formData.emailAddress, message: customMessage,
            courseName: 'Clinical Research Course'
        };
        try {
            const res = await fetch(`${backend_url}/api/v2/enquiry/submit`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionPayload),
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ fullName: '', mobileNumber: '', emailAddress: '', highestQualification: '', city: '', preferredMode: '' });
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag('event', 'conversion', { send_to: 'AW-17963235751/z9jPCKGAqIEcEKfzxPVC', transaction_id: Date.now().toString() });
                }
                router.push('/thankyou');
            } else {
                setSubmitError(data.message || 'Failed to submit. Please try again.');
            }
        } catch (err) {
            setSubmitError('Connection error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const careerOpportunities = [
        "Clinical Research Associate (CRA)", "Clinical Research Coordinator (CRC)",
        "Clinical Trial Assistant (CTA)", "Pharmacovigilance Associate",
        "Regulatory Affairs Executive", "Clinical Data Analyst", "Medical Writer"
    ];

    const trustPoints = [
        { text: "Since 2013" }, { text: "3500+ Students Trained" },
        { text: "37 Months Placement Record" }, { text: "50+ Hiring Partners" },
        { text: "ISO 9001:2015 Certified" }, { text: "RTMNU Approved" }
    ];

    const whySpruceCards = [
        { title: "Since 2013", desc: "13+ years of healthcare training expertise.", icon: <Calendar className="w-5 h-5" /> },
        { title: "RTMNU Approved", desc: "University-approved programs.", icon: <Award className="w-5 h-5" /> },
        { title: "Industry Trainers", desc: "Doctors & industry professionals.", icon: <Users className="w-5 h-5" /> },
        { title: "Practical Learning", desc: "Real-world case studies & scenarios.", icon: <Compass className="w-5 h-5" /> },
        { title: "Updated Curriculum", desc: "Current industry requirements.", icon: <Layers className="w-5 h-5" /> },
        { title: "Placement Help", desc: "Resume, interviews & hiring support.", icon: <Briefcase className="w-5 h-5" /> },
        { title: "Campus to Corporate", desc: "Communication & confidence building.", icon: <TrendingUp className="w-5 h-5" /> },
        { title: "Recorded Sessions", desc: "Flexible learning on LMS anytime.", icon: <Clock className="w-5 h-5" /> }
    ];

    const curriculumTopics = [
        "Clinical Research Fundamentals", "Regulatory Affairs", "Pharmacovigilance",
        "Clinical Data Management", "Medical Writing", "Clinical Trial Phases",
        "ICH-GCP Guidelines", "Documentation & Reporting",
        "Real-World Case Studies", "Exam Prep & Mock Tests"
    ];

    const curriculumHighlights = [
        "Updated Curriculum by Ex-TCS & Cognizant Professionals",
        "Learning Management System Access",
        "Recorded Sessions Available",
        "Regular Assessments & Mock Tests",
        "Practical Industry Learning"
    ];

    const courseBenefits = [
        "RTMNU Certificate", "International Certification Support",
        "NEP Academic Credits", "Placement Assistance",
        "Online + Offline Learning", "EMI Available",
        "Flexible Learning Schedule", "Industry-Oriented Curriculum"
    ];

    const faqs = [
        { q: "Is this course online or offline?", a: "Both online and offline options are available to fit your schedule and learning preferences." },
        { q: "Are recorded sessions available?", a: "Yes, fully recorded sessions are uploaded to our LMS for flexible, self-paced revision." },
        { q: "Is this suitable after B.Pharm?", a: "Yes! B.Pharm, D.Pharm, M.Pharm, BDS, and Life Science graduates are highly preferred in clinical research." },
        { q: "Do I need prior experience?", a: "No prior experience needed. We start from fundamentals and advance into specialized topics." },
        { q: "Is EMI available?", a: "Yes, easy monthly installment plans are available to make quality training accessible." },
        { q: "Will I receive certification?", a: "Yes, RTMNU-approved and Spruce Lifeskills certifications are provided upon completion." },
        { q: "Do you provide placement support?", a: "Absolutely — resume building, mock interviews, and hiring partner connections included." }
    ];

    /* ─── LEAD FORM (shared between mobile inline & desktop sticky) ─── */
    const LeadFormContent = () => (
        <div className="bg-white rounded-[36px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,30,10,0.08)] border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#0A3D24] to-[#13523f] text-white p-6 sm:p-7 text-center relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#2ecc71]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 left-4 w-20 h-20 bg-[#FDB813]/15 rounded-full blur-2xl" />
                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#2ecc71] text-[9px] font-black uppercase rounded-full tracking-wider mb-2 border border-white/5">
                        <Sparkles className="w-3 h-3 text-[#2ecc71]" /> Admission Portal Open
                    </span>
                    <h2 className="text-base sm:text-lg font-black leading-tight text-white">
                        Check Eligibility & Get Course Details
                    </h2>
                    <p className="text-[10px] text-gray-300 font-semibold mt-1">
                        Reserve your seat in 30 seconds
                    </p>
                </div>
            </div>

            {/* Rainbow rule */}
            <div className="h-0.5 bg-gradient-to-r from-[#0A3D24] via-[#2ecc71] to-[#FDB813]" />

            {/* Form Body */}
            <div className="p-5 sm:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                    {[
                        { icon: <User size={15} />, type: "text", placeholder: "Full Name", field: "fullName", required: true },
                        { icon: <Phone size={15} />, type: "tel", placeholder: "10-Digit Mobile Number", field: "mobileNumber", required: true, pattern: "[0-9]{10}" },
                        { icon: <Mail size={15} />, type: "email", placeholder: "Email Address", field: "emailAddress", required: true },
                        { icon: <GraduationCap size={15} />, type: "text", placeholder: "Qualification (e.g. B.Pharm)", field: "highestQualification", required: true },
                        { icon: <Building size={15} />, type: "text", placeholder: "Your City", field: "city", required: true },
                    ].map((input) => (
                        <div key={input.field} className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0A3D24] transition-colors pointer-events-none">{input.icon}</span>
                            <input
                                type={input.type} required={input.required} pattern={(input as any).pattern}
                                placeholder={input.placeholder}
                                className="input-field w-full rounded-2xl pl-11 pr-4 py-3.5 text-gray-900 font-semibold placeholder-gray-400 bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white focus:ring-4 focus:ring-emerald-800/5 outline-none transition-all"
                                style={{ fontSize: '16px' }}
                                value={(formData as any)[input.field]}
                                onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                            />
                        </div>
                    ))}

                    {/* Study Mode */}
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 pl-1">Preferred Study Mode</div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {['Online', 'Offline'].map((mode) => (
                                <label key={mode}
                                    className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-3 text-[11px] font-black cursor-pointer border-2 transition-all ${formData.preferredMode === mode
                                        ? 'bg-emerald-50/50 border-[#0A3D24] text-[#0A3D24] shadow-sm'
                                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                                    <input type="radio" name="preferredMode" required value={mode}
                                        checked={formData.preferredMode === mode} className="sr-only"
                                        onChange={() => setFormData({ ...formData, preferredMode: mode })} />
                                    {formData.preferredMode === mode && (
                                        <span className="w-3.5 h-3.5 bg-[#0A3D24] rounded-full flex items-center justify-center shrink-0">
                                            <Check className="w-2 h-2 text-white" strokeWidth={3} />
                                        </span>
                                    )}
                                    {mode} Classes
                                </label>
                            ))}
                        </div>
                    </div>

                    {submitError && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-[11px] font-bold text-red-600 text-center">{submitError}</div>
                    )}

                    <button type="submit" disabled={isSubmitting}
                        className="btn-dark w-full text-white text-[11px] font-black uppercase tracking-[0.12em] py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50">
                        {isSubmitting ? <><Loader2 className="animate-spin w-4 h-4" /> Validating...</> : <>Reserve My Seat <ArrowRight size={14} /></>}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 pt-0.5">
                        <Shield size={11} className="text-[#2ecc71]" />
                        <span className="text-[9px] text-gray-400 font-semibold">100% Encrypted & Secure</span>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-900 antialiased">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
                *, html, body { font-family: 'Plus Jakarta Sans', sans-serif !important; }
                main { padding-bottom: 0px !important; }
                ::selection { background: rgba(46,204,113,0.2); }

                :root {
                    --green: #0A3D24;
                    --lime: #2ecc71;
                    --gold: #FDB813;
                    --green-mid: #13523f;
                }

                /* ── Animations ── */
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
                @keyframes floatUp { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
                @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(46,204,113,0.4); } 50% { box-shadow: 0 0 0 8px rgba(46,204,113,0); } }
                @keyframes slideInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
                @keyframes careerFade { 0%,100% { opacity:0; transform: translateY(8px); } 15%,85% { opacity:1; transform: translateY(0); } }
                @keyframes stickySlide { from { transform: translateY(100%); } to { transform: translateY(0); } }
                @keyframes gradientPan { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

                .marquee-track { animation: marquee 22s linear infinite; }
                .float-anim { animation: floatUp 3s ease-in-out infinite; }
                .sticky-slide { animation: stickySlide 0.35s cubic-bezier(0.23,1,0.32,1) forwards; }
                .slide-in-up { animation: slideInUp 0.5s ease forwards; }

                .shimmer-text {
                    background: linear-gradient(90deg, #0A3D24 0%, #2ecc71 35%, #0A3D24 55%, #13523f 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3.5s linear infinite;
                }

                /* ── Mobile hero bg ── */
                .hero-bg-mobile {
                    background:
                        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46,204,113,0.12) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 50% at 100% 100%, rgba(10,61,36,0.06) 0%, transparent 60%),
                        #FAFCFA;
                }

                /* ── Desktop hero bg ── */
                .hero-bg-desktop {
                    background:
                        radial-gradient(ellipse 80% 60% at 100% -10%, rgba(46,204,113,0.10) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 50% at 0% 100%, rgba(10,61,36,0.05) 0%, transparent 60%),
                        linear-gradient(135deg, #f0faf5 0%, #ffffff 50%, #f7f9f7 100%);
                }

                .dark-card-bg {
                    background: linear-gradient(135deg, #0A3D24 0%, #0d4a2c 50%, #13523f 100%);
                }

                /* ── Noise overlay ── */
                .noise { position: relative; }
                .noise::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
                    pointer-events: none;
                    border-radius: inherit;
                }

                /* ── Tap states (mobile) ── */
                .tap-card { -webkit-tap-highlight-color: transparent; transition: transform 0.15s ease, box-shadow 0.15s ease; }
                .tap-card:active { transform: scale(0.97); }

                /* ── Buttons ── */
                .btn-gold {
                    background: linear-gradient(135deg, #FDB813 0%, #E5A511 100%);
                    -webkit-tap-highlight-color: transparent;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.15s ease;
                }
                .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(253,184,19,0.25); }
                .btn-gold:active { transform: scale(0.97); filter: brightness(0.95); }

                .btn-dark {
                    background: var(--green);
                    -webkit-tap-highlight-color: transparent;
                    transition: transform 0.2s ease, background 0.2s ease;
                }
                .btn-dark:hover { background: #000; transform: translateY(-1px); }
                .btn-dark:active { transform: scale(0.97); }

                /* ── Form inputs ── */
                .input-field {
                    -webkit-appearance: none;
                    appearance: none;
                }

                /* ── Career pill ── */
                .career-pill { animation: careerFade 2.5s ease-in-out; }

                /* ── Scrollable carousels ── */
                .scroll-snap-x { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
                .snap-start { scroll-snap-align: start; }
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }

                /* ── Section label chip ── */
                .section-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    background: rgba(46,204,113,0.08);
                    border: 1px solid rgba(46,204,113,0.2);
                    border-radius: 999px;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #0A3D24;
                }

                .gradient-rule { height: 1px; background: linear-gradient(90deg, transparent, #e5e7eb 30%, #e5e7eb 70%, transparent); }
                .stat-num { font-variant-numeric: tabular-nums; line-height: 1; }

                /* ── Desktop grid pattern ── */
                .grid-pattern {
                    background-image: linear-gradient(to right, #8080800a 1px, transparent 1px),
                        linear-gradient(to bottom, #8080800a 1px, transparent 1px);
                    background-size: 14px 24px;
                }

                /* ── Hover card animations (desktop) ── */
                .hover-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
                .hover-card:hover { transform: translateY(-4px); }

                /* ── Why spruce card top accent bar ── */
                .spruce-card { overflow: hidden; }
                .spruce-card-bar {
                    position: absolute; top: 0; left: 0; width: 100%; height: 3px;
                    background: linear-gradient(90deg, #0A3D24, #2ecc71);
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.3s ease;
                }
                .spruce-card:hover .spruce-card-bar { transform: scaleX(1); }
                .spruce-card:hover .spruce-icon-wrap { background: linear-gradient(135deg, #0A3D24, #2ecc71); }
                .spruce-card:hover .spruce-icon-wrap svg { color: white; }
                .spruce-icon-wrap { transition: background 0.3s ease; }
                .spruce-icon-wrap svg { transition: color 0.3s ease; }
            `}</style>

            {/* ════════════════════════════════════════
                STICKY HEADER
            ════════════════════════════════════════ */}
            <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${scrolled
                ? 'bg-white/96 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.08)]'
                : 'bg-white border-b border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-3">

                    {/* Logo */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/courses/clinical-research-LP">
                            <img src="/Group 10 (1).svg" alt="Spruce Lifeskills" className="h-8 sm:h-12 w-auto" />
                        </Link>
                        <div className="hidden sm:block h-8 w-px bg-gray-200" />
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[11px] font-black uppercase text-gray-800 tracking-wider">Clinical Research Academy</span>
                            <span className="text-[9px] font-bold text-emerald-600 tracking-widest uppercase">Skill • Empower • Excel</span>
                        </div>
                    </div>

                    {/* Nav tabs — compact on mobile, pill on desktop */}
                    <nav className="flex items-center gap-0.5 md:gap-1 overflow-x-auto no-scrollbar md:bg-gray-50 md:rounded-full md:px-2 md:py-1 md:border md:border-gray-100">
                        {[{ id: 'overview', label: 'Overview' }, { id: 'curriculum', label: 'Syllabus' }, { id: 'placement', label: 'Placement' }, { id: 'faq', label: 'FAQ' }].map((tab) => (
                            <button key={tab.id} onClick={() => scrollToSection(tab.id)}
                                className={`shrink-0 px-3 py-1.5 text-[10px] md:text-xs font-bold md:font-extrabold rounded-full whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'bg-[#0A3D24] text-white md:shadow-sm'
                                    : 'text-gray-500 hover:text-gray-800'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block shrink-0">
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-dark text-white text-[11px] font-black uppercase tracking-wider px-5 py-3 rounded-full shadow-lg">
                            Apply Now
                        </button>
                    </div>
                </div>
            </header>

            {/* ════════════════════════════════════════
                TICKER
            ════════════════════════════════════════ */}
            {/* <div className="bg-[#0A3D24] overflow-hidden">
                <div className="flex whitespace-nowrap py-2">
                    <div className="marquee-track flex items-center gap-6 text-[9px] font-bold text-white/70 uppercase tracking-[0.12em]">
                        {Array(8).fill(null).map((_, i) => (
                            <React.Fragment key={i}>
                                <span className="flex items-center gap-1.5 shrink-0"><span className="w-1 h-1 rounded-full bg-[#2ecc71] inline-block" />Admissions Open — May & June 2026</span>
                                <span className="flex items-center gap-1.5 shrink-0"><span className="w-1 h-1 rounded-full bg-[#FDB813] inline-block" />Only 20–25 Seats Left</span>
                                <span className="flex items-center gap-1.5 shrink-0"><span className="w-1 h-1 rounded-full bg-[#2ecc71] inline-block" />RTMNU Approved · ISO 9001:2015</span>
                                <span className="flex items-center gap-1.5 shrink-0"><span className="w-1 h-1 rounded-full bg-[#FDB813] inline-block" />3500+ Students Trained</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* ════════════════════════════════════════
                HERO — MOBILE: stacked, DESKTOP: 2-col
            ════════════════════════════════════════ */}
            <section id="overview" ref={heroRef}
                className="relative overflow-hidden pt-6 pb-10 px-4 md:pt-0 md:pb-0 md:px-0 hero-bg-mobile md:hero-bg-desktop">

                {/* Desktop grid pattern */}
                <div className="hidden md:block absolute inset-0 grid-pattern -z-10" />
                {/* Desktop color blobs */}
                <div className="hidden md:block absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-60 -z-10" />
                <div className="hidden md:block absolute bottom-10 left-10 w-96 h-96 bg-teal-50/80 rounded-full blur-3xl opacity-70 -z-10" />
                {/* Mobile decorative circle */}
                <div className="md:hidden absolute -top-20 -right-20 w-64 h-64 bg-[#2ecc71]/10 rounded-full blur-3xl pointer-events-none" />

                {/* ── DESKTOP HERO INNER (hidden on mobile) ── */}
                <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Desktop Left Content */}
                        <div className="col-span-7 flex flex-col justify-center">

                            {/* Urgency badge strip */}
                            <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-emerald-950/10 rounded-full w-fit mb-8 shadow-sm">
                                <span className="bg-[#FDB813] text-black text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm shrink-0">
                                    Admissions Open
                                </span>
                                <span className="text-[10px] font-black text-[#0A3D24] px-2 uppercase tracking-wide shrink-0">
                                    May & June 2026 Batch
                                </span>
                                <div className="w-px h-4 bg-gray-200 mx-1" />
                                <div className="flex items-center gap-2 shrink-0 pr-3">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-red-600 animate-pulse whitespace-nowrap">20–25 Seats Only</span>
                                </div>
                            </div>

                            <h1 className="text-[48px] lg:text-[56px] font-black text-gray-900 leading-[1.1] mb-6 tracking-tight max-w-2xl">
                                Launch Your Career in{' '}
                                <span className="bg-gradient-to-r from-[#0A3D24] via-[#13523f] to-[#2ecc71] bg-clip-text text-transparent">
                                    Clinical Research
                                </span>{' '}
                                with Industry-Focused Training
                            </h1>

                            <p className="text-lg text-gray-600/90 font-medium leading-relaxed mb-10 max-w-2xl">
                                RTMNU-approved training, practical learning, recorded sessions & placement assistance to build a successful healthcare career.
                            </p>

                            {/* Trust badges grid */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {trustPoints.map((point, idx) => (
                                    <div key={idx} className="hover-card flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:border-[#2ecc71]/40">
                                        <div className="w-5 h-5 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                        </div>
                                        <span className="text-xs font-extrabold text-[#0A3D24] tracking-tight">{point.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Batch overview card */}
                            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-[32px] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] mb-8">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2.5">
                                    <span className="w-2 h-4 bg-[#2ecc71] rounded-full inline-block" />
                                    Cohort Batch Overview
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: <Calendar className="w-5 h-5" />, label: "Batches Start", val: "18 May & 1 June 2026" },
                                        { icon: <GraduationCap className="w-5 h-5" />, label: "Classroom Mode", val: "Online & Offline" },
                                        { icon: <Award className="w-5 h-5" />, label: "EMI & Flexible Plans", val: "Easy Instalments Available" },
                                        { icon: <Clock className="w-5 h-5" />, label: "LMS Learning", val: "Recorded Class Archives" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 bg-gray-50 border border-gray-100/50 p-4 rounded-2xl">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#0A3D24] shrink-0">{item.icon}</div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">{item.label}</span>
                                                <span className="block text-base font-black text-[#0A3D24] mt-0.5">{item.val}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-gold w-fit text-black text-xs font-black uppercase tracking-widest px-8 py-5 rounded-2xl shadow-xl shadow-yellow-500/10 inline-flex items-center gap-3">
                                Book Free Career Counseling
                                <ArrowRight className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                        </div>

                        {/* Desktop Right — Sticky Form */}
                        <div id="lead-form-desktop" className="col-span-5 lg:sticky lg:top-24">
                            <LeadFormContent />
                        </div>
                    </div>
                </div>

                {/* ── MOBILE HERO INNER (hidden on desktop) ── */}
                <div className="md:hidden">
                    {/* Urgency strip */}
                    <div className="flex items-center justify-between mb-5 gap-2">
                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/70 px-2.5 py-1.5 rounded-full">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wide text-amber-800">Admissions Open</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-2.5 py-1.5 rounded-full">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wide text-red-600">20–25 Seats Only</span>
                        </div>
                    </div>

                    <h1 className="text-[30px] font-black leading-[1.1] tracking-tight text-gray-950 mb-3">
                        Launch Your Career<br />
                        in <span className="shimmer-text">Clinical Research</span>
                    </h1>
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6 max-w-xs">
                        {/* RTMNU-approved training · Practical learning · Placement assistance */}
                        RTMNU-approved training, practical learning, recorded sessions & placement assistance to build a successful healthcare career.
                    </p>

                    {/* Animated career pill */}
                    <div className="mb-6 overflow-hidden h-8">
                        <div key={activeCareer} className="career-pill flex items-center gap-2">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider shrink-0">Career →</span>
                            <span className="bg-[#0A3D24]/8 border border-[#0A3D24]/10 text-[#0A3D24] text-[11px] font-black px-3 py-1 rounded-full">
                                {careerOpportunities[activeCareer]}
                            </span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                        {[
                            { val: `${counter.students.toLocaleString()}+`, label: "Students" },
                            { val: `${counter.partners}+`, label: "Partners" },
                            { val: `${counter.months}mo`, label: "Placement" }
                        ].map((s, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-3 text-center shadow-sm">
                                <div className="text-xl font-black text-[#0A3D24] stat-num">{s.val}</div>
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Trust badges 2-col */}
                    <div className="grid grid-cols-2 gap-2 mb-7">
                        {["Since 2013", "3500+ Trained", "37mo Placement", "50+ Partners", "ISO 9001:2015", "RTMNU Approved"].map((t, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm">
                                <div className="w-4 h-4 bg-[#2ecc71] rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                                </div>
                                <span className="text-[10px] font-black text-gray-700 tracking-tight">{t}</span>
                            </div>
                        ))}
                    </div>

                    {/* Batch card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-4 bg-gradient-to-b from-[#0A3D24] to-[#2ecc71] rounded-full" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Next Batches</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Batch 1", val: "18 May 2026" },
                                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Batch 2", val: "1 June 2026" },
                                { icon: <GraduationCap className="w-3.5 h-3.5" />, label: "Mode", val: "Online & Offline" },
                                { icon: <Award className="w-3.5 h-3.5" />, label: "EMI", val: "Available" }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#F4F7F4] rounded-xl p-2.5 flex items-start gap-2">
                                    <span className="text-[#0A3D24] mt-0.5 shrink-0">{item.icon}</span>
                                    <div>
                                        <div className="text-[8px] font-black uppercase tracking-wider text-gray-400">{item.label}</div>
                                        <div className="text-[11px] font-black text-gray-800 mt-0.5">{item.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Hero CTAs */}
                    <div className="flex flex-col gap-2.5">
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.12em] py-4 rounded-2xl shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2">
                            Book Free Career Counseling
                            <ArrowRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                        <a href="https://wa.me/919595025757" target="_blank" rel="noopener noreferrer"
                            className="tap-card w-full flex items-center justify-center gap-2 border-2 border-[#2ecc71]/30 bg-[#2ecc71]/5 text-[#0A3D24] text-[11px] font-black uppercase tracking-[0.1em] py-3.5 rounded-2xl">
                            <MessageSquare size={14} className="text-[#2ecc71]" /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                MOBILE LEAD FORM (inline, hidden on desktop)
            ════════════════════════════════════════ */}
            <section id="lead-form-mobile" className="md:hidden px-4 py-8 bg-white border-t border-gray-100">
                <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-b from-[#0A3D24]/6 to-transparent rounded-[32px] blur-xl" />
                    <div className="relative">
                        <LeadFormContent />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                WHY CLINICAL RESEARCH
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-16 lg:py-24 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile layout */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><TrendingUp className="w-3 h-3 text-[#2ecc71]" />Booming Sector</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight tracking-tight mb-3">
                            Why Choose<br /><span className="text-[#0A3D24]">Clinical Research?</span>
                        </h2>
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
                            One of the fastest-growing sectors in healthcare & pharma — testing medicines, devices, and treatments to ensure safety and effectiveness worldwide.
                        </p>
                        <div className="mb-5">
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3">Career Roles Available</div>
                            <div className="flex gap-2 overflow-x-auto scroll-snap-x pb-2 no-scrollbar">
                                {careerOpportunities.map((role, idx) => (
                                    <div key={idx} className="snap-start shrink-0 tap-card bg-white border border-gray-100 rounded-2xl px-3.5 py-3 shadow-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#2ecc71] shrink-0" />
                                        <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">{role}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-[9px] text-gray-400 font-medium mt-2">← Swipe to see all roles</div>
                        </div>
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-dark w-full text-white text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                            Talk to Career Counselor <ArrowUpRight size={13} />
                        </button>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="col-span-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">
                                Booming Healthcare Sector
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mt-4 mb-6">
                                Why Choose Clinical Research<br />as a Career?
                            </h2>
                            <div className="space-y-4 text-base text-gray-600 font-medium leading-relaxed">
                                <p>Clinical Research is one of the fastest-growing sectors in healthcare and pharmaceuticals. It focuses on testing new medicines, medical devices, and treatments to ensure their safety and effectiveness.</p>
                                <p>With growing demand in pharmaceutical companies, CROs, hospitals, and healthcare companies, skilled professionals are highly sought after.</p>
                            </div>
                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-dark mt-8 text-white text-xs font-black uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg inline-flex items-center gap-2">
                                Talk to Career Counselor <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="col-span-6">
                            <div className="bg-[#0A3D24]/[0.02] border border-[#0A3D24]/5 rounded-3xl p-6 sm:p-8 shadow-sm">
                                <h3 className="text-lg font-black text-[#0A3D24] mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#2ecc71] rounded-full inline-block" />Career Opportunities
                                </h3>
                                <div className="grid grid-cols-2 gap-3.5">
                                    {careerOpportunities.map((role, idx) => (
                                        <div key={idx} className="hover-card bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:border-[#2ecc71]/40 flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#2ecc71] shrink-0 mt-0.5" />
                                            <span className="text-sm font-bold text-gray-800 leading-tight">{role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                WHY SPRUCE
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-20 lg:py-28 bg-white md:bg-gradient-to-b md:from-[#F8FAFC] md:via-white md:to-[#F8FAFC] relative overflow-hidden">
                <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#0A3D24_0.04rem,transparent_0.04rem)] [background-size:24px_24px] opacity-[0.15] -z-10" />
                <div className="hidden md:block absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl opacity-60 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                    {/* Mobile layout */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><Star className="w-3 h-3 text-[#FDB813] fill-[#FDB813]" />Trust & Legacy</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight tracking-tight mb-1">
                            Why 3500+ Students<br /><span className="shimmer-text">Choose Spruce?</span>
                        </h2>
                        <p className="text-[12px] text-gray-400 font-medium leading-relaxed mb-6">
                            Since 2013, powering healthcare careers with practical, industry-first training.
                        </p>
                        <div className="grid grid-cols-2 gap-2.5 mb-7">
                            {whySpruceCards.map((card, idx) => (
                                <div key={idx} className="tap-card bg-[#F4F7F4] border border-gray-100 rounded-2xl p-4 flex flex-col gap-2.5 active:bg-[#0A3D24]/5">
                                    <div className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-[#0A3D24] shadow-sm shrink-0">{card.icon}</div>
                                    <div>
                                        <div className="text-[11px] font-black text-gray-900 leading-tight mb-0.5">{card.title}</div>
                                        <div className="text-[10px] text-gray-400 font-medium leading-relaxed">{card.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                            Check Eligibility Now <ArrowRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:block">
                        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#2ecc71] text-[10px] font-black uppercase rounded-full tracking-wider mb-4 border border-emerald-100">
                                <Sparkles className="w-3 h-3 text-[#2ecc71]" /> Trust & Legacy
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 leading-[1.15] tracking-tight">
                                Why 3500+ Students{' '}
                                <span className="bg-gradient-to-r from-[#0A3D24] via-[#13523f] to-[#2ecc71] bg-clip-text text-transparent">
                                    Choose Spruce Lifeskills?
                                </span>
                            </h2>
                            <p className="text-sm text-gray-500 font-semibold mt-4 max-w-xl mx-auto leading-relaxed">
                                Since 2013, empowering healthcare aspirants with high-quality, practical instruction designed to accelerate professional placement.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                            {whySpruceCards.map((card, idx) => (
                                <div key={idx} className="spruce-card relative bg-white border border-gray-100 rounded-[32px] p-6 lg:p-7 shadow-sm hover:shadow-xl hover:border-emerald-800/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                                    <div className="spruce-card-bar" />
                                    <div className="spruce-icon-wrap w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A3D24]/10 to-[#2ecc71]/5 flex items-center justify-center mb-6 text-[#0A3D24] shadow-sm">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-base font-black text-gray-900 mb-2 leading-snug">{card.title}</h3>
                                    <p className="text-xs text-gray-500 font-semibold leading-relaxed flex-grow">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-gold text-black font-black uppercase text-xs tracking-widest px-10 py-5 rounded-2xl shadow-xl inline-flex items-center gap-3">
                                Check Eligibility Now <ArrowRight className="w-4 h-4 text-black" strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                CURRICULUM
            ════════════════════════════════════════ */}
            <section id="curriculum" className="noise dark-card-bg py-10 md:py-16 lg:py-24 px-4 md:px-0 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

                <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8">

                    {/* Mobile layout */}
                    <div className="md:hidden">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-2.5 py-1 mb-4">
                            <Layers className="w-3 h-3 text-[#2ecc71]" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-[#2ecc71]">Syllabus</span>
                        </div>
                        <h2 className="text-2xl font-black text-white leading-tight mb-7">Industry-Relevant<br />Curriculum</h2>
                        <div className="grid grid-cols-1 gap-2 mb-7">
                            {curriculumTopics.map((topic, idx) => (
                                <div key={idx} className="tap-card flex items-center gap-3 bg-white/[0.06] border border-white/8 rounded-xl p-3.5">
                                    <span className="w-7 h-7 bg-[#2ecc71] text-[#0A3D24] font-black text-[10px] rounded-lg flex items-center justify-center shrink-0">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-[12px] font-semibold text-white/80 leading-tight">{topic}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5 mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckSquare className="w-4 h-4 text-[#2ecc71]" />
                                <span className="text-[11px] font-black text-white">Additional Benefits</span>
                            </div>
                            <div className="space-y-3">
                                {curriculumHighlights.map((h, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5">
                                        <div className="w-4 h-4 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-2.5 h-2.5 text-[#2ecc71]" strokeWidth={3} />
                                        </div>
                                        <span className="text-[12px] text-white/60 font-medium leading-relaxed">{h}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 bg-[#FDB813]/10 border border-[#FDB813]/20 rounded-xl p-4">
                                <p className="text-[10px] text-white/60 font-medium leading-relaxed">
                                    <span className="text-[#FDB813] font-black">Expert-Curated</span> by Clinical Trial Specialists from TCS & Cognizant.
                                </p>
                            </div>
                        </div>
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                            Enroll Now <ArrowRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="col-span-7">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-white/10 px-3 py-1 rounded-full">Syllabus</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mt-4 mb-8 leading-tight">Industry-Relevant Curriculum</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {curriculumTopics.map((topic, idx) => (
                                    <div key={idx} className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                                        <span className="w-7 h-7 bg-[#2ecc71] text-black font-black text-xs rounded-full flex items-center justify-center shrink-0">{idx + 1}</span>
                                        <span className="text-sm font-bold tracking-wide text-white/90">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 sm:p-8">
                                <h3 className="text-lg font-black text-[#2ecc71] mb-6 flex items-center gap-2">
                                    <CheckSquare className="w-5 h-5 shrink-0" /> Additional Course Benefits
                                </h3>
                                <div className="space-y-4">
                                    {curriculumHighlights.map((h, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-[#2ecc71]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-white/80 font-medium leading-relaxed">{h}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[11px] text-white/70 font-semibold leading-relaxed">
                                        💡 <strong>Expert-Curated</strong>: Syllabus updated by Clinical Trial Specialists formerly with TCS & Cognizant.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                COURSE BENEFITS
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><Zap className="w-3 h-3 text-[#2ecc71]" />Why Spruce Program</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-6">What Makes This<br />Program Different?</h2>
                        <div className="grid grid-cols-2 gap-2.5 mb-7">
                            {courseBenefits.map((benefit, idx) => (
                                <div key={idx} className="tap-card bg-[#F4F7F4] border border-gray-100 rounded-xl p-3.5 flex items-center gap-2.5 active:border-[#2ecc71]/40">
                                    <div className="w-6 h-6 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-700 leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-dark w-full text-white text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                            Get Full Course Details <ArrowUpRight size={13} />
                        </button>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block">
                        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">Why Spruce Program</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">What Makes This Program Different?</h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {courseBenefits.map((benefit, idx) => (
                                <div key={idx} className="hover-card bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:bg-white hover:border-[#2ecc71]/30 hover:shadow-xl transition-all duration-300 flex items-center gap-3.5">
                                    <div className="w-7 h-7 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-[#2ecc71]" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-extrabold text-gray-800 leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-dark text-white text-xs font-black uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg inline-flex items-center gap-2">
                                Get Complete Course Details <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                WHO CAN APPLY
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-16 bg-[#F4F7F4] border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><GraduationCap className="w-3 h-3 text-[#2ecc71]" />Eligibility</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-6">Who Can Apply?</h2>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            {[{ deg: 'D.Pharm', label: 'Diploma in Pharmacy' }, { deg: 'B.Pharm', label: 'Bachelor of Pharmacy' }].map((d, i) => (
                                <div key={i} className="tap-card bg-white border-2 border-[#0A3D24]/10 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                                    <div className="w-11 h-11 bg-gradient-to-br from-[#0A3D24]/8 to-[#2ecc71]/5 rounded-2xl flex items-center justify-center mb-3">
                                        <GraduationCap className="text-[#0A3D24] w-5 h-5" />
                                    </div>
                                    <span className="text-base font-black text-[#0A3D24]">{d.deg}</span>
                                    <span className="text-[9px] text-gray-400 font-bold mt-0.5">{d.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <p className="text-[11px] text-gray-500 font-medium leading-relaxed text-center">
                                Also suitable for Pharm.D, M.Pharm, B.Sc/M.Sc Biotechnology, Microbiology, Nursing, BDS, BAMS & other Life Sciences graduates.
                            </p>
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block text-center max-w-4xl mx-auto">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">Eligibility Criteria</span>
                        <h2 className="text-3xl font-black text-gray-900 mt-4 mb-8">Who Can Apply?</h2>
                        <div className="flex items-stretch justify-center gap-4 max-w-lg mx-auto mb-6">
                            {[{ deg: 'D.Pharm', label: 'Diploma in Pharmacy' }, { deg: 'B.Pharm', label: 'Bachelor of Pharmacy' }].map((d, i) => (
                                <div key={i} className="hover-card flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:border-[#2ecc71]/30 hover:shadow-lg flex flex-col items-center">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
                                        <GraduationCap className="text-[#0A3D24] w-5 h-5" />
                                    </div>
                                    <span className="text-base font-black text-[#0A3D24] mb-1">{d.deg}</span>
                                    <span className="text-xs text-gray-400 font-semibold">{d.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 font-bold max-w-xl mx-auto leading-relaxed">
                            *Also suitable for Pharm.D, M.Pharm, B.Sc/M.Sc Biotechnology, Microbiology, Nursing, BDS, BAMS & other Life Sciences graduates.
                        </p>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                PLACEMENT
            ════════════════════════════════════════ */}
            <section id="placement" className="py-10 md:py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><Briefcase className="w-3 h-3 text-[#2ecc71]" />Career Support</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-6">
                            Get Career Support<br /><span className="text-[#0A3D24]">Beyond Training</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="noise dark-card-bg rounded-2xl p-5 text-white relative overflow-hidden">
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#2ecc71]/15 rounded-full blur-xl pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="text-[8px] font-black uppercase tracking-widest text-[#2ecc71] mb-2">Record</div>
                                    <div className="text-4xl font-black stat-num mb-0.5">37<span className="text-lg text-white/40 font-medium">mo</span></div>
                                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-wide">Placement</div>
                                </div>
                            </div>
                            <div className="bg-[#F4F7F4] border border-gray-100 rounded-2xl p-5">
                                <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2">Network</div>
                                <div className="text-4xl font-black text-[#0A3D24] stat-num mb-0.5">50+</div>
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Partners</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mb-7">
                            {["Resume Building", "Interview Preparation", "Mock Interviews", "Career Guidance", "Hiring Partner Connections"].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-[#F4F7F4] border border-gray-100 rounded-xl p-3.5">
                                    <div className="w-5 h-5 bg-[#2ecc71]/15 rounded-full flex items-center justify-center shrink-0">
                                        <Check className="w-2.5 h-2.5 text-[#2ecc71]" strokeWidth={3} />
                                    </div>
                                    <span className="text-[12px] font-bold text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                            Get Placement Support <ArrowRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="col-span-6 flex flex-col gap-6">
                            <div className="noise dark-card-bg rounded-[32px] p-8 shadow-xl relative overflow-hidden text-white">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl" />
                                <span className="text-[10px] font-black uppercase text-[#2ecc71] tracking-wider block mb-2">Track Record</span>
                                <h3 className="text-4xl font-black mb-1">37 Months</h3>
                                <p className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-4">Continuous Placement Record</p>
                                <div className="h-px bg-white/10 w-full my-4" />
                                <p className="text-sm font-medium text-gray-200 leading-relaxed">100% continuous placement cycles, securing hiring rounds for graduates month after month.</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Network</span>
                                <h3 className="text-3xl font-black text-[#0A3D24] mb-1">50+ Partners</h3>
                                <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Recruitment Partners Across India</p>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">Career Support</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-6 leading-tight">Get Career Support Beyond Training</h2>
                            <p className="text-base text-gray-600 font-medium leading-relaxed mb-8">At Spruce Lifeskills, learning doesn't stop at training. We help students become industry-ready and land outstanding career opportunities:</p>
                            <div className="grid grid-cols-2 gap-4">
                                {["Resume Building", "Interview Preparation", "Mock Interviews", "Career Guidance", "Hiring Partner Connections"].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-[#2ecc71]/10 rounded-full flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[#2ecc71]" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-extrabold text-gray-800 leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                HIRING PARTNERS
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-16 lg:py-20 bg-[#F4F7F4] border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-label mb-4 inline-flex"><Users className="w-3 h-3 text-[#2ecc71]" />Our Graduates Work Here</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-6">Students Placed at<br />Leading Companies</h2>
                        <div className="flex gap-3 overflow-x-auto scroll-snap-x pb-2 no-scrollbar mb-2">
                            {[
                                { name: "TCS", logo: "/images/recruiters/tcs.png" },
                                { name: "Cognizant", logo: "/images/recruiters/cognizant.png" },
                                { name: "IQVIA", logo: "/images/recruiters/iqvia.png" },
                                { name: "Access Healthcare", logo: "/images/recruiters/access.png", scale: true },
                                { name: "Gebbs", logo: "/images/recruiters/gebbs.png" },
                                { name: "Avontix", logo: "/images/recruiters/avontix.png", scale: true },
                                { name: "Meditrina", logo: "/images/recruiters/meditrina.png", scale: true }
                            ].map((co, idx) => (
                                <div key={idx} className="snap-start shrink-0 bg-white border border-gray-100 rounded-2xl w-24 h-20 flex items-center justify-center shadow-sm overflow-hidden p-3">
                                    <img src={co.logo} alt={co.name} className={`max-h-12 max-w-full object-contain grayscale ${co.scale ? 'scale-[1.4]' : ''}`} />
                                </div>
                            ))}
                        </div>
                        <div className="text-[9px] text-gray-400 font-medium">← Swipe to see all partners</div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">Our Graduates Work Here</span>
                        <h2 className="text-3xl font-black text-gray-900 mt-4 mb-10 leading-tight">Our Students Have Opportunities With Leading Companies</h2>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 items-center justify-center">
                            {[
                                { name: "TCS", logo: "/images/recruiters/tcs.png" },
                                { name: "Cognizant", logo: "/images/recruiters/cognizant.png" },
                                { name: "IQVIA", logo: "/images/recruiters/iqvia.png" },
                                { name: "Access Healthcare", logo: "/images/recruiters/access.png", customClass: "scale-[1.6]" },
                                { name: "Gebbs", logo: "/images/recruiters/gebbs.png" },
                                { name: "Avontix", logo: "/images/recruiters/avontix.png", customClass: "scale-[1.6]" },
                                { name: "Meditrina", logo: "/images/recruiters/meditrina.png", customClass: "scale-[1.6]" }
                            ].map((co, idx) => (
                                <div key={idx} className="hover-card group bg-white border border-gray-100 rounded-2xl p-6 h-28 flex items-center justify-center shadow-sm hover:shadow-md hover:border-[#2ecc71]/40 overflow-hidden">
                                    <img src={co.logo} alt={`${co.name} Logo`} className={`max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ${co.customClass || ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                BATCH CTA
            ════════════════════════════════════════ */}
            <section className="py-10 md:py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">

                    {/* Mobile */}
                    <div className="md:hidden">
                        <div className="noise dark-card-bg rounded-[28px] p-6 relative overflow-hidden text-center">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#2ecc71]/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10">
                                <div className="bg-[#FDB813] text-black text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4">⚡ Selling Out Fast</div>
                                <h2 className="text-xl font-black text-white leading-tight mb-3">Reserve Your Seat<br />Before It's Gone</h2>
                                <p className="text-[11px] text-white/50 font-medium mb-6 leading-relaxed">Limited seats. Secure your spot now for LMS & recorded session access.</p>
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {[{ label: "Batch 1", val: "18 May" }, { label: "Batch 2", val: "1 June" }, { label: "Seats", val: "20–25" }].map((item, i) => (
                                        <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-3">
                                            <div className="text-[8px] font-black text-[#2ecc71] uppercase tracking-widest mb-1">{item.label}</div>
                                            <div className={`text-[13px] font-black ${i === 2 ? 'text-[#FDB813]' : 'text-white'}`}>{item.val}</div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => scrollToSection('lead-form-section')}
                                    className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl shadow-xl flex items-center justify-center gap-2">
                                    Reserve My Seat <ArrowRight className="w-4 h-4" strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block">
                        <div className="noise dark-card-bg text-white rounded-[40px] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
                            <div className="sm:absolute sm:top-10 sm:right-10 bg-[#FDB813] text-black text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-md inline-block mb-4 sm:mb-0">
                                Selling Out Fast
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] block mb-3">Seat Reservation</span>
                            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">Admissions Open – Reserve Your Seat</h2>
                            <p className="text-sm font-semibold text-gray-200 max-w-xl mx-auto mb-8 leading-relaxed">Limited seats available. Secure your admission before seats fill up to get recorded session archives and LMS access.</p>
                            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                                {[{ label: "Batch 1", val: "18 May 2026" }, { label: "Batch 2", val: "1 June 2026" }, { label: "Batch Size", val: "20–25 Students Only", gold: true }].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                        <span className="block text-[9px] font-bold text-[#2ecc71] uppercase tracking-wider mb-1">{item.label}</span>
                                        <span className={`block text-sm font-black ${item.gold ? 'text-[#FDB813]' : ''}`}>{item.val}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-gold text-black font-black uppercase text-xs tracking-wider px-8 py-4 rounded-2xl shadow-xl inline-flex items-center gap-2">
                                Reserve My Seat <ArrowRight size={14} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════════════════════════════════════
                FAQ
            ════════════════════════════════════════ */}
            <section id="faq" className="py-10 md:py-16 lg:py-24 bg-[#F4F7F4] border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="md:hidden mb-7">
                        <span className="section-label mb-4 inline-flex"><MessageSquare className="w-3 h-3 text-[#2ecc71]" />Get Answers</span>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="hidden md:block text-center mb-12">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71] bg-emerald-50 px-3 py-1 rounded-full">Get Answers</span>
                        <h2 className="text-3xl font-black text-gray-900 mt-4 leading-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-2.5 md:space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div key={idx} className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-[#0A3D24]/15 shadow-md' : 'border-gray-100 shadow-sm'}`}>
                                    <button onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="tap-card w-full flex items-center justify-between px-4 md:px-6 py-4 text-left gap-3">
                                        <span className="text-[12px] md:text-sm font-black text-gray-800 leading-snug">{faq.q}</span>
                                        <span className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 shrink-0 ${isOpen ? 'bg-[#0A3D24] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 md:px-6 pb-4 border-t border-gray-50">
                                            <p className="text-[12px] md:text-sm text-gray-500 font-medium leading-relaxed pt-3">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                FINAL CTA + FOOTER
            ════════════════════════════════════════ */}
            <section className="noise dark-card-bg py-10 md:py-16 lg:py-20 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#2ecc71]/8 rounded-full -translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

                    {/* Mobile layout */}
                    <div className="md:hidden">
                        <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#2ecc71] block mb-2">Still Confused?</span>
                        <h2 className="text-2xl font-black text-white leading-tight mb-3">Talk to Our Experts Today</h2>
                        <p className="text-[12px] text-white/40 font-medium mb-6 leading-relaxed max-w-xs">
                            Get clarity on salary, certificates, eligibility and career paths from our expert counselors.
                        </p>
                        <div className="flex flex-col gap-3 mb-8">
                            <button onClick={() => scrollToSection('lead-form-section')}
                                className="btn-gold w-full text-black text-[11px] font-black uppercase tracking-[0.1em] py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                                Book Free Career Counseling
                            </button>
                            <a href="https://wa.me/919595025757" target="_blank" rel="noopener noreferrer"
                                className="tap-card w-full flex items-center justify-center gap-2 bg-[#2ecc71] text-white font-black uppercase text-[10px] tracking-[0.1em] py-4 rounded-xl">
                                <MessageSquare size={13} /> WhatsApp Now
                            </a>
                        </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid grid-cols-12 gap-12 items-center mb-16">
                        <div className="col-span-7">
                            <span className="text-[10px] font-black uppercase text-[#2ecc71] tracking-wider block mb-2">Still Confused About Your Career?</span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight text-white">Talk to Our Experts Today</h2>
                            <p className="text-sm font-medium text-gray-300 max-w-xl mb-8 leading-relaxed">
                                Talk to our expert counselor and explore the best healthcare career opportunities based on your profile. Get clarity on salary, certificates, and eligibility.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => scrollToSection('lead-form-section')}
                                    className="btn-gold text-black font-black uppercase text-[10px] tracking-wider px-6 py-4 rounded-xl shadow-lg inline-flex items-center gap-2">
                                    Book Free Career Counseling
                                </button>
                                <a href="https://wa.me/919595025757" target="_blank" rel="noopener noreferrer"
                                    className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-black uppercase text-[10px] tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all inline-flex items-center gap-2">
                                    <MessageSquare size={14} /> WhatsApp Now
                                </a>
                            </div>
                        </div>
                        <div className="col-span-5 bg-white/5 border border-white/10 rounded-[32px] p-6 sm:p-8">
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
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nagpur Campus</span>
                                        <span className="block text-xs font-bold text-white leading-relaxed">3rd Floor, NavPrabhat Chambers, Beside ICICI Bank, Near Lokmat Square, Ramdaspeth, Nagpur – 440010</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shared contact (mobile) */}
                    <div className="md:hidden space-y-4 mb-8">
                        {[
                            { icon: <Phone className="w-4 h-4 text-[#2ecc71]" />, label: "Call Us", val: "+91 95950 25757", href: "tel:+919595025757" },
                            { icon: <Mail className="w-4 h-4 text-[#2ecc71]" />, label: "Email", val: "sprucelifeskills@gmail.com", href: "mailto:sprucelifeskills@gmail.com" },
                        ].map((c, i) => (
                            <a key={i} href={c.href} className="tap-card flex items-start gap-3.5">
                                <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center shrink-0">{c.icon}</div>
                                <div>
                                    <div className="text-[8px] text-white/30 font-bold uppercase tracking-wider">{c.label}</div>
                                    <div className="text-[13px] font-bold text-white">{c.val}</div>
                                </div>
                            </a>
                        ))}
                        <div className="flex items-start gap-3.5">
                            <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-[#2ecc71]" />
                            </div>
                            <div>
                                <div className="text-[8px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Nagpur Campus</div>
                                <div className="text-[11px] font-medium text-white/50 leading-relaxed">3rd Floor, NavPrabhat Chambers, Beside ICICI Bank, Near Lokmat Square, Ramdaspeth, Nagpur – 440010</div>
                            </div>
                        </div>
                    </div>

                    <div className="gradient-rule mb-6" />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[9px] sm:text-xs text-white/25 font-semibold text-center sm:text-left">© {new Date().getFullYear()} Spruce Lifeskills. All Rights Reserved. RTMNU Approved.</p>
                        <div className="flex gap-4 text-[9px] sm:text-xs text-white/30 font-semibold">
                            <Link href="/" className="hover:text-white/60 transition-colors">Main Website</Link>
                            <span className="text-white/15">|</span>
                            <Link href="/courses" className="hover:text-white/60 transition-colors">Courses Offered</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                STICKY BOTTOM BAR (mobile only, after hero)
            ════════════════════════════════════════ */}
            {showStickyBar && (
                <div className="md:hidden sticky-slide fixed bottom-0 left-0 right-0 z-[200] bg-white/96 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.12)] px-4 py-3">
                    <div className="flex gap-2.5">
                        <button onClick={() => scrollToSection('lead-form-section')}
                            className="btn-dark flex-1 text-white text-[10px] font-black uppercase tracking-[0.1em] py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md">
                            Apply Now <ArrowRight size={13} strokeWidth={3} />
                        </button>
                        <a href="https://wa.me/919595025757" target="_blank" rel="noopener noreferrer"
                            className="tap-card bg-[#2ecc71] text-white w-14 rounded-xl flex items-center justify-center shadow-md">
                            <MessageSquare size={18} />
                        </a>
                        <a href="tel:+919595025757"
                            className="tap-card bg-[#F4F7F4] border border-gray-100 text-[#0A3D24] w-14 rounded-xl flex items-center justify-center shadow-sm">
                            <Phone size={18} />
                        </a>
                    </div>
                </div>
            )}

        </div>
    );
}