import { test, expect } from "../fixtures/baseTest.js";
const { StepHelper } = require('../utils/StepHelper.js');

const { PatientPage } = require('../pages/PatientPage.js');
const { ConsultPage } = require('../pages/ConsultPage.js');
const { ServicePage } = require('../pages/ServicePage.js');
const { InvoicePage } = require('../pages/InvoicePage.js');
const { CalendarPage } = require('../pages/CalendarPage.js');
const { CancellationPage } = require('../pages/CancellationPage.js');

const { patientData, appoinmentData, consultData, serviceData, invoiceData, paymentData } = require('../testdata/TC_005.json');
const { generateUniquePatientFullName } = require('../utils/RandomData.js');


// =====================================================
// WF_CALADN_05 - Cancel With No Refund - Cash
// =====================================================

test('WF_CALADN_05 - New Patient Cancel With No Refund with Cash', async ({ page }) => {

    const patientName = generateUniquePatientFullName();

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
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
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
// WF_CALADN_05 - Cancel With Refund - Cash
// =====================================================

test('WF_CALADN_05 - New Patient Cancel With Refund with Cash', async ({ page }) => {

    const patientName = generateUniquePatientFullName();

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
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
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
// WF_CALADN_05 - Cancel With Make Payment - Cash
// =====================================================

test('WF_CALADN_05 - New Patient Cancel With Make Payment with Cash', async ({ page }) => {

    const patientName = generateUniquePatientFullName();

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
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );

    // Step 3 - Add Service
    await servicePage.addService(
        patientName,
        serviceData.serviceName
    );

    // Step 4 - Select Patient From Calendar
    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
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