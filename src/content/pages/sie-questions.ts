import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'sie-questions',
  group: 'sie',
  order: 13,
  tool: { kind: 'bank', props: { exam: 'sie', section: '2' } },
  mini: { kind: 'quiz', props: { exam: 'sie', n: 5 } },
  related: ['sie-products', 'sie-practice-test', 'sie-capital-markets', 'sie-trading', 'sie-regulation'],
  sources: ['finra_sie_outline'],
  en: {
    slug: 'sie-exam/questions',
    nav: 'SIE sample questions',
    card: 'SIE sample questions with answers and explanations, a whole outline section at a time, plus how the exam words its items.',
    title: 'SIE Exam Questions: Sample Items With Answers Explained',
    description: 'SIE exam sample questions with answers and explanations, listed by outline section, with a worked example and the wording habits of four-choice items to watch.',
    h1: 'SIE sample questions, with every answer explained',
    intro: 'The list below shows every question of the products section with its answer and explanation. Read it like a workbook, or hide the answers and test yourself.',
    resume: (h) => {
      const S = h.X('sie');
      return `Every SIE item is a multiple-choice question with four answer choices, and the exam counts ${S.scored} of them toward the score. The sample questions on this page come from our own bank, written by Radif Partners from the topics of FINRA's ${h.src('finra_sie_outline', 'content outline')}; they are not taken from any exam, which FINRA keeps confidential. The list opens on section 2, products and their risks, because it is by far the largest part of the test: ${h.weight('sie', '2').items} scored questions, about ${h.pc(h.weight('sie', '2').share)} of the total, and ${h.inPool('sie', '2')} questions in our pool. Each item shows the right answer and a short explanation of why it is right and why the others are not. Reading a full section this way is a fast method to see the range of what can be asked, from the rights of a common stockholder to the tax treatment of a 529 plan, before you start practicing under correction. The other three sections each have a page of their own with a five-question set and study notes.`;
    },
    faqs: (h) => [
      { q: 'Do SIE questions always have four answer choices?', a: `Yes. FINRA's content outline describes every SIE item as multiple choice with four options, and states that wrong answers carry no penalty. That second point matters: a blank answer can only cost you, so on exam day every one of the ${h.X('sie').scored + h.X('sie').unscored} items deserves a choice, even a guess between two remaining options.` },
      { q: 'Why does this question list start with the products section?', a: `Because products and their risks weigh the most: ${h.weight('sie', '2').items} of the ${h.X('sie').scored} scored questions. Seeing every question of that section in one list shows how wide it is, from preferred stock to ETNs and municipal fund securities. The section pages for capital markets, trading and regulation give the same kind of access to the rest of the outline.` },
      { q: 'Who wrote these SIE sample questions?', a: 'Radif Partners wrote them from the topics listed in the public FINRA outline, and checked each answer against the rule or concept it tests. No question is copied from an exam, a book or a course. They train the knowledge the outline names; they cannot predict the exact wording FINRA will choose for a given point.' },
    ],
    body: (h) => {
      const S = h.X('sie');
      const ex = h.q('sie-2-004');
      const letters = ['A', 'B', 'C', 'D'];
      const pages = ['sie-capital-markets', 'sie-products', 'sie-trading', 'sie-regulation'];
      const rows = S.sections.map((s, i) => [h.a(pages[i], h.short('sie', s.code)), s.items, h.inPool('sie', s.code)]);
      return `
<h2>How SIE questions are built</h2>
<p>Most items fall into one of three shapes. A definition question asks what a term means or which product has a given feature. A scenario gives a customer, a trade or a corporate event in two or three sentences and asks what follows. A rule question asks what a representative or a firm may, must or may not do. The scenario shape is the most common in the larger sections, and it hides the topic: a question about a customer who wants income without credit risk is really a question about Treasury securities.</p>
<h3>Wording to read twice</h3>
<ul>
<li><strong>EXCEPT and NOT:</strong> three choices are true and you are looking for the false one. Rephrase the question in your head before reading the options.</li>
<li><strong>Best, most, first:</strong> several choices can be acceptable, and only one fits the facts given. Look for the detail in the stem that rules out the others.</li>
<li><strong>Absolute words:</strong> an option that says always or never is often wrong in a field full of exceptions, but not every time.</li>
</ul>
<h2>A worked example from the products section</h2>
${ex ? `<p><em>${ex.q}</em></p>
<ul>${ex.options.map((o, i) => `<li>${letters[i]}. ${o}</li>`).join('')}</ul>
<p>Answer: <strong>${letters[ex.answer]}. ${ex.options[ex.answer]}</strong>. ${ex.explain}</p>` : ''}
<p>The method carries over to most product questions: name the feature the stem is about (here, the cumulative right of a preferred holder), recall the rule attached to it, then do the small calculation. The arithmetic on the SIE is rarely harder than this; the trap is applying the wrong rule, for instance treating the stock as noncumulative and paying only the current year.</p>
<h2>Every section, with our question count</h2>
${h.table(['Section', 'Scored on the exam', 'Questions in our pool'], rows, 'Each section page has notes and a five-question set; counts are read from the bank at build time.', ['l', 'r', 'r'])}
<p>Some questions in the pool are shared with the Series 7 or the Series 6 when the topic is the same in both outlines, such as the order of payment in a liquidation or the meaning of a stop order. They count once in each exam's pool.</p>
<h2>From reading to practicing</h2>
<p>Reading answers is efficient for a first pass, but recognition is not recall: an answer looks obvious once you see it. After a section has been read, switch to the ${h.a('sie-practice-test', 'practice sets')}, where the answer stays hidden until you commit, and let the five-question set under this text give you a quick measure across the whole outline. Questions you miss there are kept in your browser and come back on the ${h.a('review-mistakes', 'review page')}. The products material is also covered in plain language, with the traps that cost the most points, on the ${h.a('sie-products', 'products and risks page')}.</p>`;
    },
  },
});
