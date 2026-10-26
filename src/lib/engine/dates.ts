/**
 * Calendar rules of the exams, all read from params-2026.json: retake waiting periods (FINRA Rule
 * 1210.06, shortened from 19 January 2027 by Regulatory Notice 26-18; NASAA's own periods for the
 * Series 63, 65 and 66), the 120-day enrollment window, the four-year life of an SIE pass, the
 * two-year lapse of a registration and the five-year Maintaining Qualifications Program.
 * Dates are day numbers since 1970-01-01 (UTC) so that no time zone can move a day.
 */
import P from '../../data/params-2026.json';

export const dayNum = (iso: string) => Math.round(Date.parse(`${iso}T00:00:00Z`) / 86400000);
export const isoOf = (n: number) => new Date(n * 86400000).toISOString().slice(0, 10);
export const addDays = (d: number, k: number) => d + k;
export function addMonths(d: number, k: number) {
  const x = new Date(d * 86400000);
  const y = x.getUTCFullYear(), m = x.getUTCMonth() + k, day = x.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Math.round(Date.UTC(y, m, Math.min(day, last)) / 86400000);
}
export const addYears = (d: number, k: number) => addMonths(d, 12 * k);

export type Owner = 'FINRA' | 'NASAA';
export interface Retake { earliest: number; days: number; rule: 'finra-current' | 'finra-2027' | 'nasaa'; note: string }

/**
 * Earliest day a failed exam can be taken again. `failures` = failed attempts in a row within the
 * last two years, this one included (1, 2, 3 or more). FINRA exams: 30 days after a first or second
 * failure, 180 after a third; from 19 January 2027, 15 and 60 days, and FINRA moves the testing
 * window of an open enrollment without appointment on that date, so the earliest day is the sooner
 * of the two rules. NASAA exams (63, 65, 66) keep 30 / 30 / 180 days.
 */
export function retakeDate(owner: Owner, failDay: number, failures: number): Retake {
  const third = failures >= 3;
  if (owner === 'NASAA') {
    const days = third ? P.retake.nasaa.thirdDays : P.retake.nasaa.firstAndSecondDays;
    return { earliest: failDay + days, days, rule: 'nasaa', note: 'NASAA waiting period, unchanged by FINRA Notice 26-18' };
  }
  const oldDays = third ? P.retake.finra.thirdDays : P.retake.finra.firstAndSecondDays;
  const newDays = third ? P.retake.finraFrom.thirdDays : P.retake.finraFrom.firstAndSecondDays;
  const from = dayNum(P.retake.finraFrom.date);
  const byOld = failDay + oldDays;
  const byNew = Math.max(failDay + newDays, from);
  if (byNew < byOld) return { earliest: byNew, days: byNew - failDay, rule: 'finra-2027', note: `shorter ${newDays}-day period from ${P.retake.finraFrom.date}` };
  return { earliest: byOld, days: oldDays, rule: 'finra-current', note: `${oldDays}-day period of Rule 1210.06` };
}

/** Last day of the 120-day window opened by an enrollment (day of enrollment = day 0). */
export const windowEnd = (enrollDay: number) => enrollDay + P.windowDays;
/** An SIE pass stays usable for four years from the day it was passed. */
export const sieExpiry = (passDay: number) => addYears(passDay, P.exams.sie.validYears);
/** A representative registration terminated more than two years ago needs the exam again. */
export const lapseDay = (terminationDay: number) => addYears(terminationDay, P.lapseYears);
/** With the Maintaining Qualifications Program the limit becomes five years (annual CE required). */
export const mqpDay = (terminationDay: number) => addYears(terminationDay, P.mqp.maxYears);
/** Last day to elect the MQP: two years after the termination. */
export const mqpElectBy = (terminationDay: number) => addYears(terminationDay, P.mqp.electWithinYears);
/**
 * Regulatory Element deadline (Rule 1240(a)): December 31 of each year; a person first registered in
 * year Y completes it by December 31 of Y + 1.
 */
export function ceDeadline(registrationDay: number, today: number) {
  const y0 = new Date(registrationDay * 86400000).getUTCFullYear();
  const yT = new Date(today * 86400000).getUTCFullYear();
  const y = Math.max(y0 + 1, yT);
  return dayNum(`${y}-12-31`);
}
/** Business days before a date (weekends only skipped; federal holidays not removed). */
export function businessDaysBefore(appt: number, k: number) {
  let x = appt, left = k;
  while (left > 0) { x--; const wd = new Date(x * 86400000).getUTCDay(); if (wd !== 0 && wd !== 6) left--; }
  return x;
}
