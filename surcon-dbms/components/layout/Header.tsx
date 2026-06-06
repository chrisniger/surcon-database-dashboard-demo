'use client';
import { useState } from 'react';
import { Bell, Calendar, ChevronDown, Menu, Search, Server, UserCircle2 } from 'lucide-react';

export function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const date = new Date().toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-[104px] flex-wrap items-center gap-4 px-4 py-4 lg:px-8">
        <button
          onClick={onMenuOpen}
          className="shrink-0 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0 basis-full xl:basis-auto">
          <h1 className="text-xl font-black leading-tight text-emerald-800 sm:text-2xl lg:text-3xl">
            Surveyors Council of Nigeria (SURCON)
          </h1>
          <p className="mt-1 hidden max-w-3xl text-sm leading-6 text-slate-600 md:block">
            Database Management & Examination Reporting System
          </p>
        </div>

        <div className="flex-1" />

        <label className="hidden h-14 w-56 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm xl:flex">
          <Search size={16} className="text-slate-400" />
          <input
            className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search records..."
            aria-label="Search records"
          />
        </label>

        <div className="hidden h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm lg:flex">
          <Server size={22} className="text-slate-900" />
          <div>
            <p className="text-xs font-medium text-slate-500">System Status</p>
            <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              On-Premise
            </p>
          </div>
        </div>

        <div className="hidden h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm md:flex">
          <Calendar size={19} className="text-slate-700" />
          <div>
            <p className="text-xs font-semibold text-slate-800">{date}</p>
            <p className="text-xs text-slate-500">{time}</p>
          </div>
        </div>

        <button className="relative h-12 w-12 shrink-0 rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50" aria-label="Notifications">
          <Bell size={18} className="mx-auto" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative shrink-0">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 shadow-sm hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              <UserCircle2 size={26} />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-bold leading-tight text-slate-900">Admin User</p>
              <p className="text-xs leading-tight text-slate-500">System Administrator</p>
            </div>
            <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-16 z-20 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
              <div className="border-b border-slate-100 px-4 py-2">
                <p className="text-xs font-semibold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Profile</button>
              <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">Settings</button>
              <button
                onClick={() => { window.location.href = '/'; }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
