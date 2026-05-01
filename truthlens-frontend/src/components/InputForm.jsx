import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

const EXAMPLES = [
  {
    label: 'Fake News',
    text: "BREAKING: Government secretly adds mind-control chemicals to tap water! Leaked documents reveal the shocking truth they don't want you to see!",
  },
  {
    label: 'Real News',
    text: 'Scientists discover new evidence supporting climate change based on peer-reviewed research from 50,000 participants across 12 countries, published in the journal Nature.',
  },
  {
    label: 'Biased',
    text: 'Politicians are spreading dangerous lies about vaccines to manipulate vulnerable populations into fear and panic for electoral gain.',
  },
];

export default function InputForm({ onSubmit, loading }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

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
    onSubmit(text.trim(), 'quick');
  };

  const isOver = text.length > 5000;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setError(''); }}
          onBlur={() => { if (text) setError(validate(text)); }}
          rows={4}
          placeholder="Verify News — paste a claim or article here..."
          className="w-full p-4 bg-[#1a2235] border border-white/10 rounded-xl resize-none text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          maxLength={5200}
        />
        {error && (
          <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </p>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {EXAMPLES.map(({ label, text: ex }) => (
          <button
            key={label}
            type="button"
            onClick={() => { setText(ex); setError(''); }}
            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors border border-white/10"
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || isOver}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze ▶'
        )}
      </button>
    </form>
  );
}
