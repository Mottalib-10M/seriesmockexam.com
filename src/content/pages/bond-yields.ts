import { definePage } from '../../lib/guide-types';
import { currentYield, ytm, ytmApprox, bondPrice } from '../../lib/engine/money';

export default definePage({
  id: 'bond-yields',
  group: 'math',
  order: 10,
  tool: { kind: 'mini:bondyield' },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '2', n: 5 } },
  related: ['muni-bond-math', 'sie-products', 'series-7-investments', 'options-math', 'margin-math'],
  sources: ['finra_sie_outline', 'finra_s7_outline', 'nasaa_s65_guide'],
  en: {
    slug: 'bond-yields',
    nav: 'Bond yield math',
    card: 'Nominal yield, current yield and yield to maturity for discount and premium bonds, with the shortcut the exams expect.',
    title: 'Bond Yield Math for the SIE and Series 7: CY, YTM, YTC',
    description: 'Bond yield math for the SIE, Series 7 and 65: nominal yield, current yield and yield to maturity of a discount or premium bond, worked out in a calculator.',
    h1: 'Bond yields: the math the exams test',
    intro: 'Type a coupon, a price and the years left: the calculator gives the current yield, the exact yield to maturity and the classroom shortcut, and says which way the yields line up.',
    resume: (h) => {
      const cy = currentYield(5, 950), y = ytm(5, 10, 950), ya = ytmApprox(5, 10, 950);
      return `Bond yields come up on the SIE, the Series 7, the Series 6 and the Series 65 and 66, because they are the language in which debt is priced. Three measures matter. The nominal yield is the coupon rate printed on the bond: a 5% bond pays $50 a year per $1,000 of face value, whatever its price. The current yield divides that annual interest by the market price: the same bond bought at $950 yields ${h.pc(cy, 2)}. The yield to maturity also counts the gain or loss between the price paid and the $1,000 repaid at maturity: over ten years it comes to ${h.pc(y, 2)}, and the classroom shortcut, the annual interest plus the yearly share of the discount, divided by the average of price and par, gives ${h.pc(ya, 2)}. When a bond trades at a discount, the three measures rise in that order; at a premium they fall in that order; at par they are equal. Most exam questions on yields test this ordering rather than long arithmetic.`;
    },
    faqs: (h) => [
      { q: 'Why does a bond price fall when interest rates rise?', a: 'Because its coupon is fixed. When new bonds pay more, an old bond with a lower coupon only finds a buyer at a price low enough for its yield to match the market. The longer the time to maturity, the larger the price change for the same move in rates, which is why long bonds carry more interest rate risk.' },
      { q: 'Which yield does a callable bond quote?', a: 'For a callable bond bought at a premium, the yield to call is usually the lower and more conservative figure, since the issuer is likely to call a bond whose coupon is above market rates. Confirmations show the lower of the yield to call and the yield to maturity, the yield to worst, so the customer sees the least favourable case.' },
      { q: 'Do I need a financial calculator for the exam?', a: 'No. Personal devices stay out of the testing room, and FINRA describes on its exam-day pages what calculator is made available. The yield questions are built so that the ordering rules and the shortcut formula are enough: recognise a discount or a premium from the price first, then check that your answer respects the order of the yields before computing anything.' },
    ],
    body: (h) => {
      const rows = [800, 900, 950, 1000, 1050, 1100].map((p) => [h.usd(p), h.pc(0.05, 2), h.pc(currentYield(5, p), 2), h.pc(ytm(5, 10, p), 2), p < 1000 ? 'discount' : p > 1000 ? 'premium' : 'par']);
      return `
<h2>Three yields, one bond</h2>
${h.table(['Price per $1,000', 'Nominal yield', 'Current yield', 'Yield to maturity', 'Trades at'], rows, 'A 5% coupon, ten years to maturity, semiannual coupons; yields computed by our calculator.', ['r', 'r', 'r', 'r', 'l'])}
<p>The table shows the rule at a glance. Below par, the investor gets the coupon plus a gain at maturity, so the yield to maturity is the highest figure. Above par, the premium is lost by maturity, so the yield to maturity is the lowest. A quick memory aid: at a discount, the yields climb from the coupon; at a premium, they slide down from it.</p>
<h2>The formulas, step by step</h2>
<h3>Current yield</h3>
<p>Annual interest divided by market price. A 6% bond priced at $1,200 pays $60 a year: ${h.pc(currentYield(6, 1200), 2)} current yield. It ignores time and the repayment at par, which is why it sits between the coupon and the yield to maturity.</p>
<h3>Yield to maturity, the shortcut</h3>
<p>Add to the annual interest the discount spread over the years left (or subtract the premium), then divide by the average of the price and par. For the 5% bond at $950 with ten years left: ($50 + $5) / $975 = ${h.pc(ytmApprox(5, 10, 950), 2)}. The exact yield, solved for semiannual coupons, is ${h.pc(ytm(5, 10, 950), 2)}; the two are close enough for any exam choice.</p>
<h3>Price from a yield</h3>
<p>The reverse question also appears: if market yields rise to 6%, what happens to a 5% ten-year bond? Its price falls to about ${h.usd(bondPrice(5, 10, 6), 2)}. You will not be asked to compute that to the cent, but you must know the direction and that a longer maturity moves further.</p>
<h2>Where yields sit in each outline</h2>
<p>On the SIE, yields belong to ${h.short('sie', '2').toLowerCase()}, the heaviest section with ${h.weight('sie', '2').items} scored questions (${h.src('finra_sie_outline', 'SIE outline')}). On the Series 7 they fall under the investments and recommendations function, ${h.weight('s7', 'F3').items} questions (${h.src('finra_s7_outline', 'Series 7 outline')}), together with call features, duration and the yield to call. The Series 65 places them in its investment vehicle and strategy sections (${h.src('nasaa_s65_guide', 'NASAA study guide')}), alongside bond valuation and the time value of money.</p>
<h2>Common traps in yield questions</h2>
<ul>
<li>Confusing the coupon rate with the current yield: the coupon never changes, the current yield moves with the price.</li>
<li>Forgetting that bond prices are quoted as a percentage of par: a quote of 95 means $950 per $1,000 bond.</li>
<li>Reversing the order for premium bonds. Check: premium, so yield to maturity below coupon.</li>
<li>Ignoring the call: a premium callable bond is likely to be called, so the yield to call is the relevant one.</li>
</ul>
<p>The five questions above are drawn from the products section of the SIE. For tax-free bonds and accrued interest, continue with the ${h.a('muni-bond-math', 'municipal bond math page')}; for the practice of the whole section, the ${h.a('sie-products', 'products and risks page')}.</p>
<h2>A worked exam-style example</h2>
<p>Suppose a customer buys a 4% bond at 92 with eight years left. The price is $920, so the bond trades at a discount: the yields must rise from the coupon. Annual interest is $40; the current yield is $40 divided by $920, a little above 4.3%. The shortcut for the yield to maturity adds the $80 discount spread over eight years, $10 a year, to the $40 of interest, then divides by the average of $920 and $1,000: $50 over $960, about 5.2%. Before choosing an answer, check that the three figures climb in the expected order; an option that puts the current yield above the yield to maturity for a discount bond can be ruled out at once.</p>`;
    },
  },
});
