"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import ScrollReveal from '@/components/common/ScrollReveal';
import Script from 'next/script';

import {
  BookOpen,
  Clock,
  ChevronRight,
  Loader2,
  BookMarked,
  LayoutDashboard,
  Video,
  AlertCircle,
  DollarSign,
  XCircle,
  CheckCircle2,
  Trash2,
  FileText
} from 'lucide-react';


interface Enrollment {
  _id: string;
  courseId: string;
  courseTitle: string;
  createdAt: string;
  amount: number;
}



interface EMIInstallment {
  _id: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid';
  paidAt?: string;
}

interface EMIEnrollment {
  _id: string;
  courseTitle: string;
  courseSlug: string;
  payableAmount: number;
  installments: EMIInstallment[];
  isBlocked: boolean;
  status: 'active' | 'awaiting-payment' | 'completed' | 'cancelled';
  createdAt: string;
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
  const [emiEnrollments, setEmiEnrollments] = useState<EMIEnrollment[]>([]);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [showEMISchedule, setShowEMISchedule] = useState<EMIEnrollment | null>(null);


  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
        
        // Fetch one-time enrollments
        const res = await fetch(`${backend_url}/api/v2/course/my-courses`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setEnrollments(data.enrollments);
          fetchMeetingsInfo(data.enrollments);
        }

        // Fetch EMI-based enrollments
        const emiRes = await fetch(`${backend_url}/api/v2/enrollments/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const emiData = await emiRes.json();
        if (emiData.success) {
          setEmiEnrollments(emiData.enrollments);
        }

        // Fetch Applications
        const appRes = await fetch(`${backend_url}/api/v2/applications/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const appData = await appRes.json();
        if (appData.success) {
          // Hide rejected applications and those that already have enrollments
          const filteredApps = appData.applications.filter((app: any) => 
            app.status !== 'rejected' && 
            !(data.enrollments || []).some((e: any) => e.courseId === app.courseSlug) &&
            !(emiData.enrollments || []).some((e: any) => e.courseSlug === app.courseSlug)
          );
          setUserApplications(filteredApps);
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

  const handleInstallmentPayment = async (enrollmentId: string, installmentId: string, amount: number) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

      // 1. Create order
      const orderRes = await fetch(`${backend_url}/api/v2/enrollments/${enrollmentId}/installments/${installmentId}/create-order`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.message);

      // 2. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R5gCrNT8A2UC58",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Spruce Life Skills",
        description: "Installment Payment",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // 3. Verify payment
          const verifyRes = await fetch(`${backend_url}/api/v2/enrollments/${enrollmentId}/installments/${installmentId}/verify-payment`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful!");
            window.location.reload();
          } else {
            alert("Payment verification failed: " + verifyData.message);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#0A3D24" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err.message || "Payment initialization failed");
    } finally {
      setIsLoading(false);
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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

        {enrollments.length === 0 && emiEnrollments.length === 0 && userApplications.length === 0 ? (
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

                      {/* EMI Status for one-time (not applicable here, but for completeness) */}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            {/* EMI Enrollments */}
            {emiEnrollments.map((enrollment, idx) => (
              <ScrollReveal key={enrollment._id} animation="fade-up" delay={(enrollments.length + idx) * 100}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
                  {enrollment.isBlocked && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <AlertCircle size={32} />
                      </div>
                      <h4 className="text-xl font-black text-gray-900 mb-2">Access Blocked</h4>
                      <p className="text-sm text-gray-600 font-medium mb-4">Please contact admin or complete pending payments to regain access.</p>
                      <button 
                        onClick={() => setShowEMISchedule(enrollment)}
                        className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 shadow-md shadow-red-500/20"
                      >
                        <DollarSign size={16} />
                        Pay Overdue Amount
                      </button>
                    </div>
                  )}

                  {enrollment.status === 'awaiting-payment' && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 bg-[#FDB813]/10 text-[#0A3D24] rounded-2xl flex items-center justify-center mb-4">
                        <DollarSign size={32} />
                      </div>
                      <h4 className="text-xl font-black text-gray-900 mb-2">Payment Required</h4>
                      <p className="text-sm text-gray-500 font-medium mb-6">Pay your first installment to activate this course and gain access.</p>
                      <button 
                        onClick={() => setShowEMISchedule(enrollment)}
                        className="bg-[#0A3D24] text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2"
                      >
                        <DollarSign size={16} />
                        Pay Now to Enroll
                      </button>
                    </div>
                  )}

                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-[#FDB813]/10 rounded-2xl flex items-center justify-center text-[#FDB813]">
                        <BookOpen size={28} />
                      </div>
                      <span className="px-3 py-1 bg-[#FDB813] text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                        {enrollment.status === 'awaiting-payment' ? 'Pending Activation' : 'EMI Plan'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                        {enrollment.courseTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-bold">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 space-y-3">
                      <button
                        onClick={() => setShowEMISchedule(enrollment)}
                        className="w-full flex items-center justify-center gap-2 bg-[#FDB813] text-black p-4 rounded-xl font-bold transition-all hover:bg-[#E5A511] shadow-md shadow-[#FDB813]/20"
                      >
                        <DollarSign size={18} />
                        View Payment Schedule
                      </button>
                      
                      <button
                        onClick={() => handleStartMeeting(enrollment.courseSlug)}
                        disabled={enrollment.isBlocked}
                        className="w-full flex items-center justify-center gap-2 bg-[#2ecc71] text-white p-4 rounded-xl font-bold transition-all hover:bg-[#27ae60] shadow-md shadow-[#2ecc71]/20 disabled:opacity-50"
                      >
                        <Video size={18} />
                        Start Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Applications */}
            {userApplications.map((app, idx) => (
              <ScrollReveal key={app._id} animation="fade-up" delay={(enrollments.length + emiEnrollments.length + idx) * 100}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative border-dashed border-2">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                        <FileText size={28} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {app.status === 'reviewed' ? 'Accepted' : 'Applied'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                        {app.courseTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 font-bold">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {app.status === 'reviewed' ? 'Status: Approved' : 'Status: Under Review'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 space-y-3">
                      {app.status === 'reviewed' ? (
                        <div className="p-4 bg-green-50 rounded-xl mb-4">
                          <p className="text-xs font-bold text-green-700 leading-tight">
                            Your application is approved! Please wait for the admin to set up your EMI plan, or check back soon to complete your payment.
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 bg-blue-50 rounded-xl mb-4">
                          <p className="text-xs font-bold text-blue-700 leading-tight">
                            We've received your application. Our admissions team is currently reviewing your profile.
                          </p>
                        </div>
                      )}
                      
                      <Link
                        href={`/courses/${app.courseSlug}`}
                        className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-bold transition-all group/btn text-gray-700"
                      >
                        View Course Details
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

      {/* EMI Schedule Modal */}
      {showEMISchedule && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setShowEMISchedule(null)}
              className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
            >
              <XCircle size={24} />
            </button>

            <div className="p-10 md:p-12">
              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 bg-[#FDB813]/10 text-[#FDB813] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  Payment History & Schedule
                </span>
                <h3 className="text-3xl font-black text-gray-900 leading-tight">
                  {showEMISchedule.courseTitle}
                </h3>
                <p className="text-gray-500 mt-2 font-medium">Total Payable: <span className="text-[#0A3D24] font-black">₹{showEMISchedule.payableAmount.toLocaleString()}</span></p>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {showEMISchedule.installments.map((inst, idx) => (
                  <div key={inst._id} className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${inst.status === 'paid' ? 'bg-[#2ecc71]/10 text-[#2ecc71]' : 'bg-[#FDB813]/10 text-[#FDB813]'}`}>
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-lg font-black text-gray-900">₹{inst.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase">Due Date: {new Date(inst.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {inst.status === 'paid' ? (
                      <div className="text-right">
                        <span className="px-3 py-1 bg-[#2ecc71]/10 text-[#2ecc71] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 size={12} /> Paid
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 font-bold">{new Date(inst.paidAt || '').toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <Clock size={12} /> Pending
                        </span>
                        <button 
                          onClick={() => handleInstallmentPayment(showEMISchedule._id, inst._id, inst.amount)}
                          className="mt-2 block text-[#0A3D24] text-[10px] font-black uppercase tracking-widest hover:underline disabled:opacity-50"
                          disabled={isLoading}
                        >
                          Pay Now
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
