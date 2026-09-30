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

        // Specific Advice - Text
        this.specificAdviceTypeDropdown =
            page.locator(
                "//app-emr-checklist[@data-section-id='specific_advice']//select[contains(@class,'add-type-dropdown')]"
            );

        this.specificAdviceTextOption =
            page.locator(
                "//app-emr-checklist[@data-section-id='specific_advice']//select[contains(@class,'add-type-dropdown')]//option[text()='Text']"
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

        // Image locator - next flow
        this.specificAdviceImageOption =
            page.locator(
                "//app-emr-checklist[@data-section-id='specific_advice']//select[contains(@class,'add-type-dropdown')]//option[text()='Image']"
            );

        this.specificAdviceImageInput =
            page.locator(
                "//app-emr-checklist[@data-section-id='specific_advice']//input[contains(@class,'add-item-image-input')]"
            );

        this.specificAdviceImageCheckbox =
            page.locator(
                "(//div[contains(@class,'checkbox-item')])[6]//input"
            );
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


        this.graphColumn1 =
            page.locator("//input[@placeholder='Enter column 1']");

        this.saveValue =
            page.locator("(//button[text()=' Save value '])[1]");

        // TD Graph Section 1

        this.graphSection1Column1 =
            page.locator("(//input[@placeholder='Enter column 1'])[1]");

        this.firstGraphCheckbox =
            page.locator(
                "//label[contains(@class,'fav-option') and contains(@class,'graphable-option')]" +
                "[.//span[contains(@class,'fav-option-label') and normalize-space()='First graph']]" +
                "//input[@type='checkbox']"
            );

        this.graphSection1SaveValue =
            page.locator("(//button[text()=' Save value '])[1]");

        this.graphSection1DateTime =
            page.locator(
                "(//input[@placeholder='dd-mm-yyyy hh:mm'])[1]"
            );

        this.graphSection1SaveValue =
            page.locator(
                "(//button[text()=' Save value '])[1]"
            );

        this.successPopup =
            page.locator(
                "//div[contains(@class,'mat-mdc-snack-bar-label') and contains(@class,'mdc-snackbar__label')]"
            );

        // =====================================================
        // TD GRAPH SECTION 2
        // =====================================================

        this.graphSection2Column1 =
            page.locator(
                "(//input[@placeholder='Enter column 1'])[2]"
            );

        this.secondGraphCheckbox =
            page.locator(
                "//label[contains(@class,'fav-option') and contains(@class,'graphable-option')]" +
                "[.//span[contains(@class,'fav-option-label') and normalize-space()='Second graph']]" +
                "//input[@type='checkbox']"
            );

        this.graphSection2DateTime =
            page.locator(
                "(//input[@placeholder='dd-mm-yyyy hh:mm'])[2]"
            );

        this.graphSection2SaveValue =
            page.locator(
                "(//button[text()=' Save value '])[2]"
            );

        // =====================================================
        // TD GRAPH SECTION 3
        // =====================================================

        this.graphSection3Value =
            page.locator(
                "app-emr-graphable input.value-input[placeholder='0']"
            ).last();

        this.graphSection3SaveValue =
            page.locator(
                "(//button[text()=' Save value '])[3]"
            );

        // =====================================================
        // TD GRAPH TREND - SECTION 1
        // =====================================================

        this.section1ViewTrendGraph =
            page.locator(
                "(//button[@title='View trend graph'])[1]"
            );

        this.graphOneWeek =
            page.locator(
                "//button[normalize-space()='1 Week']"
            );

        this.graphYAxisTitle =
            page.locator(
                "text.apexcharts-yaxis-title-text"
            );

        this.graphXAxisLabel =
            page.locator(
                ".apexcharts-xaxis-texts-g text.apexcharts-text"
            );

        this.graphRangeNote =
            page.locator(
                ".graph-range-note"
            );

        this.graphNote =
            page.locator(
                ".graph-note"
            );

        this.graphTooltip =
            page.locator(
                ".apexcharts-tooltip"
            );

        this.graphTooltipText =
            page.locator(
                ".apexcharts-tooltip-text"
            );

        //    this.section1ViewTrendGraph =
        //     page.locator(
        //         "(//button[@title='View trend graph'])[1]"
        //     );

        this.graphOneMonth =
            page.locator(
                "//button[contains(@class,'graph-range-btn') and normalize-space()='1 Month']"
            );

        this.graphYAxisTitle =
            page.locator(
                "text.apexcharts-yaxis-title-text"
            );

        this.graphXAxisLabel =
            page.locator(
                "text.apexcharts-xaxis-label"
            );

        this.graphRangeNote =
            page.locator(
                ".graph-range-note"
            );

        this.graphNote =
            page.locator(
                ".graph-note"
            );

        // this.section1ViewTrendGraph =
        // page.locator(
        //     "(//button[@title='View trend graph'])[1]"
        // );

        this.graphSection1Point =
            page.locator(
                "//path[contains(@class,'apexcharts-marker') and @rel='0' and @j='0' and @index='1']"
            );

        this.graphSection1Chart =
            page.locator(
                ".apexcharts-canvas"
            );

        this.graphOneYear =
            page.locator(
                "//button[contains(@class,'graph-range-btn') and normalize-space()='1 Year']"
            );

        this.graphAll =
            page.locator(
                "//button[contains(@class,'graph-range-btn') and normalize-space()='All']"
            );

        this.graphModalClose =
            page.locator(
                "//button[@class='graph-modal-close']"
            );






        // NEW TAB - SAVE
        // =======================

        this.newTabSaveButton = page.locator("//button[text()=' Save']");

        this.printOptionsBtn =
            page.locator("//button[@aria-label='Print options']").first();

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

        this.applyButton = page.locator(
            "(//button[text()=' Apply '])[1]"
        );

        this.replaceButton = page.locator(
            "//button[text()=' Replace ']"
        );

        this.templateSuccessMessage = page.locator(
            "//div[contains(@class,'mdc-snackbar__label')]"
        );
        this.templateListName = page.locator(
            "//div[contains(@class,'tpl-card-name')]"
        );

        this.clearTemplateBtn = page.locator(
            "//button[contains(@class,'clear-btn')]"
        );

        this.resetTemplateBtn = page.locator(
            "//button[text()=' Reset ']"
        );

        this.medicationTableCells =
            page.locator(
                "//app-emr-medications-table-new//td"
            );

        this.draftDocumentBody =
            page.locator(
                "//div[@class='document-body']"
            );

        this.clearButton =
            page.locator("(//div[@class='print-menu clear-menu']//button)[1]");

        this.documentFields =
            page.locator(
                "//div[@class='document-body']//div[@class='cdk-drop-list sections-container']//td"
            );

        this.pdfTextLayer =
            page.locator("//div[@class='textLayer']");

        this.addOtherFindingBtn =
            page.locator("//button[text()=' Add ']").first();

        this.otherFindingsInput =
            page.locator("//div[@data-placeholder='Add custom Other Findings']");

        this.otherFindingsElements = page.locator(
            "//div[@data-section-id='other_findings']//div[@class='text-editor']"
        );
        this.otherFindingRemoveButtons =
            page.locator(
                "//div[@data-section-id='other_findings']//button[contains(@class,'remove-item-btn')]"
            );

        this.specificAdviceTextElements = page.locator(
            "//div[@data-section-id='specific_advice']//div[contains(@class,'cl-row-editor')]"
        );

        this.specificAdviceCheckboxItems = page.locator(
            "//div[@data-section-id='specific_advice']//div[contains(@class,'checkbox-item')]"
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

        // this.printOptionsBtn =
        //     page.locator("//button[@aria-label='Print options']").first();

        this.savePrescriptionBtn =
            page.locator("//button[text()=' Save Prescription ']").first();

        this.historyButton =
            page.locator("//button[@class='hdr-btn']").first();

        this.documentsBtn =
            page.locator("//button[text()='Documents']").first();

        this.documentActions =
            page.locator(
                "//div[contains(@class,'mrdoc-actions')]"
            ).first();


        // this.viewButton =
        //     page.locator("//button[@title='View']").first();

        this.viewButtonLast =
            page.locator("//button[@title='View']").last();

        this.previewActions = page.locator(
            "//div[contains(@class,'preview-actions')]"
        );

        this.documentActionsSecondPdf =
            page.locator("//button[@title='View']").nth(1);

        this.viewButtonSecondPdf =
            page.locator("//button[@title='View']").nth(1);

        this.closePdfButton =
            page.locator("//button[@class='btn-close-preview']");

        // this.medicationRows =
        //     ".emr-table tbody tr.emr-row.medication-row";

        this.draftFieldElements =
            "input, textarea, select, button.dropdown-only-select";

        this.draftOtherFindingElements =
            "input, textarea, [contenteditable='true']";

        this.rmoDoctorDropdown =
            page.locator(
                "//h2[text()='Select Doctor']//following::select[1]"
            );

        // =====================================================
        // MEDICATION TABLE
        // =====================================================

        this.firstEmptyMedicationRow = page.locator(
            "//tbody//tr[@data-row-id='table-row-0']"
        );

        this.firstDrugSearchTextarea = page.locator(
            "(//textarea[@placeholder='Search or enter drug name'])[1]"
        );
        this.firstMedicationRowInputs = page.locator(
            "//tbody//tr[@data-row-id='table-row-0']//input | " +
            "//tbody//tr[@data-row-id='table-row-0']//textarea"
        );

        // =====================================================
        // RMO TOXICITY
        // =====================================================

        this.rmoToxicityTypeDropdown =
            page.locator(
                "//select[contains(@class,'add-type-dropdown')]"
            );

        this.rmoToxicityTextOption =
            page.locator(
                "//option[text()='Text']"
            );

        this.rmoToxicityTextInput =
            page.locator(
                "//div[@data-placeholder='Enter item...']"
            );

        this.rmoToxicityAddBtn =
            page.locator(
                "//button[contains(@class,'add-item-btn')]"
            );

        this.rmoToxicityImageOption =
            page.locator(
                "//option[text()='Image  ']"
            );

        this.rmoToxicityImageInput =
            page.locator(
                "(//app-emr-checklist//input[@class='add-item-image-input'])"
            );


        this.rmoChiefComplaintInput =
            page.locator(
                "//div[@data-placeholder='Add custom Chief Complaint']"
            );

        this.rmoChiefComplaintAddBtn =
            page.locator(
                "//button[text()=' Add ']"
            );

        this.rmoChiefComplaintCloseBtn =
            page.locator(
                "//button[contains(@class,'remove-item-btn')]"
            );

        // RMO Specific Advice
        this.rmoSpecificAdviceAddBtn =
            page.locator(
                "//app-emr-medications-table-new[@data-section-id='specific_advice']//button[text()='+ Add New']"
            );

        this.rmoSpecificAdviceFavoritesCheckbox =
            page.locator(
                "//app-emr-medications-table-new[@data-section-id='specific_advice']//label[contains(@class,'fav-option')]//input[@type='checkbox']"
            );

        // this.editDocumentButton =
        //     page.locator("//button[@title='Edit']");

        this.editDocumentButton =
            page.locator("//button[@title='Edit']").first();

        // this.previewActions = page.locator(
        //     "//div[contains(@class,'preview-actions')]"
        // );

        this.closePdf =
            page.locator("//i[contains(@class,'fa-solid fa-xmark')]");

        // this.closeHistory =
        //     page.locator("//i[contains(@class,'fa-light fa-xmark')]");

        this.closeHistory =
            page.locator("//button[@aria-label='Close']");

        this.rmoChiefComplaintCreatedItem =
            page.locator(
                "//div[@data-section-id='chief_complaint']//div[contains(@class,'item-row')]//div[@contenteditable='true' and contains(@class,'text-editor')]"
            );


        // =====================================================
        // MEDICATION TABLE - ADD / DELETE ROW
        // =====================================================

        // Add New row button
        this.addNewMedicationRow = page.locator(
            "(//button[text()='+ Add New'])[1]"
        );

        // All medication table rows
        this.medicationTableRows = page.locator(
            "//tbody//tr[contains(@data-row-id,'table-row-')]"
        );

        // Last medication row
        this.lastMedicationRow = page.locator(
            "(//tbody//tr[contains(@data-row-id,'table-row-')])[last()]"
        );

        // Last column of last medication row
        this.lastMedicationRowLastColumn = page.locator(
            "(//tbody//tr[contains(@data-row-id,'table-row-')])[last()]//td[last()]"
        );

        // Delete icon of last medication row
        this.lastMedicationRowDelete = page.locator(
            "//button[@title='Delete row' and contains(@class,'row-delete-float')]"
        );

        // =====================================================
        // ALLERGIES / TOXICITY MEDICATION
        // =====================================================

        this.allergies_ToxicityDrugSearchInput = page.locator(
            "//h3[text()='Allergies/Toxicity']//following::td//textarea[@placeholder='Search or enter drug name']"
        );

        this.allergiesToxicityMedicationSuggestion = (medicationName) =>
            page
                .getByText(medicationName, {
                    exact: false
                })
                .last()
                .locator(
                    "xpath=ancestor::*[self::button or @role='option'][1]"
                );

        // =====================================================
        // ALLERGIES / TOXICITY ROWS
        // =====================================================

        this.allergiesToxicityRows = page.locator(
            "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
        );

        this.allergiesToxicityRowFields = (rowIndex) => {
            const row = page.locator(
                "(//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr)"
            ).nth(rowIndex);

            return {
                drug: row.locator("textarea[placeholder='Search or enter drug name']"),
                form: row.locator("select").nth(0),
                strength: row.locator("select").nth(1),
                route: row.locator("select").nth(2),
                dosage: row.locator("select").nth(3),
                frequency: row.locator("select").nth(4),
                schedule1: row.locator("input").nth(0),
                schedule2: row.locator("input").nth(1),
                schedule3: row.locator("input").nth(2),
                schedule4: row.locator("input").nth(3),
                timing: row.locator("button.dropdown-only-select"),
                duration: row.locator("select").nth(5),
                instructions: row.locator(
                    "input[placeholder='Enter instructions']"
                )
            };
        };

        // this.allergiesToxicityMedicationSuggestion = (medicationName) =>
        //     page.locator(
        //         `//span[normalize-space()=${JSON.stringify(medicationName)}]`
        //     ).last();

        this.allergiesToxicityAddNew = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::button[text()='+ Add New'])[1]"
        );

        // Allergies/Toxicity checkbox
        this.allergiesToxicityCheckbox = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td[@class='col-checkbox'])[1]"
        );
        this.allergiesToxicityNewRowDrugSearchInput = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//textarea[@placeholder='Search or enter drug name'])[last()]"
        );
        // =====================================================
        // ALLERGIES / TOXICITY - FILL MEDICATION DETAILS
        // =====================================================



        // Form
        this.allergiesToxicityFormDropdown = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[1]"
        );

        // Strength
        this.allergiesToxicityStrengthDropdown = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[2]"
        );

        // Route
        this.allergies_ToxicityRouteDropdown = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[3]"
        );

        // Dosage
        this.allergiesToxicityDosageDropdown = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[4]"
        );

        // Frequency
        this.allergies_ToxicityFrequencyDropdown = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[5]"
        );

        // Schedule inputs - 1 to 4
        this.allergiesToxicityScheduleInput1 = page.locator(
            "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[1]//input)[1]"
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
        this.allergies_ToxicityTimingDropdown = page.locator(
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
        this.allergies_ToxicityInstructionsInput = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//div//input[@placeholder='Enter instructions'])[1]"
        );

        this.checkedAllergiesToxicityRow = page.locator(
            "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr[.//input[@type='checkbox']:checked]"
        );

        this.allergiestoxicityText = page.locator("//h3[text()='Allergies/Toxicity']");

        // this.allergiesToxicityRows = page.locator(
        //     "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
        // );

        // =====================================================
        // Allergies / Toxicity - Row 2
        // =====================================================

        this.allergiesToxicityDrugSearchInputRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//textarea[@placeholder='Search or enter drug name'])[2]"
        );

        this.allergiesToxicityFormDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[7]"
        );

        this.allergiesToxicityStrengthDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[8]"
        );

        this.allergiesToxicityRouteDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[9]"
        );

        this.allergiesToxicityDosageDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[10]"
        );

        this.allergiesToxicityFrequencyDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[11]"
        );


        // Schedule - Row 2
        this.allergiesToxicityScheduleInputRow2_1 = page.locator(
            "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[1]"
        );

        this.allergiesToxicityScheduleInputRow2_2 = page.locator(
            "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[2]"
        );

        this.allergiesToxicityScheduleInputRow2_3 = page.locator(
            "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[3]"
        );

        this.allergiesToxicityScheduleInputRow2_4 = page.locator(
            "((//h3[text()='Allergies/Toxicity']//following::td//div[@class='dosage-cell'])[2]//input)[4]"
        );


        // Timing - Row 2
        this.allergiesToxicityTimingDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//button[contains(@class,'dropdown-only-select')])[2]"
        );


        // Duration - Row 2
        this.allergiesToxicityDurationDropdownRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//select)[12]"
        );


        // Instructions - Row 2
        this.allergiesToxicityInstructionsInputRow2 = page.locator(
            "(//h3[text()='Allergies/Toxicity']//following::td//div//input[@placeholder='Enter instructions'])[2]"
        );

        this.downloadPdfBtn =
            page.locator("//button[normalize-space()='Download PDF']");
        // =====================================================
        // RMO DRAFT
        // =====================================================

        this.rmoCoMorbiditiesSection =
            page.locator(
                "//app-emr-medications-table-new[@data-section-id='co_morbidities']"
            );

        this.rmoToxicitySection =
            page.locator(
                "//app-emr-checklist[@data-section-id='toxicity']"
            );

        this.rmoChiefComplaintSection =
            page.locator(
                "//app-emr-medications-table-new[@data-section-id='chief_complaint']"
            );

        this.rmoSpecificAdviceSection =
            page.locator(
                "//app-emr-medications-table-new[@data-section-id='specific_advice']"
            );
        // =========================
        // DRUG OPTIONS
        // =========================

        // this.favoriteDrug = (drugName) =>
        //     page.locator(
        //         `//label[contains(@class,"fav-option")]//span[contains(@class,"fav-option-cell") and normalize-space()="${drugName}"]`
        //     );

        this.firstMedicationSuggestion = (medicationName) =>
            page.locator(
                `//button[contains(@class,"suggestion-option")]//span[@class="fav-option-cell" and normalize-space()=${JSON.stringify(medicationName)}]`
            ).first();

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
            page.locator(
                "(//div[@data-section-id='co_morbidities']//tbody//tr)"
            ).nth(rowIndex);

        this.coMorbidityRowData = (rowIndex) => {

            const row = page.locator(
                "//div[@data-section-id='co_morbidities']//tbody//tr"
            ).nth(rowIndex);

            return {
                drug: row.locator(
                    "textarea[placeholder='Search or enter drug name']"
                ),

                form: row.locator("select").nth(0),
                strength: row.locator("select").nth(1),
                route: row.locator("select").nth(2),
                dosage: row.locator("select").nth(3),
                frequency: row.locator("select").nth(4),

                schedule1: row.locator("div.dosage-cell input").nth(0),
                schedule2: row.locator("div.dosage-cell input").nth(1),
                schedule3: row.locator("div.dosage-cell input").nth(2),
                schedule4: row.locator("div.dosage-cell input").nth(3),

                timing: row.locator(
                    "button.dropdown-only-select"
                ),

                duration: row.locator("select").nth(5),

                instructions: row.locator(
                    "input[placeholder='Enter instructions']"
                )
            };
        };


        // this.allergiesToxicityRows = page.locator(
        //     "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
        // );

        this.allergiesToxicityRowData = (rowIndex) => {

            const row = page.locator(
                "(//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr)"
            ).nth(rowIndex);

            return {
                drug: row.locator(
                    "textarea[placeholder='Search or enter drug name']"
                ),

                form: row.locator("select").nth(0),
                strength: row.locator("select").nth(1),
                route: row.locator("select").nth(2),
                dosage: row.locator("select").nth(3),
                frequency: row.locator("select").nth(4),

                schedule1: row.locator("div.dosage-cell input").nth(0),
                schedule2: row.locator("div.dosage-cell input").nth(1),
                schedule3: row.locator("div.dosage-cell input").nth(2),
                schedule4: row.locator("div.dosage-cell input").nth(3),

                timing: row.locator(
                    "button.dropdown-only-select"
                ),

                duration: row.locator("select").nth(5),

                instructions: row.locator(
                    "input[placeholder='Enter instructions']"
                )
            };
        };
        // Co-Morbidity rows
        this.coMorbidityRows = page.locator(
            "//div[@data-section-id='co_morbidities']//tbody//tr"
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

        // ============================================================
        // SCORING CHART
        // ============================================================

        this.searchScoringChartInput =
            "(//h3[text()='Co-morbidities']//following::div//input[@placeholder='Search Scoring Chart...'])[1]";

        this.scoringChartResult = (formName, id, formId) =>
            `//div[contains(@class,'medication-suggestions-dropdown')]` +
            `//div[contains(@class,'medication-suggestion-item')]` +
            `[contains(normalize-space(.),'Form Name: ${formName}')]` +
            `[contains(normalize-space(.),'ID: ${id}')]` +
            `[contains(normalize-space(.),'Form ID: ${formId}')]`;

        this.fillFormButton =
            "(//button[text()=' Fill Form '])[1]";

        this.scoringChartFormTitle =
            "//div[contains(@class,'form-content')]//h2";

        this.weightInput =
            "(//div[contains(@class,'form-content')]//span[text()='Q1-']//following::input)[1]";

        this.heightInput =
            "(//div[contains(@class,'form-content')]//span[text()='Q2-']//following::input)[1]";

        this.scoringChartSubmitButton =
            "//button[text()=' Submit ']";


        // ============================================================
        // Allergies / Toxicity - Scoring Chart
        // ============================================================

        this.searchAllergiesToxicityScoringChartInput =
            "(//h3[text()='Allergies/Toxicity']//following::div//input[@placeholder='Search Scoring Chart...'])[1]";

        this.allergiesToxicityScoringChartResult = (formName, id, formId) =>
            `//div[contains(@class,'medication-suggestions-dropdown')]` +
            `//div[contains(@class,'medication-suggestion-item')]` +
            `[contains(normalize-space(.),'Form Name: ${formName}')]` +
            `[contains(normalize-space(.),'ID: ${id}')]` +
            `[contains(normalize-space(.),'Form ID: ${formId}')]`;

        this.getDraftScoringChartComorbidities =
            "//th[text()='Form Name']//following::tbody//td";
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

        // this.toxicityDrugSearchInput =
        //     page.locator(
        //         "//h3[text()='Toxicity']//following::textarea[@placeholder='Search or enter drug name']"
        //     );

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
                "(//div[text()='Suggestions']//following::button[@class='fav-option suggestion-option'])[3]"
            );



        this.appointmentCard = page
            .locator('div.slot.custom-events-cards')
            .first();

        this.writePrescriptionBtn = page
            .locator('span.medical-action-label')
            .filter({ hasText: 'Write Prescription' });

        this.addSignatureBtn = page
            .locator('button.btn-add-signature');

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

        // this.drugSearchInput = page.locator(
        //     "//textarea[contains(@class,'drug-name-input')]"
        // );//old

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
        // this.dosageUnitDropdown = page.locator(
        //     "//tr[contains(@class,'medication-row')]//td[contains(@class,'col-dosage')]//select"
        // );

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

        // this.durationUnitDropdown = (rowIndex) =>
        //     page
        //         .locator("//tr[contains(@class,'medication-row')]")
        //         .nth(rowIndex)
        //         .locator("td.col-duration select");  

        // Instruction
        // this.instructionInput = page.locator(
        //     "//td[contains(@class,'col-instructions')]//input"
        // );

        // this.medicationRows = page.locator(
        //     "//tr[contains(@class,'medication-row')]"
        // );

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

        // this.instructionInput =
        //     page.locator('input[placeholder="Enter instructions"]');//new


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

        // this.observationAddRowBtn =
        //     page.locator('button.add-new-btn').first();//new

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

        // this.templateSearchInput = page.locator(
        //     "//input[@placeholder='Search templates...']"
        // );

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

        // this.documentActions =
        //     page.locator(
        //         "//div[contains(@class,'mrdoc-actions')]"
        //     ).first();

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

        // this.previewActions = page.locator(
        //     "//div[contains(@class,'preview-actions')]"
        // );

        this.closePdf =
            page.locator("//i[contains(@class,'fa-solid fa-xmark')]");

        // this.closeHistory =
        //     page.locator("//i[contains(@class,'fa-light fa-xmark')]");

        // this.closeHistory =
        //     page.locator("//button[@aria-label='Close']");

        // =========================
        // DRUG OPTIONS
        // =========================

        // this.favoriteDrug = (drugName) =>
        //     page.locator(
        //         `//label[contains(@class,"fav-option")]//span[contains(@class,"fav-option-cell") and normalize-space()="${drugName}"]`
        //     );

        // this.favoriteDrug =
        //     (drugName) =>
        //         page.locator(
        //             `//div[text()='Favourites']//following::label[@class='fav-option'][.//span[contains(normalize-space(),'${drugName}')]]`
        //         );

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
        // this.firstFavoriteOption =
        //     page.locator(
        //         'text=FAVOURITES'
        //     ).locator('xpath=following::input[@type="checkbox"][1]');


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

        // this.toxicityFavoriteOption =
        //     page.locator(
        //         "div.fav-dropdown:visible input[type='checkbox']"
        //     ).first();

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
        // this.toxicityHeader =
        //     page.locator("//h3[normalize-space()='Toxicity']");


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

        // this.toxicityFormDropdown =
        //     page.locator(
        //         "//h3[normalize-space()='Toxicity']" +
        //         "/following::table[contains(@class,'medications-table')][1]" +
        //         "//tbody/tr//select"
        //     );


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

        this.allergiestoxicityText = page.locator("//h3[text()='Allergies/Toxicity']");

        // this.allergiesToxicityRows = page.locator(
        //     "//h3[text()='Allergies/Toxicity']//following::tbody[1]//tr"
        // );

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

    coMorbidityTimingOption(timing) {

        return this.page.getByText(
            timing,
            {
                exact: true
            }
        ).last();
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