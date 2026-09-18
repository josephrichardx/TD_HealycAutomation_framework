import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
// const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { ConsultPage } = require('../pages/ConsultPagenew');
 
const { patientData,appoinmentData,consultData,serviceData,invoiceData } = require('../testdata/TC_003.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');

test('Create Service & Check waitlist ', async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    // const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const consultPage = new ConsultPage(page);
 
     await patientPage.createPatient(
        patientName,
        patientData
    );
    
    // await consultPage.verifyAddNewMenuOptions(addNewMenuOptions);

    await servicePage.addService(
    patientName,
    serviceData.serviceName,
    );
 
 
});
 