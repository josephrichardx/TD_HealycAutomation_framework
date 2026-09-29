import { test } from "../fixtures/baseTest.js";
import { expect } from "@playwright/test";

const { PatientPage } = require("../pages/PatientPage");
const { ConsultPage } = require("../pages/ConsultPage");
const { CalendarPage } = require("../pages/CalendarPage");
const { PrescriptionPage } = require("../pages/PrescriptionPage");

const {
    patientData,
    appoinmentData,
    consultData,
    template,
    graphSection1,
    graphSection2,
       graphSection3
} = require("../testdata/TC_EMR035.json");

const {
    generateUniquePatientFullName
} = require("../utils/RandomData");


test("EMR Prescription - TD Graph Section 1 Past Date", async ({ page }) => {

    const patientName =
        generateUniquePatientFullName();

    const patientPage =
        new PatientPage(page);

    const consultPage =
        new ConsultPage(page);

    const calendarPage =
        new CalendarPage(page);

    const prescriptionPage =
        new PrescriptionPage(page);


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


    // =====================================================
    // TD Graph Section 1 - Past Date
    // =====================================================

   await prescriptionPage.fillTDGraphSection1PastDate(
    graphSection1
);

// =====================================================
// TD Graph Section 2 - Past Date
// =====================================================

await prescriptionPage.fillTDGraphSection2PastDate(
    graphSection2
);

// =====================================================
// TD Graph Section 3
// =====================================================

await prescriptionPage.fillTDGraphSection3(
    graphSection3
);
await prescriptionPage.getSection1OneWeekGraphData(
    graphSection1
);

await prescriptionPage.getSection1OneMonthGraphData();

await prescriptionPage.getSection1OneYearGraphData(graphSection1);

await prescriptionPage.getSection1AllGraphData(graphSection1);

await prescriptionPage.closeGraphAndDraft();

await prescriptionPage.DownloadpdfPrescription();



});