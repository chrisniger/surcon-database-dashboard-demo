'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { statusBadge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { mockSurveyData, surveyTypes, type SurveyRecord } from '@/data/mockSurveyData';
import { Search, MapPin, Plus, Eye, Paperclip } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function SurveyDataPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selected, setSelected] = useState<SurveyRecord | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = mockSurveyData.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
    const matchType = !typeFilter || s.surveyType === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <DashboardShell pageTitle="Store Survey Data">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary cards */}
        {[
          { label: 'Total Surveys', value: filtered.length, sub: 'All submissions' },
          { label: 'Approved', value: filtered.filter((s) => s.approvalStatus === 'Approved').length, sub: 'Verified records' },
          { label: 'Pending Review', value: filtered.filter((s) => s.approvalStatus === 'Pending').length, sub: 'Awaiting approval' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-40">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search surveys..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Types</option>
              {surveyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Button onClick={() => setAddOpen(true)} size="sm">
              <Plus size={14} /> Add Record
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Survey Title', 'Type', 'Location', 'Submitted By', 'Date', 'Docs', 'Approval', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs">{s.title}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{s.surveyType}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{s.submittedBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(s.dateSubmitted)}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-xs font-medium ${s.docStatus === 'Attached' ? 'text-green-700' : 'text-yellow-700'}`}>
                        <Paperclip size={12} /> {s.docStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(s.approvalStatus)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(s)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-green-700">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && <div className="py-12 text-center text-sm text-gray-400">No survey records found.</div>}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Survey Location Map</h3>
          </div>
          <div className="relative bg-gray-100 h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-xs text-gray-500">Interactive map</p>
              <p className="text-xs text-gray-400">Integration pending</p>
            </div>
            {/* Decorative dots for states */}
            {[
              { top: '35%', left: '45%' }, { top: '55%', left: '38%' },
              { top: '30%', left: '60%' }, { top: '65%', left: '55%' },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow"
                style={pos}
              />
            ))}
          </div>
          <div className="p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-600">Recent Locations</p>
            {filtered.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={11} className="text-green-600 shrink-0" />
                <span className="truncate">{s.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Survey Record Details">
        {selected && (
          <div className="space-y-2.5 text-sm">
            {[
              ['Title', selected.title], ['Survey Type', selected.surveyType],
              ['Location', selected.location], ['State', selected.state],
              ['Submitted By', selected.submittedBy], ['Date Submitted', formatDate(selected.dateSubmitted)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900 text-right max-w-56">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Documents</span>
              {statusBadge(selected.docStatus)}
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500">Approval Status</span>
              {statusBadge(selected.approvalStatus)}
            </div>
          </div>
        )}
      </Modal>

      {/* Add modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Survey Record">
        <form onSubmit={(e) => { e.preventDefault(); setAddOpen(false); setToast('Survey record saved.'); }} className="space-y-4">
          {[['Survey Title', 'text'], ['Location', 'text']].map(([label, type]) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input type={type} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Survey Type</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" required>
              <option value="">Select type</option>
              {surveyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setAddOpen(false)} type="button">Cancel</Button>
            <Button type="submit">Save Record</Button>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
