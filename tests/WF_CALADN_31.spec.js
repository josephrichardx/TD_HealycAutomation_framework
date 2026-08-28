import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';
// import { InvoicePage } from '../pages/InvoicePage.js';

const { InvoicePage } = require('../pages/InvoicePage');
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');

const { patientData} = require('../testdata/TC_031.json');


const { generatePatientName } = require('../utils/RandomData');

import admissionData from '../testdata/admissionData.json' with { type: 'json' };

import {
    generateAdmissionDate,
    generateAdmissionTime,
    getAdmissionData
} from '../utils/RandomData.js';

const { admissionPatientData } = admissionData;


test('Add Admission', async ({ page }) => {

    const patientName = generatePatientName();
    const admissionPage = new AdmissionPage(page);
    const patientPage = new PatientPage(page);

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
        dynamicData.doctorName
    );

    // ==========================================
    // 7. Add Surgery,Tests & Consumables
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

});