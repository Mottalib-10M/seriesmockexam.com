import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-practice-test',
  group: 'series',
  order: 11,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'practice', section: 'F3', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 1, p: 75 } },
  related: ['series-7-practice-exam', 'series-7-questions', 'series-7-investments', 'review-mistakes', 'series-7-exam'],
  sources: ['finra_s7_outline', 'finra_s7'],
  en: {
    slug: 'series-7-exam/practice-test',
    nav: 'Series 7 practice test',
    card: 'Free Series 7 practice by job function, ten questions at a time, each answer explained with its outline point.',
    title: 'Series 7 Practice Test: Free Questions by Job Function',
    description: 'Series 7 practice test, free: ten questions at a time from one job function of the FINRA outline, each corrected and explained at once, your misses saved.',
    h1: 'Series 7 practice test, one function at a time',
    intro: 'The set opens on the heaviest function, investments and recommendations. Switch function in the menu; every answer is corrected straight away.',
    resume: (h) => `A practice test is the tool for learning, a mock exam the tool for measuring, and the two should not be confused. This page serves sets of ten Series 7 questions from one job function of the official outline at a time, corrects each answer the moment you give it and explains why the right option is right, with the outline point it trains. It opens on the third function, which FINRA weights at ${h.weight('s7', 'F3').items} of the exam's ${h.X('s7').scored} scored questions; the menu switches to seeking business (${h.weight('s7', 'F1').items}), opening accounts (${h.weight('s7', 'F2').items}) or orders and transactions (${h.weight('s7', 'F4').items}). Our pool holds ${h.inPool('s7')} questions for the Series 7, all written by Radif Partners from the outline topics, never copied from a prep book and never passed off as items from the live exam. Each wrong answer is saved in your browser, so that the review page can bring it back later. The estimate under this paragraph turns your practice rate into a chance of clearing the line on a full exam, as a statistical model rather than a promise.`,
    faqs: (h) => [
      { q: 'How many Series 7 practice questions should I answer before the exam?', a: 'There is no official figure, and the number matters less than the coverage: every function, with every wrong answer understood. A useful sign of readiness is when fresh practice sets in each function stay well above the passing line for a week, and a full mock confirms it. Repeating the same questions inflates the score without adding knowledge.' },
      { q: 'Why does the practice set start on the third function?', a: `Because it decides the exam: ${h.weight('s7', 'F3').items} of ${h.X('s7').scored} scored questions, covering equities, bonds, options, funds, suitability and taxes. A gap there cannot be made up elsewhere. Once it is solid, the smaller functions, mostly rules about accounts, communications and orders, are quicker to bring up to level.` },
      { q: 'Are the explanations enough to learn the material?', a: 'They explain the point a question tests and often the rule behind it, but they are not a course. Use them to find what you do not know, then read the topic in the outline and in your study material. A question you got right by luck deserves the same attention as a wrong one: read its explanation too.' },
    ],
    body: (h) => `
<h2>How to use the practice sets</h2>
<p>Work in short rounds of ten. After each round, read every explanation, then write down in one line the rule or the fact you were missing. That list, not the score, is the product of practice. When a function gives you three rounds in a row above the line, move to the next one; come back to it a week later to check that it stayed.</p>
${h.table(['Function', 'Exam questions', 'Our pool', 'Focus'], [
  ['F1', h.weight('s7', 'F1').items, h.inPool('s7', 'F1'), 'communications, new issues, research'],
  ['F2', h.weight('s7', 'F2').items, h.inPool('s7', 'F2'), 'account types, customer profile, approvals'],
  ['F3', h.weight('s7', 'F3').items, h.inPool('s7', 'F3'), 'products, suitability, taxes, records'],
  ['F4', h.weight('s7', 'F4').items, h.inPool('s7', 'F4'), 'quotes, orders, settlement, margin'],
], 'Exam weights from the FINRA outline of October 2025.', ['l', 'r', 'r', 'l'])}
<h2>Practice versus the real exam</h2>
<p>Practice sets are easier than the exam in one respect: they stay inside one function, so the context helps you. The real exam mixes everything, and switching from a margin question to a communications rule costs attention. That is why practice sets come first and ${h.a('series-7-practice-exam', 'full mocks')} second. Practice sets also correct as you go; a mock, like the exam, keeps the corrections until the end.</p>
<h3>Reading the readiness estimate</h3>
<p>The calculator above takes the share of practice questions you answer correctly and computes the chance of reaching the passing line on ${h.X('s7').scored} questions if every question were answered at that rate. It shows how quickly the odds improve with a few points of accuracy. Its limit is the assumption itself: real questions are worded differently and a weak function drags the score below your average.</p>
<h2>The topics candidates miss most</h2>
<ul>
<li>Options: positions, breakevens, spreads and the account rules that go with them (${h.a('options-math', 'options math')}).</li>
<li>Municipal securities: general obligation versus revenue bonds, official statements, tax treatment (${h.a('muni-bond-math', 'municipal bond math')}).</li>
<li>Suitability and know-your-customer duties: what to obtain, when to refuse an order.</li>
<li>Margin: deposits, equity and maintenance calls (${h.a('margin-math', 'margin math')}).</li>
</ul>
<p>Each has its own page with a calculator and a practice set. To see every question of a function with its answer instead of being quizzed, use the ${h.a('series-7-questions', 'question bank')}.</p>
<h2>Keeping track</h2>
<p>Your answers are stored in this browser only. The ${h.a('review-mistakes', 'review page')} draws from the questions you missed and shows, function by function, how many you have practiced and how many you got right the last time. Nothing is sent: switching devices starts a fresh record. When the record looks even across the four functions, book the timed mock, and use the ${h.src('finra_s7_outline', 'official outline')} as the checklist of topics still to cover.</p>
<h2>A weekly rhythm that works</h2>
<p>A simple schedule keeps practice honest. On weekdays, one or two sets of ten in the function you are studying, read in full. At the weekend, one mixed set per function to check that older material holds, then a round of review on the questions you missed during the week. Every second or third week, replace the weekend sets with a full timed mock. The aim is a steady rise in the weakest function, not a high score in the strongest: the exam does not let a good result in options make up for a poor one in suitability if both sit in the same heavy function.</p>`,
  },
});
