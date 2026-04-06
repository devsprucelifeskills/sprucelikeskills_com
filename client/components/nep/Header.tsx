"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
    return (
        <header className="w-full flex flex-col sticky top-0 z-50">
            {/* Top Thin Bar */}
            <div className="w-full h-[5px] bg-[#2C3333]"></div>

            {/* Main Navigation */}
            <div className="w-full bg-white border-b border-gray-200 py-4 relative">
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo Section */}
                    <Link href="/nep" className="flex items-center z-10">
                        <div className="relative h-10 w-32 md:h-12 md:w-40">
                            <Image
                                src="/images/sprucelogo.webp"
                                alt="SPRUCE"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Navigation Section (Centered) */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-[15px] font-medium whitespace-nowrap">
                        <Link
                            href="/resume-builder"
                            className="text-gray-500 hover:text-black transition-colors"
                        >
                            Resume Builder
                        </Link>
                        <Link
                            href="/nep/reviews"
                            className="text-gray-500 hover:text-black transition-colors"
                        >
                            Reviews
                        </Link>
                    </nav>

                    {/* Action Section */}
                    <div className="flex items-center z-10">
                        <Link
                            href="#enroll"
                            className="bg-[#008979] hover:bg-[#007a6c] text-white px-6 py-2.5 rounded-lg font-bold text-base tracking-tight transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
