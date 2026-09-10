import { test } from '../fixtures/baseTest.js';
import { PatientPage } from '../pages/PatientPage.js';
 
const { StepHelper } = require('../utils/StepHelper');
 
const { E2EPage } = require('../pages/E2EPage.js');
const { NewPatient } = require('../pages/NewPatientPage');
const { CalendarPage } = require('../pages/CalendarPage');
const { PackagePage } = require('../pages/PackagePage');
const { AppointmentPage } = require('../pages/AppointmentPage.js');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');


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
 
    const patientPage = new PatientPage(page);
    const newPatient = new NewPatient(page);
    const calendarPage = new CalendarPage(page);
    const packagePage = new PackagePage(page);
    const appointmentPage = new AppointmentPage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);

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

    //patient page
    await newPatient.createPatientFast(
        patientName,
        validPatientData,
        dobData
    );

    await newPatient.verifySavedToastAndGoToProfile(toastMessages.patientSavedSuccess);
 
    await page.waitForTimeout(6000);

    await newPatient.verifyPatientProfileNameMatches(
        patientName
    );
 
    await newPatient.verifyPatientProfileDetails(
        validPatientData,
        dobData
    );

//     //patient
 
    // STEP 2 marker
   
    await StepHelper.step(
        page,
        '===== STEP 2: Booking Flow =====',
        async () => {}
    );

    //package
 
    await calendarPage.clickSidebarCalendarIcon();
 
    await packagePage.addActivateSchedulePackage(
        patientName,
        packageData.packageName
    );
 
    await packagePage.verifyPackageAddedAndAssociated(
        packageData.packageName
    );
 
    // const daysAdvancedForBooking = await e2e.bookSingleSessionFromAddPackage();
    const {
    selectedSlotDate,
    daysAdvanced
} = await packagePage.bookSingleSessionFromAddPackage();
 
    await packagePage.verifyServicesAddedToast();

    //   //package

    //appoinment

    await appointmentPage.clickGoToAppointmentPage();

    await calendarPage.verifyStatus(
        statusData.expectedStatus
    );
 
    await appointmentPage.verifyAppointmentPatientDetails(
        validPatientData,
        dobData
    );

    //appoinment
   
    // STEP 3 marker
 
    //invoice
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
 
    const summaryAmount = await invoicePage.verifyInvoiceTotalAdjustment(
        invoiceData
    );
 
    const invoiceTotal = (
        summaryAmount + parseFloat(invoiceData.adjustmentAmount)
    ).toFixed(2);

    await invoicePage.PaymentSection(
        invoiceTotal
    );
 
    const invoiceNumber = await invoicePage.VerifyInvoicePDF(
        patientName,
        validPatientData,
        invoiceData,
        summaryAmount,
        packageData.packageName,
        dobData
    );
 
    //invoice
 
    // STEP 4 marker
 
    await StepHelper.step(
        page,
        '===== STEP 4: Make Payment =====',
        async () => {}
    );
 
    await paymentPage.Payment(
        invoiceTotal,
        invoiceData.paymentMode
    );
 
    await paymentPage.verifyPostPaymentStatus(
        invoiceTotal,
        invoiceData.paymentMode
    );
 
    const invoicePdfReceiptNumber = await paymentPage.revalidateInvoicePDFAfterPayment(
        invoiceNumber,
        invoiceData.paymentMode
    );
 
    await paymentPage.verifyPaymentReceipt(
        invoiceNumber,
        invoiceTotal,
        invoicePdfReceiptNumber,
        invoiceData.paymentMode
    );
    
//     //payment
 
//     // STEP 5 marker
 
//     //invoice
//     await StepHelper.step(
//         page,
//         '===== STEP 5: Validate Patient Details =====',
//         async () => {}
//     );
 
//     await e2e.openFinancials(
//         patientName
//     );
 
//     await e2e.openInvoiceHistory();
 
//     await e2e.verifyInvoiceHistoryRow(
//         invoiceNumber,
//         summaryAmount,
//         invoiceData.adjustmentAmount
//     );
 
//     await e2e.openAndVerifyInvoicePdfFromFinancials(
//         invoiceNumber,
//         patientName,
//         packageData.packageName,
//         summaryAmount,
//         invoiceData.adjustmentAmount
//     );
 
//     await e2e.verifyFinancialsPaymentHistory(
//         invoiceNumber,
//         invoiceTotal,
//         invoiceData.paymentMode
//     );
//     //invoice

//     //calendar
 
//     await e2e.clickSidebarCalendarIcon();
 
//     await e2e.searchPatient(
//         patientName
//     );
 
//     const monthNames5 = [
//         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];
 
//     const formatDate5 = (d) =>
//         `${monthNames5[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
 
//     // const bookedDate5 = new Date();
//     // bookedDate5.setDate(bookedDate5.getDate() + daysAdvancedForBooking);
 
//     // const bookedDateMinusOne5 = new Date(bookedDate5);
//     // bookedDateMinusOne5.setDate(bookedDateMinusOne5.getDate() - 1);
 
//     // const bookedDatePlusOne5 = new Date(bookedDate5);
//     // bookedDatePlusOne5.setDate(bookedDatePlusOne5.getDate() + 1);
//     const bookedDate5 = new Date(selectedSlotDate);

//     const bookedDateMinusOne5 = new Date(bookedDate5);
//     bookedDateMinusOne5.setDate(bookedDateMinusOne5.getDate() - 1);

//     const bookedDatePlusOne5 = new Date(bookedDate5);
//     bookedDatePlusOne5.setDate(bookedDatePlusOne5.getDate() + 1);
 
//     await e2e.verifyPackageTag(
//         patientName,
//         packageData.packageShortName,
//         [
//             formatDate5(bookedDate5),
//             formatDate5(bookedDateMinusOne5),
//             formatDate5(bookedDatePlusOne5)
//         ]
//     );
 
//     await e2e.openPatientAppointment(
//         patientName
//     );

//     //calendar
 
//     // STEP 6 marker
 
//     //cancel
//     await StepHelper.step(
//         page,
//         '===== STEP 6: Cancel & Refund =====',
//         async () => {}
//     );
 
//     await e2e.cancellation();

//     //cancel

//     //package
//     await e2e.verifyPackageNameAndRefundAmount(
//         packageData.packageName,
//         invoiceTotal
//     );
 
//     await e2e.attemptOverRefundAndVerifyBlocked(
//         invoiceTotal
//     );
 
//     await e2e.cancelPackageWithFullRefund();

//     //cancel

//     //invoice
 
//     await e2e.openFinancials(
//         patientName
//     );
 
//     await e2e.openInvoiceHistory();
 
//     await e2e.verifyPostRefundInvoicePdf(
//         invoiceNumber,
//         invoiceTotal
//     );
 
//     await e2e.verifyFinancialsPaymentHistory(
//         invoiceNumber,
//         invoiceTotal,
//         invoiceData.paymentMode
//     );
 
//     await e2e.verifyRefundInFinancialsPaymentHistory(
//         invoiceNumber,
//         invoiceTotal,
//         invoiceData.paymentMode
//     );

//     //invoice
 
//     // STEP 7 marker (Part 1: Calendar Navigation & Toggle)
 
//     //calendar
//     await StepHelper.step(
//         page,
//         '===== STEP 7: Validate Cancelled Appointment on Calendar =====',
//         async () => {}
//     );
 
//     await e2e.clickSidebarCalendarIcon();
 
//     await e2e.verifyPatientNotInActiveView(
//         patientName
//     );
 
//     await e2e.verifyPatientNotInActiveView(
//         patientName
//     );
 
//     // await e2e.navigateToBookedDate(
//     //     daysAdvancedForBooking
//     // );

//     await e2e.navigateToBookedDate(
//     daysAdvanced
// );
 
//     await e2e.enableCancelledToggle();

//     await page.waitForTimeout(5000);

//     await e2e.verifyAndClickCancelledAppointmentCard(
//         patientName
//     );
 
    
//     // STEP 7 marker (Part 2: Final Validations)
 
//     await e2e.locator.appointmentPatientInfoValue('UHID').waitFor({ state: 'visible' });
 
//     await e2e.verifyAppointmentPatientDetails(
//         validPatientData,
//         dobData
//     );
 
//     //calendar

//     //invoice
//     await e2e.verifyPostRefundAppointmentDetails(
//         invoiceTotal
//     );
 
   
//     await e2e.reopenAndVerifyRefundedInvoicePdf(
//         invoiceNumber,
//         invoiceTotal
//     );
 
//     await e2e.verifyRefundReceiptPdf(
//         patientName,
//         invoiceTotal,
//         invoiceData.paymentMode
//     );

    //invoice
   
});