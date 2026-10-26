import { definePage } from '../../lib/guide-types';
import { windowEnd, dayNum, isoOf } from '../../lib/engine/dates';

export default definePage({
  id: 'scheduling',
  group: 'rules',
  order: 40,
  tool: { kind: 'mini:window' },
  mini: { kind: 'mini:reschedule' },
  related: ['exam-fees', 'exam-day', 'retake-rules', 'sie-cost', 'sponsorship'],
  sources: ['finra_schedule', 'finra_section4', 'finra_sie'],
  demarche: true,
  en: {
    slug: 'scheduling-window',
    nav: 'Enrollment and scheduling',
    card: 'The 120-day enrollment window, test center or online delivery, and what a late change of appointment costs.',
    title: 'FINRA Exam Scheduling: 120-Day Window, Online or Test Center',
    description: 'FINRA exam scheduling: enroll, get a 120-day window, book a test center or an online SIE session, and avoid the half or full fee charged for late changes.',
    h1: 'Enrolling and scheduling a FINRA exam',
    intro: 'Enter the day your enrollment was opened: the calculator shows when your 120-day window closes and how many days are left.',
    resume: (h) => `Taking a FINRA exam happens in two steps. First comes the enrollment: you enroll yourself for the SIE, while for the Series 7, the Series 6 and most other exams your sponsoring firm files it, and the fee is paid at that point. FINRA then posts a ${h.P.windowDays}-day window in which the exam must be taken (${h.src('finra_schedule', 'FINRA scheduling page')}). Second comes the appointment, booked inside the window with the test delivery vendor, either at a test center or, for the SIE, in an online session, which FINRA opens to any candidate with an open enrollment window. Other FINRA exams are delivered online ${h.P.online.others}. An enrollment opened on ${h.date('2026-11-02')} must therefore be used by ${h.date(isoOf(windowEnd(dayNum('2026-11-02'))))}. Moving or cancelling an appointment is free until ${h.P.reschedule.halfChargeToBusinessDays + 1} business days before it; from ${h.P.reschedule.halfChargeToBusinessDays} to ${h.P.reschedule.halfChargeFromBusinessDays} business days it costs half the fee, and within ${h.P.reschedule.fullChargeWithinBusinessDays} business days, or after a no-show, the full fee (${h.src('finra_section4', 'Section 4 of Schedule A')}).`,
    faqs: (h) => [
      { q: 'Can my 120-day window be extended?', a: 'The scheduling page does not describe an extension: the window FINRA posts is the period in which the exam must be taken. Plan the appointment early in the window rather than near its end, because test center dates can fill up and an unexpected problem late in the window leaves no room to reschedule.' },
      { q: 'Who can take a FINRA exam online?', a: `For the SIE, online delivery is ${h.P.online.sie}. For the other FINRA exams, and the NFA exams FINRA delivers, a candidate needs an approved accommodation, which FINRA considers for example for people who are immunocompromised or who live more than ${h.P.online.milesFromCenter} miles from a test center.` },
      { q: 'How are business days counted for a late change?', a: 'They are working days, Monday to Friday, between the day you make the change and the day of the exam. Our calculator skips weekends but keeps public holidays, so near a holiday it may count one day too many. When the result is close to a limit, make the change a day earlier to stay on the safe side.' },
    ],
    body: (h) => `
<h2>From enrollment to appointment</h2>
${h.table(['Step', 'Who', 'What happens'], [
  ['Enrollment, SIE', 'you', `enroll online and pay ${h.usd(h.X('sie').fee)}`],
  ['Enrollment, Series 7 or 6', 'the sponsoring firm', 'files it, pays or charges the fee'],
  ['Enrollment, Series 63, 65, 66', 'you or a firm', 'no sponsor required by the exam'],
  ['Window', 'FINRA', `posts a ${h.P.windowDays}-day window`],
  ['Appointment', 'you', 'book a test center or an eligible online session'],
], `FINRA scheduling page, read on ${h.date(h.P.retrieved_at)}.`, ['l', 'l', 'l'])}
<h2>Choosing a date inside the window</h2>
<p>Count backwards from the exam rather than forwards from the enrollment. Decide how many weeks you need to finish the outline and sit two full mocks, then book a date at the end of that plan, leaving at least two weeks of window after it. That margin covers an illness, a test center closure or a decision to move the date while the change is still free. The ${h.a('series-7-study-time', 'study time planner')} turns hours per week into a finishing date.</p>
<h3>Test center or online?</h3>
<p>Only the SIE gives a real choice. The online session asks for a quiet private room, a computer meeting the vendor's requirements and an identity check by camera; the test center removes all of that but adds travel. If your home is noisy or your connection unreliable, the test center is the safer option even for the SIE.</p>
<h2>Late changes and no-shows</h2>
<p>Charges depend on business days before the appointment, under Section 4 of Schedule A to the FINRA By-Laws:</p>
${h.table(['Change made', 'Charge'], [
  [`${h.P.reschedule.halfChargeToBusinessDays + 1} business days or more before`, 'none'],
  [`${h.P.reschedule.halfChargeFromBusinessDays} to ${h.P.reschedule.halfChargeToBusinessDays} business days before`, 'half the exam fee'],
  [`${h.P.reschedule.fullChargeWithinBusinessDays} business days or less, or no-show`, 'the full exam fee'],
  ['Test center outside the United States', `+${h.usd(h.P.reschedule.foreignCenterCharge)} per sitting`],
], undefined, ['l', 'r'])}
<p>The second calculator on this page counts the business days between the change and the appointment and gives the charge for the exam you pick. For a Series 7 that can be ${h.usd(h.X('s7').fee / 2)} or ${h.usd(h.X('s7').fee)}, so a reminder in your calendar eleven business days before the exam is worth setting on the day you book.</p>
<h2>After a failed attempt</h2>
<p>A new enrollment is needed, with a new fee, and its window can only start once the waiting period is over: ${h.P.retake.finra.firstAndSecondDays} days after a first or second failure today, ${h.P.retake.finraFrom.firstAndSecondDays} days for FINRA exams from ${h.date(h.P.retake.finraFrom.date)}. The ${h.a('retake-rules', 'retake calculator')} gives the date, and the ${h.a('exam-day', 'exam day page')} covers what to bring and what to expect once the appointment is booked.</p>
<h2>A sample timeline</h2>
<p>Take a candidate who enrolls for the SIE on ${h.date('2026-11-02')}. The window runs to ${h.date('2027-03-02')}. With eight weeks of study planned, a sensible appointment is in early January, which leaves almost two months of window as a buffer. If the date has to move, doing it at least eleven business days ahead costs nothing; moving it in the last two business days costs the full ${h.usd(h.X('sie').fee)}. Put both dates in your calendar on the day you book: the last free change and the end of the window.</p>`,
  },
});
