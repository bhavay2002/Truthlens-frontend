import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAnalysis } from './hooks/useAnalysis';
import { useHealth } from './hooks/useHealth';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

function AppInner() {
  const navigate = useNavigate();
  const health = useHealth();
  const { loading, error, analyzeResult, explainResult, run, reset } = useAnalysis();

  const handleSubmit = async (text, mode) => {
    await run(text, mode);
    navigate('/results');
  };

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
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
                error={error}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsPage
                analyzeResult={analyzeResult}
                explainResult={explainResult}
                loading={loading}
                onReset={handleReset}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
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
