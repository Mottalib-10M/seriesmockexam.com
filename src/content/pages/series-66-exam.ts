import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-66-exam',
  group: 'state',
  order: 30,
  tool: { kind: 'quiz', props: { exam: 's66', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:passline', props: { e: 5, r: 75 } },
  related: ['series-66-practice-exam', 'series-63-exam', 'series-65-exam', 'series-7-exam', 'which-license'],
  sources: ['finra_s66', 'nasaa_s66_guide'],
  en: {
    slug: 'series-66-exam',
    nav: 'Series 66 exam guide',
    card: 'The Series 66 combined state law exam: for Series 7 holders who act as both agent and adviser representative, 73 of 100 to pass.',
    title: 'Series 66 Exam 2026: Combined State Law Test, Format, Fee',
    description: 'Series 66 exam 2026: the combined NASAA state law test for Series 7 holders, 100 scored questions in 150 minutes, 73 correct to pass, a $177 fee, free practice.',
    h1: 'The Series 66 exam: one test for agent and adviser',
    intro: 'Ten corrected questions from the Series 66 pool; the menu narrows them to one subject. Who the exam is for and what it weighs are explained below.',
    resume: (h) => {
      const X = h.X('s66');
      return `The Series 66, the Uniform Combined State Law Examination, is built for one situation: a representative who will both sell securities as an agent of a broker-dealer and give advice for a fee as an investment adviser representative. For such a dual registrant, it covers in one sitting what would otherwise take the Series 63 and the Series 65, but it counts only together with the Series 7, its corequisite (${h.src('finra_s66', 'FINRA Series 66 page')}). NASAA writes the exam and FINRA delivers it. It has ${X.scored} scored questions and ${X.unscored} pretest items in ${X.minutes} minutes, and a candidate passes with at least ${X.passCorrect} correct answers out of the ${X.scored} scored. The fee is ${h.usd(X.fee)} in 2026. The ${h.src('nasaa_s66_guide', 'NASAA study guide')} uses the same four subjects as the Series 65, with very different weights: laws, regulations and ethics take ${h.weight('s66', '4').items} questions, nearly half the exam, recommendations and strategies ${h.weight('s66', '3').items}, investment vehicles ${h.weight('s66', '2').items} and analytical methods only ${h.weight('s66', '1').items}. The investment content is lighter because the Series 7 already tests it.`;
    },
    faqs: (h) => [
      { q: 'Does the Series 66 replace both the 63 and the 65?', a: 'For a candidate who also holds the Series 7, it generally serves for both the agent and the adviser representative registrations, which is its purpose. Without the Series 7, it does not qualify anyone, and an adviser who will not sell on commission should take the Series 65. Each state decides its own requirements, so your firm confirms which exam it files for each state.' },
      { q: 'Can I take the Series 66 before the Series 7?', a: 'Enrolling does not require the Series 7 to be passed first, since the Series 7 is a corequisite rather than a prerequisite, but the Series 66 only supports a registration once the Series 7 is also passed. In practice most candidates take the Series 7 first, because its preparation covers the investment material the Series 66 then assumes.' },
      { q: 'Is the Series 66 easier than the Series 65?', a: `It is shorter, ${h.X('s66').scored} scored questions against ${h.X('s65').scored}, with less economics and fewer product questions. In exchange, the legal and ethics subject weighs ${h.pc(h.weight('s66', '4').share)} of the exam, and its pass line sits at ${h.pc(h.X('s66').passCorrect! / h.X('s66').scored)} of the scored questions. Candidates strong on products but loose on state law often find it harder than expected.` },
    ],
    body: (h) => {
      const X = h.X('s66');
      const Y = h.X('s65');
      const rows = X.sections.map((s, i) => [h.short('s66', s.code), s.items, Y.sections[i].items, h.inPool('s66', s.code)]);
      return `
<h2>Series 66 against Series 65</h2>
${h.table(['Subject', 'Series 66', 'Series 65', 'Our Series 66 pool'], rows, 'Questions per subject from the NASAA study guides of 2023; many of our questions are shared between the two exams and the Series 63.', ['l', 'r', 'r', 'r'])}
<p>The table explains the logic of the exam. The Series 66 keeps the full legal content of the adviser exam and the agent exam, then trims economics and products, which a Series 7 holder has already been tested on. Economics on the Series 66 is limited to analytical methods: time value of money, basic statistics, risk-adjusted measures and financial ratios. Investment vehicles focus on valuation and the characteristics of funds, equities and alternatives rather than the full catalog.</p>
<h2>Who takes it</h2>
${h.table(['', 'Series 66, 2026'], [
  ['Questions', h.items('s66')],
  ['Time', `${X.minutes} minutes (${h.hours('s66')})`],
  ['To pass', `${X.passCorrect} of ${X.scored} correct`],
  ['Fee', h.usd(X.fee)],
  ['Corequisite', 'Series 7'],
], `FINRA Series 66 page and NASAA study guide, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>The typical candidate is a broker who also wants to charge advisory fees, for instance on managed accounts, and who works for a firm registered both as a broker-dealer and as an investment adviser. For such a person, sitting one exam of ${X.scored} questions instead of the ${h.X('s63').scored} of the ${h.a('series-63-exam', 'Series 63')} plus the ${Y.scored} of the ${h.a('series-65-exam', 'Series 65')} saves time, and ${h.usd(X.fee)} in fees instead of ${h.usd(h.X('s63').fee + Y.fee)} for the pair in 2026. The ${h.a('which-license', 'license finder')} shows the full path.</p>
<h2>What the law subject covers</h2>
<p>The ${h.weight('s66', '4').items} law and ethics questions decide the exam. They cover the registration of advisers, adviser representatives, broker-dealers and agents under the Uniform Securities Act and federal law, the line between state and federal oversight of advisers, the registration of securities and exemptions, the administrator's remedies and powers, communications with clients, and ethical practices and fiduciary duty. The questions are dense with definitions: who is excluded from the definition of an adviser, which transactions are exempt, what an adviser must disclose in a contract.</p>
<h3>A study order that fits</h3>
<p>Start with the law, in the order of the definitions: person, security, agent, broker-dealer, adviser, adviser representative. Then the exclusions and exemptions, then the ethics rules. Only after that, the recommendations subject, which applies the law to client situations. Keep analytical methods for short daily sets once formulas are learned.</p>
<p>As with the other NASAA exams, passing does not by itself let you do business: the agent and adviser representative registrations are filed state by state through your firm, and each state decides which exams it accepts. A candidate who changes roles later, for example by dropping the brokerage side, keeps the exam on record but should check with the new firm how each state treats it.</p>
<h2>Practice on this page</h2>
<p>The set at the top draws from ${h.inPool('s66')} questions tagged for this exam, including many shared with the Series 63 and 65 where the topic is the same. The calculator under this text checks a mock score against the line of ${X.passCorrect}, exact because NASAA scores on a count. When every subject runs above it, sit the ${h.a('series-66-practice-exam', 'full timed mock')}. The ${h.a('series-7-exam', 'Series 7 guide')} covers the corequisite.</p>`;
    },
  },
});
