import React from 'react';
import { Award, BookOpen, Medal, UserCheck } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '../common/ScrollReveal';

const features = [
  {
    title: 'Industry Recognized\nCertification',
    description: 'We provide AAPC Certification. We are Authorized Education Partner of AAPC in central India',
    icon: Award,
    iconColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderCol: 'border-red-200'
  },
  {
    title: 'Access to Exclusive\nResources',
    description: 'We provide resourses like Books, Video Lectures, Exam, Mock test.',
    icon: BookOpen,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderCol: 'border-blue-200'
  },
  {
    title: 'Professional Credibility',
    description: '',
    icon: Medal,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderCol: 'border-green-200'
  },
  {
    title: 'Support and Guidance',
    description: '',
    icon: UserCheck,
    iconColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderCol: 'border-yellow-200'
  },
];

export default function AuthorizedPartner() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column - Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal animation="slide-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] leading-tight mb-2">
                Authorized Education Partner <br className="hidden sm:block" />
                <span className="text-[#0A3D24] font-medium">of AAPC in central India</span>
              </h2>

              <h3 className="mt-8 text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                Risk free certification with spruce
              </h3>

              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                Being an AAPC partner means having exclusive access to high quality
                healthcare training and certification programs recognized and valued by
                global companies, creating way for you to secure rewarding careers in the
                healthcare industry.
              </p>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block bg-[#eab308] text-black font-bold text-sm px-8 py-3.5 hover:bg-[#ca8a04] transition-colors rounded-sm shadow-sm"
                >
                  Read More
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                    <div className="flex flex-col items-start">
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 ${feature.borderCol} ${feature.bgColor}`}>
                        <Icon className={`h-7 w-7 ${feature.iconColor}`} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 whitespace-pre-line leading-snug">
                        {feature.title}
                      </h4>
                      {feature.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
