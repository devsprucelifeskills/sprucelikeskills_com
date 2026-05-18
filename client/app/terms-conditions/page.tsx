import Header from "@/components/common/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Spruce Life Skills",
  description: "Read the terms and conditions for using Spruce Life Skills website, enrolling in courses, and making payments.",
};

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-0">
        <section className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Terms &amp; Conditions</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">Please read these terms carefully before using our website or enrolling in any of our courses.</p>
              <p className="text-sm text-white/60 mt-4 font-medium">Last Updated: May 18, 2025</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              <div>
                <p className="text-gray-700 leading-relaxed">These Terms &amp; Conditions govern your use of <strong>sprucelifeskills.com</strong> and services offered by Spruce Life Skills, located at 3rd Floor, Navprabhat Chambers, Besides ICICI Bank, Ramdaspeth, Nagpur – 440010. By accessing or using our Website, you agree to be bound by these Terms.</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">1.</span>Use of the Website</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>You must be at least 18 years of age, or have parental consent, to use this Website and enroll in courses.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>You agree to provide accurate and complete information during registration and keep your account details updated.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>You agree not to use the Website for any unlawful, harmful, or unauthorized purpose.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">2.</span>Course Enrollment &amp; Payments</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>All course fees are in <strong>Indian Rupees (INR)</strong> and inclusive of applicable taxes unless stated otherwise.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Payment must be completed through our authorized payment gateway. We accept UPI, credit/debit cards, net banking, and other supported methods.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Upon successful payment, you will receive a confirmation via email/SMS with enrollment details.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>We reserve the right to change course fees at any time. Changes will not affect already confirmed enrollments.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">3.</span>Intellectual Property</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>All content — including text, graphics, logos, course materials, videos, and images — is the property of Spruce Life Skills and protected by copyright laws.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>You may not reproduce, distribute, modify, or create derivative works without our prior written consent.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Course materials are for personal educational use only and must not be shared, resold, or distributed.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">4.</span>User Conduct</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-4">By using our Website and services, you agree not to:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Upload, share, or transmit any harmful, offensive, or illegal content.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Attempt to gain unauthorized access to any part of the Website or our systems.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Interfere with or disrupt the operation of the Website.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Misrepresent your identity or impersonate another person.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">5.</span>Certifications &amp; Placements</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Spruce Life Skills provides placement assistance but does not guarantee employment or job placement.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Certification exams (e.g., AAPC CPC) are conducted by third-party organizations. We are not responsible for exam results or certification issuance.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Course completion certificates are issued upon meeting attendance and assessment criteria.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">6.</span>Limitation of Liability</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Spruce Life Skills shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or services.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>We do not guarantee uninterrupted or error-free access to the Website.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Our total liability shall not exceed the amount paid by you for the specific course in question.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">7.</span>Governing Law</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">These Terms shall be governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Nagpur, Maharashtra</strong>.</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">8.</span>Changes to These Terms</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">We reserve the right to update these Terms at any time. Updated Terms will be posted on this page with a revised date. Continued use of the Website constitutes acceptance of revised Terms.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0f4c32] text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">Have Questions About Our Terms?</h2>
              <p className="text-lg text-white/90">Feel free to reach out if you need clarification on any part of these Terms &amp; Conditions.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <a href="mailto:sprucelifeskills@gmail.com" className="bg-white text-[#13523f] font-bold py-3 px-8 rounded-lg hover:bg-white/90 transition-all transform hover:scale-105 duration-300">Email Us</a>
                <a href="tel:+919595025757" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-all transform hover:scale-105 duration-300">Call +91-9595025757</a>
              </div>
              <p className="text-sm text-white/60 pt-4">Spruce Life Skills, 3rd Floor, Navprabhat Chambers, Besides ICICI Bank, Ramdaspeth, Nagpur – 440010</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
