import { test } from "../fixtures/baseTest.js";

const { PatientPage } =
    require("../pages/PatientPage");

const { ConsultPage } =
    require("../pages/ConsultPage");

const { ServicePage } =
    require("../pages/ServicePage");

const { CalendarPage } =
    require("../pages/CalendarPage");

const { InvoicePage } =
    require("../pages/InvoicePage");

const {
    patientData,
    appoinmentData,
    consultData,
    serviceData,
    invoiceData
} = require("../testdata/TC_SER_042.json");

const {
    generateUniquePatientFullName
} = require("../utils/RandomData");


test(
    "Service Invoice Generation",
    async ({ page }) => {

        const patientName =
            generateUniquePatientFullName();

        const patientPage =
            new PatientPage(page);

        const consultPage =
            new ConsultPage(page);

        const servicePage =
            new ServicePage(page);

        const calendarPage =
            new CalendarPage(page);

        const invoicePage =
            new InvoicePage(page);


        // ==========================================
        // Step 1 - Create Patient
        // ==========================================

        await patientPage.createPatient(
            patientName,
            patientData
        );


        // ==========================================
        // Step 2 - Book Consult
        // ==========================================

        const consultBooking =
            await consultPage.addConsultForInvoiceTest(
                patientName,
                appoinmentData.doctorName,
                consultData.consultSlot
            );

        const bookingDate =
            consultBooking.bookingDate;

        const consultSummary =
            consultBooking.consultSummary;


        // ==========================================
        // Step 3 - Book Service
        // ==========================================

        const serviceBooking =
            await servicePage.addServiceForInvoiceTest(
                patientName,
                serviceData.serviceName,
                bookingDate
            );

        const serviceSummary =
            serviceBooking.serviceSummary;


        // ==========================================
        // Step 28 - Open Generate Invoice
        // ==========================================

        await calendarPage.selectPatientFromCalendar(
            patientName,
            bookingDate
        );


        await invoicePage.clickGenerateInvoiceLink();


        await invoicePage.verifyInvoiceTemplateItems(
            consultSummary,
            serviceSummary
        );

        await invoicePage.selectServicesAndGenerateInvoice(
            invoiceData
        );

        // // ==========================================
        // // Step 29 - Verify Billing Summary
        // // ==========================================

        // await invoicePage.verifyBillingSummaryItems(
        //     consultSummary,
        //     serviceSummary
        // );


        // // ==========================================
        // // Step 30 - Verify Initial Calculation
        // // ==========================================

        // const initialTotal =
        //     await invoicePage.verifyInitialBillingCalculation();


        // // ==========================================
        // // Step 31 - Add Adjustment
        // // ==========================================

        // await invoicePage.addAdjustment(
        //     invoiceData.adjustmentAmount,
        //     invoiceData.adjustmentName,
        //     invoiceData.adjustmentReason
        // );


        // // ==========================================
        // // Step 32 - Verify Adjustment Calculation
        // // ==========================================

        // await invoicePage.verifyAdjustmentCalculation(
        //     invoiceData.adjustmentAmount,
        //     initialTotal
        // );


        // // ==========================================
        // // Step 33 - Generate Invoice
        // // ==========================================

        // await invoicePage.generateInvoiceAfterAdjustment();


        // // ==========================================
        // // Step 34 - Verify Invoice PDF
        // // ==========================================

        await invoicePage.openAndVerifyInvoicePDF(
            patientName,
            patientData,
            invoiceData,
            initialTotal
        );

    }
);