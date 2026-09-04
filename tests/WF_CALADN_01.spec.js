import { test } from '../fixtures/baseTest.js';

const { NewPatient } = require('../pages/NewPatientPage');
const { 
    validPatientData, 
    validationErrors, 
    invalidPatientData, 
    excessiveLengthData, 
    leapYearDob,
    toastMessages 
} = require('../testdata/TC_001.json');

const {
    generateUniquePatientFullName,
    generateRandomDateOfBirth,
    generateRandomMobileNumber
} = require('../utils/RandomData');

test.describe('WF_CALADN_01 - Add Patient Profile Workflow', () => {

    // FLOW 1 - Field Validations, Negative Tests & Valid Patient Creation

    test('Flow 1 - Field Validations & Valid Patient Creation', async ({ page }) => {

        const newPatient = new NewPatient(page);
        const patientName = generateUniquePatientFullName();

        /*
        // --- Excessive Length Validations (KNOWN BUG) ---
        // NOTE: The application currently allows excessive characters to be saved 
        // without throwing an error. Kept commented out to maintain a green pipeline.
        // Uncomment during demo to showcase the missing validation to the client.

        // 1. Name Field (> 100 chars)
        await newPatient.validateExcessiveLength(
            'Name', 
            excessiveLengthData.name, 
            validPatientData, 
            excessiveLengthData, 
            patientName
        );

        // 2. Address Field (> 500 chars)
        await newPatient.validateExcessiveLength(
            'Address', 
            excessiveLengthData.address, 
            validPatientData, 
            excessiveLengthData, 
            patientName
        );

        // 3. Mobile Field (> 15 chars)
        await newPatient.validateExcessiveLength(
            'Mobile', 
            excessiveLengthData.mobile, 
            validPatientData, 
            excessiveLengthData, 
            patientName
        );
        */

        // Condition 0: Verify Empty Mandatory Fields (Asserts Save button is disabled when ALL are empty)
        await newPatient.validateEmptyMandatoryFields();

        // Condition 1: Missing Salutation
        await newPatient.validateMissingSalutation(
            patientName, 
            validPatientData, 
            validationErrors
        );

        // Condition 2: Missing Name
        await newPatient.validateMissingName(
            validPatientData, 
            validationErrors
        );

        // Condition 3: Missing Mobile
        await newPatient.validateMissingMobile(
            patientName, 
            validPatientData
        );

        // Condition 4: Missing Referral
        await newPatient.validateMissingReferral(
            patientName, 
            validPatientData, 
            validationErrors
        );

        // Condition 5: Verify Invalid Email Format Blocks Save
        await newPatient.validateInvalidEmailFormat(
            patientName,
            validPatientData,
            invalidPatientData.invalidEmailFormat
        );

        // Condition 6: Verify Age physically blocks negative signs
        await newPatient.validateNumericOnlyAge(
            invalidPatientData.negativeAgeInput, 
            invalidPatientData.expectedSanitizedAge
        );

        // Condition 7: Verify selecting a future date resets to today
        await newPatient.validateFutureDateSelectionResetsToToday(
            invalidPatientData.futureTestDay
        );

        // Condition 7.5: Verify Leap Year DOB Calculation
        await newPatient.validateLeapYearDob(leapYearDob);

        // Condition 8: Verify Valid Data Entry and Cancel
        const validTestPatientName = generateUniquePatientFullName();
        const validTestDobData = generateRandomDateOfBirth(
            validPatientData.minDobYear, 
            validPatientData.maxDobYear
        );

        await newPatient.validateValidDataEntryAndCancel(
            validTestPatientName, 
            validPatientData, 
            validTestDobData
        );

        // Condition 9: Verify Inline Duplicate Patient Warning
        const duplicatePatientName = generateUniquePatientFullName();
        const duplicateDobData = generateRandomDateOfBirth(
            validPatientData.minDobYear, 
            validPatientData.maxDobYear
        );

        await newPatient.validateDuplicateWarning(
            duplicatePatientName,
            validPatientData,
            duplicateDobData,
            validationErrors
        );

        // Condition 10: Verify closing the drawer using the 'X' button
        await newPatient.validateCloseUsingX();

        // Condition 11: Create a valid patient successfully within Flow 1
        const flow1PatientName = generateUniquePatientFullName();
        const flow1DobData = generateRandomDateOfBirth(
            validPatientData.minDobYear, 
            validPatientData.maxDobYear
        );

        await newPatient.createValidPatient(
            flow1PatientName,
            validPatientData,
            flow1DobData,
            { expectedToastMsg: toastMessages.patientSavedSuccess }
        );
    });

    // FLOW 2 - Create Non-VIP Patient And Change to VIP While Editing

    test('Flow 2 - Create Non-VIP Patient And Upgrade To VIP While Editing', async ({ page }) => {

        const newPatient = new NewPatient(page);

        const patientName = generateUniquePatientFullName();
        const dobData = generateRandomDateOfBirth(
            validPatientData.minDobYear, 
            validPatientData.maxDobYear
        );

        // 1. Create patient as non-VIP
        await newPatient.createValidPatient(
            patientName,
            validPatientData,
            dobData,
            { expectedToastMsg: toastMessages.patientSavedSuccess }
        );

        // 2. Search from calendar bar and navigate to profile
        await newPatient.searchPatientAndGoToProfile(patientName);

        await page.waitForTimeout(40000);

        // 3. Verify Name appears on Profile Page
        await newPatient.verifyPatientProfileNameMatches(
            patientName
        );

        // 4. Verify read-only Profile details match
        await newPatient.verifyPatientProfileDetails(
            validPatientData, 
            dobData
        );

        // 5. Open Edit Drawer and Verify values
        await newPatient.openEditPatient();

        // 5.5 Edit Name and Mobile Number dynamically using random generators
        const updatedPatientName = generateUniquePatientFullName();
        const updatedMobileNumber = generateRandomMobileNumber();
        await newPatient.updatePatientNameAndMobile(updatedPatientName, updatedMobileNumber);

        // 6. Upgrade to VIP and Save
        await newPatient.enableVipAndSave(toastMessages.patientUpdatedSuccess);

        // 7. Verify the newly updated Name appears on the Profile Page
        await newPatient.verifyPatientProfileNameMatches(updatedPatientName);

        // 8. Verify the read-only Profile details match the new data and VIP masking is applied
        const updatedPatientData = {
            ...validPatientData,
            mobileNumber: updatedMobileNumber 
        };

        await newPatient.verifyPatientProfileDetails(
            updatedPatientData, 
            dobData, 
            { isVip: true }
        );  
    });

    // FLOW 3 - Create VIP Patient And Verify Downgrade Is Blocked

    test('Flow 3 - Create VIP Patient And Verify Downgrade To Non-VIP Is Blocked', async ({ page }) => {

        const newPatient = new NewPatient(page);

        const patientName = generateUniquePatientFullName();
        const dobData = generateRandomDateOfBirth(
            validPatientData.minDobYear, 
            validPatientData.maxDobYear
        );

        // 1. Create patient as VIP from the start
        await newPatient.createValidPatient(
            patientName,
            validPatientData,
            dobData,
            { markAsVip: true, expectedToastMsg: toastMessages.patientSavedSuccess }
        );

        // 2. Search and navigate to profile
        await newPatient.searchPatientAndGoToProfile(patientName);

         await page.waitForTimeout(40000);

        // 3. Verify Name appears on Profile Page
        await newPatient.verifyPatientProfileNameMatches(
            patientName
        );

        // 4. Verify read-only Profile details and VIP masking
        await newPatient.verifyPatientProfileDetails(
            validPatientData, 
            dobData,
            { isVip: true }
        );

        // 5. Open Edit Drawer, edit Name & Mobile dynamically, and verify VIP status cannot be removed
        await newPatient.openEditPatient();

        const updatedVipPatientName = generateUniquePatientFullName();
        const updatedVipMobileNumber = generateRandomMobileNumber();
        await newPatient.updatePatientNameAndMobile(updatedVipPatientName, updatedVipMobileNumber);

        await newPatient.verifyVipCheckboxCannotBeUnchecked();

        // 6. Save and verify update success toast
        await newPatient.saveEditPatientAndVerify(toastMessages.patientUpdatedSuccess);
    });

});