'use client';

import { useState, useRef, useCallback } from 'react';

export interface Step {
  type: string;
  layer?: number;
}

export interface SentimentResult {
  class: string;
  confidence: number;
}

export function useTransformerSimulation() {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [numLayers, setNumLayers] = useState(2);
  const [numHeads, setNumHeads] = useState(4);
  const [hiddenDim, setHiddenDim] = useState(256);
  const [activeStep, setActiveStep] = useState<Step | null>(null);

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
    apiResultRef.current = null;
  }, []);

  const handleAnalyze = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!inputText.trim() || status === 'analyzing') return;

      setStatus('analyzing');
      setResult(null);
      apiResultRef.current = null;
      setActiveStep({ type: 'embedding' });

      const stepsSequence: Step[] = [{ type: 'embedding' }];
      for (let i = 0; i < numLayers; i++) {
        stepsSequence.push({ type: 'attention_qkv', layer: i });
        stepsSequence.push({ type: 'attention_scores', layer: i });
        stepsSequence.push({ type: 'attention_output', layer: i });
        stepsSequence.push({ type: 'concat_heads', layer: i });
        stepsSequence.push({ type: 'add_norm_1', layer: i });
        stepsSequence.push({ type: 'ffn_expand', layer: i });
        stepsSequence.push({ type: 'ffn_contract', layer: i });
        stepsSequence.push({ type: 'add_norm_2', layer: i });
      }
      stepsSequence.push({ type: 'output' });

      let stepIdx = 0;
      setActiveStep(stepsSequence[0]);

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
            };
          }
        })
        .catch(() => {});

      const intervalTime = 200;

      intervalRef.current = setInterval(() => {
        stepIdx++;
        if (stepIdx < stepsSequence.length) {
          setActiveStep(stepsSequence[stepIdx]);
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
            });
          } else {
            setResult({ class: 'Error', confidence: 0 });
          }
          setActiveStep(null);
        }
      }, intervalTime);
    },
    [inputText, status, numLayers],
  );

  return {
    inputText,
    setInputText,
    status,
    result,
    numLayers,
    setNumLayers,
    numHeads,
    setNumHeads,
    hiddenDim,
    setHiddenDim,
    activeStep,
    handleAnalyze,
    reset,
  };
}
