/** Writing helpers handed to every page: links, figures read from params-2026.json, tables, bank sizes. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { BANK } from './banks-build';
import { SHORT, EXAM_LABEL } from './banks';
import { passNeeded, passLabel, pool, examOf, type ExamId } from './engine/exam';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const usd = (n: number, d = 0) => money(n, d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  const X = (e: ExamId) => examOf(e);
  return {
    lang, a, ext, src, usd, num, pc, P,
    date: (iso: string) => dateL(iso),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
    /** Exam parameters: h.X('sie').scored, .minutes, .fee, .sections… */
    X,
    label: (e: ExamId) => EXAM_LABEL[e],
    short: (e: ExamId, s: string) => SHORT[e][s],
    /** Correct answers needed on a full mock (exact for NASAA exams, approximate for FINRA's scaled scores). */
    need: (e: ExamId) => passNeeded(e),
    passLabel,
    /** Size of the bank (all exams) and of one exam or section pool, read from the JSON files. */
    count: BANK.length,
    inPool: (e: ExamId, s?: string) => pool(BANK, e, s).length,
    /** A question of the bank (by id), for a worked example. */
    q: (id: string) => BANK.find((x) => x.id === id),
    /** "75 scored + 5 unscored" */
    items: (e: ExamId) => `${X(e).scored} scored questions plus ${X(e).unscored} unscored`,
    /** Weight of an outline section, as a share of the scored questions. */
    weight: (e: ExamId, s: string) => { const x = X(e); const it = x.sections.find((z) => z.code === s)!.items; return { items: it, share: it / x.scored }; },
    hours: (e: ExamId) => { const m = X(e).minutes; const hh = Math.floor(m / 60), mm = m % 60; return `${hh} hour${hh === 1 ? '' : 's'}${mm ? ` ${mm} minutes` : ''}`; },
  };
}
export type Helpers = ReturnType<typeof helpers>;
