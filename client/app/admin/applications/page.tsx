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

    const updateStatus = async (id: string, status: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backend}/api/v2/applications/admin/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.success) {
                setApplications(prev => prev.map(app => 
                    app._id === id ? { ...app, status: status as any } : app
                ));
            }
        } catch (err) {
            console.error("Error updating status:", err);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm animate-pulse h-64"></div>
                    ))}
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">No applications found</h3>
                    <p className="text-gray-400 font-medium font-sans">We couldn't find any applications matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApplications.map((app) => (
                        <div key={app._id} className="group bg-white rounded-[40px] p-1 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#0A3D24]/5 transition-all duration-500 overflow-hidden flex flex-col">
                            <div className="bg-gray-50/50 p-8 rounded-[36px] flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusClass(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        {app.status}
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 mb-6 leading-tight group-hover:text-[#0A3D24] transition-colors">
                                    {app.name}
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                                            <Mail size={14} />
                                        </div>
                                        <span className="text-sm font-bold truncate">{app.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                                            <Phone size={14} />
                                        </div>
                                        <span className="text-sm font-bold">{app.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                                            <GraduationCap size={14} />
                                        </div>
                                        <span className="text-sm font-bold text-[#0A3D24]">{app.courseTitle}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <select 
                                        className="flex-1 bg-white border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl outline-none focus:border-[#FDB813] transition-all cursor-pointer"
                                        value={app.status}
                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                    >
                                        <option value="pending">Mark Pending</option>
                                        <option value="reviewed">Mark Reviewed</option>
                                        <option value="enrolled">Mark Enrolled</option>
                                        <option value="rejected">Mark Rejected</option>
                                    </select>
                                    
                                    <a 
                                        href={`/admin/enrollments/new?appId=${app._id}&name=${encodeURIComponent(app.name)}&email=${encodeURIComponent(app.email)}&course=${encodeURIComponent(app.courseTitle)}&slug=${app.courseSlug}`}
                                        className="bg-[#0A3D24] hover:bg-black text-white p-3 rounded-xl shadow-lg transition-all hover:scale-105"
                                        title="Setup Enrollment"
                                    >
                                        <Plus size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
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
