/**
 * Question bank. `BANK` (lib/banks-build.ts, static import) is for the build only: pages, helpers and
 * the first render of each tool. In the browser, `loadBank` fetches the bank on demand (one chunk per
 * file), so a page ships only the questions it shows until the visitor asks for a new draw.
 */
import type { ExamId, Question } from './engine/exam';
const strip = (m: { default: unknown }) => (m.default as { questions: Question[] }).questions;
let cache: Promise<Question[]> | null = null;
export function loadBank(): Promise<Question[]> {
  cache ??= Promise.all([import('../data/questions/sie.json'), import('../data/questions/s7.json'), import('../data/questions/s6.json'), import('../data/questions/nasaa.json')]).then((ms) => ms.flatMap(strip));
  return cache;
}
/** Short names of the outline sections, for menus and score tables (the full names are in params-2026.json). */
export const SHORT: Record<ExamId, Record<string, string>> = {
  sie: { '1': 'Capital markets', '2': 'Products and their risks', '3': 'Trading, accounts and prohibited activities', '4': 'Regulatory framework' },
  s7: { F1: 'Seeking business', F2: 'Opening accounts', F3: 'Investments and recommendations', F4: 'Orders and transactions' },
  s6: { F1: 'Seeking business', F2: 'Opening accounts', F3: 'Funds, variable contracts and recommendations', F4: 'Orders and transactions' },
  s63: { '1': 'Broker-dealers', '2': 'Agents', '3': 'Ethical practices', '4': 'Communications', '5': 'Securities and issuers', '6': 'Investment advisers', '7': 'Adviser representatives', '8': 'Remedies and administration' },
  s65: { '1': 'Economics and business information', '2': 'Investment vehicles', '3': 'Recommendations and strategies', '4': 'Laws, rules and ethics' },
  s66: { '1': 'Economics and business information', '2': 'Investment vehicles', '3': 'Recommendations and strategies', '4': 'Laws, rules and ethics' },
};
export const EXAM_LABEL: Record<ExamId, string> = { sie: 'SIE', s7: 'Series 7', s6: 'Series 6', s63: 'Series 63', s65: 'Series 65', s66: 'Series 66' };
