import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-practice-exam',
  group: 'series',
  order: 12,
  tool: { kind: 'quiz', props: { exam: 's7', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 1, done: 65 } },
  related: ['series-7-practice-test', 'series-7-passing-score', 'exam-day', 'review-mistakes', 'series-7-study-time'],
  sources: ['finra_s7', 'finra_s7_outline'],
  en: {
    slug: 'series-7-exam/practice-exam',
    nav: 'Series 7 mock exam',
    card: 'A full timed Series 7 mock: 125 questions split like the outline, the clock of the real exam, corrections at the end.',
    title: 'Series 7 Practice Exam: Full 125-Question Timed Mock, Free',
    description: 'Series 7 practice exam, free and timed: 125 questions in the official split of the four job functions, the real pace and a score by function at the end.',
    h1: 'Series 7 mock exam, full length and timed',
    intro: 'The clock starts with your first answer. Corrections wait until you mark the test, as on the day; switch to instant corrections if you prefer.',
    resume: (h) => {
      const S = h.X('s7');
      return `This mock reproduces the shape of the real Series 7: ${S.scored} scored questions, drawn so that each job function of the outline gets exactly its official number, ${S.sections.map((s) => `${s.items} for ${s.code}`).join(', ')}, then shuffled. The real exam adds ${S.unscored} unscored pretest questions and gives ${S.minutes} minutes for the ${S.scored + S.unscored}; the mock leaves out the unscored items and scales the clock to the scored ones, which keeps the same time per question. At the end you get your score, a breakdown by function and every missed question with its explanation. FINRA reports a scaled score, ${S.passScore} to pass, after equating the different forms of the exam, and publishes no table from correct answers to scaled score. The mock therefore compares your share of correct answers with ${S.passScore}%, that is ${h.need('s7')} of ${S.scored}, and labels that line an approximation: aim well above it rather than at it. Every draw is reproducible from the link, and your misses are kept in your browser for the review page.`;
    },
    faqs: (h) => [
      { q: 'How long should I give myself for a full Series 7 mock?', a: `Block out the full ${h.hours('s7')} without interruptions, as on the day. The clock of the mock runs from your first answer and the test is marked when it reaches zero. Doing the whole exam in one sitting is the point: stamina in the last hour is part of what the mock trains.` },
      { q: 'How many Series 7 mocks should I take?', a: 'Enough to see a stable score with margin, typically several spread over the last weeks of preparation, each followed by a review of every miss before the next one. A single good result can be luck with the draw. Two or three fresh mocks in a row above the line, with no function far below, is a more reliable signal.' },
      { q: 'Is the mock harder or easier than the real Series 7?', a: 'Nobody outside FINRA can say: the real items are not published, and our questions are written independently from the outline. What the mock does reproduce is the length, the time, the weight of each function and the mix of topics. Treat its score as a measure of your coverage of the outline, not as a prediction of your scaled score.' },
    ],
    body: (h) => {
      const S = h.X('s7');
      return `
<h2>What the mock draws</h2>
${h.table(['Function', 'Questions in the mock', 'Share'], S.sections.map((s) => [`${s.code}. ${h.short('s7', s.code)}`, s.items, h.pc(s.items / S.scored)]), `Official split of the ${S.scored} scored questions (${h.src('finra_s7_outline', 'outline')}).`, ['l', 'r', 'r'])}
<p>The draw takes the questions of each function from our pool, which includes questions shared with the SIE and the Series 6 where the topic is the same. A new draw gives a new mix; the link in the address bar replays the current one, so you can retake the same mock later to see whether the misses are fixed.</p>
<h2>Sitting it like the real thing</h2>
<ul>
<li>Choose corrections at the end, the setting closest to the real exam.</li>
<li>Use only a basic calculator and paper, the way the test center provides a four-function calculator and note boards.</li>
<li>No pauses: on the day, breaks do not stop the clock.</li>
<li>Check your pace at a few fixed points with the calculator under the citable block.</li>
</ul>
<p>The ${h.a('exam-day', 'exam day page')} lists the rest of the test center rules.</p>
<h2>Reading the result</h2>
<h3>The overall score</h3>
<p>Compare it with ${h.need('s7')} of ${S.scored}, the line the mock uses, and look at the margin rather than the verdict. A score just above the line on a single mock is fragile. A score several points above it on several fresh mocks is what you want before booking.</p>
<h3>The score by function</h3>
<p>The breakdown shows where the points went. A weak result in the third function, with its ${h.weight('s7', 'F3').items} questions, outweighs anything else; go back to the ${h.a('series-7-investments', 'investments and recommendations practice')} first. A weak result in a small function is quicker to fix, often with one evening on its rules.</p>
<h2>After the mock</h2>
<p>Go through every missed question listed under the test, then open the ${h.a('review-mistakes', 'review page')}, which serves them again in a new order until they are right. Space the next mock a few days later so that it measures learning rather than memory of the draw. When the results hold, the ${h.a('series-7-passing-score', 'passing score page')} explains the margin worth having, and the ${h.a('series-7-study-time', 'study planner')} helps fix the date to book.</p>
<h2>Managing the clock on a long exam</h2>
<p>At ${h.X('s7').scored + h.X('s7').unscored} questions in ${h.X('s7').minutes} minutes, the average is a little over a minute and a half per question, but the time is not spread evenly. Definitions and rules take seconds; options combinations, margin accounts and yield problems take two or three minutes each. A practical method is to answer every question on the first pass, marking the long calculations to come back to, so that no easy points are lost at the end. The pacing calculator shows how much time should remain after a given number of questions; check it at the end of each quarter rather than after every question, to keep your attention on the content.</p>
<p>Fatigue is the other enemy. Scores often drop in the last forty questions of a first mock, which is a reason to take several mocks at full length rather than shorter partial ones.</p>`;
    },
  },
});
