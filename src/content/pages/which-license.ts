import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'which-license',
  group: 'rules',
  order: 10,
  tool: { kind: 'mini:license', props: { r: 1 } },
  mini: { kind: 'quiz', props: { exam: 's63', section: '2', n: 5 } },
  related: ['exam-fees', 'sie-vs-series-7', 'sponsorship', 'series-65-exam', 'series-66-exam'],
  sources: ['finra_1220', 'finra_s7', 'finra_s6', 'finra_s63', 'finra_s65', 'finra_s66'],
  en: {
    slug: 'which-finra-license',
    nav: 'Which license do I need?',
    card: 'From a job to its exams: stockbroker, fund representative, adviser representative or both, with fees and sponsorship.',
    title: 'FINRA License Finder: Which Series Exams Does Your Job Need?',
    description: 'FINRA license finder: which of the SIE, Series 6, 7, 63, 65 and 66 a stockbroker, fund rep or adviser representative needs, with 2026 fees and sponsors.',
    h1: 'Which exams does your job need?',
    intro: 'Pick the work you are aiming at: the finder lists the exams in the order they are usually taken, what they cost in 2026 and which need a sponsoring firm.',
    resume: (h) => `In the US securities industry, the license is really a combination of registrations, and each registration requires one or more qualification exams. FINRA sets the representative categories in ${h.src('finra_1220', 'Rule 1220')}: a general securities representative, who can sell almost any security, passes the SIE and the Series 7; an investment company and variable contracts products representative, limited to mutual funds, variable annuities and similar products, passes the SIE and the Series 6. On top of that, most states require their own registration for securities agents, usually based on the Series 63, while people who give investment advice for a fee register as investment adviser representatives, usually with the Series 65. The Series 66 combines the 63 and the 65, but only for candidates who also hold the Series 7. The SIE and the NASAA exams need no sponsor; the Series 7 and Series 6 do, since a firm must enroll you. Fees in 2026 range from ${h.usd(h.X('sie').fee)} for the SIE to ${h.usd(h.X('s7').fee)} for the Series 7.`,
    faqs: (h) => [
      { q: 'Can I take the Series 7 without a job?', a: `No. The Series 7 requires sponsorship by a FINRA member firm, which files the enrollment for you; the same applies to the Series 6. What you can do on your own is pass the SIE, which stays valid for ${h.X('sie').validYears} years, and the NASAA exams, such as the Series 65, which need no sponsor. That combination shows a future employer you are serious.` },
      { q: 'Series 65 or Series 66: which should an adviser take?', a: `Someone who will only give advice for a fee takes the Series 65, ${h.X('s65').scored} scored questions, with no other exam needed. Someone who will also sell securities on commission needs the Series 7, and can then take the Series 66, ${h.X('s66').scored} scored questions, which together with the 7 covers both the agent and the adviser representative registrations.` },
      { q: 'Does every state require the Series 63?', a: 'Most states base the registration of securities agents on the Series 63, or on the Series 66 for candidates who also hold the Series 7, but each state sets its own requirements and a few have particular rules. Your sponsoring firm files the state registrations and knows which exam each state where you will work accepts.' },
      { q: 'What do supervisors and principals take?', a: `Principal registrations come on top of a representative one. A general securities principal, for example, takes the Series 24 (${h.usd(h.P.otherFees2026.s24)} in 2026) after qualifying as a representative. This site covers the six exams most people start with; the other FINRA exams are listed with their fees on the fee page.` },
    ],
    body: (h) => {
      const X = h.X;
      return `
<h2>Jobs and their exams</h2>
${h.table(['Work', 'Exams', 'Fees 2026', 'Sponsor'], [
  ['Student or career changer, before a job', 'SIE', h.usd(X('sie').fee), 'no'],
  ['Stockbroker, general securities', 'SIE + Series 7 + Series 63', h.usd(X('sie').fee + X('s7').fee + X('s63').fee), 'for the Series 7'],
  ['Mutual funds and variable annuities only', 'SIE + Series 6 + Series 63', h.usd(X('sie').fee + X('s6').fee + X('s63').fee), 'for the Series 6'],
  ['Investment adviser representative', 'Series 65', h.usd(X('s65').fee), 'no'],
  ['Broker and adviser representative', 'SIE + Series 7 + Series 66', h.usd(X('sie').fee + X('s7').fee + X('s66').fee), 'for the Series 7'],
], `Fees read on the FINRA exam pages on ${h.date(h.P.retrieved_at)}. The state exam actually required depends on the states where you work.`, ['l', 'l', 'r', 'l'])}
<h2>The FINRA representative exams</h2>
<p>The ${h.a('series-7-exam', 'Series 7')} is the broadest: ${X('s7').scored} scored questions over ${h.hours('s7')}, covering equities, debt, options, funds, municipal securities and the rules around them. The ${h.a('series-6-exam', 'Series 6')} is narrower and shorter, ${X('s6').scored} questions in ${X('s6').minutes} minutes, for representatives who sell only packaged products. Both have the SIE as a corequisite: you can take them in either order, but the registration is approved only when both are passed (${h.src('finra_s7', 'Series 7 page')}, ${h.src('finra_s6', 'Series 6 page')}).</p>
<h3>Choosing between the 6 and the 7</h3>
<p>The Series 6 is easier to pass but limits what you can sell. Many firms that start new hires on the Series 6 later sponsor them for the Series 7 when their business grows; the SIE pass counts for both. If your employer offers a choice, look at the products you will actually handle in the first two years.</p>
<h2>The state exams written by NASAA</h2>
<p>NASAA writes three exams that FINRA delivers (${h.src('finra_s63', 'Series 63')}, ${h.src('finra_s65', 'Series 65')}, ${h.src('finra_s66', 'Series 66')}). The ${h.a('series-63-exam', 'Series 63')} tests state securities law for agents. The ${h.a('series-65-exam', 'Series 65')} tests investment knowledge and state law for adviser representatives, and needs no other exam. The ${h.a('series-66-exam', 'Series 66')} merges the two state roles but requires the Series 7. None of them needs a sponsor to enroll, though the state registration itself is filed through a firm.</p>
<h2>Order and timing</h2>
<p>Most people take the SIE first, then the representative exam once hired, then the state exam, often within the first months at the firm. The ${h.a('exam-fees', 'fee calculator')} adds up a whole path including retakes, and the ${h.a('sponsorship', 'sponsorship page')} explains what the firm files and when. The five questions above come from the agents section of the Series 63, which deals with exactly these state registrations.</p>
<h2>Common mistakes when choosing</h2>
<p>Three errors come up often. The first is taking the Series 65 when the job will involve commissions: the 65 alone does not allow a person to sell securities as a broker-dealer agent. The second is taking the Series 6 for a role that will soon include individual stocks or bonds, which then means a second representative exam. The third is sitting the Series 63 and the Series 65 separately when the Series 7 is also in the plan, where the single Series 66 would cover both state roles. Before enrolling, ask the firm which registrations it will file for you; the exams follow from that list, not the other way round.</p>
<p>Whatever the path, the practice tools of this site cover all six exams: pick the exam in the menu of the home page quiz, or go straight to its own page.</p>`;
    },
  },
});
