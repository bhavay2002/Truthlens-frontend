import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import VerdictCard from '../components/VerdictCard';
import SkeletonLoader from '../components/SkeletonLoader';

const BiasPanel = lazy(() => import('../components/panels/BiasPanel'));
const EmotionPanel = lazy(() => import('../components/panels/EmotionPanel'));
const NarrativePanel = lazy(() => import('../components/panels/NarrativePanel'));
const RhetoricPanel = lazy(() => import('../components/panels/RhetoricPanel'));
const PropagandaPanel = lazy(() => import('../components/panels/PropagandaPanel'));
const ExplainabilityPanel = lazy(() => import('../components/panels/ExplainabilityPanel'));

const PANELS = [
  { id: 'bias',           label: 'Bias' },
  { id: 'emotion',        label: 'Emotion' },
  { id: 'narrative',      label: 'Narrative' },
  { id: 'rhetoric',       label: 'Rhetoric' },
  { id: 'propaganda',     label: 'Propaganda' },
  { id: 'explainability', label: 'Explainability' },
];

export default function ResultsPage({
  analyzeResult, explainResult, reportResult,
  loading, isHeuristic, mode, error,
  onReset, onRetry,
}) {
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f1e] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border border-white/10 rounded-2xl p-6 animate-pulse bg-[#131929]">
            <div className="h-8 bg-white/10 rounded w-48 mb-4" />
            <div className="space-y-3">
              <div className="h-2.5 bg-white/10 rounded-full" />
              <div className="h-2.5 bg-white/10 rounded-full w-4/5" />
              <div className="h-2.5 bg-white/10 rounded-full w-3/5" />
            </div>
          </div>
          <div className="bg-[#131929] border border-white/10 rounded-2xl p-6">
            <SkeletonLoader rows={6} />
          </div>
        </div>
      </div>
    );
  }

  if (error && !analyzeResult) {
    return (
      <div className="min-h-screen bg-[#0b0f1e] flex items-center justify-center px-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 space-y-4 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-red-300">Something went wrong</h2>
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analyzeResult) return null;

  const prediction = analyzeResult.prediction ?? explainResult?.prediction?.prediction ?? 'UNKNOWN';
  const fake_probability = analyzeResult.fake_probability ?? explainResult?.prediction?.fake_probability ?? 0;
  const confidence = analyzeResult.confidence ?? explainResult?.prediction?.confidence ?? 0;
  const predictSource = explainResult?.predict_source ?? null;
  const verdictResult = { prediction, fake_probability, confidence };
  const explainability = explainResult?.explainability ?? null;

  const panelProps = {
    bias:           { bias: analyzeResult.bias },
    emotion:        { emotion: analyzeResult.emotion },
    narrative:      { narrative: analyzeResult.narrative },
    rhetoric:       { framing: analyzeResult.framing, rhetoric: analyzeResult.rhetoric },
    propaganda:     { propaganda: analyzeResult.propaganda_analysis },
    explainability: { explainability, analyzeExplainability: analyzeResult.explainability },
  };

  const components = {
    bias: BiasPanel,
    emotion: EmotionPanel,
    narrative: NarrativePanel,
    rhetoric: RhetoricPanel,
    propaganda: PropagandaPanel,
    explainability: ExplainabilityPanel,
  };

  return (
    <div className="min-h-screen bg-[#0b0f1e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {isHeuristic && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3"
          >
            <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-300">
              <strong>Heuristic mode</strong> — Running in heuristic mode. Predictions use lexicon scoring since the ML model is not fully trained.
            </div>
          </motion.div>
        )}

        {error && analyzeResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm text-red-300 flex-1">
              <strong>Warning:</strong> {error}
            </div>
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-200 font-medium border border-red-500/30 px-2.5 py-1 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <VerdictCard result={verdictResult} explainResult={explainResult} predictSource={predictSource} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PANELS.map(({ id, label }, i) => {
            const Panel = components[id];
            const props = panelProps[id];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="bg-[#131929] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="px-5 py-3 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white">{label}</h3>
                </div>
                <div className="p-5">
                  <Suspense fallback={<SkeletonLoader rows={4} />}>
                    <Panel {...props} />
                  </Suspense>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center pb-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#131929] border border-white/10 hover:border-blue-500/50 hover:text-blue-400 text-gray-400 rounded-xl font-medium text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Analyze Another
          </button>
        </div>
      </div>
    </div>
  );
}
