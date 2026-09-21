class IPDLocator {

    constructor(page) {

        this.page = page;

        // Admission
        this.admissionBtn = page.locator(
            "//li[@id='ipd-toggle']"
        );

        // Patients
        this.allPatientsBtn = page.getByRole(
            'button',
            {
                name: 'All Patients'
            }
        );

        // Patient Search
        this.patientSearchChip = page.locator(
            "//div[@class='search-chip']"
        );

        this.patientSearchTxt = page.locator(
            "//div[@class='search-chip']//input"
        );

        // Patient
        this.getPatientName = (patientName) =>
            page.getByText(
                patientName,
                {
                    exact: true
                }
            );

        // Invoice
        this.invoiceTab = page.getByText(
            'Invoice',
            {
                exact: true
            }
        );

        this.generateInvoice =
            page.getByText('Generate invoice').nth(1);


         // IPD Invoice Payment Section

        this.paymentSection =
            page.locator(
                "//div[contains(@class,'invoice-card')]"
            );

        this.paymentDue =
            page.getByText(
                'Payment due',
                {
                    exact: true
                }
            );

        this.paidAmount =
            page.getByText(
                'Paid amount',
                {
                    exact: true
                }
            );

        this.invoiceAmount =
            page.getByText(
                'Invoice Amount',
                {
                    exact: true
                }
            );

        this.invoiceNumber =
            page.locator(
                "//span[@class='inv-no']"
            );

        this.sendInvoice =
            page.getByText(
                'Send invoice',
                {
                    exact: true
                }
            );

        // Calendar
        this.calendarBtn =
            page.getByRole('button', {
                name: /Calendar:/
            });

        // this.currentMonth =
        //     page.locator('#currentMonth');


       

// Invoice PDF

        this.invoiceNumberPdf =
            page.locator(
                "//span[contains(@class,'invoice-number')]"
            );

        this.patientNamePdf =
            page.locator(
                "//div[contains(@class,'patient-name')]"
            );

        this.closePdfPreviewBtn =
            page.locator(
                "//app-document-preview//button"
            );

        this.subTotalPdf = (amount) =>
            page.getByText(
                `Sub Total : ${amount.toFixed(2)}`,
                {
                    exact: true
                }
            );

        this.adjustmentPdf = (amount) =>
            page.getByText(
                `Adjustment : ${amount.toFixed(2)}`,
                {
                    exact: true
                }
            );

        this.totalPdf = (amount) =>
            page.getByText(
                `Total : ${amount.toFixed(2)}`,
                {
                    exact: true
                }
            );

        this.agePdf = (age) =>
            page.getByText(
                `Age : ${age}`,
                {
                    exact: true
                }
            );

        this.genderPdf = (gender) =>
            page.getByText(
                `Gender : ${gender}`,
                {
                    exact: true
                }
            );

        this.pdfTextLayer = page.locator(
            'app-document-preview .textLayer'
        ).last();

        this.pdfCloseButton =
        page.locator("(//i[@class='fa-solid fa-xmark'])[2]");


        this.closePdfPreviewBtn =
            page.getByRole(
                'button',
                {
                    name: 'Close'
                }
            );

        // this.applyBtn =
        //     page.getByText(
        //         'Apply',
        //         {
        //             exact: true
        //         }
        //     );

        this.applyBtn = page
            .getByText(
                'Apply',
                {
                    exact: true
                }
            )
             .nth(1);


        // Calendar

        this.calendarBtn = page.getByRole('button', {
            name: /Calendar:/
        });

        this.monthYear = (monthName, year) =>
            page.getByText(
                `${monthName} ${year}`,
                {
                    exact: true
                }
            );

        this.targetDay = (monthName, year, day) =>
            this.monthYear(monthName, year)
                .locator('..')
                .locator('..')
                .getByText(
                    day,
                    {
                        exact: true
                    }
                )
                .last();



    // IPD Admission Details Summary
 
        this.changeBedBtn = page.locator(
            "//button[@class='change-bed']"
        );
        
        this.roomCategoriesDropdown = page.locator(
            "(//label[text()='Room Categories']//following::i[@class='fa-solid fa-chevron-down'])[1]"
        );
        
        this.roomTypeOption = (roomType) =>
            page.locator('span.status-text:visible')
                .filter({
                    hasText: roomType
                })
                .first();
        
        this.roomNumberDropdown = page.locator(
            "(//label[text()='Room Categories']//following::i[@class='fa-solid fa-chevron-down'])[2]"
        );
        
        this.roomNumberOption = (roomNumber) =>
            page.getByText(
                roomNumber,
                {
                    exact: true
                }
            ).filter({
                visible: true
            }).first();
        
        this.bedDropdown = page.locator(
            "(//label[text()='Room Categories']//following::i[@class='fa-solid fa-chevron-down'])[3]"
        );
        
        this.bedOption = (bed) =>
            page.locator('div.dropdown-list:visible')
                .getByText(
                    bed,
                    {
                        exact: true
                    }
                );
        
        
        this.saveBtn = page.getByRole(
            'button',
            {
                name: 'Save',
                exact: true
            }
        );
        
        this.bedUpdatedToast = page.getByText(
            'Bed updated successfully',
            {
                exact: true
            }
        );
        
        this.roomTypeSummary = page.locator(
            "//div[normalize-space()='Room Type']/following-sibling::div"
        );
        
        this.admittedSummary = page.locator(
            "//div[normalize-space()='Admitted']/following-sibling::div"
        );

        // Invoice PDF Preview

        this.invoicePdfPreview =
            page.locator(
                'app-document-preview'
            );     
            
        // Administrative Form
        this.addAdministrativeFormBtn = page.locator(
            "//button[text()='Add Administrative Form ']"
        );

        this.suggestionContent = page.locator(
             "//div[@class='suggestion-content']"
        );

        this.searchConsentFormInput = page.locator(
            "//input[@placeholder='Search Consent Form...']"
        );

        this.formHeader = page.locator(
            "//div[@class='form-header']"
        );

    

//    this.getConsentFormField = (fieldName) =>
//     page.locator(
//         `//b[contains(normalize-space(), '${fieldName}')]/following::span[contains(@class,'field-container')][1]`
//     );

   this.getConsentFormField = (fieldName) =>
    page.locator(
        `//b[contains(normalize-space(), '${fieldName}')]/following::input[contains(@class,'inline-blank')][1]`
    );
    
//   this.getConsentFormDetailsField = (questionText) =>
//     page.locator(
//         `//*[contains(normalize-space(), '${questionText}')]/following::span[contains(@class,'field-container')][1]`
//     );


    this.getConsentFormDetailsField = (questionText) =>
    page.locator(
        `//*[contains(normalize-space(), '${questionText}')]/following::input[contains(@class,'inline-blank')][1]`
    );

// this.getAdministrativeTimeField = (questionText) =>
//     page.locator(
//         `//*[contains(normalize-space(), '${questionText}')]/following::input[contains(@class,'inline-blank')][1]`
//     );


this.getAdministrativeTimeField = (questionText) => {
    const fields = page.locator(
        'input.inline-blank[placeholder="Fill this"]'
    );

    if (questionText === 'Last meal/water taken — time') {
        return fields.nth(-2);
    }

    if (questionText === 'Empty stomach (fasting) since') {
        return fields.nth(-1);
    }
};

this.getConsentFormCheckbox = (questionText, option) => {

    const questionIndex = {
        'Any known allergy': 0,
        'Taking blood-thinning medicine': 1,
        'Taking Metformin / diabetes medicine': 2,
        'Kidney problem or on dialysis': 3,
        'Pacemaker or any implant in the body': 4,
        'Currently pregnant or breastfeeding': 5
    };

    const index = questionIndex[questionText];

    if (index === undefined) {
        throw new Error(`Checkbox question not mapped: ${questionText}`);
    }

    const optionIndex =
        option.toLowerCase() === 'yes' ? 0 : 1;

    return page.locator(
        'input.consent-checkbox-input:visible'
    ).nth((index * 2) + optionIndex);
};

this.submitButton = page.locator("//button[text()=' Submit ']");

this.scoreResultTable = page.locator(
    "//table[@class='score-result-table']"
);

this.consentFormName = (formName) =>
    page.locator(`//td[normalize-space()='${formName}']`);

this.consentFormViewIcon = (formName) =>
    page.locator(
        `//td[normalize-space()='${formName}']//following::i[@style='cursor: pointer;'][1]`
    );

this.pdfFormName = (formName) =>
    page.locator(
        `//div[contains(@class,'textLayer')]//span[@role='presentation' and normalize-space()='${formName}']`
    );


// Administrative Form - Verify displayed fields
this.getConsentFormDisplayedValue = (fieldName) =>
    page.locator(
        `//b[contains(normalize-space(), '${fieldName}')]/following::span[contains(@class,'field-container') and not(contains(@class,'field-blank'))][1]`
    );

this.getConsentFormInput = (fieldName) =>
    page.locator(
        `//b[contains(normalize-space(), '${fieldName}')]/following::span[contains(@class,'field-container')][1]//input`
    );

this.addPatientSignatureButton = page.locator(
    "(//i[@class='fa-light fa-pen'])[1]"
);

this.signatureNameInput = page.locator(
    "//input[@placeholder='Enter your name']"
);

// this.signatureInput = page.locator(
//     "//input[contains(@class,'name-input')]"
// );

this.signatureInput = page.locator(
    "//input[@placeholder='Enter your name' and @maxlength='50']"
);

this.signatureCanvas = page.locator(
    "canvas.signature-canvas"
);

this.saveSignatureButton = page.locator(
    "//button[normalize-space()='Save Signature']"
);

// this.getConsentCheckbox = (question) =>
//     page
//         .locator('span.consent-inline-checkbox')
//         .filter({ hasText: question })
//         .locator('input[type="checkbox"]');

this.getConsentCheckbox = (question) =>
    page.locator(
        `//div[contains(text(), '${question}')]//input[@type='checkbox']`
    );

this.pdfTextLayer = page.locator('div.textLayer');


this.patientNameText = page.locator(
    "//div[contains(text(),'Patient Name :')]"
);

this.boldButton = page.locator(
    "//button[@title='Bold']"
);

this.italicButton = page.locator(
    "//button[@title='Italic']"
);

this.underlineButton = page.locator(
    "//button[@title='Underline']"
);

this.boldPatientName = page.locator(
    "//b[text()='Patient Name :']"
);

this.unBoldPatientName = page.locator(
    "//div[contains(text(),'Patient Name :')]"
);

this.italicPatientName = page.locator(
    "//i[contains(text(),'Patient Name :')]"
);

this.underlinePatientName = page.locator(
    "//u[contains(text(),'Patient Name :')]"
);

    }

    
}

module.exports = { IPDLocator };