import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';


const { InvoicePage } = require('../pages/InvoicePage');
const { PatientPage } = require('../pages/PatientPage');
const { CalendarPage } = require('../pages/CalendarPage');

const { patientData,invoiceData,admissionPatientData } = require('../testdata/TC_032.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');
import {generateAdmissionDate,generateAdmissionTime,getAdmissionData} from '../utils/RandomData.js';



test('Add Admission - Generate Invoice', async ({ page }) => {

    const patientName = generateUniquePatientFullName();
    const admissionPage = new AdmissionPage(page);
    const invoicePage = new InvoicePage(page);
    const patientPage = new PatientPage(page);
    const calendarPage = new CalendarPage(page);

 
    // ============================================================
    // 1. Create Patient
    // ============================================================

    await patientPage.createPatient(
        patientName,
        patientData
    );


    // ==========================================
    // 1. Add Admission
    // ==========================================

    await admissionPage.clickAddNew();
    await admissionPage.clickAddAdmission();

    // ==========================================
    // 2. Select Patient
    // ==========================================

    await admissionPage.searchPatient(patientName);

    // ==========================================
    // 3. Select Location
    // ==========================================

    await admissionPage.openLocationDropdown();
    await admissionPage.selectLocation(admissionPatientData.location);

    // ==========================================
    // 4. Select Admission Date & Time
    // ==========================================

    const admissionDate = generateAdmissionDate();
    await admissionPage.selectAdmissionDate(admissionDate);

    const admissionTime = generateAdmissionTime();
    await admissionPage.selectAdmissionTime(admissionTime);

    // ==========================================
    // 5. Select Room / Bed
    // ==========================================

    await admissionPage.selectRandomRoomCategory();
    await admissionPage.selectRandomRoomNumber();
    await admissionPage.selectRandomBedNumber();

    // ==========================================
    // 6. Diagnosis & Doctor
    // ==========================================

    const dynamicData = getAdmissionData();

    await admissionPage.fillDiagnosisAndDoctor(
    dynamicData.admittingDiagnosis,
    admissionPatientData.doctorName
    );

    // ==========================================
    // 7. Add Surgery,Tests & Consumables
    // ==========================================

        await admissionPage.addSurgery(admissionPatientData);
        await admissionPage.addTests(
         admissionPatientData.testCount
        );

        await admissionPage.addConsumables(
            admissionPatientData.consumableCount
        );

    // ==========================================
    // 8. Emergency Details
    // ==========================================

   await admissionPage.fillEmergencyDetailsAndContinue(
    admissionPatientData.emergency,
    admissionPatientData.contactNumber,
    admissionPatientData.physicianName
    );

    // ==========================================
    // 9. Insurance Details
    // ==========================================

    await admissionPage.fillInsuranceDetailsAndContinue(
        admissionPatientData.insuranceName,
        admissionPatientData.insuranceNumber,
        admissionPatientData.policyName
    );

    // ==========================================
    // 10. Verify Admission Summary
    // ==========================================

    await admissionPage.verifyAdmissionSummaryAndContinue(
    admissionDate,
    admissionTime,
    admissionPatientData.dateLabel,
    admissionPatientData.timeLabel
    );

    await calendarPage.selectPatientAddAdmission(
    patientName
    );
    
    // ==========================================
    // 11. Generate Invoice
    // ==========================================

    await invoicePage.generateInvoiceAddAdmission();

    // ==========================================
    // 12. Get Invoice Details
    // ==========================================

    const invoiceDetails =
        await invoicePage.InvoiceDetailsAddAdmission(invoiceData);


    // ==========================================
    // 15. Verify Invoice PDF
    // ==========================================

    await invoicePage.InvoicePDFAddAdmission(
        invoiceDetails.invoiceNumber,
        invoiceDetails.totalAmount,
        patientName,
        patientData,
        invoiceData
    );

});