import { motion } from 'framer-motion';
import { Search, BarChart2, FileText, ArrowRight, CheckCircle, AlertCircle, Info, Layers, ShieldCheck, Eye, Flame, Megaphone, BookOpen, Star, Type, Cpu, BrainCircuit, Lightbulb, GitMerge, Trophy } from 'lucide-react';
import InputForm from '../components/InputForm';

const FEATURES = [
  {
    icon: Layers,
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    border: 'border-indigo-500/20',
    label: 'Multi-Layer AI Analysis',
    desc: 'Runs multiple NLP pipelines simultaneously — bias, emotion, narrative, rhetoric, propaganda — to deeply analyze content.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    border: 'border-emerald-500/20',
    label: 'Real vs Fake Prediction',
    desc: 'Provides a clear REAL / FAKE verdict with probability and confidence score.',
  },
  {
    icon: Eye,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/20',
    label: 'Explainable AI',
    desc: 'Highlights which words influenced the decision, making the model transparent and interpretable.',
  },
  {
    icon: BarChart2,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    border: 'border-violet-500/20',
    label: 'Bias Detection',
    desc: 'Identifies political and media bias, including left/right leaning and biased language.',
  },
  {
    icon: Flame,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    border: 'border-orange-500/20',
    label: 'Emotion Analysis',
    desc: 'Detects emotional tone such as fear, anger, or neutrality to uncover manipulation patterns.',
  },
  {
    icon: Megaphone,
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    border: 'border-red-500/20',
    label: 'Propaganda Detection',
    desc: 'Detects tactics like fear appeals, scapegoating, and polarization used in misleading content.',
  },
  {
    icon: BookOpen,
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-400',
    border: 'border-teal-500/20',
    label: 'Narrative Intelligence',
    desc: 'Analyzes storytelling patterns like hero, villain, victim roles and conflict intensity.',
  },
  {
    icon: Star,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    border: 'border-amber-500/20',
    label: 'Aggregated Credibility Score',
    desc: 'Combines all signals into a single credibility and manipulation risk score.',
  },
];

const KEY_FINDINGS = [
  { icon: CheckCircle, color: 'text-emerald-500', text: 'Life-cycle analyses from multiple sources show EVs produce fewer emissions over their lifetime.' },
  { icon: Info, color: 'text-amber-500', text: 'Battery production has higher upfront emissions, but is offset over time.' },
  { icon: FileText, color: 'text-blue-400', text: 'Sources: EPA, ICCT, BloombergNEF, peer-reviewed studies' },
];

export default function HomePage({ onSubmit, loading, health, error }) {
  const isHeuristic = health && health.model_files_complete === false;

  const scrollToAnalyze = () => {
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0b0f1e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1230] via-[#0b0f1e] to-[#060915] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-white">
                See the{' '}
                <span className="text-blue-500">Truth.</span>
                <br />
                Beyond the Noise.
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-md leading-relaxed">
                TruthLens helps you analyze news, claims, and information with AI-powered fact-checking and unbiased insights.
              </p>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <button
                  onClick={scrollToAnalyze}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Analyze Now <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-gray-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Learn How It Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right — preview card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#131929] border border-white/10 rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <Search className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">TruthLens Analysis</span>
              </div>

              <div className="bg-[#1a2235] rounded-xl p-4 mb-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-white font-semibold text-sm leading-snug">
                    Claim: "Electric vehicles produce more emissions than gas cars."
                  </p>
                  <div className="shrink-0 bg-emerald-700 text-white rounded-lg px-3 py-2 text-center">
                    <div className="text-xs text-emerald-200 mb-0.5">Assessment</div>
                    <div className="text-sm font-bold leading-tight">Mostly False</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-gray-400">Confidence <span className="text-emerald-400 font-medium">High</span></span>
                    <span className="text-xs text-gray-300 font-medium">82%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">Key Findings</p>
                <div className="space-y-2.5">
                  {KEY_FINDINGS.map(({ icon: Icon, color, text }, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5`} />
                      <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollToAnalyze}
                className="w-full flex items-center justify-between text-blue-400 hover:text-blue-300 text-xs font-medium border border-white/10 rounded-lg px-4 py-2.5 transition-colors hover:border-white/20"
              >
                <span>View Full Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="bg-[#0b0f1e] pt-8 pb-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Smart Analysis. Clear Insights.</h2>
            <p className="mt-2 text-gray-400 max-w-xl mx-auto">
              TruthLens uses advanced AI and trusted sources to deliver factual, transparent, and easy-to-understand analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, iconBg, iconColor, border, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-[#131929] rounded-2xl p-6 text-center border ${border}`}
              >
                <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#0b0f1e] py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">6 Steps to the Truth</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">
              From input to insight — here's exactly how TruthLens analyses your content in real time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: Type,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
                title: 'Input Text',
                desc: 'User enters a news article or claim for analysis.',
              },
              {
                step: '02',
                icon: Cpu,
                color: 'text-violet-400',
                bg: 'bg-violet-500/10',
                border: 'border-violet-500/20',
                title: 'AI Processing',
                desc: 'The system sends the text to the backend for real-time processing.',
              },
              {
                step: '03',
                icon: BrainCircuit,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
                title: 'Multi-Layer Analysis',
                desc: 'AI analyzes bias, emotion, narrative, and propaganda simultaneously.',
              },
              {
                step: '04',
                icon: Lightbulb,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/20',
                title: 'Explainability Engine',
                desc: "Highlights key words that influenced the AI's decision.",
              },
              {
                step: '05',
                icon: GitMerge,
                color: 'text-pink-400',
                bg: 'bg-pink-500/10',
                border: 'border-pink-500/20',
                title: 'Aggregation Engine',
                desc: 'Combines all signals into a final credibility and risk score.',
              },
              {
                step: '06',
                icon: Trophy,
                color: 'text-orange-400',
                bg: 'bg-orange-500/10',
                border: 'border-orange-500/20',
                title: 'Final Result',
                desc: 'Displays REAL/FAKE prediction with confidence and insights.',
              },
            ].map(({ step, icon: Icon, color, bg, border, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative bg-[#131929] border ${border} rounded-2xl p-6 overflow-hidden`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Step {step}</span>
                    <h3 className="text-white font-semibold mt-0.5 mb-1.5">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-5 text-5xl font-black text-white/[0.04] select-none leading-none">
                  {step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Analyze ──────────────────────────────────────────────────────── */}
      <section id="analyze" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Analyze a Claim</h2>
            <p className="mt-3 text-gray-500">
              Paste any news article, claim, or statement below and let TruthLens analyze it for you.
            </p>
          </div>

          {isHeuristic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3"
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
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">
                <strong>Error:</strong> {error}
              </div>
            </motion.div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <InputForm onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </section>

      {/* ── Footer strip ─────────────────────────────────────────────────── */}
      <div id="about" className="bg-gray-50 border-t border-gray-100 py-8 text-center">
        <p className="text-xs text-gray-400">Powered by Gemini + LIME · Multi-layer misinformation detection</p>
        <p className="mt-1 text-xs text-gray-400">
          API:{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">POST /analyze</code>
          {' · '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">POST /explain</code>
          {' · '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">GET /health</code>
        </p>
      </div>
    </div>
  );
}
