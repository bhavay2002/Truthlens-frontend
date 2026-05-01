import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const ROLE_COLORS = {
  Hero: '#22c55e',
  Villain: '#ef4444',
  Victim: '#f97316',
};

const MetricRow = ({ label, value, max = 1 }) => (
  <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-600 flex-1">{label}</span>
    <div className="flex items-center gap-2 w-32">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all"
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
      <span className="text-xs font-mono text-gray-700 w-10 text-right">{(value ?? 0).toFixed(3)}</span>
    </div>
  </div>
);

export default function NarrativePanel({ narrative }) {
  if (!narrative) return <div className="text-gray-400 text-sm">No narrative data available.</div>;

  const { roles = {}, conflict = {}, propagation = {}, temporal = {} } = narrative;
  const { hero_ratio = 0, villain_ratio = 0, victim_ratio = 0 } = roles;

  const total = (hero_ratio + villain_ratio + victim_ratio) || 1;
  const donutData = [
    { name: 'Hero', value: (hero_ratio / total) * 100 },
    { name: 'Villain', value: (villain_ratio / total) * 100 },
    { name: 'Victim', value: (victim_ratio / total) * 100 },
  ].filter((d) => d.value > 0);

  const metrics = [
    { label: 'Conflict Intensity', value: conflict.conflict_intensity },
    { label: 'Polarization Ratio', value: conflict.polarization_ratio },
    { label: 'Conflict Propagation', value: propagation.conflict_propagation_intensity },
    { label: 'Urgency Language', value: temporal.urgency_language_ratio },
  ].filter((m) => m.value !== undefined && m.value !== null);

  return (
    <div className="space-y-6">
      {donutData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Narrative Role Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                label={({ name, value }) => `${name} ${value.toFixed(0)}%`}
                labelLine={false}
              >
                {donutData.map((entry) => (
                  <Cell key={entry.name} fill={ROLE_COLORS[entry.name] ?? '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {metrics.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Conflict & Temporal Metrics</h3>
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-1">
            {metrics.map((m) => (
              <MetricRow key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
