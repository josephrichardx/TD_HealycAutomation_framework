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
    }
}

module.exports = { IPDLocator };