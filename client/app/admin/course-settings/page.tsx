"use client";

import React, { useEffect, useState } from 'react';
import { 
    Settings, 
    Plus, 
    Save, 
    Trash2, 
    Search,
    BookOpen,
    Loader2,
    Edit2,
    X,
    TrendingUp,
    Calendar
} from 'lucide-react';

interface CourseSettings {
    _id: string;
    courseSlug: string;
    courseTitle: string;
    defaultTotalFee: number;
    defaultInstallments: number;
}

export default function AdminCourseSettingsPage() {
    const [settings, setSettings] = useState<CourseSettings[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        courseSlug: '',
        courseTitle: '',
        defaultTotalFee: 0,
        defaultInstallments: 3
    });

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/course-settings/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setSettings(data.settings || []);
            }
        } catch (err) {
            console.error("Error fetching settings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId 
                ? `${backend}/api/v2/enrollments/admin/course-settings/${editingId}`
                : `${backend}/api/v2/enrollments/admin/course-settings`;

            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                setEditingId(null);
                setFormData({ courseSlug: '', courseTitle: '', defaultTotalFee: 0, defaultInstallments: 3 });
                fetchSettings();
            } else {
                alert(data.message || "Failed to save settings");
            }
        } catch (err) {
            console.error("Error saving settings:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteSettings = async (id: string) => {
        if (!confirm("Are you sure you want to delete these settings?")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/enrollments/admin/course-settings/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setSettings(prev => prev.filter(s => s._id !== id));
            }
        } catch (err) { /* ignore */ }
    };

    const handleEdit = (s: CourseSettings) => {
        setEditingId(s._id);
        setFormData({
            courseSlug: s.courseSlug,
            courseTitle: s.courseTitle,
            defaultTotalFee: s.defaultTotalFee,
            defaultInstallments: s.defaultInstallments
        });
        setShowModal(true);
    };

    // Note: In a real app, I'd also have an endpoint to list all available course slugs from the "Course" model.
    // For now, these were intended to be added manually by Admin for configuring EMI.

    return (
        <div className="p-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#0A3D24] rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Settings size={20} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Course EMI Settings</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Configure default fees and installments for enrollment setup.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search settings..." 
                            className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#0A3D24]/5 transition-all text-sm font-bold min-w-[300px] shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => {
                            setEditingId(null);
                            setFormData({ courseSlug: '', courseTitle: '', defaultTotalFee: 0, defaultInstallments: 3 });
                            setShowModal(true);
                        }}
                        className="bg-[#0A3D24] hover:bg-black text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0A3D24]/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <Plus size={18} strokeWidth={3} />
                        Add Template
                    </button>
                </div>
            </div>

            {loading && settings.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm animate-pulse h-48"></div>
                    ))}
                </div>
            ) : settings.length === 0 ? (
                <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Settings size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No settings found</h3>
                    <p className="text-gray-400 font-medium max-w-sm mx-auto">Create EMI templates to pre-fill enrollment forms for different courses.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settings.filter(s => s.courseTitle.toLowerCase().includes(search.toLowerCase()) || s.courseSlug.toLowerCase().includes(search.toLowerCase())).map((s) => (
                        <div key={s._id} className="group bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#0A3D24]/5 transition-all duration-500 overflow-hidden relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-[#FDB813]/10 rounded-2xl flex items-center justify-center text-[#FDB813]">
                                    <BookOpen size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(s)} className="p-2 text-gray-400 hover:text-[#0A3D24] hover:bg-[#0A3D24]/5 rounded-xl transition-all">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteSettings(s._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight">{s.courseTitle}</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-8">{s.courseSlug}</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <TrendingUp size={10} /> Base Fee
                                    </p>
                                    <p className="text-lg font-black text-[#0A3D24]">₹{s.defaultTotalFee.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        <Calendar size={10} /> Installments
                                    </p>
                                    <p className="text-lg font-black text-[#0A3D24]">{s.defaultInstallments}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl relative">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                            <X size={24} />
                        </button>

                        <form onSubmit={handleSubmit} className="p-10 md:p-12">
                            <h3 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
                                {editingId ? 'Edit' : 'Create'} EMI Template
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Course Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                        value={formData.courseTitle}
                                        onChange={(e) => setFormData({...formData, courseTitle: e.target.value})}
                                        required
                                        placeholder="e.g. Advanced Medical Coding"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Course Slug (Unique Reference)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                        value={formData.courseSlug}
                                        onChange={(e) => setFormData({...formData, courseSlug: e.target.value})}
                                        required
                                        placeholder="e.g. medical-coding-specialist"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Default Base Fee (₹)</label>
                                        <input 
                                            type="number" 
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                            value={formData.defaultTotalFee}
                                            onChange={(e) => setFormData({...formData, defaultTotalFee: Number(e.target.value)})}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Default Installments</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900"
                                            value={formData.defaultInstallments}
                                            onChange={(e) => setFormData({...formData, defaultInstallments: Number(e.target.value)})}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-[#0A3D24] text-white py-5 rounded-2xl font-black uppercase tracking-widest mt-10 hover:bg-black transition-all shadow-xl shadow-[#0A3D24]/20 flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Save Template
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
