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
│   │   ├── Toast.jsx           # Network error toast (bottom-right, auto-dismiss)
│   │   └── panels/
│   │       ├── BiasPanel.jsx           # Sentence heatmap + biased tokens
│   │       ├── EmotionPanel.jsx        # Radar chart (dominant highlighted) + scores
│   │       ├── NarrativePanel.jsx      # Donut chart (hero/villain/victim)
│   │       ├── RhetoricPanel.jsx       # Framing radar + rhetoric metrics
│   │       ├── PropagandaPanel.jsx     # Semicircle gauge meters (4 indicators)
│   │       ├── ExplainabilityPanel.jsx # Token heatmap + LIME bar chart + quality ring
│   │       ├── GraphPanel.jsx          # Graph metrics (nodes, edges, density)
│   │       ├── AggregationPanel.jsx    # Module weights pie + risk badges
│   │       └── ReportPanel.jsx         # Article summary report (Report mode)
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
- Real-time character counter with validation (soft warn at 4,000, hard limit at 5,000)
- URL detection warning in input
- Example prefill buttons (credible, fake, political)
- 3 analysis modes: Quick (/analyze), Deep (/analyze + /explain), Report (/analyze + /report)
- Animated verdict card (REAL/FAKE/Borderline) with fake probability, confidence, manipulation risk, credibility bars
- 8 analysis tabs: Bias, Emotion, Narrative, Rhetoric, Propaganda, Explainability, Graph, Aggregation
- Report tab (shown in Report mode): article summary, bias/emotion/narrative sections
- Session storage caching for repeated queries
- Server health indicator in header
- Heuristic mode banner on results page when server returns 503 with fallback data
- Toast notification for network errors ("Cannot reach server")
- Error card with retry button for 500 server errors
- Lazy-loaded chart panels for performance
- Dominant emotion axis highlighted in radar chart (amber/bold)
- Token importance heatmap with LIME/Aggregated/Emotion toggle
- Propaganda gauges: 4 semicircular meters (green→yellow→red)
- Faithfulness badge and latency table in explainability panel
- Responsive layout

## Error Handling
| Type | UI |
|------|-----|
| Network error | Toast notification (bottom-right, auto-dismiss 5s) |
| 503 / heuristic fallback | Yellow info banner on results page |
| 500 server error | Red error card with "Try Again" button |
| 422 / validation | Inline form error |
