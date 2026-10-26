import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-difficulty',
  group: 'sie',
  order: 32,
  tool: { kind: 'mini:readiness', props: { e: 0 } },
  mini: { kind: 'quiz', props: { exam: 'sie', n: 5 } },
  related: ['sie-passing-score', 'sie-practice-exam', 'sie-vs-series-7', 'sie-products', 'series-7-study-time'],
  sources: ['finra_sie_outline', 'finra_sie', 'finra_s7'],
  en: {
    slug: 'sie-exam/difficulty',
    nav: 'How hard is the SIE?',
    card: 'How hard the SIE really is: what trips candidates, what makes it manageable, and a readiness estimate from your own practice rate.',
    title: 'SIE Exam Difficulty: What Makes It Hard and How to Judge',
    description: 'SIE exam difficulty: wide vocabulary, a heavy products section and tricky wording, offset by light math. Judge your own readiness from your practice rate, free.',
    h1: 'How hard is the SIE?',
    intro: 'Enter the share of practice questions you get right: the estimate shows what that rate would mean over a full exam, as a model, with its limits stated.',
    resume: (h) => {
      const S = h.X('sie');
      return `The SIE is an entry-level exam, open to students with no industry experience, but entry level does not mean easy. Its difficulty comes from breadth rather than depth: in ${S.scored} scored questions it touches regulators, economics, a long list of products, trading, accounts, compliance and conduct rules. Most of the questions test vocabulary and cause and effect, and a candidate who has never worked in finance has to learn several hundred terms, many of which look alike. The products section alone carries ${h.weight('sie', '2').items} questions, and it is where the closest pairs of concepts live: rights and warrants, open-end and closed-end funds, ETFs and ETNs. The wording adds a layer, with scenarios and questions that ask for the one false statement. On the other side, the math is light, the time of ${h.hours('sie')} is usually enough, and the outline tells you exactly what can be asked. FINRA publishes no pass rate, so nobody can tell you how hard it is for candidates in general; the useful question is how ready you are, and the calculator above estimates that from your practice results.`;
    },
    faqs: (h) => [
      { q: 'Is the SIE harder than the Series 7?', a: `No. The Series 7 covers much of the same ground in more depth, with ${h.X('s7').scored} scored questions over ${h.hours('s7')}, harder options and municipal material, and a slightly higher scaled line of ${h.X('s7').passScore}. The SIE is broader than it is deep. Candidates who pass the SIE comfortably usually find its vocabulary a real head start for the Series 7.` },
      { q: 'Can I pass the SIE with no finance background?', a: 'Yes, many students and career changers do, since the exam was designed for people outside the industry. The extra work is vocabulary: terms that a bank employee already knows have to be learned from scratch. Start with the products and trading sections, keep a running list of new terms, and expect the first practice scores to be low before they climb.' },
      { q: 'Which part of the SIE costs candidates the most points?', a: `Usually the products section, because of its weight (${h.weight('sie', '2').items} questions) and its many lookalike products, followed by the account and prohibited activity rules of section 3. Candidates also lose points on regulators in section 1, mixing up who writes rules and who enforces them. Sort your own practice misses by section to see where yours fall.` },
    ],
    body: (h) => {
      const S = h.X('sie'), T = h.X('s7');
      return `
<h2>What makes the SIE hard</h2>
<h3>Breadth</h3>
<p>The ${h.src('finra_sie_outline', 'content outline')} spans ${S.sections.length} sections and dozens of topics, from the Federal Reserve to 529 plans and insider trading. None is deep, but each brings its own terms, and the exam can pick any of them. The risk is not one hard topic but many small gaps.</p>
<h3>Lookalike concepts</h3>
<p>Many wrong options are correct statements about a neighboring product or rule. A candidate who half knows the difference between a general obligation and a revenue bond, or between a cash and a margin account, will find two answers that both look right. This is the main reason practice scores plateau.</p>
<h3>Wording</h3>
<p>Scenario stems hide the topic, and questions built on EXCEPT or NOT reverse the usual reading. Fatigue makes these errors more likely late in the sitting, which is why a full timed mock is worth sitting at least once.</p>
<h2>What makes it manageable</h2>
<ul>
<li>The math is limited to simple yields, breakevens, dividends and returns, far less than on the Series 7.</li>
<li>Time is rarely the problem: the ${h.hours('sie')} work out to about ${h.num((S.minutes * 60) / (S.scored + S.unscored))} seconds per item, pretest items included.</li>
<li>No penalty for wrong answers, so every item can be attempted.</li>
<li>The outline names every topic, so there are no surprises in scope, only in wording.</li>
</ul>
${h.table(['', 'SIE', 'Series 7'], [
  ['Scored questions', S.scored, T.scored],
  ['Time', h.hours('sie'), h.hours('s7')],
  ['Passing score (scaled)', S.passScore!, T.passScore!],
  ['Sponsor needed', 'no', 'yes'],
], `Formats from the ${h.src('finra_sie', 'SIE')} and ${h.src('finra_s7', 'Series 7')} pages of FINRA.`, ['l', 'r', 'r'])}
<h3>The math, in practice</h3>
<p>Expect small calculations rather than long ones: a current yield, the effect of a split on the share count and price, a cumulative preferred dividend, an option breakeven, a real return after inflation. Each takes a line of arithmetic once the rule is known. Candidates who fear numbers usually lose more points on vocabulary than on math.</p>
<h2>Judging your own readiness</h2>
<p>Since there is no official pass rate, compare yourself to the line, not to other candidates. The calculator at the top takes your practice rate and computes, with a simple binomial model, the chance of getting at least ${h.need('sie')} of ${S.scored} right if every question were answered at that rate. Read it with two warnings. First, practice on questions you have already seen inflates the rate; use fresh sets or full mocks. Second, the real exam is worded by FINRA, not by us, and a weak section can drag the score down more than the average suggests.</p>
<p>A rate in the low seventies leaves the result close to a coin toss. A rate in the low eighties, held over fresh questions in every section, gives a more comfortable estimate. The ${h.a('sie-passing-score', 'passing score page')} explains why the line itself is approximate.</p>
<h2>Making it easier</h2>
<p>Give the heaviest sections the most time, starting with ${h.a('sie-products', 'products and their risks')}. Practice in short sets with immediate corrections, then confirm with the ${h.a('sie-practice-exam', 'timed mock')}. Study time varies widely with background, and FINRA recommends no number of hours; the ${h.a('series-7-study-time', 'study time planner')} helps turn the hours you choose into a date. If you are deciding whether to take the SIE now or wait for a firm, the ${h.a('sie-vs-series-7', 'SIE and Series 7 comparison')} sets out the order of the two exams.</p>`;
    },
  },
});
