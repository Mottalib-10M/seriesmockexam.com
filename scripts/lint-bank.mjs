#!/usr/bin/env node
/**
 * lint-bank.mjs — checks the practice question bank (src/data/questions/*.json).
 * Usage: node scripts/lint-bank.mjs [file.json …]   (no argument = every file)
 * Exit 1 on any error. Prints the size of every pool (exam × section), primary + tagged.
 *
 * Schema of one question:
 * { "id": "sie-2-014", "exam": "sie", "section": "2", "also": [{ "exam": "s6", "section": "F3" }],
 *   "ref": "2.1.2", "q": "…", "options": ["…","…","…","…"], "answer": 0-3, "explain": "…", "rule": "FINRA Rule 2111" }
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const qdir = join(root, 'src/data/questions');
const SECTIONS = {
  sie: ['1', '2', '3', '4'],
  s6: ['F1', 'F2', 'F3', 'F4'],
  s7: ['F1', 'F2', 'F3', 'F4'],
  s63: ['1', '2', '3', '4', '5', '6', '7', '8'],
  s65: ['1', '2', '3', '4'],
  s66: ['1', '2', '3', '4'],
};
const files = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(qdir).filter((f) => f.endsWith('.json')).map((f) => join(qdir, f));
const all = [];
for (const f of files) {
  const j = JSON.parse(readFileSync(f, 'utf8'));
  if (!Array.isArray(j.questions)) { console.error(`${f}: no "questions" array`); process.exit(1); }
  for (const q of j.questions) all.push({ ...q, _file: f.split('/').pop() });
}
const errs = [];
const ids = new Set(), texts = new Map();
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
for (const q of all) {
  const at = `${q._file} ${q.id}`;
  if (!q.id || ids.has(q.id)) errs.push(`${at}: missing or duplicate id`); ids.add(q.id);
  if (!SECTIONS[q.exam]) errs.push(`${at}: unknown exam ${q.exam}`);
  else if (!SECTIONS[q.exam].includes(q.section)) errs.push(`${at}: unknown section ${q.section} for ${q.exam}`);
  for (const t of q.also ?? []) if (!SECTIONS[t.exam]?.includes(t.section) || t.exam === q.exam) errs.push(`${at}: bad "also" tag ${JSON.stringify(t)}`);
  if (!q.ref) errs.push(`${at}: missing ref (outline point)`);
  if (typeof q.q !== 'string' || q.q.length < 15) errs.push(`${at}: question too short`);
  const k = norm(q.q ?? '');
  if (texts.has(k)) errs.push(`${at}: same question text as ${texts.get(k)}`); texts.set(k, q.id);
  if (!Array.isArray(q.options) || q.options.length !== 4) errs.push(`${at}: needs exactly 4 options`);
  else if (new Set(q.options.map(norm)).size !== 4) errs.push(`${at}: duplicate options`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(`${at}: answer must be 0-3`);
  const ew = (q.explain ?? '').split(/\s+/).filter(Boolean).length;
  if (ew < 20 || ew > 90) errs.push(`${at}: explanation of ${ew} words (20 to 90)`);
  const blob = JSON.stringify(q);
  if (/—|–/.test(blob)) errs.push(`${at}: em or en dash`);
  if (/all of the above|none of the above/i.test(blob)) errs.push(`${at}: "all/none of the above" option`);
  if (/\b(real|actual|official) (exam|test) question/i.test(blob)) errs.push(`${at}: claims to be a real exam question`);
}
// Copy check: no run of 8 words taken from the official outlines / study guides.
const srcDir = join(root, 'data/textes-sources');
if (existsSync(srcDir)) {
  const allowed = existsSync(join(srcDir, 'autorises.lst')) ? readFileSync(join(srcDir, 'autorises.lst'), 'utf8').split('\n').map(norm).filter(Boolean) : [];
  const grams = new Set();
  for (const f of readdirSync(srcDir).filter((x) => x.endsWith('.txt'))) {
    const w = norm(readFileSync(join(srcDir, f), 'utf8')).split(' ');
    for (let i = 0; i + 8 <= w.length; i++) grams.add(w.slice(i, i + 8).join(' '));
  }
  for (const q of all) {
    let txt = norm([q.q, ...(q.options ?? []), q.explain].join(' '));
    for (const a of allowed) txt = txt.split(a).join(' | ');
    const w = txt.split(' ');
    for (let i = 0; i + 8 <= w.length; i++) { const g = w.slice(i, i + 8).join(' '); if (!g.includes('|') && grams.has(g)) { errs.push(`${q._file} ${q.id}: 8 words copied from an official outline: "${g}"`); break; } }
  }
}
// Position balance
const pos = [0, 0, 0, 0]; for (const q of all) pos[q.answer]++;
// Pools
const pools = {};
for (const q of all) for (const t of [{ exam: q.exam, section: q.section }, ...(q.also ?? [])]) { const k = `${t.exam}/${t.section}`; pools[k] = (pools[k] ?? 0) + 1; }
console.log(`${all.length} questions; right answer positions A-D: ${pos.join(' / ')}`);
for (const e of Object.keys(SECTIONS)) console.log(`  ${e.padEnd(4)} ${SECTIONS[e].map((s) => `${s}:${pools[`${e}/${s}`] ?? 0}`).join('  ')}`);
if (all.length >= 40) for (let i = 0; i < 4; i++) if (pos[i] < all.length * 0.18) errs.push(`right answers too rarely in position ${'ABCD'[i]} (${pos[i]})`);
if (errs.length) { console.error(errs.join('\n')); console.error(`${errs.length} error(s)`); process.exit(1); }
console.log('bank OK');
