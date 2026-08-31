class WaitlistPageLocators {
    constructor(page) {
        this.page = page;
    }
 
    // ===== HOURGLASS AND WAITLIST NAVIGATION =====
    get hourglassIcon() {
        return this.page.locator('.fa-solid.fa-hourglass').first();
    }
 
    get proceedButton() {
        return this.page.getByText('Proceed');
    }
 
    get confirmBookingButton() {
        return this.page.getByText('Confirm Booking');
    }
 
    get waitlistMenuItem() {
        return this.page.getByText('Waitlist', { exact: true }).first();
    }
 
    get calendarNavigationArrow() {
        return this.page.locator('span.fc-icon.fc-icon-chevron-right');
    }
 
    // ===== APPOINTMENT AND STATUS =====
    get pendingStatusLocator() {
        return this.page.locator("(//div[text()=' Pending '])[2]");
    }
 
    get invoiceNumberLocator() {
        return this.page.locator('(//span[@class="invoice-id"])[2]');
    }
 
    // ===== CALENDAR TOGGLE =====
    get calendarToggleButton() {
        return this.page.locator('#calendar-toggle');
    }
 
    // ===== PAYMENT SECTION - GETTERS =====
    get paymentTabMenu() {
        return this.page.getByText('Payment', { exact: true }).first();
    }
 
    get makePaymentButton() {
        return this.page.getByRole('button', { name: 'Make Payment' }).first();
    }
 
    get amountInput() {
        return this.page.getByPlaceholder('₹ Amount').first();
    }
 
    get transactionIdInput() {
        return this.page.getByPlaceholder('Transaction ID').first();
    }
 
    get recordPaymentButton() {
        return this.page.getByRole('button', { name: 'Record Payment' }).first();
    }
 
    // The toaster component itself - its text is read at runtime and compared
    // with the expected message held in the calling spec's data file, so the
    // message is not baked into this locator.
    get paymentSuccessMessage() {
        return this.page.locator('app-custom-toaster-message');
    }
 
    get fullPaymentCheckbox() {
        return this.page.getByLabel('Make full payment').last();
    }
 
    get fullPaymentAmountInput() {
        return this.page.getByPlaceholder('₹ Amount').last();
    }
 
    // ===== WAITLIST TAB - VIRTUALISED ENTRY LIST =====
    // The Waitlist tab renders its cards inside a scrollable container and only
    // materialises the ones near the viewport, so a card has to be scrolled to
    // before it can be seen.
    get waitlistContainer() {
        return this.page.locator('div.waitingListContainer');
    }

    get waitlistCards() {
        return this.waitlistContainer.locator('div.card');
    }

    getWaitlistCardByName(patientName) {
        return this.waitlistCards
            .filter({ hasText: patientName })
            .first();
    }

    // Status badge inside the appointment panel. The expected status comes
    // from the spec data and is matched case-insensitively on the rendered text.
    getAppointmentStatusBadge(expectedStatus) {
        return this.page
            .locator('app-appointment-details, app-patient-profile')
            .first()
            .getByText(new RegExp(expectedStatus, 'i'))
            .first();
    }

    // ===== SCHEDULE APPOINTMENT DIALOG - SLOT PICKER =====
    // Several copies of this dialog can be rendered at once (one per popup
    // host), and the last one in the DOM is the one stacked on top and
    // receiving pointer events - the earlier copies are covered by it. Every
    // locator below is anchored on that topmost visible copy.
    get scheduleModal() {
        return this.page
            .locator('div.schedule-modal:visible')
            .last();
    }

    get scheduleAvailableSlots() {
        return this.scheduleModal.locator(
            'div.slot-row.available span.slot-time'
        );
    }

    // A slot the user picked is marked with the 'selected' class. Without it
    // the Confirm schedule button does nothing.
    get scheduleSelectedSlot() {
        return this.scheduleModal.locator('div.slot-row.selected');
    }

    get scheduleNoSlotsMessage() {
        return this.scheduleModal.getByText(/no slots are ava/i);
    }

    // Morning / Afternoon / Evening segment toggles. The icon image sits on top
    // of its button and swallows the pointer events, so target the image.
    get scheduleDayPartToggles() {
        return this.scheduleModal.locator(
            'div.slot-icons-schedule button img'
        );
    }

    // Only future days are bookable - past days carry the 'past-day' class and
    // days from the neighbouring month carry 'greyed-out-day'.
    get scheduleSelectableDays() {
        return this.scheduleModal.locator(
            'div.calendar-day:not(.calendar-day-header)' +
            ':not(.greyed-out-day):not(.past-day)'
        );
    }

    get scheduleMonthHeading() {
        return this.scheduleModal.locator('div.calendar-header h3');
    }

    get scheduleNextMonthBtn() {
        return this.scheduleModal
            .locator('button.calendar-nav-btn')
            .last();
    }

    get confirmScheduleButton() {
        return this.page
            .getByRole('button', { name: /confirm schedule/i })
            .first();
    }

    // The heading text changing is the signal that the next month rendered.
    getScheduleMonthHeadingOtherThan(monthYear) {
        return this.scheduleModal
            .locator(
                `div.calendar-header h3:not(:text-is("${monthYear}"))`
            )
            .first();
    }

    // The payment form is open once its amount field is on screen.
    get paymentSection() {
        return this.amountInput;
    }

    // ===== DYNAMIC LOCATORS - METHODS =====

    // Payment History Row
    getPaymentHistoryRow(paymentType, amount) {
        return this.page
            .getByRole('row')
            .filter({ hasText: paymentType })
            .filter({ hasText: String(amount) })
            .last();
    }
 
    // Waitlist Card
    getWaitlistCard(patientName) {
        return this.page
            .locator('div')
            .filter({ hasText: patientName })
            .filter({ has: this.page.getByRole('button', { name: 'Schedule' }) })
            .last();
    }
 
    // Schedule Button for Patient
    getScheduleButton(patientName) {
        return this.getWaitlistCard(patientName).getByRole('button', { name: 'Schedule' });
    }
 
    // Payment Method by Label (Cash, UPI, Card)
    getPaymentMethodByLabel(label) {
        return this.page.locator(`label:has-text('${label}')`);
    }
 
    // Generic Text Locator
    getTextLocator(text) {
        return this.page.locator(`text=${text}`);
    }
 
    // Payment Method by Value
    getPaymentMethodByValue(value) {
        return this.page.locator(`input[value='${value}']`);
    }
}
 
module.exports = { WaitlistPageLocators };
 