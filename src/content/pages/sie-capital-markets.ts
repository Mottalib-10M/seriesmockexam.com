import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-capital-markets',
  group: 'sie',
  order: 20,
  tool: { kind: 'quiz', props: { exam: 'sie', section: '1' } },
  mini: { kind: 'mini:realreturn' },
  related: ['sie-products', 'sie-trading', 'sie-regulation', 'sie-exam', 'sie-questions'],
  sources: ['finra_sie_outline', 'finra_sie'],
  en: {
    slug: 'sie-exam/capital-markets',
    nav: 'SIE: capital markets',
    card: 'Section 1 of the SIE: regulators and market participants, the four markets, the Fed and the economy, and how new securities are offered.',
    title: 'SIE Capital Markets Section: Regulators, Economy, Offerings',
    description: 'SIE section 1, Knowledge of Capital Markets: regulators and SROs, primary and secondary markets, Fed policy, economic indicators and offerings, plus practice.',
    h1: 'SIE section 1: knowledge of capital markets',
    intro: 'Practice questions from the first section of the outline only, corrected as you go. Notes on each topic and the usual traps follow.',
    resume: (h) => {
      const w = h.weight('sie', '1');
      return `The first section of the SIE outline, Knowledge of Capital Markets, accounts for ${w.items} of the ${h.X('sie').scored} scored questions, about ${h.pc(w.share)} of the exam. It sets the stage for everything else: who regulates the industry and with what authority, who the participants in a trade are, how markets are organized, how the economy and the Federal Reserve move prices, and how a company or a municipality brings new securities to investors. Four blocks recur. Regulators: the SEC, the self-regulatory organizations such as FINRA and the MSRB, state regulators, the Treasury, SIPC and the FDIC. Market structure: primary versus secondary markets, plus the third and fourth markets. Economics: monetary and fiscal policy, the business cycle, leading and lagging indicators, GDP and exchange rates. Offerings: underwriting commitments, registration and the main exemptions. The questions are mostly vocabulary and cause and effect, with very little arithmetic, so this section rewards steady memorization. The set above draws only from it, from a pool of ${h.inPool('sie', '1')} questions.`;
    },
    faqs: (h) => [
      { q: 'What separates the third market from the fourth market?', a: 'The third market is trading of exchange-listed stocks away from the exchange, between broker-dealers over the counter. The fourth market is trading between institutions directly, without a broker-dealer in the middle, usually through electronic networks. Both belong to the secondary market, where existing securities change hands, as opposed to the primary market, where an issuer sells new ones.' },
      { q: 'Does the SEC approve a new stock offering?', a: 'No, and the exam tests this often. When a registration statement becomes effective, the SEC has only required full disclosure; it does not judge the merits of the investment or vouch for the accuracy of the prospectus. Any statement to a customer suggesting approval by the SEC is a misrepresentation. Effectiveness simply allows the sale to begin.' },
      { q: 'Which economic indicators point ahead of the cycle?', a: 'Leading indicators tend to turn before the economy does: building permits, stock prices, new orders for manufactured goods and average weekly hours in manufacturing are classic examples. Coincident indicators, such as industrial production and personal income, move with it. Lagging indicators, such as the prime rate or the average length of unemployment, confirm a turn after it happened.' },
    ],
    body: (h) => `
<h2>Regulators and market participants</h2>
<p>The outline starts with who does what. The SEC is the federal regulator created by the Securities Exchange Act of 1934; it oversees the self-regulatory organizations, which write and enforce rules for their members. FINRA supervises broker-dealers, the MSRB writes rules for municipal securities dealers but does not inspect or discipline firms itself, and options exchanges such as Cboe regulate trading on their markets. Around them sit other bodies with narrower roles: the Treasury and the IRS for tax matters, state regulators gathered in NASAA, the Federal Reserve for credit and money, SIPC, which protects customers when a broker-dealer fails, and the FDIC, which insures bank deposits, not securities.</p>
<h3>Traps in this block</h3>
<ul>
<li>SIPC protects against the failure of a firm, not against a fall in market prices.</li>
<li>The MSRB makes rules; FINRA and bank regulators enforce them for municipal dealers.</li>
<li>An introducing broker takes orders and sends them to a clearing firm, which holds the money and securities.</li>
</ul>
<h2>Markets and the economy</h2>
<p>In the primary market an issuer sells new securities and receives the money; in the secondary market investors trade among themselves and the issuer receives nothing. The economic block asks how forces outside the markets move prices. Monetary policy is the Fed's lever: buying securities in the open market adds reserves and pushes rates down, selling them does the reverse. The discount rate is what the Fed charges banks that borrow from it; the federal funds rate is what banks charge one another overnight. Fiscal policy is the government's lever, through taxes and spending.</p>
<p>The business cycle runs from expansion to peak, contraction and trough. Defensive stocks such as utilities and consumer staples hold up better in a contraction; cyclical stocks such as autos and heavy industry swing with the cycle. Inflation erodes fixed payments, which is why rising inflation tends to hurt bond prices. The calculator under this text shows the gap between a nominal return and a real one: a ${h.pc(0.06)} return with ${h.pc(0.03)} inflation is worth a little less than ${h.pc(0.03)} in purchasing power.</p>
<h3>The international angle</h3>
<p>Expect a question or two on the balance of payments, GDP versus GNP, and exchange rates. A weaker dollar makes US exports cheaper abroad and raises the dollar value of foreign investments held by Americans; a stronger dollar does the opposite.</p>
<h2>How securities are offered</h2>
<p>In a firm commitment underwriting, the syndicate buys the whole issue and bears the risk of unsold shares; in a best efforts deal, it acts as agent and returns what it cannot sell. A shelf registration lets an issuer register securities now and sell them in pieces later. The prospectus is the disclosure document for a registered corporate offering; the official statement plays that role for a municipal issue. Some offerings are exempt from SEC registration, such as private placements under Regulation D or intrastate offerings under Rule 147, though state blue-sky laws may still apply. Rule 144 governs resales of restricted and control stock, and Rule 144A resales to large institutions.</p>
<h2>Studying section 1</h2>
<p>This section is small but nearly all recall, so it pays to learn it early and keep it warm with a mixed ${h.a('sie-practice-test', 'practice set')} each week. Make a one-page map of regulators with a line on what each one does and does not do, since mix-ups between them are the most common errors. The other sections build on this vocabulary: ${h.a('sie-products', 'products and their risks')}, ${h.a('sie-trading', 'trading and accounts')} and the ${h.a('sie-regulation', 'regulatory framework')}.</p>`,
  },
});
