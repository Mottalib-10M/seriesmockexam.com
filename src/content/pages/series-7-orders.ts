import { definePage } from '../../lib/guide-types';
import { accrued } from '../../lib/engine/money';

const day = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / 86400000;

export default definePage({
  id: 'series-7-orders',
  group: 'series',
  order: 23,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', section: 'F4' } },
  mini: { kind: 'mini:accrued' },
  related: ['series-7-opening-accounts', 'margin-math', 'bond-yields', 'series-7-practice-test', 'series-7-exam'],
  sources: ['finra_s7_outline', 'sec_t1', 'finra_4210', 'reg_t'],
  en: {
    slug: 'series-7-exam/orders-and-transactions',
    nav: 'Series 7: orders and transactions',
    card: 'Function 4 of the Series 7: quotes, order types, short sales, settlement at T+1, confirmations, complaints and margin calculations.',
    title: 'Series 7 Orders and Transactions: Function 4 Practice Guide',
    description: 'Series 7 function 4 explained: firm and subject quotes, order types, short sales, T+1 settlement, accrued interest, complaints and margin, with free practice.',
    h1: 'Series 7 function 4: orders, settlement and margin',
    intro: 'Practice questions on the life of a trade, corrected one by one. The notes follow an order from the quote to settlement, then the complaints and margin rules that close the function.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F4');
      const st = h.P.settlement;
      return `Function 4 of the Series 7 follows a trade from the moment a customer asks for a price to the day cash and securities change hands. FINRA gives it ${w.items} of the ${S.scored} scored items, about ${h.pc(w.share)} of the exam, which makes it the second largest function after investments and recommendations (${h.src('finra_s7_outline', 'Series 7 outline')}). It has four parts. Quotes and orders: firm and subject quotations, the order types a customer can give, short sale requirements and best execution. Processing: the order ticket, the role of market makers, trade reporting systems, good delivery and settlement. Since ${h.date(st.since)}, regular-way trades in most securities settle ${st.regularWayDays} business day after the trade date (${h.src('sec_t1', 'SEC adoption of T+1')}), and bond buyers pay the seller the interest accrued since the last coupon. Problems: errors, cancellations, customer complaints, arbitration and mediation, and the Form U4 reporting they can trigger. Margin: Regulation T deposits of ${h.pc(h.P.margin.regT)}, maintenance levels of ${h.pc(h.P.margin.maintLong)} on long and ${h.pc(h.P.margin.maintShort)} on short positions under FINRA Rule 4210, and the calculations that go with them.`;
    },
    faqs: (h) => [
      { q: 'What is the difference between a fill-or-kill and an immediate-or-cancel order?', a: 'Both must be executed at once or they are cancelled. A fill-or-kill order must also be filled in full: if the whole quantity cannot be done immediately, nothing is executed. An immediate-or-cancel order accepts a partial execution, and only the unfilled part is cancelled. An all-or-none order, by contrast, requires the full quantity but does not have to be executed immediately.' },
      { q: 'How is accrued interest counted on a corporate bond trade?', a: `Corporate and municipal bonds use a 30-day month and a 360-day year. Interest accrues from the last coupon date up to the day before settlement, and the buyer pays it to the seller on top of the price, because the buyer will receive the full next coupon. With settlement at T+${h.P.settlement.regularWayDays}, the settlement date is the trade date plus one business day. Treasuries count actual days instead.` },
      { q: 'Must a short sale order be marked as short?', a: 'Yes. Under Regulation SHO, every sell order must be marked long or short, and before accepting a short sale the firm must have borrowed the security, arranged to borrow it, or have reasonable grounds to believe it can be borrowed for delivery. This is the locate requirement. A sale marked long must be of securities the customer owns and can deliver.' },
    ],
    body: (h) => {
      const st = h.P.settlement;
      const last = day(2026, 7, 1), settle = day(2026, 10, 15);
      const a = accrued(6, last, settle);
      return `
<h2>From quote to order</h2>
<p>A firm quote is a price at which the dealer is bound to trade at least the size shown; a subject quote is an indication that needs confirmation before any trade. Exam items like to ask which one a customer can rely on, and the answer is only the firm quote. Once the customer decides, the order type tells the firm how to work it.</p>
${h.table(['Order', 'What the customer asks'], [
  ['Market', 'execution right away at the best available price'],
  ['Limit', 'execution at the stated price or better, or not at all'],
  ['Stop', 'becomes a market order once the stop price is reached'],
  ['All-or-none', 'the whole quantity or nothing, with no need for immediate execution'],
  ['Fill-or-kill', 'the whole quantity at once, or the order is cancelled'],
  ['Immediate-or-cancel', 'whatever can be filled at once, the rest cancelled'],
  ['Not held', 'the representative chooses the time and the price'],
  ['Market-on-close', 'execution at or as close as possible to the closing price'],
], 'Order types named in function 4.1 of the outline.', ['l', 'l'])}
<p>Short sales carry their own rules: the order is marked short, a locate is needed before it is accepted, and the strategy can serve speculation, hedging or arbitrage. Best execution obliges the firm to seek the most favorable terms reasonably available for the customer, which covers more than price alone.</p>
<h2>Processing and settlement</h2>
<h3>The order ticket and the market</h3>
<p>A ticket records the essentials: account, security, side, quantity, price instructions and whether the firm acts as agent, charging a commission, or as principal, charging a markup or markdown. Trades are then reported to the systems the outline names, such as TRACE for corporate bonds and the MSRB's real-time reporting for municipal trades, published on EMMA.</p>
<h3>Settlement and delivery</h3>
<p>Regular-way settlement moved to T+${st.regularWayDays} on ${h.date(st.since)}. One practical consequence that questions test: for most stocks the ex-dividend date now falls on the record date, since a buyer on that day no longer settles in time to be on the books. Good delivery covers the form of the securities: endorsed certificates or stock powers, units of trading, and book entry through the Direct Registration System.</p>
<h3>Accrued interest in practice</h3>
<p>Take a bond with a 6% coupon paid on ${h.date('2026-07-01')} and January 1, sold on ${h.date('2026-10-14')}. Settlement falls on ${h.date('2026-10-15')}. Counting on a 30/360 basis from the last coupon up to the day before settlement gives ${a.days} days, so the buyer owes ${h.usd(a.amount, 2)} of accrued interest per ${h.usd(1000)} bond on top of the price. The calculator under the citable block repeats the computation with your own dates.</p>
<h2>Errors, disputes and complaints</h2>
<p>When a trade is reported wrong, the firm cancels and rebills it; a customer cannot be held to an execution that never happened. Written complaints must be passed to a supervisor, recorded and answered under the firm's procedures, and some must be disclosed on the representative's Form U4. Disputes between customers and firms usually go to FINRA arbitration, whose award is binding, while mediation is a voluntary negotiation with a neutral mediator and binds only if the parties sign a settlement.</p>
<h2>Margin calculations</h2>
<p>The outline closes the function with margin. A long purchase needs a deposit of ${h.pc(h.P.margin.regT)} under ${h.src('reg_t', 'Regulation T')}, and the account must keep equity of at least ${h.pc(h.P.margin.maintLong)} of the market value; a short position needs ${h.pc(h.P.margin.maintShort)} under ${h.src('finra_4210', 'FINRA Rule 4210')}. Firms may set higher house requirements. The ${h.a('margin-math', 'margin math page')} computes deposits, equity and call levels. With ${h.weight('s7', 'F4').items} items, function 4 repays a few evenings of drill, and its rules return in the ${h.a('series-7-opening-accounts', 'account opening function')} when margin and options agreements are signed.</p>`;
    },
  },
});
