import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'series-7-questions',
  group: 'series',
  order: 13,
  tool: { kind: 'bank', props: { exam: 's7', section: 'F3' } },
  mini: { kind: 'quiz', props: { exam: 's7', n: 5 } },
  related: ['series-7-investments', 'series-7-practice-test', 'series-7-practice-exam', 'options-math', 'muni-bond-math'],
  sources: ['finra_s7_outline', 'finra_s7'],
  en: {
    slug: 'series-7-exam/questions',
    nav: 'Series 7 sample questions',
    card: 'Every Series 7 question of our investments and recommendations pool, with the answer and the reasoning behind it.',
    title: 'Series 7 Questions: Free Sample Items, Answers Explained',
    description: 'Series 7 sample questions with answers and the reasoning behind each one, for the heaviest job function, plus a worked municipal bond item and a quick check.',
    h1: 'Series 7 sample questions with answers',
    intro: 'The list opens with every question we wrote for the third job function, answer and explanation included. Hide the answers if you want to test yourself first.',
    resume: (h) => {
      const S = h.X('s7');
      const w = h.weight('s7', 'F3');
      return `Series 7 questions differ from SIE questions less in topic than in depth. Where the SIE asks what a product is, the Series 7 usually hands you a customer, a position or a bond and asks for the consequence: the breakeven of a spread, the tax result of a premium bond held to maturity, the share class that fits a given amount. Each of the ${S.scored} scored items has four choices and no penalty for a wrong guess, according to FINRA's ${h.src('finra_s7_outline', 'content outline')}. The list on this page shows every question of our pool for the third job function, investments, recommendations, transfers and records, which carries ${w.items} scored items, close to ${h.pc(w.share)} of the exam. Our pool holds ${h.inPool('s7', 'F3')} questions for that function and ${h.inPool('s7')} for the Series 7 overall. Radif Partners wrote them from the outline topics; none is an exam item, since FINRA keeps its items confidential, and none is copied from a book. Read them as a map of what the function can ask, then switch to timed practice.`;
    },
    faqs: (h) => [
      { q: 'Are Series 7 questions mostly calculations?', a: 'No. A minority of items require arithmetic, mainly options, margin, bond yields, accrued interest and fund pricing. Most questions test whether you can apply a rule or a product feature to a customer situation. The calculations still deserve early work, because a single slip in a breakeven or a margin call costs the point even when the concept is understood.' },
      { q: 'Why is the Series 7 question list limited to one function?', a: `Because that function decides the result: ${h.weight('s7', 'F3').items} of ${h.X('s7').scored} scored items. Reading its questions in one place shows how wide it is, from financial ratios to municipal refundings. The pages for seeking business, opening accounts and orders each serve a practice set of their own function, so the smaller parts of the outline are covered elsewhere on the site.` },
      { q: 'Can I memorize these questions to pass?', a: 'Memorizing answers will not carry over, because the exam phrases every point its own way and our items are written independently. What carries over is the rule or the mechanism each explanation names. Read the reasoning, close the list, and then answer fresh practice sets: if you can explain why three choices are wrong, the knowledge is yours.' },
    ],
    body: (h) => {
      const ex = h.q('s7-F3-070');
      const L = ['A', 'B', 'C', 'D'];
      const pages = ['series-7-seeking-business', 'series-7-opening-accounts', 'series-7-investments', 'series-7-orders'];
      const S = h.X('s7');
      return `
<h2>Four shapes of Series 7 item</h2>
<p>After writing and reviewing the pool, we sort the items of the third function into four recurring shapes. Recognizing the shape in the first seconds tells you what kind of work the item expects.</p>
<ul>
<li><strong>The customer profile:</strong> an age, an income, an objective and sometimes a tax bracket, followed by four products. Only one matches every fact given; the others fail on one detail, often liquidity or time horizon.</li>
<li><strong>The position:</strong> an option, a convertible, a bond bought at a premium. The question wants a number or a direction, and the trap is usually a sign error or a confusion between buyer and writer.</li>
<li><strong>The disclosure:</strong> what must reach the customer, and when, before or after a sale. These reward precise reading of the stem.</li>
<li><strong>The record:</strong> statements, confirmations, account transfers and changes of address. Short, rule based, and quick points once the rules are learned.</li>
</ul>
<h2>A worked item on municipal bond taxes</h2>
${ex ? `<p><em>${ex.q}</em></p>
<ul>${ex.options.map((o, i) => `<li>${L[i]}. ${o}</li>`).join('')}</ul>
<p>Answer: <strong>${L[ex.answer]}. ${ex.options[ex.answer]}</strong>. ${ex.explain}</p>` : ''}
<p>This item mixes two outline topics, municipal securities and the tax treatment of debt, which is typical of the function. The reasoning runs in three steps: identify the security (tax exempt interest), recall the rule attached to a premium on that security (mandatory amortization, no deduction), then follow the basis to maturity. Candidates who know corporate bond taxation but not the municipal exception pick the capital loss. Our ${h.a('muni-bond-math', 'municipal bond math page')} has a calculator for taxable equivalent yields, the other tax question the outline loves.</p>
<h2>Reading the list without fooling yourself</h2>
<h3>Cover, commit, then look</h3>
<p>The temptation with an answer list is to read the question and glance straight at the solution. Recognition feels like knowledge but is much weaker than recall. Hide the answers, choose an option, and only then read the explanation. Keep a tally of the ones you got wrong or guessed: that tally is your study list for the week.</p>
<h3>Read the wrong choices too</h3>
<p>Each distractor in our pool was written to catch a specific mistake: the full market return multiplied by beta, the premium deducted at once, the call buyer treated as a writer. When you understand why a wrong option looks attractive, you are protected against the same trap in different words on the day.</p>
<h2>The other functions and their pools</h2>
${h.table(['Function', 'Scored on the exam', 'Our pool', 'Practice page'], S.sections.map((s, i) => [s.code, s.items, h.inPool('s7', s.code), h.a(pages[i], h.short('s7', s.code))]), 'Pool counts read from the bank when the site is built; some items are shared with the SIE or the Series 6.', ['l', 'r', 'r', 'l'])}
<p>The three smaller functions together count ${S.scored - h.weight('s7', 'F3').items} scored items. They are mostly rule questions: who approves a retail communication, which signature an options account needs, when a confirmation goes out. Fewer points, but quick ones once the rules are clear.</p>
<h2>Next steps after reading</h2>
<p>The five-question set below the citable block draws from the whole Series 7 pool, so it measures more than the list above. Then move on to ${h.a('series-7-practice-test', 'ten-question practice sets')} by function, and keep the ${h.a('series-7-practice-exam', 'full timed mock')} for when every function holds above the line. Options items are the ones candidates leave for last and regret: the ${h.a('options-math', 'options math page')} turns breakevens and maximum losses into a two-minute routine.</p>`;
    },
  },
});
