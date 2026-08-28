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
 
    get paymentSuccessMessage() {
        return this.page.getByText('Payment recorded successfully', { exact: true });
    }
 
    get fullPaymentCheckbox() {
        return this.page.getByLabel('Make full payment').last();
    }
 
    get fullPaymentAmountInput() {
        return this.page.getByPlaceholder('₹ Amount').last();
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
 