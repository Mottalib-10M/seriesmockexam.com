import { definePage } from '../../lib/guide-types';
import { option } from '../../lib/engine/money';

export default definePage({
  id: 'options-math',
  group: 'math',
  order: 30,
  tool: { kind: 'mini:options' },
  mini: { kind: 'quiz', props: { exam: 's7', section: 'F3', n: 5 } },
  related: ['margin-math', 'bond-yields', 'series-7-investments', 'sie-trading', 'series-7-practice-test'],
  sources: ['finra_s7_outline', 'finra_sie_outline'],
  en: {
    slug: 'options-math',
    nav: 'Options math',
    card: 'Breakeven, maximum gain and maximum loss of the four basic option positions, per share and per contract.',
    title: 'Options Math for the Series 7: Breakeven, Max Gain and Loss',
    description: 'Options math for the Series 7 and SIE: breakeven, maximum gain and maximum loss of a long or short call or put, per share and per contract, calculated.',
    h1: 'Options math: the four basic positions',
    intro: 'Choose a position, a strike and a premium: the calculator gives the breakeven and the most the position can gain or lose on one contract.',
    resume: (h) => {
      const c = option('long-call', 50, 3), p = option('long-put', 50, 3);
      return `Options questions are the most feared part of the Series 7, yet most of them rest on four positions and three numbers. A call gives its buyer the right to buy 100 shares at the strike price; a put gives the right to sell them. The buyer pays the premium and can lose no more than it; the writer receives the premium and takes the opposite risk. For a call, the breakeven is the strike plus the premium: a 50 call bought for 3 breaks even with the stock at ${h.usd(c.breakeven)}, and its gain has no ceiling. For a put, the breakeven is the strike minus the premium: a 50 put bought for 3 breaks even at ${h.usd(p.breakeven)}, and the most it can make is ${h.usd(p.maxGain * 100)} per contract, if the stock falls to zero. The writer of an uncovered call faces an unlimited loss, which is why firms approve it only for experienced accounts. The SIE tests the vocabulary and these basics; the Series 7 adds spreads, straddles and covered positions built from the same blocks.`;
    },
    faqs: (h) => [
      { q: 'What does "in the money" mean for a put?', a: 'A put is in the money when the market price of the stock is below the strike price, since the right to sell above the market has value. A call is in the money when the market price is above the strike. The amount by which an option is in the money is its intrinsic value; the rest of the premium is time value.' },
      { q: 'Why is one contract worth 100 times the premium?', a: 'A standard equity option covers 100 shares, and premiums are quoted per share. A premium of 3 therefore costs $300 per contract, and every gain or loss per share is multiplied by 100. Exam questions often give the premium per share and ask for the dollar result, so do the multiplication at the end.' },
      { q: 'Which option positions are bullish?', a: 'Buying a call and writing a put both profit when the stock rises, so both are bullish. Buying a put and writing a call profit when it falls, so both are bearish. A quick check for any position: buyers want movement in their direction, while writers mostly want the option to expire worthless and keep the premium.' },
    ],
    body: (h) => {
      const pos: Array<[string, Parameters<typeof option>[0], string]> = [['Long call', 'long-call', 'bullish'], ['Long put', 'long-put', 'bearish'], ['Short call', 'short-call', 'bearish'], ['Short put', 'short-put', 'bullish']];
      const rows = pos.map(([n, k, view]) => { const o = option(k, 50, 3); return [n, view, h.usd(o.breakeven), Number.isFinite(o.maxGain) ? h.usd(o.maxGain * 100) : 'Unlimited', Number.isFinite(o.maxLoss) ? h.usd(o.maxLoss * 100) : 'Unlimited']; });
      return `
<h2>The four positions on one table</h2>
${h.table(['Position', 'Market view', 'Breakeven', 'Max gain (1 contract)', 'Max loss (1 contract)'], rows, 'Strike 50, premium 3, one contract of 100 shares; computed by our calculator.', ['l', 'l', 'r', 'r', 'r'])}
<p>Notice the symmetry. The buyer and the writer of the same option share the same breakeven; what one gains, the other loses. Buyers have limited loss, writers have limited gain. The only unlimited figures are the gain of a long call and the loss of a short call, because a stock price has no upper limit.</p>
<h2>Three questions to ask of any option problem</h2>
<h3>1. Who paid and who received the premium?</h3>
<p>The buyer pays it and has a debit; the writer receives it and has a credit. On a combination of several options, add up premiums paid and received first: a net debit means the position was bought, a net credit means it was sold.</p>
<h3>2. Which direction pays?</h3>
<p>Calls gain value as the stock rises, puts as it falls. Combine this with the buyer or writer side to know the market view before any arithmetic.</p>
<h3>3. Where is the breakeven?</h3>
<p>Calls: strike plus premium. Puts: strike minus premium. For a spread, apply the rule of the option that gives the position its name to the net premium.</p>
<h2>Covered calls and protective puts</h2>
<p>A covered call is a long stock position with a call written against it. The premium lowers the cost of the stock, so the breakeven is the purchase price minus the premium, and the gain is capped at the strike plus the premium minus the purchase price. A protective put is the mirror image: long stock plus a long put, a form of insurance whose breakeven is the purchase price plus the premium and whose loss stops at the strike. Both appear in the investments and recommendations function of the Series 7 (${h.src('finra_s7_outline', 'Series 7 outline')}), which carries ${h.weight('s7', 'F3').items} of its ${h.X('s7').scored} questions.</p>
<h2>Opening an options account</h2>
<p>The math sits next to a set of account rules: an options account must be approved by a principal, the customer must receive the options disclosure document, and the firm must obtain the signed options agreement within the time its rules set. The SIE touches these rules in its trading and accounts section (${h.src('finra_sie_outline', 'SIE outline')}); the ${h.a('sie-trading', 'SIE trading and accounts page')} practices them. For the other half of the Series 7 math, continue with ${h.a('margin-math', 'margin accounts')}.</p>
<h2>Spreads and straddles in one paragraph</h2>
<p>A spread is the purchase of one option and the sale of another of the same type on the same stock. If the option bought costs more than the one sold, the spread is a debit spread and the customer wants the premiums to widen; if it costs less, it is a credit spread and the customer wants them to narrow or both options to expire. A straddle combines a call and a put with the same strike and expiration: a long straddle bets on a large move in either direction, a short straddle on a quiet market. For a long straddle, there are two breakevens, the strike plus and minus the two premiums combined.</p>`;
    },
  },
});
