import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-cost',
  group: 'sie',
  order: 31,
  tool: { kind: 'mini:fees', props: { b: 0 } },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['exam-fees', 'scheduling', 'retake-rules', 'sie-expiration', 'sie-exam'],
  sources: ['finra_sie', 'finra_fees', 'finra_section4', 'finra_schedule'],
  demarche: true,
  en: {
    slug: 'sie-exam/cost',
    nav: 'SIE exam cost',
    card: 'What the SIE costs in 2026: the exam fee, what a retake or a late change adds, and the full bill for the usual license paths.',
    title: 'SIE Exam Cost 2026: The $100 Fee and What Can Add to It',
    description: 'SIE exam cost in 2026: a $100 fee since January 1, up from $80, paid by you at enrollment; plus what a retake, a late change or a no-show would add to the bill.',
    h1: 'What the SIE costs in 2026',
    intro: 'Pick a set of exams and the retakes you want to budget for: the calculator adds the 2026 fees and any late-change charge.',
    resume: (h) => {
      const S = h.X('sie');
      return `The SIE exam fee is ${h.usd(S.fee)} in 2026. FINRA raised it from ${h.usd(S.feePrev!)} on ${h.date(h.P.feeIncrease.effective)}, as part of the fee adjustment filed as ${h.P.feeIncrease.filing} (${h.src('finra_fees', 'fee schedule')}). Since the SIE needs no sponsoring firm, you normally enroll and pay yourself when you open the enrollment; FINRA then gives you a ${h.P.windowDays}-day window to sit the exam. The fee covers one attempt. Three things can raise the bill. A failed attempt means paying the full fee again for the retake, after the waiting period. Moving or cancelling the appointment late costs half the fee from ${h.P.reschedule.halfChargeToBusinessDays} to ${h.P.reschedule.halfChargeFromBusinessDays} business days before it, and the whole fee within ${h.P.reschedule.fullChargeWithinBusinessDays} business days or after a no-show (${h.src('finra_section4', 'Section 4 of Schedule A')}). A test center outside the United States adds ${h.usd(h.P.reschedule.foreignCenterCharge)} per sitting. Study material is the other cost, and it can be zero: the practice questions on this site are free and need no account.`;
    },
    faqs: (h) => [
      { q: 'How much did the SIE cost before 2026?', a: `${h.usd(h.X('sie').feePrev!)} through the end of 2025. The current ${h.usd(h.X('sie').fee)} applies to enrollments from ${h.date(h.P.feeIncrease.effective)}, under the fee adjustment schedule FINRA filed with the SEC. The Series 7 rose more steeply in the same schedule, to ${h.usd(h.X('s7').fee)}, so the combined cost of the usual broker path went up as well.` },
      { q: 'Is the SIE fee charged again for a retake?', a: `Yes. Each attempt is a new enrollment with the full ${h.usd(h.X('sie').fee)} fee, and it can only be scheduled once the waiting period after the failure has passed. Budgeting one possible retake from the start, as the calculator allows, keeps an unpleasant surprise small. Practicing with full mocks before booking is the cheaper way to avoid it.` },
      { q: 'What does a missed SIE appointment cost?', a: `The whole fee. Under FINRA's schedule, a no-show is charged like a change made ${h.P.reschedule.fullChargeWithinBusinessDays} business days or less before the exam, which forfeits the ${h.usd(h.X('sie').fee)}. A change made ${h.P.reschedule.halfChargeFromBusinessDays} to ${h.P.reschedule.halfChargeToBusinessDays} business days ahead costs half. Earlier than that, moving the date is free, so decide early if you are not ready.` },
    ],
    body: (h) => {
      const X = h.X;
      const paths: Array<[string, Array<'sie' | 's7' | 's6' | 's63' | 's66'>]> = [
        ['SIE only', ['sie']],
        ['Stockbroker: SIE, Series 7, Series 63', ['sie', 's7', 's63']],
        ['Fund representative: SIE, Series 6, Series 63', ['sie', 's6', 's63']],
        ['Broker and adviser: SIE, Series 7, Series 66', ['sie', 's7', 's66']],
      ];
      return `
<h2>The fee and what it buys</h2>
${h.table(['Item', '2026'], [
  ['SIE exam fee', h.usd(X('sie').fee)],
  ['Before 2026', h.usd(X('sie').feePrev!)],
  ['Retake', `${h.usd(X('sie').fee)} again`],
  [`Change ${h.P.reschedule.halfChargeFromBusinessDays} to ${h.P.reschedule.halfChargeToBusinessDays} business days before`, h.usd(X('sie').fee / 2)],
  [`Change within ${h.P.reschedule.fullChargeWithinBusinessDays} business days, or no-show`, h.usd(X('sie').fee)],
  ['Test center outside the US', `+${h.usd(h.P.reschedule.foreignCenterCharge)}`],
], `FINRA fee schedule and Section 4 of Schedule A to the By-Laws, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<p>The fee pays for one attempt inside the ${h.P.windowDays}-day window, at a test center or online: the SIE is the FINRA exam open to online delivery for any enrolled candidate (${h.src('finra_schedule', 'scheduling page')}). Book early in the window, since test center dates can fill up close to its end.</p>
<h2>Who pays</h2>
<p>For the SIE, normally you, since you are the one who opens the enrollment and nobody else is involved at that stage. The exam was designed to be taken before a job, without a sponsoring firm, so there is no firm to file or pay the enrollment. Some employers reimburse it after hiring, but no rule requires them to, so ask about it in an interview rather than assuming. The exams that come next, the Series 7 or Series 6, are filed by the sponsoring firm, which often pays them as part of training; that depends on the firm. Ask whether it expects any repayment if you leave soon after, and read any training agreement before you sign it.</p>
<h2>The full bill for the usual paths</h2>
${h.table(['Path', 'Exam fees, 2026'], paths.map(([l, ex]) => [l, h.usd(ex.reduce((s, e) => s + X(e).fee, 0))]), 'Fees only, without retakes; the state exam actually required depends on the states where you work.', ['l', 'r'])}
<p>The calculator above handles any of these combinations and adds retakes and late changes; the ${h.a('exam-fees', 'exam fees page')} lists every FINRA and NASAA exam with its 2026 price.</p>
<h2>Costs that come after the SIE</h2>
<p>The SIE is the first fee on a longer road. Once a firm registers you, continuing education begins: the Regulatory Element is charged ${h.usd(h.P.otherFees2026.regElement)} per session in 2026, up from ${h.usd(h.P.otherFees2026.regElementPrev)}, and the ${h.a('continuing-education', 'continuing education page')} explains when it is due. States also charge their own registration fees, set by each state. If you later leave the industry and want to keep your qualifications alive, the Maintaining Qualifications Program costs ${h.usd(h.P.mqp.annualFee)} a year. None of these is due when you take the SIE, but a candidate planning a career in the industry can see the whole picture from the start, and compare it with what an employer is willing to cover.</p>
<h2>Keeping the cost to one fee</h2>
<p>The cheapest SIE is the one passed on the first try. Four habits help:</p>
<ul>
<li>Book the date only after two full mocks above the line, not before you start studying.</li>
<li>Note in your calendar the last day to move the appointment for free, ${h.P.reschedule.halfChargeToBusinessDays + 1} business days before it.</li>
<li>Check the online session requirements in advance if you test from home, so a technical problem does not turn into a no-show.</li>
<li>Remember the pass lasts ${X('sie').validYears} years (${h.a('sie-expiration', 'expiration rules')}): passing too early, long before a job, can mean paying for it twice.</li>
</ul>
<p>If the exam goes wrong, the ${h.a('retake-rules', 'retake page')} gives the earliest date to sit it again. The five questions under this text come from the regulatory section of the outline, where registration and exam rules belong.</p>`;
    },
  },
});
