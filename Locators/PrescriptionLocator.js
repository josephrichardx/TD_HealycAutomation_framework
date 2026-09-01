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