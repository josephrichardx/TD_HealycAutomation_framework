const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PrescriptionLocator } = require('../Locators/PrescriptionLocator.js');
const { Keywords } = require('../utils/Keywords');
const { LoginPage } = require('../pages/LoginPage');

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
        durationType1,
        durationType2,
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
            `Select Duration - ${durationType1}`,
            async () => {

                await this.keywords.click(
                    this.locators.firstDurationOption
                );

                await this.page.waitForTimeout(time);

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

                await this.page.waitForTimeout(time);

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

async fillObservationtwo(
    drugName,
    durationType1,
    durationType2,
    instruction,
    time
) {

    await StepHelper.step(
        this.page,
        `Select Drug - ${drugName}`,
        async () => {

            await this.keywords.click(
                this.locators.secondDrugCell
            );

            await this.page.waitForTimeout(time);

            await this.keywords.type(
                this.locators.secondDrugSearchInput,
                drugName
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Select Duration - ${durationType1}`,
        async () => {

            await this.keywords.click(
                this.locators.thirdDurationOption
            );

            await this.page.waitForTimeout(time);

            await this.keywords.selectOption(
                this.locators.ThirdDurationDropdown,
                durationType1
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Select Duration - ${durationType2}`,
        async () => {

            await this.keywords.click(
                this.locators.fourthDurationOption
            );

            await this.page.waitForTimeout(time);

            await this.keywords.selectOption(
                this.locators.FourthDurationDropdown,
                durationType2
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Select Instruction - ${instruction}`,
        async () => {

            await this.keywords.click(
                this.locators.secondInstructionsCell
            );

            await this.keywords.click(
                this.locators.secondInstructionInput
            );

            await this.keywords.type(
                this.locators.secondInstructionInput,
                instruction
            );

            await this.page.waitForTimeout(time);
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
                ).toBeVisible();
            }
        );
    }
}

    async PrescriptionObservationfirst(templateName, searchKey, time, drugName, durationType1,durationType2, instruction) {

        await this.ApplyTemplate(
            templateName,
            searchKey,
            time
        );

        await this.fillObservationone(
            drugName,
            durationType1,
            durationType2,
            instruction,
            time
        );
    }

    async PrescriptionObservationSecond(time, drugName, durationType1,durationType2, instruction) {

        await this.fillObservationtwo(
        drugName,
        durationType1,
        durationType2,
        instruction,
        time
        );  
        
        await this.clickSidebarEdgeToggle(time);
    }

   async fillMarginValues(top, bottom, leftRight,time) {

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

            await this.page.waitForTimeout(time);
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

            await this.page.waitForTimeout(time);
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

            await this.page.waitForTimeout(time);
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

                await this.page.waitForTimeout(time);

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
    time,
    addRows,
    drugs
) {

    // Fill Existing Row 1
    await this.PrescriptionObservationfirst(
        templateName,
        searchKey,
        time,
        drugs[0].drugName,
        drugs[0].durationType1,
        drugs[0].durationType2,
        drugs[0].instruction
    );

    // Add and verify new rows
    await this.addAndVerifyRows(addRows);



    // Fill newly added rows
    for (let i = 1; i <= addRows; i++) {

        await this.PrescriptionObservationSecond(
            time,
            drugs[i].drugName,
            drugs[i].durationType1,
            drugs[i].durationType2,
            drugs[i].instruction
        );
    }
}

async openSameUrlInNewTab(url, time) {

    let newTab;

    await StepHelper.step(
        this.page,
        'Open URL and Login in New Tab',
        async () => {

            newTab = await this.page.context().newPage();

            await newTab.goto(url);

            await newTab.waitForTimeout(Number(time));

            const loginPage = new LoginPage(newTab);

            await loginPage.login();
        }
    );

    return newTab;
}

async clickSidebarEdgeToggle(time) {

    await StepHelper.step(
        this.page,
        'Click Sidebar Edge Toggle',
        async () => {

            await this.keywords.click(
                this.locators.sidebarEdgeToggle
            );

            await this.page.waitForTimeout(time);

        }
    );
}

// async verifyPrescriptionObservationData(drugs) {

//     for (const drug of drugs) {

//         await StepHelper.step(
//             this.page,
//             `Verify Prescription Data - ${drug.drugName}`,
//             async () => {

//                 // Actual values from UI
//                 const actualDrugName =
//                     await this.locators.drugNameInput(
//                         drug.drugName
//                     ).inputValue();

//                 const actualInstruction =
//                     await this.locators.instructionInput(
//                         drug.instruction
//                     ).inputValue();

//                 const actualDurationType1 =
//                     await this.locators.durationType1Input(
//                         drug.drugName
//                     ).inputValue();

//                 const actualDurationType2 =
//                     await this.locators.durationType2Input(
//                         drug.drugName
//                     ).inputValue();


//                 // Expected values from Data
//                 const expectedDrugName =
//                     drug.drugName;

//                 const expectedDurationType1 =
//                     drug.durationType1;

//                 const expectedDurationType2 =
//                     drug.durationType2;

//                 const expectedInstruction =
//                     drug.instruction;


//                 // Verify Drug Name
//                 expect(actualDrugName.trim())
//                     .toBe(expectedDrugName.trim());


//                 // Verify Duration Type 1
//                 expect(actualDurationType1.trim())
//                     .toBe(expectedDurationType1.trim());


//                 // Verify Duration Type 2
//                 expect(actualDurationType2.trim())
//                     .toBe(expectedDurationType2.trim());


//                 // Verify Instruction
//                 expect(actualInstruction.trim())
//                     .toBe(expectedInstruction.trim());
//             }
//         );
//     }
// }

async verifyPrescriptionObservationData(drugs) {

    for (const drug of drugs) {

        const row =
            this.locators.observationRow(
                drug.drugName
            );

        await StepHelper.step(
            this.page,
            `Verify Drug Name - ${drug.drugName}`,
            async () => {

                const actualDrugName =
                    await this.locators.drugNameInput(
                        row
                    ).inputValue();

                expect(
                    actualDrugName.trim(),
                    `Expected: ${drug.drugName.trim()}, Actual: ${actualDrugName.trim()}`
                ).toBe(
                    drug.drugName.trim()
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Verify Duration Type 1 - ${drug.durationType1}`,
            async () => {

                const actualDurationType1 =
                    await this.locators.durationType1Input(
                        row
                    ).inputValue();

                expect(
                    actualDurationType1.trim(),
                    `Expected: ${drug.durationType1.trim()}, Actual: ${actualDurationType1.trim()}`
                ).toBe(
                    drug.durationType1.trim()
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Verify Duration Type 2 - ${drug.durationType2}`,
            async () => {

                const actualDurationType2 =
                    await this.locators.durationType2Input(
                        row
                    ).inputValue();

                expect(
                    actualDurationType2.trim(),
                    `Expected: ${drug.durationType2.trim()}, Actual: ${actualDurationType2.trim()}`
                ).toBe(
                    drug.durationType2.trim()
                );
            }
        );


        await StepHelper.step(
            this.page,
            `Verify Instruction - ${drug.instruction}`,
            async () => {

                const actualInstruction =
                    await this.locators.instructionInput(
                        row
                    ).inputValue();

                expect(
                    actualInstruction.trim(),
                    `Expected: ${drug.instruction.trim()}, Actual: ${actualInstruction.trim()}`
                ).toBe(
                    drug.instruction.trim()
                );
            }
        );
    }
}

}

module.exports = { PrescriptionPage };