/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free practice for the US securities qualification exams (SIE, Series 6, 7, 63, 65, 66): questions written by Radif Partners from the public FINRA and NASAA content outlines (outline text not reproduced), practice by outline section with explanations, timed mock exams with the official item counts, time limits and passing scores, review of missed questions kept in the browser, and calculators for exam fees, retake waiting periods (FINRA Rule 1210 and Regulatory Notice 26-18), enrollment windows, SIE validity, the two-year lapse and continuing education, plus exam math (bond yields, options, margin, fund pricing). Independent: not affiliated with FINRA, NASAA or Prometric. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Exam formats, fees and rules read on finra.org and in the NASAA study guides, retrieved ${words(params.retrieved_at)}; FINRA fee schedule effective ${words(params.feeIncrease.effective)}.`,
    '- Practice questions: written by Radif Partners; they are not questions from the real exams.',
    '',
    `- [FINRA exam practice hub](${SITE_URL}${route('home', 'en')}): practice for all six exams, formats compared, license finder`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
