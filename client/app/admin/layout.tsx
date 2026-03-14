"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.replace('/login');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        router.replace('/');
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace('/login');
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0A3D24] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {/* Exit Button */}
        <div className="fixed top-4 right-6 z-50">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 px-4 py-2 rounded-xl shadow-sm transition-all group font-bold text-sm"
          >
            <span>Exit</span>
            <X size={18} className="transition-transform group-hover:rotate-90" />
          </Link>
        </div>

        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
