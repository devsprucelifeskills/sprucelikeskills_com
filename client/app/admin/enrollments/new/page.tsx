"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Save,
    Calendar,
    DollarSign,
    Percent,
    Plus,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Loader2,
    TrendingDown,
    CalendarDays
} from 'lucide-react';
import { courses } from '@/lib/courses';

function EnrollmentSetupForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const appId = searchParams.get('appId');
    const initialName = searchParams.get('name') || '';
    const initialEmail = searchParams.get('email') || '';
    const initialCourse = searchParams.get('course') || '';
    const initialSlug = searchParams.get('slug') || '';

    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        totalFee: 0,
        discountAmount: 0,
        discountTitle: 'Scholarship',
        installmentsCount: 3,
        startDate: new Date().toISOString().split('T')[0],
        intervalDays: 30,
        reviewMessage: ''
    });
    const [manualInstallments, setManualInstallments] = useState<any[]>([
        { amount: 0, dueDate: new Date().toISOString().split('T')[0] },
        { amount: 0, dueDate: new Date().toISOString().split('T')[0] },
        { amount: 0, dueDate: new Date().toISOString().split('T')[0] }
    ]);

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

    // Auto-calculate EMIs when inputs change
    useEffect(() => {
        const payableAmount = formData.totalFee - formData.discountAmount;
        const count = Math.max(1, formData.installmentsCount || 1);
        const amountPerEMI = Math.floor(payableAmount / count);

        const newInsts = [];
        let currentDueDate = new Date(formData.startDate || Date.now());

        for (let i = 0; i < count; i++) {
            newInsts.push({
                amount: i === count - 1
                    ? payableAmount - (amountPerEMI * (count - 1))
                    : amountPerEMI,
                dueDate: currentDueDate.toISOString().split('T')[0]
            });
            // Increment date
            currentDueDate.setDate(currentDueDate.getDate() + (formData.intervalDays || 30));
        }
        setManualInstallments(newInsts);
    }, [formData.totalFee, formData.discountAmount, formData.installmentsCount, formData.startDate, formData.intervalDays]);

    useEffect(() => {
        // Find user ID by email
        const findUser = async () => {
            if (!initialEmail) return;
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${backend}/api/v2/admin/users?search=${initialEmail}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && data.users.length > 0) {
                    setUserId(data.users[0]._id);
                }
            } catch (err) {
                console.error("Error finding user:", err);
            }
        };

        const fetchCourseSettings = async () => {
            if (!initialSlug && !initialCourse) return;

            // 1. First, check static data for a default price
            let staticCourse = courses.find(c => c.slug === initialSlug);

            // Fallback: search by title if slug doesn't match
            if (!staticCourse && initialCourse) {
                staticCourse = courses.find(c => c.title.toLowerCase() === initialCourse.toLowerCase());
            }

            if (staticCourse) {
                setFormData(prev => ({
                    ...prev,
                    totalFee: staticCourse.price || 0
                }));
            }

            // 2. Then try to fetch admin-defined settings from DB
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${backend}/api/v2/enrollments/admin/course-settings/${initialSlug}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success && data.settings) {
                    setFormData(prev => ({
                        ...prev,
                        totalFee: data.settings.defaultTotalFee || prev.totalFee,
                        installmentsCount: data.settings.defaultInstallments || prev.installmentsCount
                    }));
                }
            } catch (err) { /* ignore */ }
        };

        findUser();
        fetchCourseSettings();
    }, [initialEmail, initialSlug, initialCourse]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User not found in system. Please ensure the student has registered an account with this email.");
            return;
        }

        const payableAmount = formData.totalFee - formData.discountAmount;
        const totalManual = manualInstallments.reduce((sum, i) => sum + Number(i.amount), 0);
        if (Math.abs(totalManual - payableAmount) > 1) {
            alert(`The sum of installments (₹${totalManual.toLocaleString()}) does not match the total payable amount (₹${payableAmount.toLocaleString()}). Please adjust before saving.`);
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/setup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    courseSlug: initialSlug,
                    courseTitle: initialCourse,
                    mode: 'manual',
                    manualInstallments: manualInstallments,
                    ...formData
                })
            });
            const data = await res.json();
            if (data.success) {
                // Also update application status to enrolled
                if (appId) {
                    await fetch(`${backend}/api/v2/applications/admin/${appId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ status: 'enrolled' })
                    });
                }
                alert("Enrollment created successfully!");
                router.push('/admin/enrollments');
            } else {
                alert(data.message || "Failed to create enrollment");
            }
        } catch (err) {
            console.error("Error setting up enrollment:", err);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const payableAmount = formData.totalFee - formData.discountAmount;
    const installmentSum = manualInstallments.reduce((sum, i) => sum + Number(i.amount), 0);

    const addManualInstallment = () => {
        const lastDate = manualInstallments.length > 0
            ? new Date(manualInstallments[manualInstallments.length - 1].dueDate)
            : new Date();
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 30);

        const newCount = manualInstallments.length + 1;
        const totalToDistribute = formData.totalFee - formData.discountAmount;
        const amountPerEMI = Math.floor(totalToDistribute / newCount);

        const updated = Array.from({ length: newCount }, (_, i) => {
            const dueDate = i < manualInstallments.length
                ? manualInstallments[i].dueDate
                : nextDate.toISOString().split('T')[0];

            return {
                amount: i === newCount - 1
                    ? totalToDistribute - (amountPerEMI * (newCount - 1))
                    : amountPerEMI,
                dueDate
            };
        });

        setManualInstallments(updated);
    };

    const removeManualInstallment = (index: number) => {
        const filtered = manualInstallments.filter((_, i) => i !== index);
        const newCount = filtered.length;
        if (newCount === 0) {
            setManualInstallments([]);
            return;
        }

        const totalToDistribute = formData.totalFee - formData.discountAmount;
        const amountPerEMI = Math.floor(totalToDistribute / newCount);

        const updated = filtered.map((inst, i) => ({
            ...inst,
            amount: i === newCount - 1
                ? totalToDistribute - (amountPerEMI * (newCount - 1))
                : amountPerEMI
        }));

        setManualInstallments(updated);
    };

    const updateManualInstallment = (index: number, field: string, value: any) => {
        const updated = [...manualInstallments];
        updated[index] = { ...updated[index], [field]: value };

        // Dynamic redistribution: If amount is changed, adjust other EMIs
        if (field === 'amount') {
            const newAmount = Number(value) || 0;
            const payableAmount = formData.totalFee - formData.discountAmount;

            if (index < updated.length - 1) {
                // 1. Changing a non-last EMI: Adjust subsequent ones
                const sumBeforeAndCurrent = updated
                    .slice(0, index + 1)
                    .reduce((sum, inst) => sum + Number(inst.amount), 0);

                const remainingBalance = payableAmount - sumBeforeAndCurrent;
                const remainingCount = updated.length - (index + 1);

                if (remainingCount > 0) {
                    const amountPerRemaining = Math.floor(remainingBalance / remainingCount);
                    for (let i = index + 1; i < updated.length; i++) {
                        updated[i].amount = i === updated.length - 1
                            ? remainingBalance - (amountPerRemaining * (remainingCount - 1))
                            : amountPerRemaining;
                    }
                }
            } else if (updated.length > 1) {
                // 2. Changing the LAST EMI: Adjust preceding ones
                const targetPrecedingSum = payableAmount - newAmount;
                const precedingCount = updated.length - 1;

                const amountPerPreceding = Math.floor(targetPrecedingSum / precedingCount);
                for (let i = 0; i < precedingCount; i++) {
                    updated[i].amount = i === precedingCount - 1
                        ? targetPrecedingSum - (amountPerPreceding * (precedingCount - 1))
                        : amountPerPreceding;
                }
            }
        }

        setManualInstallments(updated);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold mb-8 transition-colors group"
            >
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-gray-50 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Back to Applications
            </button>

            <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-[#FDB813] rounded-3xl flex items-center justify-center text-[#0A3D24] shadow-xl shadow-[#FDB813]/10">
                    <CalendarDays size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Setup Enrollment</h1>
                    <p className="text-gray-500 font-medium">Configure EMI schedule for {initialName}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Student Info Card */}
                <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-0"></div>
                    <div className="relative z-10">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            Student Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Full Name</p>
                                <p className="text-xl font-black text-gray-900">{initialName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Email Address</p>
                                <p className="text-xl font-bold text-gray-600">{initialEmail}</p>
                                {!userId && !loading && (
                                    <p className="text-red-500 text-[10px] font-black uppercase mt-1 flex items-center gap-1">
                                        <AlertCircle size={10} /> User not found in database
                                    </p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Selected Course</p>
                                <p className="text-xl font-black text-[#0A3D24]">{initialCourse}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Configuration */}
                <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Fees & Installments</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Original Total Fee (₹)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg"
                                        value={formData.totalFee}
                                        onChange={(e) => setFormData({ ...formData, totalFee: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Discount Amount (₹)</label>
                                <div className="relative">
                                    <TrendingDown className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2ecc71]" size={18} />
                                    <input
                                        type="number"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg"
                                        value={formData.discountAmount}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setFormData({
                                                ...formData,
                                                discountAmount: val,
                                                discountTitle: val > 0 ? 'Custom Discount' : 'Scholarship'
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            {formData.discountAmount > 0 && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Scholarship / Discount Type</label>
                                    <div className="relative">
                                        <Percent className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg appearance-none cursor-pointer"
                                            value={formData.discountTitle}
                                            onChange={(e) => setFormData({ ...formData, discountTitle: e.target.value })}
                                        >
                                            <option value="Scholarship">Scholarship</option>
                                            <option value="Custom Discount">Custom Discount</option>
                                            <option value="Other">Other Discount</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <ArrowLeft className="-rotate-90" size={18} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Number of Installments</label>
                                <div className="relative">
                                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg"
                                        value={formData.installmentsCount}
                                        onChange={(e) => setFormData({ ...formData, installmentsCount: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Start Date (First EMI)</label>
                                <div className="relative">
                                    <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar p-2">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">EMI Details (Editable)</p>
                                    <button
                                        type="button"
                                        onClick={addManualInstallment}
                                        className="flex items-center gap-1 text-[10px] font-black text-[#0A3D24] uppercase tracking-widest hover:text-black transition-colors"
                                    >
                                        <Plus size={12} /> Add More
                                    </button>
                                </div>
                                {manualInstallments.map((inst, index) => (
                                    <div key={index} className="flex flex-col gap-3 bg-gray-50 p-5 rounded-3xl border border-transparent hover:border-gray-200 transition-all relative">
                                        <div className="flex items-center justify-between">
                                            <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center font-black text-gray-400 text-[10px] shadow-sm">
                                                {index + 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeManualInstallment(index)}
                                                className="text-red-400 hover:text-red-600 p-1"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                <input
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="w-full pl-9 pr-3 py-3 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-[#FDB813] font-black text-sm text-gray-900 transition-all placeholder:text-gray-300"
                                                    value={inst.amount}
                                                    onChange={(e) => updateManualInstallment(index, 'amount', Number(e.target.value))}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="date"
                                                    className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-100 rounded-xl outline-none focus:border-[#FDB813] font-black text-sm text-gray-900 transition-all"
                                                    value={inst.dueDate}
                                                    onChange={(e) => updateManualInstallment(index, 'dueDate', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Review Note (Optional)</label>
                        <textarea
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900 text-sm resize-y min-h-[100px]"
                            placeholder="Add a review note for this enrollment setup..."
                            value={formData.reviewMessage}
                            onChange={(e) => setFormData({ ...formData, reviewMessage: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="mt-12 bg-[#FDB813]/5 border-2 border-dashed border-[#FDB813]/20 rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h4 className={`text-xl font-black ${Math.abs(installmentSum - payableAmount) > 1 ? 'text-red-600' : 'text-gray-900'}`}>
                                Total Payable: ₹{payableAmount.toLocaleString()}
                            </h4>
                            <p className="text-gray-500 font-bold mt-1">
                                Installment Sum: ₹{installmentSum.toLocaleString()} {Math.abs(installmentSum - payableAmount) > 1 ? '(Mismatch!)' : '(Matches)'}
                            </p>
                        </div>
                        <button
                            disabled={loading || !userId}
                            className="bg-[#0A3D24] hover:bg-black text-white px-12 py-5 rounded-2xl font-black transition-all shadow-xl shadow-[#0A3D24]/10 flex items-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Finalize Enrollment
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default function NewEnrollmentPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center font-bold">Loading setup...</div>}>
            <EnrollmentSetupForm />
        </Suspense>
    );
}
