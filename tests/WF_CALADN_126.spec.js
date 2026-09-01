import { test, expect } from "../fixtures/baseTest.js";

const { StepHelper } = require('../utils/StepHelper');
                            
const { PatientPage } = require('../pages/PatientPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PackagePage } = require('../pages/PackagePage');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { patientData,invoiceData,paymentData,packageData,statusData,cancellationData } = require('../testdata/TC_126.json');


const { generateUniquePatientFullName } = require('../utils/RandomData');



test('Package - Cancel with Partial Refund', async ({ page }) => {

    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const packagePage = new PackagePage(page);
    const cancellationPage = new CancellationPage(page);

    await patientPage.createPatient(
        patientName,
        patientData
    );

    await packagePage.addActivateSchedulePackage(
    patientName,
    packageData.packageName
    );

    await packagePage.bookPackagefromAddPackage();

    await calendarPage.PatientFromCalendarView(
    patientName,
    statusData.expectedStatus
    );

    await invoicePage.generateInvoice(
    patientName,
    invoiceData
    ); 

    const summaryAmount =
    await invoicePage.verifyInvoiceTotalAfterAdjustment(
        invoiceData
    );

    await invoicePage.verifyPaymentSection();

    await invoicePage.openAndVerifyInvoicePDF(
        patientName,
        patientData,
        invoiceData,
        summaryAmount
    );

    await cancellationPage.Payment(
        paymentData.amount
    );

    await cancellationPage.cancellation();

    await cancellationPage.selectPaymentMode(
    paymentData.paymentMethod,
    paymentData.transactionId
    );

    await cancellationPage.cancelPackageWithPartialRefund(
    cancellationData.refundPaymentMethod,
    cancellationData.refundAmount,
    cancellationData.transactionId,
    cancellationData.expectedStatus
    );


});
