import { test } from "../fixtures/baseTest.js";
 
const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');
const { CancellationPage } = require('../pages/CancellationPage.js');
const { AppointmentPage } = require('../pages/AppointmentPage.js');
const { WaitlistPage } = require('../pages/WaitlistPage.js');
 
const {
    patientData,
    appoinmentData,
    waitlistBookingData,
    consultData,
    serviceData
} = require('../testdata/TC_39.json');
 
const {
    generateUniquePatientFullName
} = require('../utils/RandomData.js');
 
test('WF_CALADN_39 - Validate Waitlist appointment booking — Appointment Type, Doctor/Surgeon, Time Slot, Fee, Waitlist, Confirmation and navigate to calendar', async ({ page }) => {
    const bookingDate = waitlistBookingData.extendedBookingDate;
 
    const patientName = generateUniquePatientFullName();
 
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);
    const appointmentPage = new AppointmentPage(page);
    const waitlistPage = new WaitlistPage(page);
 
    // Store reference values for verification
    const storedConsultDoctorName = appoinmentData.doctorName;
    const storedServiceDoctorName = serviceData.doctorName;
    const storedServiceName = serviceData.serviceName;
    const storedConsultName = consultData.consultSlot;
    const consultAppointmentType = consultData.appointmentType;
    const serviceAppointmentType = serviceData.appointmentType;
 
 
    // Step 1 - Login
    // const loginPage = new LoginPage(page);
    // await loginPage.login(
    //     loginData.username,
    //     loginData.password
    // );
 
    // Step 2 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );
 
    // Step 3 - Add Consult
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
        
    );
 
    // Step 4 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName
        
    );
 
    // Step 5 - Navigate to appointment page via Calendar
    // bookingDate is a day-of-month value ("28"), so use the day-based navigation
    await calendarPage.selectPatientFromCalendarForceHoverByDay(
        patientName,
        bookingDate
    );
 
    // Step 6 - Click patient name inside appointment panel
    await appointmentPage.clickPatientNameInAppointmentPanel(
        patientName
    );
 
    // Step 7 - Click Add New
    await appointmentPage.clickAddNewButton();
 
    // Step 7 - Verify all Add New menu items
    await appointmentPage.verifyAddNewMenuItems();
 
    // Close Add New dropdown
    await appointmentPage.closeAddNewDropdown();
 
 
    // Step 8 - Click the Type dropdown, change it to Consult, and verify consult data
    await appointmentPage.openTypeDropdown(
        appoinmentData.typeDropdownLabel
    );
    await appointmentPage.selectType(consultAppointmentType);
    
    await appointmentPage.verifyDoctorAndService(
        consultAppointmentType,
        storedConsultDoctorName,
        storedConsultName,
        storedServiceName
    );
 
    // Step 9 - Click the same dropdown again, change it to Service, and verify service data
    await appointmentPage.openCurrentTypeDropdown(consultAppointmentType);
    await appointmentPage.selectType(serviceAppointmentType);
    await appointmentPage.verifyDoctorAndService(
        serviceAppointmentType,
        storedServiceDoctorName,
        storedConsultName,
        storedServiceName
    );
 
    // Step 10 - Click the Calendar icon on the left sidebar to return to the dashboard
    await calendarPage.clickSidebarCalendarIcon();
 
    // Step 12 - Create a fresh patient for the Waitlist path (new name, no reused email)
    const waitlistPatientName = generateUniquePatientFullName();
    const waitlistPatientData = {
        ...patientData,
        email: ''
    };
 
    await patientPage.createPatient(
        waitlistPatientName,
        waitlistPatientData
    );
 
    // Step 13 - Open Consult booking from the dashboard for the Waitlist path
    await consultPage.openConsultBooking();
 
    await consultPage.verifyPatientSearchBarLoaded();
 
    // Search and select patient
    await consultPage.searchAndSelectPatient(waitlistPatientName);
 
    await consultPage.verifyBookingPanelOpened(
        waitlistPatientName,
        'Consult'
    );
 
    // Clear any filters left over from an earlier booking in this session
    await consultPage.clearPreSelectedFilters();
 
    // Select same doctor (checkbox based Doctor filter)
    await consultPage.selectDoctorByName(
        appoinmentData.doctorName
    );
 
    // Select consult type (checkbox based Consult filter)
    await consultPage.selectConsultTypeByName(
        consultData.consultSlot
    );
 
    // Select the booking date at runtime instead of trusting the static
    // day-of-month from test data: walk dates forward from today and use
    // the first one whose doctor card shows an available slot.
    const waitlistBookingDay =
        await appointmentPage.selectRuntimeBookingDate();

    // Step 14 - Click hourglass
    await waitlistPage.clickHourglass();
 
    // Step 15 - Click Proceed
    await waitlistPage.clickProceed();
 
    // Step 16 - Click Confirm Booking
    await waitlistPage.clickConfirmBooking();
 
    // Step 17 - Return to Calendar and open Waitlist
    await calendarPage.clickSidebarCalendarIcon();
    await waitlistPage.clickWaitlist();
 
    // The Waitlist list is filtered by the calendar date, so move the calendar
    // to the booking date before looking for the entry.
    await calendarPage.navigateToBookingDayOfMonth(waitlistBookingDay);
 
    // Step 18 - Move through calendar pages until the patient appears on the Waitlist
    // The Waitlist tab list is virtualised, so scroll it to reach the entry.
    await waitlistPage.findWaitlistEntry(
        waitlistPatientName
    );
 
    // Verify waitlist entry
    await waitlistPage.verifyWaitlistEntry(
        waitlistPatientName
    );
 
    // Step 19 - Click Schedule
    await waitlistPage.clickSchedule(
        waitlistPatientName
    );
 
    // Step 20 - Select available time slot.
    // A waitlisted booking exists because its own date had no free slot, so the
    // dialog opens on a date with nothing to pick; walk the dates/day parts and
    // remember which day the slot was actually taken on.
    const scheduledSlot = await waitlistPage.selectFirstAvailableSlotAcrossDates();

    // Step 21 - Confirm Schedule
    await waitlistPage.clickConfirmSchedule();

    // Step 22/23 - Navigate back via Calendar to the scheduled date, then verify Confirmed status there
    // (the scheduled record leaves the Waitlist/Appointments view for "today" once confirmed,
    // so it can only be verified after navigating to its actual booking date)
    if (scheduledSlot.day) {

        // A different date was picked in the schedule dialog - navigate to that
        // full date ("1 September 2026") rather than the original booking day.
        await calendarPage.selectPatientFromCalendarForceHover(
            waitlistPatientName,
            `${scheduledSlot.day} ${scheduledSlot.monthYear}`
        );

    } else {

        await calendarPage.selectPatientFromCalendarForceHoverByDay(
            waitlistPatientName,
            waitlistBookingDay
        );
    }
 
    // Step 24 - Verify appointment status is Confirmed
    await appointmentPage.verifyConfirmedAppointment(
        waitlistPatientName
    );
});
 