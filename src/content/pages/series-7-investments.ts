import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-investments',
  group: 'series',
  order: 22,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', section: 'F3' } },
  mini: { kind: 'mini:options' },
  related: ['series-7-questions', 'options-math', 'bond-yields', 'muni-bond-math', 'fund-pricing', 'series-7-practice-test'],
  sources: ['finra_s7_outline', 'finra_s7'],
  en: {
    slug: 'series-7-exam/investments-and-recommendations',
    nav: 'Series 7: investments',
    card: 'Function 3 of the Series 7, the heaviest by far: products, options, bonds, suitability, taxes and account records.',
    title: 'Series 7 Investments and Recommendations: Function 3 Notes',
    description: 'Series 7 function 3, investments and recommendations: what its four parts cover, the products and strategies tested, a covered call worked out, free practice.',
    h1: 'Series 7 function 3: investments and recommendations',
    intro: 'Practice questions on products, strategies and suitability, corrected as you go. Below: the map of the function and where to spend the most hours.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F3');
      return `Function 3 is the Series 7. FINRA's ${h.src('finra_s7_outline', 'content outline')} assigns it ${w.items} of the ${S.scored} scored items, about ${h.pc(w.share)} of the exam, well over twice the other three functions combined. Its title lists four tasks: informing customers about investments, recommending them, transferring assets and keeping records. In practice it is a tour of every product a general securities representative may sell, with the analysis that justifies a recommendation. Equity questions range from the rights of common and preferred holders to penny stock rules and cost basis. Packaged products cover mutual funds, ETFs, unit investment trusts, variable annuities, REITs and direct participation programs. Options run from contract terms to spreads, straddles and their tax treatment. Debt covers corporate, Treasury, agency and municipal securities, with yields, call features and the analysis of general obligation and revenue bonds. Around these sit suitability, required disclosures, market and technical analysis, and the records a customer receives. Our pool holds ${h.inPool('s7', 'F3')} questions for it, the largest set on the site.`;
    },
    faqs: (h) => [
      { q: 'Which product family weighs most inside function 3?', a: 'FINRA gives a single item count for the whole function and no split by product, so any ranking inside it is a judgment. The outline is longest on municipal securities, options and packaged products, which suggests where the variety of items lies. A balanced plan covers each family, and spends extra time where the arithmetic is: options, yields and fund pricing.' },
      { q: 'Does function 3 test Regulation Best Interest?', a: 'The outline places the reasonable-basis, customer-specific and quantitative care obligations, along with Regulation Best Interest, in the account opening function, while function 3 applies them to concrete product choices. In practice the two meet in scenario questions: a customer profile is given, and the item asks which recommendation fits it or which disclosure must accompany it.' },
      { q: 'How should I study options for the Series 7?', a: 'Start with the four single positions until breakeven, maximum gain and maximum loss come without thinking. Then build covered calls and protective puts, which add a stock position. Spreads and straddles come last, as two options read together. Tax treatment and contract adjustments are rules to learn once. Most options errors are sign errors, so write the debit or credit first.' },
    ],
    body: (h) => {
      const w = h.weight('s7', 'F3');
      const cost = 48, strike = 50, prem = 3;
      const be = cost - prem, maxGain = (strike - cost + prem) * 100, maxLoss = (cost - prem) * 100;
      return `
<h2>The four parts of function 3</h2>
${h.table(['Part', 'What it covers', 'How it tends to be asked'], [
  ['3.1 Information and analysis', 'customer factors, diversification, portfolio theory, financial statements and ratios', 'compute a ratio, pick the right measure of liquidity or risk'],
  ['3.2 Recommendations', 'equities, packaged products, options, debt, municipal, Treasury and agency securities, hedge funds, asset-backed securities', 'match a product to a profile, compute a yield or a breakeven'],
  ['3.3 Disclosures', 'risks, returns, costs and fees, gift and estate taxes, market and technical analysis', 'name the risk, the fee or the disclosure required'],
  ['3.4 Account information', 'confirmations, statements, transfers between firms, record retention, account closing', 'when and what the customer receives'],
], 'Our summary of the October 2025 outline; FINRA does not split the item count between the parts.', ['l', 'l', 'l'])}
<p>The outline wording for 3.2 runs over several pages, which tells you where the variety is. The other parts are shorter and closer to rules, so they suit short revision sessions between longer product blocks.</p>
<h2>Products, one family at a time</h2>
<h3>Equities</h3>
<p>Know the rights that come with common stock (voting, including cumulative voting, preemptive rights, a claim on residual assets), the variants of preferred stock, and what rights and warrants do to an existing holder. The tax side asks for cost basis after stock dividends, conversions, gifts and inheritance, and for the wash sale rule.</p>
<h3>Packaged products</h3>
<p>Open-end funds trade at the next computed net asset value plus any sales charge; closed-end funds and REITs trade in the market at a premium or discount. Variable annuities add accumulation units, annuity units and the assumed interest rate. Direct participation programs pass income and losses through to investors and are judged first on economic soundness. The ${h.a('fund-pricing', 'fund pricing page')} computes offering prices.</p>
<h3>Debt and municipal securities</h3>
<p>Corporate bonds bring mortgage bonds, debentures, convertibles and zero coupons; Treasuries bring bills, notes, bonds, STRIPS and TIPS. Municipal securities are the longest block of the outline: general obligation versus revenue bonds, short-term notes, refundings, call features, official statements and the tax rules for premiums and discounts. Use the ${h.a('bond-yields', 'bond yield calculator')} and the ${h.a('muni-bond-math', 'municipal bond page')} for the numbers.</p>
<h2>A covered call, worked out</h2>
<p>A customer owns 100 shares bought at ${h.usd(cost)} and writes one ${strike} call for a premium of ${h.usd(prem)}. The premium lowers the effective cost, so the breakeven is ${h.usd(cost)} minus ${h.usd(prem)}, or ${h.usd(be)}. If the stock rises above the strike, the shares are called away at ${h.usd(strike)}: the most the customer can make is the gain on the stock up to the strike plus the premium, ${h.usd(maxGain)} on the contract. If the stock falls to zero, the loss is the cost less the premium, ${h.usd(maxLoss)}. The strategy suits a customer who expects a flat or slightly rising market and wants income; it does not suit one seeking unlimited upside. The calculator under the citable block gives the same figures for a single option, without the stock, and the ${h.a('options-math', 'options math page')} covers the four basic positions in detail.</p>
<h2>Suitability as the common thread</h2>
<p>Almost every product question in function 3 can turn into a suitability question. A stem gives an age, an objective and a time horizon, then four products that are all legitimate in general. The right answer is the one that matches every fact: income without credit risk points to Treasuries, a high tax bracket to municipal bonds, a long horizon and a wish for growth to equity funds. Read the profile before the choices, and look for the one fact that disqualifies three of them.</p>
<h2>Planning around ${w.items} items</h2>
<p>A function this large deserves most of the study calendar and most of the practice sets. Work it in blocks by product family, with a practice set at the end of each block, and come back to earlier families every week so they do not fade. The full list of our questions with answers sits on the ${h.a('series-7-questions', 'sample questions page')}; the ${h.a('series-7-practice-test', 'practice test')} serves them ten at a time with corrections.</p>`;
    },
  },
});
