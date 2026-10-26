import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-passing-score',
  group: 'series',
  order: 30,
  tool: { kind: 'mini:passline', props: { e: 1, r: 92 } },
  mini: { kind: 'quiz', props: { exam: 's7', n: 5 } },
  related: ['series-7-practice-exam', 'series-7-study-time', 'retake-rules', 'series-7-exam', 'sie-passing-score'],
  sources: ['finra_s7', 'finra_s7_outline', 'finra_1210'],
  en: {
    slug: 'series-7-exam/passing-score',
    nav: 'Series 7 passing score',
    card: 'The scaled score of 72 explained, why no pass rate is given here, and how many mock questions you can afford to miss.',
    title: 'Series 7 Passing Score: The Scaled 72 and the Pass Rate',
    description: 'Series 7 passing score explained: a scaled 72, not 72 percent, why FINRA publishes no current pass rate, and about how many mock questions you can miss.',
    h1: 'Series 7 passing score and pass rate',
    intro: 'Enter the number of correct answers on a full mock: the calculator places it against the passing line and shows your margin. The explanation of the scaled score follows.',
    resume: (h) => {
      const S = h.X('s7');
      const miss = S.scored - h.need('s7');
      return `To pass the Series 7 you need a scaled score of ${S.passScore}, as stated on FINRA's ${h.src('finra_s7', 'Series 7 exam page')}. That number is not a percentage of correct answers. FINRA places every candidate's result on a common scale through equating, a statistical adjustment that offsets small differences in difficulty between the sets of items that different candidates receive, so that everyone is held to the same standard (${h.src('finra_s7_outline', 'Series 7 outline')}). FINRA does not publish the table that turns raw correct answers into a scaled score, and the ${S.unscored} unscored pretest items do not count at all. On a full mock of ${S.scored} questions, the closest honest approximation is to treat ${S.passScore} as a share: about ${h.need('s7')} correct answers, or roughly ${miss} that you can miss. As for the pass rate, FINRA publishes no current figure for the Series 7, so this page gives none; numbers that circulate without a source cannot be checked. What you can measure is your own margin above the line on fresh mocks, which the calculator above does.`;
    },
    faqs: (h) => [
      { q: 'Is the Series 7 pass mark 72 percent?', a: `Not exactly. ${h.X('s7').passScore} is a scaled score, produced after FINRA equates the different versions of the exam, and the conversion table is not public. Depending on the difficulty of the form you get, the raw number of correct answers behind a scaled ${h.X('s7').passScore} may differ slightly. Treating it as ${h.X('s7').passScore} percent of the scored items is a useful approximation for mocks, nothing more.` },
      { q: 'What is the Series 7 pass rate?', a: 'FINRA does not publish a current pass rate for the Series 7, and no official source we know of gives one. Figures quoted elsewhere cannot be verified, which is why this site gives none. A pass rate would say little about your own chances anyway: your margin on fresh, full-length mocks in every job function is a far better guide.' },
      { q: `Do the unscored Series 7 questions count toward the ${h.X('s7').passScore}?`, a: `No. Each candidate gets ${h.X('s7').unscored} pretest items that FINRA is trying out for future forms, and they do not contribute to the score. They look exactly like the scored ones and are spread at random through the exam, so you cannot spot them. Answer every item with the same care, and count them when you plan your pace.` },
    ],
    body: (h) => {
      const S = h.X('s7');
      const need = h.need('s7');
      const rows = [need - 8, need - 4, need, need + 5, need + 10, need + 15].map((r) => [r, h.pc(r / S.scored), r >= need ? `above the line by ${r - need}` : `short by ${need - r}`, S.scored - r]);
      const R = h.P.retake;
      return `
<h2>What a scaled score means</h2>
<p>Every candidate sees a different set of ${S.scored + S.unscored} items drawn from FINRA's item bank. Some sets are slightly harder than others, so a raw count of correct answers would favor whoever drew the easier set. Equating corrects for this: raw results are converted to one common scale, and the line on that scale stays at ${S.passScore} whatever the form. The consequence for you is that no one outside FINRA can say exactly how many correct answers a pass requires on a given day. The outline also notes that there is no penalty for guessing, so a blank answer is always a lost chance.</p>
<h3>The line our mocks use</h3>
<p>Our mock exams compare your share of correct answers with ${S.passScore}%, which on ${S.scored} scored questions means ${need}. The table shows how a few raw results compare with that line.</p>
${h.table(['Correct on a full mock', 'Share', 'Against the line', 'Questions missed'], rows, `Line of ${need} of ${S.scored}, an approximation of the scaled ${S.passScore}; computed from the exam parameters.`, ['r', 'r', 'l', 'r'])}
<p>Read the table as a margin, not a verdict. A result exactly on the line on our mock says you are in the zone where the real outcome could go either way, because our questions are written independently and the real form may be harder or easier for you.</p>
<h2>Why this page gives no pass rate</h2>
<p>FINRA does not publish a current pass rate for the Series 7 on its exam pages or in the outline. Some figures have circulated over the years, from various sources, with no way to check how they were computed or which period they cover. Publishing one here would look precise and mean little. The useful question is narrower: how far above the line are you, and in which functions are you weakest? A full mock answers both.</p>
<p>The same caution applies to anecdotes. A colleague who passed with little study, or a forum story of a hard form, tells you about one person on one day. Your own record across several mocks, function by function, is the only evidence that speaks about your result.</p>
<h2>Building a safe margin</h2>
<h3>Aim above the line, not at it</h3>
<p>Candidates who book as soon as one mock crosses ${need} are betting on a single draw. A steadier signal is several fresh mocks, taken on different days, all clearly above the line, with no function far behind the others. The ${h.a('series-7-practice-exam', 'timed mock')} gives a score by function at the end for that reason.</p>
<h3>Where the points are</h3>
<p>The investments and recommendations function carries ${h.weight('s7', 'F3').items} of the ${S.scored} items, so a weak score there cannot be made up elsewhere. If your margin is thin, spend the next week on that function before anything else, then take another mock.</p>
<h2>If the result is a fail</h2>
<p>A failed attempt means a wait before the next one: ${R.finra.firstAndSecondDays} days after a first or second failure, and ${R.finra.thirdDays} days after a third failure in a row, under ${h.src('finra_1210', 'FINRA Rule 1210')}. From ${h.date(R.finraFrom.date)}, these waits shorten to ${R.finraFrom.firstAndSecondDays} and ${R.finraFrom.thirdDays} days. Each attempt is charged the full fee of ${h.usd(S.fee)}. The ${h.a('retake-rules', 'retake calculator')} gives the first date you can sit again, and the ${h.a('series-7-study-time', 'study planner')} helps decide how much time to put between the two.</p>`;
    },
  },
});
