"use client";

import { useEffect, useState } from 'react';
import { Video, Calendar, Link as LinkIcon, Trash2, Plus, Clock, AlertCircle, CheckCircle2, Pencil } from 'lucide-react';

interface Meeting {
  _id: string;
  courseId: string;
  courseTitle: string;
  meetingLink: string;
  startTime: string;
}

interface CourseOption {
  courseId: string;
  courseTitle: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMeeting, setEditingMeeting] = useState<Partial<Meeting> | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchMeetings();
    fetchCourseOptions();
  }, []);

  const fetchCourseOptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const res = await fetch(`${backend}/api/v2/admin/unique-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCourseOptions(data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const res = await fetch(`${backend}/api/v2/admin/meetings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMeetings(data.meetings);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeeting?.courseId || !editingMeeting?.courseTitle || !editingMeeting?.meetingLink || !editingMeeting?.startTime) {
      setStatus({ type: 'error', message: 'All fields are required' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

      const payload = {
        ...editingMeeting,
        startTime: new Date(editingMeeting.startTime as string).toISOString()
      };

      const res = await fetch(`${backend}/api/v2/admin/meetings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Meeting saved successfully' });
        setEditingMeeting(null);
        fetchMeetings();
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to save meeting' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred while saving' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;

    try {
      const token = localStorage.getItem('token');
      const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';
      const res = await fetch(`${backend}/api/v2/admin/meetings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Meeting deleted successfully' });
        fetchMeetings();
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to delete meeting' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-1">
            <Video size={14} />
            <span>Class Management</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Meeting Schedules</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage live class links and timings for courses.</p>
        </div>
        <button
          onClick={() => setEditingMeeting({ courseId: '', courseTitle: '', meetingLink: '', startTime: '' })}
          className="flex items-center gap-2 bg-[#13523f] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1a6e4a] transition-all"
        >
          <Plus size={20} />
          Add New Meeting
        </button>
      </div>

      {status && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-semibold ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Meeting Form/Editor */}
        {editingMeeting && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                {editingMeeting._id ? 'Edit Meeting' : 'Schedule New Meeting'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Select Course</label>
                  <div className="relative">
                    <select
                      value={editingMeeting.courseId}
                      onChange={(e) => {
                        const selected = courseOptions.find(c => c.courseId === e.target.value);
                        if (selected) {
                          setEditingMeeting({
                            ...editingMeeting,
                            courseId: selected.courseId,
                            courseTitle: selected.courseTitle
                          });
                        }
                      }}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/20 font-semibold text-gray-900 cursor-pointer shadow-sm"
                      required
                    >
                      <option value="" disabled>Select a course...</option>
                      {courseOptions.map(c => (
                        <option key={c.courseId} value={c.courseId}>{c.courseTitle}</option>
                      ))}
                      {courseOptions.length === 0 && (
                        <option value="" disabled>No active courses found</option>
                      )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                {editingMeeting.courseId && (
                  <div className="bg-[#13523f]/5 p-4 rounded-xl border border-[#13523f]/10">
                    <p className="text-[10px] font-black uppercase text-[#13523f] tracking-widest mb-1">Selected Course ID</p>
                    <p className="text-sm font-mono text-gray-700 font-bold truncate">{editingMeeting.courseId}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Meeting URL</label>
                  <div className="relative">
                    <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      placeholder="https://zoom.us/j/..."
                      value={editingMeeting.meetingLink}
                      onChange={(e) => setEditingMeeting({ ...editingMeeting, meetingLink: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D24]/20 font-semibold text-gray-900 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Start Date & Time</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="datetime-local"
                      value={editingMeeting.startTime ? new Date(new Date(editingMeeting.startTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                      onChange={(e) => setEditingMeeting({ ...editingMeeting, startTime: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/20 font-semibold text-gray-900 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#2ecc71] text-white py-3 rounded-xl font-bold hover:bg-[#27ae60] transition-all shadow-lg shadow-[#2ecc71]/20"
                  >
                    Save Meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingMeeting(null)}
                    className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all text-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Meeting List */}
        <div className={editingMeeting ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#13523f] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : meetings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Video size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">No meetings scheduled yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-left">
                      <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Course</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Schedule</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Meeting Info</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {meetings.map((m) => (
                      <tr key={m._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{m.courseTitle}</p>
                          <p className="text-gray-400 text-xs font-mono">{m.courseId}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                              <Calendar size={14} className="text-[#13523f]" />
                              {new Date(m.startTime).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                              <Clock size={12} />
                              {new Date(m.startTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={m.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#2ecc71] font-bold hover:underline max-w-[150px] truncate"
                          >
                            <LinkIcon size={14} />
                            Launch Link
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setEditingMeeting(m)}
                              className="p-2 text-gray-400 hover:text-[#13523f] hover:bg-gray-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(m._id)}
                              className="p-2 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
