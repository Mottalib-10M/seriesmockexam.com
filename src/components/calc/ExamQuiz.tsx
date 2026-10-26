/**
 * Practice by outline section, timed mock in the official format, and review of past mistakes.
 * First render = the questions drawn at build time for this page (RECETTE §17.5); a new draw, another
 * exam or a shared link only change things after mount. Answers are kept in this browser only
 * (localStorage, lib/progress.ts) so that the review mode can serve the questions missed; nothing is sent.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildMock, buildPractice, passNeeded, examOf, sectionsOf, tagFor, shuffle, rng, EXAM_IDS, type ExamId, type Question } from '../../lib/engine/exam';
import { loadBank, SHORT, EXAM_LABEL } from '../../lib/banks';
import { recordAnswer, recordRun, mistakes } from '../../lib/progress';
import { readParams, updateURL } from '../../lib/url-state';

type Mode = 'practice' | 'exam' | 'review';
const L = {
  exam: 'Exam', section: 'Outline section', allSections: 'All sections (mixed)', q: (i: number, n: number) => `Question ${i} of ${n}`,
  next: 'Next', prev: 'Previous', finish: 'Mark my answers', again: 'New set of questions', loading: 'Loading the questions…',
  right: 'Correct.', wrong: 'Not this one.', answer: 'Right answer:', score: 'Your score', answered: 'answered',
  feedback: 'Corrections', asYouGo: 'After each answer', atEnd: 'At the end', hidden: 'Answer saved. As in the real exam, corrections come when you mark the test.',
  status: { start: 'Choose an answer to begin', on: 'On course to pass', risk: 'One more mistake and you fall below', pass: 'Above the passing line', fail: 'Below the passing line' },
  canMiss: (k: number) => (k <= 0 ? 'No more mistakes allowed' : `You can still miss ${k}`),
  bySection: 'Score by outline section', review: 'Questions to look at again', none: 'Nothing to review: every answer was right.',
  timeLeft: 'Time left', timeUp: 'Time is up: the test is marked as it stands.', outline: 'Outline point',
  noMistakes: 'No missed question saved in this browser for this exam yet. Answer a practice set or a mock first: every question you miss comes back here until you get it right.',
  note: 'Practice questions written by Radif Partners from the official outline topics. They are not questions from the real exam.',
  saved: 'Progress is kept in this browser only (local storage) and never sent.',
};

interface Props {
  exam: ExamId; mode?: Mode; section?: string | null; n?: number; pick?: boolean; timed?: boolean;
  initial: Question[]; seed: number; idPrefix?: string; secondary?: boolean;
}

export default function ExamQuiz({ exam: e0, mode = 'practice', section: s0 = null, n: size = 10, pick = false, timed = false, initial, seed: seed0, idPrefix = 'q', secondary = false }: Props) {
  const [exam, setExam] = useState<ExamId>(e0);
  const [section, setSection] = useState<string | null>(s0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [cur, setCur] = useState(0);
  const [instant, setInstant] = useState(mode !== 'exam');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [empty, setEmpty] = useState(mode === 'review' && initial.length === 0);
  const started = useRef<number | null>(null);
  const seedRef = useRef(seed0);
  const x = examOf(exam);
  const minutes = Math.round((x.minutes * qs.length) / Math.max(1, x.scored + x.unscored));

  const draw = async (ex: ExamId, sec: string | null, seed: number) => {
    setLoading(true);
    const bank = await loadBank();
    let next: Question[];
    if (mode === 'exam') next = buildMock(bank, ex, seed);
    else if (mode === 'review') { const ids = new Set(mistakes()); next = shuffle(bank.filter((q) => ids.has(q.id) && tagFor(q, ex) != null), rng(seed)).slice(0, size); }
    else next = buildPractice(bank, ex, sec, seed, size);
    seedRef.current = seed;
    setQs(next); setAnswers(next.map(() => null)); setCur(0); setDone(false); setLoading(false); started.current = null; setLeft(null);
    setEmpty(mode === 'review' && next.length === 0);
  };
  useEffect(() => {
    if (mode === 'review') { draw(e0, null, Math.floor(Math.random() * 2 ** 31)); return; }
    if (secondary) return;
    const u = readParams(window.location.search); // shared link (?seed=…): applied after the first render only
    const s = Number(u.get('seed'));
    if (s && s !== seed0) draw(e0, s0, s);
  }, []);
  useEffect(() => { // clock of the mock: starts with the first answer
    if (!timed || done) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = minutes * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [timed, done, minutes]);

  const n = qs.length;
  const isExam = mode === 'exam';
  const need = passNeeded(exam, Math.max(1, n));
  const answeredN = answers.filter((a) => a !== null).length;
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const wrongN = answeredN - right;
  const canMiss = n - need - wrongN;
  const showAll = instant || done;
  const status: keyof typeof L.status = !answeredN ? 'start'
    : (done || answeredN === n) ? (right >= need ? 'pass' : 'fail')
    : !showAll ? 'start' : canMiss < 0 ? 'fail' : canMiss === 0 ? 'risk' : 'on';
  const q = qs[cur];
  const a = answers[cur];
  function finish() { setDone(true); }
  useEffect(() => { // the test is marked: answers not yet recorded (corrections at the end) go to the progress
    if (!done || !answeredN) return;
    if (!instant) qs.forEach((qq, i) => { if (answers[i] !== null) recordAnswer(qq.id, answers[i] === qq.answer); });
    recordRun({ exam, mode, right, total: n, need, at: new Date().toISOString().slice(0, 10) });
  }, [done]);
  const choose = (i: number) => {
    if (done || (showAll && a !== null)) return;
    if (started.current == null) started.current = Date.now();
    setAnswers((o) => o.map((v, j) => (j === cur ? i : v)));
    if (instant) recordAnswer(q.id, i === q.answer);
  };
  const newSet = () => { const s = Math.floor(Math.random() * 2 ** 31); if (!secondary) updateURL({ seed: s }); draw(exam, section, s); };
  const sc = sectionsOf(exam).map((s) => {
    const idx = qs.map((v, i) => (tagFor(v, exam) === s.code ? i : -1)).filter((i) => i >= 0);
    return { code: s.code, name: SHORT[exam][s.code], n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  }).filter((v) => v.n);
  const mm = left == null ? minutes * 60 : left;
  const clock = `${Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
  const good = status === 'pass' || status === 'on';
  const tone = status === 'start' ? 'text-navy-700' : good ? 'text-green-800' : 'text-red-700';
  const passLine = x.passKind === 'count'
    ? `Pass: ${x.passCorrect} of ${x.scored} correct${n !== x.scored ? `, so ${need} of ${n} here` : ''}`
    : `Pass: scaled score of ${x.passScore}; here ${need} of ${n} correct (${x.passScore}%), an approximation`;

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(ev) => ev.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
        {(pick || mode !== 'exam') && (
          <div className="grid gap-3 sm:grid-cols-2">
            {(pick || mode === 'review') && <SelectField id={`${idPrefix}-exam`} label={L.exam} value={exam} onChange={(v) => { const ex = v as ExamId; setExam(ex); setSection(null); draw(ex, null, seedRef.current); }} options={EXAM_IDS.map((id) => ({ value: id, label: `${EXAM_LABEL[id]}: ${examOf(id).name}` }))} />}
            {mode === 'practice' && <SelectField id={`${idPrefix}-section`} label={L.section} value={section ?? ''} onChange={(v) => { const s = v || null; setSection(s); draw(exam, s, seedRef.current); }} options={[{ value: '', label: L.allSections }, ...sectionsOf(exam).map((s) => ({ value: s.code, label: `${s.code}. ${SHORT[exam][s.code]}` }))]} />}
          </div>
        )}
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-700">
            <span>{n ? L.q(cur + 1, n) : EXAM_LABEL[exam]}</span>
            {isExam && (
              <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-xs" role="group" aria-label={L.feedback}>
                <button type="button" aria-pressed={instant} onClick={() => setInstant(true)} className={`h-full px-2.5 py-1.5 ${instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.asYouGo}</button>
                <button type="button" aria-pressed={!instant} onClick={() => setInstant(false)} className={`h-full px-2.5 py-1.5 ${!instant ? 'bg-accent-700 text-white' : 'bg-white text-navy-800'}`}>{L.atEnd}</button>
              </span>
            )}
          </div>
          {loading && <p className="mt-3 text-navy-700">{L.loading}</p>}
          {!loading && empty && <p className="mt-3 text-navy-700">{L.noMistakes}</p>}
          {q && !loading && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{q.q}</legend>
              <div className="mt-4 grid gap-2">
                {q.options.map((o, i) => {
                  const picked = a === i, isRight = i === q.answer, shown = showAll && a !== null;
                  const cls = !shown ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}><span className="mr-2 font-semibold">{'ABCD'[i]}.</span>{o}</button>;
                })}
              </div>
              {a !== null && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  {showAll ? <p><strong>{a === q.answer ? L.right : L.wrong}</strong>{a !== q.answer && <> {L.answer} {'ABCD'[q.answer]}, {q.options[q.answer]}.</>} {q.explain} <span className="text-navy-600">({L.outline} {q.ref}{q.rule ? `; ${q.rule}` : ''})</span></p> : <p>{L.hidden}</p>}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.prev}</button>}
                {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {!done && answeredN > 0 && (cur === n - 1 || answeredN === n) && <button type="button" onClick={finish} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.finish}</button>}
                <button type="button" onClick={newSet} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>
              </div>
            </fieldset>
          )}
        </div>
        {done && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">{L.timeUp}</p>}
            <p className="font-semibold text-navy-900">{L.review}</p>
            {qs.every((v, i) => answers[i] === v.answer) ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((v, i) => (answers[i] !== v.answer ? <li key={v.id}><span className="font-medium">{v.q}</span> {L.answer} {v.options[v.answer]}. <span className="text-navy-700">{v.explain}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.score} · {EXAM_LABEL[exam]}{mode === 'exam' ? ' mock' : mode === 'review' ? ' review' : ''}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{showAll ? right : answeredN}<span className="text-xl font-semibold text-navy-700"> / {showAll ? answeredN : n}</span></p>
        <p className="text-sm text-navy-700">{answeredN} / {n} {L.answered}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{L.status[status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{passLine}</td></tr>
          {showAll && n > 0 && <tr><td className="py-1.5 text-navy-700">{L.canMiss(canMiss)}</td></tr>}
          {timed && <tr><td className="tabular-nums py-1.5 text-navy-700">{L.timeLeft}: {clock} of {minutes} min</td></tr>}
        </tbody></table>
        {done && sc.length > 1 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">{L.bySection}</p>
            <ul className="mt-1 space-y-1 text-xs text-navy-700">{sc.map((b) => <li key={b.code} className="flex justify-between gap-2"><span>{b.code}. {b.name}</span><span className="tabular-nums">{b.r}/{b.n}</span></li>)}</ul></div>
        )}
        <p className="mt-3 text-xs text-navy-700">{L.note} {L.saved}</p>
      </div>
    </div>
  );
}
