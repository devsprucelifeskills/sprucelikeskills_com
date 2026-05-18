import Header from "@/components/common/Header";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Spruce Life Skills",
  description:
    "Learn how Spruce Life Skills collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Your privacy is important to us. This policy outlines how we
                collect, use, and safeguard your personal information.
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
                  Spruce Life Skills (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;) is committed to protecting the privacy of all
                  users who visit our website{" "}
                  <strong>sprucelifeskills.com</strong> or enroll in our courses
                  and training programs. This Privacy Policy explains what
                  information we collect, how we use it, and your rights
                  regarding your personal data.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">1.</span>
                  Information We Collect
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect the following types of information when you
                  interact with our website, register for courses, or make
                  payments:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Personal Information:</strong> Name, email
                      address, phone number, date of birth, postal address, and
                      educational qualifications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Payment Information:</strong> Billing details,
                      transaction IDs, and payment method information (processed
                      securely via our payment gateway partner).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Technical Information:</strong> IP address,
                      browser type, device information, and cookies for website
                      analytics and performance improvement.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Enquiry Information:</strong> Any details you
                      provide when submitting enquiry forms or contacting us via
                      phone, email, or WhatsApp.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">2.</span>
                  How We Use Your Information
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To process course registrations, admissions, and payments.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To communicate with you regarding your courses, schedules,
                      certifications, and placements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To respond to your enquiries and provide customer support.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To send you updates about new courses, offers, and events
                      (you may opt out at any time).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To improve our website, services, and user experience
                      through analytics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      To comply with legal obligations and prevent fraudulent
                      activities.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">3.</span>
                  Cookies &amp; Tracking Technologies
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our website uses cookies and similar tracking technologies
                  (such as Google Analytics and Google Ads) to analyze traffic,
                  personalize content, and serve relevant advertisements. You can
                  manage cookie preferences through your browser settings.
                  Disabling cookies may affect certain features of the website.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">4.</span>
                  Data Sharing &amp; Third Parties
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do <strong>not</strong> sell, trade, or rent your personal
                  information to third parties. However, we may share your data
                  with:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Payment Gateway Providers:</strong> For secure
                      processing of online transactions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Certification Partners:</strong> Such as AAPC or
                      other authorized bodies for certification and examination
                      purposes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Legal Authorities:</strong> When required by law,
                      court order, or to protect our legal rights.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">5.</span>
                  Data Security
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  We implement industry-standard security measures to protect
                  your personal information, including SSL encryption, secure
                  servers, and access controls. While we strive to protect your
                  data, no method of transmission over the internet is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">6.</span>
                  Your Rights
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Access:</strong> You can request a copy of the
                      personal data we hold about you.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Correction:</strong> You can request corrections
                      to any inaccurate or incomplete data.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Deletion:</strong> You can request deletion of
                      your data, subject to legal and contractual obligations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span>
                    <span>
                      <strong>Opt-out:</strong> You can unsubscribe from
                      marketing communications at any time.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">7.</span>
                  Third-Party Links
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party websites or
                  services. We are not responsible for the privacy practices of
                  these external sites. We encourage you to read their privacy
                  policies before providing any personal information.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3">
                  <span className="text-[#13523f] font-black">8.</span>
                  Changes to This Policy
                </h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to update this Privacy Policy at any
                  time. Any changes will be posted on this page with an updated
                  &quot;Last Updated&quot; date. We encourage you to review this
                  policy periodically.
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
                Questions About This Policy?
              </h2>
              <p className="text-lg text-white/90">
                If you have any questions or concerns about our Privacy Policy,
                please contact us.
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
