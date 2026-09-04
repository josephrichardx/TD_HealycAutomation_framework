class ConsultLocator {

    constructor(page) {
        this.page = page;

        this.addNewBtn = page.getByRole('button', {
            name: 'Add New'
        });

        this.addConsultBtn = page.getByRole('button', {
            name: 'Add Consult'
        });

        this.ConsultbookingConfirmMsg = page.getByText(
            'Booking confirm'
        );
        this.patientSearchTxt = page.getByRole('textbox', {
            name: 'Search with patient name or'
        });

        this.existingPatient = page.locator(
            "//div[contains(@class,'suggested-list-item')]"
        ).first();

        this.providerDropdown = page.locator(
            'app-multi-dropdown:nth-child(3) > .multi-dropdown-container > .multi-dropdown-title'
        );

        this.consultTab = page.locator(
            'app-book-appointment-filter-navbar'
        ).getByText('Consult', {
            exact: true
        });

        this.proceedBtn = page.getByText('Proceed');

        this.confirmBookingBtn = page.getByText(
            'Confirm Booking'
        );

        this.bookingConfirmMsg = page.getByText(
            'Booking confirm'
        );


        

        this.addCustomSlotsBtn = page.getByText(
            'Add custom slots'
        ).first();

        this.clockIcon = page.locator(
            '.fa-clock'
        ).first();

        this.timeOption = page.getByText(
            '10',
            { exact: true }
        ).first();

        this.setBtn = page.getByRole(
            'button',
            { name: 'Set' }
        );

        this.updateBtn = page.getByRole(
            'button',
            { name: 'Update' }
        );

        this.consultInput = page.locator(
            "xpath=//div[@class='search-icon']//following::input[@type='text']"
        );

        this.serviceOption = (consultSlot) =>
            this.page.locator(
                `xpath=(//div[normalize-space()='${consultSlot}'])[1]`
            );

        this.bookingDateContainer = page.locator(
            "//div[@class='range-date-container']"
        );

        this.currentMonth = page.locator(
            '#currentMonth'
        );

        this.applyBtn = page.getByText(
            'Apply'
        ).nth(1);

        this.slotButton = page.locator(
            '.slotButton'
        );

        this.slotAppointmentCard = (slot) =>
            slot.locator(
                'xpath=ancestor::div[contains(@class,"bookappointmentBodyCard")]'
            );

        this.doctorDropdown = page.locator(
            '.multi-dropdown-title'
        ).first();

        this.doctorSearch = page.locator(
            "(//input[@type='text'])[2]"
        );

        this.doctorOption = page.locator(
            "(//div[@class='dropdown-option'])[1]"
        );

        this.suggestedPatients = page.locator(
            "//div[contains(@class,'suggested-list-item')]"
        );

        this.bookingPanelTitle = page.getByText(
            /Book a suitable/i
        );

        this.appointmentTypeNavbar = page.locator(
            'app-book-appointment-filter-navbar'
        );

        this.appointmentTypeTabSection = page.locator(
            'div.bookappointmentTabSection'
        );

        this.appointmentTypeTabActive = page.locator(
            'button.bookappointmentTab.selectedTab'
        );

        this.appointmentResultsCount = page.getByText(
            /appointments? found/i
        );

        this.dropdownOptions = page.locator(
            "//div[@class='dropdown-option']"
        );

        this.datePickerApplyBtn = page.getByText(
            'Apply'
        ).last();

        this.selectedFilterChips = page.locator(
            'div.bookAppointmentSelectedOptions div.selectedFilterCard'
        );

        this.clearAllFiltersBtn = page.locator(
            "//span[normalize-space()='Clear all']"
        );

        this.appointmentResultCards = page.locator(
            'div.bookappointmentBodyCard'
        );

        this.slotTime = page.locator(
            'div.slotButton span.slot-time'
        );

        this.reviewPageTitle = page.getByText(
            'Review and confirm appointment'
        );

        this.reviewAppointmentFee = page.locator(
            '.appointmentSummaryBody .closeBody .closeBodySection .fees .price'
        );

        this.bookingConfirmToastTitle = page.locator(
            'div.toaster-wrapper.success .text-content .title'
        );

        this.bookingConfirmToastSubtext = page.locator(
            'div.toaster-wrapper.success .text-content .subtext'
        );

        this.calendarWaitlistTab = page.locator('div.tab span:has-text("Waitlist")');

        this.bookingConfirmToastDismiss = page.locator(
            'div.toaster-wrapper.success'
        ).getByText('Dismiss');

        this.customSlotModal = page.locator(
            'div.custom-slot-modal:visible'
        ).first();

        this.customSlotModalTitle = page.locator(
            'div.custom-slot-modal:visible'
        ).first().getByText(/Add custom slots for/i);

        this.customSlotCancelBtn = page.locator(
            'button.passiveButton:visible'
        ).first();

        this.customSlotUpdateBtn = page.locator(
            'button.activeButon:visible'
        ).first();

         this.nextDateBtn = page.locator('div.NextListButton').first();
 
        this.calendarDate = page
            .locator('.fc-col-header-cell-cushion')
            .first();
        
        // --- NEWLY ADDED LOCATORS ---
        this.addConsultMenuBtn = page.locator('div.AddNewButtonOptions button:has-text("Add Consult")');
        this.slotTimeText = page.locator('.slotButton span.slot-time');
        this.calendarNextBtn = page.locator('.fc-next-button');
        this.waitlistBtn = page.locator('.waitingListButton');
    }

    // --- NEWLY ADDED METHODS ---
    getDoctorCheckbox(doctorOptionLocator) {
        return doctorOptionLocator.locator('input[type="checkbox"]');
    }

    getSlotButtonFromCard(cardLocator) {
        return cardLocator.locator('.slotButton');
    }

    getSlotTimeFromSlot(slotLocator) {
        return slotLocator.locator('span.slot-time');
    }

    getAddNewMenuOption(option) {
        return this.page.locator(`div.AddNewButtonOptions button:has-text("${option}")`);
    }

    getPatientCalendarCards(patientName) {
        return this.page.locator(`.custom-events-cards:has-text("${patientName}")`);
    }

    getPatientDiv(patientName) {
        return this.page.locator(`//div[@title="${patientName}"]`);
    }

    getServiceOption(consultSlot) {
        return this.page.locator(`xpath=(//div[normalize-space()='${consultSlot}'])[1]`);
    }

    getNextListBtn(cardLocator) {
        return cardLocator.locator('.NextListButton');
    }

    getSlotBtn(cardLocator) {
        return cardLocator.locator('.slotButton');
    }

    getCardDateText(cardLocator) {
        return cardLocator.getByText(/\d{2}\s+[A-Za-z]{3},?\s*\d{4}/);
    }
    // ---------------------------

    getPatientResult(patientName) {
        return this.page.locator(
            `//div[@title="${patientName}"]`
        ).first();
    }

    getAppointmentTypeTab(tabName) {
        return this.appointmentTypeTabSection
            .locator('button.bookappointmentTab')
            .filter({ hasText: tabName });
    }

    getDoctorOption(doctorName) {
        return this.page.locator(
            `//div[@class='dropdown-option'][normalize-space()='${doctorName}']`
        );
    }

    getConsultOption(consultType) {
        return this.page.locator(
            `(//div[normalize-space()='${consultType}'])[1]`
        );
    }

    getChipRemoveButton(chipLocator) {
        return chipLocator.locator('i.closeOption');
    }

    getFilterChip(chipName) {
        return this.page
            .locator('div.bookAppointmentSelectedOptions div.selectedFilterCard')
            .filter({ hasText: chipName });
    }

    getAppointmentCardByConsultType(consultTypeLabel) {
        return this.appointmentResultCards.filter({
            hasText: consultTypeLabel
        });
    }

    getAddCustomSlotsButton(cardLocator) {
        return cardLocator.locator('div.customSlotButton');
    }

    getCustomSlotTimePicker(label) {
        return this.customSlotModal.locator(
            `xpath=.//label[normalize-space()='${label}']` +
            `/parent::*//app-custom-timepicker`
        );
    }

    getTimePickerInputBox(pickerLocator) {
        return pickerLocator.locator('.input-box');
    }

    getTimePickerPopup(pickerLocator) {
        return pickerLocator.locator('.picker-popup');
    }

    getTimePickerColumns(pickerLocator) {
        return this.getTimePickerPopup(pickerLocator)
            .locator('.picker-columns > .column');
    }

    getTimePickerOption(column, value) {
        return column.locator('div.scroll-option').filter({
            hasText: new RegExp(`^\\s*${value}\\s*$`)
        });
    }

    getTimePickerSetBtn(pickerLocator) {
        return this.getTimePickerPopup(pickerLocator)
            .locator('button.set-btn');
    }

    getCalendarDayCell(day) {
        return this.page.locator('div.day').filter({
            hasText: new RegExp(`^\\s*${day}\\s*$`)
        });
    }

}

module.exports = { ConsultLocator };