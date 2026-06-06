'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Award,
  BarChart2,
  ChevronRight,
  Database,
  FileText,
  LayoutDashboard,
  MapPin,
  PieChart,
  Settings,
  ShieldCheck,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/surveyors', label: 'Surveyors Register', icon: Users },
  { href: '/certifications', label: 'Certification', icon: Award },
  { href: '/examinations', label: 'Examination Records', icon: FileText },
  { href: '/survey-data', label: 'Store Survey Data', icon: MapPin },
  { href: '/documents', label: 'Document Uploads', icon: Upload },
  { href: '/csv-import', label: 'CSV Import', icon: Database },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/analytics', label: 'Analytics', icon: PieChart },
  { href: '/users-roles', label: 'Users & Roles', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function SurconMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('rounded-full bg-white p-1 shadow-xl ring-2 ring-emerald-500/20', compact ? 'h-10 w-10' : 'h-32 w-32')}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full border-4 border-emerald-700 bg-gradient-to-b from-emerald-50 to-white text-center">
        <span className={cn('font-black leading-none text-emerald-800', compact ? 'text-sm' : 'text-xl')}>SURCON</span>
        {!compact && <span className="mt-1 text-[9px] font-bold uppercase tracking-wide text-emerald-700">Council</span>}
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-30 flex h-full w-64 flex-col bg-[#061923] text-white shadow-2xl transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="border-b border-white/10 px-4 pb-5 pt-4">
          <button onClick={onClose} className="absolute right-3 top-3 rounded p-1 hover:bg-white/10 lg:hidden" aria-label="Close navigation">
            <X size={18} />
          </button>
          <div className="flex justify-center">
            <SurconMark />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-150',
                  active
                    ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-lg shadow-emerald-950/30'
                    : 'text-slate-100 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="opacity-70" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">System Information</p>
            {[
              ['Database:', 'SURCON_DB'],
              ['Server:', 'SURCON-SRV01'],
              ['Version:', '1.0.0 (On-Premise)'],
              ['Uptime:', '15d 4h 32m'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-2 py-1 text-[11px]">
                <span className="text-slate-100">{label}</span>
                <span className="flex-1 truncate text-slate-300">{value}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
