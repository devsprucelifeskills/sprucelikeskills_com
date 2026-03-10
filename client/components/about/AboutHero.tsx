import React from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white/50 py-24 sm:py-32">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 -z-10 translate-y-[20%] opacity-30">
        <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100 blur-3xl mix-blend-multiply" />
        <div className="absolute top-1/4 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-sky-100 blur-3xl mix-blend-multiply" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="text-base/7 font-semibold text-blue-600 uppercase tracking-wider">
            Our Story
          </p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Pioneering Medical Care
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-600 sm:text-xl/8">
            Since 2008, we've pioneered the way, introducing medical coding to Nagpur and becoming the sole AAPC-authorized partner.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/contact-1.html"
              className="group flex items-center rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Get In Touch
              <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative w-[36rem] sm:w-[57rem] rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-3xl lg:p-4">
              <div className="h-[400px] w-full rounded-xl bg-gray-100/80 ring-1 ring-inset ring-gray-900/10 overflow-hidden relative shadow-2xl">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-sky-100 flex items-center justify-center">
                    <div className="text-center p-8">
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                           <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                        </span>
                        <h3 className="mt-4 text-xl font-medium text-gray-900">Transforming Careers Since 2008</h3>
                        <p className="mt-2 text-gray-600 max-w-sm mx-auto">Our ISO-certified institute has transformed countless careers, with our graduates sought after by top IT and pharma companies.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
