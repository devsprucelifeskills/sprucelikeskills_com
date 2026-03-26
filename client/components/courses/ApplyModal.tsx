"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Send } from 'lucide-react';

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

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                >
                    <X size={24} />
                </button>

                {success ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-[#2ecc71]" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4">Success!</h3>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            Your application for <span className="text-[#0A3D24] font-bold">{courseTitle}</span> has been submitted successfully. Our team will contact you shortly!
                        </p>
                    </div>
                ) : (
                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <span className="inline-block px-4 py-1.5 bg-[#0A3D24]/5 text-[#0A3D24] rounded-full text-xs font-black uppercase tracking-wider mb-4">
                                Course Application
                            </span>
                            <h3 className="text-3xl font-black text-gray-900 leading-tight">
                                Apply for {courseTitle}
                            </h3>
                            <p className="text-gray-500 mt-2 font-medium">
                                Fill in your details below and we'll get back to you with the next steps.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Enter your name"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Contact Number</label>
                                <input 
                                    required
                                    type="tel" 
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#FDB813] focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-bold text-gray-900 shadow-sm"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100 animate-shake">
                                    {error}
                                </p>
                            )}

                            <button 
                                disabled={loading}
                                className="w-full bg-[#0A3D24] hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#0A3D24]/10 flex items-center justify-center gap-3 uppercase tracking-widest text-sm mt-4 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
