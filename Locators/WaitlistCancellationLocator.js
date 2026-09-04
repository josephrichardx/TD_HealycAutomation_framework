class WaitlistCancellationLocator {

    constructor(page) {
        this.page = page;

        // Accessible names are part of the locator definition and live here,
        // not in the page methods.
        this.cancelButtonName = 'Cancel';
        this.chooseReasonLabel = 'Choose reason';
        this.cancelConsultButtonName = 'Cancel Consult';

        this.cancelButton = page.getByRole(
            'button',
            { name: this.cancelButtonName }
        ).nth(1);

        this.chooseReason = page.getByText(
            this.chooseReasonLabel
        );

        this.cancelConsultButton = page.getByRole(
            'button',
            { name: this.cancelConsultButtonName }
        );

        // The application raises its confirmation as a toaster message.
        this.toasterMessage = page.locator(
            'app-custom-toaster-message'
        );
    }

    getWaitlistCard(patientName) {
        return this.page
            .locator('div')
            .filter({ hasText: patientName })
            .filter({
                has: this.page.getByRole('button', {
                    name: this.cancelButtonName
                })
            })
            .last();
    }

    getCancelButtonForCard(patientName) {
        return this.getWaitlistCard(patientName).getByRole(
            'button',
            { name: this.cancelButtonName }
        );
    }

    getCancellationReasonOption(reason) {
        return this.page.getByText(reason, { exact: true });
    }
}

module.exports = { WaitlistCancellationLocator };
