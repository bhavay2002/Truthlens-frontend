const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

const post = async (path, text) => {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.detail ?? 'Request failed'), { status: res.status });
  }
  return res.json();
};

export const analyze = (text) => post('/analyze', text);
export const explain = (text) => post('/explain', text);
export const report = (text) => post('/report', text);
export const health = () => fetch(`${BASE}/health`).then((r) => r.json());
