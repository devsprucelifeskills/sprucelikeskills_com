"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Zap,
  Lock,
  ArrowLeft,
  Star,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { courses } from '@/lib/courses';
import Header from '@/components/common/Header';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function PurchasePage() {
  const { slug } = useParams();
  const router = useRouter();
  const course = courses.find(c => c.slug === slug);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Authentication and user state
  const [user, setUser] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Check enrollment status from backend
      const checkEnrollment = async () => {
        try {
          const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
          const res = await fetch(`${backend_url}/api/v2/course/check-enrollment/${slug}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success && data.isEnrolled) {
            setIsEnrolled(true);
          }
        } catch (err) {
          console.error("Error checking enrollment:", err);
        }
      };

      checkEnrollment();
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Course not found</h1>
            <Link href="/" className="bg-[#2ecc71] text-white px-8 py-3 rounded-md font-bold hover:bg-[#27ae60] transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const finalAmount = course.discountPrice || course.price;
  const savings = course.discountPrice ? course.price - course.discountPrice : 0;
  const savingsPercentage = course.discountPrice ? Math.round((savings / course.price) * 100) : 0;

  const handleEnrollment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

      // 1. Create Order on Backend
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const createOrderRes = await fetch(`${backend_url}/api/v2/course/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user._id,
          courseId: course.slug,
          courseTitle: course.title,
          amount: finalAmount
        })
      });

      const orderData = await createOrderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const { id: order_id, amount, currency } = orderData.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_R5gCrNT8A2UC58",
        amount: amount,
        currency: currency,
        name: "Spruce Life Skills",
        description: `Apply for ${course.title}`,
        order_id: order_id,
        handler: async function (response: any) {
          await handlePaymentSuccess(response, order_id);
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0A3D24",
        },
      };

      if (!(window as any).Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setError(response.error.description);
        setIsLoading(false);
      });
      rzp.open();

    } catch (err: any) {
      console.error("Payment Error:", err);
      setError(err.message || "An error occurred during payment initialization");
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse: any, orderId: string) => {
    try {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const token = localStorage.getItem('token');

      // 3. Verify Payment on Backend
      const res = await fetch(`${backend_url}/api/v2/course/enroll-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature
        })
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        // Automatically redirect to My Courses after success
        setTimeout(() => {
          router.push('/profile/my-courses');
        }, 3000);
      } else {
        throw new Error(data.message || "Application verification failed");
      }
    } catch (err: any) {
      setError(err.message || "Error confirming enrollment. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
          <div className="w-24 h-24 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-[#2ecc71]" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Application Successful!</h1>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Congratulations! You have successfully applied for <strong>{course.title}</strong>.
            Redirecting you to <strong>My Courses</strong>...
          </p>
          <div className="animate-pulse flex items-center justify-center gap-2 text-[#0A3D24] font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            Preparing your dashboard
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <ScrollReveal animation="fade-in">
          <div className="mb-8">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center text-sm font-bold text-[#0A3D24] hover:text-[#2ecc71] transition-colors gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Course Details
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-10">
            <ScrollReveal animation="fade-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2ecc71]/10 text-[#2ecc71] text-xs font-black uppercase tracking-wider rounded-full">
                  <Zap className="w-3 h-3 fill-current" />
                  Limited Time Offer
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  Checkout for <span className="text-[#0A3D24]">{course.title}</span>
                </h1>
                <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
                  Take the first step towards a rewarding career in healthcare. Join our professional training program and get industry-ready.
                </p>
              </div>
            </ScrollReveal>

            {error && (
              <ScrollReveal animation="fade-in">
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 font-bold">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  What's included in this course
                  <div className="flex-1 h-[2px] bg-gray-50"></div>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Industry Recognized Certificate",
                    "Spruce® LMS Access",
                    "AAPC Study Material",
                    "650+ Practice Questions",
                    "Regular Mock Tests",
                    "Placement Support",
                    "Expert Faculty Guidance",
                    "Interview Preparation"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2ecc71] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-[#0A3D24]/5 rounded-2xl border border-[#0A3D24]/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden" aria-hidden="true">
                      <img src={`https://i.pravatar.cc/150?u=${course.slug}${i}`} alt="" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-[#13523f] flex items-center justify-center text-[10px] font-black text-white">
                    +5k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#13523f] text-[#13523f]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#0A3D24]">Joined by over 5,000 students worldwide</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ScrollReveal animation="slide-right">
              <div className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="h-48 w-full relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-[#13523f] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Application Open
                    </span>
                  </div>
                </div>

                <div className="p-8 md:p-10 space-y-8">
                  <div className="space-y-2">
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Amount</div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-black text-gray-901">
                        ₹{finalAmount.toLocaleString()}
                      </span>
                      {course.discountPrice && (
                        <span className="text-xl text-gray-400 line-through font-bold">
                          ₹{course.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {course.discountPrice && (
                      <div className="text-[#2ecc71] text-sm font-extrabold bg-[#2ecc71]/10 inline-block px-3 py-1 rounded-lg">
                        You save ₹{savings.toLocaleString()} ({savingsPercentage}%)
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">100% Secure Transaction</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Certified Program</div>
                    </div>
                  </div>

                  <button
                    onClick={isEnrolled ? () => router.push('/profile/my-courses') : handleEnrollment}
                    disabled={isLoading}
                    className="w-full bg-[#0A3D24] hover:bg-black disabled:bg-gray-400 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-wider shadow-2xl shadow-[#0A3D24]/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : isEnrolled ? (
                      <>
                        Go to My Courses
                        <ChevronRight className="w-6 h-6" />
                      </>
                    ) : (
                      <>
                        Proceed to Apply
                        <ChevronRight className="w-6 h-6" />
                      </>
                    )}
                  </button>

                  <div className="text-center space-y-4">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" />
                      Guaranteed Safe Checkout
                    </p>
                    <div className="flex justify-center gap-4 grayscale opacity-50">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
}
