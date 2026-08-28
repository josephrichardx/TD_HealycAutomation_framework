import { test } from '../fixtures/baseTest.js';

const { NewPatient } = require('../pages/NewPatientPage');
const { validPatientData } = require('../testdata/newpatientData.json');

const {
    generateUniquePatientFullName,
    generateRandomDateOfBirth
} = require('../utils/RandomData');


test.describe('WF_CALADN_01 - Add Patient Profile Workflow', () => {

    test.setTimeout(180000);

    // ============================================================
    // Flow 1 - Create Valid Patient And Verify It Exists
    // ============================================================

    test('Flow 1 - Create Valid Patient And Verify It Exists', async ({ page }) => {

        const newPatient = new NewPatient(page);

        const patientName = generateUniquePatientFullName();
        const dobData = generateRandomDateOfBirth(1990, 2002);

        await newPatient.createValidPatient(
            patientName,
            validPatientData,
            dobData
        );

        await newPatient.verifySavedToastAndGoToProfile();
        await page.waitForTimeout(15000);
        await newPatient.verifyPatientProfileNameMatches(
            patientName
        );

        await newPatient.openEditPatient();

        await newPatient.verifyEditPatientFieldsMatch(
            validPatientData,
            dobData
        );

        await newPatient.enableVipAndSave();
    });


    // ============================================================
    // Flow 2 - VIP Patient Cannot Be Downgraded To Non-VIP
    // ============================================================

    test('Flow 2 - Create VIP Patient And Verify VIP Status Cannot Be Removed', async ({ page }) => {

        const newPatient = new NewPatient(page);

        const patientName = generateUniquePatientFullName();
        const dobData = generateRandomDateOfBirth(1990, 2002);

        await newPatient.createValidPatient(
            patientName,
            validPatientData,
            dobData,
            { markAsVip: true }
        );

        await newPatient.verifySavedToastAndGoToProfile();

        await newPatient.verifyPatientProfileNameMatches(
            patientName
        );

        await newPatient.openEditPatient();

        await newPatient.verifyVipCheckboxCannotBeUnchecked();

        await newPatient.saveEditPatientAndVerify();
    });

});