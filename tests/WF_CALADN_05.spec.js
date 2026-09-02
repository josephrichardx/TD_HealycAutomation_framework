import { test, expect } from "../fixtures/baseTest.js";
const { StepHelper } = require('../utils/StepHelper.js');

const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { patientData,appoinmentData,consultData,bookingData,serviceData,DateData,invoiceData,paymentData,cancelReasonData } = require('../testdata/TC_005.json');
const { generatePatientName } = require('../utils/RandomData.js');


// =====================================================
// TC06 - Cancel With No Refund - Cash
// =====================================================

test('TC06 New Patient Cancel With No Refund with Cash', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);

    // Step 1 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 2 - Add Consult
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName,
        DateData.bookingDate
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingData.bookingDate
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName,
        invoiceData
    );

    // Step 6 - Payment
    await cancellationPage.Payment(
        paymentData.amount
    );

    // Step 7 - Cancel With No Refund
    await cancellationPage.cancelWithNoRefund();

});


// =====================================================
// TC07 - Cancel With Refund - Cash
// =====================================================

test('TC07 New Patient Cancel With Refund with Cash', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);

    // Step 1 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 2 - Add Consult
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName,
        DateData.bookingDate
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingData.bookingDate
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName,
        invoiceData
    );

    // Step 6 - Payment
    await cancellationPage.Payment(
        paymentData.amount
    );

    // Step 7 - Cancel With Refund
    await cancellationPage.cancelWithRefund(
        paymentData.paymentMethod,
        paymentData.amount,
        paymentData.transactionId
    );

});


// =====================================================
// TC08 - Cancel With Make Payment - Cash
// =====================================================

test('TC08 New Patient Cancel With Make Payment with Cash', async ({ page }) => {

    const patientName = generatePatientName();

    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const calendarPage = new CalendarPage(page);
    const cancellationPage = new CancellationPage(page);

    // Step 1 - Add New Patient
    await patientPage.createPatient(
        patientName,
        patientData
    );

    // Step 2 - Add Consult
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot,
        bookingData.bookingDate
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName,
        DateData.bookingDate
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingData.bookingDate
    );

    // Step 5 - Generate Invoice
    await invoicePage.generateInvoice(
        patientName,
        invoiceData
    );

    // Step 6 - Payment
    await cancellationPage.Payment(
        paymentData.amount
    );

    // Step 7 - Cancel With Make Payment
    await cancellationPage.cancelWithMakePayment(
        paymentData.paymentMethod,
        paymentData.amount,
        paymentData.transactionId
    );

});