import { definePage } from '../../lib/guide-types';
import { ceDeadline, dayNum, isoOf } from '../../lib/engine/dates';

export default definePage({
  id: 'continuing-education',
  group: 'rules',
  order: 60,
  tool: { kind: 'mini:cedeadline' },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['two-year-rule', 'sponsorship', 'exam-fees', 'sie-regulation'],
  sources: ['finra_1240', 'finra_fees', 'finra_mqp'],
  en: {
    slug: 'continuing-education',
    nav: 'Continuing education',
    card: 'The yearly Regulatory Element deadline of FINRA Rule 1240, the first-year rule, CE inactive status and its cost.',
    title: 'FINRA Continuing Education: Regulatory Element Deadline',
    description: 'FINRA continuing education under Rule 1240: the Regulatory Element each year by December 31, the first-year rule, CE inactive status and the 2026 fee.',
    h1: 'Continuing education after you pass',
    intro: 'Enter the date you were first registered: the calculator gives your next Regulatory Element deadline and the days left.',
    resume: (h) => {
      const dl = ceDeadline(dayNum('2026-05-04'), dayNum('2026-10-26'));
      return `Passing the exam is not the end of the requirements. Under ${h.src('finra_1240', 'FINRA Rule 1240')}, every registered person completes the Regulatory Element of continuing education each year, by December 31. The content is assigned by FINRA according to the registrations a person holds, and it is taken online. Someone registered for the first time completes the first session by December 31 of the year after the year of registration: a representative first registered on ${h.date('2026-05-04')} has until ${h.date(isoOf(dl))}. A person who misses the deadline becomes CE inactive and may not perform, or be paid for, the activities that need registration until the content is done; a registration inactive for two consecutive years is administratively terminated. Each session has a fee, ${h.usd(h.P.otherFees2026.regElement)} in 2026, up from ${h.usd(h.P.otherFees2026.regElementPrev)}, usually paid by the firm. Firms also run their own yearly training, the Firm Element, on the products and rules that matter to their business. People who leave the industry can keep their qualifications alive in the ${h.a('two-year-rule', 'Maintaining Qualifications Program')} by doing the same yearly content.`;
    },
    faqs: (h) => [
      { q: 'What happens if I miss the December 31 deadline?', a: 'Your registration becomes CE inactive. During that time you must not conduct, or be compensated for, activities that require registration, which in practice means no securities business. The status ends once the content is completed. If it lasts two consecutive years, FINRA administratively terminates the registration and the exams would have to be passed again.' },
      { q: 'Do I take continuing education the same year I pass the Series 7?', a: `No. A person first registered in a given year does the first Regulatory Element session by December 31 of the following year. Someone registered in May 2026 therefore has until the end of 2027. From then on the session is due every year by December 31, whatever the month of registration.` },
      { q: 'Is the Regulatory Element a test I can fail?', a: 'It is online training content with learning checks, not a qualification exam: there is no passing score of the kind the Series 7 has, and no waiting period applies. The retake rules of Rule 1210 concern qualification exams only. What matters is completing the assigned content before the deadline, which takes a few hours at most for most people.' },
    ],
    body: (h) => `
<h2>Three parts of the CE system</h2>
${h.table(['Part', 'Who', 'When'], [
  ['Regulatory Element', 'every registered person', 'each year by December 31 (first year: by December 31 of the next year)'],
  ['Firm Element', 'covered registered persons, through the firm', 'each year, under a training plan set by the firm'],
  ['MQP content', 'people out of the industry who joined the program', `each year in the program, ${h.usd(h.P.mqp.annualFee)} a year`],
], `FINRA Rule 1240 and the MQP page, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>The deadline, case by case</h2>
<p>The calculator takes two dates: when you were first registered and today. If you are still in the year after your first registration, the deadline is December 31 of that year; otherwise it is December 31 of the current year. Three examples:</p>
<ul>
<li>First registered on ${h.date('2026-05-04')}: first session by ${h.date('2027-12-31')}.</li>
<li>First registered on ${h.date('2025-11-20')}: first session by ${h.date('2026-12-31')}.</li>
<li>Registered for years: the current session by ${h.date('2026-12-31')}.</li>
</ul>
<p>Rule 1240 counts from the registration, not from the exam. A candidate who passed the Series 7 in March but whose registration was approved in April is first registered in April; the year is what matters for the deadline.</p>
<h2>CE inactive status</h2>
<p>A missed deadline is not a fine but a stop. While inactive, the person may not do the work the registration covers or receive transaction-based pay for it. Firms track the deadline closely for this reason. Completing the content ends the status.</p>
<h3>Two years inactive</h3>
<p>If a registration stays CE inactive for two consecutive years, FINRA terminates it. The person then faces the rules on lapsed qualifications: after ${h.P.lapseYears} years without registration the exams have to be retaken, unless the person is in the MQP. The ${h.a('two-year-rule', 'two-year rule page')} explains those limits.</p>
<h2>What it costs</h2>
<p>The Regulatory Element fee is set in FINRA's fee schedule: ${h.usd(h.P.otherFees2026.regElement)} per session since ${h.date(h.P.feeIncrease.effective)} (${h.src('finra_fees', 'fee schedule')}). Firms generally pay it with the other registration fees; check your employment terms if you hold a registration through an independent firm.</p>
<h2>Why it matters before the exam</h2>
<p>The SIE outline lists registration and continuing education among the topics of its regulatory framework section, with Rule 1240 among the rules candidates should know. The five questions above come from that section. For the exams themselves, the ${h.a('exam-fees', 'fee page')} and the ${h.a('sponsorship', 'sponsorship page')} cover what comes before registration.</p>
<h2>Practical tips</h2>
<p>Complete the Regulatory Element as soon as it is assigned rather than in late December, when many people rush to finish and a technical problem can push you past the deadline. Keep the confirmation of completion. If you change firms during the year, the requirement follows you, not the firm: the new firm will see whether the session is done. And if you leave the industry, the ${h.a('two-year-rule', 'Maintaining Qualifications Program')} asks for the same yearly effort to keep your exams alive.</p>
<p>For a newly registered person, the first deadline is often more than a year away, which makes it easy to forget. Note it on the day your registration is approved.</p>`,
  },
});
