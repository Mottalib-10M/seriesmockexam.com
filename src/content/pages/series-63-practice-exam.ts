import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-63-practice-exam',
  group: 'state',
  order: 11,
  tool: { kind: 'quiz', props: { exam: 's63', mode: 'exam', timed: true } },
  mini: { kind: 'mini:pace', props: { e: 3 } },
  related: ['series-63-exam', 'review-mistakes', 'retake-rules', 'exam-day', 'series-66-practice-exam'],
  sources: ['nasaa_s63_guide', 'finra_s63'],
  en: {
    slug: 'series-63-exam/practice-exam',
    nav: 'Series 63 practice exam',
    card: 'A full Series 63 mock: 60 state law questions in the NASAA subject quotas, timed, marked against the real count of 43.',
    title: 'Series 63 Practice Exam: Full Timed Mock Marked on 43 of 60',
    description: 'Series 63 practice exam: a full mock of 60 state law questions in the NASAA subject quotas, timed, marked on the same 43-correct line as the real test.',
    h1: 'Series 63 practice exam, full length and timed',
    intro: 'A complete state law mock, with each subject at its NASAA quota. Answers are revealed only when you submit, along with a score per subject.',
    resume: (h) => {
      const X = h.X('s63');
      return `This Series 63 practice exam reproduces the scored part of the real test: ${X.scored} questions, with each of the ${X.sections.length} NASAA subjects represented by its official number, from ${h.weight('s63', '3').items} questions on ethical practices to ${h.weight('s63', '6').items} on investment advisers. Because NASAA sets the pass as a count, at least ${X.passCorrect} correct answers out of ${X.scored}, the verdict of a full mock here uses exactly the same line, with no conversion or estimate in between. What the mock leaves out are the ${X.unscored} unscored pretest items the real exam slips in, since they never affect a result. On exam day the ${X.minutes} minutes cover ${X.scored + X.unscored} items, so the pace to hold is about ${h.num((X.minutes * 60) / (X.scored + X.unscored))} seconds per question; the calculator under this text shows where you should be at any point. The mock is marked when you submit, with a score for each subject. That mirrors what NASAA tells a candidate who fails, and it is the most useful part of the result: it shows which subject to work on before the next attempt, real or practice.`;
    },
    faqs: (h) => [
      { q: 'Is passing the Series 63 mock the same as passing the real one?', a: `The line is the same, ${h.X('s63').passCorrect} of ${h.X('s63').scored}, so the mock verdict is exact for the questions you saw. The questions are not the same: ours are written by Radif Partners from the NASAA topics, while the real ones come from NASAA's own pool and wording. Treat a pass with a margin of three or four answers as the target, not a bare pass.` },
      { q: 'How fast should I answer Series 63 questions?', a: `About ${h.num((h.X('s63').minutes * 60) / (h.X('s63').scored + h.X('s63').unscored))} seconds each, counting the pretest items you cannot identify. Most state law questions are short, so many candidates finish early; the time is better spent rereading scenarios with an exclusion or an exemption in them. If a question still looks ambiguous after a second reading, mark it, pick an answer and move on.` },
      { q: 'Which Series 63 subjects deserve a second mock?', a: `The ones where your mock score per subject falls below the overall line, especially ethical practices (${h.weight('s63', '3').items} questions) and communications (${h.weight('s63', '4').items}), which together decide nearly half of the result. A low score on a small subject such as adviser representatives matters less, but it is cheap to fix with a short set of definitions.` },
    ],
    body: (h) => {
      const X = h.X('s63');
      const per = (X.minutes * 60) / (X.scored + X.unscored);
      return `
<h2>What the mock measures</h2>
${h.table(['', 'Real Series 63', 'This mock'], [
  ['Scored questions', X.scored, X.scored],
  ['Pretest questions', X.unscored, 'none'],
  ['Subject quotas', X.sections.map((s) => s.items).join(' / '), 'identical'],
  ['Pass', `${X.passCorrect} correct`, `${X.passCorrect} correct`],
  ['Feedback', 'pass or fail; subject scores after a fail', 'every answer explained, subject scores'],
], `Format from the ${h.src('nasaa_s63_guide', 'NASAA Series 63 study guide')}.`, ['l', 'r', 'r'])}
<p>The pool holds ${h.inPool('s63')} questions for this exam, so several mocks can be drawn before questions repeat often. Each draw is shuffled, mixing subjects the way the real exam does.</p>
<h2>A timing plan for ${X.minutes} minutes</h2>
<p>At about ${h.num(per)} seconds per item, the clock is generous for most state law questions, which are a few lines long. Three checkpoints keep the pace honest: a third of the items by the first third of the time, two thirds by the second, and a reserve at the end for flagged questions. The pace calculator under this text converts any number of answered questions into minutes used and left.</p>
<h3>Where time actually goes</h3>
<p>Long questions are those built on a fact pattern with several parties: an issuer, an agent, a customer in another state. Read the last line first, so you know whether the question asks about the agent, the broker-dealer or the security, then read the facts with that in mind.</p>
<h2>After the mock: turning the score into a plan</h2>
<p>Read the subject scores before the overall one. A result of ${X.passCorrect + 4} that hides a weak ethics score is more fragile than it looks, because ethics carries ${h.weight('s63', '3').items} questions and every draw tests it heavily. Then work through each missed question:</p>
<ul>
<li>a definition missed (agent, broker-dealer, investment adviser representative): add it to a list and recite it until exact;</li>
<li>an exclusion or exemption confused: build a two-column sheet, excluded from the definition on one side, exempt from registration on the other;</li>
<li>an ethical practice misjudged: write the rule in your own words with one example of a breach.</li>
</ul>
<p>Every miss also goes to the ${h.a('review-mistakes', 'review page')}, which draws only from questions you got wrong, stored in this browser.</p>
<h2>Small subjects, quick wins</h2>
<p>Three subjects carry few questions each: securities and issuers (${h.weight('s63', '5').items}), investment advisers (${h.weight('s63', '6').items}) and adviser representatives (${h.weight('s63', '7').items}). In a mock they are easy to neglect, since a miss there costs only one answer at a time. Yet together they weigh as much as communications, and their content is narrow: the registration of securities and its exemptions, the definition of an adviser and of a representative, and the line between state and federal oversight. One evening of definitions, followed by a mixed practice set on the ${h.a('series-63-exam', 'guide page')}, usually secures most of those points for good. That leaves the following mock free to measure ethics and communications, where the real margin is won.</p>
<h2>When to book the real exam</h2>
<p>Two mocks on fresh draws, both clear of the line with every large subject above it, are a sound signal. If a mock falls short, use the practice sets on the ${h.a('series-63-exam', 'Series 63 guide')} to rebuild the weak subjects, then try again a few days later. The ${h.a('exam-day', 'exam day page')} covers the test center routine, and if the real exam goes wrong, NASAA's waiting periods apply (${h.a('retake-rules', 'retake calculator')}). Candidates aiming at both agent and adviser roles can compare this mock with the ${h.a('series-66-practice-exam', 'Series 66 mock')}.</p>`;
    },
  },
});
