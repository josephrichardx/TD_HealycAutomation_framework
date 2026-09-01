import { test } from '../fixtures/baseTest.js';
import { AdmissionPage } from '../pages/AdmissionPage.js';

const { PatientPage } = require('../pages/PatientPage');
const { patientData,admissionPatientData} = require('../testdata/TC_031.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');
import { generateAdmissionDate,generateAdmissionTime,getAdmissionData} from '../utils/RandomData.js';

test('Add Admission', async ({ page }) => {

    const patientName = generateUniquePatientFullName();
    const admissionPage = new AdmissionPage(page);
    const patientPage = new PatientPage(page);
    
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
        // await admissionPage.addTests(3);
        // await admissionPage.addConsumables(3);
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

    // await admissionPage.verifyAdmissionSummaryAndContinue(
    //     admissionDate,
    //     admissionTime
    // );
    await admissionPage.verifyAdmissionSummaryAndContinue(
    admissionDate,
    admissionTime,
    admissionPatientData.dateLabel,
    admissionPatientData.timeLabel
);

});