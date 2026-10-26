/** Formatting for the en-US pages (RECETTE §4.1: whole numbers on results, separators of the language). */
export type L = 'en';
const TAG = 'en-US';
export const langTag = (_lang: L = 'en') => TAG;
const cache = new Map<string, Intl.NumberFormat>();
function nf(o: Intl.NumberFormatOptions) {
  const k = JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG, o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, _lang: L = 'en', d = 0) => nf({ minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
/** $1,709 ; cents only when asked for (exam math shows them: a bond price, a NAV). */
export const money = (v: number, d = 0) => `${v < 0 ? '-' : ''}$${formatNumberL(Math.abs(v), 'en', d)}`;
/** 0.072 → "7.2%" (sign glued, English usage). */
export const pct = (v: number, _lang: L = 'en', d = 0) => `${formatNumberL(v * 100, 'en', d)}%`;
/** "2026-10-24" → "October 24, 2026" (UTC, never shifts a day). */
export const dateL = (iso: string, _lang: L = 'en') => new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
