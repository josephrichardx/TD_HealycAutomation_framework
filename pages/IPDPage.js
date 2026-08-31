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

// async selectAdmissionDate(admissionDate) {

//     const monthName = admissionDate.toLocaleString(
//         'en-US',
//         { month: 'long' }
//     );

//     const year = String(admissionDate.getFullYear());
//     const day = String(admissionDate.getDate());

//     await StepHelper.step(
//         this.page,
//         `Select Admission Date - ${day} ${monthName} ${year}`,
//         async () => {

//             // Open calendar
//             await this.keywords.click(
//                 this.locator.calendarBtn
//             );

//             // Find target month/year
//             const monthYear = this.page.getByText(
//                 `${monthName} ${year}`,
//                 { exact: true }
//             );

//             await monthYear.scrollIntoViewIfNeeded();

//             // Select the day under the target month
//             const targetMonth =
//                 monthYear.locator('..').locator('..');

//             await this.keywords.click(
//                 targetMonth.getByText(day, {
//                     exact: true
//                 }).last()
//             );

//             // Apply
//             await this.keywords.click(
//                 this.locator.applyBtn
//             );
//         }
//     );
// }
  
async selectAdmissionDate(admissionDate) {

    const monthName = admissionDate.toLocaleString(
        'en-US',
        {
            month: 'long'
        }
    );

    const year = String(
        admissionDate.getFullYear()
    );

    const day = String(
        admissionDate.getDate()
    );

    await StepHelper.step(
        this.page,
        `Select Admission Date - ${day} ${monthName} ${year}`,
        async () => {

            // Open calendar
            await this.keywords.click(
                this.locator.calendarBtn
            );

            // Select date
            await this.keywords.click(
                this.locator.targetDay(
                    monthName,
                    year,
                    day
                )
            );

            // Apply
            await this.keywords.click(
                this.locator.applyBtn
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


// async IPDVerifyInvoicePDF(
//     patientName,
//     patientData,
//     invoiceData,
//     summaryAmount
// ) {

//     const invoiceNumber = this.currentInvoiceNumber;

//     // =========================================================
//     // OPEN INVOICE PDF
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         `Open Invoice PDF - ${invoiceNumber}`,
//         async () => {

//             await this.locator.invoiceNumber.waitFor({
//                 state: 'visible',
//                 timeout: 30000
//             });

//             await this.locator.invoiceNumber.click();
//         }
//     );

//     // =========================================================
//     // WAIT FOR PDF PREVIEW
//     // =========================================================

//     await StepHelper.step(
//         this.page,
//         'Wait for Invoice PDF to Load',
//         async () => {

//             await this.page.locator(
//                 'app-document-preview'
//             ).waitFor({
//                 state: 'visible',
//                 timeout: 30000
//             });

//             await this.page.locator(
//                 'app-document-preview .textLayer'
//             ).last().waitFor({
//                 state: 'visible',
//                 timeout: 30000
//             });
//         }
//     );//update


//     // =========================================================
//     // GET PDF TEXT
//     // =========================================================

//     const pdfText =
//         await this.page.locator(
//             'app-document-preview .textLayer'
//         ).last().innerText();


//     // =========================================================
//     // BILL NUMBER
//     // =========================================================

//     const actualBillNumber =
//         pdfText.match(
//             /Bill No\s*:\s*([A-Z0-9-]+)/i
//         )?.[1]?.trim() || '';


//     await Verify.equals(
//         this.page,
//         'Verify Bill Number',
//         invoiceNumber.replace(/^#/, ''),
//         actualBillNumber,
//         {
//             soft: false
//         }
//     );


//     // =========================================================
//     // PATIENT NAME - BILL TO
//     // =========================================================

//     const actualPatientName =
//         pdfText.match(
//             /Bill To\s*:\s*(.+?)(?=\s+Age\s*:)/i
//         )?.[1]?.trim() || '';


//     await Verify.equals(
//         this.page,
//         'Verify Patient Name',
//         patientName,
//         actualPatientName,
//         {
//             soft: false
//         }
//     );


//     // =========================================================
//     // AGE
//     // =========================================================

//     const actualAge =
//         pdfText.match(
//             /Age\s*:\s*(\d+)/i
//         )?.[1]?.trim() || '';


//     await Verify.equals(
//         this.page,
//         'Verify Age',
//         patientData.age,
//         actualAge,
//         {
//             soft: false
//         }
//     );


//     // // =========================================================
//     // // GENDER
//     // // =========================================================

//     // const actualGender =
//     //     pdfText.match(
//     //         /Gender\s*:\s*([A-Za-z]+)/i
//     //     )?.[1]?.trim() || '';


//     // await Verify.equalsIgnoreCase(
//     //     this.page,
//     //     'Verify Gender',
//     //     patientData.gender,
//     //     actualGender,
//     //     {
//     //         soft: false
//     //     }
//     // );

//     // =========================================================
// // GENDER
// // =========================================================

// const actualGender =
//     pdfText.match(
//         /Gender\s*:\s*([A-Za-z]+)/i
//     )?.[1]?.trim() || '';


// await StepHelper.step(
//     this.page,
//     `Verify Gender | Expected: ${patientData.gender} | Actual: ${actualGender}`,
//     async () => {

//         await Verify.equalsIgnoreCase(
//             this.page,
//             'Gender',
//             patientData.gender,
//             actualGender,
//             {
//                 soft: false
//             }
//         );

//     }
// );

// // =========================================================
// // PDF BALANCE
// // =========================================================

// // Get all PDF text
// const invoiceText =
//     await this.page.locator('.textLayer').allInnerTexts();

// const invoiceContent =
//     invoiceText.join(' ');

// // console.log('PDF Invoice Content:', invoiceContent);

// // Get Balance from PDF
// const balanceMatch =
//     invoiceContent.match(
//         /Balance\s*:\s*([\d,]+(?:\.\d{1,2})?)/
//     );

// const actualBalanceAmount =
//     balanceMatch
//         ? parseFloat(
//             balanceMatch[1].replace(/,/g, '')
//         )
//         : NaN;

// console.log('Expected - UI Invoice Amount:', summaryAmount);
// console.log('Actual - PDF Balance:', actualBalanceAmount);

// // Compare UI Invoice Amount with PDF Balance
// await Verify.equals(
//     this.page,
//     'Verify Invoice Amount vs PDF Balance',
//     Number(summaryAmount).toFixed(2),
//     Number(actualBalanceAmount).toFixed(2),
//     {
//         soft: false
//     }
// );

//     // =========================================================
//     // ADJUSTMENT
//     // =========================================================

//     const actualAdjustment =
//         pdfText.match(
//             /Adjustment\s*:\s*([\d,]+(?:\.\d{1,2})?)/i
//         )?.[1]
//             ?.replace(/,/g, '')
//             ?.trim() || '';


//     const expectedAdjustment =
//         Number(
//             invoiceData.adjustmentAmount ?? 0
//         ).toFixed(2);


//     await Verify.equals(
//         this.page,
//         'Verify Adjustment',
//         expectedAdjustment,
//         Number(actualAdjustment || 0).toFixed(2),
//         {
//             soft: false
//         }
//     );

//     // =========================================================
//     // CLOSE INVOICE PDF
//     // =========================================================

//     await StepHelper.step(
//     this.page,
//     'Close Invoice PDF Preview',
//     async () => {

//         const closeButton =
//             this.locator.pdfCloseButton;

//         await closeButton.waitFor({
//             state: 'attached',
//             timeout: 30000
//         });

//         await closeButton.click({
//             timeout: 30000
//         });
//     }    
// );
// }

async IPDVerifyInvoicePDF(
    patientName,
    patientData,
    invoiceData,
    summaryAmount
) {

    const invoiceNumber =
        this.currentInvoiceNumber;

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

            await this.locator.invoicePdfPreview.waitFor({
                state: 'visible',
                timeout: 30000
            });

            await this.locator.pdfTextLayer.waitFor({
                state: 'visible',
                timeout: 30000
            });
        }
    );


    // =========================================================
    // GET PDF TEXT
    // =========================================================

    const pdfText =
        await this.locator.pdfTextLayer.innerText();


    // =========================================================
    // BILL NUMBER
    // =========================================================

    const actualBillNumber =
        pdfText.match(
            /Bill No\s*:\s*([A-Z0-9-]+)/i
        )?.[1]?.trim() || '';

    const expectedBillNumber =
        invoiceNumber.replace(/^#/, '');

    await StepHelper.step(
        this.page,
        `Verify Bill Number | Expected: ${expectedBillNumber} | Actual: ${actualBillNumber}`,
        async () => {

            await Verify.equals(
                this.page,
                'Bill Number',
                expectedBillNumber,
                actualBillNumber,
                {
                    soft: false
                }
            );
        }
    );


    // =========================================================
    // PATIENT NAME - BILL TO
    // =========================================================

    const actualPatientName =
        pdfText.match(
            /Bill To\s*:\s*(.+?)(?=\s+Age\s*:)/i
        )?.[1]?.trim() || '';

    const expectedPatientName =
        patientName;

    await StepHelper.step(
        this.page,
        `Verify Patient Name | Expected: ${expectedPatientName} | Actual: ${actualPatientName}`,
        async () => {

            await Verify.equals(
                this.page,
                'Patient Name',
                expectedPatientName,
                actualPatientName,
                {
                    soft: false
                }
            );
        }
    );


    // =========================================================
    // AGE
    // =========================================================

    const actualAge =
        pdfText.match(
            /Age\s*:\s*(\d+)/i
        )?.[1]?.trim() || '';

    const expectedAge =
        patientData.age;

    await StepHelper.step(
        this.page,
        `Verify Age | Expected: ${expectedAge} | Actual: ${actualAge}`,
        async () => {

            await Verify.equals(
                this.page,
                'Age',
                expectedAge,
                actualAge,
                {
                    soft: false
                }
            );
        }
    );


    // =========================================================
    // GENDER
    // =========================================================

    const actualGender =
        pdfText.match(
            /Gender\s*:\s*([A-Za-z]+)/i
        )?.[1]?.trim() || '';

    const expectedGender =
        patientData.gender;

    await StepHelper.step(
        this.page,
        `Verify Gender | Expected: ${expectedGender} | Actual: ${actualGender}`,
        async () => {

            await Verify.equalsIgnoreCase(
                this.page,
                'Gender',
                expectedGender,
                actualGender,
                {
                    soft: false
                }
            );
        }
    );


    // =========================================================
    // PDF BALANCE
    // =========================================================

    const balanceMatch =
        pdfText.match(
            /Balance\s*:\s*([\d,]+(?:\.\d{1,2})?)/i
        );

    const actualBalanceAmount =
        balanceMatch
            ? parseFloat(
                balanceMatch[1].replace(/,/g, '')
            )
            : NaN;

    const expectedBalanceAmount =
        Number(summaryAmount).toFixed(2);

    const actualBalance =
        Number(actualBalanceAmount).toFixed(2);

    console.log(
        'Expected - UI Invoice Amount:',
        expectedBalanceAmount
    );

    console.log(
        'Actual - PDF Balance:',
        actualBalance
    );

    await StepHelper.step(
        this.page,
        `Verify Invoice Amount vs PDF Balance | Expected: ${expectedBalanceAmount} | Actual: ${actualBalance}`,
        async () => {

            await Verify.equals(
                this.page,
                'Invoice Amount vs PDF Balance',
                expectedBalanceAmount,
                actualBalance,
                {
                    soft: false
                }
            );
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

    const actualAdjustmentAmount =
        Number(
            actualAdjustment || 0
        ).toFixed(2);

    await StepHelper.step(
        this.page,
        `Verify Adjustment | Expected: ${expectedAdjustment} | Actual: ${actualAdjustmentAmount}`,
        async () => {

            await Verify.equals(
                this.page,
                'Adjustment',
                expectedAdjustment,
                actualAdjustmentAmount,
                {
                    soft: false
                }
            );
        }
    );


    // =========================================================
    // CLOSE INVOICE PDF
    // =========================================================

    await StepHelper.step(
        this.page,
        'Close Invoice PDF Preview',
        async () => {

            await this.locator.pdfCloseButton.waitFor({
                state: 'visible',
                timeout: 30000
            });

            await this.locator.pdfCloseButton.click();
        }
    );
}//update

async IPDInvoicePayment(patientName,admissionDate) {

    await this.openAdmission();

    await this.selectAllPatients();

    await this.selectAdmissionDate(
        admissionDate
    );//update 

    await this.searchPatient(
        patientName
    );

    await this.selectPatient(
    patientName
    );

    await this.openInvoice();
}

async IPDAdmissionDetails(patientName,admissionDate) {
 
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
}
 
async IPDAdmissionDetailsSummary(IPDAdmissionDetailsSummary) {
 
    await StepHelper.step(
        this.page,
        `Click Change Bed`,
        async () => {
            await this.keywords.click(
                this.locator.changeBedBtn
            );
        }
    );
 
    await StepHelper.step(
        this.page,
        `Select Room Type - ${IPDAdmissionDetailsSummary.roomType}`,
        async () => {
            await this.keywords.click(
                this.locator.roomCategoriesDropdown
            );
 
            await this.keywords.click(
                this.locator.roomTypeOption(
                    IPDAdmissionDetailsSummary.roomType
                )
            );
        }
    );
 
    await StepHelper.step(
        this.page,
        `Select Room Number - ${IPDAdmissionDetailsSummary.roomNumber}`,
        async () => {
            await this.keywords.click(
                this.locator.roomNumberDropdown
            );
 
            await this.keywords.click(
                this.locator.roomNumberOption(
                    IPDAdmissionDetailsSummary.roomNumber
                )
            );
        }
    );
 
    await StepHelper.step(
        this.page,
        `Select Bed - ${IPDAdmissionDetailsSummary.bed}`,
        async () => {
            // await this.keywords.click(
            //     this.locator.bedDropdown
            // );
 
            // await this.keywords.click(
            //     this.locator.bedOption(
            //         IPDAdmissionDetailsSummary.bed
            //     )
            // );
            await this.keywords.click(this.locator.bedDropdown);
 
            await this.locator.bedOption(
                IPDAdmissionDetailsSummary.bed
            ).waitFor({ state: 'visible' });
 
            await this.keywords.click(
                this.locator.bedOption(
                    IPDAdmissionDetailsSummary.bed
                )
            );
        }
    );
 
 
//     await StepHelper.step(
//     this.page,
//     `Select Bed - ${IPDAdmissionDetailsSummary.bed}`,
//     async () => {
 
//         await this.keywords.click(
//             this.locator.bedDropdown
//         );
 
//         await this.keywords.click(
//             this.locator.bedOption(
//                 IPDAdmissionDetailsSummary.bed
//             )
//         );
//     }
// );
 
    await StepHelper.step(
        this.page,
        `Save Bed Details`,
        async () => {
            await this.keywords.click(
                this.locator.saveBtn
            );
        }
    );
 
   
 
    // await Verify.state(
    //     this.page,
    //     `Verify Bed Updated Successfully`,
    //     this.locator.bedUpdatedToast,
    //     {
    //         visible: true,
    //         soft: false
    //     }
    // );

    await StepHelper.step(
    this.page,
    `Verify Bed Updated Successfully`,
    async () => {
        await expect(
            this.locator.bedUpdatedToast
        ).toBeVisible();
    }
    );
 
    // await Verify.equals(
    //     this.page,
    //     `Verify Room Type - ${IPDAdmissionDetailsSummary.roomType}`,
    //     IPDAdmissionDetailsSummary.roomType,
    //     await this.locator.roomTypeSummary.innerText(),
    //     {
    //         soft: false
    //     }
    // );

    await this.locator.roomTypeSummary.waitFor({
    state: 'visible'
    });

    await Verify.equals(
    this.page,
    `Verify Room Type - ${IPDAdmissionDetailsSummary.roomType}`,
    IPDAdmissionDetailsSummary.roomType,
    await this.locator.roomTypeSummary.innerText(),
    {
        soft: false
    }
);
 
    // await Verify.equals(
    //     this.page,
    //     `Verify Admitted Bed - ${IPDAdmissionDetailsSummary.bed}`,
    //     IPDAdmissionDetailsSummary.bed,
    //     await this.locator.admittedSummary.innerText(),
    //     {
    //         soft: false
    //     }
    // );
 
}
}


module.exports = { IPDPage };
