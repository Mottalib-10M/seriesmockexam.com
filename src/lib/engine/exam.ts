/**
 * Practice sets and mock exams. Formats (scored items, minutes, passing score, items per outline
 * section) are read from params-2026.json, which copies the FINRA content outlines and the NASAA
 * study guides. The questions (src/data/questions/*.json) are written by Radif Partners from the
 * topics of those outlines; none is copied from a prep provider, a book or a real exam.
 *
 * Marking: NASAA exams (Series 63, 65, 66) pass on a number of correct answers (43 of 60, 92 of 130,
 * 73 of 100), which a mock reproduces exactly. FINRA exams (SIE, Series 6, 7) report a scaled score
 * (70 or 72) after equating; FINRA publishes no table from correct answers to scaled score, so a mock
 * marks the share of correct answers against the same figure and says that it is an approximation.
 */
import P from '../../data/params-2026.json';

export type ExamId = 'sie' | 's6' | 's7' | 's63' | 's65' | 's66';
export const EXAM_IDS: ExamId[] = ['sie', 's7', 's6', 's63', 's65', 's66'];
export interface Tag { exam: ExamId; section: string }
export interface Question {
  id: string; exam: ExamId; section: string; also?: Tag[];
  /** point of the official outline (e.g. "2.1.2" or "F3, debt") */
  ref: string; q: string; options: string[]; answer: number; explain: string; rule?: string;
}
type ExamParams = (typeof P.exams)[ExamId] & { passScore?: number; passCorrect?: number; validYears?: number; feePrev?: number };
export const examOf = (e: ExamId) => P.exams[e] as ExamParams;
export const sectionsOf = (e: ExamId) => examOf(e).sections;

/** mulberry32: same seed, same draw (shared link, hydration). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Stable seed from a text (page id): the build and the browser draw the same first set. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

/** Does question q count for this exam (and this section)? Its own exam, or an `also` tag. */
export function tagFor(q: Question, exam: ExamId): string | null {
  if (q.exam === exam) return q.section;
  return q.also?.find((t) => t.exam === exam)?.section ?? null;
}
export const pool = (bank: Question[], exam: ExamId, section?: string | null) =>
  bank.filter((q) => { const s = tagFor(q, exam); return s != null && (!section || s === section); });

/** Correct answers needed on a mock of `n` scored items. */
export function passNeeded(exam: ExamId, n = examOf(exam).scored) {
  const x = examOf(exam);
  if (x.passKind === 'count') return Math.ceil((x.passCorrect! / x.scored) * n - 1e-9);
  return Math.ceil((x.passScore! / 100) * n - 1e-9);
}
/** "43 of 60" or "70 (scaled)". */
export const passLabel = (exam: ExamId) => { const x = examOf(exam); return x.passKind === 'count' ? `${x.passCorrect} of ${x.scored}` : `${x.passScore} (scaled score)`; };

/** Full mock: the official number of scored items in each outline section, then shuffled. */
export function buildMock(bank: Question[], exam: ExamId, seed: number): Question[] {
  const r = rng(seed);
  const used = new Set<string>();
  const out: Question[] = [];
  for (const s of sectionsOf(exam)) {
    const p = shuffle(pool(bank, exam, s.code), r).filter((q) => !used.has(q.id)).slice(0, s.items);
    p.forEach((q) => used.add(q.id)); out.push(...p);
  }
  const short = examOf(exam).scored - out.length;
  if (short > 0) out.push(...shuffle(pool(bank, exam).filter((q) => !used.has(q.id)), r).slice(0, short));
  return shuffle(out, r);
}
/** Practice set: `n` questions of one section (or of the whole exam), same seed → same set. */
export function buildPractice(bank: Question[], exam: ExamId, section: string | null, seed: number, n = 10): Question[] {
  const own = pool(bank, exam, section);
  return shuffle(own, rng(seed)).slice(0, Math.min(n, own.length));
}

export interface Score { right: number; total: number; need: number; pass: boolean; bySection: Array<{ code: string; name: string; n: number; r: number }> }
export function score(exam: ExamId, qs: Question[], answers: Array<number | null>): Score {
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const need = passNeeded(exam, qs.length);
  const bySection = sectionsOf(exam).map((s) => {
    const idx = qs.map((q, i) => (tagFor(q, exam) === s.code ? i : -1)).filter((i) => i >= 0);
    return { code: s.code, name: s.name, n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  });
  return { right, total: qs.length, need, pass: right >= need, bySection };
}

/** Binomial tail: chance of at least `need` right out of `n` when each answer is right with probability p. */
export function atLeast(n: number, need: number, p: number) {
  if (need <= 0) return 1;
  if (need > n) return 0;
  // log-space to stay stable for n = 130
  const lf = (k: number) => { let s = 0; for (let i = 2; i <= k; i++) s += Math.log(i); return s; };
  if (p <= 0) return 0; if (p >= 1) return 1;
  let s = 0;
  for (let k = need; k <= n; k++) s += Math.exp(lf(n) - lf(k) - lf(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
  return Math.min(1, Math.max(0, s));
}
