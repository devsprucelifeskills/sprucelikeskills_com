"use client";

import { useEffect, useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  contact: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

const statusStyles = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-[#13523f]/10 text-[#13523f]',
  closed: 'bg-gray-100 text-gray-500',
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${backend}/api/v2/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (data.success) setEnquiries(data.enquiries); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backend}/api/v2/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status: status as Enquiry['status'] } : e)));
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch {
      alert('Error updating status');
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter);
  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    contacted: enquiries.filter((e) => e.status === 'contacted').length,
    closed: enquiries.filter((e) => e.status === 'closed').length,
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-1">
          <MessageSquare size={14} />
          <span>Enquiry Management</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900">Enquiries</h1>
        <p className="text-gray-400 text-sm mt-0.5">{enquiries.length} total enquiries</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'new', 'contacted', 'closed'] as const).map((tab) => (
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
            <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No enquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((enq, i) => (
              <div key={enq._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-gray-300 font-mono">#{i + 1}</span>
                      <p className="font-bold text-gray-900">{enq.name}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[enq.status]}`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">📞 {enq.contact}</p>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed">{enq.message}</p>
                    <p className="text-xs text-gray-300 mt-2">
                      {new Date(enq.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                      disabled={updating === enq._id}
                      className="appearance-none bg-gray-100 text-gray-700 text-xs font-semibold pl-3 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
