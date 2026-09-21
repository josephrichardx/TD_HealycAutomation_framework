const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Verify } = require('../utils/verification');
const { PatientLocator } = require('../Locators/PatientLocator');
const { Keywords } = require('../utils/Keywords');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

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
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });

            }
        );
    }


    // =========================================================
    // VERIFY PATIENT SAVE OUTCOME
    // =========================================================

    async verifyPatientSavedOutcome(patientName, verification) {

        const step =
            'Verify Patient Saved Successfully';

        const toaster =
            this.locator.patientSavedMsg.first();

        const panelField =
            this.locator.patientNameTxt.first();

        let actualMessage = null;

        await StepHelper.step(
            this.page,
            `Wait For Patient Save Outcome - ${patientName}`,
            async () => {

                await Promise.race([

                    toaster
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        })
                        .catch(() => {}),

                    panelField
                        .waitFor({
                            state: 'hidden',
                            timeout: timeout.elementTimeout
                        })
                        .catch(() => {})
                ]);

                const toasterVisible =
                    await toaster
                        .isVisible()
                        .catch(() => false);

                if (toasterVisible) {

                    actualMessage = (
                        await this.keywords.getText(
                            toaster
                        )
                    ).trim();
                }
            }
        );

        if (
            actualMessage &&
            verification &&
            verification.expectedMessage
        ) {

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

            await Verify.state(
                this.page,
                `Add Patient form closed after save - ${patientName}`,
                panelField,
                {
                    hidden: true,
                    soft: false
                }
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
            patient,
            timeout.elementTimeout
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

    //e2e

     async createPatientFast(patientName, patientData, dobData) {
        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(this.locator.addNewBtn);
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Patient Button',
            async () => {
                await this.keywords.click(this.locator.addPatientBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Patient Name - ${patientName}`,
            async () => {
                await this.keywords.fill(this.locator.patientNameTxt, patientName);
            }
        );

        await StepHelper.step(
            this.page,
            'Open Salutation Dropdown',
            async () => {
                await this.keywords.click(this.locator.salutationDropdownBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Salutation - ${patientData.title}`,
            async () => {
                await this.keywords.click(this.locator.getSalutationOption(patientData.title));
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Mobile Number - ${patientData.mobileNumber}`,
            async () => {
                await this.keywords.fill(this.locator.mobileNumberTxt, patientData.mobileNumber);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Referral By - ${patientData.referralBy}`,
            async () => {
                await this.keywords.fill(this.locator.referralByTxt, patientData.referralBy);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Email - ${patientData.email}`,
            async () => {
                await this.keywords.fill(this.locator.emailTxt, patientData.email);
            }
        );

        await StepHelper.step(
            this.page,
            'Click Date Of Birth Field',
            async () => {
                await this.keywords.click(this.locator.dobComponent);
            }
        );

        await StepHelper.step(
            this.page,
            'Open Month/Year Selector',
            async () => {
                await this.keywords.click(this.locator.calendarHeaderTitle);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Month - ${dobData.monthName}`,
            async () => {
                await this.keywords.click(this.locator.getMonthButton(dobData.monthName));
            }
        );

        await StepHelper.step(
            this.page,
            `Select Year - ${dobData.year}`,
            async () => {
                await this.keywords.click(this.locator.getYearButton(dobData.year));
            }
        );

        await StepHelper.step(
            this.page,
            'Save Month/Year Selection',
            async () => {
                await this.keywords.click(this.locator.saveDateBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Select Date Of Birth Day - ${dobData.day}`,
            async () => {
                await this.keywords.click(this.locator.getDayLocator(dobData.day).first());
            }
        );

        await StepHelper.step(
            this.page,
            `Select Gender - ${patientData.gender}`,
            async () => {
                const genderBtn =
                    patientData.gender === 'Female' ? this.locator.femaleBtn :
                    patientData.gender === 'Other' ? this.locator.otherGenderBtn :
                    this.locator.maleBtn;

                await this.keywords.click(genderBtn);
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Address - ${patientData.address}`,
            async () => {
                await this.keywords.fill(this.locator.addressTxt, patientData.address);
            }
        );

        const additionalFields = [
            { locator: this.locator.treatingDoctorTxt, value: patientData.additionalDetails.treatingDoctor, label: 'Treating Doctor' },
            { locator: this.locator.medicalConditionTxt, value: patientData.additionalDetails.medicalCondition, label: 'Medical Condition' },
            { locator: this.locator.pincodeTxt, value: patientData.additionalDetails.pincode, label: 'Pincode' },
            { locator: this.locator.patientCategoryTxt, value: patientData.additionalDetails.patientCategory, label: 'Patient Category' }
        ];

        for (const field of additionalFields) {
            await StepHelper.step(
                this.page,
                `Enter ${field.label} - ${field.value}`,
                async () => {
                    await field.locator.fill(field.value);
                }
            );
        }

        await StepHelper.step(
            this.page,
            'Click Save Button',
            async () => {
                await this.keywords.click(this.locator.saveBtn);
            }
        );

        await this.keywords.waitForElement(
            this.locator.successToastTitle,
            timeout.elementTimeout
        );
    }

    async verifySavedToastAndGoToProfile(expectedToastMsg) {
        await Verify.state(
            this.page,
            'Patient Saved Toast Title',
            this.locator.successToastTitle,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Saved Toast Title Text',
            expectedToastMsg,
            this.locator.successToastTitle
        );

        await Verify.state(
            this.page,
            'Go To Patient Profile Link',
            this.locator.goToPatientProfileLink,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Go To Patient Profile',
            async () => {
                await this.keywords.click(this.locator.goToPatientProfileLink);
            }
        );

        await this.page.waitForURL(/\/patient-profile\//, { timeout: timeout.elementTimeout });
    }

    async verifyPatientProfileNameMatches(patientName) {
        await this.keywords.waitForElement(
            this.locator.patientProfileNameText,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            'Patient Profile Name',
            this.locator.patientProfileNameText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile Name Matches Created Patient',
            patientName,
            this.locator.patientProfileNameText
        );
    }

    async verifyPatientProfileDetails(patientData, dobData, options = {}) {
        const { calculateAgeFromDate } = require('../utils/RandomData');
        const isVip = options.isVip || false;

        // UHID 
        await Verify.state(
            this.page,
            'Patient Profile - UHID Field Present',
            this.locator.profileUhidText,
            { visible: true, soft: false }
        );

        const actualUhid = (await this.locator.profileUhidText.innerText()).trim();

        await Verify.record(
            this.page,
            'Patient Profile - UHID',
            actualUhid
        );

        // Gender/Age
        await Verify.state(
            this.page,
            'Patient Profile - Gender/Age Field Present',
            this.locator.profileGenderAgeText,
            { visible: true, soft: false }
        );

        const actualGenderAge = (await this.locator.profileGenderAgeText.innerText()).trim();
        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        await StepHelper.step(
            this.page,
            `Verify Patient Profile Gender | Expected to contain: ${patientData.gender} | Actual: ${actualGenderAge}`,
            async () => {
                expect(actualGenderAge).toContain(patientData.gender);
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Patient Profile Age | Expected to contain: ${expectedAge} Years | Actual: ${actualGenderAge}`,
            async () => {
                expect(actualGenderAge).toContain(`${expectedAge} Years`);
            }
        );

        // Email
        await Verify.state(
            this.page,
            'Patient Profile - Email Field Present',
            this.locator.profileEmailText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Email',
            patientData.email,
            this.locator.profileEmailText,
            { exact: true }
        );

        // Phone
        await Verify.state(
            this.page,
            'Patient Profile - Phone Field Present',
            this.locator.profilePhoneText,
            { visible: true, soft: false }
        );

        const expectedPhone = isVip
            ? `******${patientData.mobileNumber.slice(-4)}`
            : patientData.mobileNumber;

        await Verify.text(
            this.page,
            'Patient Profile - Phone',
            expectedPhone,
            this.locator.profilePhoneText
        );

        // Address
        await Verify.state(
            this.page,
            'Patient Profile - Address Field Present',
            this.locator.profileAddressText,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Address',
            patientData.address,
            this.locator.profileAddressText,
            { exact: true }
        );

        // Referral Source
        await Verify.state(
            this.page,
            'Patient Profile - Referral Source Field Present',
            this.locator.profileReferralSourceValue,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Profile - Referral Source',
            patientData.referralBy,
            this.locator.profileReferralSourceValue,
            { exact: true }
        );
    }

}


module.exports = { PatientPage };