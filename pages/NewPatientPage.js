import { expect } from '@playwright/test';
import { StepHelper } from '../utils/StepHelper.js';
import { Verify } from '../utils/verification.js';
import { NewPatientLocator } from '../Locators/NewPatientLocator.js';
import { Keywords } from '../utils/Keywords.js';

export class NewPatient {

    constructor(page) {
        this.page = page;
        this.locator = new NewPatientLocator(page);
        this.keywords = new Keywords();
    }


    async openAddPatientForm() {

        await Verify.state(
            this.page,
            'Add New Button',
            this.locator.addNewBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(this.locator.addNewBtn);
            }
        );

        await Verify.state(
            this.page,
            'Add Patient Option',
            this.locator.addPatientBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Add Patient Button',
            async () => {
                await this.keywords.click(this.locator.addPatientBtn);
            }
        );

        await Verify.state(
            this.page,
            'Add New Patient Panel Title',
            this.locator.panelTitle,
            { visible: true, soft: false }
        );
    }


    async selectSalutation(salutation = 'Mr') {

        await Verify.state(
            this.page,
            'Salutation Dropdown',
            this.locator.salutationDropdownBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Salutation Dropdown',
            async () => {
                await this.keywords.click(this.locator.salutationDropdownBtn);
            }
        );

        const option = this.locator.getSalutationOption(salutation);

        await Verify.state(
            this.page,
            `Salutation Option - ${salutation}`,
            option,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Salutation - ${salutation}`,
            async () => {
                await this.keywords.click(option);
            }
        );
    }


    async enterPatientName(patientName) {

        await Verify.state(
            this.page,
            'Patient Name Field',
            this.locator.patientNameTxt,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Patient Name - ${patientName}`,
            async () => {
                await this.keywords.fill(this.locator.patientNameTxt, patientName);
            }
        );

        await Verify.inputValue(
            this.page,
            'Patient Name Field Value',
            patientName,
            this.locator.patientNameTxt
        );
    }


    async enterMobileNumber(mobileNumber) {

        await Verify.state(
            this.page,
            'Mobile Number Field',
            this.locator.mobileNumberTxt,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Mobile Number - ${mobileNumber}`,
            async () => {
                await this.keywords.fill(this.locator.mobileNumberTxt, mobileNumber);
            }
        );

        await Verify.inputValue(
            this.page,
            'Mobile Number Field Value',
            mobileNumber,
            this.locator.mobileNumberTxt
        );
    }


    async enterReferralBy(referralBy) {

        await Verify.state(
            this.page,
            'Referral By Field',
            this.locator.referralByTxt,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Referral By - ${referralBy}`,
            async () => {
                await this.keywords.fill(this.locator.referralByTxt, referralBy);
            }
        );

        await Verify.inputValue(
            this.page,
            'Referral By Field Value',
            referralBy,
            this.locator.referralByTxt
        );
    }


    async verifySaveEnabledAfterMandatoryFields() {

        await Verify.state(
            this.page,
            'Save Button Enabled After Mandatory Fields Filled',
            this.locator.saveBtn,
            { visible: true, enabled: true, soft: false }
        );
    }


    async enterEmail(email) {

        await Verify.state(
            this.page,
            'Email Field',
            this.locator.emailTxt,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Email - ${email}`,
            async () => {
                await this.keywords.fill(this.locator.emailTxt, email);
            }
        );

        await Verify.inputValue(
            this.page,
            'Email Field Value',
            email,
            this.locator.emailTxt
        );
    }


    async enterDateOfBirth(dobData) {

        const { day, monthName, year } = dobData;

        await Verify.state(
            this.page,
            'Date Of Birth Field',
            this.locator.dobComponent,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Date Of Birth Field',
            async () => {
                await this.keywords.click(this.locator.dobComponent);
            }
        );

        await Verify.state(
            this.page,
            'DOB Calendar Opened',
            this.locator.calendarHeader,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Month/Year Selector',
            async () => {
                await this.keywords.click(this.locator.calendarHeaderTitle);
            }
        );

        const monthOption = this.locator.getMonthButton(monthName);

        await Verify.state(
            this.page,
            `Month Option - ${monthName}`,
            monthOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Month - ${monthName}`,
            async () => {
                await this.keywords.click(monthOption);
            }
        );

        const yearOption = this.locator.getYearButton(year);

        await Verify.state(
            this.page,
            `Year Option - ${year}`,
            yearOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Year - ${year}`,
            async () => {
                await this.keywords.click(yearOption);
            }
        );

        await StepHelper.step(
            this.page,
            'Save Month/Year Selection',
            async () => {
                await this.keywords.click(this.locator.saveDateBtn);
            }
        );

        const dayLocator = this.locator.getDayLocator(day);

        await Verify.state(
            this.page,
            `Day ${day} In DOB Calendar`,
            dayLocator.first(),
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Date Of Birth Day - ${day}`,
            async () => {
                await this.keywords.click(dayLocator.first());
            }
        );

        await Verify.state(
            this.page,
            'DOB Calendar Closed After Day Selection',
            this.locator.calendarHeader,
            { hidden: true }
        );

        const expectedDateText = `${day}/${dobData.monthIndex + 1}/${year}`;

        await Verify.text(
            this.page,
            'DOB Field Displays Selected Date',
            expectedDateText,
            this.locator.dobDisplayText
        );
    }


    async verifyAgeCalculatedCorrectly(dobData) {

        const { calculateAgeFromDate } = require('../utils/RandomData');

        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        await Verify.state(
            this.page,
            'Age Field',
            this.locator.ageTxt,
            { visible: true, soft: false }
        );

        await expect(async () => {

            const actualValue = await this.locator.ageTxt.inputValue();

            expect(actualValue).not.toBe('');

        }).toPass({ timeout: 5000 });

        const actualAgeText = await this.locator.ageTxt.inputValue();

        await Verify.equals(
            this.page,
            'Age Field Auto-Calculated Correctly',
            String(expectedAge),
            actualAgeText
        );
    }


    async selectGender(gender = 'Male') {

        const genderBtn =
            gender === 'Female' ? this.locator.femaleBtn :
            gender === 'Other' ? this.locator.otherGenderBtn :
            this.locator.maleBtn;

        await Verify.state(
            this.page,
            `Gender Option - ${gender}`,
            genderBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Gender - ${gender}`,
            async () => {
                await this.keywords.click(genderBtn);
            }
        );
    }


    async enterAddress(address) {

        await Verify.state(
            this.page,
            'Address Field',
            this.locator.addressTxt,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Address - ${address}`,
            async () => {
                await this.keywords.fill(this.locator.addressTxt, address);
            }
        );

        await Verify.inputValue(
            this.page,
            'Address Field Value',
            address,
            this.locator.addressTxt
        );
    }


    async fillAdditionalDetails(additionalDetails) {

        const fields = [
            { label: 'Treating Doctor', locator: this.locator.treatingDoctorTxt, value: additionalDetails.treatingDoctor },
            { label: 'Medical Condition', locator: this.locator.medicalConditionTxt, value: additionalDetails.medicalCondition },
            { label: 'Pincode', locator: this.locator.pincodeTxt, value: additionalDetails.pincode },
            { label: 'Patient Category', locator: this.locator.patientCategoryTxt, value: additionalDetails.patientCategory }
        ];

        for (const field of fields) {

            await Verify.state(
                this.page,
                `${field.label} Field`,
                field.locator,
                { visible: true, enabled: true, soft: false }
            );

            await StepHelper.step(
                this.page,
                `Enter ${field.label} - ${field.value}`,
                async () => {
                    await field.locator.fill(field.value);
                }
            );

            await Verify.inputValue(
                this.page,
                `${field.label} Field Value`,
                field.value,
                field.locator
            );
        }
    }


        async checkVipPatientCheckbox() {

        await Verify.state(
            this.page,
            'VIP Checkbox Toggle',
            this.locator.vipCheckboxToggle,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Check VIP Patient Checkbox',
            async () => {
                await this.keywords.click(this.locator.vipCheckboxToggle);
            }
        );

        await this.keywords.wait(this.page, 500);

        const classAfter = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.contains(
            this.page,
            'VIP Checkbox Is Checked After Click',
            'checked',
            classAfter
        );
    }


    async verifyVipCheckboxCannotBeUnchecked() {

        await Verify.state(
            this.page,
            'VIP Checkbox',
            this.locator.vipCheckboxState,
            { visible: true, soft: false }
        );

        const classBefore = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.contains(
            this.page,
            'VIP Checkbox Is Checked Before Attempting To Uncheck',
            'checked',
            classBefore
        );

        await StepHelper.step(
            this.page,
            'Click VIP Checkbox (attempting to uncheck)',
            async () => {
                await this.keywords.click(this.locator.vipCheckboxToggle);
            }
        );

        const classAfter = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.contains(
            this.page,
            'VIP Checkbox Still Checked After Click (VIP -> non-VIP blocked)',
            'checked',
            classAfter
        );
    }


    async clickSave() {

        await Verify.state(
            this.page,
            'Save Button',
            this.locator.saveBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Save Button',
            async () => {
                await this.keywords.click(this.locator.saveBtn);
            }
        );
    }


    // async verifyPatientSaved(patientName) {

    //     await Verify.state(
    //         this.page,
    //         `Patient Saved Confirmation - ${patientName}`,
    //         this.locator.patientSavedMsg,
    //         { visible: true, soft: false }
    //     );
    // }

    async verifyPatientSaved(patientName) {

    await this.keywords.waitForElement(
        this.locator.patientSavedToastTitle,
        15000
    );

    await Verify.state(
        this.page,
        `Patient Saved Confirmation - ${patientName}`,
        this.locator.patientSavedToastTitle,
        { visible: true, soft: false }
    );

    await Verify.text(
        this.page,
        'Patient Saved Toast Title Text',
        'Patient Saved successfully',
        this.locator.patientSavedToastTitle
    );
}


    async searchAndVerifyPatient(patientName) {

        await Verify.state(
            this.page,
            'Search Patient Field',
            this.locator.searchPatientTxt,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Search Patient - ${patientName}`,
            async () => {
                await this.keywords.fill(this.locator.searchPatientTxt, patientName);
            }
        );

        const patient = this.locator.getPatient(patientName);

        await this.keywords.waitForElement(patient);

        await Verify.state(
            this.page,
            `Patient Found In Search - ${patientName}`,
            patient,
            { visible: true, soft: false }
        );

        return patient;
    }


    async verifySavedToastAndGoToProfile() {

        await Verify.state(
            this.page,
            'Patient Saved Toast Title',
            this.locator.patientSavedToastTitle,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Saved Toast Title Text',
            'Patient Saved successfully',
            this.locator.patientSavedToastTitle
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

        await this.page.waitForURL(/\/patient-profile\//, { timeout: 15000 });
    }


    async verifyPatientProfileNameMatches(patientName) {

        await this.keywords.waitForElement(
            this.locator.patientProfileNameText,
            15000
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


    async openEditPatient() {

        await Verify.state(
            this.page,
            'Edit Patient Icon',
            this.locator.editPatientIcon,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Edit Patient Icon',
            async () => {
                await this.keywords.click(this.locator.editPatientIcon);
            }
        );

        await this.keywords.waitForElement(
            this.locator.patientNameTxt,
            15000
        );

        await Verify.state(
            this.page,
            'Edit Patient Panel',
            this.locator.patientNameTxt,
            { visible: true, soft: false }
        );
    }


    async verifyEditPatientFieldsMatch(patientData, dobData) {

        const { calculateAgeFromDate } = require('../utils/RandomData');

        await Verify.inputValue(
            this.page,
            'Edit Panel - Email Field',
            patientData.email,
            this.locator.emailTxt
        );

        await Verify.inputValue(
            this.page,
            'Edit Panel - Mobile Number Field',
            patientData.mobileNumber,
            this.locator.mobileNumberTxt
        );

        await Verify.inputValue(
            this.page,
            'Edit Panel - Referral By Field',
            patientData.referralBy,
            this.locator.referralByTxt
        );

        await Verify.inputValue(
            this.page,
            'Edit Panel - Address Field',
            patientData.address,
            this.locator.addressTxt
        );

        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        await Verify.inputValue(
            this.page,
            'Edit Panel - Age Field',
            String(expectedAge),
            this.locator.ageTxt
        );

        const expectedDateText = `${dobData.day}/${dobData.monthIndex + 1}/${dobData.year}`;

        await Verify.text(
            this.page,
            'Edit Panel - DOB Field',
            expectedDateText,
            this.locator.dobDisplayText
        );

        const additionalFields = [
            { label: 'Treating Doctor', locator: this.locator.treatingDoctorTxt, value: patientData.additionalDetails.treatingDoctor },
            { label: 'Medical Condition', locator: this.locator.medicalConditionTxt, value: patientData.additionalDetails.medicalCondition },
            { label: 'Pincode', locator: this.locator.pincodeTxt, value: patientData.additionalDetails.pincode },
            { label: 'Patient Category', locator: this.locator.patientCategoryTxt, value: patientData.additionalDetails.patientCategory }
        ];

        for (const field of additionalFields) {

            await Verify.inputValue(
                this.page,
                `Edit Panel - ${field.label} Field`,
                field.value,
                field.locator
            );
        }

        const salutationText = (
            await this.locator.salutationDropdownBtn.innerText()
        ).trim();

        await Verify.record(
            this.page,
            'Edit Panel - Salutation Dropdown Displays',
            salutationText
        );

        await Verify.record(
            this.page,
            'Edit Panel - Gender Selected (no confirmed indicator - informational only)',
            patientData.gender
        );
    }


    async saveEditPatientAndVerify() {

        await Verify.state(
            this.page,
            'Edit Patient Save Button',
            this.locator.editPatientSaveBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Edit Patient Save Button',
            async () => {
                await this.keywords.click(this.locator.editPatientSaveBtn);
            }
        );

        await this.keywords.waitForElement(
            this.locator.patientUpdatedToastTitle,
            15000
        );

        await Verify.state(
            this.page,
            'Patient Details Updated Toast',
            this.locator.patientUpdatedToastTitle,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Patient Details Updated Toast Text',
            'Patient details updated successfully',
            this.locator.patientUpdatedToastTitle
        );
    }
    
        async enableVipAndSave() {

        const classBeforeEdit = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.record(
            this.page,
            'VIP Checkbox State Before Enabling VIP',
            classBeforeEdit
        );

        await this.checkVipPatientCheckbox();

        await this.saveEditPatientAndVerify();
    }

    async createValidPatient(patientName, patientData, dobData, options = {}) {

        const { markAsVip = false } = options;

        await this.openAddPatientForm();

        if (markAsVip) {
            await this.checkVipPatientCheckbox();
        }

        await this.enterPatientName(patientName);
        await this.selectSalutation(patientData.title);
        await this.enterMobileNumber(patientData.mobileNumber);
        await this.enterReferralBy(patientData.referralBy);

        await this.verifySaveEnabledAfterMandatoryFields();

        await this.enterEmail(patientData.email);
        await this.enterDateOfBirth(dobData);
        await this.verifyAgeCalculatedCorrectly(dobData);
        await this.selectGender(patientData.gender);
        await this.enterAddress(patientData.address);
        await this.fillAdditionalDetails(patientData.additionalDetails);

        await this.clickSave();

        await this.verifyPatientSaved(patientName);
    }
}