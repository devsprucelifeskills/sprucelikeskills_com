import React from 'react';
import { Award, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    name: 'First in Central India',
    description: 'We remain the first institute offering combined training in clinical research & medical coding in a single program.',
    icon: Award,
  },
  {
    name: 'Exclusive AAPC Partner',
    description: "Central India's only authorized education partner of AAPC, ensuring globally recognized standards.",
    icon: ShieldCheck,
  },
  {
    name: 'Proven Success',
    description: 'We boast an incredibly high placement rate, with over 100 placements achieved in 2023 alone.',
    icon: TrendingUp,
  },
  {
    name: 'Expert Faculty',
    description: 'Our dedicated team includes doctors and industry experts with over 5 years of practical experience.',
    icon: Users,
  },
]

export default function AboutHighlights() {
  return (
    <div className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-[#13523f] uppercase tracking-wider">Why Spruce?</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:balance">
            Setting the standard for excellence
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            We don't just teach, we build careers. Here's why students from across the country choose us.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start hover:scale-105 transition-transform duration-300">
                <div className="rounded-xl bg-[#13523f]/10 p-4 ring-1 ring-inset ring-[#13523f]/20 shadow-sm flex items-center justify-center">
                  <feature.icon aria-hidden="true" className="size-8 text-[#13523f]" />
                </div>
                <dt className="mt-6 font-semibold text-gray-900 text-xl">
                  {feature.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
