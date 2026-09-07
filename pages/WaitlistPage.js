const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { Keywords } = require('../utils/Keywords.js');
const { Verify } = require('../utils/verification.js');
const {
    WaitlistPageLocators
} = require('../Locators/WaitlistPageLocators.js');

const {
    appointmentActionData
} = require('../testdata/appointmentData.json');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;


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

        await this.keywords.waitForElement(
            this.locators.hourglassIcon,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            'Hourglass (Waitlist) icon is displayed',
            this.locators.hourglassIcon,
            {
                visible: true,
                soft: false
            }
        );

        await StepHelper.step(
            this.page,
            'Click Hourglass (Waitlist) icon on the first doctor card',
            async () => {

                await this.keywords.click(
                    this.locators.hourglassIcon
                );
            }
        );
    }


    async clickProceed() {

        await StepHelper.step(
            this.page,
            'Click Proceed after hourglass selection',
            async () => {

                await this.keywords.click(
                    this.locators.proceedButton
                );
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

        await this.page.waitForLoadState(
            'networkidle',
            {
                timeout: timeout.navigationTimeout
            }
        );
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


    async findWaitlistEntry(patientName) {

        const card =
            this.locators.getWaitlistCardByName(patientName);

        await StepHelper.step(
            this.page,
            `Find Waitlist Entry - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(
                    this.locators.waitlistContainer,
                    timeout.elementTimeout
                );

                await this.locators.waitlistCards
                    .first()
                    .waitFor({
                        state: 'attached',
                        timeout: timeout.elementTimeout
                    });

                await card.waitFor({
                    state: 'attached',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.scrollIntoViewIfNeeded(card);

                console.log(
                    `Waitlist entry found: ${patientName}`
                );
            }
        );

        return card;
    }


    // Kept for callers that page through the calendar rather than the list.
    async navigateToWaitlistEntry(
        patientName,
        maxPages = 31
    ) {

        const waitlistEntryLocator =
            this.getWaitlistCard(patientName);

        await StepHelper.step(
            this.page,
            `Navigate Calendar Until Waitlist Entry Found - ${patientName}`,
            async () => {

                for (
                    let pageNumber = 0;
                    pageNumber < maxPages;
                    pageNumber++
                ) {

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

                    /*
                     * Fixed wait removed.
                     * Wait for the waitlist entry to become visible
                     * instead of sleeping for a fixed duration.
                     */
                    await waitlistEntryLocator
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        })
                        .catch(() => {});
                }
            }
        );
    }


    async verifyWaitlistEntry(patientName) {

        const step =
            'Verify Waitlist Entry Present';

        const waitlistEntryLocator =
            this.locators.getWaitlistCardByName(
                patientName
            );

        let actualEntryText;

        await StepHelper.step(
            this.page,
            `Get Waitlist Entry - ${patientName}`,
            async () => {

                await this.keywords.waitForElement(
                    waitlistEntryLocator,
                    timeout.elementTimeout
                );

                actualEntryText = (
                    await this.keywords.getText(
                        waitlistEntryLocator
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Waitlist Entry - ${patientName} is displayed`,
            waitlistEntryLocator,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.contains(
            this.page,
            `${step} - ${patientName}`,
            patientName,
            actualEntryText
        );
    }


    async clickSchedule(patientName) {

        const scheduleButton =
            this.locators.getScheduleButton(
                patientName
            );

        await this.keywords.waitForElement(
            scheduleButton,
            timeout.elementTimeout
        );

        await Verify.state(
            this.page,
            `Schedule button for waitlist record - ${patientName}`,
            scheduleButton,
            {
                visible: true,
                enabled: true,
                soft: false
            }
        );

        await StepHelper.step(
            this.page,
            `Click Schedule button for waitlist record: '${patientName}'`,
            async () => {

                await this.keywords.click(
                    scheduleButton
                );
            }
        );
    }


    // ---------------------------------------------------------------
    // SCHEDULE APPOINTMENT DIALOG - SLOT SELECTION
    // ---------------------------------------------------------------

    async waitForScheduleSlotsToSettle() {

        const slots =
            this.locators.scheduleAvailableSlots;

        const noSlots =
            this.locators.scheduleNoSlotsMessage;

        await Promise.race([

            slots
                .first()
                .waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                })
                .catch(() => {}),

            noSlots
                .first()
                .waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                })
                .catch(() => {})
        ]);
    }


    async tryPickSlotInAnyDayPart() {

        const slots =
            this.locators.scheduleAvailableSlots;

        const toggles =
            this.locators.scheduleDayPartToggles;

        const toggleCount =
            await toggles.count().catch(() => 0);

        for (
            let index = -1;
            index < toggleCount;
            index++
        ) {

            if (index >= 0) {

                await this.keywords.click(
                    toggles.nth(index)
                );
            }

            await this.waitForScheduleSlotsToSettle();

            const slotCount =
                await slots.count().catch(() => 0);

            if (slotCount === 0) {
                continue;
            }

            const maxAttempts = 5;

            for (
                let attempt = 0;
                attempt < maxAttempts;
                attempt++
            ) {

                const remainingSlots =
                    await slots.count().catch(() => 0);

                if (remainingSlots === 0) {
                    break;
                }

                try {

                    const slot = slots.first();

                    await slot.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const slotText = (
                        await this.keywords.getText(slot)
                    ).trim();

                    await this.keywords.forceClick(slot);

                    await this.locators.scheduleSelectedSlot
                        .first()
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.expectTimeout
                        });

                    console.log(
                        `Time slot selected: ${slotText}`
                    );

                    return slotText || 'slot';

                } catch (error) {

                    const isRetryable =
                        /not attached|not stable|detached|timeout/i
                            .test(
                                error.message || ''
                            );

                    if (!isRetryable) {
                        throw error;
                    }

                    if (attempt === maxAttempts - 1) {

                        console.log(
                            'Slot list kept re-rendering - giving up on this segment, trying next'
                        );

                        break;
                    }

                    console.log(
                        'Slot list re-rendered while selecting - retrying'
                    );

                    /*
                     * Fixed short wait removed.
                     * Re-resolve the slot and wait for it to become
                     * visible on the next retry.
                     */
                    await slots
                        .first()
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        })
                        .catch(() => {});
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

                const slots =
                    this.locators.scheduleAvailableSlots;

                await this.keywords.waitForElement(
                    slots.last(),
                    timeout.elementTimeout
                );

                const slot = slots.last();

                await this.keywords.scrollIntoViewIfNeeded(
                    slot
                );

                await this.keywords.forceClick(
                    slot
                );
            }
        );
    }


    async selectAnyAvailableTimeSlot() {

        let selectedSlotText;

        await StepHelper.step(
            this.page,
            'Select any available time slot across Morning/Afternoon/Evening',
            async () => {

                selectedSlotText =
                    await this.tryPickSlotInAnyDayPart();

                if (!selectedSlotText) {

                    throw new Error(
                        'No time slots are available in the Morning, Afternoon or Evening segments for the selected date.'
                    );
                }
            }
        );

        return selectedSlotText;
    }


    async selectFirstAvailableSlotAcrossDates(
        monthsToScan = 3
    ) {

        let selectedSlotText = null;
        let selectedDayText = null;
        let selectedMonthYear = null;

        await StepHelper.step(
            this.page,
            'Select the first available time slot in the schedule dialog',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.scheduleModal,
                    timeout.elementTimeout
                );

                const monthHeading =
                    this.locators.scheduleMonthHeading;

                for (
                    let month = 0;
                    month < monthsToScan;
                    month++
                ) {

                    const monthYear = (
                        await this.keywords.getText(
                            monthHeading
                        )
                    ).trim();

                    const days =
                        this.locators.scheduleSelectableDays;

                    const dayCount =
                        await days.count().catch(() => 0);

                    console.log(
                        `${monthYear}: ${dayCount} bookable day(s)`
                    );

                    for (
                        let index = 0;
                        index < dayCount;
                        index++
                    ) {

                        const day =
                            days.nth(index);

                        const dayText = (
                            await this.keywords.getText(day)
                        ).trim();

                        await this.keywords.click(day);

                        selectedSlotText =
                            await this.tryPickSlotInAnyDayPart();

                        if (selectedSlotText) {

                            selectedDayText =
                                dayText;

                            selectedMonthYear =
                                monthYear;

                            console.log(
                                `Slot found on ${dayText} ${monthYear}: ${selectedSlotText}`
                            );

                            return;
                        }

                        console.log(
                            `No slots on ${dayText} ${monthYear}`
                        );
                    }

                    if (
                        month === monthsToScan - 1
                    ) {
                        break;
                    }

                    await this.keywords.click(
                        this.locators.scheduleNextMonthBtn
                    );

                    await this.locators
                        .getScheduleMonthHeadingOtherThan(
                            monthYear
                        )
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        });
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

        await this.page.waitForLoadState(
            'networkidle',
            {
                timeout: timeout.navigationTimeout
            }
        );

        await StepHelper.step(
            this.page,
            'Wait For Schedule Dialog To Close',
            async () => {

                await this.locators.scheduleModal.waitFor({
                    state: 'hidden',
                    timeout: timeout.elementTimeout
                });
            }
        );
    }


    // ---------------------------------------------------------------
    // APPOINTMENT / INVOICE VERIFICATION
    // ---------------------------------------------------------------

    async verifyAppointmentStatus(verification) {

        const step =
            'Verify Appointment Status';

        const statusBadge =
            this.locators.getAppointmentStatusBadge(
                verification.expectedStatus
            );

        let actualStatusText;

        await StepHelper.step(
            this.page,
            `Get Appointment Status - ${verification.expectedStatus}`,
            async () => {

                await this.keywords.waitForElement(
                    statusBadge,
                    timeout.elementTimeout
                );

                actualStatusText = (
                    await this.keywords.getText(
                        statusBadge
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Appointment status badge is displayed',
            statusBadge,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.contains(
            this.page,
            step,
            verification.expectedStatus,
            actualStatusText
        );

        return actualStatusText;
    }


    async verifyPendingAppointment(verification) {

        const step =
            'Verify Pending Appointment';

        const statusLocator =
            this.locators.pendingStatusLocator;

        let actualStatusText;

        await StepHelper.step(
            this.page,
            'Get Appointment Status',
            async () => {

                await this.keywords.waitForElement(
                    statusLocator,
                    timeout.elementTimeout
                );

                actualStatusText = (
                    await this.keywords.getText(
                        statusLocator
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Appointment status badge is displayed',
            statusLocator,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.contains(
            this.page,
            step,
            verification.expectedStatus,
            actualStatusText
        );
    }


    async verifyInvoiceGenerated(verification) {

        const step =
            'Verify Invoice Generated';

        const invoiceLocator =
            this.locators.invoiceNumberLocator;

        let actualInvoiceNumber;

        await StepHelper.step(
            this.page,
            'Get Generated Invoice Number',
            async () => {

                await this.keywords.waitForElement(
                    invoiceLocator,
                    timeout.elementTimeout
                );

                actualInvoiceNumber = (
                    await this.keywords.getText(
                        invoiceLocator
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Generated invoice number is displayed',
            invoiceLocator,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.matches(
            this.page,
            step,
            new RegExp(
                verification.expectedPattern
            ),
            actualInvoiceNumber
        );

        return actualInvoiceNumber;
    }


    async verifyInvoiceNameStartsWith(
        verification
    ) {

        const step =
            'Verify Invoice Name Starts With';

        const expectedPrefix =
            verification.expectedPrefix;

        const invoiceLocator =
            this.locators.invoiceNumberLocator;

        let actualInvoiceText;

        await StepHelper.step(
            this.page,
            'Get Invoice Name',
            async () => {

                await this.keywords.waitForElement(
                    invoiceLocator,
                    timeout.elementTimeout
                );

                actualInvoiceText = (
                    await this.keywords.getText(
                        invoiceLocator
                    )
                ).trim();
            }
        );

        await Verify.contains(
            this.page,
            `${step} - ${expectedPrefix}`,
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
                    this.locators.calendarToggleButton,
                    timeout.elementTimeout
                );

                await this.keywords.forceClick(
                    this.locators.calendarToggleButton
                );

                await this.page
                    .waitForURL(
                        (url) =>
                            url.pathname.includes(
                                appointmentActionData.dashboardPath
                            ),
                        {
                            timeout: timeout.navigationTimeout
                        }
                    )
                    .catch(() => {});

                await this.page.reload({
                    waitUntil: 'domcontentloaded',
                    timeout: timeout.navigationTimeout
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

                const isPaymentTabVisible =
                    await this.locators
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
                    this.locators.makePaymentButton,
                    timeout.elementTimeout
                );

                await this.keywords.forceClick(
                    this.locators.makePaymentButton
                );
            }
        );
    }


    async verifyPaymentPageOpened() {

        const step =
            'Verify Payment Page Opened';

        await StepHelper.step(
            this.page,
            'Wait For Payment Section',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.paymentSection,
                    timeout.elementTimeout
                );
            }
        );

        await Verify.state(
            this.page,
            `${step} - payment section is displayed`,
            this.locators.paymentSection,
            {
                visible: true,
                soft: false
            }
        );
    }


    async selectPaymentMethod(methodName) {

        const methodLocator =
            this.locators.getPaymentMethodByLabel(
                methodName
            );

        let selected = false;

        await StepHelper.step(
            this.page,
            `Select payment method: ${methodName}`,
            async () => {

                const isMethodPresent =
                    (await methodLocator.count().catch(() => 0)) > 0;

                if (!isMethodPresent) {

                    selected = false;
                    return;
                }

                await this.keywords.waitForElement(
                    methodLocator,
                    timeout.elementTimeout
                );

                await this.keywords.click(
                    methodLocator
                );

                selected = true;
            }
        );

        if (selected) {

            await Verify.state(
                this.page,
                `Payment method - ${methodName} is displayed`,
                methodLocator,
                {
                    visible: true,
                    soft: false
                }
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


    async recordConfiguredPayment(
        paymentData
    ) {

        const paymentType =
            paymentData.paymentType;

        const needsTransactionId =
            (
                paymentData.transactionIdRequiredFor ||
                []
            ).includes(paymentType);

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

                await this.keywords.click(
                    this.locators.amountInput
                );

                await this.keywords.clear(
                    this.locators.amountInput
                );

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

                await this.keywords.click(
                    this.locators.amountInput
                );

                await this.keywords.clear(
                    this.locators.amountInput
                );

                await this.keywords.fill(
                    this.locators.amountInput,
                    amount.toString()
                );
            }
        );
    }


    async enterUPITransactionId(
        transactionId
    ) {

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


    async verifyPaymentRecordedSuccessfully(
        verification
    ) {

        const step =
            'Verify Payment Recorded Successfully';

        const toaster =
            this.locators.paymentSuccessMessage.first();

        let actualMessage;

        await StepHelper.step(
            this.page,
            'Get Payment Success Message',
            async () => {

                await toaster.waitFor({
                    state: 'visible',
                    timeout: timeout.expectTimeout
                });

                actualMessage = (
                    await this.keywords.getText(
                        toaster
                    )
                ).trim();
            }
        );

        await Verify.contains(
            this.page,
            step,
            verification.expectedMessage,
            actualMessage
        );

        return actualMessage;
    }


    async verifyPaymentHistory(
        amount,
        paymentType
    ) {

        const paymentHistoryRow =
            this.locators.getPaymentHistoryRow(
                paymentType,
                amount
            );

        let actualRowText;

        await StepHelper.step(
            this.page,
            `Get Payment History Row - ${paymentType} / ${amount}`,
            async () => {

                await this.keywords.waitForElement(
                    paymentHistoryRow,
                    timeout.elementTimeout
                );

                actualRowText = (
                    await this.keywords.getText(
                        paymentHistoryRow
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Payment history row - ${paymentType} is displayed`,
            paymentHistoryRow,
            {
                visible: true,
                soft: false
            }
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


    async verifyPaymentMethodInHistory(
        paymentMethod
    ) {

        const step =
            'Verify Payment Method In History';

        const methodText =
            this.locators
                .getTextLocator(paymentMethod)
                .first();

        let actualMethodText;

        await StepHelper.step(
            this.page,
            'Get Payment Method From History',
            async () => {

                await this.keywords.waitForElement(
                    methodText,
                    timeout.elementTimeout
                );

                actualMethodText = (
                    await this.keywords.getText(
                        methodText
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Payment method in history - ${paymentMethod} is displayed`,
            methodText,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.equals(
            this.page,
            `${step} - ${paymentMethod}`,
            paymentMethod,
            actualMethodText
        );
    }


    async verifyPaymentAmountInHistory(
        amount
    ) {

        const step =
            'Verify Payment Amount In History';

        const historyAmount =
            String(amount).replace(
                /\.00$/,
                ''
            );

        const amountText =
            this.locators
                .getTextLocator(historyAmount)
                .first();

        let actualAmountText;

        await StepHelper.step(
            this.page,
            'Get Payment Amount From History',
            async () => {

                await this.keywords.waitForElement(
                    amountText,
                    timeout.elementTimeout
                );

                actualAmountText = (
                    await this.keywords.getText(
                        amountText
                    )
                ).trim();
            }
        );

        await Verify.equals(
            this.page,
            `${step} - ${historyAmount}`,
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

                await expect(
                    this.locators.fullPaymentAmountInput
                ).toHaveValue(
                    /\S+/,
                    {
                        timeout: timeout.expectTimeout
                    }
                );

                fullPaymentAmount =
                    await this.locators
                        .fullPaymentAmountInput
                        .inputValue();

                console.log(
                    `Full payment amount extracted: ${fullPaymentAmount}`
                );
            }
        );

        return fullPaymentAmount;
    }


    async verifyFullPaymentAmountDisplayed(
        amount
    ) {

        const step =
            'Verify Full Payment Amount Displayed';

        const fullPaymentAmount =
            this.locators
                .getTextLocator(amount)
                .first();

        let actualAmountText;

        await StepHelper.step(
            this.page,
            'Get Full Payment Amount Displayed',
            async () => {

                await this.keywords.waitForElement(
                    fullPaymentAmount,
                    timeout.elementTimeout
                );

                actualAmountText = (
                    await this.keywords.getText(
                        fullPaymentAmount
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            `Full payment amount - ${amount} is displayed`,
            fullPaymentAmount,
            {
                visible: true,
                soft: false
            }
        );

        await Verify.equals(
            this.page,
            `${step} - ${amount}`,
            normalizeCurrencyValue(amount),
            normalizeCurrencyValue(actualAmountText)
        );
    }
}

module.exports = {
    WaitlistPage
};