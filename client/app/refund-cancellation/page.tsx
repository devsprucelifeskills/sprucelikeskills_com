import Header from "@/components/common/Header";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Spruce Life Skills",
  description:
    "Read the refund and cancellation policy of Spruce Life Skills. Understand the terms for course fee refunds, cancellation process, and timelines.",
};

export default function RefundCancellationPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Refund &amp; Cancellation Policy
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                We want you to be fully satisfied with your learning experience.
                Please review our refund and cancellation terms below.
              </p>
              <p className="text-sm text-white/60 mt-4 font-medium">
                Last Updated: May 18, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <p className="text-gray-700 leading-relaxed text-base">
                  At Spruce Life Skills, we are dedicated to providing
                  high-quality training and education in Medical Coding,
                  Clinical Research, Medical Billing, and related healthcare
                  fields. This Refund &amp; Cancellation Policy applies to all
                  course enrollments and payments made through our website{" "}
                  <strong>sprucelifeskills.com</strong>.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">1.</span>
                  Cancellation Policy
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Students may request cancellation of their course
                      enrollment by contacting us via email at{" "}
                      <a
                        href="mailto:sprucelifeskills@gmail.com"
                        className="text-[#13523f] font-bold hover:underline"
                      >
                        sprucelifeskills@gmail.com
                      </a>{" "}
                      or by calling{" "}
                      <a
                        href="tel:+919595025757"
                        className="text-[#13523f] font-bold hover:underline"
                      >
                        +91-9595025757
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Cancellation requests must be raised{" "}
                      <strong>within 7 days</strong> of enrollment or before the
                      commencement of the batch, whichever is earlier.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Cancellation requests received after the batch has
                      commenced or after the 7-day window will not be eligible
                      for a refund.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">2.</span>
                  Refund Policy
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Refund requests will be processed only if the cancellation
                      is made within the eligible window as described above.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Approved refunds will be processed within{" "}
                      <strong>7–10 business days</strong> from the date of
                      approval.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      The refund will be credited back to the original payment
                      method (bank account, UPI, credit/debit card) used during
                      the transaction.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      A processing fee or administrative charge of up to{" "}
                      <strong>10%</strong> of the course fee may be deducted
                      from the refund amount.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">3.</span>
                  Non-Refundable Scenarios
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refunds will <strong>not</strong> be provided in the following
                  cases:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      The student has attended more than{" "}
                      <strong>2 classes or sessions</strong> of the enrolled
                      course.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Course materials, study kits, or digital resources have
                      already been accessed or downloaded.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      The cancellation request is raised after the specified
                      cancellation window.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Fees paid for certification exams, registration, or
                      third-party examination charges (e.g., AAPC exams).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      Promotional or discounted course fees and special offers.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">4.</span>
                  Course Transfer
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  If you are unable to continue with your enrolled course, you
                  may request a one-time transfer to a different batch of the
                  same course, subject to availability. Course transfers to a
                  different program may be considered on a case-by-case basis
                  and may involve additional charges if there is a fee
                  difference.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">5.</span>
                  Failed or Duplicate Transactions
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  In the event of a failed transaction where the amount has been
                  debited from your account, the amount will automatically be
                  refunded to your source account within{" "}
                  <strong>5–7 business days</strong>. If you experience a
                  duplicate charge, please contact us immediately and we will
                  initiate the refund for the extra payment.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">6.</span>
                  How to Request a Refund
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To initiate a refund or cancellation, please contact us with
                  the following details:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-2 text-gray-700">
                  <p>
                    <strong>1.</strong> Full Name (as provided during
                    registration)
                  </p>
                  <p>
                    <strong>2.</strong> Registered Email Address or Phone Number
                  </p>
                  <p>
                    <strong>3.</strong> Course Name and Batch Details
                  </p>
                  <p>
                    <strong>4.</strong> Transaction ID / Payment Reference Number
                  </p>
                  <p>
                    <strong>5.</strong> Reason for Cancellation / Refund
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">7.</span>
                  Changes to This Policy
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Spruce Life Skills reserves the right to modify this Refund
                  &amp; Cancellation Policy at any time. Updated terms will be
                  posted on this page. We recommend reviewing this policy
                  periodically for any changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-[#0f4c32] text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Need Help with a Refund?
              </h2>
              <p className="text-lg text-white/90">
                If you have any questions about our refund or cancellation
                process, our team is here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a
                  href="mailto:sprucelifeskills@gmail.com"
                  className="bg-white text-[#13523f] font-bold py-3 px-8 rounded-lg hover:bg-white/90 transition-all transform hover:scale-105 duration-300"
                >
                  Email Us
                </a>
                <a
                  href="tel:+919595025757"
                  className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 duration-300"
                >
                  Call +91-9595025757
                </a>
              </div>
              <p className="text-sm text-white/60 pt-4">
                Spruce Life Skills, 3rd Floor, Navprabhat Chambers, Besides
                ICICI Bank, Ramdaspeth, Nagpur – 440010
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
