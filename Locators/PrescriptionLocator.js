class PrescriptionLocator {

    constructor(page) {
        this.page = page;

        this.appointmentCard = page
            .locator('div.slot.custom-events-cards')
            .first();

        this.writePrescriptionBtn = page
            .locator('span.medical-action-label')
            .filter({ hasText: 'Write Prescription' });

        this.addSignatureBtn = page
            .locator('button.btn-add-signature');

        this.signatureCanvas = page
            .locator('canvas')
            .first();

        this.saveSignatureBtn = page
            .locator('button.btn-primary')
            .filter({ hasText: 'Save Signature' });

        this.topSaveBtn = page
            .locator('button.btn-primary')
            .filter({ hasText: 'Save' });

        this.generateAndShareBtn = page
            .locator('button.submit')
            .filter({ hasText: 'Generate & Share' });

        this.documentBody = this.page.locator('//div[@class="document-body"]');
        this.panelSearch = this.page.locator('//div[@class="panel-search"]');
        this.applyTemplateBtn = this.page.locator('//button[@aria-label="Apply template"]');
        this.templateSearchInput = page.locator(
            '//div[@class="panel-search"]//input'
        );
        this.leftarrowBtn =
        page.locator("//i[@class='fa-light fa-arrow-left-from-bracket']");

        // this.templateItem = page.locator(
        //     '//div[@class="template-item"]'
        // );

        this.templateItem = (templateName) =>
        page.locator('//div[@class="template-item"]')
        .filter({ hasText: templateName });

        this.templateAppliedSuccessMsg = page.locator(
            "//div[contains(@class,'toast')]"
        );

        this.closeBtn = page.locator("//button[text()=' Close ']");

        this.firstDrugCell =
        page.locator(
            "(//td[contains(@class,'col-drug col-id')])[1]"
        );

        this.firstDrugSearchInput =
            page.locator(
                "(//td[contains(@class,'col-drug col-id')])[1]"
            );

        this.favouriteOptionCheck =
            page.locator(
                "//input[@class='fav-option-check']"
            );

        this.firstDurationOption =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[1]"
            );

        this.firstDurationDropdown = page.locator(
        "(//td[contains(@class,'col-duration col-id')])[1]//select"
        );

        // this.firstDurationOption = (durationType) =>
        //     page.locator(
        //         `(//option[@value='${durationType}'])[1]`
        //     );

        this.secondDurationoption =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[2]"
            );

         this.SecondDurationDropdown = page.locator(
        "(//td[contains(@class,'col-duration col-id')])[2]//select"
        );

        this.secondDurationOption = (durationType) =>
            page.locator(
                `(//option[@value='${durationType}'])[2]`
            );

        this.firstInstructionsCell =
            page.locator(
                "(//td[contains(@class,'col-instructions')])[1]"
            );

        this.firstInstructionInput =
            page.locator(
                "(//input[contains(@placeholder,'Type instruction')])[1]"
            );

        this.addRowBtn =
            page.locator(
                "(//button[@title='Add row'])[1]"
            );

        this.firstMedicationRow = page.locator(
            "(//tbody//following::tr[@class='medication-row'])[1]"
        );

        //2row 

        this.secondDrugCell =
        page.locator(
            "(//td[contains(@class,'col-drug col-id')])[2]"
        );

        this.secondDrugSearchInput =
            page.locator(
                "(//td[contains(@class,'col-drug col-id')])[2]"
            );

        this.thirdDurationOption =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[3]"
            );

        this.ThirdDurationDropdown =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[3]//select"
            );

        this.fourthDurationOption =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[4]"
            );

        this.FourthDurationDropdown =
            page.locator(
                "(//td[contains(@class,'col-duration col-id')])[4]//select"
            );

        this.secondInstructionsCell =
            page.locator(
                "(//td[contains(@class,'col-instructions')])[2]"
            );

        this.secondInstructionInput =
            page.locator(
                "(//input[contains(@placeholder,'Type instruction')])[2]"
            );

        this.secondMedicationRow =
            page.locator(
                "(//tbody//following::tr[@class='medication-row'])[2]"
            );

        this.sidebarEdgeToggle = page.locator(
            "//button[@class='sidebar-edge-toggle collapsed']"
        );

        this.marginTopInput = page.locator(
        '(//div[@class="margin-input"])[1]//input'
        );

        this.marginBottomInput = page.locator(
            '(//div[@class="margin-input"])[2]//input'
        );

        this.marginLeftRightInput = page.locator(
            '(//div[@class="margin-input"])[3]//input'
        );

        this.proceedBtn = page.locator(
        "//button[text()=' Proceed ']"
        );

        // this.drugNameInput = (drugName) =>
        // this.page.getByDisplayValue(drugName.trim(), { exact: true });

        // this.instructionInput = (instruction) =>
        // this.page.getByDisplayValue(instruction.trim(), { exact: true });

        // this.durationType1Input = (drugName) =>
        // this.page
        // .getByDisplayValue(drugName.trim(), { exact: true })
        // .locator("xpath=ancestor::tr[1]")
        // .locator("select")
        // .first();

        // this.durationType2Input = (drugName) =>
        // this.page
        //     .getByDisplayValue(drugName.trim(), { exact: true })
        //     .locator("xpath=ancestor::tr[1]")
        //     .locator("select")
        //     .last();

        this.observationRow = (drugName) =>
    this.page
        .locator("//tr[contains(@class,'medication-row')]")
        .filter({
            has: this.page.getByDisplayValue(
                drugName.trim(),
                { exact: true }
            )
        });

    this.drugNameInput = (row) =>
        row.locator("input").filter({
            hasValue: row
                .locator("input")
                .first()
                .inputValue()
    });

    this.durationType1Input = (row) =>
        row.locator("select").first();

    this.durationType2Input = (row) =>
        row.locator("select").last();

    // Drug
this.drugCell = page.locator(
    "//td[contains(@class,'col-drug col-id')]"
);

this.drugSearchInput = page.locator(
    "//textarea[contains(@class,'drug-name-input')]"
);

// this.drugSearchInput = () =>
//     page
//         .locator("tr.medication-row")
//         .last()
//         .locator("textarea.drug-name-input");

this.drugLibraryOption = (drugName) =>
    page.getByText(
        `Drug Library: ${drugName}`,
        { exact: true }
    );
// Form
this.formDropdown = page.locator(
    "//td[contains(@class,'col-form')]//select"
);

// Strength
this.strengthInput = page.locator(
    "//td[contains(@class,'col-strength')]//input"
);

this.strengthUnitDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-strength select");

// this.strengthUnitDropdown = page.locator(
//     "//td[contains(@class,'col-strength')]//select"
// );

// Route
this.routeDropdown = page.locator(
    "//td[contains(@class,'col-route')]//select"
);

// Dosage
this.dosageInput = page.locator(
    "//td[contains(@class,'col-dosage')]//input"
);

// this.dosageUnitDropdown = page.locator(
//     "//td[contains(@class,'col-dosage')]//select"
// );

// this.dosageUnitDropdown = (rowIndex) =>
//     page
//         .locator("//tr[contains(@class,'medication-row')]")
//         .nth(rowIndex)
//         .locator("td.col-dosage select");
this.dosageUnitDropdown = page.locator(
    "//tr[contains(@class,'medication-row')]//td[contains(@class,'col-dosage')]//select"
);

// Frequency
this.frequencyDropdown = page.locator(
    "//td[contains(@class,'col-frequency')]//select"
);

// Schedule
this.scheduleInputs = page.locator(
    "//td[contains(@class,'col-schedule')]//input"
);

// // Timing
// this.timingCell = page.locator(
//     "//td[contains(@class,'col-timing')]"
// );

// this.timingButton = page.locator(
//     "//td[contains(@class,'col-timing')]//button"
// );

// this.timingOption = (timing) =>
//     page.locator(
//         `//button[@title='${timing}']`
//     );

// Duration
this.durationInput = page.locator(
    "//td[contains(@class,'col-duration')]//input"
);

// this.durationUnitDropdown = page.locator(
//     "//td[contains(@class,'col-duration')]//select"
// );

this.durationUnitDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-duration select");  

// Instruction
// this.instructionInput = page.locator(
//     "//td[contains(@class,'col-instructions')]//input"
// );

this.medicationRows = page.locator(
    "//tr[contains(@class,'medication-row')]"
);

// this.medicationRows = page.locator(
//     "//tr[contains(@class,'medication-row')]"
// );

// Timing Cell

this.timingCell = (rowIndex) =>
    page
        .locator("tr.medication-row")
        .nth(rowIndex)
        .locator("td.col-timing");

// Timing Dropdown
this.timingDropdown = (rowIndex) =>
    this.timingCell(rowIndex)
        .locator("button.multi-select-trigger");

// Timing Option
this.timingOption = (rowIndex, timing) =>
    this.timingCell(rowIndex)
        .locator("div.multi-select-option")
        .filter({ hasText: timing })
        .first();

this.instructionCell = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-instructions");

this.instructionInput = (rowIndex) =>
    this.instructionCell(rowIndex)
        .locator("input[placeholder*='Type instruction']");


// this.observationRow = (drugName) =>
//     this.page.locator(
//         `//tr[contains(@class,'medication-row')][.//input[@value="${drugName.trim()}"]]`
//     );

// =========================
// NEW TAB - VERIFICATION
// =========================

// this.newTabDrugNameInput = (rowIndex) =>
//     page
//         .locator("//tr[contains(@class,'medication-row')]")
//         .nth(rowIndex)
//         .locator("textarea.drug-name-input");

this.newTabDrugNameCell = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-drug");

this.newTabFormDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-form select");

this.newTabStrengthInput = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-strength input");

this.newTabStrengthUnitDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-strength select");

this.newTabRouteDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-route select");

this.newTabDosageInput = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-dosage input");

this.newTabDosageUnitDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-dosage select");

this.newTabFrequencyDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-frequency select");

this.newTabScheduleInputs = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-schedule input");

this.newTabTimingDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-timing button");

this.newTabDurationInput = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-duration input");

this.newTabDurationUnitDropdown = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-duration select");

this.newTabInstructionInput = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td.col-instructions input");

this.observationRows =
    page.locator("//tr[contains(@class,'medication-row')]");

    this.existingObservationRows =
    page.locator("//tr[contains(@class,'medication-row')]");

this.observationSection =
    page.locator("fieldset").filter({
        hasText: "Co-morbidities"
    });

// this.observationAddRowBtn =
//     this.observationSection.getByRole("button", { name: "+" });

this.observationAddRowBtn = page
    .locator("section")
    .filter({
        hasText: "Co-morbidities"
    })
    .locator("button")
    .filter({
        has: page.locator("svg")
    })
    .last();

        }

    drugLibrary(drugName) {
        return this.page.getByText(drugName);
    }

    drugCheckbox(drugName) {
        return this.page.getByRole(
            'checkbox',
            { name: drugName }
        );
    }

    drugInstruction(drugName) {
        return this.page
            .getByRole('row', {
                name: new RegExp(drugName)
            })
            .getByPlaceholder(
                'Type instruction (e.g. Before'
            );
    }

    durationDropdownByIndex(index) {
        return this.page
            .getByRole('combobox')
            .nth(index);
    }
}

module.exports = { PrescriptionLocator };