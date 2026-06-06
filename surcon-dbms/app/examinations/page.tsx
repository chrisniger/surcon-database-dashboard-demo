'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { statusBadge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { mockExaminations, examBatches } from '@/data/mockExaminations';
import { Search, FilePlus2 } from 'lucide-react';

export default function ExaminationsPage() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filtered = mockExaminations.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.candidateName.toLowerCase().includes(q) || e.regNo.toLowerCase().includes(q);
    const matchYear = !yearFilter || e.examSession === yearFilter;
    const matchStatus = !statusFilter || e.resultStatus === statusFilter;
    return matchSearch && matchYear && matchStatus;
  });

  const passed = filtered.filter((e) => e.resultStatus === 'Pass').length;
  const failed = filtered.filter((e) => e.resultStatus === 'Fail').length;

  return (
    <DashboardShell pageTitle="Examination Records">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Toolbar */}
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
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Sessions</option>
            {examBatches.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Results</option>
            <option>Pass</option><option>Fail</option><option>Pending</option><option>Absent</option>
          </select>
          <Button onClick={() => setToast('Result generation initiated for selected batch.')}>
            <FilePlus2 size={15} /> Generate Results
          </Button>
        </div>

        {/* Stats row */}
        <div className="px-5 py-3 bg-gray-50 flex gap-6 text-xs text-gray-500 border-b border-gray-100">
          <span>Showing: <strong className="text-gray-700">{filtered.length}</strong></span>
          <span>Passed: <strong className="text-green-700">{passed}</strong></span>
          <span>Failed: <strong className="text-red-600">{failed}</strong></span>
          <span>Pass Rate: <strong className="text-gray-700">{filtered.length ? Math.round((passed / filtered.length) * 100) : 0}%</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Candidate Name', 'Reg. Number', 'Session', 'Score', 'Grade', 'Result', 'Cert. Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{e.candidateName}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">{e.regNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.examSession}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{e.score}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      e.grade === 'A' ? 'bg-green-100 text-green-800' :
                      e.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      e.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      e.grade === 'D' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>{e.grade}</span>
                  </td>
                  <td className="px-4 py-3">{statusBadge(e.resultStatus)}</td>
                  <td className="px-4 py-3">{statusBadge(e.certStatus)}</td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost" onClick={() => setToast(`Result slip printed for ${e.candidateName}`)}>
                      Print
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="py-12 text-center text-sm text-gray-400">No examination records found.</div>}
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
