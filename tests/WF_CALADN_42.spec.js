import { test } from "../fixtures/baseTest.js";
 
 
const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');
const { CancellationPage } = require('../pages/CancellationPage.js');
const { AppointmentPage } = require('../pages/AppointmentPage.js');
const { WaitlistPage } = require('../pages/WaitlistPage.js');
const { WaitlistCancellationPage } = require('../pages/WaitlistCancellationPage.js');
 
const {
    patientData,
    appoinmentData,
    consultData,
    cancelReasonData,
    waitlistPatientOverrides,
    waitlistCancellationVerificationData
} = require('../testdata/TC_42.json');
 
 
const { generateUniquePatientFullName } = require('../utils/RandomData.js');
 
 
test('WF_CALADN_42 - Validate cancellation of a Waitlist booking', async ({ page }) => {
    const patientName = generateUniquePatientFullName();
 
 
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);
    const appointmentPage = new AppointmentPage(page);
    const waitlistPage = new WaitlistPage(page);
    const waitlistCancellationPage = new WaitlistCancellationPage(page);
 
 
    // Step 12 - Create a fresh patient for the Waitlist path (new name, no reused
    const waitlistPatientName = generateUniquePatientFullName();
    const waitlistPatientData = {
        ...patientData,
        ...waitlistPatientOverrides
    };
 
    await patientPage.createPatient(
        waitlistPatientName,
        waitlistPatientData
    );
 
    // Step 13 - Open Consult booking from the dashboard for the Waitlist path
    await consultPage.openConsultBooking();
    await consultPage.verifyPatientSearchBarLoaded();
 
    // Search and select patient
    await consultPage.searchAndSelectPatient(waitlistPatientName);
    await consultPage.verifyBookingPanelOpened(
        waitlistPatientName,
        consultData.appointmentType
    );
 
    // Clear any filters left over from an earlier booking in this session
    await consultPage.clearPreSelectedFilters();
 
    // Select same doctor (checkbox based Doctor filter)
    await consultPage.selectDoctorByName(
        appoinmentData.doctorName
    );
 
    // Select consult type (checkbox based Consult filter)
    await consultPage.selectConsultTypeByName(
        consultData.consultSlot
    );
 
    // Select the booking date at runtime instead of trusting the static
    // day-of-month from test data: walk dates forward from today and use
    // the first one whose doctor card shows an available slot.
    const bookingDate = await appointmentPage.selectRuntimeBookingDate();

    // Step 14 - Click hourglass
    await waitlistPage.clickHourglass();
 
    // Step 15 - Click Proceed
    await waitlistPage.clickProceed();
 
    // Step 16 - Click Confirm Booking
    await waitlistPage.clickConfirmBooking();
    // Step 17 - Return to Calendar and open Waitlist
    await calendarPage.clickSidebarCalendarIcon();
    await waitlistPage.clickWaitlist();
    // The Waitlist list is filtered by the calendar date, so move the calendar
    // to the booking date before looking for the entry.
    await calendarPage.navigateToBookingDayOfMonth(bookingDate);
    // Step 18 - Scroll the list until the patient appears on the Waitlist
    await waitlistPage.findWaitlistEntry(
        waitlistPatientName
    );
    // Verify waitlist entry
    await waitlistPage.verifyWaitlistEntry(
        waitlistPatientName
    );
    // Step 19 - Click Cancel
    await waitlistCancellationPage.clickCancel(
        waitlistPatientName
    );
 
    //select the cancellation reason from the dropdown
    await waitlistCancellationPage.selectCancellationReason(cancelReasonData);
 
    //click the cancel consult button to confirm cancellation
    await waitlistCancellationPage.clickCancelConsult();
 
    //verify the cancelled consult is no longer on the waitlist
    await waitlistCancellationPage.verifyWaitlistEntryRemoved(
        waitlistPatientName,
        waitlistCancellationVerificationData.consultCancelled
    );
 
 
 
});