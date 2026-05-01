import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const MODULE_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f97316', '#ef4444'];

const RiskBadge = ({ label, value, inverted = false }) => {
  const level = inverted
    ? value === null ? 'unknown' : value > 0.6 ? 'low' : value > 0.3 ? 'medium' : 'high'
    : value === null ? 'unknown' : value < 0.3 ? 'low' : value < 0.6 ? 'medium' : 'high';

  const colors = {
    low: 'bg-green-50 text-green-700 border-green-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    high: 'bg-red-50 text-red-700 border-red-200',
    unknown: 'bg-gray-50 text-gray-500 border-gray-200',
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${colors[level]}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-bold text-sm">{value !== null ? (typeof value === 'number' ? value.toFixed(3) : value) : 'N/A'}</div>
      <div className="text-xs capitalize mt-0.5 opacity-70">{level}</div>
    </div>
  );
};

export default function AggregationPanel({ aggregation }) {
  if (!aggregation) return <div className="text-gray-400 text-sm">No aggregation data available. Use Deep mode for full aggregation.</div>;

  const { scores = {}, risks = {}, explanations = {}, analysis_modules = {} } = aggregation;
  const weights = analysis_modules.weights ?? {};
  const sections = explanations.sections ?? {};

  const pieData = Object.entries(weights).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Math.round(val * 100),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <RiskBadge label="Final Score" value={scores.final_score} />
        <RiskBadge label="Credibility Score" value={scores.credibility_score} inverted />
        <RiskBadge label="Manipulation Risk" value={scores.manipulation_risk} />
      </div>

      {risks.overall_truthlens_rating && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">TruthLens Rating</div>
          <div className="text-lg font-bold text-blue-700">{risks.overall_truthlens_rating}</div>
        </div>
      )}

      {pieData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Module Weights</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={false}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={MODULE_COLORS[i % MODULE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {Object.keys(sections).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Section Scores</h3>
          <div className="overflow-auto rounded-xl border border-gray-100">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500 font-medium">Section</th>
                  <th className="px-4 py-2 text-left text-gray-500 font-medium">Top Features</th>
                  <th className="px-4 py-2 text-right text-gray-500 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sections).map(([key, val]) => (
                  <tr key={key} className="border-t border-gray-100">
                    <td className="px-4 py-2 capitalize text-gray-700">{key}</td>
                    <td className="px-4 py-2 text-gray-500">{(val.top_features ?? []).join(', ')}</td>
                    <td className="px-4 py-2 font-mono text-gray-700 text-right">{(val.section_score ?? 0).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
