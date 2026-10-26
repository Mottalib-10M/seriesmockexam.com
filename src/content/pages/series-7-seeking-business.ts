import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-seeking-business',
  group: 'series',
  order: 20,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', section: 'F1' } },
  mini: { kind: 'mini:passline', props: { e: 1 } },
  related: ['series-7-opening-accounts', 'series-7-practice-test', 'series-7-exam', 'sie-regulation', 'series-7-passing-score'],
  sources: ['finra_s7_outline', 'finra_s7'],
  en: {
    slug: 'series-7-exam/seeking-business',
    nav: 'Series 7: seeking business',
    card: 'Function 1 of the Series 7: communications with the public, new issues, underwriting and offerings exempt from registration.',
    title: 'Series 7 Function 1: Seeking Business, Practice and Notes',
    description: 'Series 7 function 1 explained and practiced: public communications, principal approval, new issues from filing to final prospectus, syndicates, Reg D, Reg A.',
    h1: 'Series 7 function 1: seeking business for the firm',
    intro: 'Practice questions on communications and new issues, corrected one at a time. The notes below sort the function into the rules most likely to be tested.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F1');
      return `The first function of the Series 7 outline covers everything a representative does before an account exists: contacting prospects, using advertising and seminars, describing products and taking part in the sale of new issues. It is the smallest function on the exam, with ${w.items} of the ${S.scored} scored items, about ${h.pc(w.share)}, yet its content is dense. Two families of rules carry it. The first governs communications with the public under FINRA Rule 2210: what counts as retail, institutional or correspondence, which pieces need a principal's approval before use, and what extra disclosures apply to options, investment company products, municipal securities and research. The second follows a security from the issuer's decision to raise money to the final prospectus: registration under the Securities Act of 1933, the cooling-off period, underwriting syndicates and their spread, municipal official statements, and the offerings that escape registration, such as Regulation D private placements, Regulation A and intrastate offerings (${h.src('finra_s7_outline', 'Series 7 outline')}). Our pool holds ${h.inPool('s7', 'F1')} questions on these topics.`;
    },
    faqs: (h) => [
      { q: 'How many Series 7 questions cover communications and new issues?', a: `The outline gives ${h.weight('s7', 'F1').items} scored items to the whole first function, which includes public communications, new issue procedures, syndicates and exempt offerings. That is a small share of ${h.X('s7').scored}, but these items are mostly rule based, so a candidate who knows the rules can collect them quickly and save time for the longer product questions.` },
      { q: 'May a representative take orders during the cooling-off period?', a: 'No. Once the registration statement is filed and before it becomes effective, a representative may hand out the preliminary prospectus and collect indications of interest, but no sale can be made and no money accepted. An indication of interest binds neither the customer nor the firm. Sales can only be confirmed after the registration statement is effective.' },
      { q: 'Who may buy in a Regulation D private placement?', a: 'Regulation D lets an issuer sell without registering the offering with the SEC, mainly to accredited investors, a category defined by income, net worth or professional status. Some exemptions within it also allow a limited number of nonaccredited buyers under conditions. The securities bought are restricted: they cannot be freely resold, which a representative must explain before the sale.' },
    ],
    body: (h) => {
      const S = h.X('s7');
      return `
<h2>Communications with the public</h2>
<p>FINRA Rule 2210 classifies every message a firm sends by its audience. Retail communications reach retail investors broadly, such as a public website, an advertisement or a mass mailing. Correspondence goes to a small number of retail investors. Institutional communications go only to institutional investors and must not be passed on to the public. The class decides the supervision:</p>
${h.table(['Class', 'Typical example', 'Supervision'], [
  ['Retail communication', 'public web page, newspaper advertisement, seminar slides', 'approval by a qualified principal before use, with limited exceptions'],
  ['Correspondence', 'an email to a handful of existing customers', 'reviewed under the firm\'s written procedures, no prior approval required'],
  ['Institutional communication', 'a market note sent only to pension plans', 'covered by written procedures, no prior principal approval required'],
], 'Simplified from FINRA Rule 2210, listed in the outline for function 1.', ['l', 'l', 'l'])}
<p>Content standards apply to every class: fair and balanced, no promise of results, no exaggerated claims. On top of them, the outline singles out product rules. Options material must be tied to delivery of the options disclosure document. Investment company and variable product advertising has its own rules on performance and rankings. Collateralized mortgage obligations and bond fund volatility ratings each have a dedicated FINRA rule. Research reports bring quiet periods around offerings.</p>
<h2>A new issue from start to finish</h2>
<h3>Before and during registration</h3>
<p>An issuer that wants to sell securities to the public files a registration statement with the SEC. Until it is filed, the firm cannot offer the securities. Between filing and effectiveness, the cooling-off period, the preliminary prospectus (the red herring, named after its red legend) can circulate without a final price, and representatives may take indications of interest. The underwriters perform due diligence, and the issue must also be cleared in the states where it will be sold, under the blue-sky laws. The SEC does not approve the merits of an issue; it only requires disclosure.</p>
<h3>Syndicates and the spread</h3>
<p>For a large deal, a managing underwriter forms a syndicate that shares the risk, and a selling group of other firms helps place the shares without taking underwriting liability. The underwriters buy at a price below the public offering price; the difference, the spread, is divided between the manager's fee, the underwriting fee and the selling concession. In a firm commitment the syndicate buys the whole issue and carries the risk of unsold shares; in a best efforts deal it only acts as agent.</p>
<h3>Municipal issues</h3>
<p>Municipal bonds follow a different path because they are exempt from SEC registration. An issuer either accepts sealed bids in a competitive sale, announced by a notice of sale, or negotiates with an underwriter it has chosen. Investors receive the official statement, a preliminary version first, rather than a prospectus.</p>
<h2>Offerings that skip full registration</h2>
<ul>
<li><strong>Regulation D:</strong> private placements, sold mainly to accredited investors, with restricted securities as a result.</li>
<li><strong>Regulation A:</strong> a lighter process for smaller public offerings, built around an offering circular instead of a full registration statement.</li>
<li><strong>Rule 147 and Section 3(a)(11):</strong> intrastate offerings, where issuer and buyers are in the same state.</li>
<li><strong>Rule 144A:</strong> resales of unregistered securities to qualified institutional buyers.</li>
</ul>
<p>FINRA Rule 5130 adds a restriction specific to initial public offerings of equity: restricted persons, among them employees of broker-dealers, cannot buy new issues for their own accounts. Exam items often present a customer who works at another firm and ask whether an IPO allocation is allowed.</p>
<h2>Why a small function still matters</h2>
<p>With only ${h.weight('s7', 'F1').items} items, function 1 cannot carry a candidate, but it can sink one who is close to the line. The calculator under the citable block shows the mock line for the Series 7, about ${h.need('s7')} of ${S.scored}, and how many answers you can afford to miss. A handful of points lost here, added to the misses elsewhere, is often the difference. One evening on Rule 2210 and the registration timeline usually brings this function up to level. Then move to ${h.a('series-7-opening-accounts', 'opening accounts')}, the second function, or back to the ${h.a('series-7-exam', 'Series 7 overview')}.</p>`;
    },
  },
});
