import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

const EXAMPLES = [
  'Scientists discover new evidence supporting climate change based on peer-reviewed research from 50,000 participants across 12 countries, published in the journal Nature.',
  'BREAKING: Government secretly adds mind-control chemicals to tap water! Leaked documents reveal the shocking truth they don\'t want you to see!',
  'Politicians are spreading dangerous lies about vaccines to manipulate vulnerable populations into fear and panic for electoral gain.',
];

const MODES = [
  { id: 'quick', label: 'Quick', desc: 'Fast analysis' },
  { id: 'deep', label: 'Deep', desc: 'Full explainability' },
  { id: 'report', label: 'Report', desc: 'Summary report' },
];

export default function InputForm({ onSubmit, loading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('quick');

  const validate = (t) => {
    const trimmed = t.trim();
    if (!trimmed) return 'Please enter some text.';
    if (trimmed.length < 20) return 'Text must be at least 20 characters.';
    if (t.length > 5000) return 'Text must be under 5,000 characters.';
    if (/^https?:\/\//.test(trimmed)) return 'Please paste the article text, not a URL.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(text);
    if (err) { setError(err); return; }
    setError('');
    onSubmit(text.trim(), mode);
  };

  const charCount = text.length;
  const isWarning = charCount > 4000;
  const isOver = charCount > 5000;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setError(''); }}
          onBlur={() => { if (text) setError(validate(text)); }}
          rows={7}
          placeholder="Paste a news article or claim here..."
          className={`w-full p-4 border-2 rounded-xl resize-y text-sm font-medium focus:outline-none transition-colors ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-blue-400'
          }`}
          maxLength={5200}
        />
        <div className={`flex justify-between items-center text-xs mt-1 ${isOver ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-gray-400'}`}>
          <span>
            {error && (
              <span className="flex items-center gap-1 text-red-500">
                <AlertCircle className="w-3 h-3" />
                {error}
              </span>
            )}
          </span>
          <span className="font-mono">{charCount}/5000</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setText(ex); setError(''); }}
            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-200"
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              mode === m.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <span>{m.label}</span>
            <span className={`text-xs ${mode === m.id ? 'text-blue-200' : 'text-gray-400'}`}>{m.desc}</span>
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || isOver}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Now ▶'
        )}
      </button>
    </form>
  );
}
