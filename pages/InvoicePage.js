const { expect } = require('@playwright/test');
const { StepHelper } = require('../utils/StepHelper');
const { InvoiceLocator } = require('../Locators/InvoiceLocator');
const { Keywords } = require('../utils/Keywords');
<<<<<<< HEAD
// const { invoiceData } = require('../testdata/invoiceData.json');
// const visitingSlipData = require('../testdata/visitingSlip.json');
=======
const { invoiceData } = require('../testdata/invoiceData.json');
const { Verify } = require('../utils/verification');
const { waitData } = require('../testdata/waitData.json');
const visitingSlipData = require('../testdata/visitingSlip.json');
>>>>>>> 22603a3802c8f6f02250a5835f03619a435ed691

class InvoicePage {

    constructor(page) {
        this.page = page;
        this.locator = new InvoiceLocator(page);
        this.keywords = new Keywords();
    }

    async selectInvoiceServices() {

        await StepHelper.step(
        this.page,
        'Wait for Services to Load',
        async () => {

            await expect(
                this.locator.serviceCheckbox.first()
            ).toBeVisible({
                timeout: waitData.slowLoad
            });
        }
    );//update

    await StepHelper.step(
        this.page,
        'Select All Services',
        async () => {

            const count =
                await this.locator.serviceCheckbox.count();

            console.log(`Service Checkbox Count: ${count}`);

            for (let i = 0; i < count; i++) {

                console.log(
                    `Checkbox ${i} visible:`,
                    await this.locator.serviceCheckbox.nth(i).isVisible()
                );

                console.log(
                    `Checkbox ${i} enabled:`,
                    await this.locator.serviceCheckbox.nth(i).isEnabled()
                );

                await this.keywords.click(
                    this.locator.serviceCheckbox.nth(i)
                );
            }
        }
    );

    //     await StepHelper.step(
    //     this.page,
    //     'Select All Checkboxes',
    //     async () => {
    //         const count = await this.locator.serviceCheckbox.count();

    //         for (let i = 0; i < count; i++) {
    //             await this.keywords.click(
    //                 this.locator.serviceCheckbox.nth(i)
    //             );
    //         }
    //     }
    // );

        // await StepHelper.step(
        //     this.page,
        //     'Select Service',
        //     async () => {
        //         await this.keywords.click(
        //             this.locator.serviceCheckbox
        //         );
        //     }
        // );

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

    async selectServices() {


        await StepHelper.step(
            this.page,
            'Select Service',
            async () => {
                await this.keywords.click(
                    this.locator.servicebox
                );
            }
        );

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

async verifyInvoiceTotalAfterAdjustment(invoiceData) {

    let summaryValue;
    let summaryAmount;
    let expectedTotal;
    let actualTotal;
    let paymentDue;
    let paidAmount;

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

    // Verify Invoice Total = Payment Due
    await StepHelper.step(
        this.page,
        `Verify Invoice Total = Payment Due | Invoice Total: ${actualTotal} | Payment Due: ${paymentDue}`,
        async () => {

            const invoiceAmount =
                parseFloat(
                    actualTotal.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            const paymentDueAmount =
                parseFloat(
                    paymentDue.replace(
                        /[₹,\s]/g,
                        ''
                    )
                );

            expect(paymentDueAmount).toBe(
                invoiceAmount
            );

            console.log(
                `Invoice Total: ${invoiceAmount.toFixed(2)}`
            );

            console.log(
                `Payment Due: ${paymentDueAmount.toFixed(2)}`
            );

            console.log(
                `Invoice Total and Payment Due are equal`
            );
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
    `Verify Paid Amount | Expected: ₹${parseFloat(invoiceData.paidAmount).toFixed(2)} | Actual: ${paidAmount}`,
    async () => {

        const actualPaidAmount =
            parseFloat(
                paidAmount.replace(
                    /[₹,\s]/g,
                    ''
                )
            );

        const expectedPaidAmount =
            parseFloat(
                invoiceData.paidAmount
            );

        expect(actualPaidAmount).toBe(
            expectedPaidAmount
        );

        console.log(
            `Expected Paid Amount: ₹${expectedPaidAmount.toFixed(2)}`
        );

        console.log(
            `Actual Paid Amount: ₹${actualPaidAmount.toFixed(2)}`
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

            await this.keywords.waitForElement(
                this.locator.appointmentSendInvoice
            );

            await expect(
                this.locator.appointmentSendInvoice
            ).toBeVisible();
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
            async InvoiceDetailsAddAdmission(invoiceData) {

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

                    // expect(invoiceNumber).toContain('INV-');
                    expect(invoiceNumber).toContain(
                        invoiceData.invoicePrefix
                    );
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

    // Probes whether a control can actually be acted on. Missing previously,
    // which made verifyAppointmentStatus throw a TypeError.
    // The probe duration comes from waitData, not from this method.
    async isActionable(
        locator,
        timeout = waitData.actionableProbe,
        stepName = 'Check Element Actionability'
    ) {

        let actionable = false;

        await StepHelper.step(
            this.page,
            stepName,
            async () => {

                try {

                    await locator.waitFor({
                        state: 'visible',
                        timeout
                    });

                    // A trial click runs every actionability check without
                    // actually clicking. A frozen option carries
                    // pointer-events: none, so the trial click fails.
                    await locator.click({
                        trial: true,
                        timeout
                    });

                    actionable = true;

                } catch {

                    actionable = false;
                }
            }
        );

        return actionable;
    }


    // `verification` = { frozenStepExpected, enabledStepExpected } from the
    // calling spec's own data file.
    async verifyAppointmentStatus(
        appoinmentData,
        verification
    ) {

        const step = 'Verify Appointment Status';
        const frozenStep = 'Verify Confirmed Status Is Frozen';
        const enabledStep = 'Verify Completed Status Is Enabled';

        await StepHelper.step(
            this.page,
            'Update Appointment Status to Check-In',
            async () => {

                // Click on Confirmed status dropdown
                await this.keywords.click(
                    this.locator.confirmedStatus
                );
            }
        );

        await this.keywords.waitForElement(this.locator.checkInStatus);

        await Verify.state(
            this.page,
            'Check-In status option is displayed',
            this.locator.checkInStatus,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Select Check-In status',
            async () => {
                await this.keywords.click(
                    this.locator.checkInStatus
                );
            }
        );

        await this.keywords.waitForElement(this.locator.checkedInStatus);

        await Verify.state(
            this.page,
            `${step} - Checked-In status is displayed`,
            this.locator.checkedInStatus,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Open Status Dropdown From Checked-In',
            async () => {
                await this.keywords.click(
                    this.locator.checkedInStatus
                );
            }
        );

        await this.keywords.waitForElement(this.locator.completedStatus);

        await Verify.state(
            this.page,
            'Completed status option is displayed',
            this.locator.completedStatus,
            { visible: true, soft: false }
        );

        await this.keywords.waitForElement(this.locator.confirmedStatus);

        await Verify.state(
            this.page,
            'Confirmed status option is displayed',
            this.locator.confirmedStatus,
            { visible: true, soft: false }
        );

        const confirmedStatusIsActionable = await this.isActionable(
            this.locator.confirmedStatus,
            waitData.actionableProbe,
            'Check Confirmed Status Actionability'
        );

        await Verify.equals(
            this.page,
            frozenStep,
            verification.frozenStepExpected,
            confirmedStatusIsActionable
        );

        const completedStatusIsActionable = await this.isActionable(
            this.locator.completedStatus,
            waitData.actionableProbe,
            'Check Completed Status Actionability'
        );

        await Verify.equals(
            this.page,
            enabledStep,
            verification.enabledStepExpected,
            completedStatusIsActionable
        );
    }


    // Sets the appointment status from Confirmed to Checked-In and verifies
    // it took - nothing else. No frozen/enabled actionability checks.
    async updateAppointmentStatusToCheckIn() {

        const step = 'Verify Checked-In Status';

        await StepHelper.step(
            this.page,
            'Update Appointment Status to Check-In',
            async () => {

                // Click on Confirmed status dropdown
                await this.keywords.click(
                    this.locator.confirmedStatus
                );
            }
        );

        await this.keywords.waitForElement(this.locator.checkInStatus);

        await Verify.state(
            this.page,
            'Check-In status option is displayed',
            this.locator.checkInStatus,
            { visible: true, soft: false }
        );

        await StepHelper.step(
            this.page,
            'Select Check-In status',
            async () => {
                await this.keywords.click(
                    this.locator.checkInStatus
                );
            }
        );

        await this.keywords.waitForElement(this.locator.checkedInStatus);

        await Verify.state(
            this.page,
            `${step} - Checked-In status is displayed`,
            this.locator.checkedInStatus,
            { visible: true, soft: false }
        );
    }


    // Verifies the appointment is showing as Checked-In without clicking
    // anything - used after navigating away and back to confirm the status
    // update persisted.
    async verifyAppointmentCheckedIn(expectedStatus) {

        await this.keywords.waitForElement(this.locator.checkedInStatus);

        const Checkin =  this.locator.checkedInStatus;
        const Actual_status = (
                        await this.keywords.getText(Checkin)
                    ).trim();
            // const expectedStatus = 'Checked-In';

            // await Verify.state(
            //     this.page,
            //     'Verify Checked-In Status Badge',
            //     this.locator.checkedInStatusBadge,
            //     { visible: true, soft: false }
            // );

            await Verify.equals(
                this.page,
                'Verify Checked-In Status Text',
                expectedStatus,
                Actual_status
            );

        // The status badge container carries a status-checkedin class only
        // when the appointment is actually in the Checked-In state, so its
        // presence is the real verification - not a text comparison.
        // await Verify.state(
        //     this.page,
        //     'Verify Checked-In Status Badge',
        //     this.locator.checkedInStatusBadge,
        //     { visible: true, soft: false }
        // );
    }


    // `verification` = { step, expectedLabel } from the calling spec's own
    // data file. The label text is captured from the page at runtime and
    // compared with the expected value from that data.
    async verifyVisitingSlip(patientName, doctorName, verification) {

        const step = 'Verify Visiting Slip';

        let actualLabelText;

        await StepHelper.step(
            this.page,
            'Get Visiting Slip Label',
            async () => {

                actualLabelText = (
                    await this.keywords.getText(
                        this.locator.visitingSlip
                    )
                ).trim();
            }
        );

        await Verify.state(
            this.page,
            'Visiting Slip is displayed',
            this.locator.visitingSlip,
            { visible: true, soft: false }
        );

        await Verify.contains(
            this.page,
            step,
            verification.expectedLabel,
            actualLabelText
        );

        await StepHelper.step(
            this.page,
            'Open Visiting Slip',
            async () => {
                await this.keywords.click(
                    this.locator.visitingSlip
                );
            }
        );

        // Wait for the generated PDF page to render instead of sleeping.
        await StepHelper.step(
            this.page,
            'Wait For Visiting Slip PDF To Render',
            async () => {
                await this.keywords.waitForElement(
                    this.locator.visitingSlipPdfPage
                );
            }
        );
    }

async verifyVisitingSlipContent(//updated
    doctorName,
    patientName,
    appointmentTime,
    arrivalTime,
    appointmentDate,
    visitingSlipData
) {
    const constants = visitingSlipData.visitingSlip;
    const visitingSlip = this.locator.visitingSlipPdfPage;

    await this.keywords.waitForElement(visitingSlip);

    const actualPdfText = (
        await this.keywords.getText(visitingSlip)
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
        // No concrete time was passed in, so there is nothing to compare the
        // rendered value against - only the label's presence can be checked.
        fieldsToVerify.push({
            name: 'Appointment Time',
            expected: `${constants.timeLabel} ${constants.appointmentLabel}`,
            actual: extractActualValue(
                actualPdfText,
                constants.timeLabel,
                nextMarkerAfterTime
            ),
            isPartial: true
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
        // No concrete time was passed in, so there is nothing to compare the
        // rendered value against - only the label's presence can be checked.
        fieldsToVerify.push({
            name: 'Arrival Time',
            expected: constants.arrivalLabel,
            actual: extractActualValue(
                actualPdfText,
                constants.arrivalLabel,
                constants.dateLabel
            ),
            isPartial: true
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

        // The app appends a "- (NEW)" marker to the patient name on the
        // slip for a freshly created patient. Strip it before comparing so
        // the name check isn't coupled to that decoration.
        const comparableActual =
            field.name === 'Patient Name'
                ? normalizedActual
                    .replace(
                        new RegExp(
                            `\\s*${constants.newPatientMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`,
                            'i'
                        ),
                        ''
                    )
                    .trim()
                : normalizedActual;

        const expectedForReport = field.isDate
            ? `${constants.dateLabel} day ${
                (String(field.expected).match(/\d+/) || [''])
                    .map(Number)[0]
              }`
            : normalizedExpected;

        console.log(
            `Expected Result = '${expectedForReport}' | Actual Result = '${normalizedActual}'`
        );

        await StepHelper.step(
            this.page,
            `Verify Visiting Slip: ${field.name} | Expected Result = '${expectedForReport}' | Actual Result = '${normalizedActual}'`,
            async () => {
                if (field.isDate) {
                    // Check date label
                    expect(normalizedActual).toContain(
                        constants.dateLabel
                    );

                    // Check passed appointment date. The slip formats the day
                    // without a leading zero ("Sept. 2, 2026"), so compare the
                    // day number itself rather than the raw text.
                    if (appointmentDate) {
                        const matchDate =
                            String(appointmentDate).match(/\d+/);

                        if (matchDate) {
                            expect(
                                normalizedActual
                            ).toContain(
                                String(Number(matchDate[0]))
                            );
                        }
                    }

                    // Check stored JSON date
                    if (field.storedVal) {
                        const matchJsonDate =
                            String(field.storedVal).match(/\d+/);

                        if (matchJsonDate) {
                            expect(
                                normalizedActual
                            ).toContain(
                                String(Number(matchJsonDate[0]))
                            );
                        }
                    }
                } else if (field.isPartial) {

                    // No concrete value was passed in for this field, so only
                    // the label's presence can be verified - a partial match.
                    expect(comparableActual).toContain(
                        normalizedExpected
                    );

                } else {
                    // Full field text is extracted between two markers, so
                    // compare it exactly rather than as a partial match.
                    expect(comparableActual).toBe(
                        normalizedExpected
                    );

                    // Check stored JSON patient name
                    if (
                        field.name === 'Patient Name' &&
                        field.storedVal
                    ) {
                        expect(
                            comparableActual
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
            'Wait for Generate Invoice Button to Enable',
            async () => {

                await expect(
                    this.locator.finalGenerateInvoiceBtn
                ).toBeEnabled({
                    timeout: waitData.slowLoad
                });
            }
        );//update

        await StepHelper.step(
            this.page,
            'Generate Invoice',
            async () => {
                await this.keywords.click(
                    this.locator.finalGenerateInvoiceBtn
                );
            }
        );

        // await Verify.toaster(
        //     this.page,
        //     'Verify Service Invoice Confirmation Toaster',
        //     this.locator.invoiceToastTitle,
        //     toasterMessages.bookingConfirm
        // );
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
                timeout: waitData.extendedLoad
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


    async generateInvoiceAddAdmission(invoiceData) { //updated
    
            await this.Financials(); 
    
            await this.invoiceGenerate(); 

            await this.selectServices();

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