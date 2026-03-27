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

    // Edit Schedule State
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null);
    const [editInstallments, setEditInstallments] = useState<{ amount: string; dueDate: string }[]>([]);
    const [editSaving, setEditSaving] = useState(false);
    const [editError, setEditError] = useState('');

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

    const unblockUser = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${id}/unblock`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(prev => prev.map(e => 
                    e._id === id ? { ...e, isBlocked: false, isAutoBlockEnabled: false, calculatedStatus: 'active' } : e
                ));
            }
        } catch (err) { /* ignore */ }
    };

    const blockUser = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${id}/toggle-block`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setEnrollments(prev => prev.map(e => 
                    e._id === id ? { ...e, isBlocked: true, calculatedStatus: 'blocked' } : e
                ));
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

    const openEditModal = (e: Enrollment) => {
        setEditingEnrollment(e);
        const pendingInsts = e.installments.filter(i => i.status === 'pending');
        setEditInstallments(pendingInsts.map(i => ({ 
            amount: i.amount.toString(), 
            dueDate: i.dueDate.split('T')[0] 
        })));
        setEditError('');
        setEditModalOpen(true);
    };

    const handleEditInstallmentChange = (index: number, field: string, value: string) => {
        setEditInstallments(prev => {
            const newInsts = [...prev];
            newInsts[index] = { ...newInsts[index], [field]: value };
            return newInsts;
        });
    };

    const handleEditSubmit = async () => {
        if (!editingEnrollment) return;
        setEditError('');
        setEditSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/${editingEnrollment._id}/update-emi`, {
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newInstallments: editInstallments })
            });
            const data = await res.json();
            if (data.success) {
                setEditModalOpen(false);
                fetchEnrollments();
            } else {
                setEditError(data.message || 'Failed to update schedule');
            }
        } catch (err: any) {
            setEditError(err.message || 'An error occurred');
        } finally {
            setEditSaving(false);
        }
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
                                                                {e.calculatedStatus !== 'active' ? (
                                                                    <button 
                                                                        onClick={() => unblockUser(e._id)}
                                                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
                                                                    >
                                                                        <Unlock size={12} />
                                                                        Unblock Access
                                                                    </button>
                                                                ) : (
                                                                    <button 
                                                                        onClick={() => blockUser(e._id)}
                                                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                                                                    >
                                                                        <Lock size={12} />
                                                                        Block Access
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between mb-6 px-4">
                                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Installment Schedule</h4>
                                                            {e.status !== 'completed' && (
                                                                <button 
                                                                    onClick={() => openEditModal(e)}
                                                                    className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-yellow-100 transition-colors border border-yellow-100"
                                                                >
                                                                    Edit Schedule
                                                                </button>
                                                            )}
                                                        </div>
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

            {/* Edit Schedule Modal */}
            {editModalOpen && editingEnrollment && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900 hidden md:block">Edit Remaining Course Installments</h2>
                            <h2 className="text-xl font-black text-gray-900 md:hidden">Edit EMI Details</h2>
                            <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 font-bold text-gray-400 hover:text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                Close
                            </button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {(() => {
                                const paidInsts = editingEnrollment.installments.filter(i => i.status === 'paid');
                                const paidAmount = paidInsts.reduce((sum, i) => sum + i.amount, 0);
                                const balance = editingEnrollment.payableAmount - paidAmount;
                                const newTotal = editInstallments.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
                                const diff = newTotal - balance;

                                return (
                                    <>
                                        <div className="flex justify-between bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Balance Remaining</p>
                                                <p className="text-2xl font-black text-[#0A3D24]">₹{balance.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">New Schedule Total</p>
                                                <p className={`text-2xl font-black ${diff === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                    ₹{newTotal.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        {editError && (
                                            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 border border-red-100">
                                                <AlertCircle size={16} /> {editError}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            {editInstallments.map((inst, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-end bg-white p-4 rounded-2xl border border-gray-100">
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Amount (₹)</label>
                                                        <input 
                                                            type="number"
                                                            value={inst.amount}
                                                            onChange={(e) => handleEditInstallmentChange(idx, 'amount', e.target.value)}
                                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A3D24]/20 transition-all font-bold"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Due Date</label>
                                                        <input 
                                                            type="date"
                                                            value={inst.dueDate}
                                                            onChange={(e) => handleEditInstallmentChange(idx, 'dueDate', e.target.value)}
                                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0A3D24]/20 transition-all font-bold text-gray-700"
                                                        />
                                                    </div>
                                                    <button 
                                                        onClick={() => setEditInstallments(prev => prev.filter((_, i) => i !== idx))}
                                                        className="h-[46px] px-6 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors w-full sm:w-auto"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => setEditInstallments(prev => [...prev, { amount: '', dueDate: '' }])}
                                            className="mt-6 w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                                        >
                                            + Add Another Installment
                                        </button>

                                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
                                            <button 
                                                onClick={() => setEditModalOpen(false)}
                                                className="px-8 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleEditSubmit}
                                                disabled={editSaving || diff !== 0 || editInstallments.length === 0}
                                                className="px-8 py-3.5 bg-[#0A3D24] text-white rounded-xl font-bold hover:bg-[#0A3D24]/90 disabled:opacity-50 transition-all shadow-lg shadow-[#0A3D24]/20 flex items-center justify-center gap-2"
                                            >
                                                {editSaving ? 'Saving...' : 'Save Updated Schedule'}
                                                {diff === 0 && !editSaving && editInstallments.length > 0 && <CheckCircle2 size={18} />}
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
