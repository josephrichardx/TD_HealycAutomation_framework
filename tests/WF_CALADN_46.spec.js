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
    appointmentStatusVerificationData,
    visitingSlipVerificationData
} = require('../testdata/TC_46.json');
 
const { generateUniquePatientFullName } = require('../utils/RandomData');
 
test('WF_CALADN_46 - Validate the Check-In PDF after check-in', async ({ page }) => {
     
    const patientName = generateUniquePatientFullName();
 
    // const loginPage = new LoginPage(page);
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);
 
    // Step 1 - Login
    // await loginPage.login(
    //     loginData.username,
    //     loginData.password
    // );
 
    // Step 2 - Add New Patient
     await patientPage.createPatient(
        patientName,
        patientData
    );
 
    // addConsult returns the date the slot was actually booked on
    // (e.g. "02 Sep, 2026"), which is what the calendar navigation and the
    // visiting-slip date check need.
    const bookedDate = await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
     
    );
 
 
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookedDate
    );

    const calendarDate = bookedDate;
 
    // Save runtime variables to JSON file
    const fs = require('fs');
    const path = require('path');
    const runtimeData = {
        patientName: patientName,
        calendarDate: calendarDate,
        doctorName: appoinmentData.doctorName
    };
    fs.writeFileSync(
        path.join(__dirname, '../testdata/runtimeData.json'),
        JSON.stringify(runtimeData, null, 2)
    );
 
 
    await invoicePage.verifyAppointmentStatus(
    appoinmentData,
    appointmentStatusVerificationData
    );
 
    await invoicePage.verifyVisitingSlip(
        patientName,
        appoinmentData.doctorName,
        visitingSlipVerificationData
    );
 
    await invoicePage.verifyVisitingSlipContent(
        appoinmentData.doctorName,
        patientName,
        undefined,
        undefined,
        bookedDate
    );
 
    });
 
 