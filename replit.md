# TruthLens AI

## Overview
TruthLens AI is a full-stack misinformation detection system. It analyzes news articles for bias, emotion, propaganda, and credibility using a Node.js Express backend (with Google Gemini AI fallback) and a React frontend.

## Architecture
- **Frontend**: React 19 + Vite (port 5000) — `truthlens-frontend/`
- **Backend**: Node.js ESM + Express (port 3000) — `backend/`
- **AI**: Replit AI Integrations — Gemini 2.5 Flash (no API key required)
- **Primary model**: Optional — set `MODEL_API` env var to point to a Python RoBERTa backend
- **Styling**: Tailwind CSS v4 (@tailwindcss/vite plugin)
- **Charts**: Recharts (radar, bar, pie/donut charts)
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **Icons**: Lucide React

## Project Structure
```
backend/
├── server.js               # Express API server (ESM, port 3000)
└── package.json

truthlens-frontend/
├── src/
│   ├── api/truthlens.js        # API layer — relative paths, proxied via Vite
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
├── vite.config.js              # Vite config + proxy (/analyze, /explain, /report, /health → :3000)
└── package.json
```

## Backend API
- **Routes**: `POST /analyze`, `POST /explain`, `POST /report`, `GET /health`
- **Request**: `{ "text": "<article text>" }`
- **Response**: TruthLens JSON schema (prediction, confidence, bias, emotion, narrative, framing, rhetoric, propaganda_analysis, graph_analysis, explainability)
- **Fallback logic**: Tries primary model (`MODEL_API` env var) first, falls back to Gemini 2.5 Flash in parallel (Promise.allSettled). 30s timeout on each.
- **Heuristic mode**: Returns `_heuristic: true` on 503, shown as yellow banner in UI
- **Source flag**: Gemini responses include `_source: "gemini"`

## Environment Variables
- `MODEL_API` — optional URL of primary Python model (e.g. `http://localhost:8000`)
- `AI_INTEGRATIONS_GEMINI_BASE_URL` — auto-set by Replit AI Integrations
- `AI_INTEGRATIONS_GEMINI_API_KEY` — auto-set by Replit AI Integrations

## Running
- **Dev**: Start both workflows — "Start application" (port 5000) and "Start backend" (port 3000)
- **Frontend build**: `cd truthlens-frontend && npm run build`
- **Backend only**: `cd backend && node server.js`

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

## Error Handling
| Type | UI |
|------|-----|
| Network error | Toast notification (bottom-right, auto-dismiss 5s) |
| 503 / heuristic fallback | Yellow info banner on results page |
| 500 server error | Red error card with "Try Again" button |
| 422 / validation | Inline form error |
