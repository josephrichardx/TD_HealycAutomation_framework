import { test } from "../fixtures/baseTest.js";
 
const { PatientPage } = require("../pages/PatientPage.js");
const { ConsultPage } = require("../pages/ConsultPage.js");
const { ServicePage } = require("../pages/ServicePage.js");
const { InvoicePage } = require("../pages/InvoicePage.js");
const { CalendarPage } = require("../pages/CalendarPage.js");
const { AppointmentPage } = require("../pages/AppointmentPage.js");
const { WaitlistPage } = require("../pages/WaitlistPage.js");
const { PaymentPage } = require("../pages/PaymentPage.js");
 
const { patientData } = require("../testdata/patients.json");
const { appoinmentData, waitlistBookingData } = require("../testdata/appointmentData.json");
const { consultData } = require("../testdata/consultData.json");
const { invoiceData } = require("../testdata/invoiceData.json");
const { paymentData } = require("../testdata/payments.json");
 
const {
    generatePatientName,
    generateShortPatientName
} = require("../utils/RandomData.js");
 
test.setTimeout(300000);
 
test("WF_CALADN_41 - Validate Make Payment for a Waitlist invoice and payment status update", async ({ page }) => {
    const bookingDate = waitlistBookingData.standardBookingDate;
 
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const calendarPage = new CalendarPage(page);
    const appointmentPage = new AppointmentPage(page);
    const waitlistPage = new WaitlistPage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
 
    // Create a fresh patient for the waitlist path.
    const waitlistPatientName = generateShortPatientName();
    const waitlistPatientData = {
        ...patientData,
        email: ""
    };
 
    await patientPage.createPatient(
        waitlistPatientName,
        waitlistPatientData
    );
 
    // Open Consult booking and select the patient and booking filters.
    await consultPage.openConsultBooking();
    await consultPage.verifyPatientSearchBarLoaded();
    await consultPage.searchAndSelectPatient(waitlistPatientName);
    await consultPage.verifyBookingPanelOpened(
        waitlistPatientName,
        "Consult"
    );
    await consultPage.clearPreSelectedFilters();
    await consultPage.selectDoctorByName(appoinmentData.doctorName);
    await consultPage.selectConsultTypeByName(consultData.consultSlot);
 
    await appointmentPage.openBookingDatePicker();
    await appointmentPage.selectBookingDate(bookingDate);
    await appointmentPage.applyBookingDate();
 
    // Add the selected consult to the waitlist.
    await waitlistPage.clickHourglass();
    await waitlistPage.clickProceed();
    await waitlistPage.clickConfirmBooking();
 
    // Return to Calendar and verify the waitlist entry.
    await calendarPage.clickSidebarCalendarIcon();
    await waitlistPage.clickWaitlist();
 
    await waitlistPage.navigateToWaitlistEntry(waitlistPatientName);
 
    await waitlistPage.verifyWaitlistEntry(waitlistPatientName);
 
    // Open the waitlist patient's appointment from Calendar and verify Pending.
    await calendarPage.clickSidebarCalendarIcon();
    await calendarPage.selectPatientFromCalendarForceHover(
        waitlistPatientName,
        bookingDate
    );
    await waitlistPage.verifyPendingAppointment();
 
    // Generate and verify the invoice without changing the existing invoice method.
    await invoicePage.generateInvoice(
        waitlistPatientName,
        invoiceData
    );
    await waitlistPage.verifyInvoiceGenerated();
    await waitlistPage.closeAppointmentDetails();
 
    // Re-open the appointment and verify the invoice before opening Payment.
    await calendarPage.selectPatientFromCalendarForceHover(
        waitlistPatientName,
        bookingDate
    );
    await waitlistPage.verifyInvoiceGenerated();
    await waitlistPage.verifyInvoiceNameStartsWith(paymentData.invoicePrefix);
    await waitlistPage.openPaymentMenu();
 
    // The selected payment method, amount, and transaction ID come from payments.json.
    await waitlistPage.clickMakePaymentButton();
    await waitlistPage.verifyPaymentPageOpened();
    await waitlistPage.selectPaymentMethod(paymentData.paymentType);
    await waitlistPage.recordConfiguredPayment(paymentData);
    await waitlistPage.verifyPaymentRecordedSuccessfully();
    await waitlistPage.verifyPaymentMethodInHistory(paymentData.paymentType);
    await waitlistPage.verifyPaymentAmountInHistory(paymentData.amount);
 
    if (paymentData.makeFullPayment) {
        await waitlistPage.clickMakePaymentButton();
        await waitlistPage.verifyPaymentPageOpened();
        await waitlistPage.selectPaymentMethod(paymentData.paymentType);
        const fullPaymentAmount = await waitlistPage.enableFullPayment();
        await waitlistPage.verifyFullPaymentAmountDisplayed(fullPaymentAmount);
        await waitlistPage.recordCurrentPayment();
        await waitlistPage.verifyPaymentRecordedSuccessfully();
        await waitlistPage.verifyPaymentMethodInHistory(paymentData.paymentType);
        await waitlistPage.verifyPaymentAmountInHistory(fullPaymentAmount);
    }
});