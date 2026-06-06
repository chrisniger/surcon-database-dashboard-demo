import { Badge } from '@/components/ui/Badge';

export function ResultSummaryCard({
  totalExamRecords,
  resultsGenerated,
  resultsPending,
  passedCandidates,
  failedCandidates,
  averageScore,
}: {
  totalExamRecords: number;
  resultsGenerated: number;
  resultsPending: number;
  passedCandidates: number;
  failedCandidates: number;
  averageScore: number;
}) {
  const generatedRate = Math.round((resultsGenerated / (resultsGenerated + resultsPending)) * 100);

  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Examination & Result Summary</h3>
        <Badge label={`${averageScore}% avg`} variant="green" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ['Total Examination Records', totalExamRecords.toLocaleString(), 'text-slate-950'],
          ['Results Generated', resultsGenerated.toLocaleString(), 'text-emerald-700'],
          ['Results Pending', resultsPending.toLocaleString(), 'text-amber-600'],
          ['Passed Candidates', passedCandidates.toLocaleString(), 'text-emerald-700'],
          ['Failed Candidates', failedCandidates.toLocaleString(), 'text-red-600'],
          ['Average Score', `${averageScore}%`, 'text-blue-700'],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
            <p className="text-[11px] font-medium text-slate-500">{label}</p>
            <p className={`mt-1 text-lg font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Result generation progress</span>
          <span>{generatedRate}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-600" style={{ width: `${generatedRate}%` }} />
        </div>
      </div>
    </div>
  );
}
