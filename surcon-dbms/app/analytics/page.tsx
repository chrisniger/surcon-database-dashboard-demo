import { DashboardShell } from '@/components/layout/DashboardShell';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { DonutChartCard } from '@/components/charts/DonutChartCard';
import { analyticsData } from '@/data/mockReports';
import { certTrend, examPerformance, registrationActivity } from '@/data/mockDashboard';
import { TrendingUp, Users, Award, FileText } from 'lucide-react';

const kpis = [
  { label: 'Total Registered', value: '12,568', change: '+4.2%', icon: Users, color: 'bg-green-50 text-green-700' },
  { label: 'Active Certifications', value: '6,210', change: '+2.1%', icon: Award, color: 'bg-blue-50 text-blue-700' },
  { label: 'Exam Pass Rate', value: '71%', change: '+3.5%', icon: TrendingUp, color: 'bg-purple-50 text-purple-700' },
  { label: 'Records This Month', value: '210', change: '+8.9%', icon: FileText, color: 'bg-yellow-50 text-yellow-700' },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell pageTitle="Analytics">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-xs text-green-600 font-medium">{change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <LineChartCard
          title="Certification Trends (6 Months)"
          data={certTrend}
          series={[
            { key: 'certified', color: '#166534', label: 'Certified' },
            { key: 'pending', color: '#f59e0b', label: 'Pending' },
          ]}
        />
        <BarChartCard
          title="Monthly Activity — Surveys, Documents & Imports"
          data={analyticsData.monthlyActivity}
          series={[
            { key: 'surveys', color: '#166534', label: 'Surveys' },
            { key: 'documents', color: '#3b82f6', label: 'Documents' },
            { key: 'imports', color: '#f59e0b', label: 'CSV Imports' },
          ]}
        />
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <BarChartCard
          title="Examination Performance"
          data={examPerformance}
          series={[
            { key: 'passed', color: '#16a34a', label: 'Passed' },
            { key: 'failed', color: '#ef4444', label: 'Failed' },
          ]}
        />
        <DonutChartCard title="Certification Status Distribution" data={analyticsData.certStatusDist} />
        <DonutChartCard title="Exam Pass / Fail Rate" data={analyticsData.passFailRate} />
      </div>

      {/* State distribution + registration activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChartCard
          title="Monthly Registration Activity"
          data={registrationActivity}
          series={[{ key: 'count', color: '#166534', label: 'Registrations' }]}
        />

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Surveyor Distribution by State</h3>
          <div className="space-y-3">
            {analyticsData.stateDistribution.map((s) => {
              const max = 2840;
              const pct = Math.round((s.count / max) * 100);
              return (
                <div key={s.state}>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{s.state}</span>
                    <span className="font-semibold">{s.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-700 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
