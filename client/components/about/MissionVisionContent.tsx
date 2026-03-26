import React from "react";
import { CheckCircle2, History, TrendingUp, Sparkles } from "lucide-react";

const impactPoints = [
  {
    title: "Bridging the Gap",
    desc: "Closing the distance between industry needs and current education standards through specialized training.",
    icon: Sparkles,
  },
  {
    title: "Industry Success",
    desc: "Over 100 placements in 2023, launchpad for careers in top IT and pharma companies.",
    icon: TrendingUp,
  },
  {
    title: "Legacy of Change",
    desc: "Transforming lives through innovation and empathy, breaking cycles of poverty through secure careers.",
    icon: History,
  },
  {
    title: "Quality Excellence",
    desc: "Commitment to theoretical and high-quality live onsite technical training by industry veterans.",
    icon: CheckCircle2,
  }
];

export default function MissionVisionContent() {
  return (
    <section className="py-24 sm:py-32 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-50 rounded-full blur-3xl opacity-60" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Building Careers in <span className="text-[#13523f]">Health Sciences</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Spruce has a strong record in launching careers in health sciences, with alums thriving as lab technicians, healthcare assistants, and data analysts. Graduates commend Spruce for its practical training and industry insights.
            </p>
            <div className="space-y-4">
              {["ISO Certified Training", "100+ Placements in 2023", "Expert-led Curriculum", "Real-world Practical Focus"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {impactPoints.map((point, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-[#13523f] hover:-translate-y-1 transition-all duration-300"
              >
                <point.icon className="w-8 h-8 text-emerald-600 group-hover:text-white mb-4 transition-colors" />
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">{point.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-emerald-50 transition-colors leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Section */}
        <div className="mt-24 rounded-[2rem] bg-[#0A3D24] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">A Journey of Empowerment & Transformation</h3>
            <p className="text-slate-300 text-lg leading-relaxed italic">
              "From humble beginnings to becoming an internationally recognised institution, the Spruce story is a testament to passion, innovation, and perseverance. Every milestone reflects a story of hard work, vision, and a commitment to touching lives through excellence."
            </p>
            <div className="mt-10 inline-flex flex-wrap justify-center gap-8 border-t border-slate-800 pt-10">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">100+</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Placements</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">15+</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Years Legacy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">AAPC</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">Authorized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
