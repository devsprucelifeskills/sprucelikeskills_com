"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ScrollReveal from '@/components/common/ScrollReveal';
import {
  BookOpen,
  Clock,
  ChevronRight,
  Loader2,
  BookMarked,
  LayoutDashboard,
  Video,
  AlertCircle
} from 'lucide-react';

interface Enrollment {
  _id: string;
  courseId: string;
  courseTitle: string;
  createdAt: string;
  amount: number;
}

interface MeetingInfo {
  link: string;
  startTime: string;
  courseTitle: string;
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [meetings, setMeetings] = useState<Record<string, MeetingInfo | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
        const res = await fetch(`${backend_url}/api/v2/course/my-courses`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (data.success) {
          setEnrollments(data.enrollments);
          // Fetch meeting info for each course
          fetchMeetingsInfo(data.enrollments);
        } else {
          throw new Error(data.message || "Failed to fetch courses");
        }
      } catch (err: any) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMeetingsInfo = async (enrolls: Enrollment[]) => {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const token = localStorage.getItem('token');

      const meetingMap: Record<string, MeetingInfo | null> = {};

      await Promise.all(enrolls.map(async (course) => {
        try {
          const res = await fetch(`${backend_url}/api/v2/course/meeting/${course.courseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          meetingMap[course.courseId] = data.success ? data.meeting : null;
        } catch (err) {
          console.error(`Error fetching meeting for ${course.courseId}:`, err);
          meetingMap[course.courseId] = null;
        }
      }));

      setMeetings(meetingMap);
    };

    fetchMyCourses();
  }, [router]);

  const handleStartMeeting = (courseId: string) => {
    const meeting = meetings[courseId];
    if (!meeting) return;

    const startTime = new Date(meeting.startTime);
    const now = new Date();

    // Allow 15 minutes early entry
    const entryBuffer = 15 * 60 * 1000;

    if (now.getTime() >= (startTime.getTime() - entryBuffer)) {
      window.open(meeting.link, '_blank');
    } else {
      const timeStr = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = startTime.toLocaleDateString([], { day: '2-digit', month: 'short' });
      setActiveAlert(`The class is scheduled to start at ${timeStr} on ${dateStr}. Please join then.`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-[#0A3D24] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">My Courses</h1>
              <p className="text-gray-600 font-medium">Manage your learning journey and access your enrolled programs.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A3D24] text-white rounded-xl font-bold hover:bg-black transition-all"
            >
              <LayoutDashboard size={20} />
              Go to Dashboard
            </Link>
          </div>
        </ScrollReveal>

        {error && (
          <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold mb-8">
            {error}
          </div>
        )}

        {enrollments.length === 0 ? (
          <ScrollReveal animation="fade-up">
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookMarked size={40} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't started any courses yet. Explore our popular programs and start learning today!
              </p>
              <Link
                href="/#courses"
                className="inline-flex items-center gap-2 bg-[#2ecc71] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-[#27ae60] transition-all shadow-lg shadow-[#2ecc71]/20"
              >
                Explore Courses
                <ChevronRight size={20} />
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((course, idx) => (
              <ScrollReveal key={course._id} animation="fade-up" delay={idx * 100}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="p-8 space-y-6">
                    <div className="w-14 h-14 bg-[#0A3D24]/5 rounded-2xl flex items-center justify-center text-[#0A3D24] group-hover:bg-[#0A3D24] group-hover:text-white transition-colors">
                      <BookOpen size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                        {course.courseTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-bold">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          Enrolled: {new Date(course.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 space-y-3">
                      {meetings[course.courseId] && (
                        <button
                          onClick={() => handleStartMeeting(course.courseId)}
                          className="w-full flex items-center justify-center gap-2 bg-[#2ecc71] text-white p-4 rounded-xl font-bold transition-all hover:bg-[#27ae60] shadow-md shadow-[#2ecc71]/20 group/meeting"
                        >
                          <Video size={18} className="group-hover/meeting:scale-110 transition-transform" />
                          Start Meeting
                        </button>
                      )}
                      <Link
                        href={`/courses/${course.courseId}`}
                        className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-bold transition-all group/btn text-gray-700"
                      >
                        Go to Course
                        <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </main>

      {/* Alert Portal */}
      {activeAlert && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <ScrollReveal animation="fade-up">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100">
              <div className="w-16 h-16 bg-[#13523f]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#13523f]">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Class Not Started</h3>
              <p className="text-gray-600 mb-8 font-medium">
                {activeAlert}
              </p>
              <button
                onClick={() => setActiveAlert(null)}
                className="w-full bg-[#0A3D24] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
              >
                Understood
              </button>
            </div>
          </ScrollReveal>
        </div>
      )}
    </div>
  );
}
