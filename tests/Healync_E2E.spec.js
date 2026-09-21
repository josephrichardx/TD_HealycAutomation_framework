import { time } from 'node:console';
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

const { validPatientData,dobYearRange,toastMessages,packageData,statusData,invoiceData,dateData } = require('../testdata/E2E.json');
 
const { generateUniquePatientFullName,generateRandomDateOfBirth } = require('../utils/RandomData');

const timeoutData = require('../testdata/timeout.json');
const { timeout } = timeoutData;
 
test('Healync_E2E - Cancel with Full Refund (single session package)', async ({ page }) => {
 
    const e2e = new E2EPage(page);
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
 
    await page.waitForTimeout(timeout.networkIdleTimeoutMs);

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
        packageData.packageName,
        packageData.packageAddedToast,
        packageData.breadcrumbBookPackages,
        packageData.breadcrumbPatient,
        packageData.breadcrumbPackages,
        packageData.activeStatus
    );

    // const daysAdvancedForBooking = await e2e.bookSingleSessionFromAddPackage();
    const {
    selectedSlotDate,
    daysAdvanced
    } = await packagePage.bookSingleSessionFromAddPackage();
 
    await packagePage.verifyServicesAddedToast(
        packageData.serviceAddedToast,
        packageData.appointmentScheduledSubtext);

    //   //package

    //appoinment

    await appointmentPage.clickGoToAppointmentPage();

    await calendarPage.verifyStatus(
        statusData.expectedStatus
    );

    await appointmentPage.verifyAppointmentPatientDetails(
        validPatientData,
        dobData,
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
        packageData.expectedPackageQuantity,
        packageData.packageName,
        packageData.minimumRate,
        invoiceData.discountReasonRequiredMessage,
        invoiceData.discountReasonMandatoryMessage
    
    );

    const summaryAmount = await invoicePage.verifyInvoiceTotalAdjustment(
        invoiceData
    );

    const invoiceTotal = (
        summaryAmount + parseFloat(invoiceData.adjustmentAmount)
    ).toFixed(2);

    await invoicePage.PaymentSection(
        invoiceTotal,
        invoiceData.sendInvoiceLabel,
        invoiceData.expectedPaidAmount,
        invoiceData.expectedPaidAmountNumber,
        packageData.amountFieldEmptyValue,
        invoiceData.invoiceNumberPrefix
    );
 
    const invoiceNumber = await invoicePage.VerifyInvoicePDF(
        patientName,
        validPatientData,
        invoiceData,
        summaryAmount,
        packageData.packageName,
        dobData,
        invoiceData.CreditText
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
        invoiceData.paymentMode,
        invoiceData.paymentRecordedMessage
    );
 
    await paymentPage.verifyPostPaymentStatus(
        invoiceTotal,
        invoiceData.paymentMode,
        invoiceData.paidStatus,
        invoiceData.expectedPaymentDue
    );
 
    const invoicePdfReceiptNumber = await paymentPage.revalidateInvoicePDFAfterPayment(
        invoiceNumber,
        invoiceData.paymentMode,
        invoiceData.CreditText,
        invoiceData.BalanceText,
        invoiceData.invoiceReceiptNumberPattern,
        invoiceData.expectedPaidAmountNumber
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
        invoiceData.adjustmentAmount,
        invoiceData.expectedRemaining
    );

    await invoicePage.openAndVerifyInvoicePdfFromFinancials(
        invoiceNumber,
        patientName,
        packageData.packageName,
        summaryAmount,
        invoiceData.adjustmentAmount,
        invoiceData.BalanceText,
        invoiceData.CreditText,
        invoiceData.expectedPaidAmountNumber
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
 
    // const monthNames5 = [
    //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    // ];

    const monthNames5 = dateData.monthNames5;
 
    const formatDate5 = (d) =>
        `${monthNames5[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
 
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
        invoiceTotal,
    );

    await packagePage.attemptOverRefundAndVerifyBlocked(
        invoiceTotal,
        packageData.abandonedStatus,
        packageData.amountFieldEmptyValue
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
        invoiceTotal,
        invoiceData.BalanceText,
        invoiceData.expectedPaidAmountNumber
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
        patientName,
        statusData.noAppointmentBookedTag
    );
 
    // await e2e.navigateToBookedDate(
    //     daysAdvancedForBooking
    // );

    await calendarPage.navigateToBookedDate(
    daysAdvanced
    );
 
    await calendarPage.enableCancelledToggle();

    await page.waitForTimeout(timeout.networkIdleTimeoutMs);

    await appointmentPage.verifyAndClickCancelledAppointmentCard(
        patientName
    );
 
    
    // STEP 7 marker (Part 2: Final Validations)
 
    // await appointmentPage.locator.appointmentPatientInfoValue('UHID').waitFor({ state: 'visible' });
 
    await appointmentPage.verifyAppointmentPatientInfo(
    validPatientData
    );

    await appointmentPage.verifyAppointmentPatientDetails(
        validPatientData,
        dobData
    );
 
    //calendar

    //invoice

    await appointmentPage.verifyPostRefundAppointmentDetails(
        invoiceTotal,
        invoiceData.expectedRemaining,
        invoiceData.refundedStatus
    );

    await invoicePage.reopenAndVerifyRefundedInvoicePdf(
        invoiceNumber,
        invoiceTotal,
        invoiceData.BalanceText,
        invoiceData.expectedPaidAmountNumber
    );
 
    await invoicePage.verifyRefundReceiptPdf(
        patientName,
        invoiceTotal,
        invoiceData.paymentMode,
        invoiceData.refundReceiptTitle
    );

    //invoice
   
});