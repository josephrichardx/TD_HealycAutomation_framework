import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';
 
 
const { InvoicePage } = require('../pages/InvoicePage.js');
const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { PaymentPage } = require('../pages/PaymentPage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');
const { IPDPage } = require('../pages/IPDPage.js');
 
const { patientData,IPDAdmissionDetailsSummary } = require('../testdata/TC_47.json');

const { generatePatientName } = require('../utils/RandomData.js');
 
import admissionData from '../testdata/admissionData.json' with { type: 'json' };
 
import {
    generateAdmissionDate,
    generateAdmissionTime,
    getAdmissionData,
    saveAdmissionData
} from '../utils/RandomData.js';
 
const { admissionPatientData } = admissionData;
 
test.setTimeout(180000);
 
test('IPD - Generate Invoice', async ({ page }) => {
 
    const patientName = generatePatientName();
   
    const admissionPage = new AdmissionPage(page);
    const invoicePage = new InvoicePage(page);
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const paymentPage = new PaymentPage(page);
    const calendarPage = new CalendarPage(page);
    const ipdPage = new IPDPage(page);
 
    const data = { ...admissionPatientData };
 
 
   
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
    await admissionPage.selectLocation(data.location);
 
    // ==========================================
    // 4. Select Admission Date & Time
    // ==========================================
 
    const admissionDate = generateAdmissionDate();
 
    await admissionPage.selectAdmissionDate(
        admissionDate
    );
 
    const admissionTime = generateAdmissionTime();
 
    await admissionPage.selectAdmissionTime(
        admissionTime
    );
 
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
        dynamicData.doctorName
    );
 
    // ==========================================
    // 7. Add Tests & Consumables
    // ==========================================
 
    await admissionPage.addSurgery(admissionPatientData);
    await admissionPage.addTests(3);
    await admissionPage.addConsumables(3);
 
    // ==========================================
    // 8. Emergency Details
    // ==========================================
 
    await admissionPage.fillEmergencyDetailsAndContinue(
        'emergency',
        '1234567890',
        'physician'
    );
 
    // ==========================================
    // 9. Insurance Details
    // ==========================================
 
    await admissionPage.fillInsuranceDetailsAndContinue(
        'insurance',
        '12345',
        'policy'
    );
 
    // ==========================================
    // 10. Verify Admission Summary
    // ==========================================
 
    await admissionPage.verifyAdmissionSummaryAndContinue(
        admissionDate,
        admissionTime
    );
 
 
    await ipdPage.IPDAdmissionDetails(
    patientName,
    admissionDate
    );
 
    await ipdPage.IPDAdmissionDetailsSummary(
    IPDAdmissionDetailsSummary
    );
 
   
   
});
 