const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { Keywords } = require('../utils/Keywords');
const { IPDLocator } = require('../Locators/IPDLocator.js');
import { Verify } from '../utils/verification.js';

class IPDPage {

    constructor(page) {

        this.page = page;

        this.locator =
            new IPDLocator(page);

        this.keywords =
            new Keywords();
    }

   async waitForCompletion() {
    const popup = this.page.getByText('Admission Successful');

    await popup.waitFor({
        state: 'visible',
        timeout: 120000
    });

    await popup.waitFor({
        state: 'hidden',
        timeout: 120000
    });
}


    async openAdmission() {

        await StepHelper.step(
            this.page,
            'Open IPD',
            async () => {

                await this.waitForCompletion();

                await this.keywords.click(
                    this.locator.admissionBtn
                );

            }
        );
    }


    async selectAllPatients() {

        await StepHelper.step(
            this.page,
            'Select All Patients',
            async () => {

                await this.keywords.click(
                    this.locator.allPatientsBtn
                );

            }
        );
    }

    async selectAdmissionDate(admissionDate) {

    await StepHelper.step(
        this.page,
        `Select Admission Date - ${admissionDate.toDateString()}`,
        async () => {

            // Open calendar
            await this.keywords.click(
                this.locator.calendarBtn
            );

            // Get day from generated date
            const day =
                admissionDate.getDate().toString();

            // Select generated date
            await this.keywords.click(
                this.locator.currentMonth
                    .getByText(
                        day,
                        {
                            exact: true
                        }
                    )
            );

            // Click Apply
            await this.keywords.click(
                this.locator.applyBtn.nth(1)
            );
        }
    );
}

    async searchPatient(patientName) {

    await StepHelper.step(
        this.page,
        `Search Patient - ${patientName}`,
        async () => {

            await this.keywords.click(
                this.locator.patientSearchChip
            );

            await this.keywords.type(
                this.locator.patientSearchTxt,
                patientName
            );

        }
    );
}


    async selectPatient(patientName) {

    await StepHelper.step(
        this.page,
        `Select Patient - ${patientName}`,
        async () => {

            const patient =
                this.locator.getPatientName(
                    patientName
                );

            await this.keywords.waitForElement(
                patient
            );

            await this.keywords.click(
                patient
            );

        }
    );
}


    async openInvoice() {

        await StepHelper.step(
            this.page,
            'Open Invoice',
            async () => {

                await this.keywords.click(
                    this.locator.invoiceTab
                );

            }
        );

         await StepHelper.step(
            this.page,
            'Open Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.generateInvoice
                );
            }
        );
    }

async IPDInvoicePaymentSection() {

    await this.locator.paymentDue.waitFor({
        state: 'visible',
        timeout: 30000
    });

    await Verify.state(
        this.page,
        'Payment Due',
        this.locator.paymentDue,
        {
            visible: true,
            soft: false
        }
    );

    await Verify.state(
        this.page,
        'Paid Amount',
        this.locator.paidAmount,
        {
            visible: true,
            soft: false
        }
    );

    await Verify.state(
        this.page,
        'Invoice Amount',
        this.locator.invoiceAmount,
        {
            visible: true,
            soft: false
        }
    );

    await Verify.state(
        this.page,
        'Invoice Number',
        this.locator.invoiceNumber,
        {
            visible: true,
            soft: false
        }
    );

    const invoiceNumber =
        (await this.locator.invoiceNumber.textContent()).trim();

    this.currentInvoiceNumber = invoiceNumber;

    await Verify.matches(
        this.page,
        'Invoice Number Format',
        /^#INV/,
        invoiceNumber,
        {
            soft: false
        }
    );

    await Verify.state(
        this.page,
        'Send Invoice',
        this.locator.sendInvoice,
        {
            visible: true,
            soft: false
        }
    );

// Get Invoice Amount value from UI
const invoiceAmountContainer =
    this.locator.invoiceAmount.locator('..');

const invoiceAmountText =
    await invoiceAmountContainer.innerText();

console.log(
    'Invoice Amount Container Text:',
    invoiceAmountText
);

const amountMatch =
    invoiceAmountText.match(
        /₹\s*([\d,]+(?:\.\d+)?)/
    );

const summaryAmount =
    amountMatch
        ? parseFloat(
            amountMatch[1].replace(/,/g, '')
        )
        : NaN;

await StepHelper.logStep(
    this.page,
    `Invoice Amount - ${summaryAmount.toFixed(2)}`,
    async () => {
        if (Number.isNaN(summaryAmount)) {
            throw new Error(
                `Invoice Amount could not be extracted from UI. Text: ${invoiceAmountText}`
            );
        }
    }
);

console.log(
    'Invoice Amount Value:',
    summaryAmount
);

return summaryAmount;

}


async IPDVerifyInvoicePDF(
    patientName,
    patientData,
    invoiceData,
    summaryAmount
) {

    const invoiceNumber = this.currentInvoiceNumber;

    // =========================================================
    // OPEN INVOICE PDF
    // =========================================================

    await StepHelper.step(
        this.page,
        `Open Invoice PDF - ${invoiceNumber}`,
        async () => {

            await this.locator.invoiceNumber.waitFor({
                state: 'visible',
                timeout: 30000
            });

            await this.locator.invoiceNumber.click();
        }
    );

    // =========================================================
    // WAIT FOR PDF PREVIEW
    // =========================================================

    await StepHelper.step(
        this.page,
        'Wait for Invoice PDF to Load',
        async () => {

            await this.page.locator(
                'app-document-preview'
            ).waitFor({
                state: 'visible',
                timeout: 30000
            });

            await this.page.locator(
                'app-document-preview .textLayer'
            ).last().waitFor({
                state: 'visible',
                timeout: 30000
            });
        }
    );


    // =========================================================
    // GET PDF TEXT
    // =========================================================

    const pdfText =
        await this.page.locator(
            'app-document-preview .textLayer'
        ).last().innerText();


    // =========================================================
    // BILL NUMBER
    // =========================================================

    const actualBillNumber =
        pdfText.match(
            /Bill No\s*:\s*([A-Z0-9-]+)/i
        )?.[1]?.trim() || '';


    await Verify.equals(
        this.page,
        'Verify Bill Number',
        invoiceNumber.replace(/^#/, ''),
        actualBillNumber,
        {
            soft: false
        }
    );


    // =========================================================
    // PATIENT NAME - BILL TO
    // =========================================================

    const actualPatientName =
        pdfText.match(
            /Bill To\s*:\s*(.+?)(?=\s+Age\s*:)/i
        )?.[1]?.trim() || '';


    await Verify.equals(
        this.page,
        'Verify Patient Name',
        patientName,
        actualPatientName,
        {
            soft: false
        }
    );


    // =========================================================
    // AGE
    // =========================================================

    const actualAge =
        pdfText.match(
            /Age\s*:\s*(\d+)/i
        )?.[1]?.trim() || '';


    await Verify.equals(
        this.page,
        'Verify Age',
        patientData.age,
        actualAge,
        {
            soft: false
        }
    );


    // =========================================================
    // GENDER
    // =========================================================

    const actualGender =
        pdfText.match(
            /Gender\s*:\s*([A-Za-z]+)/i
        )?.[1]?.trim() || '';


    await Verify.equalsIgnoreCase(
        this.page,
        'Verify Gender',
        patientData.gender,
        actualGender,
        {
            soft: false
        }
    );

// =========================================================
// PDF BALANCE
// =========================================================

// Get all PDF text
const invoiceText =
    await this.page.locator('.textLayer').allInnerTexts();

const invoiceContent =
    invoiceText.join(' ');

// console.log('PDF Invoice Content:', invoiceContent);

// Get Balance from PDF
const balanceMatch =
    invoiceContent.match(
        /Balance\s*:\s*([\d,]+(?:\.\d{1,2})?)/
    );

const actualBalanceAmount =
    balanceMatch
        ? parseFloat(
            balanceMatch[1].replace(/,/g, '')
        )
        : NaN;

console.log('Expected - UI Invoice Amount:', summaryAmount);
console.log('Actual - PDF Balance:', actualBalanceAmount);

// Compare UI Invoice Amount with PDF Balance
await Verify.equals(
    this.page,
    'Verify Invoice Amount vs PDF Balance',
    Number(summaryAmount).toFixed(2),
    Number(actualBalanceAmount).toFixed(2),
    {
        soft: false
    }
);

    // =========================================================
    // ADJUSTMENT
    // =========================================================

    const actualAdjustment =
        pdfText.match(
            /Adjustment\s*:\s*([\d,]+(?:\.\d{1,2})?)/i
        )?.[1]
            ?.replace(/,/g, '')
            ?.trim() || '';


    const expectedAdjustment =
        Number(
            invoiceData.adjustmentAmount ?? 0
        ).toFixed(2);


    await Verify.equals(
        this.page,
        'Verify Adjustment',
        expectedAdjustment,
        Number(actualAdjustment || 0).toFixed(2),
        {
            soft: false
        }
    );

    // =========================================================
    // CLOSE INVOICE PDF
    // =========================================================

    await StepHelper.step(
    this.page,
    'Close Invoice PDF Preview',
    async () => {

        const closeButton =
            this.locator.pdfCloseButton;

        await closeButton.waitFor({
            state: 'attached',
            timeout: 30000
        });

        await closeButton.click({
            timeout: 30000
        });
    }
);
}

async IPDInvoicePayment(patientName,admissionDate) {

    await this.openAdmission();

    await this.selectAllPatients();

    await this.selectAdmissionDate(
        admissionDate
    );

    await this.searchPatient(
        patientName
    );

    await this.selectPatient(
    patientName
    );

    await this.openInvoice();
}
}


module.exports = { IPDPage };
