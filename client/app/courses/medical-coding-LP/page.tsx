import React from 'react';

export default function MedicalCodingLandingPagePlaceholder() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-150">
                <h1 className="text-2xl font-black text-gray-900 mb-2">Medical Coding Course</h1>
                <p className="text-sm font-semibold text-gray-500 mb-6">Admissions open soon. Our team is currently preparing the layout for this course.</p>
                <a 
                    href="/" 
                    className="inline-block bg-[#0A3D24] hover:bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}
