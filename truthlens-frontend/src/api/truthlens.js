const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

const post = async (path, text) => {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  } catch {
    const err = new Error('Cannot reach server. Please check your connection.');
    err.type = 'network';
    throw err;
  }

  if (res.status === 503) {
    const data = await res.json().catch(() => null);
    if (data) return { ...data, _heuristic: true };
    const err = new Error('Running in heuristic mode — predictions use lexicon scoring.');
    err.type = 'heuristic';
    err.status = 503;
    throw err;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.detail ?? 'Request failed');
    err.status = res.status;
    err.type = res.status === 422 ? 'validation' : res.status >= 500 ? 'server' : 'unknown';
    throw err;
  }

  return res.json();
};

const getHealth = async () => {
  try {
    const res = await fetch(`${BASE}/health`);
    return res.json();
  } catch {
    return { status: 'offline' };
  }
};

export const analyze = (text) => post('/analyze', text);
export const explain = (text) => post('/explain', text);
export const report = (text) => post('/report', text);
export const health = () => getHealth();
