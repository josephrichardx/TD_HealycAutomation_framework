class InvoiceLocator {

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

        this.serviceCheckbox = page.locator(
            'th.th-checkbox.cell-input'
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
    // Visiting Slip pdf text locator
    this.pdfBody3 =
        page.locator(
            '//div[@class="textLayer"]//span'
    );

   // Appointment Payment Details

// Invoice Number column in the Financials > Invoice History table
// (different screen from Appointment Details - this one lives in
// InvoiceLocator too since verifyInvoiceFromFinancials() is an
// InvoicePage method and only has access to this.locator here, not
// PaymentLocator's copy of the same value used elsewhere).
this.invoiceHistoryNumberValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[1]"
);

// Same table, remaining columns confirmed from your screenshot -
// Invoice Number(1) / Generated On(2) / Total Amount(3) /
// Remaining Amount(4) / View(5).
this.invoiceHistoryGeneratedOnValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[2]"
);

this.invoiceHistoryTotalAmountValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[3]"
);

this.invoiceHistoryRemainingAmountValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[4]"
);

// Invoice Number when the PDF is opened via Financials > Invoice
// History specifically - confirmed real DOM: this PDF viewer uses
// a completely different wrapper (div.preview-modal >
// div.preview-topbar > div.preview-title > span.breadcrumb-current)
// than every other PDF-open path in this suite, which use
// span.invoice-id. Visually near-identical PDF content, different
// underlying component - same trap as the Consult-vs-Package
// screens earlier tonight.
this.invoiceNumberPdfFromFinancials = page.locator(
    'span.breadcrumb-current'
).last();

// Patient Name for the Financials-opened PDF - the shared
// patientNamePdf (div.name-edit, .nth(1) on the whole page) is
// fragile: it happens to work in the Appointment-Details context by
// coincidence of how many div.name-edit elements exist elsewhere on
// that page, but breaks here since the Financials/Patient Profile
// page has a different count. Using the same reliable pattern
// already proven for every other PDF field (Sub Total, Total,
// Balance, etc.) instead - plain text match inside the PDF's own
// text layer, confirmed real from an actual screenshot ("Bill To :
// Natasha Stan" rendering as plain text, same as everything else).
this.patientNamePdfFromFinancials = (patientName) =>
    this.pdfBody.getByText(`Bill To : ${patientName}`);

// .last() - not .first(). Same "stale duplicate panel" pattern as
// the toast fix and the patient-info fix: when a second
// Appointment Details panel opens without the previous one being
// fully removed from the DOM, .first() grabs the old underlying
// one while the new one sits on top intercepting clicks. .last()
// targets whichever panel is actually the current/topmost one.
this.appointmentInvoiceNumber =
    page.locator(
        'app-appointment-details span.invoice-id'
    ).last();

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

// Payment Due status chip ("Paid" / "Refunded" etc.) - sits inside
// the same amount-wrapper as appointmentPaymentDue, as a
// span.status-chip.status-chip-<status>. Confirmed against DOM:
// label.payment-label "Payment Due" -> div.amount-wrapper ->
// span.status-chip.status-chip-paid > "Paid"
this.appointmentPaymentDueStatus =
    page.locator(
        "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//span[contains(@class,'status-chip')]"
    ).first();

// Payment History rows inside the Appointment Details panel
// (div.payment-history table tbody tr). Column order confirmed
// from DOM: # / Date / Method / Amount / View.
this.appointmentPaymentHistoryRows =
    page.locator(
        'div.payment-history table tbody tr'
    );

// Invoice PDF - Credit Applied / Balance lines. Same span-in-
// textLayer pattern as subTotalPdf/discountPdf/totalPdf above.
this.creditAppliedPdf = (creditApplied) =>
    this.pdfBody.getByText(
        `Credit Applied : ${parseFloat(creditApplied).toFixed(2)}`
    );

// Item Description / Package Name line on the invoice PDF
// (e.g. "Neuro PT (30 sessions)") - same plain-text-span pattern
// as subTotalPdf/discountPdf/totalPdf.
this.itemDescriptionPdf = (itemName) =>
    this.pdfBody.getByText(itemName).first();

this.balancePdf = (balance) =>
    this.pdfBody.getByText(
        `Balance : ${parseFloat(balance).toFixed(2)}`
    );

// "Payment Details" table embedded directly in the invoice PDF
// itself when reopened post-payment (confirmed DOM from actual
// screenshots: Receipt Number / Payment Mode / Payment Amount /
// Transaction ID / Payment By / Payment Reason / Payment Collected
// By / Payment Date columns, same textLayer-span pattern as
// everything else on this PDF). This is separate from the
// standalone Payment Receipt PDF (receiptPaymentNumberPdf etc.
// above) - having both means the two receipt numbers can be
// cross-checked against each other.
this.invoicePaymentDetailsReceiptNumberPdf =
    this.pdfBody.getByText(/^\d{6}$/).last();

this.invoicePaymentDetailsModePdf = (mode) =>
    this.pdfBody.getByText(mode, { exact: true }).last();

this.invoicePaymentDetailsAmountPdf = (amount) =>
    this.pdfBody.getByText(
        parseFloat(amount).toFixed(2)
    ).last();

// Patient Information block in the Appointment Details sidebar
// (UHID / Age / Gender / Contact / Referral source rows). Real DOM,
// confirmed from an actual failing-run HTML dump (not a guess this
// time): div.patient-information > div.card (one per row) >
// div.label6 > [label div] + div.label7 (the value).
// Two bugs fixed here from every earlier attempt tonight:
//   1. Value div class is "label7", not "label17" - a typo that
//      silently broke every read since this was first written.
//   2. The label div's class is NOT "contact" for every row (that
//      was only ever true for the UHID row specifically) - Age's is
//      "age", Gender's is "gender", etc. Matching on the label's
//      actual text instead of guessing its class per field.
this.appointmentPatientInfoValue = (fieldLabel) =>
    page.locator(
        `//div[contains(@class,'patient-information')]` +
        `//div[contains(@class,'label6')]` +
        `[div[normalize-space()='${fieldLabel}']]` +
        `/div[contains(@class,'label7')]`
    ).last();

// ==========================================
// Create Invoice - line item Qty/Rate inputs
// Confirmed DOM: table.billing-table tbody tr, with two
// identically-classed <input type="number"> cells (no unique
// class between them) - Qty is the first (min="1"), Rate is the
// second (min="0"). Distinguished by position, not class, since
// Healync doesn't give them different classes.
// ==========================================

this.invoiceLineItemRow =
    page.locator('table.billing-table tbody tr').first();

// ==========================================
// "Discount Reason Required" validation toast, shown when
// Generate Invoice is clicked with an adjustment amount entered
// but no reason. Same app-custom-toaster-message pattern as the
// package-added toast, just class "error" instead of "success".
// ==========================================

this.invoiceErrorToastTitle = page.locator(
    'app-custom-toaster-message div.title'
).last();

this.invoiceErrorToastSubtext = page.locator(
    'app-custom-toaster-message div.subtext'
).last();

// ==========================================
// Payment History row "eye" (View Receipt) icon, and the
// Payment Receipt PDF it opens. Confirmed DOM for the icon:
// i.fa-solid.fa-eye[title="View Receipt"] inside the row's last
// <td>. Confirmed DOM for the PDF: same textLayer-span pattern
// as the invoice PDF, with two tables - Payment# / Collected By /
// Payment Mode / Transaction Id / Received From / Amount Received
// in the first, and a second row with Invoice / Invoice Date /
// Invoice Amount / Withholding Tax / Payment Amount.
// ==========================================

this.paymentHistoryViewReceiptIcon = (row) =>
    row.locator('i.fa-eye[title="View Receipt"]');

this.receiptPaymentNumberPdf = this.pdfBody.getByText(
    /^\d{6}$/
).first();

this.receiptPaymentModePdf = (mode) =>
    this.pdfBody.getByText(mode, { exact: true }).first();

this.receiptAmountReceivedPdf = (amount) =>
    this.pdfBody.getByText(
        parseFloat(amount).toFixed(2)
    ).first();

this.receiptInvoiceNumberPdf = (invoiceNumber) =>
    this.pdfBody.getByText(invoiceNumber).first();

    }

    getPatientName(patientName) {
        return this.page.getByText(
            patientName,
            { exact: true }
        );
    }

}

module.exports = { InvoiceLocator };
