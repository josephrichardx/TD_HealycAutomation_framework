import { test, expect } from "../fixtures/baseTest.js";
const { StepHelper } = require('../utils/StepHelper.js');

const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');

const { patientData,appoinmentData,consultData,bookingData,serviceData,DateData } = require('../testdata/TC_030.json');
const { generatePatientName } = require('../utils/RandomData.js');

test('WF_EMR_030.spec - Validate the complete EMR business workflow from appointment creation to final prescription generation', async ({ page }) => {

    const patientName = generatePatientName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);


    // Step 1 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

     // Step 2 - Add Consult
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );
    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName,
        DateData.bookingDate
    );
    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingData.bookingDate
    );

    


});       
