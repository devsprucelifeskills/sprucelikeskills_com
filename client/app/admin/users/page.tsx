"use client";

import { useEffect, useState } from 'react';
import { Users, Search, Trash2, ChevronDown, Shield, UserCheck, GraduationCap } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'trainer' | 'admin';
  createdAt: string;
}

const roleBadge: Record<string, { label: string; class: string; icon: React.ElementType }> = {
  admin: { label: 'Admin', class: 'bg-purple-100 text-purple-700', icon: Shield },
  trainer: { label: 'Trainer', class: 'bg-blue-100 text-blue-700', icon: UserCheck },
  student: { label: 'Student', class: 'bg-green-100 text-green-700', icon: GraduationCap },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(search);
  };

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
        alert(data.message || 'Failed to update role');
      }
    } catch {
      alert('Error updating role');
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
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch {
      alert('Error deleting user');
    }
  };

  return (
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

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D24]/20 w-64"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0A3D24] text-white text-sm px-4 py-2.5 rounded-xl font-medium hover:bg-[#0d4f2f] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#0A3D24] border-t-transparent rounded-full animate-spin" />
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
                          <div className="w-8 h-8 rounded-full bg-[#0A3D24] flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                              className="appearance-none bg-gray-100 text-gray-700 text-xs font-medium pl-3 pr-7 py-1.5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#0A3D24]/30 cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50"
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
  );
}
