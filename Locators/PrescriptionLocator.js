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
<<<<<<< HEAD

        this.signatureNameInput = page.locator(
            "//input[@placeholder='Enter your name']"
        );

        this.signatureInput = page.locator(
            "//input[@placeholder='Enter your specialty (e.g., Cardiologist)']"
        );

        // this.signatureCanvas = page
        //     .locator('canvas')
        //     .first();
        
        this.signatureCanvas = page.locator(
            "canvas"
        );

=======
 
        this.signatureCanvas = page
            .locator('canvas')
            .first();
 
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
        this.saveSignatureBtn = page
            .locator('button.btn-primary')
            .filter({ hasText: 'Save Signature' });
 
        this.topSaveBtn = page
            .locator('button.btn-primary')
            .filter({ hasText: 'Save' });
 
        this.generateAndShareBtn = page
            .locator('button.submit')
            .filter({ hasText: 'Generate & Share' });
<<<<<<< HEAD

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

=======
 
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
 
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
        this.firstDrugCell =
        page.locator(
            "(//td[contains(@class,'col-drug col-id')])[1]"
        );
<<<<<<< HEAD

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

this.scheduleInput = (rowIndex) =>
    page
        .locator("tr.medication-row")
        .nth(rowIndex)
        .locator("td")
        .nth(6);

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

    this.draftFieldElement = (row) =>
    row.locator(
        "input, textarea, select, button.dropdown-only-select, [contenteditable='true']"
    );

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

this.otherFindingsElements = page.locator(
    "//div[@data-section-id='other_findings']//div[@class='text-editor']"
);

this.otherFindingRemoveButtons =
    page.locator(
        "//div[@data-section-id='other_findings']//button[contains(@class,'remove-item-btn')]"
    );
 
this.fullPrescriptionPrintBtn = page.locator(
    "//button[text()=' Full Prescription Print ']"
);

this.printBtn =
    page.locator("//button[text()=' Print ']");

this.cancelPrintBtn = page.locator(
    "cr-button.cancel-button"
);
this.customPrintBtn = page.locator(
    "//button[text()=' Custom Print ']"
);

this.customPrintSection = page.locator(
    "label.pdf-select-group-title"
);
// this.pdfViewer = page.locator(
//     "embed[type='application/pdf']"
// );
this.pdfViewer =
    page.locator('.pdfViewer .page').first();

this.printOptionsBtn =
    page.locator("//button[@aria-label='Print options']").first();

this.downloadPdfBtn =
    page.locator("//button[normalize-space()='Download PDF']");

this.savePrescriptionBtn =
    page.locator("//button[text()=' Save Prescription ']").first();

this.historyButton =
    page.locator("//button[@class='hdr-btn']").first();

this.reloadHistoryButton =
    page.locator("//button[@title='Reload history from the server']");

this.historySection = (sectionName) =>
    page.locator(
        `xpath=//*[normalize-space(text())='${sectionName}']/ancestor::*[
            .//button[normalize-space()='Add' or normalize-space()='Added']
        ][1]`
    );

this.historyAddButton = (sectionName) =>
    this.historySection(sectionName).getByRole('button', {
        name: 'Add',
        exact: true
    });

// // History Section Add Button
// this.historyAddButton = (sectionName) =>
//     this.page.locator(
//         `//*[normalize-space(text())='${sectionName}']/ancestor::*[.//button[@class='ehm-add-btn']][1]//button[@class='ehm-add-btn']`
//     );

this.historyAddedButton = (sectionName) =>
    this.historySection(sectionName).getByRole('button', {
        name: 'Added',
        exact: true
    });

// this.historyAddedButton = (sectionName) =>
//     this.page.locator(
//         `//*[normalize-space(text())='${sectionName}']` +
//         `/ancestor::*[.//button[contains(@class,'ehm-add-btn')]][1]` +
//         `//button[normalize-space(.)='Added'][1]`
//     );

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

this.otherFindingRows = page.locator(
    "//h3[normalize-space()='Other Findings']" +
    "/following::table[1]" +
    "//tbody/tr"
);

this.specificAdviceElements = page.locator(
    "//h3[normalize-space()='Specific Advice']" +
    "/following::*[" +
        "self::textarea or " +
        "@contenteditable='true'" +
    "]"
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

this.toxicityTimingDropdown1 = page.locator(
    "//td[contains(@class,'col-timing')]//button[@title='Select options']"
);

this.toxicityTimingOption = (timing) =>
    page.locator(
        `//div[contains(@class,'multi-select-option')][.//span[normalize-space()='${timing}']]`
    );




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
 
// this.draftOtherFindingElements =
//     "input, textarea, [contenteditable='true']";

this.draftOtherFindingElements =
    "input, textarea, [contenteditable='true'], button.dropdown-only-select";

this.clearButton =
    page.locator("//button[text()=' Clear ']");

this.resetButton =
    page.locator("//button[text()=' Reset ']");

this.clearDropdown =
    page.locator(
        "//button[text()=' Clear ']//following::i[contains(@class,'chevron-down hdr-caret')]"
    );

//Allergies/Toxicity

this.allergiesToxicityDrugSearchInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td//textarea[@placeholder='Search or enter drug name']"
).first();
 

this.allergiesToxicityDrugNameInput = (rowIndex) =>
    this.allergiesToxicityRows
        .nth(rowIndex)
        .locator('textarea[placeholder="Search or enter drug name"]');
 
this.allergiesToxicityFormDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[1]"
);
 
// Strength
this.allergiesToxicityStrengthDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[2]"
);
 
 
// Route
this.allergiesToxicityRouteDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[3]"
);
 
// Dosage
this.allergiesToxicityDosageDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[4]"
);
 
// Frequency
this.allergiesToxicityFrequencyDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[5]"
);

this.allergiesToxicityScheduleInputs = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td//div[contains(@class,'dosage-cell')]"
);

this.allergiesToxicityScheduleInput2 = page.locator(
    "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[1]//input)[2]"
);
 
this.allergiesToxicityScheduleInput3 = page.locator(
    "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[1]//input)[3]"
);
 
this.allergiesToxicityScheduleInput4 = page.locator(
    "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[1]//input)[4]"
);
 
// Timing Dropdown
this.allergiesToxicityTimingDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//button[contains(@class,'dropdown-only-select')])[1]"
);
 
 
// Timing
// Timing Option
this.allergiesToxicityTimingOption = (timing) =>
    page.getByText(timing, {
        exact: true
    }).last();
 
// Duration
this.allergiesToxicityDurationDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[6]"
);
 
// Instructions
this.allergiesToxicityInstructionsInput = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//div//input[@placeholder='Enter instructions'])[1]"
);
 
this.checkedAllergiesToxicityRow = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr[.//input[@type='checkbox']:checked]"
);
 
this.allergiestoxicityText =page.locator("//h3[text()='Allergies/Toxicity']");
 
this.allergiesToxicityRows = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
);

// Allergies / Toxicity - Form dropdown
this.allergiesToxicityForm = (rowIndex) =>
    this.allergiesToxicityRows
        .nth(rowIndex)
        .locator('select')
        .first();


//new  allergies

// Drug search result
this.allergiesToxicityDrugSearchResult = (drugName) =>
    page.getByText(drugName, {
        exact: true
    }).last();

//new
this.allergiesToxicityStrengthInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-strength')]//input[contains(@class,'freq-count-input')]"
);

this.allergiesToxicityStrengthUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-strength')]//select[contains(@class,'freq-select')]"
);

// Dosage - Numeric Input
this.allergiesToxicityDosageInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-dosage')]//input[contains(@class,'freq-count-input')]"
);

// Dosage Unit
this.allergiesToxicityDosageUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-dosage')]//select[contains(@class,'freq-select')]"
);

// Duration - Numeric Input
this.allergiesToxicityDurationInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-duration')]//input[contains(@class,'freq-count-input')]"
);

// Duration Unit
this.allergiesToxicityDurationUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-duration')]//select[contains(@class,'freq-select')]"
);


// Medication Rows
this.VerifyallergiesToxicityRows = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
);

// Drug Name
this.VerifyallergiesToxicityDrugNameInput = (rowIndex) =>
    this.VerifyallergiesToxicityRows
        .nth(rowIndex)
        .locator('textarea[placeholder="Search or enter drug name"]');

// Form
this.VerifyallergiesToxicityFormDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[1]"
);

this.VerifyallergiesToxicitySelectedOption = (dropdown) =>
    dropdown.locator('option:checked');

// Strength
this.VerifyallergiesToxicityStrengthInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-strength')]//input[contains(@class,'freq-count-input')]"
);

this.VerifyallergiesToxicityStrengthUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-strength')]//select[contains(@class,'freq-select')]"
);

// Route
this.VerifyallergiesToxicityRouteDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[3]"
);

// Dosage
this.VerifyallergiesToxicityDosageInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-dosage')]//input[contains(@class,'freq-count-input')]"
);

this.VerifyallergiesToxicityDosageUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-dosage')]//select[contains(@class,'freq-select')]"
);

// Frequency
this.VerifyallergiesToxicityFrequencyDropdown = page.locator(
    "(//h3[text()='Allergies/Toxicity']//following::td//select)[5]"
);

// Duration
this.VerifyallergiesToxicityDurationInput = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-duration')]//input[contains(@class,'freq-count-input')]"
);

this.VerifyallergiesToxicityDurationUnitDropdown = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::td[contains(@class,'col-duration')]//select[contains(@class,'freq-select')]"
);

// Instructions
this.VerifyallergiesToxicityInstructionsInput = (rowIndex) =>
    this.VerifyallergiesToxicityRows
        .nth(rowIndex)
        .locator('input[placeholder="Enter instructions"]');

this.VerifyallergiesToxicityCheckbox = (rowIndex) =>
    this.VerifyallergiesToxicityRows
        .nth(rowIndex)
        .locator('span.checkmark');

this.VerifyallergiesToxicityCheckboxInput = (rowIndex) =>
    this.VerifyallergiesToxicityRows
        .nth(rowIndex)
        .locator('input[type="checkbox"]');

// Checked Rows
this.VerifycheckedAllergiesToxicityRow = page.locator(
    "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr[.//input[@type='checkbox']:checked]"
);
 
// // =====================================================
// // Allergies / Toxicity - Row 2
// // =====================================================
 
// this.allergiesToxicityDrugSearchInputRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//textarea[@placeholder='Search or enter drug name'])[2]"
// );
 
// this.allergiesToxicityFormDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[7]"
// );
 
// this.allergiesToxicityStrengthDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[8]"
// );
 
// this.allergiesToxicityRouteDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[9]"
// );
 
// this.allergiesToxicityDosageDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[10]"
// );
 
// this.allergiesToxicityFrequencyDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[11]"
// );
 
 
// // Schedule - Row 2
// this.allergiesToxicityScheduleInputRow2_1 = page.locator(
//     "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[1]"
// );
 
// this.allergiesToxicityScheduleInputRow2_2 = page.locator(
//     "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[2]"
// );
 
// this.allergiesToxicityScheduleInputRow2_3 = page.locator(
//     "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[3]"
// );
 
// this.allergiesToxicityScheduleInputRow2_4 = page.locator(
//     "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[4]"
// );
 
 
// // Timing - Row 2
// this.allergiesToxicityTimingDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//button[contains(@class,'dropdown-only-select')])[2]"
// );
 
 
// // Duration - Row 2
// this.allergiesToxicityDurationDropdownRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//select)[12]"
// );
 
 
// // Instructions - Row 2
// this.allergiesToxicityInstructionsInputRow2 = page.locator(
//     "(//h3[text()='Allergies/Toxicity']//following::td//div//input[@placeholder='Enter instructions'])[2]"
// );

this.DrugSearchInputfirst =
     page.locator(
         "(//td[contains(@class,'col-drug col-id')])[1]"
     );

// this.firstMedicationSuggestion = (medicationName) =>
//     page.locator(
//         `//button[contains(@class,"suggestion-option")]//span[@class="fav-option-cell" and normalize-space()=${JSON.stringify(medicationName)}]`
//     ).first();

this.firstMedicationSuggestion = (medicationName) => {
    const medicationNameOnly = medicationName.split("|")[0].trim();

    return page.locator(
        `//button[contains(@class,"suggestion-option")]//span[contains(@class,"fav-option-cell") and contains(normalize-space(), ${JSON.stringify(medicationNameOnly)})]`
    ).first();
};


this.coMorbiditySection =
            page.locator(
                "//div[@data-section-id='co_morbidities']"
            );


this.coMorbidityDrugSearchInput =
        this.coMorbiditySection.locator(
            "textarea.drug-name-input"
        );

 this.coMorbidityRows =
            this.coMorbiditySection.locator(
                "tbody tr"
=======
 
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
 
 
 
        // // Prescription
 
        // this.drugSearch = page
        //     .getByPlaceholder('Search')
        //     .last();
 
        // this.editorContainer = page
        //     .locator('.editor-container');
 
        // this.instructionDropdown = page
        //     .getByRole('combobox', {
        //         name: 'Type instruction (e.g. Before'
        //     });
 
        // this.selectDurationDropdown = page
        //     .getByRole('cell', {
        //         name: 'Select'
        //     })
        //     .getByRole('combobox');
 
        // this.addRowBtn = page
        //     .getByRole('button', {
        //         name: 'Add row'
        //     })
        //     .first();
 
 
        //     //new
 
        //             // Prescription Observation / Medical History
 
        // this.observationSearchByIndex = (index) =>
        //     page.getByRole('textbox', {
        //         name: 'Search'
        //     }).nth(index);
 
        // this.observationOption = (text) =>
        //     page.locator('label').filter({
        //         hasText: text
        //     });
 
 
        // // First Row
 
        // this.row1Column4Search = page
        //     .locator(
        //         '.col-col4 > .cell-wrapper > .drug-search-cell > .cell-input'
        //     )
        //     .first();
 
 
        // // Second Row
 
        // this.row2Column1Search = page
        //     .locator(
        //         'tr:nth-child(2) > .col-col1 > .cell-wrapper > .drug-search-cell > .cell-input'
        //     );
 
        // this.row2Column2Search = page
        //     .locator(
        //         'tr:nth-child(2) > .col-col2 > .cell-wrapper > .drug-search-cell > .cell-input'
        //     );
 
        // this.row2Column3Search = page
        //     .locator(
        //         'tr:nth-child(2) > .col-col3 > .cell-wrapper > .drug-search-cell > .cell-input'
        //     );
 
        // this.row2Column4Search = page
        //     .locator(
        //         'tr:nth-child(2) > .col-col4 > .cell-wrapper > .drug-search-cell > .cell-input'
        //     );
 
 
        // // Favourite Option
 
        // this.favouriteOption = page
        //     .locator(
        //         'label:nth-child(24) > .fav-option-cells > .fav-option-cell > .fav-option-label'
        //     );

        // =========================================================
        // DIAGNOSIS SECTION
        // =========================================================

        this.diagnosisAddRowBtn =
            page.locator(
                "(//button[@title='Add row'])[2]"
            );


        // =========================================================
        // SIGNATURE SECTION
        // =========================================================

        this.signatureTitleInput =
            page.getByPlaceholder('Enter your name');

        this.signatureSubTitleInput =
            page.getByPlaceholder(
                'Enter your specialty (e.g., Cardiologist)'
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526
            );

this.coMorbidityStrengthInput =
            this.coMorbiditySection.locator(
                "td.col-strength input"
            );


this.coMorbidityStrengthUnitDropdown =
            this.coMorbiditySection.locator(
                "td.col-strength select"
            );

 this.coMorbidityRouteDropdown =
            this.coMorbiditySection.locator(
                "td.col-route select"
            );

 this.coMorbidityDosageInput =
            this.coMorbiditySection.locator(
                "td.col-dosage input"
            );

this.coMorbidityDosageUnitDropdown =
            this.coMorbiditySection.locator(
                "td.col-dosage select"
            );

this.coMorbidityFrequencyDropdown =
            this.coMorbiditySection.locator(
                "td.col-frequency select"
            );

this.coMorbidityScheduleInputs =
            this.coMorbiditySection.locator(
                "td.col-schedule"
            );

this.coMorbidityTimingDropdown =
            this.coMorbiditySection.locator(
                "td.col-timing"
            );

this.coMorbidityDurationUnitDropdown =
            this.coMorbiditySection.locator(
                "td.col-duration select"
            );


this.coMorbidityDurationInput =
            this.coMorbiditySection.locator(
                "td.col-duration input"
            );

this.coMorbidityInstructionsInput =
            this.coMorbiditySection.locator(
                "textarea.instruction-input"
            );

this.coMorbidityFormDropdown =
    page.locator(
        "//div[@data-section-id='co_morbidities']//td[contains(@class,'col-form')]//select"
    );

this.coMorbidityFormOption = (form) =>
    page.getByText(
        form,
        {
            exact: true
        }
    ).last();

this.coMorbiditySection =
    page.locator(
        "//div[@data-section-id='co_morbidities']"
    );

this.coMorbidityDrugSearchResult = (drugName) =>
    page.locator(
        "//div[@data-section-id='co_morbidities']" +
        "//*[contains(normalize-space(.), 'Drug Name:')]" +
        "[contains(normalize-space(.), " +
        JSON.stringify(drugName) +
        ")]"
    ).last();
    }

<<<<<<< HEAD
    coMorbidityTimingOption(timing) {

        return this.page.getByText(
            timing,
            {
                exact: true
            }
        ).last();
    }

    
=======
    diagnosisSearchByIndex(index) {
        return this.page
            .getByRole('textbox', { name: 'Search' })
            .nth(index);
    }

    diagnosisOption(text) {
        return this.page
            .locator('label')
            .filter({ hasText: text });
    }
>>>>>>> 9b7a586b0333ff696fc7ecbbe89bbd9d445c2526

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
 