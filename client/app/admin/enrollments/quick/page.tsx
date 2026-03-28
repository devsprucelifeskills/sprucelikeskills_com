"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    UserPlus,
    Mail,
    User,
    Phone,
    BookOpen,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Lock
} from 'lucide-react';
import { courses } from '@/lib/courses';

export default function DirectRegistrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [createdData, setCreatedData] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        courseSlug: '',
        courseTitle: '',
        password: ''
    });

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

    const handleCourseChange = (slug: string) => {
        const course = courses.find(c => c.slug === slug);
        if (course) {
            setFormData({
                ...formData,
                courseSlug: slug,
                courseTitle: course.title
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/admin/users/create-with-application`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                setSuccess(true);
                setCreatedData(data);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err: any) {
            setError(err.message || 'Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-4">
                <div className="bg-white rounded-[40px] shadow-2xl p-10 text-center border border-gray-100 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Onboarding Successful!</h2>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                        User <span className="text-gray-900 font-bold">{createdData?.user?.name}</span> has been created/identified
                        and their application for <span className="text-gray-900 font-bold">{formData.courseTitle}</span> has been automatically accepted.
                    </p>

                    <div className="grid gap-4">
                        <button
                            onClick={() => router.push(`/admin/enrollments/new?email=${formData.email}&slug=${formData.courseSlug}&name=${formData.name}&course=${formData.courseTitle}`)}
                            className="bg-[#0A3D24] text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-[#0A3D24]/20 flex items-center justify-center gap-3"
                        >
                            Setup EMI Schedule <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-gray-50 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
                        >
                            Onboard Another User
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#0A3D24] rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Direct Registration</h1>
                        <p className="text-gray-500 font-medium">Create a user and course application in one step.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* User Details */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-2">
                            <User size={18} className="text-[#0A3D24]" /> User Information
                        </h3>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    required
                                    type="text"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    required
                                    type="email"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Contact Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    required
                                    type="text"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    placeholder="+91 00000 00000"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Password (Optional)</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    placeholder="Spruce@123 (Default)"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <p className="text-[9px] text-gray-400 font-bold mt-2 ml-1">Leave blank to use the default password.</p>
                        </div>
                    </div>

                    {/* Course Selection */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-2">
                            <BookOpen size={18} className="text-[#0A3D24]" /> Course Selection
                        </h3>

                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-1">Select Course</label>
                            <select
                                required
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                                value={formData.courseSlug}
                                onChange={(e) => handleCourseChange(e.target.value)}
                            >
                                <option value="">Choose a course...</option>
                                {courses.map(course => (
                                    <option key={course.slug} value={course.slug}>{course.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#0A3D24]/5 border border-[#0A3D24]/10">
                            <p className="text-[10px] font-black text-[#0A3D24] uppercase tracking-widest mb-2">Workflow info</p>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                Creating this record will:
                                <br />• Register the user if they don't exist
                                <br />• Create an <b>accepted</b> application
                                <br />• Enable immediate EMI setup
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-[24px] font-bold border border-red-100 flex items-center gap-3 animate-shake">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0A3D24] text-white py-6 rounded-[32px] font-black text-xl hover:bg-black transition-all shadow-2xl shadow-[#0A3D24]/20 flex items-center justify-center gap-4 disabled:opacity-50 group"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" /> Processing...
                        </>
                    ) : (
                        <>
                            Complete Registration <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
