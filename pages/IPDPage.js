const { expect } = require('@playwright/test');

const { StepHelper } = require('../utils/StepHelper');
const { Keywords } = require('../utils/Keywords');
const { IPDLocator } = require('../Locators/IPDLocator.js');

const { Verify } = require('../utils/verification.js');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;

class IPDPage {

    constructor(page) {

        this.page = page;

        this.locator =
            new IPDLocator(page);

        this.keywords =
            new Keywords();
    }

    async waitForCompletion() {

        const popup =
            this.page.getByText(
                'Admission Successful'
            );

        await popup.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        await popup.waitFor({
            state: 'hidden',
            timeout: timeout.elementTimeout
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

        const monthName =
            admissionDate.toLocaleString(
                'en-US',
                {
                    month: 'long'
                }
            );

        const year =
            String(
                admissionDate.getFullYear()
            );

        const day =
            String(
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
                    patient,
                    timeout.elementTimeout
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

        // console.log(
        // 'Payment Due count:',
        // await this.locator.paymentDue.count()
        // );

        // console.log(
        //     'Current URL:',
        //     this.page.url()
        // );
        
        await this.locator.paymentDue.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
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
                soft: false,
                timeout: timeout.elementTimeout
            }
        );

        const invoiceNumber =
            (
                await this.locator.invoiceNumber.textContent()
            ).trim();

        this.currentInvoiceNumber =
            invoiceNumber;

        await Verify.matches(
            this.page,
            'Invoice Number Format',
            /^#INV/,
            invoiceNumber,
            {
                soft: false,
                timeout: timeout.elementTimeout
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
                    timeout: timeout.elementTimeout
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
                    timeout: timeout.elementTimeout
                });

                await this.locator.pdfTextLayer.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
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
                    timeout: timeout.elementTimeout
                });

                await this.locator.pdfCloseButton.click();
            }
        );
    }

    async IPDInvoicePayment(
        patientName,
        admissionDate
    ) {

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

    async IPDAdmissionDetails(
        patientName,
        admissionDate
    ) {

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

    async IPDAdmissionDetailsSummary(
        IPDAdmissionDetailsSummary
    ) {

        await StepHelper.step(
            this.page,
            'Click Change Bed',
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

                await this.keywords.click(
                    this.locator.bedDropdown
                );

                await this.locator.bedOption(
                    IPDAdmissionDetailsSummary.bed
                ).waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await this.keywords.click(
                    this.locator.bedOption(
                        IPDAdmissionDetailsSummary.bed
                    )
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Save Bed Details',
            async () => {

                await this.keywords.click(
                    this.locator.saveBtn
                );
            }
        );

        await StepHelper.step(
            this.page,
            'Verify Bed Updated Successfully',
            async () => {

                await expect(
                    this.locator.bedUpdatedToast
                ).toBeVisible({
                    timeout: timeout.expectTimeout
                });
            }
        );

        await StepHelper.step(
            this.page,
            `Verify Room Type - ${IPDAdmissionDetailsSummary.roomType}`,
            async () => {

                await expect(
                    this.locator.roomTypeSummary
                ).toHaveText(
                    IPDAdmissionDetailsSummary.roomType,
                    {
                        timeout: timeout.expectTimeout
                    }
                );
            }
        );
    }

   async addAdministrativeForm(formName) {

    await StepHelper.step(
        this.page,
        'Click Add Administrative Form',
        async () => {
            await this.keywords.click(
                this.locator.addAdministrativeFormBtn
            );
        }
    );

    await StepHelper.step(
        this.page,
        'Click Search Consent Form',
        async () => {
            await this.keywords.click(
                this.locator.searchConsentFormInput
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Fill Consent Form - ${formName}`,
        async () => {
            await this.locator.searchConsentFormInput.fill(formName);
        }
    );

    await StepHelper.step(
    this.page,
    `Select Consent Form - ${formName}`,
    async () => {
        await this.keywords.click(
            this.locator.suggestionContent
        );
    }
    );

    await this.locator.formHeader.waitFor({
    state: 'visible',
    timeout: timeout.elementTimeout
    });

    const actualText = await this.keywords.getText(
        this.locator.formHeader
    );

    await StepHelper.step(
        this.page,
        `Verify Administrative Form | Expected: ${formName} | Actual: ${actualText}`,
        async () => {

            expect(actualText).toBe(formName);
        }
    );
}

async fillAdministrativeFormFields(administrativeForm) {

    const fields = [
        {
            name: 'Age',
            value: administrativeForm.Age
        },
        {
            name: 'Gender',
            value: administrativeForm.Gender
        },
        {
            name: 'UHID',
            value: administrativeForm.UHID
        },
        {
            name: 'Procedure planned (as told to me)',
            value: administrativeForm['Procedure planned (as told to me)']
        }
    ];

    for (const fieldData of fields) {

        const field = this.locator.getConsentFormField(fieldData.name);

        await StepHelper.step(
            this.page,
            `Fill ${fieldData.name} - ${fieldData.value}`,
            async () => {

                await field.waitFor({
                    state: 'visible',
                    timeout: timeout.elementTimeout
                });

                await field.click();
                await field.fill(fieldData.value);
            }
        );
    }
}


// async fillAdministrativeFormDetails(administrativeForm) {

//     const fields = [
//         {
//             question: 'Any known allergy',
//             option: administrativeForm['Any known allergy'],
//             value: administrativeForm['Allergy Details']
//         },
//         {
//             question: 'Taking blood-thinning medicine',
//             option: administrativeForm['Taking blood-thinning medicine'],
//             value: administrativeForm['Blood-thinning Details']
//         },
//         {
//             question: 'Taking Metformin / diabetes medicine',
//             option: administrativeForm['Taking Metformin / diabetes medicine'],
//             value: administrativeForm['Metformin Details']
//         },
//         {
//             question: 'Kidney problem or on dialysis',
//             option: administrativeForm['Kidney problem or on dialysis'],
//             value: administrativeForm['Kidney Details']
//         },
//         {
//             question: 'Pacemaker or any implant in the body',
//             option: administrativeForm['Pacemaker or any implant in the body'],
//             value: administrativeForm['Pacemaker Details']
//         },
//         {
//             question: 'Currently pregnant or breastfeeding',
//             option: administrativeForm['Currently pregnant or breastfeeding'],
//             value: administrativeForm['Pregnancy Details']
//         },
//         {
//             question: 'Last meal/water taken — time',
//             value: administrativeForm['Last meal/water taken — time'],
//             type: 'time'
//         },
//         {
//             question: 'Empty stomach (fasting) since',
//             value: administrativeForm['Empty stomach (fasting) since'],
//             type: 'time'
//         }
//     ];

//     for (const fieldData of fields) {

//         await StepHelper.step(
//             this.page,
//             `Fill ${fieldData.question} - ${fieldData.value}`,
//             async () => {

//                 // Checkbox fields
//                 if (!fieldData.type) {

//                     const checkbox = this.locator.getConsentFormCheckbox(
//                         fieldData.question,
//                         fieldData.option
//                     );

//                     await checkbox.waitFor({
//                         state: 'visible',
//                         timeout: timeout.actionTimeout
//                     });

//                     await checkbox.click();
//                 }

//                 // Details / Time input fields
//                 const field = fieldData.type === 'time'
//                     ? this.locator.getAdministrativeTimeField(
//                         fieldData.question
//                     )
//                     : this.locator.getConsentFormDetailsField(
//                         fieldData.question
//                     );

//                 await field.waitFor({
//                     state: 'visible',
//                     timeout: timeout.actionTimeout
//                 });

//                 await field.click();

//                 await field.fill(
//                     String(fieldData.value)
//                 );
//             }
//         );
//     }
// }
async fillAdministrativeFormDetails(administrativeForm) {

    const fields = [
        {
            question: 'Any known allergy',
            option: administrativeForm['Any known allergy'],
            value: administrativeForm['Allergy Details']
        },
        {
            question: 'Taking blood-thinning medicine',
            option: administrativeForm['Taking blood-thinning medicine'],
            value: administrativeForm['Blood-thinning Details']
        },
        {
            question: 'Taking Metformin / diabetes medicine',
            option: administrativeForm['Taking Metformin / diabetes medicine'],
            value: administrativeForm['Metformin Details']
        },
        {
            question: 'Kidney problem or on dialysis',
            option: administrativeForm['Kidney problem or on dialysis'],
            value: administrativeForm['Kidney Details']
        },
        {
            question: 'Pacemaker or any implant in the body',
            option: administrativeForm['Pacemaker or any implant in the body'],
            value: administrativeForm['Pacemaker Details']
        },
        {
            question: 'Currently pregnant or breastfeeding',
            option: administrativeForm['Currently pregnant or breastfeeding'],
            value: administrativeForm['Pregnancy Details']
        },
        {
            question: 'Last meal/water taken — time',
            value: administrativeForm['Last meal/water taken — time'],
            type: 'time'
        },
        {
            question: 'Empty stomach (fasting) since',
            value: administrativeForm['Empty stomach (fasting) since'],
            type: 'time'
        }
    ];

    for (const fieldData of fields) {

        await StepHelper.step(
            this.page,
            `Fill ${fieldData.question} - ${fieldData.value}`,
            async () => {

                // Checkbox
                if (!fieldData.type) {

                    const checkbox =
                        this.locator.getConsentFormCheckbox(
                            fieldData.question,
                            fieldData.option
                        );

                    await checkbox.waitFor({
                        state: 'visible',
                        timeout: timeout.actionTimeout
                    });

                    await checkbox.scrollIntoViewIfNeeded();

                    if (!(await checkbox.isChecked())) {
                        await checkbox.click();
                    }

                    await expect(checkbox).toBeChecked({
                        timeout: timeout.actionTimeout
                    });
                }

                // Details / Time
                const field = fieldData.type === 'time'
                    ? this.locator.getAdministrativeTimeField(
                        fieldData.question
                    )
                    : this.locator.getConsentFormDetailsField(
                        fieldData.question
                    );

                await field.waitFor({
                    state: 'visible',
                    timeout: timeout.actionTimeout
                });

                await field.click();

                await field.fill(
                    String(fieldData.value)
                );
            }
        );
    }
}


// async verifyAdministrativeFormFields(administrativeForm) {

//     const fields = [
//         {
//             name: 'Age',
//             value: administrativeForm.Age
//         },
//         {
//             name: 'Gender',
//             value: administrativeForm.Gender
//         },
//         {
//             name: 'UHID',
//             value: administrativeForm.UHID
//         },
//         {
//             name: 'Procedure planned (as told to me)',
//             value: administrativeForm['Procedure planned (as told to me)']
//         }
//     ];

//     for (const fieldData of fields) {

//         await StepHelper.step(
//             this.page,
//             `Verify ${fieldData.name} - Expected: ${fieldData.value}`,
//             async () => {

//                 const field = this.locator.getConsentFormField(
//                     fieldData.name
//                 );

//                 await field.waitFor({
//                     state: 'visible',
//                     timeout: timeout.elementTimeout
//                 });

//                 await expect(field).toHaveValue(
//                     String(fieldData.value),
//                     {
//                         timeout: timeout.elementTimeout
//                     }
//                 );
//             }
//         );
//     }
// }


async verifyAdministrativeFormFields(administrativeForm) {

    const fields = [
        {
            name: 'Age',
            value: administrativeForm.Age
        },
        {
            name: 'Gender',
            value: administrativeForm.Gender
        },
        {
            name: 'UHID',
            value: administrativeForm.UHID
        },
        {
            name: 'Procedure planned (as told to me)',
            value: administrativeForm['Procedure planned (as told to me)']
        }
    ];

    for (const fieldData of fields) {

        const field = this.locator.getConsentFormField(fieldData.name);

        await field.waitFor({
            state: 'visible',
            timeout: timeout.elementTimeout
        });

        const expectedValue = String(fieldData.value);
        const actualValue = await field.inputValue();

        await StepHelper.step(
            this.page,
            `Verify ${fieldData.name} | Expected: ${expectedValue} | Actual: ${actualValue}`,
            async () => {

                if (actualValue !== expectedValue) {
                    throw new Error(
                        `${fieldData.name} mismatch | Expected: ${expectedValue} | Actual: ${actualValue}`
                    );
                }
            }
        );
    }
}
async verifyAdministrativeFormDetails(administrativeForm) {

    const fields = [
        {
            question: 'Any known allergy',
            option: administrativeForm['Any known allergy'],
            value: administrativeForm['Allergy Details']
        },
        {
            question: 'Taking blood-thinning medicine',
            option: administrativeForm['Taking blood-thinning medicine'],
            value: administrativeForm['Blood-thinning Details']
        },
        {
            question: 'Taking Metformin / diabetes medicine',
            option: administrativeForm['Taking Metformin / diabetes medicine'],
            value: administrativeForm['Metformin Details']
        },
        {
            question: 'Kidney problem or on dialysis',
            option: administrativeForm['Kidney problem or on dialysis'],
            value: administrativeForm['Kidney Details']
        },
        {
            question: 'Pacemaker or any implant in the body',
            option: administrativeForm['Pacemaker or any implant in the body'],
            value: administrativeForm['Pacemaker Details']
        },
        {
            question: 'Currently pregnant or breastfeeding',
            option: administrativeForm['Currently pregnant or breastfeeding'],
            value: administrativeForm['Pregnancy Details']
        },
        {
            question: 'Last meal/water taken — time',
            value: administrativeForm['Last meal/water taken — time'],
            type: 'time'
        },
        {
            question: 'Empty stomach (fasting) since',
            value: administrativeForm['Empty stomach (fasting) since'],
            type: 'time'
        }
    ];

    for (const fieldData of fields) {

        // Checkbox fields
        if (!fieldData.type) {

            const checkbox = this.locator.getConsentFormCheckbox(
                fieldData.question,
                fieldData.option
            );

            await checkbox.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            const actualChecked = await checkbox.isChecked();
            const expectedOption = String(fieldData.option);

            await StepHelper.step(
                this.page,
                `Verify ${fieldData.question} | Expected: ${expectedOption} | Actual: ${actualChecked ? 'Yes' : 'No'}`,
                async () => {

                    const expectedChecked =
                        expectedOption.toLowerCase() === 'yes';

                    if (actualChecked !== expectedChecked) {
                        throw new Error(
                            `${fieldData.question} mismatch | ` +
                            `Expected: ${expectedOption} | ` +
                            `Actual: ${actualChecked ? 'Yes' : 'No'}`
                        );
                    }
                }
            );

            // Details field
            const field = this.locator.getConsentFormDetailsField(
                fieldData.question
            );

            await field.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            const expectedValue = String(fieldData.value);
            const actualValue = await field.inputValue();

            await StepHelper.step(
                this.page,
                `Verify ${fieldData.question} Details | Expected: ${expectedValue} | Actual: ${actualValue}`,
                async () => {

                    if (actualValue !== expectedValue) {
                        throw new Error(
                            `${fieldData.question} Details mismatch | ` +
                            `Expected: ${expectedValue} | ` +
                            `Actual: ${actualValue}`
                        );
                    }
                }
            );
        }

        // Time fields
        else {

            const field = this.locator.getAdministrativeTimeField(
                fieldData.question
            );

            await field.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            const expectedValue = String(fieldData.value);
            const actualValue = await field.inputValue();

            await StepHelper.step(
                this.page,
                `Verify ${fieldData.question} | Expected: ${expectedValue} | Actual: ${actualValue}`,
                async () => {

                    if (actualValue !== expectedValue) {
                        throw new Error(
                            `${fieldData.question} mismatch | ` +
                            `Expected: ${expectedValue} | ` +
                            `Actual: ${actualValue}`
                        );
                    }
                }
            );
        }
    }
}

// async fillConsentCheckboxes(consentCheckboxData) {

//     for (const [question, expectedValue] of Object.entries(consentCheckboxData)) {

//         const checkbox = this.locator.getConsentCheckbox(question);

//         await checkbox.waitFor({
//             state: 'visible',
//             timeout: timeout.actionTimeout
//         });

//         await StepHelper.step(
//             this.page,
//             `Consent Checkbox - ${question} | Expected: ${expectedValue}`,
//             async () => {

//                 const actualValue = await checkbox.isChecked();

//                 if (expectedValue && !actualValue) {
//                     await checkbox.check();
//                 } else if (!expectedValue && actualValue) {
//                     await checkbox.uncheck();
//                 }

//                 const finalActualValue = await checkbox.isChecked();

//                 if (finalActualValue !== expectedValue) {
//                     throw new Error(
//                         `${question} mismatch | ` +
//                         `Expected: ${expectedValue} | ` +
//                         `Actual: ${finalActualValue}`
//                     );
//                 }
//             }
//         );
//     }
// }

async fillConsentCheckboxes(consentCheckboxData) {

    for (const [question, expectedValue] of Object.entries(consentCheckboxData)) {

        const checkbox = this.locator.getConsentCheckbox(question);

        await checkbox.waitFor({
            state: 'visible',
            timeout: timeout.actionTimeout
        });

        // Select checkbox based on JSON
        if (expectedValue) {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }

        // Get actual UI value
        const actualValue = await checkbox.isChecked();

        await StepHelper.step(
            this.page,
            `Verify Consent Checkbox | ${question} | Expected: ${expectedValue} | Actual: ${actualValue}`,
            async () => {

                if (actualValue !== expectedValue) {
                    throw new Error(
                        `${question} mismatch | ` +
                        `Expected: ${expectedValue} | ` +
                        `Actual: ${actualValue}`
                    );
                }
            }
        );
    }
}


async boldPatientName() {

    await StepHelper.step(
        this.page,
        'Select Patient Name :',
        async () => {
            await this.locator.patientNameText.selectText();
        }
    );

    // await StepHelper.step(
    //     this.page,
    //     'Click Bold',
    //     async () => {
    //         await this.locator.boldButton.click();
    //     }
    // );

    await StepHelper.step(
        this.page,
        'Verify Patient Name : is Bold',
        async () => {
            await expect(this.locator.boldPatientName).toBeVisible({
                timeout: timeout.actionTimeout
            });
        }
    );
}

async addPatientSignature(signatureData) {

    await StepHelper.step(
        this.page,
        'Click Add Patient Signature',
        async () => {

            await this.locator.addPatientSignatureButton.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locator.addPatientSignatureButton.click();
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Signature Name - ${signatureData.signatureName}`,
        async () => {

            await this.locator.signatureNameInput.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locator.signatureNameInput.click();

            await this.locator.signatureNameInput.fill(
                signatureData.signatureName
            );
        }
    );

    await StepHelper.step(
        this.page,
        `Enter Patient Signature Name - ${signatureData.patientSignatureName}`,
        async () => {

            await this.locator.signatureInput.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locator.signatureInput.click();

            await this.locator.signatureInput.fill(
                signatureData.patientSignatureName
            );
        }
    );

    await StepHelper.step(
    this.page,
    `Draw Patient Signature - ${signatureData.signatureName}`,
    async () => {

        await this.locator.signatureCanvas.waitFor({
            state: 'visible',
            timeout: timeout.actionTimeout
        });

        const box = await this.locator.signatureCanvas.boundingBox();

        if (!box) {
            throw new Error('Signature canvas is not available');
        }

        const draw = async (points) => {
            await this.page.mouse.move(points[0][0], points[0][1]);
            await this.page.mouse.down();

            for (let i = 1; i < points.length; i++) {
                await this.page.mouse.move(
                    points[i][0],
                    points[i][1],
                    { steps: 3 }
                );
            }

            await this.page.mouse.up();
        };

        const x = box.x;
        const y = box.y;

        // // Draw "T"
        // await draw([
        //     [x + 80, y + 40],
        //     [x + 140, y + 40],
        //     [x + 110, y + 40],
        //     [x + 110, y + 100]
        // ]);

         // Draw "t"
        await draw([
            [x + 240, y + 45],
            [x + 240, y + 100]
        ]);

        // Draw "e"
        await draw([
            [x + 145, y + 80],
            [x + 175, y + 80],
            [x + 180, y + 65],
            [x + 170, y + 55],
            [x + 150, y + 60],
            [x + 145, y + 80],
            [x + 160, y + 90],
            [x + 180, y + 85]
        ]);

        // Draw "s"
        await draw([
            [x + 215, y + 60],
            [x + 195, y + 55],
            [x + 185, y + 70],
            [x + 210, y + 80],
            [x + 220, y + 90],
            [x + 200, y + 100],
            [x + 180, y + 95]
        ]);

        // Draw "t"
        await draw([
            [x + 240, y + 45],
            [x + 240, y + 100]
        ]);

        await draw([
            [x + 225, y + 65],
            [x + 255, y + 65]
        ]);
    }
);

    await StepHelper.step(
        this.page,
        'Click Save Signature',
        async () => {

            await this.locator.saveSignatureButton.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locator.saveSignatureButton.click();
        }
    );
}

async submitAndVerifyConsentForm(administrativeForm) {

    const formName = administrativeForm['formName'];

    // Submit
    await StepHelper.step(
        this.page,
        'Click Submit button',
        async () => {

            await this.locator.submitButton.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            await this.locator.submitButton.click();
        }
    );

    // Verify score result table
    await StepHelper.step(
        this.page,
        'Verify Score Result Table is visible',
        async () => {

            await this.locator.scoreResultTable.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });
        }
    );

    // Verify form name
    await StepHelper.step(
        this.page,
        `Verify ${formName} is displayed`,
        async () => {

            const form = this.locator.consentFormName(formName);

            await form.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });

            const actualText = (await form.textContent()).trim();

            if (actualText !== formName) {
                throw new Error(
                    `Form name mismatch. Expected: ${formName}, Actual: ${actualText}`
                );
            }
        }
    );

    // Verify View icon
    const viewIcon = this.locator.consentFormViewIcon(formName);

    await StepHelper.step(
        this.page,
        `Verify View icon for ${formName} is visible`,
        async () => {

            await viewIcon.waitFor({
                state: 'visible',
                timeout: timeout.actionTimeout
            });
        }
    );

    await StepHelper.step(
    this.page,
    `Click View icon and open PDF for ${formName}`,
    async () => {
        await viewIcon.click();

        await this.page.waitForTimeout(timeout.networkIdleTimeoutMs);
    }
    );

 await StepHelper.step(
    this.page,
    `Verify PDF name contains ${formName}`,
    async () => {
        const pdfFormName = this.locator.pdfFormName(formName);

        await expect(pdfFormName).toHaveText(formName, {
            timeout: timeout.actionTimeout
        });
    }
);
}

async verifyAdministrativeFormPDF(administrativeForm, consentCheckboxData) {

    const pdfData = [
        {
            field: 'Form Name',
            value: administrativeForm.formName
        },
        {
            field: 'Age',
            value: administrativeForm.Age
        },
        {
            field: 'Gender',
            value: administrativeForm.Gender
        },
        {
            field: 'UHID',
            value: administrativeForm.UHID
        },
        {
            field: 'Procedure planned',
            value: administrativeForm['Procedure planned (as told to me)']
        },
        {
            field: 'Allergy Details',
            value: administrativeForm['Allergy Details']
        },
        {
            field: 'Blood-thinning Details',
            value: administrativeForm['Blood-thinning Details']
        },
        {
            field: 'Metformin Details',
            value: administrativeForm['Metformin Details']
        },
        {
            field: 'Kidney Details',
            value: administrativeForm['Kidney Details']
        },
        {
            field: 'Pacemaker Details',
            value: administrativeForm['Pacemaker Details']
        },
        {
            field: 'Pregnancy Details',
            value: administrativeForm['Pregnancy Details']
        },
        {
            field: 'Last meal/water taken',
            value: administrativeForm['Last meal/water taken — time']
        },
        {
            field: 'Empty stomach',
            value: administrativeForm['Empty stomach (fasting) since']
        }
    ];

    const pdfText = this.locator.pdfTextLayer.first();

    await pdfText.waitFor({
        state: 'visible',
        timeout: timeout.actionTimeout
    });

    // Verify Administrative Form Data
    for (const data of pdfData) {

        const expectedValue = String(data.value);

        const actualLocator = pdfText.getByText(expectedValue, {
            exact: false
        });

        await actualLocator.first().waitFor({
            state: 'visible',
            timeout: timeout.actionTimeout
        });

        const actualValue = await this.keywords.getText(
            actualLocator.first()
        );

        await StepHelper.step(
            this.page,
            `Verify PDF ${data.field} | Expected: ${expectedValue} | Actual: ${actualValue}`,
            async () => {

                if (!actualValue.includes(expectedValue)) {
                    throw new Error(
                        `${data.field} mismatch | ` +
                        `Expected: ${expectedValue} | ` +
                        `Actual: ${actualValue}`
                    );
                }
            }
        );
    }

    // Verify Consent Checkbox Questions
    for (const [question, expectedValue] of Object.entries(consentCheckboxData)) {

        const actualLocator = pdfText.getByText(question, {
            exact: false
        });

        await actualLocator.first().waitFor({
            state: 'visible',
            timeout: timeout.actionTimeout
        });

        const actualValue = await this.keywords.getText(
            actualLocator.first()
        );

        await StepHelper.step(
            this.page,
            `Verify PDF Consent | Expected: ${expectedValue} | Actual: ${actualValue}`,
            async () => {

                if (!actualValue.includes(question)) {
                    throw new Error(
                        `Consent question not found in PDF | ` +
                        `Expected: ${question} | ` +
                        `Actual: ${actualValue}`
                    );
                }
            }
        );
    }
}






}

module.exports = { IPDPage };