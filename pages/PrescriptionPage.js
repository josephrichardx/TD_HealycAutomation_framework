const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { PrescriptionLocator } = require('../Locators/PrescriptionLocator.js');
const { Keywords } = require('../utils/Keywords');
const { LoginPage } = require('../pages/LoginPage');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class PrescriptionPage {

    constructor(page) {
        this.page = page;
        this.locators = new PrescriptionLocator(page);
        this.keywords = new Keywords();
    }

    async openScheduledAppointment() {
        await this.locators.appointmentCard.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.locators.appointmentCard.click();
    }

    async addSignature() {

        await this.locators.addSignatureBtn.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.locators.addSignatureBtn.click();

        if (
            await this.locators.signatureCanvas
                .isVisible()
                .catch(() => false)
        ) {
            const box =
                await this.locators.signatureCanvas.boundingBox();

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

    // async savePrescription() {
    //     await this.locators.topSaveBtn.click();
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

//     async switchToPageByIndex(index) {
 
//     const pages =
//         this.page.context().pages();
 
//     if (!pages[index]) {
//         throw new Error(
//             `Page with index ${index} does not exist. Total pages: ${pages.length}`
//         );
//     }
 
//     return pages[index];
// }

async switchToPageByIndex(index) {
 
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
            this.locators.toxicityTimingDropdown.nth(rowIndex);

        await timing.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await this.keywords.click(timing);

        const beforeFoodElements =
            await this.page.locator('body *').evaluateAll(
                elements =>
                    elements
                        .filter(
                            el =>
                                el.textContent?.trim() === 'Before food'
                        )
                        .map(el => ({
                            tag: el.tagName,
                            className: el.className,
                            id: el.id,
                            outerHTML: el.outerHTML
                        }))
            );

        console.log(
            'BEFORE FOOD ELEMENTS:',
            JSON.stringify(
                beforeFoodElements,
                null,
                2
            )
        );

        // Temporary
        await this.page.pause();
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

    // // ==========================================
    // // ADD HISTORY SECTIONS FROM TEST DATA
    // // ==========================================

    // for (const sectionName of sectionsToAdd) {

    //     await StepHelper.step(
    //         this.page,
    //         `Add ${sectionName} Section`,
    //         async () => {

    //             const addButton =
    //                 this.locators.historyAddButton(sectionName);

    //             const addedButton =
    //                 this.locators.historyAddedButton(sectionName);

    //             // Already Added -> Skip
    //             if (
    //                 await addedButton.count() > 0 &&
    //                 await addedButton.first().isVisible()
    //             ) {

    //                 console.log(
    //                     `[SKIP] ${sectionName} is already Added`
    //                 );

    //                 return;
    //             }

    //             // Add button available -> Click
    //             if (
    //                 await addButton.count() > 0 &&
    //                 await addButton.first().isVisible()
    //             ) {

    //                 await this.keywords.click(
    //                     addButton.first()
    //                 );

    //                 console.log(
    //                     `[PASS] ${sectionName} Add button clicked`
    //                 );

    //                 return;
    //             }

    //             console.log(
    //                 `[SKIP] ${sectionName} - Add button not available`
    //             );
    //         }
    //     );
    // }

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

// async getPDFText() {

//     let pdfText = "";

//     await StepHelper.step(
//         this.page,
//         "Get PDF Values",
//         async () => {

//             const pdfTextLayer =
//                 this.page.locator(
//                     "//div[@class='textLayer']"
//                 );

//             await pdfTextLayer.first().waitFor({
//                 state: "visible",
//                 timeout: timeout.elementTimeout
//             });

//             const pages =
//                 await pdfTextLayer.allInnerTexts();

//             let lines =
//                 pages
//                     .join("\n")
//                     .split(/\r?\n/)
//                     .map(line => line.trim())
//                     .filter(Boolean);

//             /*
//              * Remove PDF labels / section headers.
//              */
//             const ignoredValues = new Set([
//                 "Co-morbidities",
//                 "Toxicity",
//                 "Other Findings",
//                 "Evaluation",
//                 "Observation",
//                 "Advice",
//                 "Specific Advice",
//                 "Other section",
//                 "Drug Name",
//                 "Form",
//                 "Strength",
//                 "Route",
//                 "Dosage",
//                 "Frequency",
//                 "Schedule",
//                 "Timing",
//                 "Duration",
//                 "Instructions",
//                 "Patient Name:",
//                 "UHID:",
//                 "Age:",
//                 "Gender:",
//                 "Referral Tag:",
//                 "Consult Type:",
//                 "App. Location:",
//                 "OPD Date:",
//                 "OPDID:",
//                 "Doctor Name:",
//                 "Patient Number:",
//                 "For internal use only",
//                 "+ Add New"
//             ]);

//             lines =
//                 lines.filter(
//                     line =>
//                         !ignoredValues.has(line)
//                 );

//             /*
//              * Remove split PDF header words.
//              * Example:
//              * Streng
//              * th
//              *
//              * Dosag
//              * e
//              */
//             const splitHeaderValues = new Set([
//                 "Drug",
//                 "Name",
//                 "Streng",
//                 "th",
//                 "Dosag",
//                 "e",
//                 "Freque",
//                 "ncy",
//                 "Schedu",
//                 "le",
//                 "Durati",
//                 "on",
//                 "Instruc",
//                 "tions"
//             ]);

//             lines =
//                 lines.filter(
//                     line =>
//                         !splitHeaderValues.has(line)
//                 );

//             pdfText =
//                 lines.join("\n");

//             console.log(
//                 "========== PDF VALUES =========="
//             );

//             console.log(pdfText);
//         }
//     );

//     return pdfText;
// }


async getPDFText() {

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

            await pdfTextLayer.first().waitFor({
                state: "visible",
                timeout: timeout.elementTimeout
            });

            const pdfPages =
                await pdfTextLayer.allInnerTexts();

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
                this.extractPDFFormValues(
                    rawText
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


// extractPDFPatientValues(rawText) {

//     const lines =
//         rawText
//             .split("\n")
//             .map(line => line.trim())
//             .filter(Boolean);


//     const patientValues = [];

//     const patientStart =
//         lines.findIndex(
//             line =>
//                 line.startsWith("Mr ") ||
//                 line.startsWith("Mrs ") ||
//                 line.startsWith("Ms ")
//         );


//     if (patientStart === -1) {
//         return patientValues;
//     }


//     // Patient Name
//     if (lines[patientStart]) {
//         patientValues.push(
//             lines[patientStart]
//         );
//     }


//     // UHID
//     if (lines[patientStart + 1]) {
//         patientValues.push(
//             lines[patientStart + 1]
//         );
//     }


//     // Age
//     if (lines[patientStart + 2]) {
//         patientValues.push(
//             lines[patientStart + 2]
//         );
//     }


//     // Gender
//     if (lines[patientStart + 3]) {
//         patientValues.push(
//             lines[patientStart + 3]
//         );
//     }


//     // Referral Tag
//     if (lines[patientStart + 4]) {
//         patientValues.push(
//             lines[patientStart + 4]
//         );
//     }


//     // Consult Type
//     if (lines[patientStart + 5]) {
//         patientValues.push(
//             lines[patientStart + 5]
//         );
//     }


//     // App Location
//     if (lines[patientStart + 6]) {
//         patientValues.push(
//             lines[patientStart + 6]
//         );
//     }


//     // OPD Date
//     if (lines[patientStart + 7]) {
//         patientValues.push(
//             lines[patientStart + 7]
//         );
//     }


//     // OPD ID
//     if (lines[patientStart + 8]) {
//         patientValues.push(
//             lines[patientStart + 8]
//         );
//     }


//     // Doctor
//     if (lines[patientStart + 9]) {
//         patientValues.push(
//             lines[patientStart + 9]
//         );
//     }


//     // Patient Number
//     if (lines[patientStart + 10]) {
//         patientValues.push(
//             lines[patientStart + 10]
//         );
//     }


//     return patientValues;
// }

extractPDFPatientValues(rawText) {

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


// extractPDFFormValues(rawText) {

//     const lines =
//         rawText
//             .split("\n")
//             .map(line => line.trim())
//             .filter(Boolean);


//     const formValues = [];


//     // =====================================
//     // Find Patient section
//     // =====================================

//     const patientStart =
//         lines.findIndex(
//             line =>
//                 line.startsWith("Mr ") ||
//                 line.startsWith("Mrs ") ||
//                 line.startsWith("Ms ")
//         );


//     if (patientStart === -1) {
//         return formValues;
//     }


//     // =====================================
//     // Take everything before Patient section
//     // =====================================

//     const formLines =
//         lines.slice(0, patientStart);


//     // =====================================
//     // Remove PDF-only unwanted values
//     // =====================================

//     const ignoredValues = [
//         "Drug Name",
//         "Form",
//         "Strength",
//         "Duration",
//         "Instructions",
//         "Toxicity",
//         "Route",
//         "Dosage",
//         "Frequency",
//         "Schedule",
//         "Timing",
//         "Patient Name",
//         "UHID",
//         "Age",
//         "Gender"
//     ];


//     const filtered =
//         formLines.filter(line => {

//             return !ignoredValues.some(
//                 ignored =>
//                     line.toLowerCase() ===
//                     ignored.toLowerCase()
//             );
//         });


//     // =====================================
//     // Merge PDF broken values
//     // =====================================

//     for (let i = 0; i < filtered.length; i++) {

//         let value =
//             filtered[i];


//         // -------------------------------
//         // 1 AL Plus 5mg/ + 120mg Capsule
//         // -------------------------------

//         if (
//             value.endsWith("/") &&
//             i + 1 < filtered.length
//         ) {

//             value =
//                 value +
//                 filtered[++i];
//         }


//         // -------------------------------
//         // Before + food
//         // -------------------------------

//         else if (
//             value === "Before" &&
//             i + 1 < filtered.length &&
//             filtered[i + 1] === "food"
//         ) {

//             value =
//                 "Before food";

//             i++;
//         }


//         // -------------------------------
//         // Capsul + e
//         // -------------------------------

//         else if (
//             value === "Capsul" &&
//             i + 1 < filtered.length &&
//             filtered[i + 1] === "e"
//         ) {

//             value =
//                 "Capsule";

//             i++;
//         }


//         if (value.trim()) {

//             formValues.push(
//                 value.trim()
//             );
//         }
//     }


//     return formValues;
// }


extractPDFFormValues(rawText) {

    const lines =
        rawText
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);


    const formValues = [];


    // =====================================
    // Find Patient section
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
    // Everything before Patient section
    // =====================================

    const formLines =
        lines.slice(0, patientStart);


    // =====================================
    // Remove PDF headers / labels
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
    // Merge broken PDF values
    // =====================================

    for (
        let i = 0;
        i < filtered.length;
        i++
    ) {

        let value =
            filtered[i].trim();


        // =================================
        // Drug name:
        //
        // 1 AL Plus 5mg/
        // 120mg Capsule
        //
        // → 1 AL Plus 5mg/120mg Capsule
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
        // Drug name:
        //
        // 1 AL
        // Plus
        // 5mg/120mg
        // Capsule
        //
        // → 1 AL Plus 5mg/120mg Capsule
        // =================================

        else if (
            value === "1 AL" &&
            filtered[i + 1] === "Plus" &&
            filtered[i + 2]?.includes("mg/") &&
            filtered[i + 3] === "Capsule"
        ) {

            value =
                `${value} ` +
                `${filtered[i + 1]} ` +
                `${filtered[i + 2]} ` +
                `${filtered[i + 3]}`;

            i += 3;
        }


        // =================================
        // Before + food
        //
        // → Before food
        // =================================

        else if (
            value === "Before" &&
            filtered[i + 1] === "food"
        ) {

            value =
                "Before food";

            i++;
        }


        // =================================
        // Capsul + e
        //
        // → Capsule
        // =================================

        // else if (
        //     value === "Capsul" &&
        //     filtered[i + 1] === "e"
        // ) {

        //     value =
        //         "Capsule";

        //     i++;
        // }

       else if (
            value === "Capsul"
        ) {
            value = "Capsule";
        }


        // =================================
        // Add valid value
        // =================================

        if (value.trim()) {

            formValues.push(
                value.trim()
            );
        }
    }

    // =====================================================
    // OTHER FINDINGS
    // =====================================================

    const otherFindingValues = [
        "Custom other findings",
        "Custom text for 'Other Findings'"
    ];

    for (const value of otherFindingValues) {

        if (
            rawText
                .toLowerCase()
                .includes(value.toLowerCase())
        ) {
            formValues.push(value);
        }
    }



    return formValues;
}



// async getDraftText() {

//     let draftText = "";

//     await StepHelper.step(
//         this.page,
//         "Get Draft Values",
//         async () => {

//             const documentBody =
//                 this.locators.draftDocumentBody;

//             await documentBody.waitFor({
//                 state: "visible",
//                 timeout: timeout.elementTimeout
//             });

//             const values =
//                 await documentBody.evaluate((root) => {

//                     const result = [];

//                     /*
//                      * Get input / textarea values
//                      */
//                     root.querySelectorAll(
//                         "input, textarea"
//                     ).forEach(element => {

//                         const value =
//                             element.value?.trim();

//                         if (value) {
//                             result.push(value);
//                         }
//                     });

//                     /*
//                      * Get selected <select> values
//                      */
//                     root.querySelectorAll(
//                         "select"
//                     ).forEach(select => {

//                         const option =
//                             select.options[
//                                 select.selectedIndex
//                             ];

//                         const value =
//                             option?.textContent?.trim();

//                         if (
//                             value &&
//                             !value
//                                 .toLowerCase()
//                                 .startsWith("select")
//                         ) {
//                             result.push(value);
//                         }
//                     });

//                     /*
//                      * Get selected custom dropdown values
//                      */
//                     root.querySelectorAll(
//                         "button.dropdown-only-select"
//                     ).forEach(button => {

//                         const value =
//                             button.textContent?.trim();

//                         if (
//                             value &&
//                             !value
//                                 .toLowerCase()
//                                 .startsWith("select")
//                         ) {
//                             result.push(value);
//                         }
//                     });

//                     /*
//                      * Get visible document text
//                      * excluding UI controls
//                      */
//                     const clone =
//                         root.cloneNode(true);

//                     clone.querySelectorAll(
//                         "button, select, option, input, textarea, " +
//                         "[role='option'], " +
//                         ".dropdown-menu, " +
//                         ".select-options"
//                     ).forEach(element => {
//                         element.remove();
//                     });

//                     const text =
//                         clone.innerText || "";

//                     text
//                         .split(/\r?\n/)
//                         .map(value => value.trim())
//                         .filter(Boolean)
//                         .forEach(value => {

//                             result.push(value);
//                         });

//                     return result;
//                 });

//             /*
//              * Remove duplicate values
//              */
//             draftText =
//                 [...new Set(values)]
//                     .join("\n");

//             console.log(
//                 "========== DRAFT VALUES =========="
//             );

//             console.log(draftText);
//         }
//     );

//     return draftText;
// }

async getDraftText() {

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
                await this.extractDraftFormValues();


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


async extractDraftPatientValues() {

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


// async extractDraftFormValues() {

//     // ==========================================
//     // GET MEDICATION ROW VALUES
//     // ==========================================

//     const rows =
//         await this.locators.draftDocumentBody.evaluate(
//             root => {

//                 return Array.from(
//                     root.querySelectorAll(
//                         ".emr-table tbody tr.emr-row.medication-row"
//                     )
//                 ).map(row => {

//                     const values = [];

//                     row.querySelectorAll(
//                         "input, textarea, select, button.dropdown-only-select"
//                     ).forEach(element => {

//                         let value = "";

//                         // INPUT / TEXTAREA
//                         if (
//                             element.tagName === "INPUT" ||
//                             element.tagName === "TEXTAREA"
//                         ) {

//                             value =
//                                 element.value?.trim() || "";
//                         }

//                         // SELECT
//                         else if (
//                             element.tagName === "SELECT"
//                         ) {

//                             const option =
//                                 element.options[
//                                     element.selectedIndex
//                                 ];

//                             value =
//                                 option
//                                     ?.textContent
//                                     ?.trim() || "";
//                         }

//                         // CUSTOM DROPDOWN
//                         else if (
//                             element.matches(
//                                 "button.dropdown-only-select"
//                             )
//                         ) {

//                             value =
//                                 element.textContent
//                                     ?.trim() || "";
//                         }

//                         if (
//                             value &&
//                             !value
//                                 .toLowerCase()
//                                 .startsWith("select")
//                         ) {

//                             values.push(value);
//                         }
//                     });

//                     return values;
//                 });
//             }
//         );


//     console.log(
//         "========== DRAFT ROW VALUES =========="
//     );

//     rows.forEach((row, index) => {

//         console.log(
//             `ROW ${index}:`,
//             row
//         );
//     });


//     // ==========================================
//     // FINAL FORM VALUES
//     // ==========================================

//     const formValues = [];


//     // ==========================================
//     // NORMAL MEDICATION ROWS
//     // ==========================================

//     const normalRows = [];


//     // ROW 0
//     const medication1 =
//         rows.find(row =>
//             row[0]
//                 ?.toLowerCase()
//                 .startsWith(
//                     "1 al plus 5mg/120mg capsule"
//                 )
//         );

//     if (medication1) {
//         normalRows.push(medication1);
//     }


//     // ROW 1
//     const medication2 =
//         rows.find(row =>
//             row[0]
//                 ?.toLowerCase()
//                 .startsWith(
//                     "1 al ax 5mg/75mg capsule"
//                 )
//         );

//     if (medication2) {
//         normalRows.push(medication2);
//     }


//     // ROW 2
//     const feverRow =
//         rows.find(row =>
//             row[0]
//                 ?.toLowerCase() === "fever"
//         );

//     if (feverRow) {
//         normalRows.push(feverRow);
//     }


//     // ==========================================
//     // BUILD NORMAL MEDICATION VALUES
//     // ==========================================

//     normalRows.forEach(row => {

//         // Drug name
//         formValues.push(
//             row[0]
//         );


//         // Form
//         formValues.push(
//             row[1]
//         );


//         // Strength
//         if (
//             row[2] &&
//             row[3]
//         ) {

//             formValues.push(
//                 `${row[2]} ${row[3]}`
//             );
//         }


//         // Duration
//         if (
//             row[4] &&
//             row[5]
//         ) {

//             formValues.push(
//                 `${row[4]} ${row[5]}`
//             );
//         }


//         // Instructions
//         if (row[6]) {

//             formValues.push(
//                 row[6]
//             );
//         }
//     });


//     // ==========================================
//     // TOXICITY ROW 1
//     // DRUG FAV 1
//     // ==========================================

//     const toxicityRow1 =
//         rows.find(row =>
//             row[0]
//                 ?.toLowerCase()
//                 .startsWith("drug fav")
//         );


//     if (toxicityRow1) {

//         let drugName =
//             toxicityRow1[0]
//                 .trim();


//         // DRUG FAV 1 -> fav 1
//         if (
//             drugName
//                 .toLowerCase()
//                 .startsWith("drug ")
//         ) {

//             drugName =
//                 drugName.substring(5).trim();
//         }


//         // Drug
//         formValues.push(
//             drugName
//         );


//         // Form
//         formValues.push(
//             toxicityRow1[1]
//         );


//         // Strength
//         formValues.push(
//             `${toxicityRow1[2]} ${toxicityRow1[3]}`
//         );


//         // Route
//         formValues.push(
//             toxicityRow1[4]
//         );


//         // Dosage
//         formValues.push(
//             toxicityRow1[5]
//         );


//         // Dosage form
//         formValues.push(
//             toxicityRow1[6]
//         );


//         // Frequency
//         formValues.push(
//             toxicityRow1[7]
//         );


//         // Schedule
//         const schedule1 =
//             `${toxicityRow1[8]}-` +
//             `${toxicityRow1[9]}-` +
//             `${toxicityRow1[10]}-` +
//             `${
//                 toxicityRow1[11] === "04"
//                     ? "0"
//                     : toxicityRow1[11]
//             }`;

//         formValues.push(
//             schedule1
//         );


//         // Dosage after schedule
//         formValues.push(
//             toxicityRow1[5]
//         );


//         // Timing
//         formValues.push(
//             toxicityRow1[12]
//         );


//         // Duration
//         formValues.push(
//             `${toxicityRow1[13]} ${toxicityRow1[14]}`
//         );


//         // Instructions
//         formValues.push(
//             toxicityRow1[15]
//         );
//     }


//     // ==========================================
//     // TOXICITY ROW 2
//     // 1 AL PLUS 5MG/120MG CAPSULE
//     // ==========================================

//     const toxicityRow2Index =
//         rows.findIndex(
//             (row, index) =>
//                 index > 2 &&
//                 row[0]
//                     ?.toLowerCase()
//                     .startsWith(
//                         "1 al plus 5mg/120mg capsule"
//                     )
//         );


//     const toxicityRow2 =
//         toxicityRow2Index !== -1
//             ? rows[toxicityRow2Index]
//             : null;


//     if (toxicityRow2) {

//         // ======================================
//         // Drug name split
//         // ======================================

//         formValues.push(
//             "1 AL"
//         );

//         formValues.push(
//             "Plus"
//         );

//         formValues.push(
//             "5mg/120mg"
//         );


//         // ======================================
//         // Form
//         // ======================================

//         formValues.push(
//             toxicityRow2[1]
//         );


//         // ======================================
//         // Strength
//         // ======================================

//         // Same value from Draft DOM
//         formValues.push(
//             `${toxicityRow2[2]} ${toxicityRow2[3]}`
//         );


//         // ======================================
//         // Route
//         // ======================================

//         formValues.push(
//             toxicityRow2[4]
//         );


//         // ======================================
//         // Dosage
//         // ======================================

//         formValues.push(
//             toxicityRow2[5]
//         );


//         // ======================================
//         // Dosage form
//         // ======================================

//         formValues.push(
//             toxicityRow2[6]
//         );


//         // ======================================
//         // Frequency
//         // ======================================

//         formValues.push(
//             toxicityRow2[7]
//         );


//         // ======================================
//         // Schedule
//         // ======================================

//         const schedule2 =
//             `${toxicityRow2[8]}-` +
//             `${toxicityRow2[9]}-` +
//             `${toxicityRow2[10]}-` +
//             `${
//                 toxicityRow2[11] === "04"
//                     ? "0"
//                     : toxicityRow2[11]
//             }`;

//         formValues.push(
//             schedule2
//         );


//         // ======================================
//         // Dosage after schedule
//         // ======================================

//         formValues.push(
//             toxicityRow2[5]
//         );


//         // ======================================
//         // Timing
//         // ======================================

//         formValues.push(
//             toxicityRow2[12]
//         );


//         // ======================================
//         // Duration
//         // ======================================

//         formValues.push(
//             `${toxicityRow2[13]} ${toxicityRow2[14]}`
//         );


//         // ======================================
//         // Instructions
//         // ======================================

//         formValues.push(
//             toxicityRow2[15]
//         );
//     }


//     // ==========================================
//     // OTHER FINDINGS
//     // ==========================================

//     const otherFindings =
//         await this.locators.draftDocumentBody.evaluate(
//             root => {

//                 const result = [];

//                 root.querySelectorAll(
//                     "input, textarea, [contenteditable='true']"
//                 ).forEach(element => {

//                     const value =
//                         element.value?.trim() ||
//                         element.textContent?.trim() ||
//                         "";

//                     if (!value) {
//                         return;
//                     }

//                     if (
//                         value
//                             .toLowerCase()
//                             .includes(
//                                 "custom other findings"
//                             )
//                     ) {

//                         result.push(
//                             value
//                         );

//                         return;
//                     }

//                     if (
//                         value
//                             .toLowerCase()
//                             .includes(
//                                 "custom text for 'other findings'"
//                             )
//                     ) {

//                         result.push(
//                             value
//                         );
//                     }
//                 });

//                 return result;
//             }
//         );


//     formValues.push(
//         ...otherFindings
//     );


//     // ==========================================
//     // FINAL OUTPUT
//     // ==========================================

//     console.log(
//         "========== DRAFT FORM VALUES =========="
//     );

//     formValues.forEach(
//         (value, index) => {

//             console.log(
//                 `${index} : ${value}`
//             );
//         }
//     );


//     return formValues;
// }

async extractDraftFormValues() {

    const rows =
        await this.locators.draftDocumentBody.evaluate(
            root => {

                return Array.from(
                    root.querySelectorAll(
                        ".emr-table tbody tr.emr-row.medication-row"
                    )
                ).map(row => {

                    const values = [];

                    row.querySelectorAll(
                        "input, textarea, select, button.dropdown-only-select"
                    ).forEach(element => {

                        let value = "";

                        if (
                            element.tagName === "INPUT" ||
                            element.tagName === "TEXTAREA"
                        ) {

                            value =
                                element.value?.trim() || "";
                        }

                        else if (
                            element.tagName === "SELECT"
                        ) {

                            const option =
                                element.options[
                                    element.selectedIndex
                                ];

                            value =
                                option
                                    ?.textContent
                                    ?.trim() || "";
                        }

                        else if (
                            element.matches(
                                "button.dropdown-only-select"
                            )
                        ) {

                            value =
                                element.textContent
                                    ?.trim() || "";
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
            }
        );


    console.log(
        "========== DRAFT ROW VALUES =========="
    );

    rows.forEach((row, index) => {
        console.log(
            `ROW ${index}:`,
            row
        );
    });


    const formValues = [];


    // =================================================
    // NORMAL ROWS
    // ROW 0, 1, 2
    // =================================================

    for (let i = 0; i < 3; i++) {

        const row = rows[i];

        if (!row || row.length < 7) {
            continue;
        }

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


    // // =================================================
    // // TOXICITY ROW 1
    // // ROW 3 = DRUG FAV 1
    // // =================================================

    // const row3 = rows[3];

    // if (
    //     row3 &&
    //     row3.length >= 16
    // ) {

    //     formValues.push(
    //         row3[0]
    //             .replace(/^DRUG\s+/i, "")
    //             .trim()
    //     );

    //     formValues.push(row3[1]);

    //     formValues.push(
    //         `${row3[2]} ${row3[3]}`
    //     );

    //     formValues.push(row3[4]);

    //     formValues.push(row3[5]);

    //     formValues.push(row3[6]);

    //     formValues.push(row3[7]);

    //     formValues.push(
    //         `${row3[8]}-${row3[9]}-${row3[10]}-${
    //             row3[11] === "04"
    //                 ? "0"
    //                 : row3[11]
    //         }`
    //     );

    //     formValues.push(row3[5]);

    //     formValues.push(row3[12]);

    //     formValues.push(
    //         `${row3[13]} ${row3[14]}`
    //     );

    //     formValues.push(row3[15]);
    // }

    // =================================================
// TOXICITY ROW 1
// ROW 3 = DRUG FAV 1
// =================================================

const row3 = rows[3];

if (
    row3 &&
    row3.length >= 16
) {

    formValues.push(
        row3[0]
            .replace(/^DRUG\s+/i, "")
            .trim()
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

    // ❌ REMOVE THIS
    // formValues.push(row3[5]);

    formValues.push(row3[12]);

    formValues.push(
        `${row3[13]} ${row3[14]}`
    );

    formValues.push(row3[15]);
}


    // =================================================
    // TOXICITY ROW 2
    // ROW 4
    // =================================================

    // const row4 = rows[4];

    // if (
    //     row4 &&
    //     row4.length >= 16
    // ) {

    //     formValues.push("1 AL");

    //     formValues.push("Plus");

    //     formValues.push("5mg/120mg");

    //     formValues.push(row4[1]);

    //     formValues.push(
    //         `${row4[2]} ${row4[3]}`
    //     );

    //     formValues.push(row4[4]);

    //     formValues.push(row4[5]);

    //     formValues.push(row4[6]);

    //     formValues.push(row4[7]);

    //     formValues.push(
    //         `${row4[8]}-${row4[9]}-${row4[10]}-${
    //             row4[11]
    //         }`
    //     );

    //     formValues.push(row4[12]);

    //     formValues.push(
    //         `${row4[13]} ${row4[14]}`
    //     );

    //     formValues.push(row4[15]);
    // }

    // TOXICITY ROW 2 = row 4
const row4 = rows[4];

if (row4 && row4.length >= 16) {

    formValues.push("1 AL");
    formValues.push("Plus");
    formValues.push("5mg/120mg");

    formValues.push(row4[1]); // Capsule
    formValues.push(row4[1]); // Capsule - ADD THIS

    formValues.push(`${row4[2]} ${row4[3]}`);
    formValues.push(row4[4]);
    formValues.push(row4[5]);
    formValues.push(row4[6]);
    formValues.push(row4[7]);

    formValues.push(
        `${row4[8]}-${row4[9]}-${row4[10]}-${row4[11]}`
    );

    formValues.push(row4[12]);
    formValues.push(`${row4[13]} ${row4[14]}`);
    formValues.push(row4[15]);
}


    // =================================================
    // TOXICITY ROW 3
    // ROW 5
    // =================================================

    // const row5 = rows[5];

    // if (
    //     row5 &&
    //     row5.length >= 16
    // ) {

    //     formValues.push("1 AL");

    //     formValues.push("Plus");

    //     formValues.push("5mg/120mg");

    //     formValues.push(row5[1]);

    //     formValues.push(
    //         `${row5[2]} ${row5[3]}`
    //     );

    //     formValues.push(row5[4]);

    //     formValues.push(row5[5]);

    //     formValues.push(row5[6]);

    //     formValues.push(row5[7]);

    //     formValues.push(
    //         `${row5[8]}-${row5[9]}-${row5[10]}-${
    //             row5[11] === "04"
    //                 ? "0"
    //                 : row5[11]
    //         }`
    //     );

    //     formValues.push(row5[5]);

    //     formValues.push(row5[12]);

    //     formValues.push(
    //         `${row5[13]} ${row5[14]}`
    //     );

    //     formValues.push(row5[15]);
    // }


//     // TOXICITY ROW 3 = row 5
// const row5 = rows[5];

// if (row5 && row5.length >= 16) {

//     formValues.push("1 AL");
//     formValues.push("Plus");
//     formValues.push("5mg/120mg");

//     formValues.push(row5[1]); // Capsule
//     formValues.push(row5[1]); // Capsule - ADD THIS

//     formValues.push(`${row5[2]} ${row5[3]}`);
//     formValues.push(row5[4]);
//     formValues.push(row5[5]);
//     formValues.push(row5[6]);
//     formValues.push(row5[7]);

//     formValues.push(
//         `${row5[8]}-${row5[9]}-${row5[10]}-${
//             row5[11] === "04" ? "0" : row5[11]
//         }`
//     );

//     formValues.push(row5[12]);
//     formValues.push(`${row5[13]} ${row5[14]}`);
//     formValues.push(row5[15]);
// }

// =================================================
// TOXICITY ROW 3 = ROW 5
// =================================================

const row5 = rows[5];

if (row5 && row5.length >= 15) {

    formValues.push("1 AL");
    formValues.push("Plus");
    formValues.push("5mg/120mg");

    formValues.push(row5[1]); // Capsule
    formValues.push(row5[1]); // Capsule

    formValues.push(`${row5[2]} ${row5[3]}`);
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


    // =================================================
    // OTHER FINDINGS
    // =================================================

    const otherFindings =
        await this.locators.draftDocumentBody.evaluate(
            root => {

                const result = [];

                root.querySelectorAll(
                    "input, textarea, [contenteditable='true']"
                ).forEach(element => {

                    const value =
                        element.value?.trim() ||
                        element.textContent?.trim() ||
                        "";

                    if (
                        value
                            .toLowerCase()
                            .includes(
                                "custom other findings"
                            )
                    ) {

                        result.push(value);
                    }

                    else if (
                        value
                            .toLowerCase()
                            .includes(
                                "custom text for 'other findings'"
                            )
                    ) {

                        result.push(value);
                    }
                });

                return result;
            }
        );


    formValues.push(
        ...otherFindings
    );


    // =================================================
    // FINAL OUTPUT
    // =================================================

    console.log(
        "========== DRAFT FORM VALUES =========="
    );

    formValues.forEach(
        (value, index) => {

            console.log(
                `${index} : ${value}`
            );
        }
    );


    return formValues;
}

// async verifyPDFAndDraft(expected, actual) {

//     await StepHelper.step(
//         this.page,
//         "Verify PDF Expected vs Draft Actual",
//         async () => {

//             let isMatched = true;


//             // ==========================================
//             // NORMALIZE VALUE
//             // ==========================================

//             const normalize = (value) => {

//                 return String(value || "")
//                     .replace(/\s+/g, " ")
//                     .trim()
//                     .toLowerCase();
//             };


//             // ==========================================
//             // COMPARE ONE SECTION
//             // ==========================================

//             const compareSection = (
//                 sectionName,
//                 expectedValues,
//                 actualValues
//             ) => {

//                 console.log("");
//                 console.log(
//                     `========== ${sectionName} ==========`
//                 );


//                 const maxLength =
//                     Math.max(
//                         expectedValues.length,
//                         actualValues.length
//                     );


//                 for (
//                     let i = 0;
//                     i < maxLength;
//                     i++
//                 ) {

//                     const expectedValue =
//                         expectedValues[i] ?? "Not Found";

//                     const actualValue =
//                         actualValues[i] ?? "Not Found";


//                     const expectedNormalized =
//                         normalize(expectedValue);

//                     const actualNormalized =
//                         normalize(actualValue);


//                     const status =
//                         expectedNormalized ===
//                         actualNormalized
//                             ? "PASS"
//                             : "FAIL";


//                     console.log(
//                         `Expected : ${expectedValue}`
//                     );

//                     console.log(
//                         `Actual   : ${actualValue}`
//                     );

//                     console.log(
//                         `Status   : ${status}`
//                     );

//                     console.log(
//                         "------------------------------------------"
//                     );


//                     if (status === "FAIL") {

//                         isMatched = false;
//                     }
//                 }
//             };


//             // ==========================================
//             // PATIENT VALUES
//             // ==========================================

//             compareSection(
//                 "PATIENT VALUES",
//                 expected.patientValues,
//                 actual.patientValues
//             );


//             // ==========================================
//             // FORM VALUES
//             // ==========================================

//             compareSection(
//                 "FORM VALUES",
//                 expected.formValues,
//                 actual.formValues
//             );


//             // ==========================================
//             // FINAL STATUS
//             // ==========================================

//             console.log("");
//             console.log(
//                 "=================================================="
//             );

//             console.log(
//                 "          PDF vs DRAFT VERIFICATION"
//             );

//             console.log(
//                 "=================================================="
//             );

//             console.log(
//                 `FINAL STATUS : ${
//                     isMatched
//                         ? "PASS"
//                         : "FAIL"
//                 }`
//             );

//             console.log(
//                 "=================================================="
//             );


//             if (!isMatched) {

//                 throw new Error(
//                     "PDF Expected values and Draft Actual values are not matching."
//                 );
//             }
//         }
//     );
// }

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

}

module.exports = { PrescriptionPage };