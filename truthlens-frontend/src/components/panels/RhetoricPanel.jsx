import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const MetricRow = ({ label, value }) => (
  <div className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-600 flex-1">{label}</span>
    <div className="flex items-center gap-2 w-32">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full"
          style={{ width: `${Math.min((value ?? 0) * 100, 100)}%` }}
        />
      </div>
      <span className="text-xs font-mono text-gray-700 w-10 text-right">{(value ?? 0).toFixed(3)}</span>
    </div>
  </div>
);

export default function RhetoricPanel({ framing, rhetoric }) {
  const framingKeys = {
    frame_conflict_score: 'Conflict',
    frame_economic_score: 'Economic',
    frame_moral_score: 'Moral',
    frame_human_interest_score: 'Human Interest',
    frame_security_score: 'Security',
  };

  const radarData = framing
    ? Object.entries(framingKeys).map(([key, label]) => ({
        axis: label,
        score: framing[key] ?? 0,
      }))
    : [];

  const rhetoricalDevices = rhetoric?.rhetorical_devices ?? {};
  const argumentStructure = rhetoric?.argument_structure ?? {};

  const rhetoricMetrics = [
    { label: 'Exaggeration', value: rhetoricalDevices.rhetoric_exaggeration_score },
    { label: 'Fear Appeal', value: rhetoricalDevices.rhetoric_fear_appeal_score },
    { label: 'Loaded Language', value: rhetoricalDevices.rhetoric_loaded_language_score },
    { label: 'Argument Complexity', value: argumentStructure.argument_complexity },
  ].filter((m) => m.value !== undefined && m.value !== null);

  return (
    <div className="space-y-6">
      {radarData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Framing Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => v.toFixed(3)} />
              <Radar
                name="Framing"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {rhetoricMetrics.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Rhetorical Devices</h3>
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-1">
            {rhetoricMetrics.map((m) => (
              <MetricRow key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
