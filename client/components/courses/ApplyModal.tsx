"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Send, User, Mail, Phone, GraduationCap } from 'lucide-react';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    courseSlug: string;
}

export default function ApplyModal({ isOpen, onClose, courseTitle, courseSlug }: ApplyModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isOpen) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    setFormData(prev => ({
                        ...prev,
                        name: user.name || prev.name,
                        email: user.email || prev.email
                    }));
                } catch (err) {
                    console.error("Error parsing user data:", err);
                }
            }
        }
    }, [isOpen]);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic phone validation
        const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
        if (!phoneRegex.test(formData.contact.replace(/\s/g, ''))) {
            setError('Please enter a valid contact number.');
            setLoading(false);
            return;
        }

        try {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
            const res = await fetch(`${backend_url}/api/v2/applications/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    courseSlug,
                    courseTitle
                })
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                    setFormData({ name: '', email: '', contact: '' });
                }, 3000);
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error("Error submitting application:", err);
            setError('Failed to submit application. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">

                {/* Header strip */}
                <div className="bg-[#0A3D24] px-8 pt-8 pb-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="w-5 h-5 text-[#2ecc71]" />
                        <span className="text-[#2ecc71] text-xs font-black uppercase tracking-widest">
                            Course Application
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight">
                        Apply for {courseTitle}
                    </h3>
                    <p className="text-white/60 mt-2 text-sm font-medium">
                        Fill in your details and we'll get back to you with next steps.
                    </p>
                </div>

                {success ? (
                    <div className="p-10 text-center">
                        <div className="w-16 h-16 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 size={32} className="text-[#2ecc71]" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3">Application Submitted!</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Your application for <span className="text-[#0A3D24] font-bold">{courseTitle}</span> has been received. Our team will contact you shortly!
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:ring-2 focus:ring-[#0A3D24]/10 focus:bg-white pl-11 pr-5 py-3.5 rounded-xl outline-none transition-all font-semibold text-gray-900 text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:ring-2 focus:ring-[#0A3D24]/10 focus:bg-white pl-11 pr-5 py-3.5 rounded-xl outline-none transition-all font-semibold text-gray-900 text-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                Contact Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:ring-2 focus:ring-[#0A3D24]/10 focus:bg-white pl-11 pr-5 py-3.5 rounded-xl outline-none transition-all font-semibold text-gray-900 text-sm"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 text-red-600 text-sm font-semibold bg-red-50 p-4 rounded-xl border border-red-100">
                                <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            className="w-full bg-[#0A3D24] hover:bg-[#072d1a] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#0A3D24]/15 flex items-center justify-center gap-2.5 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Submit Application
                                    <Send size={16} />
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-400 font-medium pt-1">
                            By applying, you agree to be contacted by our admissions team.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
