const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { InvoiceLocator } = require('../Locators/InvoiceLocator');
const { Keywords } = require('../utils/Keywords');
const { invoiceData } = require('../testdata/invoiceData.json');
const visitingSlipData = require('../testdata/visitingSlip.json');

class InvoicePage {

    constructor(page) {
        this.page = page;
        this.locator = new InvoiceLocator(page);
        this.keywords = new Keywords();
    }

    async selectInvoiceServices() {

        await StepHelper.step(
            this.page,
            'Select Service',
            async () => {
                await this.keywords.click(
                    this.locator.serviceCheckbox
                );
            }
        );

        // await StepHelper.step(
        //     this.page,
        //     'Select first Service',
        //     async () => {
        //         await this.keywords.check(
        //             this.locator.serviceCheckbox1
        //         );
        //     }
        // );

        // await StepHelper.step(
        //     this.page,
        //     'Select Second Service',
        //     async () => {
        //         await this.keywords.check(
        //             this.locator.serviceCheckbox2
        //         );
        //     }
        // );
    }


    async addAdjustment(
        amount,
        adjustmentName,
        reason
    ) {

        await StepHelper.step(
            this.page,
            'Click Add Adjustment',
            async () => {
                await this.keywords.click(
                    this.locator.addAdjustmentBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Amount - ${amount}`,
            async () => {
                await this.keywords.fill(
                    this.locator.amountTxt,
                    amount
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Name - ${adjustmentName}`,
            async () => {
                await this.keywords.fill(
                    this.locator.adjustmentNameTxt,
                    adjustmentName
                );
            }
        );

        await StepHelper.step(
            this.page,
            `Enter Adjustment Reason - ${reason}`,
            async () => {
                await this.keywords.fill(
                    this.locator.reasonTxt,
                    reason
                );
            }
        );
    }

    async Adjustmentaddadmission(
    amount,
    adjustmentName,
    reason
) {
    await StepHelper.step(
        this.page,
        'Click Add Adjustment',
        async () => {
            await this.keywords.click(
                this.locator.adjustmentaddadmissionBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Adjustment Amount - ${amount}`,
        async () => {
            await this.keywords.fill(
                this.locator.adjustmentaddadmissionAmountTxt,
                amount
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Add Another Adjustment',
        async () => {
            await this.keywords.click(
                this.locator.adjustmentaddadmissionAddAnotherBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Adjustment Name - ${adjustmentName}`,
        async () => {
            await this.keywords.fill(
                this.locator.adjustmentaddadmissionDescriptionTxt,
                adjustmentName
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Adjustment Reason - ${reason}`,
        async () => {
            await this.keywords.fill(
                this.locator.adjustmentaddadmissionReasonTxt,
                reason
            );
        }
    );
}


    async clickGenerateInvoice() {

        await StepHelper.step(
            this.page,
            'Open Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.generateInvoiceLink
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Click Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );
    }

    async verifyInvoiceTotalAfterAdjustment(
    invoiceData
) {

    let summaryValue;
    let summaryAmount;
    let expectedTotal;
    let actualTotal;


    // Get Summary Value
    await StepHelper.step(
        this.page,
        'Get Summary Value',
        async () => {

            summaryValue =
                (
                    await this.keywords.getText(
                        this.locator.summaryValue
                    )
                ).trim();

            console.log(
                `Summary Value: ${summaryValue}`
            );
        }
    );


    // Calculate Expected Invoice Total
    await StepHelper.step(
        this.page,
        'Calculate Expected Invoice Total',
        async () => {

            summaryAmount =
                parseFloat(
                    summaryValue.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            const adjustmentAmount =
                parseFloat(
                    invoiceData.adjustmentAmount
                );

            expectedTotal =
                summaryAmount + adjustmentAmount;

            console.log(
                `Summary Amount: ${summaryAmount}`
            );

            console.log(
                `Adjustment Amount: ${adjustmentAmount}`
            );

            console.log(
                `Expected Total: ${expectedTotal.toFixed(2)}`
            );
        }
    );


    // Get Actual Invoice Total
    await StepHelper.step(
        this.page,
        'Get Invoice Total',
        async () => {

            actualTotal =
                (
                    await this.keywords.getText(
                        this.locator.invoiceTotal
                    )
                ).trim();

            console.log(
                `Actual Invoice Total: ${actualTotal}`
            );
        }
    );


    // Verify Invoice Total
    await StepHelper.step(
        this.page,
        `Verify Invoice Total | Expected: ₹${expectedTotal.toFixed(2)} | Actual: ${actualTotal}`,
        async () => {

            const actualAmount =
                parseFloat(
                    actualTotal.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            expect(actualAmount).toBe(
                expectedTotal
            );
        }
    );


    return summaryAmount;
}



async verifyPaymentSection() {

    let invoiceNumber;
    let paymentDue;
    let paidAmount;
    let totalAmount;


    // Get Invoice Number

    await StepHelper.step(
        this.page,
        'Get Invoice Number',
        async () => {

            invoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.appointmentInvoiceNumber
                    )
                ).trim();

            console.log(
                `Invoice Number: ${invoiceNumber}`
            );
        }
    );


    // Verify Invoice Number

    await StepHelper.step(
        this.page,
        `Verify Invoice Number Starts With INV | Actual: ${invoiceNumber}`,
        async () => {

            expect(invoiceNumber).toMatch(/^INV-/);
        }
    );


    // Verify Send Invoice

    await StepHelper.step(
        this.page,
        'Verify Send Invoice',
        async () => {

            const sendInvoiceText =
                (
                    await this.keywords.getText(
                        this.locator.appointmentSendInvoice
                    )
                ).trim();

            expect(sendInvoiceText).toBe(
                'Send invoice'
            );
        }
    );


    // Get Payment Due

    await StepHelper.step(
        this.page,
        'Get Payment Due',
        async () => {

            paymentDue =
                (
                    await this.keywords.getText(
                        this.locator.appointmentPaymentDue
                    )
                ).trim();

            console.log(
                `Payment Due: ${paymentDue}`
            );
        }
    );


    // Verify Payment Due

    await StepHelper.step(
        this.page,
        `Verify Payment Due | Actual: ${paymentDue}`,
        async () => {

            expect(paymentDue).not.toBe('');
        }
    );


    // Get Paid Amount

    await StepHelper.step(
        this.page,
        'Get Paid Amount',
        async () => {

            paidAmount =
                (
                    await this.keywords.getText(
                        this.locator.appointmentPaidAmount
                    )
                ).trim();

            console.log(
                `Paid Amount: ${paidAmount}`
            );
        }
    );


    // Verify Paid Amount

    await StepHelper.step(
        this.page,
        `Verify Paid Amount | Actual: ${paidAmount}`,
        async () => {

            expect(paidAmount).not.toBe('');
        }
    );


    // Get Total Amount

    await StepHelper.step(
        this.page,
        'Get Total Amount',
        async () => {

            totalAmount =
                (
                    await this.keywords.getText(
                        this.locator.appointmentTotalAmount
                    )
                ).trim();

            console.log(
                `Total Amount: ${totalAmount}`
            );
        }
    );


    // Verify Total Amount

    await StepHelper.step(
        this.page,
        `Verify Total Amount | Actual: ${totalAmount}`,
        async () => {

            expect(totalAmount).not.toBe('');
        }
    );
}

    async openAndVerifyInvoicePDF(
    patientName,
    patientData,
    invoiceData,
    summaryAmount
) {

    let invoiceNumber;

    // ==========================================
    // 1. Get Generated Invoice Number
    // ==========================================

    await StepHelper.step(
        this.page,
        'Get Generated Invoice Number',
        async () => {

            invoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.invoiceNumber
                    )
                ).trim();

            console.log(
                `Invoice Number: ${invoiceNumber}`
            );

            expect(invoiceNumber).not.toBe('');
        }
    );

    // ==========================================
    // 2. Open Invoice PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        `Open Invoice PDF - ${invoiceNumber}`,
        async () => {

            await this.keywords.click(
                this.locator.invoiceNumber
            );
        }
    );

    // ==========================================
    // 3. Wait for PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        'Wait for Invoice PDF to Load',
        async () => {

            await this.keywords.waitForElement(
                this.locator.closePdfPreviewBtn,
                30000
            );
        }
    );

    // ==========================================
    // 4. Verify Invoice PDF Details
    // ==========================================

    await StepHelper.step(
        this.page,
        'Verify Invoice PDF Patient Details',
        async () => {

            const pdf =
                this.locator.pdfBody;

            // const text =
            //     await pdf.innerText();

            // console.log(
            //     `PDF Content: ${text}`
            // );

            // ==========================================
            // Invoice Number
            // ==========================================

            const actualInvoiceNumber =
                (
                    await this.keywords.getText(
                        this.locator.invoiceNumberPdf
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Invoice Number | Expected: ${invoiceNumber} | Actual: ${actualInvoiceNumber}`,
                async () => {

                    expect(
                        actualInvoiceNumber
                    ).toBe(invoiceNumber);
                }
            );

            // ==========================================
            // Patient Name
            // ==========================================

            const actualPatientName =
                (
                    await this.keywords.getText(
                        this.locator.patientNamePdf
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Patient Name | Expected: ${patientName} | Actual: ${actualPatientName}`,
                async () => {

                    expect(
                        actualPatientName
                    ).toContain(patientName);
                }
            );

            // ==========================================
            // Age
            // ==========================================

            const expectedAge =
                `Age : ${patientData.age}`;

            const actualAge =
                (
                    await this.keywords.getText(
                        this.locator.agePdf(
                            patientData.age
                        )
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Age | Expected: ${expectedAge} | Actual: ${actualAge}`,
                async () => {

                    expect(actualAge).toBe(
                        expectedAge
                    );
                }
            );

            // ==========================================
            // Gender
            // ==========================================

            const expectedGender =
                `Gender : ${patientData.gender}`;

            const actualGender =
                (
                    await this.keywords.getText(
                        this.locator.genderPdf(
                            patientData.gender
                        )
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Gender | Expected: ${expectedGender} | Actual: ${actualGender}`,
                async () => {

                    expect(actualGender).toBe(
                        expectedGender
                    );
                }
            );

            // ==========================================
            // Amount Calculation
            // ==========================================

            const subTotal =
                parseFloat(summaryAmount);

            const discount =
                parseFloat(
                    invoiceData.adjustmentAmount
                );

            const expectedTotal =
                subTotal + discount;

            // ==========================================
            // Sub Total
            // ==========================================

            const expectedSubTotal =
                `Sub Total : ${subTotal.toFixed(2)}`;

            const actualSubTotal =
                (
                    await this.keywords.getText(
                        this.locator.subTotalPdf(
                            subTotal
                        )
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Sub Total | Expected: ${expectedSubTotal} | Actual: ${actualSubTotal}`,
                async () => {

                    expect(actualSubTotal).toBe(
                        expectedSubTotal
                    );
                }
            );

// ==========================================
// Discount / Adjustment
// ==========================================

const expectedDiscount =
    `Discount : ${discount.toFixed(2)}`;

const expectedAdjustment =
    `Adjustment : ${discount.toFixed(2)}`;

const discountLocator =
    this.locator.discountPdf(discount);

const adjustmentLocator =
    this.locator.adjustmentPdf(discount);

let actualDiscount = '';
let actualAdjustment = '';

const discountCount =
    await discountLocator.count();

const adjustmentCount =
    await adjustmentLocator.count();

if (discountCount > 0) {

    actualDiscount =
        (
            await this.keywords.getText(
                discountLocator
            )
        ).trim();

    await StepHelper.step(
        this.page,
        `Verify Discount | Expected: ${expectedDiscount} | Actual: ${actualDiscount}`,
        async () => {

            expect(actualDiscount).toBe(
                expectedDiscount
            );
        }
    );

} else if (adjustmentCount > 0) {

    actualAdjustment =
        (
            await this.keywords.getText(
                adjustmentLocator
            )
        ).trim();

    await StepHelper.step(
        this.page,
        `Verify Adjustment | Expected: ${expectedAdjustment} | Actual: ${actualAdjustment}`,
        async () => {

            expect(actualAdjustment).toBe(
                expectedAdjustment
            );
        }
    );

} else {

    throw new Error(
        `Neither Discount nor Adjustment was found in Invoice PDF. ` +
        `Expected either "${expectedDiscount}" or "${expectedAdjustment}".`
    );
}

            // ==========================================
            // Total
            // ==========================================

            const expectedTotalText =
                `Total : ${expectedTotal.toFixed(2)}`;

            const actualTotalText =
                (
                    await this.keywords.getText(
                        this.locator.totalPdf(
                            expectedTotal
                        )
                    )
                ).trim();

            await StepHelper.step(
                this.page,
                `Verify Total | Expected: ${expectedTotalText} | Actual: ${actualTotalText}`,
                async () => {

                    expect(actualTotalText).toBe(
                        expectedTotalText
                    );
                }
            );
        }
    );

    // ==========================================
    // 5. Close PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        'Close Invoice PDF Preview',
        async () => {

            await this.keywords.click(
                this.locator.closePdfPreviewBtn
            );
        }
    );
}
            async InvoiceDetailsAddAdmission() {

            let invoiceNumber;
            let totalAmount;

            await StepHelper.step(
                this.page,
                'Get Generated Invoice Number',
                async () => {

                    invoiceNumber = (
                        await this.keywords.getText(
                            this.locator.invoiceNumberCell
                        )
                    ).trim();

                    console.log(
                        `Invoice Number: ${invoiceNumber}`
                    );

                    expect(invoiceNumber).toContain('INV-');
                }
            );

            await StepHelper.step(
                this.page,
                'Get Invoice Total Amount',
                async () => {

                    totalAmount = (
                        await this.keywords.getText(
                            this.locator.invoiceTotalAmountCell
                        )
                    ).trim();

                    console.log(
                        `Total Amount: ${totalAmount}`
                    );
                }
            );

            await StepHelper.step(
                this.page,
                `Verify Invoice Number | ${invoiceNumber}`,
                async () => {

                    await expect(
                        this.locator.invoiceNumberCell
                    ).toBeVisible();

                    await expect(
                        this.locator.invoiceNumberCell
                    ).toHaveText(invoiceNumber);
                }
            );

            await StepHelper.step(
                this.page,
                'Open Invoice Preview',
                async () => {

                    await this.keywords.click(
                        this.locator.viewInvoiceBtn
                    );
                }
            );

            return {
                invoiceNumber,
                totalAmount
            };
            
        }

async InvoicePDFAddAdmission(
    invoiceNumber,
    totalAmount,
    patientName,
    patientData,
    invoiceData
) {

    // ==========================================
    // Wait for Invoice PDF
    // ==========================================

    await StepHelper.step(
        this.page,
        'Wait for Invoice PDF to Load',
        async () => {

            await this.keywords.waitForElement(
                this.locator.closePdfPreviewBtn,
                30000
            );
        }
    );


    // ==========================================
    // Verify Bill Number
    // ==========================================

    const billText =
        (
            await this.locator.pdfBillNumber.textContent()
        )
            .replace(/\s+/g, ' ')
            .trim();

    const actualBillNumber =
        billText
            .match(/Bill\s*No\s*:\s*(INV-\d+)/i)?.[1];

    await StepHelper.step(
        this.page,
        `Verify Bill Number | Expected: ${invoiceNumber} | Actual: ${actualBillNumber}`,
        async () => {

            expect(actualBillNumber).toBe(
                invoiceNumber
            );
        }
    );

    // ==========================================
    // Verify Patient Name
    // ==========================================

    let actualPatientName = '';

    await StepHelper.step(
        this.page,
        'Get Patient Name From Invoice PDF',
        async () => {

            const billToText =
                (
                    await this.locator.pdfPatientName.textContent()
                )
                    ?.replace(/\s+/g, ' ')
                    .trim();

            console.log(
                `Bill To Text: ${billToText}`
            );

            const match =
                billToText?.match(
                    /Bill\s*To\s*:\s*(.*)$/i
                );

            if (!match) {
                throw new Error(
                    `Unable to extract patient name from PDF. Text: ${billToText}`
                );
            }

            actualPatientName =
                match[1].trim();

            console.log(
                `Patient Name From PDF: ${actualPatientName}`
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Verify Patient Name | Expected: ${patientName} | Actual: ${actualPatientName}`,
        async () => {

            expect(actualPatientName).toContain(
                patientName
            );
        }
    );

    // ==========================================
    // Verify Age
    // ==========================================

    const ageText =
        (
            await this.locator.pdfAge.textContent()
        )
            .replace(/\s+/g, ' ')
            .trim();

    const actualAge =
        ageText
            .match(/Age\s*:\s*(\d+)/i)?.[1];

    const expectedAge =
        String(patientData.age);

    await StepHelper.step(
        this.page,
        `Verify Age | Expected: ${expectedAge} | Actual: ${actualAge}`,
        async () => {

            expect(actualAge).toBe(
                expectedAge
            );
        }
    );


    // ==========================================
    // Verify Gender
    // ==========================================

    const genderText =
        (
            await this.locator.pdfGender.textContent()
        )
            .replace(/\s+/g, ' ')
            .trim();

    const actualGender =
        genderText
            .match(/Gender\s*:\s*([A-Za-z]+)/i)?.[1];

    const expectedGender =
        patientData.gender;

    await StepHelper.step(
        this.page,
        `Verify Gender | Expected: ${expectedGender} | Actual: ${actualGender}`,
        async () => {

            expect(actualGender).toBe(
                expectedGender
            );
        }
    );


    // ==========================================
    // Verify Discount
    // ==========================================

    const discountText =
        (
            await this.locator.pdfDiscount.textContent()
        )
            .replace(/\s+/g, ' ')
            .trim();

    const actualDiscount =
        discountText
            .match(/Discount\s*:\s*([\d.]+)/i)?.[1];

    const expectedDiscount =
        parseFloat(
            invoiceData.adjustmentAmount
        ).toFixed(2);

    await StepHelper.step(
        this.page,
        `Verify Discount | Expected: ${expectedDiscount} | Actual: ${actualDiscount}`,
        async () => {

            expect(actualDiscount).toBe(
                expectedDiscount
            );
        }
    );

    // ==========================================
    // Verify Total Amount
    // ==========================================


    const actualTotal =
        (
            await this.locator.pdfTotalAmount.textContent()
        )
        .replace(/^Total\s*:\s*/i, '')
        .trim();

    const expectedTotal =
        parseFloat(totalAmount).toFixed(2);

    await StepHelper.step(
        this.page,
        `Verify Total Amount | Expected: ${expectedTotal} | Actual: ${actualTotal}`,
        async () => {

            expect(actualTotal).toBe(
                expectedTotal
            );
        }
    );

    // ==========================================
    // Close PDF
    // ==========================================

        await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );
    }
        
    async Financials() {

        await StepHelper.step(
            this.page,
            'Open Financials Tab',
            async () => {
                await this.keywords.click(
                    this.locator.financials
                );
            }
        );
    }

    async invoiceGenerate() {

        await StepHelper.step(
                this.page,
                'Click Invoice Generate Button',
                async () => {

                await this.keywords.click(
                    this.locator.invoiceGenerateButton
                );
            }
        );
    }

    async verifyAppointmentStatus(

     appoinmentData

    ) {

        await StepHelper.step(

            this.page,

            'Update Appointment Status to Check-In',

            async () => {

                // Click on Confirmed status dropdown

                await this.keywords.click(

                    this.locator.confirmedStatus

                );
 
 
                await expect(

                    this.locator.checkInStatus

                ).toBeVisible();
 
 
                // Click on Check-In option

                await this.keywords.click(

                    this.locator.checkInStatus

                );
 
 
                await expect(

                    this.locator.checkedInStatus

                ).toBeVisible();
 
 
                console.log(

                    'Checked-In status has been verified'

                );

            }

        );
 
 
        await StepHelper.step(

            this.page,

            'Open Status Dropdown From Checked-In',

            async () => {

                await this.keywords.click(

                    this.locator.checkedInStatus

                );
 
 
                await expect(

                    this.locator.completedStatus

                ).toBeVisible();
 
 
                await expect(

                    this.locator.confirmedStatus

                ).toBeVisible();

            }

        );
 
 
        const confirmedStatusIsActionable = await this.isActionable(

            this.locator.confirmedStatus,

            2000,

            'Check Confirmed Status Actionability'

        );
 
 
        await StepHelper.step(

            this.page,

            `Verify Confirmed Status Is Frozen | Expected: not actionable | Actual: ${confirmedStatusIsActionable ? 'actionable' : 'not actionable'}`,

            async () => {

                expect(confirmedStatusIsActionable).toBe(false);

            }

        );
 
 
        const completedStatusIsActionable = await this.isActionable(

            this.locator.completedStatus,

            2000,

            'Check Completed Status Actionability'

        );
 
 
        await StepHelper.step(

            this.page,

            `Verify Completed Status Is Enabled | Expected: actionable | Actual: ${completedStatusIsActionable ? 'actionable' : 'not actionable'}`,

            async () => {

                expect(completedStatusIsActionable).toBe(true);

            }

        );

    }
 

    async verifyVisitingSlip(patientName, doctorName) {
    await StepHelper.step(
        this.page,
        'Verify and Click Visiting Slip',
        async () => {
            // Verify Visiting Slip is visible
            await expect(
                this.locator.visitingSlip
            ).toContainText('Visiting Slip');
            console.log(
                'Visiting Slip verified and visible'
            );
            // Click on Visiting Slip
            await this.keywords.click(
                this.locator.visitingSlip
            );
            // Wait for 10 seconds
            await this.keywords.wait(
                this.page,
                20000
            );
        });
}

async verifyVisitingSlip(patientName, doctorName) {
    await StepHelper.step(
        this.page,
        'Verify and Click Visiting Slip',
        async () => {
            // Verify Visiting Slip is visible
            await expect(
                this.locator.visitingSlip
            ).toContainText('Visiting Slip');

            console.log('Visiting Slip verified and visible');

            // Click on Visiting Slip
            await this.keywords.click(
                this.locator.visitingSlip
            );

            // Wait for 20 seconds
            await this.keywords.wait(
                this.page,
                20000
            );
        }
    );
}

async verifyVisitingSlipContent(
    doctorName,
    patientName,
    appointmentTime,
    arrivalTime,
    appointmentDate
) {
    const constants = visitingSlipData.visitingSlip;
    const visitingSlip = this.page.getByLabel(/Page.*1/);

    await this.keywords.waitForElement(
        visitingSlip,
        30000
    );

    const actualPdfText = (
        await visitingSlip.textContent()
    ).replace(/\s+/g, ' ').trim();

    // Read stored JSON data
    const fs = require('fs');
    const path = require('path');

    const runtimeDataPath = path.join(
        __dirname,
        '../testdata/runtimeData.json'
    );

    let runtimeJsonData = {};

    if (fs.existsSync(runtimeDataPath)) {
        try {
            runtimeJsonData = JSON.parse(
                fs.readFileSync(runtimeDataPath, 'utf8')
            );
        } catch (err) {
            console.error(
                'Failed to parse runtimeData.json',
                err
            );
        }
    }

    // Helper to extract actual value between markers
    const extractActualValue = (
        text,
        startLabel,
        endLabel
    ) => {
        const startIdx = text.indexOf(startLabel);

        if (startIdx === -1) {
            return '';
        }

        if (!endLabel) {
            return text.substring(startIdx).trim();
        }

        const endIdx = text.indexOf(
            endLabel,
            startIdx + startLabel.length
        );

        if (endIdx === -1) {
            return text.substring(startIdx).trim();
        }

        return text
            .substring(startIdx, endIdx)
            .trim();
    };

    const fieldsToVerify = [];

    // 1. Visitor to See Doctor
    const docNameExpected =
        doctorName ||
        (runtimeJsonData && runtimeJsonData.doctorName);

    fieldsToVerify.push({
        name: 'Visitor to see Doctor',
        expected: docNameExpected
            ? `${constants.visitorToSee} ${docNameExpected}`
            : constants.visitorToSee,
        actual: extractActualValue(
            actualPdfText,
            constants.visitorToSee,
            constants.comfortableMessage
        ),
        storedVal:
            runtimeJsonData &&
            runtimeJsonData.doctorName
    });

    // 2. Comfortable Message
    fieldsToVerify.push({
        name: 'Comfortable Message',
        expected: constants.comfortableMessage,
        actual: extractActualValue(
            actualPdfText,
            constants.comfortableMessage,
            constants.nameLabel
        )
    });

    // 3. Patient Name
    const patNameExpected =
        patientName ||
        (runtimeJsonData && runtimeJsonData.patientName);

    fieldsToVerify.push({
        name: 'Patient Name',
        expected: patNameExpected
            ? `${constants.nameLabel} ${patNameExpected}`
            : constants.nameLabel,
        actual: extractActualValue(
            actualPdfText,
            constants.nameLabel,
            constants.timeLabel
        ),
        storedVal:
            runtimeJsonData &&
            runtimeJsonData.patientName
    });

    // 4. Appointment Time
    const nextMarkerAfterTime = arrivalTime
        ? constants.arrivalLabel
        : constants.dateLabel;

    if (appointmentTime) {
        fieldsToVerify.push({
            name: 'Appointment Time',
            expected: `${constants.timeLabel} ${constants.appointmentLabel} ${appointmentTime}`,
            actual: extractActualValue(
                actualPdfText,
                constants.timeLabel,
                nextMarkerAfterTime
            )
        });
    } else {
        fieldsToVerify.push({
            name: 'Appointment Time',
            expected: `${constants.timeLabel} ${constants.appointmentLabel}`,
            actual: extractActualValue(
                actualPdfText,
                constants.timeLabel,
                nextMarkerAfterTime
            )
        });
    }

    // 5. Arrival Time
    if (arrivalTime) {
        fieldsToVerify.push({
            name: 'Arrival Time',
            expected: `${constants.arrivalLabel} ${arrivalTime}`,
            actual: extractActualValue(
                actualPdfText,
                constants.arrivalLabel,
                constants.dateLabel
            )
        });
    } else {
        fieldsToVerify.push({
            name: 'Arrival Time',
            expected: constants.arrivalLabel,
            actual: extractActualValue(
                actualPdfText,
                constants.arrivalLabel,
                constants.dateLabel
            )
        });
    }

    // 6. Appointment Date
    const appDateExpected =
        appointmentDate ||
        (runtimeJsonData &&
            runtimeJsonData.calendarDate);

    fieldsToVerify.push({
        name: 'Appointment Date',
        expected: appDateExpected
            ? `${constants.dateLabel} ${appDateExpected}`
            : constants.dateLabel,
        actual: extractActualValue(
            actualPdfText,
            constants.dateLabel,
            constants.poweredBy
        ),
        isDate: true,
        storedVal:
            runtimeJsonData &&
            runtimeJsonData.calendarDate
    });

    // 7. Powered By
    fieldsToVerify.push({
        name: 'Powered By',
        expected: constants.poweredBy,
        actual: extractActualValue(
            actualPdfText,
            constants.poweredBy,
            null
        )
    });

    // Run verification
    for (const field of fieldsToVerify) {
        const normalizedExpected =
            field.expected
                .replace(/\s+/g, ' ')
                .trim();

        const normalizedActual =
            field.actual
                .replace(/\s+/g, ' ')
                .trim();

        console.log(
            `Expected Result = '${normalizedExpected}' | Actual Result = '${normalizedActual}'`
        );

        await StepHelper.step(
            this.page,
            `Verify Visiting Slip: ${field.name} | Expected Result = '${normalizedExpected}' | Actual Result = '${normalizedActual}'`,
            async () => {
                if (field.isDate) {
                    // Check date label
                    expect(normalizedActual).toContain(
                        constants.dateLabel
                    );

                    // Check passed appointment date
                    if (appointmentDate) {
                        const matchDate =
                            appointmentDate.match(/\d+/);

                        if (matchDate) {
                            expect(
                                normalizedActual
                            ).toContain(matchDate[0]);
                        }
                    }

                    // Check stored JSON date
                    if (field.storedVal) {
                        const matchJsonDate =
                            field.storedVal.match(/\d+/);

                        if (matchJsonDate) {
                            expect(
                                normalizedActual
                            ).toContain(matchJsonDate[0]);
                        }
                    }
                } else {
                    // Check expected value
                    expect(normalizedActual).toContain(
                        normalizedExpected
                    );

                    // Check stored JSON patient name
                    if (
                        field.name === 'Patient Name' &&
                        field.storedVal
                    ) {
                        expect(
                            normalizedActual
                        ).toContain(field.storedVal);
                    }

                    // Check stored JSON doctor name
                    if (
                        field.name === 'Visitor to see Doctor' &&
                        field.storedVal
                    ) {
                        expect(
                            normalizedActual
                        ).toContain(field.storedVal);
                    }

                }
            }
        );
    }

    await StepHelper.step(
            this.page,
            'Close Invoice PDF Preview',
            async () => {

                await this.keywords.click(
                    this.locator.closePdfPreviewBtn
                );
            }
        );

    console.log(
        'Visiting Slip content verified successfully'
    );
}
  
    async generateInvoice(
        patientName,
        invoiceData
    ) {

        await StepHelper.step(
            this.page,
            'Open Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.generateInvoiceLink
                );
            }
        );

        await this.selectInvoiceServices();

        await this.addAdjustment(
            invoiceData.adjustmentAmount,
            invoiceData.adjustmentName,
            invoiceData.adjustmentReason
        );

        await StepHelper.step(
            this.page,
            'Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );
    }


    async generateInvoiceIPD(
        invoiceData
    ) {
        
        await this.selectInvoiceServices();

        await this.addAdjustment(
            invoiceData.adjustmentAmount,
            invoiceData.adjustmentName,
            invoiceData.adjustmentReason
        );

        await StepHelper.step(
        this.page,
        'Wait for Generate Invoice button',
        async () => {
            await this.locator.EndGenerateInvoiceBtn.waitFor({
                state: 'visible',
                timeout: 120000
            });
        }
    );

        await StepHelper.step(
            this.page,
            'Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.EndGenerateInvoiceBtn
                );
            }
        );
    }


    async generateInvoiceAddAdmission() { 
    
            await this.Financials(); 
    
            await this.invoiceGenerate(); 

            await this.selectInvoiceServices();

            await this.Adjustmentaddadmission(
                invoiceData.adjustmentAmount,
                invoiceData.adjustmentName,
                invoiceData.adjustmentReason
            );

            await StepHelper.step(
                this.page,
                'Generate Invoice',
                async () => {
                    await this.keywords.click(
                        this.locator.finalGenerateInvoiceBtn
                    );
                }
            );
        }

    }


module.exports = { InvoicePage };