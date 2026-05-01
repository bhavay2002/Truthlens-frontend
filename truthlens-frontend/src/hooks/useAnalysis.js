import { useState, useCallback } from 'react';
import { analyze, explain } from '../api/truthlens';

export function useAnalysis() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    analyzeResult: null,
    explainResult: null,
  });

  const run = useCallback(async (text, mode = 'quick') => {
    setState((s) => ({ ...s, loading: true, error: null }));

    const cacheKey = `tl_${btoa(encodeURIComponent(text)).slice(0, 32)}_${mode}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setState({ loading: false, error: null, ...parsed });
        return;
      } catch {}
    }

    try {
      const calls = [analyze(text)];
      if (mode === 'deep' || mode === 'report') calls.push(explain(text));
      const results = await Promise.allSettled(calls);

      const analyzeResult = results[0].status === 'fulfilled' ? results[0].value : null;
      const explainResult = results[1]?.status === 'fulfilled' ? results[1].value : null;

      if (!analyzeResult) {
        throw new Error(results[0].reason?.message ?? 'Analysis failed');
      }

      const newState = { loading: false, error: null, analyzeResult, explainResult };
      setState(newState);
      sessionStorage.setItem(cacheKey, JSON.stringify({ analyzeResult, explainResult }));
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, analyzeResult: null, explainResult: null });
  }, []);

  return { ...state, run, reset };
}
