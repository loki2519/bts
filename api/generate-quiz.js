import { EXPANDED_FALLBACK_POOL } from '../src/data/quizData.js';

// Global server-side recent question history cache
const recentQuestionHistory = new Set();

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomizeQuestionOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length !== 4) return null;

  const originalOptions = [...q.options];
  const correctOptionText = originalOptions[q.correctAnswer || 0];

  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    ...q,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

function validateQuestion(q) {
  if (!q || typeof q.question !== 'string' || !q.question.trim()) return false;
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;

  const uniqueOpts = new Set(q.options.map(o => String(o).trim().toLowerCase()));
  if (uniqueOpts.size !== 4) return false;

  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) return false;
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  console.log(`[QUIZ REQUEST RECEIVED] ID: ${requestId}`);

  const apiKey = process.env.GEMINI_API_KEY;
  const { category = "General", difficulty = "MEDIUM" } = req.body || req.query || {};

  if (apiKey && apiKey.trim().length > 10) {
    try {
      console.log(`[GEMINI REQUEST SENT] Category: ${category}, Difficulty: ${difficulty}, RequestNonce: ${requestId}`);

      const recentList = Array.from(recentQuestionHistory).slice(-20).join('; ');
      const prompt = `You are the ultimate BTS (Bangtan Sonyeondan) trivia generator. Request ID: ${requestId}.
Generate a completely NEW set of 10 factually accurate multiple-choice questions about BTS.
Category: "${category}". Difficulty: "${difficulty}".
DO NOT repeat any of these recently asked questions: [${recentList}].

Return ONLY a valid JSON array of 10 objects without any markdown text.
Each object MUST follow this schema:
[
  {
    "question": "Factual question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "category": "${category}",
    "difficulty": "${difficulty}",
    "explanation": "Fact-based explanation."
  }
]`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const jsonMatch = rawText.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed) && parsed.length >= 10) {
            const validated = parsed
              .filter(validateQuestion)
              .map(randomizeQuestionOptions)
              .filter(Boolean);

            if (validated.length >= 10) {
              console.log(`[QUESTIONS GENERATED: 10] Source: Gemini AI`);
              
              // Record questions in recent history
              validated.forEach(q => recentQuestionHistory.add(q.question));
              if (recentQuestionHistory.size > 100) {
                const arr = Array.from(recentQuestionHistory);
                recentQuestionHistory.clear();
                arr.slice(-50).forEach(item => recentQuestionHistory.add(item));
              }

              return res.status(200).json({
                requestId,
                source: 'gemini_ai',
                questions: shuffleArray(validated).slice(0, 10)
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn("Gemini Quiz API fallback triggered:", e.message);
    }
  }

  // Fallback: Pick 10 non-duplicate questions from expanded pool
  const pool = EXPANDED_FALLBACK_POOL[difficulty] || EXPANDED_FALLBACK_POOL.MEDIUM || Object.values(EXPANDED_FALLBACK_POOL).flat();
  const unasked = pool.filter(q => !recentQuestionHistory.has(q.question));
  const candidatePool = unasked.length >= 10 ? unasked : pool;
  
  const shuffledPool = shuffleArray(candidatePool);
  const selected = shuffledPool.slice(0, 10).map(randomizeQuestionOptions).filter(Boolean);

  selected.forEach(q => recentQuestionHistory.add(q.question));
  console.log(`[QUESTIONS GENERATED: 10] Source: Fallback Pool`);

  return res.status(200).json({
    requestId,
    source: 'fallback_pool',
    questions: selected
  });
}
