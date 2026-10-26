import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'exam-day',
  group: 'rules',
  order: 45,
  tool: { kind: 'mini:pace', props: { e: 1, done: 60 } },
  mini: { kind: 'quiz', props: { exam: 'sie', n: 5 } },
  related: ['scheduling', 'sie-practice-exam', 'series-7-practice-exam', 'retake-rules'],
  sources: ['finra_testcenter', 'finra_schedule', 'finra_sie'],
  demarche: true,
  en: {
    slug: 'exam-day',
    nav: 'Exam day',
    card: 'Arrival, ID, lockers, the calculator provided, breaks that do not stop the clock, pacing and how results are given.',
    title: 'FINRA Exam Day: ID, Breaks, Calculator, Pacing and Results',
    description: 'FINRA exam day: arrive 30 minutes early with matching photo ID, breaks that do not stop the clock, the calculator provided, pacing and how results come.',
    h1: 'Exam day at the test center',
    intro: 'Pick your exam and how far you are: the pacing tool tells you the seconds per question and the time you should have left at that point.',
    resume: (h) => `On the day of a FINRA exam at a test center, the rules come from FINRA's page on preparing for the appointment (${h.src('finra_testcenter', 'test center page')}). Arrive ${h.P.examDay.arriveMinutesBefore} minutes before the appointment; a candidate more than ${h.P.examDay.lateLimitMinutes} minutes late may lose the seat if the full testing time cannot be offered. Bring one valid, government-issued photo ID with a signature, in a name that matches the registration exactly; copies and expired documents are refused. Phones, watches, wallets and other personal items go into a locker, and study material is not allowed in the building. The center provides a four-function calculator, erasable note boards and markers, and noise-cancelling headphones. Breaks are allowed for the restroom only and the exam clock keeps running, so a break eats into the ${h.X('s7').minutes} minutes of the Series 7 or the ${h.X('sie').minutes} of the SIE. Results appear on screen shortly after the end, with a printed report: a pass report gives no score, while a fail report shows the overall score and the performance by section.`,
    faqs: (h) => [
      { q: 'Can I pause the clock to take a break?', a: 'No. According to FINRA\'s test center instructions, breaks are allowed only for the restroom, you may not leave the center or open your locker, and the timer keeps running. Plan for it: on a long exam such as the Series 7, a five-minute break costs about a dozen questions\' worth of time at the average pace.' },
      { q: 'Do I learn my score at the end of the exam?', a: 'You learn whether you passed, on screen shortly after you finish and on a printed report. A passing report does not show a score. A failing report shows the overall score and how you did in each section of the outline, which is the best starting point for planning the retake.' },
      { q: 'What happens if my ID does not match my registration?', a: 'FINRA asks for an exact match between the name on the photo ID and the name on the exam registration. A mismatch can mean you are turned away, with the fee lost under the no-show rules. Check the spelling, middle names and suffixes when the enrollment is filed, and ask the firm to correct the record well before the day.' },
    ],
    body: (h) => {
      const X = h.X;
      const rows = (['sie', 's7', 's6', 's63', 's65', 's66'] as const).map((e) => { const it = X(e).scored + X(e).unscored; return [h.label(e), it, `${X(e).minutes} min`, `${h.num((X(e).minutes * 60) / it)} s`]; });
      return `
<h2>Time per question, exam by exam</h2>
${h.table(['Exam', 'Questions on screen', 'Time', 'Average per question'], rows, 'Scored plus unscored questions, which look alike on screen. From the FINRA exam pages.', ['l', 'r', 'r', 'r'])}
<p>The averages are generous on paper, but questions are uneven: a definition takes twenty seconds, a margin or options calculation two minutes. The pacing tool above gives the time you should have left after a given number of questions. Check it at a few fixed points, every quarter of the exam for instance, rather than after each question.</p>
<h2>Before you leave home</h2>
<ul>
<li>One valid, government-issued photo ID with a signature, in the exact name of your registration.</li>
<li>The appointment confirmation, with the address of the center; plan to arrive ${h.P.examDay.arriveMinutesBefore} minutes early.</li>
<li>Nothing else of use: phones, watches and notes go into the locker, and the calculator and note boards are provided.</li>
</ul>
<p>If you booked the SIE online instead, the setup is different: a private room and a checked computer replace the travel. The ${h.a('scheduling', 'scheduling page')} compares the two and covers late changes.</p>
<h2>During the exam</h2>
<h3>Use the note board for calculations</h3>
<p>Write the formula before the numbers. For a margin question, put down the debit first; for an option, the breakeven. The provided calculator does arithmetic only, so square roots and exponents are not expected, and the ${h.a('bond-yields', 'yield shortcut')} is designed for it.</p>
<h3>Mark and move on</h3>
<p>Some questions are unscored pretest items, mixed in with the others, and you cannot tell which. Do not spend five minutes on one stubborn question: answer your best guess, mark it if the system allows, and come back at the end. An unanswered question is always wrong.</p>
<h2>After the exam</h2>
<p>A pass is shown on screen and printed, without a score. A fail shows the overall score and the result by outline section, and a waiting period starts before the next attempt: ${h.P.retake.finra.firstAndSecondDays} days after a first or second failure today, ${h.P.retake.finraFrom.firstAndSecondDays} days for FINRA exams from ${h.date(h.P.retake.finraFrom.date)} (${h.a('retake-rules', 'retake calculator')}). Rehearse the day with a full timed mock first: the ${h.a('sie-practice-exam', 'SIE mock')} or the ${h.a('series-7-practice-exam', 'Series 7 mock')} reproduce the length and the section weights.</p>
<h2>The day before</h2>
<p>Check the address and travel time to the center, and the ID you will bring against the name on your registration, letter by letter. Prepare nothing else to carry in: study notes are not allowed in the building and the locker is small. Sleep matters more than a last revision session, and a short review of the formulas you use most (breakevens, current yield, equity in a margin account) is enough. If you feel unwell, remember the change rules: a move made three to ten business days ahead costs half the fee, while not showing up costs all of it.</p>`;
    },
  },
});
