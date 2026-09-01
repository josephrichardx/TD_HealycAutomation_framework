const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper.js');
const { WaitlistPageLocators } = require('../Locators/WaitlistPageLocators.js');
 
class WaitlistPage {
    constructor(page) {
        this.page = page;
        this.locators = new WaitlistPageLocators(page);
    }
 
    async clickHourglass() {
        await StepHelper.step(
            this.page,
            'Click Hourglass (Waitlist) icon on the first doctor card',
            async () => {
                await this.locators.hourglassIcon.click();
            }
        );
    }
 
    async clickProceed() {
        await StepHelper.step(
            this.page,
            'Click Proceed after hourglass selection',
            async () => {
                await this.locators.proceedButton.click();
            }
        );
    }
 
    async clickConfirmBooking() {
        await StepHelper.step(
            this.page,
            'Click Confirm Booking to add to waitlist',
            async () => {
                await this.locators.confirmBookingButton.click();
            }
        );
 
        await this.page.waitForLoadState('networkidle');
    }
 
    async clickWaitlist() {
        await StepHelper.step(
            this.page,
            'Click Waitlist from the left corner menu on Calendar page',
            async () => {
                await this.locators.waitlistMenuItem.click();
            }
        );
    }
 
    getWaitlistCard(patientName) {
        return this.locators.getWaitlistCard(patientName);
    }
 
    async navigateToWaitlistEntry(patientName, maxPages = 31) {
 
        const waitlistEntryLocator = this.getWaitlistCard(patientName);
 
        await StepHelper.step(
            this.page,
            `Navigate Calendar Until Waitlist Entry Found - ${patientName}`,
            async () => {
 
                for (let pageNumber = 0; pageNumber < maxPages; pageNumber++) {
 
                    if (await waitlistEntryLocator.isVisible().catch(() => false)) {
                        break;
                    }
 
                    await this.locators.calendarNavigationArrow.click();
                    await this.page.waitForTimeout(500);
                }
            }
        );
    }
 
    async verifyWaitlistEntry(patientName) {
        const waitlistEntryLocator = this.getWaitlistCard(patientName);
 
        let actualEntryText;
 
        await StepHelper.step(
            this.page,
            `Get Waitlist Entry - ${patientName}`,
            async () => {
                await waitlistEntryLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                actualEntryText = (
                    await waitlistEntryLocator.innerText()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Waitlist Entry Present | Expected: ${patientName} | Actual: ${actualEntryText}`,
            async () => {
                expect(actualEntryText).toContain(patientName);
            }
        );
    }
 
    async clickSchedule(patientName) {
        await StepHelper.step(
            this.page,
            `Click Schedule button for waitlist record: '${patientName}'`,
            async () => {
                await this.locators.getScheduleButton(patientName).click();
            }
        );
    }
 
 
    async selectFirstAvailableTimeSlot() {
        await StepHelper.step(
            this.page,
            'Select any available time slot from the schedule picker',
            async () => {
                const firstSlot = this.page
                    .locator('span.slot-time:visible')
                    .last();
 
                await firstSlot.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                await firstSlot.scrollIntoViewIfNeeded();
                await firstSlot.click({ force: true });
            }
        );
    }
 
    async clickConfirmSchedule() {
        await StepHelper.step(
            this.page,
            'Click Confirm Schedule button',
            async () => {
                await this.page
                    .getByRole('button', { name: /confirm schedule/i })
                    .first()
                    .click({ force: true });
            }
        );
        await this.page.waitForLoadState('networkidle');
    }
 
    async verifyPendingAppointment() {
 
        let actualStatusText;
 
        await StepHelper.step(
            this.page,
            'Get Appointment Status',
            async () => {
                await this.locators.pendingStatusLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                actualStatusText = (
                    await this.locators.pendingStatusLocator.innerText()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Appointment Status | Expected: Pending | Actual: ${actualStatusText}`,
            async () => {
                expect(actualStatusText).toContain('Pending');
            }
        );
    }
 
    async verifyInvoiceGenerated() {
 
        let actualInvoiceNumber;
 
        await StepHelper.step(
            this.page,
            'Get Generated Invoice Number',
            async () => {
                await this.locators.invoiceNumberLocator.waitFor({
                    state: 'visible',
                    timeout: 15000
                });
 
                actualInvoiceNumber = (
                    await this.locators.invoiceNumberLocator.innerText()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Invoice Generated | Expected: matches INV-00* | Actual: ${actualInvoiceNumber}`,
            async () => {
                expect(actualInvoiceNumber).toMatch(/^INV-00\d+$/);
            }
        );
 
        return actualInvoiceNumber;
    }
 
    async verifyInvoiceNameStartsWith(prefix) {
 
        let actualInvoiceText;
 
        await StepHelper.step(
            this.page,
            'Get Invoice Name',
            async () => {
                actualInvoiceText = (
                    await this.locators.invoiceNumberLocator.textContent()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Invoice Name Starts With | Expected: ${prefix} | Actual: ${actualInvoiceText}`,
            async () => {
                expect(actualInvoiceText).toContain(prefix);
            }
        );
    }
 
    async closeAppointmentDetails() {
        await StepHelper.step(
            this.page,
            'Close appointment details panel',
            async () => {
                await this.locators.calendarToggleButton.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
                await this.locators.calendarToggleButton.evaluate(button => button.click());
                await this.page.waitForURL(
                    url => url.pathname.includes('/dashboard'),
                    { timeout: 15000 }
                ).catch(() => {});
                await this.page.reload({ waitUntil: 'domcontentloaded' });
            }
        );
    }
 
    async openPaymentMenu() {
        await StepHelper.step(
            this.page,
            'Open Payment menu',
            async () => {
                if (await this.locators.paymentTabMenu.isVisible().catch(() => false)) {
                    await this.locators.paymentTabMenu.evaluate(tab => tab.click());
                }
            }
        );
    }
 
    async clickMakePaymentButton() {
        await StepHelper.step(
            this.page,
            'Click Make Payment button',
            async () => {
                await this.locators.makePaymentButton.waitFor({
                    state: 'visible',
                    timeout: 60000
                });
                await this.locators.makePaymentButton.evaluate(button => button.click());
            }
        );
    }
 
    async verifyPaymentPageOpened() {
        await StepHelper.step(
            this.page,
            'Verify payment page is opened',
            async () => {
                console.log("✓ NEW: Verifying payment page opened...");
                await this.page.waitForTimeout(1500);
               
                // Check for payment modal by multiple selectors
                const paymentModal = this.page
                    .locator("//div[contains(@class, 'payment')] | //div[contains(@class, 'modal')] | //text()[contains(., 'Payment')]/..")
                    .first();
               
                await paymentModal.waitFor({ state: 'visible', timeout: 5000 }).catch(async () => {
                    // Alternative check - if payment text is visible
                    const paymentText = this.page.locator("text=/Payment/i").first();
                    await expect(paymentText).toBeVisible({ timeout: 5000 });
                });
               
                console.log("✓ NEW: Payment page is open");
            }
        );
    }
 
    async selectPaymentMethod(methodName) {
        await StepHelper.step(
            this.page,
            `Select payment method: ${methodName}`,
            async () => {
                console.log(`✓ NEW: Selecting payment method: ${methodName}`);
                const element = this.locators.getPaymentMethodByLabel(methodName);
                if (await element.isVisible()) {
                    await element.click();
                    await this.page.waitForTimeout(800);
                    console.log(`✓ NEW: Payment method '${methodName}' selected`);
                }
            }
        );
    }
 
    async recordConfiguredPayment(paymentData) {
        const paymentType = paymentData.paymentType;
 
        // Payment method already selected by selectPaymentMethod()
        // Only handle transaction ID and amount input
 
        if (paymentType === 'UPI' || paymentType === 'Card') {
            await StepHelper.step(
                this.page,
                'Enter transaction ID',
                async () => {
                    await this.locators.transactionIdInput.fill(paymentData.transactionId);
                }
            );
        }
 
        await StepHelper.step(
            this.page,
            `Enter payment amount - ${paymentData.amount}`,
            async () => {
                await this.locators.amountInput.fill(String(paymentData.amount));
            }
        );
 
        await this.recordCurrentPayment();
    }
 
    async recordCurrentPayment() {
        await StepHelper.step(
            this.page,
            'Record payment',
            async () => {
                await this.locators.recordPaymentButton.evaluate(button => button.click());
            }
        );
    }
 
    async enterCashAmount(amount) {
        await StepHelper.step(
            this.page,
            `Enter cash amount: ${amount}`,
            async () => {
                console.log(`✓ NEW: Entering cash amount: ${amount}`);
                await this.locators.amountInput.scrollIntoViewIfNeeded();
                await this.locators.amountInput.click();
                await this.locators.amountInput.clear();
                await this.locators.amountInput.fill(amount.toString());
                await this.page.waitForTimeout(500);
                console.log(`✓ NEW: Cash amount '${amount}' entered`);
            }
        );
    }
 
    async enterCardAmount(amount) {
        await StepHelper.step(
            this.page,
            `Enter card amount: ${amount}`,
            async () => {
                console.log(`✓ NEW: Entering card amount: ${amount}`);
                await this.locators.amountInput.scrollIntoViewIfNeeded();
                await this.locators.amountInput.click();
                await this.locators.amountInput.clear();
                await this.locators.amountInput.fill(amount.toString());
                await this.page.waitForTimeout(500);
                console.log(`✓ NEW: Card amount '${amount}' entered`);
            }
        );
    }
 
    async enterUPITransactionId(transactionId) {
        await StepHelper.step(
            this.page,
            `Enter UPI transaction ID: ${transactionId}`,
            async () => {
                console.log(`✓ NEW: Entering UPI transaction ID: ${transactionId}`);
                await this.locators.transactionIdInput.scrollIntoViewIfNeeded();
                await this.locators.transactionIdInput.click();
                await this.locators.transactionIdInput.clear();
                await this.locators.transactionIdInput.fill(transactionId);
                await this.page.waitForTimeout(500);
                console.log(`✓ NEW: UPI transaction ID '${transactionId}' entered`);
            }
        );
    }
 
    async verifyPaymentRecordedSuccessfully() {
 
        let actualMessage;
 
        await StepHelper.step(
            this.page,
            'Get Payment Success Message',
            async () => {
                await this.locators.paymentSuccessMessage.waitFor({
                    state: 'visible',
                    timeout: 10000
                });
 
                actualMessage = (
                    await this.locators.paymentSuccessMessage.innerText()
                ).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Payment Recorded Successfully | Expected: Payment recorded successfully | Actual: ${actualMessage}`,
            async () => {
                expect(actualMessage).toContain(
                    'Payment recorded successfully'
                );
            }
        );
    }
 
    async verifyPaymentHistory(amount, paymentType) {
        const paymentHistoryRow = this.locators.getPaymentHistoryRow(paymentType, amount);
 
        await StepHelper.step(
            this.page,
            `Verify payment history amount ${amount} and method ${paymentType}`,
            async () => {
                await expect(paymentHistoryRow).toBeVisible({
                    timeout: 15000
                });
                await expect(paymentHistoryRow).toContainText(paymentType, {
                    timeout: 15000
                });
                await expect(paymentHistoryRow).toContainText(String(amount), {
                    timeout: 15000
                });
            }
        );
    }
 
    async verifyPaymentMethodInHistory(paymentMethod) {
 
        let actualMethodText;
 
        await StepHelper.step(
            this.page,
            'Get Payment Method From History',
            async () => {
                await this.page.waitForTimeout(1000);
                const methodText = this.locators.getTextLocator(paymentMethod).first();
                await methodText.waitFor({ state: 'visible', timeout: 5000 });
                actualMethodText = (await methodText.innerText()).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Payment Method In History | Expected: ${paymentMethod} | Actual: ${actualMethodText}`,
            async () => {
                expect(actualMethodText).toBe(paymentMethod);
            }
        );
    }
 
    async verifyPaymentAmountInHistory(amount) {
 
        const historyAmount = String(amount).replace(/\.00$/, '');
        let actualAmountText;
 
        await StepHelper.step(
            this.page,
            'Get Payment Amount From History',
            async () => {
                await this.page.waitForTimeout(500);
                const amountText = this.locators.getTextLocator(historyAmount).first();
                await amountText.waitFor({ state: 'visible', timeout: 5000 });
                actualAmountText = (await amountText.innerText()).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Payment Amount In History | Expected: ${historyAmount} | Actual: ${actualAmountText}`,
            async () => {
                expect(actualAmountText).toBe(historyAmount);
            }
        );
    }
 
    async enableFullPayment() {
        let fullPaymentAmount;
 
        await StepHelper.step(
            this.page,
            'Select Make full payment',
            async () => {
                console.log("✓ NEW: Enabling full payment...");
                await this.locators.fullPaymentCheckbox.check();
                await this.page.waitForTimeout(1000);
                console.log("✓ NEW: Full payment enabled");
            }
        );
 
        await StepHelper.step(
            this.page,
            'Extract full payment amount',
            async () => {
                await expect(this.locators.fullPaymentAmountInput).toHaveValue(/\S+/, { timeout: 10000 });
                fullPaymentAmount = await this.locators.fullPaymentAmountInput.inputValue();
                console.log(`✓ NEW: Full payment amount extracted: ${fullPaymentAmount}`);
            }
        );
 
        return fullPaymentAmount;
    }
 
    async verifyFullPaymentAmountDisplayed(amount) {
 
        let actualAmountText;
 
        await StepHelper.step(
            this.page,
            'Get Full Payment Amount Displayed',
            async () => {
                await this.page.waitForTimeout(500);
                const fullPaymentAmount = this.locators.getTextLocator(amount).first();
                await fullPaymentAmount.waitFor({ state: 'visible', timeout: 5000 });
                actualAmountText = (await fullPaymentAmount.innerText()).trim();
            }
        );
 
        await StepHelper.step(
            this.page,
            `Verify Full Payment Amount Displayed | Expected: ${amount} | Actual: ${actualAmountText}`,
            async () => {
                expect(actualAmountText).toBe(String(amount));
            }
        );
    }
 
}
 
module.exports = { WaitlistPage };
 