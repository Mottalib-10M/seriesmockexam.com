import { definePage } from '../../lib/guide-types';
import { marginLong } from '../../lib/engine/money';

export default definePage({
  id: 'margin-math',
  group: 'math',
  order: 40,
  tool: { kind: 'mini:margin' },
  mini: { kind: 'quiz', props: { exam: 's7', section: 'F4', n: 5 } },
  related: ['options-math', 'series-7-orders', 'sie-trading', 'bond-yields'],
  sources: ['reg_t', 'finra_4210', 'finra_s7_outline'],
  en: {
    slug: 'margin-math',
    nav: 'Margin math',
    card: 'Regulation T deposit, debit balance, equity and the maintenance call level of a long margin account.',
    title: 'Margin Math for the Series 7: Reg T, Equity and Maintenance',
    description: 'Margin math for the Series 7 and SIE: Regulation T 50% deposit, the $2,000 minimum, debit balance, equity, and the price at which a 25% maintenance call starts.',
    h1: 'Margin accounts: the numbers behind the questions',
    intro: 'Enter what was bought on margin and what it is worth today: equity, the loan and the value at which a maintenance call starts.',
    resume: (h) => {
      const M = h.P.margin, m = marginLong(20000, 16000);
      return `A margin account lets a customer buy securities partly with money borrowed from the broker-dealer, and two rules set the numbers the Series 7 asks about. Regulation T of the Federal Reserve sets the initial requirement: the customer deposits ${h.pc(M.regT)} of the purchase price of marginable stock (${h.src('reg_t', '12 CFR 220.12')}), and FINRA Rule 4210 adds a minimum equity of ${h.usd(M.minEquity)} to open the account. The firm lends the rest, which becomes the debit balance. Equity is the market value minus the debit. Once the account is open, Rule 4210 requires the equity of a long account to stay at ${h.pc(M.maintLong)} of the market value or more (${h.src('finra_4210', 'FINRA Rule 4210')}); below that, the firm issues a maintenance call. For a purchase of ${h.usd(20000)} with ${h.usd(m.deposit)} deposited, the debit is ${h.usd(m.debit)}, a fall to ${h.usd(16000)} leaves ${h.usd(m.equity)} of equity, and the call starts below a market value of ${h.usd(m.callAt)}, the debit divided by ${h.pc(1 - M.maintLong)}. Firms often set stricter house requirements.`;
    },
    faqs: (h) => [
      { q: 'What happens if I buy only $1,500 of stock on margin?', a: `Rule 4210 sets a minimum of ${h.usd(h.P.margin.minEquity)} of equity in a margin account, but it never requires more than the purchase price. For a ${h.usd(1500)} purchase, the customer pays the full ${h.usd(1500)}. For a ${h.usd(3000)} purchase, half would be ${h.usd(1500)}, so the minimum lifts the deposit to ${h.usd(2000)}.` },
      { q: 'What is SMA in a margin account?', a: 'The special memorandum account records excess equity: when the market value rises, the equity above the Regulation T requirement creates buying power or cash the customer may withdraw. It is a line of credit, not cash held separately. It stays in place even if the market later falls, and is reduced only when it is used.' },
      { q: 'Is the maintenance level for short sales the same?', a: `No. For short positions Rule 4210 requires more: for stock trading at ${h.usd(5)} or more, ${h.pc(h.P.margin.maintShort)} of the market value or ${h.usd(5)} a share, whichever is greater, with higher figures for low-priced stocks. Short accounts are riskier for the firm because a stock price can rise without limit.` },
    ],
    body: (h) => {
      const M = h.P.margin;
      const rows = [20000, 18000, 16000, 14000, 13000].map((v) => { const m = marginLong(20000, v); return [h.usd(v), h.usd(m.debit), h.usd(m.equity), h.pc(m.equityPct), m.call ? 'call' : 'no call']; });
      return `
<h2>One account, as the price falls</h2>
${h.table(['Market value', 'Debit', 'Equity', 'Equity / value', `Under ${h.pc(M.maintLong)}?`], rows, `Purchase of ${h.usd(20000)} with the Regulation T deposit; FINRA Rule 4210 minimum of ${h.pc(M.maintLong)}. Computed by our calculator.`, ['r', 'r', 'r', 'r', 'l'])}
<p>The debit does not move when the price moves: it is a loan, and it changes only when the customer pays it down or borrows more (interest aside). All the market risk lands on the equity, which is why a fall of a third in the stock price can wipe out two thirds of the customer's money in this example.</p>
<h2>The formulas</h2>
<ul>
<li><strong>Initial deposit:</strong> purchase × ${h.pc(M.regT)} (Regulation T), never less than ${h.usd(M.minEquity)} unless the purchase itself is smaller.</li>
<li><strong>Debit balance:</strong> purchase minus deposit.</li>
<li><strong>Equity:</strong> current market value minus debit.</li>
<li><strong>Maintenance call value:</strong> debit ÷ (1 − ${h.pc(M.maintLong)}), that is debit ÷ ${h.num(1 - M.maintLong, 2)}.</li>
<li><strong>Excess equity (to SMA):</strong> equity minus ${h.pc(M.regT)} of current market value, when positive.</li>
</ul>
<h2>How the exams test margin</h2>
<p>The Series 7 outline places margin in the order and transaction function, where the customer's instructions are processed and settled, and in the account opening function, where the margin agreement and the hypothecation agreement are signed (${h.src('finra_s7_outline', 'Series 7 outline')}). Expect one or two calculations, usually equity or the call value, and several questions on the documents and the definitions. The SIE stays at the level of vocabulary: what a margin account is, who lends, and why it carries more risk than a cash account.</p>
<h3>Documents of a margin account</h3>
<p>A margin account needs a signed margin agreement, which includes the hypothecation agreement letting the firm pledge the securities as collateral for the loan. A loan consent form, allowing the firm to lend the customer's securities to others, is optional. The customer must also receive the risk disclosure the rules require before trading on margin.</p>
<h2>Linked practice</h2>
<p>The five questions above come from the order and transaction function of the Series 7. The ${h.a('series-7-orders', 'orders and transactions page')} practices the whole function, and the ${h.a('options-math', 'options page')} covers the other calculation-heavy part of the exam.</p>
<h2>A worked question, step by step</h2>
<p>A customer buys ${h.usd(30000)} of stock in a new margin account and the stock later rises to ${h.usd(36000)}. The deposit was ${h.usd(15000)} under Regulation T, so the debit is ${h.usd(15000)}. At ${h.usd(36000)}, equity is ${h.usd(21000)}. The Regulation T requirement on the new value is ${h.usd(18000)}, so the account has ${h.usd(3000)} of excess equity, credited to the special memorandum account. The customer could withdraw that amount, or use it to buy twice as much stock on margin, ${h.usd(6000)}, without depositing more. Questions of this kind usually test one step at a time, so write down the debit before anything else.</p>
<p>The opposite case appears too: when the market value falls, equity drops first, then excess equity disappears, and the account becomes restricted once equity is below the Regulation T requirement. A restricted account is not yet a maintenance call; the call comes only below the ${h.pc(h.P.margin.maintLong)} level, and the calculator above shows where that line sits.</p>`;
    },
  },
});
