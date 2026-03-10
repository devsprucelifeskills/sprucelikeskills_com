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
      <div className="relative h-[350px] md:h-[450px] w-full bg-[#0A3D24] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D24] via-[#0A3D24]/90 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <div className="flex items-center gap-3 mb-6 text-white/70 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#FDB813] font-bold">Gallery</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Visual Journey of <br />
            <span className="text-[#FDB813]">Spruce Excellence</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Explore our vibrant campus life, educational workshops, and the milestones that define our success.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Filter className="w-4 h-4 text-gray-400 mr-2 shrink-0 hidden md:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-black transition-all ${
                  activeFilter === cat 
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
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                onClick={() => setSelectedImage(item.image)}
              >
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block bg-[#FDB813] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Tooltip Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-40">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Maximize2 className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400">No images found in this category</h3>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain animate-in zoom-in duration-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Bottom Success Banner */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                Want to see <span className="text-[#0A3D24]">Spruce</span> in person?
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                Schedule a campus visit and experience our state-of-the-art infrastructure and learning environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#0A3D24] text-white font-black px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                Book Campus Visit
              </button>
              <Link href="/contact" className="bg-white text-gray-900 border border-gray-200 font-black px-10 py-4 rounded-full shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
