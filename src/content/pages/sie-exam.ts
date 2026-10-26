import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-exam',
  group: 'sie',
  order: 10,
  tool: { kind: 'quiz', props: { exam: 'sie', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:passline', props: { e: 0, r: 56 } },
  related: ['sie-practice-test', 'sie-practice-exam', 'sie-cost', 'sie-passing-score', 'sie-vs-series-7'],
  sources: ['finra_sie', 'finra_sie_outline', 'finra_fees', 'finra_schedule', 'finra_1210'],
  en: {
    slug: 'sie-exam',
    nav: 'SIE exam guide',
    card: 'The Securities Industry Essentials exam in 2026: format, four outline sections, fee, age, validity, with a practice set.',
    title: 'SIE Exam 2026: Format, Sections, Fee and Free Practice',
    description: 'SIE exam 2026: 75 scored questions in 1 hour 45, a scaled pass of 70, a $100 fee, no sponsor and a pass valid 4 years, with free practice by outline section.',
    h1: 'The SIE exam in 2026: what it covers and how to practice',
    intro: 'Ten questions drawn from the four sections of the official outline, each corrected and explained as you answer. Below: the format, the fee and the rules.',
    resume: (h) => {
      const S = h.X('sie');
      return `The Securities Industry Essentials (SIE) exam is FINRA's entry-level test of general securities knowledge, and the first exam most people take on the way to a Series 7 or Series 6 registration. It has ${S.scored} scored questions plus ${S.unscored} unscored pretest questions, lasts ${h.hours('sie')}, and is passed with a scaled score of ${S.passScore}. Since ${h.date(h.P.feeIncrease.effective)} the fee is ${h.usd(S.fee)}, up from ${h.usd(S.feePrev!)}. Unlike the other FINRA representative exams, the SIE needs no sponsoring firm: anyone aged ${S.minAge} or over can enroll, including students. The content outline splits the scored questions into four sections, from capital markets (${h.weight('sie', '1').items} questions) to products and their risks (${h.weight('sie', '2').items}), trading and customer accounts (${h.weight('sie', '3').items}) and the regulatory framework (${h.weight('sie', '4').items}). A pass stays valid for ${S.validYears} years, and it only leads to a registration once a firm sponsors you for a qualification exam such as the Series 7.`;
    },
    faqs: (h) => [
      { q: 'Do I need a job at a firm to take the SIE?', a: `No. The SIE is open to anyone aged ${h.X('sie').minAge} or over, without sponsorship by a FINRA member firm. You enroll yourself through FINRA's site, pay the fee and receive a ${h.P.windowDays}-day window to sit it. Passing it does not register you: registration needs a firm, which then sponsors you for a representative exam such as the Series 7 or the Series 6.` },
      { q: 'How many questions are on the SIE?', a: `The exam shows ${h.X('sie').scored + h.X('sie').unscored} questions: ${h.X('sie').scored} count towards the score and ${h.X('sie').unscored} are unscored pretest questions that FINRA is trying out for future exams. You cannot tell which ones are unscored, so every question deserves the same care. The ${h.hours('sie')} cover all of them.` },
      { q: 'Can I take the SIE online from home?', a: `Yes, the SIE is one of the exams FINRA offers for online delivery, ${h.P.online.sie}. You can also sit it at a test center. Other FINRA exams are delivered online ${h.P.online.others}, so most candidates sit the Series 7 in person.` },
      { q: 'Which section of the SIE weighs the most?', a: `Understanding Products and Their Risks: ${h.weight('sie', '2').items} of the ${h.X('sie').scored} scored questions, about ${h.pc(h.weight('sie', '2').share)} of the exam. It covers equities, debt, options, investment companies, variable contracts, direct participation programs and the risks attached to each. Trading, customer accounts and prohibited activities come next with ${h.weight('sie', '3').items} questions.` },
    ],
    body: (h) => {
      const S = h.X('sie');
      const rows = S.sections.map((s) => [s.code, h.a(['sie-capital-markets', 'sie-products', 'sie-trading', 'sie-regulation'][Number(s.code) - 1], s.name), s.items, h.pc(s.items / S.scored), h.inPool('sie', s.code)]);
      return `
<h2>The SIE in figures</h2>
${h.table(['', 'SIE, 2026'], [
  ['Questions', h.items('sie')],
  ['Time', h.hours('sie')],
  ['Passing score', `${S.passScore} (scaled)`],
  ['Fee', `${h.usd(S.fee)} (${h.usd(S.feePrev!)} until the end of 2025)`],
  ['Minimum age', `${S.minAge}`],
  ['Sponsoring firm', 'not needed'],
  ['Valid for', `${S.validYears} years`],
], `Read on the ${h.src('finra_sie', 'FINRA SIE page')} on ${h.date(h.P.retrieved_at)}.`, ['l', 'r'])}
<p>The scaled score is not a percentage. FINRA builds several forms of each exam and equates them, so that a slightly harder form needs a few fewer correct answers for the same score. Our ${h.a('sie-passing-score', 'passing score page')} explains what this means for your preparation, and why a practice score around ${h.pc(S.passScore! / 100)} is a starting line, not a safe margin.</p>
<h2>The four sections of the outline</h2>
<p>FINRA's ${h.src('finra_sie_outline', 'content outline')} lists every topic the SIE can test and gives each section a fixed number of scored questions. Our pools follow the same split, and each section has its own practice page.</p>
${h.table(['Section', 'Name in the outline', 'Scored questions', 'Share', 'Our questions'], rows, 'Outline in force since its October 2025 edition; our pools include questions shared with the Series 7 and 6.', ['l', 'l', 'r', 'r', 'r'])}
<p>The weights tell you where the points are. Section 2 alone carries ${h.pc(h.weight('sie', '2').share)} of the score; sections 2 and 3 together carry three quarters. A candidate who masters bonds, funds, options basics and account rules can afford a weaker result on the regulatory section, which has only ${h.weight('sie', '4').items} questions, but not the reverse.</p>
<h2>How to enroll and schedule</h2>
<p>You create an account with FINRA, enroll for the SIE and pay the ${h.usd(S.fee)} fee. FINRA then opens a ${h.P.windowDays}-day window in which the exam must be taken (${h.src('finra_schedule', 'scheduling page')}). Inside that window you choose a test center appointment or an online session. Moving or cancelling close to the date costs part or all of the fee, as our ${h.a('scheduling', 'scheduling page')} details with a calculator.</p>
<h3>After the exam</h3>
<p>A pass is valid for ${S.validYears} years. If no firm registers you in that time, the SIE has to be taken again before a registration (${h.src('finra_1210', 'FINRA Rule 1210')}). A fail means a waiting period before the next attempt: ${h.P.retake.finra.firstAndSecondDays} days after a first or second failure today, shortened to ${h.P.retake.finraFrom.firstAndSecondDays} days from ${h.date(h.P.retake.finraFrom.date)}. The ${h.a('retake-rules', 'retake calculator')} gives the exact date.</p>
<h2>A study plan that follows the outline</h2>
<p>Start with one practice set per section, using the menu of the quiz above, to see where you stand. Then work section by section, beginning with the heaviest one, and read every explanation, including those of questions you got right by luck. When your practice sets stay comfortably above ${h.pc(S.passScore! / 100)}, sit a ${h.a('sie-practice-exam', 'full timed mock')}: ${S.scored} questions in the official proportions. The ${h.a('review-mistakes', 'review page')} then serves again every question you missed, until it is right.</p>
<p>Most of the SIE is vocabulary and mechanics: what a callable bond is, why a bond price falls when rates rise, what a customer must sign before trading options. The math is light compared with the Series 7, but it is there: current yield, a breakeven on an option, the effect of inflation on a real return. The ${h.a('bond-yields', 'bond yield')} and ${h.a('options-math', 'options')} pages train it with calculators.</p>
<h2>SIE or Series 7 first?</h2>
<p>The SIE comes first for almost everyone, because the Series 7 and Series 6 registrations require it as a corequisite. The difference is in who pays and who decides: you take the SIE on your own, while a firm sponsors the Series 7. Our ${h.a('sie-vs-series-7', 'comparison')} sets the two side by side.</p>`;
    },
  },
});
