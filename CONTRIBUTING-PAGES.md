# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Models: `sie-exam.ts`, `retake-rules.ts`. The page is
built at `/en/<en.slug>/`; menus, footer, home lists, llms.txt and sitemap follow by themselves. English only (en-US,
American spelling: license, program, center, enroll).

## Fields

- `group`: `sie`, `series` (Series 7 and 6), `state` (Series 63, 65, 66), `rules`, `math`; `order`: position in its group.
- `tool`: the main tool, shown right under the H1 (first screen, RECETTE §5):
  - `{ kind: 'quiz', props: { exam: 'sie'|'s7'|'s6'|'s63'|'s65'|'s66', mode: 'practice'|'exam'|'review', section?: '2' | 'F3', n?: 10, timed?: true, pick?: true } }`
    (practice = correction after each answer and a section menu; exam = full mock with official section quotas, add `timed: true`;
    review = the questions the visitor missed, kept in the browser)
  - `{ kind: 'bank', props: { exam, section } }` (every question of one outline section with answers)
  - `{ kind: 'progress', props: { exam } }` (saved progress per section)
  - `{ kind: 'mini:<spec>', props?: { <input id>: <default number> } }`, specs in `src/lib/mini-specs.ts`:
    `passline` (e = exam index), `readiness` (e, p), `pace` (e, done), `studyplan`, `license` (r = role index), `fees` (b = bundle index),
    `retake` (e, k), `window`, `reschedule`, `sievalid`, `lapse`, `cedeadline`, `bondyield`, `tey`, `accrued`, `options`, `margin`,
    `nav`, `chargepct`, `realreturn`. Exam index `e`: 0 SIE, 1 Series 7, 2 Series 6, 3 Series 63, 4 Series 65, 5 Series 66.
    A new spec goes in `src/lib/mini-specs.ts` and reads its figures from params or the engines, never a second formula.
- `mini`: a second tool under the citable block. On a guide page it is usually a five-question quiz of the page's subject:
  `{ kind: 'quiz', props: { exam: 'sie', section: '4', n: 5 } }`.
- In a body, `<!--tool:mini:tey-->` or `<!--tool:quiz|{"exam":"s7","section":"F3","n":5}-->` places a tool between paragraphs.
- `related`: 3 to 6 page ids (or `home`). `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on pages about enrolling, paying or scheduling: adds the "not affiliated with FINRA" line under the H1.

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50 to 60 characters, key term first ("SIE Exam Cost 2026: …", "Series 7 Practice Exam: …"), never starting with
  "How", "What", "When", "US", "Calculator" or "FINRA" alone as a country-like word is fine ("FINRA Exam Fees 2026: …").
- `description` 150 to 160 characters.
- `resume(h)`: ONE paragraph (no tags but links) of at least 130 words answering the page's query with figures.
- `faqs(h)`: 3 to 5 questions unique to the page across the whole site, each answer 45 to 85 words, plain text.
- `body(h)`: HTML with at least three `<h2>` sections; resume + body at least 700 words. No `<h1>`. Use `<h3>`, `<p>`, `<ul>`, tables via `h.table`.
- No em dash or en dash anywhere; colon, comma or parentheses instead.
- Dates in words ("January 19, 2027") via `h.date(iso)`, never 2027-01-19 in text; future rules are written as coming, with their date.
- Pages must read differently (check-unique fails above 30 % shared sentences between two pages): no shared boilerplate.
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a prep provider, course,
  book, flash-card site, forum or affiliate; never mention Google, "first result" or any other site.
- Never call our questions "official", "real exam questions" or "actual questions"; never promise a pass.
- Never publish a pass rate: FINRA and NASAA publish no current figure. Say so.

## Figures

Never type a fee, a count, a time or a waiting period: read them through `h` (`src/lib/helpers.ts`):
`h.X('sie')` (exam params: scored, unscored, minutes, passScore or passCorrect, passKind, fee, feePrev, sponsorship, coreq,
validYears, sections[{code,name,items}]), `h.label('s7')`, `h.short('sie','2')`, `h.need('s65')` (correct answers needed on a full mock),
`h.hours('s7')`, `h.items('sie')`, `h.weight('s7','F3')` ({items, share}), `h.count` (bank size), `h.inPool('s7','F3')`,
`h.P` (all params: retake, windowDays, lapseYears, mqp, evep, ce, reschedule, margin, settlement, otherFees2026, funds, online),
`h.usd(n)`, `h.num(n)`, `h.pc(x)`, `h.date(iso)`, `h.table(headers, rows, caption, align)`.
A fact that is not on an official page (or in our own bank) is not written.

## Data

- `src/data/params-2026.json`: formats, fees and rules read on finra.org and in the NASAA study guides (date in `retrieved_at`).
- `src/data/questions/*.json`: question bank written by Radif Partners from the outline topics (no outline text reproduced).
  `node scripts/lint-bank.mjs` lints it (also run by the tests).
