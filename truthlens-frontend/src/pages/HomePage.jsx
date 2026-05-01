import { motion } from 'framer-motion';
import { ShieldCheck, Zap, BarChart2, AlertCircle } from 'lucide-react';
import InputForm from '../components/InputForm';

const FEATURES = [
  { icon: Zap, label: 'Fast Analysis', desc: 'Results in under 1 second' },
  { icon: BarChart2, label: '10+ NLP Pipelines', desc: 'Bias, emotion, propaganda & more' },
  { icon: ShieldCheck, label: 'Explainable AI', desc: 'LIME + SHAP token-level insights' },
];

export default function HomePage({ onSubmit, loading, health, error }) {
  const isHeuristic = health && health.model_files_complete === false;

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Detect Misinformation.
          <br />
          <span className="text-blue-600">Understand Why.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          TruthLens AI runs 10+ NLP analysis pipelines in parallel — bias detection, emotion classification,
          propaganda scoring, and LIME explainability — then aggregates all signals into a single credibility score.
        </p>
      </motion.div>

      <div className="flex gap-6 flex-wrap justify-center">
        {FEATURES.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <Icon className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-gray-800">{label}</div>
              <div className="text-xs text-gray-500">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {isHeuristic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-2xl bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Heuristic mode</strong> — Running in heuristic mode. Predictions use lexicon scoring since the ML model is not trained yet.
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-2xl bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-sm text-red-700 flex-1">
            <strong>Error:</strong> {error}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      >
        <InputForm onSubmit={onSubmit} loading={loading} />
      </motion.div>

      <div className="text-center text-xs text-gray-400" id="about">
        <p>Powered by RoBERTa + LIME • Multi-layer misinformation detection</p>
        <p className="mt-1">API: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">POST /analyze</code> · <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">POST /explain</code> · <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">GET /health</code></p>
      </div>
    </div>
  );
}
