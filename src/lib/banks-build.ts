/** Build-time access to the bank (never imported by a client component). */
import SIE from '../data/questions/sie.json';
import S7 from '../data/questions/s7.json';
import S6 from '../data/questions/s6.json';
import NASAA from '../data/questions/nasaa.json';
import type { Question } from './engine/exam';
export const BANK: Question[] = [SIE, S7, S6, NASAA].flatMap((f) => (f as { questions: Question[] }).questions);
