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
    templateData,
    template,
    medicationData,
    allergiesToxicityMedication,
    allergiesToxicityData,
    allergiesToxicityRow2Data
} = require("../testdata/TC_EMR039.json");

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


    // =====================================================
    // Select Medication
    // =====================================================

    await prescriptionPage.verifyEmptyRowAndSelectMedication(
        medicationData.suggestion
    );


    // =====================================================
    // Add New Row and Delete Row
    // =====================================================

    await prescriptionPage.addAndDeleteMedicationRow();


    // =====================================================
    // Select Allergies/Toxicity Medication
    // =====================================================

    await prescriptionPage.fillAllergiesToxicityAndAddMedication(
        allergiesToxicityData,
        allergiesToxicityMedication
    );

    await prescriptionPage.fillAllergiesToxicityRow2(
        allergiesToxicityRow2Data
    );


    const rxMedicationActualValues =
        await prescriptionPage.getRXMedicationSectionText();

    console.log(
        "========== RX MEDICATION ACTUAL VALUES =========="
    );

    console.log(rxMedicationActualValues);

    await prescriptionPage.DownloadpdfPrescription();

    await prescriptionPage.openHistory();

    const rxMedicationPDFText =
        await prescriptionPage.getRXMedicationPDFText();

    

    await prescriptionPage.compareRXMedicationPDFWithDraft(
    rxMedicationPDFText,
    rxMedicationActualValues
);

});