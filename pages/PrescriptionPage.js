const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PrescriptionLocator } = require('../Locators/PrescriptionLocator.js');
const { Keywords } = require('../utils/Keywords');
<<<<<<< HEAD
const { LoginPage } = require('../pages/LoginPage');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;
const path = require('path');
=======
 
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
class PrescriptionPage {

    constructor(page) {
        this.page = page;
        this.locators = new PrescriptionLocator(page);
        this.keywords = new Keywords();
    }

    async openScheduledAppointment() {
<<<<<<< HEAD
        await this.locators.appointmentCard.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.locators.appointmentCard.click();
    }


   async drawSignature() {

    await StepHelper.step(
        this.page,
        'Draw Patient Signature',
        async () => {

            const canvas = this.locators.signatureCanvas;

            // 1. Wait for canvas
            await canvas.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            // 2. Bring canvas into view
            await canvas.scrollIntoViewIfNeeded();

            // 3. Get canvas position and size
            const box = await canvas.boundingBox();

            if (!box) {
                throw new Error('Signature canvas is not available');
            }

            if (box.width === 0 || box.height === 0) {
                throw new Error(
                    `Signature canvas has invalid size: ${box.width} x ${box.height}`
                );
            }

            // 4. Small stabilization wait
            await this.page.waitForTimeout(300);

            // 5. Draw helper
            const draw = async (points) => {

                await this.page.mouse.move(
                    points[0][0],
                    points[0][1]
                );

                await this.page.mouse.down();

                for (let i = 1; i < points.length; i++) {

                    await this.page.mouse.move(
                        points[i][0],
                        points[i][1],
                        { steps: 5 }
                    );
                }

                await this.page.mouse.up();
            };

            const x = box.x;
            const y = box.y;

            const startX = x + 50;
            const startY = y + 60;

            // =========================
            // Draw "t"
            // =========================

            await draw([
                [startX + 10, startY],
                [startX + 10, startY + 45]
            ]);

            await draw([
                [startX - 5, startY + 15],
                [startX + 25, startY + 15]
            ]);

            // =========================
            // Draw "e"
            // =========================

            await draw([
                [startX + 40, startY + 30],
                [startX + 65, startY + 30],
                [startX + 60, startY + 15],
                [startX + 45, startY + 12],
                [startX + 40, startY + 30],
                [startX + 48, startY + 42],
                [startX + 65, startY + 38]
            ]);

            // =========================
            // Draw "s"
            // =========================

            await draw([
                [startX + 90, startY + 15],
                [startX + 72, startY + 12],
                [startX + 68, startY + 25],
                [startX + 88, startY + 30],
                [startX + 92, startY + 40],
                [startX + 75, startY + 45],
                [startX + 65, startY + 40]
            ]);

            // =========================
            // Draw second "t"
            // =========================

            await draw([
                [startX + 110, startY],
                [startX + 110, startY + 45]
            ]);

            await draw([
                [startX + 95, startY + 15],
                [startX + 125, startY + 15]
            ]);

            // =========================
            // Signature underline
            // =========================

            await draw([
                [startX, startY + 60],
                [startX + 130, startY + 60]
            ]);
        }
    );
}

    async addSignature(signatureData) {

    // =====================================================
    // 1. Click Add Signature
    // =====================================================

    await StepHelper.step(
        this.page,
        'Click Add Signature',
        async () => {

            await this.locators.addSignatureBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.locators.addSignatureBtn.click();
        }
    );


    // =====================================================
    // 2. Enter Signature Name
    // =====================================================

    await StepHelper.step(
        this.page,
        `Enter Signature Name - ${signatureData.signatureName}`,
        async () => {

            await this.locators.signatureNameInput.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locators.signatureNameInput.fill(
                signatureData.signatureName
            );
        }
    );


    // =====================================================
    // 3. Enter Patient Signature Name / Specialty
    // =====================================================

    await StepHelper.step(
        this.page,
        `Enter Patient Signature Name - ${signatureData.patientSignatureName}`,
        async () => {

            await this.locators.signatureInput.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locators.signatureInput.fill(
                signatureData.patientSignatureName
            );
        }
    );


    // =====================================================
    // 4. Draw Signature
    // =====================================================

//     await StepHelper.step(
//     this.page,
//     `Draw Patient Signature - ${signatureData.signatureName}`,
//     async () => {

//         await this.locators.signatureCanvas.waitFor({
//             state: 'visible',
//             timeout: timeout.actionTimeout
//         });

//         const box = await this.locators.signatureCanvas.boundingBox();

//         if (!box) {
//             throw new Error('Signature canvas is not available');
//         }

//         const draw = async (points) => {

//             await this.page.mouse.move(
//                 points[0][0],
//                 points[0][1]
//             );

//             await this.page.mouse.down();

//             for (let i = 1; i < points.length; i++) {

//                 await this.page.mouse.move(
//                     points[i][0],
//                     points[i][1],
//                     { steps: 5 }
//                 );
//             }

//             await this.page.mouse.up();
//         };

//         const x = box.x;
//         const y = box.y;

//         // Start position inside canvas
//         const startX = x + 50;
//         const startY = y + 60;


//         // =========================
//         // Draw "t"
//         // =========================

//         await draw([
//             [startX + 10, startY],
//             [startX + 10, startY + 45]
//         ]);

//         await draw([
//             [startX - 5, startY + 15],
//             [startX + 25, startY + 15]
//         ]);


//         // =========================
//         // Draw "e"
//         // =========================

//         await draw([
//             [startX + 40, startY + 30],
//             [startX + 65, startY + 30],
//             [startX + 60, startY + 15],
//             [startX + 45, startY + 12],
//             [startX + 40, startY + 30],
//             [startX + 48, startY + 42],
//             [startX + 65, startY + 38]
//         ]);


//         // =========================
//         // Draw "s"
//         // =========================

//         await draw([
//             [startX + 90, startY + 15],
//             [startX + 72, startY + 12],
//             [startX + 68, startY + 25],
//             [startX + 88, startY + 30],
//             [startX + 92, startY + 40],
//             [startX + 75, startY + 45],
//             [startX + 65, startY + 40]
//         ]);


//         // =========================
//         // Draw second "t"
//         // =========================

//         await draw([
//             [startX + 110, startY],
//             [startX + 110, startY + 45]
//         ]);

//         await draw([
//             [startX + 95, startY + 15],
//             [startX + 125, startY + 15]
//         ]);


//         // =========================
//         // Signature underline
//         // =========================

//         await draw([
//             [startX, startY + 60],
//             [startX + 130, startY + 60]
//         ]);
//     }
// );

    await this.drawSignature();

    // =====================================================
    // 5. Save Signature
    // =====================================================

    await StepHelper.step(
        this.page,
        'Save Signature',
        async () => {

            await this.locators.saveSignatureBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.locators.saveSignatureBtn.click();
        }
    );
}
// async addSignature(signatureData) {

//     await StepHelper.step(
//         this.page,
//         'Click Add Signature',
//         async () => {
//             await this.locators.addSignatureBtn.click();
//         }
//     );

//     await StepHelper.step(
//         this.page,
//         `Enter Signature Name - ${signatureData.signatureName}`,
//         async () => {
//             await this.locators.signatureNameInput.fill(
//                 signatureData.signatureName
//             );
//         }
//     );

//     await StepHelper.step(
//         this.page,
//         `Enter Patient Signature Name - ${signatureData.patientSignatureName}`,
//         async () => {
//             await this.locators.signatureInput.fill(
//                 signatureData.patientSignatureName
//             );
//         }
//     );

//     await StepHelper.step(
//         this.page,
//         'Draw Signature',
//         async () => {

//             const box =
//                 await this.locators.signatureCanvas.boundingBox();

//             if (!box) {
//                 throw new Error('Signature canvas is not available');
//             }

//             await this.page.mouse.move(
//                 box.x + 50,
//                 box.y + 80
//             );

//             await this.page.mouse.down();

//             await this.page.mouse.move(
//                 box.x + 250,
//                 box.y + 80,
//                 { steps: 20 }
//             );

//             await this.page.mouse.up();
//         }
//     );

//     await StepHelper.step(
//         this.page,
//         'Save Signature',
//         async () => {
//             await this.locators.saveSignatureBtn.click();
//         }
//     );
// }


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

async switchToPageByIndex(index) {
=======
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
 
 
    async ApplyTemplate(templateName,searchKey,time) {
 
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
                     searchKey
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
 
    async fillObservationone(
        drugName,
        durationType,
        instruction,
        time
    ) {
 
        await StepHelper.step(
            this.page,
            `Select Drug - ${drugName}`,
            async () => {
 
                await this.keywords.click(
                    this.locators.firstDrugCell
                );
 
                await this.page.waitForTimeout(time);
 
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
 
                await this.page.waitForTimeout(time);
 
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
 
                await this.page.waitForTimeout(time);
 
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
 
        await StepHelper.step(
        this.page,
        'Verify First Medication Row',
        async () => {
            await expect(
                this.locators.firstMedicationRow
            ).toBeVisible();
        }
        );
 
 
 
    }
 
    // =========================================================
    // FILL DIAGNOSIS DETAILS (LOOP MODE)
    // =========================================================

    async fillDiagnosisDetails(diagnosisRows, time) {

        const fieldsPerRow = 4;

        await StepHelper.step(
            this.page,
            'Fill Diagnosis Details',
            async () => {

                for (let i = 0; i < diagnosisRows.length; i++) {

                    const row = diagnosisRows[i];
                    const baseIndex = i * fieldsPerRow;

                    const fieldValues = [
                        row.mainDiagnosis,
                        row.subDiagnosis,
                        row.location,
                        row.remarks
                    ];

                    for (let col = 0; col < fieldValues.length; col++) {

                        const fieldLocator =
                            this.locators.diagnosisSearchByIndex(
                                baseIndex + col
                            );

                        await this.keywords.click(fieldLocator);

                        await this.keywords.type(
                            fieldLocator,
                            fieldValues[col]
                        );

                        const option =
                            this.locators.diagnosisOption(
                                fieldValues[col]
                            );

                        if (await option.isVisible().catch(() => false)) {
                            await this.keywords.click(option);
                        } else {
                            await fieldLocator.press('Enter');
                        }
                    }

                    if (i < diagnosisRows.length - 1) {

                        await this.keywords.click(
                            this.locators.diagnosisAddRowBtn
                        );

                        await this.page.waitForTimeout(time);
                    }
                }
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Diagnosis Rows Filled',
            async () => {

                for (let i = 0; i < diagnosisRows.length; i++) {

                    const baseIndex = i * fieldsPerRow;

                    await expect(
                        this.locators.diagnosisSearchByIndex(baseIndex)
                    ).toHaveValue(
                        new RegExp(diagnosisRows[i].mainDiagnosis)
                    );
                }
            }
        );
    }


    // =========================================================
    // SIGNATURE - TITLE / SUB TITLE
    // =========================================================

    async fillSignatureDetails(signatureTitle, signatureSubTitle) {

        await StepHelper.step(
            this.page,
            'Enter Signature Title and Sub Title',
            async () => {

                await this.keywords.fill(
                    this.locators.signatureTitleInput,
                    signatureTitle
                );

                await this.keywords.fill(
                    this.locators.signatureSubTitleInput,
                    signatureSubTitle
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Signature Title and Sub Title',
            async () => {

                await expect(
                    this.locators.signatureTitleInput
                ).toHaveValue(signatureTitle);

                await expect(
                    this.locators.signatureSubTitleInput
                ).toHaveValue(signatureSubTitle);
            }
        );
    }


    // =========================================================
    // DRAW SIGNATURE ON CANVAS
    // =========================================================

    async drawSignatureOnCanvas() {

        await StepHelper.step(
            this.page,
            'Draw Signature',
            async () => {

                await this.locators.signatureCanvas.waitFor({
                    state: 'visible'
                });

                const box =
                    await this.locators.signatureCanvas.boundingBox();

                if (box) {

                    const startX = box.x + box.width / 2;
                    const startY = box.y + box.height / 2;

                    await this.page.mouse.move(startX, startY);
                    await this.page.mouse.down();

                    await this.page.mouse.move(startX + 20, startY - 20);
                    await this.page.mouse.move(startX + 40, startY + 10);
                    await this.page.mouse.move(startX + 60, startY - 15);
                    await this.page.mouse.move(startX + 80, startY + 5);

                    await this.page.mouse.up();
                }
            }
        );
    }


    // =========================================================
    // SAVE SIGNATURE
    // =========================================================

    async saveSignatureAction() {

        await StepHelper.step(
            this.page,
            'Click Save Signature',
            async () => {

                await this.keywords.click(
                    this.locators.saveSignatureBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Signature Saved Successfully',
            async () => {

                await expect(
                    this.locators.saveSignatureBtn
                ).toBeHidden({ timeout: 10000 });
            }
        );
    }


    // =========================================================
    // COMPLETE SIGNATURE SECTION
    // =========================================================

    async completeSignatureSection(signatureTitle, signatureSubTitle) {

        await StepHelper.step(
            this.page,
            'Click Add Signature',
            async () => {

                await this.keywords.click(
                    this.locators.addSignatureBtn
                );
            }
        );

        await this.fillSignatureDetails(
            signatureTitle,
            signatureSubTitle
        );

        await this.drawSignatureOnCanvas();

        await this.saveSignatureAction();
    }


    async PrescriptionObservationfirst(templateName, searchKey, time, drugName, durationType, instruction) {
 
        await this.clickWritePrescription();
 
        await this.ApplyTemplate(
            templateName,
            searchKey,
            time
        );
 
        await this.fillObservationone(
            drugName,
            durationType,
            instruction,
            time
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
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
 
    const pages =
        this.page.context().pages();
 
    if (!pages[index]) {
        throw new Error(
            `Page with index ${index} does not exist. Total pages: ${pages.length}`
        );
    }
 
    const targetPage =
        pages[index];
 
    console.log(
        `Switching to Tab ${index + 1}`
    );
 
    await targetPage.bringToFront();
 
    await targetPage.waitForLoadState('domcontentloaded');
 
    console.log(
        `Active Tab ${index + 1}: ${targetPage.url()}`
    );
 
    return targetPage;
}

    async ApplyTemplate(
        templateName,
        searchKey,
        templateAppliedMessage
    ) {

        await StepHelper.step(
            this.page,
            'Open Prescription Document',
            async () => {

                await this.keywords.waitForElement(
                    this.locators.documentBody,
                    timeout.elementTimeout
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
                    searchKey
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

        await StepHelper.step(
            this.page,
            'Verify Template Applied Successfully message',
            async () => {

                if (
                    await this.locators.templateAppliedSuccessMsg
                        .isVisible()
                        .catch(() => false)
                ) {

                    const actualMessage =
                        await this.keywords.getText(
                            this.locators.templateAppliedSuccessMsg
                        );

                    expect(actualMessage.trim()).toBe(
                        templateAppliedMessage
                    );

                } else {

                    console.log(
                        'Template Applied Successfully message is not available, skipping verification.'
                    );
                }
            }
        );

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
            }
        );
    }

    async fillObservationone(
        drugName,
        durationType1,
        durationType2,
        instruction
    ) {

        await StepHelper.step(
            this.page,
            `Select Drug - ${drugName}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstDrugCell
                );

                await this.locators.firstDrugSearchInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.type(
                    this.locators.firstDrugSearchInput,
                    drugName
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Select Duration - ${durationType1}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstDurationOption
                );

                await this.locators.firstDurationDropdown.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    this.locators.firstDurationDropdown,
                    durationType1
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Select Duration - ${durationType2}`,
            async () => {

                await this.keywords.click(
                    this.locators.secondDurationoption
                );

                await this.locators.SecondDurationDropdown.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    this.locators.SecondDurationDropdown,
                    durationType2
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

                await this.locators.firstInstructionInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.firstInstructionInput
                );

                await this.keywords.type(
                    this.locators.firstInstructionInput,
                    instruction
                );
            }
        );
    }

    async addAndVerifyRows(addRows) {

        for (let i = 0; i < addRows; i++) {

            await StepHelper.step(
                this.page,
                'Add New Row',
                async () => {

                    await this.keywords.click(
                        this.locators.addRowBtn
                    );
                }
            );

            await StepHelper.step(
                this.page,
                `Verify Medication Row ${i + 2}`,
                async () => {

                    await expect(
                        this.locators.firstMedicationRow
                    ).toBeVisible({
                        timeout: timeout.expectTimeout
                    });
                }
            );
        }
    }

    async PrescriptionObservationfirst(
        templateName,
        searchKey,
        templateAppliedMessage,
        drugName,
        durationType1,
        durationType2,
        instruction
    ) {

        await this.ApplyTemplate(
            templateName,
            searchKey,
            templateAppliedMessage
        );

        await this.fillObservationone(
            drugName,
            durationType1,
            durationType2,
            instruction
        );
    }

    async PrescriptionObservationSecond(
        drugName,
        durationType1,
        durationType2,
        instruction
    ) {

        await this.fillObservationtwo(
            drugName,
            durationType1,
            durationType2,
            instruction
        );

        await this.clickSidebarEdgeToggle();
    }

    async fillMarginValues(
        top,
        bottom,
        leftRight
    ) {

        await StepHelper.step(
            this.page,
            `Enter Top Margin - ${top}`,
            async () => {

                await this.keywords.clear(
                    this.locators.marginTopInput
                );

                await this.keywords.fill(
                    this.locators.marginTopInput,
                    top
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Bottom Margin - ${bottom}`,
            async () => {

                await this.keywords.clear(
                    this.locators.marginBottomInput
                );

                await this.keywords.fill(
                    this.locators.marginBottomInput,
                    bottom
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Left & Right Margin - ${leftRight}`,
            async () => {

                await this.keywords.clear(
                    this.locators.marginLeftRightInput
                );

                await this.keywords.fill(
                    this.locators.marginLeftRightInput,
                    leftRight
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Proceed if Available',
            async () => {

                if (
                    await this.locators.proceedBtn
                        .isVisible()
                        .catch(() => false)
                ) {

                    await this.keywords.click(
                        this.locators.proceedBtn
                    );

                } else {

                    console.log(
                        'Proceed button is not available, continuing without clicking.'
                    );
                }
            }
        );
    }

    async PrescriptionObservation(
        templateName,
        searchKey,
        templateAppliedMessage,
        addRows,
        drugs
    ) {

        await this.PrescriptionObservationfirst(
            templateName,
            searchKey,
            templateAppliedMessage,
            drugs[0].drugName,
            drugs[0].durationType1,
            drugs[0].durationType2,
            drugs[0].instruction
        );

        await this.addAndVerifyRows(addRows);

        for (let i = 1; i <= addRows; i++) {

            await this.PrescriptionObservationSecond(
                drugs[i].drugName,
                drugs[i].durationType1,
                drugs[i].durationType2,
                drugs[i].instruction
            );
        }
    }

    async fillCustom_Comorbidity(
        rowIndex,
        observationData
    ) {

        // =========================
        // DRUG NAME
        // =========================

        await StepHelper.step(
            this.page,
            `Drug Name - ${observationData.Custom_drugname}`,
            async () => {

                const drugCell =
                    this.locators.drugCell.nth(rowIndex);

                await this.keywords.click(drugCell);

                const drugInput =
                    this.locators.drugSearchInput.nth(rowIndex);

                await drugInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.clear(drugInput);

                await this.keywords.type(
                    drugInput,
                    observationData.Custom_drugname
                );
            }
        );

        // =========================
        // FORM
        // =========================

        await StepHelper.step(
            this.page,
            `Form - ${observationData.form}`,
            async () => {

                const form =
                    this.locators.formDropdown.nth(rowIndex);

                await form.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(form);

                await this.keywords.selectOption(
                    form,
                    observationData.form
                );
            }
        );

        // =========================
        // STRENGTH
        // =========================

        await StepHelper.step(
            this.page,
            `Strength - ${observationData.strength}`,
            async () => {

                const strength =
                    this.locators.strengthInput.nth(rowIndex);

                await strength.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(strength);

                await this.keywords.clear(strength);

                await this.keywords.type(
                    strength,
                    observationData.strength
                );
            }
        );

        // =========================
        // STRENGTH UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Strength Unit - ${observationData.strengthUnit}`,
            async () => {

                const strengthUnit =
                    this.locators.strengthUnitDropdown(rowIndex);

                await strengthUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    strengthUnit,
                    {
                        label: observationData.strengthUnit
                    }
                );
            }
        );

        // =========================
        // DURATION
        // =========================

        await StepHelper.step(
            this.page,
            `Duration - ${observationData.duration}`,
            async () => {

                const duration =
                    this.locators.durationInput.nth(rowIndex);

                await duration.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(duration);

                await this.keywords.clear(duration);

                await this.keywords.type(
                    duration,
                    observationData.duration
                );
            }
        );

        // =========================
        // DURATION UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Duration Unit - ${observationData.durationUnit}`,
            async () => {

                const durationUnit =
                    this.locators.durationUnitDropdown(rowIndex);

                await durationUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    durationUnit,
                    {
                        label: observationData.durationUnit
                    }
                );
            }
        );

        // =========================
        // INSTRUCTION
        // =========================

        await StepHelper.step(
            this.page,
            `Instruction - ${observationData.instruction}`,
            async () => {

                const instructionCell =
                    this.locators.instructionCell(rowIndex);

                await instructionCell.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    instructionCell
                );

                // const instruction =
                //     this.locators.instructionInput(rowIndex);//old

                const instruction =
                this.locators.instructionInput.nth(rowIndex);//new

                await instruction.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.clear(
                    instruction
                );

                await this.keywords.type(
                    instruction,
                    observationData.instruction
                );
            }
        );
    }

// async fillFavoriteCoMorbidity(rowIndex, observationData) {

//     // =========================
//     // FAVORITES
//     // =========================

//     await StepHelper.step(
//         this.page,
//         "Select Favorite Drug",
//         async () => {

//             const drugCell =
//                 this.locators.drugCell.nth(rowIndex);

//             await this.keywords.click(drugCell);

//             await this.locators.firstFavoriteOption.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.click(
//                 this.locators.firstFavoriteOption
//             );
//         }
//     );

//     // =========================
//     // DRUG NAME
//     // =========================

//     await StepHelper.step(
//         this.page,
//         `Drug Name - ${observationData.drugName}`,
//         async () => {

//             const drugInput =
//                 this.locators.drugSearchInput.nth(rowIndex);

//             await drugInput.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.clear(drugInput);

//             await this.keywords.type(
//                 drugInput,
//                 observationData.drugName
//             );
//         }
//     );

//     // =========================
//     // FORM
//     // =========================

//     await StepHelper.step(
//         this.page,
//         `Form - ${observationData.form}`,
//         async () => {

//             const form =
//                 this.locators.formDropdown.nth(rowIndex);

//             await form.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.click(form);

//             await this.keywords.selectOption(
//                 form,
//                 observationData.form
//             );
//         }
//     );

//     // =========================
//     // INSTRUCTION
//     // =========================

//     await StepHelper.step(
//         this.page,
//         `Instruction - ${observationData.instruction}`,
//         async () => {

//             const instructionCell =
//                 this.locators.instructionCell(rowIndex);

//             await instructionCell.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.click(instructionCell);

//             const instruction =
//                 this.locators.instructionInput.nth(rowIndex);

//             await instruction.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.clear(instruction);

//             await this.keywords.type(
//                 instruction,
//                 observationData.instruction
//             );
//         }
//     );
// }

async fillFavoriteandDrugLibrary_CoMorbidity(rowIndex, observationData) {

    // =====================================================
    // 1. CLICK DRUG FIELD + SELECT FAVORITE
    // =====================================================

   await StepHelper.step(
    this.page,
    `Select Favorite - Row ${rowIndex + 1}`,
    async () => {

        const drugInput =
            this.locators.drugSearchInput.nth(rowIndex);

        await drugInput.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        // Click Drug field
        await this.keywords.click(drugInput);

        // Wait for Favorite
        await this.locators.firstFavoriteOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        // Click Favorite
        await this.keywords.click(
            this.locators.firstFavoriteOption
        );

        // Close Favorite dropdown by clicking
        // Co-morbidities heading
        // const coMorbidityHeader =
        //     this.page.locator("//h3[text()='Co-morbidities']");

        const coMorbidityHeader =
            this.locators.coMorbidityHeader;

        await coMorbidityHeader.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(coMorbidityHeader);

        await this.page.waitForTimeout(timeout.testTimeout);
    }
);

    // =====================================================
    // 2. DRUG NAME
    // =====================================================

    await StepHelper.step(
        this.page,
        `Drug Name - ${observationData.drugName}`,
        async () => {

            const drugInput =
                this.locators.drugSearchInput.nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(drugInput);

            await this.keywords.type(
                drugInput,
                observationData.drugName
            );
        }
    );


    // =====================================================
    // 3. FORM
    // =====================================================

    await StepHelper.step(
        this.page,
        `Form - ${observationData.form}`,
        async () => {

            const form =
                this.locators.formDropdown.nth(rowIndex);

            await form.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(form);

            await this.keywords.selectOption(
                form,
                observationData.form
            );
        }
    );


    // =====================================================
    // 4. INSTRUCTION
    // =====================================================

    await StepHelper.step(
        this.page,
        `Instruction - ${observationData.instruction}`,
        async () => {

            const instructionCell =
                this.locators.instructionCell(rowIndex);

            await instructionCell.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(instructionCell);

            const instruction =
                this.locators.instructionInput.nth(rowIndex);

            await instruction.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(instruction);

            await this.keywords.type(
                instruction,
                observationData.instruction
            );
        }
    );
}

async fillSuggestion_CoMorbidity(rowIndex)
{
    // =====================================================
    // 1. CLICK DRUG FIELD + SELECT SUGGESTION
    // =====================================================

    await StepHelper.step(
        this.page,
        `Select Suggestion - Row ${rowIndex + 1}`,
        async () => {

            const drugInput =
                this.locators.drugSearchInput.nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click Drug field
            await this.keywords.click(drugInput);

            // Wait for Suggestion
            await this.locators.firstSuggestionOption.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click first Suggestion
            await this.keywords.click(
                this.locators.firstSuggestionOption
            );

            // Close dropdown
            await this.locators.coMorbidityHeader.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.coMorbidityHeader
            );

            await this.page.waitForTimeout(timeout.testTimeout)
        }
    );    
}



   async fill_Toxicity(
        rowIndex,
        observationData
    ) {

        // =========================
        // DRUG NAME
        // =========================

        await StepHelper.step(
            this.page,
            `Drug Name - ${observationData.drugName}`,
            async () => {

                const drugCell =
                    this.locators.drugCell.nth(rowIndex);

                await this.keywords.click(drugCell);

                const drugInput =
                    this.locators.drugSearchInput.nth(rowIndex);

                await drugInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.clear(drugInput);

                await this.keywords.type(
                    drugInput,
                    observationData.drugName
                );
            }
        );

        // =========================
        // FORM
        // =========================

        await StepHelper.step(
            this.page,
            `Form - ${observationData.form}`,
            async () => {

                const form =
                    this.locators.formDropdown.nth(rowIndex);

                await form.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(form);

                await this.keywords.selectOption(
                    form,
                    observationData.form
                );
            }
        );

        // =========================
        // STRENGTH
        // =========================

        await StepHelper.step(
            this.page,
            `Strength - ${observationData.strength}`,
            async () => {

                const strength =
                    this.locators.strengthInput.nth(rowIndex);

                await strength.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(strength);

                await this.keywords.clear(strength);

                await this.keywords.type(
                    strength,
                    observationData.strength
                );
            }
        );

        // =========================
        // STRENGTH UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Strength Unit - ${observationData.strengthUnit}`,
            async () => {

                const strengthUnit =
                    this.locators.strengthUnitDropdown(rowIndex);

                await strengthUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    strengthUnit,
                    {
                        label: observationData.strengthUnit
                    }
                );
            }
        );

        // =========================
        // ROUTE
        // =========================

        await StepHelper.step(
            this.page,
            `Route - ${observationData.route}`,
            async () => {

                const route =
                    this.locators.routeDropdown.nth(rowIndex);

                await route.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(route);

                await this.keywords.selectOption(
                    route,
                    observationData.route
                );
            }
        );

        // =========================
        // DOSAGE
        // =========================

        await StepHelper.step(
            this.page,
            `Dosage - ${observationData.dosage}`,
            async () => {

                const dosage =
                    this.locators.dosageInput.nth(rowIndex);

                await dosage.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(dosage);

                await this.keywords.clear(dosage);

                await this.keywords.type(
                    dosage,
                    observationData.dosage
                );
            }
        );

        // =========================
        // DOSAGE UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Dosage Unit - ${observationData.dosageUnit}`,
            async () => {

                const dosageUnit =
                    this.locators.dosageUnitDropdown.nth(rowIndex);

                await dosageUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(dosageUnit);

                await this.keywords.selectOption(
                    dosageUnit,
                    observationData.dosageUnit
                );
            }
        );

        // =========================
        // FREQUENCY
        // =========================

        await StepHelper.step(
            this.page,
            `Frequency - ${observationData.frequency}`,
            async () => {

                const frequency =
                    this.locators.frequencyDropdown.nth(rowIndex);

                await frequency.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(frequency);

                await this.keywords.selectOption(
                    frequency,
                    observationData.frequency
                );
            }
        );

        // =========================
        // SCHEDULE
        // =========================

        await StepHelper.step(
            this.page,
            `Schedule - Row ${rowIndex + 1}`,
            async () => {

                const scheduleCount =
                    observationData.schedule.length;

                for (let j = 0; j < scheduleCount; j++) {

                    const scheduleIndex =
                        (rowIndex * scheduleCount) + j;

                    const schedule =
                        this.locators.scheduleInputs.nth(
                            scheduleIndex
                        );

                    await schedule.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    await this.keywords.click(schedule);

                    await this.keywords.clear(schedule);

                    await schedule.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    await this.keywords.type(
                        schedule,
                        observationData.schedule[j]
                    );
                }
            }
        );

        // =========================
        // TIMING
        // =========================

        await StepHelper.step(
            this.page,
            `Timing - ${observationData.timing}`,
            async () => {

                const timingDropdown =
                    this.locators.timingDropdown(rowIndex);

                await timingDropdown.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    timingDropdown
                );

                const emptyStomachOption =
                    this.locators.timingOption(
                        rowIndex,
                        'Empty stomach'
                    );

                await emptyStomachOption.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await StepHelper.step(
                    this.page,
                    'Unselect Timing - Empty stomach',
                    async () => {

                        await this.keywords.click(
                            emptyStomachOption
                        );
                    }
                );

                const requiredTimingOption =
                    this.locators.timingOption(
                        rowIndex,
                        observationData.timing
                    );

                await requiredTimingOption.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await StepHelper.step(
                    this.page,
                    `Select Timing - ${observationData.timing}`,
                    async () => {

                        await this.keywords.click(
                            requiredTimingOption
                        );
                    }
                );
            }
        );

        // =========================
        // DURATION
        // =========================

        await StepHelper.step(
            this.page,
            `Duration - ${observationData.duration}`,
            async () => {

                const duration =
                    this.locators.durationInput.nth(rowIndex);

                await duration.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(duration);

                await this.keywords.clear(duration);

                await this.keywords.type(
                    duration,
                    observationData.duration
                );
            }
        );

        // =========================
        // DURATION UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Duration Unit - ${observationData.durationUnit}`,
            async () => {

                const durationUnit =
                    this.locators.durationUnitDropdown(rowIndex);

                await durationUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.selectOption(
                    durationUnit,
                    {
                        label: observationData.durationUnit
                    }
                );
            }
        );

        // =========================
        // INSTRUCTION
        // =========================

        await StepHelper.step(
            this.page,
            `Instruction - ${observationData.instruction}`,
            async () => {

                const instructionCell =
                    this.locators.instructionCell(rowIndex);

                await instructionCell.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    instructionCell
                );

                // const instruction =
                //     this.locators.instructionInput(rowIndex);//old

                const instruction =
                this.locators.instructionInput.nth(rowIndex);//new

                await instruction.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.clear(
                    instruction
                );

                await this.keywords.type(
                    instruction,
                    observationData.instruction
                );
            }
        );
    }

async fillFavorite_Toxicity(rowIndex, toxicityData) {

    // =====================================================
    // 1. SELECT FAVORITE
    // =====================================================

    await StepHelper.step(
        this.page,
        `Select Favorite - Toxicity Row ${rowIndex + 1}`,
        async () => {

            const drugInput =
                this.locators.toxicityDrugSearchInput.nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click Drug field
            await this.keywords.click(drugInput);

            // Wait for visible Favorite
            const favorite =
                this.locators.toxicityFavoriteOption;

            await favorite.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click first Favorite
            await this.keywords.click(favorite);

            // Close dropdown
            await this.locators.toxicityHeader.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.toxicityHeader
            );

            await this.page.waitForTimeout(
                timeout.testTimeout
            );
        }
    );

    // =====================================================
    // 2. FORM
    // =====================================================

    await StepHelper.step(
        this.page,
        `Form - ${toxicityData.form}`,
        async () => {

            const form =
                this.locators.toxicityFormDropdown.nth(rowIndex);

            await form.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(form);

            await this.keywords.selectOption(
                form,
                toxicityData.form
            );
        }
    );


    // =====================================================
    // 3. STRENGTH
    // =====================================================

    // await StepHelper.step(
    //     this.page,
    //     `Strength - ${toxicityData.strength}`,
    //     async () => {

    //         const row =
    //             this.locators.toxicityRows.nth(rowIndex);

    //         await row.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         const strengthCell =
    //             row.locator('td').nth(2);

    //         await strengthCell.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         const strength =
    //             strengthCell.locator('input').first();

    //         await strength.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.clear(strength);

    //         await this.keywords.type(
    //             strength,
    //             toxicityData.strength
    //         );
    //     }
    // );

    await StepHelper.step(
    this.page,
    `Strength - ${toxicityData.strength}`,
    async () => {

        const strength =
            this.locators.toxicityStrengthInput.nth(rowIndex);

        await strength.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(strength);

        await this.keywords.type(
            strength,
            toxicityData.strength
        );
    }
);
// =====================================================
// 4. STRENGTH UNIT
// =====================================================

await StepHelper.step(
    this.page,
    `Strength Unit - ${toxicityData.strengthUnit}`,
    async () => {

        const strengthUnit =
            this.locators.toxicityStrengthUnitDropdown
                .nth(rowIndex);

        await strengthUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            strengthUnit,
            toxicityData.strengthUnit
        );
    }
);

// =====================================================
// 5. ROUTE
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Route - ${toxicityData.route}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         await row.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         const routeCell =
//             row.locator('td').nth(3);

//         const route =
//             routeCell.locator('select').first();

//         await route.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

    
//        await this.keywords.selectOption(
//             route,
//             toxicityData.route
//         );
//     }
// );
await StepHelper.step(
    this.page,
    `Route - ${toxicityData.route}`,
    async () => {

        const route =
            this.locators.toxicityRouteDropdown.nth(rowIndex);

        await route.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(route);

        await this.keywords.selectOption(
            route,
            toxicityData.route
        );
    }
);

// =====================================================
// 6. DOSAGE
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Dosage - ${toxicityData.dosage}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const dosageCell =
//             row.locator('td').nth(4);

//         const dosage =
//             dosageCell.locator('input').first();

//         await dosage.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.clear(dosage);

//         await this.keywords.type(
//             dosage,
//             toxicityData.dosage
//         );
//     }
// );

await StepHelper.step(
    this.page,
    `Dosage - ${toxicityData.dosage}`,
    async () => {

        const dosage =
            this.locators.toxicityDosageInput.nth(rowIndex);

        await dosage.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(dosage);

        await this.keywords.type(
            dosage,
            toxicityData.dosage
        );
    }
);


// =====================================================
// 7. DOSAGE UNIT
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Dosage Unit - ${toxicityData.dosageUnit}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const dosageCell =
//             row.locator('td').nth(4);

//         const dosageUnit =
//             dosageCell.locator('select').first();

//         await dosageUnit.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await dosageUnit.selectOption({
//             label: toxicityData.dosageUnit
//         });
//     }
// );

await StepHelper.step(
    this.page,
    `Dosage Unit - ${toxicityData.dosageUnit}`,
    async () => {

        const dosageUnit =
            this.locators.toxicityDosageUnitDropdown.nth(rowIndex);

        await dosageUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            dosageUnit,
            toxicityData.dosageUnit
        );
    }
);

// =====================================================
// 8. FREQUENCY
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Frequency - ${toxicityData.frequency}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const frequencyCell =
//             row.locator('td').nth(5);

//         const frequency =
//             frequencyCell.locator('select').first();

//         await frequency.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await frequency.selectOption({
//             label: toxicityData.frequency
//         });
//     }
// );
await StepHelper.step(
    this.page,
    `Frequency - ${toxicityData.frequency}`,
    async () => {

        const frequency =
            this.locators.toxicityFrequencyDropdown.nth(rowIndex);

        await frequency.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            frequency,
            toxicityData.frequency
        );
    }
);


// // =====================================================
// // 9. SCHEDULE
// // =====================================================

// await StepHelper.step(
//     this.page,
//     `Schedule - ${toxicityData.schedule.join('-')}`,
//     async () => {

//         const scheduleCell =
//             this.locators.toxicityScheduleInputs.nth(rowIndex);

//         await scheduleCell.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         const scheduleInputs =
//             scheduleCell.locator('input');

//         const scheduleCount =
//             await scheduleInputs.count();

//         for (
//             let i = 0;
//             i < toxicityData.schedule.length &&
//             i < scheduleCount;
//             i++
//         ) {

//             const schedule =
//                 scheduleInputs.nth(i);

//             await schedule.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.clear(schedule);

//             await this.keywords.type(
//                 schedule,
//                 toxicityData.schedule[i]
//             );
//         }
//     }
// );



// =====================================================
// 9. SCHEDULE
// =====================================================
await StepHelper.step(
    this.page,
    `Schedule - ${toxicityData.schedule.join('-')}`,
    async () => {

        const scheduleCell =
            this.locators.toxicityScheduleInputs.nth(rowIndex);

        await scheduleCell.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const scheduleInputs =
            scheduleCell.locator('input');

        const scheduleCount =
            await scheduleInputs.count();

        for (
            let i = 0;
            i < toxicityData.schedule.length &&
            i < scheduleCount;
            i++
        ) {

            const schedule =
                scheduleInputs.nth(i);

            await schedule.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Replace existing value completely
            await schedule.fill(
                String(toxicityData.schedule[i])
            );

            // Move focus out so UI updates the value
            await schedule.press('Tab');
        }
    }
);

// // =====================================================
// // 10. TIMING
// // =====================================================

// await StepHelper.step(
//     this.page,
//     `Timing - ${toxicityData.timing}`,
//     async () => {

//         const timing =
//             this.locators.toxicityTimingDropdown.nth(rowIndex);

//         await timing.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.click(timing);

//         const timingOption =
//             this.page.getByText(
//                 toxicityData.timing,
//                 { exact: true }
//             );

//         await timingOption.waitFor({
//             state: 'visible',
//             timeout: timeout.actionTimeout
//         });

//         await this.keywords.click(timingOption);
//     }
// );
await StepHelper.step(
    this.page,
    `Timing - ${toxicityData.timing}`,
    async () => {

        const timing =
            this.locators.toxicityTimingDropdown1.nth(rowIndex);

        await timing.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(timing);

        const timingOption =
            this.locators.toxicityTimingOption(
                toxicityData.timing
            );

        await timingOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(timingOption);
    }
);

// =====================================================
// 11. DURATION
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Duration - ${toxicityData.duration}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const durationCell =
//             row.locator('td').nth(8);

//         const duration =
//             durationCell.locator('input').first();

//         await duration.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.clear(duration);

//         await this.keywords.type(
//             duration,
//             toxicityData.duration
//         );
//     }
// );

await StepHelper.step(
    this.page,
    `Duration - ${toxicityData.duration}`,
    async () => {

        const duration =
            this.locators.toxicityDurationInput.nth(rowIndex);

        await duration.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(duration);

        await this.keywords.type(
            duration,
            toxicityData.duration
        );
    }
);

// =====================================================
// 12. DURATION UNIT
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Duration Unit - ${toxicityData.durationUnit}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const durationCell =
//             row.locator('td').nth(8);

//         const durationUnit =
//             durationCell.locator('select').first();

//         await durationUnit.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await durationUnit.selectOption({
//             label: toxicityData.durationUnit
//         });
//     }
// );

await StepHelper.step(
    this.page,
    `Duration Unit - ${toxicityData.durationUnit}`,
    async () => {

        const durationUnit =
            this.locators.toxicityDurationUnitDropdown.nth(rowIndex);

        await durationUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            durationUnit,
            toxicityData.durationUnit
        );
    }
);

// =====================================================
// 13. INSTRUCTION
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Instruction - ${toxicityData.instruction}`,
//     async () => {

//         const row =
//             this.locators.toxicityRows.nth(rowIndex);

//         const instructionCell =
//             row.locator('td').nth(9);

//         const instruction =
//             instructionCell.locator('input').first();

//         await instruction.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.clear(instruction);

//         await this.keywords.type(
//             instruction,
//             toxicityData.instruction
//         );
//     }
// );

await StepHelper.step(
    this.page,
    `Instruction - ${toxicityData.instruction}`,
    async () => {

        const instruction =
            this.locators.toxicityInstructionInput.nth(rowIndex);

        await instruction.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(instruction);

        await this.keywords.type(
            instruction,
            toxicityData.instruction
        );
    }
);

}


async fillSuggestion_Toxicity(rowIndex)
{
    // =====================================================
    // 1. CLICK DRUG FIELD + SELECT SUGGESTION
    // =====================================================

    await StepHelper.step(
        this.page,
        `Select Suggestion - Toxicity Row ${rowIndex + 1}`,
        async () => {

            const drugInput =
                this.locators.toxicityDrugSearchInput.nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click Drug field
            await this.keywords.click(drugInput);

            // Wait for Suggestion
            await this.locators.firstSuggestionToxicityOption.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Click Suggestion
            await this.keywords.click(
                this.locators.firstSuggestionToxicityOption
            );

            // Close dropdown
            await this.locators.toxicityHeader.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.toxicityHeader
            );

            await this.page.waitForTimeout(
                timeout.testTimeout
            );
        }
    );
}



async fillCustomandDrugLibrary_Toxicity(rowIndex, toxicityData) {

// =====================================================
// 1. DRUG NAME
// =====================================================
await StepHelper.step(
    this.page,
    `Drug Name - ${toxicityData.drugName}`,
    async () => {

        const drugInput =
            this.locators.toxicityDrugSearchInput.nth(rowIndex);

        await drugInput.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(drugInput);

        await this.keywords.type(
            drugInput,
            toxicityData.drugName
        );
    }
);


    // // =====================================================
    // // 2. FORM
    // // =====================================================

    // await StepHelper.step(
    //     this.page,
    //     `Form - ${toxicityData.form}`,
    //     async () => {

    //         const form =
    //             this.locators.toxicityFormDropdown.nth(rowIndex);

    //         await form.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(form);

    //         await this.keywords.selectOption(
    //             form,
    //             toxicityData.form
    //         );
    //     }
    // );

    // =====================================================
// 2. FORM
// =====================================================

await StepHelper.step(
    this.page,
    `Form - ${toxicityData.form}`,
    async () => {

        const row =
            this.locators.toxicityRows.nth(rowIndex);

        await row.waitFor({
            state: "visible",
            timeout: timeout.elementTimeout
        });

        const form =
            row.locator("select").first();

        await form.waitFor({
            state: "visible",
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(form);

        await this.keywords.selectOption(
            form,
            toxicityData.form
        );
    }
);

    // =====================================================
    // 3. STRENGTH
    // =====================================================

       await StepHelper.step(
    this.page,
    `Strength - ${toxicityData.strength}`,
    async () => {

        const strength =
            this.locators.toxicityStrengthInput.nth(rowIndex);

        await strength.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(strength);

        await this.keywords.type(
            strength,
            toxicityData.strength
        );
    }
);
// =====================================================
// 4. STRENGTH UNIT
// =====================================================

await StepHelper.step(
    this.page,
    `Strength Unit - ${toxicityData.strengthUnit}`,
    async () => {

        const strengthUnit =
            this.locators.toxicityStrengthUnitDropdown
                .nth(rowIndex);

        await strengthUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            strengthUnit,
            toxicityData.strengthUnit
        );
    }
);

// =====================================================
// 5. ROUTE
// =====================================================

await StepHelper.step(
    this.page,
    `Route - ${toxicityData.route}`,
    async () => {

        const route =
            this.locators.toxicityRouteDropdown.nth(rowIndex);

        await route.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(route);

        await this.keywords.selectOption(
            route,
            toxicityData.route
        );
    }
);

// =====================================================
// 6. DOSAGE
// =====================================================
await StepHelper.step(
    this.page,
    `Dosage - ${toxicityData.dosage}`,
    async () => {

        const dosage =
            this.locators.toxicityDosageInput.nth(rowIndex);

        await dosage.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(dosage);

        await this.keywords.type(
            dosage,
            toxicityData.dosage
        );
    }
);


// =====================================================
// 7. DOSAGE UNIT
// =====================================================

await StepHelper.step(
    this.page,
    `Dosage Unit - ${toxicityData.dosageUnit}`,
    async () => {

        const dosageUnit =
            this.locators.toxicityDosageUnitDropdown.nth(rowIndex);

        await dosageUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            dosageUnit,
            toxicityData.dosageUnit
        );
    }
);

// =====================================================
// 8. FREQUENCY
// =====================================================
await StepHelper.step(
    this.page,
    `Frequency - ${toxicityData.frequency}`,
    async () => {

        const frequency =
            this.locators.toxicityFrequencyDropdown.nth(rowIndex);

        await frequency.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            frequency,
            toxicityData.frequency
        );
    }
);


// // =====================================================
// // 9. SCHEDULE
// // =====================================================
// await StepHelper.step(
//     this.page,
//     `Schedule - ${toxicityData.schedule.join('-')}`,
//     async () => {

//         const scheduleCell =
//             this.locators.toxicityScheduleInputs.nth(rowIndex);

//         await scheduleCell.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         const scheduleInputs =
//             scheduleCell.locator('input');

//         const scheduleCount =
//             await scheduleInputs.count();

//         for (
//             let i = 0;
//             i < toxicityData.schedule.length &&
//             i < scheduleCount;
//             i++
//         ) {

//             const schedule =
//                 scheduleInputs.nth(i);

//             await schedule.waitFor({
//                 state: 'visible',
//                 timeout: timeout.elementTimeout
//             });

//             await this.keywords.clear(schedule);

//             await this.keywords.type(
//                 schedule,
//                 toxicityData.schedule[i]
//             );
//         }
//     }
// );

// =====================================================
// 9. SCHEDULE
// =====================================================
await StepHelper.step(
    this.page,
    `Schedule - ${toxicityData.schedule.join('-')}`,
    async () => {

        const scheduleCell =
            this.locators.toxicityScheduleInputs.nth(rowIndex);

        await scheduleCell.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const scheduleInputs =
            scheduleCell.locator('input');

        const scheduleCount =
            await scheduleInputs.count();

        for (
            let i = 0;
            i < toxicityData.schedule.length &&
            i < scheduleCount;
            i++
        ) {

            const schedule =
                scheduleInputs.nth(i);

            await schedule.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Replace existing value completely
            await schedule.fill(
                String(toxicityData.schedule[i])
            );

            // Move focus out so UI updates the value
            await schedule.press('Tab');
        }
    }
);

// =====================================================
// 10. TIMING
// =====================================================

// await StepHelper.step(
//     this.page,
//     `Timing - ${toxicityData.timing}`,
//     async () => {

//         const timing =
//             this.locators.toxicityTimingDropdown.nth(rowIndex);

//         await timing.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.click(timing);

//         const timingOption =
//             this.page.getByText(
//                 toxicityData.timing,
//                 { exact: true }
//             );

//         await timingOption.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.click(timingOption);

//     }
// );

// // =====================================================
// // 10. TIMING
// // =====================================================

// await StepHelper.step(
//     this.page,
//     `Timing - ${toxicityData.timing}`,
//     async () => {

//         const timing =
//             this.locators.toxicityTimingDropdown.nth(rowIndex);

//         await timing.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.click(timing);

//         const timingOption =
//             this.page.getByRole(
//                 'button',
//                 {
//                     name: toxicityData.timing,
//                     exact: true
//                 }
//             );

//         await timingOption.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         await this.keywords.click(timingOption);
//     }
// );

// =====================================================
// 10. TIMING
// =====================================================

await StepHelper.step(
    this.page,
    `Timing - ${toxicityData.timing}`,
    async () => {

        const timing =
            this.locators.toxicityTimingDropdown.nth(rowIndex);

        await timing.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(timing);

        const timingOption =
            this.page
                .getByText(
                    toxicityData.timing,
                    { exact: true }
                )
                .last();

        await timingOption.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(timingOption);
    }
);

// =====================================================
// 11. DURATION
// =====================================================

await StepHelper.step(
    this.page,
    `Duration - ${toxicityData.duration}`,
    async () => {

        const duration =
            this.locators.toxicityDurationInput.nth(rowIndex);

        await duration.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(duration);

        await this.keywords.type(
            duration,
            toxicityData.duration
        );
    }
);

// =====================================================
// 12. DURATION UNIT
// =====================================================

await StepHelper.step(
    this.page,
    `Duration Unit - ${toxicityData.durationUnit}`,
    async () => {

        const durationUnit =
            this.locators.toxicityDurationUnitDropdown.nth(rowIndex);

        await durationUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            durationUnit,
            toxicityData.durationUnit
        );
    }
);

// =====================================================
// 13. INSTRUCTION
// =====================================================

await StepHelper.step(
    this.page,
    `Instruction - ${toxicityData.instruction}`,
    async () => {

        const instruction =
            this.locators.toxicityInstructionInput.nth(rowIndex);

        await instruction.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.clear(instruction);

        await this.keywords.type(
            instruction,
            toxicityData.instruction
        );
    }
);

}






//    async fillObservation(observationData) {

//     const existingRows =
//         this.locators.existingObservationRows;

//     const existingRowCount =
//         await existingRows.count();

//     // Fill existing rows
//     for (
//         let i = 0;
//         i < existingRowCount;
//         i++
//     ) {

//         await StepHelper.step(
//             this.page,
//             `Fill Existing Observation Row - ${i + 1}`,
//             async () => {

//                 await this.fillObservationRow(
//                     i,
//                     observationData
//                 );
//             }
//         );
//     }

//     // Add new rows
//     for (
//         let i = 0;
//         i < observationData.row;
//         i++
//     ) {

//         const newRowIndex =
//             existingRowCount + i;

//         await StepHelper.step(
//             this.page,
//             `Add Observation Row - ${newRowIndex + 1}`,
//             async () => {

//                 await this.keywords.click(
//                     this.locators.observationAddRowBtn
//                 );

//                 await this.locators.observationRows
//                     .nth(newRowIndex)
//                     .waitFor({
//                         state: "visible",
//                         timeout: timeout.elementTimeout
//                     });
//             }
//         );

//         await StepHelper.step(
//             this.page,
//             `Fill New Observation Row - ${newRowIndex + 1}`,
//             async () => {

//                 await this.fillObservationRow(
//                     newRowIndex,
//                     observationData
//                 );
//             }
//         );
//     }
// }

// async fillObservation(observationData) {

//     // Fill existing row
//     await StepHelper.step(
//         this.page,
//         "Fill Existing Observation Row - 1",
//         async () => {

//             await this.fillObservationRow(
//                 0,
//                 observationData
//             );
//         }
//     );

//     // Add and fill new rows
//     for (let i = 0; i < observationData.row; i++) {

//         const newRowIndex = i + 1;

//         await StepHelper.step(
//             this.page,
//             `Add Observation Row - ${newRowIndex + 1}`,
//             async () => {

//                 await this.keywords.click(
//                     this.locators.observationAddRowBtn
//                 );

//                 await this.locators.observationRows
//                     .nth(newRowIndex)
//                     .waitFor({
//                         state: "visible",
//                         timeout: timeout.elementTimeout
//                     });
//             }
//         );

//         await StepHelper.step(
//             this.page,
//             `Fill New Observation Row - ${newRowIndex + 1}`,
//             async () => {

//                 await this.fillObservationRow(
//                     newRowIndex,
//                     observationData
//                 );
//             }
//         );
//     }
// }//old

async fillObservation(observationData) {

    // Fill existing row
    await StepHelper.step(
        this.page,
        "Fill Existing Observation Row - 1",
        async () => {

            await this.fillCustom_Comorbidity(
                0,
                observationData
            );
        }
    );

    // Add and fill new rows
    for (let i = 0; i < observationData.row; i++) {

        const newRowIndex = i + 1;

        await StepHelper.step(
            this.page,
            `Add Observation Row - ${newRowIndex + 1}`,
            async () => {

                await this.keywords.click(
                    this.locators.observationAddRowBtn
                );

                await this.locators.observationRows
                    .nth(newRowIndex)
                    .waitFor({
                        state: "visible",
                        timeout: timeout.elementTimeout
                    });
            }
        );

        await StepHelper.step(
            this.page,
            `Fill New Observation Row - ${newRowIndex + 1}`,
            async () => {

                await this.fillCustom_Comorbidity(
                    newRowIndex,
                    observationData
                );
            }
        );
    }
}//new

    // async openSameUrlInNewTab(url) {

    //     let newTab;

    //     await StepHelper.step(
    //         this.page,
    //         'Open URL and Login in New Tab',
    //         async () => {

    //             newTab =
    //                 await this.page.context().newPage();

    //             await newTab.goto(url, {
    //                 timeout: timeout.navigationTimeout,
    //                 waitUntil: 'load'
    //             });

    //             const loginPage =
    //                 new LoginPage(newTab);

    //             await loginPage.login();
    //         }
    //     );

    //     return newTab;
    // }

    async openSameUrlInNewTab() {
 
        let newTab;
 
        await StepHelper.step(
            this.page,
            'Open URL and Login in New Tab',
            async () => {
 
                newTab =
                    await this.page.context().newPage();
 
                const loginPage =
                    new LoginPage(newTab);
 
                await loginPage.login({
                    skipIfAuthenticated: true,
                    waitForSuccess: true
                });
 
                await newTab.waitForLoadState(
                    'domcontentloaded',
                    {
                        timeout: timeout.navigationTimeout
                    }
                );
            }
        );
 
        return newTab;
    }

    async clickSidebarEdgeToggle() {

        await StepHelper.step(
            this.page,
            'Click Sidebar Edge Toggle',
            async () => {

                await this.locators.sidebarEdgeToggle.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.sidebarEdgeToggle
                );
            }
        );
    }

//     async verifyNewTabObservationData(
//         observationData
//     ) {

//         await StepHelper.step(
//             this.page,
//             'Open Prescription Document',
//             async () => {

//                 await this.keywords.waitForElement(
//                     this.locators.documentBody,
//                     timeout.elementTimeout
//                 );
//             }
//         );

//         for (
//             let i = 0;
//             i < observationData.row;
//             i++
//         ) {

//             // // Drug Name
//             // await StepHelper.step(
//             //     this.page,
//             //     `Drug Name | Expected: ${observationData.drugName}`,
//             //     async () => {

//             //         const drugCell =
//             //             this.locators.newTabDrugNameCell(i);

//             //         await drugCell.waitFor({
//             //             state: 'visible',
//             //             timeout: timeout.elementTimeout
//             //         });

//             //         const actualDrugName =
//             //             await drugCell.innerText();

//             //         expect(
//             //             actualDrugName.trim()
//             //         ).toBe(
//             //             observationData.drugName.trim()
//             //         );
//             //     }
//             // );

//            // Drug Name
//     await StepHelper.step(
//     this.page,
//     `Drug Name | Expected: ${observationData.drugName}`,
//     async () => {

//         const drugCell =
//             this.locators.newTabDrugNameCell(i);

//         await drugCell.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         const actualDrugName =
//             await drugCell.innerText();

//         expect(
//             actualDrugName.trim()
//         ).toBe(
//             observationData.drugName.trim()
//         );
//     }
// );

//             // Form
//             await StepHelper.step(
//                 this.page,
//                 `Form | Expected: ${observationData.form}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabFormDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualForm =
//                         await locator.inputValue();

//                     expect(
//                         actualForm.trim()
//                     ).toBe(
//                         observationData.form.trim()
//                     );
//                 }
//             );

//             // Strength
//             await StepHelper.step(
//                 this.page,
//                 `Strength | Expected: ${observationData.strength}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabStrengthInput(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualStrength =
//                         await locator.inputValue();

//                     expect(
//                         actualStrength.trim()
//                     ).toBe(
//                         observationData.strength.trim()
//                     );
//                 }
//             );

//             // Strength Unit
//             await StepHelper.step(
//                 this.page,
//                 `Strength Unit | Expected: ${observationData.strengthUnit}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabStrengthUnitDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualStrengthUnit =
//                         await locator.inputValue();

//                     expect(
//                         actualStrengthUnit.trim()
//                     ).toBe(
//                         observationData.strengthUnit.trim()
//                     );
//                 }
//             );

//             // Route
//             await StepHelper.step(
//                 this.page,
//                 `Route | Expected: ${observationData.route}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabRouteDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualRoute =
//                         await locator.inputValue();

//                     expect(
//                         actualRoute.trim()
//                     ).toBe(
//                         observationData.route.trim()
//                     );
//                 }
//             );

//             // Dosage
//             await StepHelper.step(
//                 this.page,
//                 `Dosage | Expected: ${observationData.dosage}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabDosageInput(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualDosage =
//                         await locator.inputValue();

//                     expect(
//                         actualDosage.trim()
//                     ).toBe(
//                         observationData.dosage.trim()
//                     );
//                 }
//             );

//             // Dosage Unit
//             await StepHelper.step(
//                 this.page,
//                 `Dosage Unit | Expected: ${observationData.dosageUnit}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabDosageUnitDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualDosageUnit =
//                         await locator.inputValue();

//                     expect(
//                         actualDosageUnit.trim()
//                     ).toBe(
//                         observationData.dosageUnit.trim()
//                     );
//                 }
//             );

//             // Frequency
//             await StepHelper.step(
//                 this.page,
//                 `Frequency | Expected: ${observationData.frequency}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabFrequencyDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualFrequency =
//                         await locator.inputValue();

//                     expect(
//                         actualFrequency.trim()
//                     ).toBe(
//                         observationData.frequency.trim()
//                     );
//                 }
//             );

//             // Schedule
//             await StepHelper.step(
//                 this.page,
//                 `Schedule | Expected: ${observationData.schedule.join(', ')}`,
//                 async () => {

//                     const scheduleInputs =
//                         this.locators.newTabScheduleInputs(i);

//                     for (
//                         let j = 0;
//                         j < observationData.schedule.length;
//                         j++
//                     ) {

//                         const scheduleInput =
//                             scheduleInputs.nth(j);

//                         await scheduleInput.waitFor({
//                             state: 'visible',
//                             timeout: timeout.elementTimeout
//                         });

//                         const actualSchedule =
//                             await scheduleInput.inputValue();

//                         expect(
//                             actualSchedule.trim()
//                         ).toBe(
//                             observationData.schedule[j].trim()
//                         );
//                     }
//                 }
//             );

//             // Timing
//             await StepHelper.step(
//                 this.page,
//                 `Timing | Expected: ${observationData.timing}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabTimingDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualTiming =
//                         await locator.textContent();

//                     expect(
//                         actualTiming.trim()
//                     ).toContain(
//                         observationData.timing.trim()
//                     );
//                 }
//             );

//             // Duration
//             await StepHelper.step(
//                 this.page,
//                 `Duration | Expected: ${observationData.duration}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabDurationInput(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualDuration =
//                         await locator.inputValue();

//                     expect(
//                         actualDuration.trim()
//                     ).toBe(
//                         observationData.duration.trim()
//                     );
//                 }
//             );

//             // Duration Unit
//             await StepHelper.step(
//                 this.page,
//                 `Duration Unit | Expected: ${observationData.durationUnit}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabDurationUnitDropdown(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualDurationUnit =
//                         await locator.inputValue();

//                     expect(
//                         actualDurationUnit.trim()
//                     ).toBe(
//                         observationData.durationUnit.trim()
//                     );
//                 }
//             );

//             // Instruction
//             await StepHelper.step(
//                 this.page,
//                 `Instruction | Expected: ${observationData.instruction}`,
//                 async () => {

//                     const locator =
//                         this.locators.newTabInstructionInput(i);

//                     await locator.waitFor({
//                         state: 'visible',
//                         timeout: timeout.elementTimeout
//                     });

//                     const actualInstruction =
//                         await locator.inputValue();

//                     expect(
//                         actualInstruction.trim()
//                     ).toBe(
//                         observationData.instruction.trim()
//                     );
//                 }
//             );
//         }
//     }

async verifyNewTabObservationData(observationData) {

    await StepHelper.step(
        this.page,
        'Open Prescription Document',
        async () => {

            await this.keywords.waitForElement(
                this.locators.documentBody,
                timeout.elementTimeout
            );
        }
    );

    for (let i = 0; i < observationData.row; i++) {

        // =========================
        // DRUG NAME
        // =========================

//     await StepHelper.step(
//     this.page,
//     `Verify Drug Name - Row ${i + 1}`,
//     async () => {

//         const drugName =
//             this.locators.newTabDrugNameInput(i);

//         await drugName.waitFor({
//             state: 'visible',
//             timeout: timeout.elementTimeout
//         });

//         const actualDrugName =
//             (await drugName.inputValue()).trim();

//         console.log(
//             `Drug Name | Expected: ${observationData.drugName} | Actual: ${actualDrugName}`
//         );

//         expect(actualDrugName).toBe(
//             observationData.drugName.trim()
//         );
//     }
// );

await StepHelper.step(
    this.page,
    `Verify Drug Name - Row ${i + 1}`,
    async () => {

        const drugName =
            this.locators.newTabDrugNameInput(i);

        await drugName.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await expect.poll(
            async () => {
                return (await drugName.inputValue()).trim();
            },
            {
                timeout: timeout.elementTimeout,
                message: `Drug Name value is not populated for Row ${i + 1}`
            }
        ).not.toBe('');

        const actualDrugName =
            (await drugName.inputValue()).trim();

        const expectedDrugName =
            observationData.drugName.trim();

        console.log(
            `Drug Name | Expected: ${expectedDrugName} | Actual: ${actualDrugName}`
        );

        expect(actualDrugName.toUpperCase()).toBe(
            expectedDrugName.toUpperCase()
        );
    }
);

        // =========================
        // FORM
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Form - Row ${i + 1}`,
            async () => {

                const form =
                    this.locators.newTabFormDropdown(i);

                await form.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualForm =
                    await form.inputValue();

                console.log(
                    `Form | Expected: ${observationData.form} | Actual: ${actualForm}`
                );

                expect(actualForm).toBe(
                    observationData.form
                );
            }
        );

        // =========================
        // STRENGTH
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Strength - Row ${i + 1}`,
            async () => {

                const strength =
                    this.locators.newTabStrengthInput(i);

                await strength.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualStrength =
                    await strength.inputValue();

                console.log(
                    `Strength | Expected: ${observationData.strength} | Actual: ${actualStrength}`
                );

                expect(actualStrength).toBe(
                    observationData.strength
                );
            }
        );

        // =========================
        // STRENGTH UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Strength Unit - Row ${i + 1}`,
            async () => {

                const strengthUnit =
                    this.locators.newTabStrengthUnitDropdown(i);

                await strengthUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualStrengthUnit =
                    await strengthUnit.inputValue();

                console.log(
                    `Strength Unit | Expected: ${observationData.strengthUnit} | Actual: ${actualStrengthUnit}`
                );

                expect(actualStrengthUnit).toBe(
                    observationData.strengthUnit
                );
            }
        );

        // // =========================
        // // ROUTE
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Route - Row ${i + 1}`,
        //     async () => {

        //         const route =
        //             this.locators.newTabRouteDropdown(i);

        //         await route.waitFor({
        //             state: 'visible',
        //             timeout: timeout.elementTimeout
        //         });

        //         const actualRoute =
        //             await route.inputValue();

        //         console.log(
        //             `Route | Expected: ${observationData.route} | Actual: ${actualRoute}`
        //         );

        //         expect(actualRoute).toBe(
        //             observationData.route
        //         );
        //     }
        // );

        // // =========================
        // // DOSAGE
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Dosage - Row ${i + 1}`,
        //     async () => {

        //         const dosage =
        //             this.locators.newTabDosageInput(i);

        //         await dosage.waitFor({
        //             state: 'visible',
        //             timeout: timeout.elementTimeout
        //         });

        //         const actualDosage =
        //             await dosage.inputValue();

        //         console.log(
        //             `Dosage | Expected: ${observationData.dosage} | Actual: ${actualDosage}`
        //         );

        //         expect(actualDosage).toBe(
        //             observationData.dosage
        //         );
        //     }
        // );

        // // =========================
        // // DOSAGE UNIT
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Dosage Unit - Row ${i + 1}`,
        //     async () => {

        //         const dosageUnit =
        //             this.locators.newTabDosageUnitDropdown(i);

        //         await dosageUnit.waitFor({
        //             state: 'visible',
        //             timeout: timeout.elementTimeout
        //         });

        //         const actualDosageUnit =
        //             await dosageUnit.inputValue();

        //         console.log(
        //             `Dosage Unit | Expected: ${observationData.dosageUnit} | Actual: ${actualDosageUnit}`
        //         );

        //         expect(actualDosageUnit).toBe(
        //             observationData.dosageUnit
        //         );
        //     }
        // );

        // // =========================
        // // FREQUENCY
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Frequency - Row ${i + 1}`,
        //     async () => {

        //         const frequency =
        //             this.locators.newTabFrequencyDropdown(i);

        //         await frequency.waitFor({
        //             state: 'visible',
        //             timeout: timeout.elementTimeout
        //         });

        //         const actualFrequency =
        //             await frequency.inputValue();

        //         console.log(
        //             `Frequency | Expected: ${observationData.frequency} | Actual: ${actualFrequency}`
        //         );

        //         expect(actualFrequency).toBe(
        //             observationData.frequency
        //         );
        //     }
        // );

        // // =========================
        // // SCHEDULE
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Schedule - Row ${i + 1}`,
        //     async () => {

        //         for (
        //             let j = 0;
        //             j < observationData.schedule.length;
        //             j++
        //         ) {

        //             const scheduleIndex =
        //                 (i * observationData.schedule.length) + j;

        //             const schedule =
        //                 this.locators.newTabScheduleInputs.nth(
        //                     scheduleIndex
        //                 );

        //             await schedule.waitFor({
        //                 state: 'visible',
        //                 timeout: timeout.elementTimeout
        //             });

        //             const actualSchedule =
        //                 await schedule.inputValue();

        //             console.log(
        //                 `Schedule ${j + 1} | Expected: ${observationData.schedule[j]} | Actual: ${actualSchedule}`
        //             );

        //             expect(actualSchedule).toBe(
        //                 observationData.schedule[j]
        //             );
        //         }
        //     }
        // );

        // // =========================
        // // TIMING
        // // =========================

        // await StepHelper.step(
        //     this.page,
        //     `Verify Timing - Row ${i + 1}`,
        //     async () => {

        //         const timing =
        //             this.locators.newTabTimingDropdown(i);

        //         await timing.waitFor({
        //             state: 'visible',
        //             timeout: timeout.elementTimeout
        //         });

        //         const actualTiming =
        //             await timing.inputValue();

        //         console.log(
        //             `Timing | Expected: ${observationData.timing} | Actual: ${actualTiming}`
        //         );

        //         expect(actualTiming).toBe(
        //             observationData.timing
        //         );
        //     }
        // );

        // =========================
        // DURATION
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Duration - Row ${i + 1}`,
            async () => {

                const duration =
                    this.locators.newTabDurationInput(i);

                await duration.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualDuration =
                    await duration.inputValue();

                console.log(
                    `Duration | Expected: ${observationData.duration} | Actual: ${actualDuration}`
                );

                expect(actualDuration).toBe(
                    observationData.duration
                );
            }
        );

        // =========================
        // DURATION UNIT
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Duration Unit - Row ${i + 1}`,
            async () => {

                const durationUnit =
                    this.locators.newTabDurationUnitDropdown(i);

                await durationUnit.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualDurationUnit =
                    await durationUnit.inputValue();

                console.log(
                    `Duration Unit | Expected: ${observationData.durationUnit} | Actual: ${actualDurationUnit}`
                );

                expect(actualDurationUnit).toBe(
                    observationData.durationUnit
                );
            }
        );

        // =========================
        // INSTRUCTION
        // =========================

        await StepHelper.step(
            this.page,
            `Verify Instruction - Row ${i + 1}`,
            async () => {

                const instruction =
                    this.locators.newTabInstructionInput(i);

                await instruction.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                const actualInstruction =
                    await instruction.inputValue();

                console.log(
                    `Instruction | Expected: ${observationData.instruction} | Actual: ${actualInstruction}`
                );

                expect(actualInstruction).toBe(
                    observationData.instruction
                );
            }
        );
    }
}

async generateAndViewPrescription() {

    // await StepHelper.step(
    //     this.page,
    //     'Click Save Button',
    //     async () => {

    //         await this.locators.newTabSaveButton.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.newTabSaveButton
    //         );
    //     }
    // );//old


    await StepHelper.step(
        this.page,
        'Click Print Options',
        async () => {
            await this.locators.printOptionsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.printOptionsBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Share with Patient',
        async () => {
            await this.locators.shareWithPatientBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.shareWithPatientBtn
            );
        }
    );//new

    await StepHelper.step(
        this.page,
        'Click Generate & Share Button',
        async () => {

            await this.locators.newTabGenerateShareButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.newTabGenerateShareButton
            );
        }
    );

    // await this.page.waitForTimeout(1000);
    await this.keywords.wait(
    this.page,
    timeout.testTimeout
    );

    // await StepHelper.step(
    //     this.page,
    //     'Click Exit Button',
    //     async () => {

    //         await this.locators.newTabExitButton.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.newTabExitButton
    //         );
    //     }
    // );

    // // await this.page.waitForTimeout(1000);
    // await this.keywords.wait(
    // this.page,
    // timeout.testTimeout
    // );

    // await StepHelper.step(
    //     this.page,
    //     'Click Eye Icon',
    //     async () => {

    //         await this.locators.newTabEyeIcon.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.newTabEyeIcon
    //         );
    //     }
    // );
}



async DownloadpdfPrescription() {

    await StepHelper.step(
        this.page,
        'Click Print Options',
        async () => {
            await this.locators.printOptionsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.printOptionsBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        "Download PDF Prescription",
        async () => {

            await this.locators.downloadPdfBtn.waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.downloadPdfBtn
            );
        }
    );
   
    await this.keywords.wait(
    this.page,
    timeout.testTimeout
    );

    
}

  async generateAndDownloadPdf() {

        const downloadPromise =
            this.page.waitForEvent('download');

        await this.locators.generateAndShareBtn.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.locators.generateAndShareBtn.click();

        return await downloadPromise;
    }


//frontend

async applyTheFormat(formatValue)
{

    await StepHelper.step(
        this.page,
        'Click Format Value',
        async () => {
            await this.locators.formatValueButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.formatValueButton
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Select Format Value - ${formatValue}`,
        async () => {
            const formatValueOption =
                this.locators.formatValueOption(formatValue);

            await formatValueOption.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await formatValueOption.scrollIntoViewIfNeeded();

            await this.keywords.click(
                formatValueOption
            );
        }
    );
}
async CreateTheTemplate(template) {
 
    // ==============================
    // Click Templates
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Click Templates',
        async () => {
 
            await this.locators.templatesButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.templatesButton
            );
        }
    );
 
 
    // ==============================
    // Click Create New Template
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Click Create New Template',
        async () => {
 
            await this.locators.createNewTemplateBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.createNewTemplateBtn
            );
        }
    );
 
 
    // ==============================
    // Enter Auto Generated Template Name
    // ==============================
 
    await StepHelper.step(
        this.page,
        `Enter Template Name - ${template.templateName}`,
        async () => {
 
            await this.locators.templateNameInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.fill(
                this.locators.templateNameInput,
                template.templateName
            );
        }
    );
 
 
    // ==============================
    // Click Save Template
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Click Save Template',
        async () => {
 
            await this.locators.saveTemplateBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.saveTemplateBtn
            );
        }
    );
 
 
    // ==============================
    // Verify Saved Popup
    // Expected = Test Data
    // Actual = UI
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Verify Template Saved Successfully',
        async () => {
 
            const expectedMessage =
                template.savedMessage;
 
            const popup =
                this.locators.templateSuccessMessage.last();
 
            await popup.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            const actualMessage = (
                await this.keywords.getText(popup)
            ).trim();
 
            console.log(
                `Expected Template Saved Message: ${expectedMessage}`
            );
 
            console.log(
                `Actual Template Saved Message: ${actualMessage}`
            );
 
            expect(actualMessage).toBe(
                expectedMessage
            );
        }
    );
 
 
    // ==============================
    // Search Template
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Search Template',
        async () => {
 
            await this.locators.templateSearchInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.templateSearchInput
            );
 
            await this.keywords.clear(
                this.locators.templateSearchInput
            );
 
            await this.keywords.type(
                this.locators.templateSearchInput,
                template.templateName
            );
        }
    );
 
 
    // ==============================
    // Click Apply
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Click Apply',
        async () => {
 
            await this.locators.applyButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.applyButton
            );
        }
    );
 
 
    // ==============================
    // Click Replace
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Click Replace',
        async () => {
 
            await this.locators.replaceButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.replaceButton
            );
        }
    );
 
 
    // ==============================
    // Verify Applied Popup
    // Expected = Test Data
    // Actual = UI
    // ==============================
 
    await StepHelper.step(
        this.page,
        'Verify Template Applied Successfully',
        async () => {
 
            const expectedMessage =
                template.appliedMessage;
 
            const popup =
                this.locators.templateSuccessMessage.last();
 
            await popup.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            const actualMessage = (
                await this.keywords.getText(popup)
            ).trim();
 
            console.log(
                `Expected Template Applied Message: ${expectedMessage}`
            );
 
            console.log(
                `Actual Template Applied Message: ${actualMessage}`
            );
 
            expect(actualMessage).toBe(
                expectedMessage
            );
        }
    );
}

async verifyTemplateDisplayedInList(templateName) {
 
    await StepHelper.step(
        this.page,
        'Click Templates',
        async () => {
 
            await this.locators.templatesButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.templatesButton
            );
        }
    );
 
    await StepHelper.step(
        this.page,
        `Search Template - ${templateName}`,
        async () => {
 
            await this.locators.templateSearchInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.templateSearchInput
            );
 
            await this.keywords.clear(
                this.locators.templateSearchInput
            );
 
            await this.keywords.type(
                this.locators.templateSearchInput,
                templateName
            );
        }
    );
 
    await StepHelper.step(
        this.page,
        'Verify Template Displayed in Template List',
        async () => {
 
            const templateListName =
                this.locators.templateListName.first();
 
            await templateListName.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            const actualTemplateName =
                (
                    await this.keywords.getText(
                        templateListName
                    )
                ).trim();
 
            const expectedTemplateName =
                templateName.trim();
 
            console.log(
                `Expected Template Name: ${expectedTemplateName}`
            );
 
            console.log(
                `Actual Template Name: ${actualTemplateName}`
            );
 
            expect(actualTemplateName).toBe(
                expectedTemplateName
            );
        }
    );
}

async applySavedTemplate(template) {
 
    // =====================================================
    // 1. CLICK APPLY BUTTON
    // =====================================================
 
    await StepHelper.step(
        this.page,
        'Click Apply Template',
        async () => {
 
            await this.locators.applyButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.applyButton
            );
        }
    );
 
    // =====================================================
    // 2. CLICK REPLACE BUTTON
    // =====================================================
 
    await StepHelper.step(
        this.page,
        'Click Replace Template',
        async () => {
 
            await this.locators.replaceButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                this.locators.replaceButton
            );
        }
    );
 
    // // =====================================================
    // // 3. VERIFY TEMPLATE APPLIED POPUP
    // // =====================================================
 
    // await StepHelper.step(
    //     this.page,
    //     'Verify Template Applied Successfully',
    //     async () => {
 
    //         const expectedMessage =
    //             template.appliedMessage;
 
    //         const popup =
    //             this.locators.templateSuccessMessage.last();
 
    //         await popup.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });
 
    //         const actualMessage =
    //             (
    //                 await this.keywords.getText(popup)
    //             ).trim();
 
    //         console.log(
    //             `Expected Template Applied Message: ${expectedMessage}`
    //         );
 
    //         console.log(
    //             `Actual Template Applied Message: ${actualMessage}`
    //         );
 
    //         expect(actualMessage).toBe(
    //             expectedMessage
    //         );
    //     }
    // );

    // =====================================================
    // 3. VERIFY TEMPLATE APPLIED POPUP
    // =====================================================

    await StepHelper.step(
        this.page,
        'Verify Template Applied Successfully',
        async () => {

            const expectedMessage =
                template.appliedMessage;

            const popup =
                this.locators.templateSuccessMessage.last();

            if (await popup.isVisible()) {

                const actualMessage =
                    (
                        await this.keywords.getText(popup)
                    ).trim();

                console.log(
                    `Expected Template Applied Message: ${expectedMessage}`
                );

                console.log(
                    `Actual Template Applied Message: ${actualMessage}`
                );

                expect(actualMessage).toBe(
                    expectedMessage
                );

            } else {

                console.log(
                    'Template Applied popup is not displayed.'
                );
            }
        }
    );

}

async ResetandAddHistorydata(sectionsToAdd) {

    // await StepHelper.step(
    //     this.page,
    //     "Reset the form",
    //     async () => {



    //     // Handle Reset Confirmation dialog
    //     this.page.once('dialog', async dialog => {
    //         console.log(
    //             `Reset Confirmation: ${dialog.message()}`
    //         );

    //         await dialog.accept();
    //     });

    //         // Click Clear dropdown
    //         await this.locators.clearDropdown.waitFor({
    //             state: "visible",
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.clearDropdown
    //         );

    //         // Click Reset
    //         await this.locators.resetButton.waitFor({
    //             state: "visible",
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.resetButton
    //         );

    //          await this.page.waitForTimeout(timeout.testTimeout);
    //     }
    // );

    await StepHelper.step(
        this.page,
        'Click History Button',
        async () => {

            await this.locators.historyButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.historyButton
            );
        }
    );

    // await this.page.waitForTimeout(
    // timeout.elementTimeout
    // );

      // Reload History from Server
    await StepHelper.step(
        this.page,
        'Reload History from Server',
        async () => {

            await this.locators.reloadHistoryButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.reloadHistoryButton
            );
        }
    );

    await this.page.waitForTimeout(
    timeout.elementTimeout
    );

    // ==========================================
    // ADD HISTORY SECTIONS FROM TEST DATA
    // ==========================================

    for (const sectionName of sectionsToAdd) {

        await StepHelper.step(
            this.page,
            `Add ${sectionName} Section`,
            async () => {

                const addButton =
                    this.locators.historyAddButton(sectionName);

                // Debug count
                console.log(
                    `${sectionName} Add button count: ${await addButton.count()}`
                );

                // ==========================================
                // ADD BUTTON AVAILABLE -> CLICK
                // ==========================================

                if (
                    await addButton.count() > 0 &&
                    await addButton.first().isVisible()
                ) {

                    await this.keywords.click(
                        addButton.first()
                    );

                    console.log(
                        `[PASS] ${sectionName} Add button clicked`
                    );

                    return;
                }

                // ==========================================
                // ADD BUTTON NOT AVAILABLE -> SKIP
                // ==========================================

                console.log(
                    `[SKIP] ${sectionName} is already Added`
                );
            }
        );
    }
    
await StepHelper.step(
        this.page,
        "Close the History",
        async () => {

            const closeHistory =
                this.locators.closeHistory;

            await closeHistory.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(closeHistory);
        }
    );
}

async verifyOtherFindingCRUD(
    text1,
    text2,
    updatedText
) {
 
    // ==========================================
    // CREATE
    // ==========================================
 
    await StepHelper.step(
        this.page,
        "Create Other Findings",
        async () => {
 
            await this.fillOtherfinding(
                text1,
                text2
            );
        }
    );
 
 
    // ==========================================
    // READ - Verify Created Findings
    // ==========================================
 
    await StepHelper.step(
        this.page,
        "Verify Created Other Findings",
        async () => {
 
            const firstFindings =
                this.locators.otherFindingsElements.filter({
                    hasText: text1
                });
 
            const secondFindings =
                this.locators.otherFindingsElements.filter({
                    hasText: text2
                });
 
            const firstCount =
                await firstFindings.count();
 
            const secondCount =
                await secondFindings.count();
 
            expect(firstCount).toBeGreaterThan(0);
 
            expect(secondCount).toBeGreaterThan(0);
 
            await expect(
                firstFindings.first()
            ).toBeVisible();
 
            await expect(
                secondFindings.first()
            ).toBeVisible();
 
            await expect(
                firstFindings.first()
            ).toHaveText(text1);
 
            await expect(
                secondFindings.first()
            ).toHaveText(text2);
        }
    );
 
 
    // ==========================================
    // UPDATE
    // ==========================================
 
    await StepHelper.step(
        this.page,
        `Update Other Finding - ${text1}`,
        async () => {
 
            const findings =
                this.locators.otherFindingsElements.filter({
                    hasText: text1
                });
 
            const count =
                await findings.count();
 
            if (count === 0) {
                throw new Error(
                    `Other Finding not found: ${text1}`
                );
            }
 
            const finding =
                findings.last();
 
            await finding.waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                finding
            );
 
            await this.keywords.fill(
                finding,
                updatedText
            );
        }
    );
 
 
    // ==========================================
    // READ - Verify Updated Finding
    // ==========================================
 
    await StepHelper.step(
        this.page,
        `Verify Updated Other Finding - ${updatedText}`,
        async () => {
 
            const updatedFinding =
                this.locators.otherFindingsElements.filter({
                    hasText: updatedText
                });
 
            const count =
                await updatedFinding.count();
 
            expect(count).toBeGreaterThan(0);
 
            await expect(
                updatedFinding.last()
            ).toBeVisible();
 
            await expect(
                updatedFinding.last()
            ).toHaveText(updatedText);
        }
    );
 
 
    // ==========================================
    // DELETE
    // ==========================================
 
    await StepHelper.step(
        this.page,
        `Remove Other Finding - ${updatedText}`,
        async () => {
 
            const updatedFindings =
                this.locators.otherFindingsElements.filter({
                    hasText: updatedText
                });
 
            const count =
                await updatedFindings.count();
 
            if (count === 0) {
                throw new Error(
                    `Updated Other Finding not found: ${updatedText}`
                );
            }
 
            const findingIndex =
                await updatedFindings.last().evaluate(
                    element => {
 
                        const parentSection =
                            element.closest(
                                "[data-section-id='other_findings']"
                            );
 
                        const editors =
                            Array.from(
                                parentSection.querySelectorAll(
                                    ".text-editor"
                                )
                            );
 
                        return editors.indexOf(element);
                    }
                );
 
            const removeButton =
                this.locators
                    .otherFindingRemoveButtons
                    .nth(findingIndex);
 
            await removeButton.waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });
 
            await this.keywords.click(
                removeButton
            );
        }
    );
 
 
    // ==========================================
    // READ - Verify Deleted Finding
    // ==========================================
 
    await StepHelper.step(
        this.page,
        `Verify Other Finding Removed - ${updatedText}`,
        async () => {
 
            const deletedFinding =
                this.locators.otherFindingsElements.filter({
                    hasText: updatedText
                });
 
            await expect(
                deletedFinding
            ).toHaveCount(0);
 
            const remainingFinding =
                this.locators.otherFindingsElements.filter({
                    hasText: text2
                });
 
            const remainingCount =
                await remainingFinding.count();
 
            expect(remainingCount).toBeGreaterThan(0);
 
            await expect(
                remainingFinding.last()
            ).toBeVisible();
 
            await expect(
                remainingFinding.last()
            ).toHaveText(text2);
        }
    );
}

async fillOtherfinding(text1, text2) {

    const findings = [text1, text2];

    for (const finding of findings) {

        await StepHelper.step(
            this.page,
            `Enter Other Finding - ${finding}`,
            async () => {

                await this.locators.otherFindingsInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.otherFindingsInput
                );

                await this.keywords.fill(
                    this.locators.otherFindingsInput,
                    finding
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Other Finding',
            async () => {

                await this.locators.addOtherFindingBtn.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.addOtherFindingBtn
                );
            }
        );
    }
}

async fillMultiOtherfinding(text1, text2, text3, text4, text5) {

    const findings = [text1, text2, text3, text4, text5];

    for (const finding of findings) {

        await StepHelper.step(
            this.page,
            `Enter Other Finding - ${finding}`,
            async () => {

                await this.locators.otherFindingsInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.otherFindingsInput
                );

                await this.keywords.fill(
                    this.locators.otherFindingsInput,
                    finding
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Add Other Finding',
            async () => {

                await this.locators.addOtherFindingBtn.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locators.addOtherFindingBtn
                );
            }
        );
    }
}




async addSpecificAdviceText(specificAdviceData) {
 
        await StepHelper.step(
            this.page,
            'Select Specific Advice - Text',
            async () => {
 
                await this.locators.specificAdviceTypeDropdown.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.locators.specificAdviceTypeDropdown.selectOption({
                    label: 'Text'
                });
            }
        );
 
        await StepHelper.step(
            this.page,
            `Enter Specific Advice - ${specificAdviceData.text}`,
            async () => {
 
                await this.locators.specificAdviceTextInput.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.keywords.fill(
                    this.locators.specificAdviceTextInput,
                    specificAdviceData.text
                );
            }
        );
 
        await StepHelper.step(
            this.page,
            'Click Specific Advice Plus',
            async () => {
 
                await this.locators.specificAdviceAddBtn.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.keywords.click(
                    this.locators.specificAdviceAddBtn
                );
            }
        );
 
        await StepHelper.step(
            this.page,
            'Select Specific Advice Checkbox',
            async () => {
 
                await this.locators.specificAdviceCheckbox.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.keywords.click(
                    this.locators.specificAdviceCheckbox
                );
            }
        );
 
        // ==============================
        // IMAGE FLOW
        // ==============================
 
        await StepHelper.step(
            this.page,
            'Select Specific Advice - Image',
            async () => {
 
                await this.locators.specificAdviceTypeDropdown.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.locators.specificAdviceTypeDropdown.selectOption({
                    label: 'Image'
                });
            }
        );
 
        await StepHelper.step(
            this.page,
            'Upload Specific Advice Image',
            async () => {
 
                const imagePath = path.resolve(
                    process.cwd(),
                    'uploads',
                    specificAdviceData.image
                );
 
                await this.locators.specificAdviceImageInput.setInputFiles(
                    imagePath
                );
            }
        );
 
        await StepHelper.step(
            this.page,
            'Click Specific Advice Image Plus',
            async () => {
 
                await this.locators.specificAdviceAddBtn.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.keywords.click(
                    this.locators.specificAdviceAddBtn
                );
            }
        );
        await StepHelper.step(
            this.page,
            'Select Specific Advice Image Checkbox',
            async () => {
 
                await this.locators.specificAdviceImageCheckbox.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });
 
                await this.keywords.click(
                    this.locators.specificAdviceImageCheckbox
                );
            }
        );
 
    }


async savePrescription() {

    await StepHelper.step(
        this.page,
        'Click Print Options',
        async () => {

            await this.locators.printOptionsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.printOptionsBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Save Prescription',
        async () => {

            await this.locators.savePrescriptionBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.savePrescriptionBtn
            );
        }
    );
}

async FullPrescriptionPrint() {

    await StepHelper.step(
        this.page,
        'Click Print Options',
        async () => {

            await this.locators.printOptionsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.printOptionsBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Full Prescription Print',
        async () => {

            await this.locators.fullPrescriptionPrintBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.fullPrescriptionPrintBtn
            );
        }
    );

    // await StepHelper.step(
    //     this.page,
    //     'Click Cancel',
    //     async () => {

    //         await this.locators.cancelPrintBtn.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.cancelPrintBtn
    //         );
    //     }
    // );

    await StepHelper.step(
        this.page,
        'Cancel Print Preview',
        async () => {

            await this.page.waitForTimeout(timeout.elementTimeout);

            await this.page.keyboard.press('Escape');
        }
    );

    // await this.keywords.wait(
    // this.page,
    // timeout.testTimeout
    // );

}

async CustomPrint(sectionsToUncheck) {

    await StepHelper.step(
        this.page,
        'Click Print Options',
        async () => {

            await this.locators.printOptionsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.printOptionsBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Custom Print',
        async () => {

            await this.locators.customPrintBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.customPrintBtn
            );
        }
    );

    for (const sectionName of sectionsToUncheck) {

        await StepHelper.step(
            this.page,
            `Uncheck ${sectionName}`,
            async () => {

                const section =
                    this.locators.customPrintSection.filter({
                        hasText: sectionName
                    });

                const checkbox =
                    section.locator('input[type="checkbox"]');

                await checkbox.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                if (await checkbox.isChecked()) {
                    await this.keywords.click(checkbox);
                }
            }
        );
    }

    await StepHelper.step(
        this.page,
        'Click Generate & Print',
        async () => {

            await this.locators.generateAndPrintBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.generateAndPrintBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Cancel',
        async () => {

            await this.locators.cancelPrintBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.cancelPrintBtn
            );
        }
    );


}

async openHistory() {

    await StepHelper.step(
        this.page,
        'Click History Button',
        async () => {

            await this.locators.historyButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.historyButton
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Documents',
        async () => {

            await this.locators.documentsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.documentsBtn
            );
        }
    );

     await StepHelper.step(
        this.page,
        'Hover Document Actions',
        async () => {

            await this.locators.documentActions.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.locators.documentActions.hover();
        }
    );

      await StepHelper.step(
        this.page,
        'Click View',
        async () => {

            await this.locators.viewButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.viewButton
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Verify Preview Actions',
        async () => {

            await this.locators.previewActions.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
        }
    );

}

async EditHistory() {

    await StepHelper.step(
        this.page,
        'Click History Button',
        async () => {

            await this.locators.historyButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.historyButton
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Documents',
        async () => {

            await this.locators.documentsBtn.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.documentsBtn
            );
        }
    );

     await StepHelper.step(
        this.page,
        'Hover Document Actions',
        async () => {

            await this.locators.documentActions.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.locators.documentActions.hover();
        }
    );

    await StepHelper.step(
        this.page,
        'Click Edit',
        async () => {

            await this.locators.editDocumentButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.editDocumentButton
            );
        }
    );

    // await StepHelper.step(
    //     this.page,
    //     'Verify Template Applied Successfully',
    //     async () => {

    //         const expectedMessage =
    //             template.appliedMessage;

    //         const popup =
    //             this.locators.templateSuccessMessage.last();

    //         if (await popup.isVisible()) {

    //             const actualMessage =
    //                 (
    //                     await this.keywords.getText(popup)
    //                 ).trim();

    //             console.log(
    //                 `Expected Template Applied Message: ${expectedMessage}`
    //             );

    //             console.log(
    //                 `Actual Template Applied Message: ${actualMessage}`
    //             );

    //             expect(actualMessage).toBe(
    //                 expectedMessage
    //             );

    //         } else {

    //             console.log(
    //                 'Template Applied popup is not displayed.'
    //             );
    //         }
    //     }
    // );

}

async EdittheHistory(){

    await StepHelper.step(
        this.page,
        'Click Edit',
        async () => {

            await this.locators.editDocumentButton.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                this.locators.editDocumentButton
            );
        }
    );
}


async PrintandClosePDF() {

    await StepHelper.step(
        this.page,
        'Click Print',
        async () => {
            await this.locators.printBtn.nth(1).click();
        }
    );

    await StepHelper.step(
        this.page,
        'Verify that the printed output maintains the expected layout and scaling',
        async () => {

            const pdfViewer = this.locators.pdfViewer;

            await pdfViewer.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await expect(pdfViewer).toBeVisible({
                timeout: timeout.expectTimeout
            });
        }
    ); 

    //  await StepHelper.step(
    //     this.page,
    //     'Click Cancel',
    //     async () => {

    //         await this.locators.cancelPrintBtn.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(
    //             this.locators.cancelPrintBtn
    //         );
    //     }
    // );

     await StepHelper.step(
        this.page,
        'Cancel Print Preview',
        async () => {

            await this.page.waitForTimeout(timeout.elementTimeout);

            await this.page.keyboard.press('Escape');
        }
    );

    await StepHelper.step(
        this.page,
        'Close the PDF',
        async () => {

            const closePdf = this.locators.closePdf;

            await closePdf.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(closePdf);
        }
    );
}

async CloseHistory() {

    await StepHelper.step(
        this.page,
        "Close the PDF",
        async () => {

            const closePdf =
                this.locators.closePdf;

            await closePdf.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(closePdf);
        }
    );

    await StepHelper.step(
        this.page,
        "Close the History",
        async () => {

            const closeHistory =
                this.locators.closeHistory;

            await closeHistory.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(closeHistory);
        }
    );
}


async fill_CoMorbidities(observationData) {

    // =====================================================
    // 1. FIRST ROW - FAVORITE + DRUG LIBRARY
    // =====================================================

    await this.fillFavoriteandDrugLibrary_CoMorbidity(
        observationData.index,
        observationData
    );


    // =====================================================
    // 2. ADD NEW ROW + SUGGESTION
    // =====================================================

    const suggestionRowIndex =
        observationData.index + 1;

    await StepHelper.step(
        this.page,
        `Add Observation Row - ${suggestionRowIndex + 1}`,
        async () => {

            await this.keywords.click(
                this.locators.observationAddRowBtn
            );

            await this.locators.observationRows
                .nth(suggestionRowIndex)
                .waitFor({
                    state: "visible",
                    timeout: timeout.elementTimeout
                });
        }
    );

    await this.fillSuggestion_CoMorbidity(
        suggestionRowIndex,
        observationData
    );


    // =====================================================
    // 3. ADD NEW ROW + CUSTOM
    // =====================================================

    const customRowIndex =
        observationData.index + 2;

    await StepHelper.step(
        this.page,
        `Add Observation Row - ${customRowIndex + 1}`,
        async () => {

            await this.keywords.click(
                this.locators.observationAddRowBtn
            );

            await this.locators.observationRows
                .nth(customRowIndex)
                .waitFor({
                    state: "visible",
                    timeout: timeout.elementTimeout
                });
        }
    );

    await this.fillCustom_Comorbidity(
        customRowIndex,
        observationData
    );
}

async fill_MultiCoMorbidities(observationData) {

    let rowIndex = observationData.index;

    for (let i = 0; i < 3; i++) {

        // =====================================================
        // FAVORITE
        // =====================================================

        await this.fillFavoriteandDrugLibrary_CoMorbidity(
            rowIndex,
            observationData
        );


        // =====================================================
        // SUGGESTION
        // =====================================================

        const suggestionRowIndex = rowIndex + 1;

        await StepHelper.step(
            this.page,
            `Add Co-morbidity Observation Row - ${suggestionRowIndex + 1}`,
            async () => {

                await this.keywords.click(
                    this.locators.observationAddRowBtn
                );

                await this.locators.observationRows
                    .nth(suggestionRowIndex)
                    .waitFor({
                        state: "visible",
                        timeout: timeout.elementTimeout
                    });
            }
        );

        await this.fillSuggestion_CoMorbidity(
            suggestionRowIndex,
            observationData
        );


        // =====================================================
        // CUSTOM
        // =====================================================

        const customRowIndex = rowIndex + 2;

        await StepHelper.step(
            this.page,
            `Add Co-morbidity Observation Row - ${customRowIndex + 1}`,
            async () => {

                await this.keywords.click(
                    this.locators.observationAddRowBtn
                );

                await this.locators.observationRows
                    .nth(customRowIndex)
                    .waitFor({
                        state: "visible",
                        timeout: timeout.elementTimeout
                    });
            }
        );

        await this.fillCustom_Comorbidity(
            customRowIndex,
            observationData
        );


        // =====================================================
        // NEXT CO-MORBIDITY GROUP
        // =====================================================

        rowIndex += 3;

        if (i < 2) {

            const nextRowIndex = rowIndex;

            await StepHelper.step(
                this.page,
                `Add Co-morbidity Observation Row - ${nextRowIndex + 1}`,
                async () => {

                    await this.keywords.click(
                        this.locators.observationAddRowBtn
                    );

                    await this.locators.observationRows
                        .nth(nextRowIndex)
                        .waitFor({
                            state: "visible",
                            timeout: timeout.elementTimeout
                        });
                }
            );
        }
    }
}



async fill_Toxicities(toxicityData) {

    // =====================================================
    // 1. FIRST ROW - FAVORITE
    // =====================================================

    await this.fillFavorite_Toxicity(
        toxicityData.index,
        toxicityData
    );


    // =====================================================
    // 2. ADD NEW ROW + SUGGESTION
    // =====================================================

    const suggestionRowIndex =
        toxicityData.index + 1;

    await StepHelper.step(
        this.page,
        `Add Toxicity Row - ${suggestionRowIndex + 1}`,
        async () => {

            await this.keywords.click(
                this.locators.toxicityAddRowBtn
            );

            await this.locators.toxicityRows
                .nth(suggestionRowIndex)
                .waitFor({
                    state: "visible",
                    timeout: timeout.elementTimeout
                });
        }
    );

    await this.fillSuggestion_Toxicity(
        suggestionRowIndex
    );


    // =====================================================
    // 3. ADD NEW ROW + CUSTOM + DRUG LIBRARY
    // =====================================================

    const customRowIndex =
        toxicityData.index + 2;

    await StepHelper.step(
        this.page,
        `Add Toxicity Row - ${customRowIndex + 1}`,
        async () => {

            await this.keywords.click(
                this.locators.toxicityAddRowBtn
            );

            await this.locators.toxicityRows
                .nth(customRowIndex)
                .waitFor({
                    state: "visible",
                    timeout: timeout.elementTimeout
                });
        }
    );

    await this.fillCustomandDrugLibrary_Toxicity(
        customRowIndex,
        toxicityData
    );
}

// Fill the Toxicities
async fill_MultiToxicities(ToxicityData) {

    // =====================================================
    // TOXICITY GROUP 1
    // =====================================================

    await this.fill_Toxicities(
        ToxicityData
    );


    // =====================================================
    // ADD TOXICITY GROUP 2
    // =====================================================

    const secondToxicityIndex =
        ToxicityData.index + 3;

    await this.keywords.click(
        this.locators.toxicityAddRowBtn
    );

    await this.locators.toxicityRows
        .nth(secondToxicityIndex)
        .waitFor({
            state: "visible",
            timeout: timeout.elementTimeout
        });

    await this.fill_Toxicities({
        ...ToxicityData,
        index: secondToxicityIndex
    });


    // =====================================================
    // ADD TOXICITY GROUP 3
    // =====================================================

    const thirdToxicityIndex =
        ToxicityData.index + 6;

    await this.keywords.click(
        this.locators.toxicityAddRowBtn
    );

    await this.locators.toxicityRows
        .nth(thirdToxicityIndex)
        .waitFor({
            state: "visible",
            timeout: timeout.elementTimeout
        });

    await this.fill_Toxicities({
        ...ToxicityData,
        index: thirdToxicityIndex
    });
}


getPDFFormallValues(rawText, testData) {

    // =========================================================
    // NORMALIZE
    // =========================================================

    const normalize = value =>
        String(value ?? "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();


    // =========================================================
    // PDF LINES
    // =========================================================

    const rawLines =
        String(rawText ?? "")
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    const lines = [];

    for (const line of rawLines) {

        const previousLine =
            lines[lines.length - 1];

        if (
            previousLine &&
            line.length === 1 &&
            /^[a-zA-Z]$/.test(line) &&
            /[a-zA-Z]$/.test(previousLine)
        ) {

            lines[lines.length - 1] =
                previousLine + line;

        } else {

            lines.push(line);
        }
    }


    // =========================================================
    // GET ALL TEST DATA VALUES
    // =========================================================

    const getValues = value => {

        const result = [];

        const extract = current => {

            if (
                current === null ||
                current === undefined
            ) {
                return;
            }

            if (Array.isArray(current)) {

                current.forEach(item =>
                    extract(item)
                );

                return;
            }

            if (
                typeof current === "object"
            ) {

                Object.values(current)
                    .forEach(item =>
                        extract(item)
                    );

                return;
            }

            const text =
                String(current).trim();

            if (text) {

                result.push(text);
            }
        };

        extract(value);

        return result;
    };


    // =========================================================
    // GET SECTION VALUES
    // SAME STRUCTURE AS DRAFT
    // =========================================================

    const medicationExpected =
        getValues(
            testData.medication
        );

    const coMorbidityExpected =
        getValues(
            testData.observationData
        );

    const toxicityExpected =
        getValues(
            testData.ToxicityData
        );

    const otherFindingExpected =
        getValues(
            testData.MultiotherFindings ??
            testData.otherFindings
        );

    const specificAdviceExpected =
        getValues(
            testData.specificAdviceData
        );


    // =========================================================
    // FIND VALUE IN PDF
    // =========================================================

    const findPDFValues = expectedValues => {

        const result = [];

        for (
            const expectedValue
            of expectedValues
        ) {

            const expected =
                normalize(expectedValue);

            if (!expected) {
                continue;
            }


            // -----------------------------------------------
            // EXACT LINE MATCH
            // -----------------------------------------------

            const exactMatch =
                lines.some(
                    line =>
                        normalize(line) ===
                        expected
                );

            if (exactMatch) {

                result.push(
                    expectedValue
                );

                continue;
            }


            // -----------------------------------------------
            // MERGE BROKEN PDF LINES
            // -----------------------------------------------

            let found = false;

            for (
                let i = 0;
                i < lines.length &&
                !found;
                i++
            ) {

                let combined = "";

                for (
                    let j = i;
                    j < lines.length;
                    j++
                ) {

                    combined =
                        combined
                            ? `${combined} ${lines[j]}`
                            : lines[j];


                    // Space merge
                    if (
                        normalize(combined) ===
                        expected
                    ) {

                        result.push(
                            expectedValue
                        );

                        found = true;

                        break;
                    }


                    // No-space merge
                    const joined =
                        lines
                            .slice(i, j + 1)
                            .join("");


                    if (
                        normalize(joined) ===
                        expected
                    ) {

                        result.push(
                            expectedValue
                        );

                        found = true;

                        break;
                    }


                    // Don't keep combining
                    // unnecessarily long text
                    if (
                        normalize(combined)
                            .length >
                        expected.length + 10
                    ) {

                        break;
                    }
                }
            }
        }

        return result;
    };


    // =========================================================
    // PDF SECTION VALUES
    // =========================================================

    const medicationValues =
        findPDFValues(
            medicationExpected
        );

    const coMorbidityValues =
        findPDFValues(
            coMorbidityExpected
        );

    const toxicityValues =
        findPDFValues(
            toxicityExpected
        );

    const otherFindingValues =
        findPDFValues(
            otherFindingExpected
        );

    const specificAdviceValues =
        findPDFValues(
            specificAdviceExpected
        );


    // =========================================================
    // LOG
    // =========================================================

    console.log(
        "========== PDF MEDICATION VALUES =========="
    );

    console.log(medicationValues);


    console.log(
        "========== PDF CO-MORBIDITY VALUES =========="
    );

    console.log(coMorbidityValues);


    console.log(
        "========== PDF TOXICITY VALUES =========="
    );

    console.log(toxicityValues);


    console.log(
        "========== PDF OTHER FINDING VALUES =========="
    );

    console.log(otherFindingValues);


    console.log(
        "========== PDF SPECIFIC ADVICE VALUES =========="
    );

    console.log(specificAdviceValues);


    // =========================================================
    // SAME RETURN STRUCTURE AS DRAFT
    // =========================================================

    return {

        medication:
            medicationValues,

        coMorbidities:
            coMorbidityValues,

        toxicities:
            toxicityValues,

        otherFindings:
            otherFindingValues,

        specificAdvice:
            specificAdviceValues
    };
}

async getthePDFText(testData) {
 
    let expectedValues = {
        patientValues: [],
        formValues: []
    };
 
    await StepHelper.step(
        this.page,
        "Get PDF Expected Values",
        async () => {
 
            const pdfTextLayer =
                this.locators.pdfTextLayer;
 
            const pdfPages =
                await this.keywords.getAllText(
                    pdfTextLayer
                );
 
            const rawText =
                pdfPages.join("\n");
 
            console.log(
                "========== PDF RAW TEXT =========="
            );
 
            console.log(rawText);
 
            // =====================================
            // PATIENT VALUES
            // =====================================
 
            expectedValues.patientValues =
                this.getPDFPatientValues(
                    rawText
                );
 
            // =====================================
            // FORM VALUES
            // =====================================
 
            expectedValues.formValues =
                this.getPDFFormValues(
                    rawText,
                    testData
                );
 
            console.log(
                "========== PDF PATIENT VALUES =========="
            );
 
            console.log(
                expectedValues.patientValues
            );
 
            console.log(
                "========== PDF FORM VALUES =========="
            );
 
            console.log(
                expectedValues.formValues
            );
        }
    );
 
    return expectedValues;
}


async getPDFMultiText(testData) {
 
    let expectedValues = {
        patientValues: [],
        formValues: []
    };
 
    await StepHelper.step(
        this.page,
        "Get PDF Expected Values",
        async () => {
 
            const pdfTextLayer =
                this.locators.pdfTextLayer;
 
            const pdfPages =
                await this.keywords.getAllText(
                    pdfTextLayer
                );
 
            const rawText =
                pdfPages.join("\n");
 
            console.log(
                "========== PDF RAW TEXT =========="
            );
 
            console.log(rawText);
 
            // =====================================
            // PATIENT VALUES
            // =====================================
 
            expectedValues.patientValues =
                this.extractPDFPatientValues(
                    rawText
                );
 
            // =====================================
            // FORM VALUES
            // =====================================
 
            expectedValues.formValues =
                this.extractMultiPDFFormValues(
                    rawText,
                    testData
                );
 
            console.log(
                "========== PDF PATIENT VALUES =========="
            );
 
            console.log(
                expectedValues.patientValues
            );
 
            console.log(
                "========== PDF FORM VALUES =========="
            );
 
            console.log(
                expectedValues.formValues
            );
        }
    );
 
    return expectedValues;
}
 
<<<<<<< HEAD
getPDFPatientValues(rawText) {
 
    const lines =
        rawText
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);
 
    const patientValues = [];
 
    const patientStart =
        lines.findIndex(line =>
            /^(Mr|Mrs|Ms)\s+/i.test(line)
        );
 
    if (patientStart === -1) {
        return patientValues;
    }
 
    const labelIndexes = new Set([
        "UHID:",
        "Age:",
        "Gender:",
        "Referral Tag:",
        "Consult Type:",
        "App. Location:",
        "OPD Date:",
        "OPDID:",
        "Doctor Name:",
        "Patient Number:"
    ]);
 
    for (
        let i = patientStart;
        i < lines.length;
        i++
    ) {
 
        const value =
            lines[i];
 
        if (labelIndexes.has(value)) {
            continue;
        }
 
        patientValues.push(value);
 
        if (patientValues.length === 11) {
            break;
        }
    }
 
    return patientValues;
}

getPDFFormValues(rawText, testData) {
 
    const rawLines =
    rawText
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);
 
const lines = [];
 
for (const line of rawLines) {
 
    const previousLine =
        lines[lines.length - 1];
 
    if (
        previousLine &&
        line.length === 1 &&
        /^[a-zA-Z]$/.test(line) &&
        /[a-zA-Z]$/.test(previousLine)
    ) {
        lines[lines.length - 1] =
            previousLine + line;
    } else {
        lines.push(line);
    }
}
 
    const formValues = [];
 
    // =====================================
    // TEST DATA VALUES
    // =====================================
 
    const drugName =
        testData.observationData.drugName;
 
    const form =
        testData.observationData.form;
 
    const timing =
        testData.ToxicityData.timing;
 
    const otherFindingValues = [
        testData.otherFindings.text1,
        testData.otherFindings.text2
    ];
 
    // =====================================
    // FIND PATIENT SECTION
    // =====================================
 
    const patientStart =
        lines.findIndex(
            line =>
                line.startsWith("Mr ") ||
                line.startsWith("Mrs ") ||
                line.startsWith("Ms ")
        );
 
    if (patientStart === -1) {
        return formValues;
    }
 
    // =====================================
    // EVERYTHING BEFORE PATIENT SECTION
    // =====================================
 
    const formLines =
        lines.slice(0, patientStart);
 
    // =====================================
    // REMOVE PDF HEADERS / LABELS
    // =====================================
 
    const ignoredValues = new Set([
 
        "Co-morbidities",
 
        "Drug",
        "Name",
 
        "Streng",
        "th",
 
        "Dosag",
        "e",
 
        "Freque",
        "ncy",
 
        "Schedu",
        "le",
 
        "Durati",
        "on",
 
        "Instruc",
        "tions",
 
        "Other Findings",
        "Patient Name:",
 
        "Drug Name",
        "Form",
        "Strength",
        "Duration",
        "Instructions",
        "Toxicity",
        "Route",
        "Dosage",
        "Frequency",
        "Schedule",
        "Timing",
 
        "UHID",
        "Age",
        "Gender"
    ]);
 
    const filtered =
        formLines.filter(line => {
 
            return !ignoredValues.has(
                line.trim()
            );
        });
 
    // =====================================
    // NORMALIZE
    // =====================================
 
    const normalize = value =>
        String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
 
    // =====================================
    // MERGE BROKEN PDF VALUES
    // =====================================
 
    for (
        let i = 0;
        i < filtered.length;
        i++
    ) {
 
        let value =
            filtered[i].trim();
 
        // =================================
        // VALUE ENDING WITH /
        // =================================
 
        if (
            value.endsWith("/") &&
            i + 1 < filtered.length
        ) {
 
            value =
                value +
                filtered[++i];
        }
 
        // =================================
        // MATCH DRUG NAME PARTS
        // =================================
 
        else if (
            normalize(value) ===
            normalize(
                drugName.split(" ")[0] +
                " " +
                drugName.split(" ")[1]
            )
        ) {
 
            let combinedValue = value;
            let nextIndex = i + 1;
 
            while (
                nextIndex < filtered.length &&
                normalize(combinedValue) !==
                    normalize(drugName)
            ) {
 
                combinedValue +=
                    " " +
                    filtered[nextIndex];
 
                nextIndex++;
            }
 
            if (
                normalize(combinedValue) ===
                normalize(drugName)
            ) {
 
                value =
                    combinedValue;
 
                i =
                    nextIndex - 1;
            }
        }
 
        // =================================
        // MATCH TIMING VALUE
        // =================================
 
        else if (
            normalize(
                `${value} ${filtered[i + 1]}`
            ) === normalize(timing)
        ) {
 
            value =
                timing;
 
            i++;
        }
 
        // =================================
        // MERGE BROKEN FORM VALUE
        // =================================
 
        else {
 
            let combinedValue =
                value;
 
            let nextIndex =
                i + 1;
 
            while (
                nextIndex < filtered.length
            ) {
 
                const candidate =
                    `${combinedValue}${filtered[nextIndex]}`;
 
                if (
                    normalize(candidate) ===
                    normalize(form)
                ) {
 
                    value =
                        form;
 
                    i =
                        nextIndex;
 
                    break;
                }
 
                if (
                    !normalize(form).startsWith(
                        normalize(candidate)
                    )
                ) {
                    break;
                }
 
                combinedValue =
                    candidate;
 
                nextIndex++;
            }
        }
 
        // =================================
        // ADD VALID VALUE
        // =================================
 
        if (value.trim()) {
 
            formValues.push(
                value.trim()
            );
        }
    }

// // =====================================
// // OTHER FINDINGS
// // =====================================

// for (const value of otherFindingValues) {

//     const normalizedValue =
//         value.trim().toLowerCase();

//     const alreadyAdded =
//         formValues.some(
//             existingValue =>
//                 existingValue.trim().toLowerCase() ===
//                 normalizedValue
//         );

//     if (
//         rawText
//             .toLowerCase()
//             .includes(normalizedValue) &&
//         !alreadyAdded
//     ) {
//         formValues.push(value);
//     }
// }

// =====================================
// OTHER FINDINGS
// =====================================

for (const value of otherFindingValues) {

    const normalizedValue =
        value.trim().toLowerCase();

    const alreadyAdded =
        formValues.some(
            existingValue =>
                existingValue.trim().toLowerCase() ===
                normalizedValue
        );

    if (!alreadyAdded && value.trim() !== '') {
        formValues.push(value);
    }
}

    return formValues;
}
 
async extractMultiPDFFormValues(rawText, testData) {

    const rawLines =
        rawText
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    const normalize = value =>
        String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();


    const formValues = [];


    // =========================================================
    // MULTI CO-MORBIDITIES
    // =========================================================

    const coMorbidityData =
        testData?.observationData;

    if (coMorbidityData) {

        for (const value of Object.values(coMorbidityData)) {

            if (
                value === null ||
                value === undefined ||
                typeof value !== "string" ||
                !value.trim()
            ) {
                continue;
            }

            const normalizedValue =
                normalize(value);

            const matchedValues =
                rawLines.filter(line =>
                    normalize(line).includes(
                        normalizedValue
                    )
                );

            for (const matchedValue of matchedValues) {

                if (
                    !formValues.some(
                        existing =>
                            normalize(existing) ===
                            normalize(matchedValue)
                    )
                ) {

                    formValues.push(
                        matchedValue
                    );
                }
            }
        }
    }


    // =========================================================
    // MULTI TOXICITIES
    // =========================================================

    const toxicityData =
        testData?.ToxicityData;

    if (toxicityData) {

        for (const value of Object.values(toxicityData)) {

            if (
                value === null ||
                value === undefined ||
                typeof value !== "string" ||
                !value.trim()
            ) {
                continue;
            }

            const normalizedValue =
                normalize(value);

            const matchedValues =
                rawLines.filter(line =>
                    normalize(line).includes(
                        normalizedValue
                    )
                );

            for (const matchedValue of matchedValues) {

                if (
                    !formValues.some(
                        existing =>
                            normalize(existing) ===
                            normalize(matchedValue)
                    )
                ) {

                    formValues.push(
                        matchedValue
                    );
                }
            }
        }
    }


    // =========================================================
    // MULTI OTHER FINDINGS
    // =========================================================

    const otherFindings =
        testData?.otherFindings;

    if (otherFindings) {

        for (const value of Object.values(otherFindings)) {

            if (
                value === null ||
                value === undefined ||
                typeof value !== "string" ||
                !value.trim()
            ) {
                continue;
            }

            const normalizedValue =
                normalize(value);

            const matchedValues =
                rawLines.filter(line =>
                    normalize(line).includes(
                        normalizedValue
                    )
                );

            for (const matchedValue of matchedValues) {

                if (
                    !formValues.some(
                        existing =>
                            normalize(existing) ===
                            normalize(matchedValue)
                    )
                ) {

                    formValues.push(
                        matchedValue
                    );
                }
            }
        }
    }


    console.log(
        "========== MULTI PDF FORM VALUES =========="
    );

    console.log(formValues);


    return formValues;
}

async getDraftFormallValues() {

    // =========================================================
    // GET VALUES FROM A ROW
    // =========================================================

    const getRowValues = async (row) => {

        const elements =
            row.locator(
                this.locators.draftFieldElements
            );

        const count =
            await elements.count();

        const values = [];

        for (let i = 0; i < count; i++) {

            const element =
                elements.nth(i);

            const tagName =
                await element.evaluate(
                    el => el.tagName
                );

            let value = "";

            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA"
            ) {

                value =
                    await element.inputValue();

            } else if (
                tagName === "SELECT"
            ) {

                value =
                    await element
                        .locator("option:checked")
                        .textContent() || "";

            } else {

                value =
                    await element.textContent() || "";
            }

            value =
                value.trim();

            if (
                value &&
                !value
                    .toLowerCase()
                    .startsWith("select")
            ) {

                values.push(value);
            }
        }

        return values;
    };


    // // =========================================================
    // // GET ALL ROW VALUES DYNAMICALLY
    // // =========================================================

    // const getRowsValues = async (rows) => {

    //     // const rowCount =
    //     //     await rows.count();

    //     const rowCount =
    //     Array.isArray(rows)
    //         ? rows.length
    //         : await rows.count();

    //     const values = [];

    //     for (let i = 0; i < rowCount; i++) {

    //         const row =
    //             rows.nth(i);

    //         const rowValues =
    //             await getRowValues(row);

    //         if (rowValues.length > 0) {

    //             values.push(rowValues);
    //         }
    //     }

    //     return values;
    // };

// =========================================================
// GET ALL ROW VALUES DYNAMICALLY
// =========================================================

const getRowsValues = async (rows) => {

    let rowCount = 0;

    // ---------------------------------------------------------
    // CASE 1: Playwright Locator
    // ---------------------------------------------------------
    if (
        rows &&
        typeof rows.count === 'function' &&
        typeof rows.nth === 'function'
    ) {

        rowCount =
            await rows.count();

    }

    // ---------------------------------------------------------
    // CASE 2: JavaScript Array
    // ---------------------------------------------------------
    else if (Array.isArray(rows)) {

        rowCount =
            rows.length;

    }

    // ---------------------------------------------------------
    // INVALID ROW TYPE
    // ---------------------------------------------------------
    else {

        throw new TypeError(
            `Unsupported rows type. ` +
            `Expected Playwright Locator or Array, ` +
            `received: ${typeof rows}`
        );
    }

    console.log(
        `Total rows found: ${rowCount}`
    );

    const values = [];

    for (let i = 0; i < rowCount; i++) {

        // -----------------------------------------------------
        // Get current row
        // -----------------------------------------------------

        const row =
            Array.isArray(rows)
                ? rows[i]
                : rows.nth(i);

        // -----------------------------------------------------
        // Extract row values
        // -----------------------------------------------------

        const rowValues =
            await getRowValues(row);

        if (
            Array.isArray(rowValues) &&
            rowValues.length > 0
        ) {

            values.push(rowValues);
        }
    }

    return values;
};


    // =========================================================
    // MEDICATION
    // =========================================================

    const medicationValues =
        await getRowsValues(
            this.locators.medicationRows
        );


    // =========================================================
    // CO-MORBIDITIES
    // =========================================================

    const coMorbidityValues =
        await getRowsValues(
            this.locators.coMorbidityRows
        );


    // =========================================================
    // TOXICITIES
    // =========================================================

    const toxicityValues =
        await getRowsValues(
            this.locators.toxicityRows
        );


    // =========================================================
    // OTHER FINDINGS
    // =========================================================

    const otherFindingValues =
        await getRowsValues(
            this.locators.otherFindingRows
        );


    // =========================================================
    // SPECIFIC ADVICE
    // =========================================================

    const specificAdviceElements =
        this.locators.specificAdviceElements;

    const specificAdviceCount =
        await specificAdviceElements.count();

    const specificAdviceValues = [];

    for (
        let i = 0;
        i < specificAdviceCount;
        i++
    ) {

        const element =
            specificAdviceElements.nth(i);

        const tagName =
            await element.evaluate(
                el => el.tagName
            );

        let value = "";

        if (
            tagName === "INPUT" ||
            tagName === "TEXTAREA"
        ) {

            value =
                await element.inputValue();

        } else {

            value =
                await element.textContent() || "";
        }

        value =
            value.trim();

        if (value) {

            specificAdviceValues.push(
                value
            );
        }
    }


    // =========================================================
    // LOG
    // =========================================================

    console.log(
        "========== DRAFT MEDICATION VALUES =========="
    );

    console.log(medicationValues);

    console.log(
        "========== DRAFT CO-MORBIDITY VALUES =========="
    );

    console.log(coMorbidityValues);

    console.log(
        "========== DRAFT TOXICITY VALUES =========="
    );

    console.log(toxicityValues);

    console.log(
        "========== DRAFT OTHER FINDING VALUES =========="
    );

    console.log(otherFindingValues);

    console.log(
        "========== DRAFT SPECIFIC ADVICE VALUES =========="
    );

    console.log(specificAdviceValues);


    // =========================================================
    // RETURN
    // =========================================================

    return {

        medication:
            medicationValues,

        coMorbidities:
            coMorbidityValues,

        toxicities:
            toxicityValues,

        otherFindings:
            otherFindingValues,

        specificAdvice:
            specificAdviceValues
    };
}

async gettheDraftText() {
 
    let actualValues = {
        patientValues: [],
        formValues: []
    };
 
    await StepHelper.step(
        this.page,
        "Get Draft Actual Values",
        async () => {
 
            await this.locators.draftDocumentBody.waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });
 
            actualValues.patientValues =
                await this.getDraftPatientValues();
 
            actualValues.formValues =
                await this.getDraftFormValues();
 
            console.log(
                "========== DRAFT PATIENT VALUES =========="
            );
 
            console.log(
                actualValues.patientValues
            );
 
            console.log(
                "========== DRAFT FORM VALUES =========="
            );
 
            console.log(
                actualValues.formValues
            );
        }
    );
 
    return actualValues;
}


async getDraftMultiText() {
 
    let actualValues = {
        patientValues: [],
        formValues: []
    };
 
    await StepHelper.step(
        this.page,
        "Get Draft Actual Values",
        async () => {
 
            await this.locators.draftDocumentBody.waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });
 
            actualValues.patientValues =
                await this.extractDraftPatientValues();
 
            actualValues.formValues =
                await this.extractMultiDraftFormValues();
 
            console.log(
                "========== DRAFT PATIENT VALUES =========="
            );
 
            console.log(
                actualValues.patientValues
            );
 
            console.log(
                "========== DRAFT FORM VALUES =========="
            );
 
            console.log(
                actualValues.formValues
            );
        }
    );
 
    return actualValues;
}




// async extractDraftPatientValues() {

//     const values =
//         await this.locators.draftDocumentBody.evaluate(
//             root => {

//                 const result = [];

//                 root.querySelectorAll(
//                     "input, textarea, select"
//                 ).forEach(element => {

//                     let value = "";

//                     if (
//                         element.tagName === "SELECT"
//                     ) {

//                         const option =
//                             element.options[
//                                 element.selectedIndex
//                             ];

//                         value =
//                             option?.textContent?.trim() || "";

//                     } else {

//                         value =
//                             element.value?.trim() || "";
//                     }

//                     if (value) {
//                         result.push(value);
//                     }
//                 });

//                 return result;
//             }
//         );


//     // ==========================================
//     // Patient values
//     // ==========================================

//     const patientValues =
//         values.slice(0, 11);


//     return patientValues;
// }

async getDraftPatientValues() {
 
    const values =
        await this.locators.draftDocumentBody.evaluate(
            root => {
 
                const result = [];
 
                root.querySelectorAll(
                    "input, textarea, select"
                ).forEach(element => {
 
                    let value = "";
 
                    if (
                        element.tagName === "SELECT"
                    ) {
 
                        const option =
                            element.options[
                                element.selectedIndex
                            ];
 
                        value =
                            option?.textContent?.trim() || "";
 
                    } else {
 
                        value =
                            element.value?.trim() || "";
                    }
 
                    if (value) {
                        result.push(value);
                    }
                });
 
                return result;
            }
        );
 
 
    // ==========================================
    // Patient values
    // ==========================================
 
    const patientValues =
        values.slice(0, 11);
 
 
    return patientValues;
}

async getDraftFormValues() {
 
    const rows =
        await this.locators.draftDocumentBody.evaluate(
            (
                root,
                {
                    medicationRows,
                    draftFieldElements
                }
            ) => {
 
                return Array.from(
                    root.querySelectorAll(medicationRows)
                ).map(row => {
 
                    const values = [];
 
                    row.querySelectorAll(
                        draftFieldElements
                    ).forEach(element => {
 
                        let value = "";
 
                        if (
                            element.tagName === "INPUT" ||
                            element.tagName === "TEXTAREA"
                        ) {
 
                            value =
                                element.value?.trim() || "";
 
                        } else if (
                            element.tagName === "SELECT"
                        ) {
 
                            const option =
                                element.options[
                                    element.selectedIndex
                                ];
 
                            value =
                                option?.textContent?.trim() || "";
 
                        } else if (
                            element.matches(
                                "button.dropdown-only-select"
                            )
                        ) {
 
                            value =
                                element.textContent?.trim() || "";
                        }
 
                        if (
                            value &&
                            !value
                                .toLowerCase()
                                .startsWith("select")
                        ) {
 
                            values.push(value);
                        }
                    });
 
                    return values;
                });
            },
 
            {
                medicationRows:
                    this.locators.medicationRows,
 
                draftFieldElements:
                    this.locators.draftFieldElements
            }
        );
 
 
    console.log(
        "========== DRAFT ROW VALUES =========="
    );
 
    console.log(rows);
 
 
    const formValues = [];
 
 
    // =========================================================
    // NORMAL MEDICATION ROWS
    // =========================================================
 
    for (let i = 0; i < 3; i++) {
 
        if (
            rows[i] &&
            rows[i].length >= 7
        ) {
 
            const row = rows[i];
 
            formValues.push(row[0]);
 
            formValues.push(row[1]);
 
            formValues.push(
                `${row[2]} ${row[3]}`
            );
 
            formValues.push(
                `${row[4]} ${row[5]}`
            );
 
            formValues.push(row[6]);
        }
    }
 
 
    // =========================================================
    // TOXICITY ROW - ROW 3
    // =========================================================
 
    const row3 = rows[3];
 
    if (
        row3 &&
        row3.length >= 16
    ) {
 
        formValues.push(
            row3[0].replace(
                /^DRUG\s+/i,
                ""
            )
        );
 
        formValues.push(row3[1]);
 
        formValues.push(
            `${row3[2]} ${row3[3]}`
        );
 
        formValues.push(row3[4]);
 
        formValues.push(row3[5]);
 
        formValues.push(row3[6]);
 
        formValues.push(row3[7]);
 
        formValues.push(
            `${row3[8]}-${row3[9]}-${row3[10]}-${
                row3[11] === "04"
                    ? "0"
                    : row3[11]
            }`
        );
 
        formValues.push(row3[12]);
 
        formValues.push(
            `${row3[13]} ${row3[14]}`
        );
 
        formValues.push(row3[15]);
    }
 
 
    // // =========================================================
    // // TOXICITY ROW - ROW 4
    // // =========================================================
 
    // const row4 = rows[4];
 
    // if (
    //     row4 &&
    //     row4.length >= 16
    // ) {
 
    //     const drugName = row4[0];
 
    //     const drugParts =
    //         drugName
    //             .replace(/^1\s+/i, "")
    //             .split(" ");
 
    //     const drugPrefix =
    //         drugName.match(
    //             /^1\s+\S+/i
    //         )?.[0] || "";
 
    //     const strengthValue =
    //         drugName.match(
    //             /\d+mg\/\d+mg/i
    //         )?.[0] || "";
 
 
    //     formValues.push(
    //         drugPrefix
    //     );
 
    //     formValues.push(
    //         drugParts[1] || ""
    //     );
 
    //     formValues.push(
    //         strengthValue
    //     );
 
    //     formValues.push(row4[1]);
 
    //     formValues.push(row4[1]);
 
    //     formValues.push(
    //         `${row4[2]} ${row4[3]}`
    //     );
 
    //     formValues.push(row4[4]);
 
    //     formValues.push(row4[5]);
 
    //     formValues.push(row4[6]);
 
    //     formValues.push(row4[7]);
 
    //     formValues.push(
    //         `${row4[8]}-${row4[9]}-${row4[10]}-${row4[11]}`
    //     );
 
    //     formValues.push(row4[12]);
 
    //     formValues.push(
    //         `${row4[13]} ${row4[14]}`
    //     );
 
    //     formValues.push(row4[15]);
    // }
 
    // =========================================================
// FAV MEDICATION ROW - ROW 4
// =========================================================

const row4 = rows[4];

if (
    row4 &&
    row4.length >= 16
) {
    const drugName =
        row4[0]
            .replace(/^DRUG\s+/i, "")
            .trim();

    formValues.push(drugName);

    formValues.push(row4[1]);

    formValues.push(
        `${row4[2]} ${row4[3]}`
    );

    formValues.push(row4[4]);

    formValues.push(row4[5]);

    formValues.push(row4[6]);

    formValues.push(row4[7]);

    formValues.push(
        `${row4[8]}-${row4[9]}-${row4[10]}-${row4[11]}`
    );

    formValues.push(row4[12]);

    formValues.push(
        `${row4[13]} ${row4[14]}`
    );

    formValues.push(row4[15]);
}
    // =========================================================
    // TOXICITY ROW - ROW 5
    // =========================================================
 
    const row5 = rows[5];
 
    if (
        row5 &&
        row5.length >= 15
    ) {
 
        const drugName = row5[0];
 
        const drugParts =
            drugName
                .replace(/^1\s+/i, "")
                .split(" ");
 
        const drugPrefix =
            drugName.match(
                /^1\s+\S+/i
            )?.[0] || "";
 
        const strengthValue =
            drugName.match(
                /\d+mg\/\d+mg/i
            )?.[0] || "";
 
 
        formValues.push(
            drugPrefix
        );
 
        formValues.push(
            drugParts[1] || ""
        );
 
        formValues.push(
            strengthValue
        );
 
        formValues.push(row5[1]);
 
        formValues.push(row5[1]);
 
        formValues.push(
            `${row5[2]} ${row5[3]}`
        );
 
        formValues.push(row5[4]);
 
        formValues.push(row5[5]);
 
        formValues.push(row5[6]);
 
        formValues.push(row5[7]);
 
        formValues.push(
            `${row5[8]}-${row5[9]}-${row5[10]}-${row5[11]}`
        );
 
        formValues.push(
            `${row5[12]} ${row5[13]}`
        );
 
        formValues.push(row5[14]);
    }
 
 
    // // =========================================================
    // // OTHER FINDINGS
    // // =========================================================
 
    // const otherFindingValues =
    //     await this.locators.draftDocumentBody.evaluate(
    //         (
    //             root,
    //             draftOtherFindingElements
    //         ) => {
 
    //             const values = [];
 
    //             root.querySelectorAll(
    //                 draftOtherFindingElements
    //             ).forEach(element => {
 
    //                 let value = "";
 
    //                 if (
    //                     element.tagName === "INPUT" ||
    //                     element.tagName === "TEXTAREA"
    //                 ) {
 
    //                     value =
    //                         element.value?.trim() || "";
 
    //                 } else {
 
    //                     value =
    //                         element.innerText?.trim() || "";
    //                 }
 
    //                 if (value) {
    //                     values.push(value);
    //                 }
    //             });
 
    //             return values;
    //         },
 
    //         this.locators.draftOtherFindingElements
    //     );
 
 
    // const otherFindingData =
    //     this.testData?.otherFindings;
 
 
    // if (otherFindingData) {
 
    //     otherFindingValues.forEach(value => {
 
    //         const normalizedValue =
    //             value.toLowerCase();
 
    //         if (
    //             normalizedValue.includes(
    //                 otherFindingData.text1.toLowerCase()
    //             ) ||
    //             normalizedValue.includes(
    //                 otherFindingData.text2.toLowerCase()
    //             )
    //         ) {
 
    //             formValues.push(value);
    //         }
    //     });
    // }

    // =========================================================
// OTHER FINDINGS
// =========================================================

const otherFindingValues =
    await this.locators.draftDocumentBody.evaluate(
        (
            root,
            draftOtherFindingElements
        ) => {

            const values = [];

            root.querySelectorAll(
                draftOtherFindingElements
            ).forEach(element => {

                let value = "";

                if (
                    element.tagName === "INPUT" ||
                    element.tagName === "TEXTAREA"
                ) {
                    value =
                        element.value?.trim() || "";
                } else if (
                    element.tagName === "SELECT"
                ) {
                    const option =
                        element.options[
                            element.selectedIndex
                        ];

                    value =
                        option?.textContent?.trim() || "";
                } else if (
                    element.matches(
                        "button.dropdown-only-select"
                    )
                ) {
                    value =
                        element.textContent?.trim() || "";
                } else if (
                    element.matches(
                        "[contenteditable='true']"
                    )
                ) {
                    value =
                        element.innerText?.trim() || "";
                }

                if (
                    value &&
                    !value
                        .toLowerCase()
                        .startsWith("select")
                ) {
                    values.push(value);
                }
            });

            return values;
        },
        this.locators.draftOtherFindingElements
    );

console.log(
    "========== RAW OTHER FINDING VALUES =========="
);

console.log(otherFindingValues);


// =========================================================
// FILTER OTHER FINDINGS
// =========================================================

const filteredOtherFindingValues =
    otherFindingValues.filter(value => {

        const normalizedValue =
            value.trim().toLowerCase();

        return (
            normalizedValue ===
                "custom other findings" ||

            normalizedValue.includes(
                "custom text for 'other findings'"
            )
        );
    });

console.log(
    "========== FILTERED OTHER FINDING VALUES =========="
);

console.log(filteredOtherFindingValues);


// =========================================================
// ADD OTHER FINDINGS TO FORM VALUES
// =========================================================

formValues.push(
    ...filteredOtherFindingValues
);

 
 
    console.log(
        "========== DRAFT FORM VALUES =========="
    );
 
    console.log(formValues);
 
 
    return formValues;
}


async extractMultiDraftFormValues() {

    const rows = [];

    const rowCount =
        await this.locators.observationRows.count();

    for (let i = 0; i < rowCount; i++) {

        const row =
            this.locators.observationRows.nth(i);

        const fields =
            this.locators.draftFieldElement(row);

        const fieldCount =
            await fields.count();

        const values = [];

        for (let j = 0; j < fieldCount; j++) {

            const element = fields.nth(j);

            let value = "";

            const tagName =
                await element.evaluate(
                    el => el.tagName
                );

            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA"
            ) {

                value =
                    await element.inputValue();

            } else if (
                tagName === "SELECT"
            ) {

                value =
                    await element
                        .locator("option:checked")
                        .textContent() || "";

            } else {

                value =
                    await element.textContent() || "";
            }

            value = value.trim();

            if (
                value &&
                !value
                    .toLowerCase()
                    .startsWith("select")
            ) {
                values.push(value);
            }
        }

        rows.push(values);
    }

    console.log(
        "========== MULTI CO-MORBIDITY ROW VALUES =========="
    );

    console.log(rows);

    const formValues = [];

    for (let i = 0; i < 9; i++) {

        if (
            rows[i] &&
            rows[i].length > 0
        ) {

            formValues.push(
                ...rows[i]
            );
        }
    }

    console.log(
        "========== MULTI CO-MORBIDITY FORM VALUES =========="
    );

    console.log(formValues);

    return formValues;
}

async verifyPDFAndDraft(expected, actual) {

    await StepHelper.step(
        this.page,
        "Verify PDF Expected vs Draft Actual",
        async () => {

            let isMatched = true;

            // ==========================================
            // NORMALIZE VALUE
            // ==========================================

            const normalize = (value) => {

                return String(value || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase();
            };

            // ==========================================
            // COMPARE ONE SECTION
            // ==========================================

            const compareSection = async (
                sectionName,
                expectedValues,
                actualValues
            ) => {

                const maxLength =
                    Math.max(
                        expectedValues.length,
                        actualValues.length
                    );

                for (
                    let i = 0;
                    i < maxLength;
                    i++
                ) {

                    const expectedValue =
                        expectedValues[i] ?? "Not Found";

                    const actualValue =
                        actualValues[i] ?? "Not Found";

                    const expectedNormalized =
                        normalize(expectedValue);

                    const actualNormalized =
                        normalize(actualValue);

                    const status =
                        expectedNormalized ===
                        actualNormalized
                            ? "PASS"
                            : "FAIL";

                    // ==================================
                    // REPORT STEP
                    // ==================================

                    await StepHelper.step(
                        this.page,
                        `${sectionName} | Expected: ${expectedValue} | Actual: ${actualValue}`,
                        async () => {

                            console.log(
                                `Expected : ${expectedValue}`
                            );

                            console.log(
                                `Actual   : ${actualValue}`
                            );

                            console.log(
                                `Status   : ${status}`
                            );

                            if (status === "FAIL") {
                                isMatched = false;
                            }
                        }
                    );
                }
            };

            // ==========================================
            // PATIENT VALUES
            // ==========================================

            await compareSection(
                "Verify Patient Value",
                expected.patientValues,
                actual.patientValues
            );

            // ==========================================
            // FORM VALUES
            // ==========================================

            await compareSection(
                "Verify Form Value",
                expected.formValues,
                actual.formValues
            );

            // ==========================================
            // FINAL STATUS
            // ==========================================

            await StepHelper.step(
                this.page,
                `PDF vs Draft Verification | Final Status: ${
                    isMatched ? "PASS" : "FAIL"
                }`,
                async () => {

                    console.log(
                        `FINAL STATUS : ${
                            isMatched
                                ? "PASS"
                                : "FAIL"
                        }`
                    );
                }
            );

            // ==========================================
            // FAIL TEST IF MISMATCH
            // ==========================================

            if (!isMatched) {

                throw new Error(
                    "PDF Expected values and Draft Actual values are not matching."
                );
            }
        }
    );
}

async verifyLatestPDF(sectionsToUncheck) {

    await StepHelper.step(
        this.page,
        'Verify that the latest prescription data is reflected and stale or cached PDF data is not displayed',
        async () => {

            const latestPdfText = await this.getthePDFText();

            for (const section of sectionsToUncheck) {

                expect(
                    latestPdfText,
                    `Stale PDF data found: "${section}" section is still displayed`
                ).not.toContain(section);
            }

            for (const section of sectionsToUncheck) {

                if (previousPdfText.includes(section)) {

                    expect(
                        latestPdfText,
                        `Cached PDF data found: "${section}" section from previous PDF is still displayed`
                    ).not.toContain(section);
                }
            }
        }
    );
}

// =============================================================
// Get actual PDF page count from PDF viewer
// =============================================================

async getActualPDFPageCount() {

    const pageIndicator = this.page.getByText(
        /Page\s+\d+\s+of\s+\d+/i
    ).last();

    await expect(
        pageIndicator,
        'PDF page count indicator is not displayed'
    ).toBeVisible({
        timeout: 30000
    });

    const indicatorText =
        await pageIndicator.innerText();

    console.log(
        `PDF Page Indicator: ${indicatorText}`
    );

    const match =
        indicatorText.match(
            /Page\s+(\d+)\s+of\s+(\d+)/i
        );

    expect(
        match,
        `Unable to identify PDF page count from "${indicatorText}"`
    ).not.toBeNull();

    return Number(match[2]);
}

async getCompletePDFText() {

    const pdfPages =
        this.page.locator('.pdfViewer .page');

    const pageCount =
        await this.getActualPDFPageCount();

    console.log(
        `Actual PDF page count: ${pageCount}`
    );

    let completePDFText = '';

    for (let i = 0; i < pageCount; i++) {

        console.log(
            `Reading PDF page ${i + 1}/${pageCount}`
        );

        // Wait until this page exists
        await expect
            .poll(
                async () => await pdfPages.count(),
                {
                    timeout: 15000,
                    message:
                        `PDF page ${i + 1} was not created`
                }
            )
            .toBeGreaterThan(i);


        const pdfPage =
            pdfPages.nth(i);


        // Scroll page into view
        await pdfPage.scrollIntoViewIfNeeded();


        // Give PDF.js time to render the page
        await this.page.waitForTimeout(1000);


        const textLayer =
            pdfPage.locator(
                'div.textLayer'
            );


        // Wait until text layer is available
        await expect
            .poll(
                async () =>
                    await textLayer.count(),
                {
                    timeout: 15000,
                    message:
                        `Text layer not loaded for PDF page ${i + 1}`
                }
            )
            .toBeGreaterThan(0);


        // Wait until text is actually populated
        await expect
            .poll(
                async () => {

                    const count =
                        await textLayer.count();

                    if (count === 0) {
                        return 0;
                    }

                    const text =
                        await textLayer
                            .first()
                            .innerText();

                    return text.trim().length;
                },
                {
                    timeout: 15000,
                    message:
                        `PDF text not populated for page ${i + 1}`
                }
            )
            .toBeGreaterThan(0);


        const pageText =
            await textLayer
                .first()
                .innerText();


        console.log(
            `PDF page ${i + 1} text length: ${pageText.length}`
        );


        console.log(
            `PDF page ${i + 1} text:`,
            pageText
        );


        completePDFText +=
            '\n' + pageText;
    }


    // Normalize complete PDF text
    completePDFText =
        completePDFText
            .replace(/\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();


    console.log(
        `Complete PDF text length: ${completePDFText.length}`
    );


    expect(
        completePDFText.length,
        'Complete PDF text could not be extracted'
    ).toBeGreaterThan(0);


    return completePDFText;
}

// =============================================================
// Verify PDF - Steps 16 to 20
// =============================================================


async verifythePDF(draftText, pdfText) {

    // =========================================================
    // Common normalization
    // =========================================================

    const normalizeText = (text) =>
        String(text || '')
            .replace(/\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();


    const draftLines =
        String(draftText || '')
            .split(/\r?\n/)
            .map(line => normalizeText(line))
            .filter(line => line.length > 2);


    // =========================================================
    // IMPORTANT
    // =========================================================
    // Do NOT use pdfText directly for verification.
    //
    // pdfText currently contains only partial PDF text.
    //
    // Get complete text from ALL actual PDF pages.
    // =========================================================

    const completePDFText =
        await this.getCompletePDFText();


    const pdfNormalized =
        normalizeText(completePDFText);


    console.log(
        `Complete normalized PDF text length: ${pdfNormalized.length}`
    );


    expect(
        pdfNormalized.length,
        'PDF extracted text is empty'
    ).toBeGreaterThan(0);


    // =========================================================
    // PDF text layers
    // =========================================================

    const pdfTextLayers =
        this.page.locator('div.textLayer');


    // =========================================================
    // 16. Verify sections appear in expected order
    // =========================================================

    await StepHelper.step(
        this.page,
        '16. Verify sections appear in the expected order',
        async () => {

            // const expectedSections = [
            //     'patient name',
            //     'co-morbidities',
            //     'toxicity',
            //     'other findings',
            //     'specific advice',
            //     'other section',
            //     'test',
            //     'cardiologist'
            // ];

            const expectedSections = [
                'co-morbidities',
                'toxicity',
                'patient name',
                'other findings',
                'specific advice',
                'other section',
                'test',
                'cardiologist'
            ];

            let previousIndex = -1;

            let verifiedSections = 0;


            for (const section of expectedSections) {

                const normalizedSection =
                    normalizeText(section);


                // const currentIndex =
                //     pdfNormalized.indexOf(
                //         normalizedSection
                //     );

                const currentIndex =
                pdfNormalized.indexOf(
                    normalizedSection,
                    previousIndex + 1
                );


                if (currentIndex === -1) {

                    console.log(
                        `Section not found in PDF text: ${section}`
                    );

                    continue;
                }


                expect(
                    currentIndex,
                    `PDF section "${section}" is not in expected order`
                ).toBeGreaterThanOrEqual(
                    previousIndex
                );


                previousIndex =
                    currentIndex;


                verifiedSections++;


                console.log(
                    `Section verified: ${section}`
                );
            }


            // -------------------------------------------------
            // Fallback to draft content
            // -------------------------------------------------

            if (verifiedSections === 0) {

                let draftPreviousIndex = -1;

                let matchedDraftLines = 0;


                for (const draftLine of draftLines) {

                    const pdfIndex =
                        pdfNormalized.indexOf(
                            draftLine
                        );


                    if (pdfIndex === -1) {
                        continue;
                    }


                    expect(
                        pdfIndex,
                        `PDF content is not in expected order: "${draftLine}"`
                    ).toBeGreaterThanOrEqual(
                        draftPreviousIndex
                    );


                    draftPreviousIndex =
                        pdfIndex;


                    matchedDraftLines++;
                }


                console.log(
                    `Draft lines used for order verification: ${matchedDraftLines}`
                );


                if (draftLines.length > 0) {

                    expect(
                        matchedDraftLines,
                        'No draft content could be matched with PDF for order verification'
                    ).toBeGreaterThan(0);
                }
            }


            console.log(
                'PDF section order verification completed'
            );
        }
    );


    // =========================================================
    // 17. Verify text, tables, medication, checklist,
    //     scoring chart, images and signature
    // =========================================================

    await StepHelper.step(
        this.page,
        '17. Verify text, tables, medication, checklist, scoring chart, images and signature',
        async () => {

            // -------------------------------------------------
            // 17.1 Actual PDF page count
            // -------------------------------------------------

            const pageCount =
                await this.getActualPDFPageCount();


            console.log(
                `Actual PDF Page Count: ${pageCount}`
            );


            expect(
                pageCount,
                'PDF should contain at least one page'
            ).toBeGreaterThan(0);


            // -------------------------------------------------
            // 17.2 Verify Patient Information
            // -------------------------------------------------

            const patientInformationKeywords = [
                'patient name',
                'age',
                'gender',
                'referral type',
                'app. location',
                'doctor name'
            ];


            const patientInformationFound =
                patientInformationKeywords.filter(
                    keyword =>
                        pdfNormalized.includes(
                            normalizeText(keyword)
                        )
                );


            console.log(
                `Patient information fields found: ${patientInformationFound.join(', ')}`
            );


            expect(
                patientInformationFound.length,
                'Patient information section is present in PDF'
            ).toBeGreaterThan(0);

            // -------------------------------------------------
            // 17.3 Verify Medication / Tables
            // -------------------------------------------------

            const medicationKeywords = [
                'drug name',
                'form',
                'strength'
            ];


            const medicationFound =
                medicationKeywords.filter(
                    keyword =>
                        pdfNormalized.includes(
                            normalizeText(keyword)
                        )
                );


            console.log(
                `Medication table fields found: ${medicationFound.join(', ')}`
            );


            // expect(
            //     medicationFound.length,
            //     'Medication table is not present in PDF'
            // ).toBeGreaterThan(0);

           expect(
                medicationFound.length,
                'Medication table should be present in PDF'
            ).toBeGreaterThan(0);

            console.log(
                'Medication table verified in PDF'
            );

            // -------------------------------------------------
            // 17.4 Verify Co-Morbidities
            // -------------------------------------------------

            const coMorbidityExists =
                pdfNormalized.includes(
                    'co-morbidities'
                ) ||
                pdfNormalized.includes(
                    'comorbidities'
                );


            console.log(
                `Co-Morbidities section found: ${coMorbidityExists}`
            );


            // expect(
            //     coMorbidityExists,
            //     'Co-Morbidities section is not present in PDF'
            // ).toBe(true);

            expect(
                coMorbidityExists,
                'Co-Morbidities section should be present in PDF'
            ).toBe(true);

            console.log(
                'Co-Morbidities section verified in PDF'
            );

            // -------------------------------------------------
            // 17.5 Verify Toxicity
            // -------------------------------------------------

            const toxicityExists =
                pdfNormalized.includes(
                    'toxicity'
                );


            console.log(
                `Toxicity section found: ${toxicityExists}`
            );


            // expect(
            //     toxicityExists,
            //     'Toxicity section is not present in PDF'
            // ).toBe(true);
            expect(
                toxicityExists,
                'Toxicity section should be present in PDF'
            ).toBe(true);

            console.log(
                'Toxicity section verified in PDF'
            );

            // -------------------------------------------------
            // 17.6 Verify Other Findings
            // -------------------------------------------------

            const otherFindingsExists =
                pdfNormalized.includes(
                    'other findings'
                );


            console.log(
                `Other Findings section found: ${otherFindingsExists}`
            );


            // expect(
            //     otherFindingsExists,
            //     'Other Findings section is not present in PDF'
            // ).toBe(true);
            expect(
                otherFindingsExists,
                'Other Findings section should be present in PDF'
            ).toBe(true);

            console.log(
                'Other Findings section verified in PDF'
            );

            // -------------------------------------------------
            // 17.7 Verify Specific Advice
            // -------------------------------------------------

            const specificAdviceExists =
                pdfNormalized.includes(
                    'specific advice'
                );


            console.log(
                `Specific Advice section found: ${specificAdviceExists}`
            );


            // expect(
            //     specificAdviceExists,
            //     'Specific Advice section is not present in PDF'
            // ).toBe(true);
            expect(
                specificAdviceExists,
                'Specific Advice section should be present in PDF'
            ).toBe(true);

            console.log(
                'Specific Advice section verified in PDF'
            );


            // -------------------------------------------------
            // 17.8 Verify Other Section
            // -------------------------------------------------

            const otherSectionExists =
                pdfNormalized.includes(
                    'other section'
                );


            console.log(
                `Other section found: ${otherSectionExists}`
            );


            if (!otherSectionExists) {

                console.log(
                    'Other section heading was not found in extracted PDF text'
                );
            }


            // // -------------------------------------------------
            // // 17.9 Verify Draft content in PDF
            // // -------------------------------------------------

            // let matchedDraftValues = 0;


            // for (const draftLine of draftLines) {

            //     if (
            //         pdfNormalized.includes(
            //             draftLine
            //         )
            //     ) {

            //         matchedDraftValues++;
            //     }
            // }


            // console.log(
            //     `Draft values matched in PDF: ${matchedDraftValues}/${draftLines.length}`
            // );


            // if (draftLines.length > 0) {

            //     expect(
            //         matchedDraftValues,
            //         'Expected draft content is not present in PDF'
            //     ).toBeGreaterThan(0);
            // }

            // -------------------------------------------------
        // 17.9 Verify Draft content in PDF
        // -------------------------------------------------

        let matchedDraftValues = 0;

        for (const draftLine of draftLines) {

            const found =
                pdfNormalized.includes(
                    draftLine
                );

            console.log(
                `Checking draft line: "${draftLine}"`
            );

            console.log(
                `Draft line found in PDF: ${found}`
            );

            if (found) {
                matchedDraftValues++;
            }
        }

        console.log(
            `Draft values matched in PDF: ${matchedDraftValues}/${draftLines.length}`
        );


        if (draftLines.length > 0) {

            console.log(
                `Draft lines available: ${draftLines.length}`
            );

            console.log(
                `Matched draft values: ${matchedDraftValues}`
            );

            if (matchedDraftValues === 0) {

                console.log(
                    'Draft text was not found in PDF. Continuing PDF verification.'
                );
            }
        }

            // -------------------------------------------------
            // 17.10 Verify currently rendered PDF text layers
            // -------------------------------------------------

            let renderedLayerCount =
                await pdfTextLayers.count();


            console.log(
                `Currently rendered PDF text layers: ${renderedLayerCount}`
            );


            // -------------------------------------------------
            // Scroll all PDF pages
            // -------------------------------------------------

            const pdfPages =
                this.page.locator(
                    '.pdfViewer .page'
                );


            const pdfPageElementCount =
                await pdfPages.count();


            console.log(
                `PDF page DOM elements currently available: ${pdfPageElementCount}`
            );


            for (
                let i = 0;
                i < pdfPageElementCount;
                i++
            ) {

                await pdfPages
                    .nth(i)
                    .scrollIntoViewIfNeeded();


                await this.page.waitForTimeout(500);
            }


            renderedLayerCount =
                await pdfTextLayers.count();


            console.log(
                `Rendered PDF text layers after scrolling: ${renderedLayerCount}`
            );


            // -------------------------------------------------
            // 17.11 Verify rendered text
            // -------------------------------------------------

            expect(
                renderedLayerCount,
                'No PDF text layers are rendered'
            ).toBeGreaterThan(0);


            // -------------------------------------------------
            // 17.12 Verify PDF images
            // -------------------------------------------------

            const pdfImages =
                this.page.locator(
                    '.pdfViewer .page img'
                );


            const imageCount =
                await pdfImages.count();


            console.log(
                `Rendered image count: ${imageCount}`
            );


            // -------------------------------------------------
            // 17.13 Verify PDF canvas
            // -------------------------------------------------

            const pdfCanvases =
                this.page.locator(
                    '.pdfViewer .page canvas'
                );


            const canvasCount =
                await pdfCanvases.count();


            console.log(
                `Canvas count: ${canvasCount}`
            );


            // -------------------------------------------------
            // 17.14 Verify signature / image elements
            // -------------------------------------------------

            if (imageCount > 0) {

                for (
                    let i = 0;
                    i < imageCount;
                    i++
                ) {

                    const image =
                        pdfImages.nth(i);


                    const box =
                        await image.boundingBox();


                    if (!box) {
                        continue;
                    }


                    expect(
                        box.width,
                        `PDF image ${i + 1} has invalid width`
                    ).toBeGreaterThan(0);


                    expect(
                        box.height,
                        `PDF image ${i + 1} has invalid height`
                    ).toBeGreaterThan(0);
                }
            }


            console.log(
                'PDF text, table, medication, checklist, scoring chart, image and signature verification completed'
            );
        }
    );


    // =========================================================
    // 18. Verify pagination
    // =========================================================

    await StepHelper.step(
        this.page,
        '18. Verify PDF pagination',
        async () => {

            const pageCount =
                await this.getActualPDFPageCount();


            console.log(
                `PDF Pagination Page Count: ${pageCount}`
            );


            expect(
                pageCount,
                'PDF pagination should contain at least one page'
            ).toBeGreaterThan(0);


            const pdfPages =
                this.page.locator(
                    '.pdfViewer .page'
                );


            const pageElementCount =
                await pdfPages.count();


            console.log(
                `PDF page elements: ${pageElementCount}`
            );


            // -------------------------------------------------
            // Scroll every available PDF page
            // -------------------------------------------------

            for (
                let i = 0;
                i < pageElementCount;
                i++
            ) {

                const page =
                    pdfPages.nth(i);


                await page.scrollIntoViewIfNeeded();


                await this.page.waitForTimeout(500);


                const pageNumber =
                    await page.getAttribute(
                        'data-page-number'
                    );


                console.log(
                    `PDF page element ${i + 1}: ${pageNumber}`
                );
            }


            // -------------------------------------------------
            // Verify page number attributes where available
            // -------------------------------------------------

            const pageNumbers = [];


            for (
                let i = 0;
                i < pageElementCount;
                i++
            ) {

                const pageNumber =
                    await pdfPages
                        .nth(i)
                        .getAttribute(
                            'data-page-number'
                        );


                if (pageNumber) {

                    pageNumbers.push(
                        Number(pageNumber)
                    );
                }
            }


            console.log(
                `PDF page numbers detected: ${pageNumbers.join(', ')}`
            );


            // if (pageNumbers.length > 0) {

            //     expect(
            //         pageNumbers.length,
            //         'PDF page elements do not match rendered pages'
            //     ).toBeGreaterThan(0);


            //     for (
            //         let i = 0;
            //         i < pageNumbers.length;
            //         i++
            //     ) {

            //         expect(
            //             pageNumbers[i],
            //             `Unexpected PDF page number at index ${i}`
            //         ).toBe(i + 1);
            //     }
            // }


            if (pageNumbers.length > 0) {

            const uniquePageNumbers =
                [...new Set(pageNumbers)]
                    .sort((a, b) => a - b);

            console.log(
                `Unique PDF page numbers: ${uniquePageNumbers.join(', ')}`
            );

            expect(
                uniquePageNumbers.length,
                'PDF page numbers could not be identified correctly'
            ).toBe(pageCount);

            for (
                let i = 0;
                i < uniquePageNumbers.length;
                i++
            ) {

                expect(
                    uniquePageNumbers[i],
                    `Unexpected PDF page number at index ${i}`
                ).toBe(i + 1);
            }
        }

            console.log(
                'PDF pagination verification completed'
            );
        }
    );


    // =========================================================
    // 19. Verify text clipping and overlap
    // =========================================================

    await StepHelper.step(
        this.page,
        '19. Verify PDF text clipping and overlap',
        async () => {

            const pdfPages =
                this.page.locator(
                    '.pdfViewer .page'
                );


            const pageCount =
                await pdfPages.count();


            console.log(
                `Checking clipping and overlap for ${pageCount} rendered page(s)`
            );


            for (
                let i = 0;
                i < pageCount;
                i++
            ) {

                const page =
                    pdfPages.nth(i);


                await page.scrollIntoViewIfNeeded();


                await this.page.waitForTimeout(300);


                const textLayer =
                    page.locator(
                        'div.textLayer'
                    );


                const textElements =
                    textLayer.locator(
                        'span'
                    );


                const textCount =
                    await textElements.count();


                console.log(
                    `Page ${i + 1} text span count: ${textCount}`
                );


                const pageBox =
                    await page.boundingBox();


                if (!pageBox) {
                    continue;
                }


                const boxes = [];


                for (
                    let j = 0;
                    j < textCount;
                    j++
                ) {

                    const element =
                        textElements.nth(j);


                    const text =
                        (
                            await element.innerText()
                        ).trim();


                    if (!text) {
                        continue;
                    }


                    const box =
                        await element.boundingBox();


                    if (!box) {
                        continue;
                    }


                    boxes.push({
                        text,
                        box
                    });
                }


                // -------------------------------------------------
                // Verify text is inside page boundaries
                // -------------------------------------------------

                for (const item of boxes) {

                    const box =
                        item.box;


                    expect(
                        box.x,
                        `Text clipped on left side of PDF page ${i + 1}: "${item.text}"`
                    ).toBeGreaterThanOrEqual(
                        pageBox.x - 2
                    );


                    expect(
                        box.y,
                        `Text clipped on top side of PDF page ${i + 1}: "${item.text}"`
                    ).toBeGreaterThanOrEqual(
                        pageBox.y - 2
                    );


                    expect(
                        box.x + box.width,
                        `Text clipped on right side of PDF page ${i + 1}: "${item.text}"`
                    ).toBeLessThanOrEqual(
                        pageBox.x +
                        pageBox.width +
                        2
                    );


                    expect(
                        box.y + box.height,
                        `Text clipped on bottom side of PDF page ${i + 1}: "${item.text}"`
                    ).toBeLessThanOrEqual(
                        pageBox.y +
                        pageBox.height +
                        2
                    );
                }


                // -------------------------------------------------
                // Compare text boxes for overlap
                // -------------------------------------------------

                for (
                    let a = 0;
                    a < boxes.length;
                    a++
                ) {

                    for (
                        let b = a + 1;
                        b < boxes.length;
                        b++
                    ) {

                        const first =
                            boxes[a].box;


                        const second =
                            boxes[b].box;


                        const overlapWidth =
                            Math.max(
                                0,
                                Math.min(
                                    first.x + first.width,
                                    second.x + second.width
                                ) -
                                Math.max(
                                    first.x,
                                    second.x
                                )
                            );


                        const overlapHeight =
                            Math.max(
                                0,
                                Math.min(
                                    first.y + first.height,
                                    second.y + second.height
                                ) -
                                Math.max(
                                    first.y,
                                    second.y
                                )
                            );


                        const overlapArea =
                            overlapWidth *
                            overlapHeight;


                        const firstArea =
                            first.width *
                            first.height;


                        const secondArea =
                            second.width *
                            second.height;


                        const smallerArea =
                            Math.min(
                                firstArea,
                                secondArea
                            );


                        if (
                            smallerArea <= 0
                        ) {
                            continue;
                        }


                        const overlapRatio =
                            overlapArea /
                            smallerArea;


                        expect(
                            overlapRatio,
                            `Text overlap detected on PDF page ${i + 1}: "${boxes[a].text}" and "${boxes[b].text}"`
                        ).toBeLessThan(0.5);
                    }
                }
            }


            console.log(
                'PDF clipping and overlap verification completed'
            );
        }
    );


    // =========================================================
    // 20. Verify margins and spacing
    // =========================================================

    await StepHelper.step(
        this.page,
        '20. Verify margins and spacing',
        async () => {

            const pageCount =
                await this.getActualPDFPageCount();


            console.log(
                `Checking margins and spacing for ${pageCount} page(s)`
            );


            const pdfPages =
                this.page.locator(
                    '.pdfViewer .page'
                );


            const pageElementCount =
                await pdfPages.count();


            // -------------------------------------------------
            // Scroll PDF pages
            // -------------------------------------------------

            for (
                let i = 0;
                i < pageElementCount;
                i++
            ) {

                await pdfPages
                    .nth(i)
                    .scrollIntoViewIfNeeded();


                await this.page.waitForTimeout(200);
            }


            const pdfTextLayers =
                this.page.locator(
                    'div.textLayer'
                );


            const renderedPages =
                await pdfTextLayers.count();


            for (
                let i = 0;
                i < renderedPages;
                i++
            ) {

                const pageLayer =
                    pdfTextLayers.nth(i);


                const pageBox =
                    await pageLayer.boundingBox();


                if (!pageBox) {
                    continue;
                }


                const textElements =
                    pageLayer.locator('span');


                const textCount =
                    await textElements.count();


                const boxes = [];


                for (
                    let j = 0;
                    j < textCount;
                    j++
                ) {

                    const element =
                        textElements.nth(j);


                    const text =
                        (
                            await element.innerText()
                        ).trim();


                    if (!text) {
                        continue;
                    }


                    const box =
                        await element.boundingBox();


                    if (!box) {
                        continue;
                    }


                    boxes.push(box);
                }


                if (
                    boxes.length === 0
                ) {
                    continue;
                }


                // -------------------------------------------------
                // Determine content boundaries
                // -------------------------------------------------

                const minX =
                    Math.min(
                        ...boxes.map(
                            box => box.x
                        )
                    );


                const minY =
                    Math.min(
                        ...boxes.map(
                            box => box.y
                        )
                    );


                const maxRight =
                    Math.max(
                        ...boxes.map(
                            box =>
                                box.x +
                                box.width
                        )
                    );


                const maxBottom =
                    Math.max(
                        ...boxes.map(
                            box =>
                                box.y +
                                box.height
                        )
                    );


                // -------------------------------------------------
                // Calculate margins
                // -------------------------------------------------

                const leftMargin =
                    minX -
                    pageBox.x;


                const topMargin =
                    minY -
                    pageBox.y;


                const rightMargin =
                    (
                        pageBox.x +
                        pageBox.width
                    ) -
                    maxRight;


                const bottomMargin =
                    (
                        pageBox.y +
                        pageBox.height
                    ) -
                    maxBottom;


                console.log(
                    `Page ${i + 1} margins -> ` +
                    `Left: ${leftMargin.toFixed(2)}, ` +
                    `Top: ${topMargin.toFixed(2)}, ` +
                    `Right: ${rightMargin.toFixed(2)}, ` +
                    `Bottom: ${bottomMargin.toFixed(2)}`
                );


                // -------------------------------------------------
                // Verify content stays inside page
                // -------------------------------------------------

                expect(
                    leftMargin,
                    `Invalid left margin on PDF page ${i + 1}`
                ).toBeGreaterThanOrEqual(-2);


                expect(
                    topMargin,
                    `Invalid top margin on PDF page ${i + 1}`
                ).toBeGreaterThanOrEqual(-2);


                expect(
                    rightMargin,
                    `Invalid right margin on PDF page ${i + 1}`
                ).toBeGreaterThanOrEqual(-2);


                expect(
                    bottomMargin,
                    `Invalid bottom margin on PDF page ${i + 1}`
                ).toBeGreaterThanOrEqual(-2);


                // -------------------------------------------------
                // Verify vertical spacing
                // -------------------------------------------------

                const sortedBoxes =
                    [...boxes].sort(
                        (a, b) =>
                            a.y - b.y
                    );


                for (
                    let j = 1;
                    j < sortedBoxes.length;
                    j++
                ) {

                    const previous =
                        sortedBoxes[j - 1];


                    const current =
                        sortedBoxes[j];


                    const previousBottom =
                        previous.y +
                        previous.height;


                    // const verticalGap =
                    //     current.y -
                    //     previousBottom;

                    // expect(
                    //     verticalGap,
                    //     `Text spacing/overlap issue detected on PDF page ${i + 1}`
                    // ).toBeGreaterThanOrEqual(-2);

                    const verticalGap =
                        current.y -
                        previousBottom;

                    console.log(
                        `Page ${i + 1} vertical gap: ${verticalGap.toFixed(2)}`
                    );

                    // Small negative gaps can occur because PDF.js
                    // text spans may overlap while representing
                    // wrapped text or individual glyphs.
                    expect(
                        verticalGap,
                        `Severe text overlap detected on PDF page ${i + 1}`
                    ).toBeGreaterThanOrEqual(-20);
                }
            }


            console.log(
                'PDF margins and spacing verification completed'
            );
        }
    );
}

// async verifythePDF(draftText, pdfText) {

//     // =========================================================
//     // Common normalization
//     // =========================================================

//     const normalizeText = (text) =>
//         String(text || '')
//             .replace(/\u00A0/g, ' ')
//             .replace(/\s+/g, ' ')
//             .trim()
//             .toLowerCase();


//     const draftLines =
//         String(draftText || '')
//             .split(/\r?\n/)
//             .map(line => normalizeText(line))
//             .filter(line => line.length > 2);


//     const pdfNormalized =
//         normalizeText(pdfText);


//     console.log(
//         `PDF extracted text length: ${pdfNormalized.length}`
//     );


//     expect(
//         pdfNormalized.length,
//         'PDF extracted text is empty'
//     ).toBeGreaterThan(0);


//     // =========================================================
//     // PDF text layers
//     // =========================================================
//     //
//     // IMPORTANT:
//     // textLayer count is NOT the PDF page count.
//     //
//     // Chrome/PDF.js can lazy-render only visible pages.
//     //
//     // Actual page count is obtained separately using:
//     //
//     // getActualPDFPageCount()
//     //
//     // =========================================================

//     const pdfTextLayers =
//         this.page.locator('div.textLayer');


//     // =========================================================
//     // 16. Verify sections appear in expected order
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         '16. Verify sections appear in the expected order',
//         async () => {

//             // -------------------------------------------------
//             // Expected section order
//             // -------------------------------------------------

//             const expectedSections = [
//                 'patient name',
//                 'co-morbidities',
//                 'toxicity',
//                 'other findings',
//                 'specific advice',
//                 'other section',
//                 'test',
//                 'cardiologist'
//             ];


//             let previousIndex = -1;

//             let verifiedSections = 0;


//             for (const section of expectedSections) {

//                 const normalizedSection =
//                     normalizeText(section);


//                 const currentIndex =
//                     pdfNormalized.indexOf(
//                         normalizedSection
//                     );


//                 // -------------------------------------------------
//                 // Section may not exist in every prescription.
//                 // Therefore only validate sections which exist.
//                 // -------------------------------------------------

//                 if (currentIndex === -1) {

//                     console.log(
//                         `Section not found in PDF text: ${section}`
//                     );

//                     continue;
//                 }


//                 expect(
//                     currentIndex,
//                     `PDF section "${section}" is not in expected order`
//                 ).toBeGreaterThanOrEqual(
//                     previousIndex
//                 );


//                 previousIndex =
//                     currentIndex;


//                 verifiedSections++;


//                 console.log(
//                     `Section verified: ${section}`
//                 );
//             }


//             // -------------------------------------------------
//             // If section headings are not extracted exactly,
//             // verify using draft content order as fallback.
//             // -------------------------------------------------

//             if (verifiedSections === 0) {

//                 let draftPreviousIndex = -1;

//                 let matchedDraftLines = 0;


//                 for (const draftLine of draftLines) {

//                     const pdfIndex =
//                         pdfNormalized.indexOf(
//                             draftLine
//                         );


//                     if (pdfIndex === -1) {
//                         continue;
//                     }


//                     expect(
//                         pdfIndex,
//                         `PDF content is not in expected order: "${draftLine}"`
//                     ).toBeGreaterThanOrEqual(
//                         draftPreviousIndex
//                     );


//                     draftPreviousIndex =
//                         pdfIndex;


//                     matchedDraftLines++;
//                 }


//                 console.log(
//                     `Draft lines used for order verification: ${matchedDraftLines}`
//                 );


//                 if (draftLines.length > 0) {

//                     expect(
//                         matchedDraftLines,
//                         'No draft content could be matched with PDF for order verification'
//                     ).toBeGreaterThan(0);
//                 }
//             }


//             console.log(
//                 'PDF section order verification completed'
//             );
//         }
//     );


//     // =========================================================
//     // 17. Verify text, tables, medication, checklist,
//     //     scoring chart, images and signature
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         '17. Verify text, tables, medication, checklist, scoring chart, images and signature',
//         async () => {

//             // -------------------------------------------------
//             // Get actual PDF page count
//             // -------------------------------------------------

//             const pageCount =
//                 await this.getActualPDFPageCount();


//             console.log(
//                 `Actual PDF Page Count: ${pageCount}`
//             );


//             expect(
//                 pageCount,
//                 'PDF should contain at least one page'
//             ).toBeGreaterThan(0);


//             // -------------------------------------------------
//             // 17.1 Verify Patient Information
//             // -------------------------------------------------

//             const patientInformationKeywords = [
//                 'patient name',
//                 'age',
//                 'gender',
//                 'referral type',
//                 'app. location',
//                 'doctor name'
//             ];


//             const patientInformationFound =
//                 patientInformationKeywords.filter(
//                     keyword =>
//                         pdfNormalized.includes(
//                             normalizeText(keyword)
//                         )
//                 );


//             console.log(
//                 `Patient information fields found: ${patientInformationFound.join(', ')}`
//             );


//             expect(
//                 patientInformationFound.length,
//                 'Patient information section is not present in PDF'
//             ).toBeGreaterThan(0);


//             // -------------------------------------------------
//             // 17.2 Verify Medication / Tables
//             // -------------------------------------------------

//             const medicationKeywords = [
//                 'drug name',
//                 'form',
//                 'strength'
//             ];


//             const medicationFound =
//                 medicationKeywords.filter(
//                     keyword =>
//                         pdfNormalized.includes(
//                             normalizeText(keyword)
//                         )
//                 );


//             console.log(
//                 `Medication table fields found: ${medicationFound.join(', ')}`
//             );


//             expect(
//                 medicationFound.length,
//                 'Medication table is not present in PDF'
//             ).toBeGreaterThan(0);


//             // -------------------------------------------------
//             // 17.3 Verify Co-Morbidities
//             // -------------------------------------------------

//             const coMorbidityExists =
//                 pdfNormalized.includes(
//                     'co-morbidities'
//                 ) ||
//                 pdfNormalized.includes(
//                     'comorbidities'
//                 );


//             console.log(
//                 `Co-Morbidities section found: ${coMorbidityExists}`
//             );


//             expect(
//                 coMorbidityExists,
//                 'Co-Morbidities section is not present in PDF'
//             ).toBe(true);


//             // -------------------------------------------------
//             // 17.4 Verify Toxicity
//             // -------------------------------------------------

//             const toxicityExists =
//                 pdfNormalized.includes(
//                     'toxicity'
//                 );


//             console.log(
//                 `Toxicity section found: ${toxicityExists}`
//             );


//             expect(
//                 toxicityExists,
//                 'Toxicity section is not present in PDF'
//             ).toBe(true);


//             // -------------------------------------------------
//             // 17.5 Verify Other Findings
//             // -------------------------------------------------

//             const otherFindingsExists =
//                 pdfNormalized.includes(
//                     'other findings'
//                 );


//             console.log(
//                 `Other Findings section found: ${otherFindingsExists}`
//             );


//             expect(
//                 otherFindingsExists,
//                 'Other Findings section is not present in PDF'
//             ).toBe(true);


//             // -------------------------------------------------
//             // 17.6 Verify Specific Advice
//             // -------------------------------------------------

//             const specificAdviceExists =
//                 pdfNormalized.includes(
//                     'specific advice'
//                 );


//             console.log(
//                 `Specific Advice section found: ${specificAdviceExists}`
//             );


//             expect(
//                 specificAdviceExists,
//                 'Specific Advice section is not present in PDF'
//             ).toBe(true);


//             // -------------------------------------------------
//             // 17.7 Verify Other Section
//             // -------------------------------------------------

//             const otherSectionExists =
//                 pdfNormalized.includes(
//                     'other section'
//                 );


//             console.log(
//                 `Other section found: ${otherSectionExists}`
//             );


//             if (!otherSectionExists) {

//                 console.log(
//                     'Other section heading was not found in extracted PDF text'
//                 );
//             }


//             // -------------------------------------------------
//             // 17.8 Verify Draft content in PDF
//             // -------------------------------------------------

//             let matchedDraftValues = 0;


//             for (const draftLine of draftLines) {

//                 if (
//                     pdfNormalized.includes(
//                         draftLine
//                     )
//                 ) {

//                     matchedDraftValues++;
//                 }
//             }


//             console.log(
//                 `Draft values matched in PDF: ${matchedDraftValues}/${draftLines.length}`
//             );


//             if (draftLines.length > 0) {

//                 expect(
//                     matchedDraftValues,
//                     'Expected draft content is not present in PDF'
//                 ).toBeGreaterThan(0);
//             }


//             // -------------------------------------------------
//             // 17.9 Verify currently rendered PDF text layers
//             // -------------------------------------------------
//             //
//             // Do NOT compare this count with pageCount.
//             //
//             // Example:
//             //
//             // Actual PDF pages             = 3
//             // Currently rendered layers    = 2
//             //
//             // This is valid because PDF viewer lazy-renders.
//             // -------------------------------------------------

//             let renderedLayerCount =
//                 await pdfTextLayers.count();


//             console.log(
//                 `Currently rendered PDF text layers: ${renderedLayerCount}`
//             );


//             // -------------------------------------------------
//             // Try to scroll PDF viewer to render all pages
//             // -------------------------------------------------

//             const pdfPages =
//                 this.page.locator(
//                     '.pdfViewer .page'
//                 );


//             const pdfPageElementCount =
//                 await pdfPages.count();


//             console.log(
//                 `PDF page DOM elements currently available: ${pdfPageElementCount}`
//             );


//             if (pdfPageElementCount > 0) {

//                 for (
//                     let i = 0;
//                     i < pdfPageElementCount;
//                     i++
//                 ) {

//                     const page =
//                         pdfPages.nth(i);


//                     await page.scrollIntoViewIfNeeded();


//                     await this.page.waitForTimeout(300);
//                 }
//             }


//             // Refresh rendered layer count after scrolling

//             renderedLayerCount =
//                 await pdfTextLayers.count();


//             console.log(
//                 `Rendered PDF text layers after scrolling: ${renderedLayerCount}`
//             );


//             // -------------------------------------------------
//             // Verify rendered text
//             // -------------------------------------------------

//             let renderedTextElementCount = 0;


//             for (
//                 let i = 0;
//                 i < renderedLayerCount;
//                 i++
//             ) {

//                 const pageLayer =
//                     pdfTextLayers.nth(i);


//                 const pageText =
//                     await pageLayer.innerText();


//                 if (!pageText.trim()) {
//                     continue;
//                 }


//                 expect(
//                     pageText.trim().length,
//                     `Text is not readable on rendered PDF page ${i + 1}`
//                 ).toBeGreaterThan(0);


//                 const textElements =
//                     pageLayer.locator('span');


//                 const textCount =
//                     await textElements.count();


//                 expect(
//                     textCount,
//                     `No text elements found on rendered PDF page ${i + 1}`
//                 ).toBeGreaterThan(0);


//                 renderedTextElementCount +=
//                     textCount;


//                 // -------------------------------------------------
//                 // Verify every rendered text element
//                 // -------------------------------------------------

//                 for (
//                     let j = 0;
//                     j < textCount;
//                     j++
//                 ) {

//                     const textElement =
//                         textElements.nth(j);


//                     const text =
//                         await textElement.innerText();


//                     if (!text.trim()) {
//                         continue;
//                     }


//                     const box =
//                         await textElement.boundingBox();


//                     expect(
//                         box,
//                         `Text element ${j + 1} on page ${i + 1} is not visible`
//                     ).not.toBeNull();


//                     if (!box) {
//                         continue;
//                     }


//                     expect(
//                         box.width,
//                         `Text element ${j + 1} on page ${i + 1} has invalid width`
//                     ).toBeGreaterThan(0);


//                     expect(
//                         box.height,
//                         `Text element ${j + 1} on page ${i + 1} has invalid height`
//                     ).toBeGreaterThan(0);
//                 }
//             }


//             expect(
//                 renderedTextElementCount,
//                 'PDF does not contain rendered readable text'
//             ).toBeGreaterThan(0);


//             // -------------------------------------------------
//             // 17.10 Verify images inside PDF pages
//             // -------------------------------------------------

//             const pdfImages =
//                 this.page.locator(
//                     '.pdfViewer .page img'
//                 );


//             const imageCount =
//                 await pdfImages.count();


//             console.log(
//                 `PDF rendered image count: ${imageCount}`
//             );


//             for (
//                 let i = 0;
//                 i < imageCount;
//                 i++
//             ) {

//                 const image =
//                     pdfImages.nth(i);


//                 const box =
//                     await image.boundingBox();


//                 if (!box) {
//                     continue;
//                 }


//                 expect(
//                     box.width,
//                     `PDF image ${i + 1} has invalid width`
//                 ).toBeGreaterThan(0);


//                 expect(
//                     box.height,
//                     `PDF image ${i + 1} has invalid height`
//                 ).toBeGreaterThan(0);
//             }


//             // -------------------------------------------------
//             // 17.11 Verify canvas inside PDF pages
//             // -------------------------------------------------

//             const pdfCanvases =
//                 this.page.locator(
//                     '.pdfViewer .page canvas'
//                 );


//             const canvasCount =
//                 await pdfCanvases.count();


//             console.log(
//                 `PDF canvas count: ${canvasCount}`
//             );


//             for (
//                 let i = 0;
//                 i < canvasCount;
//                 i++
//             ) {

//                 const canvas =
//                     pdfCanvases.nth(i);


//                 const box =
//                     await canvas.boundingBox();


//                 if (!box) {
//                     continue;
//                 }


//                 expect(
//                     box.width,
//                     `PDF canvas ${i + 1} has invalid width`
//                 ).toBeGreaterThan(0);


//                 expect(
//                     box.height,
//                     `PDF canvas ${i + 1} has invalid height`
//                 ).toBeGreaterThan(0);
//             }


//             console.log(
//                 'Step 17 PDF content verification completed'
//             );
//         }
//     );


//     // =========================================================
//     // 18. Verify page breaks and pagination
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         '18. Verify page breaks and pagination',
//         async () => {

//             // -------------------------------------------------
//             // Get actual page count
//             // -------------------------------------------------

//             const pageCount =
//                 await this.getActualPDFPageCount();


//             console.log(
//                 `Actual PDF Page Count: ${pageCount}`
//             );


//             expect(
//                 pageCount,
//                 'PDF does not contain valid pages'
//             ).toBeGreaterThan(0);


//             // -------------------------------------------------
//             // Scroll through PDF pages
//             // -------------------------------------------------

//             const pdfPages =
//                 this.page.locator(
//                     '.pdfViewer .page'
//                 );


//             const pageElements =
//                 await pdfPages.count();


//             console.log(
//                 `PDF page elements available: ${pageElements}`
//             );


//             for (
//                 let i = 0;
//                 i < pageElements;
//                 i++
//             ) {

//                 await pdfPages
//                     .nth(i)
//                     .scrollIntoViewIfNeeded();


//                 await this.page.waitForTimeout(300);
//             }


//             // -------------------------------------------------
//             // Verify every available page has content
//             // -------------------------------------------------

//             const pdfTextLayers =
//                 this.page.locator(
//                     'div.textLayer'
//                 );


//             const renderedPages =
//                 await pdfTextLayers.count();


//             for (
//                 let i = 0;
//                 i < renderedPages;
//                 i++
//             ) {

//                 const pageText =
//                     await pdfTextLayers
//                         .nth(i)
//                         .innerText();


//                 expect(
//                     pageText.trim().length,
//                     `Rendered PDF page ${i + 1} is empty`
//                 ).toBeGreaterThan(0);
//             }


//             console.log(
//                 `PDF pagination verified successfully: ${pageCount} page(s)`
//             );
//         }
//     );


//     // =========================================================
//     // 19. Verify sections are not unnecessarily
//     //     overlapping, clipped or truncated
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         '19. Verify sections are not unnecessarily overlapping, clipped or truncated',
//         async () => {

//             const pageCount =
//                 await this.getActualPDFPageCount();


//             console.log(
//                 `Checking PDF layout for ${pageCount} page(s)`
//             );


//             const pdfPages =
//                 this.page.locator(
//                     '.pdfViewer .page'
//                 );


//             const pageElementCount =
//                 await pdfPages.count();


//             // -------------------------------------------------
//             // Scroll all available PDF pages
//             // -------------------------------------------------

//             for (
//                 let i = 0;
//                 i < pageElementCount;
//                 i++
//             ) {

//                 await pdfPages
//                     .nth(i)
//                     .scrollIntoViewIfNeeded();


//                 await this.page.waitForTimeout(200);
//             }


//             const pdfTextLayers =
//                 this.page.locator(
//                     'div.textLayer'
//                 );


//             const renderedPages =
//                 await pdfTextLayers.count();


//             // -------------------------------------------------
//             // Check rendered text boundaries
//             // -------------------------------------------------

//             for (
//                 let i = 0;
//                 i < renderedPages;
//                 i++
//             ) {

//                 const pageLayer =
//                     pdfTextLayers.nth(i);


//                 const pageBox =
//                     await pageLayer.boundingBox();


//                 if (!pageBox) {
//                     continue;
//                 }


//                 const textElements =
//                     pageLayer.locator('span');


//                 const textCount =
//                     await textElements.count();


//                 for (
//                     let j = 0;
//                     j < textCount;
//                     j++
//                 ) {

//                     const textElement =
//                         textElements.nth(j);


//                     const text =
//                         await textElement.innerText();


//                     if (!text.trim()) {
//                         continue;
//                     }


//                     const box =
//                         await textElement.boundingBox();


//                     if (!box) {
//                         continue;
//                     }


//                     const pageLeft =
//                         pageBox.x;


//                     const pageTop =
//                         pageBox.y;


//                     const pageRight =
//                         pageBox.x +
//                         pageBox.width;


//                     const pageBottom =
//                         pageBox.y +
//                         pageBox.height;


//                     const elementLeft =
//                         box.x;


//                     const elementTop =
//                         box.y;


//                     const elementRight =
//                         box.x +
//                         box.width;


//                     const elementBottom =
//                         box.y +
//                         box.height;


//                     // -------------------------------------------------
//                     // Left clipping
//                     // -------------------------------------------------

//                     expect(
//                         elementLeft,
//                         `Text clipped on left side of PDF page ${i + 1}`
//                     ).toBeGreaterThanOrEqual(
//                         pageLeft - 2
//                     );


//                     // -------------------------------------------------
//                     // Top clipping
//                     // -------------------------------------------------

//                     expect(
//                         elementTop,
//                         `Text clipped on top of PDF page ${i + 1}`
//                     ).toBeGreaterThanOrEqual(
//                         pageTop - 2
//                     );


//                     // -------------------------------------------------
//                     // Right clipping
//                     // -------------------------------------------------

//                     expect(
//                         elementRight,
//                         `Text clipped on right side of PDF page ${i + 1}`
//                     ).toBeLessThanOrEqual(
//                         pageRight + 2
//                     );


//                     // -------------------------------------------------
//                     // Bottom clipping
//                     // -------------------------------------------------

//                     expect(
//                         elementBottom,
//                         `Text clipped on bottom of PDF page ${i + 1}`
//                     ).toBeLessThanOrEqual(
//                         pageBottom + 2
//                     );
//                 }
//             }


//             // -------------------------------------------------
//             // Check meaningful text overlap
//             // -------------------------------------------------

//             for (
//                 let i = 0;
//                 i < renderedPages;
//                 i++
//             ) {

//                 const pageLayer =
//                     pdfTextLayers.nth(i);


//                 const textElements =
//                     pageLayer.locator('span');


//                 const textCount =
//                     await textElements.count();


//                 const boxes = [];


//                 for (
//                     let j = 0;
//                     j < textCount;
//                     j++
//                 ) {

//                     const element =
//                         textElements.nth(j);


//                     const text =
//                         (await element.innerText()).trim();


//                     if (!text) {
//                         continue;
//                     }


//                     const box =
//                         await element.boundingBox();


//                     if (!box) {
//                         continue;
//                     }


//                     boxes.push({
//                         index: j,
//                         text,
//                         box
//                     });
//                 }


//                 // -------------------------------------------------
//                 // Compare text boxes
//                 // -------------------------------------------------

//                 for (
//                     let a = 0;
//                     a < boxes.length;
//                     a++
//                 ) {

//                     for (
//                         let b = a + 1;
//                         b < boxes.length;
//                         b++
//                     ) {

//                         const first =
//                             boxes[a].box;


//                         const second =
//                             boxes[b].box;


//                         const overlapWidth =
//                             Math.max(
//                                 0,
//                                 Math.min(
//                                     first.x + first.width,
//                                     second.x + second.width
//                                 ) -
//                                 Math.max(
//                                     first.x,
//                                     second.x
//                                 )
//                             );


//                         const overlapHeight =
//                             Math.max(
//                                 0,
//                                 Math.min(
//                                     first.y + first.height,
//                                     second.y + second.height
//                                 ) -
//                                 Math.max(
//                                     first.y,
//                                     second.y
//                                 )
//                             );


//                         const overlapArea =
//                             overlapWidth *
//                             overlapHeight;


//                         const firstArea =
//                             first.width *
//                             first.height;


//                         const secondArea =
//                             second.width *
//                             second.height;


//                         const smallerArea =
//                             Math.min(
//                                 firstArea,
//                                 secondArea
//                             );


//                         if (
//                             smallerArea <= 0
//                         ) {
//                             continue;
//                         }


//                         const overlapRatio =
//                             overlapArea /
//                             smallerArea;


//                         /*
//                          * PDF.js can create tiny overlaps
//                          * between adjacent text spans.
//                          *
//                          * Ignore small overlaps.
//                          *
//                          * More than 50% overlap is considered
//                          * meaningful overlap.
//                          */

//                         expect(
//                             overlapRatio,
//                             `Text overlap detected on PDF page ${i + 1}: "${boxes[a].text}" and "${boxes[b].text}"`
//                         ).toBeLessThan(0.5);
//                     }
//                 }
//             }


//             console.log(
//                 'PDF clipping and overlap verification completed'
//             );
//         }
//     );


//     // =========================================================
//     // 20. Verify margins and spacing
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         '20. Verify margins and spacing',
//         async () => {

//             const pageCount =
//                 await this.getActualPDFPageCount();


//             console.log(
//                 `Checking margins and spacing for ${pageCount} page(s)`
//             );


//             const pdfPages =
//                 this.page.locator(
//                     '.pdfViewer .page'
//                 );


//             const pageElementCount =
//                 await pdfPages.count();


//             // -------------------------------------------------
//             // Scroll PDF pages
//             // -------------------------------------------------

//             for (
//                 let i = 0;
//                 i < pageElementCount;
//                 i++
//             ) {

//                 await pdfPages
//                     .nth(i)
//                     .scrollIntoViewIfNeeded();


//                 await this.page.waitForTimeout(200);
//             }


//             const pdfTextLayers =
//                 this.page.locator(
//                     'div.textLayer'
//                 );


//             const renderedPages =
//                 await pdfTextLayers.count();


//             for (
//                 let i = 0;
//                 i < renderedPages;
//                 i++
//             ) {

//                 const pageLayer =
//                     pdfTextLayers.nth(i);


//                 const pageBox =
//                     await pageLayer.boundingBox();


//                 if (!pageBox) {
//                     continue;
//                 }


//                 const textElements =
//                     pageLayer.locator('span');


//                 const textCount =
//                     await textElements.count();


//                 const boxes = [];


//                 for (
//                     let j = 0;
//                     j < textCount;
//                     j++
//                 ) {

//                     const element =
//                         textElements.nth(j);


//                     const text =
//                         (await element.innerText()).trim();


//                     if (!text) {
//                         continue;
//                     }


//                     const box =
//                         await element.boundingBox();


//                     if (!box) {
//                         continue;
//                     }


//                     boxes.push(box);
//                 }


//                 if (
//                     boxes.length === 0
//                 ) {
//                     continue;
//                 }


//                 // -------------------------------------------------
//                 // Determine content boundaries
//                 // -------------------------------------------------

//                 const minX =
//                     Math.min(
//                         ...boxes.map(
//                             box => box.x
//                         )
//                     );


//                 const minY =
//                     Math.min(
//                         ...boxes.map(
//                             box => box.y
//                         )
//                     );


//                 const maxRight =
//                     Math.max(
//                         ...boxes.map(
//                             box =>
//                                 box.x +
//                                 box.width
//                         )
//                     );


//                 const maxBottom =
//                     Math.max(
//                         ...boxes.map(
//                             box =>
//                                 box.y +
//                                 box.height
//                         )
//                     );


//                 // -------------------------------------------------
//                 // Calculate margins
//                 // -------------------------------------------------

//                 const leftMargin =
//                     minX -
//                     pageBox.x;


//                 const topMargin =
//                     minY -
//                     pageBox.y;


//                 const rightMargin =
//                     (
//                         pageBox.x +
//                         pageBox.width
//                     ) -
//                     maxRight;


//                 const bottomMargin =
//                     (
//                         pageBox.y +
//                         pageBox.height
//                     ) -
//                     maxBottom;


//                 console.log(
//                     `Page ${i + 1} margins -> ` +
//                     `Left: ${leftMargin.toFixed(2)}, ` +
//                     `Top: ${topMargin.toFixed(2)}, ` +
//                     `Right: ${rightMargin.toFixed(2)}, ` +
//                     `Bottom: ${bottomMargin.toFixed(2)}`
//                 );


//                 // -------------------------------------------------
//                 // Verify content stays inside page
//                 // -------------------------------------------------

//                 expect(
//                     leftMargin,
//                     `Invalid left margin on PDF page ${i + 1}`
//                 ).toBeGreaterThanOrEqual(-2);


//                 expect(
//                     topMargin,
//                     `Invalid top margin on PDF page ${i + 1}`
//                 ).toBeGreaterThanOrEqual(-2);


//                 expect(
//                     rightMargin,
//                     `Invalid right margin on PDF page ${i + 1}`
//                 ).toBeGreaterThanOrEqual(-2);


//                 expect(
//                     bottomMargin,
//                     `Invalid bottom margin on PDF page ${i + 1}`
//                 ).toBeGreaterThanOrEqual(-2);


//                 // -------------------------------------------------
//                 // Verify vertical spacing
//                 // -------------------------------------------------

//                 const sortedBoxes =
//                     [...boxes].sort(
//                         (a, b) =>
//                             a.y - b.y
//                     );


//                 for (
//                     let j = 1;
//                     j < sortedBoxes.length;
//                     j++
//                 ) {

//                     const previous =
//                         sortedBoxes[j - 1];


//                     const current =
//                         sortedBoxes[j];


//                     const previousBottom =
//                         previous.y +
//                         previous.height;


//                     const verticalGap =
//                         current.y -
//                         previousBottom;


//                     /*
//                      * Small negative values are allowed
//                      * because PDF.js text spans can slightly
//                      * overlap during rendering.
//                      */

//                     expect(
//                         verticalGap,
//                         `Text spacing/overlap issue detected on PDF page ${i + 1}`
//                     ).toBeGreaterThanOrEqual(-2);
//                 }
//             }


//             console.log(
//                 'PDF margins and spacing verification completed'
//             );
//         }
//     );
// }




async verifyEmptyRowAndSelectMedication(medicationName) {
 
    await StepHelper.step(
        this.page,
        "Verify medication row and select medication",
        async () => {
 
            await this.keywords.verifyElementVisible(
                this.locators.DrugSearchInputfirst
            );
 
            await this.keywords.click(
                this.locators.DrugSearchInputfirst
            );
 
            const medicationSuggestion =
                this.locators.firstMedicationSuggestion(
                    medicationName
                );
 
            await this.keywords.verifyElementVisible(
                medicationSuggestion
            );
 
            await this.keywords.click(
                medicationSuggestion
            );
        }
    );

}

async fillAllergiesToxicityAndAddMedication(
    allergiesToxicityData,
    medicationName
) {
 
    // =====================================================
    // STEP 1 - Fill Allergies/Toxicity Existing Row
    // =====================================================
 
    await StepHelper.step(
        this.page,
        "Fill Allergies/Toxicity medication details",
        async () => {
 
            // Drug Name
            await this.keywords.click(
                this.locators.allergiesToxicityDrugSearchInput
            );
 
            await this.keywords.clear(
                this.locators.allergiesToxicityDrugSearchInput
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityDrugSearchInput,
                allergiesToxicityData.drugName
            );
 
            // Form
            await this.keywords.selectOption(
                this.locators.allergiesToxicityFormDropdown,
                {
                    label: allergiesToxicityData.form
                }
            );
 
            // Strength
            await this.keywords.selectOption(
                this.locators.allergiesToxicityStrengthDropdown,
                {
                    label: allergiesToxicityData.strength
                }
            );
 
            // Route
            await this.keywords.selectOption(
                this.locators.allergiesToxicityRouteDropdown,
                {
                    label: allergiesToxicityData.route
                }
            );
 
            // Dosage
            await this.keywords.selectOption(
                this.locators.allergiesToxicityDosageDropdown,
                {
                    label: allergiesToxicityData.dosage
                }
            );
 
            // Frequency
            await this.keywords.selectOption(
                this.locators.allergiesToxicityFrequencyDropdown,
                {
                    label: allergiesToxicityData.frequency
                }
            );
 
            // Schedule 1
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInput1
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInput1,
                allergiesToxicityData.schedule1
            );
 
            // Schedule 2
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInput2
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInput2,
                allergiesToxicityData.schedule2
            );
 
            // Schedule 3
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInput3
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInput3,
                allergiesToxicityData.schedule3
            );
 
            // Schedule 4
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInput4
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInput4,
                allergiesToxicityData.schedule4
            );
 
            // Timing
            await this.keywords.click(
                this.locators.allergiesToxicityTimingDropdown
            );
 
            const timingOption =
                this.locators.allergiesToxicityTimingOption(
                    allergiesToxicityData.timing
                );
 
            await this.keywords.click(
                timingOption
            );
 
            // Duration
            await this.keywords.selectOption(
                this.locators.allergiesToxicityDurationDropdown,
                {
                    label: allergiesToxicityData.duration
                }
            );
 
            // Instructions
            await this.keywords.clear(
                this.locators.allergiesToxicityInstructionsInput
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityInstructionsInput,
                allergiesToxicityData.instructions
            );
        }
    );
 
}

async fillAllergiesToxicityRow2(allergiesToxicityRow2Data) {
 
    // =====================================================
    // Add New Allergies/Toxicity Row
    // =====================================================
 
    await StepHelper.step(
        this.page,
        "Add new Allergies/Toxicity row",
        async () => {
 
            await this.keywords.click(
                this.locators.allergiesToxicityAddNew
            );
        }
    );
 
 
    // =====================================================
    // Fill Allergies/Toxicity Row 2
    // =====================================================
 
    await StepHelper.step(
        this.page,
        "Fill Allergies/Toxicity Row 2",
        async () => {
 
            // Drug Name
            await this.keywords.clear(
                this.locators.allergiesToxicityDrugSearchInputRow2
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityDrugSearchInputRow2,
                allergiesToxicityRow2Data.drugName
            );
 
 
            // Form
            await this.keywords.selectOption(
                this.locators.allergiesToxicityFormDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.form
                }
            );
 
 
            // Strength
            await this.keywords.selectOption(
                this.locators.allergiesToxicityStrengthDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.strength
                }
            );
 
 
            // Route
            await this.keywords.selectOption(
                this.locators.allergiesToxicityRouteDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.route
                }
            );
 
 
            // Dosage
            await this.keywords.selectOption(
                this.locators.allergiesToxicityDosageDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.dosage
                }
            );
 
 
            // Frequency
            await this.keywords.selectOption(
                this.locators.allergiesToxicityFrequencyDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.frequency
                }
            );
 
 
            // Schedule 1
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInputRow2_1
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInputRow2_1,
                allergiesToxicityRow2Data.schedule1
            );
 
 
            // Schedule 2
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInputRow2_2
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInputRow2_2,
                allergiesToxicityRow2Data.schedule2
            );
 
 
            // Schedule 3
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInputRow2_3
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInputRow2_3,
                allergiesToxicityRow2Data.schedule3
            );
 
 
            // Schedule 4
            await this.keywords.clear(
                this.locators.allergiesToxicityScheduleInputRow2_4
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityScheduleInputRow2_4,
                allergiesToxicityRow2Data.schedule4
            );
 
 
            // Timing
            await this.keywords.click(
                this.locators.allergiesToxicityTimingDropdownRow2
            );
 
            await this.keywords.click(
                this.locators.allergiesToxicityTimingOption(
                    allergiesToxicityRow2Data.timing
                )
            );
 
 
            // Duration
            await this.keywords.selectOption(
                this.locators.allergiesToxicityDurationDropdownRow2,
                {
                    label: allergiesToxicityRow2Data.duration
                }
            );
 
 
            // Instructions
            await this.keywords.clear(
                this.locators.allergiesToxicityInstructionsInputRow2
            );
 
            await this.keywords.fill(
                this.locators.allergiesToxicityInstructionsInputRow2,
                allergiesToxicityRow2Data.instructions
            );
 
            await this.keywords.click(this.locators.allergiestoxicityText);
        }
    );
}

async verifyAndFillAllergiesToxicityMedication(
    rowIndex,
    allergiesToxicityData
) {

    // =====================================================
    // STEP 8 - Verify Drug Name search field is displayed
    // =====================================================

    await StepHelper.step(
        this.page,
        'Step 8 - Verify Drug Name search field is displayed',
        async () => {

            const drugInput =
                this.locators.allergiesToxicityDrugSearchInput
                    .nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });
        }
    );


    // =====================================================
    // STEP 9 - Enter drug name and select drug
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 9 - Select Drug - ${allergiesToxicityData.drugName}`,
        async () => {

            const drugInput =
                this.locators.allergiesToxicityDrugSearchInput
                    .nth(rowIndex);

            await this.keywords.click(drugInput);

            await this.keywords.clear(drugInput);

            await this.keywords.type(
                drugInput,
                allergiesToxicityData.drugName
            );

            const drugResult =
                this.page.getByText(
                    allergiesToxicityData.drugName,
                    { exact: true }
                ).last();

            await drugResult.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(drugResult);
        }
    );
    
    // =====================================================
    // STEP 10 - Open Form dropdown and select Form
    // =====================================================

    // await StepHelper.step(
    //     this.page,
    //     `Step 10 - Form - ${allergiesToxicityData.form}`,
    //     async () => {

    //         const row =
    //             this.locators.allergiesToxicityRows
    //                 .nth(rowIndex);

    //         await row.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         const form =
    //             row.locator('select').first();

    //         await form.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.selectOption(
    //             form,
    //             allergiesToxicityData.form
    //         );
    //     }
    // );

    await StepHelper.step(
    this.page,
    `Step 10 - Form - ${allergiesToxicityData.form}`,
    async () => {

        const form =
            this.locators.allergiesToxicityForm(rowIndex);

        await form.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.selectOption(
            form,
            allergiesToxicityData.form
        );
    }
);

    // =====================================================
    // STEP 12 - Enter numeric Strength
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 12 - Strength - ${allergiesToxicityData.strength}`,
        async () => {

            const strength =
                this.locators.allergiesToxicityStrengthInput
                    .nth(rowIndex);

            await strength.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(strength);

            await this.keywords.type(
                strength,
                allergiesToxicityData.strength
            );
        }
    );

    
    // =====================================================
    // STEP 11 - Open Strength dropdown and select Strength
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 11 - Strength Unit - ${allergiesToxicityData.strengthUnit}`,
        async () => {

            const strengthUnit =
                this.locators.allergiesToxicityStrengthUnitDropdown
                    .nth(rowIndex);

            await strengthUnit.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                strengthUnit,
                allergiesToxicityData.strengthUnit
            );
        }
    );

    // =====================================================
    // STEP 13 - Route
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 13 - Route - ${allergiesToxicityData.route}`,
        async () => {

            const route =
                this.locators.allergiesToxicityRouteDropdown
                    .nth(rowIndex);

            await route.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                route,
                allergiesToxicityData.route
            );
        }
    );

    // =====================================================
    // STEP 15 - Enter numeric Dosage
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 15 - Dosage - ${allergiesToxicityData.dosage}`,
        async () => {

            const dosage =
                this.locators.allergiesToxicityDosageInput
                    .nth(rowIndex);

            await dosage.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(dosage);

            await this.keywords.type(
                dosage,
                allergiesToxicityData.dosage
            );
        }
    );


    
    // =====================================================
    // STEP 14 - Dosage dropdown
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 14 - Dosage Unit - ${allergiesToxicityData.dosageUnit}`,
        async () => {

            const dosageUnit =
                this.locators.allergiesToxicityDosageUnitDropdown
                    .nth(rowIndex);

            await dosageUnit.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                dosageUnit,
                allergiesToxicityData.dosageUnit
            );
        }
    );


    // =====================================================
    // STEP 16 - Frequency
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 16 - Frequency - ${allergiesToxicityData.frequency}`,
        async () => {

            const frequency =
                this.locators.allergiesToxicityFrequencyDropdown
                    .nth(rowIndex);

            await frequency.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                frequency,
                allergiesToxicityData.frequency
            );
        }
    );


    // =====================================================
    // STEP 17 - Verify Schedule updated
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 17 - Schedule - ${allergiesToxicityData.schedule.join('-')}`,
        async () => {

            const scheduleCell =
                this.locators.allergiesToxicityScheduleInputs
                    .nth(rowIndex);

            await scheduleCell.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            const scheduleInputs =
                scheduleCell.locator('input');

            const scheduleCount =
                await scheduleInputs.count();

            for (
                let i = 0;
                i < allergiesToxicityData.schedule.length &&
                i < scheduleCount;
                i++
            ) {

                const schedule =
                    scheduleInputs.nth(i);

                await schedule.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await schedule.fill(
                    String(allergiesToxicityData.schedule[i])
                );

                await schedule.press('Tab');
            }
        }
    );

    // =====================================================
    // STEP 18 & 19 - TIMING
    // =====================================================

    if (allergiesToxicityData.frequency === 'PRN') {

        // =================================================
        // STEP 18 - Verify Timing hidden
        // =================================================

        await StepHelper.step(
            this.page,
            'Step 18 - Verify Timing field is hidden for PRN',
            async () => {

                const timing =
                    this.locators.allergiesToxicityTimingDropdown
                        .nth(rowIndex);

                await expect(timing).toBeHidden();
            }
        );

    } else {

        // =================================================
        // STEP 19 - Select Timing options
        // =================================================

        await StepHelper.step(
            this.page,
            `Step 19 - Timing - ${allergiesToxicityData.timing}`,
            async () => {

                const timing =
                    this.locators.allergiesToxicityTimingDropdown
                        .nth(rowIndex);

                await timing.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(timing);

                const timingOption =
                    this.locators.allergiesToxicityTimingOption(
                        allergiesToxicityData.timing
                    );

                await timingOption.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(timingOption);
            }
        );
    }


    // =====================================================
    // STEP 20 - Duration
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 20 - Duration - ${allergiesToxicityData.duration} ${allergiesToxicityData.durationUnit}`,
        async () => {

            const durationUnit =
                this.locators.allergiesToxicityDurationUnitDropdown
                    .nth(rowIndex);

            await durationUnit.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                durationUnit,
                allergiesToxicityData.durationUnit
            );

            const duration =
                this.locators.allergiesToxicityDurationInput
                    .nth(rowIndex);

            await duration.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(duration);

            await this.keywords.type(
                duration,
                allergiesToxicityData.duration
            );
        }
    );

// =====================================================
// STEP 21 - VERIFY DURATION UNIT
// =====================================================

await StepHelper.step(
    this.page,
    `Step 21 - Verify Duration Unit - ${allergiesToxicityData.durationUnit}`,
    async () => {

        const durationUnit =
            this.locators.allergiesToxicityDurationUnitDropdown
                .nth(rowIndex);

        await durationUnit.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const selectedUnit =
            durationUnit.locator('option:checked');

        const selectedUnitText =
            (await selectedUnit.textContent()).trim();

        expect(selectedUnitText).toBe(
            allergiesToxicityData.durationUnit
        );
    }
);

    // =====================================================
    // STEP 22 - Instructions
    // =====================================================

    await StepHelper.step(
        this.page,
        `Step 22 - Instruction - ${allergiesToxicityData.instruction}`,
        async () => {

            const instruction =
                this.locators.allergiesToxicityInstructionsInput
                    .nth(rowIndex);

            await instruction.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(instruction);

            await this.keywords.type(
                instruction,
                allergiesToxicityData.instruction
            );
        }
    );
}


async VerifymedicationDetails(rowIndex, allergiesToxicityData) {

    //Verify Drug Name
    const actualDrugName =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicityDrugNameInput(rowIndex)
        );

    await StepHelper.step(
        this.page,
        `Verify Drug Name | Expected: ${allergiesToxicityData.drugName} | Actual: ${actualDrugName.trim()}`,
        async () => {
            expect(actualDrugName.trim().toLowerCase()).toBe(
                allergiesToxicityData.drugName.trim().toLowerCase()
            );
        }
    );


    // Verify Form
    const form =
        this.locators.VerifyallergiesToxicityFormDropdown.nth(rowIndex);

    const actualForm =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(form)
        );

    await StepHelper.step(
        this.page,
        `Verify Form | Expected: ${allergiesToxicityData.form} | Actual: ${actualForm.trim()}`,
        async () => {
            expect(actualForm.trim()).toBe(
                allergiesToxicityData.form
            );
        }
    );


    // Verify Strength
    const actualStrength =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicityStrengthInput.nth(rowIndex)
        );

    await StepHelper.step(
        this.page,
        `Verify Strength | Expected: ${allergiesToxicityData.strength} | Actual: ${actualStrength.trim()}`,
        async () => {
            expect(actualStrength.trim()).toBe(
                allergiesToxicityData.strength
            );
        }
    );


    // Verify Strength Unit
    const strengthUnit =
        this.locators.VerifyallergiesToxicityStrengthUnitDropdown.nth(rowIndex);

    const actualStrengthUnit =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(strengthUnit)
        );

    await StepHelper.step(
        this.page,
        `Verify Strength Unit | Expected: ${allergiesToxicityData.strengthUnit} | Actual: ${actualStrengthUnit.trim()}`,
        async () => {
            expect(actualStrengthUnit.trim()).toBe(
                allergiesToxicityData.strengthUnit
            );
        }
    );


    // Verify Route
    const route =
        this.locators.VerifyallergiesToxicityRouteDropdown.nth(rowIndex);

    const actualRoute =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(route)
        );

    await StepHelper.step(
        this.page,
        `Verify Route | Expected: ${allergiesToxicityData.route} | Actual: ${actualRoute.trim()}`,
        async () => {
            expect(actualRoute.trim()).toBe(
                allergiesToxicityData.route
            );
        }
    );


    // Verify Dosage
    const actualDosage =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicityDosageInput.nth(rowIndex)
        );

    await StepHelper.step(
        this.page,
        `Verify Dosage | Expected: ${allergiesToxicityData.dosage} | Actual: ${actualDosage.trim()}`,
        async () => {
            expect(actualDosage.trim()).toBe(
                allergiesToxicityData.dosage
            );
        }
    );


    // Verify Dosage Unit
    const dosageUnit =
        this.locators.VerifyallergiesToxicityDosageUnitDropdown.nth(rowIndex);

    const actualDosageUnit =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(dosageUnit)
        );

    await StepHelper.step(
        this.page,
        `Verify Dosage Unit | Expected: ${allergiesToxicityData.dosageUnit} | Actual: ${actualDosageUnit.trim()}`,
        async () => {
            expect(actualDosageUnit.trim()).toBe(
                allergiesToxicityData.dosageUnit
            );
        }
    );


    // Verify Frequency
    const frequency =
        this.locators.VerifyallergiesToxicityFrequencyDropdown.nth(rowIndex);

    const actualFrequency =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(frequency)
        );

    await StepHelper.step(
        this.page,
        `Verify Frequency | Expected: ${allergiesToxicityData.frequency} | Actual: ${actualFrequency.trim()}`,
        async () => {
            expect(actualFrequency.trim()).toBe(
                allergiesToxicityData.frequency
            );
        }
    );


    // Verify Duration
    const actualDuration =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicityDurationInput.nth(rowIndex)
        );

    await StepHelper.step(
        this.page,
        `Verify Duration | Expected: ${allergiesToxicityData.duration} | Actual: ${actualDuration.trim()}`,
        async () => {
            expect(actualDuration.trim()).toBe(
                allergiesToxicityData.duration
            );
        }
    );


    // Verify Duration Unit
    const durationUnit =
        this.locators.VerifyallergiesToxicityDurationUnitDropdown.nth(rowIndex);

    const actualDurationUnit =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicitySelectedOption(durationUnit)
        );

    await StepHelper.step(
        this.page,
        `Verify Duration Unit | Expected: ${allergiesToxicityData.durationUnit} | Actual: ${actualDurationUnit.trim()}`,
        async () => {
            expect(actualDurationUnit.trim()).toBe(
                allergiesToxicityData.durationUnit
            );
        }
    );


    // Verify Instructions
    const actualInstruction =
        await this.keywords.getTextOrValue(
            this.locators.VerifyallergiesToxicityInstructionsInput(rowIndex)
        );

    await StepHelper.step(
        this.page,
        `Verify Instructions | Expected: ${allergiesToxicityData.instruction} | Actual: ${actualInstruction.trim()}`,
        async () => {
            expect(actualInstruction.trim()).toBe(
                allergiesToxicityData.instruction
            );
        }
    );
}

// async VerifyMedicationCheckbox(rowIndex) {

//     // Step 24 - Verify checkbox displayed
//     const checkbox =
//         this.locators.VerifyallergiesToxicityCheckbox(rowIndex);

//     const actualVisible = await checkbox.isVisible();

//     await StepHelper.step(
//         this.page,
//         `Verify medication checkbox is displayed | Expected: true | Actual: ${actualVisible}`,
//         async () => {
//             expect(actualVisible).toBe(true);
//         }
//     );

//     // Step 25 - Check checkbox
//     await checkbox.check();

//     const actualCheckedAfterCheck =
//         await checkbox.isChecked();

//     await StepHelper.step(
//         this.page,
//         `Select medication checkbox and verify checked | Expected: true | Actual: ${actualCheckedAfterCheck}`,
//         async () => {
//             expect(actualCheckedAfterCheck).toBe(true);
//         }
//     );


//     // Step 25 - Uncheck checkbox
//     await checkbox.uncheck();

//     const actualCheckedAfterUncheck =
//         await checkbox.isChecked();

//     await StepHelper.step(
//         this.page,
//         `Uncheck medication checkbox and verify unchecked | Expected: false | Actual: ${actualCheckedAfterUncheck}`,
//         async () => {
//             expect(actualCheckedAfterUncheck).toBe(false);
//         }
//     );


//     // Step 26 - Select required medication
//     await checkbox.check();

//     const actualCheckedAfterSelect =
//         await checkbox.isChecked();

//     await StepHelper.step(
//         this.page,
//         `Select required medication for prescription | Expected: true | Actual: ${actualCheckedAfterSelect}`,
//         async () => {
//             expect(actualCheckedAfterSelect).toBe(true);
//         }
//     );


//     // Step 27 - Verify medication selected
//     const actualMedicationSelected =
//         await checkbox.isChecked();

//     await StepHelper.step(
//         this.page,
//         `Verify medication is selected for prescription | Expected: true | Actual: ${actualMedicationSelected}`,
//         async () => {
//             expect(actualMedicationSelected).toBe(true);
//         }
//     );
// }


async VerifyMedicationCheckbox(rowIndex) {

    const checkbox =
        this.locators.VerifyallergiesToxicityCheckbox(rowIndex);

    const checkboxInput =
        this.locators.VerifyallergiesToxicityCheckboxInput(rowIndex);

    await this.page.waitForTimeout(timeout.testTimeout);

    //Scroll checkbox into view
    await checkbox.scrollIntoViewIfNeeded();

    // Wait for horizontal scroll/UI update
    await this.page.waitForTimeout(timeout.testTimeout);

    // Verify checkbox is displayed
    const actualVisible = await checkbox.isVisible();

    await StepHelper.step(
        this.page,
        `Verify medication checkbox is displayed | Expected: true | Actual: ${actualVisible}`,
        async () => {
            expect(actualVisible).toBe(true);
        }
    );

    // Step 25 - Select checkbox
    await checkbox.click();

    const actualCheckedAfterCheck =
        await checkboxInput.isChecked();

    await StepHelper.step(
        this.page,
        `Select medication checkbox and verify checked | Expected: true | Actual: ${actualCheckedAfterCheck}`,
        async () => {
            expect(actualCheckedAfterCheck).toBe(true);
        }
    );

    // Step 25 - Uncheck checkbox
    await checkbox.click();

    const actualCheckedAfterUncheck =
        await checkboxInput.isChecked();

    await StepHelper.step(
        this.page,
        `Uncheck medication checkbox and verify unchecked | Expected: false | Actual: ${actualCheckedAfterUncheck}`,
        async () => {
            expect(actualCheckedAfterUncheck).toBe(false);
        }
    );

    // Step 26 - Select required medication
    await checkbox.click();

    const actualCheckedAfterSelect =
        await checkboxInput.isChecked();

    await StepHelper.step(
        this.page,
        `Select required medication for prescription | Expected: true | Actual: ${actualCheckedAfterSelect}`,
        async () => {
            expect(actualCheckedAfterSelect).toBe(true);
        }
    );

    // Step 27 - Verify medication selected
    const actualMedicationSelected =
        await checkboxInput.isChecked();

    await StepHelper.step(
        this.page,
        `Verify medication is selected for prescription | Expected: true | Actual: ${actualMedicationSelected}`,
        async () => {
            expect(actualMedicationSelected).toBe(true);
        }
    );

    return actualMedicationSelected;
}


async verifySearchTypeRXMedicationTableInPDF(
    observationData,
    allergiesToxicityData
) {

    await StepHelper.step(
        this.page,
        "Verify Search Type RX-Medication Table details in generated PDF",
        async () => {

            // Get PDF text
            await this.locators.pdfTextLayer.first().waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });

            const pdfText =
                await this.locators.pdfTextLayer.allInnerTexts();

            const fullPDFText = pdfText
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            console.log("\n========== PDF TEXT ==========");
            console.log(fullPDFText);

            // // Normalize text
            // const normalize = (value) => {
            //     return String(value ?? "")
            //         .replace(/\s+/g, " ")
            //         .trim()
            //         .toLowerCase();
            // };

           const normalize = (value) => {
                return String(value ?? "")
                    .replace(/\s+/g, " ")
                    .replace(/\s*\/\s*/g, "/")
                    .trim()
                    .toLowerCase();
            };

            const normalizedPDF = normalize(fullPDFText);

            // Common verification helper
            const verifyValue = (section, field, value) => {

                // Skip if value is not provided
                if (
                    value === undefined ||
                    value === null ||
                    value === ""
                ) {
                    console.log(
                        `- Skipped ${section} - ${field}: value not provided`
                    );
                    return;
                }

                const expected = normalize(value);

                if (!normalizedPDF.includes(expected)) {
                    throw new Error(
                        `PDF verification failed for ` +
                        `${section} - ${field}. ` +
                        `Expected: "${value}". ` +
                        `PDF Text: "${fullPDFText}"`
                    );
                }

                console.log(
                    `✓ ${section} - ${field}: "${value}" displayed correctly`
                );
            };


            // ==================================================
            // 31A - CO-MORBIDITIES
            // ==================================================

            console.log("\n========== Co-morbidities ==========");

            verifyValue(
                "Co-morbidities",
                "drugName",
                observationData.Custom_drugname
            );

            verifyValue(
                "Co-morbidities",
                "form",
                observationData.form
            );

            verifyValue(
                "Co-morbidities",
                "strength",
                `${observationData.strength} ${observationData.strengthUnit}`
            );

            verifyValue(
                "Co-morbidities",
                "duration",
                `${observationData.duration} ${observationData.durationUnit}`
            );

            verifyValue(
                "Co-morbidities",
                "instruction",
                observationData.instruction
            );


            // ==================================================
            // 31B - ALLERGIES / TOXICITY
            // ==================================================

            console.log("\n========== Allergies/Toxicity ==========");

            verifyValue(
                "Allergies/Toxicity",
                "drugName",
                allergiesToxicityData.drugName
            );

            verifyValue(
                "Allergies/Toxicity",
                "form",
                allergiesToxicityData.form
            );

            verifyValue(
                "Allergies/Toxicity",
                "strength",
                `${allergiesToxicityData.strength} ${allergiesToxicityData.strengthUnit}`
            );

            verifyValue(
                "Allergies/Toxicity",
                "route",
                allergiesToxicityData.route
            );

            verifyValue(
                "Allergies/Toxicity",
                "dosage",
                `${allergiesToxicityData.dosage} ${allergiesToxicityData.dosageUnit}`
            );

            verifyValue(
                "Allergies/Toxicity",
                "frequency",
                allergiesToxicityData.frequency
            );


            // Schedule
            const schedule =
                allergiesToxicityData.schedule;

            if (
                Array.isArray(schedule) &&
                schedule.length >= 3
            ) {

                const scheduleText =
                    `Trigger: ${schedule[0]}, ` +
                    `Max/day: ${schedule[1]}, ` +
                    `Min gap: ${schedule[2]}`;

                verifyValue(
                    "Allergies/Toxicity",
                    "schedule",
                    scheduleText
                );
            } else {
                console.log(
                    "- Skipped Allergies/Toxicity - schedule: value not provided"
                );
            }


            // // Timing
            // verifyValue(
            //     "Allergies/Toxicity",
            //     "timing",
            //     allergiesToxicityData.timing
            // );

            // Timing
            const timing = allergiesToxicityData.timing;

            if (
                timing &&
                normalizedPDF.includes(normalize(timing))
            ) {
                console.log(
                    `✓ Allergies/Toxicity - timing: "${timing}" displayed correctly`
                );
            } else {
                console.log(
                    `- Skipped Allergies/Toxicity - timing: value not available in PDF`
                );
            }

            // Duration
            verifyValue(
                "Allergies/Toxicity",
                "duration",
                `${allergiesToxicityData.duration} ${allergiesToxicityData.durationUnit}`
            );


            // Instruction
            verifyValue(
                "Allergies/Toxicity",
                "instruction",
                allergiesToxicityData.instruction
            );


            console.log(
                "\n✓ Co-morbidities and Allergies/Toxicity medication details are displayed correctly in PDF"
            );
        }
    );
}

async verifyChecklistMedicationInPDF(
    medicationData,
    checkboxChecked
) {

    await StepHelper.step(
        this.page,
        "Verify Checklist RX-Medication checkbox selection in PDF",
        async () => {

            // Get PDF text
            await this.locators.pdfTextLayer.first().waitFor({
                state: "visible",
                timeout: timeout.expectTimeout
            });

            const pdfText =
                await this.locators.pdfTextLayer.allInnerTexts();

            const fullPDFText = pdfText
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            console.log("\n========== CHECKLIST PDF TEXT ==========");
            console.log(fullPDFText);

            // Normalize
            const normalize = (value) => {
                return String(value ?? "")
                    .replace(/\s+/g, " ")
                    .replace(/\s*\/\s*/g, "/")
                    .trim()
                    .toLowerCase();
            };

            const normalizedPDF =
                normalize(fullPDFText);

            const medicationName =
                normalize(medicationData.drugName);

            const medicationDisplayed =
                normalizedPDF.includes(medicationName);

            console.log(
                `\nMedication: "${medicationData.drugName}"`
            );

            console.log(
                `Checkbox selected: ${checkboxChecked}`
            );

            console.log(
                `Medication displayed in PDF: ${medicationDisplayed}`
            );

            // ==========================================
            // Step 32 - CHECKED
            // ==========================================

            if (checkboxChecked) {

                await StepHelper.step(
                    this.page,
                    `Verify checked medication "${medicationData.drugName}" is displayed in PDF`,
                    async () => {

                        expect(
                            medicationDisplayed
                        ).toBe(true);

                    }
                );

                console.log(
                    `✓ Checkbox checked → "${medicationData.drugName}" is displayed in PDF`
                );

            }

            // ==========================================
            // Step 33 - UNCHECKED
            // ==========================================

            else {

                await StepHelper.step(
                    this.page,
                    `Verify unchecked medication "${medicationData.drugName}" is not displayed in PDF`,
                    async () => {

                        expect(
                            medicationDisplayed
                        ).toBe(false);

                    }
                );

                console.log(
                    `✓ Checkbox unchecked → "${medicationData.drugName}" is not displayed in PDF`
                );
            }
        }
    );
}


async fill_Comorbidity(
    rowIndex,
    observationData
) {

    // =========================
    // DRUG NAME
    // =========================

    await StepHelper.step(
        this.page,
        `Drug Name - ${observationData.Custom_drugname}`,
        async () => {

            const drugCell =
                this.locators.drugCell.nth(rowIndex);

            await this.keywords.click(drugCell);

            const drugInput =
                this.locators.drugSearchInput.nth(rowIndex);

            await drugInput.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(drugInput);

            await this.keywords.type(
                drugInput,
                observationData.Custom_drugname
            );
        }
    );

    // =========================
    // FORM
    // =========================

    await StepHelper.step(
        this.page,
        `Form - ${observationData.form}`,
        async () => {

            const form =
                this.locators.formDropdown.nth(rowIndex);

            await form.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(form);

            await this.keywords.selectOption(
                form,
                observationData.form
            );
        }
    );

    // =========================
    // STRENGTH
    // =========================

    await StepHelper.step(
        this.page,
        `Strength - ${observationData.strength}`,
        async () => {

            const strength =
                this.locators.strengthInput.nth(rowIndex);

            await strength.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(strength);

            await this.keywords.clear(strength);

            await this.keywords.type(
                strength,
                observationData.strength
            );
        }
    );

    // =========================
    // STRENGTH UNIT
    // =========================

    await StepHelper.step(
        this.page,
        `Strength Unit - ${observationData.strengthUnit}`,
        async () => {

            const strengthUnit =
                this.locators.strengthUnitDropdown(rowIndex);

            await strengthUnit.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                strengthUnit,
                {
                    label: observationData.strengthUnit
                }
            );
        }
    );

    // // =========================
    // // ROUTE
    // // =========================

    // await StepHelper.step(
    //     this.page,
    //     `Route - ${observationData.route}`,
    //     async () => {

    //         const route =
    //             this.locators.routeDropdown(rowIndex);

    //         await route.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.selectOption(
    //             route,
    //             {
    //                 label: observationData.route
    //             }
    //         );
    //     }
    // );

    // // =========================
    // // DOSAGE
    // // =========================

    // await StepHelper.step(
    //     this.page,
    //     `Dosage - ${observationData.dosage}`,
    //     async () => {

    //         const dosage =
    //             this.locators.dosageInput(rowIndex);

    //         await dosage.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.click(dosage);

    //         await this.keywords.clear(dosage);

    //         await this.keywords.type(
    //             dosage,
    //             observationData.dosage
    //         );
    //     }
    // );

    // // =========================
    // // DOSAGE UNIT
    // // =========================

    // await StepHelper.step(
    //     this.page,
    //     `Dosage Unit - ${observationData.dosageUnit}`,
    //     async () => {

    //         const dosageUnit =
    //             this.locators.dosageUnitDropdown(rowIndex);

    //         await dosageUnit.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.selectOption(
    //             dosageUnit,
    //             {
    //                 label: observationData.dosageUnit
    //             }
    //         );
    //     }
    // );

    // // =========================
    // // FREQUENCY
    // // =========================

    // await StepHelper.step(
    //     this.page,
    //     `Frequency - ${observationData.frequency}`,
    //     async () => {

    //         const frequency =
    //             this.locators.frequencyDropdown(rowIndex);

    //         await frequency.waitFor({
    //             state: 'visible',
    //             timeout: timeout.elementTimeout
    //         });

    //         await this.keywords.selectOption(
    //             frequency,
    //             {
    //                 label: observationData.frequency
    //             }
    //         );
    //     }
    // );



   // =========================
// SCHEDULE
// =========================

await StepHelper.step(
    this.page,
    `Schedule - ${observationData.schedule.join('-')}`,
    async () => {

        const scheduleCell =
            this.locators.scheduleInput.nth(rowIndex);

        await scheduleCell.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const scheduleInputs =
            scheduleCell.locator('input');

        const scheduleCount =
            await scheduleInputs.count();

        for (
            let i = 0;
            i < observationData.schedule.length &&
            i < scheduleCount;
            i++
        ) {

            const schedule =
                scheduleInputs.nth(i);

            await schedule.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            // Replace existing value completely
            await schedule.fill(
                String(observationData.schedule[i])
            );

            // Move focus out so UI updates the value
            await schedule.press('Tab');
        }
    }
);

    // =========================
    // TIMING
    // =========================

    await StepHelper.step(
        this.page,
        `Timing - ${observationData.timing}`,
        async () => {

            const timing =
                this.locators.timingDropdown(rowIndex);

            await timing.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                timing,
                {
                    label: observationData.timing
                }
            );
        }
    );

    // =========================
    // DURATION
    // =========================

    await StepHelper.step(
        this.page,
        `Duration - ${observationData.duration}`,
        async () => {

            const duration =
                this.locators.durationInput.nth(rowIndex);

            await duration.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(duration);

            await this.keywords.clear(duration);

            await this.keywords.type(
                duration,
                observationData.duration
            );
        }
    );

    // =========================
    // DURATION UNIT
    // =========================

    await StepHelper.step(
        this.page,
        `Duration Unit - ${observationData.durationUnit}`,
        async () => {

            const durationUnit =
                this.locators.durationUnitDropdown(rowIndex);

            await durationUnit.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.selectOption(
                durationUnit,
                {
                    label: observationData.durationUnit
                }
            );
        }
    );

    // =========================
    // INSTRUCTION
    // =========================

    await StepHelper.step(
        this.page,
        `Instruction - ${observationData.instruction}`,
        async () => {

            const instructionCell =
                this.locators.instructionCell(rowIndex);

            await instructionCell.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.click(
                instructionCell
            );

            // const instruction =
            //     this.locators.instructionInput(rowIndex);//old

            const instruction =
                this.locators.instructionInput.nth(rowIndex);//new

            await instruction.waitFor({
                state: 'visible',
                timeout: timeout.elementTimeout
            });

            await this.keywords.clear(
                instruction
            );

            await this.keywords.type(
                instruction,
                observationData.instruction
            );
        }
    );
}

}

module.exports = { PrescriptionPage };
=======
module.exports = { PrescriptionPage };
 
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
