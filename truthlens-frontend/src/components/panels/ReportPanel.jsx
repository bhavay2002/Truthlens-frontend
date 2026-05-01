import { FileText, Calendar, Hash, Globe } from 'lucide-react';

const SectionCard = ({ title, children }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-0">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value ?? 'N/A'}</span>
  </div>
);

const ScoreBar = ({ label, value }) => {
  const pct = Math.min(Math.max((value ?? 0) * 100, 0), 100);
  const color = pct < 30 ? 'bg-green-500' : pct < 60 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-xs text-gray-600 w-36 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-700 w-10 text-right">{(value ?? 0).toFixed(2)}</span>
    </div>
  );
};

export default function ReportPanel({ reportResult, analyzeResult }) {
  if (!reportResult && !analyzeResult) {
    return <div className="text-gray-400 text-sm">No report data available.</div>;
  }

  const summary = reportResult?.article_summary ?? {};
  const biasAnalysis = reportResult?.bias_analysis ?? analyzeResult?.bias ?? {};
  const emotionAnalysis = reportResult?.emotion_analysis ?? analyzeResult?.emotion ?? {};
  const narrativeStructure = reportResult?.narrative_structure ?? analyzeResult?.narrative ?? {};
  const credibilityScore = reportResult?.credibility_score ?? null;

  const analyzedAt = summary.analyzed_at
    ? new Date(summary.analyzed_at.replace(/-(\d{2})-(\d{2})Z$/, ':$1:$2Z')).toLocaleString()
    : null;

  return (
    <div className="space-y-5">
      <SectionCard title="Article Summary">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {summary.word_count !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{summary.word_count} words</span>
            </div>
          )}
          {analyzedAt && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{analyzedAt}</span>
            </div>
          )}
          {summary.title && (
            <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
              <FileText className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="font-medium">{summary.title}</span>
            </div>
          )}
          {summary.source && (
            <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
              <Globe className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{summary.source}</span>
            </div>
          )}
        </div>
      </SectionCard>

      {credibilityScore !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Credibility Score</div>
          <div className="text-3xl font-bold text-blue-700">{(credibilityScore ?? 0).toFixed(2)}</div>
        </div>
      )}

      {Object.keys(biasAnalysis).length > 0 && (
        <SectionCard title="Bias Analysis">
          {biasAnalysis.bias_score !== undefined && (
            <ScoreBar label="Bias Score" value={biasAnalysis.bias_score} />
          )}
          {biasAnalysis.media_bias && (
            <Row label="Media Bias" value={biasAnalysis.media_bias} />
          )}
          {biasAnalysis.biased_tokens?.length > 0 && (
            <div className="pt-1">
              <span className="text-xs text-gray-500">Biased tokens: </span>
              <span className="text-xs text-red-600 font-medium">{biasAnalysis.biased_tokens.join(', ')}</span>
            </div>
          )}
        </SectionCard>
      )}

      {Object.keys(emotionAnalysis).length > 0 && (
        <SectionCard title="Emotion Analysis">
          {emotionAnalysis.dominant_emotion && (
            <Row label="Dominant Emotion" value={emotionAnalysis.dominant_emotion} />
          )}
          {emotionAnalysis.emotion_scores && Object.entries(emotionAnalysis.emotion_scores).map(([key, val]) => (
            <ScoreBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
          ))}
        </SectionCard>
      )}

      {Object.keys(narrativeStructure).length > 0 && (
        <SectionCard title="Narrative Structure">
          {narrativeStructure.roles && (
            <>
              <Row label="Hero ratio" value={(narrativeStructure.roles.hero_ratio ?? 0).toFixed(3)} />
              <Row label="Villain ratio" value={(narrativeStructure.roles.villain_ratio ?? 0).toFixed(3)} />
              <Row label="Victim ratio" value={(narrativeStructure.roles.victim_ratio ?? 0).toFixed(3)} />
            </>
          )}
          {narrativeStructure.conflict && (
            <>
              <Row label="Conflict intensity" value={(narrativeStructure.conflict.conflict_intensity ?? 0).toFixed(3)} />
              <Row label="Polarization ratio" value={(narrativeStructure.conflict.polarization_ratio ?? 0).toFixed(3)} />
            </>
          )}
        </SectionCard>
      )}
    </div>
  );
}
