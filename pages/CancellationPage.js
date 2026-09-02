const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { CancellationLocator } = require('../Locators/CancellationLocator');
const { Keywords } = require('../utils/Keywords');
// const { cancellationData } = require('../testdata/CancellationData.json');

class CancellationPage {

    constructor(page) {
        this.page = page;
        this.locator = new CancellationLocator(page);
        this.keywords = new Keywords();
    }


    async Payment(amount) {

        await StepHelper.step(
            this.page,
            'Click Make Payment',
            async () => {
                await this.keywords.click(
                    this.locator.makePaymentActionBtn.last()
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
            'Verify Payment Recorded Successfully',
            async () => {

                await expect(
                    this.locator.paymentSuccessMessage
                ).toContainText(
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

   async cancellation(cancelReason) {

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

async cancelPackageWithFullRefund(cancellationData){

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
        'Verify Cancellation Success Message',
        async () => {
            await expect(
                this.locator.cancellationSuccessMessage
            ).toBeVisible({
                timeout: 10000
            });
        }
    );

// await StepHelper.step(
//     this.page,
//     'Verify Cancellation Success Message',
//     async () => {
//         await expect(
//             this.locator.cancelledStatus
//         ).toContainText(
//             cancellationData.expectedStatus
//         );
//     }
// );

await StepHelper.step(
    this.page,
    `Verify Cancellation Status - ${cancellationData.expectedStatus}`,
    async () => {
        await expect(
            (await this.locator.cancelledStatus.innerText()).trim()
        ).toBe(
            cancellationData.expectedStatus
        );
    }
);

}

async cancelPackageWithPartialRefund(
    paymentType,
    amount,
    transactionId = null,
    expectedStatus,
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

    await StepHelper.step(
        this.page,
        `Verify Cancellation Status - ${expectedStatus}`,
        async () => {
            await expect(
                (await this.locator.cancelledStatus.innerText()).trim()
            ).toBe(expectedStatus);
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
}


module.exports = { CancellationPage };