'use client';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function DashboardShell({ children }: { children: React.ReactNode; pageTitle?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f4f6f5]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <Header onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 lg:p-5">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white px-6 py-3">
          <p className="text-center text-xs text-slate-500">
            (c) 2026 Surveyors Council of Nigeria (SURCON). On-Premise Deployment
          </p>
        </footer>
      </div>
    </div>
  );
}
