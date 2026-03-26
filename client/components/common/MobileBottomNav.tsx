"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Images, PlayCircle } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Gallery', href: '/gallery', icon: Images },
  { label: 'My Courses', href: '/profile/my-courses', icon: PlayCircle },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          // Robust active state logic
          const isHome = item.href === '/';
          const isHashLink = item.href.includes('#');
          const pathOnly = item.href.split('#')[0] || '/';

          let isActive = false;
          if (isHome) {
            isActive = pathname === '/';
          } else if (isHashLink) {
            // Highlighting hash links is tricky with just pathname, 
            // but we can at least ensure they don't stay active everywhere
            isActive = pathname === pathOnly && typeof window !== 'undefined' && window.location.hash === '#' + item.href.split('#')[1];
          } else {
            isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          }
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-[#2ecc71]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-[#2ecc71]/5' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-[#2ecc71]' : 'text-gray-500'
                }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#2ecc71] absolute -bottom-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
