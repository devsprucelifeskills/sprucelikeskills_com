"use client";

import React, { useEffect, useState } from 'react';
import { 
    BookOpen, 
    Search, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    MoreVertical,
    Unlock,
    Lock,
    Check,
    Calendar,
    User,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

interface Installment {
    _id: string;
    dueDate: string;
    amount: number;
    status: 'pending' | 'paid';
    paidAt?: string;
    paymentMethod?: string;
}

interface Enrollment {
    _id: string;
    userId: { _id: string; name: string; email: string };
    courseTitle: string;
    courseSlug: string;
    totalFee: number;
    payableAmount: number;
    installments: Installment[];
    status: string;
    isBlocked: boolean;
    isAutoBlockEnabled: boolean;
    calculatedStatus: 'active' | 'blocked' | 'auto-blocked';
    blockReason?: string;
    hasOverdue?: boolean;
    createdAt: string;
}

export default function AdminEMIManagementPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(data.enrollments);
            }
        } catch (err) {
            console.error("Error fetching enrollments:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const toggleBlock = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${id}/toggle-block`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(prev => prev.map(e => {
                    if (e._id === id) {
                        const newIsBlocked = data.isBlocked;
                        let newCalc: typeof e.calculatedStatus = newIsBlocked ? 'blocked' : 'active';
                        if (!newIsBlocked && e.isAutoBlockEnabled && e.hasOverdue) {
                            newCalc = 'auto-blocked';
                        }
                        return { ...e, isBlocked: newIsBlocked, calculatedStatus: newCalc };
                    }
                    return e;
                }));
            }
        } catch (err) { /* ignore */ }
    };

    const toggleAutoBlock = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${id}/toggle-auto-block`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(prev => prev.map(e => {
                    if (e._id === id) {
                        const newIsAuto = data.isAutoBlockEnabled;
                        let newCalc: typeof e.calculatedStatus = e.isBlocked ? 'blocked' : 'active';
                        if (!e.isBlocked && newIsAuto && e.hasOverdue) {
                            newCalc = 'auto-blocked';
                        }
                        return { ...e, isAutoBlockEnabled: newIsAuto, calculatedStatus: newCalc };
                    }
                    return e;
                }));
            }
        } catch (err) { /* ignore */ }
    };

    const markPaid = async (enrollmentId: string, installmentId: string) => {
        if (!confirm("Mark this installment as paid manually?")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${enrollmentId}/installments/${installmentId}/pay`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(prev => prev.map(e => 
                    e._id === enrollmentId 
                    ? { ...e, installments: e.installments.map(inst => 
                        inst._id === installmentId ? { ...inst, status: 'paid', paidAt: new Date().toISOString() } : inst
                      ) } 
                    : e
                ));
            }
        } catch (err) { /* ignore */ }
    };

    const filtered = enrollments.filter(e => 
        (e.userId?.name || '').toLowerCase().includes(search.toLowerCase()) || 
        e.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
        (e.userId?.email || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#0A3D24] rounded-xl flex items-center justify-center text-white shadow-lg">
                            <BookOpen size={20} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">EMI Management</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Track installments and manage student access control.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by student or course..." 
                        className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#0A3D24]/5 transition-all text-sm font-bold min-w-[350px] shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fee Progress</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="p-10 bg-gray-50/20"></td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-gray-400 font-bold">No enrollments found</td>
                                </tr>
                            ) : filtered.map((e) => {
                                const paidInstallments = e.installments.filter(i => i.status === 'paid').length;
                                const totalInstallments = e.installments.length;
                                const progress = (paidInstallments / totalInstallments) * 100;
                                const isExpanded = expandedRow === e._id;

                                return (
                                    <React.Fragment key={e._id}>
                                        <tr className={`group transition-colors ${isExpanded ? 'bg-[#FDB813]/5' : 'hover:bg-gray-50/50'}`}>
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0A3D24] font-black text-xs">
                                                        {e.userId?.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 text-sm">{e.userId?.name || 'Deleted User'}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold">{e.userId?.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <p className="font-bold text-gray-700 text-sm">{e.courseTitle}</p>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">₹{e.payableAmount?.toLocaleString() || '0'}</p>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[100px]">
                                                        <div 
                                                            className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-[#2ecc71]' : 'bg-[#FDB813]'}`}
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-500 whitespace-nowrap">
                                                        {paidInstallments} / {totalInstallments} Paid
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-2">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all w-fit ${
                                                        e.calculatedStatus === 'blocked' 
                                                            ? 'bg-red-50 text-red-600 border-red-100' 
                                                            : e.calculatedStatus === 'auto-blocked'
                                                            ? 'bg-orange-50 text-orange-600 border-orange-100'
                                                            : 'bg-green-50 text-green-600 border-green-100'
                                                    }`}>
                                                        {e.calculatedStatus === 'active' ? <Unlock size={12} /> : <Lock size={12} />}
                                                        {e.calculatedStatus === 'active' ? 'Active' : e.calculatedStatus === 'blocked' ? 'Manually Blocked' : 'Auto-Blocked'}
                                                    </div>
                                                    {e.calculatedStatus !== 'active' && (
                                                        <p className="text-[9px] text-gray-400 font-bold ml-1">{e.blockReason || 'Access Restricted'}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <button 
                                                    onClick={() => setExpandedRow(isExpanded ? null : e._id)}
                                                    className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-[#0A3D24] text-white shadow-lg shadow-[#0A3D24]/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                                >
                                                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan={5} className="p-0 bg-white">
                                                    <div className="p-8 border-b border-gray-100 animate-in slide-in-from-top-2 duration-300">
                                                        <div className="flex items-center justify-between mb-8 px-4">
                                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrollment Controls</h4>
                                                            <div className="flex items-center gap-4">
                                                                <button 
                                                                    onClick={() => toggleBlock(e._id)}
                                                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                                        e.isBlocked 
                                                                            ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                                                                            : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                                                                    }`}
                                                                >
                                                                    {e.isBlocked ? <Lock size={12} /> : <Unlock size={12} />}
                                                                    {e.isBlocked ? 'Manual Block: ON' : 'Manual Block: OFF'}
                                                                </button>
                                                                <button 
                                                                    onClick={() => toggleAutoBlock(e._id)}
                                                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                                                        e.isAutoBlockEnabled 
                                                                            ? 'bg-[#0A3D24]/5 text-[#0A3D24] border-[#0A3D24]/10 hover:bg-[#0A3D24]/10' 
                                                                            : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'
                                                                    }`}
                                                                >
                                                                    <Clock size={12} />
                                                                    {e.isAutoBlockEnabled ? 'Auto-Block: ENABLED' : 'Auto-Block: DISABLED'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Installment Schedule</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {e.installments.map((inst, idx) => (
                                                                <div key={inst._id} className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex items-center justify-between group/inst">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${inst.status === 'paid' ? 'bg-[#2ecc71]/10 text-[#2ecc71]' : 'bg-yellow-50 text-yellow-600'}`}>
                                                                            {idx + 1}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-black text-gray-900">₹{inst.amount?.toLocaleString() || '0'}</p>
                                                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Due: {new Date(inst.dueDate).toLocaleDateString()}</p>
                                                                        </div>
                                                                    </div>
                                                                    {inst.status === 'paid' ? (
                                                                        <div className="flex flex-col items-end">
                                                                            <span className="text-[9px] font-black text-[#2ecc71] uppercase bg-[#2ecc71]/5 px-2 py-1 rounded-full flex items-center gap-1">
                                                                                <Check size={10} /> Paid
                                                                            </span>
                                                                            <span className="text-[8px] text-gray-400 mt-1">{new Date(inst.paidAt || '').toLocaleDateString()}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <button 
                                                                            onClick={() => markPaid(e._id, inst._id)}
                                                                            className="bg-white hover:bg-[#0A3D24] hover:text-white border border-gray-100 text-[#0A3D24] text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all shadow-sm opacity-0 group-hover/inst:opacity-100"
                                                                        >
                                                                            Mark Paid
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
