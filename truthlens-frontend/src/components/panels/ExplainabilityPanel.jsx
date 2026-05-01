import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle } from 'lucide-react';

const getTokenColor = (importance, max, palette = 'blue') => {
  const ratio = max > 0 ? Math.min(Math.abs(importance) / max, 1) : 0;
  if (palette === 'blue') return `rgba(59, 130, 246, ${ratio * 0.7})`;
  if (palette === 'violet') return `rgba(139, 92, 246, ${ratio * 0.7})`;
  if (palette === 'orange') return `rgba(249, 115, 22, ${ratio * 0.7})`;
  return `rgba(59, 130, 246, ${ratio * 0.7})`;
};

const TokenHighlighter = ({ structured, palette }) => {
  const max = Math.max(...structured.map((t) => Math.abs(t.importance ?? 0)), 1e-10);
  return (
    <div className="leading-8 text-sm font-medium flex flex-wrap gap-0.5">
      {structured.map(({ token, importance }, i) => (
        <span
          key={i}
          style={{
            backgroundColor: getTokenColor(importance, max, palette),
            borderRadius: 3,
            padding: '1px 3px',
          }}
          title={`Importance: ${(importance ?? 0).toExponential(2)}`}
          className="cursor-help transition-all hover:opacity-80"
        >
          {token}
        </span>
      ))}
    </div>
  );
};

const ImportanceBar = ({ structured }) => {
  const max = Math.max(...structured.map((t) => Math.abs(t.importance ?? 0)), 1e-10);
  const data = [...structured]
    .sort((a, b) => Math.abs(b.importance ?? 0) - Math.abs(a.importance ?? 0))
    .slice(0, 12)
    .map((t) => ({
      token: t.token,
      importance: Math.abs(t.importance ?? 0) / max,
    }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 28, 200)}>
      <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
        <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => v.toFixed(1)} tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="token" width={75} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => v.toFixed(4)} />
        <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const QualityRing = ({ score }) => {
  const grade = score >= 0.8 ? 'A' : score >= 0.6 ? 'B' : score >= 0.4 ? 'C' : 'D';
  const gradeColors = { A: '#22c55e', B: '#3b82f6', C: '#eab308', D: '#ef4444' };
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score);
  const color = gradeColors[grade];

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold" style={{ color }}>{grade}</span>
          <span className="text-xs text-gray-500">{(score * 100).toFixed(0)}%</span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        <p className="font-semibold">Explanation Quality</p>
        <p className="text-xs text-gray-400">Based on faithfulness & comprehensiveness</p>
      </div>
    </div>
  );
};

const MODES = [
  { id: 'lime', label: 'LIME', palette: 'blue' },
  { id: 'aggregated', label: 'Aggregated', palette: 'violet' },
  { id: 'emotion', label: 'Emotion', palette: 'orange' },
];

export default function ExplainabilityPanel({ explainability, analyzeExplainability }) {
  const [activeMode, setActiveMode] = useState('lime');

  const lime = explainability?.lime ?? analyzeExplainability?.lime ?? {};
  const aggregated = explainability?.aggregated ?? {};
  const emotionExpl = analyzeExplainability?.emotion_explanation ?? {};
  const metrics = explainability?.explanation_metrics ?? {};
  const quality = explainability?.explanation_quality_score ?? null;
  const metadata = explainability?.metadata ?? {};
  const modules = explainability?.module_failures ?? [];

  const limeStructured = lime.structured ?? [];
  const aggregatedStructured = aggregated.structured ?? [];
  const emotionStructured = emotionExpl.structured ?? [];

  const activeStructured =
    activeMode === 'lime'
      ? limeStructured
      : activeMode === 'aggregated'
      ? aggregatedStructured
      : emotionStructured;

  const activePalette = MODES.find((m) => m.id === activeMode)?.palette ?? 'blue';

  const methodWeights = aggregated.method_weights ?? {};
  const latency = metadata.latency_ms ?? {};

  return (
    <div className="space-y-6">
      {limeStructured.length === 0 && aggregatedStructured.length === 0 && (
        <div className="text-gray-400 text-sm">
          Run in <strong>Deep</strong> mode to see full explainability data.
        </div>
      )}

      {(limeStructured.length > 0 || aggregatedStructured.length > 0) && (
        <>
          <div className="flex gap-2 flex-wrap">
            {MODES.map((m) => {
              const hasData = m.id === 'lime' ? limeStructured.length > 0
                : m.id === 'aggregated' ? aggregatedStructured.length > 0
                : emotionStructured.length > 0;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  disabled={!hasData}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    activeMode === m.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}

            {lime.faithful !== undefined && (
              <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${lime.faithful ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                {lime.faithful ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {lime.faithful ? 'Faithful' : 'Not faithful'}
              </span>
            )}
          </div>

          {activeStructured.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Token Importance Heatmap</h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <TokenHighlighter structured={activeStructured} palette={activePalette} />
              </div>
            </div>
          )}

          {activeStructured.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Which words most influenced the prediction?</h3>
              <ImportanceBar structured={activeStructured} />
            </div>
          )}
        </>
      )}

      {quality !== null && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-4">
          <QualityRing score={quality} />

          {metrics && Object.keys(metrics).length > 0 && (
            <div className="space-y-2">
              {[
                { label: 'Faithfulness', value: metrics.faithfulness },
                { label: 'Comprehensiveness', value: metrics.comprehensiveness },
                { label: 'Insertion Score', value: metrics.normalized?.insertion_score ?? metrics.insertion_score },
              ]
                .filter((m) => m.value !== undefined)
                .map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-36">{m.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min((m.value ?? 0) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-700 w-10 text-right">{(m.value ?? 0).toFixed(2)}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {Object.keys(methodWeights).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Method Weights</h3>
          <div className="flex h-6 rounded-full overflow-hidden border border-gray-200">
            {Object.entries(methodWeights).map(([method, weight], i) => {
              const colors = ['bg-blue-500', 'bg-violet-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
              return (
                <div
                  key={method}
                  className={`${colors[i % colors.length]} flex items-center justify-center text-white text-xs font-bold`}
                  style={{ width: `${(weight * 100).toFixed(0)}%` }}
                  title={`${method}: ${(weight * 100).toFixed(0)}%`}
                >
                  {weight >= 0.15 ? method.toUpperCase() : ''}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(methodWeights).map(([method, weight], i) => {
              const colors = ['text-blue-600', 'text-violet-600', 'text-green-600', 'text-orange-600', 'text-pink-600'];
              return (
                <span key={method} className={`text-xs ${colors[i % colors.length]}`}>
                  {method} {(weight * 100).toFixed(0)}%
                </span>
              );
            })}
          </div>
        </div>
      )}

      {Object.keys(latency).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Module Latency</h3>
          <div className="overflow-auto rounded-xl border border-gray-100">
            <table className="w-full text-xs">
              <tbody>
                {Object.entries(latency).map(([module, ms]) => (
                  <tr key={module} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-2 text-gray-600 capitalize">{module}</td>
                    <td className="px-4 py-2 font-mono text-gray-700 text-right">{Number(ms).toFixed(2)} ms</td>
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
