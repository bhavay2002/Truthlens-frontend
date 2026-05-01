import { motion } from 'framer-motion';

const getColor = (value) => {
  if (value <= 0.3) return { stroke: '#22c55e', text: 'text-green-600', bg: 'bg-green-50 border-green-200' };
  if (value <= 0.6) return { stroke: '#eab308', text: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' };
  return { stroke: '#ef4444', text: 'text-red-600', bg: 'bg-red-50 border-red-200' };
};

const SemiCircleGauge = ({ label, value }) => {
  const pct = Math.min(Math.max(value ?? 0, 0), 1);
  const colors = getColor(pct);
  const r = 40;
  const cx = 60;
  const cy = 60;
  const circumference = Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <div className={`rounded-xl border p-4 flex flex-col items-center ${colors.bg}`}>
      <svg width="120" height="70" viewBox="0 0 120 70">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className={`text-sm font-bold ${colors.text}`}
          fontSize="14"
          fontWeight="700"
          fill="currentColor"
        >
          {(pct * 100).toFixed(0)}%
        </text>
      </svg>
      <span className="text-xs font-medium text-gray-600 text-center mt-1">{label}</span>
    </div>
  );
};

export default function PropagandaPanel({ propaganda }) {
  if (!propaganda) return <div className="text-gray-400 text-sm">No propaganda data available.</div>;

  const gauges = [
    { label: 'Fear Propaganda', value: propaganda.fear_propaganda_score },
    { label: 'Scapegoating', value: propaganda.scapegoating_score },
    { label: 'Polarization', value: propaganda.polarization_score },
    { label: 'Overall Intensity', value: propaganda.propaganda_intensity },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Propaganda Indicators</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {gauges.map((g) => (
          <SemiCircleGauge key={g.label} label={g.label} value={g.value} />
        ))}
      </div>
      <p className="text-xs text-gray-400">Color: green (low) → yellow (medium) → red (high)</p>
    </div>
  );
}
