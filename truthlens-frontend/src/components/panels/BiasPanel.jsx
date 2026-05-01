import { motion } from 'framer-motion';

const getBiasColor = (score) => `rgba(239, 68, 68, ${Math.min(score * 2, 0.8)})`;

const mediaBiasColors = {
  center: 'bg-gray-100 text-gray-700',
  left: 'bg-blue-100 text-blue-700',
  right: 'bg-red-100 text-red-700',
  'far-left': 'bg-blue-200 text-blue-800',
  'far-right': 'bg-red-200 text-red-800',
};

export default function BiasPanel({ bias }) {
  if (!bias) return <div className="text-gray-400 text-sm">No bias data available.</div>;

  const { bias_score, media_bias, biased_tokens = [], sentence_heatmap = [] } = bias;
  const biasedSet = new Set(biased_tokens.map((t) => t.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Bias Score</div>
          <div className="text-2xl font-bold text-gray-800">{(bias_score ?? 0).toFixed(2)}</div>
        </div>
        {media_bias && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Media Bias</div>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${mediaBiasColors[media_bias] ?? 'bg-gray-100 text-gray-700'}`}>
              {media_bias}
            </span>
          </div>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Biased Tokens</div>
          <div className="text-2xl font-bold text-gray-800">{biased_tokens.length}</div>
        </div>
      </div>

      {sentence_heatmap.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Sentence Bias Heatmap</h3>
          <div className="space-y-2">
            {sentence_heatmap.map(({ sentence, bias_score: score }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-3 rounded-lg cursor-help text-sm leading-relaxed border border-gray-100"
                style={{ backgroundColor: getBiasColor(score ?? 0) || '#f9fafb' }}
                title={`Bias score: ${(score ?? 0).toFixed(3)}`}
              >
                {sentence.split(' ').map((word, wi) => {
                  const isbiased = biasedSet.has(word.toLowerCase().replace(/[^a-z]/g, ''));
                  return (
                    <span key={wi}>
                      {isbiased ? (
                        <span
                          className="underline decoration-red-500 decoration-2 cursor-help"
                          title="Biased word"
                        >
                          {word}
                        </span>
                      ) : (
                        word
                      )}{' '}
                    </span>
                  );
                })}
                <span className="absolute top-1 right-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded">
                  {(score ?? 0).toFixed(3)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {biased_tokens.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Biased Tokens</h3>
          <div className="flex flex-wrap gap-2">
            {biased_tokens.map((token, i) => (
              <span key={i} className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-medium">
                {token}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
