import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';
 
 
const { InvoicePage } = require('../pages/InvoicePage.js');
const { PatientPage } = require('../pages/PatientPage.js');
const { IPDPage } = require('../pages/IPDPage.js');
 
const { patientData,invoiceData,admissionPatientData } = require('../testdata/TC_032A.json');
const { generateUniquePatientFullName } = require('../utils/RandomData.js'); 
import {generateAdmissionDate,generateAdmissionTime,getAdmissionData} from '../utils/RandomData.js';

 
 
test('IPD - Generate Invoice', async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
    const admissionPage = new AdmissionPage(page);
    const invoicePage = new InvoicePage(page);
    const patientPage = new PatientPage(page);
    const ipdPage = new IPDPage(page);
 
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

    await ipdPage.IPDInvoicePayment(
    patientName,
    admissionDate
    );
   
    // ==========================================
    // 11. Generate Invoice
    // ==========================================
 
    await invoicePage.generateInvoiceIPD(invoiceData);
 
    const summaryAmount =
    await ipdPage.IPDInvoicePaymentSection();
 
    await ipdPage.IPDVerifyInvoicePDF(
        patientName,
        patientData,
        invoiceData,
        summaryAmount
    );
   
});