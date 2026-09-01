const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PaymentLocator } = require('../Locators/PaymentLocator');
const { Keywords } = require('../utils/Keywords');
import { Verify } from '../utils/verification.js';

class PaymentPage {

    constructor(page) {
        this.page = page;
        this.locator = new PaymentLocator(page);
        this.keywords = new Keywords();
    }


    async openFinancials(patientName) {

        await this.keywords.wait(
            this.page,
            3000
        );

        await this.locator.loaderOverlay.waitFor({
            state: 'hidden',
            timeout: 60000
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

    async openInvoiceHistory() {

        await StepHelper.step(
            this.page,
            'Open Invoice History',
            async () => {
                await this.keywords.click(
                    this.locator.invoiceHistoryTab
                );
            }
        );
    }

    // "Open Payment History" (Financials tab) + "Verify the payment
    // transaction details" from Step 5. Distinct from the Payment
    // History already covered inline on Appointment Details -
    // confirmed via real DOM this is its own table under Financials.
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

        const actualAmount =
            (
                await firstRow.locator('td').nth(3).innerText()
            )
                .trim()
                .replace(/[₹,\s]/g, '');

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


    async clickMakePayment() {

        await this.locator.makePaymentBtn.waitFor({
            state: 'visible',
            timeout: 60000
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
                    timeout: 10000
                });

            }
        );
    }


    async recordWalletDeposit(amount) {

        await StepHelper.step(
            this.page,
            'Verify Record Deposit Button',
            async () => {

                await expect(
                    this.locator.recordDepositBtn
                ).toBeVisible({
                    timeout: 30000
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
            'networkidle'
        );
    }


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
                        timeout: 10000
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
                        timeout: 10000
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

    
 async verifyPayment(paymentAmount) {

    const expectedPaidAmount =
        parseFloat(paymentAmount);

    await StepHelper.step(
        this.page,
        `Verify Payment - ₹${expectedPaidAmount}`,
        async () => {

            // ==========================================
            // 1. Verify Total Paid
            // ==========================================

            await expect(
                this.locator.totalPaidLabel
            ).toBeVisible({
                timeout: 30000
            });

            const totalPaidCard =
                this.locator.getTotalPaidCard();

            await expect(
                totalPaidCard
            ).toContainText(
                `₹${expectedPaidAmount}`,
                {
                    timeout: 30000
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


            // ==========================================
            // 2. Open Invoice History
            // ==========================================

            await expect(
                this.locator.invoiceHistoryTab
            ).toBeVisible({
                timeout: 30000
            });

            await this.keywords.click(
                this.locator.invoiceHistoryTab
            );


            // ==========================================
            // 3. Get Invoice Total Amount
            // ==========================================

            const totalAmountLocator =
                this.locator.totalAmountValue;

            await expect(
                totalAmountLocator
            ).toBeVisible({
                timeout: 30000
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
                        timeout: 30000
                    });
                }
            );


            // ==========================================
            // 4. Calculate Expected Remaining Amount
            // ==========================================

            const expectedRemainingAmount =
                totalAmount -
                expectedPaidAmount;

            await StepHelper.step(
                this.page,
                `Calculate Remaining Amount | ₹${totalAmount} - ₹${expectedPaidAmount} = ₹${expectedRemainingAmount}`,
                async () => {
                    // Calculation is already performed above.
                }
            );


            // ==========================================
            // 5. Get Actual Remaining Amount
            // ==========================================

            const remainingAmountLocator =
                this.locator.remainingAmountValue;

            await expect(
                remainingAmountLocator
            ).toBeVisible({
                timeout: 30000
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


            // ==========================================
            // 6. Verify Remaining Amount
            // ==========================================

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

async IPDVerifyPayment(paymentMethod, amount) {

    await StepHelper.step(
        this.page,
        'Verify Payment History',
        async () => {

            // Get the latest payment history row
            const paymentRow = this.page
                .locator('table tbody tr')
                .last();

            // Get actual payment method from UI
            const actualPaymentMethod =
                (await paymentRow.locator('td').nth(2).innerText())
                    .trim();

            // Get actual payment amount from UI
            const actualPaymentAmount =
                (await paymentRow.locator('td').nth(3).innerText())
                    .trim()
                    .replace(/[₹,\s]/g, '');

            const expectedAmount =
                Number(amount).toFixed(2);

            const actualAmount =
                Number(actualPaymentAmount).toFixed(2);

            // Verify Payment Method
            await StepHelper.step(
            this.page,
            `Verify Payment Method | Expected: ${paymentMethod} | Actual: ${actualPaymentMethod}`,
            async () => {

                const expected =
                    String(paymentMethod).trim().toLowerCase();

                const actual =
                    String(actualPaymentMethod).trim().toLowerCase();

                if (expected !== actual) {
                    throw new Error(
                        `Payment Method mismatch - Expected: ${paymentMethod}, Actual: ${actualPaymentMethod}`
                    );
                }
            }
            );

            // Verify Payment Amount
            await Verify.equals(
                this.page,
                'Verify Payment Amount',
                expectedAmount,
                actualAmount,
                {
                    soft: false
                }
            );
        }
    );
}

// Step 6 Payment History (Financials), post-refund: "Refund
// transaction/PDF number", "Negative payment transaction", "Refund
// amount". Confirmed from a real video frame: after a refund, this
// table has 2 rows - the original payment and the refund itself as
// a negative amount, with the refund shown as the FIRST row
// (Payment Number 000065, before the original's 000292 - sorted by
// payment number, not chronologically). Call after switching to the
// Payment History tab (already done by verifyFinancialsPaymentHistory
// if called first, or call financialsPaymentHistoryTab click
// directly if this is the first thing checked on this tab).
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