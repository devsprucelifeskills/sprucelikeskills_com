import React from 'react';
import { FileText, Globe, GraduationCap, Play } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

const features = [
  {
    title: 'University\nCertification',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop',
    icon: FileText,
  },
  {
    title: 'Global\nRecognition',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    icon: Globe,
  },
  {
    title: 'National Education\nPolicy (NEP)\nCredits.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop',
    icon: GraduationCap,
  },
  {
    title: 'Software Based\nLearning',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop',
    icon: Play,
  },
];

export default function FeatureCards() {
  return (
    <></>
    // <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    //     {features.map((feature, idx) => {
    //       const Icon = feature.icon;
    //       return (
    //         <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
    //           <div
    //             className="group relative flex flex-col bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-2 h-full z-20"
    //           >
    //             {/* Image Section */}
    //             <div className="relative h-48 w-full overflow-hidden">
    //               <img
    //                 src={feature.image}
    //                 alt={feature.title.replace('\n', ' ')}
    //                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    //               />
    //             </div>

    //             {/* Icon Overlay */}
    //             <div className="absolute left-1/2 top-48 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg z-10">
    //               <Icon className="h-7 w-7 text-gray-700" strokeWidth={2} />
    //             </div>

    //             {/* Text Section */}
    //             <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 pb-8 pt-12 text-center">
    //               <h3 className="whitespace-pre-line text-lg font-extrabold leading-tight text-gray-900 md:text-xl">
    //                 {feature.title}
    //               </h3>
    //             </div>
    //           </div>
    //         </ScrollReveal>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
