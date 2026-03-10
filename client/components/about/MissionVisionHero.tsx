import React from "react";
import { Target, Eye, Rocket } from "lucide-react";

export default function MissionVisionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 mb-6 group hover:bg-blue-100 transition-colors">
            <Rocket className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Our Purpose</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Empowering Through <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Excellence</span>
          </h1>
          <p className="text-lg leading-8 text-gray-600 mb-10">
            At Spruce Lifeskills, we are dedicated to bridging the global skills gap, fostering a culture of innovation, and building careers that transform lives.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2">
          {/* Mission Card */}
          <div className="relative group p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed relative">
              To empower individuals and businesses by delivering innovative, sustainable, and high-quality solutions. We bridge the gap between industry demand and traditional education, providing skilled manpower to the clinical research and medical coding industries.
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative group p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed relative">
              We envision a future where healthcare organizations heavily invest in Central India due to the availability of customized, trained manpower. This collaboration will create more opportunities and empower the region's workforce, contributing to the growth of society and the nation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
