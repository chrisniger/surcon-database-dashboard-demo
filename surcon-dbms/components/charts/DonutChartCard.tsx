'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';

const DEFAULT_COLORS = ['#14532d', '#166534', '#15803d', '#16a34a', '#22c55e', '#4ade80', '#86efac'];

type DonutProps = {
  title: string;
  data: { name: string; value: number }[];
  centerLabel?: string;
  centerSubLabel?: string;
  colors?: string[];
};

function CenterLabel({ viewBox, label, sub }: { viewBox?: { cx: number; cy: number }; label: string; sub?: string }) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text x={cx} y={sub ? cy - 6 : cy} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: 20, fontWeight: 700, fill: '#1e293b' }}>
        {label}
      </text>
      {sub && (
        <text x={cx} y={cy + 16} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: 11, fill: '#94a3b8' }}>
          {sub}
        </text>
      )}
    </g>
  );
}

export function DonutChartCard({ title, data, centerLabel, centerSubLabel, colors }: DonutProps) {
  const COLORS = colors ?? DEFAULT_COLORS;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">This Year</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={54}
            outerRadius={82}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            {centerLabel && (
              <Label
                content={(props) => (
                  <CenterLabel
                    viewBox={props.viewBox as { cx: number; cy: number }}
                    label={centerLabel}
                    sub={centerSubLabel}
                  />
                )}
                position="center"
              />
            )}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#e2e8f0' }}
            formatter={(value) => [(Number(value)).toLocaleString(), '']}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
