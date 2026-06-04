'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypingText({
  words,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = ''
}: TypingTextProps) {
  const [currentText, setCurrentText] = useState('');

  const textRef = useRef('');
  const wordIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const wordsRef = useRef(words);
  const typingSpeedRef = useRef(typingSpeed);
  const deletingSpeedRef = useRef(deletingSpeed);
  const pauseDurationRef = useRef(pauseDuration);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    typingSpeedRef.current = typingSpeed;
    deletingSpeedRef.current = deletingSpeed;
    pauseDurationRef.current = pauseDuration;
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const tick = () => {
      const currentWords = wordsRef.current;
      const idx = wordIndexRef.current;
      const fullWord = currentWords[idx];

      if (!isDeletingRef.current) {
        const nextText = fullWord.substring(0, textRef.current.length + 1);
        textRef.current = nextText;
        setCurrentText(nextText);

        if (nextText === fullWord) {
          timeout = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, pauseDurationRef.current);
          return;
        }
        timeout = setTimeout(tick, typingSpeedRef.current);
      } else {
        const nextText = fullWord.substring(0, textRef.current.length - 1);
        textRef.current = nextText;
        setCurrentText(nextText);

        if (nextText === '') {
          isDeletingRef.current = false;
          wordIndexRef.current = (idx + 1) % currentWords.length;
          timeout = setTimeout(tick, 500);
          return;
        }
        timeout = setTimeout(tick, deletingSpeedRef.current);
      }
    };

    timeout = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-[2px] h-[0.9em] bg-indigo-400 ml-1 align-middle"
      />
    </span>
  );
}
