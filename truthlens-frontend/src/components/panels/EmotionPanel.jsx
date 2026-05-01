import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const emotionTextColors = {
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

const CustomAngleTick = ({ x, y, payload, dominantEmotion }) => {
  const isDominant = payload.value.toLowerCase() === (dominantEmotion ?? '').toLowerCase();
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={isDominant ? 12 : 11}
      fontWeight={isDominant ? '700' : '400'}
      fill={isDominant ? '#f59e0b' : '#6b7280'}
    >
      {payload.value}
      {isDominant ? ' ★' : ''}
    </text>
  );
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
      {dominant_emotion && (
        <div className="flex items-center gap-4 flex-wrap">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Dominant Emotion</div>
            <div className={`text-xl font-bold capitalize ${emotionTextColors[dominant_emotion] ?? 'text-gray-700'}`}>
              {dominant_emotion}
            </div>
          </div>
          <p className="text-xs text-gray-400">★ highlighted on chart</p>
        </div>
      )}

      {radarData.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Emotion Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="emotion"
                tick={(props) => (
                  <CustomAngleTick {...props} dominantEmotion={dominant_emotion} />
                )}
              />
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
        {Object.entries(scores).map(([key, val]) => {
          const isDominant = key === dominant_emotion;
          return (
            <div
              key={key}
              className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                isDominant
                  ? 'bg-amber-50 border-amber-300'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <span className={`text-xs font-medium capitalize ${isDominant ? 'text-amber-700 font-bold' : emotionTextColors[key] ?? 'text-gray-600'}`}>
                {key}{isDominant ? ' ★' : ''}
              </span>
              <span className="text-xs font-mono text-gray-700">{(val ?? 0).toFixed(3)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
