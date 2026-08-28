import { test, expect } from "../fixtures/baseTest.js";

const { StepHelper } = require('../utils/StepHelper');
                            
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PackagePage } = require('../pages/PackagePage');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { patientData,invoiceData,paymentData,packageData,statusData,cancellationData } = require('../testdata/TC_126.json');


const { generatePatientName } = require('../utils/RandomData');



test('Package - Cancel with Partial Refund', async ({ page }) => {

    const patientName = generatePatientName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
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
    cancellationData.refundAmount
    );


});
