'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { statusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Toast } from '@/components/ui/Toast';
import { mockCertifications, certSummary, type Certification } from '@/data/mockCertifications';
import { Search, Award, Clock, AlertCircle, CheckCircle2, Eye } from 'lucide-react';
import { formatDate, formatNumber } from '@/lib/utils';

const summaryCards = [
  { label: 'Total Certifications', value: certSummary.total, icon: Award, color: 'bg-green-50 text-green-700' },
  { label: 'Active', value: certSummary.active, icon: CheckCircle2, color: 'bg-green-50 text-green-700' },
  { label: 'Pending', value: certSummary.pending, icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
  { label: 'Expired', value: certSummary.expired, icon: AlertCircle, color: 'bg-red-50 text-red-700' },
];

export default function CertificationsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Certification | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = mockCertifications.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.surveyorName.toLowerCase().includes(q) || c.regNo.toLowerCase().includes(q);
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardShell pageTitle="Certification Management">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(value)}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or registration..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Statuses</option>
            <option>Active</option><option>Pending</option><option>Expired</option><option>Revoked</option>
          </select>
          <Button onClick={() => setToast('Certificate renewal initiated.')}>Renew Selected</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Surveyor Name', 'Reg. Number', 'Certificate Type', 'Issue Date', 'Expiry Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.surveyorName}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">{c.regNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.certType}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(c.issueDate)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(c.expiryDate)}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(c)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-green-700">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="py-12 text-center text-sm text-gray-400">No certifications found.</div>}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Certification Details">
        {selected && (
          <div className="space-y-3 text-sm">
            {[
              ['Surveyor Name', selected.surveyorName], ['Registration No.', selected.regNo],
              ['Certificate Type', selected.certType], ['Issue Date', formatDate(selected.issueDate)],
              ['Expiry Date', formatDate(selected.expiryDate)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Status</span>
              {statusBadge(selected.status)}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
              <Button onClick={() => { setSelected(null); setToast('Certificate renewal initiated.'); }}>Renew Certificate</Button>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
