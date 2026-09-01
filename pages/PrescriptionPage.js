const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PrescriptionLocator } = require('../Locators/PrescriptionLocator.js');
const { Keywords } = require('../utils/Keywords');

class PrescriptionPage {

    constructor(page) {
        this.page = page;
        this.locators = new PrescriptionLocator(page);
        this.keywords = new Keywords();
    }

    async openScheduledAppointment() {
        await this.locators.appointmentCard.waitFor({ state: 'visible' });
        await this.locators.appointmentCard.click();
    }

    async clickWritePrescription() {

        await StepHelper.step(
            this.page,
            'Click Write Prescription',
            async () => {
                await this.keywords.click(
                    this.locators.writePrescriptionBtn
                );
            }
        );
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

    // async ApplyTemplate(templateName, time) {

    //     await this.locators.documentBody.waitFor({
    //         state: 'visible',
    //         timeout: time
    //     });

    //     await this.locators.panelSearch.click();

    //     await this.locators.templateSearchInput.fill(
    //         templateName
    //     );

    //     await this.locators.templateSearchInput.press('Enter');

    //     const templateItem =
    //         this.locators.templateItem(templateName);

    //     await templateItem.waitFor({
    //         state: 'visible',
    //         timeout: time
    //     });

    //     await templateItem.hover();

    //     await templateItem.click();
    // }

    async ApplyTemplate(templateName, time) {

        await StepHelper.step(
            this.page,
            'Open Prescription Document',
            async () => {
                await this.keywords.waitForElement(
                    this.locators.documentBody,
                    time
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Open Template Search',
            async () => {
                await this.keywords.click(
                    this.locators.panelSearch
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Search Template - ${templateName}`,
            async () => {
                await this.keywords.fill(
                    this.locators.templateSearchInput,
                    templateName
                );

                await this.keywords.press(
                    this.locators.templateSearchInput,
                    'Enter'
                );
            }
        );

        const templateItem =
            this.locators.templateItem(templateName);

        await StepHelper.step(
            this.page,
            `Select Template - ${templateName}`,
            async () => {
                await this.keywords.hoverAndClick(
                    templateItem
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Apply Template',
            async () => {
                await this.keywords.click(
                    this.locators.applyTemplateBtn
                );
            }
        );

        // await StepHelper.step(
        //     this.page,
        //     'Click Left Arrow',
        //     async () => {
        //         await this.keywords.click(
        //             this.locators.leftarrowBtn
        //         );
        //     }
        // );

        await StepHelper.step(
            this.page,
            'Click Left Arrow if available',
            async () => {

                if (
                    await this.locators.leftarrowBtn
                        .isVisible()
                        .catch(() => false)
                ) {
                    await this.keywords.click(
                        this.locators.leftarrowBtn
                    );
                } else {
                    console.log(
                        'Left Arrow is not available, continuing without clicking.'
                    );
                }

                await this.page.waitForTimeout(
                    time
                );
            }
        );

    }

    async fillObservationfirst(
        drugName,
        durationType,
        instruction
    ) {

        await StepHelper.step(
            this.page,
            `Select Drug - ${drugName}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstDrugCell
                );

                await this.page.waitForTimeout(500);

                await this.keywords.type(
                    this.locators.firstDrugSearchInput,
                    drugName
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Select Duration - ${durationType}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstDurationOption
                );

                await this.page.waitForTimeout(500);

                await this.keywords.selectOption(
                    this.locators.firstDurationDropdown,
                    durationType
                );

            }
        );

        await StepHelper.step(
            this.page,
            `Select Duration - ${durationType}`,
            async () => {

                await this.keywords.click(
                    this.locators.secondDurationoption
                );

                await this.page.waitForTimeout(500);

                 await this.keywords.selectOption(
                    this.locators.SecondDurationDropdown,
                    durationType
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Select Instruction - ${instruction}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstInstructionsCell
                );

                await this.keywords.click(
                    this.locators.firstInstructionInput
                );

                await this.keywords.type(
                    this.locators.firstInstructionInput,
                    instruction
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Add New Row',
            async () => {

                await this.keywords.click(
                    this.locators.addRowBtn
                );
            }
        );
    }

    async PrescriptionObservation(templateName, time, drugName, durationType, instruction) {

        await this.clickWritePrescription();

        await this.ApplyTemplate(
            templateName,
            time
        );

        await this.fillObservationfirst(
            drugName,
            durationType,
            instruction
        );

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

                await this.locator.drugSearch.waitFor({
                    state: 'visible',
                    timeout: 50000
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

    async fillPrescriptionObservation(observationData) {

        await StepHelper.step(
            this.page,
            'Fill Prescription Observation',
            async () => {

                // Row 1 - Column 1
                await this.keywords.click(
                    this.locators.observationSearchByIndex(3)
                );

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row1.column1
                    )
                );

                await this.locators.editorContainer.click();


                // Row 1 - Column 2
                await this.keywords.click(
                    this.locators.observationSearchByIndex(4)
                );

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row1.column2
                    )
                );

                await this.locators.editorContainer.click();


                // Row 1 - Column 3
                await this.keywords.click(
                    this.locators.observationSearchByIndex(5)
                );

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row1.column3
                    )
                );

                await this.locators.editorContainer.click();


                // Row 1 - Column 4
                await this.locators.row1Column4Search.click();

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row1.column4
                    )
                );

                await this.locators.editorContainer.click();


                // Add Row 2
                await this.locators.addRowBtn.click();


                // Row 2 - Column 1
                await this.locators.row2Column1Search.click();

                await this.locators.favouriteOption.click();

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row2.column1
                    )
                );

                await this.locators.editorContainer.click();


                // Row 2 - Column 2
                await this.locators.row2Column2Search.click();

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row2.column2
                    )
                );

                await this.locators.editorContainer.click();


                // Row 2 - Column 3
                await this.locators.row2Column3Search.click();

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row2.column3
                    )
                );

                await this.locators.editorContainer.click();


                // Row 2 - Column 4
                await this.locators.row2Column4Search.click();

                await this.keywords.click(
                    this.locators.observationOption(
                        observationData.row2.column4
                    )
                );

                await this.locators.editorContainer.click();

            }
        );
    }


}

module.exports = { PrescriptionPage };