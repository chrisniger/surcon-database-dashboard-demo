import { BarChart3, CheckCircle2, Database, FileCheck2, ShieldCheck, UploadCloud, UsersRound } from 'lucide-react';

const icons = [ShieldCheck, UploadCloud, FileCheck2, BarChart3, CheckCircle2, ShieldCheck, UsersRound, Database];

export function FeatureCard({ features }: { features: string[] }) {
  return (
    <div className="h-full rounded-xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm">
      <h3 className="mb-4 text-base font-bold text-emerald-900">Platform Features</h3>
      <ul className="space-y-1">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length];
          return (
            <li key={feature} className="flex items-center gap-3 border-b border-emerald-100/80 py-2 last:border-b-0">
              <CheckCircle2 size={17} className="shrink-0 text-emerald-700" />
              <span className="flex-1 text-sm font-medium text-slate-700">{feature}</span>
              <Icon size={18} className="text-emerald-700" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
