import { expect } from '@playwright/test';
import { StepHelper } from '../utils/StepHelper.js';
import { Verify } from '../utils/verification.js';
import { AdmissionLocator } from '../Locators/AdmissionLocator.js';
import { Keywords } from '../utils/Keywords.js';

export class AdmissionPage {

    constructor(page) {
        this.page = page;
        this.locator = new AdmissionLocator(page);
        this.keywords = new Keywords();
    }

    async clickAddNew() {

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
    }

    async clickAddAdmission() {

        await Verify.state(
            this.page,
            'Add Admission Option',
            this.locator.addAdmissionBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Add Admission Button',
            async () => {
                await this.keywords.click(this.locator.addAdmissionBtn);
            }
        );

        await Verify.state(
            this.page,
            'Patient Search Box',
            this.locator.patientSearchTxt,
            { visible: true, soft: false }
        );
    }

    // async searchPatient(patientName) {

    //     await StepHelper.step(
    //         this.page,
    //         `Search Patient - ${patientName}`,
    //         async () => {
    //             await this.keywords.fill(this.locator.patientSearchTxt, patientName);
    //         }
    //     );


    //     await this.keywords.wait(this.page, 1000);

    //     const patient = this.locator.getPatient(patientName);

    //     await this.keywords.waitForElement(patient);

    //     await Verify.state(
    //         this.page,
    //         `Patient Result - ${patientName}`,
    //         patient,
    //         { visible: true, soft: false }
    //     );

    //     await StepHelper.step(
    //         this.page,
    //         `Select Patient - ${patientName}`,
    //         async () => {
    //             await this.keywords.click(patient);
    //         }
    //     );
    // }

    async searchPatient(patientName) {
    await StepHelper.step(
        this.page,
        `Search Patient - ${patientName}`,
        async () => {
            await this.keywords.fill(
                this.locator.patientSearchTxt,
                patientName
            );
        }
    );

    await this.keywords.wait(this.page, 1000);

    const patient = this.locator.getPatient(patientName);

    await this.keywords.waitForElement(patient);

    await Verify.state(
        this.page,
        `Patient Result - ${patientName}`,
        patient,
        { visible: true, soft: false }
    );

    await StepHelper.step(
        this.page,
        `Select Patient - ${patientName}`,
        async () => {
            await this.keywords.click(patient);
        }
    );
}

    async openLocationDropdown() {

        await Verify.state(
            this.page,
            'Location Dropdown',
            this.locator.locationDropdownBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Location Dropdown',
            async () => {
                await this.keywords.click(this.locator.locationDropdownBtn);
            }
        );

        await Verify.state(
            this.page,
            'Location Dropdown List',
            this.locator.locationDropdownList,
            { visible: true, soft: false }
        );
    }

    async selectLocation(locationName) {

        const locationOption = this.locator.getLocationOption(locationName);

        await Verify.state(
            this.page,
            `Location Option - ${locationName}`,
            locationOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Location - ${locationName}`,
            async () => {
                await this.keywords.click(locationOption);
            }
        );

        await Verify.state(
            this.page,
            'Location Dropdown List Closed After Selection',
            this.locator.locationDropdownList,
            { hidden: true }
        );

        const buttonText = (await this.locator.locationDropdownBtn.innerText()).trim();

        await Verify.record(
            this.page,
            'Location Dropdown Button Text After Selection',
            buttonText
        );

        expect(buttonText).not.toBe('Select Value');
    }

    async selectAdmissionDate(admissionDate) {

        const monthName = admissionDate.toLocaleString('en-US', { month: 'long' });
        const year = String(admissionDate.getFullYear());
        const day = String(admissionDate.getDate());
        const monthNumber = String(admissionDate.getMonth() + 1).padStart(2, '0');
        const expectedDate = `${day.padStart(2, '0')}/${monthNumber}/${year}`;

        await StepHelper.step(
            this.page,
            'Click Admission Date Field',
            async () => {
                await this.locator.admissionDateTitle.click();
            }
        );

        await Verify.state(
            this.page,
            'Admission Date Calendar',
            this.locator.calendarHeader,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Month/Year Selector',
            async () => {
                await this.locator.calendarHeaderTitle.click();
            }
        );

        await StepHelper.step(
            this.page,
            `Select Month - ${monthName}`,
            async () => {
                await this.locator.getMonthButton(monthName).click();
            }
        );

        await StepHelper.step(
            this.page,
            `Select Year - ${year}`,
            async () => {
                await this.locator.getYearButton(year).click();
            }
        );

        await StepHelper.step(
            this.page,
            'Save Month/Year Selection',
            async () => {
                await this.locator.saveDateBtn.click();
            }
        );

        const dayLocator = this.locator.getDayLocator(day);

        await Verify.state(
            this.page,
            `Day ${day} In Calendar`,
            dayLocator.first(),
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Admission Date Day - ${day}`,
            async () => {
                await dayLocator.first().click();
            }
        );

        await Verify.text(
            this.page,
            'Admission Date Field Displays Selected Date',
            expectedDate,
            this.locator.admissionDateTitle
        );

        await Verify.state(
            this.page,
            'Admission Date Calendar Closed After Selection',
            this.locator.calendarHeader,
            { hidden: true }
        );

        return expectedDate;
    }

    async selectAdmissionTime(admissionTime) {

        const { hour, minute, period } = admissionTime;
        const expectedTime = `${hour}:${minute} ${period}`;

        const hourColumn = this.locator.getTimeColumn(0);
        const minuteColumn = this.locator.getTimeColumn(1);
        const periodColumn = this.locator.getTimeColumn(2);

        const selectScrollOption = async (column, value, label) => {

            const option = this.locator.getTimeOption(column, value);

            await this.keywords.scrollIntoViewIfNeeded(option);

            await Verify.state(
                this.page,
                `${label} Option - ${value}`,
                option,
                { visible: true, soft: false }
            );

            await StepHelper.step(
                this.page,
                `Select ${label} - ${value}`,
                async () => {
                    await this.keywords.click(option);
                }
            );
        };

        await StepHelper.step(
            this.page,
            'Click Admission Time Field',
            async () => {
                await this.keywords.click(this.locator.admissionTimeTrigger);
            }
        );

        await Verify.state(
            this.page,
            'Admission Time Picker',
            this.locator.admissionTimePopup,
            { visible: true, soft: false }
        );

        await selectScrollOption(hourColumn, hour, 'Hour');
        await selectScrollOption(minuteColumn, minute, 'Minute');
        await selectScrollOption(periodColumn, period, 'Period');

        await StepHelper.step(
            this.page,
            'Click Set Button',
            async () => {
                await this.keywords.click(this.locator.admissionTimeSetBtn);
            }
        );

        await Verify.text(
            this.page,
            'Admission Time Field Displays Selected Time',
            expectedTime,
            this.locator.admissionTimeTrigger
        );

        await Verify.state(
            this.page,
            'Admission Time Picker Closed After Set',
            this.locator.admissionTimePopup,
            { hidden: true }
        );

        return expectedTime;
    }

    async _selectRandomDropdownOption({ label, dropdownBtn, dropdownList, options }) {

        await Verify.state(
            this.page,
            `${label} Dropdown`,
            dropdownBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click ${label} Dropdown`,
            async () => {
                await dropdownBtn.click();
            }
        );

        await Verify.state(
            this.page,
            `${label} List`,
            dropdownList,
            { visible: true, soft: false }
        );

        const count = await options.count();

        await Verify.greaterThan(
            this.page,
            `${label} Options Available`,
            0,
            count
        );

        const randomIndex = Math.floor(Math.random() * count);
        const selectedOption = options.nth(randomIndex);
        const selectedValue = (await selectedOption.innerText()).trim();

        await StepHelper.step(
            this.page,
            `Select Random ${label} - ${selectedValue}`,
            async () => {
                await selectedOption.click();
            }
        );

        await Verify.state(
            this.page,
            `${label} List Closed After Selection`,
            dropdownList,
            { hidden: true }
        );

        await Verify.text(
            this.page,
            `${label} Dropdown Displays Selected Value`,
            selectedValue,
            dropdownBtn
        );

        return selectedValue;
    }

    async selectRandomRoomCategory() {
        return await this._selectRandomDropdownOption({
            label: 'Room Category',
            dropdownBtn: this.locator.roomCategoryDropdownBtn,
            dropdownList: this.locator.roomCategoryDropdownList,
            options: this.locator.roomCategoryOptions
        });
    }

    async selectRandomRoomNumber() {
        return await this._selectRandomDropdownOption({
            label: 'Room Number',
            dropdownBtn: this.locator.roomNumberDropdownBtn,
            dropdownList: this.locator.roomNumberDropdownList,
            options: this.locator.roomNumberOptions
        });
    }

    async selectRandomBedNumber() {
        return await this._selectRandomDropdownOption({
            label: 'Bed Number',
            dropdownBtn: this.locator.bedNumberDropdownBtn,
            dropdownList: this.locator.bedNumberDropdownList,
            options: this.locator.bedNumberOptions
        });
    }

    async fillDiagnosisAndDoctor(diagnosisText, doctorName = 'Default Doctor') {

        await Verify.state(
            this.page,
            'Admitting Diagnosis Field',
            this.locator.admittingDiagnosisTxt,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Enter Admitting Diagnosis - ${diagnosisText}`,
            async () => {
                await this.locator.admittingDiagnosisTxt.fill(diagnosisText);
            }
        );

        await Verify.inputValue(
            this.page,
            'Admitting Diagnosis Field Value',
            diagnosisText,
            this.locator.admittingDiagnosisTxt
        );

        await Verify.state(
            this.page,
            'Treatment Doctor Field',
            this.locator.treatmentDoctorTxt,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Treatment Doctor Options',
            async () => {
                await this.locator.treatmentDoctorTxt.click();
            }
        );

        const doctorOption = this.page.locator('div.singleOption')
            .filter({ hasText: new RegExp(`^\\s*${doctorName}\\s*$`) });

        await Verify.state(
            this.page,
            `Treatment Doctor Option - ${doctorName}`,
            doctorOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select Doctor - ${doctorName}`,
            async () => {
                await doctorOption.click();
            }
        );

        const doctorFieldValue = (await this.locator.treatmentDoctorTxt.inputValue()).trim();

        await Verify.contains(
            this.page,
            'Treatment Doctor Field Displays Selected Doctor',
            doctorName,
            doctorFieldValue
        );
    }

    async _selectRandomChipsAndLink({ label, addBtn, linkBtn, maxCount }) {

        await Verify.state(
            this.page,
            `Add ${label} Button`,
            addBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click Add ${label} Button`,
            async () => {
                await addBtn.click();
            }
        );

        await this.keywords.waitForElement(this.locator.testChips.first(), 10000);

        await Verify.state(
            this.page,
            `${label} Options Modal`,
            this.locator.testChips.first(),
            { visible: true, soft: false }
        );

        const totalOptions = await this.locator.testChips.count();

        await Verify.greaterThan(
            this.page,
            `${label} Options Available`,
            0,
            totalOptions
        );

        const limit = Math.min(maxCount, totalOptions);
        const countToSelect = Math.floor(Math.random() * limit) + 1;

        const selectedIndices = new Set();

        while (selectedIndices.size < countToSelect) {
            selectedIndices.add(Math.floor(Math.random() * totalOptions));
        }

        const selectedLabels = [];

        for (const index of selectedIndices) {

            const chip = this.locator.testChips.nth(index);
            const chipLabel = (await chip.innerText()).trim();

            selectedLabels.push(chipLabel);

            await StepHelper.step(
                this.page,
                `Select ${label} Chip - ${chipLabel}`,
                async () => {
                    await chip.click();
                }
            );

            await Verify.state(
                this.page,
                `${label} Chip Checked - ${chipLabel}`,
                chip.locator('input[type="checkbox"]'),
                { checked: true }
            );
        }

        await Verify.record(
            this.page,
            `${label} Chips Selected`,
            selectedLabels.join(' | ')
        );

        await Verify.state(
            this.page,
            `Link ${label} With IPD Button`,
            linkBtn,
            { enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click Link ${label} With IPD`,
            async () => {
                await linkBtn.click();
            }
        );

        await Verify.state(
            this.page,
            `Link ${label} With IPD Button Hidden After Linking`,
            linkBtn,
            { hidden: true }
        );

        return selectedLabels;
    }

    async addSurgery(surgeryData) {
        
    await this.locator.addSurgeryBtn.click();

    await this.locator.surgeryNameInput.click();
    await this.locator.surgeryOption(surgeryData.surgeryName).click();

    await this.locator.doctorInput.click();
    await this.locator.doctorOption(surgeryData.doctorName).click();

    await this.locator.otDropdown.click();
    await this.locator.otOption(surgeryData.otName).click();

    await this.locator.linkSurgeryBtn.click();
    
}

    async addTests(maxCount = 3) {
        return await this._selectRandomChipsAndLink({
            label: 'Test',
            addBtn: this.locator.addTestBtn,
            linkBtn: this.locator.linkTestBtn,
            maxCount
        });
    }

    async addConsumables(maxCount = 3) {
        return await this._selectRandomChipsAndLink({
            label: 'Consumable',
            addBtn: this.locator.addConsumableBtn,
            linkBtn: this.locator.linkConsumablesBtn,
            maxCount
        });
    }

    async fillEmergencyDetailsAndContinue(
        contactName = 'emergency',
        phoneNumber = '1234567890',
        physicianName = 'physician'
    ) {

        await this.page.waitForLoadState('domcontentloaded');

        const contactInput = this.locator.emergencyContactTxt;

        await Verify.state(
            this.page,
            'Emergency Contact Field',
            contactInput,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Enter Emergency Details',
            async () => {
                await contactInput.fill(contactName);
                await this.locator.emergencyPhoneTxt.fill(phoneNumber);
                await this.locator.referringPhysicianTxt.fill(physicianName);
            }
        );

        await Verify.inputValue(
            this.page,
            'Emergency Contact Field Value',
            contactName,
            contactInput
        );

        await Verify.inputValue(
            this.page,
            'Emergency Phone Field Value',
            phoneNumber,
            this.locator.emergencyPhoneTxt
        );

        await Verify.inputValue(
            this.page,
            'Referring Physician Field Value',
            physicianName,
            this.locator.referringPhysicianTxt
        );

        const btn = this.locator.step2ContinueBtn;

        await Verify.state(
            this.page,
            'Step 2 Continue Button',
            btn,
            { enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Step 2 Continue Button',
            async () => {
                await btn.click();
            }
        );
    }

    async fillInsuranceDetailsAndContinue(
        companyName = 'insurance',
        policyNumber = '12345',
        policyType = 'policy'
    ) {

        await this.page.waitForLoadState('domcontentloaded');

        const companyInput = this.locator.insuranceCompanyNameTxt;

        await Verify.state(
            this.page,
            'Insurance Company Name Field',
            companyInput,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Enter Insurance Details',
            async () => {
                await companyInput.fill(companyName);
                await this.locator.policyNumberTxt.fill(policyNumber);
                await this.locator.policyTypeTxt.fill(policyType);
            }
        );

        await Verify.inputValue(
            this.page,
            'Insurance Company Name Field Value',
            companyName,
            companyInput
        );

        await Verify.inputValue(
            this.page,
            'Policy Number Field Value',
            policyNumber,
            this.locator.policyNumberTxt
        );

        await Verify.inputValue(
            this.page,
            'Policy Type Field Value',
            policyType,
            this.locator.policyTypeTxt
        );

        const btn = this.locator.step3ContinueBtn;

        await Verify.state(
            this.page,
            'Step 3 Continue Button',
            btn,
            { enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Step 3 Continue Button',
            async () => {
                await btn.click();
            }
        );
    }

    async verifyAdmissionSummaryAndContinue(admissionDate, admissionTime) {

        await this.page.waitForLoadState('domcontentloaded');

        const expectedDateText = admissionDate.toLocaleDateString(
            'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' }
        );

        const expectedTimeText = `${admissionTime.hour}:${admissionTime.minute} ${admissionTime.period}`;

        const dateValue = this.locator.getSummaryValueByLabel('Admission Date');
        const timeValue = this.locator.getSummaryValueByLabel('Appointment Start Time');

        await dateValue.waitFor({
            state: 'visible',
            timeout: 30000
        });


        await Verify.state(
            this.page,
            'Admission Date Summary Value',
            dateValue,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Admission Date Summary',
            expectedDateText,
            dateValue,
            { exact: true }
        );

        await Verify.state(
            this.page,
            'Appointment Start Time Summary Value',
            timeValue,
            { visible: true, soft: false }
        );

        const actualTimeText = (await timeValue.innerText()).trim();

        await Verify.record(
            this.page,
            'Selected Time vs Displayed Appointment Start Time',
            `Selected: ${expectedTimeText} | Displayed: ${actualTimeText}`
        );

        const btn = this.locator.step4ContinueBtn;

        await Verify.state(
            this.page,
            'Step 4 Continue Button',
            btn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Continue On Step 4',
            async () => {
                await this.keywords.click(btn);
            }
        );
    }
}