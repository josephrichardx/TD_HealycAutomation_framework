const { StepHelper } = require('../utils/StepHelper.js');
const { Keywords } = require('../utils/Keywords.js');
const { Verify } = require('../utils/verification.js');
const {
    WaitlistCancellationLocator
} = require('../Locators/WaitlistCancellationLocator.js');

class WaitlistCancellationPage {

    constructor(page) {
        this.page = page;
        this.locator = new WaitlistCancellationLocator(page);
        this.keywords = new Keywords();
    }

    getWaitlistCard(patientName) {
        return this.locator.getWaitlistCard(patientName);
    }

    // Click cancel button for a specific waitlist record
    async clickCancel(patientName) {

        const cancelButton =
            this.locator.getCancelButtonForCard(patientName);

        await this.keywords.waitForElement(cancelButton);

        await Verify.state(
            this.page,
            `Cancel button for waitlist record - ${patientName}`,
            cancelButton,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Click Cancel button for waitlist record: '${patientName}'`,
            async () => {
                await this.keywords.click(cancelButton);
            }
        );
    }

    async selectCancellationReason(reason) {

        const cancellationReason = typeof reason === 'string'
            ? reason
            : reason.cancelReason;

        const reasonOption =
            this.locator.getCancellationReasonOption(cancellationReason);

        await StepHelper.step(
            this.page,
            'Open Choose Reason dropdown',
            async () => {
                await this.keywords.click(this.locator.chooseReason);
            }
        );

        await this.keywords.waitForElement(reasonOption);

        await Verify.state(
            this.page,
            `Cancellation reason option - ${cancellationReason} is displayed`,
            reasonOption,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            `Select cancellation reason: ${cancellationReason}`,
            async () => {
                await this.keywords.click(reasonOption);
            }
        );
    }

    async clickCancelConsult() {

        await this.keywords.waitForElement(this.locator.cancelConsultButton);

        await Verify.state(
            this.page,
            'Cancel Consult button is displayed',
            this.locator.cancelConsultButton,
            { visible: true, enabled: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Click Cancel Consult button',
            async () => {
                await this.keywords.click(
                    this.locator.cancelConsultButton
                );
            }
        );
    }

    // This flow raises no toaster - the observable outcome is the entry
    // leaving the waitlist, so that is what gets verified.
    // `verification` = { expectedEntryState } from the calling spec's own
    // data file.
    async verifyWaitlistEntryRemoved(patientName, verification) {

        const step = 'Verify Waitlist Consult Cancelled';

        const card = this.locator.getWaitlistCard(patientName);

        await StepHelper.step(
            this.page,
            `${step} - ${patientName}`,
            async () => {
                await card.waitFor({ state: 'hidden' });
            }
        );

        await Verify.state(
            this.page,
            `${step} - ${patientName} is ${verification.expectedEntryState}`,
            card,
            { hidden: true, soft: false }
        );
    }


    // Captures the toaster message the application raises at runtime and
    // compares it with the expected message held in the calling spec's own
    // data file. `verification` = { expectedMessage }.
    async verifyCancellationToasterMessage(verification) {

        const step = 'Verify Cancellation Toaster Message';

        const toaster = this.locator.toasterMessage.first();

        let actualMessage;

        await StepHelper.step(
            this.page,
            step,
            async () => {

                actualMessage = (
                    await this.keywords.getText(toaster)
                ).trim();

                console.log(
                    `Runtime cancellation toaster message: ${actualMessage}`
                );
            }
        );

        await Verify.contains(
            this.page,
            step,
            verification.expectedMessage,
            actualMessage
        );

        return actualMessage;
    }
}

module.exports = { WaitlistCancellationPage };
