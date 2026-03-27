"use client";

import React, { useState, useEffect } from 'react';
import { X, User, Phone, MessageSquare, Send, Loader2, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseName?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultCourseName }: EnquiryModalProps) {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '', courseName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (defaultCourseName) {
        setFormData(prev => ({ ...prev, courseName: defaultCourseName }));
      }
    } else {
      document.body.style.overflow = 'unset';
      if (isSuccess) {
        setFormData({ name: '', contact: '', message: '', courseName: '' });
        setIsSuccess(false);
      }
      setError(null);
    }
  }, [isOpen, isSuccess, defaultCourseName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/enquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => onClose(), 2000);
      } else {
        setError(data.message || 'Failed to submit enquiry');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2ecc71]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-[#2ecc71]" size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Drop an Enquiry</h2>
              <p className="text-[11px] text-gray-400 font-medium">We'll get back to you shortly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none font-medium text-gray-900"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  required
                  placeholder="Email or Phone Number"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none font-medium text-gray-900"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Course Name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none font-medium text-gray-900"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={15} />
                <textarea
                  required
                  placeholder="Your Message"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A3D24] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm transition-all outline-none font-medium text-gray-900 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#13523f] hover:bg-[#1a6e4a] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={15} /> Sending...</>
                ) : (
                  <>Submit Enquiry <Send size={14} /></>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2ecc71]/10 rounded-full mb-4">
                <CheckCircle2 className="text-[#2ecc71]" size={36} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-500 text-sm font-medium">Your enquiry has been received. We'll contact you shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
