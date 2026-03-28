// Minimal Express backend for Gemini proxy
// Uses separate keys for diagnose and grow endpoints

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const GEMINI_DIAGNOSE_API_KEY = process.env.GEMINI_DIAGNOSE_API_KEY;
const GEMINI_GROW_API_KEY = process.env.GEMINI_GROW_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Guard for missing keys
function ensureKey(key, res) {
  if (!key) {
    res.status(500).json({ error: { message: 'Server missing Gemini API key' } });
    return false;
  }
  return true;
}

function buildModelUrl(apiKey) {
  return `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
}

// Forward diagnose content structure directly
app.post('/api/gemini/diagnose', async (req, res) => {
  if (!ensureKey(GEMINI_DIAGNOSE_API_KEY, res)) return;
  try {
    const payload = req.body;
    const url = buildModelUrl(GEMINI_DIAGNOSE_API_KEY);
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('Diagnose proxy error', err);
    res.status(500).json({ error: { message: 'Failed to reach Gemini diagnose API' } });
  }
});

// Build text prompt content for grow route
app.post('/api/gemini/grow', async (req, res) => {
  if (!ensureKey(GEMINI_GROW_API_KEY, res)) return;
  try {
    const { prompt } = req.body || {};
    if (!prompt) {
      res.status(400).json({ error: { message: 'Missing prompt' } });
      return;
    }
    const payload = {
      contents: [
        {
          parts: [ { text: prompt } ]
        }
      ]
    };
    const url = buildModelUrl(GEMINI_GROW_API_KEY);
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('Grow proxy error', err);
    res.status(500).json({ error: { message: 'Failed to reach Gemini grow API' } });
  }
});

// Expose Firebase config to the frontend without hardcoding in JS
app.get('/config/firebase', (_req, res) => {
  if (!FIREBASE_CONFIG.apiKey) {
    res.status(500).json({ error: { message: 'Firebase config missing on server' } });
    return;
  }
  res.json(FIREBASE_CONFIG);
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
