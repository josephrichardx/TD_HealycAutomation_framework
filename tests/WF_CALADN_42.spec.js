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
    waitlistBookingData,
    consultData,
    cancelReasonData
} = require('../testdata/TC_42.json');
 
 
const { generatePatientName, generateShortPatientName } = require('../utils/RandomData.js');
 
 
test('WF_CALADN_42 - Validate cancellation of a Waitlist booking', async ({ page }) => {
    test.setTimeout(300000);
 
    const bookingDate = waitlistBookingData.standardBookingDate;
 
 
    const patientName = generatePatientName();
 
 
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
    const waitlistPatientName = generateShortPatientName();
    const waitlistPatientData = {
        ...patientData,
        email: ''
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
        'Consult'
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
 
    // Open booking date picker
    await appointmentPage.openBookingDatePicker();
 
    // Select booking date
    await appointmentPage.selectBookingDate(
        bookingDate
    );
 
    // Apply selected date
    await appointmentPage.applyBookingDate();
 
    // Step 14 - Click hourglass
    await waitlistPage.clickHourglass();
 
    // Step 15 - Click Proceed
    await waitlistPage.clickProceed();
 
    // Step 16 - Click Confirm Booking
    await waitlistPage.clickConfirmBooking();
    // Step 17 - Return to Calendar and open Waitlist
    await calendarPage.clickSidebarCalendarIcon();
    await waitlistPage.clickWaitlist();
    // Step 18 - Move through calendar pages until the patient appears on the Waitlist
    await waitlistPage.navigateToWaitlistEntry(
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
 
 
 
});