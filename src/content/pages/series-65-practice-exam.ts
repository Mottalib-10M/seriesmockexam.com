import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-65-practice-exam',
  group: 'state',
  order: 21,
  tool: { kind: 'quiz', props: { exam: 's65', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 4 } },
  related: ['series-65-exam', 'series-65-passing-score', 'review-mistakes', 'exam-day', 'bond-yields'],
  sources: ['nasaa_s65_guide', 'finra_s65'],
  en: {
    slug: 'series-65-exam/practice-exam',
    nav: 'Series 65 practice exam',
    card: 'A full 130-question Series 65 mock in the four NASAA quotas, under the clock, marked on the real line of 92 correct.',
    title: 'Series 65 Practice Exam: 130-Question Timed Mock, Free',
    description: 'Series 65 practice exam: a full 130-question mock in the NASAA subject quotas, timed, scored on the real 92-correct line, with every answer explained after.',
    h1: 'Series 65 practice exam: the full 130 questions',
    intro: 'The whole scored length of the Series 65, drawn subject by subject in the NASAA proportions. Nothing is revealed until you submit; then each answer comes with its reasoning.',
    resume: (h) => {
      const X = h.X('s65');
      return `A full Series 65 practice exam is a test of endurance as much as knowledge. The mock on this page has the ${X.scored} scored questions of the real exam, drawn in the official quotas: ${X.sections.map((s) => `${s.items} on ${h.short('s65', s.code).toLowerCase()}`).join(', ')}. It is marked on the line NASAA uses, at least ${X.passCorrect} correct, so a pass on the mock means exactly what it says for those questions. The real sitting adds ${X.unscored} unscored pretest items, which the mock omits because they never count, and gives ${X.minutes} minutes for all ${X.scored + X.unscored} items, a pace of roughly ${h.num((X.minutes * 60) / (X.scored + X.unscored))} seconds each. That average hides a split: law and ethics questions take less, while a net present value, a Sharpe ratio or a tax question on a client portfolio can take two or three minutes. Plan the sitting so the quick questions pay for the slow ones. After you submit, the score appears overall and per subject, followed by every question with its explanation; missed questions are stored in your browser for later review.`;
    },
    faqs: (h) => [
      { q: 'How do I keep focus over a full Series 65 sitting?', a: `Practice the length itself. Sit at least one complete mock of ${h.X('s65').scored} questions in one go, at the time of day of your appointment, without a phone. Notice when your accuracy drops; for many candidates it is in the last third. On exam day, a short pause with eyes closed at the halfway checkpoint costs seconds and often saves answers.` },
      { q: 'Should I skip calculation questions on the Series 65?', a: 'Not skip, but postpone. Answer every question with a first choice, flag the long calculations and come back to them once the quick items are done, so that a hard computation never costs you three easy rule questions. Since there is no penalty for a wrong answer, a flagged question still carries an answer if time runs out.' },
      { q: 'How many full Series 65 mocks are worth sitting?', a: `Two or three, spaced by days of targeted review. One mock tells you where you stand; the second, on a new draw, tells you whether the review worked. Our pool holds ${h.inPool('s65')} questions for this exam, so repeated mocks overlap in part; once you recognize many questions, a high score says less about readiness.` },
    ],
    body: (h) => {
      const X = h.X('s65');
      const per = (X.minutes * 60) / (X.scored + X.unscored);
      return `
<h2>The mock and the real exam</h2>
${h.table(['', 'Series 65 on exam day', 'This mock'], [
  ['Scored questions', X.scored, X.scored],
  ['Pretest questions', X.unscored, 'omitted'],
  ['Quotas by subject', X.sections.map((s) => s.items).join(' / '), 'the same'],
  ['Line', `${X.passCorrect} correct`, `${X.passCorrect} correct`],
  ['Order', 'individually assembled, subjects mixed', 'shuffled, subjects mixed'],
], `Format from the ${h.src('nasaa_s65_guide', 'NASAA Series 65 study guide')} and the ${h.src('finra_s65', 'FINRA Series 65 page')}.`, ['l', 'r', 'r'])}
<h2>Pacing ${X.scored + X.unscored} items</h2>
<p>With about ${h.num(per)} seconds per item on exam day, a steady pass through the exam leaves little slack if you stop on every calculation. A plan that works for many candidates:</p>
<ul>
<li>First pass: answer everything you can in under a minute, give a provisional answer to the rest and flag it.</li>
<li>Checkpoints: about a quarter of the items every quarter of the time; the pace calculator under this text gives the exact minutes for any count.</li>
<li>Second pass: the flagged calculations, starting with those you know how to set up.</li>
</ul>
<h3>Calculations to have automatic</h3>
<p>Current yield and the ordering of yields for discount and premium bonds, the effect of inflation on a real return, the tax-equivalent yield of a municipal bond, a basic present value, and the reading of standard deviation, beta and the Sharpe ratio. None is long when the formula is automatic; each is slow when it has to be rebuilt. The ${h.a('bond-yields', 'bond yield calculator')} and the ${h.a('muni-bond-math', 'municipal bond page')} help with the first ones.</p>
<h2>Reading the result</h2>
<p>The mock reports the overall count against ${X.passCorrect}, then a score for each subject. Because recommendations and law together carry ${h.weight('s65', '3').items + h.weight('s65', '4').items} of the ${X.scored} questions, a weak result in either is the first thing to fix. Economics is smaller but often the least familiar for candidates from sales backgrounds, and its calculation questions are the ones that eat time.</p>
<p>The ${h.a('series-65-passing-score', 'passing score page')} discusses the line and the margin to aim for. The ${h.a('review-mistakes', 'review page')} then serves only the questions you got wrong, which is the fastest way to spend the days between two mocks.</p>
<h2>Between two mocks</h2>
<p>The days after a full mock are where most of the progress happens. Spend the first session on the subject with the lowest score, reading every explanation of a missed question and writing down the rule or formula behind it. Use the next sessions for short practice sets on that subject alone, from the ${h.a('series-65-exam', 'guide page')}, until your rate there matches the others. Mix in one set on each of the remaining subjects every few days so they do not slip. Then sit the next mock on a fresh draw, ideally a week after the first, and compare the subject scores rather than the totals: a total can rise by luck, but a subject that improved from one draw to the next usually reflects real learning.</p>
<h2>From mock to appointment</h2>
<p>Book when two mocks on separate draws clear the line with a margin and no subject lags far behind. The ${h.a('exam-day', 'exam day page')} covers identification and the test center. The real exam is closed book; NASAA's guide says scratch paper is provided on request and returned at the end, so practice your calculations on paper rather than in your head. For the topics behind each subject, return to the ${h.a('series-65-exam', 'Series 65 guide')}.</p>`;
    },
  },
});
