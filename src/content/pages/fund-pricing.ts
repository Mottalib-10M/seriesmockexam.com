import { definePage } from '../../lib/guide-types';
import { pop, chargeOf } from '../../lib/engine/money';

export default definePage({
  id: 'fund-pricing',
  group: 'math',
  order: 50,
  tool: { kind: 'mini:nav' },
  mini: { kind: 'mini:chargepct' },
  related: ['series-6-exam', 'series-6-practice-exam', 'sie-products', 'muni-bond-math'],
  sources: ['finra_2341', 'finra_s6_outline', 'finra_sie_outline'],
  en: {
    slug: 'fund-pricing',
    nav: 'Mutual fund pricing',
    card: 'Net asset value, public offering price, sales charge percentage and breakpoints of a mutual fund, calculated.',
    title: 'Mutual Fund Pricing: NAV, Offering Price and Sales Charge',
    description: 'Mutual fund pricing for the Series 6, 7 and SIE: NAV, offering price, sales charge as a share of the offering price, breakpoints and the Rule 2341 caps.',
    h1: 'Mutual fund pricing: NAV, offering price and sales charges',
    intro: 'Enter a NAV and a sales charge: the calculator gives the offering price, the charge per share and the shares an amount buys.',
    resume: (h) => {
      const F = h.P.funds;
      return `Mutual fund pricing is the core arithmetic of the Series 6 and appears on the Series 7 and the SIE as well. A fund's net asset value per share is its assets minus its liabilities, divided by the shares outstanding, and it is computed after the market closes each business day. An investor buying Class A shares pays the public offering price, which is the NAV plus a front-end sales charge. The charge is expressed as a percentage of the offering price, not of the NAV, so the offering price is the NAV divided by one minus the charge: a NAV of $19 with a 5% charge gives ${h.usd(pop(19, 5), 2)}. The other way round, a NAV of $18.60 and an offering price of $20 mean a charge of ${h.pc(chargeOf(18.6, 20), 2)}. FINRA Rule 2341 caps the total sales charge at ${F.maxSalesCharge}% of the offering price (${h.src('finra_2341', 'Rule 2341')}), and the cap falls to ${F.maxNoBreakpoints}% for a fund that offers neither breakpoints nor rights of accumulation. Purchases are made at the next price computed after the order arrives, never at a past price.`;
    },
    faqs: (h) => [
      { q: 'What is forward pricing?', a: 'A mutual fund order is executed at the next net asset value computed after the fund receives it, not at the price of the previous close. An order placed in the morning gets that afternoon\'s price; one placed after the cutoff waits for the next day\'s. This prevents investors from trading on stale prices known in advance.' },
      { q: 'What is a breakpoint sale, and why is it a violation?', a: 'A breakpoint is an amount from which a fund lowers its sales charge. Recommending a purchase just below a breakpoint, or splitting an order between funds of different families so that the customer misses it, earns the representative a higher charge at the customer\'s expense. FINRA treats this as a sales practice violation.' },
      { q: 'Do Class B and C shares have an offering price above NAV?', a: 'No. Class B and C shares are usually bought at the net asset value; instead of a front-end charge they carry a contingent deferred sales charge on early redemptions and higher yearly 12b-1 fees. The total charge is still subject to the limits of Rule 2341, and the choice of class depends on the amount and the holding period.' },
    ],
    body: (h) => {
      const F = h.P.funds;
      return `
<h2>From NAV to offering price</h2>
${h.table(['NAV', 'Sales charge', 'Offering price', 'Charge per share', 'Charge as % of NAV'], [[19, 5], [19, 3.5], [25, 5.75], [10, 2]].map(([n, c]) => [h.usd(n, 2), `${h.num(c, 2)}%`, h.usd(pop(n, c), 2), h.usd(pop(n, c) - n, 2), h.pc((pop(n, c) - n) / n, 2)]), 'Computed by our calculator. The charge as a share of the NAV is always higher than the stated charge.', ['r', 'r', 'r', 'r', 'r'])}
<p>That last column is a classic trap. A 5% sales charge on the offering price equals ${h.pc((pop(19, 5) - 19) / 19, 2)} of the money that ends up invested. Exams state the charge as a percentage of the offering price, as Rule 2341 does.</p>
<h2>The caps of Rule 2341</h2>
${h.table(['Fund features', 'Maximum sales charge'], [
  ['Breakpoints and rights of accumulation offered', `${F.maxSalesCharge}% of the offering price`],
  ['No rights of accumulation', `${F.maxNoRoA}%`],
  ['No breakpoints, rights of accumulation offered', `${F.maxNoBreakpointsWithRoA}%`],
  ['Neither breakpoints nor rights of accumulation', `${F.maxNoBreakpoints}%`],
  ['Fund paying a service fee', `${F.maxWithServiceFee}%`],
], `${h.src('finra_2341', 'FINRA Rule 2341')}(d), read on ${h.date(h.P.retrieved_at)}, for funds without an asset-based sales charge.`, ['l', 'r'])}
<h2>Ways a customer reaches a lower charge</h2>
<ul>
<li><strong>Breakpoints:</strong> a lower percentage from a set purchase amount.</li>
<li><strong>Rights of accumulation:</strong> past purchases and the current value of holdings in the same fund family count towards the next breakpoint.</li>
<li><strong>Letter of intent:</strong> the customer states an amount to invest over a period, usually 13 months, and gets the breakpoint at once; shares are held in escrow in case the amount is not reached.</li>
</ul>
<p>The Series 6 outline places these in its investments and recommendations function, the heaviest with ${h.weight('s6', 'F3').items} of ${h.X('s6').scored} scored questions (${h.src('finra_s6_outline', 'Series 6 outline')}). The SIE asks about investment company structure and the meaning of NAV in its products section (${h.src('finra_sie_outline', 'SIE outline')}).</p>
<h2>Redemptions</h2>
<p>A shareholder who sells shares back to the fund receives the next computed NAV, minus any redemption fee or deferred sales charge. The fund must pay within seven days of receiving the request. Exchanges within the same fund family are usually made at NAV without a new sales charge, but they are taxable events: selling one fund to buy another realises a gain or loss.</p>
<h2>Practice next</h2>
<p>The ${h.a('series-6-exam', 'Series 6 page')} has a practice quiz on the whole outline and the ${h.a('series-6-practice-exam', 'Series 6 mock exam')} runs the full ${h.X('s6').scored} questions under time. For the tax side of fixed income, see ${h.a('muni-bond-math', 'municipal bond math')}.</p>
<h2>Share classes compared</h2>
<p>Class A shares carry the front-end charge described above and usually lower yearly expenses, with breakpoints that reward larger purchases. Class B shares, now rare, have no front-end charge but a deferred sales charge that declines over several years, and often convert to Class A later. Class C shares have a small or no front-end charge, a short deferred charge and higher yearly 12b-1 fees for as long as they are held. The exams ask which class suits a customer: large amounts and long holding periods point to Class A, short horizons to Class C.</p>
<p>Whatever the class, the customer must receive the prospectus, which sets out the charges, and the representative must check that the class fits the amount and the horizon; recommending a class only because it pays more is a suitability problem.</p>`;
    },
  },
});
