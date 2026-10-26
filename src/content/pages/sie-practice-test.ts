import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-practice-test',
  group: 'sie',
  order: 11,
  tool: { kind: 'quiz', props: { exam: 'sie', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 0 } },
  related: ['sie-practice-exam', 'sie-questions', 'review-mistakes', 'sie-passing-score', 'sie-exam'],
  sources: ['finra_sie_outline', 'finra_sie'],
  en: {
    slug: 'sie-exam/practice-test',
    nav: 'SIE practice test',
    card: 'Free SIE practice test: short sets by outline section, each answer corrected and explained on the spot, progress kept in your browser.',
    title: 'SIE Practice Test 2026: Free Sets With Instant Corrections',
    description: 'Free SIE practice test: ten-question sets by outline section, each answer marked and explained at once, with a readiness estimate built from your own hit rate.',
    h1: 'SIE practice test: short sets, instant corrections',
    intro: 'Answer and see at once whether you were right, and why. Switch section in the menu to aim at a weak spot; every answer is remembered in this browser for the review page.',
    resume: (h) => {
      const S = h.X('sie');
      return `An SIE practice test on this site is a short set of questions, corrected one by one: you pick an answer, the set tells you straight away whether it was right and explains why the other choices fail. That makes it a learning tool rather than a dress rehearsal, which is the job of the ${h.a('sie-practice-exam', 'timed mock exam')}. The questions are written by Radif Partners from the topics of FINRA's ${h.src('finra_sie_outline', 'SIE content outline')}, and the pool holds ${h.inPool('sie')} of them spread over the ${S.sections.length} sections, from capital markets to the regulatory framework. The menu of the set lets you stay on a single section, so you can spend an evening on the ${h.weight('sie', '2').items} product questions of the exam without wading through rules you already know. The exam itself counts ${S.scored} scored questions and is passed with a scaled score of ${S.passScore}; a practice rate that sits clearly above ${h.pc(S.passScore! / 100)} across every section is the usual signal that a full mock is worth sitting. Each answer is stored in your browser only, never sent, and feeds the list of questions to review.`;
    },
    faqs: (h) => [
      { q: 'How many SIE practice questions does this site hold?', a: `The SIE pool counts ${h.inPool('sie')} questions in 2026, split across the ${h.X('sie').sections.length} outline sections and including some shared with the Series 7 and Series 6 where the topic is the same. Each set draws ten of them, and the section menu narrows the draw. New questions are added over time, and the count shown here updates by itself.` },
      { q: 'Are these the questions FINRA puts on the SIE?', a: 'No. FINRA does not publish its exam items, and nobody outside the exam program has them. Every question here was written by Radif Partners from the topics named in the public content outline, with an explanation for each answer. They train the same knowledge in a similar format, which is what practice can honestly offer.' },
      { q: 'Is my practice history kept if I close the page?', a: 'Yes, in this browser only. Each answer is stored in local storage on your device, which lets the review page serve again the questions you missed. Nothing is sent to a server and there is no account. A private window, another device or clearing the site data starts you from an empty history.' },
      { q: 'Should I study first or start with practice sets?', a: 'Start with one set per section before reading anything. The score tells you which parts of the outline are new to you and which you can skim, and the explanations already teach a good share of the vocabulary. Then alternate: read about a topic, run a set on that section, and note every term you could not define.' },
    ],
    body: (h) => {
      const S = h.X('sie');
      const rows = S.sections.map((s) => [s.code, h.short('sie', s.code), s.items, h.inPool('sie', s.code)]);
      return `
<h2>What a practice set does</h2>
<p>Each set takes ten questions from the pool, in the section you choose or across the whole outline. You answer one at a time and the correction appears immediately, with the reasoning behind the right choice and a word on the tempting wrong ones. There is no clock, on purpose: the goal here is to understand, and stopping to reread an explanation is part of the work. When you finish, a new draw gives a fresh set; a shared link replays the same ten questions, which is handy for studying with a colleague.</p>
${h.table(['Section', 'Topic', 'Scored on the exam', 'Questions in our pool'], rows, `Exam weights from the ${h.src('finra_sie_outline', 'FINRA content outline')}; pool counted when this page was built.`, ['l', 'l', 'r', 'r'])}
<h2>A routine that works with short sets</h2>
<p>Short sets suit the way the SIE is learned: lots of separate facts that stick better when they come back several times over days than when they are crammed in one sitting. A simple rhythm:</p>
<ul>
<li>Open each study session with one mixed set, to bring back older material.</li>
<li>Spend the core of the session on the section you are reading, two or three sets in a row.</li>
<li>End with the ${h.a('review-mistakes', 'review page')}, which serves only the questions you got wrong earlier, until they stop coming back.</li>
</ul>
<p>Weight your time like the exam does. Products and their risks carry ${h.weight('sie', '2').items} scored questions, trading and accounts ${h.weight('sie', '3').items}, so those two sections deserve most of your sets. Capital markets (${h.weight('sie', '1').items}) and the regulatory framework (${h.weight('sie', '4').items}) are smaller but quick to secure once the vocabulary is in place.</p>
<h2>Reading an explanation properly</h2>
<p>A right answer found by elimination or by luck is still a gap. After each question, check that you could have explained the correct choice in one sentence, and that you know why each wrong one is wrong. Many SIE distractors are true statements about a neighboring product: a feature of a warrant offered as a feature of a right, a trait of a closed-end fund offered for an open-end one. Learning to spot that swap is half the work.</p>
<h3>Keep a list of terms</h3>
<p>Write down every word you met in an explanation and could not define: tenants in common, accredited investor, cumulative preferred, letter of intent. Ten minutes on that list at the start of the next session pays more than another set.</p>
<h2>When to move on to the timed mock</h2>
<p>The readiness calculator under this text turns your practice rate into a rough chance of clearing the line on a ${S.scored}-question exam. It is a model, not a forecast: it assumes every question is as easy for you as the ones you practiced. When your sets stay comfortably above ${h.pc(S.passScore! / 100)} in every section, not only on average, sit the ${h.a('sie-practice-exam', 'full timed SIE mock')} to test pace and stamina. The ${h.a('sie-passing-score', 'passing score page')} explains why a margin matters with a scaled score, and the ${h.a('sie-questions', 'SIE questions page')} lets you browse a whole section with its answers when you would rather read than quiz.</p>`;
    },
  },
});
