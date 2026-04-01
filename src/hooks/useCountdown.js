import { useState, useEffect } from 'react';
import { examDate } from '../data/arquitetura';

/**
 * Returns a live countdown to the exam date.
 * Updates every second. Returns { days, hours, minutes, seconds, isPast }.
 */
export function useCountdown(target = examDate) {
  const targetMs = toTimestamp(target);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return calculate(targetMs, nowMs);
}

function toTimestamp(target) {
  if (target instanceof Date) return target.getTime();
  if (typeof target === 'number') return target;
  return new Date(target).getTime();
}

function calculate(targetMs, nowMs = Date.now()) {
  if (!Number.isFinite(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const diff = targetMs - nowMs;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}
