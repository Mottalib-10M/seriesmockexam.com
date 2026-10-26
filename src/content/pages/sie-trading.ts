import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-trading',
  group: 'sie',
  order: 22,
  tool: { kind: 'quiz', props: { exam: 'sie', section: '3' } },
  mini: { kind: 'mini:options' },
  related: ['options-math', 'margin-math', 'sie-products', 'sie-regulation', 'series-7-orders'],
  sources: ['finra_sie_outline', 'sec_t1', 'reg_t', 'finra_4210'],
  en: {
    slug: 'sie-exam/trading-and-accounts',
    nav: 'SIE: trading and accounts',
    card: 'Section 3 of the SIE: orders, returns, settlement, corporate actions, account types, AML, privacy and the activities that are forbidden.',
    title: 'SIE Trading, Accounts and Prohibited Activities: Section 3',
    description: 'SIE section 3: order types, dividends and settlement, corporate actions, account registrations, anti-money laundering and prohibited practices, plus practice.',
    h1: 'SIE section 3: trading, customer accounts and prohibited activities',
    intro: 'Questions from the third section only: orders, accounts, compliance and misconduct. The notes below sort the topics and flag the answers candidates confuse.',
    resume: (h) => {
      const w = h.weight('sie', '3');
      return `The third section of the SIE outline covers what happens once a customer decides to invest: how orders are entered and settled, what returns an investment produces, which account fits which customer, which compliance duties surround the account, and which practices are forbidden. It counts ${w.items} of the ${h.X('sie').scored} scored questions, about ${h.pc(w.share)} of the exam, second only to products. The material splits into three parts. Trading: market, limit and stop orders, principal and agency capacity, long and short positions, dividend dates, yields and basis points, settlement on T+${h.P.settlement.regularWayDays} for most trades, and corporate actions such as splits and tender offers. Accounts: cash, margin and options accounts, discretionary authority, the forms of registration from joint to custodial and retirement, anti-money laundering, books and records, privacy and the best interest standard. Prohibited activities: manipulation, insider trading, improper use of customer assets and the exploitation of seniors. Questions are often small scenarios in which you must pick the right order or spot the violation. Our pool holds ${h.inPool('sie', '3')} questions on this section.`;
    },
    faqs: (h) => [
      { q: 'Where does a sell stop order go, above or below the market?', a: 'Below. A sell stop is placed under the current price to limit a loss or protect a gain on a stock the customer owns; once the stock trades at or through the stop, it becomes a market order. A buy stop sits above the market, typically to protect a short position. A limit order sets the worst price acceptable, the opposite logic.' },
      { q: 'In what order do the stages of money laundering come?', a: 'Placement first, when illicit cash enters the financial system; then layering, when it moves through transfers and trades that hide its source; then integration, when it comes back looking legitimate. Structuring, splitting deposits to dodge reporting, is a placement technique. A firm files a Suspicious Activity Report with FinCEN when activity looks suspicious and must not tip off the customer.' },
      { q: 'With T+1 settlement, when is the ex-dividend date?', a: `For regular-way trades, settlement now takes one business day after the trade, since ${h.date(h.P.settlement.since)}. A buyer must trade before the ex-dividend date to be owner of record in time, and under T+1 the ex-date falls on the record date itself. A purchase on the ex-date or later settles too late to receive that dividend.` },
    ],
    body: (h) => `
<h2>Orders, returns and settlement</h2>
<p>Know each order by what it protects. A market order buys or sells at once at the best available price. A limit order sets the worst acceptable price: a buy limit at or below the market, a sell limit at or above. A stop order waits for a trigger price and then becomes a market order, so the execution price is not guaranteed. A good-til-canceled order stays open until filled or canceled. A firm acting as agent charges a commission; acting as principal, it trades from its own inventory and charges a markup or markdown.</p>
<p>Returns include interest, dividends, realized and unrealized gains and return of capital. Learn the dividend dates in order: declaration, ex-date, record date, payable date. A basis point is one hundredth of a percentage point. Regular-way settlement moved to T+${h.P.settlement.regularWayDays} on ${h.date(h.P.settlement.since)} (${h.src('sec_t1', 'SEC adoption')}).</p>
<h3>Corporate actions</h3>
<p>A forward split increases the number of shares and lowers the price in proportion; the investor's total value and total cost basis do not change. A reverse split does the opposite. A tender offer invites holders to sell shares at a stated price; a rights offering lets them buy new shares before the public.</p>
<h2>Customer accounts and compliance</h2>
<p>A cash account pays in full; a margin account borrows part of the price under ${h.src('reg_t', 'Regulation T')}, with an initial requirement of ${h.pc(h.P.margin.regT)} and a maintenance minimum of ${h.pc(h.P.margin.maintLong)} for long positions under ${h.src('finra_4210', 'FINRA Rule 4210')}. Options accounts need approval and the options disclosure document. Discretionary authority, letting the representative choose the security or the amount, must be granted in writing.</p>
<p>For registrations, compare joint tenants with right of survivorship, where the survivor takes the whole account, with tenants in common, where a share passes to the deceased's estate. Custodial accounts under UTMA have one custodian and one minor. Retirement accounts bring contribution rules and required minimum distributions. Compliance topics close the block: the anti-money laundering program and its reports, record retention, holding of customer mail, business continuity plans, customer privacy under Regulation S-P, rules for communications and telemarketing, and the know-your-customer and best interest duties.</p>
<h3>Traps in this block</h3>
<ul>
<li>Time and price alone (when and at what price to trade) do not make an account discretionary.</li>
<li>A customer who asks for a stock without a recommendation places an unsolicited order; the best interest duty attaches to recommendations.</li>
<li>Reporting suspicious activity to the customer is itself forbidden.</li>
</ul>
<h2>Prohibited activities</h2>
<p>The outline lists the misconduct an associated person must recognize. Market manipulation includes spreading rumors, pump and dump schemes, marking the open or the close and front running a block order. Insider trading is trading on material nonpublic information, or passing it on, and exposes the person to fines, expulsion and prison. Other bans: buying hot IPO shares as a restricted person, borrowing from or lending to customers outside narrow exceptions, sharing in a customer's account without approval, paying commissions to unregistered persons, signatures of convenience and falsified records. The financial exploitation of seniors gets its own topic, with the possibility of a temporary hold on disbursements.</p>
<h2>Working through section 3</h2>
<p>Split your study into the three parts above and practice each before mixing them. The calculator under this text drills option breakevens, a skill that also helps when an order question involves a hedge; the ${h.a('margin-math', 'margin page')} covers equity and maintenance calls. Candidates who move on to the Series 7 will meet the same order types in much more depth on the ${h.a('series-7-orders', 'Series 7 orders page')}.</p>`,
  },
});
