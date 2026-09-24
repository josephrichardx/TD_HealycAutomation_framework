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
        // this.templateSearchInput = page.locator(
        //     '//div[@class="panel-search"]//input'
        // );
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
);//old

// this.drugSearchInput =
//     page.locator('input[placeholder="Search or enter drug name"]');//new

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

// this.instructionInput = (rowIndex) =>
//     this.instructionCell(rowIndex)
//         .locator("input[placeholder*='Type instruction']");//old

this.instructionInput =
    page.locator('input[placeholder="Enter instructions"]');//new


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

// this.newTabDrugNameCell = (rowIndex) =>
//     page
//         .locator("//tr[contains(@class,'medication-row')]")
//         .nth(rowIndex)
//         .locator("td.col-drug");
this.newTabDrugNameCell = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("td")
        .first();

// this.newTabDrugNameInput = (rowIndex) =>
//     page
//         .locator("//tr[contains(@class,'medication-row')]")
//         .nth(rowIndex)
//         .locator("textarea.drug-name-input");

this.newTabDrugNameInput = (rowIndex) =>
    page
        .locator("//tr[contains(@class,'medication-row')]")
        .nth(rowIndex)
        .locator("textarea.drug-name-input");

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

// this.observationAddRowBtn = page
//     .locator("section")
//     .filter({
//         hasText: "Co-morbidities"
//     })
//     .locator("button")
//     .filter({
//         has: page.locator("svg")
//     })
//     .last();

// this.observationAddRowBtn =
//     page.locator(
//         'app-emr-medications-table[data-section-id="co_morbidities"] button[title="Add row"]'
//     );//old

this.observationAddRowBtn =
    page.locator('button.add-new-btn').first();//new

// NEW TAB - SAVE
// =======================

this.newTabSaveButton = page.locator("//button[text()=' Save']");

// this.printOptionsBtn =
//     page.locator("//button[@aria-label='Print options']").first();

this.shareWithPatientBtn =
    page.locator("//button[text()=' Share with Patient ']").first();

this.newTabGenerateShareButton = page.locator(
    "//button[text()=' Generate & Share ']"
);

this.newTabExitButton = page.locator(
   "button:has(i.fa-light.fa-arrow-left-from-bracket)"
);

// this.newTabExitButton = page.locator(
//     "//i[@class='fa-light fa-arrow-right-from-bracket']"
// );


this.newTabEyeIcon = page.locator(
    "(//i[@class='fa-light fa-eye'])[1]"
);


//Apply Template in frontend

this.formatValueButton = page.locator(
    "//button[@class='format-value']"
);

this.formatValueOption = (formatValue) =>
    page.locator(`//span[text()='${formatValue}']`);

this.templatesButton = page.locator(
    "//button[@aria-label='Templates']"
);

this.templateSearchInput = page.locator(
    "//input[@placeholder='Search templates...']"
);

this.templateListName = page.locator(
    "//div[contains(@class,'tpl-card-name')]"
);

this.applyButton = page.locator(
    "(//button[text()=' Apply '])[1]"
);

this.replaceButton = page.locator(
    "//button[text()=' Replace ']"
);

this.templateSuccessMessage = page.locator(
    "//div[contains(@class,'mdc-snackbar__label')]"
);

this.createNewTemplateBtn =
    page.locator("//button[text()=' + Create New Template ']").first();

this.templateNameInput =
    page.locator("//input[@placeholder='e.g. Diabetes + Hypertension']").first();

this.saveTemplateBtn =
    page.locator("//button[text()=' Save Template ']").first();

this.otherFindingsInput =
    page.locator("//div[@data-placeholder='Add custom Other Findings']");

this.addOtherFindingBtn =
    page.locator("//button[text()=' Add ']").first();


this.specificAdviceTypeDropdown =
    page.locator(
        "//app-emr-checklist[@data-section-id='specific_advice']//select[contains(@class,'add-type-dropdown')]"
    );

this.specificAdviceTextInput =
    page.locator(
        "//div[@data-placeholder='Enter item...']"
    );
 
this.specificAdviceAddBtn =
    page.locator(
        "//button[contains(@class,'add-item-btn')]"
    );
 
this.specificAdviceCheckbox =
    page.locator(
        "(//div[contains(@class,'checkbox-item')])[5]//input"
    );

this.specificAdviceImageInput =
page.locator(
     "//app-emr-checklist[@data-section-id='specific_advice']//input[contains(@class,'add-item-image-input')]"
);

this.specificAdviceImageCheckbox =
page.locator(
     "(//div[contains(@class,'checkbox-item')])[6]//input"
);

this.printOptionsBtn =
    page.locator("//button[@aria-label='Print options']").first();

this.savePrescriptionBtn =
    page.locator("//button[text()=' Save Prescription ']").first();

this.historyButton =
    page.locator("//button[@class='hdr-btn']").first();

this.historySection = (sectionName) =>
    page.locator(
        `xpath=//*[normalize-space(text())='${sectionName}']/ancestor::*[
            .//button[normalize-space()='Add' or normalize-space()='Added']
        ][1]`
    );

// this.historyAddButton = (sectionName) =>
//     this.historySection(sectionName).getByRole('button', {
//         name: 'Add',
//         exact: true
//     });

// History Section Add Button
this.historyAddButton = (sectionName) =>
    this.page.locator(
        `//*[normalize-space(text())='${sectionName}']/ancestor::*[.//button[@class='ehm-add-btn']][1]//button[@class='ehm-add-btn']`
    );

this.historyAddedButton = (sectionName) =>
    this.historySection(sectionName).getByRole('button', {
        name: 'Added',
        exact: true
    });

this.documentsBtn =
    page.locator("//button[text()='Documents']").first();

// this.documentActions = page.locator(
//     "//div[contains(@class,'mrdoc-actions')]"
// );

this.documentActions =
    page.locator(
        "//div[contains(@class,'mrdoc-actions')]"
    ).first();

// this.viewButton = page.locator(
//     "//button[@title='View']"
// );

this.viewButton = page.locator(
    "//button[@title='View']"
).first();

// this.editDocumentButton =
//     page.locator("//button[@title='Edit']");

this.editDocumentButton =
    page.locator("//button[@title='Edit']").first();

this.previewActions = page.locator(
    "//div[contains(@class,'preview-actions')]"
);

this.closePdf =
    page.locator("//i[contains(@class,'fa-solid fa-xmark')]");

// this.closeHistory =
//     page.locator("//i[contains(@class,'fa-light fa-xmark')]");

this.closeHistory =
    page.locator("//button[@aria-label='Close']");

// =========================
// DRUG OPTIONS
// =========================

// this.favoriteDrug = (drugName) =>
//     page.locator(
//         `//label[contains(@class,"fav-option")]//span[contains(@class,"fav-option-cell") and normalize-space()="${drugName}"]`
//     );

this.favoriteDrug =
    (drugName) =>
        page.locator(
            `//div[text()='Favourites']//following::label[@class='fav-option'][.//span[contains(normalize-space(),'${drugName}')]]`
        );

// this.firstFavoriteOption =
//     page.locator(
//         "(//div[text()='Favourites']//following::label[@class='fav-option'])[1]"
//     );

this.suggestionDrug = (drugName) =>
    page.locator(
        `//button[contains(@class,"suggestion-option")]//span[contains(@class,"fav-option-cell") and normalize-space()="${drugName}"]`
    );

this.drugLibraryDrug = (drugName) =>
    page.locator(
        `//label[contains(@class,"drug-lib-option")]//span[contains(@class,"fav-option-cell") and normalize-space()="${drugName}"]`
    );

  // =====================================================
        // CO-MORBIDITIES
        // =====================================================

        // Drug input of each Co-morbidity row
        this.coMorbidityDrugInput =
            page.locator(
                'input[placeholder*="Search or enter"]'
            );

        // Same row container
        this.coMorbidityRow = (rowIndex) =>
            this.coMorbidityDrugInput
                .nth(rowIndex)
                .locator(
                    'xpath=ancestor::div[.//input[contains(@placeholder,"Search or enter")] and .//input[contains(@placeholder,"Enter instructions")]][1]'
                );

        // Favorite option
        this.firstFavoriteOption =
            page.locator(
                'text=FAVOURITES'
            ).locator('xpath=following::input[@type="checkbox"][1]');


        // Drug input inside same row
        this.rowDrugInput = (rowIndex) =>
            this.coMorbidityRow(rowIndex)
                .locator(
                    'input[placeholder*="Search or enter"]'
                );

        // Form inside same row
        this.rowForm = (rowIndex) =>
            this.coMorbidityRow(rowIndex)
                .locator(
                    'text=Select form'
                )
                .first();

        // Instruction input inside same row
        this.rowInstructionInput = (rowIndex) =>
            this.coMorbidityRow(rowIndex)
                .locator(
                    'input[placeholder*="Enter instructions"]'
                );

    this.coMorbidityHeader =
    page.locator("//h3[text()='Co-morbidities']");

    // this.toxicityHeader =
    // this.page.locator("//h3[text()='Toxicity']");

    this.firstSuggestionOption =
    page.locator(
        "(//div[text()='Suggestions']//following::button[@class='fav-option suggestion-option'])[1]"
    );


// this.toxicityHeader =
//     this.page.locator("//h3[normalize-space()='Toxicity']");

this.toxicitySection =
    this.page.locator(
        "//h3[normalize-space()='Toxicity']/ancestor::div[.//table[contains(@class,'emr-table')]][1]"
    );


// =====================================================
// DRUG NAME
// =====================================================

// this.toxicityDrugSearchInput =
//     this.toxicitySection.locator(
//         "input.cell-input[placeholder='Search or enter drug name']"
//     );

// this.toxicityDrugSearchInput =
//     page.locator(
//         "//h3[normalize-space()='Toxicity']" +
//         "/following::table[contains(@class,'medications-table')][1]" +
//         "//tbody/tr//input[" +
//         "@placeholder='Search or enter drug name'" +
//         "]"
//     );



// =====================================================
// FAVORITE
// =====================================================

// this.toxicityFavoriteOption =
//     page.locator(
//         "div.fav-dropdown:visible label.fav-option input[type='checkbox']"
//     ).first();

this.toxicityFavoriteOption =
    page.locator(
        "div.fav-dropdown:visible input[type='checkbox']"
    ).first();

// =====================================================
// FORM
// =====================================================

// this.toxicityFormDropdown =
//     this.toxicitySection.locator(
//         "select"
//     );


// =====================================================
// ADD NEW
// =====================================================

this.toxicityAddNewBtn =
    this.toxicitySection.getByText(
        "Add New",
        { exact: true }
    );


// =====================================================
// TOXICITY
// =====================================================

// Toxicity Header
this.toxicityHeader =
    page.locator("//h3[normalize-space()='Toxicity']");


// Toxicity Rows
this.toxicityRows =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr"
    );


// -----------------------------------------------------
// Drug Search
// -----------------------------------------------------

// this.toxicityDrugSearchInput =
//     page.locator(
//         "//h3[normalize-space()='Toxicity']" +
//         "/following::table[contains(@class,'medications-table')][1]" +
//         "//tbody/tr//input[contains(@class,'cell-input')]"
//     );

this.toxicityDrugSearchInput =
    page.locator(
        "//h3[text()='Toxicity']//following::textarea[@placeholder='Search or enter drug name']"
    );

// -----------------------------------------------------
// Favorite
// -----------------------------------------------------

// this.toxicityFavoriteOption =
//     page.locator(
//         "//h3[normalize-space()='Toxicity']" +
//         "/following::div[contains(@class,'fav-dropdown')][1]" +
//         "//label[contains(@class,'fav-option')]" +
//         "//input[@type='checkbox'][1]"
//     );


// -----------------------------------------------------
// Form
// -----------------------------------------------------

this.toxicityFormDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//select"
    );


// -----------------------------------------------------
// Strength Input
// -----------------------------------------------------

this.toxicityStrengthInput =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-strength')]//input"
    );


// Strength Unit
this.toxicityStrengthUnitDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr/td[3]//select"
    );


// -----------------------------------------------------
// Route
// -----------------------------------------------------

this.toxicityRouteDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-route')]//select"
    );

    

// -----------------------------------------------------
// Dosage
// -----------------------------------------------------

this.toxicityDosageInput =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-dosage')]//input"
    );

// Dosage Unit
this.toxicityDosageUnitDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-dosage')]//select"
    );


// -----------------------------------------------------
// Frequency
// -----------------------------------------------------

this.toxicityFrequencyDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-frequency')]//select"
    );


// -----------------------------------------------------
// Schedule
// -----------------------------------------------------

this.toxicityScheduleInputs =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr/td[contains(@class,'col-schedule')]"
    );

// -----------------------------------------------------
// Timing
// -----------------------------------------------------

this.toxicityTimingDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'timing')]" +
        "//button[contains(@class,'dropdown-only-select')]"
    );

// this.toxicityTimingDropdown =
//     page.locator(
//         "//button[@data-ms-open='1' and @title='Select options']"
//     );

// this.toxicityTimingOption = (rowIndex, timing) =>
//     page.locator(
//         `//button[@data-ms-open='1' and @title='Select options'][${rowIndex + 1}]`
//     )
//     .locator("..")
//     .getByText(timing, { exact: true });



// -----------------------------------------------------
// Duration
// -----------------------------------------------------

this.toxicityDurationInput =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'duration')]//input"
    );


// Duration Unit
this.toxicityDurationUnitDropdown =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'duration')]//select"
    );


// -----------------------------------------------------
// Instruction
// -----------------------------------------------------

this.toxicityInstructionInput =
    page.locator(
        "//h3[normalize-space()='Toxicity']" +
        "/following::table[contains(@class,'medications-table')][1]" +
        "//tbody/tr//td[contains(@class,'col-instruction')]//input"
    );


// -----------------------------------------------------
// Add New
// -----------------------------------------------------

// this.toxicityAddRowBtn =
//     page.locator(
//         "//h3[normalize-space()='Toxicity']" +
//         "/following::button[normalize-space()='Add New'][1]"
//     );

this.toxicityAddRowBtn =
    page.locator(
        "//h3[text()='Toxicity']//following::button[text()='+ Add New']"
    );

this.firstSuggestionToxicityOption =
    page.locator(
        "(//div[text()='Suggestions']//following::button[@class='fav-option suggestion-option'])[2]"
    );


this.pdfTextLayer =
    page.locator("//div[@class='textLayer']");

this.draftDocumentBody =
    page.locator(
        "//div[@class='document-body']"
    );

this.medicationRows =
    ".emr-table tbody tr.emr-row.medication-row";
 
this.draftFieldElements =
    "input, textarea, select, button.dropdown-only-select";
 
this.draftOtherFindingElements =
    "input, textarea, [contenteditable='true']";

this.clearButton =
    page.locator("//button[text()=' Clear ']");

this.resetButton =
    page.locator("//button[text()=' Reset ']");

this.clearDropdown =
    page.locator(
        "//button[text()=' Clear ']//following::i[contains(@class,'chevron-down hdr-caret')]"
    );



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