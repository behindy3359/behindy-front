import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypingEffectOptions {
  speed?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypingEffect(
  text: string,
  options: UseTypingEffectOptions = {}
) {
  const {
    speed = 30,
    onComplete,
    enabled = true
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const stopTyping = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTyping(false);
  }, []);

  const skipTyping = useCallback(() => {
    stopTyping();
    setDisplayedText(text);
    setIsComplete(true);
    setIsTyping(false);
    onComplete?.();
  }, [text, stopTyping, onComplete]);

  const startTyping = useCallback(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    stopTyping();
    setDisplayedText('');
    setIsTyping(true);
    setIsComplete(false);
    currentIndexRef.current = 0;
  }, [text, enabled, stopTyping]);

  const reset = useCallback(() => {
    stopTyping();
    setDisplayedText('');
    setIsComplete(false);
    currentIndexRef.current = 0;
  }, [stopTyping]);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    if (isTyping && currentIndexRef.current < text.length) {
      timeoutRef.current = setTimeout(() => {
        currentIndexRef.current++;
        setDisplayedText(text.slice(0, currentIndexRef.current));

        if (currentIndexRef.current >= text.length) {
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, displayedText, isTyping, speed, enabled, onComplete]);

  useEffect(() => {
    startTyping();
  }, [text]);

  return {
    displayedText,
    isTyping,
    isComplete,
    skipTyping,
    startTyping,
    reset
  };
}