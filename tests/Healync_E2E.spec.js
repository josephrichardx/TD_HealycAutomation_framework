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
const { CancellationPage } = require('../pages/CancellationPage.js');


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
    const cancellationPage = new CancellationPage(page);

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
 
    await calendarPage.SidebarCalendarIcon();
 
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
    
    //payment
 
    // STEP 5 marker
 
    //invoice
    await StepHelper.step(
        page,
        '===== STEP 5: Validate Patient Details =====',
        async () => {}
    );
 
    await paymentPage.openFinancials(
        patientName
    );
 
    await invoicePage.openInvoiceHistory();
 
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

    //invoice
 
    await paymentPage.verifyFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );
    

//     //calendar
 
    await calendarPage.SidebarCalendarIcon();
 
    await calendarPage.searchPatient(
        patientName
    );
 
    const monthNames5 = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
 
    const formatDate5 = (d) =>
        `${monthNames5[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
 
    // const bookedDate5 = new Date();
    // bookedDate5.setDate(bookedDate5.getDate() + daysAdvancedForBooking);
 
    // const bookedDateMinusOne5 = new Date(bookedDate5);
    // bookedDateMinusOne5.setDate(bookedDateMinusOne5.getDate() - 1);
 
    // const bookedDatePlusOne5 = new Date(bookedDate5);
    // bookedDatePlusOne5.setDate(bookedDatePlusOne5.getDate() + 1);
    const bookedDate5 = new Date(selectedSlotDate);

    const bookedDateMinusOne5 = new Date(bookedDate5);
    bookedDateMinusOne5.setDate(bookedDateMinusOne5.getDate() - 1);

    const bookedDatePlusOne5 = new Date(bookedDate5);
    bookedDatePlusOne5.setDate(bookedDatePlusOne5.getDate() + 1);
 
    await packagePage.verifyPackageTag(
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

    //calendar

    // STEP 6 marker

    //cancel
    await StepHelper.step(
        page,
        '===== STEP 6: Cancel & Refund =====',
        async () => {}
    );
 
    await cancellationPage.cancellation();

//     //cancel

//     //package
    await packagePage.verifyPackageNameAndRefundAmount(
        packageData.packageName,
        invoiceTotal
    );
 
    await packagePage.attemptOverRefundAndVerifyBlocked(
        invoiceTotal
    );
 
    await cancellationPage.PackageFullRefundcancel();

    //cancel

//     //invoice
 
    await paymentPage.openFinancials(
        patientName
    );
 
    await invoicePage.openInvoiceHistory();
 
    await invoicePage.verifyPostRefundInvoicePdf(
        invoiceNumber,
        invoiceTotal
    );
 
    await paymentPage.verifyFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );
 
    await paymentPage.verifyRefundInFinancialsPaymentHistory(
        invoiceNumber,
        invoiceTotal,
        invoiceData.paymentMode
    );

    //invoice
 
    // STEP 7 marker (Part 1: Calendar Navigation & Toggle)
 
    //calendar
    await StepHelper.step(
        page,
        '===== STEP 7: Validate Cancelled Appointment on Calendar =====',
        async () => {}
    );
 
    await calendarPage.SidebarCalendarIcon();
 
    await calendarPage.verifyPatientNotInActiveView(
        patientName
    );
 
    // await e2e.navigateToBookedDate(
    //     daysAdvancedForBooking
    // );

    await calendarPage.navigateToBookedDate(
    daysAdvanced
    );
 
    await calendarPage.enableCancelledToggle();

    await page.waitForTimeout(5000);

    await appointmentPage.verifyAndClickCancelledAppointmentCard(
        patientName
    );
 
    
    // STEP 7 marker (Part 2: Final Validations)
 
    await appointmentPage.locator.appointmentPatientInfoValue('UHID').waitFor({ state: 'visible' });
 
    await appointmentPage.verifyAppointmentPatientDetails(
        validPatientData,
        dobData
    );
 
    //calendar

    //invoice
    await appointmentPage.verifyPostRefundAppointmentDetails(
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

    //invoice
   
});