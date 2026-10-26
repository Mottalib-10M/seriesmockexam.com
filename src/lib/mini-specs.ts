/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, read from params-2026.json
 * or the site's engines (exam.ts, dates.ts, money.ts), never a second formula in a page.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL, pct, dateL } from './format-l';
import { passNeeded, atLeast, examOf, EXAM_IDS, type ExamId } from './engine/exam';
import { EXAM_LABEL } from './banks';
import { dayNum, isoOf, retakeDate, windowEnd, sieExpiry, lapseDay, mqpDay, mqpElectBy, ceDeadline, addDays } from './engine/dates';
import { currentYield, ytm, ytmApprox, tey, accrued, option, marginLong, pop, chargeOf, type OptionPos } from './engine/money';

const n0 = (v: number, dd = 0) => formatNumberL(v, 'en', dd);
const D = (n: number) => dateL(isoOf(n));
const d = (iso: string) => dayNum(iso);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const plural = (k: number, w: string) => `${n0(k)} ${w}${k === 1 ? '' : 's'}`;
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const EXAMS = EXAM_IDS.map((id, i) => ({ value: String(i), label: `${EXAM_LABEL[id]} (${examOf(id).scored} questions)` }));
const ex = (v: number | undefined): ExamId => EXAM_IDS[clamp(Math.round(v ?? 0), 0, EXAM_IDS.length - 1)];
const fee = (e: ExamId) => examOf(e).fee;
const usd = (v: number, dd = 2) => money(v, dd);
const inf = (v: number, dd = 2) => (Number.isFinite(v) ? usd(v, dd) : 'Unlimited');
/** Index of an exam in the select, for page defaults: idx('s7') = 1. */
export const idx = (e: ExamId) => EXAM_IDS.indexOf(e);

/** Roles of the license finder: exams to pass, in order, and whether a firm must sponsor them. */
export const ROLES: Array<{ label: string; exams: ExamId[]; note: string }> = [
  { label: 'Not hired yet: student or career changer', exams: ['sie'], note: 'The SIE needs no sponsoring firm; a firm will sponsor the next exam when it hires you.' },
  { label: 'Stockbroker: stocks, bonds, options (general securities representative)', exams: ['sie', 's7', 's63'], note: 'Series 7 needs a sponsoring firm; most states then ask for the Series 63 to act as an agent.' },
  { label: 'Mutual funds, variable annuities, 529 plans only', exams: ['sie', 's6', 's63'], note: 'Series 6 needs a sponsoring firm; the state agent registration usually rests on the Series 63.' },
  { label: 'Investment adviser representative, fees for advice', exams: ['s65'], note: 'The Series 65 needs no sponsor and no SIE; the state registration is made through an adviser firm.' },
  { label: 'Both broker and adviser representative', exams: ['sie', 's7', 's66'], note: 'The Series 66 replaces the 63 and the 65 together, but only on top of the Series 7.' },
];
/** Fee bundles of the fee calculator. */
const BUNDLES: Array<{ label: string; exams: ExamId[] }> = [
  { label: 'SIE only', exams: ['sie'] }, { label: 'SIE + Series 7', exams: ['sie', 's7'] }, { label: 'SIE + Series 7 + Series 63', exams: ['sie', 's7', 's63'] },
  { label: 'SIE + Series 6 + Series 63', exams: ['sie', 's6', 's63'] }, { label: 'SIE + Series 7 + Series 66', exams: ['sie', 's7', 's66'] }, { label: 'Series 65 only', exams: ['s65'] },
  { label: 'Series 63 only', exams: ['s63'] }, { label: 'Series 66 only', exams: ['s66'] }, { label: 'Series 6 only', exams: ['s6'] }, { label: 'Series 7 only', exams: ['s7'] },
];
const POS: Array<{ value: string; label: string; k: OptionPos }> = [
  { value: '0', label: 'Buy a call (long call)', k: 'long-call' }, { value: '1', label: 'Buy a put (long put)', k: 'long-put' },
  { value: '2', label: 'Write a call (short call)', k: 'short-call' }, { value: '3', label: 'Write a put (short put)', k: 'short-put' },
];

const SPECS: Record<string, () => MiniSpec> = {
  passline: () => ({
    title: 'Is my mock score above the passing line?', cta: 'Take a full mock exam', ctaPage: 'sie-practice-exam',
    inputs: [{ id: 'e', label: 'Exam', def: 0, options: EXAMS }, { id: 'r', label: 'Correct answers on a full mock', def: 55, max: 130 }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), n = x.scored, need = passNeeded(e), r = clamp(Math.round(v.r ?? 0), 0, n);
      const exact = x.passKind === 'count';
      return { head: [exact ? 'Result on the official scale' : 'Result against the line (approximation)', r >= need ? 'Above the line' : 'Below the line'], rows: [['Passing line', exact ? `${x.passCorrect} of ${n} correct` : `scaled ${x.passScore}, about ${need} of ${n}`], ['Your share', pct(r / n)], [r >= need ? 'Margin' : 'Short by', plural(Math.abs(r - need), 'answer')], ['Questions you can miss', n0(n - need)]], note: exact ? 'NASAA sets the pass as a number of correct answers out of the scored questions, so this is exact for a mock of the same length.' : 'FINRA reports a scaled score after equating each exam form; it publishes no table from correct answers to scaled score, so the share of correct answers is only a guide.' };
    },
  }),
  readiness: () => ({
    title: 'What my practice rate means on exam day', cta: 'Measure it on a timed mock', ctaPage: 'sie-practice-exam',
    inputs: [{ id: 'e', label: 'Exam', def: 0, options: EXAMS }, { id: 'p', label: 'Share of practice questions you get right', def: 78, max: 100, unit: '%' }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), n = x.scored, need = passNeeded(e), p = clamp(v.p ?? 0, 0, 100) / 100;
      return { head: [`Chance of ${need} or more out of ${n}`, pct(atLeast(n, need, p))], rows: [['Expected score', `${n0(Math.round(p * n))} of ${n}`], ['Line used', `${need} of ${n}`], ['Model', 'every question right at the same rate']], note: 'A binomial estimate from your own rate, not a forecast: the real questions are worded differently and a weak section can pull the score down.' };
    },
  }),
  pace: () => ({
    title: 'Time per question on exam day', cta: 'Practice under the clock', ctaPage: 'sie-practice-exam',
    inputs: [{ id: 'e', label: 'Exam', def: 0, options: EXAMS }, { id: 'done', label: 'Questions answered so far', def: 40, max: 140 }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), items = x.scored + x.unscored, k = clamp(Math.round(v.done ?? 0), 0, items);
      const per = (x.minutes * 60) / items, used = (k * per) / 60;
      return { head: ['Seconds per question', n0(per)], rows: [['Questions on screen', `${items} (${x.unscored} unscored)`], ['Time allowed', `${x.minutes} minutes`], [`After ${k} questions, on pace`, `${n0(used)} min used, ${n0(x.minutes - used)} left`]], note: 'The unscored pretest questions look like the others and are spread through the exam, so the pace counts them too.' };
    },
  }),
  studyplan: () => ({
    title: 'When will I have studied enough?', cta: 'Start with a practice set', ctaPage: 'sie-practice-test',
    inputs: [{ id: 'h', label: 'Study hours you plan in total', def: 60, max: 1000, unit: 'h', help: 'Your own target: FINRA and NASAA publish no recommended number of hours.' }, { id: 'w', label: 'Hours you can study per week', def: 8, max: 80, unit: 'h' }, { id: 's', label: 'Start date', def: d('2026-11-02'), date: true }],
    run: (v) => {
      const h = Math.max(1, v.h ?? 1), w = Math.max(1, v.w ?? 1), wk = Math.ceil(h / w), end = addDays(v.s ?? 0, wk * 7);
      return { head: ['Study finished around', D(end)], rows: [['Weeks of study', n0(wk)], ['Hours per day (6 days a week)', n0(w / 6, 1)], ['Then book the exam', 'inside your 120-day window']] };
    },
  }),
  license: () => ({
    title: 'Which exams does my job need?', cta: 'Exam fees in detail', ctaPage: 'exam-fees',
    inputs: [{ id: 'r', label: 'What you will do', def: 1, options: ROLES.map((r, i) => ({ value: String(i), label: r.label })) }, { id: 'sie', label: 'SIE already passed (less than 4 years ago)?', def: 0, options: yn }],
    run: (v) => {
      const R = ROLES[clamp(Math.round(v.r ?? 0), 0, ROLES.length - 1)];
      const todo = R.exams.filter((e) => !(e === 'sie' && v.sie));
      const q = todo.reduce((s, e) => s + examOf(e).scored, 0), mins = todo.reduce((s, e) => s + examOf(e).minutes, 0);
      return { head: ['Exams to pass', todo.length ? todo.map((e) => EXAM_LABEL[e]).join(' + ') : 'None left'], rows: [['Exam fees, 2026', usd(todo.reduce((s, e) => s + fee(e), 0), 0)], ['Scored questions in all', n0(q)], ['Seat time in all', `${n0(mins / 60, 1)} hours`], ['Firm sponsorship', todo.some((e) => examOf(e).sponsorship) ? 'needed for ' + todo.filter((e) => examOf(e).sponsorship).map((e) => EXAM_LABEL[e]).join(', ') : 'not needed']], note: R.note };
    },
  }),
  fees: () => ({
    title: 'What the exams will cost', cta: 'Check the retake waiting period', ctaPage: 'retake-rules',
    inputs: [{ id: 'b', label: 'Exams', def: 2, options: BUNDLES.map((b, i) => ({ value: String(i), label: b.label })) }, { id: 'k', label: 'Retakes you budget for', def: 0, max: 10 }, { id: 'late', label: 'Late change of appointment', def: 0, options: [{ value: '0', label: 'None' }, { value: '1', label: 'Once, 3 to 10 business days before (half fee)' }, { value: '2', label: 'Once, 2 business days or less, or no-show (full fee)' }] }],
    run: (v) => {
      const B = BUNDLES[clamp(Math.round(v.b ?? 0), 0, BUNDLES.length - 1)];
      const base = B.exams.reduce((s, e) => s + fee(e), 0), dear = Math.max(...B.exams.map(fee));
      const k = clamp(Math.round(v.k ?? 0), 0, 10), retakes = k * dear, late = v.late === 2 ? dear : v.late === 1 ? dear / 2 : 0;
      return { head: ['Total exam fees', usd(base + retakes + late, 0)], rows: [...B.exams.map((e): [string, string] => [EXAM_LABEL[e], usd(fee(e), 0)]), ['Retakes (priced at the dearest exam)', usd(retakes, 0)], ['Late change or no-show', usd(late, 0)]], note: `FINRA fee schedule in force since ${dateL(P.feeIncrease.effective)}. A firm that sponsors you often pays its exams; ask before you enroll.` };
    },
  }),
  retake: () => ({
    title: 'Earliest date to sit it again', cta: 'Full retake rules', ctaPage: 'retake-rules',
    inputs: [{ id: 'e', label: 'Exam failed', def: 0, options: EXAMS }, { id: 'f', label: 'Date of the failed attempt', def: d('2026-11-10'), date: true }, { id: 'k', label: 'Failed attempts in a row', def: 1, options: [{ value: '1', label: 'First failure' }, { value: '2', label: 'Second failure' }, { value: '3', label: 'Third failure or more' }] }],
    run: (v) => {
      const e = ex(v.e), owner = examOf(e).owner as 'FINRA' | 'NASAA', r = retakeDate(owner, v.f ?? 0, Math.round(v.k ?? 1));
      return { head: ['Earliest retake', D(r.earliest)], rows: [['Waiting period', plural(r.days, 'day')], ['Rule applied', r.rule === 'nasaa' ? 'NASAA waiting periods' : r.rule === 'finra-2027' ? `FINRA, shorter periods from ${dateL(P.retake.finraFrom.date)}` : 'FINRA Rule 1210.06'], ['Fee to sit again', usd(fee(e), 0)]], note: owner === 'FINRA' ? `FINRA Regulatory Notice ${P.retake.finraFrom.notice} cuts the waits to ${P.retake.finraFrom.firstAndSecondDays} and ${P.retake.finraFrom.thirdDays} days from ${dateL(P.retake.finraFrom.date)}.` : 'The Series 63, 65 and 66 belong to NASAA, whose own waiting periods apply.' };
    },
  }),
  window: () => ({
    title: 'When does my 120-day window close?', cta: 'Scheduling rules', ctaPage: 'scheduling',
    inputs: [{ id: 'o', label: 'Date the enrollment was opened', def: d('2026-11-02'), date: true }, { id: 't', label: 'Today', def: d('2026-12-15'), date: true }],
    run: (v) => {
      const end = windowEnd(v.o ?? 0), left = end - (v.t ?? 0);
      return { head: ['Window closes', D(end)], rows: [['Window length', plural(P.windowDays, 'day')], ['Days left', left >= 0 ? n0(left) : 'closed'], ['Online delivery', 'SIE: yes; other exams: approved accommodation only']], note: 'FINRA posts the window when you enroll and the exam must be taken inside it; book the appointment well before the end, as test center dates fill up.' };
    },
  }),
  reschedule: () => ({
    title: 'Will moving my appointment cost me?', cta: 'Scheduling rules', ctaPage: 'scheduling',
    inputs: [{ id: 'a', label: 'Exam appointment', def: d('2026-12-14'), date: true }, { id: 'c', label: 'Day you cancel or move it', def: d('2026-12-07'), date: true }, { id: 'e', label: 'Exam', def: 1, options: EXAMS }],
    run: (v) => {
      const a = v.a ?? 0, c = v.c ?? 0; let bd = 0;
      for (let x = c; x < a; x++) { const wd = new Date(x * 86400000).getUTCDay(); if (x > c && wd !== 0 && wd !== 6) bd++; }
      const R = P.reschedule, e = ex(v.e), f = fee(e);
      const charge = a <= c || bd <= R.fullChargeWithinBusinessDays ? f : bd <= R.halfChargeToBusinessDays ? f / 2 : 0;
      return { head: ['Charge', charge ? usd(charge, 0) : 'None'], rows: [['Business days before', n0(Math.max(0, bd))], ['Full fee', `${R.fullChargeWithinBusinessDays} business days or less, or no-show`], ['Half fee', `${R.halfChargeFromBusinessDays} to ${R.halfChargeToBusinessDays} business days`]], note: 'Business days counted from the day after the change to the day before the exam, weekends skipped; public holidays are not removed, so near a holiday check with the test center.' };
    },
  }),
  sievalid: () => ({
    title: 'Until when is my SIE pass good?', cta: 'SIE expiration rules', ctaPage: 'sie-expiration',
    inputs: [{ id: 'p', label: 'Date you passed the SIE', def: d('2024-06-20'), date: true }, { id: 't', label: 'Date a firm would register you', def: d('2026-11-15'), date: true }],
    run: (v) => {
      const end = sieExpiry(v.p ?? 0), left = end - (v.t ?? 0);
      return { head: ['SIE valid until', D(end)], rows: [['Valid for', plural(examOf('sie').validYears!, 'year')], ['On the registration date', left > 0 ? `valid, ${plural(left, 'day')} to spare` : 'expired: sit it again'], ['Once registered', 'counts as long as you stay registered']] };
    },
  }),
  lapse: () => ({
    title: 'Left the industry: how long do my exams last?', cta: 'Two-year rule and MQP', ctaPage: 'two-year-rule',
    inputs: [{ id: 't', label: 'Date your registration ended (Form U5)', def: d('2026-03-31'), date: true }, { id: 'm', label: 'Elected the Maintaining Qualifications Program?', def: 0, options: yn }],
    run: (v) => {
      const t = v.t ?? 0, m = !!v.m;
      return { head: ['Exams valid until', D(m ? mqpDay(t) : lapseDay(t))], rows: [['Without MQP', D(lapseDay(t))], ['With MQP (annual CE)', D(mqpDay(t))], ['Last day to elect MQP', D(mqpElectBy(t))]], note: `The MQP is open to people registered for at least ${P.mqp.minRegisteredYears} year, who then complete continuing education every year; it does not cover the Series 63, 65 or 66, which follow the state rules (NASAA's EVEP, in the states that adopted it).` };
    },
  }),
  cedeadline: () => ({
    title: 'Regulatory Element deadline', cta: 'Continuing education rules', ctaPage: 'continuing-education',
    inputs: [{ id: 'r', label: 'Date you were first registered', def: d('2026-05-04'), date: true }, { id: 't', label: 'Today', def: d('2026-10-26'), date: true }],
    run: (v) => {
      const dl = ceDeadline(v.r ?? 0, v.t ?? 0), left = dl - (v.t ?? 0);
      return { head: ['Complete it by', D(dl)], rows: [['Days left', n0(Math.max(0, left))], ['Then', 'every year by December 31'], ['Fee per session, 2026', usd(P.otherFees2026.regElement, 0)]], note: 'Miss the deadline and the registration becomes CE inactive: no business and no pay for securities activity until it is done; after two years inactive it is terminated.' };
    },
  }),
  bondyield: () => ({
    title: 'Current yield and yield to maturity', cta: 'More bond math', ctaPage: 'bond-yields',
    inputs: [{ id: 'c', label: 'Coupon rate', def: 5, max: 30, unit: '%', decimals: 2 }, { id: 'p', label: 'Price per $1,000 bond', def: 950, max: 5000, unit: '$' }, { id: 'y', label: 'Years to maturity', def: 10, max: 50 }],
    run: (v) => {
      const c = v.c ?? 0, p = Math.max(1, v.p ?? 1000), y = Math.max(0.5, v.y ?? 1);
      const cy = currentYield(c, p), yt = ytm(c, y, p), ya = ytmApprox(c, y, p);
      return { head: ['Yield to maturity', pct(yt, 'en', 2)], rows: [['Nominal yield (coupon)', pct(c / 100, 'en', 2)], ['Current yield', pct(cy, 'en', 2)], ['Rule-of-thumb YTM', pct(ya, 'en', 2)], ['Bond trades at', p < 1000 ? 'a discount' : p > 1000 ? 'a premium' : 'par']], note: p < 1000 ? 'At a discount the order is coupon < current yield < yield to maturity.' : p > 1000 ? 'At a premium the order is reversed: coupon > current yield > yield to maturity.' : 'At par all three yields are equal.' };
    },
  }),
  tey: () => ({
    title: 'Tax-equivalent yield of a muni', cta: 'Municipal bond math', ctaPage: 'muni-bond-math',
    inputs: [{ id: 'm', label: 'Municipal bond yield', def: 3.5, max: 20, unit: '%', decimals: 2 }, { id: 't', label: 'Marginal federal tax rate', def: 32, max: 60, unit: '%' }],
    run: (v) => {
      const r = tey(v.m ?? 0, v.t ?? 0);
      return { head: ['Taxable yield needed to match', pct(r, 'en', 2)], rows: [['Formula', 'muni yield / (1 - tax rate)'], ['Tax-free yield', pct((v.m ?? 0) / 100, 'en', 2)], ['Tax rate', pct((v.t ?? 0) / 100)]], note: 'The higher the bracket, the more a tax-free coupon is worth; state tax is left out here.' };
    },
  }),
  accrued: () => ({
    title: 'Accrued interest on a corporate or muni bond', cta: 'Municipal bond math', ctaPage: 'muni-bond-math',
    inputs: [{ id: 'c', label: 'Coupon rate', def: 6, max: 30, unit: '%', decimals: 2 }, { id: 'l', label: 'Last coupon date', def: d('2026-07-01'), date: true }, { id: 't', label: 'Trade date', def: d('2026-10-14'), date: true }],
    run: (v) => {
      const settle = addDays(v.t ?? 0, P.settlement.regularWayDays);
      const a = accrued(v.c ?? 0, v.l ?? 0, settle);
      return { head: ['Accrued interest per $1,000', usd(a.amount)], rows: [['Settlement (T+1)', D(settle)], ['Days, 30/360', n0(a.days)], ['Paid by', 'the buyer, to the seller']], note: 'Interest accrues from the last coupon date up to the day before settlement; weekends and holidays are not removed from the settlement date here.' };
    },
  }),
  options: () => ({
    title: 'Breakeven, maximum gain and loss', cta: 'Options math', ctaPage: 'options-math',
    inputs: [{ id: 'k', label: 'Position', def: 0, options: POS.map(({ value, label }) => ({ value, label })) }, { id: 's', label: 'Strike price', def: 50, max: 10000, unit: '$' }, { id: 'p', label: 'Premium per share', def: 3, max: 1000, unit: '$', decimals: 2 }],
    run: (v) => {
      const P0 = POS[clamp(Math.round(v.k ?? 0), 0, 3)], o = option(P0.k, v.s ?? 0, v.p ?? 0);
      return { head: ['Breakeven per share', usd(o.breakeven)], rows: [['Maximum gain, 1 contract', Number.isFinite(o.maxGain) ? usd(o.maxGain * 100, 0) : 'Unlimited'], ['Maximum loss, 1 contract', Number.isFinite(o.maxLoss) ? usd(o.maxLoss * 100, 0) : 'Unlimited'], ['Premium for 1 contract', usd((v.p ?? 0) * 100, 0)]], note: 'One contract covers 100 shares. Calls: breakeven = strike + premium. Puts: strike - premium.' };
    },
  }),
  margin: () => ({
    title: 'Long margin account', cta: 'Margin math', ctaPage: 'margin-math',
    inputs: [{ id: 'b', label: 'Purchase amount', def: 20000, max: 10000000, unit: '$' }, { id: 'm', label: 'Market value today', def: 16000, max: 10000000, unit: '$' }],
    run: (v) => {
      const r = marginLong(Math.max(0, v.b ?? 0), Math.max(0, v.m ?? 0));
      return { head: ['Equity', usd(r.equity, 0)], rows: [['Deposit required (Reg T 50%, $2,000 minimum)', usd(r.deposit, 0)], ['Debit balance (loan)', usd(r.debit, 0)], ['Equity / market value', pct(r.equityPct)], ['Maintenance call below', usd(r.callAt, 0)]], note: r.call ? 'Equity is under 25% of the market value: a maintenance call is due.' : 'The 25% minimum is FINRA Rule 4210; many firms set a higher house requirement.' };
    },
  }),
  nav: () => ({
    title: 'Mutual fund offering price', cta: 'Fund pricing math', ctaPage: 'fund-pricing',
    inputs: [{ id: 'n', label: 'Net asset value per share', def: 20, max: 10000, unit: '$', decimals: 2 }, { id: 'c', label: 'Sales charge', def: 5, max: P.funds.maxSalesCharge, unit: '%', decimals: 2 }, { id: 'a', label: 'Amount invested', def: 10000, max: 10000000, unit: '$' }],
    run: (v) => {
      const nav = v.n ?? 0, c = v.c ?? 0, p = pop(nav, c), sh = p > 0 ? (v.a ?? 0) / p : 0;
      return { head: ['Public offering price', usd(p)], rows: [['Charge per share', usd(p - nav)], ['Charge as share of NAV', pct(nav > 0 ? (p - nav) / nav : 0, 'en', 2)], ['Shares bought', n0(sh, 3)]], note: 'The sales charge is a percentage of the offering price, not of the NAV: POP = NAV / (1 - sales charge).' };
    },
  }),
  chargepct: () => ({
    title: 'Sales charge from NAV and offering price', cta: 'Fund pricing math', ctaPage: 'fund-pricing',
    inputs: [{ id: 'n', label: 'NAV per share', def: 18.6, max: 10000, unit: '$', decimals: 2 }, { id: 'p', label: 'Public offering price', def: 20, max: 10000, unit: '$', decimals: 2 }],
    run: (v) => ({ head: ['Sales charge', pct(chargeOf(v.n ?? 0, v.p ?? 0), 'en', 2)], rows: [['Charge per share', usd((v.p ?? 0) - (v.n ?? 0))], ['Formula', '(POP - NAV) / POP']], note: `FINRA Rule 2341 caps the sales charge at ${P.funds.maxSalesCharge}% of the offering price, less when the fund offers no breakpoints or rights of accumulation.` }),
  }),
  realreturn: () => ({
    title: 'Real return after inflation', cta: 'SIE capital markets practice', ctaPage: 'sie-capital-markets',
    inputs: [{ id: 'n', label: 'Nominal return', def: 6, max: 100, unit: '%', decimals: 2 }, { id: 'i', label: 'Inflation', def: 3, max: 50, unit: '%', decimals: 2 }],
    run: (v) => {
      const n = (v.n ?? 0) / 100, i = (v.i ?? 0) / 100;
      return { head: ['Real return', pct((1 + n) / (1 + i) - 1, 'en', 2)], rows: [['Quick estimate (nominal - inflation)', pct(n - i, 'en', 2)], ['Purchasing power of $1,000 after 10 years at this inflation', usd(1000 / (1 + i) ** 10, 0)]] };
    },
  }),
};
export function getSpec(kind: string, _lang: 'en' = 'en'): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export const SPEC_KINDS = Object.keys(SPECS);
