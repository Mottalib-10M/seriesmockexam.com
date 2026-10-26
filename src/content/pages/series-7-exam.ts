import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-exam',
  group: 'series',
  order: 10,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:passline', props: { e: 1, r: 92 } },
  related: ['series-7-practice-test', 'series-7-practice-exam', 'series-7-passing-score', 'sie-vs-series-7', 'options-math'],
  sources: ['finra_s7', 'finra_s7_outline', 'finra_fees', 'finra_1220'],
  en: {
    slug: 'series-7-exam',
    nav: 'Series 7 exam guide',
    card: 'The General Securities Representative exam in 2026: 125 questions, four job functions, fee, sponsorship and the SIE corequisite.',
    title: 'Series 7 Exam 2026: Format, Functions, Fee and Practice',
    description: 'Series 7 exam 2026: 125 scored questions in 3 hours 45, a scaled pass of 72, a $395 fee, firm sponsorship and the SIE corequisite, with free practice.',
    h1: 'The Series 7 exam in 2026',
    intro: 'Ten questions drawn from the four job functions of the official outline, corrected one by one. Below: the format, the weights, the fee and how to plan the work.',
    resume: (h) => {
      const S = h.X('s7');
      return `The Series 7, or General Securities Representative exam, is the FINRA exam that qualifies a person to sell almost every kind of security: stocks, corporate and municipal bonds, options, investment company products, variable contracts and direct participation programs. It is the broadest representative exam, with ${S.scored} scored questions plus ${S.unscored} unscored ones, ${h.hours('s7')} to answer them, and a scaled passing score of ${S.passScore} (${h.src('finra_s7', 'FINRA Series 7 page')}). Since ${h.date(h.P.feeIncrease.effective)} it costs ${h.usd(S.fee)}, against ${h.usd(S.feePrev!)} before. Unlike the SIE, it needs a sponsoring FINRA member firm, and the SIE is its corequisite: both must be passed before the registration is approved. The outline organises the content by the four functions of a representative's job, and one of them dominates: providing information about investments, making recommendations and maintaining records carries ${h.weight('s7', 'F3').items} of the ${S.scored} scored questions, about ${h.pc(h.weight('s7', 'F3').share)} of the exam.`;
    },
    faqs: (h) => [
      { q: 'How many questions are on the Series 7?', a: `${h.X('s7').scored + h.X('s7').unscored} questions appear on screen: ${h.X('s7').scored} are scored and ${h.X('s7').unscored} are unscored pretest items that look like the others. You have ${h.hours('s7')} for all of them, which leaves a little over a minute and a half per question on average. Calculation questions take longer, definitions much less.` },
      { q: 'Can I take the Series 7 before the SIE?', a: 'Yes. The SIE is a corequisite, not a prerequisite: FINRA lets candidates pass the two in either order, but the registration as a general securities representative is approved only when both are passed. Most people still take the SIE first, on their own, because it does not need the firm and covers the vocabulary the Series 7 assumes.' },
      { q: 'Which topics carry the most Series 7 questions?', a: `The third function, about investment information, recommendations and records, carries ${h.weight('s7', 'F3').items} questions: equities, debt, options, packaged products, suitability, taxation and account statements. Opening accounts carries ${h.weight('s7', 'F2').items}, orders and transactions ${h.weight('s7', 'F4').items}, and seeking business ${h.weight('s7', 'F1').items}. Options and municipal securities are the subjects candidates most often find hard.` },
    ],
    body: (h) => {
      const S = h.X('s7');
      const pages = ['series-7-seeking-business', 'series-7-opening-accounts', 'series-7-investments', 'series-7-orders'];
      const rows = S.sections.map((s, i) => [s.code, h.a(pages[i], h.short('s7', s.code)), s.items, h.pc(s.items / S.scored), h.inPool('s7', s.code)]);
      return `
<h2>The Series 7 in figures</h2>
${h.table(['', 'Series 7, 2026'], [
  ['Questions', h.items('s7')],
  ['Time', h.hours('s7')],
  ['Passing score', `${S.passScore} (scaled)`],
  ['Fee', `${h.usd(S.fee)} (${h.usd(S.feePrev!)} until the end of 2025)`],
  ['Sponsoring firm', 'required'],
  ['Corequisite', 'SIE'],
], `Read on the ${h.src('finra_s7', 'FINRA Series 7 page')} on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<h2>The four job functions</h2>
<p>FINRA's ${h.src('finra_s7_outline', 'content outline')} describes the exam as the tasks of a representative, from finding customers to settling their trades. Each function has a fixed number of scored questions and its own practice page here.</p>
${h.table(['Function', 'Subject', 'Scored questions', 'Share', 'Our questions'], rows, 'Outline edition of October 2025. Our pools include questions shared with the SIE and Series 6.', ['l', 'l', 'r', 'r', 'r'])}
<p>The imbalance is the key planning fact. A candidate can be weak on communications rules and still pass, but not weak on options, bonds or suitability, since they all sit in the third function. The other three functions are smaller but rule-heavy: they reward precise knowledge of what must be signed, approved, disclosed or reported, and when.</p>
<h2>Who takes it, and how it is registered</h2>
<p>Under ${h.src('finra_1220', 'FINRA Rule 1220')}, the general securities representative category covers almost all securities business with customers, apart from a few specialised areas with their own exams. A firm hires you, files your registration on Form U4, and the enrollment follows with a ${h.P.windowDays}-day window to sit the exam. Many firms add a state registration, which brings the ${h.a('series-63-exam', 'Series 63')} or the ${h.a('series-66-exam', 'Series 66')}. The ${h.a('sponsorship', 'sponsorship page')} explains the filings.</p>
<h2>How to prepare</h2>
<h3>Start from the SIE level</h3>
<p>The Series 7 assumes the SIE vocabulary and goes deeper: where the SIE asks what a covered call is, the Series 7 asks for its breakeven and the customer's maximum gain. If your SIE is recent, begin with the third function directly; if not, a few SIE practice sets on products are a useful warm-up.</p>
<h3>Work the math early</h3>
<p>Options, margin, bond yields and fund pricing are where points are lost to arithmetic slips. Each has a calculator here: ${h.a('options-math', 'options')}, ${h.a('margin-math', 'margin')}, ${h.a('bond-yields', 'bond yields')}, ${h.a('muni-bond-math', 'municipal bonds')} and ${h.a('fund-pricing', 'fund pricing')}.</p>
<h3>Then full mocks</h3>
<p>When each function sits above the line in practice, take the ${h.a('series-7-practice-exam', 'full timed mock')}: ${S.scored} questions in the official proportions. Plan for several, spaced out, and use the ${h.a('review-mistakes', 'review page')} between them. The ${h.a('series-7-study-time', 'study planner')} turns your available hours into a date to book.</p>
<h2>After the exam</h2>
<p>A pass, combined with the SIE, lets the firm complete your registration. A failure triggers a wait of ${h.P.retake.finra.firstAndSecondDays} days before a second attempt, shortened to ${h.P.retake.finraFrom.firstAndSecondDays} days from ${h.date(h.P.retake.finraFrom.date)}, and a new fee (${h.a('retake-rules', 'retake calculator')}). The registration then carries yearly ${h.a('continuing-education', 'continuing education')}.</p>
<h2>How the Series 7 differs from the SIE</h2>
<p>The SIE checks that a candidate knows what products and rules exist; the Series 7 checks that a representative can apply them to a customer. Questions often describe an account, a goal and a recommendation, and ask what the representative must do, what the customer must receive or which choice is suitable. That is why reading the explanation of each practice question matters more here than on the SIE: the reasoning, not the definition, is what the exam rewards. The ${h.a('sie-vs-series-7', 'comparison page')} sets the two exams side by side, with their fees, lengths and lines.</p>`;
    },
  },
});
