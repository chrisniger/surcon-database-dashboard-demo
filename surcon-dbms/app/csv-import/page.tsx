'use client';
import { useState, useRef } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Download } from 'lucide-react';

const sampleRows = [
  { name: 'Adebayo Olanrewaju', regNo: 'SUR/REG/2025/00139', state: 'Lagos', category: 'Licensed Surveyor', status: 'Valid' },
  { name: 'Chiamaka Obi', regNo: 'SUR/REG/2025/00140', state: 'Anambra', category: 'Graduate Surveyor', status: 'Valid' },
  { name: 'Danjuma Lawal', regNo: 'SUR/REG/2025/00141', state: 'Kebbi', category: 'Licensed Surveyor', status: 'Warning' },
  { name: 'Esther Nnadi', regNo: 'SUR/REG/2025/00142', state: 'Imo', category: 'Senior Surveyor', status: 'Valid' },
  { name: 'Femi Babatunde', regNo: '', state: 'Oyo', category: 'Graduate Surveyor', status: 'Error' },
];

export default function CsvImportPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [stage, setStage] = useState<'idle' | 'preview' | 'importing' | 'done'>('idle');
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile({ name: f.name, size: f.size }); setStage('preview'); }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) { setFile({ name: f.name, size: f.size }); setStage('preview'); }
  }

  function handleImport() {
    setStage('importing');
    setTimeout(() => { setStage('done'); setToast('5 records imported successfully. 1 warning flagged.'); }, 1800);
  }

  function reset() { setFile(null); setStage('idle'); }

  const validCount = sampleRows.filter((r) => r.status === 'Valid').length;
  const warnCount = sampleRows.filter((r) => r.status === 'Warning').length;
  const errorCount = sampleRows.filter((r) => r.status === 'Error').length;

  return (
    <DashboardShell pageTitle="CSV Import">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload zone + instructions */}
        <div className="lg:col-span-1 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              dragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-green-400 hover:bg-gray-50'
            }`}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleFileInput} />
            <Upload size={32} className={`mx-auto mb-3 ${dragging ? 'text-green-600' : 'text-gray-400'}`} />
            <p className="text-sm font-medium text-gray-700 mb-1">Drag &amp; drop your CSV file</p>
            <p className="text-xs text-gray-400 mb-4">or click to browse files</p>
            <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
              Select File
            </Button>
          </div>

          {file && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                <FileText size={18} className="text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={reset} className="p-1 rounded hover:bg-gray-100 text-gray-400"><X size={15} /></button>
            </div>
          )}

          {/* Format instructions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">CSV Format Requirements</h3>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {['First row must be headers', 'Required: Name, RegistrationNo, State', 'Optional: Category, Email, Phone', 'Registration format: SUR/REG/YYYY/NNNNN', 'Max file size: 5MB', 'UTF-8 encoding required'].map((r) => (
                <li key={r} className="flex items-start gap-1.5">
                  <CheckCircle2 size={13} className="text-green-600 mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
            <button className="mt-3 flex items-center gap-1.5 text-xs text-green-700 font-medium hover:underline">
              <Download size={12} /> Download Template
            </button>
          </div>
        </div>

        {/* Preview table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Import Preview</h3>
            {stage !== 'idle' && (
              <div className="flex items-center gap-3 text-xs">
                <span className="text-green-700 flex items-center gap-1"><CheckCircle2 size={12} /> {validCount} valid</span>
                <span className="text-yellow-700 flex items-center gap-1"><AlertCircle size={12} /> {warnCount} warning</span>
                <span className="text-red-600 flex items-center gap-1"><AlertCircle size={12} /> {errorCount} error</span>
              </div>
            )}
          </div>

          {stage === 'idle' ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Upload size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Upload a CSV file to preview rows</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {['#', 'Name', 'Reg. Number', 'State', 'Category', 'Validation'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((r, i) => (
                      <tr key={i} className={`border-t border-gray-100 ${r.status === 'Error' ? 'bg-red-50' : r.status === 'Warning' ? 'bg-yellow-50' : ''}`}>
                        <td className="px-4 py-2.5 text-xs text-gray-400">{i + 1}</td>
                        <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{r.name}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-600 font-mono">{r.regNo || <span className="text-red-500 italic">Missing</span>}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-600">{r.state}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-600">{r.category}</td>
                        <td className="px-4 py-2.5">
                          {r.status === 'Valid' && <span className="flex items-center gap-1 text-xs text-green-700"><CheckCircle2 size={12} /> Valid</span>}
                          {r.status === 'Warning' && <span className="flex items-center gap-1 text-xs text-yellow-700"><AlertCircle size={12} /> Duplicate suspected</span>}
                          {r.status === 'Error' && <span className="flex items-center gap-1 text-xs text-red-600"><AlertCircle size={12} /> Missing Reg. No.</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">{sampleRows.length} rows detected · {errorCount} error(s) will be skipped</p>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={reset}>Cancel</Button>
                  <Button onClick={handleImport} disabled={stage === 'importing' || stage === 'done'}>
                    {stage === 'importing' ? (
                      <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Importing...</>
                    ) : stage === 'done' ? <><CheckCircle2 size={14} /> Imported</> : 'Import Records'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
