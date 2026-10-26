import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-practice-exam',
  group: 'sie',
  order: 12,
  tool: { kind: 'quiz', props: { exam: 'sie', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 0 } },
  related: ['sie-practice-test', 'sie-passing-score', 'review-mistakes', 'sie-difficulty', 'exam-day'],
  sources: ['finra_sie_outline', 'finra_sie'],
  en: {
    slug: 'sie-exam/practice-exam',
    nav: 'SIE practice exam (timed)',
    card: 'A full-length SIE mock under the clock, with the outline quota of each section and a verdict against the passing line.',
    title: 'SIE Practice Exam 2026: Full-Length Timed Mock, Free',
    description: 'Full-length SIE practice exam: 75 scored questions drawn in the official section quotas, a running clock and a score set against the passing line, all free.',
    h1: 'Full SIE practice exam under the clock',
    intro: 'The clock starts with your first answer. Corrections stay hidden until the end, as on exam day; then every question comes back with its explanation.',
    resume: (h) => {
      const S = h.X('sie');
      return `This SIE practice exam is a full-length mock: ${S.scored} questions, the same number FINRA scores on the real test, drawn so that each outline section gets exactly its official quota (${S.sections.map((s) => `${s.items} from section ${s.code}`).join(', ')}). It differs from a practice set in three ways. Nothing is corrected until you submit, a clock runs from your first answer, and the result is a single score compared with the passing line. On exam day FINRA adds ${S.unscored} unscored pretest questions to the ${S.scored} that count and allows ${h.hours('sie')} for the ${S.scored + S.unscored} items; our mock leaves the pretest items out, since they never change a score. FINRA reports a scaled score, and a pass needs ${S.passScore}. It publishes no conversion from correct answers, so the mock compares your result with about ${h.need('sie')} correct answers out of ${S.scored} and says plainly that this is an approximation. Use it two or three times near the end of your preparation, not as a first step, and spend at least as long reviewing it as you spent taking it.`;
    },
    faqs: (h) => [
      { q: 'Why does the mock leave out the SIE pretest questions?', a: `Because they never count. FINRA mixes ${h.X('sie').unscored} unscored items into each exam to try them out for later forms, and you cannot tell which ones they are. A mock has no reason to copy them: it keeps the ${h.X('sie').scored} questions that would be scored, in the outline proportions, so the result reads directly against the line.` },
      { q: 'What mock score should I reach before booking the SIE?', a: `Aim for a result clearly above about ${h.need('sie')} of ${h.X('sie').scored}, on two different draws, with no section far below the rest. A single good mock can be luck with the draw. Because the real exam is scaled and its questions are worded differently from ours, a few answers of margin are a sensible cushion rather than a guarantee.` },
      { q: 'How should I go through a finished mock?', a: 'Sort the misses into three piles: did not know the fact, knew it but misread the question, and ran short of time. The first pile goes back to the section pages and practice sets, the second calls for slower reading of every qualifier, and the third for pacing drills. Missed questions also land on the review page automatically.' },
    ],
    body: (h) => {
      const S = h.X('sie');
      const per = (S.minutes * 60) / (S.scored + S.unscored);
      return `
<h2>What the mock copies from the real SIE, and what it does not</h2>
${h.table(['', 'SIE on exam day', 'This mock'], [
  ['Scored questions', `${S.scored}`, `${S.scored}`],
  ['Unscored pretest questions', `${S.unscored}, hidden among the others`, 'left out'],
  ['Section quotas', S.sections.map((s) => s.items).join(' / '), 'the same'],
  ['Corrections', 'none during the exam', 'shown after you submit'],
  ['Pass mark', `scaled score of ${S.passScore}`, `about ${h.need('sie')} correct (approximation)`],
], `Exam format from the ${h.src('finra_sie_outline', 'SIE content outline')} and the ${h.src('finra_sie', 'FINRA SIE page')}.`, ['l', 'l', 'l'])}
<p>Each mock is a new draw from the pool, shuffled so that sections are mixed as they are on the real test. The questions are written by Radif Partners from the outline topics; they cover the same ground in a similar four-choice format, but no practice question can tell you exactly how FINRA will word a point.</p>
<h2>Pacing over a full sitting</h2>
<p>On exam day the ${h.hours('sie')} cover ${S.scored + S.unscored} items, which leaves about ${h.num(per)} seconds each. The pace calculator under this text tells you, for any number of questions answered, how many minutes you should have used. In practice most candidates finish the SIE with time to spare; the risk is less the clock than fatigue, which shows up as careless misreadings in the last third of the exam.</p>
<h3>Three habits for the sitting</h3>
<ul>
<li>Answer every question on the first pass, even when unsure: the outline states there is no penalty for guessing.</li>
<li>Flag the long scenario questions for a second look rather than solving them twice.</li>
<li>Check the clock at the quarter, half and three quarter marks only, not after every item.</li>
</ul>
<h3>Set up the sitting like the real one</h3>
<p>Pick a moment when you can work without interruption for the whole length, close other tabs, put the phone in another room and keep only scratch paper on the desk. Answer in order, flag rather than linger, and resist checking notes halfway: a mock interrupted to look something up measures your notes, not you.</p>
<h2>Reading the score</h2>
<p>The result screen gives your share of correct answers overall and per section. Compare the overall figure with the line of about ${h.need('sie')} of ${S.scored}; then look at the sections, because a strong result built on one section can hide a weak one that a different draw would expose. The ${h.a('sie-passing-score', 'passing score page')} explains why the scaled score of ${S.passScore} cannot be turned into an exact number of answers.</p>
<p>Your mock results, like the practice sets, are stored in this browser only. Every question you missed is added to the ${h.a('review-mistakes', 'review list')}, so the hours after a mock can go straight to your gaps.</p>
<h2>When a mock is worth sitting</h2>
<p>A first mock taken too early mostly measures what you have not read yet, and it uses up an evening. Wait until ${h.a('sie-practice-test', 'practice sets')} in each section run comfortably above the line. Then sit one mock, review it in depth over the next days, fix the weak section, and sit a second one on a new draw about a week later. If both clear the line with a margin, you are in the zone where booking the exam makes sense; the ${h.a('exam-day', 'exam day page')} covers what happens once you arrive. If not, the ${h.a('sie-difficulty', 'difficulty page')} lists the parts of the SIE that most often cost points.</p>`;
    },
  },
});
