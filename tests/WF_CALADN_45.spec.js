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
 
const { generatePatientName } = require('../utils/RandomData');
 
test('WF_CALADN_45.spec.js', async ({ page }) => {
 
    const patientName = generatePatientName();
 
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
 
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );
 
    await calendarPage.selectPatientFromCalendar(
    patientName,
    bookingData.bookingDate
    );
 
    await invoicePage.verifyAppointmentStatus(
    appoinmentData
    );
 
    });