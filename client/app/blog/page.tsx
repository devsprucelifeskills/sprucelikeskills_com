"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import Header from '@/components/common/Header';
import { blogs } from '@/lib/blogs';

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const featuredPost = blogs[0];
  const recentPosts = blogs.slice(1);

  const filteredPosts = blogs.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#0A3D24] pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-3 mb-8 text-white/60 text-sm font-medium justify-center lg:justify-start">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-[#13523f] font-bold">Blog</span>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              Spruce <span className="text-[#13523f]">Insights</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Stay updated with the latest trends in Medical Coding, Clinical Research, and Healthcare career growth from our industry experts.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <section className="container mx-auto px-4 max-w-7xl -mt-20 relative z-20">
        <Link href={`/blog/${featuredPost.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row min-h-[500px] transition-transform duration-500 hover:-translate-y-2">
          <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-[#13523f] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
              Featured Story
            </div>
          </div>
          <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-6 text-gray-400 text-sm font-bold mb-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
              <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {featuredPost.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight group-hover:text-[#0A3D24] transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-3 text-[#0A3D24] font-black text-sm uppercase tracking-[0.2em] group/btn">
              Read Detailed Insight
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-20 bg-gray-50 mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <h2 className="text-3xl font-black text-gray-900 italic">Recent Stories</h2>
            <div className="relative w-full md:w-96 group">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-transparent focus:border-[#0A3D24] rounded-2xl px-12 py-4 shadow-lg focus:outline-none transition-all font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0A3D24] transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#0A3D24] text-white text-[10px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-xl">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-gray-400 text-[11px] font-black uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#0A3D24] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-1 font-medium">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#13523f]/20 flex items-center justify-center font-black text-[10px] text-[#13523f]">
                        SE
                      </div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{post.author}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-[#0A3D24] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-40">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 italic">No stories found matching your search</h3>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#13523f] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                Don't Miss Any <br />
                <span className="bg-white px-4 py-1 inline-block transform -rotate-1 text-[#13523f]">Industry Update</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest healthcare insights delivered directly to your inbox every week.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white rounded-full px-8 py-5 text-black font-medium focus:outline-none shadow-xl border-2 border-transparent focus:border-black transition-all"
                />
                <button className="bg-black hover:bg-gray-800 text-white font-black px-12 py-5 rounded-full transition-all shadow-xl uppercase tracking-widest text-sm translate-y-0 active:translate-y-1">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
