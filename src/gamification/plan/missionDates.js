import { getLocalDateString } from './dailyMissions.js';

const MISSION_DATE_PATTERN = /(\d{4}-\d{2}-\d{2})$/;

export function extractMissionDate(dailyMissionId, fallbackDate = null) {
  if (typeof dailyMissionId !== 'string') return fallbackDate;
  const match = dailyMissionId.match(MISSION_DATE_PATTERN);
  return match?.[1] ?? fallbackDate;
}

export function isMissionFromToday(dailyMissionId, todayDate = getLocalDateString()) {
  return extractMissionDate(dailyMissionId) === todayDate;
}

export function compareMissionDates(dateA, dateB) {
  if (!dateA && !dateB) return 0;
  if (!dateA) return 1;
  if (!dateB) return -1;
  return dateA.localeCompare(dateB);
}

export function getTodayMissionDate() {
  return getLocalDateString();
}
