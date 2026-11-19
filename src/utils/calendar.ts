import { TOTAL_DAYS } from '../data/members';

export const CALENDAR_START_MONTH = 10;
export const CALENDAR_START_DAY = 19;
export const CELEBRATION_MONTH = 11;
export const CELEBRATION_DAY = 12;

export type DayRange = {
  day: number;
  startPage: number;
  endPage: number;
};

export function splitIntoDailyRanges(totalPages: number, days: number = TOTAL_DAYS): DayRange[] {
  const plan: DayRange[] = [];
  const base = Math.floor(totalPages / days);
  const remainder = totalPages % days;
  let cursor = 1;

  for (let i = 0; i < days; i++) {
    const extra = i < remainder ? 1 : 0;
    const count = base + extra;
    const startPage = cursor;
    const endPage = cursor + count - 1;
    plan.push({ day: i + 1, startPage, endPage });
    cursor = endPage + 1;
  }

  return plan;
}

export function getSeasonDates(reference: Date = new Date()) {
  const year = reference.getFullYear();
  const startDate = new Date(year, CALENDAR_START_MONTH, CALENDAR_START_DAY);
  const endDate = new Date(year, CELEBRATION_MONTH, CELEBRATION_DAY, 23, 59, 59, 999);
  return { startDate, endDate, year };
}

export function getOpenDayNumber(now: Date, startDate: Date, endDate: Date, days: number = TOTAL_DAYS): number {
  if (now < startDate) return 0;
  if (now > endDate) return days;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const elapsedDays = Math.round((today.getTime() - start.getTime()) / 86_400_000);
  return Math.min(days, elapsedDays + 1);
}

export function formatFrenchDate(day: number, year: number) {
  const date = new Date(year, CALENDAR_START_MONTH, CALENDAR_START_DAY + day - 1);
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(date);
}
