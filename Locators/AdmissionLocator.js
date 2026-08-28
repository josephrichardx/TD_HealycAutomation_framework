class AdmissionLocator {

    constructor(page) {
        this.page = page;

        this.addNewBtn = page.getByRole('button', { name: 'Add New' });
        this.addAdmissionBtn = page.getByRole('button', { name: 'Add Admission' });

        this.patientSearchTxt = page.getByRole('textbox', {
            name: 'Search with patient name or'
        });

        this.admittingDiagnosisTxt = page.locator('input[formcontrolname="admittingDiagnosis"]');
        this.treatmentDoctorTxt = page.locator('#customInput');
        this.defaultDoctorOption = page.locator('div.singleOption').filter({ hasText: 'Default Doctor' }).first();

        this.addTestBtn = page.getByRole('button', { name: 'Add Test' });
        this.addConsumableBtn = page.getByRole('button', { name: 'Add Consumable' });

        this.testChips = page.locator('label.test-chip');
        this.linkTestBtn = page.getByRole('button', { name: 'Link Test with IPD' });
        this.linkConsumablesBtn = page.getByRole('button', { name: 'Link Consumables with IPD' });


         this.addSurgeryBtn = page.getByRole('button', { name: ' Add Surgery' });

        this.surgeryNameInput = page.locator(
    "(//h3[text()='Surgery details']//following::input[@id='customInput'])[1]"
);

this.doctorInput = page.locator(
    "(//h3[text()='Surgery details']//following::input[@id='customInput'])[2]"
);

this.otDropdown = page.locator(
    "(//button[@class='dropdown-button'])[5]"
);

this.linkSurgeryBtn = page.locator(
    "//button[text()='Link surgery with IPD']"
);

this.surgeryOption = (surgeryName) =>
    page.locator(`//div[text()=' ${surgeryName} ']`);

this.doctorOption = (doctorName) =>
    page.locator(`(//div[text()=' ${doctorName} '])[2]`);

this.otOption = (otName) =>
    page.locator(`//span[text()='${otName}']`);








    }

    

    getPatient(patientName) {
        return this.page.locator(`//div[@title="${patientName}"]`);
    }

    get locationDropdownBtn() {
        return this.page.locator('app-customdropdown[buttontitle="Location"] button.dropdown-button');
    }

    get locationDropdownList() {
        return this.page.locator('app-customdropdown[buttontitle="Location"] div.dropdown-list');
    }

    getLocationOption(locationName) {
        return this.locationDropdownList
            .locator('div.dropdown-item')
            .filter({ hasText: locationName });
    }

    get admissionDateComponent() {
        return this.page.locator('app-customcalendarinput:visible').first();
    }

    get admissionDateTitle() {
        return this.admissionDateComponent.locator('.date-title');
    }

    get calendarHeader() {
        return this.admissionDateComponent.locator('.calendar-header');
    }

    get calendarHeaderTitle() {
        return this.calendarHeader.locator('h3').first();
    }

    getMonthButton(monthName) {
        return this.page.getByRole('button', { name: monthName, exact: true });
    }

    getYearButton(year) {
        return this.page.getByRole('button', { name: year, exact: true });
    }

    get saveDateBtn() {
        return this.admissionDateComponent.locator('button').filter({ hasText: /^Save$/ });
    }

    // getDayLocator(day) {
    //     return this.page.locator('div.calendar-day')
    //         .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
    // }

    getDayLocator(day) {
    return this.page
        .locator('div.calendar-day:not(.greyed-out-day)')
        .filter({
            hasText: new RegExp(`^\\s*${day}\\s*$`)
        });
    }

    get admissionTimeComponent() {
        return this.page.locator('app-custom-timepicker[inputtitle="Admission time"]');
    }

    get admissionTimeTrigger() {
        return this.admissionTimeComponent.locator('.input-box');
    }

    get admissionTimePopup() {
        return this.admissionTimeComponent.locator('.picker-popup');
    }

    get admissionTimeColumns() {
        return this.admissionTimePopup.locator('.picker-columns > .column');
    }

    getTimeColumn(columnIndex) {
        return this.admissionTimeColumns.nth(columnIndex);
    }

    getTimeOption(column, value) {
        return column.locator('div.scroll-option')
            .filter({ hasText: new RegExp(`^\\s*${value}\\s*$`) });
    }

    get admissionTimeSetBtn() {
        return this.admissionTimePopup.locator('button.set-btn');
    }

    get roomCategoryDropdownBtn() {
        return this.page.locator('app-customdropdown[buttontitle="Room Categories"] button.dropdown-button');
    }

    get roomCategoryDropdownList() {
        return this.page.locator('app-customdropdown[buttontitle="Room Categories"] div.dropdown-list');
    }

    get roomCategoryOptions() {
        return this.roomCategoryDropdownList.locator('div.dropdown-item span.status-text');
    }

    get step2Container() {
        return this.page.locator('app-admission-details');
    }
    get emergencyContactTxt() {
        return this.page.locator('app-admission-details input[formcontrolname="emergencyContact1Name"]');
    }
    get emergencyPhoneTxt() {
        return this.page.locator('app-admission-details input[placeholder="Enter phone number"]');
    }
    get referringPhysicianTxt() {
        return this.page.locator('app-admission-details input[formcontrolname="emergencyContact2Name"]');
    }
    get step2ContinueBtn() {
        return this.page.locator('app-admission-details button.btn-2:has-text("Continue")');
    }

    get step3Container() {
        return this.page.locator('app-insurance');
    }
    get insuranceCompanyNameTxt() {
        return this.page.locator('app-insurance input[formcontrolname="companyName"]');
    }
    get policyNumberTxt() {
        return this.page.locator('app-insurance input[formcontrolname="policyNumber"]');
    }
    get policyTypeTxt() {
        return this.page.locator('app-insurance input[formcontrolname="policyType"]');
    }
    get step3ContinueBtn() {
        return this.page.locator('app-insurance button.btn-2:has-text("Continue")');
    }

    get roomNumberDropdownBtn() {
        return this.page.locator('label')
            .filter({ hasText: 'Room Number' })
            .locator('..')
            .locator('button.dropdown-button');
    }

    get roomNumberDropdownList() {
        return this.page.locator('label')
            .filter({ hasText: 'Room Number' })
            .locator('..')
            .locator('div.dropdown-list');
    }

    get roomNumberOptions() {
        return this.roomNumberDropdownList.locator('div.dropdown-item span.status-text');
    }

    get bedNumberDropdownBtn() {
        return this.page.locator('label')
            .filter({ hasText: 'Bed Number' })
            .locator('..')
            .locator('button.dropdown-button');
    }

    get bedNumberDropdownList() {
        return this.page.locator('label')
            .filter({ hasText: 'Bed Number' })
            .locator('..')
            .locator('div.dropdown-list');
    }

    get bedNumberOptions() {
        return this.bedNumberDropdownList.locator('div.dropdown-item span.status-text');
    }

    getSummaryValueByLabel(labelText) {
        return this.page.locator('div.info-row')
            .filter({
                has: this.page.locator('div.label').filter({
                    hasText: new RegExp(`^\\s*${labelText}\\s*$`)
                })
            })
            .locator('div.value');
    }

    get step4ContinueBtn() {
        return this.page.getByRole('button', { name: 'Continue' });
    }

}

module.exports = { AdmissionLocator };