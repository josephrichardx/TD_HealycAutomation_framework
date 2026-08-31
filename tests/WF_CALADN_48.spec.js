import { test, expect } from "../fixtures/baseTest.js";
const { StepHelper } = require('../utils/StepHelper');
 
 
 
// const { LoginPage } = require('../pages/LoginPage');
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { CancellationPage } = require('../pages/CancellationPage');
 
const {
    patientData,
    appoinmentData,
    consultData,
    bookingData,
    appointmentStatusVerificationData
} = require('../testdata/TC_48.json');
 
const { generateUniquePatientFullName } = require('../utils/RandomData');
 
test('WF_CALADN_48 - Validate changing an appointment status to Checked-In', async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
 
    // const loginPage = new LoginPage(page);
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);
 
     await patientPage.createPatient(
        patientName,
        patientData
    );
 
    // addConsult returns the date the slot was actually booked on
    // (e.g. "02 Sep, 2026"), which is what the calendar navigation needs.
    const bookedDate = await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );
 
    await calendarPage.selectPatientFromCalendar(
    patientName,
    bookedDate
    );
 
    await invoicePage.verifyAppointmentStatus(
    appoinmentData,
    appointmentStatusVerificationData
    );

   
 
});