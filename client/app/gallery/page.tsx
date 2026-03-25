"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Maximize2, X, Filter } from 'lucide-react';
import Header from '@/components/common/Header';
import { galleryItems } from '@/lib/gallery';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ["All", "Events", "Classroom", "Achievements", "Campus"];

  const filteredItems = activeFilter === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[280px] sm:h-[350px] md:h-[450px] w-full bg-[#0A3D24] overflow-hidden ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87')] bg-cover bg-center "></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D24]/10 via-[#0A3D24]/40 to-[#0A3D24]"></div>

        <div className="relative container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-white/70 text-xs sm:text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
            <span className="text-[#13523f] font-bold">Gallery</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-3 sm:mb-4">
            Visual Journey of <br />
            <span className="text-[#13523f]">Spruce Excellence</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-xl max-w-xl sm:max-w-2xl font-medium leading-relaxed">
            Explore our vibrant campus life, educational workshops, and the milestones that define our success.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[64px] sm:top-[70px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-3 sm:px-6 py-3 max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 sm:justify-center">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all ${activeFilter === cat
                  ? 'bg-[#0A3D24] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 aspect-[4/3]"
                onClick={() => setSelectedImage(item.image)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay — always partially visible on mobile, full on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 sm:p-6">
                  <div className="transform sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block bg-[#13523f] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm mb-1 sm:mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-base md:text-lg font-black text-white leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-24 sm:py-40">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Maximize2 className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-400">No images found in this category</h3>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-8 md:p-12"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>

          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Want to see <span className="text-[#0A3D24]">Spruce</span> in person?
              </h2>
              <p className="text-gray-500 font-medium text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                Schedule a campus visit and experience our state-of-the-art infrastructure and learning environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="bg-[#0A3D24] text-white font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 w-full sm:w-auto">
                Book Campus Visit
              </button>
              <Link href="/contact" className="bg-white text-gray-900 border border-gray-200 font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center w-full sm:w-auto">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
