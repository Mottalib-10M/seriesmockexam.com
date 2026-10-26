import { definePage } from '../../lib/guide-types';
import { marginLong } from '../../lib/engine/money';

export default definePage({
  id: 'series-7-opening-accounts',
  group: 'series',
  order: 21,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', section: 'F2' } },
  mini: { kind: 'mini:margin' },
  related: ['series-7-seeking-business', 'series-7-orders', 'margin-math', 'series-7-practice-test', 'series-7-exam'],
  sources: ['finra_s7_outline', 'finra_4210', 'reg_t'],
  en: {
    slug: 'series-7-exam/opening-accounts',
    nav: 'Series 7: opening accounts',
    card: 'Function 2 of the Series 7: account types and registrations, customer identification, the investment profile and the approvals behind each account.',
    title: 'Series 7 Function 2: Opening Accounts, Practice and Notes',
    description: 'Series 7 function 2 in practice: account registrations, CIP and know your customer, the investment profile, discretionary, margin and options paperwork.',
    h1: 'Series 7 function 2: opening customer accounts',
    intro: 'Practice questions on accounts, corrected as you answer. The notes below follow an account from the first form to the principal\'s signature.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F2');
      return `The second function of the Series 7 tests what happens between a customer's decision to open an account and the first trade. FINRA weights it at ${w.items} of the ${S.scored} scored items, about ${h.pc(w.share)} of the exam (${h.src('finra_s7_outline', 'Series 7 outline')}). It has four parts. The first is choosing the right account and registration: individual or joint, tenants in common or with right of survivorship, trust, corporate, partnership, retirement plans and education savings. The second is screening and documentation: the customer identification program, know your customer, privacy notices, and the papers that give someone else authority, such as a power of attorney or a corporate resolution. The third is the investment profile a recommendation must rest on: income, net worth, tax status, objectives, time horizon, experience and liquidity needs. The fourth is approval: a principal accepts the account, and certain accounts carry their own agreements, notably discretionary, margin and options accounts. The calculator under this paragraph covers the margin side, with the Regulation T deposit of ${h.pc(h.P.margin.regT)} and a minimum equity of ${h.usd(h.P.margin.minEquity)}.`;
    },
    faqs: (h) => [
      { q: 'What does a margin account need that a cash account does not?', a: `A signed margin agreement, which includes the credit terms and the hypothecation agreement letting the firm pledge the customer's securities; a loan consent is usually requested but optional. The customer must also meet the deposit rules: Regulation T asks for ${h.pc(h.P.margin.regT)} of a purchase, and FINRA Rule 4210 sets a minimum equity of ${h.usd(h.P.margin.minEquity)} before credit is extended.` },
      { q: 'Can a representative trade at his own discretion right after the customer agrees?', a: 'Not before the paperwork is complete. Full discretion over which security and how many shares requires the customer\'s prior written authorization and the firm\'s acceptance of the account as discretionary, and each discretionary order must be reviewed. An instruction that leaves only the timing or the price to the representative is treated differently and does not make the account discretionary.' },
      { q: 'What happens when a joint account owner dies?', a: 'It depends on the registration. With joint tenants with right of survivorship, the deceased owner\'s share passes to the surviving owner. With tenants in common, the share goes to the deceased owner\'s estate. In both cases the firm freezes activity until it receives the required documents, such as a death certificate, before re-registering the assets.' },
    ],
    body: (h) => {
      const S = h.X('s7');
      const m = marginLong(20000, 16000);
      return `
<h2>Choosing the registration</h2>
${h.table(['Registration', 'Who owns it', 'On the death of an owner'], [
  ['Individual', 'one person', 'assets go to the estate, or to a named beneficiary when the account carries a transfer on death designation'],
  ['Joint with right of survivorship', 'two or more people, equal undivided interests', 'the survivors keep the whole account'],
  ['Tenants in common', 'two or more people, shares can differ', 'the deceased owner\'s share goes to the estate'],
  ['Custodial (UTMA or UGMA)', 'a minor, managed by one custodian', 'if the minor dies, the assets go to the minor\'s estate'],
  ['Corporate, partnership, trust', 'the entity', 'authority comes from the resolution, agreement or trust document'],
], 'Registration types named in function 2.1 of the outline.', ['l', 'l', 'l'])}
<p>Retirement and tax advantaged accounts sit in the same part of the outline: traditional and Roth IRAs, employer plans covered by ERISA, 457 plans, 529 plans and Coverdell accounts. Questions tend to ask about contributions, rollovers and the taxation of withdrawals rather than about paperwork.</p>
<h2>Knowing who the customer is</h2>
<h3>Identification and screening</h3>
<p>The customer identification program obliges the firm to collect and verify identity information, such as name, date of birth, address and a taxpayer or other identification number, before or shortly after opening the account. Screening also looks for facts that change the handling: a customer who works for another broker-dealer, an officer or large holder of a public company, a foreign resident. Privacy rules under Regulation S-P require an initial privacy notice and the chance to opt out of certain information sharing.</p>
<h3>The investment profile</h3>
<p>A recommendation is only as good as the profile behind it. The outline lists the facts to obtain: other holdings, assets and debts, income, net worth, tax status, age, dependents, experience, liquidity needs and objectives from preservation of capital to speculation. FINRA Rule 4512 also asks the firm to make a reasonable effort to obtain the name of a trusted contact person. Exam stems often hide the decisive fact in this list, for instance a short time horizon that rules out an otherwise suitable product.</p>
<h2>Accounts with their own agreements</h2>
<ul>
<li><strong>Discretionary:</strong> written authorization from the customer and acceptance by a principal before any discretionary order.</li>
<li><strong>Margin:</strong> a margin agreement with its credit terms and hypothecation clause; IRAs and custodial accounts cannot borrow on margin.</li>
<li><strong>Options:</strong> the options disclosure document delivered by the time of approval, a principal's approval of the account, and a signed options agreement after approval within the time set by FINRA Rule 2360.</li>
<li><strong>Power of attorney:</strong> a trading authorization or a full power of attorney on file before a third party gives instructions.</li>
</ul>
<h2>The margin numbers behind the agreement</h2>
<p>A customer who buys ${h.usd(20000)} of stock on margin deposits ${h.usd(m.deposit)} under ${h.src('reg_t', 'Regulation T')} and borrows ${h.usd(m.debit)} from the firm. If the stock falls to ${h.usd(16000)}, equity drops to ${h.usd(m.equity)}, or ${h.pc(m.equityPct)} of the market value, still above the ${h.pc(h.P.margin.maintLong)} maintenance level of ${h.src('finra_4210', 'FINRA Rule 4210')}; a maintenance call would start below ${h.usd(Math.round(m.callAt))}. The calculator above runs the same figures with your own amounts, and the ${h.a('margin-math', 'margin math page')} adds short accounts and special memorandum accounts.</p>
<h2>Approval and the end of the function</h2>
<p>A principal reviews and accepts every new account, and the firm keeps the account record current when the customer's address, objectives or circumstances change. Function 2 also covers when to refuse or restrict an account, for example after signs of suspicious activity that must be escalated. With ${h.weight('s7', 'F2').items} items out of ${S.scored}, the function rewards careful reading more than calculation. Continue with ${h.a('series-7-orders', 'orders and transactions')}, where margin returns in function 4, or go back to ${h.a('series-7-seeking-business', 'seeking business')}.</p>`;
    },
  },
});
