'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { statusBadge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { mockUsers, roles, permissions } from '@/data/mockUsers';
import { Search, Plus, Check, X as XIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function UsersRolesPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [tab, setTab] = useState<'users' | 'permissions'>('users');

  const filtered = mockUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardShell pageTitle="Users & Roles">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl border border-gray-100 shadow-sm p-1 w-fit">
        {(['users', 'permissions'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t ? 'bg-green-800 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t === 'users' ? 'User Management' : 'Permission Matrix'}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-48">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Roles</option>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
            <Button onClick={() => setAddOpen(true)}>
              <Plus size={15} /> Add User
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['User', 'Role', 'Department', 'Status', 'Last Login', 'Date Created', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-xs font-bold">
                          {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{statusBadge(u.role)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.department}</td>
                    <td className="px-4 py-3">{statusBadge(u.status)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{u.lastLogin}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(u.dateCreated)}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" onClick={() => setToast(`Editing ${u.name}`)}>Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'permissions' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Role Permission Matrix</h3>
            <p className="text-xs text-gray-500 mt-1">Permissions assigned to each role across the platform</p>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 w-44">Permission</th>
                {roles.map((r) => (
                  <th key={r} className="px-3 py-3 text-center font-semibold text-gray-600 min-w-[100px]">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p) => (
                <tr key={p.action} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{p.action}</td>
                  {roles.map((r) => {
                    const has = p[r as keyof typeof p] as boolean;
                    return (
                      <td key={r} className="px-3 py-3 text-center">
                        {has
                          ? <Check size={15} className="mx-auto text-green-600" />
                          : <XIcon size={15} className="mx-auto text-gray-300" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add User Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New User">
        <form onSubmit={(e) => { e.preventDefault(); setAddOpen(false); setToast('User account created successfully.'); }} className="space-y-4">
          {[['Full Name', 'text'], ['Email Address', 'email'], ['Department', 'text']].map(([label, type]) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input type={type} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Role</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required>
              <option value="">Select role</option>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setAddOpen(false)} type="button">Cancel</Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
