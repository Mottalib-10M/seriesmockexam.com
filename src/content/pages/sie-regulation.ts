import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-regulation',
  group: 'sie',
  order: 23,
  tool: { kind: 'quiz', props: { exam: 'sie', section: '4' } },
  mini: { kind: 'mini:retake', props: { e: 0 } },
  related: ['continuing-education', 'two-year-rule', 'retake-rules', 'sie-expiration', 'sponsorship'],
  sources: ['finra_sie_outline', 'finra_1210', 'finra_1240'],
  en: {
    slug: 'sie-exam/regulatory-framework',
    nav: 'SIE: regulatory framework',
    card: 'Section 4 of the SIE: registration, background checks, continuing education, Forms U4 and U5, outside activities and reportable events.',
    title: 'SIE Regulatory Framework: Section 4 Topics and Practice',
    description: 'SIE section 4, Overview of the Regulatory Framework: registration, statutory disqualification, continuing education, Forms U4 and U5, gifts, outside work.',
    h1: 'SIE section 4: overview of the regulatory framework',
    intro: 'Practice on the smallest section of the exam, about the rules that apply to you as an associated person. Notes and traps below.',
    resume: (h) => {
      const w = h.weight('sie', '4');
      return `The fourth and last section of the SIE outline, Overview of the Regulatory Framework, is about the rules that apply to people rather than products: who must register, how, and what an associated person must report while working in the industry. It is the smallest section, ${w.items} of the ${h.X('sie').scored} scored questions or about ${h.pc(w.share)} of the exam, which makes it tempting to skip; that would be a mistake, because the topics are finite and the questions predictable. The first block covers registration: the difference between registered and unregistered staff, fingerprinting and background checks, statutory disqualification, state registration and continuing education, with its Firm Element and Regulatory Element. The second covers conduct: Forms U4 and U5 and when they must be updated, customer complaints, outside business activities, private securities transactions, political contributions, gifts and entertainment, and personal events such as liens or bankruptcy. Several of these rules come from ${h.src('finra_1210', 'FINRA Rule 1210')} and ${h.src('finra_1240', 'Rule 1240')}, which also govern the exams themselves. Our pool holds ${h.inPool('sie', '4')} questions on this section.`;
    },
    faqs: (h) => [
      { q: 'What may an unregistered employee of a broker-dealer do?', a: 'Clerical and administrative work: scheduling appointments, sending materials approved by the firm, handling paperwork without discussing investments. An unregistered person may not solicit accounts, take orders or give investment advice, and the firm may not pay that person commissions on securities business. Many SIE questions ask you to sort tasks between these two lists.' },
      { q: 'What is the difference between Form U4 and Form U5?', a: 'Form U4 is the registration application filed by the firm when it hires a representative; it records employment history, disciplinary events and other disclosures, and it must be amended when the facts change. Form U5 is filed when the person leaves the firm and states the reason for the termination. Both feed the public record shown on BrokerCheck.' },
      { q: 'Must I tell my firm about a job outside the industry?', a: 'Yes. Under FINRA Rule 3270, a registered person must give the firm prior written notice of an outside business activity for which compensation is received or expected. Taking part in a securities transaction away from the firm is a separate matter, a private securities transaction under Rule 3280, which needs notice and, if paid, the firm\'s approval and supervision.' },
    ],
    body: (h) => `
<h2>Registration and qualification</h2>
<p>Anyone who deals with customers on securities business must be registered with the firm, which means passing the right exams and having the firm file a Form U4. Background checks include fingerprints sent to the FBI. Certain events, such as a felony conviction in the past ten years or an expulsion by a regulator, create a statutory disqualification that bars association with a member unless FINRA grants relief. States run their own registration under their securities laws, the blue-sky laws, which is why the Series 63 exists.</p>
<p>Passing the SIE alone registers no one. It proves general knowledge, stays valid for ${h.X('sie').validYears} years (${h.a('sie-expiration', 'expiration rules')}), and counts toward a registration once a firm sponsors you for a qualification exam such as the Series 7; the ${h.a('sponsorship', 'sponsorship page')} explains that step.</p>
<h3>Continuing education</h3>
<p>Registration comes with continuing education under ${h.src('finra_1240', 'Rule 1240')}. The Regulatory Element is set by FINRA and is due each year by December 31; the Firm Element is the training each firm designs for its own people. A registration whose Regulatory Element is not done on time becomes CE inactive. Details and a deadline calculator are on the ${h.a('continuing-education', 'continuing education page')}.</p>
<h2>Conduct and reportable events</h2>
<p>The outline asks what must be disclosed and when. Expect questions on:</p>
<ul>
<li>keeping the Form U4 current after events such as a criminal charge, a lien, a bankruptcy or a customer complaint;</li>
<li>the consequences of filing false or incomplete information, which can itself be a violation;</li>
<li>written customer complaints and their handling by the firm;</li>
<li>outside business activities and private securities transactions;</li>
<li>political contributions to municipal officials, which can bar a firm from municipal business for a period;</li>
<li>gifts, entertainment and non-cash compensation, which are capped or must be reasonable and recorded.</li>
</ul>
<h3>Traps in this block</h3>
<ul>
<li>Business entertainment, where the representative attends, is treated differently from a gift handed over.</li>
<li>Notice of an outside job is due before it starts, not at the next annual review.</li>
<li>An SIE pass gives no right to talk to customers about securities: the registration filed by a firm is still missing.</li>
</ul>
<h2>Exam rules you will live by</h2>
<p>Rule 1210 also sets the rules for the exams: waiting periods after a failure, the life of an SIE pass and the lapse of qualifications after leaving a firm. The calculator under this text gives the earliest retake date after a failed SIE. Today the wait is ${h.P.retake.finra.firstAndSecondDays} days after a first or second failure and ${h.P.retake.finra.thirdDays} after a third; FINRA has announced shorter periods of ${h.P.retake.finraFrom.firstAndSecondDays} and ${h.P.retake.finraFrom.thirdDays} days from ${h.date(h.P.retake.finraFrom.date)} (${h.a('retake-rules', 'retake rules')}). After a registration ends, qualifications generally lapse after ${h.P.lapseYears} years unless you join the Maintaining Qualifications Program (${h.a('two-year-rule', 'two-year rule page')}).</p>
<h2>Studying section 4</h2>
<p>Most of this material will apply to you personally from your first day at a firm, which makes it easier to remember if you read it as your own rulebook. Treat this section as a checklist. Build one sheet listing each form, each report and each permission, with who files it and when, and test yourself on it until nothing is missing. Because the section is short, a weekly pass with the set above is enough to keep it fresh while you spend most of your time on products and trading. Pair it with the ${h.a('sie-trading', 'trading and accounts page')}, since conduct rules and prohibited activities overlap in many questions.</p>`,
  },
});
