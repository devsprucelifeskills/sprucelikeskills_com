"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const TOP_BAR_LINKS = [
    { label: "Ask a Question", href: "/faq" },
    { label: "sprucelifeskills@gmail.com", href: "mailto:sprucelifeskills@gmail.com" },
];

const TOP_BAR_RIGHT: { label: string; href: string; external?: boolean }[] = [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" }
];

const NAV_LINKS = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "#",
        children: [
            { label: "Our Journey", href: "/about/journey" },
            { label: "Our Mission & Vision", href: "/about/mission-vision" },
        ],
    },
    {
        label: "Our Courses",
        href: "#",
        mega: true,
        children: [
            {
                label: "Medical Coding",
                href: "/courses/medical-coding",
                children: [
                    { label: "Foundation Medical Coding", href: "/courses/medical-coding#foundation" },
                    { label: "Certified Professional Coder (CPC) Training", href: "/courses/medical-coding#cpc" },
                ],
            },
            { label: "Clinical Research", href: "/courses/clinical-research" },
            { label: "Medical Billing", href: "/courses/medical-billing" },
            { label: "Account Receivable", href: "/courses/account-receivable" },
            { label: "Campus to Corporate", href: "/courses/campus-corporate" },
            { label: "NEP Courses", href: "https://nep.sprucelifeskills.in/", external: true },
        ],
    },
    {
        label: "Blog",
        href: "/blog",
        children: [
            { label: "Pharmacovigilance", href: "/blog/pharmacovigilance-unsung-hero" },
            { label: "Medical Writing", href: "/blog/day-in-life-medical-writer" },
            { label: "Regulatory Affairs", href: "/blog/navigating-regulatory-affairs" },
            { label: "Clinical Research", href: "/blog/debunking-myths-clinical-data-management" },
            { label: "Medical Coding", href: "/blog/demand-for-medical-coders-increasing" },
        ]
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Placement", href: "/placement" },
    { label: "Certification", href: "/certification" },
    {
        label: "NEP Courses",
        href: "https://nep.sprucelifeskills.in/",
        external: true,
        highlight: true,
    },
];


// ─── Mega / Dropdown Menu ─────────────────────────────────────────────────────

function BlogDropdown() {
    return (
        <div
            className="absolute top-full left-0 mt-0 z-50
                    bg-white shadow-xl rounded-b-xl border-t-2 border-[#2ecc71]
                    w-64 py-2"
        >
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2ecc71]">Recent Articles</p>
            </div>
            {NAV_LINKS.find((l) => l.label === "Blog")?.children?.map((blog: any) => (
                <Link
                    key={blog.label}
                    href={blog.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0fdf4] hover:text-[#2ecc71] transition-colors font-medium border-l-2 border-transparent hover:border-[#2ecc71]"
                >
                    {blog.label}
                </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-50 px-4 pb-1">
                <Link href="/blog" className="text-xs font-bold text-gray-400 hover:text-[#2ecc71] flex items-center gap-1 group">
                    View All Posts
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

function CoursesDropdown() {
    return (
        <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-0 z-50
                    bg-white shadow-2xl rounded-b-2xl border-t-4 border-[#2ecc71]
                    w-[580px] p-6 grid grid-cols-2 gap-x-6 gap-y-1"
        >
            <div className="col-span-2 mb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2ecc71]">Our Courses</p>
            </div>
            {NAV_LINKS.find((l) => l.label === "Our Courses")?.children?.map((course: any) => (
                <div key={course.label} className="mb-2">
                    <Link
                        href={course.href}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#2ecc71] transition-colors group"
                        {...(course.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] group-hover:scale-125 transition-transform" />
                        {course.label}
                    </Link>
                    {course.children?.map((sub: any) => (
                        <Link
                            key={sub.label}
                            href={sub.href}
                            className="block ml-4 mt-1 text-xs text-gray-500 hover:text-[#2ecc71] transition-colors"
                        >
                            ↳ {sub.label}
                        </Link>
                    ))}
                </div>
            ))}
            {/* Decorative image panel */}
            <div className="col-span-2 mt-2 rounded-xl overflow-hidden h-24 bg-gradient-to-r from-[#2ecc71]/20 to-[#27ae60]/30 flex items-center justify-center">
                <span className="text-sm text-[#2ecc71] font-semibold opacity-70">
                    🎓 Industry-Recognized Healthcare Certifications
                </span>
            </div>
        </div>
    );
}

function AboutDropdown() {
    const aboutLink = NAV_LINKS.find((l) => l.label === "About Us");
    return (
        <div
            className="absolute top-full left-0 mt-0 z-50
                    bg-white shadow-xl rounded-b-xl border-t-2 border-[#2ecc71]
                    w-48 py-2"
        >
            {aboutLink?.children?.map((child) => (
                <Link
                    key={child.label}
                    href={child.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0fdf4] hover:text-[#2ecc71] transition-colors font-medium border-l-2 border-transparent hover:border-[#2ecc71]"
                >
                    {child.label}
                </Link>
            ))}
        </div>
    );
}

// ─── Mobile Nav Item ──────────────────────────────────────────────────────────

function MobileNavItem({ link }: { link: any }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex items-center justify-between">
                <Link
                    href={link.href}
                    className={`block py-2 text-sm font-medium ${link.highlight ? "text-[#2ecc71]" : "text-gray-800"}`}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                    {link.label}
                </Link>
                {link.children && (
                    <button onClick={() => setOpen(!open)} className="p-1 text-gray-400 hover:text-[#2ecc71]">
                        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
            </div>
            {link.children && open && (
                <div className="pl-4 border-l-2 border-[#2ecc71]/30 ml-2 space-y-1">
                    {link.children.map((child: any) => (
                        <div key={child.label}>
                            {child.href ? (
                                <Link
                                    href={child.href}
                                    className="block py-1 text-sm text-gray-600 hover:text-[#2ecc71]"
                                    {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    {child.label}
                                </Link>
                            ) : (
                                <p className="py-1 text-xs font-bold text-gray-400 uppercase tracking-wide">{child.label}</p>
                            )}
                            {child.children?.map((sub: any) => (
                                <Link key={sub.label} href={sub.href} className="block pl-3 py-1 text-xs text-gray-500 hover:text-[#2ecc71]">
                                    {sub.label}
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

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();
        // Add listener for login/logout events if needed, but for now check on mount
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile nav on resize
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
        closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    return (
        <>
            {/* ── Top Bar ───────────────────────────────────────────────── */}
            <div className="bg-[#1a1a2e] text-white text-xs hidden lg:block">
                <div className="max-w-7xl mx-auto px-4 xl:px-6 flex items-center justify-between h-9">
                    {/* Left */}
                    <div className="flex items-center gap-5">
                        {TOP_BAR_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-1.5 text-gray-300 hover:text-[#2ecc71] transition-colors"
                            >
                                {link.label === "Ask a Question" && (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {link.label.includes("@") && (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                )}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setDemoOpen(true)}
                            className="bg-[#2ecc71] hover:bg-[#27ae60] text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors mr-3"
                        >
                            Book Free Demo Class
                        </button>

                        {user ? (
                            <>
                                <Link
                                    href="/profile/my-courses"
                                    className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded flex items-center gap-2"
                                >
                                    <BookOpen size={12} className="text-[#2ecc71]" />
                                    My Courses
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded flex items-center gap-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            TOP_BAR_RIGHT.map((link, i) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    className={`px-3 py-1.5 text-xs font-medium transition-colors rounded
                                    ${link.label === "Fee Payment"
                                            ? "bg-[#2ecc71]/20 text-[#2ecc71] hover:bg-[#2ecc71] hover:text-white"
                                            : "text-gray-300 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Header ───────────────────────────────────────────── */}
            <header
                className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300
          ${scrolled
                        ? "bg-white shadow-lg shadow-black/5"
                        : "bg-white border-b border-gray-100"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 xl:px-6 flex items-center justify-between h-16 lg:h-[70px]">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        {/* Replace src with your actual logo paths */}
                        {/* <div className="flex items-center gap-2.5"> */}
                        {/* Fallback text logo — swap <img> tag when logo assets are available */}
                        {/* <div className="w-9 h-9 rounded-lg bg-[#2ecc71] flex items-center justify-center shadow-md">
                                <span className="text-white font-black text-lg leading-none">S</span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-[15px] font-extrabold text-gray-900 leading-tight">Spruce</p>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest -mt-0.5">Lifeskills</p>
                            </div>
                        </div> */}
                        <img
                            src={scrolled ? "Spruse Logo.png" : "Spruse Logo.png"}
                            alt="Spruce Lifeskills"
                            className="h-10 w-auto object-contain"
                        />

                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                        {NAV_LINKS.map((link) => (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                                onMouseLeave={link.children ? handleMouseLeave : undefined}
                            >
                                <Link
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-[13px] font-semibold rounded-md transition-all
                    ${link.highlight
                                            ? "text-[#2ecc71] bg-[#f0fdf4] hover:bg-[#2ecc71] hover:text-white"
                                            : "text-gray-700 hover:text-[#2ecc71] hover:bg-[#f0fdf4]"
                                        }
                    ${activeDropdown === link.label ? "text-[#2ecc71] bg-[#f0fdf4]" : ""}
                  `}
                                >
                                    {link.label}
                                    {link.children && (
                                        <svg
                                            className={`w-3 h-3 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </Link>

                                {/* Dropdown */}
                                {link.children && activeDropdown === link.label && (
                                    link.label === "Blog" ? <BlogDropdown /> : (link.mega ? <CoursesDropdown /> : <AboutDropdown />)
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        {/* Book Demo — desktop shortcut */}
                        <button
                            onClick={() => setDemoOpen(true)}
                            className="hidden lg:inline-flex items-center gap-1.5 bg-[#2ecc71] hover:bg-[#27ae60] active:scale-95
                         text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md shadow-[#2ecc71]/30 transition-all"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book Free Demo
                        </button>

                        {/* Phone — mobile CTA */}
                        <a
                            href="tel:+919595025757"
                            className="lg:hidden flex items-center gap-1 bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-bold px-3 py-2 rounded-lg"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            Call Us
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Mobile Nav Drawer ───────────────────────────────────── */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-gray-100
            ${mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="bg-white px-4 pt-3 pb-5 overflow-y-auto max-h-[75vh] divide-y divide-gray-50">
                        {/* Mobile top actions */}
                        <div className="flex flex-wrap items-center gap-2 pb-3">
                            <button
                                onClick={() => { setDemoOpen(true); setMobileOpen(false); }}
                                className="flex-1 min-w-[140px] bg-[#2ecc71] text-white text-xs font-bold py-2.5 rounded-lg text-center"
                            >
                                Book Free Demo Class
                            </button>
                            {user ? (
                                <>
                                    <Link
                                        href="/profile/my-courses"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 min-w-[140px] border border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg text-center hover:border-[#2ecc71] hover:text-[#2ecc71]"
                                    >
                                        My Courses
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                                        className="flex-1 min-w-[140px] bg-red-600 text-white text-xs font-bold py-2.5 rounded-lg text-center"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 min-w-[70px] border border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg text-center"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 min-w-[70px] bg-gray-800 text-white text-xs font-bold py-2.5 rounded-lg text-center"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Nav items */}
                        <div className="pt-3 space-y-1">
                            {NAV_LINKS.map((link) => (
                                <MobileNavItem key={link.label} link={link} />
                            ))}
                        </div>

                        {/* Contact info */}
                        <div className="pt-4 space-y-1.5">
                            <a href="tel:+919595025757" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2ecc71]">
                                <svg className="w-4 h-4 text-[#2ecc71]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                +91 9595025757
                            </a>
                            <a href="mailto:sprucelifeskills@gmail.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2ecc71]">
                                <svg className="w-4 h-4 text-[#2ecc71]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                sprucelifeskills@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Enquiry Modal ────────────────────────────────────────────── */}
            <EnquiryModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
        </>
    );
}