class PaymentLocator {

    constructor(page) {
        this.page = page;

        // Financials
        this.financialsTab = page.getByText(
            'Financials'
        );

        // Patient Profile
        this.patientProfile = (patientName) =>
            page.getByText(
                `Mr ${patientName}`
            ).nth(1);

        // Buttons
        this.makePaymentBtn = page.getByRole(
            'button',
            {
                name: 'Make Payment'
            }
        );

        this.recordPaymentBtn = page.getByRole(
            'button',
            {
                name: 'Record Payment'
            }
        );

        this.completePaymentBtn = page.getByRole(
            'button',
            {
                name: 'Complete Payment'
            }
        );

        this.recordDepositBtn = page.getByRole(
            'button',
            {
                name: 'Record Deposit'
            }
        );

        // Payment Types
        this.cashBtn = page.getByText(
            'Cash',
            {
                exact: true
            }
        );

        this.upiBtn = page.getByText(
            'UPI',
            {
                exact: true
            }
        );

        this.cardBtn = page.getByText(
            'Card',
            {
                exact: true
            }
        );

        this.walletBtn = page.getByText(
            'Wallet',
            {
                exact: true
            }
        );

        // Fields
        this.amountTxt = page.getByPlaceholder(
            '₹ Amount'
        );

        this.transactionIdTxt = page.getByRole(
            'textbox',
            {
                name: /Transaction ID/i
            }
        );

        // Success Message
        this.paymentSuccessMsg = page.getByText(
            /Payment Success|Payment Successful/i
        );

        // Loader
        this.loaderOverlay = page.locator(
            '.loader-overlay-generate'
        ).first();

        // Financial History
        this.totalPaidValue = page.locator(
            '(//div[@class="summary-value"])[1]'
        );

        this.totalUnpaidValue = page.locator(
            '(//div[@class="summary-value"])[2]'
        );

        this.remainingAmountValue = page.locator(
            "//th[contains(text(),'Remaining Amount')]/ancestor::table//tbody/tr[1]/td[4]"
        );

        this.totalAmountValue = page.locator(
            "//th[contains(text(),'Total Amount')]/ancestor::table//tbody/tr[1]/td[3]"
        );

        this.latestReceivedAmount = page.locator(
            "//th[contains(text(),'Received Amount')]/ancestor::table//tbody/tr[1]/td[4]"
        );

        this.latestPaymentMode = page.locator(
            "//th[contains(text(),'Payment Mode')]/ancestor::table//tbody/tr[1]/td[5]"
        );

        // Payment Verification
        this.totalPaidLabel = page.getByText(
            'Total Paid',
            {
                exact: true
            }
        );

        this.invoiceHistoryTab = page.getByText(
            'Invoice History',
            {
                exact: true
            }
        );

        // Financial History
        this.totalPaidValue = page.locator(
            '(//div[@class="summary-value"])[1]'
        );

        this.totalUnpaidValue = page.locator(
            '(//div[@class="summary-value"])[2]'
        );

        this.remainingAmountValue = page.locator(
            "//th[contains(text(),'Remaining Amount')]/ancestor::table//tbody/tr[1]/td[4]"
        );

        this.totalAmountValue = page.locator(
            "//th[contains(text(),'Total Amount')]/ancestor::table//tbody/tr[1]/td[3]"
        );

        // Payment Verification

        this.totalPaidLabelPayment = page.getByText(
            'Total Paid',
            {
                exact: true
            }
        );

        this.totalPaidValuePayment = page.locator(
            '(//div[@class="summary-value"])[1]'
        );

        this.invoiceHistoryTabPayment = page.getByText(
            'Invoice History',
            {
                exact: true
            }
        );

        this.totalAmountValuePayment = page.locator(
            "//th[contains(text(),'Total Amount')]/ancestor::table//tbody/tr[1]/td[3]"
        );

        this.remainingAmountValuePayment = page.locator(
            "//th[contains(text(),'Remaining Amount')]/ancestor::table//tbody/tr[1]/td[4]"
        );

        this.getTotalPaidCardPayment = () => {
            return this.totalPaidLabelPayment.locator(
                'xpath=../..'
            );
        };
    }


        getTotalPaidCard() {

            return this.totalPaidLabel.locator(
                'xpath=../..'
            );
        }
}

module.exports = { PaymentLocator };