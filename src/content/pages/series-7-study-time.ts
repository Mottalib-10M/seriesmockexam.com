import { definePage } from '../../lib/guide-types';

/** Example plans only: totals chosen by Radif Partners to illustrate the arithmetic, not a recommendation. */
const EXAMPLES = [
  { name: 'Example A, evenings only', total: 80, week: 8 },
  { name: 'Example B, evenings and weekends', total: 120, week: 15 },
  { name: 'Example C, full-time study', total: 120, week: 30 },
];

export default definePage({
  id: 'series-7-study-time',
  group: 'series',
  order: 31,
  tool: { kind: 'mini:studyplan' },
  mini: { kind: 'quiz', props: { exam: 's7', n: 5 } },
  related: ['series-7-passing-score', 'series-7-practice-exam', 'series-7-investments', 'scheduling', 'series-7-exam'],
  sources: ['finra_s7_outline', 'finra_schedule', 'finra_s7'],
  en: {
    slug: 'series-7-exam/study-time',
    nav: 'Series 7 study time',
    card: 'No official number of hours exists: how to size your own Series 7 plan from the outline weights, with labeled example schedules.',
    title: 'Series 7 Study Time: How Long to Prepare, With a Planner',
    description: 'How long to study for the Series 7: FINRA sets no number of hours, so size your plan on the outline weights, your SIE base and mock results, with a planner.',
    h1: 'How long to study for the Series 7',
    intro: 'Enter the hours you plan and the hours you have each week: the planner gives the date your preparation ends. How to choose those hours is explained below.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F3');
      return `There is no official answer to how long the Series 7 takes to prepare. FINRA publishes the format, ${S.scored} scored questions in ${h.hours('s7')}, and the weight of each job function in its ${h.src('finra_s7_outline', 'content outline')}, but no recommended number of study hours, and this page does not invent one. The time you need depends on three things you can assess yourself: how recent and solid your SIE knowledge is, how comfortable you are with the arithmetic of options, bonds and margin, and how many hours a week you can protect. What the outline does tell you is where those hours should go: the investments and recommendations function alone carries ${w.items} items, about ${h.pc(w.share)} of the exam, so roughly the same share of the calendar belongs to it. The most reliable way to know you have studied enough is not a count of hours but a result: several fresh full-length mocks clearly above the passing line, with no function lagging. The planner above turns a target of your choosing into an end date, and the examples below show the arithmetic, labeled as examples.`;
    },
    faqs: (h) => [
      { q: 'Does FINRA recommend a number of study hours for the Series 7?', a: 'No. FINRA publishes the content outline, the number of items, the time allowed and the scaled passing score, but no recommended study time. Any figure you read is an opinion or a survey of some group of candidates. Set your own target from your starting point, then let mock results, not the calendar, decide when you are ready.' },
      { q: 'Should I study for the Series 7 before my firm opens the enrollment?', a: `It helps. Once the firm files your registration, you have a ${h.P.windowDays}-day window to sit the exam. Studying the bulk of the outline before the window opens leaves room inside it for mocks, review and, if needed, a second look at weak functions. Ask your firm when it plans to file so the two calendars line up.` },
      { q: 'How should I split my Series 7 study time between functions?', a: `A simple starting rule is to follow the outline weights: about ${h.pc(h.weight('s7', 'F3').share)} of your time on investments and recommendations, and the rest shared between orders, opening accounts and seeking business. Then adjust with practice results: a function where you already score well needs less, and options or municipal securities often need more than their share.` },
    ],
    body: (h) => {
      const S = h.X('s7');
      const exRows = EXAMPLES.map((e) => [e.name, h.num(e.total), h.num(e.week), h.num(Math.ceil(e.total / e.week))]);
      const base = 100;
      const split = S.sections.map((s) => [`${s.code}. ${h.short('s7', s.code)}`, s.items, h.pc(s.items / S.scored), h.num((base * s.items) / S.scored, 1)]);
      return `
<h2>Three factors that set your number</h2>
<h3>Your SIE base</h3>
<p>The Series 7 assumes the vocabulary of the SIE, its corequisite. A candidate who passed the SIE recently starts with the concepts in place and spends the time on depth; one who passed it years ago, or not yet, will need to rebuild the basics first. The SIE result stays valid for ${h.X('sie').validYears} years, so the gap can be long.</p>
<h3>The arithmetic</h3>
<p>Options breakevens, yields to maturity and call, accrued interest, taxable equivalent yields, margin equity and fund offering prices all appear in the outline. If numbers come easily to you, these are quick points. If they do not, budget extra time for them, because the concept alone does not earn the point when the arithmetic goes wrong.</p>
<h3>Your weekly hours</h3>
<p>Hours spread over many weeks are usually retained better than the same hours crammed into a few. A plan that you can actually keep, week after week, beats an ambitious one abandoned after a fortnight.</p>
<h2>Example plans, not recommendations</h2>
<p>The figures in this table are examples chosen to show the arithmetic of the planner. They are not an estimate of what you need, and FINRA publishes no such estimate.</p>
${h.table(['Example', 'Total hours (example)', 'Hours per week', 'Weeks'], exRows, 'Weeks = total hours divided by weekly hours, rounded up. Illustrative figures only.', ['l', 'r', 'r', 'r'])}
<p>Whatever total you choose, the outline suggests how to divide it. Here is the split of an illustrative ${base}-hour plan, in proportion to the official weights:</p>
${h.table(['Function', 'Scored items', 'Share', `Hours out of ${base} (example)`], split, `Weights from the ${h.src('finra_s7_outline', 'October 2025 outline')}; adjust them with your own practice results.`, ['l', 'r', 'r', 'r'])}
<h3>Adjusting the target as you go</h3>
<p>Treat your first total as a hypothesis. After two or three weeks, compare your practice scores with where you expected to be. If each function is already clearly above the line, you may need fewer hours than planned; if the third function is still shaky after its block, add time there rather than spreading it evenly. Enter the revised total in the planner to see the new end date, and keep a short log of hours and scores so the decision rests on your own figures.</p>
<h2>Phases inside the plan</h2>
<ul>
<li><strong>Learning:</strong> one function at a time, with a ${h.a('series-7-practice-test', 'practice set')} after each block to see what stuck.</li>
<li><strong>Consolidation:</strong> mixed practice across functions, and the calculators for ${h.a('options-math', 'options')}, ${h.a('bond-yields', 'yields')} and ${h.a('margin-math', 'margin')}.</li>
<li><strong>Measuring:</strong> full timed ${h.a('series-7-practice-exam', 'mocks')} of ${S.scored} questions, each followed by a review of every miss.</li>
</ul>
<p>The measuring phase is the one that tells you whether the hours were enough. If mocks stay below or just on the line, extend the consolidation phase rather than booking. The ${h.a('series-7-passing-score', 'passing score page')} explains what a comfortable margin looks like.</p>
<h2>Fitting the plan to the enrollment window</h2>
<p>Your firm's filing opens a ${h.P.windowDays}-day window to take the exam, as explained on FINRA's ${h.src('finra_schedule', 'scheduling page')}. Booking a seat inside it can take time in busy periods, so plan the end of your study a little before the date you would like to sit. Rushing has a cost: a failed attempt means a wait of ${h.P.retake.finra.firstAndSecondDays} days (${h.P.retake.finraFrom.firstAndSecondDays} days from ${h.date(h.P.retake.finraFrom.date)}) and a new fee of ${h.usd(S.fee)}. The ${h.a('scheduling', 'scheduling guide')} covers the booking itself.</p>`;
    },
  },
});
