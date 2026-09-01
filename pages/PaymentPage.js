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
                //     // Calculation is already performed above.
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

async getLatestReceivedAmount() {

    return (
        await this.keywords.getText(
            this.locator.latestReceivedAmount
        )
    ).trim();
}

async getLatestPaymentMode() {

    return (
        await this.keywords.getText(
            this.locator.latestPaymentMode
        )
    ).trim();
}

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
                actualPaymentMode.trim().toLowerCase()
            ).toBe(
                expectedPaymentMethod.trim().toLowerCase()
            );
        }
    );
}

// async IPDVerifyPayment(paymentMethod, amount) {

//     await StepHelper.step(
//         this.page,
//         'Verify Payment History',
//         async () => {

//             // Get the latest payment history row
//             const paymentRow = this.page
//                 .locator('table tbody tr')
//                 .last();

//             // Get actual payment method from UI
//             const actualPaymentMethod =
//                 (await paymentRow.locator('td').nth(2).innerText())
//                     .trim();

//             // Get actual payment amount from UI
//             const actualPaymentAmount =
//                 (await paymentRow.locator('td').nth(3).innerText())
//                     .trim()
//                     .replace(/[₹,\s]/g, '');

//             const expectedAmount =
//                 Number(amount).toFixed(2);

//             const actualAmount =
//                 Number(actualPaymentAmount).toFixed(2);

//             // Verify Payment Method
//             await StepHelper.step(
//             this.page,
//             `Verify Payment Method | Expected: ${paymentMethod} | Actual: ${actualPaymentMethod}`,
//             async () => {

//                 const expected =
//                     String(paymentMethod).trim().toLowerCase();

//                 const actual =
//                     String(actualPaymentMethod).trim().toLowerCase();

//                 if (expected !== actual) {
//                     throw new Error(
//                         `Payment Method mismatch - Expected: ${paymentMethod}, Actual: ${actualPaymentMethod}`
//                     );
//                 }
//             }
//             );

//             // Verify Payment Amount
//             await Verify.equals(
//                 this.page,
//                 'Verify Payment Amount',
//                 expectedAmount,
//                 actualAmount,
//                 {
//                     soft: false
//                 }
//             );
//         }
//     );
// }
async IPDVerifyPayment(
    paymentMethod,
    amount
) {

    await StepHelper.step(
        this.page,
        'Verify Payment History',
        async () => {

            // =========================================================
            // GET LATEST PAYMENT HISTORY ROW
            // =========================================================

            const paymentRow =
                this.locator.paymentHistoryRow;

            await paymentRow.waitFor({
                state: 'visible',
                timeout: 30000
            });


            // =========================================================
            // GET ACTUAL PAYMENT METHOD
            // =========================================================

            const actualPaymentMethod =
                (
                    await paymentRow
                        .locator('td')
                        .nth(2)
                        .innerText()
                ).trim();


            // =========================================================
            // GET ACTUAL PAYMENT AMOUNT
            // =========================================================

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


            // =========================================================
            // VERIFY PAYMENT METHOD
            // =========================================================

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


            // =========================================================
            // VERIFY PAYMENT AMOUNT
            // =========================================================

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
}//update


}


module.exports = { PaymentPage };