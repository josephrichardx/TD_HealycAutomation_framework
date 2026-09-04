import { expect } from '@playwright/test';

import { StepHelper } from '../utils/StepHelper.js';

import { Verify } from '../utils/verification.js';

import { NewPatientLocator } from '../Locators/NewPatientLocator.js';

import { Keywords } from '../utils/Keywords.js';

const { calculateAgeFromDate } = require('../utils/RandomData');

const { 
    toastWaitTimeoutMs, 
    shortWaitMs, 
    mediumWaitMs, 
    longWaitMs, 
    retryTimeoutMs, 
    navigationTimeoutMs, 
    typingDelayMs, 
    fastTypingDelayMs 
} = require('../testdata/timeoutConfig.json');

export class NewPatient {

    constructor(page) {

        this.page = page;

        this.locator = new NewPatientLocator(page);

        this.keywords = new Keywords();

    }

    async openAddPatientForm() {



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

    }

    async selectSalutation(salutation) {

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

        const expectedDateText = `${dobData.day}/${dobData.monthIndex + 1}/${dobData.year}`;

        await Verify.text(

            this.page,

            'DOB Field Displays Selected Date',

            expectedDateText,

            this.locator.dobDisplayText

        );

    }

    async verifyAgeCalculatedCorrectly(dobData) {



        await Verify.state(

            this.page,

            'Age Field',

            this.locator.ageTxt,

            { visible: true, soft: false }

        );

        await expect(async () => {

            const actualValue = await this.locator.ageTxt.inputValue();

            expect(actualValue).not.toBe('');

        }).toPass({ timeout: retryTimeoutMs });

        const actualAgeText = await this.locator.ageTxt.inputValue();

        const expectedAge = calculateAgeFromDate(dobData.dateObj);

        await Verify.equals(

            this.page,

            'Age Field Auto-Calculated Correctly',

            String(expectedAge),

            actualAgeText

        );

    }

    async selectGender(gender) { 

        const genderBtn =

            gender === 'Female' ? this.locator.femaleBtn :

            gender === 'Other' ? this.locator.otherGenderBtn :

            this.locator.maleBtn;



        await StepHelper.step(

            this.page,

            `Select Gender - ${gender}`,

            async () => {

                await this.keywords.click(genderBtn);

            }

        );

    }

    async enterAddress(address) {



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

        await this.keywords.wait(this.page, shortWaitMs);

        const classAfter = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.contains(

            this.page,

            'VIP Checkbox Is Checked After Click',

            'checked',

            classAfter

        );

    }

    async uncheckVipPatientCheckbox() {

        await StepHelper.step(

            this.page,

            'Uncheck VIP Patient Checkbox',

            async () => {

                await this.keywords.click(this.locator.vipCheckboxToggle);

            }

        );

        await this.keywords.wait(this.page, shortWaitMs);

        const classAfter = await this.locator.vipCheckboxState.getAttribute('class');

        await StepHelper.step(

            this.page,

            'Verify VIP Checkbox Is Unchecked After Click',

            async () => {

                expect(classAfter).not.toContain('checked');

            }

        );

    }

    async verifyVipTooltip(expectedText) {

        await Verify.state(

            this.page,

            'VIP Info Icon',

            this.locator.vipInfoIcon,

            { visible: true, soft: false }

        );

        await StepHelper.step(

            this.page,

            'Hover over VIP Info Icon',

            async () => {

                await this.locator.vipInfoIcon.hover();

            }

        );

       await this.page.waitForTimeout(3000); // Wait for tooltip to appear

        await Verify.state(

            this.page,

            'VIP Info Tooltip',

            this.locator.vipInfoTooltip,

            { visible: true, soft: false }

        );

        await Verify.text(

            this.page,

            'VIP Info Tooltip Text',

            expectedText,

            this.locator.vipInfoTooltip

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

        await StepHelper.step(

            this.page,

            'Click Save Button',

            async () => {

                await this.keywords.click(this.locator.saveBtn);

            }

        );

    }

    async verifyPatientSaved(patientName, expectedToastMsg) { 

        await this.keywords.waitForElement(

            this.locator.successToastTitle,

            toastWaitTimeoutMs

        );

        await Verify.state(

            this.page,

            `Patient Saved Confirmation - ${patientName}`,

            this.locator.successToastTitle,

            { visible: true, soft: false }

        );

        await Verify.text(

            this.page,

            'Patient Saved Toast Title Text',

            expectedToastMsg,

            this.locator.successToastTitle

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

            `Search Patient (Typing Sequentially) - ${patientName}`,

            async () => {

                await this.locator.searchPatientTxt.focus();

                await this.locator.searchPatientTxt.pressSequentially(patientName, { delay: typingDelayMs });

            }

        );

        const patient = this.locator.getPatient(patientName);

        await this.keywords.waitForElement(patient);

    }

    async searchPatientAndGoToProfile(patientName) {

        await this.searchAndVerifyPatient(patientName);

        const patientDropdownResult = this.locator.getPatient(patientName);

        await Verify.state(

            this.page,

            `Patient Search Result - ${patientName}`,

            patientDropdownResult,

            { visible: true, soft: false }

        );

        await StepHelper.step(

            this.page,

            'Click Patient from Search Results',

            async () => {

                await this.keywords.click(patientDropdownResult);

            }

        );

        await this.page.waitForURL(/**\**/patient-profile/**\*/, { timeout: navigationTimeoutMs });

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

        await this.page.waitForURL(/**\**/patient-profile/**\*/, { timeout: navigationTimeoutMs });

    }

    async verifyPatientProfileNameMatches(patientName) {

        await this.keywords.waitForElement(

            this.locator.patientProfileNameText,

            navigationTimeoutMs

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

            ? `*****${patientData.mobileNumber.slice(-4)}`

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

    async validateCloseUsingX() {

          await StepHelper.addSteps(

    11,

    'Start',

    'Validate that the Add Patient form can be closed using the X button and that the form resets after closing'

);

        await this.openAddPatientForm();

        await Verify.state(

            this.page,

            'Close Drawer X Button',

            this.locator.closeXBtn,

            { visible: true, enabled: true, soft: false }

        );

        await StepHelper.step(

            this.page,

            'Click Close X Button',

            async () => {

                await this.keywords.click(this.locator.closeXBtn);

            }

        );

        await Verify.state(

            this.page,

            'Add New Patient Panel Closed',

            this.locator.panelTitle,

            { hidden: true }

        );

         await StepHelper.addSteps(

    11,

    'End',

    'Validate that the Add Patient form can be closed using the X button and that the form resets after closing'

);

    }

    async validateLeapYearDob(dobData) {

          await StepHelper.addSteps(

    9,

    'Start',

    'Enter a leap year date of birth and verify that the age is calculated correctly'

);

        await this.openAddPatientForm();

        await this.enterDateOfBirth(dobData);

        // Ensure the date object exists or parse it safely

        const dobDateObj = dobData.dateObj ? new Date(dobData.dateObj) : new Date(dobData.year, dobData.monthIndex, dobData.day);

        const expectedAge = calculateAgeFromDate(dobDateObj);

        await Verify.inputValue(

            this.page,

            'Verify Leap Year Age Calculation',

            String(expectedAge),

            this.locator.ageTxt

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

          await StepHelper.addSteps(

    9,

    'End',

    'Enter a leap year date of birth and verify that the age is calculated correctly'

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

        await this.keywords.waitForElement(this.locator.patientNameTxt, navigationTimeoutMs);

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

        const salutationText = (await this.locator.salutationDropdownBtn.innerText()).trim();

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

    async saveEditPatientAndVerify(expectedToastMsg) {

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

        await this.keywords.waitForElement(this.locator.successToastTitle, toastWaitTimeoutMs);

        await Verify.state(

            this.page,

            'Patient Details Updated Toast',

            this.locator.successToastTitle,

            { visible: true, soft: false }

        );

        await Verify.text(

            this.page,

            'Patient Details Updated Toast Text',

            expectedToastMsg,

            this.locator.successToastTitle

        );

    }

    async enableVipAndSave(expectedToastMsg) {

        const classBeforeEdit = await this.locator.vipCheckboxState.getAttribute('class');

        await Verify.record(

            this.page,

            'VIP Checkbox State Before Enabling VIP',

            classBeforeEdit

        );

        await this.checkVipPatientCheckbox();

        await this.saveEditPatientAndVerify(expectedToastMsg);

    }

    async validateValidDataEntryAndCancel(patientName, patientData, dobData) {

          await StepHelper.addSteps(

    9,

    'Start',

    'Enter valid patient data, verify age calculation, and then cancel the form'

);

        await this.openAddPatientForm();

        await this.enterPatientName(patientName);

        await this.selectSalutation(patientData.title);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.enterReferralBy(patientData.referralBy);

        await this.enterEmail(patientData.email);

        await this.enterDateOfBirth(dobData);

        await this.verifyAgeCalculatedCorrectly(dobData);

        await this.selectGender(patientData.gender);

        await this.enterAddress(patientData.address);

        // Add this line to ensure the form is scrolled back to the top so fields are visible

        await this.locator.panelTitle.scrollIntoViewIfNeeded();

        await this.fillAdditionalDetails(patientData.additionalDetails);

        await this.verifyVipTooltip(patientData.expectedVipTooltipText);

        await this.checkVipPatientCheckbox();

        await this.uncheckVipPatientCheckbox();

        await StepHelper.step(

            this.page,

            'Click Cancel Button',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

        await Verify.state(

            this.page,

            'Add New Patient Panel Closed After Cancel',

            this.locator.panelTitle,

            { hidden: true }

        );

          await StepHelper.addSteps(

    9,

    'End',

    'Enter valid patient data, verify age calculation, and then cancel the form'

);

    }

    async updatePatientNameAndMobile(newName, newMobile) {

        await StepHelper.step(

            this.page,

            `Edit Patient Name to - ${newName}`,

            async () => {

                await this.locator.patientNameTxt.click();

                await this.locator.patientNameTxt.press('Control+A');

                await this.locator.patientNameTxt.press('Backspace');

                await this.keywords.fill(this.locator.patientNameTxt, newName);

            }

        );

        await StepHelper.step(

            this.page,

            `Edit Mobile Number to - ${newMobile}`,

            async () => {

                await this.locator.mobileNumberTxt.click();

                await this.locator.mobileNumberTxt.press('Control+A');

                await this.locator.mobileNumberTxt.press('Backspace');

                await this.keywords.fill(this.locator.mobileNumberTxt, newMobile);

            }

        );

    }

    async createValidPatient(patientName, patientData, dobData, options = {}) {

         await StepHelper.addSteps(

    12,

    'Start',

    ' Create a new patient with valid data and verify the save operation and toast message'

);

        const { markAsVip = false, expectedToastMsg } = options; 

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

        await this.verifyPatientSaved(patientName, expectedToastMsg);

        await StepHelper.addSteps(

            12,

            'End',

            ' Create a new patient with valid data and verify the save operation and toast message'

        );

    }

    // ============================================================

    // VALIDATION FLOW METHODS (Negative Tests)

    // ============================================================





    async validateEmptyMandatoryFields() {

          await StepHelper.addSteps(

    1,

    'start',

    'Click Add New Patient Button to Open Form and verify save button without entering details'

);

        await this.openAddPatientForm();

        await Verify.state(

            this.page,

            'Verify Save Button is Disabled on Empty Form',

            this.locator.saveBtn,

            { visible: true, enabled: false, soft: false } 

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

        await StepHelper.addSteps(

    1,

    'End',

    'Click Add New Patient Button to Open Form and verify save button without entering details'

);



    }

    async validateMissingSalutation(patientName, patientData, errorData) {

        await StepHelper.addSteps(

    2,

    'start',

    'Leave salutation field empty and verify error message when trying to save the form'

);

        await this.openAddPatientForm();

        await this.enterPatientName(patientName);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.enterReferralBy(patientData.referralBy);

        await this.clickSave();

        await this.keywords.waitForElement(this.locator.errorToastTitle, toastWaitTimeoutMs);

        await Verify.text(this.page, 'Verify Missing Salutation Error Title', errorData.missingSalutationTitle, this.locator.errorToastTitle, { exact: true });

        await Verify.text(this.page, 'Verify Missing Salutation Error Subtext', errorData.missingSalutationSubtext, this.locator.errorToastSubtext, { exact: true });

        await StepHelper.step(this.page, 'Click Cancel Button to Reset Form', async () => { await this.keywords.click(this.locator.cancelBtn); });

    await StepHelper.addSteps(

    2,

    'End',

    'Leave salutation field empty and verify error message when trying to save the form'

);

    }

    async validateMissingName(patientData, errorData) {

        await StepHelper.addSteps(

    3,

    'start',

    'Leave name field empty and fill in Salutation, mobile and referral by fields and verify error message when trying to save the form'

);



        await this.openAddPatientForm();

        await this.selectSalutation(patientData.title);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.enterReferralBy(patientData.referralBy);

        await this.clickSave();

        await Verify.state(this.page, 'Verify Inline Error Appears For Name', this.locator.inlineFieldError, { visible: true, soft: false });

        await Verify.text(this.page, 'Verify Missing Name Inline Error Text', errorData.invalidNameSubtext, this.locator.inlineFieldError);

        await StepHelper.step(this.page, 'Click Cancel Button to Reset Form', async () => { await this.keywords.click(this.locator.cancelBtn); });

    await StepHelper.addSteps(

    3,

    'End',

    'Leave name field empty and fill in Salutation, mobile and referral by fields and verify error message when trying to save the form'

);

    }

    async validateMissingMobile(patientName, patientData) {

        await StepHelper.addSteps(

    4,

    'Start',

    'Leave mobile number field empty and fill in Salutation, name and referral by fields and verify error message when trying to save the form'

);

        await this.openAddPatientForm();

        await this.selectSalutation(patientData.title);

        await this.enterPatientName(patientName);

        await this.enterReferralBy(patientData.referralBy);

        // Click the Save button (which Playwright sees as enabled)

        await this.clickSave();

        // Wait a brief moment to ensure the app processes the click

        await this.keywords.wait(this.page, longWaitMs);

        // Verify the application blocked the save by checking if the panel is STILL open

        await Verify.state(

            this.page,

            'Verify Form Remains Open When Mobile is Missing (Save Blocked)',

            this.locator.panelTitle,

            { visible: true, soft: false }

        );

        await StepHelper.step(

            this.page, 

            'Click Cancel Button to Reset Form', 

            async () => { 

                await this.keywords.click(this.locator.cancelBtn); 

            }

        );

        await StepHelper.addSteps(

    4,

    'End',

    'Leave mobile number field empty and fill in Salutation, name and referral by fields and verify error message when trying to save the form'

);

    }

    async validateMissingReferral(patientName, patientData, errorData) {

        await StepHelper.addSteps(

    5,

    'Start',

    'Leave referral number field empty and fill in Salutation, name and mobile fields and verify error message when trying to save the form'

);

        await this.openAddPatientForm();

        await this.selectSalutation(patientData.title);

        await this.enterPatientName(patientName);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.clickSave();

        await this.keywords.waitForElement(this.locator.errorToastTitle, toastWaitTimeoutMs);

        await Verify.text(this.page, 'Verify Missing Referral Error Title', errorData.missingReferralTitle, this.locator.errorToastTitle, { exact: true });

        await Verify.text(this.page, 'Verify Missing Referral Error Subtext', errorData.missingReferralSubtext, this.locator.errorToastSubtext, { exact: true });

        await StepHelper.step(this.page, 'Click Cancel Button to Reset Form', async () => { await this.keywords.click(this.locator.cancelBtn); });

    await StepHelper.addSteps(

    5,

    'End',

    'Leave mobile number field empty and fill in Salutation, name and mobile fields and verify error message when trying to save the form'

);

    }

    async validateInvalidEmailFormat(patientName, patientData, invalidEmail) {

        await StepHelper.addSteps(

    6,

    'Start',

    'Enter invalid values/characters in the email field and verify error toast message'

);

        await this.openAddPatientForm();

        await this.enterPatientName(patientName);

        await this.selectSalutation(patientData.title);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.enterReferralBy(patientData.referralBy);

        await this.enterEmail(invalidEmail);

        await StepHelper.step(

            this.page,

            'Click Panel Title to Trigger Email Validation',

            async () => {

                await this.locator.panelTitle.click();

            }

        );

        await this.clickSave();

        await this.keywords.wait(this.page, mediumWaitMs);

       await Verify.state(

            this.page,

            'Verify Save Button is Disabled on Invalid Email Format',

            this.locator.saveBtn,

            { visible: true, enabled: false, soft: false }

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

         await StepHelper.addSteps(

    6,

    'End',

    'Enter invalid values/characters in the email field and verify error toast message'

);

    }

    async validateInvalidNameFormat(referralBy, errorData) {

        await StepHelper.step(

            this.page,

            'Clear Patient Name Field',

            async () => {

                await this.locator.patientNameTxt.fill('');

            }

        );

        await this.enterReferralBy(referralBy);

        await this.clickSave();

        await this.keywords.waitForElement(

            this.locator.errorToastTitle,

            toastWaitTimeoutMs

        );

        await Verify.text(

            this.page,

            'Verify Invalid Name Error Title',

            errorData.invalidNameTitle,

            this.locator.errorToastTitle,

            { exact: true }

        );

        await Verify.text(

            this.page,

            'Verify Invalid Name Error Subtext',

            errorData.invalidNameSubtext,

            this.locator.errorToastSubtext,

            { exact: true }

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

    }

    async validateSpecialCharactersInName(invalidName, errorData) {

        await this.openAddPatientForm();

        await StepHelper.step(

            this.page,

            `Enter Special Characters in Name - ${invalidName}`,

            async () => {

                await this.keywords.fill(this.locator.patientNameTxt, invalidName);

            }

        );

        await this.clickSave();

        await this.keywords.waitForElement(

            this.locator.errorToastTitle,

            toastWaitTimeoutMs

        );

        await Verify.text(

            this.page,

            'Verify Special Chars Name Error Title',

            errorData.invalidNameTitle,

            this.locator.errorToastTitle,

            { exact: true }

        );

        await Verify.text(

            this.page,

            'Verify Special Chars Name Error Subtext',

            errorData.invalidNameSubtext,

            this.locator.errorToastSubtext,

            { exact: true }

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

    }

    async validateNumericOnlyMobile(invalidMobile, expectedSanitized) {

        await this.openAddPatientForm();

        await StepHelper.step(

            this.page,

            `Attempt to type invalid mobile: ${invalidMobile}`,

            async () => {

                await this.locator.mobileNumberTxt.focus();

                await this.locator.mobileNumberTxt.pressSequentially(invalidMobile, { delay: fastTypingDelayMs });

            }

        );

        await Verify.inputValue(

            this.page,

            'Verify Mobile Field Stripped Invalid Characters',

            expectedSanitized,

            this.locator.mobileNumberTxt

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

    }

    async validateNumericOnlyAge(invalidAge, expectedSanitized) {

         await StepHelper.addSteps(

    7,

    'Start',

    'Attempt to type invalid age and verify that only numeric characters are accepted'

);

        await this.openAddPatientForm();

        await StepHelper.step(

            this.page,

            `Attempt to type invalid age: ${invalidAge}`,

            async () => {

                await this.locator.ageTxt.focus();

                await this.locator.ageTxt.pressSequentially(invalidAge, { delay: fastTypingDelayMs });

            }

        );

        await Verify.inputValue(

            this.page,

            'Verify Age Field Stripped Negative Sign',

            expectedSanitized,

            this.locator.ageTxt

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

          await StepHelper.addSteps(

    7,

    'End',

    'Attempt to type invalid age and verify that only numeric characters are accepted'

);

    }

    async validateFutureDateSelectionResetsToToday(futureTestDay) {

          await StepHelper.addSteps(

    8,

    'Start',

    'Attempt to select a future date of birth and verify that the field resets to today\'s date'

);

        await this.openAddPatientForm();

        const today = new Date();

        const futureYear = today.getFullYear() + 1; 

        const expectedTodayText = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        await StepHelper.step(this.page, 'Click Date Of Birth Field', async () => {

            await this.keywords.click(this.locator.dobComponent);

        });

        await StepHelper.step(this.page, 'Open Month/Year Selector', async () => {

            await this.keywords.click(this.locator.calendarHeaderTitle);

        });

        await StepHelper.step(this.page, `Select Future Year - ${futureYear}`, async () => {

            await this.keywords.click(this.locator.getYearButton(futureYear.toString()));

        });

        await StepHelper.step(this.page, 'Save Month/Year Selection', async () => {

            await this.keywords.click(this.locator.saveDateBtn);

        });

        await StepHelper.step(this.page, `Select Day - ${futureTestDay} in Future Year`, async () => {

            await this.keywords.click(this.locator.getDayLocator(futureTestDay).first());

        });

        await Verify.text(

            this.page,

            'Verify Future Date is Blocked and Resets to Today',

            expectedTodayText,

            this.locator.dobDisplayText,

            { exact: true }

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

        await StepHelper.addSteps(

    8,

    'End',

    'Attempt to select a future date of birth and verify that the field resets to today\'s date'

);

    }

    async validateExcessiveLength(fieldType, oversizedValue, validData, errorData, fallbackName) { 

        await this.openAddPatientForm();

        const nameToEnter = fieldType === 'Name' ? oversizedValue : fallbackName;

        const mobileToEnter = fieldType === 'Mobile' ? oversizedValue : validData.mobileNumber;

        await this.enterPatientName(nameToEnter);

        await this.selectSalutation(validData.title); 

        await this.enterMobileNumber(mobileToEnter);

        await this.enterReferralBy(validData.referralBy);

        if (fieldType === 'Address') {

            await this.enterAddress(oversizedValue);

        }

        await this.clickSave();

        await this.keywords.waitForElement(

            this.locator.errorToastTitle,

            toastWaitTimeoutMs

        );

        await Verify.text(

            this.page,

            `Verify Excessive ${fieldType} Error Title`,

            errorData.excessiveLengthTitle,

            this.locator.errorToastTitle,

            { exact: true }

        );

        await Verify.text(

            this.page,

            `Verify Excessive ${fieldType} Error Subtext`,

            errorData.excessiveLengthSubtext,

            this.locator.errorToastSubtext

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

    }

    async validateDuplicatePatient(patientName, patientData, dobData, errorData) {

        await this.createPatientFast(patientName, patientData, dobData);

        await this.openAddPatientForm();

        await this.enterPatientName(patientName);

        await this.selectSalutation(patientData.title);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.enterReferralBy(patientData.referralBy);

        await this.enterEmail(patientData.email);

        await this.clickSave();

        await this.keywords.waitForElement(

            this.locator.errorToastTitle,

            toastWaitTimeoutMs

        );

        await Verify.text(

            this.page,

            'Verify Duplicate Patient Error Title',

            errorData.duplicatePatientTitle,

            this.locator.errorToastTitle,

            { exact: true }

        );

        await Verify.text(

            this.page,

            'Verify Duplicate Patient Error Subtext',

            errorData.duplicatePatientSubtext,

            this.locator.errorToastSubtext

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

    }

    async validateDuplicateWarning(patientName, patientData, dobData, errorData) {

          await StepHelper.addSteps(

    10,

    'Start',

    'Create a patient and then attempt to create another patient with the same name and mobile number to trigger a duplicate warning'

);

        await this.createPatientFast(patientName, patientData, dobData);

        await this.keywords.wait(this.page, longWaitMs);

        await this.openAddPatientForm();

        await this.enterPatientName(patientName);

        await this.selectSalutation(patientData.title);

        await this.enterMobileNumber(patientData.mobileNumber);

        await this.keywords.waitForElement(

            this.locator.duplicateWarningBox,

            toastWaitTimeoutMs

        );

        await Verify.text(

            this.page,

            'Verify Duplicate Warning Title',

            errorData.duplicateWarningTitle,

            this.locator.duplicateWarningTitle,

            { exact: true }

        );

        await Verify.text(

            this.page,

            'Verify Duplicate Warning Message',

            errorData.duplicateWarningMessage,

            this.locator.duplicateWarningMessage,

            { exact: true }

        );

        await StepHelper.step(

            this.page,

            'Click Cancel Button to Reset Form',

            async () => {

                await this.keywords.click(this.locator.cancelBtn);

            }

        );

          await StepHelper.addSteps(

    10,

    'Start',

    'Create a patient and then attempt to create another patient with the same name and mobile number to trigger a duplicate warning'

);

    }

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

            toastWaitTimeoutMs

        );

    }

}