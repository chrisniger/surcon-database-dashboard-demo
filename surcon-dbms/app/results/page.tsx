'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { statusBadge } from '@/components/ui/Badge';
import { mockExaminations, examBatches } from '@/data/mockExaminations';
import { FileCheck2, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ResultsPage() {
  const [batch, setBatch] = useState('');
  const [step, setStep] = useState<'idle' | 'preview' | 'generating' | 'done'>('idle');
  const [successModal, setSuccessModal] = useState(false);

  const batchResults = batch ? mockExaminations.filter((e) => e.examSession === batch) : [];
  const passed = batchResults.filter((e) => e.resultStatus === 'Pass').length;
  const failed = batchResults.filter((e) => e.resultStatus === 'Fail').length;

  function handleGenerate() {
    setStep('generating');
    setTimeout(() => { setStep('done'); setSuccessModal(true); }, 1800);
  }

  return (
    <DashboardShell pageTitle="Result Generation">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Generate Examination Results</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Examination Batch</label>
                <select
                  value={batch}
                  onChange={(e) => { setBatch(e.target.value); setStep('idle'); }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select batch...</option>
                  {examBatches.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Candidate Group</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-600">
                  <option>All Candidates</option>
                  <option>Passed Only</option>
                  <option>Failed Only</option>
                </select>
              </div>

              {batch && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between"><span>Total Candidates</span><strong>{batchResults.length}</strong></div>
                  <div className="flex justify-between"><span>Passed</span><strong className="text-green-700">{passed}</strong></div>
                  <div className="flex justify-between"><span>Failed</span><strong className="text-red-600">{failed}</strong></div>
                  <div className="flex justify-between"><span>Pass Rate</span><strong>{batchResults.length ? Math.round((passed / batchResults.length) * 100) : 0}%</strong></div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => batch && setStep('preview')}
                  disabled={!batch}
                  className="flex-1"
                >
                  Preview
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!batch || step === 'generating'}
                  className="flex-1"
                >
                  {step === 'generating' ? (
                    <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                  ) : <><FileCheck2 size={14} /> Generate</>}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileCheck2, label: 'Reports Generated', value: '3,482', color: 'text-green-700 bg-green-50' },
              { icon: Users, label: 'Candidates Processed', value: '15,389', color: 'text-blue-700 bg-blue-50' },
              { icon: TrendingUp, label: 'Avg Pass Rate', value: '71%', color: 'text-purple-700 bg-purple-50' },
              { icon: CheckCircle2, label: 'Certified', value: '8,742', color: 'text-green-700 bg-green-50' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}><Icon size={16} /></div>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Result preview table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              {batch ? `Result Preview — ${batch}` : 'Result Table Preview'}
            </h3>
            {step === 'done' && (
              <span className="flex items-center gap-1.5 text-xs text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={13} /> Generated
              </span>
            )}
          </div>
          {batchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {['Candidate Name', 'Reg. Number', 'Score', 'Grade', 'Result', 'Cert. Status'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batchResults.map((e) => (
                    <tr key={e.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-sm font-medium text-gray-900">{e.candidateName}</td>
                      <td className="px-4 py-2.5 text-xs text-gray-600 font-mono">{e.regNo}</td>
                      <td className="px-4 py-2.5 text-sm font-bold text-gray-900">{e.score}</td>
                      <td className="px-4 py-2.5 text-sm font-bold text-gray-700">{e.grade}</td>
                      <td className="px-4 py-2.5">{statusBadge(e.resultStatus)}</td>
                      <td className="px-4 py-2.5">{statusBadge(e.certStatus)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <FileCheck2 size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Select an examination batch to preview results</p>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal open={successModal} onClose={() => setSuccessModal(false)} title="Results Generated">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Results Generated Successfully</h3>
          <p className="text-sm text-gray-500 mb-1">Batch: <strong>{batch}</strong></p>
          <p className="text-sm text-gray-500 mb-1">Total Processed: <strong>{batchResults.length}</strong></p>
          <p className="text-sm text-green-700 mb-1">Passed: <strong>{passed}</strong></p>
          <p className="text-sm text-red-600 mb-4">Failed: <strong>{failed}</strong></p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => setSuccessModal(false)}>Close</Button>
            <Button onClick={() => setSuccessModal(false)}>Download PDF</Button>
          </div>
        </div>
      </Modal>
    </DashboardShell>
  );
}
