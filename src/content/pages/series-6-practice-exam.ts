import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-6-practice-exam',
  group: 'series',
  order: 41,
  tool: { kind: 'quiz', props: { exam: 's6', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 2 } },
  related: ['series-6-exam', 'fund-pricing', 'review-mistakes', 'exam-day', 'retake-rules'],
  sources: ['finra_s6', 'finra_s6_outline'],
  en: {
    slug: 'series-6-exam/practice-exam',
    nav: 'Series 6 mock exam',
    card: 'A full timed Series 6 mock: 50 questions in the outline proportions, the real pace per question, a score by function at the end.',
    title: 'Series 6 Practice Exam: Free Timed 50-Question Mock Test',
    description: 'Series 6 practice exam, free: a timed 50-question mock split like the FINRA outline, the real pace per question, a score by function and every miss explained.',
    h1: 'Series 6 mock exam, timed and full length',
    intro: 'The timer starts with your first answer and the corrections wait for the end, as on test day. Each new draw mixes the four job functions in their official proportions.',
    resume: (h) => {
      const S = h.X('s6');
      return `This mock gives you a Series 6 of the right shape: ${S.scored} scored questions, with each job function receiving exactly its weight in the ${h.src('finra_s6_outline', 'FINRA outline')}, ${S.sections.map((s) => `${s.items} for ${s.code}`).join(', ')}, then mixed. On the day, FINRA adds ${S.unscored} unscored pretest items and allows ${h.hours('s6')} for all ${S.scored + S.unscored}; our version leaves the pretest items out and shortens the clock in proportion, so the time per question stays the same. When the test is marked you see your score, a breakdown by function and each missed question with its explanation. The real exam reports a scaled score, with ${S.passScore} needed to pass (${h.src('finra_s6', 'FINRA Series 6 page')}), and FINRA publishes no conversion from correct answers. Our mock therefore uses ${S.passScore}% of the scored items as its line, ${h.need('s6')} of ${S.scored}, and calls it an approximation. On a short exam each question weighs a lot: one item is ${h.pc(1 / S.scored)} of the score, so a single bad stretch moves the result more than on the Series 7.`;
    },
    faqs: (h) => [
      { q: 'How many questions can I miss on the Series 6 mock?', a: `On our mock the line is ${h.need('s6')} correct out of ${h.X('s6').scored}, so ${h.X('s6').scored - h.need('s6')} misses still pass it. On the real exam the scaled score of ${h.X('s6').passScore} comes from equating, and the exact number can vary with the form. Aim for a margin of several questions above the line on more than one mock before you book.` },
      { q: 'How fast do I need to answer Series 6 questions?', a: `The exam allows ${h.X('s6').minutes} minutes for ${h.X('s6').scored + h.X('s6').unscored} items, unscored ones included, which leaves a little over a minute and a half per item on average. Most candidates finish with time to spare. The pace calculator under the citable block tells you where you should be after any number of questions, so you can check yourself during the mock.` },
      { q: 'Why does my Series 6 mock score jump between attempts?', a: `With only ${h.X('s6').scored} questions, each one is worth ${h.pc(1 / h.X('s6').scored)} of the score, and a new draw changes the mix of topics inside each function. Two or three questions on a weak subject can move the result noticeably. Look at the trend across several mocks and at the score by function, rather than at a single number.` },
    ],
    body: (h) => {
      const S = h.X('s6');
      const per = (S.minutes * 60) / (S.scored + S.unscored);
      return `
<h2>How the draw is built</h2>
${h.table(['Function', 'Questions in the mock', 'Share', 'Our pool'], S.sections.map((s) => [`${s.code}. ${h.short('s6', s.code)}`, s.items, h.pc(s.items / S.scored), h.inPool('s6', s.code)]), `Official split of the ${S.scored} scored items (${h.src('finra_s6_outline', 'Series 6 outline')}); pool counts read from our bank at build time.`, ['l', 'r', 'r', 'r'])}
<p>The pool for each function includes questions shared with the SIE and the Series 7 when the outline topic is identical, for instance prospectus delivery or the features of a variable annuity. Every mock draws a fresh combination, and the address bar keeps the draw so that you can replay it later and check whether last week's misses are fixed.</p>
<h2>Pacing a short exam</h2>
<p>The real exam gives about ${h.num(per)} seconds per item on average, counting the unscored ones that sit invisibly among the rest. That is generous for definition questions and fair for the pricing and annuity calculations. The risk on the Series 6 is less running out of time than losing focus: with fewer items, a run of careless answers costs more. Two habits help.</p>
<ul>
<li>Check your position against the pace calculator at a quarter, half and three quarters of the mock.</li>
<li>Mark the items you are unsure of and come back to them at the end, rather than stalling on one.</li>
</ul>
<p>The test center supplies the calculator and the material for notes; the ${h.a('exam-day', 'exam day page')} lists what you can and cannot bring.</p>
<h2>Reading your result</h2>
<h3>The function breakdown first</h3>
<p>On the Series 6, seeking business carries ${h.weight('s6', 'F1').items} items and account opening ${h.weight('s6', 'F2').items}, so the rule-based functions weigh much more than on the Series 7. A low score there is often the quickest to fix: communications, prospectus and customer information rules can be learned in a few sessions. A low score in the products function, with its ${h.weight('s6', 'F3').items} items, needs longer work on funds and variable contracts.</p>
<h3>Then the overall score</h3>
<p>Compare it with the line of ${h.need('s6')} and look at the margin. Because of the small number of items, a result two or three questions above the line is still within the normal swing between draws.</p>
<h2>What the mock cannot tell you</h2>
<p>Our questions are written by Radif Partners from the outline topics, not taken from FINRA's item bank, so the wording on the day will differ. The mock measures how well you cover the outline and how you hold up under the clock; it does not predict a scaled score. Two limits deserve attention. First, a small pool in a function means some questions return across draws, and a familiar question is easier than a new one. Second, a quiet room at home is kinder than a test center. Give yourself a margin for both, and use the practice sets on the ${h.a('series-6-exam', 'Series 6 page')} to keep meeting fresh items between mocks.</p>
<h2>Between two mocks</h2>
<p>Go through every miss shown under the results, then send them to the ${h.a('review-mistakes', 'review page')}, which serves them again until they are right. Refresh the arithmetic of offering prices and sales charges on the ${h.a('fund-pricing', 'fund pricing page')}. Leave a few days before the next mock so it measures what you learned, not what you remember of the draw. Should the real attempt go wrong, the ${h.a('retake-rules', 'retake rules')} explain the waiting period before you can sit again, currently ${h.P.retake.finra.firstAndSecondDays} days after a first failure.</p>`;
    },
  },
});
