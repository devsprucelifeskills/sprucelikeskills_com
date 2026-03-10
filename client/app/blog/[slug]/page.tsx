"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowRight, BookOpen } from 'lucide-react';
import Header from '@/components/common/Header';
import { blogs } from '@/lib/blogs';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogs.find(b => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogs.filter(b => b.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header / Hero */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[#0A3D24] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0A3D24] to-[#0A3D24]"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-110"
          style={{ backgroundImage: `url(${post.image})` }}
        ></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#FDB813] font-black text-xs uppercase tracking-widest mb-10 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft className="w-4 h-4" /> Back to Intelligence Feed
          </Link>
          
          <div className="flex items-center justify-center gap-4 text-white/50 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
            <span className="bg-white/10 px-4 py-1.5 rounded-sm border border-white/10 text-white">{post.category}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-12 drop-shadow-2xl">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-md mx-auto">
             <div className="w-12 h-12 bg-[#FDB813] rounded-full flex items-center justify-center font-black text-black">
                SE
             </div>
             <div className="text-left">
                <p className="text-white font-black text-sm uppercase tracking-widest">{post.author}</p>
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-none">Industry Expert @ Spruce</p>
             </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="container mx-auto px-4 max-w-4xl py-24 relative">

        {/* Content Content Content Content content */}
        <div className="prose prose-xl prose-slate max-w-none prose-p:text-gray-700 prose-p:leading-[1.8] prose-a:text-[#0A3D24] prose-strong:text-gray-900 prose-strong:font-bold">
          {post.content.split('\n').filter(p => p.trim() !== '').map((block: string, idx: number) => {
            const trimmedBlock = block.trim();
            
            // Header detection
            if (trimmedBlock.startsWith('###')) {
              return (
                <h3 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 mt-16 mb-8 border-l-4 border-[#FDB813] pl-6">
                  {trimmedBlock.replace(/^###\s+/, '')}
                </h3>
              );
            }
            
            // List detection
            if (trimmedBlock.startsWith('-')) {
              return (
                <li key={idx} className="flex items-start gap-4 text-lg font-medium text-gray-700 leading-relaxed mb-4 list-none">
                  <span className="w-2 h-2 bg-[#FDB813] rounded-full mt-2.5 shrink-0" />
                  <span>{trimmedBlock.replace(/^-\s+/, '')}</span>
                </li>
              );
            }

            // Numbered list detection
            if (/^\d+\./.test(trimmedBlock)) {
              return (
                <li key={idx} className="flex items-start gap-4 text-lg font-medium text-gray-700 leading-relaxed mb-4 list-none">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0A3D24] text-white text-[10px] font-bold shrink-0 mt-0.5">
                    {trimmedBlock.match(/^\d+/)?.[0]}
                  </span>
                  <span>{trimmedBlock.replace(/^\d+\.\s+/, '')}</span>
                </li>
              );
            }
            
            // Default paragraph
            return (
              <p key={idx} className="mb-8 text-lg md:text-xl font-normal text-gray-700 leading-relaxed tracking-normal">
                {trimmedBlock}
              </p>
            );
          })}
        </div>

      </article>

      {/* Suggested Reading */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-16 px-4">
             <div className="flex items-center gap-4">
                <BookOpen className="w-10 h-10 text-[#0A3D24]" />
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 italic">Continue Exploring</h2>
             </div>
             <Link href="/blog" className="text-xs font-black uppercase tracking-widest text-[#0A3D24] hover:underline">View All Intelligence</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedPosts.map((rPost) => (
              <Link 
                key={rPost.id} 
                href={`/blog/${rPost.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 overflow-hidden">
                  <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FDB813] mb-3">{rPost.category}</div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#0A3D24] transition-colors mb-4 line-clamp-2 italic">{rPost.title}</h3>
                  <div className="flex items-center gap-2 text-gray-300 group-hover:text-[#0A3D24] font-black text-[10px] uppercase tracking-widest transition-colors">
                    Dive Deeper <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-24 bg-[#0A3D24] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
            Inspired by <span className="text-[#FDB813]">Our Vision?</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium mb-12">
            Turn your interest into expertise. Join our industry-leading programs and become a certified professional in your chosen domain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#FDB813] text-black font-black px-12 py-5 rounded-full uppercase tracking-widest text-sm shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">
              Start Your Journey
            </button>
            <button className="border-2 border-white/20 text-white font-black px-12 py-5 rounded-full uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
              Consult an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
