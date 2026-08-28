const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Verify } = require('../utils/verification');
const { ConsultLocator } = require('../Locators/ConsultLocator');
const { Keywords } = require('../utils/Keywords');
const { generateAdmissionDate } = require('../utils/RandomData');

class ConsultPage {

    constructor(page) {
        this.page = page;
        this.locator = new ConsultLocator(page);
        this.keywords = new Keywords();
    }


    async clickAddConsult() {

        await StepHelper.step(
            this.page,
            'Click Add New Button',
            async () => {
                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Consult Button',
            async () => {
                await this.keywords.click(
                    this.locator.addConsultBtn
                );
            }
        );
    }


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

        const patient = this.page.locator(
            `//div[@title="${patientName}"]`
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


    async searchExistingPatient(patientName) {

        await this.keywords.waitForElement(
            this.locator.patientSearchTxt
        );

        await StepHelper.step(
            this.page,
            `Search Existing Patient - ${patientName}`,
            async () => {
                await this.keywords.fill(
                    this.locator.patientSearchTxt,
                    patientName
                );
            }
        );

        await this.keywords.wait(
            this.page,
            1000
        );

        await this.keywords.waitForElement(
            this.locator.existingPatient
        );

        await StepHelper.step(
            this.page,
            `Select Existing Patient - ${patientName}`,
            async () => {
                await this.keywords.click(
                    this.locator.existingPatient
                );
            }
        );
    }


    async selectProvider() {

        await StepHelper.step(
            this.page,
            'Open Provider Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );
    }


    async selectConsultSlot(
        consultSlot,
        bookingDate
    ) {

        await StepHelper.step(
            this.page,
            `Enter Consult Service - ${consultSlot}`,
            async () => {

                await this.keywords.click(
                    this.locator.consultInput
                );

                await this.keywords.fill(
                    this.locator.consultInput,
                    consultSlot
                );
            }
        );

        const serviceOption = this.page.locator(
            `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
        );

        await serviceOption.waitFor({
            state: 'visible',
            timeout: 1000
        });

        await StepHelper.step(
            this.page,
            `Select Consult Service - ${consultSlot}`,
            async () => {
                await this.keywords.click(
                    serviceOption
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Close Provider Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.providerDropdown
                );
            }
        );

        // await StepHelper.step(
        //     this.page,
        //     'Open Booking Date',
        //     async () => {
        //         await this.keywords.click(
        //             this.locator.bookingDateContainer
        //         );
        //     }
        // );

        // await StepHelper.step(
        //     this.page,
        //     `Select Booking Date - ${bookingDate}`,
        //     async () => {

        //         await this.keywords.click(
        //             this.locator.currentMonth.getByText(
        //                 bookingDate,
        //                 {
        //                     exact: true
        //                 }
        //             )
        //         );
        //     }
        // );

        // await StepHelper.step(
        //     this.page,
        //     'Apply Booking Date',
        //     async () => {
        //         await this.keywords.click(
        //             this.locator.applyBtn
        //         );
        //     }
        // );

        // await StepHelper.step(
        //     this.page,
        //     'Select First Available Slot',
        //     async () => {
        //         await this.keywords.click(
        //             this.locator.slotButton.first()
        //         );
        //     }
        // );
    }


async selectFirstAvailableSlot() {
    await StepHelper.step(
        this.page,
        'Select First Available Slot',
        async () => {
            while (true) {
                const slotCount = await this.locator.slotButton.count();

                if (slotCount > 0) {
                    await this.keywords.click(
                        this.locator.slotButton.first()
                    );
                    break;
                }

                await this.keywords.click(
                    this.locator.nextDateBtn
                );
            }
        }
    );
}

    async selectDoctor(doctorName) {

        await StepHelper.step(
            this.page,
            'Open Doctor Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.doctorDropdown
                );
            }
        );

        await this.keywords.waitForElement(
            this.locator.doctorSearch
        );

        await StepHelper.step(
            this.page,
            `Search Doctor - ${doctorName}`,
            async () => {

                await this.keywords.click(
                    this.locator.doctorSearch
                );

                await this.keywords.fill(
                    this.locator.doctorSearch,
                    doctorName
                );
            }
        );

        await this.keywords.wait(
            this.page,
            1000
        );

        await this.keywords.waitForElement(
            this.locator.doctorOption
        );

        await StepHelper.step(
            this.page,
            `Select Doctor - ${doctorName}`,
            async () => {
                await this.keywords.click(
                    this.locator.doctorOption
                );
            }
        );
    }


    async confirmConsultBooking() {

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {
                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Confirm Booking',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBookingBtn
                );
            }
        );
    }

     async verifyBookingConfirmation() {

    await StepHelper.step(
        this.page,
        'Verify Consult Booking Confirmation Message is Visible',
        async () => {
            await expect(
                this.locator.bookingConfirmMsg
            ).toBeVisible();
        }
    );

    await this.keywords.waitForLoadState(
            this.page,
            'networkidle'
        );
    }


    async addConsult(
        patientName,
        doctorName,
        consultSlot,
        bookingDate
    ) {

        await this.clickAddConsult();

        await this.searchPatient(
            patientName
        );

        await this.selectDoctor(
            doctorName
        );

        await this.selectProvider();

        await this.selectConsultSlot(
            consultSlot,
            bookingDate
        );

        await this.selectFirstAvailableSlot();

        await this.confirmConsultBooking();

        await this.verifyBookingConfirmation();

        await StepHelper.step(
            this.page,
            'Reload Application',
            async () => {
                await this.page.reload({
                    waitUntil: 'load'
                });
            }
        );
    }


    async addConsultForExistingPatient(
        patientName,
        doctorName,
        consultSlot,
        bookingDate
    ) {

        await this.clickAddConsult();

        await this.searchExistingPatient(
            patientName
        );

        await this.selectDoctor(
            doctorName
        );

        await this.selectProvider();

        await this.selectConsultSlot(
            consultSlot,
            bookingDate
        );

        await this.selectFirstAvailableSlot();

        await this.confirmConsultBooking();
    }

    _requireLocator(value, locatorName) {

        if (!value) {
            throw new Error(
                `[ConsultPage] Locator "${locatorName}" is not configured yet. ` +
                `Uncomment and fill it in Locators/ConsultLocator.js ` +
                `before running WF_CALADN_02.`
            );
        }

        return value;
    }

    async openConsultBooking() {
 
 
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
 
 
                await this.keywords.click(
                    this.locator.addNewBtn
                );
            }
        );
 
 
        await Verify.state(
            this.page,
            'Add Consult Option',
            this.locator.addConsultBtn,
            { visible: true, soft: false }
        );
 
 
        await StepHelper.step(
            this.page,
            'Click Add Consult Button',
            async () => {
 
 
                await this.keywords.click(
                    this.locator.addConsultBtn
                );
            }
        );
    }
    
    async verifyPatientSearchBarLoaded() {
 
 
        const searchInput = this.locator.patientSearchTxt;
 
 
        await StepHelper.step(
            this.page,
            'Wait For Patient Search Bar',
            async () => {
                await this.keywords.waitForElement(searchInput);
            }
        );
 
 
        await Verify.state(
            this.page,
            'Patient Search Bar',
            searchInput,
            {
                visible: true,
                enabled: true,
                editable: true,
                soft: false
            }
        );
 
 
        await Verify.inputValue(
            this.page,
            'Patient Search Bar Starts Empty',
            '',
            searchInput
        );
    }
 
    async searchAndSelectPatient(
        patientName,
        searchDebounce = 1500
    ) {
 
 
        if (!patientName) {
            throw new Error(
                '[ConsultPage] patientName is required and must come from test data.'
            );
        }
 
 
        const searchInput = this.locator.patientSearchTxt;
 
 
        await StepHelper.step(
            this.page,
            `Type Patient Name In Search Bar - ${patientName}`,
            async () => {
 
 
                await this.keywords.click(searchInput);
 
 
                await this.keywords.clear(searchInput);
                await this.keywords.type(
                    searchInput,
                    patientName
                );
            }
        );
 
 
        await Verify.inputValue(
            this.page,
            'Search Bar Holds The Typed Value',
            patientName,
            searchInput
        );
 
 
        await this.keywords.wait(
            this.page,
            searchDebounce
        );
 
 
        await StepHelper.step(
            this.page,
            'Wait For Patient Search Suggestions',
            async () => {
                await this.keywords.waitForElement(
                    this.locator.suggestedPatients.first()
                );
            }
        );
 
 
        await Verify.countAtLeast(
            this.page,
            'Patient Search Results Returned',
            1,
            this.locator.suggestedPatients
        );
 
 
        const patient =
            this.locator.getPatientResult(patientName).first();
 
 
        await StepHelper.step(
            this.page,
            `Wait For Matching Patient Result - ${patientName}`,
            async () => {
                await this.keywords.waitForElement(patient);
            }
        );
 
 
        await Verify.state(
            this.page,
            `Matching Patient Result - ${patientName}`,
            patient,
            { visible: true, soft: false }
        );
 
 
        await Verify.text(
            this.page,
            'Patient Result Text',
            patientName,
            patient
        );
 
 
        await StepHelper.step(
            this.page,
            `Select Patient - ${patientName}`,
            async () => {
 
 
                await this.keywords.click(patient);
            }
        );
    }
 
    

   async verifyBookingPanelOpened(
        patientName,
        appointmentType
    ) {
 
 
        const title = this.locator.bookingPanelTitle.first();
 
 
        await StepHelper.step(
            this.page,
            'Wait For Booking Panel Title',
            async () => {
                await this.keywords.waitForElement(title);
            }
        );
 
 
        await Verify.state(
            this.page,
            'Booking Panel Title',
            title,
            { visible: true, soft: false }
        );
 
 
        await Verify.text(
            this.page,
            'Booking Panel References Patient',
            patientName,
            title
        );
 
 
        await Verify.text(
            this.page,
            'Booking Panel References Appointment Type',
            appointmentType,
            title
        );
    }

    async verifyAppointmentTypeTabs(expectedTypes) {

        if (!Array.isArray(expectedTypes) || expectedTypes.length === 0) {
            throw new Error(
                '[ConsultPage] expectedTypes must be a non-empty array from test data.'
            );
        }

        await Verify.state(
            this.page,
            'Appointment Type Navbar',
            this.locator.appointmentTypeNavbar,
            { visible: true, soft: false }
        );

        for (const type of expectedTypes) {

            const tab =
                this.locator.getAppointmentTypeTab(type).first();

            await Verify.state(
                this.page,
                `Appointment Type Tab - ${type}`,
                tab,
                { visible: true }
            );
        }
    }

     
    async clearPreSelectedFilters(filterRefresh = 2000) {
 
 
        const chips = this._requireLocator(

            this.locator.selectedFilterChips,

            'selectedFilterChips'

        );
 
 
        await this.keywords.wait(this.page, 1000);
 
 
        let initialCount;

        let initialChipTexts;
 
 
        await StepHelper.step(

            this.page,

            'Get Pre-Selected Filter Chips',

            async () => {

                initialCount = await chips.count();

                initialChipTexts = initialCount === 0

                    ? []

                    : await chips.allInnerTexts();

            }

        );
 
 
        await Verify.record(

            this.page,

            'Pre-Selected Filters Found',

            initialCount === 0

                ? 'none'

                : initialChipTexts

                    .map(t => t.trim())

                    .join(' | ')

        );
 
 
        if (initialCount === 0) {

            return 0;

        }
 
 
        let canUseClearAll;
 
 
        await StepHelper.step(

            this.page,

            'Check For Clear All Filters Button',

            async () => {

                canUseClearAll =

                    Boolean(this.locator.clearAllFiltersBtn) &&

                    await this.locator.clearAllFiltersBtn

                        .first()

                        .isVisible()

                        .catch(() => false);

            }

        );
 
 
        if (canUseClearAll) {
 
 
            await StepHelper.step(

                this.page,

                'Clear All Pre-Selected Filters',

                async () => {
 
 
                    await this.keywords.click(

                        this.locator.clearAllFiltersBtn.first()

                    );

                }

            );
 
 
        } else {
 
 
            await StepHelper.step(

                this.page,

                `Remove Pre-Selected Filters Individually (${initialCount})`,

                async () => {
 
 
                    const maxAttempts = initialCount + 5;
 
 
                    for (let attempt = 0; attempt < maxAttempts; attempt++) {
 
 
                        const remaining = await chips.count();
 
 
                        if (remaining === 0) {

                            break;

                        }
 
 
                        const chip = chips.first();
 
 
                        const chipText =

                            (await chip.innerText().catch(() => '')).trim();
 
 
                        const removeBtn = this._requireLocator(

                            typeof this.locator.getChipRemoveButton === 'function'

                                ? this.locator.getChipRemoveButton(chip)

                                : null,

                            'getChipRemoveButton'

                        ).first();
 
 
                        await this.keywords.click(removeBtn);
 
 
                        console.log(`Removed filter chip: ${chipText}`);
 
 
                        await this.keywords.wait(this.page, 500);

                    }

                }

            );

        }
 
 
        await this.keywords.wait(

            this.page,

            filterRefresh

        );
 
 
        await Verify.count(

            this.page,

            'Filter Chips Remaining After Clear',

            0,

            chips

        );
 
 
        return initialCount;

    }
 

     
    async selectDoctorByName(doctorName, filterRefresh = 2000) {
 
 
        if (!doctorName) {

            throw new Error(

                '[ConsultPage] doctorName is required and must come from test data.'

            );

        }
 
 
        await Verify.state(

            this.page,

            'Doctor Dropdown',

            this.locator.doctorDropdown,

            { visible: true, enabled: true, soft: false }

        );
 
 
        await StepHelper.step(

            this.page,

            'Open Doctor Dropdown',

            async () => {
 
 
                await this.keywords.click(

                    this.locator.doctorDropdown

                );

            }

        );
 
 
        await StepHelper.step(

            this.page,

            'Wait For Doctor Dropdown Options',

            async () => {

                await this.keywords.waitForElement(

                    this.locator.dropdownOptions.first()

                );

            }

        );
 
 
        await Verify.countAtLeast(

            this.page,

            'Doctor Dropdown Options Available',

            1,

            this.locator.dropdownOptions

        );
 
 
        const doctorOption =

            this.locator.getDoctorOption(doctorName).first();
 
 
        await StepHelper.step(

            this.page,

            `Wait For Doctor Option - ${doctorName}`,

            async () => {

                await this.keywords.waitForElement(doctorOption);

            }

        );
 
 
        await Verify.state(

            this.page,

            `Doctor Option - ${doctorName}`,

            doctorOption,

            { visible: true, soft: false }

        );
 
 
        await Verify.text(

            this.page,

            'Doctor Option Text',

            doctorName,

            doctorOption,

            { exact: true }

        );
 
 
        await StepHelper.step(

            this.page,

            `Select Doctor - ${doctorName}`,

            async () => {
 
 
                await this.keywords.click(doctorOption);

            }

        );
 
 
        const checkbox = doctorOption.locator(

            'input[type="checkbox"]'

        );
 
 
        let hasCheckbox;
 
 
        await StepHelper.step(

            this.page,

            `Check For Doctor Checkbox - ${doctorName}`,

            async () => {

                hasCheckbox = await checkbox.count().catch(() => 0);

            }

        );
 
 
        if (hasCheckbox > 0) {
 
 
            await Verify.state(

                this.page,

                `Doctor Checkbox - ${doctorName}`,

                checkbox.first(),

                { checked: true }

            );
 
 
        } else {
 
 
            await Verify.record(

                this.page,

                `Doctor Checkbox - ${doctorName}`,

                'no checkbox in option - verified via filter chip instead'

            );

        }
 
 
        await StepHelper.step(

            this.page,

            'Close Doctor Dropdown',

            async () => {
 
 
                await this.keywords.keyboardPress(

                    this.page,

                    'Escape'

                );

            }

        );
 
 
        await this.keywords.wait(

            this.page,

            filterRefresh

        );
 
 
        await this._verifyFilterChipApplied(doctorName, 'Doctor');

    }
 
 
     
    async selectConsultTypeByName(consultType, filterRefresh = 2000) {
 
 
        if (!consultType) {

            throw new Error(

                '[ConsultPage] consultType is required and must come from test data.'

            );

        }
 
 
        await Verify.state(

            this.page,

            'Consult Dropdown',

            this.locator.providerDropdown,

            { visible: true, enabled: true, soft: false }

        );
 
 
        await StepHelper.step(

            this.page,

            'Open Consult Dropdown',

            async () => {
 
 
                await this.keywords.click(

                    this.locator.providerDropdown

                );

            }

        );
 
 
        const consultOption =

            this.locator.getConsultOption(consultType).first();
 
 
        await StepHelper.step(

            this.page,

            `Wait For Consult Option - ${consultType}`,

            async () => {

                await this.keywords.waitForElement(consultOption);

            }

        );
 
 
        await Verify.state(

            this.page,

            `Consult Option - ${consultType}`,

            consultOption,

            { visible: true, soft: false }

        );
 
 
        await Verify.text(

            this.page,

            'Consult Option Text',

            consultType,

            consultOption

        );
 
 
        await StepHelper.step(

            this.page,

            `Select Consult Type - ${consultType}`,

            async () => {
 
 
                await this.keywords.click(consultOption);

            }

        );
 
 
        await StepHelper.step(

            this.page,

            'Close Consult Dropdown',

            async () => {
 
 
                await this.keywords.keyboardPress(

                    this.page,

                    'Escape'

                );

            }

        );
 
 
        await this.keywords.wait(

            this.page,

            filterRefresh

        );
 
 
        await this._verifyFilterChipApplied(consultType, 'Consult');

    }
 
   
    async selectBookingDatePreset(
        presetLabel,
        offsetInDays = 1,
        filterRefresh = 2000
    ) {

        const targetDate = generateAdmissionDate(offsetInDays);
        const targetDay = targetDate.getDate();

        await Verify.record(
            this.page,
            `Target Booking Date (today + ${offsetInDays})`,
            targetDate.toDateString()
        );

        await Verify.state(
            this.page,
            'Date Dropdown',
            this.locator.bookingDateContainer,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Date Dropdown',
            async () => {

                await this.keywords.click(
                    this.locator.bookingDateContainer
                );
            }
        );

        const presetConfigured =
            typeof this.locator.getDatePreset === 'function' &&
            Boolean(this.locator.getDatePreset(presetLabel));

        if (presetConfigured) {

            const preset =
                this.locator.getDatePreset(presetLabel).first();

            await this.keywords.waitForElement(preset);

            await Verify.state(
                this.page,
                `Date Preset - ${presetLabel}`,
                preset,
                { visible: true, soft: false }
            );

            await Verify.text(
                this.page,
                'Date Preset Text',
                presetLabel,
                preset
            );

            await StepHelper.step(
                this.page,
                `Select Date Preset - ${presetLabel}`,
                async () => {

                    await this.keywords.click(preset);
                }
            );

                } else {

            const dayCell = this.locator
                .getCalendarDayCell(targetDay)
                .first();

            await this.keywords.waitForElement(dayCell);

            await Verify.state(
                this.page,
                `Calendar Day Cell - ${targetDay}`,
                dayCell,
                { visible: true, soft: false }
            );

            await StepHelper.step(
                this.page,
                `Select Booking Date From Calendar - ${targetDay}`,
                async () => {

                    await this.keywords.click(dayCell);
                }
            );
        }

        const applyVisible = await this.locator.datePickerApplyBtn
            .isVisible()
            .catch(() => false);

        await Verify.record(
            this.page,
            'Apply Button After Date Selection',
            applyVisible
                ? 'shown - clicking'
                : 'not shown - preset applied immediately'
        );

        if (applyVisible) {

            await StepHelper.step(
                this.page,
                'Apply Selected Date',
                async () => {

                    await this.keywords.click(
                        this.locator.datePickerApplyBtn
                    );
                }
            );
        }

        await this.keywords.wait(
            this.page,
            filterRefresh
        );

                const chipLabelToVerify = presetConfigured
            ? presetLabel
            : String(targetDay);

        await this._verifyFilterChipApplied(chipLabelToVerify, 'Date');

        return targetDate;
    }

    async verifyAppointmentResultsLoaded() {

        const countLabel =
            this.locator.appointmentResultsCount.first();

        await this.keywords.waitForElement(countLabel);

        await Verify.matches(
            this.page,
            'Appointment Results Label Reports A Number',
            /\d+/,
            async () => await countLabel.innerText()
        );

        await Verify.countAtLeast(
            this.page,
            'Appointment Result Cards Rendered',
            1,
            this.locator.appointmentResultCards
        );
    }

    async selectAndCaptureAvailableSlot() {

        await Verify.countAtLeast(
            this.page,
            'Appointment Result Cards Available Before Slot Selection',
            1,
            this.locator.appointmentResultCards
        );

        const card = this.locator.appointmentResultCards.first();

        await Verify.state(
            this.page,
            'First Appointment Result Card',
            card,
            { visible: true, soft: false }
        );

        const cardText = await card.innerText();

                const feeAmount = this._extractFeeAmount(cardText);

        await Verify.record(
            this.page,
            'Fee Captured From Appointment Card',
            feeAmount !== null
                ? feeAmount
                : `<not found in card text: ${cardText.slice(0, 80)}>`
        );

        const slot = card.locator('.slotButton').first();

        await Verify.state(
            this.page,
            'First Available Slot In Card',
            slot,
            { visible: true, soft: false }
        );

        const slotTimeText = (
            await slot.locator('span.slot-time').innerText()
        ).trim();

        await Verify.record(
            this.page,
            'Slot Time Captured Before Selection',
            slotTimeText
        );

        await StepHelper.step(
            this.page,
            `Select Slot - ${slotTimeText}`,
            async () => {

                await this.keywords.click(slot);
            }
        );

        return {
            feeAmount,
            slotTimeText
        };
    }

    async proceedToReviewAppointment() {

        await Verify.state(
            this.page,
            'Proceed Button',
            this.locator.proceedBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Proceed',
            async () => {

                await this.keywords.click(
                    this.locator.proceedBtn
                );
            }
        );

        await this.keywords.waitForElement(
            this.locator.reviewPageTitle
        );

        await Verify.state(
            this.page,
            'Review And Confirm Appointment Page',
            this.locator.reviewPageTitle,
            { visible: true, soft: false }
        );
    }


    async verifyReviewAppointmentFee(expectedFeeAmount) {

        const feeElement = this.locator.reviewAppointmentFee.first();

        await this.keywords.waitForElement(feeElement);

        await Verify.state(
            this.page,
            'Review Page Fee Element',
            feeElement,
            { visible: true, soft: false }
        );

        const feeText = await feeElement.innerText();

                const actualFeeAmount =
            this._extractFeeAmount(feeText) ?? feeText.trim();

        if (expectedFeeAmount === null || expectedFeeAmount === undefined) {

            await Verify.record(
                this.page,
                'Review Page Fee (no fee captured from card to compare against)',
                actualFeeAmount
            );

            return actualFeeAmount;
        }

        await Verify.equals(
            this.page,
            'Review Page Fee Matches Selected Slot Fee',
            expectedFeeAmount,
            actualFeeAmount
        );

        return actualFeeAmount;
    }

    async confirmBookingWithVerification() {

        await Verify.state(
            this.page,
            'Confirm Booking Button',
            this.locator.confirmBookingBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Confirm Booking',
            async () => {

                await this.keywords.click(
                    this.locator.confirmBookingBtn
                );
            }
        );

        await this.keywords.waitForLoadState(
            this.page,
            'networkidle'
        );

        await this.keywords.waitForElement(
            this.locator.bookingConfirmToastTitle,
            15000
        );

        await Verify.state(
            this.page,
            'Booking Confirmation Toast',
            this.locator.bookingConfirmToastTitle,
            { visible: true, soft: false }
        );

        await Verify.text(
            this.page,
            'Booking Confirmation Toast Title',
            'Booking confirm',
            this.locator.bookingConfirmToastTitle
        );

        await Verify.text(
            this.page,
            'Booking Confirmation Toast Subtext',
            'Your appointment have been booked',
            this.locator.bookingConfirmToastSubtext
        );
    }


    async dismissBookingConfirmationToastIfPresent() {

        const dismissLink = this.locator.bookingConfirmToastDismiss;

        const isVisible = await dismissLink
            .first()
            .isVisible()
            .catch(() => false);

        await Verify.record(
            this.page,
            'Booking Confirmation Toast Present Before Next Booking',
            isVisible ? 'visible - dismissing' : 'not visible - nothing to dismiss'
        );

        if (!isVisible) {
            return;
        }

        await StepHelper.step(
            this.page,
            'Dismiss Booking Confirmation Toast',
            async () => {

                await this.keywords.click(dismissLink.first());
            }
        );
    }


    async selectAddCustomSlotsForConsultType(consultTypeLabel) {

        if (!consultTypeLabel) {
            throw new Error(
                '[ConsultPage] consultTypeLabel is required and must come from test data.'
            );
        }

        const card = this.locator
            .getAppointmentCardByConsultType(consultTypeLabel)
            .first();

        await this.keywords.waitForElement(card);

        await Verify.state(
            this.page,
            `Appointment Card - ${consultTypeLabel}`,
            card,
            { visible: true, soft: false }
        );

        const addCustomSlotsBtn =
            this.locator.getAddCustomSlotsButton(card).first();

        await Verify.state(
            this.page,
            `Add Custom Slots Button - ${consultTypeLabel}`,
            addCustomSlotsBtn,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click Add Custom Slots - ${consultTypeLabel}`,
            async () => {

                await this.keywords.click(addCustomSlotsBtn);
            }
        );
    }

    _parseTimeLabel(label) {

        const match = label.trim().match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        );

        if (!match) {
            throw new Error(
                `[ConsultPage] Unable to parse time label: "${label}"`
            );
        }

        let hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);
        const period = match[3].toUpperCase();

        if (period === 'AM' && hour === 12) {
            hour = 0;
        } else if (period === 'PM' && hour !== 12) {
            hour += 12;
        }

        return { hour24: hour, minute };
    }


    _formatTimeLabel(hour24, minute) {

        const period = hour24 >= 12 ? 'PM' : 'AM';

        let hour12 = hour24 % 12;

        if (hour12 === 0) {
            hour12 = 12;
        }

        return `${String(hour12).padStart(2, '0')}:` +
            `${String(minute).padStart(2, '0')} ${period}`;
    }


    _addMinutesToTimeLabel(label, minutesToAdd) {

        const { hour24, minute } = this._parseTimeLabel(label);

        const dayMinutes = 24 * 60;

        let totalMinutes =
            (hour24 * 60 + minute + minutesToAdd) % dayMinutes;

        if (totalMinutes < 0) {
            totalMinutes += dayMinutes;
        }

        return this._formatTimeLabel(
            Math.floor(totalMinutes / 60),
            totalMinutes % 60
        );
    }

    _parseSlotRangeStartLabel(slotTimeText) {

        const parts = slotTimeText.split('-').map(p => p.trim());

        if (parts.length < 2) {
            throw new Error(
                `[ConsultPage] Unable to parse slot time range: "${slotTimeText}"`
            );
        }

        const periodMatch = parts[1].match(/(AM|PM)/i);

        if (!periodMatch) {
            throw new Error(
                `[ConsultPage] Unable to determine AM/PM from slot time range: "${slotTimeText}"`
            );
        }

        return `${parts[0]} ${periodMatch[1].toUpperCase()}`;
    }

    _getTimePickerTargetParts(timeLabel) {

        const { hour24, minute } = this._parseTimeLabel(timeLabel);

        let hour12 = hour24 % 12;

        if (hour12 === 0) {
            hour12 = 12;
        }

        return {
            hour: String(hour12).padStart(2, '0'),
            minute: String(minute).padStart(2, '0'),
            period: hour24 >= 12 ? 'PM' : 'AM'
        };
    }

    _extractFeeAmount(text) {

        const match = text.match(/₹\s*([\d,]+(?:\.\d+)?)/);

        return match ? match[1].replace(/,/g, '') : null;
    }

    async setCustomSlotStartTime(previousSlotTimeText) {

        if (!previousSlotTimeText) {
            throw new Error(
                '[ConsultPage] previousSlotTimeText is required - ' +
                'pass the slotTimeText captured from the earlier booking.'
            );
        }

        await Verify.state(
            this.page,
            'Add Custom Slots Modal',
            this.locator.customSlotModal,
            { visible: true, soft: false }
        );

        const startLabel =
            this._parseSlotRangeStartLabel(previousSlotTimeText);

        const targetParts =
            this._getTimePickerTargetParts(startLabel);

        const expectedEndLabel =
            this._addMinutesToTimeLabel(startLabel, 10);

        await Verify.record(
            this.page,
            'Target Custom Slot Start Time (from previous booking)',
            startLabel
        );

        const startPicker =
            this.locator.getCustomSlotTimePicker('Start time');

        await Verify.state(
            this.page,
            'Start Time Picker Field',
            startPicker,
            { visible: true, soft: false }
        );

        const startInputBox =
            this.locator.getTimePickerInputBox(startPicker);

        await StepHelper.step(
            this.page,
            'Open Start Time Picker',
            async () => {

                await this.keywords.click(startInputBox);
            }
        );

        const popup = this.locator.getTimePickerPopup(startPicker);

        await this.keywords.waitForElement(popup);

        const columns =
            this.locator.getTimePickerColumns(startPicker);

        await Verify.countAtLeast(
            this.page,
            'Start Time Picker Columns Rendered',
            3,
            columns
        );

        const columnTargets = [
            { index: 0, label: 'Hour', value: targetParts.hour },
            { index: 1, label: 'Minute', value: targetParts.minute },
            { index: 2, label: 'AM/PM', value: targetParts.period }
        ];

        for (const target of columnTargets) {

            const column = columns.nth(target.index);

            const option = this.locator.getTimePickerOption(
                column,
                target.value
            );

            await this.keywords.scrollIntoViewIfNeeded(option);

            await Verify.state(
                this.page,
                `Start Time ${target.label} Option - ${target.value}`,
                option,
                { visible: true, soft: false }
            );

            await StepHelper.step(
                this.page,
                `Select Start Time ${target.label} - ${target.value}`,
                async () => {

                    await this.keywords.click(option);
                }
            );
        }

        const setBtn =
            this.locator.getTimePickerSetBtn(startPicker);

        await Verify.state(
            this.page,
            'Start Time Picker Set Button',
            setBtn,
            { visible: true, enabled: true, soft: false }
        );

                await StepHelper.step(
            this.page,
            'Click Set On Start Time Picker',
            async () => {

                await this.keywords.click(setBtn);
            }
        );

              await Verify.state(
            this.page,
            'Start Time Picker Popup Closed After Set',
            popup,
            { hidden: true, soft: false }
        );

        await this.keywords.wait(this.page, 500);

        await Verify.text(
            this.page,
            'Start Time Field Displays Selected Time',
            startLabel,
            startInputBox,
            { exact: true }
        );

        const endPicker =
            this.locator.getCustomSlotTimePicker('End time');

        const endInputBox =
            this.locator.getTimePickerInputBox(endPicker);

        await Verify.text(
            this.page,
            'End Time Field Auto-Updated To Start + 10 Minutes',
            expectedEndLabel,
            endInputBox,
            { exact: true }
        );

        return { startLabel, expectedEndLabel };
    }


        async confirmCustomSlot() {

        const updateBtn = this.locator.customSlotUpdateBtn;
        await this.keywords.waitForElement(updateBtn);

        await Verify.state(
            this.page,
            'Custom Slot Update Button',
            updateBtn,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Update On Custom Slot Modal',
            async () => {

                await this.keywords.click(updateBtn);
            }
        );

        await Verify.state(
            this.page,
            'Custom Slot Modal Closed After Update',
            this.locator.customSlotModal,
            { hidden: true }
        );
    }


    async captureFeeFromCard(consultTypeLabel) {

        const card = this.locator
            .getAppointmentCardByConsultType(consultTypeLabel)
            .first();

        await this.keywords.waitForElement(card);

        const cardText = await card.innerText();

        const feeAmount = this._extractFeeAmount(cardText);

        await Verify.record(
            this.page,
            `Fee Captured From Card - ${consultTypeLabel}`,
            feeAmount !== null
                ? feeAmount
                : `<not found in card text: ${cardText.slice(0, 80)}>`
        );

        return feeAmount;
    }

    async _verifyFilterChipApplied(value, label) {

        if (typeof this.locator.getFilterChip !== 'function') {

            await Verify.record(
                this.page,
                `${label} Filter Chip - ${value}`,
                'chip locator not configured - assertion skipped'
            );

            return;
        }

        const chip = this.locator.getFilterChip(value).first();

        await Verify.state(
            this.page,
            `${label} Filter Chip Applied - ${value}`,
            chip,
            { visible: true }
        );

        await Verify.text(
            this.page,
            `${label} Filter Chip Text`,
            value,
            chip
        );
    }

async clearPreSelectedFilters(filterRefresh = 2000) {

    const chips = this._requireLocator(

        this.locator.selectedFilterChips,

        'selectedFilterChips'

    );

    await this.keywords.wait(this.page, 1000);

    const initialCount = await chips.count();

    await Verify.record(

        this.page,

        'Pre-Selected Filters Found',

        initialCount === 0

            ? 'none'

            : (await chips.allInnerTexts())

                .map(t => t.trim())

                .join(' | ')

    );

    if (initialCount === 0) {

        return 0;

    }

    const canUseClearAll =

        Boolean(this.locator.clearAllFiltersBtn) &&

        await this.locator.clearAllFiltersBtn

            .first()

            .isVisible()

            .catch(() => false);

    if (canUseClearAll) {

        await StepHelper.step(

            this.page,

            'Clear All Pre-Selected Filters',

            async () => {

                await this.keywords.click(

                    this.locator.clearAllFiltersBtn.first()

                );

            }

        );

    } else {

        await StepHelper.step(

            this.page,

            `Remove Pre-Selected Filters Individually (${initialCount})`,

            async () => {

                const maxAttempts = initialCount + 5;

                for (let attempt = 0; attempt < maxAttempts; attempt++) {

                    const remaining = await chips.count();

                    if (remaining === 0) {

                        break;

                    }

                    const chip = chips.first();

                    const chipText =

                        (await chip.innerText().catch(() => '')).trim();

                    const removeBtn = this._requireLocator(

                        typeof this.locator.getChipRemoveButton === 'function'

                            ? this.locator.getChipRemoveButton(chip)

                            : null,

                        'getChipRemoveButton'

                    ).first();

                    await this.keywords.click(removeBtn);

                    console.log(`Removed filter chip: ${chipText}`);

                    await this.keywords.wait(this.page, 500);

                }

            }

        );

    }

    await this.keywords.wait(

        this.page,

        filterRefresh

    );

    await Verify.count(

        this.page,

        'Filter Chips Remaining After Clear',

        0,

        chips
        
    );

    return initialCount;

}

async selectDoctorByName(doctorName, filterRefresh = 2000) {

    if (!doctorName) {

        throw new Error(

            '[ConsultPage] doctorName is required and must come from test data.'

        );

    }

    await Verify.state(

        this.page,

        'Doctor Dropdown',

        this.locator.doctorDropdown,

        { visible: true, enabled: true, soft: false }

    );

    await StepHelper.step(

        this.page,

        'Open Doctor Dropdown',

        async () => {

            await this.keywords.click(

                this.locator.doctorDropdown

            );

        }

    );

    await this.keywords.waitForElement(

        this.locator.dropdownOptions.first()

    );

    await Verify.countAtLeast(

        this.page,

        'Doctor Dropdown Options Available',

        1,

        this.locator.dropdownOptions

    );

    const doctorOption =
    this.locator.getDoctorOption(doctorName).first();
    await this.keywords.waitForElement(doctorOption);
    await Verify.state(
        this.page,
        `Doctor Option - ${doctorName}`,
        doctorOption,
        { visible: true, soft: false }
    );
    await Verify.text(
        this.page,
        'Doctor Option Text',
        doctorName,
        doctorOption,
        { exact: true }
    );
    await StepHelper.step(
        this.page,
        `Select Doctor - ${doctorName}`,
        async () => {
            await this.keywords.click(doctorOption);
        }
    );
    const checkbox = doctorOption.locator(
        'input[type="checkbox"]'
    );
    const hasCheckbox = await checkbox.count().catch(() => 0);
    if (hasCheckbox > 0) {
        await Verify.state(
            this.page,
            `Doctor Checkbox - ${doctorName}`,
            checkbox.first(),
            { checked: true }
        );
    } else {
        await Verify.record(
            this.page,
            `Doctor Checkbox - ${doctorName}`,
            'no checkbox in option - verified via filter chip instead'
        );
    }
    await StepHelper.step(
        this.page,
        'Close Doctor Dropdown',
        async () => {
            await this.keywords.keyboardPress(
                this.page,
                'Escape'
            );
        }
    );
    await this.keywords.wait(
        this.page,
        filterRefresh
    );
    await this._verifyFilterChipApplied(doctorName, 'Doctor');
    }

     
    async selectDoctorByName(doctorName, filterRefresh = 2000) {
 
 
        if (!doctorName) {

            throw new Error(

                '[ConsultPage] doctorName is required and must come from test data.'

            );

        }
 
 
        await Verify.state(

            this.page,

            'Doctor Dropdown',

            this.locator.doctorDropdown,

            { visible: true, enabled: true, soft: false }

        );
 
 
        await StepHelper.step(

            this.page,

            'Open Doctor Dropdown',

            async () => {
 
 
                await this.keywords.click(

                    this.locator.doctorDropdown

                );

            }

        );
 
 
        await this.keywords.waitForElement(

            this.locator.dropdownOptions.first()

        );
 
 
        await Verify.countAtLeast(

            this.page,

            'Doctor Dropdown Options Available',

            1,

            this.locator.dropdownOptions

        );
 
 
        const doctorOption =

            this.locator.getDoctorOption(doctorName).first();
 
 
        await this.keywords.waitForElement(doctorOption);
 
 
        await Verify.state(

            this.page,

            `Doctor Option - ${doctorName}`,

            doctorOption,

            { visible: true, soft: false }

        );
 
 
        await Verify.text(

            this.page,

            'Doctor Option Text',

            doctorName,

            doctorOption,

            { exact: true }

        );
 
 
        await StepHelper.step(

            this.page,

            `Select Doctor - ${doctorName}`,

            async () => {
 
 
                await this.keywords.click(doctorOption);

            }

        );
 
 
        const checkbox = doctorOption.locator(

            'input[type="checkbox"]'

        );
 
 
        const hasCheckbox = await checkbox.count().catch(() => 0);
 
 
        if (hasCheckbox > 0) {
 
 
            await Verify.state(

                this.page,

                `Doctor Checkbox - ${doctorName}`,

                checkbox.first(),

                { checked: true }

            );
 
 
        } else {
 
 
            await Verify.record(

                this.page,

                `Doctor Checkbox - ${doctorName}`,

                'no checkbox in option - verified via filter chip instead'

            );

        }
 
 
        await StepHelper.step(

            this.page,

            'Close Doctor Dropdown',

            async () => {
 
 
                await this.keywords.keyboardPress(

                    this.page,

                    'Escape'

                );

            }

        );
 
 
        await this.keywords.wait(

            this.page,

            filterRefresh

        );
 
 
        await this._verifyFilterChipApplied(doctorName, 'Doctor');

    }
 
 
     
 

    
}


module.exports = { ConsultPage };