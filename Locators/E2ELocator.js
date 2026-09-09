// ============================================================================
// E2ELocator.js
//
// Dedicated locator file for the Healync End-to-End regression flow
//   tests/Healync_E2E.spec.js  ->  pages/E2EPage.js  ->  this file
//
// Self-contained on purpose. Every locator this flow needs lives here, so the
// E2E test can never be broken by - and can never break - the locator files
// used by the existing WF_CALADN_* suites. No pre-existing file is touched.
//
// NOTE ON `amountTxt` vs `invoiceAmountTxt`
// The source frameworks defined `amountTxt` twice, differently:
//   InvoiceLocator      -> getByRole('textbox', { name: 'Amount' })  (adjustment)
//   CancellationLocator -> getByRole('textbox', { name: 'Rs' })      (refund)
// Merging both into one file makes that collision real, so the invoice field is
// preserved here under the distinct name `invoiceAmountTxt`, and the invoice
// methods in E2EPage.js reference that name. Both elements remain reachable.
// ============================================================================
 
class E2ELocator {
 
    constructor(page) {
 
        this.page = page;
 
 
        // --------------------------------------------------------------
        //  PATIENT  (Add Patient form + Patient Profile)
        // --------------------------------------------------------------
 
        this.addNewBtn = page.getByRole('button', { name: 'Add New' });
        this.addPatientBtn = page.getByRole('button', { name: 'Add Patient' });
        this.patientNameTxt = page.getByPlaceholder('Enter patient name');
        this.mobileNumberTxt = page.getByPlaceholder('Enter phone number');
        this.referralByTxt = page.getByPlaceholder('Write down').first();
        this.emailTxt = page.getByPlaceholder('Write down email address');
        this.maleBtn = page.getByRole('button', { name: 'Male', exact: true });
        this.femaleBtn = page.getByRole('button', { name: 'Female', exact: true });
        this.otherGenderBtn = page.getByRole('button', { name: 'Other', exact: true });
        this.addressTxt = page.getByPlaceholder('Write down resident address');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.salutationDropdownBtn = page.locator('button.dropdown-button').first();
        this.salutationDropdownList = page.locator('div.dropdown-list').first();
        this.dobComponent = page.locator('app-customcalendarinput:visible').first();
        this.calendarHeader = this.dobComponent.locator('.calendar-header');
        this.calendarHeaderTitle = this.calendarHeader.locator('h3').first();
        this.successToastTitle = page.locator('div.toaster-wrapper.success .text-content .title').first();
        this.goToPatientProfileLink = page.locator(
            'div.toaster-wrapper.success span.action'
        ).filter({ hasText: 'Go to patient profile' });
        this.patientProfileNameText = page.locator(
            'div.patient-name-block div.patient-name span'
        ).first();
        this.profileUhidText = page.locator('div.patient-uhid');
        this.profileGenderAgeText = page.locator('div.patient-gender-age');
        this.profileEmailText = page.locator(
            'div.meta-row:has(i.fa-at) span'
        );
        this.profilePhoneText = page.locator(
            'div.meta-row:has(i.fa-phone) span'
        );
        this.profileAddressText = page.locator(
            'div.meta-row:has(i.fa-location-dot) span'
        );
        this.profileReferralSourceValue = page.locator(
            'div.info-text'
        ).filter({
            has: page.locator('div.info-label', {
                hasText: 'Patient referral source'
            })
        }).locator('div.info-value');
 
 
        // --------------------------------------------------------------
        //  CALENDAR  (dashboard, search, appointment cards)
        // --------------------------------------------------------------
 
        this.sidebarCalendarIcon = page.locator('#calendar-toggle');
        this.patientSearch = page.getByPlaceholder(
            'Search or register patient'
        );
        this.patientResult = (patientName) =>
            page.locator(
                `//div[@class='list-item-wrapper'][contains(.,'${patientName}')]`
            ).first();
        this.patientSearchResultTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-service-future');
        this.patientNoApptBookedTag = (patientName) =>
            this.patientResult(patientName)
                .locator('span.status-default');
        this.viewAppointmentBtn = page.locator(
            "//div[@class='list-item-wrapper']//button[@class='view-appt-btn']"
        );
        this.showCancelledToggle = page.locator(
            '.status-card.canceled .toggle-switch'
        );
        this.nextDayCalendarBtn = page.getByRole('button', {
            name: 'Next day'
        });
        this.cancelledAppointmentCard = (patientName) =>
            page.locator('div.slot.custom-events-cards')
                .filter({ hasText: patientName });
 
 
        // --------------------------------------------------------------
        //  PACKAGE  (add / activate / schedule / book)
        // --------------------------------------------------------------
 
        this.addPackageBtn =
            page.getByRole('button', { name: 'Add Package' });
        // Patient search box INSIDE the Add Package drawer. Distinct from the
        // calendar top-bar `patientSearch` above - different element, different
        // screen. See the searchPatientInPackageDrawer note in E2EPage.js.
        this.patientSearchTxt =
            page.getByRole('textbox', {
                name: 'Search with patient name or'
            });
 
        this.proceedBtn =
            page.getByText('Proceed');
        this.activateSchedulePackageBtn = page.getByText(
            'Activate & Schedule service',
            { exact: true }
        );
        this.bookNowBtn =
            page.getByRole('button', { name: 'Book Now' });
        this.slotButton =
            page.locator('.slotButton');
        this.addCustomSlotsBtn =
            page.getByText('Add custom slots').first();
        this.customSlotUpdateBtn =
            page.locator('div.custom-slot-modal')
                .getByRole('button', { name: 'Update' });
        this.nextDayBtn =
            page.locator('div.NextListButton').first();
        this.nextBtn =
            page.getByRole('button', {
                name: 'Next',
                exact: true
            });
        this.pendingServiceCards =
        page.locator('app-package-item-card')
        .filter({
            hasText: 'Pending'
        });
        this.confirmBtn =
        page.locator("//button[@class='activeButon']");
        this.confirmPackageBookingBtn = page.getByRole('button', {
            name: /Confirm/i
        });
        this.packageAddedToastTitle = page.locator(
            'app-custom-toaster-message div.title'
        ).filter({ visible: true });
        this.goToAppointmentPageLink = page.getByText(
            'Go to appointment page'
        ).filter({ visible: true });
        this.packageToastSubtext = page.locator(
            'app-custom-toaster-message div.subtext'
        ).filter({ visible: true });
        this.packageBreadcrumb = page.locator(
            'div.packageHeader div.addAppointmentHeader'
        );
        this.packageBannerName = page.locator(
            'div.headingDiv div.top'
        );
        this.packageActiveStatusBtn = page.locator(
            'div.headingDiv button.activated'
        );
 
        this.slotAppointmentCard = (slot) =>
        slot.locator('xpath=ancestor::div[contains(@class,"bookappointmentBodyCard")]');
 
 
        // --------------------------------------------------------------
        //  INVOICE  (generate, totals, PDF fields)
        // --------------------------------------------------------------
 
        this.generateInvoiceLink =
            page.getByText('Generate invoice').nth(1);
        this.finalGenerateInvoiceBtn =
            page.getByRole('button', {
                name: 'Generate invoice'
            });
        this.serviceCheckbox = page.locator(
            'th.th-checkbox.cell-input'
        );
        this.addAdjustmentBtn =
            page.getByRole('button', {
                name: 'Add Adjustment'
            });
        this.adjustmentNameTxt =
            page.locator(
                'input[type="text"]'
            ).nth(4);
        this.reasonTxt =
            page.getByRole('textbox', {
                name: 'Enter reason'
            });
        this.summaryValue =
            page.locator(
                "(//div[@class='summary-value'])[1]"
            );
        this.invoiceTotal =
            page.locator(
                "(//div[@class='invoice-row'])[6]//following::div[@class='amount-wrapper']"
            ).first();
        this.invoiceNumber =
            page.locator(
                '(//span[@class="invoice-id"])[2]'
            );
        this.closePdfPreviewBtn =
            page.locator(
                '.btn-close-preview'
            );
        this.pdfBody =
            page.locator('body');
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
        this.totalPdf = (total) =>
        this.pdfBody.getByText(
            `Total : ${parseFloat(total).toFixed(2)}`
        );
        this.invoiceHistoryNumberValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[1]"
);
        this.invoiceHistoryGeneratedOnValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[2]"
);
        this.invoiceHistoryTotalAmountValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[3]"
);
        this.invoiceHistoryRemainingAmountValue = page.locator(
    "//th[contains(text(),'Invoice Number')]/ancestor::table//tbody/tr[1]/td[4]"
);
        this.invoiceNumberPdfFromFinancials = page.locator(
    'span.breadcrumb-current'
).last();
        this.patientNamePdfFromFinancials = (patientName) =>
    this.pdfBody.getByText(`Bill To : ${patientName}`);
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
        this.appointmentPaymentDueStatus =
    page.locator(
        "//app-appointment-details//*[normalize-space()='Payment Due']/parent::*//span[contains(@class,'status-chip')]"
    ).first();
        this.appointmentPaymentHistoryRows =
    page.locator(
        'div.payment-history table tbody tr'
    );
        this.creditAppliedPdf = (creditApplied) =>
    this.pdfBody.getByText(
        `Credit Applied : ${parseFloat(creditApplied).toFixed(2)}`
    );
        this.itemDescriptionPdf = (itemName) =>
    this.pdfBody.getByText(itemName).first();
        this.balancePdf = (balance) =>
    this.pdfBody.getByText(
        `Balance : ${parseFloat(balance).toFixed(2)}`
    );
        this.invoicePaymentDetailsReceiptNumberPdf =
    this.pdfBody.getByText(/^\d{6}$/).last();
        this.invoicePaymentDetailsModePdf = (mode) =>
    this.pdfBody.getByText(mode, { exact: true }).last();
        this.invoicePaymentDetailsAmountPdf = (amount) =>
    this.pdfBody.getByText(
        parseFloat(amount).toFixed(2)
    ).last();
        this.appointmentPatientInfoValue = (fieldLabel) =>
    page.locator(
        `//div[contains(@class,'patient-information')]` +
        `//div[contains(@class,'label6')]` +
        `[div[normalize-space()='${fieldLabel}']]` +
        `/div[contains(@class,'label7')]`
    ).last();
        this.invoiceLineItemRow =
    page.locator('table.billing-table tbody tr').first();
        this.invoiceErrorToastTitle = page.locator(
    'app-custom-toaster-message div.title'
).last();
        this.invoiceErrorToastSubtext = page.locator(
    'app-custom-toaster-message div.subtext'
).last();
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
 
        // Invoice adjustment amount field - renamed to avoid colliding with the
        // cancellation refund `amountTxt` above. See file header.
        this.invoiceAmountTxt =
            page.getByRole('textbox', {
                name: 'Amount'
            });
 
 
        // --------------------------------------------------------------
        //  PAYMENT  (financials, invoice + payment history)
        // --------------------------------------------------------------
 
        this.financialsTab = page.getByText(
            'Financials'
        );
        this.patientProfile = (patientName) =>
            page.getByText(
                `Mr ${patientName}`
            ).nth(1);
        this.loaderOverlay = page.locator(
            '.loader-overlay-generate'
        ).first();
        this.invoiceHistoryTab = page.getByText(
            'Invoice History',
            {
                exact: true
            }
        );
        this.financialsPaymentHistoryTab = page
            .locator('div.tab-item')
            .filter({ hasText: 'Payment History' });
        this.financialsPaymentHistoryRows = page.locator(
            'div.financials-table-wrapper table tbody tr'
        );
 
 
        // --------------------------------------------------------------
        //  CANCELLATION  (cancel package, refund, confirm)
        // --------------------------------------------------------------
 
        this.cancelBtn = page.getByText('Cancel').nth(3);
        this.refundBtn = page.getByRole('button', {
            name: 'Refund',
            exact: true
        });
        this.cashBtn = page.getByRole('button', {
            name: 'Cash'
        });
        this.upiBtn = page.getByRole('button', {
            name: 'UPI'
        });
        this.cardBtn = page.getByRole('button', {
            name: 'Card'
        });
        this.amountTxt = page.getByRole('textbox', {
            name: '₹'
        });
        this.makePaymentActionBtn = page.locator(
            ".make-payment-btn"
        );
        this.amountInput = page.getByPlaceholder(
            "₹ Amount"
        );
        this.recordPaymentBtn = page.getByRole(
            "button",
            { name: "Record Payment" }
        );
        this.paymentSuccessMessage = page.locator(
            "app-custom-toaster-message"
        );
        this.cancelledStatus = page.locator(
            ".status-style.status-cancelled"
        ).first();
        this.fullRefundCheckbox = page.getByText(
    'Make full refund',
    { exact: true }
);
        this.reviewConfirmBtn = page.getByRole('button', {
    name: 'Review & Confirm',
    exact: true
});
        this.confirmCancellationBtn = page.getByRole('button', {
    name: 'Confirm Cancellation',
    exact: true
});
        this.continueCancellationBtn =
    page.getByRole('button', {
        name: 'Continue Cancellation',
        exact: true
    });
        this.wholePackageBtn = page.getByRole('button', {
    name: 'Whole Package',
    exact: true
});
        this.chooseReason = page.getByText('Choose reason');
        this.cancellationReason = (reason) =>
    page.getByText(reason, { exact: true });
        this.cancellationOption =
    page.locator(
        '.cancel-modal > div:nth-child(4) > div:nth-child(2) > div'
    );
        this.continueBtn =
    page.getByRole('button', {
        name: 'Continue',
        exact: true
    });
        this.cancelModalPackageName = (packageName) =>
    page.locator('.cancel-modal').getByText(packageName);
        this.amountAlreadyPaidValue = page.locator(
    "//*[normalize-space()='Amount already paid']/following-sibling::*[1]"
);
        this.newPackageStatusValue = page.locator(
    "//*[normalize-space()='New Package Status']/following-sibling::*[1]"
);
        this.reviewScreenBackBtn = page.getByRole('button', {
    name: 'Back',
    exact: true
}).last();
 
    }
 
    // ------------------------------------------------------------------------
    //  Dynamic / derived locators
    // ------------------------------------------------------------------------
 
    get calendarMonthYearPopup() {
        return this.page.locator(
            'button.calendar-header-options-section-monthName-button'
        ).first().locator(
            'xpath=ancestor::*[.//button[normalize-space()="Cancel"] and .//button[normalize-space()="Save"]][1]'
        );
    }
 
    getAdditionalDetailField(labelText) {
        return this.page.locator('div.form-group.mb-3')
            .filter({ has: this.page.locator('label', { hasText: labelText }) })
            .locator('input.form-control');
    }
 
    getDayLocator(day) {
        return this.page.locator('div.calendar-day:not(.greyed-out-day)')
            .filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) });
    }
 
    getMonthButton(monthName) {
        return this.calendarMonthYearPopup
            .locator('button')
            .filter({ hasText: new RegExp(`^\\s*${monthName}\\s*$`) });
    }
 
    getPatient(patientName) {
        return this.page.locator(
            `//div[@title="${patientName}"]`
        );
    }
 
    getPackage(packageName) {
 
        return this.page.getByText(
            packageName,
            { exact: true }
        );
    }
 
    getSalutationOption(salutation) {
        return this.salutationDropdownList
            .locator('div.dropdown-item')
            .filter({ hasText: new RegExp(`^\\s*${salutation}\\s*$`) });
    }
 
    getStatus(status) {
 
        return this.page.locator(
            `(//div[@class='status']//following::div[contains(text(),' ${status} ')])[3]`
        );
    }
 
    getYearButton(year) {
        return this.calendarMonthYearPopup
            .locator('button')
            .filter({ hasText: new RegExp(`^\\s*${year}\\s*$`) });
    }
 
    get medicalConditionTxt() {
        return this.getAdditionalDetailField('Medical Condition');
    }
 
    get patientCategoryTxt() {
        return this.getAdditionalDetailField('Patient Category');
    }
 
    get pincodeTxt() {
        return this.getAdditionalDetailField('Pincode');
    }
 
    get saveDateBtn() {
        return this.calendarMonthYearPopup.getByRole('button', {
            name: 'Save',
            exact: true
        });
    }
 
    get treatingDoctorTxt() {
        return this.getAdditionalDetailField('Treating Doctor');
    }
 
}
 
module.exports = { E2ELocator };