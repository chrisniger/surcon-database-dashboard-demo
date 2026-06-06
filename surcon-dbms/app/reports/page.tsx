'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { mockReports, reportTypes } from '@/data/mockReports';
import { FileText, Download, FileSpreadsheet, File, BarChart2, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('');
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-06-30');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function handleGenerate() {
    if (!reportType) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500);
  }

  return (
    <DashboardShell pageTitle="Reports">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report generator */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Generate Report</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => { setReportType(e.target.value); setGenerated(false); }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select report type...</option>
                {reportTypes.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button className="w-full justify-center" onClick={handleGenerate} disabled={!reportType || generating}>
              {generating ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : <><BarChart2 size={14} /> Generate Report</>}
            </Button>

            {generated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={15} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Report Ready</span>
                </div>
                <p className="text-xs text-green-700 mb-3">{reportType} · {dateFrom} to {dateTo}</p>
                <div className="flex gap-2">
                  <button onClick={() => setToast('PDF export started.')} className="flex items-center gap-1.5 text-xs bg-red-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-red-700">
                    <File size={12} /> PDF
                  </button>
                  <button onClick={() => setToast('Excel export started.')} className="flex items-center gap-1.5 text-xs bg-green-700 text-white px-2.5 py-1.5 rounded-lg hover:bg-green-800">
                    <FileSpreadsheet size={12} /> Excel
                  </button>
                  <button onClick={() => setToast('CSV export started.')} className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-blue-700">
                    <Download size={12} /> CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent reports */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Recent Reports</h3>
            <span className="text-xs text-gray-400">{mockReports.length} reports</span>
          </div>
          <div className="divide-y divide-gray-100">
            {mockReports.map((r) => (
              <div key={r.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-green-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.type} · {r.period}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(r.dateGenerated)}</span>
                    <span>By {r.generatedBy}</span>
                    <span>{r.recordCount.toLocaleString()} records</span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => setToast(`${r.title} PDF exported.`)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-600">
                    <File size={15} />
                  </button>
                  <button onClick={() => setToast(`${r.title} Excel exported.`)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-green-700">
                    <FileSpreadsheet size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
