"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Users, Search, Trash2, ChevronDown, Shield, UserCheck,
  GraduationCap, UserPlus, X, Eye, EyeOff, RefreshCw, CheckCircle2, AlertCircle,
} from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'trainer' | 'admin';
  createdAt: string;
}

const roleBadge: Record<string, { label: string; class: string; icon: React.ElementType }> = {
  admin:   { label: 'Admin',   class: 'bg-purple-100 text-purple-700', icon: Shield },
  trainer: { label: 'Trainer', class: 'bg-blue-100 text-blue-700',   icon: UserCheck },
  student: { label: 'Student', class: 'bg-green-100 text-green-700',  icon: GraduationCap },
};

/* ---------- helpers ---------- */
function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!';
  return (
    'Spruce@' +
    Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
}

/* ---------- Toast ---------- */
function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl max-w-sm
        ${type === 'success' ? 'bg-[#13523f] text-white' : 'bg-red-600 text-white'}`}
    >
      {type === 'success' ? <CheckCircle2 size={20} className="mt-0.5 shrink-0" /> : <AlertCircle size={20} className="mt-0.5 shrink-0" />}
      <p className="text-sm leading-snug">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={16} /></button>
    </div>
  );
}

/* ---------- Add User Modal ---------- */
interface AddUserModalProps {
  onClose: () => void;
  onCreated: (user: User) => void;
  backend: string;
}
function AddUserModal({ onClose, onCreated, backend }: AddUserModalProps) {
  const [form, setForm] = useState({ name: '', email: '', role: 'student', password: generatePassword() });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Name and email are required.'); return; }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${backend}/api/v2/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        onCreated(data.user);
      } else {
        setError(data.message || 'Failed to create user.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#13523f] to-[#1a6e4a] px-7 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg font-bold tracking-tight">Add New User</h2>
            <p className="text-white/70 text-xs mt-0.5">A welcome email with credentials will be sent automatically.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Rajan Sharma"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 focus:border-[#13523f] transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
            <input
              type="email"
              placeholder="e.g. rajan@example.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 focus:border-[#13523f] transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Role *</label>
            <div className="relative">
              <select
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 focus:border-[#13523f] cursor-pointer bg-white transition"
              >
                <option value="student">🎓 Student</option>
                <option value="trainer">✅ Trainer</option>
                <option value="admin">🛡️ Admin</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Password
              <span className="ml-1 text-gray-400 normal-case font-normal">(auto-generated if blank)</span>
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Leave blank to auto-generate"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-20 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 focus:border-[#13523f] transition"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => set('password', generatePassword())}
                  title="Generate new password"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#13523f] hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#13523f] hover:bg-gray-100 transition-colors"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Info note */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl text-xs leading-relaxed">
            <span className="mt-0.5">📧</span>
            <span>An email containing the login email &amp; password will be sent to the user automatically upon account creation.</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#13523f] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a6e4a] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating…</>
              ) : (
                <><UserPlus size={15} /> Create User</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========== Main Page ========== */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000';

  const fetchUsers = (q = '') => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(`${backend}/api/v2/admin/users?search=${encodeURIComponent(q)}&limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setTotal(data.total);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchUsers(search); };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backend}/api/v2/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole as User['role'] } : u)));
      } else {
        setToast({ type: 'error', message: data.message || 'Failed to update role' });
      }
    } catch {
      setToast({ type: 'error', message: 'Error updating role' });
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Delete user "${userName}"? This action cannot be undone.`)) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${backend}/api/v2/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setTotal((p) => p - 1);
        setToast({ type: 'success', message: `User "${userName}" deleted successfully.` });
      } else {
        setToast({ type: 'error', message: data.message || 'Failed to delete user' });
      }
    } catch {
      setToast({ type: 'error', message: 'Error deleting user' });
    }
  };

  const handleUserCreated = (newUser: User) => {
    setShowModal(false);
    setUsers((prev) => [newUser, ...prev]);
    setTotal((p) => p + 1);
    setToast({ type: 'success', message: `User "${newUser.name}" created! Welcome email sent to ${newUser.email}.` });
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-1">
              <Users size={14} />
              <span>User Management</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">All Users</h1>
            <p className="text-gray-400 text-sm mt-0.5">{total} total users</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Add User button */}
            <button
              id="add-user-btn"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#13523f] text-white text-sm px-4 py-2.5 rounded-xl font-semibold hover:bg-[#1a6e4a] active:scale-95 transition-all shadow-sm shadow-[#13523f]/30"
            >
              <UserPlus size={16} />
              Add User
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#13523f]/20 w-56"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#13523f] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs w-8">#</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Email</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Role</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Joined</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase tracking-wide text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user, i) => {
                    const badge = roleBadge[user.role];
                    const Icon = badge.icon;
                    return (
                      <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#13523f] flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.class}`}>
                            <Icon size={11} />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {/* Role selector */}
                            <div className="relative">
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                disabled={updating === user._id}
                                className="appearance-none bg-gray-100 text-gray-700 text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#13523f]/30 cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50"
                              >
                                <option value="student">Student</option>
                                <option value="trainer">Trainer</option>
                                <option value="admin">Admin</option>
                              </select>
                              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(user._id, user.name)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Delete user"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <AddUserModal
          backend={backend}
          onClose={() => setShowModal(false)}
          onCreated={handleUserCreated}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}
    </>
  );
}
