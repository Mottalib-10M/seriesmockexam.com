import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { BANK } from '../src/lib/banks-build';
import { buildMock, buildPractice, passNeeded, pool, score, atLeast, EXAM_IDS, examOf } from '../src/lib/engine/exam';
import { dayNum, isoOf, retakeDate, windowEnd, sieExpiry, lapseDay, mqpDay, ceDeadline } from '../src/lib/engine/dates';
import { currentYield, ytm, ytmApprox, bondPrice, tey, accrued, option, marginLong, pop, chargeOf, days30360 } from '../src/lib/engine/money';
import { getSpec, SPEC_KINDS } from '../src/lib/mini-specs';

const D = dayNum;
describe('bank', () => {
  it('passes the linter', () => { execFileSync('node', ['scripts/lint-bank.mjs'], { stdio: 'pipe' }); });
  it('every mock is full and follows the outline quotas', () => {
    for (const e of EXAM_IDS) {
      const m = buildMock(BANK, e, 42);
      expect(m.length, e).toBe(examOf(e).scored);
      expect(new Set(m.map((q) => q.id)).size, e).toBe(m.length);
      for (const s of examOf(e).sections) expect(pool(BANK, e, s.code).length, `${e} ${s.code}`).toBeGreaterThanOrEqual(s.items);
    }
  });
  it('draws are reproducible', () => {
    expect(buildMock(BANK, 's7', 7).map((q) => q.id)).toEqual(buildMock(BANK, 's7', 7).map((q) => q.id));
    expect(buildPractice(BANK, 'sie', '2', 3, 10)).toHaveLength(10);
  });
});
describe('marking', () => {
  it('NASAA counts are exact', () => {
    expect(passNeeded('s63')).toBe(43); expect(passNeeded('s65')).toBe(92); expect(passNeeded('s66')).toBe(73);
  });
  it('FINRA scaled scores approximated as a share', () => {
    expect(passNeeded('sie')).toBe(53); expect(passNeeded('s7')).toBe(90); expect(passNeeded('s6')).toBe(35);
  });
  it('score counts right answers', () => {
    const m = buildMock(BANK, 's63', 1);
    const s = score('s63', m, m.map((q) => q.answer));
    expect(s.right).toBe(60); expect(s.pass).toBe(true);
  });
  it('binomial tail', () => { expect(atLeast(10, 0, 0.5)).toBe(1); expect(atLeast(2, 2, 0.5)).toBeCloseTo(0.25); });
});
describe('dates', () => {
  it('FINRA retake: 30 days today, 15 days from January 19, 2027', () => {
    expect(isoOf(retakeDate('FINRA', D('2026-11-10'), 1).earliest)).toBe('2026-12-10');
    expect(isoOf(retakeDate('FINRA', D('2027-02-01'), 1).earliest)).toBe('2027-02-16');
    // failed on 2027-01-01: old rule gives 2027-01-31, new rule 2027-01-19 (not before its start)
    expect(isoOf(retakeDate('FINRA', D('2027-01-01'), 2).earliest)).toBe('2027-01-19');
    expect(isoOf(retakeDate('FINRA', D('2026-06-01'), 3).earliest)).toBe('2026-11-28');
    expect(isoOf(retakeDate('FINRA', D('2027-03-01'), 3).earliest)).toBe('2027-04-30');
  });
  it('NASAA retake keeps 30 and 180 days', () => {
    expect(isoOf(retakeDate('NASAA', D('2027-03-01'), 1).earliest)).toBe('2027-03-31');
    expect(isoOf(retakeDate('NASAA', D('2027-03-01'), 3).earliest)).toBe('2027-08-28');
  });
  it('windows and validity', () => {
    expect(isoOf(windowEnd(D('2026-11-02')))).toBe('2027-03-02');
    expect(isoOf(sieExpiry(D('2024-02-29')))).toBe('2028-02-29');
    expect(isoOf(lapseDay(D('2026-03-31')))).toBe('2028-03-31');
    expect(isoOf(mqpDay(D('2026-03-31')))).toBe('2031-03-31');
    expect(isoOf(ceDeadline(D('2026-05-04'), D('2026-10-26')))).toBe('2027-12-31');
    expect(isoOf(ceDeadline(D('2020-05-04'), D('2026-10-26')))).toBe('2026-12-31');
  });
});
describe('exam math', () => {
  it('bond yields', () => {
    expect(currentYield(5, 1000)).toBeCloseTo(0.05);
    expect(currentYield(6, 1200)).toBeCloseTo(0.05);
    expect(ytm(5, 10, 1000)).toBeCloseTo(0.05, 6);
    expect(bondPrice(5, 10, ytm(5, 10, 950) * 100)).toBeCloseTo(950, 4);
    expect(ytmApprox(5, 10, 950)).toBeCloseTo(55 / 975, 6);
  });
  it('tax-equivalent yield', () => { expect(tey(3.5, 30)).toBeCloseTo(0.05); });
  it('30/360 accrued interest', () => {
    expect(days30360(D('2026-07-01'), D('2026-10-15'))).toBe(104);
    expect(accrued(6, D('2026-01-01'), D('2026-04-01')).amount).toBeCloseTo(15);
  });
  it('options', () => {
    expect(option('long-call', 50, 3)).toEqual({ breakeven: 53, maxGain: Infinity, maxLoss: 3 });
    expect(option('short-put', 40, 2)).toEqual({ breakeven: 38, maxGain: 2, maxLoss: 38 });
  });
  it('margin', () => {
    const m = marginLong(20000, 16000);
    expect(m.deposit).toBe(10000); expect(m.debit).toBe(10000); expect(m.equity).toBe(6000);
    expect(m.callAt).toBeCloseTo(13333.33, 1);
    expect(marginLong(3000, 3000).deposit).toBe(2000);
  });
  it('fund pricing', () => { expect(pop(19, 5)).toBeCloseTo(20); expect(chargeOf(18.6, 20)).toBeCloseTo(0.07); });
  it('every mini-spec runs with its defaults', () => {
    for (const k of SPEC_KINDS) {
      const s = getSpec(k);
      const out = s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def])));
      expect(JSON.stringify(out), k).not.toMatch(/NaN|undefined|Infinity/);
    }
  });
});
