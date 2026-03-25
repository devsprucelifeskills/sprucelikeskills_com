"use client";

import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Enrollment {
  _id: string;
  userId: { _id: string; name: string; email: string } | null;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

const statusConfig = {
  completed: { label: 'Completed', class: 'bg-green-100 text-green-700', icon: CheckCircle },
  pending: { label: 'Pending', class: 'bg-[#13523f]/10 text-[#13523f]', icon: Clock },
  failed: { label: 'Failed', class: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
    fetch(`${backend}/api/v2/admin/enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (data.success) setEnrollments(data.enrollments); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const courseTitles = Array.from(new Set(enrollments.map(e => e.courseTitle))).sort();

  const filtered = enrollments.filter((e) => {
    const statusMatch = filter === 'all' || e.status === filter;
    const courseMatch = selectedCourse === 'all' || e.courseTitle === selectedCourse;
    return statusMatch && courseMatch;
  });

  const counts = {
    all: enrollments.length,
    completed: enrollments.filter((e) => e.status === 'completed').length,
    pending: enrollments.filter((e) => e.status === 'pending').length,
    failed: enrollments.filter((e) => e.status === 'failed').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-1">
            <BookOpen size={14} />
            <span>Enrollment Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Course Enrollments</h1>
          <p className="text-gray-400 text-sm mt-0.5">{enrollments.length} total enrollments</p>
        </div>

        <div className="w-full sm:w-64">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Filter by Course</label>
          <div className="relative">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13523f]/20 cursor-pointer hover:border-[#13523f]/40 transition-all font-semibold"
            >
              <option value="all">All Courses</option>
              {courseTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'completed', 'pending', 'failed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${filter === tab
                ? 'bg-[#13523f] text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#13523f]/40'
              }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#13523f] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No enrollments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">#</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Student</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Course</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Payment ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((e, i) => {
                  const cfg = statusConfig[e.status];
                  const Icon = cfg.icon;
                  return (
                    <tr key={e._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-6 py-4">
                        {e.userId ? (
                          <div>
                            <p className="font-semibold text-gray-800">{e.userId.name}</p>
                            <p className="text-gray-400 text-xs">{e.userId.email}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Deleted user</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-700 max-w-[200px] truncate">{e.courseTitle}</p>
                        <p className="text-gray-400 text-xs font-mono">{e.courseId}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        ₹{e.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.class}`}>
                          <Icon size={11} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs truncate max-w-[120px]">
                        {e.razorpayPaymentId || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
