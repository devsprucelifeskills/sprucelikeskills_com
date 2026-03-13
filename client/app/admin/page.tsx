"use client";

import { useEffect, useState } from 'react';
import { Users, BookOpen, MessageSquare, Handshake, TrendingUp, Bell } from 'lucide-react';

interface Stats {
  users: number;
  enrollments: number;
  enquiries: number;
  partnerEnquiries: number;
  newEnquiries: number;
  newPartnerEnquiries: number;
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  badge,
}: {
  label: string;
  value: number | null;
  icon: React.ElementType;
  color: string;
  badge?: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} />
        </div>
        {badge !== undefined && badge > 0 && (
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Bell size={10} />
            {badge} new
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-gray-900">
        {value === null ? (
          <span className="inline-block w-16 h-8 bg-gray-100 rounded animate-pulse" />
        ) : (
          value.toLocaleString()
        )}
      </p>
      <p className="text-gray-500 text-sm font-medium mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdminName(user.name || 'Admin');
      } catch { /* ignore */ }
    }

    const token = localStorage.getItem('token');
    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
    fetch(`${backend}/api/v2/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (data.success) setStats(data.stats); })
      .catch(console.error);
  }, []);

  const cards = [
    {
      label: 'Total Users',
      value: stats?.users ?? null,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Completed Enrollments',
      value: stats?.enrollments ?? null,
      icon: BookOpen,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Enquiries',
      value: stats?.enquiries ?? null,
      icon: MessageSquare,
      color: 'bg-yellow-50 text-yellow-600',
      badge: stats?.newEnquiries,
    },
    {
      label: 'Partner Enquiries',
      value: stats?.partnerEnquiries ?? null,
      icon: Handshake,
      color: 'bg-purple-50 text-purple-600',
      badge: stats?.newPartnerEnquiries,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp size={20} className="text-[#0A3D24]" />
          <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Overview</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900">Welcome back, {adminName} 👋</h1>
        {/* <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening across your platform today.</p> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Quick tips */}
      <div className="bg-[#0A3D24] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-[#FDB813] rounded-lg flex items-center justify-center">
            <Bell size={16} className="text-[#0A3D24]" />
          </div>
          <h2 className="font-bold text-lg">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Manage Users', href: '/admin/users', desc: 'View, role-change, or delete users' },
            { label: 'Review Enquiries', href: '/admin/enquiries', desc: 'Update and close incoming enquiries' },
            { label: 'Partner Enquiries', href: '/admin/partner-enquiries', desc: 'Handle placement partner leads' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors border border-white/10"
            >
              <p className="font-bold text-sm">{item.label}</p>
              <p className="text-white/60 text-xs mt-1">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
