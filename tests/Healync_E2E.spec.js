import { test, expect } from "../fixtures/baseTest.js";

const { StepHelper } = require('../utils/StepHelper');
import { Verify } from '../utils/verification.js';

const { NewPatient } = require('../pages/NewPatientPage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PackagePage } = require('../pages/PackagePage');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { validPatientData, dobYearRange, toastMessages } = require('../testdata/newpatientData.json');
const { invoiceData } = require('../testdata/invoiceData.json');
const { packageData, statusData } = require('../testdata/packageData.json');

const {
    generateUniquePatientFullName,
    generateRandomDateOfBirth
} = require('../utils/RandomData');

// No test.setTimeout() here - playwright.config.js already sets a
// global `timeout: 60000` for every test. If this flow turns out to
// need longer than that in practice, that's a config-level call
// (raise the global timeout) rather than a per-spec override.
//
// This whole scenario is deliberately ONE test() block, not split
// into several - every stage depends on state (the patient, the
// invoice, the payment) created by the stage before it, and each
// separate test() would start on a fresh page with none of that
// carried over.
test('Healync_E2E - Cancel with Full Refund (single session package)', async ({ page }) => {

    const patientName = generateUniquePatientFullName();
    const dobData = generateRandomDateOfBirth(
        dobYearRange.minYear,
        dobYearRange.maxYear
    );

    const newPatient = new NewPatient(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const calendarPage = new CalendarPage(page);
    const packagePage = new PackagePage(page);
    const cancellationPage = new CancellationPage(page);

    // ================================================================
    // STEP 1 marker - pure no-op, just so this shows up as its own
    // line in the report for easy navigation.
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 1: Add Patient Module =====',
        async () => {}
    );

    await newPatient.createPatientFast(
        patientName,
        validPatientData,
        dobData
    );

    await newPatient.verifySavedToastAndGoToProfile(toastMessages.patientSavedSuccess);

    await newPatient.verifyPatientProfileNameMatches(
        patientName
    );

    await newPatient.verifyPatientProfileDetails(
        validPatientData,
        dobData
    );

    // ================================================================
    // STEP 2 marker
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 2: Booking Flow =====',
        async () => {}
    );

    await calendarPage.clickSidebarCalendarIcon();

    await packagePage.addActivateSchedulePackage(
        patientName,
        packageData.packageName
    );

    await packagePage.verifyPackageAddedAndAssociated(
        packageData.packageName
    );

    const daysAdvancedForBooking = await packagePage.bookSingleSessionFromAddPackage();

    await packagePage.verifyServicesAddedToast();
    await packagePage.clickGoToAppointmentPage();
    await calendarPage.verifyStatus(
        statusData.expectedStatus
    );

    await invoicePage.verifyAppointmentPatientDetails(
        validPatientData,
        dobData
    );

    // ================================================================
    // STEP 3 marker
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 3: Generate Invoice =====',
        async () => {}
    );

    await invoicePage.generateInvoiceWithReasonValidation(
        patientName,
        invoiceData,
        packageData.packageName
    );

    const summaryAmount = await invoicePage.verifyInvoiceTotalAfterAdjustment(
        invoiceData
    );

    const invoiceTotal = (
        summaryAmount + parseFloat(invoiceData.adjustmentAmount)
    ).toFixed(2);

    await invoicePage.verifyPaymentSection(
        invoiceTotal
    );

    const invoiceNumber = await invoicePage.openAndVerifyInvoicePDF(
        patientName,
        validPatientData,
        invoiceData,
        summaryAmount,
        packageData.packageName,
        dobData
    );

    // ================================================================
    // STEP 4 marker
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 4: Make Payment =====',
        async () => {}
    );

    await cancellationPage.Payment(
        invoiceTotal,
        invoiceData.paymentMode
    );

    await invoicePage.verifyPostPaymentStatus(
        invoiceTotal,
        invoiceData.paymentMode
    );

    const invoicePdfReceiptNumber = await invoicePage.revalidateInvoicePDFAfterPayment(
        invoiceNumber,
        invoiceData.paymentMode
    );

    await invoicePage.verifyPaymentReceipt(
        invoiceNumber,
        invoiceTotal,
        invoicePdfReceiptNumber,
        invoiceData.paymentMode
    );

    // ================================================================
    // STEP 5 marker
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 5: Validate Patient Details =====',
        async () => {}
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.openInvoiceHistory();

    await invoicePage.verifyInvoiceHistoryRow(
        invoiceNumber,
        summaryAmount,
        invoiceData.adjustmentAmount
    );

    await invoicePage.openAndVerifyInvoicePdfFromFinancials(
        invoiceNumber,
        patientName,
        packageData.packageName,
        summaryAmount,
        invoiceData.adjustmentAmount
    );

    await paymentPage.verifyFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );

    await calendarPage.clickSidebarCalendarIcon();

    await calendarPage.searchPatient(
        patientName
    );

    const monthNames5 = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formatDate5 = (d) =>
        `${monthNames5[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;

    const bookedDate5 = new Date();
    bookedDate5.setDate(bookedDate5.getDate() + daysAdvancedForBooking);

    const bookedDateMinusOne5 = new Date(bookedDate5);
    bookedDateMinusOne5.setDate(bookedDateMinusOne5.getDate() - 1);

    const bookedDatePlusOne5 = new Date(bookedDate5);
    bookedDatePlusOne5.setDate(bookedDatePlusOne5.getDate() + 1);

    await calendarPage.verifyPackageTag(
        patientName,
        packageData.packageShortName,
        [
            formatDate5(bookedDate5),
            formatDate5(bookedDateMinusOne5),
            formatDate5(bookedDatePlusOne5)
        ]
    );

    await calendarPage.openPatientAppointment(
        patientName
    );

    // ================================================================
    // STEP 6 marker
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 6: Cancel & Refund =====',
        async () => {}
    );

    await cancellationPage.cancellation();
    await cancellationPage.verifyPackageNameAndRefundAmount(
        packageData.packageName,
        invoiceTotal
    );

    await cancellationPage.attemptOverRefundAndVerifyBlocked(
        invoiceTotal
    );

    await cancellationPage.cancelPackageWithFullRefund();

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.openInvoiceHistory();

    await invoicePage.verifyPostRefundInvoicePdf(
        invoiceNumber,
        invoiceTotal
    );

    await paymentPage.verifyFinancialsPaymentHistory(
        invoiceNumber,
        -invoiceTotal,
        invoiceData.paymentMode
    );

    await paymentPage.verifyRefundInFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );

    // ================================================================
    // STEP 7 marker (Part 1: Calendar Navigation & Toggle)
    // ================================================================
    await StepHelper.step(
        page,
        '===== STEP 7: Validate Cancelled Appointment on Calendar =====',
        async () => {}
    );

    await calendarPage.clickSidebarCalendarIcon();

    await calendarPage.verifyPatientNotInActiveView(
        patientName
    );

    await calendarPage.verifyPatientNotInActiveView(
        patientName
    );

    await calendarPage.navigateToBookedDate(
        daysAdvancedForBooking
    );

    await calendarPage.enableCancelledToggle();
    await calendarPage.verifyAndClickCancelledAppointmentCard(
        patientName
    );

    // STEP 7 marker (Part 2: Final Validations)
 
    await invoicePage.locator.appointmentPatientInfoValue('UHID').waitFor({ state: 'visible' });

    await invoicePage.verifyAppointmentPatientDetails(
        validPatientData, 
        dobData
    );

    await invoicePage.verifyPostRefundAppointmentDetails(
        invoiceTotal
    );

    
    await invoicePage.reopenAndVerifyRefundedInvoicePdf(
        invoiceNumber, 
        invoiceTotal
    );

    await invoicePage.verifyRefundReceiptPdf(
        patientName, 
        invoiceTotal, 
        invoiceData.paymentMode
    );
    
});