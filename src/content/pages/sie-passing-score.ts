import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-passing-score',
  group: 'sie',
  order: 30,
  tool: { kind: 'mini:passline', props: { e: 0 } },
  mini: { kind: 'quiz', props: { exam: 'sie', n: 5 } },
  related: ['sie-practice-exam', 'sie-difficulty', 'retake-rules', 'series-7-passing-score', 'series-65-passing-score'],
  sources: ['finra_sie', 'finra_sie_outline', 'finra_1210'],
  en: {
    slug: 'sie-exam/passing-score',
    nav: 'SIE passing score',
    card: 'What the SIE pass mark of 70 means: a scaled score after equating, not 70 percent, and why no pass rate is published.',
    title: 'SIE Passing Score: What a Scaled 70 Means in Practice',
    description: 'SIE passing score explained: a scaled 70 after equating, not a flat 70 percent; about how many of 75 answers that implies, and why no official pass rate exists.',
    h1: 'The SIE passing score: a scaled 70',
    intro: 'Enter the number of correct answers from a full mock: the tool sets it against the passing line and shows the margin, with the limits of the comparison.',
    resume: (h) => {
      const S = h.X('sie');
      return `To pass the SIE you need a scaled score of ${S.passScore}, as stated on the ${h.src('finra_sie', 'FINRA SIE page')}. A scaled score is not a percentage of correct answers. FINRA delivers several forms of the exam with different questions, and it uses a statistical adjustment called equating to put every result on a common scale, so that a candidate who drew a slightly harder form is not penalized for it. The consequence is that the number of correct answers needed can vary a little from one form to another, and FINRA publishes no table converting correct answers into a scaled score. As a working guide, ${S.passScore}% of the ${S.scored} scored questions is ${h.need('sie')} correct answers, which leaves ${S.scored - h.need('sie')} that you can miss; our mock exams use that figure and label it an approximation. The ${S.unscored} unscored pretest items do not enter the score at all. There is no penalty for a wrong answer, so a guess always beats a blank. FINRA does not publish a pass rate for the SIE either, so any percentage you see quoted is not an official figure.`;
    },
    faqs: (h) => [
      { q: 'Is a 70 on the SIE the same as 70 percent correct?', a: `Not exactly. The ${h.X('sie').passScore} is a scaled score produced after equating the form you received with the others. On an average form it lands close to ${h.pc(h.X('sie').passScore! / 100)} of the scored questions, about ${h.need('sie')} of ${h.X('sie').scored}, but a harder form may need slightly fewer correct answers and an easier one slightly more. That is why a margin above the line matters in practice.` },
      { q: 'Does FINRA publish an SIE pass rate?', a: 'No. FINRA does not publish a current pass rate for the SIE or for its other qualification exams, and NASAA publishes none for the Series 63, 65 or 66. Figures circulating online are estimates or marketing claims with no official basis. Your own practice results, measured section by section on questions you have not seen before, are a more useful guide.' },
      { q: 'How many questions can I get wrong on the SIE?', a: `There is no exact number, because of equating, but the working figure is about ${h.X('sie').scored - h.need('sie')} of the ${h.X('sie').scored} scored questions. The ${h.X('sie').unscored} pretest items do not count either way, though you cannot tell which ones they are. Plan to miss fewer than that in practice, since questions written by FINRA will feel less familiar than the ones you rehearsed.` },
    ],
    body: (h) => {
      const S = h.X('sie');
      const rows = [S.passScore! - 10, S.passScore! - 5, S.passScore!, S.passScore! + 5, S.passScore! + 10, S.passScore! + 15].map((p) => {
        const r = Math.round((p / 100) * S.scored);
        return [`${h.pc(p / 100)}`, `${r} of ${S.scored}`, r >= h.need('sie') ? `above, margin ${r - h.need('sie')}` : `below by ${h.need('sie') - r}`];
      });
      return `
<h2>Why the score is scaled</h2>
<p>Every candidate receives a set of questions built from the same outline, in the same section proportions, but not the same questions. Even careful exam writers cannot make two sets exactly equal in difficulty. Equating measures the difference and adjusts the score so that everyone is held to the same standard of knowledge, whatever form they drew. The ${h.src('finra_sie_outline', 'content outline')} describes this process and the reason for it. For you, it means that the target is a level of knowledge, not a fixed count of right answers.</p>
<h3>What the line means for your target</h3>
<p>Because the conversion is unknown, aim your preparation at a level, not at a count. A sensible working target is to answer correctly well above ${h.pc(S.passScore! / 100)} of fresh practice questions in every section, so that a harder form, a few unfamiliar wordings and some fatigue still leave you on the right side of the line.</p>
<h2>Practice scores against the line</h2>
${h.table(['Share correct on a full mock', 'Correct answers', 'Against the working line'], rows, `Working line: ${h.need('sie')} of ${S.scored}, an approximation of a scaled ${S.passScore}.`, ['r', 'r', 'l'])}
<p>The calculator at the top of this page does the same for any score you enter. Treat a result just above the line as a coin toss: the real exam words things differently, and fatigue or one weak section can cost three or four answers. Results around ten points of percentage above the line, repeated on different draws, are a far stronger signal. The readiness calculator on the ${h.a('sie-difficulty', 'difficulty page')} turns a practice rate into a rough probability.</p>
<h3>Every answer counts the same</h3>
<p>The outline says there is no penalty for guessing, and the sections are not scored separately: a pass depends on the overall result. A weak section can be offset by a strong one, but since products and trading carry most of the questions, weakness there is hard to make up elsewhere.</p>
<h2>No official pass rate</h2>
<p>FINRA reports results to candidates but does not publish a current share of candidates who pass the SIE. Numbers quoted elsewhere are dated or unverified estimates, and none can be checked against a current official source. This site therefore shows none. What you can measure is your own level: full mocks on the ${h.a('sie-practice-exam', 'practice exam page')} give a result against the working line, and the five questions under this text give a quick sample.</p>
<h2>If the score falls short</h2>
<p>A failed attempt means a wait before the next one: ${h.P.retake.finra.firstAndSecondDays} days after a first or second failure today, ${h.P.retake.finraFrom.firstAndSecondDays} days from ${h.date(h.P.retake.finraFrom.date)} under the change FINRA has announced (${h.src('finra_1210', 'Rule 1210')}). The ${h.a('retake-rules', 'retake page')} gives your date and the full fee is due again. Use the wait to work on the sections where the gap was largest, then sit two mocks before booking. The same logic of a scaled line applies to the ${h.a('series-7-passing-score', 'Series 7')}, while the NASAA exams use a plain count of correct answers, as the ${h.a('series-65-passing-score', 'Series 65 passing score page')} shows.</p>`;
    },
  },
});
