import { test } from '../fixtures/baseTest.js';

const { StepHelper } = require('../utils/StepHelper');

const { E2EPage } = require('../pages/E2EPage');

const {
    validPatientData,
    dobYearRange,
    toastMessages,
    packageData,
    statusData,
    invoiceData
} = require('../testdata/E2E.json');

const {
    generateUniquePatientFullName,
    generateRandomDateOfBirth
} = require('../utils/RandomData');

test('Healync_E2E - Cancel with Full Refund (single session package)', async ({ page }) => {

    const patientName = generateUniquePatientFullName();
    const dobData = generateRandomDateOfBirth(
        dobYearRange.minYear,
        dobYearRange.maxYear
    );
    const e2e = new E2EPage(page);

    // STEP 1 

    await StepHelper.step(
        page,
        '===== STEP 1: Add Patient Module =====',
        async () => {}
    );

    await e2e.createPatientFast(
        patientName,
        validPatientData,
        dobData
    );

    await e2e.verifySavedToastAndGoToProfile(toastMessages.patientSavedSuccess);

    await e2e.verifyPatientProfileNameMatches(
        patientName
    );

    await e2e.verifyPatientProfileDetails(
        validPatientData,
        dobData
    );

    // STEP 2 marker
    
    await StepHelper.step(
        page,
        '===== STEP 2: Booking Flow =====',
        async () => {}
    );

    await e2e.clickSidebarCalendarIcon();

    await e2e.addActivateSchedulePackage(
        patientName,
        packageData.packageName
    );

    await e2e.verifyPackageAddedAndAssociated(
        packageData.packageName
    );

    const daysAdvancedForBooking = await e2e.bookSingleSessionFromAddPackage();

    await e2e.verifyServicesAddedToast();
    await e2e.clickGoToAppointmentPage();
    await e2e.verifyStatus(
        statusData.expectedStatus
    );

    await e2e.verifyAppointmentPatientDetails(
        validPatientData,
        dobData
    );

   
    // STEP 3 marker

    await StepHelper.step(
        page,
        '===== STEP 3: Generate Invoice =====',
        async () => {}
    );

    await e2e.generateInvoiceWithReasonValidation(
        patientName,
        invoiceData,
        packageData.packageName
    );

    const summaryAmount = await e2e.verifyInvoiceTotalAfterAdjustment(
        invoiceData
    );

    const invoiceTotal = (
        summaryAmount + parseFloat(invoiceData.adjustmentAmount)
    ).toFixed(2);

    await e2e.verifyPaymentSection(
        invoiceTotal
    );

    const invoiceNumber = await e2e.openAndVerifyInvoicePDF(
        patientName,
        validPatientData,
        invoiceData,
        summaryAmount,
        packageData.packageName,
        dobData
    );


    // STEP 4 marker

    await StepHelper.step(
        page,
        '===== STEP 4: Make Payment =====',
        async () => {}
    );

    await e2e.Payment(
        invoiceTotal,
        invoiceData.paymentMode
    );

    await e2e.verifyPostPaymentStatus(
        invoiceTotal,
        invoiceData.paymentMode
    );

    const invoicePdfReceiptNumber = await e2e.revalidateInvoicePDFAfterPayment(
        invoiceNumber,
        invoiceData.paymentMode
    );

    await e2e.verifyPaymentReceipt(
        invoiceNumber,
        invoiceTotal,
        invoicePdfReceiptNumber,
        invoiceData.paymentMode
    );

    // STEP 5 marker

    await StepHelper.step(
        page,
        '===== STEP 5: Validate Patient Details =====',
        async () => {}
    );

    await e2e.openFinancials(
        patientName
    );

    await e2e.openInvoiceHistory();

    await e2e.verifyInvoiceHistoryRow(
        invoiceNumber,
        summaryAmount,
        invoiceData.adjustmentAmount
    );

    await e2e.openAndVerifyInvoicePdfFromFinancials(
        invoiceNumber,
        patientName,
        packageData.packageName,
        summaryAmount,
        invoiceData.adjustmentAmount
    );

    await e2e.verifyFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );

    await e2e.clickSidebarCalendarIcon();

    await e2e.searchPatient(
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

    await e2e.verifyPackageTag(
        patientName,
        packageData.packageShortName,
        [
            formatDate5(bookedDate5),
            formatDate5(bookedDateMinusOne5),
            formatDate5(bookedDatePlusOne5)
        ]
    );

    await e2e.openPatientAppointment(
        patientName
    );

    // STEP 6 marker

    await StepHelper.step(
        page,
        '===== STEP 6: Cancel & Refund =====',
        async () => {}
    );

    await e2e.cancellation();
    await e2e.verifyPackageNameAndRefundAmount(
        packageData.packageName,
        invoiceTotal
    );

    await e2e.attemptOverRefundAndVerifyBlocked(
        invoiceTotal
    );

    await e2e.cancelPackageWithFullRefund();

    await e2e.openFinancials(
        patientName
    );

    await e2e.openInvoiceHistory();

    await e2e.verifyPostRefundInvoicePdf(
        invoiceNumber,
        invoiceTotal
    );

    await e2e.verifyFinancialsPaymentHistory(
        invoiceNumber,
        -invoiceTotal,
        invoiceData.paymentMode
    );

    await e2e.verifyRefundInFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );

    // STEP 7 marker (Part 1: Calendar Navigation & Toggle)

    await StepHelper.step(
        page,
        '===== STEP 7: Validate Cancelled Appointment on Calendar =====',
        async () => {}
    );

    await e2e.clickSidebarCalendarIcon();

    await e2e.verifyPatientNotInActiveView(
        patientName
    );

    await e2e.verifyPatientNotInActiveView(
        patientName
    );

    await e2e.navigateToBookedDate(
        daysAdvancedForBooking
    );

    await e2e.enableCancelledToggle();
    await e2e.verifyAndClickCancelledAppointmentCard(
        patientName
    );

    // STEP 7 marker (Part 2: Final Validations)
 
    await e2e.locator.appointmentPatientInfoValue('UHID').waitFor({ state: 'visible' });

    await e2e.verifyAppointmentPatientDetails(
        validPatientData, 
        dobData
    );

    await e2e.verifyPostRefundAppointmentDetails(
        invoiceTotal
    );

    
    await e2e.reopenAndVerifyRefundedInvoicePdf(
        invoiceNumber, 
        invoiceTotal
    );

    await e2e.verifyRefundReceiptPdf(
        patientName, 
        invoiceTotal, 
        invoiceData.paymentMode
    );
    
});
