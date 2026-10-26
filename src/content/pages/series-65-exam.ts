import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-65-exam',
  group: 'state',
  order: 20,
  tool: { kind: 'quiz', props: { exam: 's65', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:passline', props: { e: 4, r: 95 } },
  related: ['series-65-practice-exam', 'series-65-passing-score', 'series-66-exam', 'which-license', 'bond-yields'],
  sources: ['finra_s65', 'nasaa_s65_guide'],
  en: {
    slug: 'series-65-exam',
    nav: 'Series 65 exam guide',
    card: 'The Series 65 for investment adviser representatives: four subjects, 92 of 130 to pass, no sponsor and no SIE needed, free practice.',
    title: 'Series 65 Exam 2026: Format, Topics, Fee and Free Practice',
    description: 'Series 65 exam 2026: the NASAA test for investment adviser representatives, 130 scored questions in 180 minutes, 92 correct to pass, a $187 fee, no sponsor.',
    h1: 'The Series 65 exam for investment adviser representatives',
    intro: 'Ten corrected questions from the Series 65 pool, with a menu to stay on one of the four subjects. The format and how to study it follow.',
    resume: (h) => {
      const X = h.X('s65');
      return `The Series 65, the Uniform Investment Adviser Law Examination, qualifies a person to register in most states as an investment adviser representative, someone who gives investment advice for a fee rather than earning commissions on sales. NASAA writes it and FINRA delivers it (${h.src('finra_s65', 'FINRA Series 65 page')}). No exam covered on this site has more scored questions: ${X.scored} of them plus ${X.unscored} pretest items, with ${X.minutes} minutes to answer them. The pass is a count, at least ${X.passCorrect} correct answers out of the ${X.scored} scored. The fee is ${h.usd(X.fee)} in 2026. Unlike the Series 7, it needs no sponsoring firm and no SIE: anyone can enroll and sit it on their own. The ${h.src('nasaa_s65_guide', 'NASAA study guide')} divides the exam into ${X.sections.length} subjects: economics and business information (${h.weight('s65', '1').items} questions), investment vehicles (${h.weight('s65', '2').items}), client recommendations and strategies (${h.weight('s65', '3').items}) and laws, regulations and ethics (${h.weight('s65', '4').items}). Half of it is therefore investment knowledge with real calculations, and half is advice and regulation, with the fiduciary duty of an adviser running through both.`;
    },
    faqs: (h) => [
      { q: 'Do I need the SIE or a sponsor to take the Series 65?', a: 'Neither. The Series 65 is a NASAA exam with no corequisite and no sponsorship requirement, so a candidate who is not associated with any firm can enroll through FINRA\'s system and pay the fee directly. The state registration as an investment adviser representative is a separate step, filed through the adviser firm you join or start.' },
      { q: 'How much math is on the Series 65?', a: 'More than on the SIE or the Series 63. The economics subject includes time value of money, net present value and internal rate of return, standard deviation, beta, alpha and the Sharpe ratio, plus financial and valuation ratios such as the current ratio and price to earnings. Bond yields and duration appear with investment vehicles. Calculations are short, but the concepts must be clear.' },
      { q: 'Who usually takes the Series 65 rather than the Series 66?', a: `People who will give advice for a fee without also selling securities on commission: financial planners, portfolio managers at small advisers, independent advisers starting their own firm. The Series 66 serves dual registrants and requires the Series 7 as well. A candidate without the Series 7 who wants an adviser registration takes the Series 65, ${h.X('s65').scored} scored questions.` },
    ],
    body: (h) => {
      const X = h.X('s65');
      const rows = X.sections.map((s) => [s.code, h.short('s65', s.code), s.items, h.pc(s.items / X.scored), h.inPool('s65', s.code)]);
      return `
<h2>The four subjects of the Series 65</h2>
${h.table(['', 'Subject', 'Questions', 'Share', 'In our pool'], rows, `Weights from the ${h.src('nasaa_s65_guide', 'NASAA study guide')} in force since 2023.`, ['l', 'l', 'r', 'r', 'r'])}
<h3>Economics and business information</h3>
<p>The business cycle, monetary and fiscal policy, inflation, interest rates and the yield curve, then reading financial statements, and a block of analytical methods: present and future value, internal rate of return, basic statistics and risk measures. It closes with systematic and unsystematic risk and the order of claims in a liquidation.</p>
<h3>Investment vehicles</h3>
<p>Cash equivalents, every family of bonds, stocks and how they are valued, pooled investments from mutual funds to private funds and REITs, options and futures, alternative investments and insurance-based products such as annuities. The angle is the adviser's: what each product does for a client, at what cost and with which risks.</p>
<h3>Client recommendations and strategies</h3>
<p>The largest subject along with the law. It starts from the client profile and objectives, then covers capital market theory, portfolio styles, taxes, retirement plans and ERISA, special account types, estate planning and trading, and how performance is measured. Many questions describe a client and ask for the most suitable approach.</p>
<h3>Laws, regulations and ethics</h3>
<p>Registration of advisers, their representatives, broker-dealers and agents under state and federal law, remedies and the powers of the state administrator, communications with clients, and above all ethical practices and fiduciary duty: disclosure of conflicts, custody, fees, contracts. NASAA's model rule on unethical practices of advisers and the Uniform Prudent Investor Act are named in the guide.</p>
<h2>Format and scoring</h2>
${h.table(['', 'Series 65, 2026'], [
  ['Questions', h.items('s65')],
  ['Time', `${X.minutes} minutes (${h.hours('s65')})`],
  ['To pass', `${X.passCorrect} of ${X.scored} correct`],
  ['Fee', h.usd(X.fee)],
  ['Sponsor or corequisite', 'none'],
  ['Book', 'closed; scratch paper on request'],
], `FINRA Series 65 page and NASAA study guide, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>Because the mark is a number of correct answers, our practice and mocks for this exam use the exact line. The calculator under this text checks a mock score against it; the ${h.a('series-65-passing-score', 'passing score page')} looks at the line in detail and explains why no official pass rate exists.</p>
<p>Passing the exam is one step, not the registration itself. NASAA's guide is explicit that a pass does not by itself allow anyone to do business in a state: the adviser representative registration is filed with each state where you will work, through the adviser firm, and each state applies its own requirements on top of the exam.</p>
<h2>Studying for the Series 65</h2>
<p>The exam rewards two different kinds of work. The law and ethics subject is about precise rules, best learned from the definitions outward, with a practice set after each topic. The investment subjects need understanding: why a bond's duration matters, what a beta of more than one means for a client, when an annuity makes sense. The ${h.a('bond-yields', 'bond yield page')} trains one of the recurring calculations. Start with the sets above by subject, then move to the ${h.a('series-65-practice-exam', 'full timed mock')} once each subject runs comfortably above the line. If you will also hold the Series 7, compare with the ${h.a('series-66-exam', 'Series 66')}; the ${h.a('which-license', 'license finder')} lays out both paths.</p>`;
    },
  },
});
