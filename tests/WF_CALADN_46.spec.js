import { test, expect } from "../fixtures/baseTest.js";
const { StepHelper } = require('../utils/StepHelper');
 
 
test.setTimeout(120000);
 
// const { LoginPage } = require('../pages/LoginPage');
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { CancellationPage } = require('../pages/CancellationPage');
 
// const { loginData } = require('../testdata/users');
const { patientData } = require('../testdata/patients.json');
const { paymentData } = require('../testdata/payments.json');
const { appoinmentData }= require('../testdata/appointmentData.json');
const { consultData, bookingData } = require('../testdata/consultData.json');
const { serviceData, DateData } = require('../testdata/serviceData.json');
const { invoiceData } = require('../testdata/invoiceData.json');
const  visitingSlipData  = require('../testdata/visitingSlip.json');
 
const { generatePatientName } = require('../utils/RandomData');
 
test('WF_CALADN_46.spec.js', async ({ page }) => {
     
    const patientName = generatePatientName();
 
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
 
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );
 
 
    const calendarDate = await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingData.bookingDate
    );
 
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
    appoinmentData
    );
 
    await invoicePage.verifyVisitingSlip(
        patientName,
        appoinmentData.doctorName
    );
 
    await invoicePage.verifyVisitingSlipContent(
        appoinmentData.doctorName,
        patientName,
        undefined,
        undefined,
        bookingData.bookingDate
    );
 
    });
 
 