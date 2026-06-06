'use client';
import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Server, Shield, Bell, Database, HardDrive, Building2, Save } from 'lucide-react';

const systemInfo = [
  { label: 'Database', value: 'SURCON_DB' },
  { label: 'Server', value: 'SURCON-SRV01' },
  { label: 'Deployment', value: 'On-Premise' },
  { label: 'Version', value: '1.0.0' },
  { label: 'Last Backup', value: '06 Jun 2025, 02:00 AM' },
  { label: 'Uptime', value: '47 days, 14 hours' },
  { label: 'OS', value: 'Ubuntu 22.04 LTS' },
  { label: 'Storage Used', value: '124 GB / 500 GB' },
];

export default function SettingsPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [orgName, setOrgName] = useState('Surveyors Council of Nigeria');
  const [orgEmail, setOrgEmail] = useState('info@surcon.gov.ng');
  const [notifications, setNotifications] = useState({ email: true, system: true, reports: false });

  return (
    <DashboardShell pageTitle="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Org Profile */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={16} className="text-green-700" />
              <h3 className="text-sm font-semibold text-gray-800">Organization Profile</h3>
            </div>
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 bg-green-900 rounded-xl flex items-center justify-center text-white text-2xl font-black mb-2">S</div>
              <p className="text-sm font-semibold text-gray-900">SURCON</p>
              <p className="text-xs text-gray-500">Federal Government Agency</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Website</label>
                <input type="text" defaultValue="www.surcon.gov.ng" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <Button className="w-full justify-center" onClick={() => setToast('Organization profile saved.')}>
                <Save size={14} /> Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Server size={16} className="text-green-700" />
              <h3 className="text-sm font-semibold text-gray-800">On-Premise Server Information</h3>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Online
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {systemInfo.map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} className="text-green-700" />
              <h3 className="text-sm font-semibold text-gray-800">Security Settings</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Two-Factor Authentication', sub: 'Add an extra layer of security for admin accounts', enabled: false },
                { label: 'Session Timeout', sub: 'Auto-logout after 30 minutes of inactivity', enabled: true },
                { label: 'IP Whitelist', sub: 'Restrict access to approved IP addresses', enabled: false },
                { label: 'Audit Logging', sub: 'Record all user actions for compliance', enabled: true },
              ].map(({ label, sub, enabled }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                  <button
                    onClick={() => setToast(`${label} setting updated.`)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={16} className="text-green-700" />
              <h3 className="text-sm font-semibold text-gray-800">Notification Settings</h3>
            </div>
            <div className="space-y-3">
              {([
                { key: 'email' as const, label: 'Email Notifications', sub: 'Receive alerts via email for important actions' },
                { key: 'system' as const, label: 'System Notifications', sub: 'In-app alerts for approvals and updates' },
                { key: 'reports' as const, label: 'Report Notifications', sub: 'Notify when scheduled reports are generated' },
              ]).map(({ key, label, sub }) => (
                <div key={key} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-green-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Backup Settings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <HardDrive size={16} className="text-green-700" />
              <h3 className="text-sm font-semibold text-gray-800">Backup Settings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Backup Frequency</p>
                <select className="bg-transparent text-sm font-semibold text-gray-900 outline-none w-full">
                  <option>Daily at 2:00 AM</option>
                  <option>Every 6 hours</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Retention Period</p>
                <select className="bg-transparent text-sm font-semibold text-gray-900 outline-none w-full">
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Storage Location</p>
                <p className="text-sm font-semibold text-gray-900">/backup/surcon</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setToast('Manual backup initiated. This may take a few minutes.')}>
                <Database size={14} /> Run Backup Now
              </Button>
              <Button variant="secondary" onClick={() => setToast('Backup settings saved.')}>
                <Save size={14} /> Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </DashboardShell>
  );
}
