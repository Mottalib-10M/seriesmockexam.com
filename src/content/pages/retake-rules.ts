import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'retake-rules',
  group: 'rules',
  order: 30,
  tool: { kind: 'mini:retake' },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['exam-fees', 'scheduling', 'review-mistakes', 'sie-passing-score', 'series-7-passing-score'],
  sources: ['finra_1210', 'finra_26_18', 'nasaa_s63_guide', 'finra_schedule'],
  demarche: true,
  en: {
    slug: 'retake-waiting-period',
    nav: 'Retake waiting period',
    card: 'When a failed SIE, Series 6, 7, 63, 65 or 66 can be sat again: 30 or 180 days today, 15 or 60 days for FINRA exams from 2027.',
    title: 'FINRA Retake Waiting Period: 30, 180 and the 2027 Change',
    description: 'Failed a FINRA exam? The retake waiting period is 30 days after a 1st or 2nd fail, 180 after a 3rd, cut to 15 and 60 days from January 19, 2027. Find your date.',
    h1: 'Retake waiting periods after a failed exam',
    intro: 'Enter the exam, the date you failed it and how many times in a row: the calculator gives the first day you can sit it again, under the rule in force on that day.',
    resume: (h) => {
      const R = h.P.retake;
      return `A candidate who fails a FINRA qualification exam must wait before taking it again. Under Supplementary Material .06 of ${h.src('finra_1210', 'FINRA Rule 1210')}, the wait is ${R.finra.firstAndSecondDays} calendar days after a first or a second failed attempt, and ${R.finra.thirdDays} calendar days after a third or any later failure. Only failures of that same exam in the last ${R.finra.lookbackYears} years count, so an old failure drops out of the tally, and failing the SIE never delays a Series 7. FINRA has shortened these periods: ${h.src('finra_26_18', `Regulatory Notice ${R.finraFrom.notice}`)}, published on ${h.date(R.finraFrom.noticeDate)}, brings them down to ${R.finraFrom.firstAndSecondDays} and ${R.finraFrom.thirdDays} days from ${h.date(R.finraFrom.date)}, including for candidates whose waiting period is still running that day. The change covers FINRA exams only (SIE, Series 6, Series 7 and the others FINRA writes). The Series 63, 65 and 66 are NASAA exams, and NASAA's own periods of ${R.nasaa.firstAndSecondDays} and ${R.nasaa.thirdDays} days still apply to them. Each new attempt is paid in full.`;
    },
    faqs: (h) => [
      { q: 'Does failing the SIE stop me from taking the Series 7?', a: `No. The waiting period applies only to the exam you failed, as Regulatory Notice ${h.P.retake.finraFrom.notice} restates with this very example. You can sit the Series 7 while you wait to retake the SIE, if your firm has enrolled you. The registration itself still needs both exams passed, since the SIE is the corequisite of the Series 7.` },
      { q: 'I failed in December 2026: do I get the shorter wait?', a: `Often, yes. If you request the retake enrollment on or after ${h.date(h.P.retake.finraFrom.date)}, the window reflects the shorter period at once. If you requested it earlier and have no appointment, FINRA says it will adjust your window on that date. If you already booked an appointment, FINRA says it will contact you to review your options.` },
      { q: 'How are failures counted for the 180-day wait?', a: `FINRA counts your failed attempts at the same exam, and ignores attempts more than ${h.P.retake.finra.lookbackYears} years old. A third failure within ${h.P.retake.finra.lookbackYears} years triggers the long period, ${h.P.retake.finra.thirdDays} days today and ${h.P.retake.finraFrom.thirdDays} days from ${h.date(h.P.retake.finraFrom.date)}. A pass resets nothing for other exams, and each exam keeps its own count.` },
      { q: 'Is there a limit on the number of attempts?', a: 'Neither FINRA Rule 1210 nor the notice sets a maximum number of attempts: the only brakes are the waiting periods and the fee, paid again in full each time. A sponsoring firm may set its own limit, or stop paying after a failure, so ask your firm what its policy is before you book a retake.' },
    ],
    body: (h) => {
      const R = h.P.retake;
      return `
<h2>The rule today and from ${h.date(R.finraFrom.date)}</h2>
${h.table(['Failed attempt (same exam, last 2 years)', `FINRA exams until ${h.date(R.finraFrom.date)}`, `FINRA exams from ${h.date(R.finraFrom.date)}`, 'Series 63, 65, 66 (NASAA)'], [
  ['First', `${R.finra.firstAndSecondDays} days`, `${R.finraFrom.firstAndSecondDays} days`, `${R.nasaa.firstAndSecondDays} days`],
  ['Second', `${R.finra.firstAndSecondDays} days`, `${R.finraFrom.firstAndSecondDays} days`, `${R.nasaa.firstAndSecondDays} days`],
  ['Third and later', `${R.finra.thirdDays} days`, `${R.finraFrom.thirdDays} days`, `${R.nasaa.thirdDays} days`],
], `Calendar days. FINRA Rule 1210.06 and Regulatory Notice ${R.finraFrom.notice}; NASAA study guides. Read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'r', 'r'])}
<p>The notice amends Supplementary Material .06 of Rule 1210 and takes effect on ${h.date(R.finraFrom.date)}; until then, the ${R.finra.firstAndSecondDays} and ${R.finra.thirdDays} day periods apply. It also restates two points that candidates often miss: failures more than ${R.finra.lookbackYears} years old are not counted, and a waiting period only blocks the exam that was failed.</p>
<h2>How the calculator decides</h2>
<p>For a FINRA exam, it computes the date under the current rule and the date under the new one, never earlier than ${h.date(R.finraFrom.date)}, and keeps the sooner of the two. That is what the notice describes for candidates still waiting on the effective date: the window is adjusted to the shorter period. Three examples:</p>
<ul>
<li>A first failure on ${h.date('2026-11-10')}: the wait ends after ${R.finra.firstAndSecondDays} days, so the retake is possible from ${h.date('2026-12-10')}.</li>
<li>A second failure on ${h.date('2027-01-01')}: under the old rule the date would be ${h.date('2027-01-31')}, but the new rule frees the candidate on ${h.date('2027-01-19')} already.</li>
<li>A third failure on ${h.date('2027-03-01')}: ${R.finraFrom.thirdDays} days, so ${h.date('2027-04-30')}.</li>
</ul>
<p>For the Series 63, 65 and 66, NASAA's periods apply without change. The notice itself warns that exams administered for NASAA "may differ", so do not apply the 2027 dates to them.</p>
<h2>Before you book the retake</h2>
<h3>Use the waiting period</h3>
<p>Start from what the failed attempt told you about each part of the outline, then turn it into a plan: practice the weakest section first with the section menu of our quizzes, then sit a full timed mock again. The ${h.a('review-mistakes', 'review page')} brings back every question you missed on this site, and the ${h.a('sie-passing-score', 'SIE')} and ${h.a('series-7-passing-score', 'Series 7')} passing score pages explain why a margin above the line matters.</p>
<h3>Budget the fee again</h3>
<p>A retake is a new enrollment with the full fee: ${h.usd(h.X('sie').fee)} for the SIE, ${h.usd(h.X('s7').fee)} for the Series 7, ${h.usd(h.X('s65').fee)} for the Series 65 in 2026. The ${h.a('exam-fees', 'fee calculator')} adds retakes to a full exam plan. FINRA then opens a new ${h.P.windowDays}-day window (${h.src('finra_schedule', 'scheduling page')}), which must start after the waiting period ends.</p>
<h2>What the rule does not change</h2>
<p>The waiting period does not touch the validity of exams you already passed: an SIE pass stays good for ${h.X('sie').validYears} years, and a Series 7 passed while you wait for an SIE retake stays on your record. It does not apply to continuing education either: the Regulatory Element is not a qualification exam, and its deadline is the subject of the ${h.a('continuing-education', 'continuing education page')}. The five practice questions above train the regulatory section of the SIE, where these rules sit in the outline.</p>`;
    },
  },
});
