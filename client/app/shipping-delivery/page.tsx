import Header from "@/components/common/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Spruce Life Skills",
  description: "Understand how Spruce Life Skills delivers courses, study materials, and certificates. Learn about digital access timelines and physical dispatch policies.",
};

export default function ShippingDeliveryPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-0">
        <section className="bg-gradient-to-br from-[#0f4c32] to-[#126B41] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Shipping &amp; Delivery Policy</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">Learn about how we deliver our courses, study materials, and certificates to our students.</p>
              <p className="text-sm text-white/60 mt-4 font-medium">Last Updated: May 18, 2025</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              <div>
                <p className="text-gray-700 leading-relaxed">Spruce Life Skills primarily provides educational services including classroom-based and online training programs. This Shipping &amp; Delivery Policy outlines how our services and materials are delivered to enrolled students.</p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">1.</span>Digital Course Access</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Upon successful payment and enrollment confirmation, access to course materials and online resources will be provided within <strong>24–48 hours</strong>.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Login credentials and batch details will be shared via email and/or SMS to the registered contact information.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Digital course materials including study notes, presentations, and reference documents will be accessible through your student account.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">2.</span>Classroom-Based Training</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>For classroom-based courses, training is delivered at our center: <strong>3rd Floor, Navprabhat Chambers, Besides ICICI Bank, Ramdaspeth, Nagpur – 440010</strong>.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Batch schedules, timings, and venue details will be communicated upon enrollment confirmation.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Physical study materials (if applicable) will be provided on the first day of the batch or during orientation.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">3.</span>Certificates</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span><strong>Digital Certificates:</strong> Course completion certificates will be issued digitally via email within <strong>7–15 business days</strong> after successful course completion and meeting all assessment criteria.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span><strong>Physical Certificates:</strong> If physical certificates are provided, they will be dispatched via courier to the address provided during registration within <strong>15–30 business days</strong> of course completion.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Students must ensure their registered address is accurate and complete to avoid delivery issues.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">4.</span>Study Materials &amp; Kits</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>If any physical study materials, books, or kits are included in the course package, they will be handed over at the training center or shipped to the student&apos;s registered address.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Shipping of physical materials within India typically takes <strong>7–14 business days</strong> depending on the location.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>Shipping charges, if applicable, will be communicated at the time of enrollment.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">5.</span>Delays &amp; Issues</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>While we strive to deliver all services and materials on time, delays may occur due to unforeseen circumstances.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>In case of any delay or issue with delivery, please contact us and we will resolve it at the earliest.</span></li>
                  <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-[#13523f] mt-2 shrink-0"></span><span>We are not responsible for delays caused by incorrect addresses, courier service disruptions, or force majeure events.</span></li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-start gap-3"><span className="text-[#13523f]">6.</span>No Physical Shipping for Digital Services</h2>
                <div className="w-12 h-0.5 bg-[#13523f]/20 mb-6"></div>
                <p className="text-gray-700 leading-relaxed">Since Spruce Life Skills primarily offers training and educational services, most of our deliverables are digital or classroom-based. No physical shipping is involved for course access, online training sessions, or digital study materials.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0f4c32] text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">Questions About Delivery?</h2>
              <p className="text-lg text-white/90">If you have any concerns about accessing your course or receiving materials, contact our team.</p>
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
