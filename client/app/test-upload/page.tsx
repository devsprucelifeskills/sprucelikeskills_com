'use client';

import { useState } from 'react';

export default function TestUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [copied, setCopied] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setError(null);
            setImageUrl(null);
            setCopied(false);
        }
    };

    const copyToClipboard = () => {
        if (imageUrl) {
            navigator.clipboard.writeText(imageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setLoading(true);
        setError(null);
        setCopied(false);

        const formData = new FormData();
        formData.append('image', file);

        try {
            console.log('Initiating upload request to:', `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/upload/profile-image`);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v2/upload/profile-image`, {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                setImageUrl(data.imageUrl);
            } else {
                setError(data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('An error occurred during upload. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center font-sans">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80">
                <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Image Center
                </h1>

                <form onSubmit={handleUpload} className="space-y-6">
                    <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 bg-gray-900/50">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="file-upload"
                        />
                        <div className="flex flex-col items-center pointer-events-none">
                            <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-gray-300 font-medium">
                                {file ? file.name : 'Upload Profile Photo'}
                            </span>
                            <p className="text-gray-500 text-xs mt-2 text-center">
                                JPG, PNG, WEBP up to 10MB
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !file}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${loading || !file
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-900/20 active:scale-95'
                            }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        ) : 'Upload to Cloud'}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm animate-pulse">
                        {error}
                    </div>
                )}

                {imageUrl && (
                    <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-700"></div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Result</span>
                            <div className="h-px flex-1 bg-gray-700"></div>
                        </div>

                        <div className="relative group/img aspect-square w-48 mx-auto rounded-2xl overflow-hidden border-4 border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
                            <img
                                src={imageUrl}
                                alt="Uploaded Profile"
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-xl border border-gray-700">
                                <div className="flex-1 overflow-hidden px-2">
                                    <p className="text-xs font-mono text-gray-400 truncate">
                                        {imageUrl}
                                    </p>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 whitespace-nowrap ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                                        }`}
                                >
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
