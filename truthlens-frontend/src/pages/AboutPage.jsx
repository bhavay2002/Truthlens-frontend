import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Layers, Eye, BarChart2,
  Flame, Megaphone, Star, Users, BookOpen, GraduationCap, Newspaper,
} from 'lucide-react';

const CAPABILITIES = [
  { icon: Layers,     color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', label: 'Multi-layer NLP Analysis' },
  { icon: Eye,        color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   label: 'Explainable AI (Token-level)' },
  { icon: BarChart2,  color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', label: 'Bias & Propaganda Detection' },
  { icon: Flame,      color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'Emotion & Narrative Analysis' },
  { icon: ShieldCheck,color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',label: 'Real vs Fake Prediction' },
  { icon: Star,       color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  label: 'Aggregated Credibility Score' },
];

const TECH_STACK = [
  { label: 'Bias Detection',           desc: 'Identifies political leaning and biased language tokens.' },
  { label: 'Emotion Analysis',         desc: 'Classifies dominant emotional tone across 7 dimensions.' },
  { label: 'Narrative Role Extraction',desc: 'Detects hero, villain, and victim storytelling patterns.' },
  { label: 'Propaganda Detection',     desc: 'Flags fear appeals, scapegoating, and polarization tactics.' },
  { label: 'Explainability (LIME)',    desc: 'Highlights per-token importance scores for transparency.' },
  { label: 'Aggregation Engine',       desc: 'Combines all signals into one credibility and risk score.' },
];

const USE_CASES = [
  { icon: Newspaper,      label: 'Journalists',     desc: 'Verify news credibility before publishing or sharing.' },
  { icon: GraduationCap, label: 'Researchers',      desc: 'Study bias, media influence, and misinformation patterns.' },
  { icon: Users,          label: 'General Public',  desc: 'Validate suspicious claims encountered online.' },
  { icon: BookOpen,       label: 'Educators',        desc: 'Demonstrate AI explainability concepts in the classroom.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function AboutPage() {
  return (
    <div className="bg-[#0b0f1e] min-h-screen text-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1230] via-[#0b0f1e] to-[#060915] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
              🚀 ABOUT TRUTHLENS AI
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              About <span className="text-blue-500">TruthLens AI</span>
            </h1>
            <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              An advanced AI system for detecting misinformation with transparency and explainability.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Try It Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                onClick={() => setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100)}
                className="flex items-center gap-2 text-gray-300 hover:text-white font-medium text-sm transition-colors border border-white/10 px-6 py-3 rounded-lg hover:border-white/20"
              >
                How It Works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What is TruthLens + Problem ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div {...fadeUp(0)} className="bg-[#131929] border border-white/10 rounded-2xl p-8">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-5">
              <span className="text-blue-400 text-lg">🔹</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">What is TruthLens AI?</h2>
            <p className="text-gray-400 leading-relaxed">
              TruthLens AI is a multi-layer misinformation detection system designed to analyze news articles and claims in depth. Instead of relying on simple classification, it evaluates multiple linguistic and contextual signals to determine credibility and manipulation risk.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="bg-[#131929] border border-red-500/20 rounded-2xl p-8">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-5">
              <span className="text-red-400 text-lg">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">The Problem</h2>
            <p className="text-gray-400 leading-relaxed">
              In today's digital world, misinformation spreads rapidly across social media and news platforms. Traditional fact-checking methods are slow, opaque, and often fail to explain <em className="text-gray-300 not-italic font-medium">why</em> content is misleading. Users need a system that not only detects fake news but also explains the reasoning behind the decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Solution ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div {...fadeUp(0)} className="bg-gradient-to-br from-[#131929] to-[#0d1a2e] border border-emerald-500/20 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-emerald-500/20">
                ✦ OUR SOLUTION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">How TruthLens Addresses the Problem</h2>
              <p className="text-gray-400 leading-relaxed">
                TruthLens AI combines multiple AI techniques into a unified system, going far beyond simple true/false classification to give users full insight into <em className="text-white not-italic font-semibold">why</em> content is credible or suspicious.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                'Accurate real vs fake prediction',
                'Deep analysis of bias, emotion, and narrative',
                'Detection of propaganda and manipulation patterns',
                'Transparent explanations of model decisions',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ── Key Capabilities ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div {...fadeUp(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-violet-500/30">
            ✦ KEY CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Depth and Transparency</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map(({ icon: Icon, color, bg, border, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.07)}
              className={`bg-[#131929] border ${border} rounded-2xl p-5 flex items-center gap-4`}
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-white font-medium text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It's Different ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          {...fadeUp(0)}
          className="bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-blue-500/20 rounded-2xl p-8 lg:p-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
            💡 HOW IT'S DIFFERENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not a Black Box. A Glass Box.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
            Unlike traditional models that act as black boxes, TruthLens AI focuses on <span className="text-white font-semibold">interpretability and transparency</span>. It not only answers <em className="not-italic text-gray-300">"Is this fake?"</em> but also answers:
          </p>
          <div className="inline-flex items-center gap-3 bg-blue-600/20 border border-blue-500/30 rounded-xl px-6 py-4">
            <span className="text-2xl">👉</span>
            <p className="text-blue-300 font-semibold text-lg italic">"Why is this considered fake?"</p>
          </div>
        </motion.div>
      </section>

      {/* ── Use Cases ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div {...fadeUp(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            🎯 USE CASES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Who Is It For?</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.08)}
              className="bg-[#131929] border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm">{label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Technology Overview ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div {...fadeUp(0)} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-600/20 text-teal-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-500/30">
            ⚙️ TECHNOLOGY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Technology Overview</h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            TruthLens AI integrates multiple NLP pipelines working in parallel to deliver comprehensive analysis.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK.map(({ label, desc }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.07)}
              className="bg-[#131929] border border-teal-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                <h3 className="text-white font-semibold text-sm">{label}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Conclusion / CTA ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <motion.div
          {...fadeUp(0)}
          className="bg-gradient-to-br from-[#131929] to-[#0d1a2e] border border-white/10 rounded-2xl p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Making Misinformation Detection Accessible</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            TruthLens AI aims to make misinformation detection more transparent, interpretable, and accessible by combining advanced AI techniques with intuitive visual explanations.
          </p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Start Analyzing <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
