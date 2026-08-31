const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PrescriptionLocator } = require('../Locators/PrescriptionLocator.js');
const { Keywords } = require('../utils/Keywords');

class PrescriptionPage {
 
    constructor(page) {
        this.page = page;
        this.locators = new PrescriptionLocator(page);
    }
 
    async openScheduledAppointment() {
        await this.locators.appointmentCard.waitFor({ state: 'visible' });
        await this.locators.appointmentCard.click();
    }
 
    async clickWritePrescription() {
        await this.locators.writePrescriptionBtn.waitFor({ state: 'visible' });
        await this.locators.writePrescriptionBtn.click();
    }
 
    async addSignature() {
        await this.locators.addSignatureBtn.waitFor({ state: 'visible' });
        await this.locators.addSignatureBtn.click();
 
        if (await this.locators.signatureCanvas.isVisible().catch(() => false)) {
            const box = await this.locators.signatureCanvas.boundingBox();
            if (box) {
                await this.page.mouse.move(box.x + 20, box.y + 20);
                await this.page.mouse.down();
                await this.page.mouse.move(box.x + 80, box.y + 40);
                await this.page.mouse.up();
            }
        }
 
        await this.locators.saveSignatureBtn.click();
    }
 
    async savePrescription() {
        await this.locators.topSaveBtn.click();
    }
 
    async generateAndDownloadPdf() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.locators.generateAndShareBtn.waitFor({ state: 'visible' });
        await this.locators.generateAndShareBtn.click();
        return await downloadPromise;
    }

    async PrescriptionofObservation(
        drugs1,
        drugs2
    ) {

        // ---------------------------------------------------------
        // WRITE PRESCRIPTION
        // ---------------------------------------------------------

        await this.clickWritePrescription();


        // =========================================================
        // FIRST DRUG
        // =========================================================


         await StepHelper.step(
        this.page,
        'Wait for Prescription Page',
        async () => {

            await this.locator.writePrescriptionBtn.waitFor({
                state: 'visible',
                timeout: 30000
            });
        }
      );

        await StepHelper.step(
            this.page,
            `Select Drug - ${drugs1.name}`,
            async () => {

                await this.keywords.click(
                    this.locators.drugSearch
                );

                await this.keywords.click(
                    this.locators.drugLibrary(
                        drugs1.name
                    )
                );

                // Close Drug Library
                await this.page
                    .locator('body')
                    .press('Escape');

                await this.keywords.click(
                    this.locators.editorContainer
                );
            }
        );


        // =========================================================
        // FIRST DRUG - DURATION
        // =========================================================

        await StepHelper.step(
            this.page,
            `Select Duration - ${drugs1.durationType}`,
            async () => {

                await this.locators
                    .durationDropdownByIndex(1)
                    .selectOption(
                        drugs1.durationType
                    );

                await this.locators
                    .selectDurationDropdown
                    .selectOption(
                        drugs1.durationType
                    );
            }
        );


        // =========================================================
        // FIRST DRUG - INSTRUCTION
        // =========================================================

        await StepHelper.step(
            this.page,
            `Enter Instruction - ${drugs1.instruction}`,
            async () => {

                await this.keywords.fill(
                    this.locators.instructionDropdown,
                    drugs1.instruction
                );
            }
        );


        // =========================================================
        // ADD SECOND ROW
        // =========================================================

        await StepHelper.step(
            this.page,
            'Click Add Row',
            async () => {

                await this.keywords.click(
                    this.locators.addRowBtn
                );
            }
        );


        // =========================================================
        // SECOND DRUG
        // =========================================================

        await StepHelper.step(
            this.page,
            `Select Drug - ${drugs2.name}`,
            async () => {

                await this.keywords.click(
                    this.locators.drugSearch
                );

                await this.keywords.click(
                    this.locators.drugLibrary(
                        drugs2.name
                    )
                );

                // Close Drug Library
                await this.page
                    .locator('body')
                    .press('Escape');

                await this.keywords.click(
                    this.locators.editorContainer
                );
            }
        );


        // =========================================================
        // SECOND DRUG - CHECKBOX
        // =========================================================

        await StepHelper.step(
            this.page,
            `Select Drug Checkbox - ${drugs2.name}`,
            async () => {

                await this.keywords.click(
                    this.locators.drugCheckbox(
                        drugs2.name
                    )
                );
            }
        );


        await this.keywords.click(
            this.locators.editorContainer
        );


        // =========================================================
        // SECOND DRUG - DURATION
        // =========================================================

        await StepHelper.step(
            this.page,
            `Select Duration - ${drugs2.durationType}`,
            async () => {

                await this.locators
                    .durationDropdownByIndex(4)
                    .selectOption(
                        drugs2.durationType
                    );

                await this.locators
                    .selectDurationDropdown
                    .selectOption(
                        drugs2.durationType
                    );
            }
        );


        // =========================================================
        // SECOND DRUG - INSTRUCTION
        // =========================================================

        await StepHelper.step(
            this.page,
            `Enter Instruction - ${drugs2.instruction}`,
            async () => {

                await this.keywords.fill(
                    this.locators.drugInstruction(
                        drugs2.name
                    ),
                    drugs2.instruction
                );
            }
        );


        await this.keywords.click(
            this.locators.editorContainer
        );
    }


    // =========================================================
    // ADD SIGNATURE
    // =========================================================

    async addSignature() {

        await this.locators.addSignatureBtn.waitFor({
            state: 'visible'
        });

        await this.locators.addSignatureBtn.click();

        if (
            await this.locators.signatureCanvas
                .isVisible()
                .catch(() => false)
        ) {

            const box =
                await this.locators.signatureCanvas
                    .boundingBox();

            if (box) {

                await this.page.mouse.move(
                    box.x + 20,
                    box.y + 20
                );

                await this.page.mouse.down();

                await this.page.mouse.move(
                    box.x + 80,
                    box.y + 40
                );

                await this.page.mouse.up();
            }
        }

        await this.locators.saveSignatureBtn.click();
    }

 
}
 
module.exports = { PrescriptionPage };