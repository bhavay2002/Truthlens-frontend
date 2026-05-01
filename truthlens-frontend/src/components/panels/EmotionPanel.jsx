import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const emotionColors = {
  anger: 'text-red-500',
  fear: 'text-orange-500',
  neutral: 'text-gray-500',
  optimism: 'text-green-500',
  disapproval: 'text-red-400',
  admiration: 'text-blue-500',
  annoyance: 'text-yellow-500',
  curiosity: 'text-violet-500',
  love: 'text-pink-500',
  gratitude: 'text-teal-500',
};

export default function EmotionPanel({ emotion }) {
  if (!emotion) return <div className="text-gray-400 text-sm">No emotion data available.</div>;

  const { dominant_emotion, emotion_scores = {}, emotion_distribution = {} } = emotion;
  const scores = Object.keys(emotion_scores).length ? emotion_scores : emotion_distribution;

  const radarData = Object.entries(scores).map(([key, val]) => ({
    emotion: key.charAt(0).toUpperCase() + key.slice(1),
    score: Math.round((val ?? 0) * 100) / 100,
    rawKey: key,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        {dominant_emotion && (
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Dominant Emotion</div>
            <div className={`text-xl font-bold capitalize ${emotionColors[dominant_emotion] ?? 'text-gray-700'}`}>
              {dominant_emotion}
            </div>
          </div>
        )}
      </div>

      {radarData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Emotion Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="emotion" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => v.toFixed(3)} />
              <Radar
                name="Emotion"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(scores).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
            <span className={`text-xs font-medium capitalize ${emotionColors[key] ?? 'text-gray-600'}`}>{key}</span>
            <span className="text-xs font-mono text-gray-700">{(val ?? 0).toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
