"use client";

import React, { useEffect, useState } from 'react';
import {
    FileText,
    Search,
    CheckCircle2,
    Clock,
    ChevronRight,
    User,
    Mail,
    Phone,
    MoreVertical,
    Check,
    X
} from 'lucide-react';
import { courses } from '@/lib/courses';

interface Application {
    _id: string;
    name: string;
    email: string;
    contact: string;
    courseTitle: string;
    courseSlug: string;
    status: 'pending' | 'reviewed' | 'enrolled' | 'rejected';
    createdAt: string;
}

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/applications/admin`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setApplications(data.applications);
            }
        } catch (err) {
            console.error("Error fetching applications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (app: Application, status: string) => {
        try {
            const token = localStorage.getItem('token');

            if (status === 'enrolled') {
                if (!confirm(`Marking ${app.name} as Enrolled will automatically generate a full-payment invoice. Continue?`)) {
                    return; // abort
                }

                // 1. Find User
                const userRes = await fetch(`${backend}/api/v2/admin/users?search=${encodeURIComponent(app.email)}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = await userRes.json();
                if (!userData.success || userData.users.length === 0) {
                    alert("Cannot enroll: Student has not registered an account with this email.");
                    return;
                }
                const userId = userData.users[0]._id;

                // 2. Find Course Fee
                let totalFee = 0;
                // Check static courses
                const staticCourse = courses.find((c: any) => c.slug === app.courseSlug);
                if (staticCourse) totalFee = staticCourse.price || 0;

                // Check CourseSettings from DB
                try {
                    const settingsRes = await fetch(`${backend}/api/v2/enrollments/admin/course-settings/${app.courseSlug}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const settingsData = await settingsRes.json();
                    if (settingsData.success && settingsData.settings) {
                        totalFee = settingsData.settings.defaultTotalFee || totalFee;
                    }
                } catch (e) { /* ignore */ }

                // 3. Setup Enrollment (1 installment)
                const setupRes = await fetch(`${backend}/api/v2/enrollments/admin/setup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        userId,
                        courseSlug: app.courseSlug,
                        courseTitle: app.courseTitle,
                        mode: 'auto',
                        totalFee: totalFee,
                        discountAmount: 0,
                        discountTitle: 'Scholarship',
                        installmentsCount: 1, // Full payment
                        startDate: new Date().toISOString().split('T')[0],
                        intervalDays: 30
                    })
                });

                const setupData = await setupRes.json();
                if (!setupData.success) {
                    alert(`Failed to create enrollment: ${setupData.message}`);
                    return;
                }
            }

            // Finally, update the application status to whatever they chose
            const res = await fetch(`${backend}/api/v2/applications/admin/${app._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.success) {
                setApplications(prev => prev.map(a =>
                    a._id === app._id ? { ...a, status: status as any } : a
                ));
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("An error occurred while updating status.");
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.email.toLowerCase().includes(search.toLowerCase()) ||
            app.courseTitle.toLowerCase().includes(search.toLowerCase());

        // Only show enrolled or rejected students if explicitly selected from the dropdown
        const matchesStatus = selectedStatus === 'all'
            ? !['enrolled', 'rejected'].includes(app.status)
            : app.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="text-yellow-500" size={14} />;
            case 'reviewed': return <CheckCircle2 className="text-blue-500" size={14} />;
            case 'enrolled': return <Check className="text-green-500" size={14} />;
            case 'rejected': return <X className="text-red-500" size={14} />;
            default: return null;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'reviewed': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'enrolled': return 'bg-green-50 text-green-600 border-green-100';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="p-0">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#0A3D24] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0A3D24]/10">
                            <FileText size={20} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Applications</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Review and manage incoming course enrollment applications.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="pl-12 pr-6 py-3 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-[#FDB813] focus:bg-white transition-all text-sm font-bold min-w-[300px]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-6 py-3 bg-gray-50 rounded-xl outline-none border-2 border-transparent focus:border-[#FDB813] focus:bg-white transition-all text-sm font-bold text-gray-600 cursor-pointer"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
                    <div className="animate-pulse flex flex-col gap-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-gray-50 rounded-2xl w-full"></div>)}
                    </div>
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No applications found</h3>
                    <p className="text-gray-400 font-medium font-sans">We couldn't find any applications matching your criteria.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Applicant</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0A3D24] font-black text-xs">
                                                    {app.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-sm whitespace-nowrap group-hover:text-[#0A3D24] transition-colors">{app.name}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Mail size={10} /> {app.email}</span>
                                                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Phone size={10} /> {app.contact}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                                    <GraduationCap size={14} />
                                                </div>
                                                <p className="font-bold text-[#0A3D24] text-sm whitespace-nowrap">{app.courseTitle}</p>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest whitespace-nowrap">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="p-6">
                                            <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 w-fit whitespace-nowrap ${getStatusClass(app.status)}`}>
                                                {getStatusIcon(app.status)}
                                                {app.status}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <select
                                                    className="bg-white border border-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0A3D24]/10 transition-all cursor-pointer shadow-sm hover:border-gray-300"
                                                    value={app.status}
                                                    onChange={(e) => updateStatus(app, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="reviewed">Reviewed</option>
                                                    <option value="enrolled">Enrolled</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>

                                                <a
                                                    href={`/admin/enrollments/new?appId=${app._id}&name=${encodeURIComponent(app.name)}&email=${encodeURIComponent(app.email)}&course=${encodeURIComponent(app.courseTitle)}&slug=${app.courseSlug}`}
                                                    className="bg-[#0A3D24] hover:bg-[#0A3D24]/90 text-white p-2.5 rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center w-[150px]"
                                                    title="Setup Enrollment"
                                                >
                                                    Generate EMI
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple icons not imported above
const GraduationCap = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

const Plus = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
