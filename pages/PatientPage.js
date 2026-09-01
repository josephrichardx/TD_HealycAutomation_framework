const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Verify } = require('../utils/verification');
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

        await StepHelper.step(
            this.page,
            `Verify Patient Saved Successfully - ${patientName}`,
            async () => {

                await expect(
                    this.locator.patientSavedMsg
                ).toBeVisible();

            }
        );
    }


    // =========================================================
    // VERIFY PATIENT SAVE OUTCOME
    // =========================================================
    // The success toaster is transient - if it is already gone by the time it
    // is read, the observable outcome is the Add Patient form closing. This
    // races both so a missed toaster is not reported as a failed save.
    // `verification` = { expectedMessage } from the calling spec's own data
    // file (patientData.savedVerification).

    async verifyPatientSavedOutcome(patientName, verification) {

        const step = 'Verify Patient Saved Successfully';

        const toaster = this.locator.patientSavedMsg.first();

        const panelField = this.locator.patientNameTxt.first();

        let actualMessage = null;

        await StepHelper.step(
            this.page,
            `Wait For Patient Save Outcome - ${patientName}`,
            async () => {

                await Promise.race([

                    toaster
                        .waitFor({ state: 'visible' })
                        .catch(() => {}),

                    panelField
                        .waitFor({ state: 'hidden' })
                        .catch(() => {})
                ]);

                const toasterVisible = await toaster
                    .isVisible()
                    .catch(() => false);

                if (toasterVisible) {

                    actualMessage = (
                        await this.keywords.getText(toaster)
                    ).trim();
                }
            }
        );

        if (actualMessage && verification && verification.expectedMessage) {

            await Verify.equals(
                this.page,
                `${step} - ${patientName}`,
                verification.expectedMessage,
                actualMessage
            );

            return actualMessage;

        } else if (actualMessage) {

            await Verify.record(
                this.page,
                `Patient Save Toaster - ${patientName}`,
                actualMessage
            );

            return actualMessage;

        } else {

            // The toaster was already gone - the form closing is the outcome.
            await Verify.state(
                this.page,
                `Add Patient form closed after save - ${patientName}`,
                panelField,
                { hidden: true, soft: false }
            );

            return null;
        }
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

        await this.verifyPatientSavedOutcome(
            patientName,
            patientData.savedVerification
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