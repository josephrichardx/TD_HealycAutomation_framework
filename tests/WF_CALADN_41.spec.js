import { test } from "../fixtures/baseTest.js";
 
const { PatientPage } = require("../pages/PatientPage.js");
const { ConsultPage } = require("../pages/ConsultPage.js");
const { ServicePage } = require("../pages/ServicePage.js");
const { InvoicePage } = require("../pages/InvoicePage.js");
const { CalendarPage } = require("../pages/CalendarPage.js");
const { AppointmentPage } = require("../pages/AppointmentPage.js");
const { WaitlistPage } = require("../pages/WaitlistPage.js");
const { PaymentPage } = require("../pages/PaymentPage.js");
 
const {
    patientData,
    appoinmentData,
    consultData,
    invoiceData,
    paymentData,
    waitlistPatientOverrides,
    waitlistVerificationData
} = require("../testdata/TC_41.json");
 
const {
    generateUniquePatientFullName,
} = require("../utils/RandomData.js");
 
test("WF_CALADN_41 - Validate Make Payment for a Waitlist invoice and payment status update", async ({ page }) => {
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const calendarPage = new CalendarPage(page);
    const appointmentPage = new AppointmentPage(page);
    const waitlistPage = new WaitlistPage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
 
    // Create a fresh patient for the waitlist path.
    const waitlistPatientName = generateUniquePatientFullName();
    const waitlistPatientData = {
        ...patientData,
        ...waitlistPatientOverrides
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
        consultData.appointmentType
    );
    await consultPage.clearPreSelectedFilters();
    await consultPage.selectDoctorByName(appoinmentData.doctorName);
    await consultPage.selectConsultTypeByName(consultData.consultSlot);
 
    // Select the booking date at runtime instead of trusting the static
    // day-of-month from test data: walk dates forward from today and use
    // the first one whose doctor card shows an available slot.
    const bookingDate = await appointmentPage.selectRuntimeBookingDate();

    // Add the selected consult to the waitlist.
    await waitlistPage.clickHourglass();
    await waitlistPage.clickProceed();
    await waitlistPage.clickConfirmBooking();
 
    // Return to Calendar and verify the waitlist entry.
    await calendarPage.clickSidebarCalendarIcon();
    await waitlistPage.clickWaitlist();
 
    // The Waitlist list is filtered by the calendar date, so move the calendar
    // to the booking date before looking for the entry.
    await calendarPage.navigateToBookingDayOfMonth(bookingDate);
 
    // Scroll the list to reach the entry.
    await waitlistPage.findWaitlistEntry(waitlistPatientName);
 
    await waitlistPage.verifyWaitlistEntry(
        waitlistPatientName
    );
 
    // A pending waitlist entry is not an appointment on the calendar and cannot
    // be invoiced, so schedule it first - that turns it into a real
    // appointment on the date the slot was taken.
    await waitlistPage.clickSchedule(waitlistPatientName);

    const scheduledSlot =
        await waitlistPage.selectFirstAvailableSlotAcrossDates();

    await waitlistPage.clickConfirmSchedule();

    // Open the now-scheduled appointment from the Calendar and verify status.
    if (scheduledSlot.day) {

        await calendarPage.selectPatientFromCalendarForceHover(
            waitlistPatientName,
            `${scheduledSlot.day} ${scheduledSlot.monthYear}`
        );

    } else {

        await calendarPage.selectPatientFromCalendarForceHoverByDay(
            waitlistPatientName,
            bookingDate
        );
    }

    await waitlistPage.verifyAppointmentStatus(
        waitlistVerificationData.appointmentStatus
    );
 
    // Generate and verify the invoice without changing the existing invoice method.
    await invoicePage.generateInvoice(
        waitlistPatientName,
        invoiceData
    );
    await waitlistPage.verifyInvoiceGenerated(
        waitlistVerificationData.invoiceGenerated
    );
    await waitlistPage.closeAppointmentDetails();
 
    // Re-open the appointment and verify the invoice before opening Payment.
    if (scheduledSlot.day) {

        await calendarPage.selectPatientFromCalendarForceHover(
            waitlistPatientName,
            `${scheduledSlot.day} ${scheduledSlot.monthYear}`
        );

    } else {

        await calendarPage.selectPatientFromCalendarForceHoverByDay(
            waitlistPatientName,
            bookingDate
        );
    }
    await waitlistPage.verifyInvoiceGenerated(
        waitlistVerificationData.invoiceGenerated
    );
    await waitlistPage.verifyInvoiceNameStartsWith(
        waitlistVerificationData.invoiceName
    );
    await waitlistPage.openPaymentMenu();
 
    // The selected payment method, amount, and transaction ID come from payments.json.
    await waitlistPage.clickMakePaymentButton();
    await waitlistPage.verifyPaymentPageOpened();
    await waitlistPage.selectPaymentMethod(paymentData.paymentType);
    await waitlistPage.recordConfiguredPayment(paymentData);
    await waitlistPage.verifyPaymentRecordedSuccessfully(
        waitlistVerificationData.paymentRecorded
    );
    await waitlistPage.verifyPaymentMethodInHistory(
        paymentData.paymentType
    );
    await waitlistPage.verifyPaymentAmountInHistory(
        paymentData.amount
    );

    if (paymentData.makeFullPayment) {
        await waitlistPage.clickMakePaymentButton();
        await waitlistPage.verifyPaymentPageOpened();
        await waitlistPage.selectPaymentMethod(paymentData.paymentType);
        const fullPaymentAmount = await waitlistPage.enableFullPayment();
        await waitlistPage.verifyFullPaymentAmountDisplayed(
            fullPaymentAmount
        );
        await waitlistPage.recordCurrentPayment();
        await waitlistPage.verifyPaymentRecordedSuccessfully(
            waitlistVerificationData.paymentRecorded
        );
        await waitlistPage.verifyPaymentMethodInHistory(
            paymentData.paymentType
        );
        await waitlistPage.verifyPaymentAmountInHistory(
            fullPaymentAmount
        );
    }
});