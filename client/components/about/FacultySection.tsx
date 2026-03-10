import React from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function FacultySection() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-base/7 font-semibold text-blue-600 uppercase tracking-widest mb-2">Our Foundation</h2>
          <p className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
            Expert Faculty & Leadership
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-16">
            Spruce consists of a dedicated team of experienced professionals with many combined years' of experience within specialized industries, training, consulting, and management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Industry Veterans",
              desc: "Dedicated team including doctors and industry experts with over 5 years of experience.",
              icon: Briefcase,
              accent: "bg-blue-600"
            },
            {
              title: "Expert Guidance",
              desc: "Providing skilled manpower to clinical research & medical coding industries through specialized mentorship.",
              icon: GraduationCap,
              accent: "bg-indigo-600"
            },
            {
              title: "Quality Training",
              desc: "Comprehensive theoretical and quality live onsite technical training for all students.",
              icon: Award,
              accent: "bg-emerald-600"
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 text-left border border-white">
              <div className={`w-12 h-12 rounded-2xl ${item.accent} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
