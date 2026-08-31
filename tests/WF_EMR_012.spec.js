import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
 
const { patientData,appoinmentData,consultData,serviceData,DateData,invoiceData } = require('../testdata/TC_003.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');

test('Generate Invoice', async ({ page }) => {
 
    // const patientName = patientData.patientName;
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
 
     await patientPage.createPatient(
        patientName,
        patientData
    );
 
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );
 
    await calendarPage.selectPatientFromCalendar(
    patientName,
    bookingDate
    );
 
 



    await page.getByRole('button', { name: 'Write Prescription' }).click();








  
 
});
 