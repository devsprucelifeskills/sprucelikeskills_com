"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MessageSquare,
  Handshake,
  LogOut,
  Menu,
  X,
  Clock,
  ChevronRight,
  Video,
  FileText,
  Settings
} from 'lucide-react';


import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/users', label: 'Users', icon: Users },

  { href: '/admin/enrollments', label: 'Enrollments', icon: BookOpen },
  { href: '/admin/enrollments/emi', label: 'EMI Enrollments', icon: Clock },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/partner-enquiries', label: 'Partner Enquiries', icon: Handshake },
  { href: '/admin/meetings', label: 'Meetings', icon: Video },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      {/* <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FDB813] flex items-center justify-center shrink-0">
            <span className="text-[#0A3D24] font-black text-sm">S</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">Spruce Lifeskills</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div> */}
      <img
        src={"/spruseLogo.png"}
        alt="Spruce Lifeskills"
        className="h-20 w-auto object-contain"
      />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                  ? 'bg-[#FDB813] text-[#0A3D24]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={14} strokeWidth={2.5} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#0A3D24] text-white rounded-xl flex items-center justify-center shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#0A3D24] transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0A3D24] min-h-screen sticky top-0 h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
