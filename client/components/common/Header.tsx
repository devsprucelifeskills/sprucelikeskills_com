"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Phone, Mail, HelpCircle, ChevronDown, LogOut, X, Menu } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOP_BAR_LINKS = [
    { label: "Ask a Question", href: "/faq", icon: "question" },
    { label: "sprucelifeskills@gmail.com", href: "mailto:sprucelifeskills@gmail.com", icon: "mail" },
    { label: "+91 9595025757", href: "tel:+919595025757", icon: "phone" },
];

const TOP_BAR_RIGHT: { label: string; href: string; external?: boolean }[] = [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
];

const NAV_LINKS = [
    { label: "Home", href: "/" },
    {
        label: "About Us", href: "#",
        children: [
            { label: "Our Journey", href: "/about/journey" },
            { label: "Our Mission & Vision", href: "/about/mission-vision" },
        ],
    },
    {
        label: "Our Courses", href: "#", mega: true,
        children: [
            {
                label: "Medical Coding", href: "/courses/medical-coding",
                children: [
                    { label: "Foundation Medical Coding", href: "/courses/medical-coding-foundation-medical-coding" },
                    { label: "Certified Professional Coder (CPC) Training", href: "/courses/medical-coding-certified-proffesional-coder" },
                    { label: "Advance Diploma in Medical Coding", href: "/courses/medical-coding-advance-diploma-in-medical-coding" },
                    { label: "Post Graduate Diploma in Clinical Research & Medical Coding", href: "/courses/medical-coding-post-graduate-diploma" },
                ],
            },
            {
                label: "Clinical Research", href: "/courses/clinical-research",
                children: [
                    { label: "Post Graduate Diploma (1)", href: "/courses/clinical-research-post-graduate-diploma" },
                    { label: "Advance Diploma in Clinical Research", href: "/courses/clinical-research-advance-diploma" },
                    { label: "Advance Diploma IT ", href: "/courses/clinical-research-advance-diploma-it" },
                    { label: "Diploma (Any One Subject)", href: "/courses/clinical-research-diploma-in-one-subject" },
                ],
            },
            {
                label: "Medical Billing", href: "/courses/medical-billing",
                children: [
                    { label: "Diploma In Medical Billing", href: "/courses/diploma-in-medical-billing" },
                    { label: "Diploma In Coding & Billing", href: "/courses/medical-billing-diploma-in-coding-billing" },

                ],

            },
            {
                label: "Account Receivable", href: "/courses/account-receivable",
                children: [
                    { label: "Diploma In AR", href: "/courses/diploma-in-account-receivable" },
                    { label: "Diploma In AR & Billing", href: "/courses/diploma-in-account-receivable-billing" },

                ],
            },
            { label: "Campus to Corporate", href: "/courses/campus-corporate" },
            { label: "NEP Courses", href: "https://nep.sprucelifeskills.in/", external: true },
        ],
    },
    {
        label: "Blog", href: "/blog",
        children: [
            { label: "Pharmacovigilance", href: "/blog/pharmacovigilance-unsung-hero" },
            { label: "Medical Writing", href: "/blog/day-in-life-medical-writer" },
            { label: "Regulatory Affairs", href: "/blog/navigating-regulatory-affairs" },
            { label: "Clinical Research", href: "/blog/debunking-myths-clinical-data-management" },
            { label: "Medical Coding", href: "/blog/demand-for-medical-coders-increasing" },
        ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Placement", href: "/placement" },
    { label: "Certification", href: "/certification" },
    { label: "NEP Courses", href: "https://nep.sprucelifeskills.in/", external: true, highlight: true },
];

// ─── Dropdown: About ─────────────────────────────────────────────────────────
function AboutDropdown() {
    const aboutLink = NAV_LINKS.find((l) => l.label === "About Us");
    return (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-52 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            <div className="p-1.5">
                {aboutLink?.children?.map((child) => (
                    <Link key={child.label} href={child.href}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all group">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                        {child.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ─── Dropdown: Blog ──────────────────────────────────────────────────────────
function BlogDropdown() {
    return (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-60 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Recent Articles</p>
            </div>
            <div className="p-1.5">
                {NAV_LINKS.find((l) => l.label === "Blog")?.children?.map((blog: any) => (
                    <Link key={blog.label} href={blog.href}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all group">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                        {blog.label}
                    </Link>
                ))}
            </div>
            <div className="px-4 py-2.5 border-t border-gray-100">
                <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
                    View All Posts
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

// ─── Mega: Courses ───────────────────────────────────────────────────────────
function CoursesDropdown() {
    const courses = NAV_LINKS.find((l) => l.label === "Our Courses")?.children ?? [];
    return (
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 w-[600px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
            {/* Header band */}
            <div className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-white/90">Our Programmes</p>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                    {courses.length} Courses
                </span>
            </div>
            {/* Grid */}
            <div className="p-4 grid grid-cols-2 gap-1">
                {courses.map((course: any) => (
                    <div key={course.label}>
                        <Link href={course.href}
                            {...(course.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-emerald-50 transition-all group">
                            <div className="mt-0.5 w-7 h-7 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center shrink-0 transition-colors">
                                <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors leading-snug">{course.label}</p>
                                {course.children && (
                                    <p className="text-xs text-gray-400 mt-0.5">{course.children.length} modules</p>
                                )}
                            </div>
                        </Link>
                        {course.children?.map((sub: any) => (
                            <Link key={sub.label} href={sub.href}
                                className="block ml-[52px] text-xs text-gray-500 hover:text-emerald-600 transition-colors py-0.5 -mt-1 mb-1">
                                ↳ {sub.label}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
            {/* CTA footer */}
            <div className="mx-4 mb-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-4 py-3 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-emerald-800">🎓 Industry-Recognised Certifications</p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">AAPC · AHIMA · ICH-GCP accredited</p>
                </div>
                <Link href="/courses" className="text-xs bg-[#13523f] hover:bg-[#1a6e4a] text-white font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                    All Courses →
                </Link>
            </div>
        </div>
    );
}

// ─── Mobile Nav Item ─────────────────────────────────────────────────────────
function MobileNavItem({ link, onClose }: { link: any; onClose: () => void }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-gray-50 last:border-0">
            <div className="flex items-center justify-between py-1">
                <Link href={link.href} onClick={!link.children ? onClose : undefined}
                    className={`flex-1 py-2.5 text-sm font-semibold ${link.highlight ? "text-emerald-600" : "text-gray-800"}`}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {link.label}
                </Link>
                {link.children && (
                    <button onClick={() => setOpen(!open)} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    </button>
                )}
            </div>
            {link.children && open && (
                <div className="pb-2 pl-4 border-l-2 border-emerald-100 ml-1 space-y-0.5">
                    {link.children.map((child: any) => (
                        <div key={child.label}>
                            <Link href={child.href} onClick={onClose}
                                className="block py-2 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                                {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                                {child.label}
                            </Link>
                            {child.children?.map((sub: any) => (
                                <Link key={sub.label} href={sub.href} onClick={onClose}
                                    className="block pl-3 py-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                                    ↳ {sub.label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main Header ─────────────────────────────────────────────────────────────
export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [demoOpen, setDemoOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const closeTimer = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            if (storedUser && token) setUser(JSON.parse(storedUser));
            else setUser(null);
        };
        checkUser();
        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveDropdown(label);
    };
    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => setActiveDropdown(null), 180);
    };

    const isActive = (link: any) =>
        pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .spruce-header { font-family: 'Plus Jakarta Sans', sans-serif; }
        .nav-pill-indicator {
          position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%; background: #059669;
          opacity: 0; transition: opacity 0.2s;
        }
        .nav-item-active .nav-pill-indicator,
        .nav-item:hover .nav-pill-indicator { opacity: 1; }
        .dropdown-enter { animation: dropdownIn 0.18s ease forwards; }
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-drawer { transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s; }
        .mobile-overlay { transition: opacity 0.3s; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* ══ TOP BAR ══════════════════════════════════════════════════════════ */}
            <div className={`spruce-header relative lg:sticky top-0 z-[101] transition-all duration-300 ${scrolled ? 'lg:bg-transparent lg:border-transparent lg:pointer-events-none bg-white border-b border-gray-100' : 'bg-white border-b border-gray-100 pointer-events-auto'}`}>
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-2 flex items-center justify-between">

                    {/* LEFT SIDE: Logo and Accreditation Text (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="/" className={`flex-shrink-0 inline-block pointer-events-auto transition-transform duration-300 origin-top-left ${scrolled ? 'translate-y-[4px] lg:-translate-y-[10px]' : ''}`}>
                            <img src="/Group 10 (1).svg" alt="Spruce Lifeskills" className="h-[60px] xl:h-[68px] w-auto object-contain" />
                        </Link>
                        <div className={`flex items-center gap-4 transition-opacity duration-300 ${scrolled ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
                            <div className="h-10 w-px bg-gray-200" />
                            <div className="flex flex-col justify-center">
                                <p className="text-[13px] font-extrabold text-[#111827] tracking-tight uppercase whitespace-nowrap">
                                    Authorized Education Partner
                                </p>
                                <p className="text-[11px] font-bold text-emerald-600 tracking-[0.1em] uppercase mt-0.5 whitespace-nowrap">
                                    Skill • Empower • Excel
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE / MOBILE FULL: Partner Logos */}
                    <div className={`flex items-center justify-between lg:justify-end gap-2 md:gap-3 lg:gap-6 w-full lg:w-auto transition-all duration-300 ${scrolled ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
                        <img src="/partner-logo/AAPC logo.png" alt="AAPC" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[28%] object-contain" />
                        <img src="/partner-logo/Lifelong Learning.png" alt="Lifelong Learning" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[22%] object-contain" />
                        <img src="/partner-logo/RTMNU logo.png" alt="RTMNU" className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto max-w-[22%] object-contain" />
                        <img src="/partner-logo/Final_ISO_Grey-2015-Registered-sign.png" alt="MSME" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[22%] object-contain" />
                    </div>
                </div>
            </div>

            {/* ══ MAIN HEADER ══════════════════════════════════════════════════════ */}
            <header className={`spruce-header transition-all duration-300 sticky top-0 left-0 right-0 z-[100] flex flex-col shadow-sm
        ${scrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] border-b border-gray-100"
                    : "bg-white border-b border-gray-100"}`}>

                <div className="max-w-7xl mx-auto w-full px-4 xl:px-6 h-[68px] flex items-center justify-between gap-4">

                    {/* ── Logo (Visible on Mobile, Placeholder on Desktop) ── */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 lg:opacity-0 lg:pointer-events-none">
                        <img src="/Group 10 (1).svg" alt="Spruce Lifeskills"
                            className="h-[52px] md:h-[60px] w-auto object-contain" />
                    </Link>

                    {/* ── Desktop Nav (floating pill strip) ── */}
                    <nav className="hidden lg:flex items-center">
                        {/* Pill container */}
                        <div className="flex items-center gap-0.5 bg-gray-50 rounded-full px-2 py-1.5 border border-gray-200/80 shadow-inner">
                            {NAV_LINKS.filter((l) => !l.highlight).map((link) => (
                                <div key={link.label} className="relative nav-item"
                                    onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                                    onMouseLeave={link.children ? handleMouseLeave : undefined}>
                                    <Link href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        className={`relative flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-200
                      ${isActive(link)
                                                ? "bg-white text-emerald-700 shadow-sm"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm"
                                            } ${activeDropdown === link.label ? "bg-white text-gray-900 shadow-sm" : ""}`}>
                                        {link.label}
                                        {link.children && (
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                                        )}
                                    </Link>

                                    {/* Dropdowns */}
                                    {link.children && activeDropdown === link.label && (
                                        <div className="dropdown-enter">
                                            {link.label === "Blog" ? <BlogDropdown />
                                                : link.mega ? <CoursesDropdown />
                                                    : <AboutDropdown />}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* NEP Courses — standalone accent pill */}
                        {NAV_LINKS.filter((l) => l.highlight).map((link) => (
                            <Link key={link.label} href={link.href}
                                target="_blank" rel="noopener noreferrer"
                                className="ml-2 flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold
                           bg-[#13523f] hover:bg-[#1a6e4a]
                           text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Right actions (desktop) ── */}
                    <div className="hidden lg:flex items-center gap-2">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link href={user?.role === "admin" ? "/admin" : "/profile/my-courses"}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-emerald-700
                             px-3 py-2 rounded-xl hover:bg-emerald-50 transition-all">
                                    {user?.role === "admin"
                                        ? <><LayoutDashboard size={15} className="text-emerald-600" /> Dashboard</>
                                        : <><BookOpen size={15} className="text-emerald-600" /> My Courses</>}
                                </Link>
                                <div className="relative group">
                                    <button className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500
                                     flex items-center justify-center text-white font-bold text-sm shadow-md
                                     uppercase overflow-hidden border-2 border-white ring-2 ring-emerald-100">
                                        {user?.avatar
                                            ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                            : (user?.name?.charAt(0) || "U")}
                                    </button>
                                    <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                                        <div className="w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link href={user?.role === "admin" ? "/admin" : "/profile/my-courses"}
                                                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700
                                     hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors">
                                                    {user?.role === "admin" ? <LayoutDashboard size={15} /> : <BookOpen size={15} />}
                                                    {user?.role === "admin" ? "Dashboard" : "My Courses"}
                                                </Link>
                                            </div>
                                            <div className="p-2 border-t border-gray-100">
                                                <button onClick={handleLogout}
                                                    className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium
                                     text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                                    <LogOut size={15} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login"
                                    className="text-sm font-semibold text-gray-700 hover:text-emerald-700 px-4 py-2
                             rounded-xl hover:bg-gray-100 transition-all">
                                    Login
                                </Link>
                                <Link href="/register"
                                    className="text-sm font-bold text-white px-5 py-2.5 rounded-xl
                             bg-[#13523f] hover:bg-[#1a6e4a] shadow-md hover:shadow-lg transition-all">
                                    Register Free →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ── Mobile actions ── */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6 text-emerald-800" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ══ MOBILE DRAWER ════════════════════════════════════════════════════ */}
            {/* Overlay */}
            <div onClick={() => setMobileOpen(false)}
                className={`lg:hidden fixed inset-0 bg-black/40 z-[90] mobile-overlay ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

            {/* Drawer */}
            <div className={`spruce-header lg:hidden fixed top-0 right-0 h-[100dvh] w-80 max-w-[90vw] bg-white z-[95]
                       shadow-2xl mobile-drawer flex flex-col pb-[72px]
                       ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>

                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-teal-600">
                    <img src="/Group 10.svg" alt="Spruce" className="h-8 w-auto object-contain brightness-0 invert" />
                    <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Auth strip */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500
                              flex items-center justify-center text-white font-bold uppercase overflow-hidden shrink-0">
                                {user?.avatar
                                    ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    : (user?.name?.charAt(0) || "U")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/login" onClick={() => setMobileOpen(false)}
                                className="flex-1 border border-gray-200 text-gray-800 text-sm font-bold py-2.5 rounded-xl text-center hover:border-emerald-400 hover:text-emerald-700 transition-all">
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setMobileOpen(false)}
                                className="flex-1 bg-gray-900 text-white text-sm font-bold py-2.5 rounded-xl text-center hover:bg-gray-800 transition-colors">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Nav items */}
                <div className="flex-1 overflow-y-auto min-h-0 px-4 py-3 overscroll-contain">
                    {NAV_LINKS.map((link) => (
                        <MobileNavItem key={link.label} link={link} onClose={() => setMobileOpen(false)} />
                    ))}
                </div>

                {/* User Action (Admin/My Courses) */}
                <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-2">
                    {user ? (
                        <Link href={user.role === "admin" ? "/admin" : "/profile/my-courses"} onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 w-full text-sm font-bold text-emerald-800 bg-emerald-100/50 border border-emerald-200 
                                     px-4 py-3 rounded-xl hover:bg-emerald-100 transition-colors">
                            {user.role === "admin" ? (
                                <><LayoutDashboard size={18} className="text-emerald-700" /> Go to Dashboard</>
                            ) : (
                                <><BookOpen size={18} className="text-emerald-700" /> My Courses</>
                            )}
                        </Link>
                    ) : (
                        <Link href="/login" onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 w-full text-sm font-bold text-gray-700 bg-white border border-gray-200 
                                     px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <LayoutDashboard size={18} className="text-gray-400" />
                            Login to Dashboard
                        </Link>
                    )}
                </div>
            </div>

            {/* ── Enquiry Modal ── */}
            <EnquiryModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
        </>
    );
}