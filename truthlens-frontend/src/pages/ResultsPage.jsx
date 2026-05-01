import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import VerdictCard from '../components/VerdictCard';
import SkeletonLoader from '../components/SkeletonLoader';

const BiasPanel = lazy(() => import('../components/panels/BiasPanel'));
const EmotionPanel = lazy(() => import('../components/panels/EmotionPanel'));
const NarrativePanel = lazy(() => import('../components/panels/NarrativePanel'));
const RhetoricPanel = lazy(() => import('../components/panels/RhetoricPanel'));
const PropagandaPanel = lazy(() => import('../components/panels/PropagandaPanel'));
const ExplainabilityPanel = lazy(() => import('../components/panels/ExplainabilityPanel'));
const GraphPanel = lazy(() => import('../components/panels/GraphPanel'));
const AggregationPanel = lazy(() => import('../components/panels/AggregationPanel'));

const TABS = [
  { id: 'bias', label: 'Bias' },
  { id: 'emotion', label: 'Emotion' },
  { id: 'narrative', label: 'Narrative' },
  { id: 'rhetoric', label: 'Rhetoric' },
  { id: 'propaganda', label: 'Propaganda' },
  { id: 'explainability', label: 'Explainability' },
  { id: 'graph', label: 'Graph' },
  { id: 'aggregation', label: 'Aggregation' },
];

export default function ResultsPage({ analyzeResult, explainResult, loading, onReset }) {
  const [activeTab, setActiveTab] = useState('bias');

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="border-2 border-gray-200 rounded-2xl p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
          <div className="space-y-3">
            <div className="h-2.5 bg-gray-200 rounded-full" />
            <div className="h-2.5 bg-gray-200 rounded-full w-4/5" />
            <div className="h-2.5 bg-gray-200 rounded-full w-3/5" />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <SkeletonLoader rows={6} />
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

  const renderTab = () => {
    const panelProps = {
      bias: { bias: analyzeResult.bias },
      emotion: { emotion: analyzeResult.emotion },
      narrative: { narrative: analyzeResult.narrative },
      rhetoric: { framing: analyzeResult.framing, rhetoric: analyzeResult.rhetoric },
      propaganda: { propaganda: analyzeResult.propaganda_analysis },
      explainability: {
        explainability,
        analyzeExplainability: analyzeResult.explainability,
      },
      graph: { graphAnalysis: analyzeResult.graph_analysis },
      aggregation: { aggregation: explainResult?.aggregation ?? null },
    };

    const components = {
      bias: BiasPanel,
      emotion: EmotionPanel,
      narrative: NarrativePanel,
      rhetoric: RhetoricPanel,
      propaganda: PropagandaPanel,
      explainability: ExplainabilityPanel,
      graph: GraphPanel,
      aggregation: AggregationPanel,
    };

    const Panel = components[activeTab];
    const props = panelProps[activeTab];

    return (
      <Suspense fallback={<SkeletonLoader rows={5} />}>
        <Panel {...props} />
      </Suspense>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VerdictCard
          result={verdictResult}
          explainResult={explainResult}
          predictSource={predictSource}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 text-gray-600 rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another
        </button>
      </div>
    </div>
  );
}
