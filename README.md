# TruthLens AI

**Multi-layer misinformation detection powered by Google Gemini.**

TruthLens analyses news articles, social media posts, and written claims to surface bias, emotional manipulation, propaganda techniques, and narrative framing — giving you a structured, explainable verdict in seconds.

---

## Features

| Category | What it detects |
|---|---|
| **Verdict** | Real / Fake / Uncertain with confidence score |
| **Bias** | Political lean (far-left → far-right), bias score, sentence-level heatmap |
| **Emotion** | Dominant emotion, full emotion-score breakdown |
| **Narrative** | Hero/villain/victim roles, conflict type, virality score, temporal coherence |
| **Rhetoric** | Exaggeration, fear appeals, loaded language, logical fallacies |
| **Propaganda** | Fear propaganda, scapegoating, polarisation, overall intensity |
| **Explainability** | LIME-style token importance scores |

---

## Tech Stack

**Frontend**
- React 19 + Vite 8
- Tailwind CSS v4
- Framer Motion — page and card animations
- Recharts — data visualisation
- Lucide React — icons
- React Router v7

**Backend**
- Node.js (ESM) + Express 4
- Google Gemini AI via Replit AI Integration
- Primary-model proxy with automatic Gemini fallback

---

## Project Structure

```
truthlens-frontend/        React + Vite frontend (port 5000)
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InputForm.jsx
│   │   ├── VerdictCard.jsx
│   │   ├── SkeletonLoader.jsx
│   │   ├── Toast.jsx
│   │   └── panels/
│   │       ├── BiasPanel.jsx
│   │       ├── EmotionPanel.jsx
│   │       ├── NarrativePanel.jsx
│   │       ├── RhetoricPanel.jsx
│   │       ├── PropagandaPanel.jsx
│   │       └── ExplainabilityPanel.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx        Landing page + inline analysis
│   │   ├── ResultsPage.jsx     Full analysis dashboard
│   │   └── AboutPage.jsx
│   │
│   ├── hooks/
│   │   ├── useAnalysis.js
│   │   └── useHealth.js
│   │
│   └── App.jsx
│
backend/                   Node.js + Express API (port 3000)
└── server.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API key (or use Replit's built-in Gemini integration)

### Installation

```bash
# Install frontend dependencies
cd truthlens-frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables

| Variable | Description |
|---|---|
| `AI_INTEGRATIONS_GEMINI_API_KEY` | Gemini API key |
| `AI_INTEGRATIONS_GEMINI_BASE_URL` | Gemini base URL (set automatically by Replit integration) |
| `MODEL_API` | Optional — URL of a custom primary ML model. If unset, Gemini is used directly. |
| `PORT` | Backend port (default: `3000`) |

### Running Locally

```bash
# Start backend
cd backend
node server.js

# Start frontend (separate terminal)
cd truthlens-frontend
npm run dev
```

The frontend runs on **port 5000** and proxies API requests to the backend on **port 3000**.

---

## API Reference

### `POST /analyze`
Analyse text for misinformation signals.

**Request**
```json
{
  "text": "Your article or claim here...",
  "mode": "quick"
}
```

**Response** — returns a structured JSON object with `prediction`, `confidence`, `bias`, `emotion`, `narrative`, `framing`, `rhetoric`, `propaganda_analysis`, and `explainability`.

---

### `POST /explain`
Generate a detailed LIME-style explainability report for a piece of text.

**Request**
```json
{ "text": "..." }
```

---

### `GET /health`
Returns server and model status.

```json
{ "status": "healthy" }
```

---

## How It Works

1. **Submit** — paste any news article, headline, or claim into the analysis box.
2. **Analyse** — the backend sends the text to Google Gemini with a structured prompt that covers all detection layers simultaneously.
3. **Inline result** — a summary card appears on the homepage showing the verdict, confidence, and key findings.
4. **Full dashboard** — click "View Full Analysis Dashboard" to see every detection layer in detail — bias heatmaps, emotion breakdowns, rhetoric scores, propaganda indicators, and token-level explainability.

---

## Deployment

The project is configured for one-click deployment on [Replit](https://replit.com).

- Frontend is served on port `5000`
- Backend is served on port `3000`
- API proxy is configured in `vite.config.js`

---

## License

MIT
