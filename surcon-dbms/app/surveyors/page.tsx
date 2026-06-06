'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { statusBadge } from '@/components/ui/Badge';
import { mockSurveyors, nigerianStates, type Surveyor } from '@/data/mockSurveyors';
import { Search, Plus, Eye, Pencil, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function SurveyorsPage() {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Surveyor | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'add'>('view');
  const [toast, setToast] = useState<{ msg: string } | null>(null);

  const filtered = mockSurveyors.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q);
    const matchState = !stateFilter || s.state === stateFilter;
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchState && matchStatus;
  });

  function openView(s: Surveyor) { setSelected(s); setModalMode('view'); }
  function openAdd() { setSelected(null); setModalMode('add'); }

  return (
    <DashboardShell pageTitle="Surveyors Register">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name or registration number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Filter size={14} className="text-gray-400" />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All States</option>
              {nigerianStates.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Statuses</option>
              <option>Active</option><option>Inactive</option><option>Suspended</option>
            </select>
          </div>
          <Button onClick={openAdd} size="md">
            <Plus size={15} /> Add Surveyor
          </Button>
        </div>

        {/* Summary row */}
        <div className="px-5 py-3 bg-gray-50 flex gap-6 text-xs text-gray-500 border-b border-gray-100">
          <span>Total: <strong className="text-gray-700">{filtered.length}</strong></span>
          <span>Active: <strong className="text-green-700">{filtered.filter((s) => s.status === 'Active').length}</strong></span>
          <span>Certified: <strong className="text-green-700">{filtered.filter((s) => s.certStatus === 'Certified').length}</strong></span>
          <span>Pending: <strong className="text-yellow-700">{filtered.filter((s) => s.certStatus === 'Pending').length}</strong></span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Name', 'Reg. Number', 'State', 'Category', 'Cert. Status', 'Date Registered', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">{s.regNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{s.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{s.category}</td>
                  <td className="px-4 py-3">{statusBadge(s.certStatus)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(s.dateRegistered)}</td>
                  <td className="px-4 py-3">{statusBadge(s.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openView(s)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-green-700"><Eye size={15} /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-blue-700"><Pencil size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="py-12 text-center text-sm text-gray-400">No surveyors match your filters.</div>
          )}
        </div>
      </div>

      {/* View Modal */}
      <Modal open={!!selected && modalMode === 'view'} onClose={() => setSelected(null)} title="Surveyor Details">
        {selected && (
          <div className="space-y-3 text-sm">
            {[
              ['Full Name', selected.name], ['Registration No.', selected.regNo],
              ['State', selected.state], ['Category', selected.category],
              ['Email', selected.email], ['Phone', selected.phone],
              ['Date Registered', formatDate(selected.dateRegistered)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              {statusBadge(selected.status)}
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Cert. Status</span>
              {statusBadge(selected.certStatus)}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal open={modalMode === 'add' && selected === null && false} onClose={() => {}} title="Add Surveyor">
        <p>Form coming soon.</p>
      </Modal>

      {/* Add Surveyor form modal */}
      <AddSurveyorModal
        open={modalMode === 'add'}
        onClose={() => setModalMode('view')}
        onSave={() => { setModalMode('view'); setToast({ msg: 'Surveyor record created successfully.' }); }}
      />

      {toast && <Toast message={toast.msg} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}

function AddSurveyorModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({ name: '', state: '', category: '', email: '', phone: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Modal open={open} onClose={onClose} title="Add New Surveyor">
      <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
        {[['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Phone', 'phone', 'text']].map(([label, key, type]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={set(key)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
          <select value={form.state} onChange={set('state')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required>
            <option value="">Select state</option>
            {nigerianStates.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
          <select value={form.category} onChange={set('category')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required>
            <option value="">Select category</option>
            <option>Graduate Surveyor</option>
            <option>Licensed Surveyor</option>
            <option>Senior Surveyor</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit">Save Record</Button>
        </div>
      </form>
    </Modal>
  );
}
