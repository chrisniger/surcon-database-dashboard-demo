import { formatNumber } from '@/lib/utils';
import {
  Award,
  BarChart2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Upload,
  Users,
} from 'lucide-react';

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  users: Users,
  award: Award,
  clipboard: ClipboardList,
  'file-text': FileText,
  upload: Upload,
  'bar-chart': BarChart2,
  clock: Clock3,
  shield: ShieldCheck,
};

export function StatCard({ label, value, change, icon }: {
  label: string;
  value: number;
  change: string;
  icon: string;
}) {
  const Icon = icons[icon] ?? CheckCircle2;
  const isPositive = change.startsWith('+');
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <Icon size={25} className="text-emerald-800" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-600">{label}</p>
          <p className="mt-2 text-2xl font-black leading-none text-slate-950">{formatNumber(value)}</p>
          <p className={`mt-2 flex items-center gap-1 text-[11px] font-semibold ${isPositive ? 'text-emerald-700' : 'text-amber-600'}`}>
            <TrendIcon size={12} />
            {change} from last month
          </p>
        </div>
      </div>
    </div>
  );
}
