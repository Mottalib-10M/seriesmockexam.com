import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-products',
  group: 'sie',
  order: 21,
  tool: { kind: 'quiz', props: { exam: 'sie', section: '2' } },
  mini: { kind: 'mini:bondyield' },
  related: ['bond-yields', 'fund-pricing', 'options-math', 'sie-questions', 'muni-bond-math', 'sie-trading'],
  sources: ['finra_sie_outline', 'finra_2341'],
  en: {
    slug: 'sie-exam/products-and-risks',
    nav: 'SIE: products and risks',
    card: 'Section 2 of the SIE, the heaviest: stocks, bonds, options, funds, annuities, 529 plans, DPPs, REITs, ETFs and the risks of each.',
    title: 'SIE Products and Risks: Section 2 Notes and Practice Set',
    description: 'SIE section 2, Understanding Products and Their Risks: equities, debt, options, funds, 529 plans, REITs, ETFs and investment risks, with traps and practice.',
    h1: 'SIE section 2: products and their risks',
    intro: 'A practice set drawn only from the products section, the largest of the exam. Below, a product by product guide to what gets asked and where candidates slip.',
    resume: (h) => {
      const w = h.weight('sie', '2');
      return `Understanding Products and Their Risks is the second section of the SIE outline and the heaviest by far: ${w.items} of the ${h.X('sie').scored} scored questions, about ${h.pc(w.share)} of the exam. It asks you to know what each investment product is, how it pays, how it is priced and what can go wrong with it. Equities come first, with common and preferred stock, rights, warrants and ADRs. Debt follows: Treasury, agency, corporate and municipal bonds, plus money market instruments. Then options basics, packaged products (open-end and closed-end funds, unit investment trusts and variable annuities), municipal fund securities such as 529 plans and ABLE accounts, direct participation programs, REITs, hedge funds and exchange-traded products. The section closes with the types of investment risk and the ways to reduce them. Most questions compare two neighboring products or link a feature to a risk, and a few involve light math, such as a bond's current yield. Our pool holds ${h.inPool('sie', '2')} questions for this section, enough to work through it topic by topic.`;
    },
    faqs: (h) => [
      { q: 'How do rights and warrants differ on the SIE?', a: 'A right is offered to existing shareholders so they can keep their percentage when the company issues new shares; it lasts a few weeks and lets them buy below the market price. A warrant is long term, often attached to a bond or preferred issue as a sweetener, and its exercise price is set above the market price when it is issued.' },
      { q: 'Why can a closed-end fund trade below its NAV?', a: 'Because its shares trade on an exchange like a stock, at whatever price buyers and sellers agree on, and the fund does not redeem them. An open-end fund, by contrast, sells and redeems shares at net asset value, plus any sales charge on a purchase. So only the closed-end fund can show a premium or a discount to the value of its holdings.' },
      { q: 'What extra risk does an ETN carry compared with an ETF?', a: 'An exchange-traded note is an unsecured debt of the bank that issues it, promising a return linked to an index. If the issuer fails, holders are creditors and can lose money even if the index rose. An ETF owns a portfolio of securities held for its shareholders, so it carries market risk but not the credit risk of an issuing bank.' },
    ],
    body: (h) => `
<h2>Equities and debt</h2>
<p>Common stockholders own the company, vote for the board and are paid last in a liquidation; their loss is limited to what they invested. Preferred stock pays a fixed dividend ahead of common, and a cumulative issue must make up skipped dividends before common holders get anything. ADRs let US investors hold foreign shares in dollars, with currency risk built in.</p>
<p>On the debt side, learn the issuers and what backs them: Treasury securities carry the full faith of the US government; agency and mortgage-backed securities add prepayment risk; general obligation munis rest on taxing power, revenue bonds on the income of a project. The single most tested fact is that bond prices and interest rates move in opposite directions. The calculator under this text shows the related ordering: for a bond bought below par, the coupon is the lowest yield and the yield to maturity the highest; above par, the order flips. The ${h.a('bond-yields', 'bond yield page')} works through more cases.</p>
<h3>Traps in this block</h3>
<ul>
<li>Interest on most municipal bonds is free of federal income tax; interest on Treasury securities is taxed federally but not by the states.</li>
<li>A callable bond is likely to be called when rates fall, leaving the investor to reinvest at lower rates.</li>
<li>Ratings measure credit risk only, not interest rate risk.</li>
</ul>
<h2>Options and packaged products</h2>
<p>For options, the SIE stays at the level of vocabulary and simple positions: calls and puts, strike, premium, expiration, in and out of the money, covered and uncovered, American and European exercise, and the role of the Options Clearing Corporation. A customer must receive the options disclosure document before trading. The ${h.a('options-math', 'options page')} has a breakeven calculator for the four basic positions.</p>
<p>For investment companies, know the three types and how they are bought and sold, the share classes and their loads, and the ways to reduce a sales charge: breakpoints, a letter of intent and rights of accumulation. ${h.src('finra_2341', 'FINRA Rule 2341')} caps the sales charge at ${h.P.funds.maxSalesCharge}% of the offering price. Variable annuities add insurance features and surrender charges; their returns depend on subaccounts, so they carry market risk. The ${h.a('fund-pricing', 'fund pricing page')} computes an offering price from a NAV.</p>
<h2>Other products: 529 plans, DPPs, REITs, hedge funds, ETPs</h2>
<p>529 plans come as prepaid tuition or savings plans; the account owner, not the beneficiary, controls the money, and earnings used for qualified education costs escape federal tax. ABLE accounts serve people with disabilities. Direct participation programs, usually limited partnerships, pass income and losses straight through to investors and are generally illiquid. REITs pool real estate or mortgages and avoid double taxation when they distribute income. Hedge funds are private, with high minimums and limited liquidity. ETFs trade all day on an exchange, often track an index at low cost, and differ from ETNs in the way the FAQ below explains.</p>
<h2>Risks and how to reduce them</h2>
<p>The last block names the risks and asks which one a situation shows. Systematic or market risk hits all securities and cannot be diversified away; non-systematic risk belongs to one company or sector and can. Add credit, liquidity, interest rate, reinvestment, inflation (purchasing power), currency, political and prepayment risk. A long-term fixed-rate bond is the classic example of inflation and interest rate risk; a mortgage-backed security, of prepayment risk when rates fall. Diversification, rebalancing and hedging, for instance with a put, are the mitigation tools to know.</p>
<p>Given its weight, give this section the largest share of your study time and practice it in topic blocks before mixing. The ${h.a('sie-questions', 'sample questions page')} lists every question of the section with its answer for a reading pass.</p>`,
  },
});
