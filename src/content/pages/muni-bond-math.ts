import { definePage } from '../../lib/guide-types';
import { tey, accrued, days30360 } from '../../lib/engine/money';
import { dayNum } from '../../lib/engine/dates';

export default definePage({
  id: 'muni-bond-math',
  group: 'math',
  order: 20,
  tool: { kind: 'mini:tey' },
  mini: { kind: 'mini:accrued' },
  related: ['bond-yields', 'series-7-investments', 'series-65-exam', 'fund-pricing'],
  sources: ['finra_s7_outline', 'nasaa_s65_guide', 'sec_t1'],
  en: {
    slug: 'muni-bond-math',
    nav: 'Municipal bond math',
    card: 'Tax-equivalent yield of a municipal bond and accrued interest on a 30/360 basis with T+1 settlement, calculated.',
    title: 'Municipal Bond Math: Tax-Equivalent Yield, Accrued Interest',
    description: 'Municipal bond math for the Series 7, 65 and 66: tax-equivalent yield by tax bracket and accrued interest on a 30/360 basis with T+1 settlement, calculated.',
    h1: 'Municipal bond math: tax-equivalent yield and accrued interest',
    intro: 'Compare a tax-free coupon with a taxable one at your bracket, then work out the accrued interest a buyer pays on settlement.',
    resume: (h) => `Two calculations come back again and again in municipal bond questions on the Series 7, 65 and 66. The first is the tax-equivalent yield: interest on most municipal bonds is free of federal income tax, so a muni yield must be grossed up before it can be compared with a taxable bond. The formula divides the muni yield by one minus the investor's marginal tax rate. A 3.5% muni is worth ${h.pc(tey(3.5, 32), 2)} taxable to someone in the 32% bracket, but only ${h.pc(tey(3.5, 12), 2)} to someone in the 12% bracket, which is why munis suit high earners and rarely fit a low-income account or an IRA, where the tax advantage is wasted. The second is accrued interest: a buyer pays the seller the interest earned since the last coupon date, up to the day before settlement. Corporate and municipal bonds count days on a 30/360 basis, every month taken as 30 days, and settle regular way one business day after the trade since the SEC moved to T+1 on ${h.date(h.P.settlement.since)}.`,
    faqs: (h) => [
      { q: 'Why are municipal bonds a poor fit for an IRA?', a: 'Inside an IRA or another tax-deferred account, interest is not taxed when earned anyway, and withdrawals from a traditional IRA are taxed as ordinary income. The tax exemption of the muni coupon is therefore lost, while its yield stays lower than that of a comparable taxable bond. Exam questions on suitability expect you to spot this mismatch.' },
      { q: 'Which day count do Treasury bonds use?', a: 'Treasury notes and bonds count accrued interest on an actual day basis, the real number of days in the period, while corporate and municipal bonds use 30/360. The calculator on this page uses 30/360, so it fits corporate and muni questions; for a Treasury question, count the calendar days instead.' },
      { q: 'Who receives the next full coupon after a trade?', a: 'The owner of record on the record date receives the whole coupon. That is why the buyer pays the seller the accrued interest at settlement: the seller earned part of the coupon while holding the bond, and the buyer is reimbursed for it when the issuer pays the full amount later.' },
    ],
    body: (h) => {
      const ex = accrued(6, dayNum('2026-07-01'), dayNum('2026-10-15'));
      return `
<h2>Tax-equivalent yield by bracket</h2>
${h.table(['Muni yield', '12% bracket', '22% bracket', '32% bracket', '37% bracket'], [3, 3.5, 4].map((m) => [h.pc(m / 100, 2), h.pc(tey(m, 12), 2), h.pc(tey(m, 22), 2), h.pc(tey(m, 32), 2), h.pc(tey(m, 37), 2)]), 'Federal tax only; state tax and the alternative minimum tax are left out. Rates shown as examples of marginal brackets.', ['r', 'r', 'r', 'r', 'r'])}
<p>The reverse question also appears: what muni yield matches a taxable bond? Multiply the taxable yield by one minus the rate. A 6% corporate bond for an investor in the 32% bracket is matched by a muni yield of ${h.pc(0.06 * (1 - 0.32), 2)}.</p>
<h3>In-state bonds</h3>
<p>Many states also exempt the interest of their own municipalities' bonds from state income tax. A resident who buys an in-state bond can therefore be double tax-free, while an out-of-state bond is usually taxed by the investor's home state. Questions often test this distinction without numbers.</p>
<h2>Accrued interest, worked out</h2>
<p>A 6% corporate bond pays coupons on January 1 and July 1. It trades on ${h.date('2026-10-14')} and settles one business day later, on ${h.date('2026-10-15')}. Interest accrues from July 1 up to the day before settlement: on the 30/360 basis that is ${days30360(dayNum('2026-07-01'), dayNum('2026-10-15'))} days, so the buyer adds ${h.usd(ex.amount, 2)} per $1,000 bond to the price. The calculator above runs the same steps from any coupon and dates.</p>
<ul>
<li>Count each full month as 30 days, whatever its real length.</li>
<li>Include the last coupon date, stop the day before settlement.</li>
<li>Multiply the annual coupon by the days and divide by 360.</li>
</ul>
<h2>Where this sits in the outlines</h2>
<p>The Series 7 places municipal securities and their tax treatment in the investments and recommendations function (${h.src('finra_s7_outline', 'Series 7 outline')}), which carries ${h.weight('s7', 'F3').items} of its ${h.X('s7').scored} scored questions. NASAA's Series 65 and 66 guides test tax-equivalent yield within taxation and client recommendations (${h.src('nasaa_s65_guide', 'Series 65 guide')}). Settlement dates belong to the order and transaction function of the Series 7, where the move to T+1 (${h.src('sec_t1', 'SEC adoption')}) changed the dates that older study material still shows.</p>
<h2>Quick checks before you answer</h2>
<p>A tax-equivalent yield is always higher than the muni yield, never lower; if your result is lower, you multiplied instead of dividing. Accrued interest is added to the price paid by the buyer and to the proceeds of the seller; it is never subtracted from either. For the plain yield measures of any bond, see the ${h.a('bond-yields', 'bond yield page')}.</p>
<h2>General obligation and revenue bonds</h2>
<p>Numbers aside, municipal questions turn on the source of payment. A general obligation bond is backed by the taxing power of the issuer, so its analysis looks at the tax base, debt per person and the issuer's other obligations. A revenue bond is paid from the income of a specific project, such as a toll road or a water system, so its analysis looks at the project's earnings and the protective covenants of the bond. Questions often give a description and ask which type it is, or which document an investor should read: the official statement plays for municipal issues the role a prospectus plays for corporate ones.</p>`;
    },
  },
});
