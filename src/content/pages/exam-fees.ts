import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'exam-fees',
  group: 'rules',
  order: 20,
  tool: { kind: 'mini:fees', props: { b: 2 } },
  mini: { kind: 'mini:reschedule' },
  related: ['which-license', 'retake-rules', 'scheduling', 'sie-cost', 'sponsorship'],
  sources: ['finra_fees', 'finra_section4', 'finra_sie', 'finra_s7', 'finra_s65'],
  demarche: true,
  en: {
    slug: 'finra-exam-fees',
    nav: 'Exam fees 2026',
    card: 'What the SIE, Series 6, 7, 63, 65 and 66 and other FINRA exams cost in 2026, with late-change charges and retakes.',
    title: 'FINRA Exam Fees 2026: SIE, Series 7, 63, 65, 66 and More',
    description: 'FINRA exam fees in 2026: SIE $100, Series 7 $395, Series 6 $100, Series 63 $147, Series 65 $187, 66 $177, plus late-change charges and retakes, calculated.',
    h1: 'What the exams cost in 2026',
    intro: 'Pick the exams of your path, the retakes you want to budget for and any late change of appointment: the calculator adds up the 2026 fees.',
    resume: (h) => {
      const X = h.X;
      return `FINRA raised its qualification exam fees on ${h.date(h.P.feeIncrease.effective)}, under the fee adjustment schedule filed as ${h.P.feeIncrease.filing} (${h.src('finra_fees', 'FINRA fee schedule')}). In 2026 the SIE costs ${h.usd(X('sie').fee)} instead of ${h.usd(X('sie').feePrev!)}, the Series 7 ${h.usd(X('s7').fee)} instead of ${h.usd(X('s7').feePrev!)}, and the Series 6 ${h.usd(X('s6').fee)} instead of ${h.usd(X('s6').feePrev!)}. The NASAA exams, which FINRA administers, cost ${h.usd(X('s63').fee)} for the Series 63, ${h.usd(X('s65').fee)} for the Series 65 and ${h.usd(X('s66').fee)} for the Series 66. Each attempt is paid in full, so a retake costs the same as the first sitting. Changing an appointment late also costs money under ${h.src('finra_section4', 'Section 4 of Schedule A')}: half the fee when the change comes ${h.P.reschedule.halfChargeFromBusinessDays} to ${h.P.reschedule.halfChargeToBusinessDays} business days before the exam, the full fee within ${h.P.reschedule.fullChargeWithinBusinessDays} business days or for a no-show. A typical stockbroker path, SIE, Series 7 and Series 63, comes to ${h.usd(X('sie').fee + X('s7').fee + X('s63').fee)} before any retake; a sponsoring firm often pays the exams it requires.`;
    },
    faqs: (h) => [
      { q: 'Who pays for the Series 7, me or the firm?', a: 'The rules do not say: FINRA charges the fee to whoever enrolls, and for a sponsored exam that is the firm, which may pay it or pass it on to you. Many firms pay for the exams they require and some ask for repayment if you leave soon after. Ask before the enrollment is filed, and get the answer in writing.' },
      { q: 'Are FINRA exam fees refundable?', a: `Not in general. An appointment moved or cancelled at least ${h.P.reschedule.halfChargeToBusinessDays + 1} business days ahead costs nothing extra, but the late-change charges of Section 4 apply closer to the date, and a no-show forfeits the full fee. Check the scheduling rules before you book a date you are not sure you can keep.` },
      { q: 'What does continuing education cost?', a: `The Regulatory Element of continuing education, which every registered person completes each year, has its own fee: ${h.usd(h.P.otherFees2026.regElement)} per session in 2026, up from ${h.usd(h.P.otherFees2026.regElementPrev)}. Firms usually pay it. People out of the industry who join the Maintaining Qualifications Program pay ${h.usd(h.P.mqp.annualFee)} a year.` },
    ],
    body: (h) => {
      const X = h.X, O = h.P.otherFees2026;
      return `
<h2>The six exams of this site</h2>
${h.table(['Exam', 'Fee 2026', 'Fee 2025', 'Change'], (['sie', 's7', 's6'] as const).map((e) => [h.label(e), h.usd(X(e).fee), h.usd(X(e).feePrev!), `+${h.usd(X(e).fee - X(e).feePrev!)}`]).concat((['s63', 's65', 's66'] as const).map((e) => [h.label(e), h.usd(X(e).fee), 'not shown', ''])), `Read on the FINRA exam pages and fee schedule on ${h.date(h.P.retrieved_at)}.`, ['l', 'r', 'r', 'r'])}
<h2>Other FINRA exams in 2026</h2>
${h.table(['Exam', 'Fee 2026'], [
  ['Series 9 (General Securities Sales Supervisor, options)', h.usd(O.s9)],
  ['Series 10 (General Securities Sales Supervisor, general)', h.usd(O.s10)],
  ['Series 22 (Direct Participation Programs)', h.usd(O.s22)],
  ['Series 24 (General Securities Principal)', h.usd(O.s24)],
  ['Series 26 (Investment Company Principal)', h.usd(O.s26)],
  ['Series 27 (Financial and Operations Principal)', h.usd(O.s27)],
  ['Series 57 (Securities Trader)', h.usd(O.s57)],
  ['Series 79 (Investment Banking)', h.usd(O.s79)],
  ['Series 82 (Private Securities Offerings)', h.usd(O.s82)],
  ['Series 86 and 87 (Research Analyst)', `${h.usd(O.s86)} and ${h.usd(O.s87)}`],
  ['Series 99 (Operations Professional)', h.usd(O.s99)],
], `${h.src('finra_fees', 'Fee adjustment schedule')}, in force since ${h.date(h.P.feeIncrease.effective)}.`, ['l', 'r'])}
<h2>Charges for late changes</h2>
<p>Section 4 of Schedule A to the FINRA By-Laws (${h.src('finra_section4', 'Section 4')}) sets what a late cancellation or rescheduling costs, counted in business days before the appointment:</p>
<ul>
<li>${h.P.reschedule.fullChargeWithinBusinessDays} business days or less, or no-show: the full exam fee;</li>
<li>${h.P.reschedule.halfChargeFromBusinessDays} to ${h.P.reschedule.halfChargeToBusinessDays} business days: half the fee;</li>
<li>a test center outside the United States adds ${h.usd(h.P.reschedule.foreignCenterCharge)} per sitting.</li>
</ul>
<p>The calculator under the citable block counts the business days between a change and an appointment, weekends skipped, and gives the charge. Public holidays are not removed from its count, so a change near a holiday should be checked with the test center.</p>
<h2>Keeping the bill down</h2>
<p>The cheapest exam is the one passed the first time. Sitting a full timed mock before booking, and booking only once the score holds above the line with some margin, avoids both a retake and a late change. If you work for a firm, ask which exams it pays for before you enroll: an SIE taken on your own is usually at your cost, a sponsored Series 7 often is not. The ${h.a('retake-rules', 'retake page')} gives the waiting period that follows a failure, and the ${h.a('which-license', 'license finder')} shows which exams your job really needs, so that you do not pay for one you will never use.</p>
<h2>Three typical budgets</h2>
<p>A student taking only the SIE before job hunting pays ${h.usd(h.X('sie').fee)}, plus ${h.usd(h.X('sie').fee)} again for each retake. A new stockbroker on the usual path, SIE, Series 7 and Series 63, faces ${h.usd(h.X('sie').fee + h.X('s7').fee + h.X('s63').fee)} in exam fees, most of which a sponsoring firm often covers. A future adviser representative who takes only the Series 65 pays ${h.usd(h.X('s65').fee)}. A single failed Series 7 adds ${h.usd(h.X('s7').fee)} and at least the waiting period before the next attempt, which is why the fee calculator lets you budget retakes explicitly rather than hoping for the best.</p>
<p>Study material, courses and travel to the test center are not FINRA fees and are not counted here.</p>
<p>Fees are set by FINRA's schedule and change rarely, through a rule filing announced in advance, as with the increase that took effect on ${h.date(h.P.feeIncrease.effective)}. When a new schedule is published, the parameter file of this site is updated and every figure on this page follows, with its date. Until then, the amounts above are the ones FINRA charges when you or your firm enroll.</p>`;
    },
  },
});
