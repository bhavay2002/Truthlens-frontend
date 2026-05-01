import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const ProgressBar = ({ label, value, color = 'blue' }) => {
  const colorMap = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
  };
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-mono font-bold">{(value ?? 0).toFixed(2)}</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value ?? 0) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full ${colorMap[color] ?? 'bg-blue-500'} rounded-full`}
        />
      </div>
    </div>
  );
};

export default function VerdictCard({ result, explainResult, predictSource }) {
  const { prediction, fake_probability, confidence } = result;
  const isFake = prediction === 'FAKE';
  const fp = fake_probability ?? 0;
  const isBorderline = fp >= 0.4 && fp <= 0.6;

  const borderColor = isBorderline
    ? 'border-yellow-400'
    : isFake
    ? 'border-red-500'
    : 'border-green-500';
  const bg = isBorderline ? 'bg-yellow-50' : isFake ? 'bg-red-50' : 'bg-green-50';
  const textColor = isBorderline ? 'text-yellow-700' : isFake ? 'text-red-700' : 'text-green-700';
  const Icon = isBorderline ? HelpCircle : isFake ? AlertTriangle : CheckCircle;

  const aggregation = explainResult?.aggregation?.scores;
  const credibilityScore = aggregation?.credibility_score ?? null;
  const manipulationRisk = aggregation?.manipulation_risk ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`border-2 ${borderColor} ${bg} rounded-2xl p-6 shadow-md`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 ${textColor}`} />
          <h2 className={`text-2xl font-bold ${textColor}`}>
            {isBorderline ? 'BORDERLINE' : isFake ? 'LIKELY FAKE' : 'LIKELY REAL'}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 font-medium">
            Confidence {((confidence ?? 0) * 100).toFixed(0)}%
          </span>
          {predictSource && (
            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200">
              {predictSource === 'heuristic_fallback' ? '⚡ Heuristic mode' : '🤖 Model'}
            </span>
          )}
        </div>
      </div>

      <ProgressBar
        label="Fake probability"
        value={fake_probability}
        color={isFake ? 'red' : 'green'}
      />
      <ProgressBar label="Confidence" value={confidence} color="blue" />
      {manipulationRisk !== null && (
        <ProgressBar label="Manipulation risk" value={manipulationRisk} color="orange" />
      )}
      {credibilityScore !== null && (
        <ProgressBar label="Credibility score" value={credibilityScore} color="green" />
      )}
    </motion.div>
  );
}
