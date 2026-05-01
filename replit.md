# TruthLens AI — Frontend

## Overview
TruthLens AI is a multi-layer misinformation detection frontend. It connects to a Python backend (RoBERTa + LIME) to analyze news articles for bias, emotion, propaganda, and credibility.

## Architecture
- **Framework**: React 18 + Vite (no backend in this repo — frontend only)
- **Styling**: Tailwind CSS v4 (@tailwindcss/vite plugin)
- **Charts**: Recharts (radar, bar, pie/donut charts)
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **HTTP**: Native fetch API
- **Icons**: Lucide React

## Project Structure
```
truthlens-frontend/
├── src/
│   ├── api/truthlens.js        # API layer (analyze, explain, report, health)
│   ├── hooks/
│   │   ├── useAnalysis.js      # Main analysis state hook
│   │   └── useHealth.js        # Server health check hook
│   ├── pages/
│   │   ├── HomePage.jsx        # Input form + hero section
│   │   └── ResultsPage.jsx     # Analysis results with tabs
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InputForm.jsx       # Text input + mode toggle + example buttons
│   │   ├── VerdictCard.jsx     # REAL/FAKE verdict with animated progress bars
│   │   ├── SkeletonLoader.jsx
│   │   └── panels/
│   │       ├── BiasPanel.jsx           # Sentence heatmap + biased tokens
│   │       ├── EmotionPanel.jsx        # Radar chart + emotion scores
│   │       ├── NarrativePanel.jsx      # Donut chart (hero/villain/victim)
│   │       ├── RhetoricPanel.jsx       # Framing radar + rhetoric metrics
│   │       ├── PropagandaPanel.jsx     # Semicircle gauge meters (4 indicators)
│   │       ├── ExplainabilityPanel.jsx # Token heatmap + LIME bar chart
│   │       ├── GraphPanel.jsx          # Graph metrics (nodes, edges, density)
│   │       └── AggregationPanel.jsx    # Module weights pie + risk badges
│   ├── App.jsx                 # Router + app shell
│   └── main.jsx                # Entry point
├── vite.config.js              # Vite config (host: 0.0.0.0, port: 5000)
└── package.json
```

## API Configuration
- Backend URL: `VITE_API_URL` env var (defaults to `http://localhost:5001`)
- Endpoints: `POST /analyze`, `POST /explain`, `POST /report`, `GET /health`

## Running
- **Dev**: `cd truthlens-frontend && npm run dev` (port 5000)
- **Build**: `cd truthlens-frontend && npm run build`

## Features
- Real-time character counter with validation
- Example prefill buttons (credible, fake, political)
- 3 analysis modes: Quick, Deep (with /explain), Report
- Animated verdict card (REAL/FAKE/Borderline)
- 8 analysis tabs: Bias, Emotion, Narrative, Rhetoric, Propaganda, Explainability, Graph, Aggregation
- Session storage caching for repeated queries
- Server health indicator in header
- Heuristic mode banner when ML model not trained
- Lazy-loaded chart panels for performance
- Responsive layout
