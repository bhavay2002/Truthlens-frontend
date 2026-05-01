import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAnalysis } from './hooks/useAnalysis';
import { useHealth } from './hooks/useHealth';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';

function AppInner() {
  const navigate = useNavigate();
  const health = useHealth();
  const {
    loading, error, errorType,
    analyzeResult, explainResult, reportResult,
    isHeuristic, mode,
    run, reset,
  } = useAnalysis();

  const [toast, setToast] = useState(null);
  const dismissToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (text, selectedMode) => {
    const result = await run(text, selectedMode);
    if (!result) return;
    if (!result.ok && result.errorType === 'network') {
      setToast('Cannot reach server. Please check your connection.');
    }
  };

  const handleViewDashboard = () => {
    navigate('/results');
  };

  const handleReset = () => {
    reset();
    navigate('/');
  };

  const networkError = errorType === 'network' ? error : null;
  const serverError = errorType === 'server' ? error : null;
  const validationError = errorType === 'validation' ? error : null;
  const generalError = !['network', 'server', 'validation'].includes(errorType) ? error : null;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header health={health} />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSubmit={handleSubmit}
                loading={loading}
                health={health}
                error={serverError ?? validationError ?? generalError}
                networkError={networkError}
                analyzeResult={analyzeResult}
                onViewDashboard={handleViewDashboard}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/results"
            element={
              <ResultsPage
                analyzeResult={analyzeResult}
                explainResult={explainResult}
                reportResult={reportResult}
                loading={loading}
                isHeuristic={isHeuristic}
                mode={mode}
                error={serverError}
                onReset={handleReset}
                onRetry={() => navigate('/')}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toast
        message={networkError ?? toast}
        onClose={dismissToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
