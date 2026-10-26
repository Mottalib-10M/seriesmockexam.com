import { definePage } from '../../lib/guide-types';
import { pop } from '../../lib/engine/money';

export default definePage({
  id: 'series-6-exam',
  group: 'series',
  order: 40,
  tool: { kind: 'quiz', props: { exam: 's6', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:nav' },
  related: ['series-6-practice-exam', 'fund-pricing', 'which-license', 'sie-exam', 'series-7-exam'],
  sources: ['finra_s6', 'finra_s6_outline', 'finra_1220', 'finra_2341'],
  en: {
    slug: 'series-6-exam',
    nav: 'Series 6 exam guide',
    card: 'The Investment Company and Variable Contracts Products Representative exam: 50 questions, the products it covers, fee and sponsorship.',
    title: 'Series 6 Exam 2026: Format, Products Covered and Practice',
    description: 'Series 6 exam 2026: 50 scored questions in 90 minutes, a scaled pass of 70, fee, sponsorship and SIE corequisite, the funds and annuities it covers, practice.',
    h1: 'The Series 6 exam in 2026',
    intro: 'Ten practice questions across the Series 6 outline, each corrected at once. Below: who needs this license, what it allows you to sell and how the exam is built.',
    resume: (h) => {
      const S = h.X('s6');
      return `The Series 6, FINRA's Investment Company and Variable Contracts Products Representative exam, qualifies a person to sell a narrower range than the Series 7: mutual funds and other open-end investment company shares, closed-end funds during their initial offering, and variable annuities and variable life insurance. It is the exam of many bank and insurance-based representatives whose business centers on packaged products. The format is short: ${S.scored} scored questions plus ${S.unscored} unscored ones, ${h.hours('s6')} to answer them, and a scaled passing score of ${S.passScore} (${h.src('finra_s6', 'FINRA Series 6 page')}). Since ${h.date(h.P.feeIncrease.effective)} it costs ${h.usd(S.fee)}, up from ${h.usd(S.feePrev!)}. Like the Series 7, it needs a sponsoring FINRA member firm, and the SIE is its corequisite: both must be passed for the registration. The ${h.src('finra_s6_outline', 'content outline')} follows the same four job functions as the Series 7, with different weights: investment information and recommendations carries ${h.weight('s6', 'F3').items} items, half the exam, and seeking business ${h.weight('s6', 'F1').items}, a much larger share than on the Series 7.`;
    },
    faqs: (h) => [
      { q: 'What can I sell with a Series 6 license?', a: 'Open-end investment company shares such as mutual funds, closed-end fund shares during their initial distribution, and variable contracts such as variable annuities and variable life insurance, within the category FINRA Rule 1220 defines. Individual stocks, corporate or municipal bonds, options and direct participation programs need a broader registration, usually the Series 7. Variable insurance products also require a state insurance license.' },
      { q: 'Do I need the Series 6 if I already hold the Series 7?', a: 'No. The general securities representative registration earned with the Series 7 already covers the investment company and variable contract products of the Series 6. Candidates choose the Series 6 when their firm limits them to packaged products, often in a bank or insurance setting, because it is shorter and focused on what they will actually sell.' },
      { q: 'Why does seeking business weigh more on the Series 6?', a: `Because a Series 6 representative spends much of the job presenting funds and annuities to the public. The outline gives ${h.weight('s6', 'F1').items} of ${h.X('s6').scored} items to that function, against a much smaller share on the Series 7. Expect questions on communications rules, prospectus delivery, fund advertising and the content of sales material, rather than on underwriting mechanics.` },
    ],
    body: (h) => {
      const S = h.X('s6');
      const s7 = h.X('s7');
      const rows = S.sections.map((s, i) => [s.code, h.short('s6', s.code), s.items, h.pc(s.items / S.scored), h.pc(s7.sections[i].items / s7.scored), h.inPool('s6', s.code)]);
      return `
<h2>The Series 6 in figures</h2>
${h.table(['', 'Series 6, 2026'], [
  ['Questions', h.items('s6')],
  ['Time', h.hours('s6')],
  ['Passing score', `${S.passScore} (scaled)`],
  ['Fee', `${h.usd(S.fee)} (${h.usd(S.feePrev!)} until the end of 2025)`],
  ['Sponsoring firm', 'required'],
  ['Corequisite', 'SIE'],
], `Read on the ${h.src('finra_s6', 'FINRA Series 6 page')} on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<h2>Same four functions, different balance</h2>
<p>The outline borrows the structure of the Series 7: seeking business, opening accounts, providing information and recommendations, processing transactions. What changes is the weight of each and the products behind them.</p>
${h.table(['Function', 'Subject', 'Series 6 items', 'Share on the Series 6', 'Share on the Series 7', 'Our questions'], rows, 'Weights from the FINRA outlines. Our pool includes questions shared with the SIE and the Series 7 where the topic is the same.', ['l', 'l', 'r', 'r', 'r', 'r'])}
<p>The comparison shows the character of the exam. Seeking business and account opening together take a far larger share than on the Series 7, so rules about communications, prospectuses, customer information and suitability matter more. The products function is still the largest, but its content is concentrated on funds, variable contracts and municipal fund securities such as 529 plans.</p>
<h2>What the products function asks</h2>
<h3>Investment companies</h3>
<p>Open-end and closed-end structures, unit investment trusts and ETFs, fund objectives from growth to balanced and money market, share classes, 12b-1 fees, breakpoints, letters of intent, rights of accumulation and redemptions. The outline also names market timing and late trading among the sales practices to know.</p>
<h3>Variable contracts</h3>
<p>Separate accounts, accumulation units and annuity units, the assumed interest rate and its effect on payments, death benefits and riders, exchanges between annuities, and the tax treatment during accumulation, at annuitization and on surrender.</p>
<h3>Fund pricing</h3>
<p>The arithmetic of the Series 6 is mostly about prices. A fund with a net asset value of ${h.usd(20)} and a 5% sales charge has a public offering price of ${h.usd(pop(20, 5), 2)}, because the charge is a percentage of the offering price, not of the NAV. FINRA Rule 2341 caps the charge at ${h.P.funds.maxSalesCharge}% of the offering price (${h.src('finra_2341', 'Rule 2341')}). The calculator under the citable block does the computation for any NAV, charge and amount; the ${h.a('fund-pricing', 'fund pricing page')} adds the reverse calculation and the other caps.</p>
<h2>Who takes the Series 6</h2>
<p>Under ${h.src('finra_1220', 'FINRA Rule 1220')}, the investment company and variable contracts products representative is a limited category: the registration covers those products and nothing more. If your role may grow into stocks, bonds or options, the ${h.a('series-7-exam', 'Series 7')} may be the better first step; the ${h.a('which-license', 'license finder')} compares the paths. Most states also ask for a state law exam, often the ${h.a('series-63-exam', 'Series 63')}. Once registered, a representative who later moves into supervision can take the Series 26, the principal exam for this product range, which costs ${h.usd(h.P.otherFees2026.s26)} in 2026.</p>
<h3>Accounts and suitability</h3>
<p>The account opening function covers the same ground as on the Series 7 with a fund and annuity slant: registration types, retirement plans and rollovers, customer identification, privacy notices, and the investment profile behind a recommendation. Questions often ask which share class or which product suits a customer of a given age, horizon and amount, and whether an annuity exchange is in the customer's interest.</p>
<h2>Preparing for it</h2>
<p>Start from the ${h.a('sie-exam', 'SIE')} if it is not yet passed: much of the Series 6 vocabulary comes from it. Then work the practice sets above function by function, with extra time on the communication rules and on fund pricing, and finish with the ${h.a('series-6-practice-exam', 'timed Series 6 mock')} of ${S.scored} questions in the official proportions.</p>`;
    },
  },
});
