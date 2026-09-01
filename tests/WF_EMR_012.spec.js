import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PrescriptionPage } = require('../pages/PrescriptionPage');
 
const { patientData,appoinmentData,consultData,prescriptionData,templateData } = require('../testdata/TC_EMR012.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');

test('EMR Prescription', async ({ page }) => {

    // const patientName = patientData.patientName;
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const prescriptionPage = new PrescriptionPage(page);
 
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

    await prescriptionPage.PrescriptionObservation(
    templateData.templateName,
    templateData.time,
    prescriptionData.drugs1.name,
    prescriptionData.drugs1.durationType,
    prescriptionData.drugs1.instruction
    );


 
    


    







    
});
 