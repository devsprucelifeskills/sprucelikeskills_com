
import { Award } from 'lucide-react';
import Link from 'next/link';

export function TrustSection() {
  return (
    <section id="trust" className="bg-white border-y border-gray-100">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto text-center">

          {/* Top label */}
          <div className="w-full">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#13523f]">
              THE NEW RULEBOOK FOR YOUR CAREER
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold font-serif text-[#111827] leading-tight">
              Turn a Mandate into Your Momentum
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
              The National Education Policy (NEP 2020) isn't just a policy change—it's your opportunity to get ahead. We provide the university-approved skill courses that satisfy academic requirements and give you a real advantage in the job market.
            </p>
          </div>

          {/* Card */}
          <div className="border border-gray-200 bg-white rounded-xl p-10 w-full max-w-2xl shadow-sm">
            <div className="flex flex-col items-center gap-5 text-center">
              <Award className="h-14 w-14 text-[#13523f]" />
              <div>
                <p className="text-sm font-bold tracking-[0.18em] uppercase text-[#13523f]">
                  FULFILLING THE NEP 2020 VISION
                </p>
                <p className="mt-4 text-base text-gray-600 leading-relaxed">
                  The NEP 2020 framework requires all higher education students to earn a significant portion of their credits from skill-based learning outside their university. Our RTMNU-approved courses are specifically designed to fulfill this mandate, making your degree more powerful and relevant.
                </p>
                <Link
                  href="https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-base font-bold text-[#111827] hover:text-[#13523f] transition-colors"
                >
                  Read the Official NEP 2020 Updates
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
