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
      `}</style>

            {/* ══ TOP BAR ══════════════════════════════════════════════════════════ */}
            <div className="spruce-header bg-gray-950 text-white hidden lg:block border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
                    <div className="flex items-center gap-5">
                        <a href="mailto:sprucelifeskills@gmail.com"
                            className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors">
                            <Mail className="w-3 h-3" />
                            sprucelifeskills@gmail.com
                        </a>
                        <a href="tel:+919595025757"
                            className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors">
                            <Phone className="w-3 h-3" />
                            +91 9595025757
                        </a>
                        <Link href="/faq"
                            className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors">
                            <HelpCircle className="w-3 h-3" />
                            Ask a Question
                        </Link>
                    </div>

                    <div className="flex items-center gap-1">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link href={user?.role === "admin" ? "/admin" : "/profile/my-courses"}
                                    className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1">
                                    {user?.role === "admin"
                                        ? <><LayoutDashboard className="w-3 h-3 text-emerald-400" /> Dashboard</>
                                        : <><BookOpen className="w-3 h-3 text-emerald-400" /> My Courses</>}
                                </Link>
                                {/* Avatar dropdown */}
                                <div className="relative group py-1">
                                    <button className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-[10px] uppercase overflow-hidden">
                                        {user?.avatar
                                            ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                            : (user?.name?.charAt(0) || user?.email?.charAt(0) || "U")}
                                    </button>
                                    <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                                        <div className="w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link href={user?.role === "admin" ? "/admin" : "/profile/my-courses"}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
                                                    {user?.role === "admin" ? <LayoutDashboard size={14} /> : <BookOpen size={14} />}
                                                    {user?.role === "admin" ? "Dashboard" : "My Courses"}
                                                </Link>
                                            </div>
                                            <div className="p-2 border-t border-gray-100">
                                                <button onClick={handleLogout}
                                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <LogOut size={14} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            TOP_BAR_RIGHT.map((link) => (
                                <Link key={link.label} href={link.href}
                                    className="text-[11px] font-medium text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-white/5 transition-all">
                                    {link.label}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ══ MAIN HEADER ══════════════════════════════════════════════════════ */}
            <header className={`spruce-header sticky top-0 left-0 right-0 z-[100] transition-all duration-300
        ${scrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] border-b border-gray-100"
                    : "bg-white border-b border-gray-100"}`}>

                <div className="max-w-7xl mx-auto px-4 xl:px-6 h-[68px] flex items-center justify-between gap-4">

                    {/* ── Logo ── */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                        <img src="/Group 10 (1).svg" alt="Spruce Lifeskills"
                            className="h-10 w-auto object-contain" />
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
                        <a href="tel:+919595025757"
                            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg border border-emerald-200">
                            <Phone className="w-3.5 h-3.5" />
                            Call
                        </a>
                        <button onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu">
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ══ MOBILE DRAWER ════════════════════════════════════════════════════ */}
            {/* Overlay */}
            <div onClick={() => setMobileOpen(false)}
                className={`lg:hidden fixed inset-0 bg-black/40 z-[90] mobile-overlay ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

            {/* Drawer */}
            <div className={`spruce-header lg:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-[95]
                       shadow-2xl mobile-drawer flex flex-col
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
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    {NAV_LINKS.map((link) => (
                        <MobileNavItem key={link.label} link={link} onClose={() => setMobileOpen(false)} />
                    ))}
                </div>

                {/* Contact footer */}
                <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 space-y-2">
                    <a href="tel:+919595025757" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        +91 9595025757
                    </a>
                    <a href="mailto:sprucelifeskills@gmail.com" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        sprucelifeskills@gmail.com
                    </a>
                </div>
            </div>

            {/* ── Enquiry Modal ── */}
            <EnquiryModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
        </>
    );
}