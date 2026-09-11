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

        // this.makePaymentBtn = page.getByRole('button', {
        //     name: 'Make payment'
        // }).first();

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

        // Payment History
        this.paymentHistoryRow =
        page.locator('table tbody tr').last();

            // Payment History
        this.paymentHistoryTab = page.getByText(
            'Payment History',
            {
                exact: true
            }
        );

        this.latestReceivedAmount = page.locator(
            "//div[contains(@class,'financials-table-wrapper')]//table//tbody/tr[1]/td[4]"
        );

        this.latestPaymentMode = page.locator(
            "//div[contains(@class,'financials-table-wrapper')]//table//tbody/tr[1]/td[5]//span[not(contains(@class,'transaction-id'))]"
        );

        this.makePaymentActionBtn = page.locator(
            ".make-payment-btn"
        );

        this.amountInput = page.getByPlaceholder(
            "₹ Amount"
        );

        this.paymentSuccessMessage = page.locator(
            "app-custom-toaster-message"
        );

        this.appointmentPaymentDueStatus =
            page.locator(
            "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//span[contains(@class,'status-chip')]"
        ).first();

        this.appointmentPaymentDue =
            page.locator(
                "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

         this.appointmentPaidAmount =
            page.locator(
                "//app-appointment-details//*[normalize-space()='Paid amount']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

        this.appointmentTotalAmount =
            page.locator(
            "//app-appointment-details//*[normalize-space()='Total amount']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

        this.appointmentPaymentHistoryRows =
            page.locator(
            'div.payment-history table tbody tr'
        );
        this.paymentHistoryViewReceiptIcon = (row) =>
            row.locator('i.fa-eye[title="View Receipt"]');

         this.pdfBody =
                    page.locator('body');
                this.viewInvoiceBtn = page.locator(
                '.fa-regular.fa-eye'
            );

        this.receiptPaymentNumberPdf = this.pdfBody.getByText(
            /^\d{6}$/
        ).first();

        this.closePdfPreviewBtn =
            page.locator(
                '.btn-close-preview'
        );

        this.receiptAmountReceivedPdf = (amount) =>
            this.pdfBody.getByText(
                parseFloat(amount).toFixed(2)
        ).first();

        this.receiptPaymentModePdf = (mode) =>
            this.pdfBody.getByText(mode, { exact: true }).first();
                this.receiptAmountReceivedPdf = (amount) =>
            this.pdfBody.getByText(
                parseFloat(amount).toFixed(2)
        ).first();
    
        this.receiptInvoiceNumberPdf = (invoiceNumber) =>
        this.pdfBody.getByText(invoiceNumber).first();

        this.appointmentInvoiceNumber =
            page.locator(
            'app-appointment-details span.invoice-id'
        ).last();

        this.invoiceNumberPdf =
        this.pdfBody.locator(
            'span.invoice-id'
        ).first();

        this.creditAppliedPdf = (creditApplied) =>
            this.pdfBody.getByText(
                `Credit Applied : ${parseFloat(creditApplied).toFixed(2)}`
        );

        this.balancePdf = (balance) =>
            this.pdfBody.getByText(
                `Balance : ${parseFloat(balance).toFixed(2)}`
        );

        this.invoicePaymentDetailsReceiptNumberPdf =
        this.pdfBody.getByText(/^\d{6}$/).last();

        this.invoicePaymentDetailsModePdf = (mode) =>
        this.pdfBody.getByText(mode, { exact: true }).last();

        this.financialsPaymentHistoryTab = page
            .locator('div.tab-item')
            .filter({ hasText: 'Payment History' });

        this.financialsPaymentHistoryRows = page.locator(
            'div.financials-table-wrapper table tbody tr'
        );

        // this.paymentHistoryRow =
        //     page.locator(
        //         'table tbody tr'
        //     ).last();
            
        }

    
        getTotalPaidCard() {

            return this.totalPaidLabel.locator(
                'xpath=../..'
            );
        }
}

module.exports = { PaymentLocator };