import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-66-practice-exam',
  group: 'state',
  order: 31,
  tool: { kind: 'quiz', props: { exam: 's66', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 5 } },
  related: ['series-66-exam', 'series-63-practice-exam', 'series-65-practice-exam', 'review-mistakes', 'exam-day'],
  sources: ['nasaa_s66_guide', 'finra_s66'],
  en: {
    slug: 'series-66-exam/practice-exam',
    nav: 'Series 66 practice exam',
    card: 'A full Series 66 mock: 100 questions with nearly half on law and ethics, timed, marked on the real line of 73 correct.',
    title: 'Series 66 Practice Exam: 100-Question Timed Mock, Free',
    description: 'Series 66 practice exam: a full 100-question mock in the NASAA subject quotas, law and ethics at 45, timed and marked on the 73-correct line as the real test.',
    h1: 'Series 66 practice exam, full length',
    intro: 'All four subjects at their NASAA quotas, shuffled together, with the clock running from your first answer. The correction and a score per subject come at the end.',
    resume: (h) => {
      const X = h.X('s66');
      const law = h.weight('s66', '4');
      return `A Series 66 practice exam has to reflect one feature above all: how heavily the real test leans on law. Of the ${X.scored} scored questions, ${law.items} come from laws, regulations and ethics, ${h.pc(law.share)} of the exam, and the mock on this page draws exactly that many, alongside ${h.weight('s66', '3').items} on recommendations and strategies, ${h.weight('s66', '2').items} on investment vehicles and ${h.weight('s66', '1').items} on analytical methods. The result is set against NASAA's own line, at least ${X.passCorrect} correct, so a pass on the mock is a pass by the real standard for those questions, not an estimate. The ${X.unscored} pretest items of the real sitting are left out, as they never affect a score. On exam day the ${X.minutes} minutes cover ${X.scored + X.unscored} items, roughly ${h.num((X.minutes * 60) / (X.scored + X.unscored))} seconds each, which is comfortable for short rule questions and tighter for client scenarios. After you submit, the mock shows the total, the score in each subject and the explanation of every question, and keeps your misses in this browser for the review page. Most Series 66 candidates already hold the Series 7, so the weak point is rarely products; it is the precision of state law.`;
    },
    faqs: (h) => [
      { q: 'What score on a Series 66 mock means I am ready?', a: `Clear the line of ${h.X('s66').passCorrect} by a few answers on two different draws, with the law subject at or above your overall rate. Law carries ${h.weight('s66', '4').items} questions, so a mock that passes on the strength of the investment subjects while law lags is not a safe signal. Fresh questions matter too: a mock full of items you remember overstates your level.` },
      { q: 'Why do Series 66 mocks share questions with the 63 and 65?', a: 'Because the outlines overlap. The law subject of the Series 66 covers the same state rules on agents and advisers as the Series 63 and 65, and the recommendations subject matches the Series 65. A question written for one of them is tagged for the others when its topic sits in their outlines too, so preparing for one exam trains the overlap.' },
      { q: 'How should I split review time after a Series 66 mock?', a: 'In proportion to the points at stake. Start with the law misses, sorted into definitions, exemptions and ethical practices, then the client recommendation scenarios, and leave analytical methods for short daily drills. Each miss also appears on the review page, so the days between two mocks can go entirely to questions you got wrong.' },
    ],
    body: (h) => {
      const X = h.X('s66');
      const per = (X.minutes * 60) / (X.scored + X.unscored);
      return `
<h2>Mock format at a glance</h2>
${h.table(['', 'Series 66 on exam day', 'This mock'], [
  ['Scored questions', X.scored, X.scored],
  ['Pretest questions', X.unscored, 'not included'],
  ['Questions per subject', X.sections.map((s) => s.items).join(' / '), 'the same'],
  ['Pass', `${X.passCorrect} correct`, `${X.passCorrect} correct`],
  ['Corrections', 'none; subject scores only after a fail', 'full explanations after submitting'],
], `Format from the ${h.src('nasaa_s66_guide', 'NASAA Series 66 study guide')} and the ${h.src('finra_s66', 'FINRA Series 66 page')}.`, ['l', 'r', 'r'])}
<p>Our pool counts ${h.inPool('s66')} questions for this exam. The law subject is the deepest, with ${h.inPool('s66', '4')} questions, so several mocks can be drawn before the law items repeat much.</p>
<h2>Time on the clock</h2>
<p>About ${h.num(per)} seconds per item on exam day is the most generous pace of the three NASAA exams, but the Series 66 spends it on long questions: a client with a retirement plan, a trust and a tax bracket, asking for the most suitable step. The pace calculator under this text tells you where you should stand after any number of questions. Many candidates find it useful to aim for being slightly ahead of pace at the halfway mark, so the scenario-heavy stretches never force a rush.</p>
<h3>Rule questions versus scenario questions</h3>
<p>Rule questions turn on one word in the stem: an exclusion, a time limit, a type of client. Give them a careful single read and move on. Scenario questions need you to identify the client's objective and constraints first; the answer is usually the one that serves the stated objective with the least added risk or cost.</p>
<h2>Making the most of the result</h2>
<p>The score per subject is the key output. With law at ${h.pc(h.weight('s66', '4').share)} of the exam, every point of accuracy there moves the total far more than the same gain in analytical methods. Sort each law miss by type:</p>
<ul>
<li>definitions (who is an adviser, an agent, a federal covered adviser);</li>
<li>exclusions and exemptions, where many candidates swap one for the other;</li>
<li>ethics and fiduciary duty, from disclosure of conflicts to custody of client funds;</li>
<li>the administrator's powers and the remedies available to clients.</li>
</ul>
<p>Then use the ${h.a('review-mistakes', 'review page')}, which serves only your misses, and the topic notes on the ${h.a('series-66-exam', 'Series 66 guide')}.</p>
<h2>A plan between two mocks</h2>
<p>Most Series 66 candidates prepare while working, often right after the Series 7, so time between mocks is short. A compact plan fits around a job. In the first days after a mock, rework every law miss and rewrite each rule in one sentence of your own. Then run short practice sets on the law subject from the ${h.a('series-66-exam', 'guide page')}, a few each day, until your rate there stops moving. Add one set on recommendations and strategies every other day, built around client scenarios, and a handful of analytical method questions to keep formulas fresh. After about a week, sit a second full mock on a new draw. If the law score rose and the total cleared the line again, the plan worked; if not, repeat it before booking.</p>
<h2>Booking the exam</h2>
<p>Book once two mocks on separate draws clear ${X.passCorrect} with some margin and the law subject is not the weakest. The ${h.a('exam-day', 'exam day page')} covers the routine at the test center. If you prepare both state exams for different roles, the ${h.a('series-63-practice-exam', 'Series 63 mock')} and the ${h.a('series-65-practice-exam', 'Series 65 mock')} use the same marking on their own lines.</p>`;
    },
  },
});
