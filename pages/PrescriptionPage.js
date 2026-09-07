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

    async savePrescription() {
        await this.locators.topSaveBtn.click();
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

    async ApplyTemplate(
        templateName,
        searchKey,
        time,
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
        time,
        templateAppliedMessage,
        drugName,
        durationType1,
        durationType2,
        instruction
    ) {

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

    async PrescriptionObservationSecond(
        time,
        drugName,
        durationType1,
        durationType2,
        instruction
    ) {

        await this.fillObservationtwo(
            drugName,
            durationType1,
            durationType2,
            instruction,
            time
        );

        await this.clickSidebarEdgeToggle(time);
    }

    async fillMarginValues(
        top,
        bottom,
        leftRight,
        time
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
        time,
        templateAppliedMessage,
        addRows,
        drugs
    ) {

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

        await this.addAndVerifyRows(addRows);

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

    async fillObservationRow(
        rowIndex,
        observationData,
        time
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

                const instruction =
                    this.locators.instructionInput(rowIndex);

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

    async fillObservation(
        observationData,
        time
    ) {

        const existingRows =
            this.locators.observationRows;

        const existingRowCount =
            await existingRows.count();

        // Fill existing rows
        for (
            let i = 0;
            i < existingRowCount;
            i++
        ) {

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
        for (
            let i = 0;
            i < observationData.row;
            i++
        ) {

            await StepHelper.step(
                this.page,
                `Add Observation Row - ${existingRowCount + i + 1}`,
                async () => {

                    await this.keywords.click(
                        this.locators.observationAddRowBtn
                    );

                    const newRowIndex =
                        existingRowCount + i;

                    await this.locators.observationRows
                        .nth(newRowIndex)
                        .waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        });
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

    async openSameUrlInNewTab(url, time) {

        let newTab;

        await StepHelper.step(
            this.page,
            'Open URL and Login in New Tab',
            async () => {

                newTab =
                    await this.page.context().newPage();

                await newTab.goto(url, {
                    timeout: timeout.navigationTimeout,
                    waitUntil: 'load'
                });

                const loginPage =
                    new LoginPage(newTab);

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

    async verifyNewTabObservationData(
        observationData,
        time
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

        for (
            let i = 0;
            i < observationData.row;
            i++
        ) {

            // Drug Name
            await StepHelper.step(
                this.page,
                `Drug Name | Expected: ${observationData.drugName}`,
                async () => {

                    const drugCell =
                        this.locators.newTabDrugNameCell(i);

                    await drugCell.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualDrugName =
                        await drugCell.innerText();

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

                    const locator =
                        this.locators.newTabFormDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualForm =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabStrengthInput(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualStrength =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabStrengthUnitDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualStrengthUnit =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabRouteDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualRoute =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabDosageInput(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualDosage =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabDosageUnitDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualDosageUnit =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabFrequencyDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualFrequency =
                        await locator.inputValue();

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
                `Schedule | Expected: ${observationData.schedule.join(', ')}`,
                async () => {

                    const scheduleInputs =
                        this.locators.newTabScheduleInputs(i);

                    for (
                        let j = 0;
                        j < observationData.schedule.length;
                        j++
                    ) {

                        const scheduleInput =
                            scheduleInputs.nth(j);

                        await scheduleInput.waitFor({
                            state: 'visible',
                            timeout: timeout.elementTimeout
                        });

                        const actualSchedule =
                            await scheduleInput.inputValue();

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

                    const locator =
                        this.locators.newTabTimingDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualTiming =
                        await locator.textContent();

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

                    const locator =
                        this.locators.newTabDurationInput(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualDuration =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabDurationUnitDropdown(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualDurationUnit =
                        await locator.inputValue();

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

                    const locator =
                        this.locators.newTabInstructionInput(i);

                    await locator.waitFor({
                        state: 'visible',
                        timeout: timeout.elementTimeout
                    });

                    const actualInstruction =
                        await locator.inputValue();

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