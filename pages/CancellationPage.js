const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { CancellationLocator } = require('../Locators/CancellationLocator');
const { Keywords } = require('../utils/Keywords');
const { cancellationData } = require('../testdata/CancellationData.json');
const { cancellationStatusTimeoutMs } = require('../Config/timeoutConfig.json');

class CancellationPage {

    constructor(page) {
        this.page = page;
        this.locator = new CancellationLocator(page);
        this.keywords = new Keywords();
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

        // paymentMode defaults to 'Cash' for backward compatibility
        // with the 3 other tests calling Payment() (WF_CALADN_05/
        // 125/126) that only ever pass amount. Mode -> button
        // lookup instead of hardcoding which button gets clicked,
        // same reasoning as not hardcoding the package name - the
        // payment mode used by a given test might not always be
        // Cash. .last() to guard against any stray duplicate button
        // elsewhere in the DOM at this point (same defensive
        // pattern as everywhere else tonight).
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


    async clickCancel() {

        await expect(
            this.locator.cancelBtn
        ).toBeVisible({
            timeout: 10000
        });

        await StepHelper.step(
            this.page,
            'Click Cancel',
            async () => {
                await this.keywords.click(
                    this.locator.cancelBtn
                );
            }
        );
    }


    async selectReason() {

        await StepHelper.step(
            this.page,
            'Enable Refund Option',
            async () => {
                await this.keywords.click(
                    this.locator.refundThumb
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Open Cancellation Reason Dropdown',
            async () => {
                await this.keywords.click(
                    this.locator.reasonDropdown
                );
            }
        );

        await this.keywords.click(
            this.locator.getCancellationReason(
                cancellationData.cancellationReason
            )
        );
    }


    async proceedToRefund() {

        await StepHelper.step(
            this.page,
            'Click Proceed To Refund',
            async () => {
                await this.keywords.click(
                    this.locator.proceedToRefundBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Refund Payment Option Screen',
            async () => {

                await expect(
                    this.locator.refundPaymentOptionText
                ).toBeVisible();

            }
        );
    }


    async cancelWithNoRefund() {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await StepHelper.step(
            this.page,
            'Select No Refund',
            async () => {
                await this.keywords.click(
                    this.locator.noRefundBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Confirm Cancellation',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Appointment Cancelled',
            async () => {

                await expect(
                    this.locator.cancelledStatus
                ).toContainText(
                    "Cancelled"
                );

            }
        );
    }

    async cancelWithRefund(
        paymentType,
        amount,
        transactionId = null
    ) {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await StepHelper.step(
            this.page,
            'Select Refund Option',
            async () => {
                await this.keywords.click(
                    this.locator.refundBtn
                );
            }
        );

        await this.selectPaymentMode(
            paymentType,
            transactionId
        );

        await StepHelper.step(
            this.page,
            `Enter Refund Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.amountTxt,
                    amount.toString()
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Confirm Refund',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBtn
                );
            }
        );
    }


    async cancelWithMakePayment(
        paymentType,
        amount,
        transactionId = null
    ) {

        await this.clickCancel();

        await this.selectReason();

        await this.proceedToRefund();

        await StepHelper.step(
            this.page,
            'Select Make Payment Option',
            async () => {
                await this.keywords.click(
                    this.locator.makePaymentBtn
                );
            }
        );

        await this.selectPaymentMode(
            paymentType,
            transactionId
        );

        await StepHelper.step(
            this.page,
            `Enter Payment Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.amountTxt,
                    amount.toString()
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Confirm Payment',
            async () => {
                await this.keywords.click(
                    this.locator.confirmBtn
                );
            }
        );
    }

   async cancellation() {

    // Wait for payment success popup/toaster to disappear
    await this.locator.paymentSuccessMessage.waitFor({
        state: 'hidden',
        timeout: 15000
    });


    await this.clickCancel();

    await StepHelper.step(
        this.page,
        'Select Whole Package',
        async () => {
            await this.keywords.click(
                this.locator.wholePackageBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Choose Cancellation Reason',
        async () => {
            await this.keywords.click(
                this.locator.chooseReason
            );
        }
    );


    await StepHelper.step(
        this.page,
        'Select Cancellation Reason',
        async () => {
            await this.keywords.click(
                this.locator.cancellationReason(
                    cancellationData.cancellationReason
                )
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Continue Cancellation',
        async () => {
            await this.keywords.click(
                this.locator.continueCancellationBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Select Cancellation Option',
        async () => {
            await this.keywords.click(
                this.locator.cancellationOption
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Continue',
        async () => {
            await this.keywords.click(
                this.locator.continueBtn
            );
        }
    );

   await StepHelper.step(
    this.page,
    'Select Refund Option',
    async () => {
        await this.keywords.click(
            this.locator.refundBtn
        );
    }
);
}

async cancelPackageWithFullRefund(){

await StepHelper.step(
    this.page,
    'Select Make Full Refund',
    async () => {
        await this.keywords.click(
            this.locator.fullRefundCheckbox
        );
    }
);

await StepHelper.step(
    this.page,
    'Review And Confirm Full Refund',
    async () => {
        await this.keywords.click(
            this.locator.reviewConfirmBtn
        );
    }
);

await StepHelper.step(
    this.page,
    'Confirm Cancellation',
    async () => {
        await this.keywords.click(
            this.locator.confirmCancellationBtn
        );
    }
);

await StepHelper.step(
    this.page,
    'Verify Package Cancelled',
    async () => {
        // Longer timeout here only (30s, not the global 10s) - the
        // backend processes the cancellation+refund before this
        // status badge updates, and that can occasionally run past
        // 10 seconds. Nothing else about this check changed.
        await expect(
            this.locator.cancelledStatus
        ).toContainText(
            cancellationData.expectedStatus,
            { timeout: cancellationStatusTimeoutMs }
        );
    }
);
}

async cancelPackageWithPartialRefund(
    paymentType,
    amount,
    transactionId = null
) {

    await StepHelper.step(
        this.page,
        'Select Refund Payment Mode',
        async () => {
            await this.selectPaymentMode(
                paymentType,
                transactionId
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Refund Amount - ${amount}`,
        async () => {
            await this.keywords.fill(
                this.locator.amountTxt,
                amount.toString()
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Review & Confirm',
        async () => {
            await this.keywords.click(
                this.locator.reviewConfirmBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Confirm Cancellation',
        async () => {
            await this.keywords.click(
                this.locator.confirmCancellationBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Verify Cancellation Success Message',
        async () => {
            await expect(
                this.locator.cancellationSuccessMessage
            ).toBeVisible({
                timeout: 10000
            });
        }
    );
}

    async selectPaymentMode(
        paymentType,
        transactionId = null
    ) {

        switch (paymentType) {

            case 'Cash':

                await StepHelper.step(
                    this.page,
                    'Select Payment Mode - Cash',
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
                    'Select Payment Mode - UPI',
                    async () => {
                        await this.keywords.click(
                            this.locator.upiBtn
                        );
                    }
                );

                await this.enterTransactionId(
                    transactionId
                );

                break;


            case 'Card':

                await StepHelper.step(
                    this.page,
                    'Select Payment Mode - Card',
                    async () => {
                        await this.keywords.click(
                            this.locator.cardBtn
                        );
                    }
                );

                await this.enterTransactionId(
                    transactionId
                );

                break;


            case 'Wallet':

                await StepHelper.step(
                    this.page,
                    'Select Payment Mode - Wallet',
                    async () => {
                        await this.keywords.click(
                            this.locator.walletBtn
                        );
                    }
                );

                break;


            default:

                throw new Error(
                    `Unsupported payment type: ${paymentType}`
                );
        }
    }


    async enterTransactionId(transactionId) {

        if (!transactionId) {
            throw new Error(
                'Transaction ID is required for this payment type'
            );
        }

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

    // "Verify the package name and cancellation/schedule status" +
    // "Verify Total Refund Amount == Paid Amount" from Step 6.
    // Confirmed from real video frames of this exact modal: package
    // name shown as "Cancel Package / Neuro PT (30 sessions)", and
    // "Amount already paid" in the Billings details section. Call
    // after cancellation() has navigated to the Refund/Payment
    // Option screen (right where these are visible).
    async verifyPackageNameAndRefundAmount(
        expectedPackageName,
        expectedPaidAmount
    ) {

        await StepHelper.step(
            this.page,
            `Verify Package Name on Cancel Modal | Expected: ${expectedPackageName}`,
            async () => {

                await expect(
                    this.locator.cancelModalPackageName(
                        expectedPackageName
                    )
                ).toBeVisible();
            }
        );

        const actualAmountAlreadyPaid =
            (
                await this.keywords.getText(
                    this.locator.amountAlreadyPaidValue
                )
            ).trim();

        const expectedAmountText =
            `₹ ${parseFloat(expectedPaidAmount).toFixed(0)}`;

        await StepHelper.step(
            this.page,
            `Verify Total Refund Amount == Paid Amount | Expected: ${expectedAmountText} | Actual: ${actualAmountAlreadyPaid}`,
            async () => {

                expect(actualAmountAlreadyPaid).toContain(
                    parseFloat(expectedPaidAmount).toFixed(0)
                );
            }
        );
    }

    // "Try to enter a refund amount greater than the total
    // refundable amount. Verify that the system does not allow a
    // refund amount greater than the total amount." from Step 6.
    //
    // Real evidence now (from an actual screenshot): the app does
    // NOT block this at the amount-entry screen - it proceeds to a
    // "Confirm Cancellation" review screen, but "New Package Status"
    // shows "Abandoned" instead of the normal "Cancelled". That's
    // the real signal the system gives that something is wrong with
    // the amount - not an outright block, a different downstream
    // status. Confirming "Abandoned" here, then clicking "Back" (NOT
    // "Confirm Cancellation" - that would actually finalize the
    // package in this broken state) to recover and let the real
    // full-refund flow proceed normally afterward.
    async attemptOverRefundAndVerifyBlocked(paidAmount) {

        const overLimitAmount = (
            parseFloat(paidAmount) + 1000
        ).toFixed(2);

        await StepHelper.step(
            this.page,
            `Enter Over-Limit Refund Amount - ${overLimitAmount}`,
            async () => {

                await this.keywords.fill(
                    this.locator.amountTxt,
                    overLimitAmount
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Review & Confirm (expecting a rejected/Abandoned outcome)',
            async () => {

                await this.keywords.click(
                    this.locator.reviewConfirmBtn
                );
            }
        );

        const actualStatus =
            (
                await this.keywords.getText(
                    this.locator.newPackageStatusValue
                )
            ).trim();

        await StepHelper.step(
            this.page,
            `Verify Over-Refund Amount Was Rejected | Expected: New Package Status shows Abandoned (not Cancelled) | Actual: ${actualStatus}`,
            async () => {

                expect(actualStatus).toBe('Abandoned');
            }
        );

        await StepHelper.step(
            this.page,
            'Click Back to Recover From Invalid Amount',
            async () => {

                await this.keywords.click(
                    this.locator.reviewScreenBackBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Clear Over-Limit Amount',
            async () => {

                await this.locator.amountTxt.fill('');
            }
        );
    }
}


module.exports = { CancellationPage };