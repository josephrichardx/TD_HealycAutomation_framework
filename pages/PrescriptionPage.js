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

    async ApplyTemplate(templateName,searchKey,time,templateAppliedMessage) {

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

                const expectedMessage =
                    templateAppliedMessage;

                expect(actualMessage.trim()).toBe(
                    expectedMessage
                );
            } else {
                console.log(
                    'Template Applied Successfully message is not available, skipping verification.'
                );
            }
        }
    );

    //     await StepHelper.step(
    //     this.page,
    //     'Click Close button if available',
    //     async () => {

    //         if (
    //             await this.closeBtn
    //                 .isVisible()
    //                 .catch(() => false)
    //         ) {
    //             await this.keywords.click(
    //                 this.closeBtn
    //             );
    //         } else {
    //             console.log(
    //                 'Close button is not available, continuing without clicking.'
    //             );
    //         }

    //         await this.page.waitForTimeout(
    //             time
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

    async PrescriptionObservationfirst(templateName, searchKey, time,templateAppliedMessage, drugName, durationType1,durationType2,instruction) {

        await this.ApplyTemplate(
            templateName,
            searchKey,
            time,
            templateAppliedMessage
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
    templateAppliedMessage,
    addRows,
    drugs
) {

    // Fill Existing Row 1
    await this.PrescriptionObservationfirst(
        templateName,
        searchKey,
        time,
        templateAppliedMessage,
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


// async fillObservationRow(rowIndex, observationData, time) {

//     // Drug Name
//     await StepHelper.step(
//         this.page,
//         `Select Drug - ${observationData.drugName}`,
//         async () => {

//             const drugInput =
//                 this.locators.drugSearchInput.nth(rowIndex);

//             await this.keywords.click(drugInput);

//             await this.keywords.clear(drugInput);

//             await this.keywords.type(
//                 drugInput,
//                 observationData.drugName
//             );

//             await this.page.waitForTimeout(time);
//         }
//     );


//     // Form
//     await StepHelper.step(
//         this.page,
//         `Select Form - ${observationData.form}`,
//         async () => {

//             const formDropdown =
//                 this.locators.formDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 formDropdown,
//                 observationData.form
//             );
//         }
//     );


//     // Strength
//     await StepHelper.step(
//         this.page,
//         `Enter Strength - ${observationData.strength}`,
//         async () => {

//             const strengthInput =
//                 this.locators.strengthInput.nth(rowIndex);

//             await this.keywords.click(strengthInput);

//             await this.keywords.clear(strengthInput);

//             await this.keywords.type(
//                 strengthInput,
//                 observationData.strength
//             );
//         }
//     );


//     // Strength Unit
//     await StepHelper.step(
//         this.page,
//         `Select Strength Unit - ${observationData.strengthUnit}`,
//         async () => {

//             const strengthUnitDropdown =
//                 this.locators.strengthUnitDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 strengthUnitDropdown,
//                 observationData.strengthUnit
//             );
//         }
//     );


//     // Route
//     await StepHelper.step(
//         this.page,
//         `Select Route - ${observationData.route}`,
//         async () => {

//             const routeDropdown =
//                 this.locators.routeDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 routeDropdown,
//                 observationData.route
//             );
//         }
//     );


//     // Dosage
//     await StepHelper.step(
//         this.page,
//         `Enter Dosage - ${observationData.dosage}`,
//         async () => {

//             const dosageInput =
//                 this.locators.dosageInput.nth(rowIndex);

//             await this.keywords.click(dosageInput);

//             await this.keywords.clear(dosageInput);

//             await this.keywords.type(
//                 dosageInput,
//                 observationData.dosage
//             );
//         }
//     );


//     // Dosage Unit
//     await StepHelper.step(
//         this.page,
//         `Select Dosage Unit - ${observationData.dosageUnit}`,
//         async () => {

//             const dosageUnitDropdown =
//                 this.locators.dosageUnitDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 dosageUnitDropdown,
//                 observationData.dosageUnit
//             );
//         }
//     );


//     // Frequency
//     await StepHelper.step(
//         this.page,
//         `Select Frequency - ${observationData.frequency}`,
//         async () => {

//             const frequencyDropdown =
//                 this.locators.frequencyDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 frequencyDropdown,
//                 observationData.frequency
//             );
//         }
//     );


//     // Schedule
//     await StepHelper.step(
//         this.page,
//         `Enter Schedule - Row ${rowIndex + 1}`,
//         async () => {

//             const scheduleInputs =
//                 this.locators.scheduleInputs;

//             for (
//                 let j = 0;
//                 j < observationData.schedule.length;
//                 j++
//             ) {

//                 const scheduleIndex =
//                     (rowIndex * observationData.schedule.length) + j;

//                 const scheduleInput =
//                     scheduleInputs.nth(scheduleIndex);

//                 await this.keywords.click(
//                     scheduleInput
//                 );

//                 await this.keywords.clear(
//                     scheduleInput
//                 );

//                 await this.keywords.type(
//                     scheduleInput,
//                     observationData.schedule[j]
//                 );
//             }
//         }
//     );


//     // Timing
//     await StepHelper.step(
//         this.page,
//         `Select Timing - ${observationData.timing}`,
//         async () => {

//             const timingDropdown =
//                 this.locators.timingDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 timingDropdown,
//                 observationData.timing
//             );
//         }
//     );


//     // Duration
//     await StepHelper.step(
//         this.page,
//         `Enter Duration - ${observationData.duration}`,
//         async () => {

//             const durationInput =
//                 this.locators.durationInput.nth(rowIndex);

//             await this.keywords.click(durationInput);

//             await this.keywords.clear(durationInput);

//             await this.keywords.type(
//                 durationInput,
//                 observationData.duration
//             );
//         }
//     );


//     // Duration Unit
//     await StepHelper.step(
//         this.page,
//         `Select Duration Unit - ${observationData.durationUnit}`,
//         async () => {

//             const durationUnitDropdown =
//                 this.locators.durationUnitDropdown.nth(rowIndex);

//             await this.keywords.selectOption(
//                 durationUnitDropdown,
//                 observationData.durationUnit
//             );
//         }
//     );


//     // Instruction
//     await StepHelper.step(
//         this.page,
//         `Enter Instruction - ${observationData.instruction}`,
//         async () => {

//             const instructionInput =
//                 this.locators.instructionInput.nth(rowIndex);

//             await this.keywords.click(
//                 instructionInput
//             );

//             await this.keywords.clear(
//                 instructionInput
//             );

//             await this.keywords.type(
//                 instructionInput,
//                 observationData.instruction
//             );

//             await this.page.waitForTimeout(time);
//         }
//     );
// }

async fillObservationRow(rowIndex, observationData, time) {

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

            await this.keywords.clear(drugInput);

            await this.keywords.type(
                drugInput,
                observationData.drugName
            );

            await this.page.waitForTimeout(time);
        }
    );
    
// await StepHelper.step(
//     this.page,
//     `Drug Name - ${observationData.drugName}`,
//     async () => {

//         const drugCell =
//             this.locators.drugCell.nth(rowIndex);

//         await this.keywords.click(drugCell);

//         const drugInput =
//             this.locators.drugSearchInput.nth(rowIndex);

//         await this.keywords.clear(drugInput);

//         await this.keywords.type(
//             drugInput,
//             observationData.drugName
//         );

//         await this.page.waitForTimeout(time);

//         const drugLibraryOption =
//             this.locators.drugLibraryOption(
//                 observationData.drugName
//             );

//         await StepHelper.step(
//             this.page,
//             `Select Drug Library - ${observationData.drugName}`,
//             async () => {

//                 await this.keywords.click(
//                     drugLibraryOption
//                 );
//             }
//         );
//     }
// );

    // =========================
    // FORM
    // =========================

    await StepHelper.step(
        this.page,
        `Form - ${observationData.form}`,
        async () => {

            const form =
                this.locators.formDropdown.nth(rowIndex);

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

        await this.keywords.selectOption(
            strengthUnit,
            { label: observationData.strengthUnit }
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

                await this.keywords.click(schedule);

                await this.keywords.clear(schedule);

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

        // 1. Click Timing dropdown
        await this.keywords.click(
            this.locators.timingDropdown(rowIndex)
        );

        await this.page.waitForTimeout(time);

        // 2. Unselect existing Empty stomach
        await StepHelper.step(
            this.page,
            `Unselect Timing - Empty stomach`,
            async () => {

                await this.keywords.click(
                    this.locators.timingOption(
                        rowIndex,
                        "Empty stomach"
                    )
                );
            }
        );

        await this.page.waitForTimeout(time);

        // 3. Select required timing - Before food
        await StepHelper.step(
            this.page,
            `Select Timing - ${observationData.timing}`,
            async () => {

                await this.keywords.click(
                    this.locators.timingOption(
                        rowIndex,
                        observationData.timing
                    )
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

        await this.keywords.selectOption(
            durationUnit,
            { label: observationData.durationUnit }
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

        // Click instruction cell first
        await this.keywords.click(
            instructionCell
        );

        await this.page.waitForTimeout(500);

        const instruction =
            this.locators.instructionInput(rowIndex);

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

// async fillObservation(observationData, time) {

//     for (let i = 0; i <= observationData.row; i++) {

//         if (i > 0) {

//             await StepHelper.step(
//                 this.page,
//                 `Add Observation Row - ${i + 1}`,
//                 async () => {

//                     await this.keywords.click(
//                         this.locators.addRowBtn
//                     );

//                     await this.page.waitForTimeout(time);
//                 }
//             );
//         }

//         await this.fillObservationRow(
//             i,
//             observationData,
//             time
//         );
//     }
// }


async fillObservation(observationData, time) {

    const existingRows =
        this.locators.observationRows;

    const existingRowCount =
        await existingRows.count();

    // Fill all existing rows
    for (let i = 0; i < existingRowCount; i++) {

        await StepHelper.step(
            this.page,
            `Fill Existing Observation Row - ${i + 1}`,
            async () => {

                await this.fillObservationRow(
                    i,
                    observationData,
                    time
                );
            }
        );
    }

    // Add required new rows
    for (let i = 0; i < observationData.row; i++) {

        await StepHelper.step(
            this.page,
            `Add Observation Row - ${existingRowCount + i + 1}`,
            async () => {

                await this.keywords.click(
                    this.locators.observationAddRowBtn
                );

                await this.page.waitForTimeout(time);
            }
        );

        const newRowIndex =
            existingRowCount + i;

        await this.fillObservationRow(
            newRowIndex,
            observationData,
            time
        );
    }
}

// async fillObservation(observationData, time) {

//     const existingRows =
//         this.locators.drugSearchInput;

//     const existingRowCount =
//         await existingRows.count();

//     // Fill existing 3 rows
//     for (let i = 0; i < existingRowCount; i++) {

//         await this.fillObservationRow(
//             i,
//             observationData,
//             time
//         );
//     }

//     // Add only required additional rows
//     for (let i = 0; i < observationData.row; i++) {

//         await StepHelper.step(
//             this.page,
//             `Add Observation Row - ${existingRowCount + i + 1}`,
//             async () => {

//                 await this.keywords.click(
//                     this.locators.addRowBtn
//                 );

//                 await this.page.waitForTimeout(time);
//             }
//         );

//         await this.fillObservationRow(
//             existingRowCount + i,
//             observationData,
//             time
//         );
//     }
// }

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
async verifyNewTabObservationData(observationData,time) {

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

    const rows = this.locators
        .newTabDrugNameInput;

    for (let i = 0; i < observationData.row; i++) {

        // Drug Name
        await StepHelper.step(
        this.page,
        `Drug Name | Expected: ${observationData.drugName}`,
        async () => {

            const actualDrugName =
                await this.locators
                    .newTabDrugNameCell(0)
                    .innerText();

            expect(
                actualDrugName.trim()
            ).toBe(
                observationData.drugName.trim()
            );
        }
    );

        // Form
        await StepHelper.step(
            this.page,
            `Form | Expected: ${observationData.form}`,
            async () => {

                const actualForm =
                    await this.locators
                        .newTabFormDropdown(i)
                        .inputValue();

                expect(
                    actualForm.trim()
                ).toBe(
                    observationData.form.trim()
                );
            }
        );

        // Strength
        await StepHelper.step(
            this.page,
            `Strength | Expected: ${observationData.strength}`,
            async () => {

                const actualStrength =
                    await this.locators
                        .newTabStrengthInput(i)
                        .inputValue();

                expect(
                    actualStrength.trim()
                ).toBe(
                    observationData.strength.trim()
                );
            }
        );

        // Strength Unit
        await StepHelper.step(
            this.page,
            `Strength Unit | Expected: ${observationData.strengthUnit}`,
            async () => {

                const actualStrengthUnit =
                    await this.locators
                        .newTabStrengthUnitDropdown(i)
                        .inputValue();

                expect(
                    actualStrengthUnit.trim()
                ).toBe(
                    observationData.strengthUnit.trim()
                );
            }
        );

        // Route
        await StepHelper.step(
            this.page,
            `Route | Expected: ${observationData.route}`,
            async () => {

                const actualRoute =
                    await this.locators
                        .newTabRouteDropdown(i)
                        .inputValue();

                expect(
                    actualRoute.trim()
                ).toBe(
                    observationData.route.trim()
                );
            }
        );

        // Dosage
        await StepHelper.step(
            this.page,
            `Dosage | Expected: ${observationData.dosage}`,
            async () => {

                const actualDosage =
                    await this.locators
                        .newTabDosageInput(i)
                        .inputValue();

                expect(
                    actualDosage.trim()
                ).toBe(
                    observationData.dosage.trim()
                );
            }
        );

        // Dosage Unit
        await StepHelper.step(
            this.page,
            `Dosage Unit | Expected: ${observationData.dosageUnit}`,
            async () => {

                const actualDosageUnit =
                    await this.locators
                        .newTabDosageUnitDropdown(i)
                        .inputValue();

                expect(
                    actualDosageUnit.trim()
                ).toBe(
                    observationData.dosageUnit.trim()
                );
            }
        );

        // Frequency
        await StepHelper.step(
            this.page,
            `Frequency | Expected: ${observationData.frequency}`,
            async () => {

                const actualFrequency =
                    await this.locators
                        .newTabFrequencyDropdown(i)
                        .inputValue();

                expect(
                    actualFrequency.trim()
                ).toBe(
                    observationData.frequency.trim()
                );
            }
        );

        // Schedule
        await StepHelper.step(
            this.page,
            `Schedule | Expected: ${observationData.schedule.join(", ")}`,
            async () => {

                const scheduleInputs =
                    this.locators.newTabScheduleInputs(i);

                for (
                    let j = 0;
                    j < observationData.schedule.length;
                    j++
                ) {

                    const actualSchedule =
                        await scheduleInputs
                            .nth(j)
                            .inputValue();

                    expect(
                        actualSchedule.trim()
                    ).toBe(
                        observationData.schedule[j].trim()
                    );
                }
            }
        );

        // Timing
        await StepHelper.step(
            this.page,
            `Timing | Expected: ${observationData.timing}`,
            async () => {

                const actualTiming =
                    await this.locators
                        .newTabTimingDropdown(i)
                        .textContent();

                expect(
                    actualTiming.trim()
                ).toContain(
                    observationData.timing.trim()
                );
            }
        );

        // Duration
        await StepHelper.step(
            this.page,
            `Duration | Expected: ${observationData.duration}`,
            async () => {

                const actualDuration =
                    await this.locators
                        .newTabDurationInput(i)
                        .inputValue();

                expect(
                    actualDuration.trim()
                ).toBe(
                    observationData.duration.trim()
                );
            }
        );

        // Duration Unit
        await StepHelper.step(
            this.page,
            `Duration Unit | Expected: ${observationData.durationUnit}`,
            async () => {

                const actualDurationUnit =
                    await this.locators
                        .newTabDurationUnitDropdown(i)
                        .inputValue();

                expect(
                    actualDurationUnit.trim()
                ).toBe(
                    observationData.durationUnit.trim()
                );
            }
        );

        // Instruction
        await StepHelper.step(
            this.page,
            `Instruction | Expected: ${observationData.instruction}`,
            async () => {

                const actualInstruction =
                    await this.locators
                        .newTabInstructionInput(i)
                        .inputValue();

                expect(
                    actualInstruction.trim()
                ).toBe(
                    observationData.instruction.trim()
                );
            }
        );
    }
}

}

module.exports = { PrescriptionPage };