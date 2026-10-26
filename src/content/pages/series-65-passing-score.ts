import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-65-passing-score',
  group: 'state',
  order: 22,
  tool: { kind: 'mini:readiness', props: { e: 4 } },
  mini: { kind: 'quiz', props: { exam: 's65', n: 5 } },
  related: ['series-65-exam', 'series-65-practice-exam', 'sie-passing-score', 'retake-rules', 'series-66-exam'],
  sources: ['nasaa_s65_guide', 'finra_s65'],
  en: {
    slug: 'series-65-exam/passing-score',
    nav: 'Series 65 passing score',
    card: 'The Series 65 pass mark is 92 correct out of 130 scored questions. Why no official pass rate exists, and how to judge your own odds.',
    title: 'Series 65 Pass Rate and Passing Score: 92 of 130 Explained',
    description: 'Series 65 pass rate and passing score: NASAA publishes no pass rate, but the line is fixed at 92 correct of 130 scored. What it means, and your own odds.',
    h1: 'Series 65 passing score and pass rate',
    intro: 'Type the share of practice questions you get right: the estimate shows the chance of reaching 92 correct over 130, under a simple model whose limits are stated.',
    resume: (h) => {
      const X = h.X('s65');
      return `Many candidates search for the Series 65 pass rate, but there is no official one to quote: NASAA, which writes the exam, and FINRA, which delivers it, publish no current share of candidates who pass. What NASAA does publish is the passing score, and it is unusually clear. To pass, a candidate must get at least ${X.passCorrect} right out of the ${X.scored} scored questions (${h.src('nasaa_s65_guide', 'NASAA study guide')}). That is ${h.pc(X.passCorrect! / X.scored, 1)} of the scored items, and it leaves room for ${X.scored - X.passCorrect!} wrong answers. The ${X.unscored} pretest questions mixed into the exam do not count either way. There is no scaling: NASAA describes the Series 65 as a criterion-based minimum competency exam, and keeps forms comparable by assembling each one from its pool with controls on content and difficulty, rather than by adjusting scores afterwards. So the target is concrete. Your own odds depend on your level, and the calculator above turns a practice rate into a rough probability of reaching ${X.passCorrect}. Any pass rate you see quoted elsewhere is an estimate, not an official statistic.`;
    },
    faqs: (h) => [
      { q: 'Does NASAA publish a pass rate for the Series 65?', a: 'No. Neither NASAA nor FINRA publishes a current pass rate for the Series 65, nor for the Series 63 or 66. Percentages that circulate come from unofficial estimates and cannot be checked. What NASAA does state precisely is the passing line and the subject weights, which are the useful facts for planning your preparation.' },
      { q: 'Is the Series 65 score scaled like the Series 7?', a: `No. FINRA exams such as the SIE and the Series 7 report a scaled score after equating. The Series 65 is scored as a plain count: ${h.X('s65').passCorrect} correct answers out of ${h.X('s65').scored} scored questions is a pass, ${h.X('s65').passCorrect! - 1} is a fail, whatever the form. That makes practice results easier to read against the line.` },
      { q: 'How many questions can I miss on the Series 65?', a: `${h.X('s65').scored - h.X('s65').passCorrect!} of the ${h.X('s65').scored} scored questions. You will not know which items are the ${h.X('s65').unscored} pretest ones, so treat every question as if it counted. In practice, aim to miss clearly fewer than that on mocks, since unfamiliar wording on the day typically costs a few answers compared with practice.` },
      { q: 'Do I need to pass each Series 65 subject separately?', a: 'No. The pass depends only on the total number of correct answers across the four subjects. A strong subject can offset a weak one. NASAA does give a candidate who fails the score in each subject, which helps plan the retake, but there is no minimum per subject. Given the weights, a weak result in law or recommendations is hard to offset.' },
    ],
    body: (h) => {
      const X = h.X('s65');
      const rows = [0.66, 0.7, 0.72, 0.75, 0.8, 0.85].map((p) => {
        const r = Math.round(p * X.scored);
        return [h.pc(p), `${r} of ${X.scored}`, r >= X.passCorrect! ? `pass, ${r - X.passCorrect!} to spare` : `fail, ${X.passCorrect! - r} short`];
      });
      return `
<h2>The line in numbers</h2>
${h.table(['Share correct', 'Correct answers', 'Result'], rows, `Line: ${X.passCorrect} of ${X.scored} scored questions, from the NASAA study guide.`, ['r', 'r', 'l'])}
<p>The table shows how narrow the band is. Around ${h.pc(X.passCorrect! / X.scored)} correct, a swing of a few questions decides the result, which is why a practice average just at the line is not a comfortable place to be.</p>
<h2>Why there is no official pass rate</h2>
<p>NASAA's guide describes how the exam is built and scored, and what candidates are told: pass or fail at the end, and subject scores after a fail. It says nothing about publishing aggregate results, and neither does the ${h.src('finra_s65', 'FINRA Series 65 page')}. Old figures or survey numbers sometimes quoted are not current and not verifiable, so this site does not repeat them. A pass rate would in any case describe other candidates, with other backgrounds and preparation; it cannot tell you much about your own chances.</p>
<h2>How NASAA keeps the line fair</h2>
<p>A fixed count only works if every form of the exam is about as hard as the others. NASAA's guide explains how that is achieved: each Series 65 is assembled individually by an algorithm from a pool of approved questions, using difficulty and content parameters attached to each item, so that every candidate gets an exam of the same scope and comparable difficulty even though the questions differ. The ${X.unscored} pretest items are how new questions earn those parameters before they ever count. This is a different route from the equating FINRA uses for its own exams, and it is why NASAA can state the line as a plain number.</p>
<h3>What the line means for preparation</h3>
<p>A fixed count makes targets easy to set. If you want a cushion of five answers, you need ${X.passCorrect! + 5} correct out of ${X.scored}, about ${h.pc((X.passCorrect! + 5) / X.scored)}. Measure your mocks against that figure rather than against the bare line, and let the subject scores tell you where the extra answers will come from.</p>
<h2>Estimating your own chance</h2>
<p>The calculator at the top uses your practice rate to compute the probability of at least ${X.passCorrect} correct in ${X.scored} questions, assuming each question is answered at that same rate. Three cautions:</p>
<ul>
<li>Measure the rate on fresh questions: repeated items inflate it.</li>
<li>Look at the weakest subject, not only the average; law and recommendations together decide ${h.weight('s65', '3').items + h.weight('s65', '4').items} questions.</li>
<li>Expect a small drop on the day, from new wording and fatigue over ${X.minutes} minutes.</li>
</ul>
<p>The most direct measure remains the ${h.a('series-65-practice-exam', 'full timed mock')}, which uses the exact NASAA line on ${X.scored} questions.</p>
<h2>If you fall short</h2>
<p>A failed Series 65 is followed by NASAA's waiting periods: ${h.P.retake.nasaa.firstAndSecondDays} days after a first or second failure, ${h.P.retake.nasaa.thirdDays} after a third. FINRA's shorter periods announced for ${h.date(h.P.retake.finraFrom.date)} do not apply to NASAA exams. Each attempt costs the full ${h.usd(X.fee)} fee in 2026. Use the subject scores you receive to rebuild the weakest areas with the ${h.a('series-65-exam', 'practice sets')}; the ${h.a('retake-rules', 'retake calculator')} gives your earliest date. For comparison, FINRA's scaled line is explained on the ${h.a('sie-passing-score', 'SIE passing score page')}.</p>`;
    },
  },
});
