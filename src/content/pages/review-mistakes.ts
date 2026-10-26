import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'review-mistakes',
  group: 'rules',
  order: 90,
  tool: { kind: 'quiz', props: { exam: 'sie', mode: 'review', n: 10 } },
  mini: { kind: 'progress', props: { exam: 'sie' } },
  related: ['sie-practice-test', 'series-7-practice-test', 'series-65-exam', 'retake-rules'],
  sources: ['finra_sie_outline', 'finra_s7_outline', 'nasaa_s65_guide'],
  en: {
    slug: 'review-mistakes',
    nav: 'Review my mistakes',
    card: 'The questions you missed on this site, served again until they are right, and your progress per outline section.',
    title: 'Mistake Review: Missed SIE and Series Questions, Retried',
    description: 'Mistake review for the SIE and Series 6, 7, 63, 65, 66: every question you missed comes back until it is right, with progress kept only in your browser.',
    h1: 'Review the questions you missed',
    intro: 'Pick the exam: up to ten of the questions you got wrong on this site come back, in a new order, with the explanation after each answer.',
    resume: (h) => `Reviewing mistakes is the fastest way to raise a practice score, because a question you missed points at a gap in a precise topic of the outline, while a question you got right mostly confirms what you already know. Every time you answer a question on this site, in a practice set or in a mock, your browser notes whether the last answer was right. This page draws up to ten of the questions whose last answer was wrong, for the exam you choose, and shows the explanation and the outline point after each one. A question leaves the list as soon as you answer it correctly, and comes back if you miss it again later. The table under it counts, for each outline section, how many questions of our ${h.num(h.count)} you have practiced and the share right at the last attempt, next to the number of scored questions the real exam gives that section. All of it stays in your browser's local storage: no account, nothing sent, and one button erases it.`,
    faqs: (h) => [
      { q: 'Why is my review list empty?', a: 'The list fills only with questions you answered wrongly in this browser. If you practiced on another device, in a private window, or after clearing your browser data, nothing was saved here. Answer a practice set or a mock for the exam you picked first; every miss is then added, and the review draws from them.' },
      { q: 'Does a question shared between exams count for each of them?', a: `Yes. Some topics belong to several outlines, such as bond yields on the SIE, the Series 7 and the Series 65. A question tagged for several exams is stored once, by its identifier; if you missed it while practicing the SIE, it also appears when you review the Series 7, in the section where that exam's outline places it.` },
      { q: 'How should I use the progress table?', a: 'Read it against the weight column. A section with many scored questions on the real exam and a low share right is where the next hour of study pays most. A small section that is weak matters less. When every heavy section is well above the passing line in practice, a full timed mock is the right next step.' },
    ],
    body: (h) => `
<h2>How a mistake comes back</h2>
<p>The site keeps, for each question you answered, three things: how many times you saw it, how many times you were right, and whether the last answer was right. In practice mode the record is made the moment you answer; in a mock with the corrections at the end, it is made when you mark the test. The review mode picks among questions whose last answer was wrong, for the exam selected, shuffles them and serves at most ten. Answer one correctly and it leaves the list; miss a reviewed question again and it stays.</p>
<p>This works best in short rounds: ten minutes of review after each practice session, rather than one long session at the end of the week. A mistake reviewed the same day, and again a few days later, is far less likely to come back on exam day than one read once.</p>
<h2>Reading your progress per section</h2>
<p>The table compares three numbers per outline section: the scored questions the real exam gives it (from the official outline), the questions of our pool you have practiced, and the share right at your last attempt. The outline weights differ a lot between sections. On the SIE, ${h.short('sie', '2')} carries ${h.weight('sie', '2').items} of ${h.X('sie').scored} questions while the ${h.short('sie', '4').toLowerCase()} carries ${h.weight('sie', '4').items}. On the Series 7, the investments and recommendations function alone carries ${h.weight('s7', 'F3').items} of ${h.X('s7').scored}. On the Series 66, laws, rules and ethics carry ${h.weight('s66', '4').items} of ${h.X('s66').scored}.</p>
${h.table(['Exam', 'Heaviest section', 'Its scored questions', 'Share of the exam'], [
  ['SIE', h.short('sie', '2'), h.weight('sie', '2').items, h.pc(h.weight('sie', '2').share)],
  ['Series 7', h.short('s7', 'F3'), h.weight('s7', 'F3').items, h.pc(h.weight('s7', 'F3').share)],
  ['Series 6', h.short('s6', 'F3'), h.weight('s6', 'F3').items, h.pc(h.weight('s6', 'F3').share)],
  ['Series 63', h.short('s63', '3'), h.weight('s63', '3').items, h.pc(h.weight('s63', '3').share)],
  ['Series 65', h.short('s65', '3'), h.weight('s65', '3').items, h.pc(h.weight('s65', '3').share)],
  ['Series 66', h.short('s66', '4'), h.weight('s66', '4').items, h.pc(h.weight('s66', '4').share)],
], 'From the FINRA content outlines and the NASAA study guides. The Series 65 gives sections 3 and 4 the same weight.', ['l', 'l', 'r', 'r'])}
<h2>What is saved, and where</h2>
<p>Nothing leaves your device. The data sits in your browser's local storage under two keys, one for the questions and one for the last mock results (at most fifty of them). It holds question identifiers and right or wrong flags, never your name or anything you typed elsewhere. Another browser, another device or a private window starts empty, and the Erase button of the progress table wipes it at once, as does clearing your browser's site data.</p>
<p>Because the progress is local, a mock you take at a library computer will not follow you home. If you switch devices, simply practice a set or two per section on the new one: the review list rebuilds itself from your next mistakes.</p>
<h2>From review to a full mock</h2>
<p>Review fixes gaps; it does not measure readiness. Once your heaviest sections stay comfortably above the line, sit a full timed mock: the ${h.a('sie-practice-exam', 'SIE mock')} with ${h.X('sie').scored} questions in ${h.X('sie').minutes} minutes, the ${h.a('series-7-practice-exam', 'Series 7 mock')} with ${h.X('s7').scored} in ${h.X('s7').minutes}, or the NASAA mocks for the ${h.a('series-63-practice-exam', 'Series 63')}, ${h.a('series-65-practice-exam', 'Series 65')} and ${h.a('series-66-practice-exam', 'Series 66')}. The mistakes of the mock then feed this page again, and the cycle repeats until the score holds with a margin.</p>`,
  },
});
