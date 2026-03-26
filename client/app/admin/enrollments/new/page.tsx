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
    const [mode, setMode] = useState<'auto' | 'manual'>('auto');
    const [formData, setFormData] = useState({
        totalFee: 0,
        discountAmount: 0,
        discountTitle: 'Scholarship',
        installmentsCount: 3,
        startDate: new Date().toISOString().split('T')[0],
        intervalDays: 30
    });
    const [manualInstallments, setManualInstallments] = useState<any[]>([
        { amount: 0, dueDate: new Date().toISOString().split('T')[0] }
    ]);

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

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
            if (!initialSlug) return;
            
            // 1. First, check static data for a default price
            const staticCourse = courses.find(c => c.slug === initialSlug);
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
    }, [initialEmail, initialSlug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("User not found in system. Please ensure the student has registered an account with this email.");
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
                    mode,
                    manualInstallments: mode === 'manual' ? manualInstallments : [],
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
    const installmentEst = mode === 'auto' 
        ? Math.floor(payableAmount / (formData.installmentsCount || 1))
        : manualInstallments.reduce((sum, i) => sum + Number(i.amount), 0);

    const addManualInstallment = () => {
        const lastDate = manualInstallments.length > 0 
            ? new Date(manualInstallments[manualInstallments.length - 1].dueDate) 
            : new Date();
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 30);
        
        setManualInstallments([...manualInstallments, { 
            amount: 0, 
            dueDate: nextDate.toISOString().split('T')[0] 
        }]);
    };

    const removeManualInstallment = (index: number) => {
        setManualInstallments(manualInstallments.filter((_, i) => i !== index));
    };

    const updateManualInstallment = (index: number, field: string, value: any) => {
        const updated = [...manualInstallments];
        updated[index] = { ...updated[index], [field]: value };
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
                        <div className="bg-gray-100 p-1 rounded-2xl flex gap-1">
                            <button 
                                type="button"
                                onClick={() => setMode('auto')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'auto' ? 'bg-[#0A3D24] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Auto Setup
                            </button>
                            <button 
                                type="button"
                                onClick={() => setMode('manual')}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'manual' ? 'bg-[#0A3D24] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Manual Setup
                            </button>
                        </div>
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
                                        onChange={(e) => setFormData({...formData, totalFee: Number(e.target.value)})}
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
                                        onChange={(e) => setFormData({...formData, discountAmount: Number(e.target.value)})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {mode === 'auto' ? (
                                <>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Number of Installments</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="number" 
                                                min="1"
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white pl-12 pr-6 py-5 rounded-2xl outline-none transition-all font-black text-gray-900 text-lg"
                                                value={formData.installmentsCount}
                                                onChange={(e) => setFormData({...formData, installmentsCount: Number(e.target.value)})}
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
                                                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Manual Schedule</p>
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
                                                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#FDB813] font-bold text-xs"
                                                        value={inst.amount}
                                                        onChange={(e) => updateManualInstallment(index, 'amount', Number(e.target.value))}
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input 
                                                        type="date"
                                                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#FDB813] font-bold text-xs"
                                                        value={inst.dueDate}
                                                        onChange={(e) => updateManualInstallment(index, 'dueDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button 
                                        type="button"
                                        onClick={addManualInstallment}
                                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:text-[#0A3D24] hover:border-[#0A3D24] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-bold text-xs"
                                    >
                                        <Plus size={14} />
                                        Add Installment
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 bg-[#FDB813]/5 border-2 border-dashed border-[#FDB813]/20 rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h4 className={`text-xl font-black ${mode === 'manual' && Math.abs(installmentEst - (formData.totalFee - formData.discountAmount)) > 1 ? 'text-red-600' : 'text-gray-900'}`}>
                                Total Payable: ₹{(formData.totalFee - formData.discountAmount).toLocaleString()}
                            </h4>
                            <p className="text-gray-500 font-bold mt-1">
                                {mode === 'auto' 
                                    ? `Approx. ₹${installmentEst.toLocaleString()} per installment`
                                    : `Manual Sum: ₹${installmentEst.toLocaleString()} ${Math.abs(installmentEst - (formData.totalFee - formData.discountAmount)) > 1 ? '(Mismatch!)' : '(Matches)'}`
                                }
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
