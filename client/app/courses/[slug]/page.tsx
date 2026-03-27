"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight,
  Check,
  FileText,
  Briefcase,
  Building2,
  UserCircle,
  Table as TableIcon,
  ChevronLeft,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { courses, CourseSection } from '@/lib/courses';
import Header from '@/components/common/Header';
import CourseFeaturesCards from '@/components/courses/FeatureCard';
import EnquiryModal from '@/components/common/EnquiryModal';
import ApplyModal from '@/components/courses/ApplyModal';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState('intro');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const course = courses.find(c => c.slug === slug);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCheckingStatus(false);
        return;
      }

      setCheckingStatus(true);
      try {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

        // 1. Check enrollment
        const enrollRes = await fetch(`${backend_url}/api/v2/course/check-enrollment/${slug}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const enrollData = await enrollRes.json();
        if (enrollData.success && enrollData.isEnrolled) {
          setIsEnrolled(true);
        }

        // 2. Check application status
        const appRes = await fetch(`${backend_url}/api/v2/applications/check-status/${slug}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const appData = await appRes.json();
        if (appData.success) {
          setApplication(appData.application);
        }
      } catch (err) {
        console.error("Error fetching status:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    fetchStatus();
  }, [slug]);

  useEffect(() => {
    // Handle hash scrolling on initial load
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }

    const handleScroll = () => {
      const sections = ['intro', ...(course?.sections.slice(1).map(s => s.id) || []), 'features'];
      const scrollPos = window.scrollY + 120;

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h1>
            <p className="text-gray-500 mb-8">The course you are looking for might have been moved or renamed.</p>
            <Link href="/" className="bg-[#2ecc71] text-white px-8 py-3 rounded-md font-bold hover:bg-[#27ae60] transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getIcon = (id: string) => {
    switch (id) {
      case 'intro': return <FileText className="w-5 h-5" />;
      case 'job-roles': return <Briefcase className="w-5 h-5" />;
      case 'industries': return <Building2 className="w-5 h-5" />;
      case 'who-can-apply': return <UserCircle className="w-5 h-5" />;
      case 'features': return <TableIcon className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner Section */}
      <div className="relative h-[350px] md:h-[450px] w-full bg-gray-900 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D24] via-transparent to-transparent opacity-90"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 max-w-7xl">
          <div className="flex items-center gap-3 mb-4 text-white/80 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-white">Our Courses</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#2ecc71] font-bold">{course.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            {course.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-6">
            {course.description.split('.')[0]}. Professional training for a successful career.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="bg-[#13523f] hover:bg-[#1a6e4a] text-white font-extrabold px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-1 inline-block"
            >
              Enquire Now
            </button>

            {isEnrolled ? (
              <Link
                href="/profile/my-courses"
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-extrabold px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-1 inline-block"
              >
                Go to Classroom
              </Link>
            ) : checkingStatus ? (
              <div className="bg-white/10 px-8 py-3.5 rounded-sm animate-pulse text-white/50 font-bold">
                Checking status...
              </div>
            ) : application?.status === 'pending' ? (
              <div className="bg-yellow-500 text-black font-extrabold px-8 py-3.5 rounded-sm shadow-xl flex items-center gap-2 cursor-default">
                <Clock className="w-5 h-5" />
                Application Pending
              </div>
            ) : application?.status === 'reviewed' ? (
              <Link
                href="/profile/my-courses"
                className="bg-[#FDB813] hover:bg-[#E5A511] text-black font-extrabold px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Complete Payment
              </Link>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="bg-[#FDB813] hover:bg-[#E5A511] text-black font-extrabold px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-1 inline-block"
              >
                {application?.status === 'rejected' ? 'Re-apply Now' : 'Apply Now'}
              </button>
            )}
          </div>
        </div>
      </div>



      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">

          {/* Left Sidebar Navigation - Desktop Sticky */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white border-2 border-[#13523f]/20 shadow-2xl rounded-sm overflow-hidden">
                <div className="bg-[#0A3D24] p-5 text-center">
                  <h3 className="text-white font-bold text-sm tracking-wider uppercase">Quick navigation</h3>
                </div>
                <nav>
                  <ul className="flex flex-col">
                    {course.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveSection(section.id);
                          }}
                          className={`flex items-center gap-3 px-5 py-4 text-[13px] font-bold border-b border-gray-100 transition-all group ${activeSection === section.id
                            ? 'bg-[#13523f] text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A3D24]'
                            }`}
                        >
                          <span className={`transition-colors ${activeSection === section.id ? 'text-white' : 'text-[#2ecc71] group-hover:text-[#0A3D24]'}`}>
                            {getIcon(section.id)}
                          </span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                    {course.featuresTable && (
                      <li>
                        <a
                          href="#features"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            setActiveSection('features');
                          }}
                          className={`flex items-center gap-3 px-5 py-4 text-[13px] font-bold transition-all group ${activeSection === 'features'
                            ? 'bg-[#13523f] text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#0A3D24]'
                            }`}
                        >
                          <TableIcon className={`w-5 h-5 transition-colors ${activeSection === 'features' ? 'text-white' : 'text-[#2ecc71] group-hover:text-[#0A3D24]'}`} />
                          Courses & Course Features
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {/* Sidebar Enquiry Widget */}
              <div className="bg-gray-50 p-6 rounded-sm border border-gray-100 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">Request a call back from our career expert.</p>
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full bg-[#0A3D24] hover:bg-black text-white font-bold py-3 rounded-sm transition-colors text-sm uppercase tracking-wide"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content Sections */}
          <main className="lg:col-span-9 space-y-24">

            {/* Dynamic Sections */}
            {course.sections.map((section, sIdx) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-10 bg-[#13523f] rounded-sm"></div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  {section.content && section.content.split('\n\n').map((p, i) => (
                    <p key={i} className="text-lg md:text-xl font-medium text-gray-700/90 leading-[1.8]">
                      {p}
                    </p>
                  ))}

                  {section.list && (
                    <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white p-5 rounded-md border-2 border-gray-50 shadow-sm hover:border-[#13523f]/30 transition-colors group">
                          <span className="flex-shrink-0 w-8 h-8 bg-[#0A3D24] text-white rounded-full flex items-center justify-center text-sm font-black shadow-md group-hover:scale-110 transition-transform">
                            {i + 1}
                          </span>
                          <span className="text-gray-900 font-bold text-lg pt-0.5">{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

              </section>
            ))}

            {/* Course Features Table Area */}
            {course.featuresTable && (
              <section id="features" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-10 bg-[#13523f] rounded-sm"></div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Course & Course Features
                  </h2>
                </div>
                <p className="text-gray-500 font-medium text-center max-w-lg mb-12">
                  Compare our program versions and find the perfect curriculum for your professional goals.
                </p>

                <div className="lg:hidden">
                  <CourseFeaturesCards
                    headers={course.featuresTable.headers}
                    columns={course.featuresTable.columns}
                    enrollHref={`/courses/`}
                  />
                </div>

                <div className="hidden lg:block overflow-x-auto rounded-md border-2 border-gray-100 shadow-2xl">
                  <table className="w-full text-left border-collapse min-w-[1100px]">
                    <thead>
                      <tr className="bg-[#0A3D24] text-white">
                        <th className="p-6 text-sm font-black uppercase tracking-wider border-r border-white/10 w-1/4">
                          Courses & Course Features
                        </th>
                        {course.featuresTable.columns.map((col, i) => (
                          <th
                            key={i}
                            className="p-6 text-sm font-black uppercase tracking-wider border-r border-white/10 w-1/5 text-center last:border-r-0"
                          >
                            <div className="flex flex-col h-full justify-between gap-4">
                              <span>{col.title}</span>
                              <div className="pt-2">
                                <div className="h-0.5 w-8 bg-[#13523f] mx-auto opacity-50"></div>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {course.featuresTable.headers.map((featureLabel, i) => (
                        <tr key={i} className={`transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="p-6 text-[15px] font-bold text-gray-800 border-b border-r border-gray-100 italic">
                            {featureLabel}
                          </td>
                          {course.featuresTable!.columns.map((col, j) => {
                            const val = col.features[i];
                            return (
                              <td key={j} className="p-6 text-sm border-b border-r border-gray-100 last:border-r-0 text-center">
                                {val === 'checkmark' ? (
                                  <div className="flex justify-center">
                                    <div className="w-8 h-8 bg-[#2ecc71]/10 rounded-full flex items-center justify-center">
                                      <Check className="w-5 h-5 text-[#2ecc71] font-black" />
                                    </div>
                                  </div>
                                ) : val === '-' ? (
                                  <span className="text-gray-300 font-black">—</span>
                                ) : (
                                  <span className="font-extrabold text-[#0A3D24] text-base">{val}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 bg-[#13523f]/10 p-8 rounded-md border border-[#13523f]/20 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-[#0A3D24] mb-1">Ready to start your journey?</h3>
                    <p className="text-gray-700 font-medium">Join 5000+ students who have successfully transformed their careers with Spruce.</p>
                  </div>
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="bg-[#0A3D24] hover:bg-black text-white px-10 py-4 rounded-sm font-black transition-all shadow-xl uppercase tracking-wider text-sm whitespace-nowrap inline-block"
                  >
                    Enquire for Admission
                  </button>
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
      {/* ── Other Courses Slider ──────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#13523f]" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Other <span className="font-normal text-gray-600">Courses</span>
              </h2>
            </div>
            <Link href="/courses" className="text-xs font-black text-[#0A3D24] uppercase tracking-widest hover:underline">
              View All
            </Link>
          </div>

          {/* Slider */}
          <OtherCoursesSlider currentSlug={slug as string} />
        </div>
      </section>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        courseTitle={course.title}
        courseSlug={course.slug}
      />


      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultCourseName={course?.title}
      />
    </div>
  );
}

// ── OTHER COURSES SLIDER ──────────────────────────────────────────────────────
function OtherCoursesSlider({ currentSlug }: { currentSlug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const otherCourses = courses.filter(c => c.slug !== currentSlug);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-[#0A3D24] border border-gray-100 transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-[#0A3D24] border border-gray-100 transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {otherCourses.map((c) => (
          <Link
            key={c.slug}
            href={`/courses/${c.slug}`}
            className="group flex-none w-[240px] sm:w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={10} className={i <= 4 ? 'fill-[#13523f] text-[#13523f]' : 'fill-gray-200 text-gray-200'} />
                ))}
              </div>
              <h3 className="text-sm font-black text-gray-900 leading-snug mb-3 group-hover:text-[#0A3D24] transition-colors line-clamp-2">
                {c.title}
              </h3>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
