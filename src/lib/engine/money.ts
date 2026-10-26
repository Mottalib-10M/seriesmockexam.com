/**
 * Exam arithmetic of the SIE, Series 6, 7, 65 and 66: bond yields, tax-equivalent yield, accrued
 * interest (30/360), option payoffs, margin accounts (Regulation T, FINRA Rule 4210) and mutual fund
 * pricing. Textbook formulas, each covered by a test in tests/engine.test.ts.
 */
import P from '../../data/params-2026.json';

export const currentYield = (couponPct: number, price: number) => (price > 0 ? ((couponPct / 100) * 1000) / price : 0);
/** Bond price for a yield (semiannual coupons, par 1,000). */
export function bondPrice(couponPct: number, years: number, yieldPct: number) {
  const n = Math.max(1, Math.round(years * 2)), c = (couponPct / 100) * 1000 / 2, r = yieldPct / 100 / 2;
  if (r === 0) return c * n + 1000;
  return c * (1 - (1 + r) ** -n) / r + 1000 * (1 + r) ** -n;
}
/** Yield to maturity (annual, semiannual compounding) by bisection. */
export function ytm(couponPct: number, years: number, price: number) {
  let lo = -0.99 * 200, hi = 200;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (bondPrice(couponPct, years, mid) > price) lo = mid; else hi = mid; }
  return (lo + hi) / 2 / 100;
}
/** The rule-of-thumb approximation taught for the exams: (coupon ± discount or premium per year) / average of price and par. */
export function ytmApprox(couponPct: number, years: number, price: number) {
  const c = (couponPct / 100) * 1000, adj = (1000 - price) / Math.max(1e-9, years);
  return (c + adj) / ((1000 + price) / 2);
}
/** Tax-equivalent yield of a municipal bond: muni yield / (1 - marginal rate). */
export const tey = (muniPct: number, ratePct: number) => (ratePct >= 100 ? Infinity : muniPct / 100 / (1 - ratePct / 100));
/** Days between two dates on the 30/360 basis (corporate and municipal bonds). */
export function days30360(a: number, b: number) {
  const A = new Date(a * 86400000), B = new Date(b * 86400000);
  let d1 = A.getUTCDate(), d2 = B.getUTCDate();
  if (d1 === 31) d1 = 30;
  if (d2 === 31 && d1 === 30) d2 = 30;
  return (B.getUTCFullYear() - A.getUTCFullYear()) * 360 + (B.getUTCMonth() - A.getUTCMonth()) * 30 + (d2 - d1);
}
/** Accrued interest per 1,000 of par from the last coupon up to the day before settlement (30/360). */
export function accrued(couponPct: number, lastCoupon: number, settlement: number) {
  const days = Math.max(0, days30360(lastCoupon, settlement));
  return { days, amount: ((couponPct / 100) * 1000 * days) / 360 };
}
export type OptionPos = 'long-call' | 'long-put' | 'short-call' | 'short-put';
/** Per share figures; one contract = 100 shares. Infinity = unlimited. */
export function option(pos: OptionPos, strike: number, premium: number) {
  switch (pos) {
    case 'long-call': return { breakeven: strike + premium, maxGain: Infinity, maxLoss: premium };
    case 'long-put': return { breakeven: strike - premium, maxGain: strike - premium, maxLoss: premium };
    case 'short-call': return { breakeven: strike + premium, maxGain: premium, maxLoss: Infinity };
    case 'short-put': return { breakeven: strike - premium, maxGain: premium, maxLoss: strike - premium };
  }
}
/** Long margin account: Reg T initial requirement, equity, and the market value at which a maintenance call starts (FINRA Rule 4210, 25%). */
export function marginLong(purchase: number, marketValue: number) {
  const regT = P.margin.regT, maint = P.margin.maintLong;
  const deposit = Math.max(purchase * regT, Math.min(purchase, P.margin.minEquity));
  const debit = purchase - deposit;
  const equity = marketValue - debit;
  const callAt = debit / (1 - maint);
  const sma = Math.max(0, equity - marketValue * regT);
  return { deposit, debit, equity, equityPct: marketValue > 0 ? equity / marketValue : 0, callAt, sma, call: equity < marketValue * maint };
}
/** Public offering price from NAV and a sales charge expressed as a share of the POP. */
export const pop = (nav: number, chargePct: number) => (chargePct >= 100 ? Infinity : nav / (1 - chargePct / 100));
export const chargeOf = (nav: number, popv: number) => (popv > 0 ? (popv - nav) / popv : 0);
