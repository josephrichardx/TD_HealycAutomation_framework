const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PatientLocator } = require('../Locators/PatientLocator');
const { Keywords } = require('../utils/Keywords');

class PatientPage {

    constructor(page) {
        this.page = page;
        this.locator = new PatientLocator(page);
        this.keywords = new Keywords();
    }


    // =========================================================
    // ADD NEW
    // =========================================================

    async clickAddNew() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {

                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );
    }


    // =========================================================
    // ADD PATIENT
    // =========================================================

    async clickAddPatient() {

        await StepHelper.step(
            this.page,
            'Click Add Patient Button',
            async () => {

                await this.keywords.click(
                    this.locator.addPatientBtn
                );
            }
        );
    }


    // =========================================================
    // PATIENT NAME
    // =========================================================

    async enterPatientName(patientName) {

        await StepHelper.step(
            this.page,
            `Enter Patient Name - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.patientNameTxt,
                    patientName
                );
            }
        );
    }


    // =========================================================
    // TITLE
    // =========================================================

    async selectTitle(title = 'Mr') {

        await StepHelper.step(
            this.page,
            'Open Title Dropdown',
            async () => {

                await this.keywords.click(
                    this.locator.titleDropdown
                );
            }
        );


        switch (title) {

            case 'Mr':

                await StepHelper.step(
                    this.page,
                    'Select Title - Mr',
                    async () => {

                        await this.keywords.click(
                            this.locator.mrOption
                        );
                    }
                );

                break;


            default:

                await StepHelper.step(
                    this.page,
                    'Select Title - Mr',
                    async () => {

                        await this.keywords.click(
                            this.locator.mrOption
                        );
                    }
                );

                break;
        }
    }


    // =========================================================
    // PHONE NUMBER
    // =========================================================

    async enterPhoneNumber(phoneNumber) {

        await StepHelper.step(
            this.page,
            `Enter Phone Number - ${phoneNumber}`,
            async () => {

                await this.keywords.fill(
                    this.locator.phoneTxt,
                    phoneNumber
                );
            }
        );
    }


    // =========================================================
    // NOTES
    // =========================================================

    async enterNotes(notes) {

        await StepHelper.step(
            this.page,
            'Enter Patient Notes',
            async () => {

                await this.keywords.fill(
                    this.locator.notesTxt,
                    notes
                );
            }
        );
    }


    // =========================================================
    // EMAIL
    // =========================================================

    async enterEmail(email) {

        await StepHelper.step(
            this.page,
            `Enter Email - ${email}`,
            async () => {

                await this.keywords.fill(
                    this.locator.emailTxt,
                    email
                );
            }
        );
    }


    // =========================================================
    // AGE
    // =========================================================

    async enterAge(age) {

        await StepHelper.step(
            this.page,
            `Enter Age - ${age}`,
            async () => {

                await this.keywords.fill(
                    this.locator.ageTxt,
                    age.toString()
                );
            }
        );
    }


    // =========================================================
    // GENDER
    // =========================================================

    async selectGender(gender = 'Male') {

        if (gender === 'Male') {

            await StepHelper.step(
                this.page,
                'Select Gender - Male',
                async () => {

                    await this.keywords.click(
                        this.locator.maleBtn
                    );
                }
            );
        }


        if (gender === 'Female') {

            await StepHelper.step(
                this.page,
                'Select Gender - Female',
                async () => {

                    await this.keywords.click(
                        this.locator.femaleBtn
                    );
                }
            );
        }
    }


    // =========================================================
    // ADDRESS
    // =========================================================

    async enterAddress(address) {

        await StepHelper.step(
            this.page,
            'Enter Address',
            async () => {

                await this.keywords.fill(
                    this.locator.addressTxt,
                    address
                );
            }
        );
    }


    // =========================================================
    // SAVE
    // =========================================================

    async clickSave() {

        await StepHelper.step(
            this.page,
            'Click Save Button',
            async () => {

                await this.keywords.click(
                    this.locator.saveBtn
                );
            }
        );
    }


    // =========================================================
    // VERIFY PATIENT SAVED
    // =========================================================

    async verifyPatientSaved(patientName) {

        const actualMessage =
            (
                await this.keywords.getText(
                    this.locator.patientSavedMsg
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Patient Saved Successfully | Expected: Patient Saved successfully | Actual: ${actualMessage}`,
            async () => {

                expect(actualMessage).toBe(
                    'Patient Saved successfully'
                );

            }
        );
    }


    // =========================================================
    // CREATE PATIENT
    // =========================================================

    async createPatient(
        patientName,
        patientData
    ) {

        await this.clickAddNew();

        await this.clickAddPatient();

        await this.enterPatientName(
            patientName
        );

        await this.selectTitle(
            patientData.title
        );

        await this.enterPhoneNumber(
            patientData.phoneNumber
        );

        await this.enterNotes(
            patientData.notes
        );

        await this.enterEmail(
            patientData.email
        );

        await this.enterAge(
            patientData.age
        );

        await this.selectGender(
            patientData.gender
        );

        await this.enterAddress(
            patientData.address
        );

        await this.clickSave();

        await this.verifyPatientSaved(
            patientName
        );
    }

    // =========================================================
    // VERIFY PATIENT PROFILE DETAILS (Expected vs Actual)
    // =========================================================

    async verifyPatientProfileDetails(expectedData, expectedFullName) {

        // 1. Click "Go to patient profile" on the success toast
        await StepHelper.step(
            this.page,
            'Click Go to Patient Profile from Toast',
            async () => {
                const goToProfileLink = this.page.locator('app-custom-toaster-message span.action');
                await goToProfileLink.waitFor({ state: 'visible', timeout: 5000 });
                await goToProfileLink.click();
                await this.page.waitForLoadState('networkidle');
            }
        );

        // 2. Extract Actual Values from the Left Patient Profile Panel (based on your DOM screenshots)
        const actualName = (await this.page.locator('div.patient-name span').first().textContent()).trim();
        const actualGenderAge = (await this.page.locator('div.patient-gender-age').textContent()).trim(); // e.g. "Male | 63 Years"
        const actualEmail = (await this.page.locator('div.meta-row i.fa-at + span').textContent()).trim();
        const actualPhone = (await this.page.locator('div.meta-row i.fa-phone + span').textContent()).trim();
        const actualAddress = (await this.page.locator('div.meta-row i.fa-location-dot + span').textContent()).trim();

        // 3. Perform Expected vs Actual Assertions with explicit console logs
        await StepHelper.step(
            this.page,
            `Verify Patient Name | Expected: ${expectedFullName} | Actual: ${actualName}`,
            async () => {
                console.log(`[PASS] Patient Name | Expected: ${expectedFullName} | Actual: ${actualName}`);
                expect(actualName).toBe(expectedFullName);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Gender & Age | Expected: ${expectedData.gender} | ${expectedData.age} Years | Actual: ${actualGenderAge}`,
            async () => {
                console.log(`[PASS] Gender/Age | Expected: ${expectedData.gender} | ${expectedData.age} Years | Actual: ${actualGenderAge}`);
                expect(actualGenderAge).toContain(expectedData.gender);
                expect(actualGenderAge).toContain(`${expectedData.age} Years`);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Email | Expected: ${expectedData.email} | Actual: ${actualEmail}`,
            async () => {
                console.log(`[PASS] Email | Expected: ${expectedData.email} | Actual: ${actualEmail}`);
                expect(actualEmail).toBe(expectedData.email);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Phone Number | Expected: ${expectedData.phoneNumber} | Actual: ${actualPhone}`,
            async () => {
                console.log(`[PASS] Phone | Expected: ${expectedData.phoneNumber} | Actual: ${actualPhone}`);
                expect(actualPhone).toContain(expectedData.phoneNumber);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Address | Expected: ${expectedData.address} | Actual: ${actualAddress}`,
            async () => {
                console.log(`[PASS] Address | Expected: ${expectedData.address} | Actual: ${actualAddress}`);
                expect(actualAddress).toBe(expectedData.address);
            }
        );
    }


    // =========================================================
    // SEARCH PATIENT
    // =========================================================

    async searchPatient(patientName) {

        await StepHelper.step(
            this.page,
            `Search Patient - ${patientName}`,
            async () => {

                await this.keywords.fill(
                    this.locator.searchPatientTxt,
                    patientName
                );
            }
        );


        const patient =
            this.locator.getPatient(
                patientName
            );


        await this.keywords.waitForElement(
            patient
        );


        await StepHelper.step(
            this.page,
            `Select Patient - ${patientName}`,
            async () => {

                await this.keywords.click(
                    patient
                );
            }
        );
    }
}


module.exports = { PatientPage };