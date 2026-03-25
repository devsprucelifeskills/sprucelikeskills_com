import React from 'react';
import Header from "@/components/common/Header";
import Link from 'next/link';
import { Award, BookOpen, ShieldCheck, HeadphonesIcon, Play, Users, Briefcase, GraduationCap, Building2 } from 'lucide-react';
import StudentTestimonials from "@/components/about/StudentTestimonials";

export const metadata = {
    title: "Our Journey | Spruce Lifeskills",
    description: "Learn more about the journey of Spruce Lifeskills, Central India's leading institute for Medical Coding and Clinical Research.",
};

export default function JourneyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Page Banner */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1a1a2e] overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773397443/sjos9fqxb27jnlpeyo4e.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent"></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
                        Our Journey
                    </h1>
                    <div className="flex justify-center items-center gap-2 text-sm md:text-base font-medium text-gray-300">
                        <Link href="/" className="hover:text-[#13523f] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#13523f]">About Us</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 -mt-10 relative z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#13523f] group-hover:text-white transition-colors duration-300 shadow-md">
                                <Award size={32} />
                            </div>
                            <h5 className="text-lg font-bold text-gray-900 leading-tight">Industry Recognized Certification</h5>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#13523f] group-hover:text-white transition-colors duration-300 shadow-md">
                                <BookOpen size={32} />
                            </div>
                            <h5 className="text-lg font-bold text-gray-900 leading-tight">Access to Exclusive Resources</h5>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#13523f] group-hover:text-white transition-colors duration-300 shadow-md">
                                <ShieldCheck size={32} />
                            </div>
                            <h5 className="text-lg font-bold text-gray-900 leading-tight">Professional Credibility</h5>
                        </div>
                        {/* Feature 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#13523f] group-hover:text-white transition-colors duration-300 shadow-md">
                                <HeadphonesIcon size={32} />
                            </div>
                            <h5 className="text-lg font-bold text-gray-900 leading-tight">Support and Guidance</h5>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-sm font-bold tracking-widest text-[#13523f] uppercase mb-3">Our Story</h2>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                                Pioneering the path for healthcare professionals.
                            </h3>
                            <div className="w-20 h-1.5 bg-[#13523f] mb-8 rounded-full"></div>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium text-justify">
                                Since 2008, we've pioneered the way, introducing medical coding to Nagpur and becoming the sole AAPC-authorized partner. With a relentless commitment to quality, our ISO-certified institute has transformed countless careers, with our graduates sought after by hospitals, pharmaceutical leaders, and top IT companies.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer inline-block w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
                                    alt="Team sharing ideas"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 aspect-video lg:aspect-square"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center pl-1 text-[#13523f] hover:scale-110 hover:bg-white transition-all shadow-lg border border-white/20 hover:border-white">
                                        <Play size={28} fill="currentColor" />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(#13523f_3px,transparent_3px)] [background-size:20px_20px] opacity-30 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white max-w-5xl mx-auto group">
                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                        <img
                            src="https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773397149/tlhveo1xirgfrltksxrm.png"
                            alt="Spruce Lifeskills Timeline"
                            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                        />

                        {/* Decorative blur elements behind the container */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#13523f]/20 to-[#13523f]/20 blur-2xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-20 bg-[#13523f] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2669&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                                <Users className="text-white/40" size={36} />
                            </div>
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 flex items-center justify-center tracking-tight">
                                3,788<span className="text-[#13523f] ml-1">+</span>
                            </h4>
                            <p className="text-white/80 font-bold uppercase tracking-wider text-sm mt-3">Students Trusted Us</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                                <Building2 className="text-[#2ecc71]" size={36} />
                            </div>
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 flex items-center justify-center tracking-tight">
                                32<span className="text-[#13523f] ml-1">+</span>
                            </h4>
                            <p className="text-white/80 font-bold uppercase tracking-wider text-sm mt-3">Recruitment Partners</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                                <Briefcase className="text-[#2ecc71]" size={36} />
                            </div>
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 flex items-center justify-center tracking-tight">
                                100<span className="text-[#13523f] ml-1">+</span>
                            </h4>
                            <p className="text-white/80 font-bold uppercase tracking-wider text-sm mt-3">Yearly Placements</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                                <GraduationCap className="text-[#2ecc71]" size={36} />
                            </div>
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 flex items-center justify-center tracking-tight">
                                20<span className="text-[#13523f] ml-1">+</span>
                            </h4>
                            <p className="text-white/80 font-bold uppercase tracking-wider text-sm mt-3">Experienced Faculty</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About CTA & Why Choose Us */}
            <section className="py-20 lg:py-28 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="bg-[#1a1a2e] rounded-[2rem] p-10 md:p-16 lg:px-24 text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden mb-20 group">
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#13523f]/40 to-[#13523f]/40 mix-blend-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
                        </div>
                        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight drop-shadow-sm">
                                We introduced Medical Coding to Central India
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-medium max-w-2xl">
                                and remain the first institute offering combined training in clinical research & medical coding in a single program.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#13523f] hover:bg-[#1a6e4a] text-white font-black uppercase tracking-wider text-sm rounded-xl transition-all shadow-lg shadow-[#13523f]/30 hover:shadow-[#13523f]/50 hover:-translate-y-1">
                                Join Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
                        <div className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-20 h-20 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#13523f]/10">
                                <Award size={36} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Exclusive AAPC Partner</h3>
                            <p className="text-gray-600 font-medium leading-relaxed max-w-xs mx-auto">Central India's only authorized education partner of AAPC.</p>
                        </div>
                        <div className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-20 h-20 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#13523f]/10">
                                <Briefcase size={36} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Proven Success</h3>
                            <p className="text-gray-600 font-medium leading-relaxed max-w-xs mx-auto">With over 100 placements achieved in 2023 alone.</p>
                        </div>
                        <div className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-20 h-20 bg-[#13523f]/5 text-[#13523f] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#13523f]/10">
                                <GraduationCap size={36} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Expert Faculty</h3>
                            <p className="text-gray-600 font-medium leading-relaxed max-w-xs mx-auto">Our dedicated team includes doctors and industry experts with over 5 years of experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {/* Kept existing functioning testimonials carousel intact */}
            <div className="py-1 bg-white">
                {/* <div className="container mx-auto px-4 max-w-7xl mb-16 text-center">
                    <h2 className="text-sm font-black tracking-widest text-[#2ecc71] uppercase mb-3">What Students Say</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Our Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ecc71] to-[#0a4d32]">&</span> Parents Feedback
                    </h3>
                    <div className="w-24 h-1.5 bg-[#13523f] mb-8 rounded-full mx-auto"></div>
                </div> */}
                {/* Embedded previous existing component */}
                <StudentTestimonials />
            </div>


        </main>
    )
}
