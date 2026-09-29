import { test } from "../fixtures/baseTest.js";
import { expect } from "@playwright/test";

const { PatientPage } = require("../pages/PatientPage");
const { ConsultPage } = require("../pages/ConsultPage");
const { InvoicePage } = require("../pages/InvoicePage");
const { CalendarPage } = require("../pages/CalendarPage");
const { PrescriptionPage } = require("../pages/PrescriptionPage");

const {
    patientData,
    appoinmentData,
    consultData,
    template,
    scoringChart,
    allergiesToxicity
} = require("../testdata/TC_EMR037.json");

const {
    generateUniquePatientFullName,
    generateUniqueTemplateName
} = require("../utils/RandomData");


test("EMR Prescription", async ({ page }) => {

    const patientName =
        generateUniquePatientFullName();

    const patientPage =
        new PatientPage(page);

    const consultPage =
        new ConsultPage(page);

    const invoicePage =
        new InvoicePage(page);

    const calendarPage =
        new CalendarPage(page);

    const prescriptionPage =
        new PrescriptionPage(page);

    const templateName =
        generateUniqueTemplateName();


    // =====================================================
    // Create Patient
    // =====================================================

    await patientPage.createPatient(
        patientName,
        patientData
    );


    // =====================================================
    // Add Consult
    // =====================================================

    const bookingDate =
        await consultPage.addConsult(
            patientName,
            appoinmentData.doctorName,
            consultData.consultSlot
        );


    // =====================================================
    // Select Patient From Calendar
    // =====================================================

    await calendarPage.selectPatientFromCalendar(
        patientName,
        bookingDate
    );


    // =====================================================
    // Open Prescription
    // =====================================================

    await prescriptionPage.clickWritePrescription();


    // =====================================================
    // Apply Format
    // =====================================================

    await prescriptionPage.applyTheFormat(
        template.formatValue
    );

     await prescriptionPage.openScoringChartDropdown();

await prescriptionPage.selectScoringChart(
    scoringChart
);

await prescriptionPage.selectAllergiesToxicityScoringChart(
    allergiesToxicity
);

await prescriptionPage.FillAllergiesToxicityScoringChart(
    allergiesToxicity
);

await page.waitForTimeout(5000);

const draftScoringChartComorbidities =
    await prescriptionPage.getDraftScoringChartComorbidities({
        scoringChart,
        allergiesToxicity
    });


  await prescriptionPage.DownloadpdfPrescription();

    await prescriptionPage.openHistory();

    const scoringChartPDFText =
    await prescriptionPage.getScoringChartPDFText({
        scoringChart,
        allergiesToxicity
    });

    // Close first PDF
await prescriptionPage.closePdf();

// Second PDF
await prescriptionPage.openSecondPdf();

const scoringChartSecondPDFText =
    await prescriptionPage.getScoringChartPDFText({
        scoringChart,
        allergiesToxicity
    });

    const combinedPDFValues = {

    comorbidities: [
        ...(scoringChartPDFText?.scoringChartValues?.comorbidities || []),
        ...(scoringChartSecondPDFText?.scoringChartValues?.comorbidities || [])
    ],

    allergiesToxicity: [
        ...(scoringChartPDFText?.scoringChartValues?.allergiesToxicity || []),
        ...(scoringChartSecondPDFText?.scoringChartValues?.allergiesToxicity || [])
    ]
};

await prescriptionPage.compareScoringChartValues(
    draftScoringChartComorbidities,
    combinedPDFValues
);
    

});