const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { Keywords } = require('../utils/Keywords.js');
const { Verify } = require('../utils/verification.js');
const { WaitlistPageLocators } = require('../Locators/WaitlistPageLocators.js');
const {
    appointmentActionData
} = require('../testdata/appointmentData.json');
const { waitData } = require('../testdata/waitData.json');


function normalizeCurrencyValue(value) {

    const cleaned = String(value ?? '').replace(/[₹,\s]/g, '');

    return Number(cleaned || 0);
}


class WaitlistPage {

    constructor(page) {

        this.page = page;

        this.locators = new WaitlistPageLocators(page);

        this.keywords = new Keywords();
    }


    // ---------------------------------------------------------------
    // WAITLIST BOOKING
    // ---------------------------------------------------------------

    async clickHourglass() {

        await this.keywords.waitForElement(this.locators.hourglassIcon);

        await Verify.state(
            this.page,
            'Hourglass (Waitlist) icon is displayed',
            this.locators.hourglassIcon,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Hourglass (Waitlist) icon on the first doctor card',
            async () => {
                await this.keywords.click(this.locators.hourglassIcon);
            }
        );
    }


    async clickProceed() {

        await StepHelper.step(
            this.page,
            'Click Proceed after hourglass selection',
            async () => {
                await this.keywords.click(this.locators.proceedButton);
            }
        );
    }


    async clickConfirmBooking() {

        await StepHelper.step(
            this.page,
            'Click Confirm Booking to add to waitlist',
            async () => {
                await this.keywords.click(
                    this.locators.confirmBookingButton
                );
            }
        );

        await this.page.waitForLoadState('networkidle');
    }


    async clickWaitlist() {

        await StepHelper.step(
            this.page,
            'Click Waitlist from the left corner menu on Calendar page',
            async () => {
                await this.keywords.click(
                    this.locators.waitlistMenuItem
                );
            }
        );
    }


    getWaitlistCard(patientName) {

        return this.locators.getWaitlistCard(patientName);
    }


    // The Waitlist tab keeps every card for the selected date in the DOM inside
    // a scrollable container, so the card only has to be scrolled into view -
    // no manual paging. Waiting for the list to populate first matters when the
    // app is under load, otherwise the scan runs against an empty list.
    async findWaitlistEntry(patientName) {

        const card = this.locators.getWaitlistCardByName(patientName);

        await StepHelper.step(
            this.page,
            `Find Waitlist Entry - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(
                    this.locators.waitlistContainer
                );

                // The list is populated once its first card exists.
                await this.locators.waitlistCards
                    .first()
                    .waitFor({ state: 'attached' });

                // Every card for the date is in the DOM, so wait for this
                // patient's card and bring it into view.
                await card.waitFor({ state: 'attached' });

                await this.keywords.scrollIntoViewIfNeeded(card);

                console.log(
                    `Waitlist entry found: ${patientName}`
                );
            }
        );

        return card;
    }


    // Kept for callers that page through the calendar rather than the list.
    async navigateToWaitlistEntry(patientName, maxPages = 31) {

        const waitlistEntryLocator = this.getWaitlistCard(patientName);

        await StepHelper.step(
            this.page,
            `Navigate Calendar Until Waitlist Entry Found - ${patientName}`,
            async () => {

                for (let pageNumber = 0; pageNumber < maxPages; pageNumber++) {

                    if (
                        await waitlistEntryLocator
                            .isVisible()
                            .catch(() => false)
                    ) {
                        break;
                    }

                    await this.keywords.click(
                        this.locators.calendarNavigationArrow
                    );

                    await this.keywords.wait(
                        this.page,
                        waitData.shortWait
                    );
                }
            }
        );
    }


    // `verification` is the { step } block from the calling spec's own data
    // file (waitlistVerificationData.waitlistEntry).
    async verifyWaitlistEntry(patientName, verification) {

        const waitlistEntryLocator =
            this.locators.getWaitlistCardByName(patientName);

        let actualEntryText;

        await StepHelper.step(
            this.page,
            `Get Waitlist Entry - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(waitlistEntryLocator);

                actualEntryText = (
                    await this.keywords.getText(waitlistEntryLocator)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Waitlist Entry - ${patientName} is displayed`,
            waitlistEntryLocator,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            `${verification.step} - ${patientName}`,
            patientName,
            actualEntryText
        );
    }


    async clickSchedule(patientName) {

        const scheduleButton =
            this.locators.getScheduleButton(patientName);

        await this.keywords.waitForElement(scheduleButton);

        await Verify.state(
            this.page,
            `Schedule button for waitlist record - ${patientName}`,
            scheduleButton,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click Schedule button for waitlist record: '${patientName}'`,
            async () => {
                await this.keywords.click(scheduleButton);
            }
        );
    }


    // ---------------------------------------------------------------
    // SCHEDULE APPOINTMENT DIALOG - SLOT SELECTION
    // ---------------------------------------------------------------
    // The dialog loads its slot list asynchronously and can land on any of the
    // Morning / Afternoon / Evening segments, so wait for the list (or the
    // "No slots are avaiable for this duration" message) instead of sleeping.
    async waitForScheduleSlotsToSettle() {

        const slots = this.locators.scheduleAvailableSlots;

        const noSlots = this.locators.scheduleNoSlotsMessage;

        await Promise.race([

            slots
                .first()
                .waitFor({ state: 'visible' })
                .catch(() => {}),

            noSlots
                .first()
                .waitFor({ state: 'visible' })
                .catch(() => {})
        ]);
    }


    // Clicks the first available slot in the segment currently shown, falling
    // back to the other Morning / Afternoon / Evening segments.
    // Returns the selected slot text, or null when the date has no slots.
    async tryPickSlotInAnyDayPart() {

        const slots = this.locators.scheduleAvailableSlots;

        const toggles = this.locators.scheduleDayPartToggles;

        const toggleCount = await toggles.count().catch(() => 0);

        // Segment the dialog opened on first, then each segment in turn.
        for (let index = -1; index < toggleCount; index++) {

            if (index >= 0) {

                await this.keywords.click(toggles.nth(index));
            }

            await this.waitForScheduleSlotsToSettle();

            const slotCount = await slots.count().catch(() => 0);

            if (slotCount === 0) {
                continue;
            }

            // The dialog re-renders its slot list while the app fetches
            // availability, so a slot resolved a moment ago can detach before
            // it is clicked. Re-resolve and retry on that specific failure.
            for (let attempt = 0; attempt < 3; attempt++) {

                try {

                    const slot = slots.first();

                    const slotText = (
                        await this.keywords.getText(slot)
                    ).trim();

                    await this.keywords.forceClick(slot);

                    // The click only counts once the row is marked selected.
                    // The list can re-render mid-click and drop the selection,
                    // which leaves Confirm schedule doing nothing at all.
                    await this.locators.scheduleSelectedSlot
                        .first()
                        .waitFor({
                            state: 'visible',
                            timeout: waitData.selectionConfirm
                        });

                    console.log(
                        `Time slot selected: ${slotText}`
                    );

                    return slotText || 'slot';

                } catch (error) {

                    const isRetryable =
                        /not attached|not stable|detached|timeout/i
                            .test(error.message || '');

                    if (!isRetryable || attempt === 2) {
                        throw error;
                    }

                    console.log(
                        'Slot list re-rendered while selecting - retrying'
                    );

                    await this.keywords.wait(
                        this.page,
                        waitData.shortWait
                    );
                }
            }
        }

        return null;
    }


    async selectFirstAvailableTimeSlot() {

        await StepHelper.step(
            this.page,
            'Select any available time slot from the schedule picker',
            async () => {

                const slots = this.locators.scheduleAvailableSlots;

                await this.keywords.waitForElement(slots.last());

                const slot = slots.last();

                await this.keywords.scrollIntoViewIfNeeded(slot);

                await this.keywords.forceClick(slot);
            }
        );
    }


    async selectAnyAvailableTimeSlot() {

        let selectedSlotText;

        await StepHelper.step(
            this.page,
            'Select any available time slot across Morning/Afternoon/Evening',
            async () => {

                selectedSlotText = await this.tryPickSlotInAnyDayPart();

                if (!selectedSlotText) {

                    throw new Error(
                        'No time slots are available in the Morning, Afternoon or Evening segments for the selected date.'
                    );
                }
            }
        );

        return selectedSlotText;
    }


    // A waitlisted booking exists precisely because its own date had no free
    // slot, so the dialog can open on a date with nothing to pick, and every
    // day of the current month can already be in the past. This tries the
    // date the dialog opens on, then each bookable day of the month, then the
    // following months.
    // Returns { slot, day, monthYear } so the caller knows which date to open
    // on the calendar afterwards (day is null when the date the dialog opened
    // on was used as-is).
    async selectFirstAvailableSlotAcrossDates(monthsToScan = 3) {

        let selectedSlotText = null;

        let selectedDayText = null;

        let selectedMonthYear = null;

        await StepHelper.step(
            this.page,
            'Select the first available time slot in the schedule dialog',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.scheduleModal
                );

                const monthHeading =
                    this.locators.scheduleMonthHeading;

                // 1 - the date the dialog opened on.
                selectedSlotText = await this.tryPickSlotInAnyDayPart();

                if (selectedSlotText) {

                    selectedMonthYear = (
                        await this.keywords.getText(monthHeading)
                    ).trim();

                    return;
                }

                // 2 - every bookable day, month by month.
                for (let month = 0; month < monthsToScan; month++) {

                    const monthYear = (
                        await this.keywords.getText(monthHeading)
                    ).trim();

                    const days =
                        this.locators.scheduleSelectableDays;

                    const dayCount = await days.count().catch(() => 0);

                    console.log(
                        `${monthYear}: ${dayCount} bookable day(s)`
                    );

                    for (let index = 0; index < dayCount; index++) {

                        const day = days.nth(index);

                        const dayText = (
                            await this.keywords.getText(day)
                        ).trim();

                        await this.keywords.click(day);

                        selectedSlotText =
                            await this.tryPickSlotInAnyDayPart();

                        if (selectedSlotText) {

                            selectedDayText = dayText;

                            selectedMonthYear = monthYear;

                            console.log(
                                `Slot found on ${dayText} ${monthYear}: ${selectedSlotText}`
                            );

                            return;
                        }

                        console.log(
                            `No slots on ${dayText} ${monthYear}`
                        );
                    }

                    if (month === monthsToScan - 1) {
                        break;
                    }

                    await this.keywords.click(
                        this.locators.scheduleNextMonthBtn
                    );

                    // The heading text changing is the signal that the next
                    // month has rendered.
                    await this.locators
                        .getScheduleMonthHeadingOtherThan(monthYear)
                        .waitFor({ state: 'visible' });
                }

                throw new Error(
                    `No time slots are available on any bookable date within the next ${monthsToScan} month(s) of the schedule dialog.`
                );
            }
        );

        return {
            slot: selectedSlotText,
            day: selectedDayText,
            monthYear: selectedMonthYear
        };
    }


    async clickConfirmSchedule() {

        await StepHelper.step(
            this.page,
            'Click Confirm Schedule button',
            async () => {
                await this.keywords.forceClick(
                    this.locators.confirmScheduleButton
                );
            }
        );

        await this.page.waitForLoadState('networkidle');

        // The dialog animates out after confirming and keeps intercepting
        // pointer events until it is gone, which blocks the next calendar
        // click. Wait for it to disappear instead of assuming it has.
        await StepHelper.step(
            this.page,
            'Wait For Schedule Dialog To Close',
            async () => {
                await this.locators.scheduleModal.waitFor({
                    state: 'hidden'
                });
            }
        );
    }


    // ---------------------------------------------------------------
    // APPOINTMENT / INVOICE VERIFICATION
    // ---------------------------------------------------------------

    // Reads whatever status the appointment panel rendered at runtime and
    // compares it with the expected status held in the calling spec's own data
    // file. `verification` = { step, expectedStatus }.
    async verifyAppointmentStatus(verification) {

        const statusBadge = this.locators.getAppointmentStatusBadge(
            verification.expectedStatus
        );

        let actualStatusText;

        await StepHelper.step(
            this.page,
            `Get Appointment Status - ${verification.expectedStatus}`,
            async () => {

                actualStatusText = (
                    await this.keywords.getText(statusBadge)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Appointment status badge is displayed',
            statusBadge,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            verification.step,
            verification.expectedStatus,
            actualStatusText
        );

        return actualStatusText;
    }


    // `verification` = { step, expectedStatus } from the calling spec's data.
    async verifyPendingAppointment(verification) {

        const statusLocator = this.locators.pendingStatusLocator;

        let actualStatusText;

        await StepHelper.step(
            this.page,
            'Get Appointment Status',
            async () => {

                await this.keywords.waitForElement(statusLocator);

                actualStatusText = (
                    await this.keywords.getText(statusLocator)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Appointment status badge is displayed',
            statusLocator,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            verification.step,
            verification.expectedStatus,
            actualStatusText
        );
    }


    // `verification` = { step, expectedPattern } from the calling spec's data.
    async verifyInvoiceGenerated(verification) {

        const invoiceLocator = this.locators.invoiceNumberLocator;

        let actualInvoiceNumber;

        await StepHelper.step(
            this.page,
            'Get Generated Invoice Number',
            async () => {

                await this.keywords.waitForElement(invoiceLocator);

                actualInvoiceNumber = (
                    await this.keywords.getText(invoiceLocator)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Generated invoice number is displayed',
            invoiceLocator,
            { visible: true, soft: false }
        );

        await Verify.matches(
            this.page,
            verification.step,
            new RegExp(verification.expectedPattern),
            actualInvoiceNumber
        );

        return actualInvoiceNumber;
    }


    // `verification` = { step, expectedPrefix } from the calling spec's data.
    async verifyInvoiceNameStartsWith(verification) {

        const expectedPrefix = verification.expectedPrefix;

        const invoiceLocator = this.locators.invoiceNumberLocator;

        let actualInvoiceText;

        await StepHelper.step(
            this.page,
            'Get Invoice Name',
            async () => {

                actualInvoiceText = (
                    await this.keywords.getTextContent(invoiceLocator)
                ).trim();
            }
        );

        await Verify.contains(
            this.page,
            `${verification.step} - ${expectedPrefix}`,
            expectedPrefix,
            actualInvoiceText
        );
    }


    async closeAppointmentDetails() {

        await StepHelper.step(
            this.page,
            'Close appointment details panel',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.calendarToggleButton
                );

                await this.keywords.forceClick(
                    this.locators.calendarToggleButton
                );

                await this.page
                    .waitForURL(
                        (url) => url.pathname.includes(
                            appointmentActionData.dashboardPath
                        )
                    )
                    .catch(() => {});

                await this.page.reload({
                    waitUntil: 'domcontentloaded'
                });
            }
        );
    }


    // ---------------------------------------------------------------
    // PAYMENT
    // ---------------------------------------------------------------

    async openPaymentMenu() {

        await StepHelper.step(
            this.page,
            'Open Payment menu',
            async () => {

                const isPaymentTabVisible = await this.locators
                    .paymentTabMenu
                    .isVisible()
                    .catch(() => false);

                if (isPaymentTabVisible) {

                    await this.keywords.forceClick(
                        this.locators.paymentTabMenu
                    );
                }
            }
        );
    }


    async clickMakePaymentButton() {

        await StepHelper.step(
            this.page,
            'Click Make Payment button',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.makePaymentButton
                );

                await this.keywords.forceClick(
                    this.locators.makePaymentButton
                );
            }
        );
    }


    // `verification` = { step } from the calling spec's data.
    async verifyPaymentPageOpened(verification) {

        await StepHelper.step(
            this.page,
            'Wait For Payment Section',
            async () => {
                await this.keywords.waitForElement(
                    this.locators.paymentSection
                );
            }
        );

        await Verify.state(
            this.page,
            `${verification.step} - payment section is displayed`,
            this.locators.paymentSection,
            { visible: true, soft: false }
        );
    }


    async selectPaymentMethod(methodName) {

        const methodLocator =
            this.locators.getPaymentMethodByLabel(methodName);

        let selected = false;

        await StepHelper.step(
            this.page,
            `Select payment method: ${methodName}`,
            async () => {

                // The payment form does not always render a method selector -
                // when only one method applies it is pre-selected and no
                // control is drawn. Treat it as optional (the original
                // behaviour) but record which case happened, so the report
                // shows whether the method was actively selected.
                const isMethodPresent =
                    (await methodLocator.count().catch(() => 0)) > 0;

                if (!isMethodPresent) {

                    selected = false;
                    return;
                }

                await this.keywords.waitForElement(methodLocator);

                await this.keywords.click(methodLocator);

                selected = true;
            }
        );

        if (selected) {

            await Verify.state(
                this.page,
                `Payment method - ${methodName} is displayed`,
                methodLocator,
                { visible: true, soft: false }
            );

        } else {

            await Verify.record(
                this.page,
                `Payment Method Selector - ${methodName}`,
                'not rendered on the payment form - pre-selected method used'
            );
        }

        return selected;
    }


    async recordConfiguredPayment(paymentData) {

        const paymentType = paymentData.paymentType;

        // Which methods need a transaction ID comes from the spec's own
        // paymentData block.
        const needsTransactionId =
            (paymentData.transactionIdRequiredFor || []).includes(
                paymentType
            );

        if (needsTransactionId) {

            await StepHelper.step(
                this.page,
                'Enter transaction ID',
                async () => {
                    await this.keywords.fill(
                        this.locators.transactionIdInput,
                        paymentData.transactionId
                    );
                }
            );
        }

        await StepHelper.step(
            this.page,
            `Enter payment amount - ${paymentData.amount}`,
            async () => {
                await this.keywords.fill(
                    this.locators.amountInput,
                    String(paymentData.amount)
                );
            }
        );

        await this.recordCurrentPayment();
    }


    async recordCurrentPayment() {

        await StepHelper.step(
            this.page,
            'Record payment',
            async () => {
                await this.keywords.forceClick(
                    this.locators.recordPaymentButton
                );
            }
        );
    }


    async enterCashAmount(amount) {

        await StepHelper.step(
            this.page,
            `Enter cash amount: ${amount}`,
            async () => {

                await this.keywords.scrollIntoViewIfNeeded(
                    this.locators.amountInput
                );

                await this.keywords.click(this.locators.amountInput);

                await this.keywords.clear(this.locators.amountInput);

                await this.keywords.fill(
                    this.locators.amountInput,
                    amount.toString()
                );
            }
        );
    }


    async enterCardAmount(amount) {

        await StepHelper.step(
            this.page,
            `Enter card amount: ${amount}`,
            async () => {

                await this.keywords.scrollIntoViewIfNeeded(
                    this.locators.amountInput
                );

                await this.keywords.click(this.locators.amountInput);

                await this.keywords.clear(this.locators.amountInput);

                await this.keywords.fill(
                    this.locators.amountInput,
                    amount.toString()
                );
            }
        );
    }


    async enterUPITransactionId(transactionId) {

        await StepHelper.step(
            this.page,
            `Enter UPI transaction ID: ${transactionId}`,
            async () => {

                await this.keywords.scrollIntoViewIfNeeded(
                    this.locators.transactionIdInput
                );

                await this.keywords.click(
                    this.locators.transactionIdInput
                );

                await this.keywords.clear(
                    this.locators.transactionIdInput
                );

                await this.keywords.fill(
                    this.locators.transactionIdInput,
                    transactionId
                );
            }
        );
    }


    // Captures the toaster message the application raises at runtime and
    // compares it with the expected message held in waitlistData.json.
    // Captures the toaster message the application raises at runtime and
    // compares it with the expected message held in the calling spec's data.
    // `verification` = { step, expectedMessage }.
    async verifyPaymentRecordedSuccessfully(verification) {

        const toaster = this.locators.paymentSuccessMessage.first();

        let actualMessage;

        await StepHelper.step(
            this.page,
            'Get Payment Success Message',
            async () => {

                actualMessage = (
                    await this.keywords.getText(toaster)
                ).trim();
            }
        );

        await Verify.contains(
            this.page,
            verification.step,
            verification.expectedMessage,
            actualMessage
        );

        return actualMessage;
    }


    async verifyPaymentHistory(amount, paymentType) {

        const paymentHistoryRow = this.locators.getPaymentHistoryRow(
            paymentType,
            amount
        );

        let actualRowText;

        await StepHelper.step(
            this.page,
            `Get Payment History Row - ${paymentType} / ${amount}`,
            async () => {

                await this.keywords.waitForElement(paymentHistoryRow);

                actualRowText = (
                    await this.keywords.getText(paymentHistoryRow)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Payment history row - ${paymentType} is displayed`,
            paymentHistoryRow,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            'Payment History Row - Method',
            paymentType,
            actualRowText
        );

        await Verify.contains(
            this.page,
            'Payment History Row - Amount',
            String(amount),
            actualRowText
        );
    }


    // `verification` = { step } from the calling spec's data.
    async verifyPaymentMethodInHistory(paymentMethod, verification) {

        const methodText = this.locators
            .getTextLocator(paymentMethod)
            .first();

        let actualMethodText;

        await StepHelper.step(
            this.page,
            'Get Payment Method From History',
            async () => {

                await this.keywords.waitForElement(methodText);

                actualMethodText = (
                    await this.keywords.getText(methodText)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Payment method in history - ${paymentMethod} is displayed`,
            methodText,
            { visible: true, soft: false }
        );

        await Verify.equals(
            this.page,
            `${verification.step} - ${paymentMethod}`,
            paymentMethod,
            actualMethodText
        );
    }


    // `verification` = { step } from the calling spec's data.
    async verifyPaymentAmountInHistory(amount, verification) {

        const historyAmount = String(amount).replace(/\.00$/, '');

        const amountText = this.locators
            .getTextLocator(historyAmount)
            .first();

        let actualAmountText;

        await StepHelper.step(
            this.page,
            'Get Payment Amount From History',
            async () => {

                await this.keywords.waitForElement(amountText);

                actualAmountText = (
                    await this.keywords.getText(amountText)
                ).trim();
            }
        );

        await Verify.equals(
            this.page,
            `${verification.step} - ${historyAmount}`,
            normalizeCurrencyValue(historyAmount),
            normalizeCurrencyValue(actualAmountText)
        );
    }


    async enableFullPayment() {

        let fullPaymentAmount;

        await StepHelper.step(
            this.page,
            'Select Make full payment',
            async () => {
                await this.keywords.check(
                    this.locators.fullPaymentCheckbox
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Extract full payment amount',
            async () => {

                // The field is populated by the application, so wait for a
                // non-empty value rather than a fixed delay. The timeout comes
                // from the expect config, not from this method.
                await expect(
                    this.locators.fullPaymentAmountInput
                ).toHaveValue(/\S+/);

                fullPaymentAmount = await this.locators
                    .fullPaymentAmountInput
                    .inputValue();

                console.log(
                    `Full payment amount extracted: ${fullPaymentAmount}`
                );
            }
        );

        return fullPaymentAmount;
    }


    // `verification` = { step } from the calling spec's data.
    async verifyFullPaymentAmountDisplayed(amount, verification) {

        const fullPaymentAmount = this.locators
            .getTextLocator(amount)
            .first();

        let actualAmountText;

        await StepHelper.step(
            this.page,
            'Get Full Payment Amount Displayed',
            async () => {

                await this.keywords.waitForElement(fullPaymentAmount);

                actualAmountText = (
                    await this.keywords.getText(fullPaymentAmount)
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Full payment amount - ${amount} is displayed`,
            fullPaymentAmount,
            { visible: true, soft: false }
        );

        await Verify.equals(
            this.page,
            `${verification.step} - ${amount}`,
            normalizeCurrencyValue(amount),
            normalizeCurrencyValue(actualAmountText)
        );
    }
}

module.exports = { WaitlistPage };
