class InvoiceLocator 
{

    constructor(page) {
        this.page = page;

        // Generate Invoice
        this.generateInvoiceLink =
            page.getByText('Generate invoice').nth(1);

        this.finalGenerateInvoiceBtn =
            page.getByRole('button', {
                name: 'Generate invoice'
            });

        this.EndGenerateInvoiceBtn = page
            .locator('app-patient-invoice-popup')
            .getByRole('button', {
                name: 'Generate invoice',
                exact: true
            });
        

        // Invoice Services
        // this.serviceCheckbox1 =
        //     page.locator(
        //         '.td-checkbox > .ng-untouched'
        //     ).first();

        // this.serviceCheckbox2 =
        //     page.locator(
        //         'tr:nth-child(2) > .td-checkbox > .ng-untouched'
        //     );

        this.servicebox = page.locator(
            'th.th-checkbox.cell-input'
        );

        this.serviceCheckbox = page.locator(
            'th.th-checkbox.cell-input input[type="checkbox"]'
        );

        // Adjustment
        this.addAdjustmentBtn =
            page.getByRole('button', {
                name: 'Add Adjustment'
            });

        this.amountTxt =
            page.getByRole('textbox', {
                name: 'Amount'
            });

        this.adjustmentNameTxt =
            page.locator(
                'input[type="text"]'
            ).nth(4);

        this.reasonTxt =
            page.getByRole('textbox', {
                name: 'Enter reason'
            });

        // Invoice Summary
        this.summaryValue =
            page.locator(
                "(//div[@class='summary-value'])[1]"
            );

        this.invoiceTotal =
            page.locator(
                "(//div[@class='invoice-row'])[6]//following::div[@class='amount-wrapper']"
            ).first();

        // Invoice Number
        this.invoiceNumber =
            page.locator(
                '(//span[@class="invoice-id"])[2]'
            );

        // Invoice PDF
        this.closePdfPreviewBtn =
            page.locator(
                '.btn-close-preview'
            );

        this.pdfBody =
            page.locator('body');

       this.pdfBody1 = page.locator('//div[@class="textLayer"]//span');

            // page.locator('//div[@class="textLayer"]//span');

          // Financials
        this.financials = page.getByText(
            'Financials'
        );

        // Add Appointment Button
    this.AppointmentButton = page.locator(
    "//button[@class='add-appointment-btn']"
    );

    this.invoiceGenerateButton = page
    .getByRole('button', {
        name: 'Create Invoice'
    })
    .nth(1);

    this.adjustmentaddadmissionBtn = page.getByRole('button', {
    name: 'Add Adjustment'
    });

    this.adjustmentaddadmissionAmountTxt = page.getByRole('textbox', {
        name: 'Amount'
    });

    this.adjustmentaddadmissionAddAnotherBtn = page.getByText(
        '₹ Add Another Adjustment'
    );

    this.adjustmentaddadmissionDescriptionTxt = page.locator(
        '.adjust-description-input'
    );

    this.adjustmentaddadmissionReasonTxt = page.getByRole('textbox', {
        name: 'Enter reason'
    });

    this.adjustmentaddadmissionGenerateInvoiceBtn =
        page.getByRole('button', {
            name: 'Generate invoice'
    });

    this.invoiceNumberCell = page.getByRole('cell', {
        name: 'INV-'
    });

    this.invoiceTotalAmountCell =
        this.page.locator(
            '//tr[.//td[contains(., "INV-")]]/td[3]'
        );

    this.viewInvoiceBtn = page.locator(
        '.fa-regular.fa-eye'
    );

    this.invoiceNumberPdf =
        this.pdfBody.locator(
            'span.invoice-id'
        ).first();

    this.patientNamePdf =
        this.pdfBody.locator(
            'div.name-edit'
        ).nth(1);

    // this.agePdf = (age) =>
    //     this.pdfBody.getByText(
    //         `Age : ${age}`
    //     );

    this.agePdf = (age) =>
    page.getByText(
        `Age : ${age}`,
        { exact: true }
    ).first();

    this.genderPdf = (gender) =>
        this.pdfBody.getByText(
            `Gender : ${gender}`
        );

    this.subTotalPdf = (subTotal) =>
        this.pdfBody.getByText(
            `Sub Total : ${parseFloat(subTotal).toFixed(2)}`
        );

    this.discountPdf = (discount) =>
        this.pdfBody.getByText(
            `Discount : ${parseFloat(discount).toFixed(2)}`
        );

    this.adjustmentPdf = (adjustment) =>
    this.pdfBody.getByText(
        `Adjustment : ${parseFloat(adjustment).toFixed(2)}`
    );

    // this.discountPdf = (discount) =>
    // this.pdfBody.getByText(
    //     new RegExp(`Discount\\s*:\\s*${parseFloat(discount).toFixed(2)}`)
    // );


    this.totalPdf = (total) =>
        this.pdfBody.getByText(
            `Total : ${parseFloat(total).toFixed(2)}`
        );



    this.pdfBody2 =
        page.locator('body');

    this.pdfBillNumber =
        this.pdfBody.getByText(/Bill No\s*:/).first();

    this.pdfPatientName =
        this.pdfBody.getByText(/Bill\s*To\s*:/i).first();

    this.pdfAge =
        this.pdfBody.getByText(/Age\s*:/).first();

    this.pdfGender =
        this.pdfBody.getByText(/Gender\s*:/).first();

    this.pdfDiscount =
        this.pdfBody.getByText(/Discount\s*:/).first();

    this.pdfTotalAmount =
        this.pdfBody.getByText(/^Total\s*:/).first();


    // Appointment Details
    this.appointmentDetails =
        page.locator('app-appointment-details');
    // Appointment Status
    this.confirmedStatus =
        page.locator(
            "(//div[@class='field-dropdown'])[2]"
        );
    this.checkInStatus =
        page.locator(
            "(//span[text()='Checked-In'])[2]"
        );
    // Visiting Slip
    this.visitingSlip =
        page.locator(
            "(//div[@class='visiting-slip-label'])[2]"
    );
    // Rendered visiting-slip PDF page
    this.visitingSlipPdfPage =
        page.getByLabel(/Page.*1/);
    // Visiting Slip pdf text locator
    this.pdfBody3 =
        page.locator(
            '//div[@class="textLayer"]//span'
    );

   // Appointment Payment Details

    this.appointmentInvoiceNumber =
        page.locator(
            'app-appointment-details span.invoice-id'
        ).first();

    this.appointmentSendInvoice =
        page.getByText(
            'Send invoice',
            { exact: true }
        ).first();

    this.appointmentPaymentDue =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

    this.appointmentPaidAmount =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Paid amount']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

        this.appointmentTotalAmount =
        page.locator(
            "//app-appointment-details//*[normalize-space()='Total amount']/parent::*//div[contains(@class,'amount-wrapper')]"
        ).first();

         const appointmentDetailsPanel = page.locator(

            'app-appointment-details'

        );

        this.confirmedStatus = appointmentDetailsPanel.getByText(

            'Confirmed',

            { exact: true }

        ).last();

        this.checkInStatus = appointmentDetailsPanel.getByText(

            'Checked-In',

            { exact: true }

        ).last();

        this.checkedInStatus = appointmentDetailsPanel.getByText(

            'Checked-In',

            { exact: true }

        ).last();

        this.completedStatus = appointmentDetailsPanel.getByText(

            'Completed',

            { exact: true }

        ).last();

    }


    getPatientName(patientName) 
    {

        return this.page.getByText(

            patientName,

            { exact: true }
        );
            

    }

}

module.exports = { InvoiceLocator };