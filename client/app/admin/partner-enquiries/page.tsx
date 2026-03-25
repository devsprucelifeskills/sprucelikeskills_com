"use client";

import { useEffect, useState } from 'react';
import { Handshake, ChevronDown, Building2, Phone, Mail } from 'lucide-react';

interface PartnerEnquiry {
  _id: string;
  companyName: string;
  name: string;
  mobileNo: string;
  email: string;
  requiredSkills: string;
  numberOfOpenings: number | null;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

const statusStyles = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-[#13523f]/10 text-[#13523f]',
  closed: 'bg-gray-100 text-gray-500',
};

export default function PartnerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<PartnerEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${backend}/api/v2/admin/partner-enquiries`, {
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
      const res = await fetch(`${backend}/api/v2/admin/partner-enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status: status as PartnerEnquiry['status'] } : e)));
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
          <Handshake size={14} />
          <span>Partner Management</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900">Partner Enquiries</h1>
        <p className="text-gray-400 text-sm mt-0.5">{enquiries.length} total partner enquiries</p>
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
            <Handshake size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No partner enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">#</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Company</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Contact Person</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Skills Required</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Openings</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((enq, i) => (
                  <tr key={enq._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                          <Building2 size={14} className="text-purple-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{enq.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">{enq.name}</p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                        <Phone size={10} />
                        <span>{enq.mobileNo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                        <Mail size={10} />
                        <span>{enq.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[160px]">
                      <p className="text-xs leading-relaxed">{enq.requiredSkills || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      {enq.numberOfOpenings !== null ? (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                          {enq.numberOfOpenings}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[enq.status]}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                          disabled={updating === enq._id}
                          className="appearance-none bg-gray-100 text-gray-700 text-xs font-semibold pl-3 pr-8 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
