# TruthLens AI

**Multi-layer misinformation detection for news, claims, and social media.**

TruthLens analyses written text to surface bias, emotional manipulation, propaganda techniques, and narrative framing — giving you a structured, explainable verdict in seconds.

---

## Pages

### Home
The landing page introduces TruthLens with a hero section, a live status indicator, and quick access to the analysis tool. It gives visitors an immediate sense of what the product does and why it matters.

### Features
A section on the homepage that highlights the core detection capabilities — bias scoring, emotion analysis, propaganda detection, narrative mapping, rhetoric analysis, and explainability — each explained with a short description and icon.

### How It Works
A step-by-step walkthrough on the homepage showing the three-stage process: submit text, run analysis, review results. Designed to make the product approachable for non-technical users.

### About
A dedicated page covering the background and purpose of TruthLens — the problem of misinformation, how TruthLens approaches it, its capabilities, what makes it different, and real-world use cases.

### Analysis
An inline section on the homepage where users paste or type any article, headline, or claim. Three example buttons (Fake News, Real News, Biased) let users try the tool instantly. After clicking Analyse, a result card appears showing the verdict, confidence score, and key findings. A "New Analysis" button resets the form for another submission.

### Dashboard
A full-page breakdown of the analysis results, accessible from the result card. Shows every detection layer as individual blocks — Bias, Emotion, Narrative, Rhetoric, Propaganda, and Explainability — each in its own card. An "Analyze Another" button returns the user directly to the analysis section.

---

## Tech Stack

**Frontend** — React 19, Vite 8, Tailwind CSS v4, Framer Motion, Recharts, React Router v7

**Backend** — Node.js (ESM), Express 4

---

## Project Structure

```
truthlens-frontend/        Frontend (port 5000)
├── src/
│   ├── components/        Header, Footer, InputForm, VerdictCard, panels/
│   ├── pages/             HomePage, ResultsPage, AboutPage
│   ├── hooks/             useAnalysis, useHealth
│   └── App.jsx

backend/                   API server (port 3000)
└── server.js
```

---

## Getting Started

```bash
# Install and run frontend
cd truthlens-frontend && npm install && npm run dev

# Install and run backend (separate terminal)
cd backend && npm install && node server.js
```

---

## License

MIT
