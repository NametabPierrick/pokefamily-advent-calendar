import { TOTAL_DAYS } from '../data/members';

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
  const startDate = new Date(year, 11, 1);
  const endDate = new Date(year, 11, TOTAL_DAYS, 23, 59, 59, 999);
  return { startDate, endDate, year };
}

export function getOpenDayNumber(now: Date, startDate: Date, endDate: Date, days: number = TOTAL_DAYS): number {
  if (now < startDate) return 0;
  if (now > endDate) return days;
  if (now.getMonth() !== 11) return 0;
  return Math.min(days, now.getDate());
}

export function formatFrenchDate(day: number, year: number) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(new Date(year, 11, day));
}
