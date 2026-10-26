import { definePage } from '../../lib/guide-types';
import { sieExpiry, dayNum, isoOf } from '../../lib/engine/dates';

export default definePage({
  id: 'sie-expiration',
  group: 'sie',
  order: 34,
  tool: { kind: 'mini:sievalid' },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['two-year-rule', 'sponsorship', 'sie-cost', 'sie-vs-series-7', 'sie-regulation'],
  sources: ['finra_1210', 'finra_sie', 'finra_mqp'],
  en: {
    slug: 'sie-exam/expiration',
    nav: 'Does the SIE expire?',
    card: 'How long an SIE pass stays good: four years to be registered through a firm, then the rules for registered people take over.',
    title: 'SIE Expiration: How Long Your Pass Stays Valid, 4 Years',
    description: 'SIE expiration rules: a pass is valid for four years to register through a firm; once registered it holds while you stay registered. Find your end date.',
    h1: 'Does the SIE expire? The four-year rule',
    intro: 'Enter the day you passed and the day a firm would register you: the calculator gives the last valid day and whether the pass will still count.',
    resume: (h) => {
      const S = h.X('sie');
      const ex = isoOf(sieExpiry(dayNum('2026-06-15')));
      return `An SIE pass does not last forever. Under ${h.src('finra_1210', 'FINRA Rule 1210')}, it stays valid for ${S.validYears} years from the date you passed it. Within that period, a firm must register you, which in practice means you have also passed the qualification exam the role requires, such as the Series 7 or the Series 6, and the firm has filed your registration. If the ${S.validYears} years run out first, the SIE has to be taken again, with a new fee of ${h.usd(S.fee)} at 2026 rates, before any registration. For example, a pass on ${h.date('2026-06-15')} remains usable until ${h.date(ex)}. Once you are registered, the clock no longer matters while you stay in the industry: the SIE counts as part of your qualification for as long as the registration lasts. If you later leave, the rules for people who leave the industry take over, with their own deadlines and, for qualification exams, the option of the Maintaining Qualifications Program (${h.src('finra_mqp', 'MQP')}). Passing early has a cost too: a pass that ends before anyone hires you is a fee paid for nothing. The calculator above gives your own end date from the day you passed.`;
    },
    faqs: (h) => [
      { q: 'What happens if my SIE expires before a firm hires me?', a: `You sit it again. An expired SIE cannot support a registration, so a new enrollment, a new ${h.usd(h.X('sie').fee)} fee and a new pass are needed, either before or alongside the qualification exam your firm sponsors. Nothing else is lost: there is no penalty, and the knowledge comes back quickly, so a short refresher with practice sets is usually enough.` },
      { q: 'Does the SIE expire once I am registered?', a: `No, not while the registration lasts. The ${h.X('sie').validYears}-year limit only applies to a pass that has not yet been used for a registration. Once a firm has registered you, the SIE is part of your qualification. If the registration ends, for example when you leave the industry, the rules for former registered persons take over, with their own deadlines.` },
      { q: 'Can I take the SIE too early?', a: `In a sense, yes. A student who passes the SIE in a first year of college may find it close to expiry by the time a firm hires them. Since the pass lasts ${h.X('sie').validYears} years, aim to take it within the period you expect to start applying for jobs, so that the pass still has time to run when a firm sponsors your next exam.` },
    ],
    body: (h) => {
      const S = h.X('sie');
      const cases = ['2023-03-10', '2024-09-02', '2026-11-20'];
      return `
<h2>The rule in one table</h2>
${h.table(['Situation', 'What happens to the SIE'], [
  ['Passed, not yet registered', `valid for ${S.validYears} years from the pass date`],
  [`Registered through a firm within ${S.validYears} years`, 'counts for as long as the registration lasts'],
  [`${S.validYears} years over, never registered`, `expired: take the exam again (${h.usd(S.fee)} in 2026)`],
  ['Registered, then left the industry', 'follows the rules for former registered persons'],
], `${h.src('finra_1210', 'FINRA Rule 1210')} and the ${h.src('finra_sie', 'FINRA SIE page')}, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Three passes and where they end:</p>
<ul>${cases.map((d) => `<li>Passed on ${h.date(d)}: a firm must register the candidate by ${h.date(isoOf(sieExpiry(dayNum(d))))}.</li>`).join('')}</ul>
<h2>Why the SIE has a limit at all</h2>
<p>The SIE was designed to be taken by people outside the industry, before they have a job. A test of general knowledge cannot vouch for that knowledge indefinitely when the person has not been using it, so FINRA gives the pass a fixed life. The representative exams have a comparable logic once you are in: their qualification lapses if you stay away from a registration for too long.</p>
<p>The limit also explains a common surprise: candidates who took the SIE during a degree, then spent some years in another field, find that the pass has run out when a broker-dealer finally makes them an offer. The fix is simple but costs a fee and some revision, which is why the timing of the first attempt is worth a thought.</p>
<h3>Planning around the four years</h3>
<p>Count backward from when you expect to be hired. A candidate in a training program or a graduate job search can take the SIE a few months before applying, which shows employers commitment while leaving years of validity. A firm that hires you then sponsors the qualification exam; the ${h.a('sponsorship', 'sponsorship page')} explains what it files and when.</p>
<h2>After you leave the industry</h2>
<p>When a registration ends, the firm files a Form U5, and from that date the rules for people out of the industry govern your qualifications. In general a qualification exam lapses after ${h.P.lapseYears} years without a registration. The Maintaining Qualifications Program can extend that, up to ${h.P.mqp.maxYears} years, for people who were registered for at least ${h.P.mqp.minRegisteredYears} year, elect it in time and complete continuing education each year, for a fee of ${h.usd(h.P.mqp.annualFee)} a year (${h.src('finra_mqp', 'MQP page')}). How these rules apply to your own SIE pass after a departure is set by Rule 1210; a firm's registration staff can confirm your dates before you rejoin. The ${h.a('two-year-rule', 'two-year rule page')} has a calculator for the lapse and MQP deadlines.</p>
<h2>If your pass is about to run out</h2>
<p>If a firm is about to hire you and your pass ends soon, tell them: the registration has to be filed before the end date, which leaves little room for a slow onboarding. If it has already expired, budget the fee again (${h.a('sie-cost', 'SIE cost')}) and refresh with the regulatory questions under this text and a full mock. The ${h.a('sie-vs-series-7', 'SIE and Series 7 comparison')} shows how the two exams combine into a registration.</p>`;
    },
  },
});
