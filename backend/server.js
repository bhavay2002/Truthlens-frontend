import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 3000;
const MODEL_API = process.env.MODEL_API ?? null;
const REQUEST_TIMEOUT = 30_000;

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: '',
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), ms)
    ),
  ]);
}

async function callPrimaryModel(path, body) {
  if (!MODEL_API) throw new Error('No primary model configured');
  const res = await fetch(`${MODEL_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  });
  if (!res.ok) throw new Error(`Primary model returned ${res.status}`);
  return res.json();
}

function extractJson(text) {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return JSON.parse(fence[1].trim());
  const brace = text.match(/\{[\s\S]*\}/);
  if (brace) return JSON.parse(brace[0]);
  return JSON.parse(text.trim());
}

// ─── Gemini prompt builders ───────────────────────────────────────────────────

function analyzePrompt(text) {
  return `You are TruthLens, an AI misinformation detection system. Analyze the following text for factual accuracy, bias, emotion, narrative, rhetoric, propaganda, and linguistic patterns.

TEXT:
"""
${text}
"""

Return ONLY a valid JSON object matching this exact schema (no extra commentary):
{
  "prediction": "<REAL|FAKE|UNCERTAIN>",
  "confidence": <0.0-1.0>,
  "bias": {
    "bias_score": <0.0-1.0>,
    "media_bias": "<far-left|left|center|right|far-right>",
    "biased_tokens": ["<word>"],
    "sentence_heatmap": [{"sentence": "<sentence>", "bias_score": <0.0-1.0>}]
  },
  "emotion": {
    "dominant_emotion": "<anger|fear|joy|sadness|surprise|disgust|neutral|optimism|admiration|annoyance|curiosity|love|gratitude|disapproval>",
    "emotion_scores": {
      "anger": <0.0-1.0>, "fear": <0.0-1.0>, "joy": <0.0-1.0>,
      "sadness": <0.0-1.0>, "surprise": <0.0-1.0>, "disgust": <0.0-1.0>,
      "neutral": <0.0-1.0>
    }
  },
  "narrative": {
    "roles": {"hero_ratio": <0.0-1.0>, "villain_ratio": <0.0-1.0>, "victim_ratio": <0.0-1.0>},
    "conflict": {"conflict_score": <0.0-1.0>, "conflict_type": "<string>"},
    "propagation": {"virality_score": <0.0-1.0>},
    "temporal": {"temporal_coherence": <0.0-1.0>}
  },
  "framing": {
    "framing_positive": <0.0-1.0>,
    "framing_negative": <0.0-1.0>,
    "framing_neutral": <0.0-1.0>,
    "framing_conflict": <0.0-1.0>,
    "framing_economic": <0.0-1.0>,
    "framing_political": <0.0-1.0>
  },
  "rhetoric": {
    "rhetorical_devices": {
      "rhetoric_exaggeration_score": <0.0-1.0>,
      "rhetoric_fear_appeal_score": <0.0-1.0>,
      "rhetoric_loaded_language_score": <0.0-1.0>
    },
    "argument_structure": {
      "has_evidence": <true|false>,
      "logical_fallacies": <0.0-1.0>
    }
  },
  "propaganda_analysis": {
    "fear_propaganda_score": <0.0-1.0>,
    "scapegoating_score": <0.0-1.0>,
    "polarization_score": <0.0-1.0>,
    "propaganda_intensity": <0.0-1.0>
  },
  "graph_analysis": {
    "narrative_graph_metrics": {
      "graph_nodes": <integer>,
      "graph_edges": <integer>,
      "graph_density": <0.0-1.0>,
      "graph_clustering": <0.0-1.0>
    },
    "graph_features": {},
    "temporal_graph": {}
  },
  "explainability": {
    "lime": {
      "structured": [{"token": "<word>", "importance": <-1.0 to 1.0>}],
      "faithful": <true|false>
    },
    "aggregated": {},
    "explanation_metrics": {},
    "explanation_quality_score": <0.0-1.0>,
    "metadata": {},
    "module_failures": []
  }
}`;
}

function explainPrompt(text) {
  return `You are TruthLens, an AI misinformation detection system. Generate a detailed LIME-style explainability analysis for the following text.

TEXT:
"""
${text}
"""

Return ONLY a valid JSON object matching this exact schema:
{
  "explainability": {
    "lime": {
      "structured": [{"token": "<word>", "importance": <-1.0 to 1.0>}],
      "faithful": <true|false>
    },
    "aggregated": {
      "structured": [{"token": "<word>", "importance": <-1.0 to 1.0>}]
    },
    "explanation_metrics": {
      "fidelity": <0.0-1.0>,
      "stability": <0.0-1.0>,
      "comprehensibility": <0.0-1.0>
    },
    "explanation_quality_score": <0.0-1.0>,
    "metadata": {
      "method": "LIME",
      "num_features": <integer>,
      "num_samples": 1000
    },
    "module_failures": []
  }
}

The "structured" arrays must contain all significant tokens from the text with importance weights showing their contribution to fake/real classification. Positive importance = pushes toward FAKE, negative = pushes toward REAL.`;
}

function reportPrompt(text) {
  return `You are TruthLens, an AI misinformation detection system. Generate a comprehensive factual report for the following text.

TEXT:
"""
${text}
"""

Return ONLY a valid JSON object matching this exact schema:
{
  "prediction": "<REAL|FAKE|UNCERTAIN>",
  "confidence": <0.0-1.0>,
  "article_summary": {
    "headline": "<brief headline>",
    "summary": "<2-3 sentence summary>",
    "word_count": <integer>,
    "detected_language": "<language>",
    "publication_signals": "<any detected source signals>"
  },
  "bias_analysis": {
    "bias_score": <0.0-1.0>,
    "media_bias": "<far-left|left|center|right|far-right>",
    "biased_tokens": ["<word>"],
    "sentence_heatmap": [{"sentence": "<sentence>", "bias_score": <0.0-1.0>}]
  },
  "emotion_analysis": {
    "dominant_emotion": "<emotion>",
    "emotion_scores": {"anger": <0-1>, "fear": <0-1>, "joy": <0-1>, "sadness": <0-1>, "surprise": <0-1>, "disgust": <0-1>, "neutral": <0-1>}
  },
  "narrative_structure": {
    "roles": {"hero_ratio": <0-1>, "villain_ratio": <0-1>, "victim_ratio": <0-1>},
    "conflict": {"conflict_score": <0-1>, "conflict_type": "<string>"},
    "propagation": {"virality_score": <0-1>},
    "temporal": {"temporal_coherence": <0-1>}
  },
  "credibility_score": <0.0-1.0>,
  "bias": {
    "bias_score": <0.0-1.0>,
    "media_bias": "<far-left|left|center|right|far-right>",
    "biased_tokens": ["<word>"],
    "sentence_heatmap": [{"sentence": "<sentence>", "bias_score": <0.0-1.0>}]
  },
  "emotion": {
    "dominant_emotion": "<emotion>",
    "emotion_scores": {"anger": <0-1>, "fear": <0-1>, "joy": <0-1>, "sadness": <0-1>, "surprise": <0-1>, "disgust": <0-1>, "neutral": <0-1>}
  },
  "narrative": {
    "roles": {"hero_ratio": <0-1>, "villain_ratio": <0-1>, "victim_ratio": <0-1>},
    "conflict": {"conflict_score": <0-1>, "conflict_type": "<string>"},
    "propagation": {"virality_score": <0-1>},
    "temporal": {"temporal_coherence": <0-1>}
  },
  "framing": {
    "framing_positive": <0-1>, "framing_negative": <0-1>, "framing_neutral": <0-1>,
    "framing_conflict": <0-1>, "framing_economic": <0-1>, "framing_political": <0-1>
  },
  "rhetoric": {
    "rhetorical_devices": {
      "rhetoric_exaggeration_score": <0-1>,
      "rhetoric_fear_appeal_score": <0-1>,
      "rhetoric_loaded_language_score": <0-1>
    },
    "argument_structure": {"has_evidence": <true|false>, "logical_fallacies": <0-1>}
  },
  "propaganda_analysis": {
    "fear_propaganda_score": <0-1>, "scapegoating_score": <0-1>,
    "polarization_score": <0-1>, "propaganda_intensity": <0-1>
  },
  "graph_analysis": {
    "narrative_graph_metrics": {"graph_nodes": <int>, "graph_edges": <int>, "graph_density": <0-1>, "graph_clustering": <0-1>},
    "graph_features": {}, "temporal_graph": {}
  },
  "explainability": {
    "lime": {"structured": [{"token": "<word>", "importance": <-1 to 1>}], "faithful": true},
    "aggregated": {}, "explanation_metrics": {}, "explanation_quality_score": <0-1>,
    "metadata": {}, "module_failures": []
  }
}`;
}

// ─── Gemini caller ─────────────────────────────────────────────────────────────

async function callGemini(prompt) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { maxOutputTokens: 8192 },
  });
  const raw = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return extractJson(raw);
}

// ─── Route handler factory ─────────────────────────────────────────────────────

function makeHandler(modelPath, geminiPromptFn) {
  return async (req, res) => {
    const { text } = req.body ?? {};

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(422).json({ detail: 'text field is required and must be non-empty.' });
    }

    const primaryCall = MODEL_API
      ? withTimeout(callPrimaryModel(modelPath, { text }), REQUEST_TIMEOUT)
      : Promise.reject(new Error('No primary model'));

    const geminiCall = withTimeout(
      callGemini(geminiPromptFn(text)),
      REQUEST_TIMEOUT
    );

    const [primaryResult, geminiResult] = await Promise.allSettled([primaryCall, geminiCall]);

    if (primaryResult.status === 'fulfilled') {
      console.log(`[${modelPath}] primary model succeeded`);
      return res.json(primaryResult.value);
    }

    if (geminiResult.status === 'fulfilled') {
      console.log(`[${modelPath}] using Gemini fallback`);
      return res.json({ ...geminiResult.value, _source: 'gemini' });
    }

    console.error(`[${modelPath}] both sources failed:`, {
      primary: primaryResult.reason?.message,
      gemini: geminiResult.reason?.message,
    });

    return res.status(500).json({
      detail: 'Analysis failed. Both the primary model and the Gemini fallback encountered errors.',
      primary_error: primaryResult.reason?.message,
      gemini_error: geminiResult.reason?.message,
    });
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

app.post('/analyze', makeHandler('/analyze', analyzePrompt));
app.post('/explain', makeHandler('/explain', explainPrompt));
app.post('/report', makeHandler('/report', reportPrompt));

app.get('/health', async (_req, res) => {
  let primaryStatus = 'unconfigured';
  if (MODEL_API) {
    try {
      const r = await withTimeout(fetch(`${MODEL_API}/health`), 5_000);
      primaryStatus = r.ok ? 'online' : 'degraded';
    } catch {
      primaryStatus = 'offline';
    }
  }
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    primary_model: primaryStatus,
    fallback: 'gemini-2.5-flash',
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TruthLens backend running on port ${PORT}`);
  console.log(`Primary model: ${MODEL_API ?? 'not configured — Gemini fallback only'}`);
});
