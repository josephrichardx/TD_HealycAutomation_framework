import { test, expect } from "../fixtures/baseTest.js";
 
const { StepHelper } = require('../utils/StepHelper');
 
const { PatientPage } = require('../pages/PatientPage');
const { ConsultPage } = require('../pages/ConsultPage');
const { ServicePage } = require('../pages/ServicePage');
const { InvoicePage } = require('../pages/InvoicePage');
const { PaymentPage } = require('../pages/PaymentPage');
const { CalendarPage } = require('../pages/CalendarPage');
 
const { patientData,appoinmentData,consultData,serviceData,invoiceData,paymentData } = require('../testdata/TC_004.json');
const { generateUniquePatientFullName } = require('../utils/RandomData');
 

test('Make Payment', async ({ page }) => {
 
    const patientName = generateUniquePatientFullName();
    const patientPage = new PatientPage(page);
    const consultPage = new ConsultPage(page);
    const servicePage = new ServicePage(page);
    const invoicePage = new InvoicePage(page);
    const paymentPage = new PaymentPage(page);
    const calendarPage = new CalendarPage(page);
 
    await patientPage.createPatient(
        patientName,
        patientData
    );
 
    const bookingDate =
    await consultPage.addConsult(
        patientName,
        appoinmentData.doctorName,
        consultData.consultSlot
    );

    await servicePage.addService(
    patientName,
    serviceData.serviceName,
    );
 
    await calendarPage.selectPatientFromCalendar(
    patientName,
    bookingDate
    );
 
    await invoicePage.generateInvoice(
    patientName,
    invoiceData
    );
 
    const summaryAmount =
    await invoicePage.verifyInvoiceTotalAfterAdjustment(
        invoiceData
    );
 
    await invoicePage.verifyPaymentSection();
 
    await invoicePage.openAndVerifyInvoicePDF(
        patientName,
        patientData,
        invoiceData,
        summaryAmount
    );

    await paymentPage.openFinancials(
        patientName
    );

    await paymentPage.makePayment(
    paymentData.paymentMethod,
    paymentData.amount,
    paymentData.transactionId
    );
    
    await paymentPage.verifyPayment(
    paymentData.amount
    );
 
});
 