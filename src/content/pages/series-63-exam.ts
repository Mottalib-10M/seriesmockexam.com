import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-63-exam',
  group: 'state',
  order: 10,
  tool: { kind: 'quiz', props: { exam: 's63', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:passline', props: { e: 3, r: 45 } },
  related: ['series-63-practice-exam', 'series-66-exam', 'which-license', 'retake-rules', 'series-7-exam'],
  sources: ['finra_s63', 'nasaa_s63_guide'],
  en: {
    slug: 'series-63-exam',
    nav: 'Series 63 exam guide',
    card: 'The Series 63 state law exam for securities agents: eight topics, 43 of 60 to pass, the 2026 fee and free practice questions.',
    title: 'Series 63 Exam 2026: State Law Topics, Pass Mark, Practice',
    description: 'Series 63 exam 2026: the NASAA state law test for securities agents, 60 scored questions in 75 minutes, 43 correct to pass, a $147 fee and free practice.',
    h1: 'The Series 63 exam: state securities law for agents',
    intro: 'Ten state law questions, corrected one at a time, with the topic menu to stay on one of the eight subjects. Format, scoring and study notes follow.',
    resume: (h) => {
      const X = h.X('s63');
      return `The Series 63, officially the Uniform Securities Agent State Law Examination, is the test most states rely on before registering a securities agent, that is a representative of a broker-dealer doing business with their residents. It is written by NASAA, the association of state securities regulators, and delivered by FINRA (${h.src('finra_s63', 'FINRA Series 63 page')}). The exam has ${X.scored} scored questions plus ${X.unscored} pretest questions, ${X.minutes} minutes in all, and the pass is plain: at least ${X.passCorrect} correct answers out of the ${X.scored} scored ones. The fee is ${h.usd(X.fee)} in 2026. Its content is law rather than products: the Uniform Securities Act of 1956, in the version updated by NASAA, NASAA model rules and statements of policy, and some federal rules. The ${h.src('nasaa_s63_guide', 'NASAA study guide')} spreads the questions over ${X.sections.length} subjects, with ethical practices (${h.weight('s63', '3').items} questions) and communication with customers (${h.weight('s63', '4').items}) carrying the most. Passing it does not by itself allow you to do business in a state: each state still has to register you, usually through your firm.`;
    },
    faqs: (h) => [
      { q: 'Can I enroll for the Series 63 without a firm?', a: 'Yes. A broker-dealer normally schedules the exam by filing a Form U4, but NASAA states that a person not associated with a FINRA member can enroll directly through FINRA\'s test enrollment system and pay the fee. FINRA then opens the usual testing window. The state registration itself still needs a firm, so the exam alone does not let you work as an agent.' },
      { q: 'Which law does the Series 63 test?', a: 'Mainly the Uniform Securities Act of 1956, in the version updated by NASAA, the model state statute, together with NASAA model rules and statements of policy and some federal law such as the Securities Exchange Act of 1934 and FINRA rules. The 2002 version of the uniform act is not tested. Questions may or may not name the rule they are about.' },
      { q: 'What does a candidate learn after failing the Series 63?', a: `Whether the result is a pass or a fail is shown at the end of the sitting. A candidate who fails is also told the score within each of the ${h.X('s63').sections.length} subject areas, which shows where to work before the retake. NASAA does not reveal the score on individual questions or the text of any question. The NASAA waiting period of ${h.P.retake.nasaa.firstAndSecondDays} days then applies.` },
    ],
    body: (h) => {
      const X = h.X('s63');
      const rows = X.sections.map((s) => [s.code, h.short('s63', s.code), s.items, h.pc(s.items / X.scored), h.inPool('s63', s.code)]);
      return `
<h2>The Series 63 in figures</h2>
${h.table(['', 'Series 63, 2026'], [
  ['Questions', h.items('s63')],
  ['Time', `${X.minutes} minutes`],
  ['To pass', `${X.passCorrect} of ${X.scored} scored questions correct`],
  ['Fee', h.usd(X.fee)],
  ['Written by', 'NASAA, delivered by FINRA'],
  ['Sponsor required', 'no, though agents are usually enrolled by their firm'],
  ['Retake waits', `${h.P.retake.nasaa.firstAndSecondDays} days, then ${h.P.retake.nasaa.thirdDays} after a third failure`],
], `NASAA study guide and the FINRA Series 63 page, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l'])}
<p>The mark is a count, not a scaled score: NASAA states the number of correct answers needed, so a candidate can reason directly in questions. With ${X.scored - X.passCorrect!} misses allowed out of ${X.scored}, the margin is real but thin. The calculator under this text sets any mock score against that line.</p>
<h2>The eight subjects</h2>
${h.table(['', 'Subject', 'Questions', 'Share', 'In our pool'], rows, 'Weights from the NASAA study guide; some pool questions are shared with the Series 65 and 66.', ['l', 'l', 'r', 'r', 'r'])}
<h3>Where the weight is</h3>
<p>Ethics and communications together make up ${h.pc((h.weight('s63', '3').items + h.weight('s63', '4').items) / X.scored)} of the exam. Ethics questions describe a practice, such as churning, unauthorized trading, a misleading statement or a loan from a customer, and ask whether it is permitted; NASAA's statement of policy on unethical practices of broker-dealers and agents is the reference. Communication questions mix records, privacy, and even options and margin handling. The adviser subjects carry few questions, but the exam expects an agent to know where advice for a fee begins, so the definitions matter.</p>
<h3>Remedies and the administrator</h3>
<p>The last subject, ${h.weight('s63', '8').items} questions, deals with what happens when the law is broken: the antifraud provisions, the powers of the state securities administrator to investigate, deny, suspend or revoke a registration and issue orders, and the civil and criminal liability of those who violate the act. The protection SIPC offers customers of a failed broker-dealer also belongs here. These questions reward knowing who may act and against whom.</p>
<h2>How the questions read</h2>
<p>Most items are short legal scenarios: an agent registered in one state calls a customer vacationing in another; a firm with no office in a state deals only with institutions there; an issuer relies on an exemption. The answer turns on a definition or an exclusion. The traps are words like "agent", "broker-dealer" and "person", which the uniform act defines precisely, and exclusions that look like exemptions. Each Series 63 is assembled individually from NASAA's pool with controls on difficulty and content, so two candidates sitting side by side will not see the same questions.</p>
<h2>Who needs it and when</h2>
<p>Most states expect agents of a broker-dealer to pass the Series 63, usually soon after the ${h.a('series-7-exam', 'Series 7')} or the Series 6. A representative who will also give advice for a fee can take the ${h.a('series-66-exam', 'Series 66')} instead, on top of the Series 7. The ${h.a('which-license', 'license finder')} maps roles to exams. After a failure, NASAA's own waiting periods apply, not FINRA's; the ${h.a('retake-rules', 'retake page')} gives the date.</p>
<p>When the practice sets above run well above the line in every subject, the ${h.a('series-63-practice-exam', 'full Series 63 mock')} checks the same mark on ${X.scored} questions under the clock.</p>`;
    },
  },
});
