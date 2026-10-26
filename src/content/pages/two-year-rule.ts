import { definePage } from '../../lib/guide-types';
import { dayNum, isoOf, lapseDay, mqpDay, mqpElectBy } from '../../lib/engine/dates';

export default definePage({
  id: 'two-year-rule',
  group: 'rules',
  order: 50,
  tool: { kind: 'mini:lapse' },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['sie-expiration', 'continuing-education', 'sponsorship', 'retake-rules'],
  sources: ['finra_1210', 'finra_mqp', 'finra_1240'],
  en: {
    slug: 'two-year-rule',
    nav: 'Two-year rule and MQP',
    card: 'How long Series 7 and other FINRA exams stay valid after you leave a firm: two years, or five with the MQP.',
    title: 'FINRA Two-Year Rule: Series 7 Expiration and the MQP',
    description: 'FINRA two-year rule: a Series 7 or Series 6 lapses two years after your registration ends, or after five years with the Maintaining Qualifications Program.',
    h1: 'When do your exams expire after leaving the industry?',
    intro: 'Enter the date your registration ended: the calculator gives the end of the two-year period, the five-year limit with the MQP and the last day to join it.',
    resume: (h) => {
      const t = dayNum('2026-03-31');
      return `A passed FINRA representative or principal exam does not expire while you stay registered. It starts to age the day your registration ends, usually when your firm files a Form U5. Under ${h.src('finra_1210', 'FINRA Rule 1210')}, if you are not registered again within ${h.P.lapseYears} years, the qualification lapses and you must pass the exam again, unless FINRA grants a waiver. The ${h.src('finra_mqp', 'Maintaining Qualifications Program')} extends that limit to ${h.P.mqp.maxYears} years: it is open to people who were registered in the category for at least ${h.P.mqp.minRegisteredYears} year, who elect it within ${h.P.mqp.electWithinYears} years of the termination, complete continuing education every year and pay ${h.usd(h.P.mqp.annualFee)} a year. For a registration ended on ${h.date('2026-03-31')}, the exam lapses on ${h.date(isoOf(lapseDay(t)))} without the program, and on ${h.date(isoOf(mqpDay(t)))} with it; the election must be made by ${h.date(isoOf(mqpElectBy(t)))}. The SIE follows its own clock of ${h.X('sie').validYears} years, and the state exams follow the state rules.`;
    },
    faqs: (h) => [
      { q: 'Does my SIE also lapse after two years?', a: `No. The SIE has its own rule: a pass is valid for ${h.X('sie').validYears} years from the date you passed it if you are not registered, and it raises no question while you hold a registration based on it. If you were never registered after passing it, the four years run from the exam date. The SIE expiration page has its own calculator for that case.` },
      { q: 'What does the MQP cost and require each year?', a: `FINRA charges ${h.usd(h.P.mqp.annualFee)} a year whatever the number of qualifications kept, and the participant must complete the continuing education content FINRA assigns for each year in the program. Missing a year makes the person ineligible to continue, and the ordinary ${h.P.lapseYears}-year rule then applies to the qualifications.` },
      { q: 'Are the Series 63, 65 and 66 covered by the MQP?', a: `No. They are NASAA exams, and the states decide how long they last after a registration ends, generally ${h.P.lapseYears} years. Many states have adopted NASAA's Exam Validity Extension Program, which, like the MQP, allows up to ${h.P.evep.maxYears} years with continuing education. Check the rule of the state where you will register.` },
    ],
    body: (h) => {
      const t = dayNum('2026-03-31');
      return `
<h2>Two clocks after a Form U5</h2>
${h.table(['Situation', 'Exams valid until', 'Condition'], [
  ['No program', h.date(isoOf(lapseDay(t))), `registered again within ${h.P.lapseYears} years`],
  ['Maintaining Qualifications Program', h.date(isoOf(mqpDay(t))), `elected by ${h.date(isoOf(mqpElectBy(t)))}, annual CE, ${h.usd(h.P.mqp.annualFee)} a year`],
], `Example of a registration ended on ${h.date('2026-03-31')}. FINRA Rule 1210 and FINRA MQP page, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'l'])}
<h2>Who can join the MQP</h2>
<ul>
<li>You were registered in the category, for example as a general securities representative, for at least ${h.P.mqp.minRegisteredYears} year (FINRA counts 365 days, without exception) before the termination.</li>
<li>You elect to participate within ${h.P.mqp.electWithinYears} years of the termination date; it is simplest to do it at the time of the Form U5.</li>
<li>You complete the continuing education FINRA assigns every year you stay in the program, and pay the annual fee.</li>
</ul>
<p>The program fits people who take a career break, move to a non-registered role, or work abroad for a few years. It costs little compared with a new Series 7, ${h.usd(h.X('s7').fee)} in 2026 plus weeks of study.</p>
<h2>Coming back after the limit</h2>
<p>Once the period has passed, the qualification is gone: the firm that hires you must enroll you again and you sit the exam as a new candidate. FINRA can grant a waiver of the exam in some cases at a firm's request, under Rule 1210, but this is not automatic and depends on the person's experience; do not plan on it. If the SIE has also expired, both exams are needed again, since the SIE remains the corequisite of the Series 7 and Series 6.</p>
<h3>Continuing education while registered</h3>
<p>For people still registered, the rule is different: the Regulatory Element must be completed each year under ${h.src('finra_1240', 'Rule 1240')}, and missing it makes the registration inactive. The ${h.a('continuing-education', 'continuing education page')} computes the deadline.</p>
<h2>State registrations</h2>
<p>The NASAA exams follow state rules. The Series 66 study guide and the other NASAA guides describe the exams, while the validity of a passed exam after a registration ends is set by each state; NASAA's Exam Validity Extension Program lets participating states keep an exam valid for up to ${h.P.evep.maxYears} years with continuing education; ask the state securities regulator whether it takes part. The five questions above come from the regulatory section of the SIE, where registration and its lapse are part of the outline.</p>
<h2>Planning a break</h2>
<p>If you expect to leave the industry for a while, decide about the MQP when the Form U5 is filed rather than later: the election window is ${h.P.mqp.electWithinYears} years, but the continuing education and the annual fee are easier to keep up from the start. Note the date of the termination; it drives every limit on this page. And if your SIE pass is recent, check its own ${h.X('sie').validYears}-year limit with the ${h.a('sie-expiration', 'SIE expiration calculator')}, since a return after the limit may mean sitting both exams again.</p>
<p>One last point: the clock starts on the termination date shown on the Form U5, not on your last day of work if the two differ. Ask the firm for that date when you leave and keep it with your records; the calculator above needs exactly that date to give a reliable answer.</p>`;
    },
  },
});
