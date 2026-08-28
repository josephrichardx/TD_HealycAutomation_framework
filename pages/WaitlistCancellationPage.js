const { StepHelper } = require('../utils/StepHelper.js');
 
class WaitlistCancellationPage {
    constructor(page) {
        this.page = page;
 
        this.cancelButton = page.getByRole('button', { name: 'Cancel' }).nth(1);
        this.chooseReason = page.getByText('Choose reason');
        this.cancelConsultButton = page.getByRole(
            'button',
            { name: 'Cancel Consult' }
        );
    }
 
    getWaitlistCard(patientName) {
        return this.page
            .locator('div')
            .filter({ hasText: patientName })
            .filter({
                has: this.page.getByRole('button', { name: 'Cancel' })
            })
            .last();
    }
 
    //Click cancel button for specific waitlist record
    async clickCancel(patientName) {
        await StepHelper.step(
            this.page,
            `Click Cancel button for waitlist record: '${patientName}'`,
            async () => {
                await this.getWaitlistCard(patientName)
                    .getByRole('button', { name: 'Cancel' })
                    .click();
            }
        );
    }
 
    async selectCancellationReason(reason) {
        const cancellationReason = typeof reason === 'string'
            ? reason
            : reason.cancelReason;
 
        await StepHelper.step(
            this.page,
            `Select cancellation reason: ${cancellationReason}`,
            async () => {
 
                // Open Choose Reason dropdown
                await this.chooseReason.click();
 
                // Select reason from dropdown
                await this.page
                    .getByText(cancellationReason, { exact: true })
                    .click();
            }
        );
    }
 
    async clickCancelConsult() {
        await StepHelper.step(
            this.page,
            'Click Cancel Consult button',
            async () => {
                await this.cancelConsultButton.click();
            }
        );
    }
}
 
module.exports = { WaitlistCancellationPage };