'use client';

import { useState, useRef, useCallback } from 'react';

export interface SentimentResult {
  class: string;
  confidence: number;
  all: { label: string; score: number }[];
}

const TOTAL_ENCODER_LAYERS = 12;

type Phase = 'input' | 'embedding' | 'encoder' | 'pooling' | 'output';

export function useTransformerSimulation() {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [activeStep, setActiveStep] = useState<Phase | null>(null);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const apiResultRef = useRef<SentimentResult | null>(null);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setInputText('');
    setStatus('idle');
    setResult(null);
    setActiveStep(null);
    setActiveLayer(null);
    apiResultRef.current = null;
  }, []);

  const handleAnalyze = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!inputText.trim() || status === 'analyzing') return;

      setStatus('analyzing');
      setResult(null);
      setActiveLayer(null);
      apiResultRef.current = null;

      // Build the full step sequence with per-layer ticks
      const steps: { phase: Phase; layer?: number }[] = [
        { phase: 'input' },
        { phase: 'embedding' },
      ];
      for (let i = 0; i < TOTAL_ENCODER_LAYERS; i++) {
        steps.push({ phase: 'encoder', layer: i });
      }
      steps.push({ phase: 'pooling' });
      steps.push({ phase: 'output' });

      let stepIdx = 0;
      setActiveStep(steps[0].phase);
      if (steps[0].layer !== undefined) setActiveLayer(steps[0].layer);

      fetch('/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: inputText }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data[0]?.length) {
            const predictions = data[0] as { label: string; score: number }[];
            const best = predictions.reduce((a, b) => (a.score > b.score ? a : b));
            apiResultRef.current = {
              class: best.label,
              confidence: best.score,
              all: predictions,
            };
          }
        })
        .catch(() => {});

      const intervalTime = 200;

      intervalRef.current = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
          const s = steps[stepIdx];
          setActiveStep(s.phase);
          setActiveLayer(s.layer ?? null);
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setStatus('complete');
          const apiResult = apiResultRef.current;
          if (apiResult) {
            setResult({
              class: apiResult.class,
              confidence: Math.min(Math.max(apiResult.confidence, 0), 1),
              all: apiResult.all,
            });
          } else {
            setResult({ class: 'Error', confidence: 0, all: [] });
          }
          setActiveStep(null);
          setActiveLayer(null);
        }
      }, intervalTime);
    },
    [inputText, status],
  );

  return {
    inputText,
    setInputText,
    status,
    result,
    activeStep,
    activeLayer,
    handleAnalyze,
    reset,
  };
}
