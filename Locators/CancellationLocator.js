class CancellationLocator {

    constructor(page) {
        this.page = page;

        // Cancel
        this.cancelBtn = page.getByText('Cancel').nth(3);

        // Refund / Payment Buttons
        this.proceedToRefundBtn = page.getByRole('button', {
            name: 'Proceed to Refund'
        });

        this.noRefundBtn = page.getByRole('button', {
            name: 'No Refund'
        });

        this.refundBtn = page.getByRole('button', {
            name: 'Refund',
            exact: true
        });

        this.makePaymentBtn = page.getByRole('button', {
            name: 'Make Payment',
            exact: true
        });

        this.confirmBtn = page.getByRole('button', {
            name: 'Confirm'
        });

        // Cancellation Reason
        // this.reasonDropdown = page.getByText('Choose reason');

        // this.cancelledByPatientReason = page.getByText(
        //     'Cancelled by patient'
        // );

         // Cancellation Reason
        this.reasonDropdown = page.getByText('Choose reason');

        // Refund
        this.refundThumb = page.locator('.refund-thumb');

        // Payment Modes
        this.cashBtn = page.getByRole('button', {
            name: 'Cash'
        });

        this.upiBtn = page.getByRole('button', {
            name: 'UPI'
        });

        this.cardBtn = page.getByRole('button', {
            name: 'Card'
        });

        this.walletBtn = page.getByRole('button', {
            name: 'Wallet'
        });

        // Fields
        this.amountTxt = page.getByRole('textbox', {
            name: '₹'
        });

        this.transactionIdTxt = page.getByRole('textbox', {
            name: /Transaction ID/i
        });

        // Payment
        this.makePaymentActionBtn = page.locator(
            ".make-payment-btn"
        );

        this.amountInput = page.getByPlaceholder(
            "₹ Amount"
        );

        this.recordPaymentBtn = page.getByRole(
            "button",
            { name: "Record Payment" }
        );

        // Verification
        this.paymentSuccessMessage = page.locator(
            "app-custom-toaster-message"
        );

        this.refundPaymentOptionText = page.getByText(
            'Refund/Payment Option'
        );

        this.cancelledStatus = page.locator(
            ".status-style.status-cancelled"
        ).first();

//         // Package Cancellation
// this.wholePackageBtn = page.getByRole('button', {
//     name: 'Whole Package',
//     exact: true
// });

// // this.continueBtn = page.getByRole('button', {
// //     name: 'Continue',
// //     exact: true
// // });

// this.continueBtn = page.locator('button').filter({
//     hasText: /^Continue$/
// });

// this.continueCancellationBtn = page.getByRole('button', {
//     name: 'Continue Cancellation',
//     exact: true
// });

// Full Refund
this.fullRefundCheckbox = page.getByText(
    'Make full refund',
    { exact: true }
);

this.reviewConfirmBtn = page.getByRole('button', {
    name: 'Review & Confirm',
    exact: true
});

this.confirmCancellationBtn = page.getByRole('button', {
    name: 'Confirm Cancellation',
    exact: true
});

this.continueCancellationBtn =
    page.getByRole('button', {
        name: 'Continue Cancellation',
        exact: true
    });

// Package Cancellation

this.wholePackageBtn = page.getByRole('button', {
    name: 'Whole Package',
    exact: true
});

this.chooseReason = page.getByText('Choose reason');

this.cancellationReason = (reason) =>
    page.getByText(reason, { exact: true });

this.continueCancellationBtn =
    page.getByRole('button', {
        name: 'Continue Cancellation',
        exact: true
    });

this.cancellationOption =
    page.locator(
        '.cancel-modal > div:nth-child(4) > div:nth-child(2) > div'
    );

this.continueBtn =
    page.getByRole('button', {
        name: 'Continue',
        exact: true
    });

this.refundBtn =
    page.getByRole('button', {
        name: 'Refund',
        exact: true
    });

this.cancellationSuccessMessage = page.getByText(
    'Success',
    { exact: true }
);

// Package Name shown on the "Cancel Package" modal itself
// (confirmed from real video frames: "Cancel Package / Neuro PT
// (30 sessions)"). Scoped to .cancel-modal, the same confirmed
// real class already used by cancellationOption above.
this.cancelModalPackageName = (packageName) =>
    page.locator('.cancel-modal').getByText(packageName);

// "Amount already paid" value in the Billings details section -
// confirmed visible in the same modal via video frames, but this
// specific XPath is inferred from the established
// label-then-adjacent-value pattern used elsewhere in this
// codebase (e.g. appointmentPaymentDue), not from a DOM inspection
// of this exact element - worth a quick sanity check on first run.
this.amountAlreadyPaidValue = page.locator(
    "//*[normalize-space()='Amount already paid']/following-sibling::*[1]"
);

// "New Package Status" value on the final Review/Confirm screen -
// confirmed from a real screenshot showing "Abandoned" (not
// "Cancelled") when an over-limit refund amount was entered. Same
// label-then-adjacent-value XPath pattern as amountAlreadyPaidValue
// above.
this.newPackageStatusValue = page.locator(
    "//*[normalize-space()='New Package Status']/following-sibling::*[1]"
);

// "Back" button on this review screen - confirmed from the same
// screenshot. Generic role-based match, .last() defensively (same
// stale-duplicate-modal caution as everywhere else tonight, in case
// an earlier step's "Back" button is still in the DOM).
this.reviewScreenBackBtn = page.getByRole('button', {
    name: 'Back',
    exact: true
}).last();

    }

    getCancellationReason(reason) {
    return this.page.getByText(reason, {
        exact: true
    });
}
}

module.exports = { CancellationLocator };