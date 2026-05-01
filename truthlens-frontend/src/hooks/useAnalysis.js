import { useState, useCallback } from 'react';
import { analyze, explain, report } from '../api/truthlens';

export function useAnalysis() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    errorType: null,
    analyzeResult: null,
    explainResult: null,
    reportResult: null,
    isHeuristic: false,
    mode: null,
  });

  const run = useCallback(async (text, mode = 'quick') => {
    setState((s) => ({ ...s, loading: true, error: null, errorType: null, isHeuristic: false, mode }));

    const cacheKey = `tl_${btoa(encodeURIComponent(text)).slice(0, 32)}_${mode}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setState({ loading: false, error: null, errorType: null, mode, ...parsed });
        return { ok: true };
      } catch {}
    }

    try {
      const calls = [analyze(text)];
      if (mode === 'deep') calls.push(explain(text));
      if (mode === 'report') calls.push(report(text));

      const results = await Promise.allSettled(calls);

      const analyzeResult = results[0].status === 'fulfilled' ? results[0].value : null;
      const secondResult = results[1]?.status === 'fulfilled' ? results[1].value : null;

      if (!analyzeResult) {
        const reason = results[0].reason;
        throw reason ?? new Error('Analysis failed');
      }

      const isHeuristic =
        !!analyzeResult._heuristic ||
        (mode === 'deep' && !!secondResult?._heuristic) ||
        (mode === 'report' && !!secondResult?._heuristic);

      const explainResult = mode === 'deep' ? secondResult : null;
      const reportResult = mode === 'report' ? secondResult : null;

      const newState = {
        loading: false,
        error: null,
        errorType: null,
        analyzeResult,
        explainResult,
        reportResult,
        isHeuristic,
        mode,
      };
      setState(newState);
      sessionStorage.setItem(cacheKey, JSON.stringify({ analyzeResult, explainResult, reportResult, isHeuristic, mode }));
      return { ok: true };
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err.message,
        errorType: err.type ?? 'unknown',
      }));
      return { ok: false, errorType: err.type ?? 'unknown' };
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      errorType: null,
      analyzeResult: null,
      explainResult: null,
      reportResult: null,
      isHeuristic: false,
      mode: null,
    });
  }, []);

  return { ...state, run, reset };
}
