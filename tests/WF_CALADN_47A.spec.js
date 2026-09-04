import { test, expect } from "../fixtures/baseTest.js"; 
const { StepHelper } = require('../utils/StepHelper.js');
                        
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
 
const { patientData,appoinmentData,consultData } = require('../testdata/TC_47A.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');

test('Generate Invoice', async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
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
 
    await consultPage.updateConsultationRoom(
    consultData.consultationRoom,
    consultData.consultationStatus,
    consultData.consultationRoomSuccessMessage
    );

    // await page.locator('app-custom-popup:nth-child(2) > .wrappers > .content > .appointment > div > .appointment-details > .appointment-content > .appointment2 > .booking-info > .appointment-details2 > .container2 > .inner > .statuys > div > div > .field-dropdown > div > .name-action3').click();
    // await page.getByText('Checked-In').nth(1).click();
    // await page.getByText('C1').nth(1).click();
    // await page.getByText('C2').nth(1).click();
    // await expect(page.locator('app-custom-toaster-message')).toContainText('Consultation room updatedDismiss');
 



 
});