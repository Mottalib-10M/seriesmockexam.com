import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-vs-series-7',
  group: 'sie',
  order: 33,
  tool: { kind: 'mini:license', props: { r: 1 } },
  mini: { kind: 'quiz', props: { exam: 's7', n: 5 } },
  related: ['series-7-exam', 'sie-exam', 'which-license', 'sponsorship', 'series-6-exam'],
  sources: ['finra_sie', 'finra_s7', 'finra_1210', 'finra_1220'],
  en: {
    slug: 'sie-vs-series-7',
    nav: 'SIE vs Series 7',
    card: 'SIE and Series 7 side by side: who can take each, length, pass mark, fee, sponsorship, and the order most candidates follow.',
    title: 'SIE vs Series 7: Differences, Order and Which Comes First',
    description: 'SIE vs Series 7 compared: open entry exam against sponsored qualification exam, questions, time, scaled pass, 2026 fees, and why both are needed to register.',
    h1: 'SIE and Series 7: how the two exams fit together',
    intro: 'Choose the work you are aiming at: the finder lists the exams it requires, their total fees and which ones need a firm to sponsor you.',
    resume: (h) => {
      const S = h.X('sie'), T = h.X('s7');
      return `The SIE and the Series 7 are not alternatives: a general securities representative needs both. Since FINRA restructured its representative exams, the general knowledge they used to repeat has had an exam of its own. The SIE tests general industry knowledge and is open to anyone aged ${S.minAge} or over, with no firm behind them. The Series 7 is the qualification exam for the specific job of selling a broad range of securities, and it can only be taken with a sponsoring member firm, which files the enrollment. The SIE is the corequisite of the Series 7: the registration is granted when both are passed, whatever the order (${h.src('finra_s7', 'FINRA Series 7 page')}). In figures, the SIE has ${S.scored} scored questions in ${h.hours('sie')} with a scaled pass of ${S.passScore} and a fee of ${h.usd(S.fee)}; the Series 7 has ${T.scored} scored questions in ${h.hours('s7')}, a scaled pass of ${T.passScore} and a fee of ${h.usd(T.fee)} in 2026. Most candidates take the SIE first, on their own, then the Series 7 after a firm hires them, followed in most states by the Series 63.`;
    },
    faqs: (h) => [
      { q: 'Can I sit the Series 7 before passing the SIE?', a: 'Yes, if a firm sponsors you. The SIE is a corequisite rather than a prerequisite, so the two can be passed in either order; the registration as a general securities representative is approved only once both are passed. In practice most people take the SIE first, because it can be done before being hired and shows a firm that the candidate is serious.' },
      { q: 'Does an SIE pass also count toward the Series 6?', a: `Yes. The SIE is the corequisite of the Series 6 as well as the Series 7, and of several other representative exams. One pass serves for any of them, as long as it is still valid, that is within ${h.X('sie').validYears} years, when the firm files the registration. A candidate who starts on the Series 6 and later adds the Series 7 does not sit the SIE again.` },
      { q: 'How much of the Series 7 overlaps with the SIE?', a: 'A good share of the vocabulary: products, orders, accounts, margin basics and prohibited practices all appear in both outlines. The Series 7 goes much further on options strategies, municipal securities, suitability for specific customers and the processing of orders. Knowledge from the SIE gives a head start, but the Series 7 still needs its own preparation.' },
    ],
    body: (h) => {
      const S = h.X('sie'), T = h.X('s7');
      return `
<h2>Side by side</h2>
${h.table(['', 'SIE', 'Series 7'], [
  ['Purpose', 'general industry knowledge', 'qualification as a general securities representative'],
  ['Who can enroll', `anyone aged ${S.minAge} or over`, 'a candidate sponsored by a member firm'],
  ['Scored questions', `${S.scored} (+${S.unscored} unscored)`, `${T.scored} (+${T.unscored} unscored)`],
  ['Time', h.hours('sie'), h.hours('s7')],
  ['Passing score', `${S.passScore} (scaled)`, `${T.passScore} (scaled)`],
  ['Fee, 2026', h.usd(S.fee), h.usd(T.fee)],
  ['Online delivery', 'yes, for any enrolled candidate', 'only with an approved accommodation'],
  ['Validity of a pass', `${S.validYears} years before registration`, `lapses after ${h.P.lapseYears} years without a registration`],
], `FINRA exam pages for the ${h.src('finra_sie', 'SIE')} and the ${h.src('finra_s7', 'Series 7')}; ${h.src('finra_1210', 'Rule 1210')}. Read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Why there are two exams</h2>
<p>Before the SIE existed, every representative exam repeated the same basic knowledge. FINRA moved that common base into one exam that people can take before they have a job, and cut the representative exams down to what each role needs. The result is that the SIE can be passed by a student, a career changer or anyone curious about the industry, while the Series 7 stays tied to a firm that will supervise the new representative. The categories of registration that the exams lead to are defined in ${h.src('finra_1220', 'FINRA Rule 1220')}.</p>
<h3>What each one tests</h3>
<p>The SIE asks what things are: what a bond is, what a stop order does, what a representative must report. The Series 7 asks what to do: which product suits a retired customer, how an options position behaves, what a trade confirmation must show. Its largest function, giving information about investments and making recommendations, alone carries ${h.weight('s7', 'F3').items} of the ${T.scored} scored questions. The five questions under this text come from the Series 7 pool, to show the step up.</p>
<h3>Exam day differences</h3>
<p>The SIE can be taken online from home by any enrolled candidate, while the Series 7 is normally sat at a test center, with online delivery only through an approved accommodation (${h.P.online.others}). The Series 7 sitting is also more than twice as long, so stamina becomes part of the preparation in a way it rarely is for the SIE.</p>
<h2>The usual order</h2>
<ol>
<li><strong>SIE, on your own.</strong> Enroll, pay ${h.usd(S.fee)} and pass it, ideally not long before you apply for jobs, since the pass lasts ${S.validYears} years.</li>
<li><strong>Series 7, sponsored.</strong> Once hired, the firm files the enrollment; the ${h.a('sponsorship', 'sponsorship page')} covers what that involves.</li>
<li><strong>State exam.</strong> Most states then require the Series 63, or the Series 66 for representatives who will also act as adviser representatives.</li>
</ol>
<p>The finder at the top of the page builds this path for other roles too. For example, a representative who will sell only funds and variable annuities takes the ${h.a('series-6-exam', 'Series 6')} instead of the Series 7, still with the SIE.</p>
<h2>Preparing for both</h2>
<p>Study the SIE as a foundation rather than a hurdle: the vocabulary you build there is reused on the Series 7, and weak spots carried over become expensive later, when the Series 7 tests the same ideas in harder scenarios. Use the ${h.a('sie-exam', 'SIE guide')} and its section pages first; then the ${h.a('series-7-exam', 'Series 7 guide')} once a firm has enrolled you. The ${h.a('which-license', 'license finder')} covers every role from fund representative to adviser.</p>`;
    },
  },
});
