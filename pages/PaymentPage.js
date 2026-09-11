const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PaymentLocator } = require('../Locators/PaymentLocator');
const { Keywords } = require('../utils/Keywords');
// import { Verify } from '../utils/verification.js';

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class PaymentPage {

    constructor(page) {
        this.page = page;
        this.locator = new PaymentLocator(page);
        this.keywords = new Keywords();
    }


    // =========================================================
    // OPEN FINANCIALS
    // =========================================================

    async openFinancials(patientName) {

        await this.locator.loaderOverlay.waitFor({
            state: 'hidden',
            timeout: timeout.elementTimeout
        });

        await StepHelper.step(
            this.page,
            `Open Patient Profile - ${patientName}`,
            async () => {

                await this.keywords.click(
                    this.locator.patientProfile(patientName)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Open Financials Tab',
            async () => {

                await this.keywords.click(
                    this.locator.financialsTab
                );
            }
        );
    }


    // =========================================================
    // MAKE PAYMENT
    // =========================================================

    async clickMakePayment() {

        await this.locator.makePaymentBtn.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await StepHelper.step(
            this.page,
            'Click Make Payment',
            async () => {

                await this.keywords.click(
                    this.locator.makePaymentBtn
                );
            }
        );
    }


    // =========================================================
    // SELECT PAYMENT TYPE
    // =========================================================

    async selectPaymentType(paymentType) {

        switch (paymentType) {

            case 'Cash':

                await StepHelper.step(
                    this.page,
                    'Select Payment Type - Cash',
                    async () => {

                        await this.keywords.click(
                            this.locator.cashBtn
                        );
                    }
                );

                break;


            case 'UPI':

                await StepHelper.step(
                    this.page,
                    'Select Payment Type - UPI',
                    async () => {

                        await this.keywords.click(
                            this.locator.upiBtn
                        );
                    }
                );

                break;


            case 'Card':

                await StepHelper.step(
                    this.page,
                    'Select Payment Type - Card',
                    async () => {

                        await this.keywords.click(
                            this.locator.cardBtn
                        );
                    }
                );

                break;


            case 'Wallet':

                await StepHelper.step(
                    this.page,
                    'Select Payment Type - Wallet',
                    async () => {

                        await this.keywords.click(
                            this.locator.walletBtn
                        );
                    }
                );

                break;


            default:

                throw new Error(
                    `Unsupported Payment Type : ${paymentType}`
                );
        }
    }


    // =========================================================
    // TRANSACTION ID
    // =========================================================

    async enterTransactionId(transactionId) {

        await StepHelper.step(
            this.page,
            `Enter Transaction ID - ${transactionId}`,
            async () => {

                await this.keywords.fill(
                    this.locator.transactionIdTxt,
                    transactionId
                );
            }
        );
    }


    // =========================================================
    // AMOUNT
    // =========================================================

    async enterAmount(amount) {

        await StepHelper.step(
            this.page,
            `Enter Amount - ${amount}`,
            async () => {

                await this.keywords.fill(
                    this.locator.amountTxt,
                    amount.toString()
                );
            }
        );
    }


    // =========================================================
    // RECORD PAYMENT
    // =========================================================

    async recordPayment() {

        await StepHelper.step(
            this.page,
            'Click Record Payment',
            async () => {

                await this.keywords.click(
                    this.locator.recordPaymentBtn
                );
            }
        );
    }


    // =========================================================
    // COMPLETE PAYMENT
    // =========================================================

    async completePayment() {

        await StepHelper.step(
            this.page,
            'Click Complete Payment',
            async () => {

                await this.keywords.click(
                    this.locator.completePaymentBtn
                );
            }
        );
    }


    // =========================================================
    // VERIFY PAYMENT SUCCESS
    // =========================================================

    async verifyPaymentSuccess(
        paymentType,
        amount
    ) {

        await StepHelper.step(
            this.page,
            `VERIFY - ${paymentType} Payment Completed Successfully - Amount ${amount}`,
            async () => {

                await expect(
                    this.locator.paymentSuccessMsg
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });
            }
        );
    }


    // =========================================================
    // RECORD WALLET DEPOSIT
    // =========================================================

    async recordWalletDeposit(amount) {

        await StepHelper.step(
            this.page,
            'Verify Record Deposit Button',
            async () => {

                await expect(
                    this.locator.recordDepositBtn
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });
            }
        );


        await StepHelper.step(
            this.page,
            'Click Record Deposit',
            async () => {

                await this.keywords.click(
                    this.locator.recordDepositBtn
                );
            }
        );


        await this.enterAmount(amount);


        await StepHelper.step(
            this.page,
            'Confirm Wallet Deposit',
            async () => {

                await this.keywords.click(
                    this.locator.recordDepositBtn
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


    // =========================================================
    // MAKE PAYMENT
    // =========================================================

    async makePayment(
        paymentType,
        amount,
        transactionId = null
    ) {

        if (paymentType === 'Wallet') {

            // Step 1: Record Deposit
            await this.recordWalletDeposit(
                amount
            );


            // Step 2: Open Payment popup
            await this.clickMakePayment();


            // Step 3: Verify Wallet option
            await StepHelper.step(
                this.page,
                'Verify Wallet Payment Option',
                async () => {

                    await expect(
                        this.locator.walletBtn
                    ).toBeVisible({
                        timeout: timeout.expectTimeout
                    });
                }
            );


            // Step 4: Select Wallet
            await this.selectPaymentType(
                'Wallet'
            );


            // Step 5: Enter Amount
            await this.enterAmount(
                amount
            );


            // Step 6: Record Payment
            await this.recordPayment();

            return;
        }


        await this.clickMakePayment();


        await this.selectPaymentType(
            paymentType
        );


        if (
            paymentType === 'UPI' ||
            paymentType === 'Card'
        ) {

            await this.enterTransactionId(
                transactionId
            );
        }


        await this.enterAmount(
            amount
        );


        await this.recordPayment();
    }


    // =========================================================
    // IPD MAKE PAYMENT
    // =========================================================

    async IPDMakePayment(
        paymentType,
        amount,
        transactionId = null
    ) {

        if (paymentType === 'Wallet') {

            // Step 1: Record Deposit
            await this.recordWalletDeposit(
                amount
            );


            // Step 2: Open Payment popup
            await this.clickMakePayment();


            // Step 3: Verify Wallet option
            await StepHelper.step(
                this.page,
                'Verify Wallet Payment Option',
                async () => {

                    await expect(
                        this.locator.walletBtn
                    ).toBeVisible({
                        timeout: timeout.expectTimeout
                    });
                }
            );


            // Step 4: Select Wallet
            await this.selectPaymentType(
                'Wallet'
            );


            // Step 5: Enter Amount
            await this.enterAmount(
                amount
            );


            // Step 6: Record Payment
            await this.recordPayment();

            return;
        }


        await this.selectPaymentType(
            paymentType
        );


        if (
            paymentType === 'UPI' ||
            paymentType === 'Card'
        ) {

            await this.enterTransactionId(
                transactionId
            );
        }


        await this.enterAmount(
            amount
        );


        await this.recordPayment();
    }


    // =========================================================
    // VERIFY PAYMENT
    // =========================================================

    async verifyPayment(paymentAmount) {

        const expectedPaidAmount =
            parseFloat(paymentAmount);

        await StepHelper.step(
            this.page,
            `Verify Payment - ₹${expectedPaidAmount}`,
            async () => {

                // =====================================================
                // 1. VERIFY TOTAL PAID
                // =====================================================

                await expect(
                    this.locator.totalPaidLabel
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });


                const totalPaidCard =
                    this.locator.getTotalPaidCard();


                await expect(
                    totalPaidCard
                ).toContainText(
                    `₹${expectedPaidAmount}`,
                    {
                        timeout: timeout.expectTimeout
                    }
                );


                const totalPaidText =
                    await this.keywords.getText(
                        totalPaidCard
                    );


                const paidAmountMatch =
                    totalPaidText.match(
                        /₹\s*([\d,]+(?:\.\d+)?)/
                    );


                if (!paidAmountMatch) {

                    throw new Error(
                        `Unable to find paid amount from: ${totalPaidText}`
                    );
                }


                const actualPaidAmount =
                    parseFloat(
                        paidAmountMatch[1]
                            .replace(/,/g, '')
                    );


                await StepHelper.step(
                    this.page,
                    `Verify Total Paid | Expected: ₹${expectedPaidAmount} | Actual: ₹${actualPaidAmount}`,
                    async () => {

                        expect(
                            actualPaidAmount
                        ).toBe(
                            expectedPaidAmount
                        );
                    }
                );


                // =====================================================
                // 2. OPEN INVOICE HISTORY
                // =====================================================

                await expect(
                    this.locator.invoiceHistoryTab
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });


                await this.keywords.click(
                    this.locator.invoiceHistoryTab
                );


                // =====================================================
                // 3. GET INVOICE TOTAL AMOUNT
                // =====================================================

                const totalAmountLocator =
                    this.locator.totalAmountValue;


                await expect(
                    totalAmountLocator
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });


                const totalAmountText =
                    await this.keywords.getText(
                        totalAmountLocator
                    );


                const totalAmount =
                    parseFloat(
                        totalAmountText.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    );


                await StepHelper.step(
                    this.page,
                    `Verify Invoice Total Amount | ₹${totalAmount}`,
                    async () => {

                        await expect(
                            totalAmountLocator
                        ).toBeVisible({
                            timeout: timeout.expectTimeout
                        });
                    }
                );


                // =====================================================
                // 4. CALCULATE EXPECTED REMAINING AMOUNT
                // =====================================================

                const expectedRemainingAmount =
                    totalAmount -
                    expectedPaidAmount;


                await StepHelper.step(
                    this.page,
                    `Calculate Remaining Amount | ₹${totalAmount} - ₹${expectedPaidAmount} = ₹${expectedRemainingAmount}`,
                    async () => {
                        // Calculation completed above.
                    }
                );


                // =====================================================
                // 5. GET ACTUAL REMAINING AMOUNT
                // =====================================================

                const remainingAmountLocator =
                    this.locator.remainingAmountValue;


                await expect(
                    remainingAmountLocator
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });


                const remainingAmountText =
                    await this.keywords.getText(
                        remainingAmountLocator
                    );


                const actualRemainingAmount =
                    parseFloat(
                        remainingAmountText.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    );


                // =====================================================
                // 6. VERIFY REMAINING AMOUNT
                // =====================================================

                await StepHelper.step(
                    this.page,
                    `Verify Remaining Amount | Expected: ₹${expectedRemainingAmount} | Actual: ₹${actualRemainingAmount}`,
                    async () => {

                        expect(
                            actualRemainingAmount
                        ).toBe(
                            expectedRemainingAmount
                        );
                    }
                );
            }
        );
    }


    // =========================================================
    // GET LATEST RECEIVED AMOUNT
    // =========================================================

    async getLatestReceivedAmount() {

        return (
            await this.keywords.getText(
                this.locator.latestReceivedAmount
            )
        ).trim();
    }


    // =========================================================
    // GET LATEST PAYMENT MODE
    // =========================================================

    async getLatestPaymentMode() {

        return (
            await this.keywords.getText(
                this.locator.latestPaymentMode
            )
        ).trim();
    }


    // =========================================================
    // CLICK PAYMENT HISTORY
    // =========================================================

    async clickPaymentHistory() {

        await StepHelper.step(
            this.page,
            'Click Payment History',
            async () => {

                await this.keywords.click(
                    this.locator.paymentHistoryTab
                );
            }
        );
    }


    // =========================================================
    // VERIFY PAYMENT HISTORY
    // =========================================================

    async verifyPaymentHistory(
        expectedPaymentMethod,
        expectedAmount
    ) {

        const actualReceivedAmount =
            await this.getLatestReceivedAmount();

        const actualPaymentMode =
            await this.getLatestPaymentMode();

        const expectedReceivedAmount =
            `₹${expectedAmount}`;


        await StepHelper.step(
            this.page,
            `Verify Received Amount | Expected: ${expectedReceivedAmount} | Actual: ${actualReceivedAmount}`,
            async () => {

                expect(
                    actualReceivedAmount
                ).toBe(
                    expectedReceivedAmount
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Verify Payment Mode | Expected: ${expectedPaymentMethod} | Actual: ${actualPaymentMode}`,
            async () => {

                expect(
                    actualPaymentMode
                        .trim()
                        .toLowerCase()
                ).toBe(
                    expectedPaymentMethod
                        .trim()
                        .toLowerCase()
                );
            }
        );
    }


    // =========================================================
    // IPD VERIFY PAYMENT
    // =========================================================

    async IPDVerifyPayment(
        paymentMethod,
        amount
    ) {

        await StepHelper.step(
            this.page,
            'Verify Payment History',
            async () => {

                // =====================================================
                // GET LATEST PAYMENT HISTORY ROW
                // =====================================================

                const paymentRow =
                    this.locator.paymentHistoryRow;


                await paymentRow.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });


                // =====================================================
                // GET ACTUAL PAYMENT METHOD
                // =====================================================

                const actualPaymentMethod =
                    (
                        await paymentRow
                            .locator('td')
                            .nth(2)
                            .innerText()
                    ).trim();


                // =====================================================
                // GET ACTUAL PAYMENT AMOUNT
                // =====================================================

                const actualPaymentAmount =
                    (
                        await paymentRow
                            .locator('td')
                            .nth(3)
                            .innerText()
                    )
                        .trim()
                        .replace(/[₹,\s]/g, '');


                const expectedAmount =
                    Number(amount).toFixed(2);

                const actualAmount =
                    Number(actualPaymentAmount).toFixed(2);


                // =====================================================
                // VERIFY PAYMENT METHOD
                // =====================================================

                await StepHelper.step(
                    this.page,
                    `Verify Payment Method | Expected: ${paymentMethod} | Actual: ${actualPaymentMethod}`,
                    async () => {

                        const expected =
                            String(paymentMethod)
                                .trim()
                                .toLowerCase();

                        const actual =
                            String(actualPaymentMethod)
                                .trim()
                                .toLowerCase();


                        if (expected !== actual) {

                            throw new Error(
                                `Payment Method mismatch - Expected: ${paymentMethod}, Actual: ${actualPaymentMethod}`
                            );
                        }
                    }
                );


                // =====================================================
                // VERIFY PAYMENT AMOUNT
                // =====================================================

                await StepHelper.step(
                    this.page,
                    `Verify Payment Amount | Expected: ${expectedAmount} | Actual: ${actualAmount}`,
                    async () => {

                        await Verify.equals(
                            this.page,
                            'Payment Amount',
                            expectedAmount,
                            actualAmount,
                            {
                                soft: false
                            }
                        );
                    }
                );
            }
        );
    }

     async Payment(amount, paymentMode = 'Cash') {

        await StepHelper.step(
            this.page,
            'Click Make Payment',
            async () => {
                await this.keywords.click(
                    this.locator.makePaymentActionBtn.last()
                );
            }
        );
        
        const modeButton =
            paymentMode === 'UPI' ? this.locator.upiBtn :
            paymentMode === 'Card' ? this.locator.cardBtn :
            this.locator.cashBtn;

        await StepHelper.step(
            this.page,
            `Select ${paymentMode} as Payment Mode`,
            async () => {
                await this.keywords.click(
                    modeButton.last()
                );
            }
        );

        console.log(
            await this.locator.amountInput.count()
        );

        await this.locator.amountInput
            .nth(1)
            .waitFor({
                state: "visible"
            });

        await StepHelper.step(
            this.page,
            `Enter Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.amountInput.nth(1),
                    amount
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Record Payment',
            async () => {
                await this.keywords.click(
                    this.locator.recordPaymentBtn.nth(1)
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Get Payment Confirmation Message',
            async () => {

                this._paymentMessage =
                    (
                        await this.keywords.getText(
                            this.locator.paymentSuccessMessage
                        )
                    ).trim();
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Payment Recorded Successfully | Expected: contains "Payment recorded successfully" | Actual: ${this._paymentMessage}`,
            async () => {

                expect(
                    this._paymentMessage
                ).toContain(
                    "Payment recorded successfully"
                );

            }
        );
    }

     async verifyPostPaymentStatus(
        expectedPaidAmount,
        expectedPaymentMethod = 'Cash'
    ) {

        const expectedAmount =
            parseFloat(expectedPaidAmount).toFixed(2);

        await StepHelper.step(
            this.page,
            'Wait for Payment Due Status to update to Paid',
            async () => {

                const deadline = Date.now() + 20000;
                let currentStatus = '';

                while (Date.now() < deadline) {

                    currentStatus =
                        (
                            await this.keywords.getText(
                                this.locator.appointmentPaymentDueStatus
                            )
                        ).trim();

                    if (currentStatus === 'Paid') {

                        break;
                    }

                    await this.page.waitForTimeout(timeout.testTimeout);
                }

                expect(currentStatus).toBe('Paid');
            }
        );

        // ==========================================
        // Payment Due == 0.00
        // ==========================================

        const actualPaymentDue =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaymentDue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Due | Expected: 0.00 | Actual: ${actualPaymentDue}`,
            async () => {

                const actualDueAmount =
                    parseFloat(
                        actualPaymentDue.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    );

                expect(actualDueAmount).toBe(0);
            }
        );

        // ==========================================
        // Payment Due Status chip == "Paid"
        // ==========================================

        const actualStatus =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaymentDueStatus
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment Due Status | Expected: Paid | Actual: ${actualStatus}`,
            async () => {

                expect(actualStatus).toBe('Paid');
            }
        );

        // ==========================================
        // Paid Amount == expected full invoice total
        // ==========================================

        const actualPaidAmount =
            (
                await this.keywords.getText(
                    this.locator.appointmentPaidAmount
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Paid Amount | Expected: ₹${expectedAmount} | Actual: ${actualPaidAmount}`,
            async () => {

                const actualPaid =
                    parseFloat(
                        actualPaidAmount.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    ).toFixed(2);

                expect(actualPaid).toBe(expectedAmount);
            }
        );

        // ==========================================
        // Total Amount == expected full invoice total
        // ==========================================

        const actualTotalAmount =
            (
                await this.keywords.getText(
                    this.locator.appointmentTotalAmount
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Total Amount | Expected: ₹${expectedAmount} | Actual: ${actualTotalAmount}`,
            async () => {

                const actualTotal =
                    parseFloat(
                        actualTotalAmount.replace(
                            /[₹,\s]/g,
                            ''
                        )
                    ).toFixed(2);

                expect(actualTotal).toBe(expectedAmount);
            }
        );

        const firstRow =
            this.locator.appointmentPaymentHistoryRows.first();
            
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const formatDate = (d) =>
            `${String(d.getDate()).padStart(2, '0')}-` +
            `${monthNames[d.getMonth()]}-` +
            `${d.getFullYear()}`;

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const expectedDateToday = formatDate(today);
        const expectedDateYesterday = formatDate(yesterday);

        const actualDate =
            (
                await firstRow.locator('td').nth(1).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Date | Expected: ${expectedDateToday} or ${expectedDateYesterday} (timezone boundary tolerance) | Actual: ${actualDate}`,
            async () => {

                expect(
                    [expectedDateToday, expectedDateYesterday]
                ).toContain(actualDate);
            }
        );

        const actualMethod =
            (
                await firstRow.locator('td').nth(2).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Method | Expected: ${expectedPaymentMethod} | Actual: ${actualMethod}`,
            async () => {

                expect(actualMethod).toBe(
                    expectedPaymentMethod
                );
            }
        );

        const actualHistoryAmount =
            (
                await firstRow.locator('td').nth(3).innerText()
            )
                .trim()
                .replace(/[₹,\s]/g, '');

        await StepHelper.step(
            this.page,
            `Verify Payment History Amount | Expected: ₹${expectedAmount} | Actual: ₹${actualHistoryAmount}`,
            async () => {

                expect(
                    parseFloat(actualHistoryAmount).toFixed(2)
                ).toBe(expectedAmount);
            }
        );
    }

     async revalidateInvoicePDFAfterPayment(
            expectedInvoiceNumber,
            expectedPaymentMode = 'Cash'
        ) {

            await this.page
                .waitForLoadState('networkidle', { timeout: timeout.elementTimeout })
                .catch(() => {
                    // If it never truly goes idle (e.g. background polling),
                    // don't hard-fail here - fall through and let the click
                    // itself do its normal actionability retries.
                });
    
            await StepHelper.step(
                this.page,
                `Open Invoice PDF Again - ${expectedInvoiceNumber}`,
                async () => {
    
                    await this.keywords.click(
                        this.locator.appointmentInvoiceNumber
                    );
                }
            );
    
            await StepHelper.step(
                this.page,
                'Wait for Invoice PDF to Load',
                async () => {
    
                    await this.keywords.waitForElement(
                        this.locator.closePdfPreviewBtn,
                        timeout.elementTimeout
                    );
                }
            );
    
            const actualInvoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.invoiceNumberPdf
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Invoice Number (Post-Payment) | Expected: ${expectedInvoiceNumber} | Actual: ${actualInvoiceNumber}`,
                async () => {
    
                    expect(actualInvoiceNumber).toBe(
                        expectedInvoiceNumber
                    );
                }
            );
    
            const expectedCreditText = 'Credit Applied : 0.00';
    
            const actualCreditText =
                (
                    await this.keywords.getText(
                        this.locator.creditAppliedPdf(0)
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Credit Applied (Post-Payment) | Expected: ${expectedCreditText} | Actual: ${actualCreditText}`,
                async () => {
    
                    expect(actualCreditText).toBe(
                        expectedCreditText
                    );
                }
            );
    
            const expectedBalanceText = 'Balance : 0.00';
    
            const actualBalanceText =
                (
                    await this.keywords.getText(
                        this.locator.balancePdf(0)
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Balance (Post-Payment) | Expected: ${expectedBalanceText} | Actual: ${actualBalanceText}`,
                async () => {
    
                    expect(actualBalanceText).toBe(
                        expectedBalanceText
                    );
                }
            );
    
            const actualInvoiceReceiptNumber =
                (
                    await this.keywords.getText(
                        this.locator.invoicePaymentDetailsReceiptNumberPdf
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Payment Details Receipt Number Present (Invoice PDF) | Expected: 6-digit number | Actual: ${actualInvoiceReceiptNumber}`,
                async () => {
    
                    expect(actualInvoiceReceiptNumber).toMatch(
                        /^\d{6}$/
                    );
                }
            );
    
            const actualInvoicePaymentMode =
                (
                    await this.keywords.getText(
                        this.locator.invoicePaymentDetailsModePdf(
                            expectedPaymentMode
                        )
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Payment Details Mode (Invoice PDF) | Expected: ${expectedPaymentMode} | Actual: ${actualInvoicePaymentMode}`,
                async () => {
    
                    expect(actualInvoicePaymentMode).toBe(
                        expectedPaymentMode
                    );
                }
            );
    
            await StepHelper.step(
                this.page,
                'Close Invoice PDF Preview',
                async () => {
    
                    await this.keywords.click(
                        this.locator.closePdfPreviewBtn
                    );
                }
            );
    
            return actualInvoiceReceiptNumber;
        }

     async verifyPaymentReceipt(
            expectedInvoiceNumber,
            expectedAmount,
            expectedInvoiceReceiptNumber = null,
            expectedPaymentMode = 'Cash'
        ) {
    
            const firstRow =
                this.locator.appointmentPaymentHistoryRows.last();
    
            await this.page
                .waitForLoadState('networkidle', { timeout: timeout.elementTimeout })
                .catch(() => {});
    
            await StepHelper.step(
                this.page,
                'Click View Receipt (Payment History)',
                async () => {
    
                    await this.keywords.click(
                        this.locator.paymentHistoryViewReceiptIcon(
                            firstRow
                        )
                    );
                }
            );
    
            await StepHelper.step(
                this.page,
                'Wait for Payment Receipt PDF to Load',
                async () => {
    
                    await this.keywords.waitForElement(
                        this.locator.closePdfPreviewBtn,
                        timeout.elementTimeout 
                    );
                }
            );
    
            const actualReceiptNumber =
                (
                    await this.keywords.getText(
                        this.locator.receiptPaymentNumberPdf
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Receipt Number Present | Expected: 6-digit number | Actual: ${actualReceiptNumber}`,
                async () => {
    
                    expect(actualReceiptNumber).toMatch(/^\d{6}$/);
                }
            );
    
            const expectedAmountText =
                parseFloat(expectedAmount).toFixed(2);
    
            const actualAmountText =
                (
                    await this.keywords.getText(
                        this.locator.receiptAmountReceivedPdf(
                            expectedAmount
                        )
                    )
                )
                    .trim()
                    .replace(/[₹,\s]/g, '');
    
            await StepHelper.step(
                this.page,
                `Verify Receipt Amount Received | Expected: ${expectedAmountText} | Actual: ${actualAmountText}`,
                async () => {
    
                    expect(actualAmountText).toBe(
                        expectedAmountText
                    );
                }
            );
    
            const actualPaymentMode =
                (
                    await this.keywords.getText(
                        this.locator.receiptPaymentModePdf(
                            expectedPaymentMode
                        )
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Receipt Payment Mode | Expected: ${expectedPaymentMode} | Actual: ${actualPaymentMode}`,
                async () => {
    
                    expect(actualPaymentMode).toBe(expectedPaymentMode);
                }
            );
    
            const actualReceiptInvoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.receiptInvoiceNumberPdf(
                            expectedInvoiceNumber
                        )
                    )
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Receipt References Correct Invoice | Expected: ${expectedInvoiceNumber} | Actual: ${actualReceiptInvoiceNumber}`,
                async () => {
    
                    expect(actualReceiptInvoiceNumber).toBe(
                        expectedInvoiceNumber
                    );
                }
            );
    
            if (expectedInvoiceReceiptNumber !== null) {
    
                await StepHelper.step(
                    this.page,
                    `Verify Receipt Number Matches Invoice PDF | Expected: ${expectedInvoiceReceiptNumber} | Actual: ${actualReceiptNumber}`,
                    async () => {
    
                        expect(actualReceiptNumber).toBe(
                            expectedInvoiceReceiptNumber
                        );
                    }
                );
            }
    
            await StepHelper.step(
                this.page,
                'Close Payment Receipt PDF',
                async () => {
    
                    await this.keywords.click(
                        this.locator.closePdfPreviewBtn
                    );
                }
            );
    
            return actualReceiptNumber;
        }

    async verifyFinancialsPaymentHistory(
        expectedInvoiceNumber,
        expectedAmount,
        expectedMode = 'Cash'
    ) {

        await StepHelper.step(
            this.page,
            'Open Payment History (Financials)',
            async () => {
                await this.keywords.click(
                    this.locator.financialsPaymentHistoryTab
                );
            }
        );

        const firstRow =
            this.locator.financialsPaymentHistoryRows.first();

        const actualInvoiceNumber =
            (
                await firstRow.locator('td').nth(1).innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Invoice Number | Expected: ${expectedInvoiceNumber} | Actual: ${actualInvoiceNumber}`,
            async () => {

                expect(actualInvoiceNumber).toBe(
                    expectedInvoiceNumber
                );
            }
        );

        // const actualAmount =
        //     (
        //         await firstRow.locator('td').nth(3).innerText()
        //     )
        //         .trim()
        //         .replace(/[₹,\s]/g, '');

        const actualAmount =
            Math.abs(
                parseFloat(
                    (
                        await firstRow.locator('td').nth(3).innerText()
                    )
                        .trim()
                        .replace(/[₹,\s]/g, '')
                )
        ).toFixed(2);

        const expectedAmountText =
            parseFloat(expectedAmount).toFixed(2);

        await StepHelper.step(
            this.page,
            `Verify Payment History Received Amount | Expected: ₹${expectedAmountText} | Actual: ₹${actualAmount}`,
            async () => {

                expect(
                    parseFloat(actualAmount).toFixed(2)
                ).toBe(expectedAmountText);
            }
        );

        const actualMode =
            (
                await firstRow
                    .locator('div.payment-mode-wrapper span')
                    .innerText()
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Payment History Mode | Expected: ${expectedMode} | Actual: ${actualMode}`,
            async () => {

                expect(actualMode).toBe(expectedMode);
            }
        );
    }

     async verifyRefundInFinancialsPaymentHistory(
            expectedInvoiceNumber,
            refundAmount,
            expectedMode = 'Cash'
        ) {
    
            const negativeAmount = -Math.abs(parseFloat(refundAmount));
    
            const refundRow =
                this.locator.financialsPaymentHistoryRows.first();
    
            const actualRefundReceiptNumber =
                (
                    await refundRow.locator('td').nth(0).innerText()
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Refund Transaction/PDF Number Present | Expected: non-empty | Actual: ${actualRefundReceiptNumber}`,
                async () => {
    
                    expect(actualRefundReceiptNumber).not.toBe('');
                }
            );
    
            const actualRefundInvoiceNumber =
                (
                    await refundRow.locator('td').nth(1).innerText()
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Refund Row Invoice Number | Expected: ${expectedInvoiceNumber} | Actual: ${actualRefundInvoiceNumber}`,
                async () => {
    
                    expect(actualRefundInvoiceNumber).toBe(
                        expectedInvoiceNumber
                    );
                }
            );
    
            const actualRefundAmount =
                (
                    await refundRow.locator('td').nth(3).innerText()
                )
                    .trim()
                    .replace(/[₹,\s]/g, '');
    
            await StepHelper.step(
                this.page,
                `Verify Negative Payment/Refund Amount | Expected: ${negativeAmount.toFixed(2)} | Actual: ${actualRefundAmount}`,
                async () => {
    
                    expect(parseFloat(actualRefundAmount)).toBe(
                        negativeAmount
                    );
                }
            );
    
            const actualRefundMode =
                (
                    await refundRow
                        .locator('div.payment-mode-wrapper span')
                        .innerText()
                ).trim();
    
            await StepHelper.step(
                this.page,
                `Verify Refund Payment Mode | Expected: ${expectedMode} | Actual: ${actualRefundMode}`,
                async () => {
    
                    expect(actualRefundMode).toBe(expectedMode);
                }
            );
        }
    


}


module.exports = { PaymentPage };