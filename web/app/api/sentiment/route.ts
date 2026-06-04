import { NextRequest, NextResponse } from 'next/server';

const HF_API_URL =
  'https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest';

const MAX_INPUT_LENGTH = 1000;
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  data: unknown;
  expiry: number;
}

const responseCache = new Map<string, CacheEntry>();

function getCached(input: string): unknown | null {
  const entry = responseCache.get(input);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    responseCache.delete(input);
    return null;
  }
  return entry.data;
}

function setCache(input: string, data: unknown) {
  responseCache.set(input, { data, expiry: Date.now() + CACHE_TTL_MS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputs } = body;

    if (!inputs || typeof inputs !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "inputs" field' }, { status: 400 });
    }

    const trimmed = inputs.trim();
    if (trimmed.length === 0) {
      return NextResponse.json({ error: '"inputs" must not be empty' }, { status: 400 });
    }

    if (trimmed.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: `"inputs" exceeds maximum length of ${MAX_INPUT_LENGTH} characters` },
        { status: 400 },
      );
    }

    const cached = getCached(trimmed);
    if (cached) {
      return NextResponse.json(cached);
    }

    const token = process.env.HF_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Sentiment analysis is not configured' }, { status: 500 });
    }

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: trimmed }),
    });

    if (!response.ok) {
      const status = response.status;
      let message = 'Sentiment analysis service returned an error';
      if (status === 429) {
        message = 'Sentiment analysis service is rate-limited. Please try again.';
      } else if (status >= 500) {
        message = 'Sentiment analysis service is temporarily unavailable.';
      }
      return NextResponse.json({ error: message }, { status });
    }

    const data = await response.json();
    setCache(trimmed, data);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
