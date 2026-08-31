import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import { Users, ArrowLeft, ShieldCheck, ShieldAlert, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setUsers(data);
        }
      } catch (e) {
        console.error('Error fetching users:', e);
      }
    } else {
      // Local fallback mock users
      setUsers([
        {
          id: '1',
          name: 'Khademul Islam (Admin)',
          email: 'admin@deen.test',
          is_admin: true,
          city: 'Dhaka',
          country: 'Bangladesh',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Regular Believer',
          email: 'user@deen.test',
          is_admin: false,
          city: 'London',
          country: 'UK',
          created_at: new Date().toISOString()
        }
      ]);
    }
    setLoading(false);
  };

  const toggleAdmin = async (id, currentVal) => {
    const nextVal = !currentVal;
    if (isSupabaseConfigured()) {
      await supabase.from('profiles').update({ is_admin: nextVal }).eq('id', id);
    }
    setUsers(users.map((u) => (u.id === id ? { ...u, is_admin: nextVal } : u)));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          User Management & Roles
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Inspect registered accounts and manage admin roles across the platform.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Location</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="font-black text-slate-800 dark:text-slate-200">{u.name || 'Anonymous User'}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{u.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                    {u.city || 'N/A'}, {u.country || 'N/A'}
                  </td>
                  <td className="p-4">
                    {u.is_admin ? (
                      <span className="text-[10px] font-black uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        Member
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleAdmin(u.id, u.is_admin)}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {u.is_admin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
