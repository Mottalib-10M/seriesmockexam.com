import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sponsorship',
  group: 'rules',
  order: 15,
  tool: { kind: 'mini:license', props: { r: 2 } },
  mini: { kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } },
  related: ['which-license', 'sie-exam', 'series-7-exam', 'exam-fees', 'continuing-education'],
  sources: ['finra_1210', 'finra_s7', 'finra_s6', 'finra_sie', 'finra_s65'],
  demarche: true,
  en: {
    slug: 'firm-sponsorship',
    nav: 'Firm sponsorship',
    card: 'Which exams need a sponsoring firm, what the firm files, and what you can pass on your own before you are hired.',
    title: 'Series 7 Sponsorship: Firm Filings and Exams That Need It',
    description: 'Series 7 sponsorship: why the Series 7 and 6 need a FINRA member firm, what the firm files, and which exams (SIE, 63, 65, 66) you can take on your own.',
    h1: 'Firm sponsorship: who enrolls you, and for which exams',
    intro: 'The finder shows, for each kind of job, which exams a firm must sponsor and which you can sit on your own before anyone hires you.',
    resume: (h) => `Sponsorship means that a FINRA member firm, usually your employer, enrolls you for an exam and associates the result with a registration it files for you. The Series 7 and the Series 6 cannot be taken without it (${h.src('finra_s7', 'Series 7 page')}, ${h.src('finra_s6', 'Series 6 page')}): the firm files the registration on Form U4, which also opens the exam enrollment, and pays or charges the fee, ${h.usd(h.X('s7').fee)} for the Series 7 in 2026. The SIE is the exception among FINRA exams: anyone aged ${h.X('sie').minAge} or over can enroll on their own (${h.src('finra_sie', 'SIE page')}), and a pass stays valid for ${h.X('sie').validYears} years while you look for a firm. The NASAA exams, the Series 63, 65 and 66, do not need a sponsor to be taken either (${h.src('finra_s65', 'Series 65 page')}), but the state registration they lead to is filed through a firm. In practice, a job seeker passes the SIE, sometimes the Series 65, then lets the hiring firm sponsor the Series 7 or 6 and the state exam once the offer is signed.`,
    faqs: (h) => [
      { q: 'Can I get sponsored for the Series 7 without being hired?', a: 'Sponsorship comes from a FINRA member firm that intends to register you, so in practice it follows a job offer or an internship that leads to registration. There is no route to sit the Series 7 as an independent candidate. What you can do alone is the SIE and the NASAA exams, which show an employer that you have done the groundwork.' },
      { q: 'What is Form U4?', a: 'It is the uniform application for securities industry registration, filed by the firm through FINRA\'s registration system. It holds your employment history, disclosure questions and the registrations requested, and it triggers the exam enrollments those registrations need. Answers must be accurate and kept up to date: false or late disclosures are a regulatory matter in themselves.' },
      { q: 'If I change firms, do I need to retake my exams?', a: `No, as long as the new firm registers you within ${h.P.lapseYears} years of the end of your previous registration. The old firm files a Form U5 when you leave, the new one a new Form U4. After that period, the exams lapse unless you joined the Maintaining Qualifications Program, which extends the limit to ${h.P.mqp.maxYears} years.` },
    ],
    body: (h) => `
<h2>Which exams need a sponsor</h2>
${h.table(['Exam', 'Sponsor needed to enroll', 'Who usually pays'], [
  ['SIE', 'no', 'you'],
  ['Series 7', 'yes, a FINRA member firm', 'the firm, often'],
  ['Series 6', 'yes, a FINRA member firm', 'the firm, often'],
  ['Series 63', 'no', 'the firm if it asked for it, otherwise you'],
  ['Series 65', 'no', 'the firm if it asked for it, otherwise you'],
  ['Series 66', 'no (the Series 7 is also needed for the registration)', 'the firm, often'],
], `Sponsorship rules from the FINRA exam pages, read on ${h.date(h.P.retrieved_at)}. Who pays is a matter between you and the firm.`, ['l', 'l', 'l'])}
<h2>What the firm files</h2>
<p>The firm submits Form U4 for the registrations it wants you to hold, for example general securities representative. FINRA enrolls you in the matching exams and posts a ${h.P.windowDays}-day window. The firm also files the state registrations, which is when the Series 63, 65 or 66 comes in. When you pass, the registration is approved once every exam it needs is passed, including the SIE as corequisite of the Series 7 or 6, and once the firm has finished its own checks.</p>
<h3>Background checks</h3>
<p>The registration process includes fingerprinting and disclosure questions on past regulatory, criminal and financial events. Some events can lead to statutory disqualification. If you have something to disclose, discuss it with the firm's compliance department before the filing rather than after.</p>
<h2>Building a profile before sponsorship</h2>
<p>Passing the SIE early shows a firm that you can handle the basics and spares it one exam on your start date. A pass lasts ${h.X('sie').validYears} years (${h.a('sie-expiration', 'SIE expiration calculator')}), long enough to cover a degree's final years and a job search. Candidates aiming at advisory work can also pass the ${h.a('series-65-exam', 'Series 65')} without a sponsor, though it only becomes useful once an adviser firm registers them.</p>
<h2>When the firm is paying</h2>
<p>A sponsored exam often comes with conditions: a date by which you must pass, a limit on the number of attempts the firm will pay for, sometimes a repayment clause if you leave within a year. Ask for these conditions in writing. The waiting periods after a failure, described on the ${h.a('retake-rules', 'retake page')}, can push your start in the job back by weeks, so a first-time pass is worth the extra mock exam. The five questions above train the regulatory section of the SIE, where registration and Form U4 sit in the outline.</p>
<h2>Questions to ask the firm before it files</h2>
<ul>
<li>Which registrations will you file for me, and therefore which exams, in which order?</li>
<li>Who pays the fees, including retakes, and is there a repayment clause?</li>
<li>By what date must I pass, and what study time or material does the firm provide?</li>
<li>Which states will I be registered in, and which state exam do they accept?</li>
</ul>
<p>The answers fix your study plan and your budget. The ${h.a('exam-fees', 'fee calculator')} prices the whole path in 2026 terms.</p>
<p>Keep a copy of what the firm tells you in writing. If you leave before passing, the enrollment ends with the association, and a new firm will have to file again; your SIE, which needed no sponsor, stays yours for its four years.</p>`,
  },
});
