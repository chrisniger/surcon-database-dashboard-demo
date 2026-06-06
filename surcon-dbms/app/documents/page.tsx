'use client';
import { useState, useRef } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { statusBadge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { mockDocuments, documentCategories } from '@/data/mockDocuments';
import { Upload, Search, FileText, Eye, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const fileTypeColors: Record<string, string> = {
  PDF: 'bg-red-100 text-red-700',
  JPG: 'bg-blue-100 text-blue-700',
  PNG: 'bg-purple-100 text-purple-700',
  DOCX: 'bg-blue-100 text-blue-800',
  XLSX: 'bg-green-100 text-green-700',
};

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = mockDocuments.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.uploadedBy.toLowerCase().includes(q);
    const matchCat = !catFilter || d.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <DashboardShell pageTitle="Document Uploads">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Upload card */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Upload Document</h3>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-gray-50 transition-colors mb-4"
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" className="hidden" onChange={() => setToast('Document uploaded successfully.')} />
            <Upload size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="text-xs text-gray-500">Click or drag to upload</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Document Category</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600">
                <option value="">Select category</option>
                {documentCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Linked Record</label>
              <input
                type="text"
                placeholder="SUR/REG/2025/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <Button className="w-full justify-center" onClick={() => setToast('Document uploaded successfully.')}>
              <Upload size={14} /> Upload Document
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Documents', value: '23,156', color: 'bg-blue-50 text-blue-700' },
            { label: 'Verified', value: '18,420', color: 'bg-green-50 text-green-700' },
            { label: 'Pending Review', value: '3,890', color: 'bg-yellow-50 text-yellow-700' },
            { label: 'Rejected', value: '846', color: 'bg-red-50 text-red-700' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-600 mb-3">By Category</p>
            <div className="flex flex-wrap gap-3">
              {documentCategories.map((c, i) => {
                const counts = [8420, 5310, 4200, 3120, 2106];
                return (
                  <div key={c} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-green-800 opacity-" style={{ opacity: 1 - i * 0.15 }} />
                    {c}: <strong>{counts[i].toLocaleString()}</strong>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">All Categories</option>
            {documentCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Document Name', 'Category', 'Uploaded By', 'Linked Record', 'Date Uploaded', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText size={14} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 max-w-xs truncate">{d.name}</p>
                        <p className="text-xs text-gray-400">{d.sizeKB} KB</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{d.uploadedBy}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 font-mono">{d.linkedRecord}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(d.dateUploaded)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {statusBadge(d.status)}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${fileTypeColors[d.fileType] ?? 'bg-gray-100 text-gray-600'}`}>{d.fileType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-green-700"><Eye size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-blue-700"><Download size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="py-12 text-center text-sm text-gray-400">No documents found.</div>}
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
